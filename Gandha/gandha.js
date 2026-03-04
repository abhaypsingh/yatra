/* ============================================================
   GANDHA — the scent
   A collection of fragrances and the memories they carry
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var scentsEl     = document.getElementById('scents');
  var scentsEmpty  = document.getElementById('scentsEmpty');
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
  var STORE_KEY = 'yatra-gandha-scents';
  var scents = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) scents = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(scents)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    scentsEl.innerHTML = '';

    if (scents.length === 0) {
      scentsEmpty.classList.remove('hidden');
      return;
    }

    scentsEmpty.classList.add('hidden');

    scents.slice().reverse().forEach(function (s) {
      var card = document.createElement('div');
      card.className = 'scent-card';

      var icon = document.createElement('div');
      icon.className = 'scent-icon';
      icon.textContent = '\u223C';
      card.appendChild(icon);

      var body = document.createElement('div');
      body.className = 'scent-body';

      var name = document.createElement('div');
      name.className = 'scent-name';
      name.textContent = s.name;
      body.appendChild(name);

      if (s.memory) {
        var text = document.createElement('p');
        text.className = 'scent-text';
        text.textContent = s.memory;
        body.appendChild(text);
      }

      card.appendChild(body);
      card.addEventListener('click', function () { showDetail(s); });
      scentsEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(s) {
    detailName.textContent = s.name;
    detailText.textContent = s.memory || '';
    var d = new Date(s.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
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

  function saveScent() {
    var name = writeName.value.trim();
    if (!name) return;
    var memory = writeInput.value.trim();
    scents.push({ name: name, memory: memory, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveScent);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveScent(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
