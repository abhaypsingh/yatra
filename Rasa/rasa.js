/* ============================================================
   RASA — the nine emotions
   Daily emotional check-in, mandala calendar, journal
   ============================================================ */

(function () {
  'use strict';

  /* ---------- the nine rasas ---------- */
  var RASAS = [
    { id: 'shringara', name: 'Shringara', meaning: 'love / beauty',   emoji: '\u2764',  color: '#e06888' },
    { id: 'hasya',     name: 'Hasya',     meaning: 'joy / laughter',   emoji: '\u263A',  color: '#f0c848' },
    { id: 'karuna',    name: 'Karuna',    meaning: 'compassion',       emoji: '\u2602',  color: '#7098c8' },
    { id: 'raudra',    name: 'Raudra',    meaning: 'anger',            emoji: '\u26A1',  color: '#d04030' },
    { id: 'veera',     name: 'Veera',     meaning: 'courage',          emoji: '\u2694',  color: '#e08830' },
    { id: 'bhayanaka', name: 'Bhayanaka', meaning: 'fear',             emoji: '\u25C8',  color: '#8868a8' },
    { id: 'bibhatsa',  name: 'Bibhatsa',  meaning: 'aversion',         emoji: '\u2620',  color: '#608068' },
    { id: 'adbhuta',   name: 'Adbhuta',   meaning: 'wonder',           emoji: '\u2728',  color: '#50b8d0' },
    { id: 'shanta',    name: 'Shanta',    meaning: 'peace',            emoji: '\u2600',  color: '#a0b8a0' }
  ];

  var STORAGE_KEY = 'rasa_journal';

  /* ---------- state ---------- */
  var state = {
    selected: [],
    writings: {}
  };

  /* ---------- DOM ---------- */
  var opening     = document.getElementById('opening');
  var beginBtn    = document.getElementById('beginBtn');
  var checkin     = document.getElementById('checkin');
  var checkinDate = document.getElementById('checkinDate');
  var rasaGrid    = document.getElementById('rasaGrid');
  var writingArea = document.getElementById('writingArea');
  var writingCards= document.getElementById('writingCards');
  var sealBtn     = document.getElementById('sealBtn');
  var mandala     = document.getElementById('mandala');
  var mandalaSub  = document.getElementById('mandalaSub');
  var mandalaCanvas = document.getElementById('mandalaCanvas');
  var mandalaLegend = document.getElementById('mandalaLegend');
  var todayBtn    = document.getElementById('todayBtn');
  var journalBtn  = document.getElementById('journalBtn');
  var journal     = document.getElementById('journal');
  var journalEntries = document.getElementById('journalEntries');
  var journalBack = document.getElementById('journalBack');
  var navFloat    = document.getElementById('navFloat');
  var navMandala  = document.getElementById('navMandala');
  var navAbout    = document.getElementById('navAbout');
  var aboutOverlay= document.getElementById('aboutOverlay');
  var aboutClose  = document.getElementById('aboutClose');

  /* ---------- persistence ---------- */
  function loadJournal() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
  }

  function saveEntry(dateKey, entry) {
    var all = loadJournal();
    all[dateKey] = entry;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function dateKey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function formatDateNice(d) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ---------- check if today already done ---------- */
  function todayDone() {
    var all = loadJournal();
    return !!all[dateKey(new Date())];
  }

  /* ---------- build rasa grid ---------- */
  function buildGrid() {
    rasaGrid.innerHTML = '';
    for (var i = 0; i < RASAS.length; i++) {
      (function (r) {
        var tile = document.createElement('div');
        tile.className = 'rasa-tile';
        tile.innerHTML =
          '<div class="rasa-emoji">' + r.emoji + '</div>' +
          '<div class="rasa-name">' + r.name + '</div>' +
          '<div class="rasa-meaning">' + r.meaning + '</div>';
        tile.addEventListener('click', function () {
          var idx = state.selected.indexOf(r.id);
          if (idx === -1) {
            state.selected.push(r.id);
            tile.classList.add('selected');
            tile.style.borderColor = r.color;
            tile.style.background = r.color + '18';
          } else {
            state.selected.splice(idx, 1);
            tile.classList.remove('selected');
            tile.style.borderColor = '';
            tile.style.background = '';
          }
          updateWritingCards();
        });
        rasaGrid.appendChild(tile);
      })(RASAS[i]);
    }
  }

  /* ---------- writing cards ---------- */
  function updateWritingCards() {
    if (state.selected.length === 0) {
      writingArea.classList.add('hidden');
      return;
    }
    writingArea.classList.remove('hidden');
    writingCards.innerHTML = '';
    for (var i = 0; i < state.selected.length; i++) {
      var r = findRasa(state.selected[i]);
      if (!r) continue;
      (function (rasa) {
        var card = document.createElement('div');
        card.className = 'writing-card';
        card.style.borderLeftColor = rasa.color;
        var label = document.createElement('div');
        label.className = 'writing-card-label';
        label.style.color = rasa.color;
        label.textContent = rasa.name + ' \u2014 ' + rasa.meaning;
        var ta = document.createElement('textarea');
        ta.placeholder = 'one line about this feeling today...';
        ta.value = state.writings[rasa.id] || '';
        ta.addEventListener('input', function () {
          state.writings[rasa.id] = ta.value;
        });
        card.appendChild(label);
        card.appendChild(ta);
        writingCards.appendChild(card);
      })(r);
    }
  }

  function findRasa(id) {
    for (var i = 0; i < RASAS.length; i++) {
      if (RASAS[i].id === id) return RASAS[i];
    }
    return null;
  }

  /* ---------- seal ---------- */
  sealBtn.addEventListener('click', function () {
    if (state.selected.length === 0) return;
    var entry = { rasas: [], timestamp: Date.now() };
    for (var i = 0; i < state.selected.length; i++) {
      entry.rasas.push({
        id: state.selected[i],
        text: state.writings[state.selected[i]] || ''
      });
    }
    saveEntry(dateKey(new Date()), entry);
    sealBtn.textContent = 'sealed \u2713';
    sealBtn.disabled = true;
    setTimeout(function () { showMandala(); }, 800);
  });

  /* ---------- mandala view ---------- */
  function showMandala() {
    checkin.classList.add('hidden');
    journal.classList.add('hidden');
    mandala.classList.remove('hidden');

    var all = loadJournal();
    var keys = Object.keys(all).sort();
    var count = keys.length;
    mandalaSub.textContent = count + ' day' + (count === 1 ? '' : 's') + ' of feeling';

    /* build 7-column calendar for last 12 weeks */
    mandalaCanvas.innerHTML = '';
    var now = new Date();
    var today = dateKey(now);
    var start = new Date(now);
    start.setDate(start.getDate() - 83); /* ~12 weeks back */
    /* align to Sunday */
    start.setDate(start.getDate() - start.getDay());

    for (var d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
      var dk = dateKey(d);
      var cell = document.createElement('div');
      cell.className = 'mandala-day';
      if (dk === today) cell.classList.add('today');

      if (all[dk]) {
        var rasaIds = [];
        for (var r = 0; r < all[dk].rasas.length; r++) {
          rasaIds.push(all[dk].rasas[r].id);
        }
        cell.style.background = blendColors(rasaIds);
        cell.title = formatDateNice(new Date(d)) + ': ' + rasaIds.join(', ');
      } else {
        cell.classList.add('empty');
      }
      mandalaCanvas.appendChild(cell);
    }

    /* legend */
    mandalaLegend.innerHTML = '';
    for (var i = 0; i < RASAS.length; i++) {
      var item = document.createElement('div');
      item.className = 'legend-item';
      var dot = document.createElement('span');
      dot.className = 'legend-dot';
      dot.style.background = RASAS[i].color;
      var label = document.createTextNode(RASAS[i].name);
      item.appendChild(dot);
      item.appendChild(label);
      mandalaLegend.appendChild(item);
    }
  }

  function blendColors(rasaIds) {
    if (rasaIds.length === 0) return 'var(--deep)';
    if (rasaIds.length === 1) {
      var r = findRasa(rasaIds[0]);
      return r ? r.color : 'var(--deep)';
    }
    /* simple average blend */
    var totalR = 0, totalG = 0, totalB = 0;
    for (var i = 0; i < rasaIds.length; i++) {
      var rasa = findRasa(rasaIds[i]);
      if (!rasa) continue;
      var rgb = hexToRgb(rasa.color);
      totalR += rgb.r; totalG += rgb.g; totalB += rgb.b;
    }
    var n = rasaIds.length;
    return 'rgb(' + Math.round(totalR / n) + ',' + Math.round(totalG / n) + ',' + Math.round(totalB / n) + ')';
  }

  function hexToRgb(hex) {
    var num = parseInt(hex.replace('#', ''), 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  /* ---------- journal view ---------- */
  function showJournal() {
    checkin.classList.add('hidden');
    mandala.classList.add('hidden');
    journal.classList.remove('hidden');

    var all = loadJournal();
    var keys = Object.keys(all).sort().reverse();
    journalEntries.innerHTML = '';

    if (keys.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'journal-empty';
      empty.textContent = 'No entries yet. Start your first check-in.';
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
      dateEl.textContent = formatDateNice(entryDate);
      div.appendChild(dateEl);

      for (var r = 0; r < entry.rasas.length; r++) {
        var row = document.createElement('div');
        row.className = 'journal-rasa-row';
        var rasa = findRasa(entry.rasas[r].id);
        var tag = document.createElement('span');
        tag.className = 'journal-rasa-tag';
        tag.style.background = rasa ? rasa.color : '#888';
        tag.textContent = rasa ? rasa.name : entry.rasas[r].id;
        var text = document.createElement('span');
        text.className = 'journal-rasa-text';
        text.textContent = entry.rasas[r].text || '\u2014';
        row.appendChild(tag);
        row.appendChild(text);
        div.appendChild(row);
      }
      journalEntries.appendChild(div);
    }
  }

  /* ---------- navigation ---------- */
  function showCheckin() {
    mandala.classList.add('hidden');
    journal.classList.add('hidden');
    checkin.classList.remove('hidden');
    state.selected = [];
    state.writings = {};
    sealBtn.textContent = 'seal today';
    sealBtn.disabled = false;
    checkinDate.textContent = formatDateNice(new Date());
    buildGrid();
    writingArea.classList.add('hidden');
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      if (todayDone()) {
        showMandala();
      } else {
        showCheckin();
      }
    }, 1200);
  });

  todayBtn.addEventListener('click', function () {
    if (todayDone()) {
      /* already done — show mandala with message */
      showMandala();
    } else {
      showCheckin();
    }
  });

  journalBtn.addEventListener('click', showJournal);
  journalBack.addEventListener('click', showMandala);

  navMandala.addEventListener('click', function () {
    var all = loadJournal();
    if (Object.keys(all).length > 0) {
      showMandala();
    }
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
