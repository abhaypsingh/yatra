/* ============================================================
   PRANA — breath
   Guided breathing with animated circle, four patterns
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'prana_sessions';

  var PATTERNS = {
    box:     { name: 'Box',     steps: [['breathe in',4],['hold',4],['breathe out',4],['hold',4]] },
    calm:    { name: 'Calm',    steps: [['breathe in',4],['hold',7],['breathe out',8]] },
    natural: { name: 'Natural', steps: [['breathe in',4],['breathe out',6]] },
    energy:  { name: 'Energy',  steps: [['breathe in',2],['hold',1],['breathe out',4]] }
  };

  /* ---------- DOM ---------- */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var patternSelect  = document.getElementById('patternSelect');
  var patternCards   = document.querySelectorAll('.pattern-card');
  var engine         = document.getElementById('engine');
  var canvas         = document.getElementById('breathCanvas');
  var ctx            = canvas.getContext('2d');
  var breathInstruction = document.getElementById('breathInstruction');
  var breathTimer    = document.getElementById('breathTimer');
  var breathCount    = document.getElementById('breathCount');
  var stopBtn        = document.getElementById('stopBtn');
  var changeBtn      = document.getElementById('changeBtn');
  var doneEl         = document.getElementById('done');
  var doneStat       = document.getElementById('doneStat');
  var againBtn       = document.getElementById('againBtn');
  var historyBtn     = document.getElementById('historyBtn');
  var historyEl      = document.getElementById('history');
  var historySub     = document.getElementById('historySub');
  var historyEntries = document.getElementById('historyEntries');
  var historyBack    = document.getElementById('historyBack');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var activePattern = null;
  var running = false;
  var stepIndex = 0;
  var stepTimer = 0;
  var cycleCount = 0;
  var totalSeconds = 0;
  var timerInterval = null;
  var animFrame = null;
  var circleRadius = 0;
  var targetRadius = 0;
  var startTime = 0;

  /* ---------- persistence ---------- */
  function loadAll() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; }
    catch (e) { return []; }
  }
  function saveSession(entry) {
    var all = loadAll();
    all.push(entry);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function formatDate(d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  /* ---------- canvas ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  var minR, maxR;
  function calcRadii() {
    var dim = Math.min(canvas.width, canvas.height);
    minR = dim * 0.08;
    maxR = dim * 0.28;
  }

  function drawCircle() {
    ctx.fillStyle = 'rgba(8, 10, 8, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    /* ease toward target */
    circleRadius += (targetRadius - circleRadius) * 0.04;

    /* outer glow */
    var grad = ctx.createRadialGradient(cx, cy, circleRadius * 0.5, cx, cy, circleRadius * 1.5);
    grad.addColorStop(0, 'rgba(104, 168, 120, 0.06)');
    grad.addColorStop(1, 'rgba(104, 168, 120, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, circleRadius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    /* main circle */
    ctx.beginPath();
    ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(104, 168, 120, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(104, 168, 120, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    /* inner bright circle */
    ctx.beginPath();
    ctx.arc(cx, cy, circleRadius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(104, 168, 120, 0.15)';
    ctx.fill();

    if (running) {
      animFrame = requestAnimationFrame(drawCircle);
    }
  }

  /* ---------- breathing engine ---------- */
  function startBreathing(patternKey) {
    activePattern = PATTERNS[patternKey];
    stepIndex = 0;
    cycleCount = 0;
    totalSeconds = 0;
    startTime = Date.now();
    running = true;

    patternSelect.classList.add('hidden');
    doneEl.classList.add('hidden');
    engine.classList.remove('hidden');

    calcRadii();
    circleRadius = minR;
    ctx.fillStyle = 'rgba(8, 10, 8, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    breathCount.textContent = activePattern.name + ' breathing';
    runStep();
    drawCircle();

    timerInterval = setInterval(function () {
      totalSeconds++;
      breathTimer.textContent = formatTime(totalSeconds);
    }, 1000);
  }

  function runStep() {
    if (!running) return;
    var steps = activePattern.steps;
    var step = steps[stepIndex];
    var label = step[0];
    var duration = step[1];

    breathInstruction.textContent = label;

    /* set target radius */
    if (label === 'breathe in') {
      targetRadius = maxR;
    } else if (label === 'breathe out') {
      targetRadius = minR;
    }
    /* hold: keep current target */

    stepTimer = setTimeout(function () {
      stepIndex++;
      if (stepIndex >= steps.length) {
        stepIndex = 0;
        cycleCount++;
      }
      runStep();
    }, duration * 1000);
  }

  function stopBreathing() {
    running = false;
    clearTimeout(stepTimer);
    clearInterval(timerInterval);
    if (animFrame) cancelAnimationFrame(animFrame);

    if (totalSeconds > 5) {
      saveSession({
        timestamp: Date.now(),
        pattern: activePattern.name,
        seconds: totalSeconds,
        cycles: cycleCount
      });
    }

    engine.classList.add('hidden');
    doneEl.classList.remove('hidden');
    doneStat.textContent = activePattern.name + ' \u00b7 ' + formatTime(totalSeconds) + ' \u00b7 ' + cycleCount + ' cycle' + (cycleCount === 1 ? '' : 's');
  }

  /* ---------- events: pattern select ---------- */
  for (var i = 0; i < patternCards.length; i++) {
    patternCards[i].addEventListener('click', function () {
      startBreathing(this.getAttribute('data-pattern'));
    });
  }

  stopBtn.addEventListener('click', stopBreathing);
  changeBtn.addEventListener('click', function () {
    running = false;
    clearTimeout(stepTimer);
    clearInterval(timerInterval);
    if (animFrame) cancelAnimationFrame(animFrame);
    engine.classList.add('hidden');
    patternSelect.classList.remove('hidden');
  });

  againBtn.addEventListener('click', function () {
    doneEl.classList.add('hidden');
    patternSelect.classList.remove('hidden');
  });

  /* ---------- history ---------- */
  function showHistory() {
    doneEl.classList.add('hidden');
    historyEl.classList.remove('hidden');

    var all = loadAll();
    historySub.textContent = all.length + ' session' + (all.length === 1 ? '' : 's');
    historyEntries.innerHTML = '';

    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = 'No sessions yet.';
      historyEntries.appendChild(empty);
      return;
    }

    for (var k = all.length - 1; k >= 0; k--) {
      var entry = all[k];
      var div = document.createElement('div');
      div.className = 'history-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'history-entry-date';
      dateEl.textContent = formatDate(new Date(entry.timestamp));

      var detail = document.createElement('div');
      detail.className = 'history-entry-detail';
      detail.textContent = entry.pattern + ' \u00b7 ' + formatTime(entry.seconds);

      div.appendChild(dateEl);
      div.appendChild(detail);
      historyEntries.appendChild(div);
    }
  }

  historyBtn.addEventListener('click', showHistory);
  historyBack.addEventListener('click', function () {
    historyEl.classList.add('hidden');
    doneEl.classList.remove('hidden');
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      patternSelect.classList.remove('hidden');
      navFloat.classList.add('visible');
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
