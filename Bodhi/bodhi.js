/* ============================================================
   BODHI — the awakening
   Collect your moments of sudden understanding
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var moments      = document.getElementById('moments');
  var momentsEmpty = document.getElementById('momentsEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var contextInput = document.getElementById('contextInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var momentDetail = document.getElementById('momentDetail');
  var detailText   = document.getElementById('detailText');
  var detailContext= document.getElementById('detailContext');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-bodhi-moments';
  var entries = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) entries = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(entries)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    var existing = moments.querySelectorAll('.moment-card');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    if (entries.length === 0) {
      momentsEmpty.classList.remove('hidden');
      return;
    }

    momentsEmpty.classList.add('hidden');

    /* newest first */
    var sorted = entries.slice().reverse();

    sorted.forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'moment-card';

      var text = document.createElement('p');
      text.className = 'moment-text';
      text.textContent = entry.text;
      card.appendChild(text);

      var meta = document.createElement('div');
      meta.className = 'moment-meta';

      if (entry.context) {
        var ctx = document.createElement('span');
        ctx.className = 'moment-context';
        ctx.textContent = entry.context;
        meta.appendChild(ctx);
      }

      var dateEl = document.createElement('span');
      var d = new Date(entry.timestamp);
      dateEl.textContent = d.toLocaleDateString(undefined, {
        day: 'numeric', month: 'short'
      });
      meta.appendChild(dateEl);

      card.appendChild(meta);

      card.addEventListener('click', function () {
        showDetail(entry);
      });

      moments.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(entry) {
    detailText.textContent = entry.text;

    if (entry.context) {
      detailContext.textContent = entry.context;
      detailContext.style.display = '';
    } else {
      detailContext.textContent = '';
      detailContext.style.display = 'none';
    }

    var d = new Date(entry.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    momentDetail.classList.remove('hidden');
  }

  function hideDetail() {
    momentDetail.classList.add('hidden');
  }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    contextInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() {
    writeView.classList.add('hidden');
  }

  function saveMoment() {
    var text = writeInput.value.trim();
    if (!text) return;

    entries.push({
      text: text,
      context: contextInput.value.trim(),
      timestamp: Date.now()
    });
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
  writeSave.addEventListener('click', saveMoment);

  detailClose.addEventListener('click', hideDetail);
  momentDetail.addEventListener('click', function (e) {
    if (e.target === momentDetail) hideDetail();
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
