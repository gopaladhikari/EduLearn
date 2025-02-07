import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), tailwindcss()],
  server: {
    port: 3002,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
