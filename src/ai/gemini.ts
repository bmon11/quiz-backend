import { FinishReason, GoogleGenAI, ThinkingLevel } from '@google/genai';

// Gemini for the offline content generator (src/scripts/generate.ts) — the API
// itself never calls it. Same setup as sedev-backend: Vertex AI (Google Cloud
// credit, local `gcloud auth application-default login`) or an AI Studio key.

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (client) return client;
  const vertex = process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true';
  if (vertex && !process.env.GOOGLE_CLOUD_PROJECT) throw new Error('Set GOOGLE_CLOUD_PROJECT for Vertex AI');
  if (!vertex && !process.env.GEMINI_API_KEY) throw new Error('Set GEMINI_API_KEY or GOOGLE_GENAI_USE_VERTEXAI=true');
  const httpOptions = { timeout: 5 * 60_000 };
  client = vertex
    ? new GoogleGenAI({
        vertexai: true,
        project: process.env.GOOGLE_CLOUD_PROJECT,
        location: process.env.GOOGLE_CLOUD_LOCATION || 'global',
        httpOptions,
      })
    : new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions });
  return client;
};

export const defaultModel = () => process.env.GEMINI_MODEL || 'gemini-3.5-flash';

export const usage = { calls: 0, inputTokens: 0, outputTokens: 0 };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const retryable = (err: unknown) => {
  const status = (err as { status?: number }).status;
  return status === 429 || (status !== undefined && status >= 500);
};

export interface JsonRequest {
  system: string;
  prompt: string;
  schema: object;
  /** Ground the answer in Google Search — used by the fact-check pass. */
  search?: boolean;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/** One structured-output call, retried on rate limits / server errors. */
export async function generateJson<T>(req: JsonRequest): Promise<T> {
  const maxOutputTokens = req.maxOutputTokens ?? 32_000;
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await getClient().models.generateContent({
        model: req.model ?? defaultModel(),
        contents: req.prompt,
        config: {
          systemInstruction: req.system,
          responseMimeType: 'application/json',
          responseJsonSchema: req.schema,
          maxOutputTokens,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          temperature: req.temperature ?? 0.7,
          ...(req.search && { tools: [{ googleSearch: {} }] }),
        },
      });
      const meta = res.usageMetadata;
      usage.calls += 1;
      usage.inputTokens += meta?.promptTokenCount ?? 0;
      usage.outputTokens += (meta?.candidatesTokenCount ?? 0) + (meta?.thoughtsTokenCount ?? 0);
      const finish = res.candidates?.[0]?.finishReason;
      if (!res.text) throw new Error(`Empty model response (${finish ?? 'unknown'})`);
      if (finish === FinishReason.MAX_TOKENS) throw new Error(`Response truncated at ${maxOutputTokens} tokens`);
      return JSON.parse(res.text) as T;
    } catch (err) {
      if (attempt >= 3 || !(retryable(err) || err instanceof SyntaxError)) throw err;
      await sleep(2 ** attempt * 4000);
    }
  }
}
