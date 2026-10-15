import { latestPdfAsset } from "@/lib/cv-release.mjs";

export const revalidate = 300;

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/repos/jpedrofontes/jpedrofontes/releases?per_page=100", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });
    if (response.ok) {
      const asset = latestPdfAsset(await response.json());
      if (asset) return Response.redirect(asset.browser_download_url, 307);
    }
  } catch {
    return Response.json({ error: "The CV download is temporarily unavailable" }, {
      status: 503,
      headers: { "Retry-After": "60", "Cache-Control": "no-store" },
    });
  }
  return Response.json({ error: "The CV PDF has not been published yet" }, {
    status: 503,
    headers: { "Retry-After": "60", "Cache-Control": "no-store" },
  });
}