/* ============================================================
   SETU — the bridge
   Interactive bridge-building between two people
   12 planks: some yours, some theirs, some shared
   Canvas visualization of bridge + water
   ============================================================ */

(function () {
  'use strict';

  // ==================== CANVAS — WATER + BRIDGE ====================
  var canvas, ctx, W, H;
  var waveOffset = 0;
  var planksFilled = 0;
  var totalPlanks = 12;
  var animFrame;

  function initCanvas() {
    canvas = document.getElementById('bridgeCanvas');
    ctx = canvas.getContext('2d');
    resize();
    renderLoop();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  window.addEventListener('resize', resize);

  function renderLoop() {
    ctx.fillStyle = '#0a0e14';
    ctx.fillRect(0, 0, W, H);

    var waterY = H * 0.7;

    // Water
    drawWater(waterY);

    // Islands
    drawIsland(0, waterY, W * 0.18, 'left');
    drawIsland(W, waterY, W * 0.18, 'right');

    // Bridge planks
    drawBridge(waterY);

    waveOffset += 0.015;
    animFrame = requestAnimationFrame(renderLoop);
  }

  function drawWater(waterY) {
    ctx.fillStyle = '#0c1820';
    ctx.fillRect(0, waterY, W, H - waterY);

    // Wave lines
    for (var row = 0; row < 5; row++) {
      var y = waterY + 20 + row * 25;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (var x = 0; x <= W; x += 4) {
        var wave = Math.sin(x * 0.01 + waveOffset + row * 0.8) * 4 +
                   Math.sin(x * 0.02 + waveOffset * 1.3 + row) * 2;
        ctx.lineTo(x, y + wave);
      }
      ctx.strokeStyle = 'rgba(40, 80, 100, ' + (0.15 - row * 0.025) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawIsland(baseX, waterY, width, side) {
    ctx.beginPath();
    if (side === 'left') {
      ctx.moveTo(0, waterY - 30);
      ctx.quadraticCurveTo(width * 0.6, waterY - 50, width, waterY);
      ctx.lineTo(0, waterY);
    } else {
      ctx.moveTo(W, waterY - 30);
      ctx.quadraticCurveTo(W - width * 0.6, waterY - 50, W - width, waterY);
      ctx.lineTo(W, waterY);
    }
    ctx.closePath();
    ctx.fillStyle = '#1a2430';
    ctx.fill();
    ctx.strokeStyle = 'rgba(104, 168, 200, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawBridge(waterY) {
    var bridgeY = waterY - 35;
    var leftEdge = W * 0.18;
    var rightEdge = W - W * 0.18;
    var bridgeWidth = rightEdge - leftEdge;
    var plankWidth = bridgeWidth / totalPlanks;

    for (var i = 0; i < planksFilled; i++) {
      var x = leftEdge + i * plankWidth;
      var plank = PLANKS[i];

      var color;
      if (plank.owner === 'yours') {
        color = 'rgba(104, 168, 200, 0.5)';
      } else if (plank.owner === 'theirs') {
        color = 'rgba(200, 136, 104, 0.5)';
      } else {
        color = 'rgba(136, 184, 152, 0.5)';
      }

      ctx.fillStyle = color;
      ctx.fillRect(x + 1, bridgeY - 4, plankWidth - 2, 8);

      // Glow
      ctx.strokeStyle = color.replace('0.5', '0.2');
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 1, bridgeY - 4, plankWidth - 2, 8);
    }

    // Rope lines
    if (planksFilled > 0) {
      var endX = leftEdge + planksFilled * plankWidth;
      ctx.beginPath();
      ctx.moveTo(leftEdge, bridgeY - 6);
      ctx.lineTo(endX, bridgeY - 6);
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(leftEdge, bridgeY + 6);
      ctx.lineTo(endX, bridgeY + 6);
      ctx.stroke();
    }
  }

  // ==================== PLANK DATA ====================
  var PLANKS = [
    {
      owner: 'yours',
      action: 'Listen without planning your response',
      desc: "Put down what you're holding \u2014 your phone, your argument, your defense \u2014 and just hear them."
    },
    {
      owner: 'theirs',
      action: 'Explain without controlling',
      desc: 'This plank belongs to the other person. They need to share their reasons without demanding you agree.'
    },
    {
      owner: 'yours',
      action: 'Apologize for one specific thing',
      desc: "Not \"I'm sorry you feel that way.\" A real one. \"I'm sorry I did this.\" Name it."
    },
    {
      owner: 'shared',
      action: 'Agree on one thing you both want',
      desc: 'Somewhere beneath the disagreement is something you both care about. Find it together.'
    },
    {
      owner: 'theirs',
      action: 'Show vulnerability',
      desc: 'This plank belongs to the other person. They need to show you the fear beneath their anger, the hurt beneath their rules.'
    },
    {
      owner: 'yours',
      action: "Show up even when it's hard",
      desc: 'Answer the phone. Go to dinner. Stay in the room. Presence is a plank.'
    },
    {
      owner: 'yours',
      action: 'Ask a real question and wait for the answer',
      desc: "Not \"How was school?\" but \"What's the hardest thing about your week?\" And then silence. Let them fill it."
    },
    {
      owner: 'theirs',
      action: 'Give space without withdrawing love',
      desc: 'This plank belongs to the other person. They need to let you have room to breathe without making you feel abandoned.'
    },
    {
      owner: 'shared',
      action: 'Create a new memory together',
      desc: "Not fixing the past. Making something new. A walk, a meal, a conversation that isn't about the conflict."
    },
    {
      owner: 'yours',
      action: 'Accept an imperfect effort',
      desc: "When they try and it's not perfect \u2014 a clumsy apology, a late text, an awkward hug \u2014 receive it anyway. Effort is the plank."
    },
    {
      owner: 'theirs',
      action: 'Trust your judgment on something',
      desc: 'This plank belongs to the other person. They need to let go of one thing \u2014 one decision \u2014 and trust that you can handle it.'
    },
    {
      owner: 'shared',
      action: 'Say the words out loud',
      desc: "Three words that both of you know are true but neither has said in a while. You both have to say them. The bridge can't hold without this plank."
    }
  ];

  // ==================== STATE ====================
  var bridgeTo = '';
  var currentPlank = 0;
  var plankCounts = { yours: 0, theirs: 0, shared: 0 };

  // ==================== SHOW PLANK ====================
  function showPlank() {
    if (currentPlank >= totalPlanks) {
      showCompletion();
      return;
    }

    var plank = PLANKS[currentPlank];
    var card = document.getElementById('plankCard');
    var owner = document.getElementById('plankOwner');
    var action = document.getElementById('plankAction');
    var desc = document.getElementById('plankDesc');
    var hint = document.getElementById('buildHint');
    var btn = document.getElementById('layPlank');

    // Set card style
    card.className = 'plank-card owner-' + plank.owner;

    // Owner label
    if (plank.owner === 'yours') {
      owner.textContent = 'your plank to lay';
      btn.textContent = 'lay this plank';
      hint.textContent = 'this is something you can do';
    } else if (plank.owner === 'theirs') {
      owner.textContent = 'their plank to lay';
      btn.textContent = 'acknowledge this plank';
      hint.textContent = 'this one is not yours — but you can recognize it';
    } else {
      owner.textContent = 'a shared plank';
      btn.textContent = 'lay this plank together';
      hint.textContent = 'this one takes both of you';
    }

    // Content with animation
    action.style.opacity = '0';
    desc.style.opacity = '0';
    setTimeout(function () {
      action.textContent = plank.action;
      desc.textContent = plank.desc;
      action.style.opacity = '1';
      desc.style.opacity = '1';
    }, 200);

    // Update count
    document.getElementById('plankCount').textContent = currentPlank + ' / ' + totalPlanks + ' planks';

    // Animate card
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'fadeIn 0.5s ease';
  }

  function layPlank() {
    var plank = PLANKS[currentPlank];
    plankCounts[plank.owner]++;

    // Update canvas
    planksFilled = currentPlank + 1;

    currentPlank++;
    document.getElementById('plankCount').textContent = currentPlank + ' / ' + totalPlanks + ' planks';

    showPlank();
  }

  // ==================== COMPLETION ====================
  function showCompletion() {
    document.getElementById('builder').classList.add('hidden');
    document.getElementById('completion').classList.remove('hidden');

    document.getElementById('completionSub').textContent = '12 planks to ' + bridgeTo;

    var summary = document.getElementById('bridgeSummary');
    summary.innerHTML =
      '<div class="summary-item"><span class="summary-num yours">' + plankCounts.yours + '</span><span class="summary-label">your planks</span></div>' +
      '<div class="summary-item"><span class="summary-num theirs">' + plankCounts.theirs + '</span><span class="summary-label">their planks</span></div>' +
      '<div class="summary-item"><span class="summary-num shared-num">' + plankCounts.shared + '</span><span class="summary-label">shared planks</span></div>';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveReflection() {
    var text = document.getElementById('completionInput').value.trim();
    if (!text) return;

    try {
      var entries = JSON.parse(localStorage.getItem('setu_bridges') || '[]');
      entries.unshift({
        to: bridgeTo,
        plank: text,
        counts: Object.assign({}, plankCounts),
        date: new Date().toISOString()
      });
      localStorage.setItem('setu_bridges', JSON.stringify(entries));
    } catch (e) { /* ignore */ }

    var btn = document.getElementById('sealBtn');
    btn.textContent = 'sealed \u2713';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'seal this bridge';
      btn.disabled = false;
    }, 2000);
  }

  function restart() {
    bridgeTo = '';
    currentPlank = 0;
    planksFilled = 0;
    plankCounts = { yours: 0, theirs: 0, shared: 0 };

    document.getElementById('bridgeTo').value = '';
    document.getElementById('completionInput').value = '';
    document.getElementById('startBridge').disabled = true;

    document.getElementById('completion').classList.add('hidden');
    document.getElementById('builder').classList.remove('hidden');
    document.getElementById('setupPhase').classList.remove('hidden');
    document.getElementById('buildPhase').classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== EVENT LISTENERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('builder').classList.remove('hidden');
      document.getElementById('navFloat').classList.add('visible');
    }, 1200);
  });

  // Setup — bridge-to input
  document.getElementById('bridgeTo').addEventListener('input', function () {
    document.getElementById('startBridge').disabled = !this.value.trim();
  });

  // Start building
  document.getElementById('startBridge').addEventListener('click', function () {
    bridgeTo = document.getElementById('bridgeTo').value.trim();
    if (!bridgeTo) return;

    document.getElementById('bridgeToLabel').textContent = bridgeTo;
    document.getElementById('setupPhase').classList.add('hidden');
    document.getElementById('buildPhase').classList.remove('hidden');
    showPlank();
  });

  // Lay plank
  document.getElementById('layPlank').addEventListener('click', layPlank);

  // Seal
  document.getElementById('sealBtn').addEventListener('click', saveReflection);

  // Restart
  document.getElementById('restartBtn').addEventListener('click', restart);

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
