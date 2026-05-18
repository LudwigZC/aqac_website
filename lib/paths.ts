/** Inlined at build time (see next.config.mjs + GitHub Actions workflow). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix public asset paths for GitHub Pages subfolder deploys. */
export function withBasePath(path: string): string {
  if (!path) return basePath;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}
