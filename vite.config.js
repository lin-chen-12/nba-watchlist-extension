import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime'
      }
  }
});


