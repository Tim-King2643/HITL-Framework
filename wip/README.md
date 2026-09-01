Folder containing current work in progress files.

This top-level `wip/` folder is **not** part of the deployed site — `wrangler.jsonc`
only serves `./docs`, so nothing here is reachable at hitldrivenarchitecture.com under
any URL. Good for scratch files, source drafts, and PDFs/HTML that Tim wants git-tracked
for reference but that GiGi will receive some other way (download, email) rather than
click through as a live page.

For a draft that needs to be reviewed as an actual styled webpage (something to click
through the way the Dashboard or Documentation pages work), use `docs/wip/` instead —
see `docs/wip/index.html`. That folder IS deployed, but deliberately left out of every
nav menu, so it's only reachable by someone who already has the link — and since the
whole domain now sits behind Cloudflare Access (Tim + GiGi only), that's as private as
this folder, just actually viewable in a browser.
