/* ============================================================
   VISMAYA — wonder
   A collection of moments that made you stop and stare
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var wondersEl    = document.getElementById('wonders');
  var wondersEmpty = document.getElementById('wondersEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-vismaya-wonders';
  var wonders = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) wonders = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(wonders)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    wondersEl.innerHTML = '';

    if (wonders.length === 0) {
      wondersEmpty.classList.remove('hidden');
      return;
    }

    wondersEmpty.classList.add('hidden');

    var sorted = wonders.slice().reverse();
    sorted.forEach(function (w) {
      var card = document.createElement('div');
      card.className = 'wonder-card';

      var star = document.createElement('span');
      star.className = 'wonder-star';
      star.innerHTML = '&#x2729;';
      card.appendChild(star);

      var text = document.createElement('p');
      text.className = 'wonder-text';
      text.textContent = w.text;
      card.appendChild(text);

      card.addEventListener('click', function () { showDetail(w); });
      wondersEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(w) {
    detailText.textContent = w.text;
    var d = new Date(w.timestamp);
    detailDate.textContent = 'noticed ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveWonder() {
    var text = writeInput.value.trim();
    if (!text) return;
    wonders.push({ text: text, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveWonder);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveWonder(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
