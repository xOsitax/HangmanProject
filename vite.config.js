import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const repoName = "Hangman-Project";
export default defineConfig({
  base: "/Hangman-Project/",
  plugins: [react()],
});
