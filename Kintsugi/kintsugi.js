/* ============================================================
   KINTSUGI — the art of golden repair
   Interactive vessel repair with stochastic crack generation
   ============================================================ */

(function () {
  'use strict';

  // ==================== SEED ====================
  var SEED = Date.now() ^ (Math.random() * 0xFFFFFFFF >>> 0);
  var seedState = SEED;
  function rand() {
    seedState ^= seedState << 13;
    seedState ^= seedState >> 17;
    seedState ^= seedState << 5;
    return (seedState >>> 0) / 0xFFFFFFFF;
  }

  // ==================== STORIES ====================
  // Stories revealed as cracks are healed
  var STORIES = [
    {
      text: "A daughter once refused to speak to her father for three years. When she finally called, he answered before the first ring finished. He had kept the phone beside him every night.",
      source: "on waiting"
    },
    {
      text: "The crack between a parent and child is never one-sided. One person withdraws, the other advances too forcefully. Both are afraid. Both are reaching. The crack is the space where fear lives.",
      source: "on fractures"
    },
    {
      text: "In the original kintsugi practice, the artisan must wait. The lacquer takes weeks to set. Repair cannot be rushed. Neither can trust.",
      source: "on patience"
    },
    {
      text: "A father carries his mistakes like stones in his pockets. He does not speak of them. But he rearranges his entire life to ensure his daughter never has to carry the same ones.",
      source: "on silence"
    },
    {
      text: "The most powerful words between a parent and child are not 'I'm right.' They are 'I'm here.' Present tense. No conditions.",
      source: "on presence"
    },
    {
      text: "Every human relationship is a vessel. Some hold water for decades without a single crack. But the ones repaired with gold — they hold something more. They hold the proof that love survived what could have destroyed it.",
      source: "on endurance"
    },
    {
      text: "A young woman asked her grandmother: 'How do I know if someone really loves me?' The grandmother said: 'They stay. Not because it's easy. Because you are worth the difficulty.'",
      source: "on devotion"
    },
    {
      text: "The gold in kintsugi is not decoration. It is honesty. It says: yes, this was broken. And yes, someone cared enough to make it whole again. The scar is not shameful. The scar is sacred.",
      source: "on scars"
    },
    {
      text: "When you dismiss someone's attempt to reach you, you are not protecting yourself. You are widening the crack. Protection is a wall. Connection requires a bridge. Bridges have cracks too. That's how light gets through.",
      source: "on bridges"
    },
    {
      text: "An immigrant father once said: 'I broke my own life in half so my daughter could have a whole one. If she understood that, she would never doubt my love.' He never told her this. Fathers rarely do.",
      source: "on sacrifice"
    },
    {
      text: "The vessel does not choose to break. The gold does not choose to be applied. But the hand that holds the brush — that hand chooses. Repair is always a choice. It is the bravest choice a person can make.",
      source: "on choosing"
    },
    {
      text: "In the space between two people who love each other badly, there is still love. It is clumsy and bruised and imperfect, but it is there. Kintsugi does not demand perfection. It demands willingness.",
      source: "on imperfection"
    }
  ];

  // ==================== STATE ====================
  var canvas, ctx;
  var W, H, CX, CY;
  var cracks = [];
  var goldParticles = [];
  var repairPercent = 0;
  var storiesShown = 0;
  var isDrawing = false;
  var isComplete = false;
  var animFrame;
  var vesselPoints = [];
  var shuffledStories = [];

  // ==================== VESSEL GEOMETRY ====================
  // Generate a vessel shape (a simple vase/bowl silhouette)
  function generateVessel() {
    vesselPoints = [];
    var cx = CX;
    var cy = CY;
    // The vessel is drawn as a series of points forming an outline
    var topW = W * 0.18 + rand() * W * 0.06;
    var midW = W * 0.22 + rand() * W * 0.08;
    var botW = W * 0.12 + rand() * W * 0.04;
    var topY = cy - H * 0.22;
    var midY = cy + H * 0.02;
    var botY = cy + H * 0.22;
    var neckY = topY + (midY - topY) * 0.25;
    var neckW = topW * (0.7 + rand() * 0.2);

    // Store vessel bounds for crack generation
    return {
      cx: cx, cy: cy,
      topW: topW, midW: midW, botW: botW,
      topY: topY, midY: midY, botY: botY,
      neckY: neckY, neckW: neckW
    };
  }

  // Get vessel width at a given Y position
  function vesselWidthAt(vessel, y) {
    if (y <= vessel.topY) return vessel.topW;
    if (y <= vessel.neckY) {
      var t = (y - vessel.topY) / (vessel.neckY - vessel.topY);
      return vessel.topW + (vessel.neckW - vessel.topW) * t;
    }
    if (y <= vessel.midY) {
      var t = (y - vessel.neckY) / (vessel.midY - vessel.neckY);
      return vessel.neckW + (vessel.midW - vessel.neckW) * t;
    }
    if (y <= vessel.botY) {
      var t = (y - vessel.midY) / (vessel.botY - vessel.midY);
      return vessel.midW + (vessel.botW - vessel.midW) * t;
    }
    return vessel.botW;
  }

  // ==================== CRACK GENERATION ====================
  function generateCracks(vessel) {
    cracks = [];
    var numCracks = 5 + Math.floor(rand() * 4); // 5-8 cracks

    for (var i = 0; i < numCracks; i++) {
      var crack = generateSingleCrack(vessel);
      cracks.push(crack);
    }
  }

  function generateSingleCrack(vessel) {
    // Start point somewhere on the vessel surface
    var startY = vessel.topY + rand() * (vessel.botY - vessel.topY);
    var vw = vesselWidthAt(vessel, startY);
    var side = rand() > 0.5 ? 1 : -1;
    var startX = vessel.cx + side * (rand() * vw * 0.8);

    // Generate crack path with random walk
    var points = [{ x: startX, y: startY }];
    var segments = 6 + Math.floor(rand() * 8);
    var angle = rand() * Math.PI * 2;
    var stepSize = Math.min(W, H) * 0.025;

    for (var j = 0; j < segments; j++) {
      angle += (rand() - 0.5) * 1.5;
      var last = points[points.length - 1];
      var nx = last.x + Math.cos(angle) * stepSize * (0.7 + rand() * 0.6);
      var ny = last.y + Math.sin(angle) * stepSize * (0.7 + rand() * 0.6);

      // Keep within vessel bounds (loosely)
      var localW = vesselWidthAt(vessel, ny);
      var leftBound = vessel.cx - localW;
      var rightBound = vessel.cx + localW;
      nx = Math.max(leftBound, Math.min(rightBound, nx));
      ny = Math.max(vessel.topY - 10, Math.min(vessel.botY + 10, ny));

      points.push({ x: nx, y: ny });
    }

    return {
      points: points,
      healed: new Array(points.length).fill(0), // 0 = unhealed, 1 = healed
      totalLength: calculatePathLength(points),
      healedLength: 0,
      storyTriggered: false
    };
  }

  function calculatePathLength(points) {
    var len = 0;
    for (var i = 1; i < points.length; i++) {
      var dx = points[i].x - points[i-1].x;
      var dy = points[i].y - points[i-1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return len;
  }

  // ==================== RENDERING ====================
  function drawVessel(vessel) {
    ctx.save();

    // Draw vessel body
    ctx.beginPath();
    // Left side (top to bottom)
    ctx.moveTo(vessel.cx - vessel.topW, vessel.topY);
    ctx.quadraticCurveTo(
      vessel.cx - vessel.neckW * 0.9, vessel.neckY,
      vessel.cx - vessel.midW, vessel.midY
    );
    ctx.quadraticCurveTo(
      vessel.cx - vessel.midW * 0.95, vessel.botY * 0.98,
      vessel.cx - vessel.botW, vessel.botY
    );
    // Bottom
    ctx.lineTo(vessel.cx + vessel.botW, vessel.botY);
    // Right side (bottom to top)
    ctx.quadraticCurveTo(
      vessel.cx + vessel.midW * 0.95, vessel.botY * 0.98,
      vessel.cx + vessel.midW, vessel.midY
    );
    ctx.quadraticCurveTo(
      vessel.cx + vessel.neckW * 0.9, vessel.neckY,
      vessel.cx + vessel.topW, vessel.topY
    );
    ctx.closePath();

    // Vessel fill — warm ceramic
    var grad = ctx.createLinearGradient(vessel.cx - vessel.midW, vessel.topY, vessel.cx + vessel.midW, vessel.botY);
    grad.addColorStop(0, '#4a3828');
    grad.addColorStop(0.3, '#5a4838');
    grad.addColorStop(0.5, '#6a5848');
    grad.addColorStop(0.7, '#5a4838');
    grad.addColorStop(1, '#3a2818');
    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle edge highlight
    ctx.strokeStyle = 'rgba(160, 144, 128, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner shadow
    var innerGrad = ctx.createRadialGradient(vessel.cx, vessel.cy, 0, vessel.cx, vessel.cy, vessel.midW);
    innerGrad.addColorStop(0, 'rgba(100, 88, 68, 0.08)');
    innerGrad.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
    ctx.fillStyle = innerGrad;
    ctx.fill();

    // Lip / rim
    ctx.beginPath();
    ctx.moveTo(vessel.cx - vessel.topW - 5, vessel.topY);
    ctx.lineTo(vessel.cx + vessel.topW + 5, vessel.topY);
    ctx.strokeStyle = 'rgba(160, 144, 128, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  function drawCracks() {
    for (var i = 0; i < cracks.length; i++) {
      var crack = cracks[i];
      var pts = crack.points;

      for (var j = 1; j < pts.length; j++) {
        // Draw crack shadow (dark line)
        if (crack.healed[j] < 1) {
          ctx.beginPath();
          ctx.moveTo(pts[j-1].x, pts[j-1].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = 'rgba(5, 5, 3, ' + (0.7 * (1 - crack.healed[j])) + ')';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Crack edge
          ctx.strokeStyle = 'rgba(30, 25, 18, ' + (0.5 * (1 - crack.healed[j])) + ')';
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Draw gold where healed
        if (crack.healed[j] > 0) {
          var goldAlpha = crack.healed[j];
          ctx.beginPath();
          ctx.moveTo(pts[j-1].x, pts[j-1].y);
          ctx.lineTo(pts[j].x, pts[j].y);

          // Gold line
          ctx.strokeStyle = 'rgba(201, 168, 76, ' + (goldAlpha * 0.9) + ')';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Gold glow
          ctx.strokeStyle = 'rgba(232, 200, 96, ' + (goldAlpha * 0.3) + ')';
          ctx.lineWidth = 6;
          ctx.stroke();

          // Bright center
          ctx.strokeStyle = 'rgba(240, 216, 120, ' + (goldAlpha * 0.5) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function drawGoldParticles() {
    for (var i = goldParticles.length - 1; i >= 0; i--) {
      var p = goldParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.vy -= 0.02; // float upward

      if (p.life <= 0) {
        goldParticles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232, 200, 96, ' + (p.life * 0.6) + ')';
      ctx.fill();
    }
  }

  function spawnGoldParticles(x, y, count) {
    for (var i = 0; i < count; i++) {
      goldParticles.push({
        x: x + (rand() - 0.5) * 10,
        y: y + (rand() - 0.5) * 10,
        vx: (rand() - 0.5) * 1.5,
        vy: (rand() - 0.5) * 1.5 - 0.5,
        size: rand() * 2 + 0.5,
        life: 1,
        decay: 0.01 + rand() * 0.02
      });
    }
  }

  // Ambient glow when complete
  function drawCompletionGlow(vessel) {
    if (!isComplete) return;
    var glowRadius = vessel.midW * 2;
    var grad = ctx.createRadialGradient(vessel.cx, vessel.cy, 0, vessel.cx, vessel.cy, glowRadius);
    grad.addColorStop(0, 'rgba(201, 168, 76, 0.06)');
    grad.addColorStop(0.5, 'rgba(201, 168, 76, 0.03)');
    grad.addColorStop(1, 'rgba(201, 168, 76, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // ==================== MAIN LOOP ====================
  var vessel;

  function render() {
    ctx.fillStyle = '#1a1410';
    ctx.fillRect(0, 0, W, H);

    // Subtle paper texture noise
    var imageData = ctx.getImageData(0, 0, W, H);
    // Skip texture for performance on mobile
    if (W <= 800) {
      // Light texture
    }

    drawCompletionGlow(vessel);
    drawVessel(vessel);
    drawCracks();
    drawGoldParticles();

    animFrame = requestAnimationFrame(render);
  }

  // ==================== INTERACTION ====================
  function getPos(e) {
    var rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function healNear(x, y) {
    var healRadius = 25;
    var healed = false;
    var totalSegments = 0;
    var healedSegments = 0;

    for (var i = 0; i < cracks.length; i++) {
      var crack = cracks[i];
      var pts = crack.points;

      for (var j = 1; j < pts.length; j++) {
        totalSegments++;
        if (crack.healed[j] >= 1) {
          healedSegments++;
          continue;
        }

        // Distance from point to segment
        var dist = distToSegment(x, y, pts[j-1].x, pts[j-1].y, pts[j].x, pts[j].y);
        if (dist < healRadius) {
          crack.healed[j] = Math.min(1, crack.healed[j] + 0.15);
          if (crack.healed[j] >= 1) healedSegments++;
          healed = true;
          spawnGoldParticles(
            (pts[j-1].x + pts[j].x) / 2,
            (pts[j-1].y + pts[j].y) / 2,
            2
          );
        } else if (crack.healed[j] > 0) {
          healedSegments += crack.healed[j];
        }
      }

      // Check if this crack's story should trigger
      var crackHealed = 0;
      for (var k = 1; k < pts.length; k++) {
        crackHealed += crack.healed[k] >= 1 ? 1 : 0;
      }
      if (crackHealed >= pts.length - 1 && !crack.storyTriggered) {
        crack.storyTriggered = true;
        showStory();
      }
    }

    // Update progress
    repairPercent = Math.round((healedSegments / totalSegments) * 100);
    document.getElementById('repairFill').style.width = repairPercent + '%';
    document.getElementById('repairLabel').textContent = repairPercent + '% healed';

    if (repairPercent >= 100 && !isComplete) {
      triggerCompletion();
    }

    return healed;
  }

  function distToSegment(px, py, x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.sqrt((px-x1)*(px-x1) + (py-y1)*(py-y1));
    var t = Math.max(0, Math.min(1, ((px-x1)*dx + (py-y1)*dy) / lenSq));
    var projX = x1 + t * dx;
    var projY = y1 + t * dy;
    return Math.sqrt((px-projX)*(px-projX) + (py-projY)*(py-projY));
  }

  // ==================== STORIES ====================
  function shuffleStories() {
    shuffledStories = STORIES.slice();
    for (var i = shuffledStories.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = shuffledStories[i];
      shuffledStories[i] = shuffledStories[j];
      shuffledStories[j] = tmp;
    }
  }

  function showStory() {
    if (storiesShown >= shuffledStories.length) return;
    var story = shuffledStories[storiesShown];
    storiesShown++;

    var panel = document.getElementById('storyContent');
    panel.style.opacity = '0';

    setTimeout(function () {
      panel.innerHTML = '<p>' + story.text + '</p>' +
        '<p class="story-source">' + story.source + '</p>';
      panel.style.opacity = '1';
    }, 500);
  }

  // ==================== COMPLETION ====================
  function triggerCompletion() {
    isComplete = true;

    // Big gold burst
    for (var i = 0; i < cracks.length; i++) {
      var pts = cracks[i].points;
      for (var j = 0; j < pts.length; j++) {
        spawnGoldParticles(pts[j].x, pts[j].y, 5);
      }
    }

    var meta = document.getElementById('completionMeta');
    meta.textContent = cracks.length + ' cracks healed \u00b7 seed ' + SEED.toString(16).slice(0, 8);

    setTimeout(function () {
      var comp = document.getElementById('completion');
      comp.classList.remove('hidden');
      comp.classList.add('visible');
    }, 1500);
  }

  // ==================== GALLERY ====================
  function getGalleryEntries() {
    try { return JSON.parse(localStorage.getItem('kintsugi_gallery') || '[]'); }
    catch (e) { return []; }
  }

  function saveGalleryEntry(text) {
    var entry = {
      id: Date.now().toString(),
      text: text,
      date: new Date().toISOString(),
      cracks: cracks.length,
      seed: SEED.toString(16).slice(0, 8)
    };
    var entries = getGalleryEntries();
    entries.unshift(entry);
    try { localStorage.setItem('kintsugi_gallery', JSON.stringify(entries)); }
    catch (e) { /* ignore */ }
  }

  function showGallery() {
    var entries = getGalleryEntries();
    var container = document.getElementById('galleryItems');

    if (entries.length === 0) {
      container.innerHTML = '<p class="gallery-empty">no vessels repaired yet</p>';
    } else {
      var html = '';
      entries.forEach(function (e) {
        var d = new Date(e.date);
        var dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        html += '<div class="gallery-item">' +
          '<p class="gallery-item-text">' + escapeHtml(e.text) + '</p>' +
          '<span class="gallery-item-meta">' + dateStr +
            (e.cracks ? ' \u00b7 ' + e.cracks + ' cracks' : '') +
            (e.seed ? ' \u00b7 ' + e.seed : '') +
          '</span></div>';
      });
      container.innerHTML = html;
    }

    document.getElementById('gallery').classList.remove('hidden');
    document.getElementById('gallery').classList.add('visible');
  }

  function hideGallery() {
    document.getElementById('gallery').classList.remove('visible');
    document.getElementById('gallery').classList.add('hidden');
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ==================== NEW VESSEL ====================
  function newVessel() {
    // New seed
    SEED = Date.now() ^ (Math.random() * 0xFFFFFFFF >>> 0);
    seedState = SEED;

    cracks = [];
    goldParticles = [];
    repairPercent = 0;
    storiesShown = 0;
    isComplete = false;

    vessel = generateVessel();
    generateCracks(vessel);
    shuffleStories();

    document.getElementById('repairFill').style.width = '0%';
    document.getElementById('repairLabel').textContent = '0% healed';
    document.getElementById('completion').classList.remove('visible');
    document.getElementById('completion').classList.add('hidden');
    document.getElementById('reflection').classList.remove('visible');
    document.getElementById('reflection').classList.add('hidden');
    document.getElementById('storyContent').innerHTML =
      '<p class="story-instruction">trace the golden cracks to begin the repair</p>';
  }

  // ==================== EVENT HANDLERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      var ui = document.getElementById('ui');
      ui.classList.remove('hidden');
      ui.classList.add('visible');
      document.getElementById('navFloat').classList.add('visible');
    }, 1000);
  });

  // Canvas interaction
  canvas = document.getElementById('vessel');

  canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;
    var p = getPos(e);
    healNear(p.x, p.y);
  });
  canvas.addEventListener('mousemove', function (e) {
    if (!isDrawing) return;
    var p = getPos(e);
    healNear(p.x, p.y);
  });
  canvas.addEventListener('mouseup', function () { isDrawing = false; });
  canvas.addEventListener('mouseleave', function () { isDrawing = false; });

  canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    isDrawing = true;
    var p = getPos(e);
    healNear(p.x, p.y);
  }, { passive: false });
  canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    if (!isDrawing) return;
    var p = getPos(e);
    healNear(p.x, p.y);
  }, { passive: false });
  canvas.addEventListener('touchend', function () { isDrawing = false; });

  // New vessel button
  document.getElementById('newVesselBtn').addEventListener('click', newVessel);

  // Reflect button
  document.getElementById('reflectBtn').addEventListener('click', function () {
    document.getElementById('completion').classList.remove('visible');
    document.getElementById('completion').classList.add('hidden');
    document.getElementById('reflection').classList.remove('hidden');
    document.getElementById('reflection').classList.add('visible');
    document.getElementById('reflectionInput').focus();
  });

  // Save reflection
  document.getElementById('saveReflectionBtn').addEventListener('click', function () {
    var text = document.getElementById('reflectionInput').value.trim();
    if (!text) return;
    saveGalleryEntry(text);
    document.getElementById('reflectionInput').value = '';
    document.getElementById('reflection').classList.remove('visible');
    document.getElementById('reflection').classList.add('hidden');
    // Show brief confirmation then new vessel
    var panel = document.getElementById('storyContent');
    panel.innerHTML = '<p>sealed with gold. your reflection is in the gallery.</p>';
    setTimeout(newVessel, 3000);
  });

  // Gallery
  document.getElementById('navGallery').addEventListener('click', showGallery);
  document.getElementById('closeGalleryBtn').addEventListener('click', hideGallery);

  // About
  document.getElementById('navAbout').addEventListener('click', function () {
    var about = document.getElementById('about');
    about.classList.remove('hidden');
    about.classList.add('visible');
  });
  document.getElementById('aboutClose').addEventListener('click', function () {
    document.getElementById('about').classList.remove('visible');
    document.getElementById('about').classList.add('hidden');
  });
  document.getElementById('about').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('visible');
      this.classList.add('hidden');
    }
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideGallery();
      document.getElementById('about').classList.remove('visible');
      document.getElementById('about').classList.add('hidden');
    }
  });

  // ==================== INIT ====================
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    CX = W / 2;
    CY = H / 2;
    canvas.width = W;
    canvas.height = H;
  }

  function init() {
    canvas = document.getElementById('vessel');
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', function () {
      resize();
      vessel = generateVessel();
      generateCracks(vessel);
    });

    vessel = generateVessel();
    generateCracks(vessel);
    shuffleStories();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
