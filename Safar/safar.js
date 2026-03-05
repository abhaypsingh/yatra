/* ============================================================
   SAFAR — the journey
   A record of the travels that changed you
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var journeysEl   = document.getElementById('journeys');
  var journeysEmpty = document.getElementById('journeysEmpty');
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
  var STORE_KEY = 'yatra-safar-journeys';
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
    journeysEl.innerHTML = '';

    if (items.length === 0) {
      journeysEmpty.classList.remove('hidden');
      return;
    }

    journeysEmpty.classList.add('hidden');

    items.forEach(function (p) {
      var card = document.createElement('div');
      card.className = 'journey-card';

      var pin = document.createElement('div');
      pin.className = 'journey-marker';
      pin.textContent = '\uD83E\uDDED';
      card.appendChild(pin);

      var name = document.createElement('p');
      name.className = 'journey-where';
      name.textContent = p.where;
      card.appendChild(name);

      if (p.change) {
        var text = document.createElement('p');
        text.className = 'journey-change';
        text.textContent = p.change;
        card.appendChild(text);
      }

      card.addEventListener('click', function () { showDetail(p); });
      journeysEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(p) {
    detailName.textContent = p.where;
    detailText.textContent = p.change || '';
    var d = new Date(p.timestamp);
    detailDate.textContent = 'recorded ' + d.toLocaleDateString(undefined, {
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
    var where = writeName.value.trim();
    if (!where) return;
    var change = writeInput.value.trim();
    items.push({ where: where, change: change, timestamp: Date.now() });
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
