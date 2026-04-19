import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getGitHubPagesBase() {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];

  if (!process.env.GITHUB_ACTIONS || !repository) {
    return "/";
  }

  if (repository.endsWith(".github.io")) {
    return "/";
  }

  return `/${repository}/`;
}

export default defineConfig({
  base: getGitHubPagesBase(),
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
