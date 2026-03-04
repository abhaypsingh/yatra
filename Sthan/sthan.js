/* ============================================================
   STHAN — the place
   A map of the places that hold pieces of you
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
  var STORE_KEY = 'yatra-sthan-places';
  var places = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) places = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(places)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    placesEl.innerHTML = '';

    if (places.length === 0) {
      placesEmpty.classList.remove('hidden');
      return;
    }

    placesEmpty.classList.add('hidden');

    places.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'place-card';

      var pin = document.createElement('div');
      pin.className = 'place-pin';
      pin.textContent = '\uD83D\uDCCD';
      card.appendChild(pin);

      var name = document.createElement('p');
      name.className = 'place-name';
      name.textContent = p.name;
      card.appendChild(name);

      if (p.meaning) {
        var text = document.createElement('p');
        text.className = 'place-text';
        text.textContent = p.meaning;
        card.appendChild(text);
      }

      card.addEventListener('click', function () { showDetail(p); });
      placesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(p) {
    detailName.textContent = p.name;
    detailText.textContent = p.meaning || '';
    var d = new Date(p.timestamp);
    detailDate.textContent = 'pinned ' + d.toLocaleDateString(undefined, {
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

  function savePlace() {
    var name = writeName.value.trim();
    if (!name) return;
    var meaning = writeInput.value.trim();
    places.push({ name: name, meaning: meaning, timestamp: Date.now() });
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
  writeSave.addEventListener('click', savePlace);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); savePlace(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
