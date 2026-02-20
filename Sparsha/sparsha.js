/* ============================================================
   SPARSHA — where feelings live
   Body map of emotions with daily somatic check-in
   ============================================================ */

(function () {
  'use strict';

  var EMOTIONS = [
    { id: 'anger',   name: 'anger',   color: '#d04848' },
    { id: 'sadness', name: 'sadness', color: '#5888c0' },
    { id: 'fear',    name: 'fear',    color: '#8868a8' },
    { id: 'joy',     name: 'joy',     color: '#e8c848' },
    { id: 'love',    name: 'love',    color: '#d07088' },
    { id: 'tension', name: 'tension', color: '#c87838' },
    { id: 'calm',    name: 'calm',    color: '#68b0a0' }
  ];

  var REGION_NAMES = {
    'head': 'head',
    'throat': 'throat',
    'chest': 'chest',
    'stomach': 'stomach',
    'hands': 'hands',
    'hands-r': 'hands',
    'hips': 'hips',
    'legs': 'legs',
    'legs-r': 'legs',
    'shoulders': 'shoulders',
    'shoulders-r': 'shoulders'
  };

  var STORAGE_KEY = 'sparsha_maps';

  /* ---------- state ---------- */
  var placements = []; /* { region, regionName, emotion, color } */
  var activeRegion = null;

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var bodyMap       = document.getElementById('bodyMap');
  var mapDate       = document.getElementById('mapDate');
  var emotionPicker = document.getElementById('emotionPicker');
  var pickerLabel   = document.getElementById('pickerLabel');
  var pickerGrid    = document.getElementById('pickerGrid');
  var mapPlaced     = document.getElementById('mapPlaced');
  var sealBtn       = document.getElementById('sealBtn');
  var history       = document.getElementById('history');
  var historyEntries= document.getElementById('historyEntries');
  var historyBack   = document.getElementById('historyBack');
  var navFloat      = document.getElementById('navFloat');
  var navHistory    = document.getElementById('navHistory');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- persistence ---------- */
  function loadMaps() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
  }

  function saveMap(key, entry) {
    var all = loadMaps();
    all[key] = entry;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function dateKey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function formatDate(d) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ---------- build emotion picker ---------- */
  function buildPicker() {
    pickerGrid.innerHTML = '';
    for (var i = 0; i < EMOTIONS.length; i++) {
      (function (em) {
        var btn = document.createElement('button');
        btn.className = 'picker-btn';
        btn.textContent = em.name;
        btn.style.borderColor = em.color;
        btn.style.color = em.color;
        btn.addEventListener('mouseenter', function () { btn.style.background = em.color + '20'; });
        btn.addEventListener('mouseleave', function () { btn.style.background = ''; });
        btn.addEventListener('click', function () {
          placeEmotion(activeRegion, em);
        });
        pickerGrid.appendChild(btn);
      })(EMOTIONS[i]);
    }
  }

  /* ---------- body region interaction ---------- */
  var regions = document.querySelectorAll('.body-region');
  for (var i = 0; i < regions.length; i++) {
    (function (region) {
      region.addEventListener('click', function () {
        var regionId = region.getAttribute('data-region');
        var regionName = REGION_NAMES[regionId] || regionId;
        activeRegion = regionId;
        pickerLabel.textContent = regionName;
        emotionPicker.classList.remove('hidden');
        buildPicker();
      });
    })(regions[i]);
  }

  /* ---------- place emotion ---------- */
  function placeEmotion(regionId, emotion) {
    emotionPicker.classList.add('hidden');
    var regionName = REGION_NAMES[regionId] || regionId;

    /* color the SVG region */
    var els = document.querySelectorAll('[data-region="' + regionId + '"]');
    for (var i = 0; i < els.length; i++) {
      els[i].style.fill = emotion.color + '40';
      els[i].style.stroke = emotion.color;
      els[i].classList.add('active');
    }

    /* also color the paired region (hands-r when hands is set, etc.) */
    var paired = getPaired(regionId);
    if (paired) {
      var pEls = document.querySelectorAll('[data-region="' + paired + '"]');
      for (var j = 0; j < pEls.length; j++) {
        pEls[j].style.fill = emotion.color + '40';
        pEls[j].style.stroke = emotion.color;
        pEls[j].classList.add('active');
      }
    }

    placements.push({
      region: regionId,
      regionName: regionName,
      emotion: emotion.id,
      emotionName: emotion.name,
      color: emotion.color
    });

    renderPlacements();
  }

  function getPaired(id) {
    var pairs = { 'hands': 'hands-r', 'hands-r': 'hands', 'legs': 'legs-r', 'legs-r': 'legs', 'shoulders': 'shoulders-r', 'shoulders-r': 'shoulders' };
    return pairs[id] || null;
  }

  function renderPlacements() {
    mapPlaced.innerHTML = '';
    for (var i = 0; i < placements.length; i++) {
      (function (idx) {
        var p = placements[idx];
        var item = document.createElement('div');
        item.className = 'placed-item';
        var dot = document.createElement('span');
        dot.className = 'placed-dot';
        dot.style.background = p.color;
        var text = document.createElement('span');
        text.className = 'placed-text';
        text.innerHTML = '<strong>' + p.emotionName + '</strong> in the ' + p.regionName;
        var removeBtn = document.createElement('button');
        removeBtn.className = 'placed-remove';
        removeBtn.textContent = '\u00D7';
        removeBtn.addEventListener('click', function () {
          removePlacement(idx);
        });
        item.appendChild(dot);
        item.appendChild(text);
        item.appendChild(removeBtn);
        mapPlaced.appendChild(item);
      })(i);
    }
  }

  function removePlacement(idx) {
    var p = placements[idx];
    /* clear SVG color */
    var els = document.querySelectorAll('[data-region="' + p.region + '"]');
    for (var i = 0; i < els.length; i++) {
      els[i].style.fill = '';
      els[i].style.stroke = '';
      els[i].classList.remove('active');
    }
    var paired = getPaired(p.region);
    if (paired) {
      /* only clear paired if no other placement uses it */
      var otherUses = false;
      for (var j = 0; j < placements.length; j++) {
        if (j !== idx && (placements[j].region === paired || placements[j].region === p.region)) {
          otherUses = true; break;
        }
      }
      if (!otherUses) {
        var pEls = document.querySelectorAll('[data-region="' + paired + '"]');
        for (var k = 0; k < pEls.length; k++) {
          pEls[k].style.fill = '';
          pEls[k].style.stroke = '';
          pEls[k].classList.remove('active');
        }
      }
    }
    placements.splice(idx, 1);
    renderPlacements();
  }

  /* ---------- seal ---------- */
  sealBtn.addEventListener('click', function () {
    if (placements.length === 0) return;
    var entry = {
      timestamp: Date.now(),
      feelings: placements.map(function (p) {
        return { region: p.regionName, emotion: p.emotionName, color: p.color };
      })
    };
    saveMap(dateKey(new Date()), entry);
    sealBtn.textContent = 'sealed \u2713';
    sealBtn.disabled = true;
    setTimeout(function () {
      sealBtn.textContent = 'seal today';
      sealBtn.disabled = false;
    }, 2000);
  });

  /* ---------- history ---------- */
  function showHistory() {
    bodyMap.classList.add('hidden');
    history.classList.remove('hidden');
    var all = loadMaps();
    var keys = Object.keys(all).sort().reverse();
    historyEntries.innerHTML = '';

    if (keys.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = 'No body maps yet.';
      historyEntries.appendChild(empty);
      return;
    }

    for (var k = 0; k < keys.length; k++) {
      var entry = all[keys[k]];
      var parts = keys[k].split('-');
      var entryDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      var div = document.createElement('div');
      div.className = 'history-entry';
      var dateEl = document.createElement('div');
      dateEl.className = 'history-entry-date';
      dateEl.textContent = formatDate(entryDate);
      div.appendChild(dateEl);

      for (var f = 0; f < entry.feelings.length; f++) {
        var feeling = entry.feelings[f];
        var row = document.createElement('div');
        row.className = 'history-feeling';
        var dot = document.createElement('span');
        dot.className = 'history-dot';
        dot.style.background = feeling.color;
        var label = document.createElement('span');
        label.className = 'history-label';
        label.innerHTML = '<strong>' + feeling.emotion + '</strong> in the ' + feeling.region;
        row.appendChild(dot);
        row.appendChild(label);
        div.appendChild(row);
      }
      historyEntries.appendChild(div);
    }
  }

  function showMap() {
    history.classList.add('hidden');
    bodyMap.classList.remove('hidden');
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      bodyMap.classList.remove('hidden');
      navFloat.classList.add('visible');
      mapDate.textContent = formatDate(new Date());
    }, 1200);
  });

  /* close picker when clicking outside */
  document.addEventListener('click', function (e) {
    if (!emotionPicker.classList.contains('hidden') &&
        !emotionPicker.contains(e.target) &&
        !e.target.classList.contains('body-region')) {
      emotionPicker.classList.add('hidden');
    }
  });

  navHistory.addEventListener('click', showHistory);
  historyBack.addEventListener('click', showMap);

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
