/* ============================================================
   CHAAYA — the shadow
   Shadow work: name hidden parts of yourself, then embrace them
   ============================================================ */

(function () {
  'use strict';

  /* ==================== PROMPTS ==================== */
  var SEED_PROMPTS = [
    'my sensitivity',
    'my anger',
    'my need for attention',
    'my jealousy',
    'my sadness',
    'my fear of being alone',
    'my need to be liked',
    'how much I care',
    'my confusion',
    'that I don\u2019t feel strong',
    'that I need help',
    'my family situation'
  ];

  var EMBRACE_MESSAGES = [
    'This is part of you. It belongs.',
    'You are not less because of this. You are whole.',
    'What you hid in the dark now lives in the light.',
    'Shame cannot survive being seen with kindness.',
    'You named it. You faced it. That is courage.',
    'This shadow has been carried long enough. Set it down gently.'
  ];

  /* ==================== DOM ==================== */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var homeView       = document.getElementById('homeView');
  var stats          = document.getElementById('stats');
  var shadowGallery  = document.getElementById('shadowGallery');
  var addShadowBtn   = document.getElementById('addShadowBtn');
  var writeView      = document.getElementById('writeView');
  var promptList     = document.getElementById('promptList');
  var shadowInput    = document.getElementById('shadowInput');
  var shadowDetail   = document.getElementById('shadowDetail');
  var saveBtn        = document.getElementById('saveBtn');
  var cancelBtn      = document.getElementById('cancelBtn');
  var embraceView    = document.getElementById('embraceView');
  var embraceCard    = document.getElementById('embraceCard');
  var embraceSilhouette = document.getElementById('embraceSilhouette');
  var embraceName    = document.getElementById('embraceName');
  var embraceDetail  = document.getElementById('embraceDetail');
  var embraceMsg     = document.getElementById('embraceMsg');
  var embraceBtn     = document.getElementById('embraceBtn');
  var embraceBack    = document.getElementById('embraceBack');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORAGE_KEY = 'yatra-chaaya-shadows';
  var viewingIndex = -1;

  /* ==================== STORAGE ==================== */
  function loadShadows() {
    try {
      var d = localStorage.getItem(STORAGE_KEY);
      return d ? JSON.parse(d) : [];
    } catch (e) { return []; }
  }

  function saveShadows(shadows) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(shadows)); }
    catch (e) {}
  }

  /* ==================== SCREENS ==================== */
  var screens = [homeView, writeView, embraceView];

  function showScreen(screen) {
    screens.forEach(function (s) { s.classList.add('hidden'); });
    screen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==================== GALLERY ==================== */
  function renderGallery() {
    var shadows = loadShadows();
    shadowGallery.innerHTML = '';

    /* stats */
    if (shadows.length === 0) {
      stats.textContent = '';
    } else {
      var embraced = 0;
      shadows.forEach(function (s) { if (s.embraced) embraced++; });
      var parts = [shadows.length + ' shadow' + (shadows.length === 1 ? '' : 's') + ' named'];
      if (embraced > 0) parts.push(embraced + ' embraced');
      stats.textContent = parts.join(' \u00b7 ');
    }

    if (shadows.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'gallery-empty';
      empty.textContent = 'No shadows yet. What do you hide?';
      shadowGallery.appendChild(empty);
      return;
    }

    shadows.forEach(function (shadow, index) {
      var card = document.createElement('div');
      card.className = 'shadow-card' + (shadow.embraced ? ' embraced' : '');

      var name = document.createElement('div');
      name.className = 'shadow-card-name';
      name.textContent = shadow.name;
      card.appendChild(name);

      if (shadow.detail) {
        var detail = document.createElement('div');
        detail.className = 'shadow-card-detail';
        detail.textContent = shadow.detail;
        card.appendChild(detail);
      }

      var badge = document.createElement('div');
      badge.className = 'shadow-card-badge';
      badge.textContent = shadow.embraced ? 'embraced' : 'shadow';
      card.appendChild(badge);

      var date = document.createElement('div');
      date.className = 'shadow-card-date';
      var d = new Date(shadow.timestamp);
      date.textContent = d.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
      card.appendChild(date);

      var del = document.createElement('button');
      del.className = 'shadow-delete';
      del.textContent = 'remove';
      del.addEventListener('click', function (e) {
        e.stopPropagation();
        var s = loadShadows();
        s.splice(index, 1);
        saveShadows(s);
        renderGallery();
      });
      card.appendChild(del);

      card.addEventListener('click', function () {
        openEmbrace(index);
      });

      shadowGallery.appendChild(card);
    });
  }

  /* ==================== WRITE VIEW ==================== */
  function openWrite() {
    shadowInput.value = '';
    shadowDetail.value = '';
    buildPromptChips();
    showScreen(writeView);
    shadowInput.focus();
  }

  function buildPromptChips() {
    promptList.innerHTML = '';
    /* show 6 random prompts */
    var shuffled = SEED_PROMPTS.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    shuffled.slice(0, 6).forEach(function (p) {
      var chip = document.createElement('button');
      chip.className = 'prompt-chip';
      chip.textContent = p;
      chip.addEventListener('click', function () {
        shadowInput.value = p;
        shadowInput.focus();
      });
      promptList.appendChild(chip);
    });
  }

  addShadowBtn.addEventListener('click', openWrite);

  cancelBtn.addEventListener('click', function () {
    renderGallery();
    showScreen(homeView);
  });

  saveBtn.addEventListener('click', function () {
    var name = shadowInput.value.trim();
    if (!name) return;

    var shadows = loadShadows();
    shadows.unshift({
      name: name,
      detail: shadowDetail.value.trim(),
      embraced: false,
      timestamp: Date.now()
    });
    saveShadows(shadows);

    renderGallery();
    showScreen(homeView);
  });

  /* ==================== EMBRACE ==================== */
  function openEmbrace(index) {
    viewingIndex = index;
    var shadows = loadShadows();
    var shadow = shadows[index];

    embraceName.textContent = shadow.name;
    embraceDetail.textContent = shadow.detail || '';
    embraceMsg.classList.remove('visible');
    embraceMsg.textContent = '';
    embraceCard.classList.toggle('golden', shadow.embraced);

    if (shadow.embraced) {
      embraceBtn.classList.add('done');
      embraceBtn.textContent = 'already embraced';
      embraceMsg.textContent = 'This shadow walks with you in the light.';
      embraceMsg.classList.add('visible');
    } else {
      embraceBtn.classList.remove('done');
      embraceBtn.textContent = 'embrace this shadow';
    }

    showScreen(embraceView);
  }

  embraceBtn.addEventListener('click', function () {
    if (viewingIndex < 0) return;
    var shadows = loadShadows();
    if (shadows[viewingIndex].embraced) return;

    shadows[viewingIndex].embraced = true;
    shadows[viewingIndex].embracedAt = Date.now();
    saveShadows(shadows);

    /* animate */
    embraceCard.classList.add('golden');
    embraceBtn.classList.add('done');
    embraceBtn.textContent = 'embraced';

    var msg = EMBRACE_MESSAGES[Math.floor(Math.random() * EMBRACE_MESSAGES.length)];
    embraceMsg.textContent = msg;
    setTimeout(function () {
      embraceMsg.classList.add('visible');
    }, 800);
  });

  embraceBack.addEventListener('click', function () {
    renderGallery();
    showScreen(homeView);
  });

  /* ==================== BEGIN ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      renderGallery();
      showScreen(homeView);
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
