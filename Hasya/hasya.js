/* ============================================================
   HASYA — the laugh
   A journal for what makes you laugh
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var laughs       = document.getElementById('laughs');
  var laughsEmpty  = document.getElementById('laughsEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var tagOptions   = document.getElementById('tagOptions');
  var laughDetail  = document.getElementById('laughDetail');
  var detailTag    = document.getElementById('detailTag');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-hasya-laughs';
  var entries = [];
  var selectedTag = '';

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
    var existing = laughs.querySelectorAll('.laugh-bubble');
    for (var i = 0; i < existing.length; i++) existing[i].parentNode.removeChild(existing[i]);

    if (entries.length === 0) {
      laughsEmpty.classList.remove('hidden');
      return;
    }

    laughsEmpty.classList.add('hidden');

    var sorted = entries.slice().reverse();
    sorted.forEach(function (e) {
      var bubble = document.createElement('div');
      bubble.className = 'laugh-bubble';

      var text = document.createElement('p');
      text.className = 'bubble-text';
      text.textContent = e.text;
      bubble.appendChild(text);

      var meta = document.createElement('div');
      meta.className = 'bubble-meta';

      if (e.tag) {
        var tagEl = document.createElement('span');
        tagEl.className = 'bubble-tag';
        tagEl.textContent = e.tag;
        meta.appendChild(tagEl);
      }

      var dateEl = document.createElement('span');
      var d = new Date(e.timestamp);
      dateEl.textContent = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      meta.appendChild(dateEl);

      bubble.appendChild(meta);

      bubble.addEventListener('click', function () { showDetail(e); });
      laughs.appendChild(bubble);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(e) {
    detailText.textContent = e.text;
    detailTag.innerHTML = '';
    if (e.tag) {
      var tagEl = document.createElement('span');
      tagEl.className = 'bubble-tag';
      tagEl.textContent = e.tag;
      detailTag.appendChild(tagEl);
    }
    var d = new Date(e.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    laughDetail.classList.remove('hidden');
  }

  function hideDetail() { laughDetail.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    selectedTag = '';
    var btns = tagOptions.querySelectorAll('.tag-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveLaugh() {
    var text = writeInput.value.trim();
    if (!text) return;
    entries.push({ text: text, tag: selectedTag, timestamp: Date.now() });
    save();
    closeWrite();
    render();
  }

  /* tag selection */
  var tagBtns = tagOptions.querySelectorAll('.tag-btn');
  for (var i = 0; i < tagBtns.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-tag');
        if (selectedTag === tag) {
          selectedTag = '';
          btn.classList.remove('selected');
        } else {
          selectedTag = tag;
          var all = tagOptions.querySelectorAll('.tag-btn');
          for (var j = 0; j < all.length; j++) all[j].classList.remove('selected');
          btn.classList.add('selected');
        }
      });
    })(tagBtns[i]);
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
  writeSave.addEventListener('click', saveLaugh);

  detailClose.addEventListener('click', hideDetail);
  laughDetail.addEventListener('click', function (e) { if (e.target === laughDetail) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
