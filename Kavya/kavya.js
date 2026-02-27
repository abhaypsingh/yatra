/* ============================================================
   KAVYA — the poem within
   Poetry journal with prompts and anthology
   ============================================================ */

(function () {
  'use strict';

  /* ==================== PROMPTS ==================== */
  var PROMPTS = [
    'Begin with "I am…"',
    'What would your anger say if it had a voice?',
    'Describe a colour without naming it.',
    'Write to the person you miss most.',
    'What does silence sound like in your house?',
    'If your fear were a landscape, what would you see?',
    'Begin with "I remember…"',
    'Write about something you lost and something you found.',
    'What does your courage look like at 3 a.m.?',
    'Describe the space between two heartbeats.',
    'Write about a door — open or closed.',
    'If today were a season, which one?',
    'What would you tell your younger self?',
    'Begin with "They don\'t know that I…"',
    'Write about water — any kind.',
    'What do your hands remember?',
    'Describe a moment when time stopped.',
    'Write about something you carry but cannot see.',
    'If your joy were a sound, what would it be?',
    'Begin with "One day I will…"'
  ];

  /* ==================== DOM ==================== */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var homeView      = document.getElementById('homeView');
  var promptGrid    = document.getElementById('promptGrid');
  var freeWriteBtn  = document.getElementById('freeWriteBtn');
  var anthologyLink = document.getElementById('anthologyLink');
  var showAnthology = document.getElementById('showAnthology');
  var writeView     = document.getElementById('writeView');
  var writePrompt   = document.getElementById('writePrompt');
  var writeArea     = document.getElementById('writeArea');
  var saveBtn       = document.getElementById('saveBtn');
  var discardBtn    = document.getElementById('discardBtn');
  var savedView     = document.getElementById('savedView');
  var writeAnother  = document.getElementById('writeAnother');
  var readPoems     = document.getElementById('readPoems');
  var anthologyView = document.getElementById('anthologyView');
  var anthologyCount = document.getElementById('anthologyCount');
  var anthologyList = document.getElementById('anthologyList');
  var anthologyBack = document.getElementById('anthologyBack');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORAGE_KEY = 'yatra-kavya-poems';
  var currentPrompt = '';

  /* ==================== STORAGE ==================== */
  function loadPoems() {
    try {
      var d = localStorage.getItem(STORAGE_KEY);
      return d ? JSON.parse(d) : [];
    } catch (e) { return []; }
  }

  function savePoems(poems) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(poems)); }
    catch (e) {}
  }

  /* ==================== SCREENS ==================== */
  var screens = [homeView, writeView, savedView, anthologyView];

  function showScreen(screen) {
    screens.forEach(function (s) { s.classList.add('hidden'); });
    screen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==================== BUILD PROMPT GRID ==================== */
  function buildPrompts() {
    promptGrid.innerHTML = '';

    /* show 5 random prompts */
    var shuffled = PROMPTS.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var shown = shuffled.slice(0, 5);

    shown.forEach(function (prompt) {
      var card = document.createElement('button');
      card.className = 'prompt-card';
      card.textContent = prompt;
      card.addEventListener('click', function () {
        currentPrompt = prompt;
        openWrite(prompt);
      });
      promptGrid.appendChild(card);
    });

    /* show anthology link if poems exist */
    var poems = loadPoems();
    if (poems.length > 0) {
      anthologyLink.classList.remove('hidden');
    } else {
      anthologyLink.classList.add('hidden');
    }
  }

  /* ==================== WRITE ==================== */
  function openWrite(prompt) {
    if (prompt) {
      writePrompt.textContent = prompt;
      writePrompt.classList.remove('hidden');
    } else {
      writePrompt.textContent = '';
      writePrompt.classList.add('hidden');
    }
    writeArea.value = '';
    showScreen(writeView);
    writeArea.focus();
  }

  freeWriteBtn.addEventListener('click', function () {
    currentPrompt = '';
    openWrite('');
  });

  /* ==================== SAVE ==================== */
  saveBtn.addEventListener('click', function () {
    var text = writeArea.value.trim();
    if (!text) return;

    var poems = loadPoems();
    poems.unshift({
      prompt: currentPrompt,
      text: text,
      timestamp: Date.now()
    });
    savePoems(poems);

    showScreen(savedView);
  });

  discardBtn.addEventListener('click', function () {
    buildPrompts();
    showScreen(homeView);
  });

  /* ==================== SAVED ACTIONS ==================== */
  writeAnother.addEventListener('click', function () {
    buildPrompts();
    showScreen(homeView);
  });

  readPoems.addEventListener('click', function () {
    renderAnthology();
    showScreen(anthologyView);
  });

  showAnthology.addEventListener('click', function () {
    renderAnthology();
    showScreen(anthologyView);
  });

  anthologyBack.addEventListener('click', function () {
    buildPrompts();
    showScreen(homeView);
  });

  /* ==================== ANTHOLOGY ==================== */
  function renderAnthology() {
    var poems = loadPoems();
    anthologyList.innerHTML = '';

    anthologyCount.textContent = poems.length + ' poem' + (poems.length === 1 ? '' : 's');

    if (poems.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'anthology-empty';
      empty.textContent = 'No poems yet. Your anthology awaits.';
      anthologyList.appendChild(empty);
      return;
    }

    poems.forEach(function (poem, index) {
      var card = document.createElement('div');
      card.className = 'poem-card';

      var del = document.createElement('button');
      del.className = 'poem-delete';
      del.textContent = 'remove';
      del.addEventListener('click', function () {
        var p = loadPoems();
        p.splice(index, 1);
        savePoems(p);
        renderAnthology();
      });
      card.appendChild(del);

      if (poem.prompt) {
        var promptEl = document.createElement('div');
        promptEl.className = 'poem-prompt';
        promptEl.textContent = poem.prompt;
        card.appendChild(promptEl);
      }

      var textEl = document.createElement('div');
      textEl.className = 'poem-text';
      textEl.textContent = poem.text;
      card.appendChild(textEl);

      var dateEl = document.createElement('div');
      dateEl.className = 'poem-date';
      var d = new Date(poem.timestamp);
      dateEl.textContent = d.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
      card.appendChild(dateEl);

      anthologyList.appendChild(card);
    });
  }

  /* ==================== BEGIN ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      buildPrompts();
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
