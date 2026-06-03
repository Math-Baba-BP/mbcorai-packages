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
      const { mkdirSync, writeFileSync, copyFileSync } = await import("fs");

      // Génère le fichier CSS que les consommateurs importent dans leur globals.css.
      mkdirSync("./dist/styles", { recursive: true });
      writeFileSync("./dist/styles/index.css", '@source "../";\n');

      // Copie l'augmentation next-auth dans dist/types/ pour que le host ait role sur session.user
      mkdirSync("./dist/types", { recursive: true });
      copyFileSync(
        "./src/auth/types/next-auth.d.ts",
        "./dist/types/next-auth.d.ts"
      );
    },
  },
]);