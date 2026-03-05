/* ============================================================
   SANGRAHA — the collection
   Name the things you gather and why they draw you
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var placesEl     = document.getElementById('places');
  var placesEmpty  = document.getElementById('placesEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeName    = document.getElementById('writeName');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailName   = document.getElementById('detailName');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-sangraha-collections';
  var collections = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) collections = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(collections)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    placesEl.innerHTML = '';

    if (collections.length === 0) {
      placesEmpty.classList.remove('hidden');
      return;
    }

    placesEmpty.classList.add('hidden');

    collections.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'place-card';

      var pin = document.createElement('div');
      pin.className = 'place-pin';
      pin.textContent = '\u25C6';
      card.appendChild(pin);

      var name = document.createElement('p');
      name.className = 'place-name';
      name.textContent = c.what;
      card.appendChild(name);

      if (c.why) {
        var text = document.createElement('p');
        text.className = 'place-text';
        text.textContent = c.why;
        card.appendChild(text);
      }

      card.addEventListener('click', function () { showDetail(c); });
      placesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(c) {
    detailName.textContent = c.what;
    detailText.textContent = c.why || '';
    var d = new Date(c.timestamp);
    detailDate.textContent = 'gathered ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeName.value = '';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeName.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveCollection() {
    var what = writeName.value.trim();
    if (!what) return;
    var why = writeInput.value.trim();
    collections.push({ what: what, why: why, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveCollection);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveCollection(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
