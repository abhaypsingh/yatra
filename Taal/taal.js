/* ============================================================
   TAAL — rhythm
   Tap to create beats, visual ripples, echo patterns
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var engine       = document.getElementById('engine');
  var canvas       = document.getElementById('taalCanvas');
  var ctx          = canvas.getContext('2d');
  var beatCounter  = document.getElementById('beatCounter');
  var engineHint   = document.getElementById('engineHint');
  var tempoSlow    = document.getElementById('tempoSlow');
  var tempoMed     = document.getElementById('tempoMed');
  var tempoFast    = document.getElementById('tempoFast');
  var clearBtn     = document.getElementById('clearBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- audio context ---------- */
  var audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  /* ---------- sound palette ---------- */
  var VOICES = [
    { freq: 80,  type: 'sine',     dur: 0.15, gain: 0.5 },  /* deep */
    { freq: 160, type: 'triangle', dur: 0.10, gain: 0.4 },  /* mid */
    { freq: 320, type: 'sine',     dur: 0.08, gain: 0.3 },  /* high tap */
    { freq: 120, type: 'square',   dur: 0.06, gain: 0.2 },  /* click */
    { freq: 200, type: 'triangle', dur: 0.12, gain: 0.35 }, /* ring */
    { freq: 60,  type: 'sine',     dur: 0.20, gain: 0.45 }  /* boom */
  ];

  function playVoice(idx) {
    ensureAudio();
    var v = VOICES[idx % VOICES.length];
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = v.type;
    osc.frequency.value = v.freq;
    gain.gain.setValueAtTime(v.gain, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + v.dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + v.dur + 0.05);
  }

  /* echo: play a response beat after a delay */
  function playEcho(delay) {
    var echoVoice = Math.floor(Math.random() * VOICES.length);
    setTimeout(function () {
      playVoice(echoVoice);
      /* visual echo ripple at random position */
      var rx = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
      var ry = canvas.height * 0.2 + Math.random() * canvas.height * 0.6;
      var echoColor = ECHO_COLORS[Math.floor(Math.random() * ECHO_COLORS.length)];
      ripples.push(new Ripple(rx, ry, echoColor, true));
    }, delay);
  }

  /* ---------- state ---------- */
  var ripples = [];
  var beats = 0;
  var animating = false;
  var echoDelay = 400; /* ms — medium */

  var TAP_COLORS = [
    [200, 120, 72],
    [220, 140, 60],
    [180, 100, 60],
    [200, 160, 80],
    [180, 80, 50]
  ];
  var ECHO_COLORS = [
    [120, 100, 160],
    [100, 130, 170],
    [140, 110, 140],
    [90, 120, 150],
    [130, 90, 130]
  ];

  /* ---------- canvas ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* ---------- ripple class ---------- */
  function Ripple(x, y, color, isEcho) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.maxR = 150 + Math.random() * 100;
    this.speed = isEcho ? 2.5 : 3.5;
    this.alpha = isEcho ? 0.3 : 0.5;
    this.color = color;
    this.lineWidth = isEcho ? 1 : 2;
  }
  Ripple.prototype.update = function () {
    this.r += this.speed;
    this.alpha -= 0.005;
  };
  Ripple.prototype.draw = function () {
    if (this.alpha <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + Math.max(0, this.alpha) + ')';
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  };

  /* ---------- animation ---------- */
  function animate() {
    if (!animating) return;
    ctx.fillStyle = 'rgba(10, 8, 8, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].draw();
      if (ripples[i].alpha <= 0) ripples.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animating) return;
    animating = true;
    ctx.fillStyle = 'rgba(10, 8, 8, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }

  /* ---------- tap handler ---------- */
  function handleTap(x, y) {
    ensureAudio();
    beats++;
    beatCounter.textContent = beats;

    if (beats === 1) {
      engineHint.style.opacity = '0';
    }

    /* choose voice based on vertical position */
    var voiceIdx = Math.floor((y / canvas.height) * VOICES.length);
    playVoice(voiceIdx);

    /* visual ripple */
    var color = TAP_COLORS[Math.floor(Math.random() * TAP_COLORS.length)];
    ripples.push(new Ripple(x, y, color, false));

    /* echo response */
    playEcho(echoDelay);
    /* sometimes a second echo */
    if (Math.random() > 0.6) {
      playEcho(echoDelay * 2);
    }
  }

  canvas.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    handleTap(e.clientX, e.clientY);
  });

  /* ---------- tempo ---------- */
  function setTempo(btn, delay) {
    echoDelay = delay;
    tempoSlow.classList.remove('active');
    tempoMed.classList.remove('active');
    tempoFast.classList.remove('active');
    btn.classList.add('active');
  }

  tempoSlow.addEventListener('click', function (e) {
    e.stopPropagation();
    setTempo(tempoSlow, 700);
  });
  tempoMed.addEventListener('click', function (e) {
    e.stopPropagation();
    setTempo(tempoMed, 400);
  });
  tempoFast.addEventListener('click', function (e) {
    e.stopPropagation();
    setTempo(tempoFast, 200);
  });
  clearBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    ripples = [];
    beats = 0;
    beatCounter.textContent = '0';
    engineHint.style.opacity = '0.6';
    ctx.fillStyle = 'rgba(10, 8, 8, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    ensureAudio();
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      startAnimation();
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
