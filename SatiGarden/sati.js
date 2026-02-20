/* ============================================================
   SATI — still point in a turning world
   Generative mindfulness engine

   Entropy meets awareness. Chaos meets calm.
   Each session is stochastically unique.
   ============================================================ */

(function () {
  'use strict';

  // ==================== SESSION SEED ====================
  // Each session has a unique seed — no two visits are the same
  var SEED = Date.now() ^ (Math.random() * 0xFFFFFFFF >>> 0);
  var seedState = SEED;

  function seededRandom() {
    seedState ^= seedState << 13;
    seedState ^= seedState >> 17;
    seedState ^= seedState << 5;
    return ((seedState >>> 0) / 0xFFFFFFFF);
  }

  // Display seed
  document.getElementById('sessionSeed').textContent =
    'seed ' + SEED.toString(16).slice(0, 8);

  // ==================== WISDOM POOL ====================
  var WISDOM = [
    // Buddhist
    {
      text: "The mind is everything. What you think, you become.",
      source: "The Buddha",
      tradition: "Buddhist"
    },
    {
      text: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.",
      source: "The Buddha",
      tradition: "Buddhist"
    },
    {
      text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
      source: "The Buddha",
      tradition: "Buddhist"
    },
    {
      text: "Peace comes from within. Do not seek it without.",
      source: "The Buddha",
      tradition: "Buddhist"
    },
    {
      text: "The root of suffering is attachment.",
      source: "The Buddha",
      tradition: "Buddhist"
    },
    {
      text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
      source: "Thich Nhat Hanh",
      tradition: "Buddhist"
    },
    {
      text: "Breathing in, I calm body and mind. Breathing out, I smile. Dwelling in the present moment, I know this is the only moment.",
      source: "Thich Nhat Hanh",
      tradition: "Buddhist"
    },
    {
      text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
      source: "Thich Nhat Hanh",
      tradition: "Buddhist"
    },
    // Stoic
    {
      text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
      source: "Marcus Aurelius",
      tradition: "Stoic"
    },
    {
      text: "The happiness of your life depends upon the quality of your thoughts.",
      source: "Marcus Aurelius",
      tradition: "Stoic"
    },
    {
      text: "Waste no more time arguing about what a good person should be. Be one.",
      source: "Marcus Aurelius",
      tradition: "Stoic"
    },
    {
      text: "It is not what happens to you, but how you react to it that matters.",
      source: "Epictetus",
      tradition: "Stoic"
    },
    {
      text: "First say to yourself what you would be; and then do what you have to do.",
      source: "Epictetus",
      tradition: "Stoic"
    },
    {
      text: "We suffer more often in imagination than in reality.",
      source: "Seneca",
      tradition: "Stoic"
    },
    {
      text: "True happiness is to enjoy the present, without anxious dependence upon the future.",
      source: "Seneca",
      tradition: "Stoic"
    },
    // Vedic / Hindu
    {
      text: "You have the right to work, but never to the fruit of the work. You should never engage in action for the sake of reward.",
      source: "Bhagavad Gita",
      tradition: "Vedic"
    },
    {
      text: "When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.",
      source: "Bhagavad Gita",
      tradition: "Vedic"
    },
    {
      text: "The soul is neither born, and nor does it die.",
      source: "Bhagavad Gita",
      tradition: "Vedic"
    },
    {
      text: "Reshape yourself through the power of your will. Those who have conquered themselves live in peace, alike in cold and heat, pleasure and pain, praise and blame.",
      source: "Bhagavad Gita",
      tradition: "Vedic"
    },
    {
      text: "As the heat of a fire reduces wood to ashes, the fire of knowledge burns to ashes all karma.",
      source: "Bhagavad Gita",
      tradition: "Vedic"
    },
    {
      text: "Who sees all beings in his own self, and his own self in all beings, loses all fear.",
      source: "Isha Upanishad",
      tradition: "Vedic"
    },
    // Taoist
    {
      text: "Nature does not hurry, yet everything is accomplished.",
      source: "Lao Tzu",
      tradition: "Taoist"
    },
    {
      text: "The journey of a thousand miles begins with a single step.",
      source: "Lao Tzu",
      tradition: "Taoist"
    },
    {
      text: "Silence is a source of great strength.",
      source: "Lao Tzu",
      tradition: "Taoist"
    },
    {
      text: "When I let go of what I am, I become what I might be.",
      source: "Lao Tzu",
      tradition: "Taoist"
    },
    {
      text: "To the mind that is still, the whole universe surrenders.",
      source: "Lao Tzu",
      tradition: "Taoist"
    },
    {
      text: "The snow goose need not bathe to make itself white. Neither need you do anything but be yourself.",
      source: "Lao Tzu",
      tradition: "Taoist"
    },
    {
      text: "Happiness is the absence of the striving for happiness.",
      source: "Zhuangzi",
      tradition: "Taoist"
    },
    // Sufi
    {
      text: "The wound is the place where the Light enters you.",
      source: "Rumi",
      tradition: "Sufi"
    },
    {
      text: "What you seek is seeking you.",
      source: "Rumi",
      tradition: "Sufi"
    },
    {
      text: "Silence is the language of God, all else is poor translation.",
      source: "Rumi",
      tradition: "Sufi"
    },
    {
      text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
      source: "Rumi",
      tradition: "Sufi"
    },
    {
      text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
      source: "Rumi",
      tradition: "Sufi"
    },
    {
      text: "Where there is ruin, there is hope for a treasure.",
      source: "Rumi",
      tradition: "Sufi"
    },
    {
      text: "Are you looking for me? I am in the next seat. My shoulder is against yours.",
      source: "Kabir",
      tradition: "Sufi"
    },
    // Modern / Neuroscience-informed
    {
      text: "Between stimulus and response there is a space. In that space is our freedom and our power to choose our response.",
      source: "Viktor Frankl",
      tradition: "Modern"
    },
    {
      text: "Almost everything will work again if you unplug it for a few minutes, including you.",
      source: "Anne Lamott",
      tradition: "Modern"
    },
    {
      text: "The ability to observe without evaluating is the highest form of intelligence.",
      source: "Jiddu Krishnamurti",
      tradition: "Modern"
    },
    {
      text: "Attention is the rarest and purest form of generosity.",
      source: "Simone Weil",
      tradition: "Modern"
    },
    {
      text: "Your calm mind is the ultimate weapon against your challenges.",
      source: "Bryant McGill",
      tradition: "Modern"
    },
    {
      text: "The mind in its natural state can be compared to the sky, covered by layers of cloud which hide its true nature.",
      source: "Kalu Rinpoche",
      tradition: "Buddhist"
    },
    {
      text: "An awake heart is like a sky that pours light for everyone.",
      source: "Hafiz",
      tradition: "Sufi"
    }
  ];

  // Noise fragments — the entropy of modern life
  var NOISE_FRAGMENTS = [
    "breaking news", "you have 47 notifications", "trending now",
    "update available", "new follower", "limited time offer",
    "did you see what they posted", "swipe right", "act now",
    "your screen time was 6 hours", "loading...", "buffering",
    "someone liked your photo", "new message", "urgent",
    "daily briefing", "algorithm update", "content warning",
    "share your opinion", "hot take", "going viral",
    "check your email", "meeting in 5 min", "battery low",
    "storage almost full", "terms updated", "cookie consent",
    "subscribe now", "don't miss out", "everyone is talking about",
    "you should be worried about", "studies show", "experts say",
    "sources report", "influencer recommends", "download now",
    "free trial ending", "your data", "password expired",
    "verify your identity", "are you still watching",
    "recommended for you", "people also viewed", "based on your history",
    "you might like", "sponsored", "ad", "promoted",
    "react to this", "what do you think", "hot or not",
    "rank these", "which are you", "take this quiz"
  ];

  // ==================== STATE MACHINE ====================
  var STATES = {
    CHAOS: 'chaos',
    BREATHING: 'breathing',
    DEEPENING: 'deepening',
    WISDOM: 'wisdom',
    REFLECTION: 'reflection',
    GARDEN: 'garden'
  };

  var app = {
    state: STATES.CHAOS,
    calm: 0,            // 0-100
    maxCalm: 0,
    breathCount: 0,
    breathPhase: 'in',  // in, hold, out, rest
    breathTimer: null,
    breathSecond: 0,
    wisdomQueue: [],
    currentWisdom: null,
    mouseStill: 0,
    lastMouseMove: Date.now(),
    particles: [],
    noiseEls: [],
    animFrame: null,
    canvas: null,
    ctx: null
  };

  // ==================== PARTICLE SYSTEM ====================
  var PARTICLE_COUNT = 120;
  var PARTICLE_BASE_SPEED = 2.5;

  function initParticles() {
    app.canvas = document.getElementById('field');
    app.ctx = app.canvas.getContext('2d');
    resizeCanvas();

    app.particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      app.particles.push({
        x: seededRandom() * app.canvas.width,
        y: seededRandom() * app.canvas.height,
        vx: (seededRandom() - 0.5) * PARTICLE_BASE_SPEED,
        vy: (seededRandom() - 0.5) * PARTICLE_BASE_SPEED,
        baseVx: (seededRandom() - 0.5) * PARTICLE_BASE_SPEED,
        baseVy: (seededRandom() - 0.5) * PARTICLE_BASE_SPEED,
        size: seededRandom() * 2 + 0.5,
        opacity: seededRandom() * 0.3 + 0.1,
        hue: seededRandom() * 60 + 30 // gold range
      });
    }
  }

  function resizeCanvas() {
    app.canvas.width = window.innerWidth;
    app.canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  function renderParticles() {
    var ctx = app.ctx;
    var w = app.canvas.width;
    var h = app.canvas.height;
    var calmFactor = app.calm / 100; // 0-1

    // Background — gets slightly warmer as calm increases
    var bgR = Math.floor(10 + calmFactor * 5);
    var bgG = Math.floor(10 + calmFactor * 4);
    var bgB = Math.floor(15 + calmFactor * 8);
    ctx.fillStyle = 'rgb(' + bgR + ',' + bgG + ',' + bgB + ')';
    ctx.fillRect(0, 0, w, h);

    // Speed factor — particles slow as calm increases
    var speedMult = 1 - (calmFactor * 0.85);

    // Connection distance grows with calm
    var connectDist = 40 + calmFactor * 100;

    for (var i = 0; i < app.particles.length; i++) {
      var p = app.particles[i];

      // Update velocity based on calm
      p.vx = p.baseVx * speedMult;
      p.vy = p.baseVy * speedMult;

      // As calm deepens, particles drift toward center
      if (calmFactor > 0.3) {
        var cx = w / 2;
        var cy = h / 2;
        var pullStrength = (calmFactor - 0.3) * 0.003;
        p.vx += (cx - p.x) * pullStrength;
        p.vy += (cy - p.y) * pullStrength;
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Draw particle
      var alpha = p.opacity + calmFactor * 0.15;
      var goldShift = calmFactor * 0.5;
      var r = Math.floor(80 + p.hue * (1 + goldShift));
      var g = Math.floor(60 + p.hue * 0.7 * (1 + goldShift * 0.5));
      var b = Math.floor(40 + p.hue * 0.2);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + calmFactor * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
      ctx.fill();

      // Draw connections (only when calm enough)
      if (calmFactor > 0.15) {
        for (var j = i + 1; j < app.particles.length; j++) {
          var q = app.particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            var lineAlpha = (1 - dist / connectDist) * calmFactor * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(201, 168, 76, ' + lineAlpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Center glow that grows with calm
    if (calmFactor > 0.2) {
      var glowRadius = 50 + calmFactor * 200;
      var gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, glowRadius);
      gradient.addColorStop(0, 'rgba(201, 168, 76, ' + (calmFactor * 0.06) + ')');
      gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    app.animFrame = requestAnimationFrame(renderParticles);
  }

  // ==================== NOISE FRAGMENTS ====================
  function initNoise() {
    var layer = document.getElementById('noiseLayer');
    var count = Math.min(25, Math.floor(window.innerWidth / 50));

    for (var i = 0; i < count; i++) {
      var el = document.createElement('div');
      el.className = 'noise-fragment';
      el.textContent = NOISE_FRAGMENTS[Math.floor(seededRandom() * NOISE_FRAGMENTS.length)];

      var startX = (seededRandom() * 120 - 10) + 'vw';
      var startY = (seededRandom() * 120 - 10) + 'vh';
      var endX = (seededRandom() * 120 - 10) + 'vw';
      var endY = (seededRandom() * 120 - 10) + 'vh';
      var duration = 8 + seededRandom() * 15;
      var delay = seededRandom() * -20;
      var maxOpacity = 0.15 + seededRandom() * 0.25;

      el.style.setProperty('--start-x', startX);
      el.style.setProperty('--start-y', startY);
      el.style.setProperty('--end-x', endX);
      el.style.setProperty('--end-y', endY);
      el.style.setProperty('--max-opacity', maxOpacity);
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      el.style.fontSize = (0.6 + seededRandom() * 0.4) + 'rem';

      layer.appendChild(el);
      app.noiseEls.push(el);
    }
  }

  function updateNoise() {
    var opacity = 1 - (app.calm / 100) * 0.95;
    document.getElementById('noiseLayer').style.opacity = opacity;
  }

  // ==================== CALM SYSTEM ====================
  function updateCalm() {
    var label = document.getElementById('calmLabel');
    var fill = document.getElementById('calmFill');

    fill.style.width = app.calm + '%';

    if (app.calm < 15) {
      label.textContent = 'scattered';
      label.style.color = 'var(--smoke)';
    } else if (app.calm < 35) {
      label.textContent = 'settling';
      label.style.color = 'var(--mist)';
    } else if (app.calm < 55) {
      label.textContent = 'gathering';
      label.style.color = 'var(--cloud)';
    } else if (app.calm < 75) {
      label.textContent = 'present';
      label.style.color = 'var(--snow)';
    } else if (app.calm < 90) {
      label.textContent = 'still';
      label.style.color = 'var(--gold)';
    } else {
      label.textContent = 'sati';
      label.style.color = 'var(--gold)';
    }

    app.maxCalm = Math.max(app.maxCalm, app.calm);
    updateNoise();

    // Trigger wisdom at threshold
    if (app.calm >= 60 && app.state === STATES.DEEPENING && !app.currentWisdom) {
      showWisdom();
    }

    // Show reflection space at deep calm
    if (app.calm >= 75 && app.state === STATES.WISDOM) {
      showReflection();
    }
  }

  // Calm decays slowly when not actively breathing
  function calmDecay() {
    if (app.state !== STATES.BREATHING && app.state !== STATES.DEEPENING) return;
    if (app.calm > 0) {
      app.calm = Math.max(0, app.calm - 0.1);
      updateCalm();
    }
  }
  setInterval(calmDecay, 200);

  // Mouse stillness detection — stillness adds calm
  document.addEventListener('mousemove', function () {
    app.lastMouseMove = Date.now();
  });
  document.addEventListener('touchstart', function () {
    app.lastMouseMove = Date.now();
  }, { passive: true });

  setInterval(function () {
    if (app.state === STATES.BREATHING || app.state === STATES.DEEPENING || app.state === STATES.WISDOM) {
      var timeSinceMove = Date.now() - app.lastMouseMove;
      if (timeSinceMove > 2000) {
        // Stillness bonus
        app.calm = Math.min(100, app.calm + 0.15);
        updateCalm();
      }
    }
  }, 500);

  // ==================== BREATHING GUIDE ====================
  var BREATH_PHASES = [
    { name: 'in', label: 'breathe in', seconds: 4 },
    { name: 'hold', label: 'hold', seconds: 4 },
    { name: 'out', label: 'breathe out', seconds: 6 },
    { name: 'rest', label: 'rest', seconds: 2 }
  ];
  var breathPhaseIdx = 0;
  var breathSecondCount = 0;
  var breathCycleCount = 0;
  var totalBreathSeconds = 0;

  function startBreathing() {
    app.state = STATES.BREATHING;
    breathPhaseIdx = 0;
    breathSecondCount = 0;
    breathCycleCount = 0;
    totalBreathSeconds = 0;

    // Show UI
    document.getElementById('stillPoint').classList.add('hidden');
    var guide = document.getElementById('breathGuide');
    guide.classList.remove('hidden');
    guide.classList.add('visible');
    document.getElementById('calmMeter').classList.add('visible');
    document.getElementById('navWhisper').classList.add('visible');

    tickBreath();
  }

  function tickBreath() {
    var phase = BREATH_PHASES[breathPhaseIdx];
    var instruction = document.getElementById('breathInstruction');
    var timer = document.getElementById('breathTimer');
    var progress = document.getElementById('breathProgress');
    var sub = document.getElementById('breathSub');
    var countEl = document.getElementById('breathCount');

    instruction.textContent = phase.label;
    var remaining = phase.seconds - breathSecondCount;
    timer.textContent = remaining;

    // Progress circle
    var circumference = 2 * Math.PI * 90; // r=90
    var phaseProgress = breathSecondCount / phase.seconds;
    progress.style.strokeDashoffset = circumference * (1 - phaseProgress);

    // Color based on phase
    if (phase.name === 'in') {
      progress.style.stroke = '#c9a84c';
    } else if (phase.name === 'hold') {
      progress.style.stroke = '#8a8ac9';
    } else if (phase.name === 'out') {
      progress.style.stroke = '#5a8a6a';
    } else {
      progress.style.stroke = '#4a4a5a';
    }

    // Update instruction tone
    if (breathCycleCount < 3) {
      sub.textContent = 'follow the circle';
    } else if (breathCycleCount < 6) {
      sub.textContent = 'let thoughts pass like clouds';
    } else if (breathCycleCount < 10) {
      sub.textContent = 'you are the sky, not the weather';
    } else {
      sub.textContent = 'just this breath';
    }

    countEl.textContent = breathCycleCount + 1;

    // Calm increases during breathing
    totalBreathSeconds++;
    if (phase.name === 'in' || phase.name === 'out') {
      app.calm = Math.min(100, app.calm + 0.6);
    } else if (phase.name === 'hold') {
      app.calm = Math.min(100, app.calm + 0.4);
    }
    updateCalm();

    // Advance
    breathSecondCount++;
    if (breathSecondCount >= phase.seconds) {
      breathSecondCount = 0;
      breathPhaseIdx++;
      if (breathPhaseIdx >= BREATH_PHASES.length) {
        breathPhaseIdx = 0;
        breathCycleCount++;

        // After enough cycles, transition to deepening
        if (breathCycleCount >= 3 && app.calm >= 40 && app.state === STATES.BREATHING) {
          app.state = STATES.DEEPENING;
        }
      }
    }

    app.breathTimer = setTimeout(tickBreath, 1000);
  }

  // ==================== WISDOM DISPLAY ====================
  function shuffleWisdom() {
    // Create a stochastically shuffled queue
    app.wisdomQueue = WISDOM.slice();
    for (var i = app.wisdomQueue.length - 1; i > 0; i--) {
      var j = Math.floor(seededRandom() * (i + 1));
      var temp = app.wisdomQueue[i];
      app.wisdomQueue[i] = app.wisdomQueue[j];
      app.wisdomQueue[j] = temp;
    }
  }

  function showWisdom() {
    if (app.wisdomQueue.length === 0) shuffleWisdom();
    app.currentWisdom = app.wisdomQueue.pop();
    app.state = STATES.WISDOM;

    // Fade out breathing guide
    var guide = document.getElementById('breathGuide');
    guide.classList.remove('visible');
    guide.classList.add('hidden');

    // Show wisdom
    var pool = document.getElementById('wisdomPool');
    document.getElementById('wisdomText').textContent = app.currentWisdom.text;
    document.getElementById('wisdomSource').textContent = '— ' + app.currentWisdom.source;
    document.getElementById('wisdomTradition').textContent = app.currentWisdom.tradition;

    setTimeout(function () {
      pool.classList.remove('hidden');
      pool.classList.add('visible');
    }, 800);
  }

  function hideWisdom() {
    var pool = document.getElementById('wisdomPool');
    pool.classList.remove('visible');
    pool.classList.add('hidden');
  }

  // ==================== REFLECTION ====================
  function showReflection() {
    app.state = STATES.REFLECTION;

    var space = document.getElementById('reflectionSpace');
    setTimeout(function () {
      space.classList.remove('hidden');
      space.classList.add('visible');
    }, 1500);
  }

  function saveReflection() {
    var input = document.getElementById('reflectionInput');
    var text = input.value.trim();
    if (!text) return;

    var entry = {
      id: Date.now().toString(),
      text: text,
      date: new Date().toISOString(),
      wisdom: app.currentWisdom ? app.currentWisdom.source : null,
      seed: SEED.toString(16).slice(0, 8),
      calmReached: Math.round(app.maxCalm)
    };

    var entries = getGardenEntries();
    entries.unshift(entry);
    try {
      localStorage.setItem('sati_garden', JSON.stringify(entries));
    } catch (e) { /* ignore */ }

    input.value = '';

    // Reset for another cycle
    resetToBreathing();
  }

  function getGardenEntries() {
    try {
      return JSON.parse(localStorage.getItem('sati_garden') || '[]');
    } catch (e) { return []; }
  }

  function resetToBreathing() {
    // Hide reflection and wisdom
    document.getElementById('reflectionSpace').classList.remove('visible');
    document.getElementById('reflectionSpace').classList.add('hidden');
    hideWisdom();

    app.currentWisdom = null;
    app.calm = Math.max(30, app.calm - 20); // Slight calm reset
    app.state = STATES.BREATHING;

    // Show breathing guide again
    var guide = document.getElementById('breathGuide');
    setTimeout(function () {
      guide.classList.remove('hidden');
      guide.classList.add('visible');
    }, 600);
  }

  // ==================== GARDEN VIEW ====================
  function showGarden() {
    var view = document.getElementById('gardenView');
    var container = document.getElementById('gardenThoughts');
    var entries = getGardenEntries();

    if (entries.length === 0) {
      container.innerHTML = '<p class="garden-empty">no thoughts planted yet. return to stillness and breathe.</p>';
    } else {
      var html = '';
      entries.forEach(function (entry) {
        var date = new Date(entry.date);
        var dateStr = date.toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });
        var timeStr = date.toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit'
        });

        html += '<div class="garden-thought">' +
          '<p class="garden-thought-text">' + escapeHtml(entry.text) + '</p>' +
          '<div class="garden-thought-meta">' +
            '<span class="garden-thought-date">' + dateStr + ' &middot; ' + timeStr +
              (entry.calmReached ? ' &middot; calm: ' + entry.calmReached + '%' : '') +
            '</span>' +
            (entry.wisdom ? '<span class="garden-thought-wisdom">' + escapeHtml(entry.wisdom) + '</span>' : '') +
          '</div>' +
          '<button class="garden-thought-delete" data-id="' + entry.id + '">release</button>' +
        '</div>';
      });
      container.innerHTML = html;
    }

    view.classList.remove('hidden');
    view.classList.add('visible');
  }

  function hideGarden() {
    var view = document.getElementById('gardenView');
    view.classList.remove('visible');
    view.classList.add('hidden');
  }

  function deleteGardenEntry(id) {
    var entries = getGardenEntries().filter(function (e) { return e.id !== id; });
    try {
      localStorage.setItem('sati_garden', JSON.stringify(entries));
    } catch (e) { /* ignore */ }
    showGarden(); // Re-render
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ==================== ABOUT ====================
  function showAbout() {
    var overlay = document.getElementById('aboutOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
  }
  function hideAbout() {
    var overlay = document.getElementById('aboutOverlay');
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
  }

  // ==================== EVENT HANDLERS ====================
  // Still point click — begin
  document.getElementById('stillPoint').addEventListener('click', function () {
    startBreathing();
  });

  // Save reflection
  document.getElementById('saveReflection').addEventListener('click', saveReflection);

  // Return to stillness from garden
  document.getElementById('returnToStill').addEventListener('click', function () {
    hideGarden();
  });

  // Nav buttons
  document.getElementById('btnStillness').addEventListener('click', function () {
    hideGarden();
    hideAbout();
    if (app.state === STATES.CHAOS) {
      // Reset to beginning
      document.getElementById('stillPoint').classList.remove('hidden');
    }
  });

  document.getElementById('btnGarden').addEventListener('click', function () {
    hideAbout();
    showGarden();
  });

  document.getElementById('btnAbout').addEventListener('click', function () {
    hideGarden();
    showAbout();
  });

  document.getElementById('aboutClose').addEventListener('click', hideAbout);

  // Click on about overlay background closes it
  document.getElementById('aboutOverlay').addEventListener('click', function (e) {
    if (e.target === this) hideAbout();
  });

  // Garden entry deletion
  document.getElementById('gardenThoughts').addEventListener('click', function (e) {
    var btn = e.target.closest('.garden-thought-delete');
    if (btn) {
      deleteGardenEntry(btn.dataset.id);
    }
  });

  // Wisdom card click — cycle to next wisdom or continue
  document.getElementById('wisdomPool').addEventListener('click', function () {
    if (app.state === STATES.WISDOM && app.calm < 75) {
      // Not calm enough for reflection yet, show another wisdom
      hideWisdom();
      app.currentWisdom = null;
      app.state = STATES.DEEPENING;

      // Show breathing again briefly
      var guide = document.getElementById('breathGuide');
      guide.classList.remove('hidden');
      guide.classList.add('visible');
    }
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideAbout();
      hideGarden();
    }
    if (e.key === ' ' && app.state === STATES.CHAOS) {
      e.preventDefault();
      startBreathing();
    }
  });

  // ==================== INITIALIZATION ====================
  function init() {
    shuffleWisdom();
    initParticles();
    initNoise();
    renderParticles();

    // Show nav whisper after a delay
    setTimeout(function () {
      document.getElementById('navWhisper').classList.add('visible');
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
