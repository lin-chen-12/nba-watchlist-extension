import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: "",
        },
        {
          src: "public/vite.svg",
          dest: "public",
        },
      ],
    }),
  ],

  publicDir: false,
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
      },
      output: {
        format: "iife",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        inlineDynamicImports: true,
      },
    },
    target: "es2015",
    minify: false,
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
});
