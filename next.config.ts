import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubUserSite = repositoryName?.toLowerCase().endsWith(".github.io") ?? false;
const basePath =
  process.env.NEXT_BASE_PATH ??
  (repositoryName && !isGitHubUserSite ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
