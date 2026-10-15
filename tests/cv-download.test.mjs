import assert from "node:assert/strict";
import { test } from "node:test";
import { PDF_NAME, latestPdfAsset } from "../lib/cv-release.mjs";

const pdf = { name: PDF_NAME, browser_download_url: "https://github.com/owner/repo/releases/download/v1.0.0/CV_JoaoPedroFontes.pdf" };

test("download selects the first stable release with a completed PDF asset", () => {
  assert.equal(latestPdfAsset([
    { draft: false, prerelease: false, assets: [] },
    { draft: false, prerelease: false, assets: [pdf] },
  ]), pdf);
});

test("download ignores draft and prerelease PDF assets", () => {
  const previous = { ...pdf, browser_download_url: "https://github.com/owner/repo/releases/download/v0.9.0/CV_JoaoPedroFontes.pdf" };
  assert.equal(latestPdfAsset([
    { draft: true, assets: [pdf] },
    { prerelease: true, assets: [pdf] },
    { draft: false, prerelease: false, assets: [previous] },
  ]), previous);
});

test("download does not return manifests or incomplete assets", () => {
  assert.equal(latestPdfAsset([
    { assets: [{ name: "CV_JoaoPedroFontes.json", browser_download_url: "https://example.invalid/manifest" }] },
    { assets: [{ name: PDF_NAME }] },
  ]), null);
  assert.equal(latestPdfAsset([]), null);
});