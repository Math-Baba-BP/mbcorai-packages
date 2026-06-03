import { defineConfig } from "tsup";
import { readFileSync, writeFileSync } from "fs";

const shared = {
  format: ["esm"] as const,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom", "next"],
  esbuildOptions(options: any) {
    options.jsx = "automatic";
  },
};

export default defineConfig([
  {
    ...shared,
    entry: { "client/index": "src/client/index.ts" },
    dts: true,
    clean: true,
    onSuccess: async () => {
      const path = "./dist/client/index.js";
      const content = readFileSync(path, "utf-8");
      writeFileSync(path, '"use client";\n' + content);
    },
  },
  {
    ...shared,
    entry: {
      "server/index": "src/server/index.ts",
      "auth/index": "src/auth/index.ts",
      "dashboard/index": "src/dashboard/index.ts",
    },
    dts: true,
    clean: false,
    onSuccess: async () => {
      // Génère le fichier CSS que les consommateurs importent dans leur globals.css.
      // @source "../" pointe vers dist/ (relatif à dist/styles/index.css dans node_modules)
      // Tailwind v4 scanne ainsi tous les fichiers compilés du package pour trouver les classes.
      const { mkdirSync, writeFileSync } = await import("fs");
      mkdirSync("./dist/styles", { recursive: true });
      writeFileSync("./dist/styles/index.css", '@source "../";\n');
    },
  },
]);