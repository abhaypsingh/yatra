/* ============================================================
   NITI — the rule you live by
   A personal code carved from experience
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var rulesEl      = document.getElementById('rules');
  var rulesEmpty   = document.getElementById('rulesEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeOrigin  = document.getElementById('writeOrigin');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailNum    = document.getElementById('detailNum');
  var detailRule   = document.getElementById('detailRule');
  var detailOrigin = document.getElementById('detailOrigin');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-niti-rules';
  var rules = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) rules = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(rules)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    rulesEl.innerHTML = '';

    if (rules.length === 0) {
      rulesEmpty.classList.remove('hidden');
      return;
    }

    rulesEmpty.classList.add('hidden');

    rules.forEach(function (r, idx) {
      var card = document.createElement('div');
      card.className = 'rule-card';

      var num = document.createElement('span');
      num.className = 'rule-num';
      num.textContent = (idx + 1) + '.';
      card.appendChild(num);

      var text = document.createElement('p');
      text.className = 'rule-text';
      text.textContent = r.rule;
      card.appendChild(text);

      card.addEventListener('click', function () { showDetail(r, idx); });
      rulesEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(r, idx) {
    detailNum.textContent = 'rule ' + (idx + 1);
    detailRule.textContent = r.rule;
    detailOrigin.textContent = r.origin || '';
    detailOrigin.style.display = r.origin ? '' : 'none';
    var d = new Date(r.timestamp);
    detailDate.textContent = 'carved ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeOrigin.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveRule() {
    var rule = writeInput.value.trim();
    if (!rule) return;
    var origin = writeOrigin.value.trim();
    rules.push({ rule: rule, origin: origin, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveRule);
  writeOrigin.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveRule(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
