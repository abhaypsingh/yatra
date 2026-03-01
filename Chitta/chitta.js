/* ============================================================
   CHITTA — the mind-canvas
   Daily one-word mood mosaic
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var mosaic       = document.getElementById('mosaic');
  var mosaicCount  = document.getElementById('mosaicCount');
  var addBtn       = document.getElementById('addBtn');
  var addView      = document.getElementById('addView');
  var colorGrid    = document.getElementById('colorGrid');
  var addWord      = document.getElementById('addWord');
  var addCancel    = document.getElementById('addCancel');
  var addSave      = document.getElementById('addSave');
  var tileDetail   = document.getElementById('tileDetail');
  var detailSwatch = document.getElementById('detailSwatch');
  var detailWord   = document.getElementById('detailWord');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-chitta-tiles';
  var tiles = [];
  var selectedColor = '';

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) tiles = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(tiles)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render(animateLast) {
    mosaic.innerHTML = '';

    if (tiles.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'mosaic-empty';
      empty.textContent = 'Your canvas is blank. Tap + to place your first tile.';
      mosaic.appendChild(empty);
      mosaicCount.textContent = '';
      return;
    }

    tiles.forEach(function (t, i) {
      var el = document.createElement('div');
      el.className = 'tile';
      el.style.background = t.color;

      if (animateLast && i === tiles.length - 1) {
        el.style.animationDelay = '0s';
      } else {
        el.style.animation = 'none';
      }

      el.setAttribute('title', t.word);

      el.addEventListener('click', function () {
        showDetail(t);
      });

      mosaic.appendChild(el);
    });

    mosaicCount.textContent = tiles.length + (tiles.length === 1 ? ' tile' : ' tiles');
  }

  /* ==================== DETAIL ==================== */
  function showDetail(t) {
    detailSwatch.style.background = t.color;
    detailWord.textContent = t.word;
    var d = new Date(t.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    tileDetail.classList.remove('hidden');
  }

  function hideDetail() {
    tileDetail.classList.add('hidden');
  }

  /* ==================== ADD ==================== */
  function openAdd() {
    selectedColor = '';
    addWord.value = '';
    var btns = colorGrid.querySelectorAll('.color-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');
    addView.classList.remove('hidden');
  }

  function closeAdd() {
    addView.classList.add('hidden');
  }

  function saveTile() {
    var word = addWord.value.trim();
    if (!word || !selectedColor) return;

    tiles.push({
      word: word,
      color: selectedColor,
      timestamp: Date.now()
    });
    save();
    closeAdd();
    render(true);
  }

  /* color selection */
  var colorBtns = colorGrid.querySelectorAll('.color-btn');
  for (var i = 0; i < colorBtns.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        for (var j = 0; j < colorBtns.length; j++) colorBtns[j].classList.remove('selected');
        btn.classList.add('selected');
        selectedColor = btn.getAttribute('data-color');
      });
    })(colorBtns[i]);
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
  addSave.addEventListener('click', saveTile);
  addWord.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); saveTile(); }
  });

  detailClose.addEventListener('click', hideDetail);
  tileDetail.addEventListener('click', function (e) {
    if (e.target === tileDetail) hideDetail();
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
