import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],

  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/shadcn/components"),
      "@/lib": path.resolve(__dirname, "./src/shadcn/lib"),
    },
  },
  server: { https: true },
});
