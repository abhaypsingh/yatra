/* ============================================================
   PRATHAM — the first time
   A collection of your firsts
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var firstsEl     = document.getElementById('firsts');
  var firstsEmpty  = document.getElementById('firstsEmpty');
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
  var STORE_KEY = 'yatra-pratham-firsts';
  var firsts = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) firsts = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(firsts)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    firstsEl.innerHTML = '';

    if (firsts.length === 0) {
      firstsEmpty.classList.remove('hidden');
      return;
    }

    firstsEmpty.classList.add('hidden');

    firsts.slice().reverse().forEach(function (f, ri) {
      var num = firsts.length - ri;
      var card = document.createElement('div');
      card.className = 'first-card';

      var marker = document.createElement('div');
      marker.className = 'first-marker';
      marker.textContent = num;
      card.appendChild(marker);

      var body = document.createElement('div');
      body.className = 'first-body';

      var name = document.createElement('div');
      name.className = 'first-name';
      name.textContent = f.what;
      body.appendChild(name);

      if (f.feeling) {
        var text = document.createElement('p');
        text.className = 'first-text';
        text.textContent = f.feeling;
        body.appendChild(text);
      }

      card.appendChild(body);
      card.addEventListener('click', function () { showDetail(f); });
      firstsEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(f) {
    detailName.textContent = f.what;
    detailText.textContent = f.feeling || '';
    var d = new Date(f.timestamp);
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

  function saveFirst() {
    var what = writeName.value.trim();
    if (!what) return;
    var feeling = writeInput.value.trim();
    firsts.push({ what: what, feeling: feeling, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveFirst);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveFirst(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
