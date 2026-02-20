/* ============================================================
   SAHASA — courage
   Face your fears through four steps of examination
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'sahasa_courage';

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var engine       = document.getElementById('engine');
  var canvas       = document.getElementById('emberCanvas');
  var ctx          = canvas.getContext('2d');
  var namePhase    = document.getElementById('namePhase');
  var fearInput    = document.getElementById('fearInput');
  var nameBtn      = document.getElementById('nameBtn');
  var worstPhase   = document.getElementById('worstPhase');
  var worstInput   = document.getElementById('worstInput');
  var worstBtn     = document.getElementById('worstBtn');
  var doPhase      = document.getElementById('doPhase');
  var doInput      = document.getElementById('doInput');
  var doBtn        = document.getElementById('doBtn');
  var learnPhase   = document.getElementById('learnPhase');
  var learnInput   = document.getElementById('learnInput');
  var learnBtn     = document.getElementById('learnBtn');
  var completePhase = document.getElementById('completePhase');
  var completeSummary = document.getElementById('completeSummary');
  var anotherBtn   = document.getElementById('anotherBtn');
  var viewLogBtn   = document.getElementById('viewLogBtn');
  var log          = document.getElementById('log');
  var logSub       = document.getElementById('logSub');
  var logEntries   = document.getElementById('logEntries');
  var logBack      = document.getElementById('logBack');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var embers = [];
  var animating = false;
  var current = { fear: '', worst: '', plan: '', lesson: '' };

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
    var months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ---------- canvas: floating embers ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Ember() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }
  Ember.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.r = Math.random() * 2.5 + 0.5;
    this.vy = -(Math.random() * 0.6 + 0.2);
    this.vx = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.decay = Math.random() * 0.001 + 0.0005;
    this.warmth = Math.random();
  };
  Ember.prototype.update = function () {
    this.x += this.vx + Math.sin(this.y * 0.01) * 0.2;
    this.y += this.vy;
    this.alpha -= this.decay;
    if (this.alpha <= 0 || this.y < -10) this.reset();
  };
  Ember.prototype.draw = function () {
    var r = Math.floor(200 + this.warmth * 55);
    var g = Math.floor(100 + this.warmth * 60);
    var b = Math.floor(30 + this.warmth * 30);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + Math.max(0, this.alpha) + ')';
    ctx.fill();
  };

  function initEmbers() {
    embers = [];
    for (var i = 0; i < 60; i++) {
      var e = new Ember();
      e.y = Math.random() * canvas.height;
      embers.push(e);
    }
  }

  function animate() {
    if (!animating) return;
    ctx.fillStyle = 'rgba(12, 10, 8, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < embers.length; i++) {
      embers[i].update();
      embers[i].draw();
    }
    requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animating) return;
    animating = true;
    initEmbers();
    ctx.fillStyle = 'rgba(12, 10, 8, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }

  /* ---------- phase transitions ---------- */
  function showPhase(hide, show) {
    hide.classList.add('hidden');
    show.classList.remove('hidden');
    show.style.animation = 'none';
    void show.offsetWidth;
    show.style.animation = 'fadeIn 0.6s ease';
  }

  nameBtn.addEventListener('click', function () {
    var text = fearInput.value.trim();
    if (!text) return;
    current.fear = text;
    showPhase(namePhase, worstPhase);
    worstInput.focus();
  });

  worstBtn.addEventListener('click', function () {
    var text = worstInput.value.trim();
    if (!text) return;
    current.worst = text;
    showPhase(worstPhase, doPhase);
    doInput.focus();
  });

  doBtn.addEventListener('click', function () {
    var text = doInput.value.trim();
    if (!text) return;
    current.plan = text;
    showPhase(doPhase, learnPhase);
    learnInput.focus();
  });

  learnBtn.addEventListener('click', function () {
    var text = learnInput.value.trim();
    if (!text) return;
    current.lesson = text;

    saveEntry({
      timestamp: Date.now(),
      fear: current.fear,
      worst: current.worst,
      plan: current.plan,
      lesson: current.lesson
    });

    /* build summary */
    completeSummary.innerHTML = '';
    var sections = [
      { label: 'the fear', text: current.fear },
      { label: 'the worst case', text: current.worst },
      { label: 'the plan', text: current.plan },
      { label: 'the lesson', text: current.lesson }
    ];
    for (var i = 0; i < sections.length; i++) {
      var lbl = document.createElement('div');
      lbl.className = 'summary-label';
      lbl.textContent = sections[i].label;
      var txt = document.createElement('div');
      txt.className = 'summary-text';
      txt.textContent = sections[i].text;
      completeSummary.appendChild(lbl);
      completeSummary.appendChild(txt);
    }

    showPhase(learnPhase, completePhase);
  });

  /* ---------- another / log ---------- */
  anotherBtn.addEventListener('click', function () {
    current = { fear: '', worst: '', plan: '', lesson: '' };
    fearInput.value = '';
    worstInput.value = '';
    doInput.value = '';
    learnInput.value = '';
    showPhase(completePhase, namePhase);
    fearInput.focus();
  });

  function showLog() {
    engine.classList.add('hidden');
    log.classList.remove('hidden');

    var all = loadAll();
    logSub.textContent = all.length + ' fear' + (all.length === 1 ? '' : 's') + ' faced';
    logEntries.innerHTML = '';

    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'log-empty';
      empty.textContent = 'No entries yet.';
      logEntries.appendChild(empty);
      return;
    }

    for (var k = all.length - 1; k >= 0; k--) {
      var entry = all[k];
      var div = document.createElement('div');
      div.className = 'log-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'log-entry-date';
      dateEl.textContent = formatDate(new Date(entry.timestamp));
      div.appendChild(dateEl);

      var fearEl = document.createElement('div');
      fearEl.className = 'log-entry-fear';
      fearEl.textContent = entry.fear;
      div.appendChild(fearEl);

      var parts = [
        { label: 'worst case', text: entry.worst },
        { label: 'plan', text: entry.plan },
        { label: 'lesson', text: entry.lesson }
      ];
      for (var p = 0; p < parts.length; p++) {
        if (parts[p].text) {
          var sec = document.createElement('div');
          sec.className = 'log-entry-section';
          var lbl = document.createElement('div');
          lbl.className = 'log-section-label';
          lbl.textContent = parts[p].label;
          var txt = document.createElement('div');
          txt.className = 'log-section-text';
          txt.textContent = parts[p].text;
          sec.appendChild(lbl);
          sec.appendChild(txt);
          div.appendChild(sec);
        }
      }

      logEntries.appendChild(div);
    }
  }

  viewLogBtn.addEventListener('click', showLog);
  logBack.addEventListener('click', function () {
    log.classList.add('hidden');
    engine.classList.remove('hidden');
  });

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      startAnimation();
      fearInput.focus();
    }, 1200);
  });

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
