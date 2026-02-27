/* ============================================================
   SUTRA — the thread
   Collect sentences that changed you
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var threadView   = document.getElementById('threadView');
  var threadCount  = document.getElementById('threadCount');
  var threadLine   = document.getElementById('threadLine');
  var addBeadBtn   = document.getElementById('addBeadBtn');
  var addView      = document.getElementById('addView');
  var beadText     = document.getElementById('beadText');
  var sourceRow    = document.getElementById('sourceRow');
  var sourceNote   = document.getElementById('sourceNote');
  var saveBeadBtn  = document.getElementById('saveBeadBtn');
  var cancelBeadBtn = document.getElementById('cancelBeadBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORAGE_KEY = 'yatra-sutra-beads';
  var selectedSource = 'book';

  var SOURCE_LABELS = {
    book: 'book',
    person: 'a person',
    song: 'song',
    self: 'myself',
    unknown: 'unknown'
  };

  /* ==================== STORAGE ==================== */
  function loadBeads() {
    try {
      var d = localStorage.getItem(STORAGE_KEY);
      return d ? JSON.parse(d) : [];
    } catch (e) { return []; }
  }

  function saveBeads(beads) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(beads)); }
    catch (e) {}
  }

  /* ==================== SCREENS ==================== */
  var screens = [threadView, addView];

  function showScreen(screen) {
    screens.forEach(function (s) { s.classList.add('hidden'); });
    screen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==================== THREAD ==================== */
  function renderThread() {
    var beads = loadBeads();
    threadLine.innerHTML = '';

    threadCount.textContent = beads.length === 0
      ? 'Your thread is empty'
      : beads.length + ' bead' + (beads.length === 1 ? '' : 's') + ' on your thread';

    if (beads.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'thread-empty';
      empty.textContent = 'No beads yet. What sentence changed you?';
      threadLine.appendChild(empty);
      return;
    }

    beads.forEach(function (bead, index) {
      var el = document.createElement('div');
      el.className = 'bead';

      var text = document.createElement('div');
      text.className = 'bead-text';
      text.textContent = '\u201C' + bead.text + '\u201D';
      el.appendChild(text);

      var meta = document.createElement('div');
      meta.className = 'bead-meta';

      var tag = document.createElement('span');
      tag.className = 'bead-source-tag';
      tag.textContent = SOURCE_LABELS[bead.source] || bead.source;
      meta.appendChild(tag);

      if (bead.note) {
        var note = document.createElement('span');
        note.className = 'bead-source-note';
        note.textContent = bead.note;
        meta.appendChild(note);
      }

      var date = document.createElement('span');
      date.className = 'bead-date';
      var d = new Date(bead.timestamp);
      date.textContent = d.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
      meta.appendChild(date);

      el.appendChild(meta);

      var del = document.createElement('button');
      del.className = 'bead-delete';
      del.textContent = 'remove';
      del.addEventListener('click', function () {
        var b = loadBeads();
        b.splice(index, 1);
        saveBeads(b);
        renderThread();
      });
      el.appendChild(del);

      threadLine.appendChild(el);
    });
  }

  /* ==================== ADD VIEW ==================== */
  function openAdd() {
    beadText.value = '';
    sourceNote.value = '';
    selectedSource = 'book';
    updateSourceButtons();
    showScreen(addView);
    beadText.focus();
  }

  function updateSourceButtons() {
    var btns = sourceRow.querySelectorAll('.source-btn');
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-source') === selectedSource);
    });
  }

  /* source button clicks */
  var sourceBtns = sourceRow.querySelectorAll('.source-btn');
  sourceBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedSource = btn.getAttribute('data-source');
      updateSourceButtons();
    });
  });

  addBeadBtn.addEventListener('click', openAdd);

  cancelBeadBtn.addEventListener('click', function () {
    renderThread();
    showScreen(threadView);
  });

  saveBeadBtn.addEventListener('click', function () {
    var text = beadText.value.trim();
    if (!text) return;

    var beads = loadBeads();
    beads.unshift({
      text: text,
      source: selectedSource,
      note: sourceNote.value.trim(),
      timestamp: Date.now()
    });
    saveBeads(beads);

    renderThread();
    showScreen(threadView);
  });

  /* ==================== BEGIN ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      renderThread();
      showScreen(threadView);
    }, 1200);
  });

  /* ==================== ABOUT ==================== */
  navAbout.addEventListener('click', function () {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  });

  function closeAbout() {
    aboutOverlay.classList.remove('visible');
    setTimeout(function () { aboutOverlay.classList.add('hidden'); }, 400);
  }

  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
