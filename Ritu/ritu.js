/* ============================================================
   RITU — the season within
   Track your inner seasons through the year
   ============================================================ */

(function () {
  'use strict';

  /* ==================== SEASON DATA ==================== */
  var SEASONS = {
    spring: { icon: '\uD83C\uDF31', label: 'Spring' },
    summer: { icon: '\u2600\uFE0F', label: 'Summer' },
    autumn: { icon: '\uD83C\uDF42', label: 'Autumn' },
    winter: { icon: '\u2744\uFE0F', label: 'Winter' }
  };

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var entriesEl    = document.getElementById('entries');
  var entriesEmpty = document.getElementById('entriesEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var seasonPicker = document.getElementById('seasonPicker');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailIcon   = document.getElementById('detailIcon');
  var detailSeason = document.getElementById('detailSeason');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-ritu-seasons';
  var entries = [];
  var selectedSeason = '';

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
    entriesEl.innerHTML = '';

    if (entries.length === 0) {
      entriesEmpty.classList.remove('hidden');
      return;
    }

    entriesEmpty.classList.add('hidden');

    entries.slice().reverse().forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'entry-card';

      var icon = document.createElement('div');
      icon.className = 'entry-icon';
      var s = SEASONS[entry.season] || SEASONS.spring;
      icon.textContent = s.icon;
      card.appendChild(icon);

      var body = document.createElement('div');
      body.className = 'entry-body';

      var season = document.createElement('div');
      season.className = 'entry-season';
      season.textContent = s.label;
      body.appendChild(season);

      if (entry.text) {
        var text = document.createElement('p');
        text.className = 'entry-text';
        text.textContent = entry.text;
        body.appendChild(text);
      }

      card.appendChild(body);
      card.addEventListener('click', function () { showDetail(entry); });
      entriesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(entry) {
    var s = SEASONS[entry.season] || SEASONS.spring;
    detailIcon.textContent = s.icon;
    detailSeason.textContent = s.label;
    detailText.textContent = entry.text || '';
    var d = new Date(entry.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    selectedSeason = '';
    writeInput.value = '';
    var btns = seasonPicker.querySelectorAll('.season-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');
    writeView.classList.remove('hidden');
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveEntry() {
    if (!selectedSeason) return;
    var text = writeInput.value.trim();
    entries.push({ season: selectedSeason, text: text, timestamp: Date.now() });
    save();
    closeWrite();
    render();
  }

  /* season picker */
  seasonPicker.addEventListener('click', function (e) {
    var btn = e.target.closest('.season-btn');
    if (!btn) return;
    selectedSeason = btn.getAttribute('data-season');
    var btns = seasonPicker.querySelectorAll('.season-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');
    btn.classList.add('selected');
  });

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
  writeSave.addEventListener('click', saveEntry);

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
