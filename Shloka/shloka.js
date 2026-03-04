/* ============================================================
   SHLOKA — the verse
   A personal anthology of borrowed words that moved you
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var versesEl     = document.getElementById('verses');
  var versesEmpty  = document.getElementById('versesEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeSource  = document.getElementById('writeSource');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailText   = document.getElementById('detailText');
  var detailSource = document.getElementById('detailSource');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-shloka-verses';
  var verses = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) verses = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(verses)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    versesEl.innerHTML = '';

    if (verses.length === 0) {
      versesEmpty.classList.remove('hidden');
      return;
    }

    versesEmpty.classList.add('hidden');

    var sorted = verses.slice().reverse();
    sorted.forEach(function (v) {
      var card = document.createElement('div');
      card.className = 'verse-card';

      var mark = document.createElement('div');
      mark.className = 'verse-mark';
      mark.innerHTML = '&ldquo;';
      card.appendChild(mark);

      var text = document.createElement('p');
      text.className = 'verse-text';
      text.textContent = v.text;
      card.appendChild(text);

      if (v.source) {
        var src = document.createElement('p');
        src.className = 'verse-source';
        src.textContent = '\u2014 ' + v.source;
        card.appendChild(src);
      }

      card.addEventListener('click', function () { showDetail(v); });
      versesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(v) {
    detailText.textContent = v.text;
    detailSource.textContent = v.source ? '\u2014 ' + v.source : '';
    var d = new Date(v.timestamp);
    detailDate.textContent = 'saved ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeSource.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveVerse() {
    var text = writeInput.value.trim();
    if (!text) return;
    var source = writeSource.value.trim();
    verses.push({ text: text, source: source, timestamp: Date.now() });
    save();
    closeWrite();
    render();
  }

  /* ==================== ABOUT ==================== */
  function openAbout() {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  }
  function closeAbout() {
    aboutOverlay.classList.remove('visible');
    setTimeout(function () { aboutOverlay.classList.add('hidden'); }, 400);
  }

  /* ==================== EVENTS ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      main.classList.remove('hidden');
      navFloat.classList.add('visible');
      load(); render();
    }, 1200);
  });

  addBtn.addEventListener('click', openWrite);
  writeCancel.addEventListener('click', closeWrite);
  writeSave.addEventListener('click', saveVerse);
  writeSource.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); saveVerse(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
