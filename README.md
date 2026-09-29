# ASX Shariah vs Conventional

A short analysis comparing the official S&P/ASX 200 Shariah index against the S&P/ASX 200, using S&P Dow Jones Indices' published scorecard (data as of 30 June 2026). Covers returns, volatility, Sharpe ratios, and valuation multiples across both indices, with methodology and limitations documented on the page itself.

Live page (once deployed): `https://<aneeq17>.github.io/asx-shariah-vs-conventional/`

## Files

- `index.html` — the page itself (self-contained, no build step)
- `chart.js` — the two bar charts (returns, volatility)
- `data/shariah-scorecard-2026-06-30.json` — the underlying figures, sourced and documented

## Deploy to GitHub Pages (free, permanent link)

1. Create a GitHub account at github.com if you don't have one yet.
2. Create a new repository, e.g. named `asx-shariah-vs-conventional`. Keep it public (Pages needs public on the free tier, or GitHub Pro for a private one).
3. Upload these three files (and the `data/` folder) into the repo, keeping the same folder structure. Easiest way: on the repo page, click "Add file" -> "Upload files", drag in this whole folder, commit.
4. Go to the repo's Settings -> Pages.
5. Under "Build and deployment", set Source to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
6. Wait about a minute, then your page is live at `https://<aneeq17>.github.io/asx-shariah-vs-conventional/`.

That link is yours permanently: it's tied to your GitHub account, not any third-party trial or demo service, so it won't expire or sleep. If you ever want to update the numbers or wording, edit `index.html` (and `data/shariah-scorecard-2026-06-30.json` to match) directly in GitHub's web editor, or clone the repo locally.

## Updating later

If S&P publishes a newer scorecard and you want to refresh the numbers:
1. Get the new figures from the same source (link below).
2. Update the values in `data/shariah-scorecard-2026-06-30.json` (rename the file to match the new as-of date).
3. Update the same numbers in `index.html` (the stat tiles, the two tables, and the `series1`/`series2` arrays in `chart.js`).
4. Commit. GitHub Pages redeploys automatically within a minute or two.

## Sources

- S&P Dow Jones Indices, Shariah Indices Scorecard (quarterly): https://www.spglobal.com/spdji/en/documents/performance-reports/scorecard-sp-shariah-djim.pdf
- S&P/ASX 200 Shariah index page: https://www.spglobal.com/spdji/en/indices/equity/sp-asx-200-shariah/
- RBA cash rate target: https://www.rba.gov.au/cash-rate-target-overview.html
