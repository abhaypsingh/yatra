/* ============================================================
   KSHAMA — forgiveness
   Guided release: name the hurt, feel the weight, choose to set it down
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'kshama_entries';

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var namePhase    = document.getElementById('namePhase');
  var hurtText     = document.getElementById('hurtText');
  var nameNext     = document.getElementById('nameNext');
  var weightPhase  = document.getElementById('weightPhase');
  var weightStones = document.getElementById('weightStones');
  var wishPhase    = document.getElementById('wishPhase');
  var wishText     = document.getElementById('wishText');
  var wishNext     = document.getElementById('wishNext');
  var choicePhase  = document.getElementById('choicePhase');
  var choiceDesc   = document.getElementById('choiceDesc');
  var choiceText   = document.getElementById('choiceText');
  var releaseBtn   = document.getElementById('releaseBtn');
  var keepBtn      = document.getElementById('keepBtn');
  var releasePhase = document.getElementById('releasePhase');
  var releaseWord  = document.getElementById('releaseWord');
  var complete     = document.getElementById('complete');
  var completeTitle = document.getElementById('completeTitle');
  var completeText = document.getElementById('completeText');
  var againBtn     = document.getElementById('againBtn');
  var journalBtn   = document.getElementById('journalBtn');
  var journal      = document.getElementById('journal');
  var journalSub   = document.getElementById('journalSub');
  var journalEntries = document.getElementById('journalEntries');
  var journalBack  = document.getElementById('journalBack');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var hurt = '';
  var weight = 0;
  var wish = '';
  var released = false;

  /* ---------- persistence ---------- */
  function loadAll() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; }
    catch (e) { return []; }
  }
  function saveEntry(entry) {
    var all = loadAll();
    all.push(entry);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function formatDate(d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ---------- canvas: floating ash particles ---------- */
  var particles = [];
  var animFrame = null;

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -Math.random() * 0.4 - 0.1;
    this.alpha = Math.random() * 0.3 + 0.1;
    this.life = Math.random() * 400 + 200;
    this.age = 0;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    if (this.age > this.life || this.y < -10) this.reset();
  };
  Particle.prototype.draw = function () {
    var fade = 1 - (this.age / this.life);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(152, 120, 176, ' + (this.alpha * fade) + ')';
    ctx.fill();
  };

  for (var i = 0; i < 60; i++) particles.push(new Particle());

  function animateCanvas() {
    ctx.fillStyle = 'rgba(10, 8, 16, 0.06)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < particles.length; j++) {
      particles[j].update();
      particles[j].draw();
    }
    animFrame = requestAnimationFrame(animateCanvas);
  }

  /* ---------- burst on release ---------- */
  var burstParticles = [];

  function BurstParticle(cx, cy) {
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 2 + 0.5;
    this.x = cx;
    this.y = cy;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 0.5;
    this.r = Math.random() * 2.5 + 1;
    this.alpha = 0.8;
    this.decay = Math.random() * 0.008 + 0.004;
  }
  BurstParticle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.01;
    this.alpha -= this.decay;
  };
  BurstParticle.prototype.draw = function () {
    if (this.alpha <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200, 180, 220, ' + this.alpha + ')';
    ctx.fill();
  };

  function triggerBurst() {
    var cx = bgCanvas.width / 2;
    var cy = bgCanvas.height / 2;
    for (var b = 0; b < 80; b++) {
      burstParticles.push(new BurstParticle(cx, cy));
    }
  }

  /* override animate to include burst */
  function animateAll() {
    ctx.fillStyle = 'rgba(10, 8, 16, 0.06)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    for (var j = 0; j < particles.length; j++) {
      particles[j].update();
      particles[j].draw();
    }

    for (var k = burstParticles.length - 1; k >= 0; k--) {
      burstParticles[k].update();
      burstParticles[k].draw();
      if (burstParticles[k].alpha <= 0) burstParticles.splice(k, 1);
    }

    animFrame = requestAnimationFrame(animateAll);
  }

  /* ---------- helpers ---------- */
  function showPhase(hideEl, showEl) {
    if (hideEl) hideEl.classList.add('hidden');
    if (showEl) showEl.classList.remove('hidden');
  }

  var WEIGHT_LABELS = { 1: 'a pebble', 2: 'a stone', 3: 'a boulder' };

  var RELEASE_WORDS = [
    'letting go',
    'releasing',
    'setting down',
    'breathing out',
    'freeing',
    'lighter now'
  ];

  /* ---------- flow ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      namePhase.classList.remove('hidden');
      navFloat.classList.add('visible');
      animateAll();
    }, 1200);
  });

  nameNext.addEventListener('click', function () {
    hurt = hurtText.value.trim();
    if (!hurt) return;
    showPhase(namePhase, weightPhase);
  });

  weightStones.addEventListener('click', function (e) {
    var btn = e.target.closest('.weight-btn');
    if (!btn) return;
    weight = parseInt(btn.getAttribute('data-weight'), 10);
    showPhase(weightPhase, wishPhase);
  });

  wishNext.addEventListener('click', function () {
    wish = wishText.value.trim();
    if (!wish) return;

    /* build choice phase */
    choiceDesc.textContent = 'You are carrying ' + WEIGHT_LABELS[weight] + '.';
    var preview = hurt.length > 120 ? hurt.substring(0, 120) + '\u2026' : hurt;
    choiceText.textContent = preview;

    showPhase(wishPhase, choicePhase);
  });

  releaseBtn.addEventListener('click', function () {
    released = true;
    showPhase(choicePhase, releasePhase);

    /* animate release words */
    var idx = 0;
    releaseWord.textContent = RELEASE_WORDS[0];
    releaseWord.classList.remove('fading');

    function nextWord() {
      releaseWord.classList.add('fading');
      setTimeout(function () {
        idx++;
        if (idx < RELEASE_WORDS.length) {
          releaseWord.textContent = RELEASE_WORDS[idx];
          releaseWord.classList.remove('fading');
          void releaseWord.offsetWidth;
          setTimeout(nextWord, 2500);
        } else {
          triggerBurst();
          finishSession();
        }
      }, 2800);
    }

    setTimeout(nextWord, 2500);
  });

  keepBtn.addEventListener('click', function () {
    released = false;
    finishSession();
  });

  function finishSession() {
    saveEntry({
      timestamp: Date.now(),
      hurt: hurt.substring(0, 200),
      weight: weight,
      wish: wish.substring(0, 200),
      released: released
    });

    if (released) {
      completeTitle.textContent = 'You set it down.';
      completeText.textContent = 'That weight is no longer yours. What happened still happened \u2014 but you chose yourself over the heaviness. That took courage.';
    } else {
      completeTitle.textContent = 'That is okay.';
      completeText.textContent = 'Some things take time. The fact that you looked at it, felt it, and named it \u2014 that is already brave. You can come back whenever you are ready.';
    }

    showPhase(releasePhase, null);
    showPhase(choicePhase, null);
    complete.classList.remove('hidden');
  }

  againBtn.addEventListener('click', function () {
    hurt = '';
    weight = 0;
    wish = '';
    released = false;
    hurtText.value = '';
    wishText.value = '';
    showPhase(complete, namePhase);
  });

  /* ---------- journal ---------- */
  journalBtn.addEventListener('click', function () {
    showPhase(complete, journal);

    var all = loadAll();
    journalSub.textContent = all.length + ' entr' + (all.length === 1 ? 'y' : 'ies');
    journalEntries.innerHTML = '';

    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'journal-empty';
      empty.textContent = 'No entries yet.';
      journalEntries.appendChild(empty);
      return;
    }

    for (var k = all.length - 1; k >= 0; k--) {
      var entry = all[k];
      var div = document.createElement('div');
      div.className = 'journal-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'journal-entry-date';
      dateEl.textContent = formatDate(new Date(entry.timestamp));

      var textEl = document.createElement('div');
      textEl.className = 'journal-entry-text';
      textEl.textContent = entry.hurt;

      var outcomeEl = document.createElement('div');
      outcomeEl.className = 'journal-entry-outcome';
      outcomeEl.textContent = entry.released ? 'released' : 'held';

      div.appendChild(dateEl);
      div.appendChild(textEl);
      div.appendChild(outcomeEl);
      journalEntries.appendChild(div);
    }
  });

  journalBack.addEventListener('click', function () {
    showPhase(journal, complete);
  });

  /* ---------- about ---------- */
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
