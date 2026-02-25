/* ============================================================
   DHVANI — sound sanctuary
   Web Audio API ambient sound mixer — eight layers, zero files
   ============================================================ */

(function () {
  'use strict';

  /* ==================== SOUND DEFINITIONS ==================== */
  var SOUNDS = [
    { name: 'Rain',      key: 'rain',      setup: setupRain },
    { name: 'Wind',      key: 'wind',      setup: setupWind },
    { name: 'Stream',    key: 'stream',    setup: setupStream },
    { name: 'Fire',      key: 'fire',      setup: setupFire },
    { name: 'Night',     key: 'night',     setup: setupNight },
    { name: 'Bowl',      key: 'bowl',      setup: setupBowl },
    { name: 'Heartbeat', key: 'heartbeat', setup: setupHeartbeat },
    { name: 'Om',        key: 'om',        setup: setupOm }
  ];

  var TIMERS = [
    { label: 'off', minutes: 0 },
    { label: '5m',  minutes: 5 },
    { label: '10m', minutes: 10 },
    { label: '15m', minutes: 15 },
    { label: '30m', minutes: 30 }
  ];

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var mixerEl      = document.getElementById('mixer');
  var soundGrid    = document.getElementById('soundGrid');
  var timerBtns    = document.getElementById('timerBtns');
  var timerDisplay = document.getElementById('timerDisplay');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var audioCtx = null;
  var masterGain = null;
  var noiseBuffer = null;
  var layers = [];       /* { gain, active, volume, startPeriodic?, stopPeriodic?, card } */
  var timerHandle = null;
  var timerEnd = 0;
  var timerRaf = null;

  /* ==================== NOISE BUFFER ==================== */
  function getNoiseBuffer() {
    if (noiseBuffer) return noiseBuffer;
    var size = 2 * audioCtx.sampleRate;
    var buf = audioCtx.createBuffer(1, size, audioCtx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
    noiseBuffer = buf;
    return buf;
  }

  function makeNoise() {
    var src = audioCtx.createBufferSource();
    src.buffer = getNoiseBuffer();
    src.loop = true;
    src.start();
    return src;
  }

  /* ==================== SOUND SETUPS ==================== */
  function setupRain(ctx, dest) {
    var src = makeNoise();
    var f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 700; f.Q.value = 0.8;
    var g = ctx.createGain(); g.gain.value = 0;
    src.connect(f); f.connect(g); g.connect(dest);
    return { gain: g, max: 0.38 };
  }

  function setupWind(ctx, dest) {
    var src = makeNoise();
    var f = ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 250;
    var lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
    var lg = ctx.createGain(); lg.gain.value = 150;
    lfo.connect(lg); lg.connect(f.frequency); lfo.start();
    var g = ctx.createGain(); g.gain.value = 0;
    src.connect(f); f.connect(g); g.connect(dest);
    return { gain: g, max: 0.30 };
  }

  function setupStream(ctx, dest) {
    var src = makeNoise();
    var f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 1.2;
    var g = ctx.createGain(); g.gain.value = 0;
    src.connect(f); f.connect(g); g.connect(dest);
    return { gain: g, max: 0.25 };
  }

  function setupFire(ctx, dest) {
    var src = makeNoise();
    var f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.6;
    /* crackle modulation */
    var mod = ctx.createOscillator(); mod.type = 'sawtooth'; mod.frequency.value = 4;
    var modG = ctx.createGain(); modG.gain.value = 0.3;
    mod.connect(modG);
    var g = ctx.createGain(); g.gain.value = 0;
    modG.connect(g.gain);
    src.connect(f); f.connect(g); g.connect(dest);
    mod.start();
    return { gain: g, max: 0.18 };
  }

  function setupNight(ctx, dest) {
    var src = makeNoise();
    var f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 4200; f.Q.value = 6;
    var lfo = ctx.createOscillator(); lfo.frequency.value = 1.8;
    var lg = ctx.createGain(); lg.gain.value = 0.4;
    lfo.connect(lg);
    var g = ctx.createGain(); g.gain.value = 0;
    lg.connect(g.gain);
    src.connect(f); f.connect(g); g.connect(dest);
    lfo.start();
    return { gain: g, max: 0.12 };
  }

  function setupBowl(ctx, dest) {
    var g = ctx.createGain(); g.gain.value = 0;
    g.connect(dest);
    var intervalId = null;

    function strike() {
      var now = ctx.currentTime;
      var freqs = [396, 792, 1188];
      var vols  = [0.10, 0.05, 0.025];
      var durs  = [7, 5, 3.5];
      for (var i = 0; i < freqs.length; i++) {
        var o = ctx.createOscillator(); o.frequency.value = freqs[i];
        var eg = ctx.createGain();
        eg.gain.setValueAtTime(vols[i], now);
        eg.gain.exponentialRampToValueAtTime(0.0001, now + durs[i]);
        o.connect(eg); eg.connect(g);
        o.start(now); o.stop(now + durs[i]);
      }
    }

    return {
      gain: g, max: 1,
      startPeriodic: function () {
        strike();
        intervalId = setInterval(function () { strike(); }, 11000 + Math.random() * 4000);
      },
      stopPeriodic: function () {
        if (intervalId) { clearInterval(intervalId); intervalId = null; }
      }
    };
  }

  function setupHeartbeat(ctx, dest) {
    var g = ctx.createGain(); g.gain.value = 0;
    g.connect(dest);
    var intervalId = null;

    function beat() {
      var now = ctx.currentTime;
      /* lub */
      var o1 = ctx.createOscillator();
      o1.frequency.setValueAtTime(75, now);
      o1.frequency.exponentialRampToValueAtTime(38, now + 0.12);
      var g1 = ctx.createGain();
      g1.gain.setValueAtTime(0.8, now);
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      o1.connect(g1); g1.connect(g); o1.start(now); o1.stop(now + 0.15);
      /* dub */
      var o2 = ctx.createOscillator();
      o2.frequency.setValueAtTime(55, now + 0.2);
      o2.frequency.exponentialRampToValueAtTime(30, now + 0.32);
      var g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.5, now + 0.2);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      o2.connect(g2); g2.connect(g); o2.start(now + 0.2); o2.stop(now + 0.35);
    }

    return {
      gain: g, max: 0.30,
      startPeriodic: function () {
        beat();
        intervalId = setInterval(beat, 1000);
      },
      stopPeriodic: function () {
        if (intervalId) { clearInterval(intervalId); intervalId = null; }
      }
    };
  }

  function setupOm(ctx, dest) {
    var g = ctx.createGain(); g.gain.value = 0;
    g.connect(dest);
    var freqs = [136.1, 136.5, 272.2, 408.3];
    var vols  = [1, 0.3, 0.35, 0.15];
    for (var i = 0; i < freqs.length; i++) {
      var o = ctx.createOscillator(); o.frequency.value = freqs[i];
      var og = ctx.createGain(); og.gain.value = vols[i];
      o.connect(og); og.connect(g); o.start();
    }
    return { gain: g, max: 0.10 };
  }

  /* ==================== BUILD UI ==================== */
  function buildUI() {
    soundGrid.innerHTML = '';
    layers = [];

    SOUNDS.forEach(function (snd, idx) {
      var card = document.createElement('div');
      card.className = 'sound-card';

      var top = document.createElement('div');
      top.className = 'sound-card-top';
      var dot = document.createElement('div');
      dot.className = 'sound-dot';
      var name = document.createElement('span');
      name.className = 'sound-name';
      name.textContent = snd.name;
      top.appendChild(dot);
      top.appendChild(name);

      var slider = document.createElement('input');
      slider.type = 'range';
      slider.className = 'sound-slider';
      slider.min = '0'; slider.max = '100'; slider.value = '70';

      card.appendChild(top);
      card.appendChild(slider);
      soundGrid.appendChild(card);

      /* setup audio */
      var layer = snd.setup(audioCtx, masterGain);
      layer.active = false;
      layer.volume = 0.7;
      layer.card = card;

      /* toggle on card click (not slider) */
      top.addEventListener('click', function () { toggleLayer(idx); });

      /* slider */
      slider.addEventListener('input', function (e) {
        e.stopPropagation();
        var v = parseInt(e.target.value, 10) / 100;
        layers[idx].volume = v;
        if (layers[idx].active) {
          layers[idx].gain.gain.setTargetAtTime(
            layers[idx].max * v, audioCtx.currentTime, 0.08
          );
        }
      });

      layers.push(layer);
    });

    /* timer buttons */
    timerBtns.innerHTML = '';
    TIMERS.forEach(function (t, idx) {
      var btn = document.createElement('button');
      btn.className = 'timer-btn' + (idx === 0 ? ' active' : '');
      btn.textContent = t.label;
      btn.addEventListener('click', function () { setTimer(idx); });
      timerBtns.appendChild(btn);
    });
  }

  /* ==================== TOGGLE ==================== */
  function toggleLayer(idx) {
    var layer = layers[idx];
    var ramp = 0.3;

    if (layer.active) {
      layer.gain.gain.setTargetAtTime(0, audioCtx.currentTime, ramp);
      layer.active = false;
      layer.card.classList.remove('active');
      if (layer.stopPeriodic) layer.stopPeriodic();
    } else {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      layer.gain.gain.setTargetAtTime(
        layer.max * layer.volume, audioCtx.currentTime, ramp
      );
      layer.active = true;
      layer.card.classList.add('active');
      if (layer.startPeriodic) layer.startPeriodic();
    }
  }

  /* ==================== TIMER ==================== */
  function setTimer(idx) {
    /* clear existing */
    if (timerHandle) { clearTimeout(timerHandle); timerHandle = null; }
    if (timerRaf) { cancelAnimationFrame(timerRaf); timerRaf = null; }

    /* update buttons */
    var btns = timerBtns.querySelectorAll('.timer-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    btns[idx].classList.add('active');

    var minutes = TIMERS[idx].minutes;
    if (minutes === 0) {
      timerDisplay.classList.add('hidden');
      return;
    }

    timerEnd = Date.now() + minutes * 60000;
    timerDisplay.classList.remove('hidden');

    function tick() {
      var remaining = Math.max(0, timerEnd - Date.now());
      if (remaining <= 0) {
        timerDisplay.textContent = '0:00';
        fadeAllOut();
        return;
      }
      var m = Math.floor(remaining / 60000);
      var s = Math.floor((remaining % 60000) / 1000);
      timerDisplay.textContent = m + ':' + (s < 10 ? '0' : '') + s;
      timerRaf = requestAnimationFrame(tick);
    }

    tick();

    timerHandle = setTimeout(function () {
      fadeAllOut();
    }, minutes * 60000);
  }

  function fadeAllOut() {
    var now = audioCtx.currentTime;
    layers.forEach(function (layer) {
      if (layer.active) {
        layer.gain.gain.setTargetAtTime(0, now, 1.5);
        layer.active = false;
        layer.card.classList.remove('active');
        if (layer.stopPeriodic) layer.stopPeriodic();
      }
    });
    timerDisplay.textContent = 'done';
    setTimeout(function () { timerDisplay.classList.add('hidden'); }, 3000);
  }

  /* ==================== BEGIN ==================== */
  beginBtn.addEventListener('click', function () {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.8;
    masterGain.connect(audioCtx.destination);

    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      mixerEl.classList.remove('hidden');
      navFloat.classList.add('visible');
      buildUI();
    }, 1200);
  });

  /* ==================== ABOUT ==================== */
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
