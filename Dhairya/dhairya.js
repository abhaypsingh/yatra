/* ============================================================
   DHAIRYA — patience
   Six scenarios of active waiting, stone-in-water canvas
   ============================================================ */

(function () {
  'use strict';

  var SCENARIOS = [
    {
      title: 'The Unanswered Message',
      body: 'You sent a message to someone important. Hours pass. Then a day. The blue ticks say they read it. They have not replied.',
      urge: 'Send another message. Ask why they are ignoring you. Assume the worst. Let the silence become proof that they do not care.',
      patience: 'They have their own life, their own weight. Silence is not always rejection. Sometimes it is just someone gathering the right words. Wait.',
      wisdom: 'Not every silence is about you. Sometimes the kindest thing you can do is let someone find their own timing.'
    },
    {
      title: 'The Unfair Accusation',
      body: 'Someone said something about you that is not true. They told others. You can feel the wrongness of it like a bruise. You want to set the record straight.',
      urge: 'Defend yourself immediately. Confront them. Make sure everyone knows the truth. Speak louder than the lie.',
      patience: 'The truth does not need volume. People who know you already know. People who do not will learn in time. A reaction gives the lie more power than it deserves.',
      wisdom: 'Sometimes the most powerful response to a lie is a life that quietly proves it wrong.'
    },
    {
      title: 'The Slow Healing',
      body: 'Something broke \u2014 a relationship, a trust, a sense of safety. You want it fixed. You want it to be how it was before. But healing moves at its own speed, and that speed is slow.',
      urge: 'Force a conversation. Demand an apology. Pretend it is fine when it is not. Rush to the ending because the middle hurts too much.',
      patience: 'Healing is not a straight line. Some days are better. Some are worse. The only way through is through, and that takes whatever time it takes.',
      wisdom: 'You cannot microwave trust. It grows back the way a bone heals \u2014 slowly, and stronger at the broken place.'
    },
    {
      title: 'The Uncertain Future',
      body: 'You do not know what is going to happen. School, family, friendships \u2014 everything feels like it could change at any moment. The not-knowing is heavier than any bad news would be.',
      urge: 'Try to control everything. Plan for every outcome. Ask the same questions over and over. Demand certainty from a world that cannot give it.',
      patience: 'Uncertainty is not the enemy. It is the space where possibility lives. You do not need to know the whole path. You only need to see the next step.',
      wisdom: 'The tree does not know what shape it will be. It just grows toward the light, one ring at a time.'
    },
    {
      title: 'The Person Who Is Not Ready',
      body: 'Someone you care about is making a choice you disagree with. You can see clearly what they should do. They cannot see it, or they are not ready to see it.',
      urge: 'Tell them again. Explain harder. Get frustrated that they will not listen. Start to confuse their readiness with how much they value your opinion.',
      patience: 'People change when they are ready, not when you are ready for them. Planting a seed and watering it daily is not the same as pulling the plant out of the ground to check the roots.',
      wisdom: 'Love someone enough to let them learn at their own pace. Your job is to be there when they arrive, not to drag them to the destination.'
    },
    {
      title: 'The Long Wait',
      body: 'You are waiting for something that matters deeply to you. A reconciliation. A chance. A door to open. Every day it does not happen feels like proof that it never will.',
      urge: 'Give up. Decide it was never going to work. Build a wall around the hope so it cannot hurt you when it dies.',
      patience: 'Hope is not naive. It is brave. The wait is not wasted time \u2014 it is the time you are becoming the person who will be ready when the moment comes.',
      wisdom: 'Some of the most important things in your life are on their way to you right now. They are just not here yet. Keep the door open.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var engine       = document.getElementById('engine');
  var canvas       = document.getElementById('waterCanvas');
  var ctx          = canvas.getContext('2d');
  var scenarioCard = document.getElementById('scenarioCard');
  var scenarioNumber = document.getElementById('scenarioNumber');
  var scenarioTitle = document.getElementById('scenarioTitle');
  var scenarioBody = document.getElementById('scenarioBody');
  var urgeBox      = document.getElementById('urgeBox');
  var urgeText     = document.getElementById('urgeText');
  var patienceBox  = document.getElementById('patienceBox');
  var patienceText = document.getElementById('patienceText');
  var wisdomBox    = document.getElementById('wisdomBox');
  var wisdomText   = document.getElementById('wisdomText');
  var nextBtn      = document.getElementById('nextBtn');
  var closingEl    = document.getElementById('closing');
  var gardenCanvas = document.getElementById('gardenCanvas');
  var gardenCtx    = gardenCanvas.getContext('2d');
  var restartBtn   = document.getElementById('restartBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var current = 0;
  var phase = 'urge'; /* urge -> patience -> wisdom -> next */
  var ripples = [];
  var stones = [];
  var animating = false;

  /* ---------- canvas ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gardenCanvas.width = window.innerWidth;
    gardenCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* water ripple */
  function WaterRipple(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.maxR = 200;
    this.alpha = 0.4;
  }
  WaterRipple.prototype.update = function () {
    this.r += 1.2;
    this.alpha -= 0.003;
  };
  WaterRipple.prototype.draw = function (c) {
    if (this.alpha <= 0) return;
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(96, 144, 168, ' + Math.max(0, this.alpha) + ')';
    c.lineWidth = 1;
    c.stroke();
  };

  function animate() {
    if (!animating) return;
    ctx.fillStyle = 'rgba(8, 10, 12, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* draw stones */
    for (var s = 0; s < stones.length; s++) {
      ctx.beginPath();
      ctx.arc(stones[s].x, stones[s].y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 144, 168, 0.3)';
      ctx.fill();
    }

    /* draw ripples */
    for (var i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].draw(ctx);
      if (ripples[i].alpha <= 0) ripples.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animating) return;
    animating = true;
    ctx.fillStyle = 'rgba(8, 10, 12, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }

  function dropStone() {
    var x = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
    var y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
    stones.push({ x: x, y: y });
    for (var r = 0; r < 3; r++) {
      var rip = new WaterRipple(x, y);
      rip.r = r * 30;
      rip.alpha = 0.3 - r * 0.08;
      ripples.push(rip);
    }
  }

  /* ---------- show scenario ---------- */
  function showScenario() {
    var s = SCENARIOS[current];
    scenarioNumber.textContent = (current + 1) + ' of ' + SCENARIOS.length;
    scenarioTitle.textContent = s.title;
    scenarioBody.textContent = s.body;
    urgeText.textContent = s.urge;
    patienceText.textContent = s.patience;
    wisdomText.textContent = s.wisdom;

    urgeBox.classList.remove('hidden');
    patienceBox.classList.add('hidden');
    wisdomBox.classList.add('hidden');
    phase = 'urge';
    nextBtn.textContent = 'I choose to wait';

    scenarioCard.style.animation = 'none';
    void scenarioCard.offsetWidth;
    scenarioCard.style.animation = 'fadeIn 0.6s ease';
  }

  /* ---------- advance ---------- */
  nextBtn.addEventListener('click', function () {
    if (phase === 'urge') {
      patienceBox.classList.remove('hidden');
      phase = 'patience';
      nextBtn.textContent = 'what patience teaches';
    } else if (phase === 'patience') {
      wisdomBox.classList.remove('hidden');
      dropStone();
      phase = 'wisdom';
      if (current < SCENARIOS.length - 1) {
        nextBtn.textContent = 'next \u2192';
      } else {
        nextBtn.textContent = 'the garden';
      }
    } else if (phase === 'wisdom') {
      if (current < SCENARIOS.length - 1) {
        current++;
        showScenario();
      } else {
        showClosing();
      }
    }
  });

  /* ---------- closing ---------- */
  function showClosing() {
    engine.classList.add('hidden');
    closingEl.classList.remove('hidden');

    /* draw garden stones */
    gardenCtx.fillStyle = 'rgba(8, 10, 12, 1)';
    gardenCtx.fillRect(0, 0, gardenCanvas.width, gardenCanvas.height);
    for (var i = 0; i < stones.length; i++) {
      gardenCtx.beginPath();
      gardenCtx.arc(stones[i].x, stones[i].y, 8, 0, Math.PI * 2);
      gardenCtx.fillStyle = 'rgba(96, 144, 168, 0.25)';
      gardenCtx.fill();
      /* gentle glow */
      var grad = gardenCtx.createRadialGradient(stones[i].x, stones[i].y, 0, stones[i].x, stones[i].y, 40);
      grad.addColorStop(0, 'rgba(96, 144, 168, 0.08)');
      grad.addColorStop(1, 'rgba(96, 144, 168, 0)');
      gardenCtx.beginPath();
      gardenCtx.arc(stones[i].x, stones[i].y, 40, 0, Math.PI * 2);
      gardenCtx.fillStyle = grad;
      gardenCtx.fill();
    }
  }

  restartBtn.addEventListener('click', function () {
    current = 0;
    phase = 'urge';
    stones = [];
    ripples = [];
    closingEl.classList.add('hidden');
    engine.classList.remove('hidden');
    ctx.fillStyle = 'rgba(8, 10, 12, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    showScenario();
  });

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      startAnimation();
      showScenario();
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
