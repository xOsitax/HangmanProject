import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const repoName = "HangmanProject";
export default defineConfig({
  base: "/HangmanProject/",
  plugins: [react()],
});
