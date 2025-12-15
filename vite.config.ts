import { defineConfig } from "vite";

export default defineConfig({
  base: "./",          // so scripts load correctly when hosted from /docs
  build: {
    outDir: "docs",    // same target folder as your script
    emptyOutDir: true,
  },
});