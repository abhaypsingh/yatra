/* ============================================================
   MAITRI — loving-kindness
   Five expanding circles of compassion
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'maitri_practices';

  var CIRCLES = [
    {
      key: 'self',
      label: 'circle one \u2014 the center',
      title: 'Yourself',
      prompt: 'Kindness begins here. You cannot pour from an empty cup. Name yourself and send yourself one kind thought.',
      nameLabel: 'your name',
      color: [208, 160, 112]
    },
    {
      key: 'loved',
      label: 'circle two \u2014 someone you love',
      title: 'A Loved One',
      prompt: 'Think of someone whose face makes you soften. A parent, a sibling, a grandparent, a friend who feels like family.',
      nameLabel: 'their name',
      color: [200, 120, 140]
    },
    {
      key: 'friend',
      label: 'circle three \u2014 a friend',
      title: 'A Friend',
      prompt: 'Not your closest person \u2014 a friend. Someone you enjoy, someone who brightens a room. They deserve kindness too.',
      nameLabel: 'their name',
      color: [160, 120, 192]
    },
    {
      key: 'neutral',
      label: 'circle four \u2014 a neutral person',
      title: 'Someone You Barely Know',
      prompt: 'The cashier at the store. A classmate you have never spoken to. The neighbor you nod at. They carry a life as full as yours.',
      nameLabel: 'their name or description',
      color: [120, 152, 200]
    },
    {
      key: 'difficult',
      label: 'circle five \u2014 the hardest circle',
      title: 'Someone Difficult',
      prompt: 'This is the bravest circle. Someone who has hurt you, frustrated you, or someone you struggle with. Sending kindness here does not mean approval. It means you refuse to let resentment live in you.',
      nameLabel: 'their name',
      color: [136, 184, 144]
    }
  ];

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var engine        = document.getElementById('engine');
  var canvas        = document.getElementById('ringCanvas');
  var ctx           = canvas.getContext('2d');
  var circleCard    = document.getElementById('circleCard');
  var circleLabel   = document.getElementById('circleLabel');
  var circleTitle   = document.getElementById('circleTitle');
  var circlePrompt  = document.getElementById('circlePrompt');
  var nameLabel     = document.getElementById('nameLabel');
  var nameInput     = document.getElementById('nameInput');
  var thoughtInput  = document.getElementById('thoughtInput');
  var sendBtn       = document.getElementById('sendBtn');
  var completeCard  = document.getElementById('completeCard');
  var viewHistoryBtn = document.getElementById('viewHistoryBtn');
  var history       = document.getElementById('history');
  var historySub    = document.getElementById('historySub');
  var historyEntries = document.getElementById('historyEntries');
  var historyBack   = document.getElementById('historyBack');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var currentCircle = 0;
  var answers = [];
  var ringGlows = [0, 0, 0, 0, 0]; /* 0 = dim, 1 = glowing */
  var animating = false;
  var pulseTime = 0;

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

  /* ---------- canvas ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawRings() {
    if (!animating) return;
    pulseTime += 0.015;

    ctx.fillStyle = 'rgba(10, 8, 12, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var maxR = Math.min(canvas.width, canvas.height) * 0.42;

    for (var i = CIRCLES.length - 1; i >= 0; i--) {
      var frac = (i + 1) / CIRCLES.length;
      var r = maxR * frac;
      var pulse = Math.sin(pulseTime + i * 0.8) * 0.03 + 1;
      var drawR = r * pulse;

      var c = CIRCLES[i].color;
      var alpha = ringGlows[i] > 0 ? 0.15 + Math.sin(pulseTime + i) * 0.05 : 0.03;

      ctx.beginPath();
      ctx.arc(cx, cy, drawR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (ringGlows[i] > 0 ? 0.6 : 0.12) + ')';
      ctx.lineWidth = ringGlows[i] > 0 ? 2 : 1;
      ctx.stroke();

      /* fill glow */
      if (ringGlows[i] > 0) {
        var grad = ctx.createRadialGradient(cx, cy, drawR * 0.6, cx, cy, drawR);
        grad.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ', 0)');
        grad.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')');
        ctx.beginPath();
        ctx.arc(cx, cy, drawR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    /* center dot */
    var cAlpha = ringGlows[0] > 0 ? 0.6 + Math.sin(pulseTime * 2) * 0.2 : 0.15;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(208, 160, 112, ' + cAlpha + ')';
    ctx.fill();

    requestAnimationFrame(drawRings);
  }

  function startAnimation() {
    if (animating) return;
    animating = true;
    ctx.fillStyle = 'rgba(10, 8, 12, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawRings();
  }

  /* ---------- show circle ---------- */
  function showCircle() {
    var c = CIRCLES[currentCircle];
    circleLabel.textContent = c.label;
    circleTitle.textContent = c.title;
    circlePrompt.textContent = c.prompt;
    nameLabel.textContent = c.nameLabel;
    nameInput.value = '';
    thoughtInput.value = '';

    if (currentCircle === CIRCLES.length - 1) {
      sendBtn.textContent = 'send \u2713';
    } else {
      sendBtn.textContent = 'send \u2192';
    }

    circleCard.style.animation = 'none';
    void circleCard.offsetWidth;
    circleCard.style.animation = 'fadeIn 0.6s ease';
    nameInput.focus();
  }

  /* ---------- send ---------- */
  sendBtn.addEventListener('click', function () {
    var name = nameInput.value.trim();
    var thought = thoughtInput.value.trim();
    if (!name) return;

    answers.push({
      circle: CIRCLES[currentCircle].key,
      name: name,
      thought: thought
    });

    ringGlows[currentCircle] = 1;

    if (currentCircle < CIRCLES.length - 1) {
      currentCircle++;
      showCircle();
    } else {
      /* complete */
      saveEntry(dkey(new Date()), {
        timestamp: Date.now(),
        circles: answers.slice()
      });
      circleCard.classList.add('hidden');
      completeCard.classList.remove('hidden');
    }
  });

  /* ---------- history ---------- */
  function showHistory() {
    engine.classList.add('hidden');
    history.classList.remove('hidden');

    var all = loadAll();
    var keys = Object.keys(all).sort().reverse();
    historySub.textContent = keys.length + ' practice' + (keys.length === 1 ? '' : 's');
    historyEntries.innerHTML = '';

    if (keys.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = 'No practices yet.';
      historyEntries.appendChild(empty);
      return;
    }

    for (var k = 0; k < keys.length; k++) {
      var entry = all[keys[k]];
      var parts = keys[k].split('-');
      var entryDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      var div = document.createElement('div');
      div.className = 'history-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'history-date';
      dateEl.textContent = formatDate(entryDate);
      div.appendChild(dateEl);

      if (entry.circles) {
        for (var c = 0; c < entry.circles.length; c++) {
          var ci = entry.circles[c];
          var circleInfo = null;
          for (var j = 0; j < CIRCLES.length; j++) {
            if (CIRCLES[j].key === ci.circle) { circleInfo = CIRCLES[j]; break; }
          }

          var cDiv = document.createElement('div');
          cDiv.className = 'history-circle';
          if (circleInfo) {
            cDiv.style.borderLeftColor = 'rgb(' + circleInfo.color.join(',') + ')';
          }

          var cLabel = document.createElement('div');
          cLabel.className = 'history-circle-label';
          cLabel.textContent = ci.circle;
          cDiv.appendChild(cLabel);

          var cName = document.createElement('div');
          cName.className = 'history-circle-name';
          cName.textContent = ci.name;
          cDiv.appendChild(cName);

          if (ci.thought) {
            var cThought = document.createElement('div');
            cThought.className = 'history-circle-thought';
            cThought.textContent = ci.thought;
            cDiv.appendChild(cThought);
          }

          div.appendChild(cDiv);
        }
      }

      historyEntries.appendChild(div);
    }
  }

  viewHistoryBtn.addEventListener('click', showHistory);
  historyBack.addEventListener('click', function () {
    history.classList.add('hidden');
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
      showCircle();
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
