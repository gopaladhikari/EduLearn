import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    netlifyPlugin(),
    tailwindcss(),
  ],
  server: {
    port: 3002,
  },
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
