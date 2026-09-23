// Shared download widget for docs/wip/ item pages.
//
// Usage on a page:
//   <link rel="stylesheet" href="wip-print.css" media="print">   (in <head>)
//   <div data-wip-download-mount data-item="ITEMID"></div>       (after the masthead)
//   <script src="wip-download-widget.js"></script>               (before </body>)
//
// Both formats are generated client-side, at click time, straight from the
// page's own rendered HTML — there is no separate .docx/.pdf file to keep
// in sync. The .html file is the single source of truth for every item;
// "Download PDF" and "Download Word" are just two different views of it.
//
// PDF: the browser's native print pipeline, styled by wip-print.css
// (loaded only under `media="print"`, so it never touches the on-screen
// look). The person picks "Save as PDF" in the print dialog.
//
// Word: builds a self-contained "Word-compatible HTML" document — the same
// technique Word, Outlook and most "Export to Word" buttons have used for
// years — and downloads it with a .doc extension. Word opens it natively.
// It is not true OOXML (a hand-built .docx), so very elaborate layout
// wouldn't survive the trip, but headings, tables, bold/italic, colors and
// lists all come through, which is everything these pages actually use.

(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function pageTitle() {
    var h1 = document.querySelector('.masthead h1');
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();
    return document.title.replace(/^\[DRAFT\]\s*/, '').split(' — Human-AI Partnership Framework')[0];
  }

  function buildWordHtml(title) {
    var wrapEl = document.querySelector('.wrap');
    if (!wrapEl) return null;

    var clone = wrapEl.cloneNode(true);
    var stripSelectors = [
      '[data-wip-vote-mount]', '[data-wip-download-mount]', '.wip-vote-card',
      '.mock-toggle-row', '.gates-info-close', '.mock-legend-box ~ .mock-shell .mock-hint'
    ];
    stripSelectors.forEach(function (sel) {
      clone.querySelectorAll(sel).forEach(function (el) { el.remove(); });
    });
    // Any interactive info/consequence popover that happened to be open
    // when Download was clicked is a screen affordance, not content.
    clone.querySelectorAll('.gates-info, .wr-cons-pop').forEach(function (el) {
      el.classList.remove('open');
    });

    var styleBlocks = Array.prototype.map
      .call(document.querySelectorAll('style'), function (s) { return s.innerHTML; })
      .join('\n');

    return (
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="utf-8"><title>' + escapeHtml(title) + '</title>' +
      '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View>' +
      '<w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->' +
      '<style>@page Section1 { size: 8.5in 11in; margin: 1in; } ' +
      'div.Section1 { page: Section1; } ' +
      'body { font-family: Calibri, "Segoe UI", sans-serif; }\n' +
      styleBlocks +
      '</style></head><body><div class="Section1">' +
      clone.innerHTML +
      '</div></body></html>'
    );
  }

  function downloadWord(item, title) {
    var html = buildWordHtml(title);
    if (!html) return;
    var blob = new Blob(['﻿', html], { type: 'application/msword' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = item + '.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function makeButton(label, onClick) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.style.cssText =
      'all:unset;cursor:pointer;font-family:"Segoe UI",sans-serif;font-size:12px;' +
      'font-weight:700;letter-spacing:.02em;color:#0D2D4F;background:#EEF3FA;' +
      'border:1px solid #B8CCE8;border-radius:6px;padding:8px 14px;';
    btn.onmouseover = function () { btn.style.background = '#DCE8F8'; };
    btn.onmouseout = function () { btn.style.background = '#EEF3FA'; };
    btn.onclick = onClick;
    return btn;
  }

  function initMount(mount) {
    var item = mount.getAttribute('data-item') || 'document';
    var title = pageTitle();

    mount.style.cssText = 'display:flex;gap:10px;justify-content:center;padding:14px 20px;background:#F4F6FB;';

    mount.appendChild(makeButton('Download PDF', function () { window.print(); }));
    mount.appendChild(makeButton('Download Word', function () { downloadWord(item, title); }));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var mounts = document.querySelectorAll('[data-wip-download-mount]');
    for (var i = 0; i < mounts.length; i++) initMount(mounts[i]);
  });
})();
