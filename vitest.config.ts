import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    globals: true,
    hookTimeout: 120_000,
    testTimeout: 60_000,
    // One in-memory DB, one connection — files running in parallel would
    // clear each other's collections.
    fileParallelism: false,
  },
});
