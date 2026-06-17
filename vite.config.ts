import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed at https://agarg5.github.io/workforce-ai-demo/
export default defineConfig({
  base: "/workforce-ai-demo/",
  plugins: [react()],
});
