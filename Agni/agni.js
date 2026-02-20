/* ============================================================
   AGNI — the sacred fire of release
   Letter writing + fire particle system + ember typography
   ============================================================ */

(function () {
  'use strict';

  // ==================== RELEASE WISDOM ====================
  var WISDOM = [
    { text: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.", source: "The Buddha" },
    { text: "The wound is the place where the Light enters you.", source: "Rumi" },
    { text: "You can't start the next chapter of your life if you keep re-reading the last one.", source: "Michael McMillan" },
    { text: "Forgiveness is not an occasional act, it is a constant attitude.", source: "Martin Luther King Jr." },
    { text: "When I let go of what I am, I become what I might be.", source: "Lao Tzu" },
    { text: "The truth is, unless you let go, unless you forgive yourself, unless you forgive the situation, unless you realize that the situation is over, you cannot move forward.", source: "Steve Maraboli" },
    { text: "In the process of letting go you will lose many things from the past, but you will find yourself.", source: "Deepak Chopra" },
    { text: "Renunciation is not getting rid of the things of this world, but accepting that they pass away.", source: "Shunryu Suzuki" },
    { text: "Some of us think holding on makes us strong; but sometimes it is letting go.", source: "Hermann Hesse" },
    { text: "Fire is the test of gold; adversity, of strong people.", source: "Seneca" },
    { text: "Nothing ever goes away until it has taught us what we need to know.", source: "Pema Chodron" },
    { text: "What the caterpillar calls the end of the world, the master calls a butterfly.", source: "Richard Bach" },
    { text: "The only way out is through.", source: "Robert Frost" },
    { text: "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.", source: "Rainer Maria Rilke" }
  ];

  // ==================== FIRE PARTICLE SYSTEM ====================
  var fireCanvas, fireCtx;
  var emberCanvas, emberCtx;
  var W, H;
  var fireParticles = [];
  var wordEmbers = [];
  var fireIntensity = 0.3; // 0-1, increases during burn
  var animFrame;

  function initCanvases() {
    fireCanvas = document.getElementById('fireCanvas');
    fireCtx = fireCanvas.getContext('2d');
    emberCanvas = document.getElementById('emberCanvas');
    emberCtx = emberCanvas.getContext('2d');
    resize();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    fireCanvas.width = W;
    fireCanvas.height = H;
    emberCanvas.width = W;
    emberCanvas.height = H;
  }
  window.addEventListener('resize', resize);

  // Fire particle
  function spawnFireParticle() {
    var baseX = W / 2 + (Math.random() - 0.5) * W * 0.4;
    return {
      x: baseX,
      y: H + 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -1 - Math.random() * 3,
      size: Math.random() * 4 + 1,
      life: 1,
      decay: 0.005 + Math.random() * 0.015,
      type: Math.random() // determines color
    };
  }

  function renderFire() {
    fireCtx.fillStyle = 'rgba(15, 8, 6, 0.15)';
    fireCtx.fillRect(0, 0, W, H);

    // Spawn new particles based on intensity
    var spawnCount = Math.floor(fireIntensity * 8);
    for (var s = 0; s < spawnCount; s++) {
      fireParticles.push(spawnFireParticle());
    }

    // Update and draw
    for (var i = fireParticles.length - 1; i >= 0; i--) {
      var p = fireParticles[i];
      p.x += p.vx + (Math.random() - 0.5) * 0.5;
      p.y += p.vy;
      p.vy -= 0.02; // accelerate upward
      p.vx *= 0.99;
      p.life -= p.decay;

      if (p.life <= 0 || p.y < -10) {
        fireParticles.splice(i, 1);
        continue;
      }

      var alpha = p.life * fireIntensity;
      var r, g, b;
      if (p.type < 0.3) {
        // Deep ember
        r = 200; g = 60 + p.life * 40; b = 20;
      } else if (p.type < 0.7) {
        // Orange flame
        r = 230; g = 120 + p.life * 60; b = 30 + p.life * 20;
      } else {
        // Bright yellow
        r = 248; g = 180 + p.life * 50; b = 60 + p.life * 40;
      }

      fireCtx.beginPath();
      fireCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      fireCtx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
      fireCtx.fill();
    }

    // Base glow
    if (fireIntensity > 0.2) {
      var glow = fireCtx.createRadialGradient(W/2, H, 0, W/2, H, H * 0.6);
      glow.addColorStop(0, 'rgba(200, 80, 32, ' + (fireIntensity * 0.08) + ')');
      glow.addColorStop(1, 'rgba(200, 80, 32, 0)');
      fireCtx.fillStyle = glow;
      fireCtx.fillRect(0, 0, W, H);
    }
  }

  // Word embers — words that float upward as the letter burns
  function spawnWordEmber(word, startX, startY) {
    wordEmbers.push({
      text: word,
      x: startX + (Math.random() - 0.5) * 60,
      y: startY,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.5 - Math.random() * 1.5,
      life: 1,
      decay: 0.003 + Math.random() * 0.005,
      size: 0.65 + Math.random() * 0.3,
      rotation: (Math.random() - 0.5) * 0.3
    });
  }

  function renderEmbers() {
    emberCtx.clearRect(0, 0, W, H);

    for (var i = wordEmbers.length - 1; i >= 0; i--) {
      var e = wordEmbers[i];
      e.x += e.vx + (Math.random() - 0.5) * 0.3;
      e.y += e.vy;
      e.vy -= 0.005;
      e.life -= e.decay;
      e.rotation += (Math.random() - 0.5) * 0.01;

      if (e.life <= 0) {
        wordEmbers.splice(i, 1);
        continue;
      }

      emberCtx.save();
      emberCtx.translate(e.x, e.y);
      emberCtx.rotate(e.rotation);
      emberCtx.globalAlpha = e.life * 0.7;

      // Color transitions from flame to ember to ash
      var r, g, b;
      if (e.life > 0.7) {
        r = 248; g = 180; b = 60;
      } else if (e.life > 0.4) {
        r = 200; g = 100; b = 40;
      } else {
        r = 120; g = 80; b = 60;
      }

      emberCtx.font = (12 * e.size) + 'px Georgia, serif';
      emberCtx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      emberCtx.fillText(e.text, 0, 0);

      emberCtx.restore();
    }
  }

  function mainLoop() {
    renderFire();
    renderEmbers();
    animFrame = requestAnimationFrame(mainLoop);
  }

  // ==================== LETTER STATE ====================
  var letterTo = '';
  var letterText = '';
  var letterWordCount = 0;

  // ==================== BURN SEQUENCE ====================
  function startBurn() {
    letterTo = document.getElementById('letterTo').value.trim() || 'unnamed';
    letterText = document.getElementById('letterBody').value.trim();
    letterWordCount = letterText.split(/\s+/).filter(Boolean).length;

    // Hide writing phase
    document.getElementById('writingPhase').classList.remove('visible');
    document.getElementById('writingPhase').classList.add('hidden');

    // Show burning phase
    var burningPhase = document.getElementById('burningPhase');
    var burningLetter = document.getElementById('burningLetter');
    burningPhase.classList.remove('hidden');
    burningPhase.classList.add('visible');

    // Put letter content into burning element
    burningLetter.textContent = letterText;

    // Intensify fire
    fireIntensity = 0.8;

    // Start burn animation after brief pause
    setTimeout(function () {
      burningLetter.classList.add('burning');

      // Add burning edge
      var edge = document.createElement('div');
      edge.className = 'burning-edge';
      burningLetter.appendChild(edge);

      // Spawn word embers as it burns
      var words = letterText.split(/\s+/).filter(Boolean);
      var rect = burningLetter.getBoundingClientRect();
      var interval = 5500 / Math.max(words.length, 1);

      words.forEach(function (word, idx) {
        setTimeout(function () {
          var progress = idx / words.length;
          var x = rect.left + Math.random() * rect.width;
          var y = rect.top + rect.height * (1 - progress * 0.8);
          spawnWordEmber(word, x, y);
        }, idx * interval);
      });

      // Burn status updates
      setTimeout(function () {
        document.getElementById('burningStatus').textContent = 'the words are becoming light...';
      }, 2000);
      setTimeout(function () {
        document.getElementById('burningStatus').textContent = 'releasing...';
      }, 4000);

      // Complete burn
      setTimeout(function () {
        completeBurn();
      }, 7000);

    }, 800);
  }

  function completeBurn() {
    fireIntensity = 0.3; // Return to ambient

    // Save to ashes
    saveToAshes();

    // Hide burning phase
    document.getElementById('burningPhase').classList.remove('visible');
    document.getElementById('burningPhase').classList.add('hidden');

    // Show ashes phase with wisdom
    var wisdom = WISDOM[Math.floor(Math.random() * WISDOM.length)];
    document.getElementById('ashesQuote').textContent = wisdom.text;
    document.getElementById('ashesSource').textContent = '\u2014 ' + wisdom.source;

    var ashesPhase = document.getElementById('ashesPhase');
    ashesPhase.classList.remove('hidden');
    ashesPhase.classList.add('visible');
  }

  // ==================== ASHES STORAGE ====================
  function saveToAshes() {
    var entry = {
      id: Date.now().toString(),
      to: letterTo,
      words: letterWordCount,
      date: new Date().toISOString()
      // Deliberately NOT saving the letter text — it was given to the fire
    };
    var entries = getAshes();
    entries.unshift(entry);
    try { localStorage.setItem('agni_ashes', JSON.stringify(entries)); }
    catch (e) { /* ignore */ }
  }

  function getAshes() {
    try { return JSON.parse(localStorage.getItem('agni_ashes') || '[]'); }
    catch (e) { return []; }
  }

  function showAshesGarden() {
    var entries = getAshes();
    var container = document.getElementById('gardenEntries');

    if (entries.length === 0) {
      container.innerHTML = '<p class="garden-empty">no letters released yet</p>';
    } else {
      var html = '';
      entries.forEach(function (e) {
        var d = new Date(e.date);
        var dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        html += '<div class="garden-entry">' +
          '<div class="garden-entry-to">to: ' + escapeHtml(e.to) + '</div>' +
          '<span class="garden-entry-date">' + dateStr + '</span>' +
          '<span class="garden-entry-words">' + e.words + ' words released</span>' +
        '</div>';
      });
      container.innerHTML = html;
    }

    document.getElementById('ashesGarden').classList.remove('hidden');
    document.getElementById('ashesGarden').classList.add('visible');
  }

  function hideAshesGarden() {
    document.getElementById('ashesGarden').classList.remove('visible');
    document.getElementById('ashesGarden').classList.add('hidden');
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ==================== RESET TO WRITE ====================
  function resetToWrite() {
    // Hide ashes phase
    document.getElementById('ashesPhase').classList.remove('visible');
    document.getElementById('ashesPhase').classList.add('hidden');

    // Reset burning phase
    var burningLetter = document.getElementById('burningLetter');
    burningLetter.classList.remove('burning');
    burningLetter.textContent = '';
    var edge = burningLetter.querySelector('.burning-edge');
    if (edge) edge.remove();
    document.getElementById('burningStatus').textContent = 'releasing...';

    // Reset writing
    document.getElementById('letterTo').value = '';
    document.getElementById('letterBody').value = '';
    document.getElementById('wordCount').textContent = '0 words';
    document.getElementById('releaseBtn').disabled = true;

    // Show writing phase
    document.getElementById('writingPhase').classList.remove('hidden');
    document.getElementById('writingPhase').classList.add('visible');
  }

  // ==================== EVENT HANDLERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('writingPhase').classList.remove('hidden');
      document.getElementById('writingPhase').classList.add('visible');
      document.getElementById('navFloat').classList.add('visible');
      document.getElementById('letterTo').focus();
    }, 1200);
  });

  // Letter body input — word count and enable release
  document.getElementById('letterBody').addEventListener('input', function () {
    var text = this.value.trim();
    var count = text ? text.split(/\s+/).filter(Boolean).length : 0;
    document.getElementById('wordCount').textContent = count + ' word' + (count !== 1 ? 's' : '');
    document.getElementById('releaseBtn').disabled = count < 3;
  });

  // Prompt chips
  document.querySelectorAll('.prompt-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var body = document.getElementById('letterBody');
      body.value += (body.value ? '\n\n' : '') + this.dataset.prompt + ' ';
      body.focus();
      body.dispatchEvent(new Event('input'));
    });
  });

  // Release to fire
  document.getElementById('releaseBtn').addEventListener('click', function () {
    if (this.disabled) return;
    startBurn();
  });

  // Write again
  document.getElementById('writeAgainBtn').addEventListener('click', resetToWrite);

  // View ashes
  document.getElementById('viewAshesBtn').addEventListener('click', showAshesGarden);
  document.getElementById('navAshes').addEventListener('click', showAshesGarden);
  document.getElementById('closeGardenBtn').addEventListener('click', hideAshesGarden);

  // About
  document.getElementById('navAbout').addEventListener('click', function () {
    var about = document.getElementById('aboutOverlay');
    about.classList.remove('hidden');
    about.classList.add('visible');
  });
  document.getElementById('aboutClose').addEventListener('click', function () {
    document.getElementById('aboutOverlay').classList.remove('visible');
    document.getElementById('aboutOverlay').classList.add('hidden');
  });
  document.getElementById('aboutOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('visible');
      this.classList.add('hidden');
    }
  });

  // Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideAshesGarden();
      document.getElementById('aboutOverlay').classList.remove('visible');
      document.getElementById('aboutOverlay').classList.add('hidden');
    }
  });

  // ==================== INIT ====================
  function init() {
    initCanvases();
    mainLoop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
