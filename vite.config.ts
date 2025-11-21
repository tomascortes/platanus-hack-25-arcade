import { defineConfig } from "vite";

export default defineConfig({
  root: "./front",
  server: {
    port: 3000,
    open: false,
  },
  optimizeDeps: {
    exclude: ["phaser"],
  },
});
