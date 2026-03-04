/* ============================================================
   ANKUR — the sprout
   A garden of firsts — plant seeds, water them, watch them grow
   ============================================================ */

(function () {
  'use strict';

  var STAGES = [
    { name: 'seed',    icon: '\uD83C\uDF31', min: 0 },
    { name: 'sprout',  icon: '\uD83C\uDF3F', min: 1 },
    { name: 'sapling', icon: '\uD83C\uDF3E', min: 3 },
    { name: 'bloom',   icon: '\uD83C\uDF3A', min: 6 }
  ];

  /* ==================== DOM ==================== */
  var opening     = document.getElementById('opening');
  var beginBtn    = document.getElementById('beginBtn');
  var main        = document.getElementById('main');
  var garden      = document.getElementById('garden');
  var gardenEmpty = document.getElementById('gardenEmpty');
  var addBtn      = document.getElementById('addBtn');
  var plantView   = document.getElementById('plantView');
  var plantInput  = document.getElementById('plantInput');
  var plantCancel = document.getElementById('plantCancel');
  var plantSave   = document.getElementById('plantSave');
  var waterView   = document.getElementById('waterView');
  var waterTitle  = document.getElementById('waterTitle');
  var waterStage  = document.getElementById('waterStage');
  var waterUpdates= document.getElementById('waterUpdates');
  var waterInput  = document.getElementById('waterInput');
  var waterClose  = document.getElementById('waterClose');
  var waterSave   = document.getElementById('waterSave');
  var navFloat    = document.getElementById('navFloat');
  var navAbout    = document.getElementById('navAbout');
  var aboutOverlay= document.getElementById('aboutOverlay');
  var aboutClose  = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-ankur-seeds';
  var seeds = [];
  var currentIdx = -1;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) seeds = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(seeds)); }
    catch (e) {}
  }

  /* ==================== STAGES ==================== */
  function getStage(seed) {
    var count = seed.updates ? seed.updates.length : 0;
    var stage = STAGES[0];
    for (var i = STAGES.length - 1; i >= 0; i--) {
      if (count >= STAGES[i].min) { stage = STAGES[i]; break; }
    }
    return stage;
  }

  /* ==================== RENDER ==================== */
  function render() {
    garden.innerHTML = '';

    if (seeds.length === 0) {
      gardenEmpty.classList.remove('hidden');
      return;
    }

    gardenEmpty.classList.add('hidden');

    seeds.forEach(function (seed, idx) {
      var stage = getStage(seed);

      var card = document.createElement('div');
      card.className = 'seed-card';

      var icon = document.createElement('span');
      icon.className = 'seed-icon';
      icon.textContent = stage.icon;
      card.appendChild(icon);

      var text = document.createElement('p');
      text.className = 'seed-text';
      text.textContent = seed.text;
      card.appendChild(text);

      var stageLabel = document.createElement('p');
      stageLabel.className = 'seed-stage';
      stageLabel.textContent = stage.name;
      card.appendChild(stageLabel);

      card.addEventListener('click', function () { openWater(idx); });
      garden.appendChild(card);
    });
  }

  /* ==================== PLANT ==================== */
  function openPlant() {
    plantInput.value = '';
    plantView.classList.remove('hidden');
    setTimeout(function () { plantInput.focus(); }, 100);
  }

  function closePlant() { plantView.classList.add('hidden'); }

  function saveSeed() {
    var text = plantInput.value.trim();
    if (!text) return;
    seeds.push({ text: text, updates: [], timestamp: Date.now() });
    save();
    closePlant();
    render();
  }

  /* ==================== WATER ==================== */
  function openWater(idx) {
    currentIdx = idx;
    var seed = seeds[idx];
    var stage = getStage(seed);

    waterTitle.textContent = stage.icon + ' ' + seed.text;
    waterStage.textContent = stage.name + ' \u2014 ' + (seed.updates.length) + ' update' + (seed.updates.length !== 1 ? 's' : '');

    waterUpdates.innerHTML = '';
    if (seed.updates.length === 0) {
      var empty = document.createElement('p');
      empty.style.cssText = 'font-size:.82rem;color:var(--text-dim);opacity:.5;margin-bottom:.5rem;';
      empty.textContent = 'No updates yet. Water this seed to help it grow.';
      waterUpdates.appendChild(empty);
    } else {
      seed.updates.forEach(function (u) {
        var item = document.createElement('div');
        item.className = 'water-update-item';

        var note = document.createElement('p');
        note.textContent = u.note;
        item.appendChild(note);

        var date = document.createElement('p');
        date.className = 'water-update-date';
        var d = new Date(u.timestamp);
        date.textContent = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
        item.appendChild(date);

        waterUpdates.appendChild(item);
      });
    }

    waterInput.value = '';
    waterView.classList.remove('hidden');
    setTimeout(function () { waterInput.focus(); }, 100);
  }

  function closeWater() {
    waterView.classList.add('hidden');
    currentIdx = -1;
  }

  function saveWater() {
    var note = waterInput.value.trim();
    if (!note || currentIdx < 0) return;
    seeds[currentIdx].updates.push({ note: note, timestamp: Date.now() });
    save();
    closeWater();
    render();
  }

  /* ==================== ABOUT ==================== */
  function openAbout() {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  }
  function closeAboutFn() {
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

  addBtn.addEventListener('click', openPlant);
  plantCancel.addEventListener('click', closePlant);
  plantSave.addEventListener('click', saveSeed);
  plantInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveSeed(); }
  });

  waterClose.addEventListener('click', closeWater);
  waterSave.addEventListener('click', saveWater);
  waterInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveWater(); }
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAboutFn);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAboutFn(); });

})();
