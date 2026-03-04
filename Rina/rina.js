/* ============================================================
   RINA — the debt of love
   A ledger of invisible kindnesses
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var ledger       = document.getElementById('ledger');
  var ledgerEmpty  = document.getElementById('ledgerEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeWho     = document.getElementById('writeWho');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailWho    = document.getElementById('detailWho');
  var detailWhat   = document.getElementById('detailWhat');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-rina-debts';
  var debts = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) debts = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(debts)); }
    catch (e) {}
  }

  /* ==================== INITIALS ==================== */
  function initials(name) {
    if (!name) return '\u2661';
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /* ==================== RENDER ==================== */
  function render() {
    ledger.innerHTML = '';

    if (debts.length === 0) {
      ledgerEmpty.classList.remove('hidden');
      return;
    }

    ledgerEmpty.classList.add('hidden');

    var sorted = debts.slice().reverse();
    sorted.forEach(function (d) {
      var card = document.createElement('div');
      card.className = 'coin-card';

      var icon = document.createElement('div');
      icon.className = 'coin-icon';
      icon.textContent = initials(d.who);
      card.appendChild(icon);

      var body = document.createElement('div');
      body.className = 'coin-body';

      var who = document.createElement('p');
      who.className = 'coin-who';
      who.textContent = d.who || 'someone';
      body.appendChild(who);

      var what = document.createElement('p');
      what.className = 'coin-what';
      what.textContent = d.what;
      body.appendChild(what);

      card.appendChild(body);

      card.addEventListener('click', function () { showDetail(d); });
      ledger.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(d) {
    detailWho.textContent = d.who || 'someone';
    detailWhat.textContent = d.what;
    var date = new Date(d.timestamp);
    detailDate.textContent = 'noticed ' + date.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeWho.value = '';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeWho.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveDebt() {
    var what = writeInput.value.trim();
    if (!what) return;
    var who = writeWho.value.trim();
    debts.push({ who: who, what: what, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveDebt);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveDebt(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
