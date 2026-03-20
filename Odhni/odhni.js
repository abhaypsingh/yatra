/* ============================================================
   ODHNI — the shawl
   A record of the coverings draped over you by those who noticed you were cold
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
  var STORE_KEY = 'yatra-odhni-shawls';
  var items = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) items = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(items)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    placesEl.innerHTML = '';

    if (items.length === 0) {
      placesEmpty.classList.remove('hidden');
      return;
    }

    placesEmpty.classList.add('hidden');

    items.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'place-card';

      var pin = document.createElement('div');
      pin.className = 'place-pin';
      pin.textContent = '\u25AE';
      card.appendChild(pin);

      var name = document.createElement('p');
      name.className = 'place-name';
      name.textContent = p.what;
      card.appendChild(name);

      if (p.feeling) {
        var text = document.createElement('p');
        text.className = 'place-text';
        text.textContent = p.feeling;
        card.appendChild(text);
      }

      card.addEventListener('click', function () { showDetail(p); });
      placesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(p) {
    detailName.textContent = p.what;
    detailText.textContent = p.feeling || '';
    var d = new Date(p.timestamp);
    detailDate.textContent = 'was wrapped in ' + d.toLocaleDateString(undefined, {
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

  function saveItem() {
    var what = writeName.value.trim();
    if (!what) return;
    var feeling = writeInput.value.trim();
    items.push({ what: what, feeling: feeling, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveItem);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveItem(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
