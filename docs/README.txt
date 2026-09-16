How This Site Works — delivery package
========================================

New reference document (3 files):
  - how_this_site_works.html   — the guide itself, in the WIP hub's visual system
  - how_this_site_works.pdf    — matching PDF
  - How_This_Site_Works.docx   — matching Word doc, for a proper review read

Where it lives on the hub:
  Governance & Traceability group, right after the HITL Requirements Register.
  Non-votable — status "Living document — updated ongoing," same as the Register.

Updated hub catalog page:
  - index.html   — replaces docs/wip/index.html

IMPORTANT: this index.html is cumulative. It already includes everything from
the earlier WRPM delivery (the "wrpm_wip_item_delivery.zip" from Sept 15) —
the WRPM row, the Governance & Traceability group, and the Requirements
Register row — PLUS the new "How This Site Works" row added in this package.
If the earlier index.html patch hasn't been applied to the live site yet,
you only need to apply THIS one; you don't need to layer both.

  - index.html.diff  — a unified diff against the previously-delivered
    (still-pending) index.html, for a quick look at just what changed in
    this pass, if that patch is already applied somewhere.

To install:
  1. Copy how_this_site_works.html, how_this_site_works.pdf, and
     How_This_Site_Works.docx into docs/wip/ in the repo.
  2. Replace docs/wip/index.html with the index.html in this package.
  3. No changes to src/index.js are needed — this item is non-votable,
     like the Requirements Register, so it doesn't touch VOTABLE_ITEMS.
