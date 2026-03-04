/* ============================================================
   AABHAAR — gratitude
   Three things a day, a thousand gifts a year
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var countEl      = document.getElementById('count');
  var daysEl       = document.getElementById('days');
  var daysEmpty    = document.getElementById('daysEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeItem1   = document.getElementById('writeItem1');
  var writeItem2   = document.getElementById('writeItem2');
  var writeItem3   = document.getElementById('writeItem3');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-aabhaar-days';
  var days = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) days = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(days)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    daysEl.innerHTML = '';

    /* total gratitudes */
    var total = 0;
    days.forEach(function (d) { total += d.items.length; });

    if (days.length === 0) {
      countEl.textContent = '';
      daysEmpty.classList.remove('hidden');
      return;
    }

    daysEmpty.classList.add('hidden');
    countEl.textContent = total + ' gratitude' + (total === 1 ? '' : 's') + ' so far';

    days.slice().reverse().forEach(function (day) {
      var card = document.createElement('div');
      card.className = 'day-card';

      var date = document.createElement('div');
      date.className = 'day-date';
      var d = new Date(day.timestamp);
      date.textContent = d.toLocaleDateString(undefined, {
        weekday: 'short', day: 'numeric', month: 'long'
      });
      card.appendChild(date);

      var list = document.createElement('ul');
      list.className = 'day-list';

      day.items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'day-item';
        li.textContent = item;
        list.appendChild(li);
      });

      card.appendChild(list);
      daysEl.appendChild(card);
    });
  }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeItem1.value = '';
    writeItem2.value = '';
    writeItem3.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeItem1.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveDay() {
    var items = [];
    var v1 = writeItem1.value.trim();
    var v2 = writeItem2.value.trim();
    var v3 = writeItem3.value.trim();
    if (v1) items.push(v1);
    if (v2) items.push(v2);
    if (v3) items.push(v3);
    if (items.length === 0) return;

    days.push({ items: items, timestamp: Date.now() });
    save();
    closeWrite();
    render();
  }

  /* tab between inputs */
  writeItem1.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); writeItem2.focus(); }
  });
  writeItem2.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); writeItem3.focus(); }
  });
  writeItem3.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); saveDay(); }
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
  writeSave.addEventListener('click', saveDay);

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
