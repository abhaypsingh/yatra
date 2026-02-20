/* ============================================================
   MALA — 108 beads
   Date-seeded daily practice with 5 bead types
   ============================================================ */

(function () {
  'use strict';

  // ==================== SEEDED PRNG ====================
  var seedState;

  function initSeed() {
    var today = new Date();
    var dateStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    seedState = 0;
    for (var i = 0; i < dateStr.length; i++) {
      seedState = ((seedState << 5) - seedState + dateStr.charCodeAt(i)) | 0;
    }
    if (seedState === 0) seedState = 1;
  }

  function seededRandom() {
    seedState ^= seedState << 13;
    seedState ^= seedState >> 17;
    seedState ^= seedState << 5;
    return (seedState >>> 0) / 0xFFFFFFFF;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(seededRandom() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ==================== BEAD CONTENT POOLS ====================
  var BREATHS = [
    "Breathe in for 4 counts. Hold for 4. Release for 6.",
    "Breathe in through your nose. Out through your mouth. Slowly.",
    "Inhale: gather what you need. Exhale: release what you don't.",
    "Three deep breaths. Nothing else. Just three.",
    "Breathe as if you are sipping the air through a straw. Slowly. Gently.",
    "Fill your belly first, then your chest. Release chest first, then belly.",
    "One long inhale. Hold it at the top. Let it fall like a leaf.",
    "Breathe in calm. Breathe out tension. Feel the difference.",
    "Match your breath to a slow count of five. In. Out.",
    "Close your eyes for this breath. Return when it's done.",
    "Inhale: I am here. Exhale: this is enough.",
    "Breathe in the present moment. Breathe out everything else.",
    "Let your exhale be twice as long as your inhale.",
    "Breathe in through the nose for 4. Hold for 7. Out through the mouth for 8.",
    "One breath. Just one. Make it the deepest breath you've taken today.",
    "Breathe as if your breath could reach the bottom of the ocean.",
    "Feel the air enter. Feel it leave. That is all.",
    "Inhale peace. Exhale noise.",
    "Let your shoulders drop with each exhale.",
    "Breathe in possibility. Breathe out certainty.",
    "Soften your jaw. Soften your hands. Now breathe.",
    "Imagine your breath as golden light filling your body."
  ];

  var WISDOMS = [
    "The obstacle is the path. — Zen proverb",
    "You are not a drop in the ocean. You are the entire ocean in a drop. — Rumi",
    "What you seek is seeking you. — Rumi",
    "Be yourself; everyone else is already taken. — Oscar Wilde",
    "The wound is the place where the Light enters you. — Rumi",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle",
    "The only way out is through. — Robert Frost",
    "No feeling is final. — Rainer Maria Rilke",
    "Between stimulus and response there is a space. In that space is our freedom. — Viktor Frankl",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. — The Buddha",
    "The quieter you become, the more you can hear. — Ram Dass",
    "Everything that irritates us about others can lead us to an understanding of ourselves. — Carl Jung",
    "You have power over your mind — not outside events. Realize this, and you will find strength. — Marcus Aurelius",
    "When I let go of what I am, I become what I might be. — Lao Tzu",
    "Not everything that is faced can be changed, but nothing can be changed until it is faced. — James Baldwin",
    "The present moment is the only moment available to us, and it is the door to all moments. — Thich Nhat Hanh",
    "We suffer more often in imagination than in reality. — Seneca",
    "Life is not a problem to be solved, but a reality to be experienced. — Soren Kierkegaard",
    "In the middle of difficulty lies opportunity. — Albert Einstein",
    "The best time to plant a tree was twenty years ago. The second best time is now. — Proverb",
    "Rivers know this: there is no hurry. We shall get there some day. — A.A. Milne",
    "What the caterpillar calls the end of the world, the master calls a butterfly. — Richard Bach",
    "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it. — Rumi",
    "I have lived through many terrible things in my life, some of which actually happened. — Mark Twain",
    "Turn your wounds into wisdom. — Oprah Winfrey",
    "Knowing yourself is the beginning of all wisdom. — Aristotle"
  ];

  var QUESTIONS = [
    "What is one thing you are avoiding that you know matters?",
    "If fear were not a factor, what would you do today?",
    "Who in your life deserves a thank you that you haven't given?",
    "What is a belief you hold that you have never questioned?",
    "What would you tell your five-years-ago self?",
    "When was the last time you changed your mind about something important?",
    "What are you pretending not to know?",
    "If today were the last page of this chapter, what would the next chapter be about?",
    "Who do you become when no one is watching?",
    "What is something you need to forgive yourself for?",
    "What would happen if you let go of the thing you're holding tightest?",
    "What does the bravest version of you look like?",
    "What story are you telling yourself that might not be true?",
    "If you could only keep three things in your life, what would they be?",
    "What have you been given that you did not earn?",
    "Where in your body do you carry your stress? Can you breathe into that space?",
    "What is a small act of courage you can take today?",
    "What would you do if you knew you were enough, exactly as you are?",
    "When did someone believe in you before you believed in yourself?",
    "What are you grateful for that you usually take for granted?",
    "What does peace look like for you, right now, today?",
    "If your future self could send you one sentence, what would it say?",
    "What is one thing you can let go of today?",
    "What does it mean to be strong? Has your definition changed?"
  ];

  var GRATITUDES = [
    "Name one person who made today a little easier.",
    "What is one thing your body did for you today without you asking?",
    "Name a meal you have eaten recently that was made with care.",
    "What is one sound you heard today that you are glad exists?",
    "Name someone who loves you in a way you don't always notice.",
    "What is one skill you have that you did not have five years ago?",
    "Think of a place that feels safe. Hold it in your mind.",
    "Name one difficulty from your past that made you stronger.",
    "What is something beautiful you saw recently?",
    "Name one technology you used today that someone worked years to create.",
    "Who taught you something important without realizing it?",
    "What is one thing about today that will never happen again in exactly this way?",
    "Name one person you have never met who improved your life.",
    "What is one thing you own that brings you comfort?",
    "Think of someone who forgave you. Hold them in your mind.",
    "Name a season you love and one thing it gives you.",
    "What is one freedom you have that others do not?",
    "Name one act of kindness you witnessed recently.",
    "What is something about your home that you are grateful for?",
    "Think of a conversation that changed how you see the world."
  ];

  var SILENCES = [
    "Sit with this silence for five seconds. Just be here.",
    "Close your eyes. Open them when you are ready.",
    "Listen. What is the quietest sound you can hear right now?",
    "Feel the weight of your body. Where does it rest?",
    "Notice three things you can see without moving your head.",
    "Let the silence hold you. You do not need to fill it.",
    "For this moment, you have no obligations. Rest in that.",
    "Place your hand on your chest. Feel your heart. It has never stopped working for you.",
    "Think of nothing. If a thought comes, let it pass like a cloud.",
    "This bead has no words. Only presence.",
    "The silence between notes is what makes music. This is that silence.",
    "Hold stillness the way you would hold water — gently, openly.",
    "Be a witness to this moment. That is all.",
    "There is nothing to solve right now. Nothing to fix. Just this.",
    "You are allowed to rest. Even now. Especially now.",
    "Notice the space between your inhale and your exhale. Stay there.",
    "Let your mind be like a clear lake. Undisturbed. Reflecting."
  ];

  // ==================== GENERATE TODAY'S MALA ====================
  var TOTAL_BEADS = 108;
  var beads = [];
  var beadCounts = { breath: 0, wisdom: 0, question: 0, gratitude: 0, silence: 0 };

  function generateMala() {
    initSeed();

    // Shuffle each pool
    var breaths   = shuffle(BREATHS);
    var wisdoms   = shuffle(WISDOMS);
    var questions = shuffle(QUESTIONS);
    var gratitudes = shuffle(GRATITUDES);
    var silences  = shuffle(SILENCES);

    // Create bead type sequence: weighted distribution
    // ~25 breath, ~25 wisdom, ~22 question, ~20 gratitude, ~16 silence = 108
    var types = [];
    var i;
    for (i = 0; i < 25; i++) types.push('breath');
    for (i = 0; i < 25; i++) types.push('wisdom');
    for (i = 0; i < 22; i++) types.push('question');
    for (i = 0; i < 20; i++) types.push('gratitude');
    for (i = 0; i < 16; i++) types.push('silence');
    types = shuffle(types);

    // Counters for cycling through content
    var counters = { breath: 0, wisdom: 0, question: 0, gratitude: 0, silence: 0 };
    var pools = {
      breath: breaths,
      wisdom: wisdoms,
      question: questions,
      gratitude: gratitudes,
      silence: silences
    };

    beads = [];
    for (i = 0; i < TOTAL_BEADS; i++) {
      var type = types[i];
      var pool = pools[type];
      var content = pool[counters[type] % pool.length];
      counters[type]++;
      beads.push({ type: type, content: content });
    }

    beadCounts = { breath: 0, wisdom: 0, question: 0, gratitude: 0, silence: 0 };
  }

  // ==================== SVG MALA RING ====================
  var svgNS = 'http://www.w3.org/2000/svg';
  var beadElements = [];

  function buildRing() {
    var svg = document.getElementById('malaRing');
    svg.innerHTML = '';
    beadElements = [];

    var cx = 200, cy = 200, radius = 170;
    var n = TOTAL_BEADS;

    for (var i = 0; i < n; i++) {
      var angle = (i / n) * Math.PI * 2 - Math.PI / 2; // start from top
      var x = cx + radius * Math.cos(angle);
      var y = cy + radius * Math.sin(angle);

      var circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', x.toFixed(1));
      circle.setAttribute('cy', y.toFixed(1));
      circle.setAttribute('r', '3');
      circle.setAttribute('class', 'bead-dot untouched');
      circle.dataset.index = i;

      svg.appendChild(circle);
      beadElements.push(circle);
    }
  }

  function updateRing(currentIdx) {
    for (var i = 0; i < beadElements.length; i++) {
      var el = beadElements[i];
      el.setAttribute('class', 'bead-dot');

      if (i < currentIdx) {
        el.classList.add('touched');
        el.classList.add('type-' + beads[i].type);
        el.setAttribute('r', '3');
      } else if (i === currentIdx) {
        el.classList.add('current');
        el.setAttribute('r', '5');
      } else {
        el.classList.add('untouched');
        el.setAttribute('r', '3');
      }
    }
  }

  // ==================== BEAD CARD ====================
  var BEAD_LABELS = {
    breath: 'breath',
    wisdom: 'wisdom',
    question: 'question',
    gratitude: 'gratitude',
    silence: 'silence'
  };

  var BEAD_INSTRUCTIONS = {
    breath: 'pause and breathe',
    wisdom: 'let this settle',
    question: 'sit with this',
    gratitude: 'hold this in your heart',
    silence: 'just be'
  };

  function showBead(idx) {
    var bead = beads[idx];
    var card = document.getElementById('beadCard');
    var typeEl = document.getElementById('beadType');
    var contentEl = document.getElementById('beadContent');
    var instrEl = document.getElementById('beadInstruction');

    // Remove old type classes
    card.className = 'bead-card type-' + bead.type;

    typeEl.textContent = BEAD_LABELS[bead.type];
    instrEl.textContent = BEAD_INSTRUCTIONS[bead.type];

    // Animate content change
    contentEl.style.opacity = '0';
    setTimeout(function () {
      contentEl.textContent = bead.content;
      contentEl.style.opacity = '1';
    }, 200);
  }

  // ==================== PRACTICE STATE ====================
  var currentBead = 0;

  function advanceBead() {
    if (currentBead >= TOTAL_BEADS) return;

    // Count this bead type
    beadCounts[beads[currentBead].type]++;
    currentBead++;

    // Update counter
    document.getElementById('malaCount').textContent = currentBead;

    // Update ring
    updateRing(currentBead);

    if (currentBead >= TOTAL_BEADS) {
      // Complete
      setTimeout(showCompletion, 600);
      return;
    }

    // Show next bead
    showBead(currentBead);

    // Update button text at intervals
    var btn = document.getElementById('nextBead');
    if (currentBead >= 100) {
      btn.textContent = 'almost there...';
    } else if (currentBead >= 54) {
      btn.textContent = 'past the halfway';
    } else if (currentBead >= 27) {
      btn.textContent = 'continue';
    }
  }

  // ==================== COMPLETION ====================
  function showCompletion() {
    document.getElementById('practice').classList.add('hidden');
    document.getElementById('completion').classList.remove('hidden');

    document.getElementById('statBreaths').textContent = beadCounts.breath;
    document.getElementById('statWisdom').textContent = beadCounts.wisdom;
    document.getElementById('statQuestions').textContent = beadCounts.question;
    document.getElementById('statGratitude').textContent = beadCounts.gratitude;
    document.getElementById('statSilence').textContent = beadCounts.silence;

    // Show streak
    var streak = getStreak();
    if (streak > 1) {
      document.getElementById('streakDisplay').textContent = streak + ' days in a row';
    } else {
      document.getElementById('streakDisplay').textContent = 'your first bead of this streak';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== PERSISTENCE ====================
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function saveCompletion(dedication) {
    var entry = {
      date: new Date().toISOString(),
      key: todayKey(),
      dedication: dedication || ''
    };

    try {
      var entries = JSON.parse(localStorage.getItem('mala_history') || '[]');
      // Don't duplicate today
      var alreadyToday = entries.some(function (e) { return e.key === entry.key; });
      if (!alreadyToday) {
        entries.unshift(entry);
        localStorage.setItem('mala_history', JSON.stringify(entries));
      }
    } catch (e) { /* ignore */ }
  }

  function getStreak() {
    try {
      var entries = JSON.parse(localStorage.getItem('mala_history') || '[]');
      if (entries.length === 0) return 1; // Today will be the first

      var streak = 1; // Today counts
      var d = new Date();
      d.setDate(d.getDate() - 1); // Start from yesterday

      for (var i = 0; i < 365; i++) {
        var key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var found = entries.some(function (e) { return e.key === key; });
        if (found) {
          streak++;
          d.setDate(d.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    } catch (e) {
      return 1;
    }
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem('mala_history') || '[]'); }
    catch (e) { return []; }
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ==================== HISTORY DISPLAY ====================
  function showHistory() {
    var entries = getHistory();
    var container = document.getElementById('historyEntries');

    if (entries.length === 0) {
      container.innerHTML = '<p class="history-empty">no practices completed yet</p>';
    } else {
      var html = '';
      entries.forEach(function (e) {
        var d = new Date(e.date);
        var dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        html += '<div class="history-entry">' +
          '<span class="history-date">' + dateStr + '</span>' +
          (e.dedication ? '<span class="history-dedication">for ' + escapeHtml(e.dedication) + '</span>' : '') +
        '</div>';
      });
      container.innerHTML = html;
    }

    document.getElementById('historyOverlay').classList.remove('hidden');
    document.getElementById('historyOverlay').classList.add('visible');
  }

  function hideHistory() {
    document.getElementById('historyOverlay').classList.remove('visible');
    document.getElementById('historyOverlay').classList.add('hidden');
  }

  // ==================== RESTART ====================
  function restart() {
    currentBead = 0;
    beadCounts = { breath: 0, wisdom: 0, question: 0, gratitude: 0, silence: 0 };

    generateMala();
    buildRing();
    updateRing(0);

    document.getElementById('malaCount').textContent = '0';
    document.getElementById('dedicationInput').value = '';
    document.getElementById('nextBead').textContent = 'touch the next bead';

    document.getElementById('completion').classList.add('hidden');
    document.getElementById('practice').classList.remove('hidden');

    showBead(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== EVENT LISTENERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('practice').classList.remove('hidden');
      document.getElementById('navFloat').classList.add('visible');

      generateMala();
      buildRing();
      updateRing(0);
      showBead(0);
    }, 1200);
  });

  // Next bead
  document.getElementById('nextBead').addEventListener('click', advanceBead);

  // Seal
  document.getElementById('sealBtn').addEventListener('click', function () {
    var dedication = document.getElementById('dedicationInput').value.trim();
    saveCompletion(dedication);

    this.textContent = 'sealed \u2713';
    this.disabled = true;
    setTimeout(function () {
      var btn = document.getElementById('sealBtn');
      btn.textContent = 'seal this day';
      btn.disabled = false;
    }, 2000);
  });

  // Restart
  document.getElementById('restartBtn').addEventListener('click', restart);

  // History
  document.getElementById('navHistory').addEventListener('click', showHistory);
  document.getElementById('historyClose').addEventListener('click', hideHistory);

  // About
  document.getElementById('navAbout').addEventListener('click', function () {
    document.getElementById('aboutOverlay').classList.remove('hidden');
    document.getElementById('aboutOverlay').classList.add('visible');
  });
  document.getElementById('aboutClose').addEventListener('click', function () {
    document.getElementById('aboutOverlay').classList.remove('visible');
    document.getElementById('aboutOverlay').classList.add('hidden');
  });

  // Overlay click-to-close
  ['aboutOverlay', 'historyOverlay'].forEach(function (id) {
    document.getElementById(id).addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('visible');
        this.classList.add('hidden');
      }
    });
  });

  // Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideHistory();
      document.getElementById('aboutOverlay').classList.remove('visible');
      document.getElementById('aboutOverlay').classList.add('hidden');
    }
  });

})();
