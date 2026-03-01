/* ============================================================
   RAHASYA — the secret
   A private vault for truths too tender for the world
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var vault        = document.getElementById('vault');
  var vaultEmpty   = document.getElementById('vaultEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var secretDetail = document.getElementById('secretDetail');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-rahasya-secrets';
  var secrets = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) secrets = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(secrets)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    var existing = vault.querySelectorAll('.envelope');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    if (secrets.length === 0) {
      vaultEmpty.classList.remove('hidden');
      return;
    }

    vaultEmpty.classList.add('hidden');

    /* newest first */
    var sorted = secrets.slice().reverse();

    sorted.forEach(function (s) {
      var env = document.createElement('div');
      env.className = 'envelope';

      var dateEl = document.createElement('span');
      dateEl.className = 'envelope-date';
      var d = new Date(s.timestamp);
      dateEl.textContent = d.toLocaleDateString(undefined, {
        day: 'numeric', month: 'short'
      });
      env.appendChild(dateEl);

      env.addEventListener('click', function () {
        showDetail(s);
      });

      vault.appendChild(env);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(s) {
    detailText.textContent = s.text;
    var d = new Date(s.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    secretDetail.classList.remove('hidden');
  }

  function hideDetail() {
    secretDetail.classList.add('hidden');
  }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() {
    writeView.classList.add('hidden');
  }

  function saveSecret() {
    var text = writeInput.value.trim();
    if (!text) return;

    secrets.push({ text: text, timestamp: Date.now() });
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
      load();
      render();
    }, 1200);
  });

  addBtn.addEventListener('click', openWrite);
  writeCancel.addEventListener('click', closeWrite);
  writeSave.addEventListener('click', saveSecret);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveSecret();
    }
  });

  detailClose.addEventListener('click', hideDetail);
  secretDetail.addEventListener('click', function (e) {
    if (e.target === secretDetail) hideDetail();
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
