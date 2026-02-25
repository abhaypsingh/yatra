/* ============================================================
   DARPAN — the mirror
   Daily emotional check-in with calendar view
   ============================================================ */

(function () {
  'use strict';

  /* ==================== EMOTIONS ==================== */
  var EMOTIONS = [
    { key: 'joy',        name: 'Joy',        color: '#c8a848' },
    { key: 'peace',      name: 'Peace',      color: '#6898b8' },
    { key: 'love',       name: 'Love',       color: '#c07888' },
    { key: 'gratitude',  name: 'Gratitude',  color: '#b89050' },
    { key: 'hope',       name: 'Hope',       color: '#78b880' },
    { key: 'courage',    name: 'Courage',    color: '#d09040' },
    { key: 'sadness',    name: 'Sadness',    color: '#6878a8' },
    { key: 'anger',      name: 'Anger',      color: '#c06050' },
    { key: 'fear',       name: 'Fear',       color: '#8868a8' },
    { key: 'loneliness', name: 'Loneliness', color: '#5868a0' },
    { key: 'confusion',  name: 'Confusion',  color: '#8878a0' },
    { key: 'anxiety',    name: 'Anxiety',    color: '#508888' }
  ];

  var MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var checkinView  = document.getElementById('checkinView');
  var todayBanner  = document.getElementById('todayBanner');
  var emotionGrid  = document.getElementById('emotionGrid');
  var writeView    = document.getElementById('writeView');
  var writeEmotion = document.getElementById('writeEmotion');
  var writeArea    = document.getElementById('writeArea');
  var saveBtn      = document.getElementById('saveBtn');
  var savedView    = document.getElementById('savedView');
  var savedDot     = document.getElementById('savedDot');
  var calendarBtn  = document.getElementById('calendarBtn');
  var redoBtn      = document.getElementById('redoBtn');
  var calendarView = document.getElementById('calendarView');
  var calMonth     = document.getElementById('calMonth');
  var calPrev      = document.getElementById('calPrev');
  var calNext      = document.getElementById('calNext');
  var calGrid      = document.getElementById('calGrid');
  var calStats     = document.getElementById('calStats');
  var calDetail    = document.getElementById('calDetail');
  var detailDate   = document.getElementById('detailDate');
  var detailEmotion = document.getElementById('detailEmotion');
  var detailText   = document.getElementById('detailText');
  var calBack      = document.getElementById('calBack');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORAGE_KEY = 'yatra-darpan-entries';
  var selectedEmotion = null;
  var viewYear = new Date().getFullYear();
  var viewMonth = new Date().getMonth();

  /* ==================== STORAGE ==================== */
  function loadEntries() {
    try {
      var d = localStorage.getItem(STORAGE_KEY);
      return d ? JSON.parse(d) : {};
    } catch (e) { return {}; }
  }

  function saveEntries(entries) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }
    catch (e) {}
  }

  /* ==================== DATE HELPERS ==================== */
  function todayKey() {
    var d = new Date();
    return dateKey(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function dateKey(y, m, d) {
    var ms = (m + 1).toString(); if (ms.length === 1) ms = '0' + ms;
    var ds = d.toString(); if (ds.length === 1) ds = '0' + ds;
    return y + '-' + ms + '-' + ds;
  }

  function formatDateKey(key) {
    var parts = key.split('-');
    return MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
  }

  function getEmotionByKey(key) {
    for (var i = 0; i < EMOTIONS.length; i++) {
      if (EMOTIONS[i].key === key) return EMOTIONS[i];
    }
    return null;
  }

  /* ==================== SCREEN MANAGEMENT ==================== */
  var screens = [checkinView, writeView, savedView, calendarView];

  function showScreen(screen) {
    screens.forEach(function (s) { s.classList.add('hidden'); });
    screen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==================== BUILD EMOTION GRID ==================== */
  function buildEmotionGrid() {
    emotionGrid.innerHTML = '';
    EMOTIONS.forEach(function (em) {
      var card = document.createElement('div');
      card.className = 'emotion-card';
      card.style.setProperty('--emotion-color', em.color);
      card.innerHTML =
        '<span class="emotion-dot"></span>' +
        '<span class="emotion-name">' + em.name + '</span>';
      card.addEventListener('click', function () {
        selectedEmotion = em;
        openWriteView(em);
      });
      emotionGrid.appendChild(card);
    });

    /* show today banner if already checked in */
    var entries = loadEntries();
    var today = entries[todayKey()];
    if (today) {
      var em = getEmotionByKey(today.emotion);
      todayBanner.innerHTML =
        '<span class="banner-dot" style="background:' + (em ? em.color : '#888') + '"></span>' +
        'Today you felt <strong>' + (em ? em.name.toLowerCase() : today.emotion) + '</strong>' +
        '<span class="banner-link" id="bannerCalendar">see your days</span>';
      todayBanner.classList.remove('hidden');
      document.getElementById('bannerCalendar').addEventListener('click', function () {
        openCalendar();
      });
    } else {
      todayBanner.classList.add('hidden');
    }
  }

  /* ==================== WRITE VIEW ==================== */
  function openWriteView(em) {
    writeEmotion.textContent = em.name;
    writeEmotion.style.color = em.color;
    writeArea.value = '';
    showScreen(writeView);
    writeArea.focus();
  }

  /* ==================== SAVE ==================== */
  saveBtn.addEventListener('click', function () {
    if (!selectedEmotion) return;

    var entries = loadEntries();
    entries[todayKey()] = {
      emotion: selectedEmotion.key,
      text: writeArea.value.trim(),
      timestamp: Date.now()
    };
    saveEntries(entries);

    savedDot.style.background = selectedEmotion.color;
    showScreen(savedView);
  });

  /* ==================== SAVED ACTIONS ==================== */
  calendarBtn.addEventListener('click', function () {
    openCalendar();
  });

  redoBtn.addEventListener('click', function () {
    buildEmotionGrid();
    showScreen(checkinView);
  });

  /* ==================== CALENDAR ==================== */
  function openCalendar() {
    viewYear = new Date().getFullYear();
    viewMonth = new Date().getMonth();
    renderCalendar();
    showScreen(calendarView);
  }

  calPrev.addEventListener('click', function () {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  });

  calNext.addEventListener('click', function () {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  });

  calBack.addEventListener('click', function () {
    buildEmotionGrid();
    showScreen(checkinView);
  });

  function renderCalendar() {
    calMonth.textContent = MONTHS[viewMonth] + ' ' + viewYear;
    calGrid.innerHTML = '';
    calDetail.classList.add('hidden');

    var entries = loadEntries();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    var firstDay = new Date(viewYear, viewMonth, 1).getDay();
    var today = todayKey();

    /* blank cells before 1st */
    for (var b = 0; b < firstDay; b++) {
      var blank = document.createElement('div');
      blank.className = 'cal-cell';
      calGrid.appendChild(blank);
    }

    /* day cells */
    for (var d = 1; d <= daysInMonth; d++) {
      var key = dateKey(viewYear, viewMonth, d);
      var cell = document.createElement('div');
      cell.className = 'cal-cell';
      if (key === today) cell.classList.add('is-today');

      var num = document.createElement('span');
      num.className = 'cal-num';
      num.textContent = d;
      cell.appendChild(num);

      var entry = entries[key];
      if (entry) {
        cell.classList.add('has-entry');
        var em = getEmotionByKey(entry.emotion);
        var dot = document.createElement('span');
        dot.className = 'cal-entry-dot';
        dot.style.background = em ? em.color : '#888';
        cell.appendChild(dot);

        (function (k, e) {
          cell.addEventListener('click', function () {
            showDetail(k, e);
          });
        })(key, entry);
      }

      calGrid.appendChild(cell);
    }

    /* stats */
    var monthEntries = 0;
    for (var dd = 1; dd <= daysInMonth; dd++) {
      if (entries[dateKey(viewYear, viewMonth, dd)]) monthEntries++;
    }

    var streak = getStreak(entries);
    var parts = [];
    if (monthEntries > 0) parts.push(monthEntries + ' day' + (monthEntries === 1 ? '' : 's') + ' this month');
    if (streak > 1) parts.push(streak + '-day streak');
    calStats.textContent = parts.length > 0 ? parts.join(' \u00b7 ') : '';
  }

  function showDetail(key, entry) {
    var em = getEmotionByKey(entry.emotion);
    detailDate.textContent = formatDateKey(key);
    detailEmotion.textContent = em ? em.name : entry.emotion;
    detailEmotion.style.color = em ? em.color : '#888';
    detailText.textContent = entry.text || '(no words)';
    calDetail.classList.remove('hidden');
    calDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function getStreak(entries) {
    var streak = 0;
    var d = new Date();
    while (true) {
      var key = dateKey(d.getFullYear(), d.getMonth(), d.getDate());
      if (entries[key]) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  /* ==================== BEGIN ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      buildEmotionGrid();
      showScreen(checkinView);
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
