/* ============================================================
   SAHAJ — the natural
   A mirror for the gifts that come without effort
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var giftsEl      = document.getElementById('gifts');
  var giftsEmpty   = document.getElementById('giftsEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeGift    = document.getElementById('writeGift');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailGift   = document.getElementById('detailGift');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-sahaj-gifts';
  var gifts = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) gifts = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(gifts)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    giftsEl.innerHTML = '';

    if (gifts.length === 0) {
      giftsEmpty.classList.remove('hidden');
      return;
    }

    giftsEmpty.classList.add('hidden');

    gifts.forEach(function (g) {
      var pill = document.createElement('div');
      pill.className = 'gift-pill';
      pill.textContent = g.gift;

      pill.addEventListener('click', function () { showDetail(g); });
      giftsEl.appendChild(pill);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(g) {
    detailGift.textContent = g.gift;
    detailText.textContent = g.story || '';
    var d = new Date(g.timestamp);
    detailDate.textContent = 'noticed ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeGift.value = '';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeGift.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveGift() {
    var gift = writeGift.value.trim();
    if (!gift) return;
    var story = writeInput.value.trim();
    gifts.push({ gift: gift, story: story, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveGift);
  writeGift.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); writeInput.focus(); }
  });
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveGift(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
