/* ============================================================
   PARIKSHA — the real test
   Record the moments that tested your character
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var testsEl      = document.getElementById('tests');
  var testsEmpty   = document.getElementById('testsEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeChoice  = document.getElementById('writeChoice');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailTest   = document.getElementById('detailTest');
  var detailChoice = document.getElementById('detailChoice');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-pariksha-tests';
  var tests = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) tests = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(tests)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    testsEl.innerHTML = '';

    if (tests.length === 0) {
      testsEmpty.classList.remove('hidden');
      return;
    }

    testsEmpty.classList.add('hidden');

    var sorted = tests.slice().reverse();
    sorted.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'test-card';

      var situation = document.createElement('p');
      situation.className = 'test-situation';
      situation.textContent = t.situation;
      card.appendChild(situation);

      if (t.choice) {
        var chose = document.createElement('p');
        chose.className = 'test-chose';
        chose.textContent = t.choice;
        card.appendChild(chose);
      }

      card.addEventListener('click', function () { showDetail(t); });
      testsEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(t) {
    detailTest.textContent = t.situation;
    detailChoice.textContent = t.choice || '';
    detailChoice.style.display = t.choice ? '' : 'none';
    document.getElementById('detailClose').previousElementSibling; // no-op
    var d = new Date(t.timestamp);
    detailDate.textContent = 'recorded ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeChoice.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveTest() {
    var situation = writeInput.value.trim();
    if (!situation) return;
    var choice = writeChoice.value.trim();
    tests.push({ situation: situation, choice: choice, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveTest);
  writeChoice.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveTest(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
