/* ============================================================
   VANA — the forest
   Generative growing forest — plant daily acts, watch trees grow
   Canvas rendering + localStorage persistence
   ============================================================ */

(function () {
  'use strict';

  // ==================== CANVAS ====================
  var canvas, ctx, W, H;
  var animFrame;

  function initCanvas() {
    canvas = document.getElementById('forestCanvas');
    ctx = canvas.getContext('2d');
    resize();
    renderForest();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  window.addEventListener('resize', function () {
    resize();
    renderForest();
  });

  // ==================== TREE DRAWING ====================
  var TYPE_COLORS = {
    kindness:  { trunk: '#4a6848', leaf: '#68b888', leafAlt: '#88d8a8' },
    truth:     { trunk: '#5a6838', leaf: '#a0c068', leafAlt: '#c0e088' },
    patience:  { trunk: '#3a5868', leaf: '#68a0b8', leafAlt: '#88c0d8' },
    courage:   { trunk: '#6a4838', leaf: '#c88868', leafAlt: '#e8a888' },
    gratitude: { trunk: '#6a5838', leaf: '#c8a868', leafAlt: '#e8c888' }
  };

  // Seeded random for consistent tree shapes per entry
  function hashSeed(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return h;
  }

  function seededRand(seed) {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return { val: (seed >>> 0) / 0xFFFFFFFF, next: seed };
  }

  function drawTree(x, groundY, type, seed, age) {
    var colors = TYPE_COLORS[type] || TYPE_COLORS.kindness;
    var s = { next: seed };

    function rnd() {
      var r = seededRand(s.next);
      s.next = r.next;
      return r.val;
    }

    // Tree height based on "age" (days since planting, capped)
    var maxH = 40 + age * 8;
    if (maxH > 120) maxH = 120;
    var trunkH = maxH * (0.4 + rnd() * 0.2);
    var crownR = maxH * (0.25 + rnd() * 0.15);

    // Trunk
    var trunkW = 2 + age * 0.3;
    if (trunkW > 6) trunkW = 6;

    ctx.beginPath();
    ctx.moveTo(x - trunkW / 2, groundY);
    ctx.lineTo(x - trunkW / 3, groundY - trunkH);
    ctx.lineTo(x + trunkW / 3, groundY - trunkH);
    ctx.lineTo(x + trunkW / 2, groundY);
    ctx.closePath();
    ctx.fillStyle = colors.trunk;
    ctx.fill();

    // Crown — clusters of circles
    var crownY = groundY - trunkH - crownR * 0.5;
    var numBlobs = 3 + Math.floor(rnd() * 4);

    for (var i = 0; i < numBlobs; i++) {
      var bx = x + (rnd() - 0.5) * crownR * 1.4;
      var by = crownY + (rnd() - 0.5) * crownR * 0.8;
      var br = crownR * (0.3 + rnd() * 0.4);

      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fillStyle = rnd() > 0.5 ? colors.leaf : colors.leafAlt;
      ctx.globalAlpha = 0.6 + rnd() * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // ==================== RENDER FULL FOREST ====================
  function renderForest() {
    if (!ctx) return;

    ctx.fillStyle = '#0a100a';
    ctx.fillRect(0, 0, W, H);

    var trees = getTrees();
    if (trees.length === 0) return;

    var groundY = H * 0.85;

    // Draw ground
    ctx.fillStyle = '#141e14';
    ctx.fillRect(0, groundY, W, H - groundY);

    // Ground line
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(W, groundY);
    ctx.strokeStyle = 'rgba(104, 184, 136, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Distribute trees across the canvas
    var margin = 30;
    var availW = W - margin * 2;
    var spacing = Math.max(availW / Math.max(trees.length, 1), 15);
    if (spacing > 50) spacing = 50;

    var startX = W / 2 - (trees.length - 1) * spacing / 2;

    var now = new Date();
    trees.forEach(function (tree, idx) {
      var x = startX + idx * spacing;
      var planted = new Date(tree.date);
      var age = Math.floor((now - planted) / (1000 * 60 * 60 * 24)) + 1;
      var seed = hashSeed(tree.id);
      drawTree(x, groundY, tree.type, seed, age);
    });
  }

  // ==================== STORAGE ====================
  function getTrees() {
    try { return JSON.parse(localStorage.getItem('vana_trees') || '[]'); }
    catch (e) { return []; }
  }

  function saveTrees(trees) {
    try { localStorage.setItem('vana_trees', JSON.stringify(trees)); }
    catch (e) { /* ignore */ }
  }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function getStreak() {
    var trees = getTrees();
    if (trees.length === 0) return 0;

    var days = {};
    trees.forEach(function (t) {
      var d = new Date(t.date);
      days[d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()] = true;
    });

    var streak = 0;
    var d = new Date();

    // Check if today has a planting
    var tk = todayKey();
    if (days[tk]) {
      streak = 1;
      d.setDate(d.getDate() - 1);
    }

    for (var i = 0; i < 365; i++) {
      var key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      if (days[key]) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ==================== UI STATE ====================
  var selectedType = null;

  function updateForestHeader() {
    var trees = getTrees();
    document.getElementById('forestCount').textContent = trees.length + ' tree' + (trees.length !== 1 ? 's' : '');

    var streak = getStreak();
    if (streak > 1) {
      document.getElementById('forestStreak').textContent = streak + ' day streak';
    } else if (streak === 1) {
      document.getElementById('forestStreak').textContent = 'planted today';
    } else {
      document.getElementById('forestStreak').textContent = '';
    }
  }

  function updateTodaySection() {
    var trees = getTrees();
    var tk = todayKey();
    var todayTrees = trees.filter(function (t) {
      var d = new Date(t.date);
      var key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      return key === tk;
    });

    var section = document.getElementById('todaySection');

    if (todayTrees.length === 0) {
      section.innerHTML = '';
      return;
    }

    var html = '<div class="today-title">planted today</div>';
    todayTrees.forEach(function (t) {
      html += '<div class="today-entry">' +
        '<span class="today-type-dot ' + t.type + '"></span>' +
        '<span class="today-text">' + escapeHtml(t.desc) + '</span>' +
      '</div>';
    });
    section.innerHTML = html;
  }

  function checkCanPlant() {
    var desc = document.getElementById('plantDesc').value.trim();
    document.getElementById('plantBtn').disabled = !selectedType || desc.length < 3;
  }

  function plantTree() {
    var desc = document.getElementById('plantDesc').value.trim();
    if (!selectedType || desc.length < 3) return;

    var tree = {
      id: Date.now().toString(),
      type: selectedType,
      desc: desc,
      date: new Date().toISOString()
    };

    var trees = getTrees();
    trees.push(tree);
    saveTrees(trees);

    // Reset form
    selectedType = null;
    document.getElementById('plantDesc').value = '';
    document.querySelectorAll('.type-btn').forEach(function (btn) {
      btn.classList.remove('selected');
    });
    document.getElementById('plantBtn').disabled = true;

    // Update UI
    updateForestHeader();
    updateTodaySection();
    renderForest();

    // Visual feedback
    var btn = document.getElementById('plantBtn');
    btn.textContent = 'planted \u2713';
    setTimeout(function () {
      btn.textContent = 'plant this';
    }, 1500);
  }

  // ==================== EVENT LISTENERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('forestView').classList.remove('hidden');
      document.getElementById('navFloat').classList.add('visible');
      updateForestHeader();
      updateTodaySection();
      renderForest();
    }, 1200);
  });

  // Type selection
  document.querySelectorAll('.type-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedType = this.dataset.type;
      document.querySelectorAll('.type-btn').forEach(function (b) {
        b.classList.remove('selected');
      });
      this.classList.add('selected');
      checkCanPlant();
    });
  });

  // Description input
  document.getElementById('plantDesc').addEventListener('input', checkCanPlant);

  // Plant
  document.getElementById('plantBtn').addEventListener('click', plantTree);

  // About
  document.getElementById('navAbout').addEventListener('click', function () {
    document.getElementById('aboutOverlay').classList.remove('hidden');
    document.getElementById('aboutOverlay').classList.add('visible');
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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('aboutOverlay').classList.remove('visible');
      document.getElementById('aboutOverlay').classList.add('hidden');
    }
  });

  // ==================== INIT ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCanvas);
  } else {
    initCanvas();
  }

})();
