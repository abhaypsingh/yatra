/* ============================================================
   SWABHAVA — true nature
   Build a core document of self-truths over time
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'swabhava_core';

  var PROMPTS = [
    { category: 'what I love', title: 'What do you love?', desc: 'Not what you are supposed to love. Not what is cool or popular. What genuinely lights something up inside you?' },
    { category: 'what I believe', title: 'What do you believe is right?', desc: 'A principle you hold even when no one is watching. Something you would not betray even if it cost you.' },
    { category: 'what I am good at', title: 'What are you genuinely good at?', desc: 'Not what you have been told you are good at. Something you know from your own experience. It can be small.' },
    { category: 'what makes me angry', title: 'What makes you angry?', desc: 'Anger is a compass. It points at what you care about. What injustice, cruelty, or dishonesty makes your blood heat up?' },
    { category: 'what I am afraid of', title: 'What are you afraid of?', desc: 'Not monsters. Real fear. The kind that lives in the pit of your stomach. Name it and it loses some of its power.' },
    { category: 'what I dream about', title: 'What do you dream about becoming?', desc: 'Not a job title. A way of being. What kind of person do you want to be at thirty? At fifty?' },
    { category: 'what I know for sure', title: 'What do you know for certain?', desc: 'One thing that is absolutely, unshakably true in your experience. Something you have lived, not just heard.' },
    { category: 'what I would fight for', title: 'What would you stand up for?', desc: 'Even if it meant being alone. Even if it meant losing something. What matters that much?' },
    { category: 'what brings me peace', title: 'What brings you peace?', desc: 'A place, a person, a sound, a feeling. Where does the noise in your head go quiet?' },
    { category: 'what I refuse', title: 'What do you refuse to become?', desc: 'A line you will not cross. A version of yourself you reject. Sometimes knowing what you are not is as powerful as knowing what you are.' },
    { category: 'what I am proud of', title: 'What are you quietly proud of?', desc: 'Something you did that no one noticed or praised. A moment where you chose right even though it was hard.' },
    { category: 'who I am', title: 'Who are you?', desc: 'Not your name, your grade, your family situation. Underneath all of that. In one or two sentences. Who are you, really?' }
  ];

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var bgCanvas      = document.getElementById('bgCanvas');
  var ctx           = bgCanvas.getContext('2d');
  var builder       = document.getElementById('builder');
  var promptTitle   = document.getElementById('promptTitle');
  var promptDesc    = document.getElementById('promptDesc');
  var answerInput   = document.getElementById('answerInput');
  var saveAnswer    = document.getElementById('saveAnswer');
  var skipPrompt    = document.getElementById('skipPrompt');
  var progressText  = document.getElementById('progressText');
  var coreDoc       = document.getElementById('coreDoc');
  var coreEntries   = document.getElementById('coreEntries');
  var addMore       = document.getElementById('addMore');
  var viewTimeline  = document.getElementById('viewTimeline');
  var timeline      = document.getElementById('timeline');
  var timelineSub   = document.getElementById('timelineSub');
  var timelineEntries = document.getElementById('timelineEntries');
  var timelineBack  = document.getElementById('timelineBack');
  var navFloat      = document.getElementById('navFloat');
  var navCore       = document.getElementById('navCore');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var promptQueue = [];
  var currentPromptIdx = 0;
  var sessionAnswered = 0;
  var animFrame = null;

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

  /* ---------- build prompt queue ---------- */
  function buildQueue() {
    var existing = loadAll();
    var answeredCategories = {};
    for (var i = 0; i < existing.length; i++) {
      answeredCategories[existing[i].category] = true;
    }
    /* unanswered first, then answered (for revisiting) */
    var unanswered = [];
    var answered = [];
    for (var j = 0; j < PROMPTS.length; j++) {
      if (answeredCategories[PROMPTS[j].category]) {
        answered.push(PROMPTS[j]);
      } else {
        unanswered.push(PROMPTS[j]);
      }
    }
    /* shuffle each group */
    promptQueue = shuffle(unanswered).concat(shuffle(answered));
    currentPromptIdx = 0;
    sessionAnswered = 0;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ---------- canvas: inner glow / floating light ---------- */
  var sparks = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Spark() { this.reset(); }
  Spark.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = -Math.random() * 0.3 - 0.05;
    this.alpha = Math.random() * 0.35 + 0.05;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
  };
  Spark.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += this.pulseSpeed;
    if (this.y < -10) this.reset();
    if (this.x < -10 || this.x > bgCanvas.width + 10) this.reset();
  };
  Spark.prototype.draw = function () {
    var glow = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(184, 152, 72, ' + glow + ')';
    ctx.fill();
  };

  for (var i = 0; i < 50; i++) sparks.push(new Spark());

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 8, 0.05)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    /* center glow */
    var cx = bgCanvas.width / 2;
    var cy = bgCanvas.height / 2;
    var gr = Math.min(bgCanvas.width, bgCanvas.height) * 0.3;
    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
    grad.addColorStop(0, 'rgba(184, 152, 72, 0.02)');
    grad.addColorStop(1, 'rgba(184, 152, 72, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    for (var j = 0; j < sparks.length; j++) {
      sparks[j].update();
      sparks[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- show prompt ---------- */
  function showPrompt() {
    if (currentPromptIdx >= promptQueue.length) {
      showCoreDoc();
      return;
    }
    var p = promptQueue[currentPromptIdx];
    promptTitle.textContent = p.title;
    promptDesc.textContent = p.desc;
    answerInput.value = '';
    progressText.textContent = (sessionAnswered > 0 ? sessionAnswered + ' truth' + (sessionAnswered === 1 ? '' : 's') + ' written this session' : 'take your time');
    builder.classList.remove('hidden');
    coreDoc.classList.add('hidden');
    timeline.classList.add('hidden');
  }

  saveAnswer.addEventListener('click', function () {
    var text = answerInput.value.trim();
    if (!text) return;
    var p = promptQueue[currentPromptIdx];
    saveEntry({
      category: p.category,
      text: text,
      timestamp: Date.now()
    });
    sessionAnswered++;
    currentPromptIdx++;

    if (sessionAnswered >= 3 || currentPromptIdx >= promptQueue.length) {
      showCoreDoc();
    } else {
      showPrompt();
    }
  });

  skipPrompt.addEventListener('click', function () {
    currentPromptIdx++;
    if (currentPromptIdx >= promptQueue.length) {
      showCoreDoc();
    } else {
      showPrompt();
    }
  });

  /* ---------- core document ---------- */
  function showCoreDoc() {
    builder.classList.add('hidden');
    timeline.classList.add('hidden');
    coreDoc.classList.remove('hidden');

    var all = loadAll();
    coreEntries.innerHTML = '';

    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.style.cssText = 'text-align:center;color:var(--text-dim);font-style:italic;padding:2rem 0;';
      empty.textContent = 'No truths written yet. Begin to discover yourself.';
      coreEntries.appendChild(empty);
      return;
    }

    /* group by category, show latest per category */
    var byCategory = {};
    for (var i = 0; i < all.length; i++) {
      var entry = all[i];
      if (!byCategory[entry.category]) {
        byCategory[entry.category] = entry;
      } else if (entry.timestamp > byCategory[entry.category].timestamp) {
        byCategory[entry.category] = entry;
      }
    }

    var categories = Object.keys(byCategory);
    for (var j = 0; j < categories.length; j++) {
      var e = byCategory[categories[j]];
      var div = document.createElement('div');
      div.className = 'core-entry';

      var catEl = document.createElement('div');
      catEl.className = 'core-entry-category';
      catEl.textContent = e.category;

      var textEl = document.createElement('div');
      textEl.className = 'core-entry-text';
      textEl.textContent = e.text;

      var dateEl = document.createElement('div');
      dateEl.className = 'core-entry-date';
      dateEl.textContent = formatDate(new Date(e.timestamp));

      div.appendChild(catEl);
      div.appendChild(textEl);
      div.appendChild(dateEl);
      coreEntries.appendChild(div);
    }
  }

  addMore.addEventListener('click', function () {
    buildQueue();
    showPrompt();
  });

  /* ---------- timeline ---------- */
  viewTimeline.addEventListener('click', function () {
    coreDoc.classList.add('hidden');
    timeline.classList.remove('hidden');

    var all = loadAll();
    timelineSub.textContent = all.length + ' truth' + (all.length === 1 ? '' : 's') + ' written';
    timelineEntries.innerHTML = '';

    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'timeline-empty';
      empty.textContent = 'Nothing yet.';
      timelineEntries.appendChild(empty);
      return;
    }

    for (var k = all.length - 1; k >= 0; k--) {
      var entry = all[k];
      var div = document.createElement('div');
      div.className = 'timeline-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'timeline-entry-date';
      dateEl.textContent = formatDate(new Date(entry.timestamp));

      var catEl = document.createElement('div');
      catEl.className = 'timeline-entry-cat';
      catEl.textContent = entry.category;

      var textEl = document.createElement('div');
      textEl.className = 'timeline-entry-text';
      textEl.textContent = entry.text;

      div.appendChild(dateEl);
      div.appendChild(catEl);
      div.appendChild(textEl);
      timelineEntries.appendChild(div);
    }
  });

  timelineBack.addEventListener('click', function () {
    timeline.classList.add('hidden');
    coreDoc.classList.remove('hidden');
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      buildQueue();

      var all = loadAll();
      if (all.length > 0) {
        showCoreDoc();
      } else {
        showPrompt();
      }
    }, 1200);
  });

  navCore.addEventListener('click', function () {
    builder.classList.add('hidden');
    timeline.classList.add('hidden');
    showCoreDoc();
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
