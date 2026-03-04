/* ============================================================
   PRATIDAAN — the gift returned
   A practice of giving something back every day
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var streakEl     = document.getElementById('streak');
  var giftsEl      = document.getElementById('gifts');
  var giftsEmpty   = document.getElementById('giftsEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeFor     = document.getElementById('writeFor');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailText   = document.getElementById('detailText');
  var detailFor    = document.getElementById('detailFor');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-pratidaan-gifts';
  var gifts = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) gifts = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(gifts)); }
    catch (e) {}
  }

  /* ==================== STREAK ==================== */
  function dayKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function calcStreak() {
    if (gifts.length === 0) return 0;

    var days = {};
    gifts.forEach(function (g) { days[dayKey(g.timestamp)] = true; });

    var streak = 0;
    var now = new Date();
    /* check from today backwards */
    for (var i = 0; i < 365; i++) {
      var check = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      var key = check.getFullYear() + '-' + (check.getMonth() + 1) + '-' + check.getDate();
      if (days[key]) {
        streak++;
      } else {
        /* allow skipping today if no entry yet — streak counts from yesterday */
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  }

  /* ==================== RENDER ==================== */
  function render() {
    giftsEl.innerHTML = '';

    var streak = calcStreak();
    if (streak > 0) {
      streakEl.textContent = streak + ' day' + (streak !== 1 ? 's' : '') + ' of giving';
      streakEl.style.display = '';
    } else {
      streakEl.style.display = 'none';
    }

    if (gifts.length === 0) {
      giftsEmpty.classList.remove('hidden');
      return;
    }

    giftsEmpty.classList.add('hidden');

    var sorted = gifts.slice().reverse();
    sorted.forEach(function (g) {
      var card = document.createElement('div');
      card.className = 'gift-card';

      var text = document.createElement('p');
      text.className = 'gift-text';
      text.textContent = g.text;
      card.appendChild(text);

      var meta = document.createElement('div');
      meta.className = 'gift-meta';

      var forEl = document.createElement('span');
      forEl.className = 'gift-for';
      forEl.textContent = g.forWho ? 'for ' + g.forWho : '';
      meta.appendChild(forEl);

      var dateEl = document.createElement('span');
      dateEl.className = 'gift-date-small';
      var d = new Date(g.timestamp);
      dateEl.textContent = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      meta.appendChild(dateEl);

      card.appendChild(meta);

      card.addEventListener('click', function () { showDetail(g); });
      giftsEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(g) {
    detailText.textContent = g.text;
    detailFor.textContent = g.forWho ? 'for ' + g.forWho : '';
    detailFor.style.display = g.forWho ? '' : 'none';
    var d = new Date(g.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeFor.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveGift() {
    var text = writeInput.value.trim();
    if (!text) return;
    var forWho = writeFor.value.trim();
    gifts.push({ text: text, forWho: forWho, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveGift);
  writeFor.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); saveGift(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
