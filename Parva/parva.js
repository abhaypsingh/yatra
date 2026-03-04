/* ============================================================
   PARVA — the chapter
   Mark the chapters of your life as you live them
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var main          = document.getElementById('main');
  var chaptersEl    = document.getElementById('chapters');
  var chaptersEmpty = document.getElementById('chaptersEmpty');
  var addBtn        = document.getElementById('addBtn');
  var writeView     = document.getElementById('writeView');
  var writeTitleIn  = document.getElementById('writeTitleInput');
  var writeInput    = document.getElementById('writeInput');
  var writeCancel   = document.getElementById('writeCancel');
  var writeSave     = document.getElementById('writeSave');
  var detailView    = document.getElementById('detailView');
  var detailNumber  = document.getElementById('detailNumber');
  var detailTitle   = document.getElementById('detailTitle');
  var detailText    = document.getElementById('detailText');
  var detailDate    = document.getElementById('detailDate');
  var detailClose   = document.getElementById('detailClose');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-parva-chapters';
  var chapters = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) chapters = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(chapters)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    chaptersEl.innerHTML = '';

    if (chapters.length === 0) {
      chaptersEmpty.classList.remove('hidden');
      return;
    }

    chaptersEmpty.classList.add('hidden');

    /* show in chronological order (oldest first) — like a book */
    chapters.forEach(function (ch, idx) {
      var card = document.createElement('div');
      card.className = 'chapter-card';

      var num = document.createElement('p');
      num.className = 'chapter-number';
      num.textContent = 'chapter ' + (idx + 1);
      card.appendChild(num);

      var title = document.createElement('h3');
      title.className = 'chapter-title';
      title.textContent = ch.title;
      card.appendChild(title);

      if (ch.text) {
        var text = document.createElement('p');
        text.className = 'chapter-text';
        text.textContent = ch.text;
        card.appendChild(text);
      }

      card.addEventListener('click', function () { showDetail(ch, idx); });
      chaptersEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(ch, idx) {
    detailNumber.textContent = 'chapter ' + (idx + 1);
    detailTitle.textContent = ch.title;
    detailText.textContent = ch.text || '';
    var d = new Date(ch.timestamp);
    detailDate.textContent = 'marked ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeTitleIn.value = '';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeTitleIn.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveChapter() {
    var title = writeTitleIn.value.trim();
    if (!title) return;
    var text = writeInput.value.trim();
    chapters.push({ title: title, text: text, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveChapter);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveChapter(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
