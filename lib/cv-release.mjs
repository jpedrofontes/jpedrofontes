export const PDF_NAME = "CV_JoaoPedroFontes.pdf";

export function latestPdfAsset(releases) {
  for (const release of releases) {
    if (release.draft || release.prerelease) continue;
    const asset = (release.assets || []).find(candidate => candidate.name === PDF_NAME);
    if (asset?.browser_download_url) return asset;
  }
  return null;
}