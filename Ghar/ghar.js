/* ============================================================
   GHAR — home
   A sensory portrait of what home feels like
   ============================================================ */

(function () {
  'use strict';

  var PROMPTS = {
    sound: 'What does home sound like?',
    smell: 'What does home smell like?',
    sight: 'What does home look like — what do you see?',
    touch: 'What does home feel like when you touch it?',
    taste: 'What does home taste like?'
  };

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var sensesEl     = document.getElementById('senses');
  var memoriesEl   = document.getElementById('memories');
  var memEmpty     = document.getElementById('memEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writePrompt  = document.getElementById('writePrompt');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var memDetail    = document.getElementById('memDetail');
  var detailSense  = document.getElementById('detailSense');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-ghar-memories';
  var entries = [];
  var currentSense = '';

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
    /* update sense buttons */
    var filled = {};
    entries.forEach(function (e) { if (e.sense) filled[e.sense] = true; });

    var btns = sensesEl.querySelectorAll('.sense-btn');
    for (var i = 0; i < btns.length; i++) {
      var s = btns[i].getAttribute('data-sense');
      if (filled[s]) btns[i].classList.add('filled');
      else btns[i].classList.remove('filled');
    }

    /* render memory cards */
    var existing = memoriesEl.querySelectorAll('.mem-card');
    for (var j = 0; j < existing.length; j++) existing[j].parentNode.removeChild(existing[j]);

    if (entries.length === 0) {
      memEmpty.classList.remove('hidden');
      return;
    }

    memEmpty.classList.add('hidden');

    var sorted = entries.slice().reverse();
    sorted.forEach(function (e) {
      var card = document.createElement('div');
      card.className = 'mem-card';

      if (e.sense) {
        var tag = document.createElement('p');
        tag.className = 'mem-sense-tag';
        tag.textContent = e.sense;
        card.appendChild(tag);
      }

      var text = document.createElement('p');
      text.className = 'mem-text';
      text.textContent = e.text;
      card.appendChild(text);

      card.addEventListener('click', function () { showDetail(e); });
      memoriesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(e) {
    detailSense.textContent = e.sense || 'memory';
    detailText.textContent = e.text;
    var d = new Date(e.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    memDetail.classList.remove('hidden');
  }

  function hideDetail() { memDetail.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite(sense) {
    currentSense = sense || '';
    writePrompt.textContent = sense ? PROMPTS[sense] : 'What is one piece of home you carry with you?';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveMemory() {
    var text = writeInput.value.trim();
    if (!text) return;
    entries.push({ text: text, sense: currentSense, timestamp: Date.now() });
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

  /* sense buttons */
  var senseBtns = sensesEl.querySelectorAll('.sense-btn');
  for (var k = 0; k < senseBtns.length; k++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        openWrite(btn.getAttribute('data-sense'));
      });
    })(senseBtns[k]);
  }

  addBtn.addEventListener('click', function () { openWrite(''); });
  writeCancel.addEventListener('click', closeWrite);
  writeSave.addEventListener('click', saveMemory);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveMemory(); }
  });

  detailClose.addEventListener('click', hideDetail);
  memDetail.addEventListener('click', function (e) { if (e.target === memDetail) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
