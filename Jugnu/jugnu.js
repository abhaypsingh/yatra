/* ============================================================
   JUGNU — the firefly jar
   Gratitude fireflies that glow in the dark
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var main          = document.getElementById('main');
  var jarFireflies  = document.getElementById('jarFireflies');
  var jarStats      = document.getElementById('jarStats');
  var addBtn        = document.getElementById('addBtn');
  var addForm       = document.getElementById('addForm');
  var addInput      = document.getElementById('addInput');
  var addCancel     = document.getElementById('addCancel');
  var addSave       = document.getElementById('addSave');
  var fireflyDetail = document.getElementById('fireflyDetail');
  var detailText    = document.getElementById('detailText');
  var detailDate    = document.getElementById('detailDate');
  var detailClose   = document.getElementById('detailClose');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-jugnu-fireflies';
  var fireflies = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) fireflies = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(fireflies)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render(animateLast) {
    jarFireflies.innerHTML = '';

    var w = jarFireflies.offsetWidth  || 120;
    var h = jarFireflies.offsetHeight || 240;

    fireflies.forEach(function (f, i) {
      var el = document.createElement('div');
      el.className = 'firefly' + (animateLast && i === fireflies.length - 1 ? ' firefly-new' : '');

      /* deterministic position from timestamp + index */
      var seed = (f.timestamp || 0) % 10000;
      var px = ((seed * 7 + i * 37) % Math.max(w - 14, 1)) + 4;
      var py = ((seed * 13 + i * 53) % Math.max(h - 14, 1)) + 4;

      el.style.left = px + 'px';
      el.style.top  = py + 'px';

      /* size variation */
      var size = 6 + (seed % 5);
      el.style.width  = size + 'px';
      el.style.height = size + 'px';

      /* stagger animations */
      el.style.animationDelay = (i * 0.3 % 4).toFixed(1) + 's, ' + (i * 0.7 % 2).toFixed(1) + 's';

      el.addEventListener('click', function () { showDetail(f); });

      jarFireflies.appendChild(el);
    });

    updateStats();
  }

  function updateStats() {
    var n = fireflies.length;
    if (n === 0) {
      jarStats.textContent = 'the jar is empty \u2014 add your first firefly';
    } else if (n === 1) {
      jarStats.textContent = '1 firefly alight';
    } else {
      jarStats.textContent = n + ' fireflies alight';
    }
  }

  /* ==================== DETAIL ==================== */
  function showDetail(f) {
    detailText.textContent = f.text;
    var d = new Date(f.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    fireflyDetail.classList.remove('hidden');
  }

  function hideDetail() {
    fireflyDetail.classList.add('hidden');
  }

  /* ==================== ADD ==================== */
  function openAdd() {
    addInput.value = '';
    addForm.classList.remove('hidden');
    setTimeout(function () { addInput.focus(); }, 100);
  }

  function closeAdd() {
    addForm.classList.add('hidden');
  }

  function saveFirefly() {
    var text = addInput.value.trim();
    if (!text) return;

    fireflies.push({ text: text, timestamp: Date.now() });
    save();
    closeAdd();
    render(true);
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
      render(false);
    }, 1200);
  });

  addBtn.addEventListener('click', openAdd);
  addCancel.addEventListener('click', closeAdd);
  addSave.addEventListener('click', saveFirefly);
  addInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveFirefly();
    }
  });

  detailClose.addEventListener('click', hideDetail);
  fireflyDetail.addEventListener('click', function (e) {
    if (e.target === fireflyDetail) hideDetail();
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
