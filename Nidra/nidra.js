/* ============================================================
   NIDRA — the letting go
   Evening release ritual: name worries, dissolve, plant a seed
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'nidra_nights';

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var engine        = document.getElementById('engine');
  var canvas        = document.getElementById('releaseCanvas');
  var ctx           = canvas.getContext('2d');
  var releasePhase  = document.getElementById('releasePhase');
  var worryInput    = document.getElementById('worryInput');
  var addWorryBtn   = document.getElementById('addWorryBtn');
  var stoneList     = document.getElementById('stoneList');
  var releaseAllBtn = document.getElementById('releaseAllBtn');
  var dissolvingPhase = document.getElementById('dissolvingPhase');
  var dissolveText  = document.getElementById('dissolveText');
  var seedPhase     = document.getElementById('seedPhase');
  var seedInput     = document.getElementById('seedInput');
  var plantSeedBtn  = document.getElementById('plantSeedBtn');
  var restPhase     = document.getElementById('restPhase');
  var restSeedWord  = document.getElementById('restSeedWord');
  var viewLogBtn    = document.getElementById('viewLogBtn');
  var log           = document.getElementById('log');
  var logSub        = document.getElementById('logSub');
  var logEntries    = document.getElementById('logEntries');
  var logBack       = document.getElementById('logBack');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var worries = [];
  var particles = [];
  var stars = [];
  var animating = false;
  var dissolveIndex = 0;

  /* ---------- persistence ---------- */
  function loadAll() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : {}; }
    catch (e) { return {}; }
  }
  function saveEntry(key, entry) {
    var all = loadAll();
    all[key] = entry;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function dkey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function formatDate(d) {
    var months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ---------- canvas setup ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* ---------- star class ---------- */
  function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.twinkle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.02 + 0.005;
  }
  Star.prototype.draw = function () {
    this.twinkle += this.speed;
    var a = this.alpha + Math.sin(this.twinkle) * 0.15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(168, 184, 232, ' + Math.max(0, a) + ')';
    ctx.fill();
  };

  /* ---------- dissolve particle ---------- */
  function DissolveParticle(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -Math.random() * 2 - 0.5;
    this.alpha = 1;
    this.r = Math.random() * 3 + 1;
    this.decay = Math.random() * 0.015 + 0.005;
    this.color = Math.random() > 0.5 ? '120, 136, 200' : '168, 184, 232';
  }
  DissolveParticle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.01;
    this.alpha -= this.decay;
  };
  DissolveParticle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color + ', ' + Math.max(0, this.alpha) + ')';
    ctx.fill();
  };

  /* ---------- init stars ---------- */
  function initStars() {
    stars = [];
    for (var i = 0; i < 120; i++) stars.push(new Star());
  }

  /* ---------- animation loop ---------- */
  function animate() {
    if (!animating) return;
    ctx.fillStyle = 'rgba(8, 8, 14, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var s = 0; s < stars.length; s++) stars[s].draw();

    for (var p = particles.length - 1; p >= 0; p--) {
      particles[p].update();
      particles[p].draw();
      if (particles[p].alpha <= 0) particles.splice(p, 1);
    }

    requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animating) return;
    animating = true;
    initStars();
    ctx.fillStyle = 'rgba(8, 8, 14, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }

  /* ---------- burst particles ---------- */
  function burst(cx, cy, count) {
    for (var i = 0; i < count; i++) {
      particles.push(new DissolveParticle(cx, cy));
    }
  }

  /* ---------- add worry ---------- */
  function addWorry() {
    var text = worryInput.value.trim();
    if (!text) return;
    worries.push(text);
    worryInput.value = '';

    var stone = document.createElement('div');
    stone.className = 'stone';
    var icon = document.createElement('div');
    icon.className = 'stone-icon';
    icon.textContent = '\u25CF';
    var span = document.createElement('div');
    span.className = 'stone-text';
    span.textContent = text;
    stone.appendChild(icon);
    stone.appendChild(span);
    stoneList.appendChild(stone);

    releaseAllBtn.classList.remove('hidden');
    worryInput.focus();
  }

  addWorryBtn.addEventListener('click', addWorry);
  worryInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addWorry();
  });

  /* ---------- release / dissolve ---------- */
  releaseAllBtn.addEventListener('click', function () {
    releasePhase.classList.add('hidden');
    dissolvingPhase.classList.remove('hidden');
    dissolveIndex = 0;
    dissolveNext();
  });

  function dissolveNext() {
    if (dissolveIndex >= worries.length) {
      setTimeout(function () {
        dissolvingPhase.classList.add('hidden');
        seedPhase.classList.remove('hidden');
        seedInput.focus();
      }, 800);
      return;
    }

    dissolveText.textContent = worries[dissolveIndex];
    dissolveText.classList.remove('fading');
    void dissolveText.offsetWidth;

    /* burst particles from center */
    setTimeout(function () {
      dissolveText.classList.add('fading');
      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      burst(cx, cy, 40);
    }, 1500);

    setTimeout(function () {
      dissolveIndex++;
      dissolveNext();
    }, 3500);
  }

  /* ---------- plant seed ---------- */
  function plantSeed() {
    var seed = seedInput.value.trim();
    if (!seed) return;

    /* save to log */
    saveEntry(dkey(new Date()), {
      timestamp: Date.now(),
      released: worries.slice(),
      seed: seed
    });

    seedPhase.classList.add('hidden');
    restPhase.classList.remove('hidden');
    restSeedWord.textContent = seed;

    /* big gentle burst */
    burst(canvas.width / 2, canvas.height / 2, 80);
  }

  plantSeedBtn.addEventListener('click', plantSeed);
  seedInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') plantSeed();
  });

  /* ---------- log view ---------- */
  function showLog() {
    engine.classList.add('hidden');
    log.classList.remove('hidden');

    var all = loadAll();
    var keys = Object.keys(all).sort().reverse();
    logSub.textContent = keys.length + ' night' + (keys.length === 1 ? '' : 's') + ' of release';
    logEntries.innerHTML = '';

    if (keys.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'log-empty';
      empty.textContent = 'No entries yet.';
      logEntries.appendChild(empty);
      return;
    }

    for (var k = 0; k < keys.length; k++) {
      var entry = all[keys[k]];
      var parts = keys[k].split('-');
      var entryDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      var div = document.createElement('div');
      div.className = 'log-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'log-entry-date';
      dateEl.textContent = formatDate(entryDate);
      div.appendChild(dateEl);

      if (entry.released && entry.released.length > 0) {
        var relDiv = document.createElement('div');
        relDiv.className = 'log-released';
        var relLabel = document.createElement('div');
        relLabel.className = 'log-released-label';
        relLabel.textContent = 'released';
        relDiv.appendChild(relLabel);
        for (var r = 0; r < entry.released.length; r++) {
          var item = document.createElement('div');
          item.className = 'log-released-item';
          item.textContent = '\u2022 ' + entry.released[r];
          relDiv.appendChild(item);
        }
        div.appendChild(relDiv);
      }

      if (entry.seed) {
        var seedDiv = document.createElement('div');
        seedDiv.className = 'log-seed';
        var seedLabel = document.createElement('div');
        seedLabel.className = 'log-seed-label';
        seedLabel.textContent = 'seed';
        var seedWord = document.createElement('div');
        seedWord.className = 'log-seed-word';
        seedWord.textContent = entry.seed;
        seedDiv.appendChild(seedLabel);
        seedDiv.appendChild(seedWord);
        div.appendChild(seedDiv);
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
      worryInput.focus();
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
