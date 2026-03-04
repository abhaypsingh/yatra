/* ============================================================
   SAMVAD — the conversation
   Capture the conversations that changed something in you
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var convosEl     = document.getElementById('convos');
  var convosEmpty  = document.getElementById('convosEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeWho     = document.getElementById('writeWho');
  var writeInput   = document.getElementById('writeInput');
  var writeWhy     = document.getElementById('writeWhy');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailWho    = document.getElementById('detailWho');
  var detailWords  = document.getElementById('detailWords');
  var detailWhyEl  = document.getElementById('detailWhy');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-samvad-convos';
  var convos = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) convos = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(convos)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    convosEl.innerHTML = '';

    if (convos.length === 0) {
      convosEmpty.classList.remove('hidden');
      return;
    }

    convosEmpty.classList.add('hidden');

    var sorted = convos.slice().reverse();
    sorted.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'convo-card';

      if (c.who) {
        var who = document.createElement('p');
        who.className = 'convo-who';
        who.textContent = c.who;
        card.appendChild(who);
      }

      var words = document.createElement('p');
      words.className = 'convo-words';
      words.textContent = c.words;
      card.appendChild(words);

      card.addEventListener('click', function () { showDetail(c); });
      convosEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(c) {
    detailWho.textContent = c.who || 'a conversation';
    detailWords.textContent = c.words;
    detailWhyEl.textContent = c.why || '';
    detailWhyEl.style.display = c.why ? '' : 'none';
    var d = new Date(c.timestamp);
    detailDate.textContent = 'remembered ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeWho.value = '';
    writeInput.value = '';
    writeWhy.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeWho.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveConvo() {
    var words = writeInput.value.trim();
    if (!words) return;
    var who = writeWho.value.trim();
    var why = writeWhy.value.trim();
    convos.push({ who: who, words: words, why: why, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveConvo);
  writeWhy.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveConvo(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
