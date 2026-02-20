/* ============================================================
   AKASHA — the sky
   Personal constellation map of people who shaped you
   ============================================================ */

(function () {
  'use strict';

  var GIFT_COLORS = {
    safety:   '#68b8a0',
    wisdom:   '#a088d0',
    joy:      '#f0c848',
    courage:  '#e08848',
    patience: '#68a0b8',
    love:     '#d07088'
  };

  var STORAGE_KEY = 'akasha_stars';

  /* ---------- DOM ---------- */
  var canvas       = document.getElementById('skyCanvas');
  var ctx          = canvas.getContext('2d');
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var addStarView  = document.getElementById('addStar');
  var starNameEl   = document.getElementById('starName');
  var starGiftEl   = document.getElementById('starGift');
  var starNoteEl   = document.getElementById('starNote');
  var placeBtn     = document.getElementById('placeBtn');
  var cancelAdd    = document.getElementById('cancelAdd');
  var starDetail   = document.getElementById('starDetail');
  var detailClose  = document.getElementById('detailClose');
  var detailGlow   = document.getElementById('detailGlow');
  var detailName   = document.getElementById('detailName');
  var detailGift   = document.getElementById('detailGift');
  var detailNote   = document.getElementById('detailNote');
  var skyControls  = document.getElementById('skyControls');
  var addBtn       = document.getElementById('addBtn');
  var starCountEl  = document.getElementById('starCount');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var stars = [];
  var bgStars = [];
  var animFrame = null;
  var started = false;
  var twinkleTime = 0;

  /* ---------- canvas ---------- */
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initBgStars();
  }
  window.addEventListener('resize', resize);
  resize();

  function initBgStars() {
    bgStars = [];
    var count = Math.floor((canvas.width * canvas.height) / 3000);
    for (var i = 0; i < count; i++) {
      bgStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.3 + Math.random() * 1.2,
        brightness: 0.2 + Math.random() * 0.4,
        twinkleSpeed: 0.5 + Math.random() * 2
      });
    }
  }

  /* ---------- persistence ---------- */
  function loadStars() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  }

  function saveStars() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stars)); } catch (e) {}
  }

  function updateCount() {
    starCountEl.textContent = stars.length + ' star' + (stars.length === 1 ? '' : 's');
  }

  /* ---------- place a star ---------- */
  function placeStarInSky(star) {
    /* find an open position — avoid overlap */
    var attempts = 0;
    var margin = 60;
    var placed = false;
    while (attempts < 50 && !placed) {
      var cx = margin + Math.random() * (canvas.width - margin * 2);
      var cy = margin + Math.random() * (canvas.height - margin * 2);
      var tooClose = false;
      for (var i = 0; i < stars.length; i++) {
        var dx = stars[i].x - cx;
        var dy = stars[i].y - cy;
        if (Math.sqrt(dx * dx + dy * dy) < 50) { tooClose = true; break; }
      }
      if (!tooClose) {
        star.x = cx;
        star.y = cy;
        placed = true;
      }
      attempts++;
    }
    if (!placed) {
      star.x = margin + Math.random() * (canvas.width - margin * 2);
      star.y = margin + Math.random() * (canvas.height - margin * 2);
    }
  }

  /* ---------- draw loop ---------- */
  function draw() {
    animFrame = requestAnimationFrame(draw);
    twinkleTime += 0.016;

    ctx.fillStyle = '#060610';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* background stars */
    for (var i = 0; i < bgStars.length; i++) {
      var bg = bgStars[i];
      var flicker = bg.brightness + Math.sin(twinkleTime * bg.twinkleSpeed + i) * 0.15;
      ctx.globalAlpha = Math.max(0.05, Math.min(flicker, 0.7));
      ctx.fillStyle = '#c8c8e0';
      ctx.beginPath();
      ctx.arc(bg.x, bg.y, bg.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* named stars */
    for (var j = 0; j < stars.length; j++) {
      var s = stars[j];
      var col = GIFT_COLORS[s.gift] || '#88a8e0';
      var pulse = 3 + Math.sin(twinkleTime * 1.2 + j * 0.7) * 1;

      /* glow */
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = col;
      ctx.globalAlpha = 0.6 + Math.sin(twinkleTime * 1.5 + j) * 0.2;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(s.x, s.y, pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      /* core */
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      /* name label */
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.7;
      ctx.textAlign = 'center';
      ctx.fillText(s.name, s.x, s.y + pulse + 14);
      ctx.globalAlpha = 1;
    }

    /* draw constellation lines between nearby stars */
    ctx.strokeStyle = 'rgba(136, 168, 224, 0.08)';
    ctx.lineWidth = 0.5;
    for (var a = 0; a < stars.length; a++) {
      for (var b = a + 1; b < stars.length; b++) {
        var dx = stars[a].x - stars[b].x;
        var dy = stars[a].y - stars[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.globalAlpha = 0.08 * (1 - dist / 180);
          ctx.beginPath();
          ctx.moveTo(stars[a].x, stars[a].y);
          ctx.lineTo(stars[b].x, stars[b].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- hit test ---------- */
  function hitStar(mx, my) {
    for (var i = stars.length - 1; i >= 0; i--) {
      var dx = stars[i].x - mx;
      var dy = stars[i].y - my;
      if (Math.sqrt(dx * dx + dy * dy) < 24) return stars[i];
    }
    return null;
  }

  canvas.addEventListener('click', function (e) {
    if (!started) return;
    var s = hitStar(e.clientX, e.clientY);
    if (s) showDetail(s);
  });

  canvas.addEventListener('touchstart', function (e) {
    if (!started) return;
    if (e.touches.length > 0) {
      var s = hitStar(e.touches[0].clientX, e.touches[0].clientY);
      if (s) { e.preventDefault(); showDetail(s); }
    }
  }, { passive: false });

  /* ---------- detail overlay ---------- */
  function showDetail(s) {
    var col = GIFT_COLORS[s.gift] || '#88a8e0';
    detailGlow.style.background = col;
    detailGlow.style.boxShadow = '0 0 20px ' + col;
    detailName.textContent = s.name;
    detailGift.textContent = s.gift;
    detailGift.style.color = col;
    detailNote.textContent = s.note || '\u2014';
    starDetail.classList.remove('hidden');
  }

  detailClose.addEventListener('click', function () { starDetail.classList.add('hidden'); });
  starDetail.addEventListener('click', function (e) {
    if (e.target === starDetail) starDetail.classList.add('hidden');
  });

  /* ---------- add star form ---------- */
  addBtn.addEventListener('click', function () { addStarView.classList.remove('hidden'); });
  cancelAdd.addEventListener('click', function () {
    addStarView.classList.add('hidden');
    clearForm();
  });

  starNameEl.addEventListener('input', function () {
    placeBtn.disabled = !(starNameEl.value.trim().length > 0);
  });

  placeBtn.addEventListener('click', function () {
    if (placeBtn.disabled) return;
    var star = {
      name: starNameEl.value.trim(),
      gift: starGiftEl.value,
      note: starNoteEl.value.trim(),
      id: Date.now()
    };
    placeStarInSky(star);
    stars.push(star);
    saveStars();
    updateCount();
    addStarView.classList.add('hidden');
    clearForm();
  });

  function clearForm() {
    starNameEl.value = '';
    starGiftEl.selectedIndex = 0;
    starNoteEl.value = '';
    placeBtn.disabled = true;
  }

  /* ---------- begin ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      skyControls.classList.remove('hidden');
      navFloat.classList.add('visible');
      started = true;

      stars = loadStars();
      /* reposition stars for current canvas size */
      for (var i = 0; i < stars.length; i++) {
        if (!stars[i].x || stars[i].x > canvas.width || stars[i].y > canvas.height) {
          placeStarInSky(stars[i]);
        }
      }
      saveStars();
      updateCount();
      draw();
    }, 1200);
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
