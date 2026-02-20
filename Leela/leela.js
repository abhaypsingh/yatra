/* ============================================================
   LEELA — divine play
   Touch/mouse-driven generative art with mood palettes
   ============================================================ */

(function () {
  'use strict';

  /* ---------- mood palettes ---------- */
  var MOODS = {
    joy:    { colors: ['#f7dc6f','#f0a040','#f7c948','#ffe066','#ffb347'], bg: [8,8,16] },
    calm:   { colors: ['#a088d0','#6868c0','#9898e0','#b8a8e8','#7878d0'], bg: [8,8,16] },
    fire:   { colors: ['#e85030','#f0a020','#ff6040','#f04820','#ffc040'], bg: [8,8,16] },
    ocean:  { colors: ['#4090c0','#60d0d0','#3080b0','#50c0e0','#70e0e0'], bg: [8,8,16] },
    forest: { colors: ['#40a060','#90d060','#60c070','#b0e060','#308050'], bg: [8,8,16] },
    cosmos: { colors: ['#8040c0','#d060a0','#a060e0','#e080c0','#6030a0'], bg: [8,8,16] }
  };

  /* ---------- state ---------- */
  var canvas = document.getElementById('artCanvas');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var currentMood = 'joy';
  var trails = true;
  var isDrawing = false;
  var lastX = 0;
  var lastY = 0;
  var animFrame = null;
  var started = false;

  /* ---------- DOM ---------- */
  var opening = document.getElementById('opening');
  var beginBtn = document.getElementById('beginBtn');
  var controls = document.getElementById('controls');
  var moodBar = document.getElementById('moodBar');
  var clearBtn = document.getElementById('clearCanvas');
  var trailBtn = document.getElementById('toggleTrails');
  var navFloat = document.getElementById('navFloat');
  var navAbout = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose = document.getElementById('aboutClose');

  /* ---------- canvas sizing ---------- */
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------- particle class ---------- */
  function Particle(x, y, mood) {
    var palette = MOODS[mood].colors;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 1.0;
    this.decay = 0.005 + Math.random() * 0.01;
    this.size = 2 + Math.random() * 6;
    this.color = palette[Math.floor(Math.random() * palette.length)];
    this.glow = Math.random() > 0.7;
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.life -= this.decay;
    this.size *= 0.998;
  };

  Particle.prototype.draw = function () {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.8;
    if (this.glow) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  /* ---------- spawn particles ---------- */
  function spawnAt(x, y, count) {
    for (var i = 0; i < count; i++) {
      particles.push(new Particle(x, y, currentMood));
    }
  }

  function spawnLine(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var steps = Math.max(1, Math.floor(dist / 4));
    for (var i = 0; i <= steps; i++) {
      var t = i / steps;
      var px = x1 + dx * t;
      var py = y1 + dy * t;
      spawnAt(px, py, 2);
    }
  }

  /* ---------- animation loop ---------- */
  function loop() {
    animFrame = requestAnimationFrame(loop);

    if (trails) {
      ctx.fillStyle = 'rgba(8, 8, 16, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = 'rgb(8, 8, 16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    var alive = [];
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.update();
      p.draw();
      if (p.life > 0 && p.size > 0.3) {
        alive.push(p);
      }
    }
    particles = alive;

    /* ambient drift particles */
    if (Math.random() > 0.95 && particles.length < 2000) {
      spawnAt(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1
      );
    }
  }

  /* ---------- input handling ---------- */
  function getPos(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function onDown(e) {
    if (!started) return;
    e.preventDefault();
    isDrawing = true;
    var pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    spawnAt(pos.x, pos.y, 8);
  }

  function onMove(e) {
    if (!started || !isDrawing) return;
    e.preventDefault();
    var pos = getPos(e);
    spawnLine(lastX, lastY, pos.x, pos.y);
    lastX = pos.x;
    lastY = pos.y;
  }

  function onUp(e) {
    if (!started) return;
    isDrawing = false;
  }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('mouseleave', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);
  canvas.addEventListener('touchcancel', onUp);

  /* ---------- mood switching ---------- */
  var moodBtns = moodBar.querySelectorAll('.mood-btn');
  for (var i = 0; i < moodBtns.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        currentMood = btn.getAttribute('data-mood');
        for (var j = 0; j < moodBtns.length; j++) {
          moodBtns[j].classList.remove('active');
        }
        btn.classList.add('active');
      });
    })(moodBtns[i]);
  }

  /* ---------- action buttons ---------- */
  clearBtn.addEventListener('click', function () {
    particles = [];
    ctx.fillStyle = 'rgb(8, 8, 16)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  trailBtn.addEventListener('click', function () {
    trails = !trails;
    trailBtn.classList.toggle('active', trails);
  });

  /* ---------- about overlay ---------- */
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

  /* ---------- begin ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      controls.classList.remove('hidden');
      navFloat.classList.add('visible');
      started = true;
      trailBtn.classList.add('active');
      loop();
    }, 1200);
  });

})();
