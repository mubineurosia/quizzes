import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/quizzes/" : "/",
  build: {
    chunkSizeWarningLimit: 1400
  }
});
