import { generateJson } from './gemini';
import type { L } from '../seed/types';

// Shared by the content generator and the document importer.

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          index: { type: 'integer' },
          ok: { type: 'boolean', description: 'true only if the marked answer is correct, the only correct choice, and the explanation is accurate' },
          mnOk: { type: 'boolean', description: 'true if the Mongolian text is correct and natural' },
          reason: { type: 'string' },
        },
        required: ['index', 'ok', 'mnOk', 'reason'],
      },
    },
  },
  required: ['results'],
};

export type Drafted = { difficulty: 1 | 2 | 3; prompt: L; choices: L[]; answer: number; explanation: L };

export const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export const shuffle = (q: Drafted): Drafted => {
  const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  return { ...q, choices: order.map((i) => q.choices[i]), answer: order.indexOf(q.answer) };
};

export const wellFormed = (q: Drafted) =>
  q.choices?.length === 4 &&
  q.answer >= 0 &&
  q.answer < 4 &&
  new Set(q.choices.map((c) => norm(c.en))).size === 4 &&
  [q.prompt, q.explanation, ...q.choices].every((t) => t?.en?.trim() && t?.mn?.trim());

/** Grounded fact-check in batches; returns only the questions that pass. */
export async function verify(drafts: Drafted[], lessonTitle: string, model?: string): Promise<Drafted[]> {
  const kept: Drafted[] = [];
  for (let start = 0; start < drafts.length; start += 12) kept.push(...(await verifyBatch(drafts.slice(start, start + 12), lessonTitle, model)));
  return kept;
}

async function verifyBatch(batch: Drafted[], lessonTitle: string, model?: string): Promise<Drafted[]> {
  const listing = batch
    .map((q, i) => `#${i} [${q.prompt.en}] choices: ${q.choices.map((c, j) => `${j}) ${c.en}`).join(' | ')} → marked answer: ${q.answer} (${q.choices[q.answer].en}). Explanation: ${q.explanation.en}\n   MN: ${q.prompt.mn} / ${q.choices.map((c) => c.mn).join(' | ')} / ${q.explanation.mn}`)
    .join('\n');
  let results: { index: number; ok: boolean; mnOk: boolean; reason: string }[];
  try {
    ({ results } = await generateJson<{ results: typeof results }>({
      system: 'You are a strict quiz fact-checker. Use Google Search to check each question. Reject anything doubtful, ambiguous, outdated, or with more than one defensible answer. Also check the Mongolian translation is correct and natural.',
      prompt: `Lesson: ${lessonTitle}\nCheck every question:\n${listing}`,
      schema: VERIFY_SCHEMA,
      search: true,
      temperature: 0,
      model,
    }));
  } catch (err) {
    // Too many searches for one call (TOO_MANY_TOOL_CALLS) etc.: check the halves.
    if (batch.length <= 2) {
      console.log(`    ✗ dropped ${batch.length} unchecked: ${(err as Error).message}`);
      return [];
    }
    const mid = Math.ceil(batch.length / 2);
    return [...(await verifyBatch(batch.slice(0, mid), lessonTitle, model)), ...(await verifyBatch(batch.slice(mid), lessonTitle, model))];
  }
  const kept: Drafted[] = [];
  batch.forEach((q, i) => {
    const r = results.find((x) => x.index === i);
    if (r?.ok && r.mnOk) kept.push(q);
    else console.log(`    ✗ dropped: ${q.prompt.en}  — ${r?.reason ?? 'not checked'}`);
  });
  return kept;
}

export async function pool<T>(items: T[], limit: number, fn: (item: T) => Promise<void>) {
  const queue = [...items];
  await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await fn(queue.shift()!);
  }));
}
