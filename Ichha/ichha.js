/* ============================================================
   ICHHA — the wish
   A wishing well for your hopes and dreams
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var wishesEl     = document.getElementById('wishes');
  var wishesEmpty  = document.getElementById('wishesEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailActions= document.getElementById('detailActions');
  var detailClose  = document.getElementById('detailClose');
  var grantedBtn   = document.getElementById('grantedBtn');
  var releasedBtn  = document.getElementById('releasedBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-ichha-wishes';
  var wishes = [];
  var currentIdx = -1;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) wishes = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(wishes)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    wishesEl.innerHTML = '';

    if (wishes.length === 0) {
      wishesEmpty.classList.remove('hidden');
      return;
    }

    wishesEmpty.classList.add('hidden');

    wishes.slice().reverse().forEach(function (w, ri) {
      var idx = wishes.length - 1 - ri;
      var card = document.createElement('div');
      card.className = 'wish-card';
      if (w.status === 'granted') card.classList.add('granted');
      if (w.status === 'released') card.classList.add('released');

      var star = document.createElement('div');
      star.className = 'wish-star';
      star.textContent = '\u2726';
      card.appendChild(star);

      var text = document.createElement('p');
      text.className = 'wish-text';
      text.textContent = w.text;
      card.appendChild(text);

      if (w.status && w.status !== 'waiting') {
        var status = document.createElement('div');
        status.className = 'wish-status';
        status.textContent = w.status;
        card.appendChild(status);
      }

      card.addEventListener('click', (function (i) {
        return function () { showDetail(i); };
      })(idx));

      wishesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(idx) {
    currentIdx = idx;
    var w = wishes[idx];
    detailText.textContent = w.text;
    var d = new Date(w.timestamp);
    detailDate.textContent = 'wished ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    if (w.status === 'waiting' || !w.status) {
      detailActions.classList.remove('hidden');
    } else {
      detailActions.classList.add('hidden');
    }
    detailView.classList.remove('hidden');
  }

  function hideDetail() {
    detailView.classList.add('hidden');
    currentIdx = -1;
  }

  function setStatus(status) {
    if (currentIdx < 0) return;
    wishes[currentIdx].status = status;
    save();
    hideDetail();
    render();
  }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveWish() {
    var text = writeInput.value.trim();
    if (!text) return;
    wishes.push({ text: text, status: 'waiting', timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveWish);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveWish(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });
  grantedBtn.addEventListener('click', function () { setStatus('granted'); });
  releasedBtn.addEventListener('click', function () { setStatus('released'); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
