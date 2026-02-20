/* ============================================================
   STUTI — praise
   Daily gratitude: one person, one moment, one ordinary thing
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'stuti_tapestry';
  var COLORS = { person: '#d09060', moment: '#c8a848', thing: '#90a870' };

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var checkin       = document.getElementById('checkin');
  var checkinDate   = document.getElementById('checkinDate');
  var personName    = document.getElementById('personName');
  var personWhy     = document.getElementById('personWhy');
  var momentName    = document.getElementById('momentName');
  var momentWhy     = document.getElementById('momentWhy');
  var thingName     = document.getElementById('thingName');
  var thingWhy      = document.getElementById('thingWhy');
  var sealBtn       = document.getElementById('sealBtn');
  var tapestry      = document.getElementById('tapestry');
  var tapestrySub   = document.getElementById('tapestrySub');
  var tapestryGrid  = document.getElementById('tapestryGrid');
  var todayBtn      = document.getElementById('todayBtn');
  var journalBtn    = document.getElementById('journalBtn');
  var journal       = document.getElementById('journal');
  var journalEntries= document.getElementById('journalEntries');
  var journalBack   = document.getElementById('journalBack');
  var navFloat      = document.getElementById('navFloat');
  var navTapestry   = document.getElementById('navTapestry');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- persistence ---------- */
  function loadAll() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
  }

  function saveEntry(key, entry) {
    var all = loadAll();
    all[key] = entry;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function dkey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function formatDate(d) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function todayDone() { return !!loadAll()[dkey(new Date())]; }

  /* ---------- show check-in ---------- */
  function showCheckin() {
    tapestry.classList.add('hidden');
    journal.classList.add('hidden');
    checkin.classList.remove('hidden');
    checkinDate.textContent = formatDate(new Date());
    personName.value = ''; personWhy.value = '';
    momentName.value = ''; momentWhy.value = '';
    thingName.value = ''; thingWhy.value = '';
    sealBtn.textContent = 'weave into tapestry';
    sealBtn.disabled = false;
  }

  /* ---------- seal ---------- */
  sealBtn.addEventListener('click', function () {
    if (!personName.value.trim() && !momentName.value.trim() && !thingName.value.trim()) return;
    var entry = {
      timestamp: Date.now(),
      person: { name: personName.value.trim(), why: personWhy.value.trim() },
      moment: { name: momentName.value.trim(), why: momentWhy.value.trim() },
      thing:  { name: thingName.value.trim(),  why: thingWhy.value.trim() }
    };
    saveEntry(dkey(new Date()), entry);
    sealBtn.textContent = 'woven \u2713';
    sealBtn.disabled = true;
    setTimeout(showTapestry, 800);
  });

  /* ---------- tapestry view ---------- */
  function showTapestry() {
    checkin.classList.add('hidden');
    journal.classList.add('hidden');
    tapestry.classList.remove('hidden');

    var all = loadAll();
    var keys = Object.keys(all);
    tapestrySub.textContent = keys.length + ' day' + (keys.length === 1 ? '' : 's') + ' of gratitude';

    tapestryGrid.innerHTML = '';
    var now = new Date();
    var today = dkey(now);
    var start = new Date(now);
    start.setDate(start.getDate() - 83);
    start.setDate(start.getDate() - start.getDay());

    for (var d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
      var dk = dkey(d);
      var cell = document.createElement('div');
      cell.className = 'tapestry-day';
      if (dk === today) cell.classList.add('today');

      if (all[dk]) {
        cell.classList.add('filled');
        var e = all[dk];
        var s1 = document.createElement('div');
        s1.className = 'tapestry-stripe';
        s1.style.background = e.person.name ? COLORS.person : 'var(--surface)';
        var s2 = document.createElement('div');
        s2.className = 'tapestry-stripe';
        s2.style.background = e.moment.name ? COLORS.moment : 'var(--surface)';
        var s3 = document.createElement('div');
        s3.className = 'tapestry-stripe';
        s3.style.background = e.thing.name ? COLORS.thing : 'var(--surface)';
        cell.appendChild(s1);
        cell.appendChild(s2);
        cell.appendChild(s3);
        cell.title = formatDate(new Date(d));
      } else {
        cell.classList.add('empty');
      }
      tapestryGrid.appendChild(cell);
    }
  }

  /* ---------- journal ---------- */
  function showJournal() {
    checkin.classList.add('hidden');
    tapestry.classList.add('hidden');
    journal.classList.remove('hidden');

    var all = loadAll();
    var keys = Object.keys(all).sort().reverse();
    journalEntries.innerHTML = '';

    if (keys.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'journal-empty';
      empty.textContent = 'No entries yet.';
      journalEntries.appendChild(empty);
      return;
    }

    for (var k = 0; k < keys.length; k++) {
      var entry = all[keys[k]];
      var parts = keys[k].split('-');
      var entryDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      var div = document.createElement('div');
      div.className = 'journal-entry';
      var dateEl = document.createElement('div');
      dateEl.className = 'journal-entry-date';
      dateEl.textContent = formatDate(entryDate);
      div.appendChild(dateEl);

      var types = [
        { key: 'person', label: 'person', color: COLORS.person },
        { key: 'moment', label: 'moment', color: COLORS.moment },
        { key: 'thing',  label: 'thing',  color: COLORS.thing }
      ];
      for (var t = 0; t < types.length; t++) {
        var item = entry[types[t].key];
        if (item && item.name) {
          var row = document.createElement('div');
          row.className = 'journal-item';
          var typeLabel = document.createElement('div');
          typeLabel.className = 'journal-item-type';
          typeLabel.style.color = types[t].color;
          typeLabel.textContent = types[t].label;
          var nameEl = document.createElement('div');
          nameEl.className = 'journal-item-name';
          nameEl.textContent = item.name;
          row.appendChild(typeLabel);
          row.appendChild(nameEl);
          if (item.why) {
            var whyEl = document.createElement('div');
            whyEl.className = 'journal-item-why';
            whyEl.textContent = item.why;
            row.appendChild(whyEl);
          }
          div.appendChild(row);
        }
      }
      journalEntries.appendChild(div);
    }
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      if (todayDone()) { showTapestry(); } else { showCheckin(); }
    }, 1200);
  });

  todayBtn.addEventListener('click', function () {
    if (todayDone()) { showTapestry(); } else { showCheckin(); }
  });
  journalBtn.addEventListener('click', showJournal);
  journalBack.addEventListener('click', showTapestry);
  navTapestry.addEventListener('click', function () {
    if (Object.keys(loadAll()).length > 0) showTapestry();
  });

  navAbout.addEventListener('click', function () {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  });
  aboutClose.addEventListener('click', function () {
    aboutOverlay.classList.remove('visible');
    setTimeout(function () { aboutOverlay.classList.add('hidden'); }, 400);
  });
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) {
      aboutOverlay.classList.remove('visible');
      setTimeout(function () { aboutOverlay.classList.add('hidden'); }, 400);
    }
  });

})();
