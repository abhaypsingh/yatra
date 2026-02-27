/* ============================================================
   RANGOLI — sacred patterns
   Symmetry drawing tool with radial mirroring
   ============================================================ */

(function () {
  'use strict';

  /* ==================== PALETTES ==================== */
  var PALETTES = [
    { name: 'Earth',  colours: ['#c87850','#d4a060','#a08060','#c0a878','#e8d8b0'] },
    { name: 'Ocean',  colours: ['#4888a8','#60a8c0','#388898','#78c0d0','#a0d8e0'] },
    { name: 'Sunset', colours: ['#d06040','#e09050','#c84860','#e8b868','#f0d898'] },
    { name: 'Garden', colours: ['#68a060','#90c070','#488850','#b8d078','#d8e8a0'] },
    { name: 'Night',  colours: ['#8868b0','#6878c0','#a878c0','#5868a0','#b898d0'] }
  ];

  /* ==================== DOM ==================== */
  var opening     = document.getElementById('opening');
  var beginBtn    = document.getElementById('beginBtn');
  var drawView    = document.getElementById('drawView');
  var canvas      = document.getElementById('drawCanvas');
  var ctx         = canvas.getContext('2d');
  var symmetryRow = document.getElementById('symmetryRow');
  var brushRow    = document.getElementById('brushRow');
  var paletteRow  = document.getElementById('paletteRow');
  var colourRow   = document.getElementById('colourRow');
  var guidesBtn   = document.getElementById('guidesBtn');
  var clearBtn    = document.getElementById('clearBtn');
  var navFloat    = document.getElementById('navFloat');
  var navAbout    = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose  = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var folds      = 6;
  var brushSize  = 4;
  var paletteIdx = 0;
  var colourIdx  = 0;
  var showGuides = true;
  var drawing    = false;
  var lastX      = null;
  var lastY      = null;
  var strokes    = [];  /* stored for redraw after resize */
  var cx, cy;           /* canvas center */

  /* ==================== INIT ==================== */
  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80; /* toolbar height */
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    redraw();
  }

  /* ==================== DRAWING ==================== */
  function drawStroke(x1, y1, x2, y2, colour, size, numFolds) {
    var TWO_PI = Math.PI * 2;
    var angleStep = TWO_PI / numFolds;

    /* translate to center-relative */
    var ax = x1 - cx, ay = y1 - cy;
    var bx = x2 - cx, by = y2 - cy;

    ctx.strokeStyle = colour;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (var i = 0; i < numFolds; i++) {
      var angle = i * angleStep;
      var cosA = Math.cos(angle);
      var sinA = Math.sin(angle);

      /* rotated stroke */
      ctx.beginPath();
      ctx.moveTo(cx + ax * cosA - ay * sinA, cy + ax * sinA + ay * cosA);
      ctx.lineTo(cx + bx * cosA - by * sinA, cy + bx * sinA + by * cosA);
      ctx.stroke();

      /* reflected stroke */
      ctx.beginPath();
      ctx.moveTo(cx + ax * cosA + ay * sinA, cy + ax * sinA - ay * cosA);
      ctx.lineTo(cx + bx * cosA + by * sinA, cy + bx * sinA - by * cosA);
      ctx.stroke();
    }
  }

  function drawGuideLines() {
    if (!showGuides) return;
    var TWO_PI = Math.PI * 2;
    var angleStep = TWO_PI / (folds * 2);
    var maxR = Math.max(canvas.width, canvas.height);

    ctx.save();
    ctx.strokeStyle = 'rgba(200, 120, 80, 0.08)';
    ctx.lineWidth = 1;

    for (var i = 0; i < folds * 2; i++) {
      var angle = i * angleStep;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.stroke();
    }

    /* center dot */
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, TWO_PI);
    ctx.fillStyle = 'rgba(200, 120, 80, 0.15)';
    ctx.fill();
    ctx.restore();
  }

  function redraw() {
    ctx.fillStyle = '#0a0808';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGuideLines();

    /* replay stored strokes */
    for (var i = 0; i < strokes.length; i++) {
      var s = strokes[i];
      /* scale from normalised coordinates to current canvas size */
      drawStroke(
        s.x1 * canvas.width, s.y1 * canvas.height,
        s.x2 * canvas.width, s.y2 * canvas.height,
        s.colour, s.size, s.folds
      );
    }
  }

  /* ==================== INPUT HANDLERS ==================== */
  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onStart(e) {
    e.preventDefault();
    drawing = true;
    var pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function onMove(e) {
    if (!drawing) return;
    e.preventDefault();
    var pos = getPos(e);
    var colour = PALETTES[paletteIdx].colours[colourIdx];

    drawStroke(lastX, lastY, pos.x, pos.y, colour, brushSize, folds);

    /* store normalised */
    strokes.push({
      x1: lastX / canvas.width, y1: lastY / canvas.height,
      x2: pos.x / canvas.width, y2: pos.y / canvas.height,
      colour: colour, size: brushSize, folds: folds
    });

    lastX = pos.x;
    lastY = pos.y;
  }

  function onEnd() {
    drawing = false;
    lastX = null;
    lastY = null;
  }

  canvas.addEventListener('mousedown', onStart);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onEnd);
  canvas.addEventListener('mouseleave', onEnd);
  canvas.addEventListener('touchstart', onStart, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onEnd);
  canvas.addEventListener('touchcancel', onEnd);

  /* ==================== TOOLBAR: SYMMETRY ==================== */
  var symmetryBtns = symmetryRow.querySelectorAll('.tool-btn');
  symmetryBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      symmetryBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      folds = parseInt(btn.getAttribute('data-fold'), 10);
      redraw();
    });
  });

  /* ==================== TOOLBAR: BRUSH ==================== */
  var brushBtns = brushRow.querySelectorAll('.tool-btn');
  brushBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      brushBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      brushSize = parseInt(btn.getAttribute('data-size'), 10);
    });
  });

  /* ==================== TOOLBAR: PALETTE ==================== */
  function buildPaletteButtons() {
    paletteRow.innerHTML = '';
    PALETTES.forEach(function (pal, idx) {
      var btn = document.createElement('button');
      btn.className = 'palette-btn' + (idx === paletteIdx ? ' active' : '');
      btn.textContent = pal.name;
      btn.addEventListener('click', function () {
        paletteIdx = idx;
        colourIdx = 0;
        buildPaletteButtons();
        buildColourSwatches();
      });
      paletteRow.appendChild(btn);
    });
  }

  function buildColourSwatches() {
    colourRow.innerHTML = '';
    var colours = PALETTES[paletteIdx].colours;
    colours.forEach(function (c, idx) {
      var swatch = document.createElement('button');
      swatch.className = 'colour-swatch' + (idx === colourIdx ? ' active' : '');
      swatch.style.background = c;
      swatch.addEventListener('click', function () {
        colourIdx = idx;
        buildColourSwatches();
      });
      colourRow.appendChild(swatch);
    });
  }

  buildPaletteButtons();
  buildColourSwatches();

  /* ==================== TOOLBAR: GUIDES & CLEAR ==================== */
  guidesBtn.addEventListener('click', function () {
    showGuides = !showGuides;
    guidesBtn.classList.toggle('active', showGuides);
    redraw();
  });

  clearBtn.addEventListener('click', function () {
    strokes = [];
    redraw();
  });

  /* ==================== RESIZE ==================== */
  window.addEventListener('resize', function () {
    if (!drawView.classList.contains('hidden')) {
      initCanvas();
    }
  });

  /* ==================== BEGIN ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      drawView.classList.remove('hidden');
      navFloat.classList.add('visible');
      initCanvas();
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
