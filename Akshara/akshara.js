/* ============================================================
   AKSHARA — the unsent letter
   A private space to write letters that can never be sent
   ============================================================ */

(function () {
  'use strict';

  /* ==================== LETTER TYPES ==================== */
  var TYPES = [
    {
      key: 'future-self',
      title: 'To my future self',
      hint: 'What do you want to remember about who you are right now?',
      prompt: 'Write to the person you are becoming. Tell them what you are feeling today, what you are afraid of, what you hope for. One day you will read this and understand how far you have come.'
    },
    {
      key: 'past-self',
      title: 'To my past self',
      hint: 'What do you wish someone had told you when you were younger?',
      prompt: 'Write to the person you used to be. Tell them what you know now. Be gentle \u2014 they were doing their best with what they had.'
    },
    {
      key: 'someone-miss',
      title: 'To someone I miss',
      hint: 'What would you say if you could talk to them right now?',
      prompt: 'Write to someone who is no longer in your life the way they used to be. Say what you never got to say. There is no wrong thing to feel.'
    },
    {
      key: 'someone-hurt',
      title: 'To someone who hurt me',
      hint: 'What do you need them to know, even if they never hear it?',
      prompt: 'Write what you carry. The anger, the sadness, the confusion \u2014 all of it belongs here. You are not writing to forgive. You are writing to be free.'
    },
    {
      key: 'unsaid',
      title: 'Words I cannot say',
      hint: 'What is the truth you carry that has no audience?',
      prompt: 'Sometimes there is no one to send it to. No person, no address, no right moment. But the words still need to exist. Write them here. They are real because you wrote them.'
    }
  ];

  /* ==================== DOM ==================== */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var bgCanvas       = document.getElementById('bgCanvas');
  var ctx            = bgCanvas.getContext('2d');
  var typeView       = document.getElementById('typeView');
  var typeCards       = document.getElementById('typeCards');
  var lettersLink    = document.getElementById('lettersLink');
  var viewLettersBtn = document.getElementById('viewLettersBtn');
  var writeView      = document.getElementById('writeView');
  var writeBack      = document.getElementById('writeBack');
  var writeType      = document.getElementById('writeType');
  var writePrompt    = document.getElementById('writePrompt');
  var writeDate      = document.getElementById('writeDate');
  var writeArea      = document.getElementById('writeArea');
  var sealBtn        = document.getElementById('sealBtn');
  var sealedView     = document.getElementById('sealedView');
  var writeAnotherBtn = document.getElementById('writeAnotherBtn');
  var readLettersBtn = document.getElementById('readLettersBtn');
  var lettersView    = document.getElementById('lettersView');
  var lettersBack    = document.getElementById('lettersBack');
  var lettersList    = document.getElementById('lettersList');
  var noLetters      = document.getElementById('noLetters');
  var readView       = document.getElementById('readView');
  var readBack       = document.getElementById('readBack');
  var readCard       = document.getElementById('readCard');
  var readType       = document.getElementById('readType');
  var readDate       = document.getElementById('readDate');
  var readBody       = document.getElementById('readBody');
  var releaseBtn     = document.getElementById('releaseBtn');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var currentType = null;
  var currentReadId = null;
  var STORAGE_KEY = 'yatra-akshara-letters';

  /* ==================== STORAGE ==================== */
  function loadLetters() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  }

  function saveLetters(letters) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(letters)); }
    catch (e) { /* storage full or unavailable */ }
  }

  /* ==================== DATE FORMAT ==================== */
  function formatDate(ts) {
    var d = new Date(ts);
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function todayString() {
    return formatDate(Date.now());
  }

  /* ==================== SCREEN MANAGEMENT ==================== */
  var screens = [typeView, writeView, sealedView, lettersView, readView];

  function showScreen(screen) {
    screens.forEach(function (s) { s.classList.add('hidden'); });
    screen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==================== BUILD TYPE CARDS ==================== */
  function buildTypeCards() {
    typeCards.innerHTML = '';
    TYPES.forEach(function (type) {
      var card = document.createElement('div');
      card.className = 'type-card';
      card.innerHTML = '<div class="type-card-title">' + type.title + '</div>' +
                       '<div class="type-card-hint">' + type.hint + '</div>';
      card.addEventListener('click', function () {
        currentType = type;
        openWriteView(type);
      });
      typeCards.appendChild(card);
    });

    /* show letters link if letters exist */
    var letters = loadLetters();
    if (letters.length > 0) {
      lettersLink.classList.remove('hidden');
      viewLettersBtn.textContent = 'read your ' + letters.length + ' sealed letter' + (letters.length === 1 ? '' : 's');
    } else {
      lettersLink.classList.add('hidden');
    }
  }

  /* ==================== WRITE VIEW ==================== */
  function openWriteView(type) {
    writeType.textContent = type.title;
    writePrompt.textContent = type.prompt;
    writeDate.textContent = todayString();
    writeArea.value = '';
    sealBtn.disabled = true;
    showScreen(writeView);
    setTimeout(function () { writeArea.focus(); }, 300);
  }

  writeArea.addEventListener('input', function () {
    sealBtn.disabled = writeArea.value.trim().length === 0;
  });

  writeBack.addEventListener('click', function () {
    showScreen(typeView);
  });

  /* ==================== SEAL ==================== */
  sealBtn.addEventListener('click', function () {
    if (!currentType || writeArea.value.trim().length === 0) return;

    var letter = {
      id: Date.now(),
      type: currentType.key,
      typeLabel: currentType.title,
      text: writeArea.value.trim(),
      date: Date.now()
    };

    var letters = loadLetters();
    letters.unshift(letter);
    saveLetters(letters);

    showScreen(sealedView);
  });

  writeAnotherBtn.addEventListener('click', function () {
    buildTypeCards();
    showScreen(typeView);
  });

  readLettersBtn.addEventListener('click', function () {
    openLettersView();
  });

  /* ==================== LETTERS LIST ==================== */
  function openLettersView() {
    var letters = loadLetters();
    lettersList.innerHTML = '';

    if (letters.length === 0) {
      noLetters.classList.remove('hidden');
    } else {
      noLetters.classList.add('hidden');
      letters.forEach(function (letter) {
        var item = document.createElement('div');
        item.className = 'letter-item';
        item.innerHTML =
          '<div class="letter-item-date">' + formatDate(letter.date) + '</div>' +
          '<div class="letter-item-type">' + letter.typeLabel + '</div>' +
          '<div class="letter-item-preview">' + escapeHtml(letter.text.substring(0, 80)) + (letter.text.length > 80 ? '\u2026' : '') + '</div>';
        item.addEventListener('click', function () {
          openReadView(letter.id);
        });
        lettersList.appendChild(item);
      });
    }

    showScreen(lettersView);
  }

  lettersBack.addEventListener('click', function () {
    buildTypeCards();
    showScreen(typeView);
  });

  viewLettersBtn.addEventListener('click', function () {
    openLettersView();
  });

  /* ==================== READ VIEW ==================== */
  function openReadView(id) {
    var letters = loadLetters();
    var letter = null;
    for (var i = 0; i < letters.length; i++) {
      if (letters[i].id === id) { letter = letters[i]; break; }
    }
    if (!letter) return;

    currentReadId = id;
    readType.textContent = letter.typeLabel;
    readDate.textContent = formatDate(letter.date);
    readBody.textContent = letter.text;
    showScreen(readView);
  }

  readBack.addEventListener('click', function () {
    openLettersView();
  });

  /* ==================== RELEASE ==================== */
  releaseBtn.addEventListener('click', function () {
    if (currentReadId === null) return;

    /* run particle animation from the read card */
    releaseAnimation(readCard, function () {
      /* remove letter from storage */
      var letters = loadLetters();
      letters = letters.filter(function (l) { return l.id !== currentReadId; });
      saveLetters(letters);
      currentReadId = null;

      /* go back to letters list */
      openLettersView();
    });
  });

  /* ==================== RELEASE ANIMATION ==================== */
  function releaseAnimation(container, callback) {
    var rect = container.getBoundingClientRect();
    var canvas = document.createElement('canvas');
    canvas.className = 'release-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    var rCtx = canvas.getContext('2d');

    /* hide content */
    container.style.transition = 'opacity 0.6s ease';
    container.style.opacity = '0';

    var particles = [];
    for (var i = 0; i < 90; i++) {
      particles.push({
        x: rect.left + Math.random() * rect.width,
        y: rect.top + Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.5 + 0.4),
        r: Math.random() * 2 + 0.5,
        life: 100 + Math.random() * 80,
        age: Math.floor(-i * 0.4),
        color: [
          180 + Math.random() * 75,
          140 + Math.random() * 60,
          50 + Math.random() * 50
        ]
      });
    }

    function frame() {
      rCtx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;

      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.age++;
        if (p.age < 0) { alive = true; continue; }
        if (p.age > p.life) continue;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.008;

        var fade = 1 - (p.age / p.life);
        rCtx.beginPath();
        rCtx.arc(p.x, p.y, p.r * fade, 0, Math.PI * 2);
        rCtx.fillStyle = 'rgba(' + Math.round(p.color[0]) + ',' + Math.round(p.color[1]) + ',' + Math.round(p.color[2]) + ',' + (fade * 0.8) + ')';
        rCtx.fill();

        /* glow */
        rCtx.beginPath();
        rCtx.arc(p.x, p.y, p.r * 3.5 * fade, 0, Math.PI * 2);
        rCtx.fillStyle = 'rgba(' + Math.round(p.color[0]) + ',' + Math.round(p.color[1]) + ',' + Math.round(p.color[2]) + ',' + (fade * 0.12) + ')';
        rCtx.fill();
      }

      if (alive) {
        requestAnimationFrame(frame);
      } else {
        document.body.removeChild(canvas);
        container.style.opacity = '1';
        callback();
      }
    }

    setTimeout(function () { requestAnimationFrame(frame); }, 300);
  }

  /* ==================== ESCAPE HTML ==================== */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ==================== AMBIENT BACKGROUND ==================== */
  var bgDots = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }

  function initBg() {
    resizeCanvas();
    bgDots = [];
    for (var i = 0; i < 30; i++) {
      bgDots.push({
        px: Math.random(),
        py: Math.random(),
        r: Math.random() * 1 + 0.3,
        alpha: Math.random() * 0.06 + 0.01,
        phase: Math.random() * 6.28,
        speed: Math.random() * 0.008 + 0.002
      });
    }
  }

  function animateBg() {
    ctx.fillStyle = '#0a0806';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    var t = performance.now() * 0.001;
    var w = bgCanvas.width;
    var h = bgCanvas.height;

    for (var i = 0; i < bgDots.length; i++) {
      var d = bgDots[i];
      var a = d.alpha * (0.4 + 0.6 * Math.sin(d.phase + t * d.speed * 6));
      ctx.beginPath();
      ctx.arc(d.px * w, d.py * h, d.r, 0, 6.28);
      ctx.fillStyle = 'rgba(200,160,96,' + a + ')';
      ctx.fill();
    }

    requestAnimationFrame(animateBg);
  }

  /* ==================== INIT ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      buildTypeCards();
      showScreen(typeView);
      initBg();
      animateBg();
    }, 1200);
  });

  window.addEventListener('resize', function () {
    if (opening.classList.contains('hidden')) {
      resizeCanvas();
    }
  });

  /* about */
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
