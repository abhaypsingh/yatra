/* ============================================================
   SANGAM — the confluence
   Paradox meditation: holding two truths at once
   ============================================================ */

(function () {
  'use strict';

  var PARADOXES = [
    {
      left: "You love your father.",
      right: "You are angry at him.",
      confluence: "Love and anger are not opposites. They are proof of the same bond. You can only be angry at someone who matters."
    },
    {
      left: "He made mistakes that hurt you.",
      right: "He did the best he knew how.",
      confluence: "Both are true. His best was not always enough. And it was still all he had. Holding both truths is more honest than choosing one."
    },
    {
      left: "You want to be independent.",
      right: "You still need your parents.",
      confluence: "Growing up is not a switch that flips. It is a river that widens slowly. You can walk alone and still need someone to walk beside."
    },
    {
      left: "Your mother has her truth about what happened.",
      right: "Your father has his truth about what happened.",
      confluence: "Two people can live through the same event and carry different truths. Neither is lying. Memory is not a photograph \u2014 it is a painting, shaped by pain."
    },
    {
      left: "You miss how things used to be.",
      right: "You cannot go back to how things were.",
      confluence: "Missing the past does not mean the present is wrong. It means you loved something real. Grief and growth drink from the same river."
    },
    {
      left: "Forgiving someone feels like letting them off the hook.",
      right: "Holding onto anger hurts you more than it hurts them.",
      confluence: "Forgiveness is not a gift to the other person. It is setting down a stone you have been carrying. You can set it down and still remember that it was heavy."
    },
    {
      left: "You want them to understand how you feel.",
      right: "You are not sure you can explain it.",
      confluence: "The desire to be understood is one of the deepest human needs. And sometimes the most important things live in the space between what you feel and what you can say."
    },
    {
      left: "Part of you wants to reach out.",
      right: "Part of you is afraid of being hurt again.",
      confluence: "Courage and fear are not enemies. They are two rivers flowing side by side. Every brave thing you have ever done was done while scared. That is what makes it brave."
    },
    {
      left: "Families are supposed to stay together.",
      right: "Some families are healthier apart.",
      confluence: "What a family is supposed to look like and what a family needs to survive are different questions. Love does not always live under the same roof. But it still lives."
    },
    {
      left: "You are still a child.",
      right: "You understand more than adults think.",
      confluence: "Age does not decide depth. You carry more understanding than your years suggest, and more need for protection than your understanding admits. Both are real."
    }
  ];

  /* ---------- state ---------- */
  var state = {
    current: 0,
    phase: 'left' // left -> right -> confluence -> next
  };

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var engine        = document.getElementById('engine');
  var canvas        = document.getElementById('riverCanvas');
  var ctx           = canvas.getContext('2d');
  var paradoxCard   = document.getElementById('paradoxCard');
  var paradoxNumber = document.getElementById('paradoxNumber');
  var riverLeft     = document.getElementById('riverLeft');
  var leftText      = document.getElementById('leftText');
  var riverMerge    = document.getElementById('riverMerge');
  var riverRight    = document.getElementById('riverRight');
  var rightText     = document.getElementById('rightText');
  var confluence    = document.getElementById('confluence');
  var confluenceText= document.getElementById('confluenceText');
  var nextBtn       = document.getElementById('nextBtn');
  var completion    = document.getElementById('completion');
  var restartBtn    = document.getElementById('restartBtn');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- canvas river ---------- */
  var particles = [];
  var animFrame = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function RiverParticle(side) {
    this.side = side;
    var w = canvas.width;
    var h = canvas.height;
    if (side === 'left') {
      this.x = Math.random() * w * 0.35;
      this.y = -10;
      this.targetX = w * 0.5;
    } else {
      this.x = w * 0.65 + Math.random() * w * 0.35;
      this.y = -10;
      this.targetX = w * 0.5;
    }
    this.vy = 0.5 + Math.random() * 1.0;
    this.size = 1.5 + Math.random() * 2;
    this.life = 1.0;
    this.merged = false;
  }

  RiverParticle.prototype.update = function () {
    this.y += this.vy;
    var mergeY = canvas.height * 0.55;
    if (this.y > mergeY && !this.merged) {
      this.merged = true;
    }
    if (this.merged) {
      this.x += (this.targetX - this.x) * 0.02;
    }
    if (this.y > canvas.height) this.life = 0;
  };

  function spawnParticles() {
    if (particles.length < 300) {
      particles.push(new RiverParticle('left'));
      particles.push(new RiverParticle('right'));
    }
  }

  function drawRiver() {
    animFrame = requestAnimationFrame(drawRiver);
    ctx.fillStyle = 'rgba(10, 12, 16, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    spawnParticles();

    var alive = [];
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.update();
      if (p.life <= 0) continue;
      alive.push(p);

      ctx.globalAlpha = 0.4;
      if (p.merged) {
        ctx.fillStyle = '#88a880';
        ctx.globalAlpha = 0.5;
      } else if (p.side === 'left') {
        ctx.fillStyle = '#5098b8';
      } else {
        ctx.fillStyle = '#c89050';
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    particles = alive;
  }

  /* ---------- render paradox ---------- */
  function showParadox() {
    var p = PARADOXES[state.current];
    paradoxNumber.textContent = 'paradox ' + (state.current + 1) + ' of ' + PARADOXES.length;

    leftText.textContent = p.left;
    rightText.textContent = p.right;
    confluenceText.textContent = p.confluence;

    riverLeft.classList.add('hidden');
    riverMerge.classList.add('hidden');
    riverRight.classList.add('hidden');
    confluence.classList.add('hidden');

    state.phase = 'left';
    nextBtn.textContent = 'reveal';

    paradoxCard.style.animation = 'none';
    void paradoxCard.offsetWidth;
    paradoxCard.style.animation = 'fadeIn 0.6s ease';
  }

  function advance() {
    if (state.phase === 'left') {
      riverLeft.classList.remove('hidden');
      riverLeft.style.animation = 'none';
      void riverLeft.offsetWidth;
      riverLeft.style.animation = 'fadeUp 0.5s ease forwards';
      state.phase = 'right';
      nextBtn.textContent = 'and also';
    } else if (state.phase === 'right') {
      riverMerge.classList.remove('hidden');
      riverRight.classList.remove('hidden');
      riverRight.style.animation = 'none';
      void riverRight.offsetWidth;
      riverRight.style.animation = 'fadeUp 0.5s ease forwards';
      state.phase = 'confluence';
      nextBtn.textContent = 'the confluence';
    } else if (state.phase === 'confluence') {
      confluence.classList.remove('hidden');
      confluence.style.animation = 'none';
      void confluence.offsetWidth;
      confluence.style.animation = 'fadeUp 0.6s ease';
      state.phase = 'next';
      if (state.current < PARADOXES.length - 1) {
        nextBtn.textContent = 'next \u2192';
      } else {
        nextBtn.textContent = 'finish';
      }
    } else if (state.phase === 'next') {
      if (state.current < PARADOXES.length - 1) {
        state.current++;
        showParadox();
      } else {
        showCompletion();
      }
    }
  }

  function showCompletion() {
    engine.classList.add('hidden');
    if (animFrame) cancelAnimationFrame(animFrame);
    completion.classList.remove('hidden');
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      drawRiver();
      showParadox();
    }, 1200);
  });

  nextBtn.addEventListener('click', advance);

  restartBtn.addEventListener('click', function () {
    state.current = 0;
    state.phase = 'left';
    completion.classList.add('hidden');
    engine.classList.remove('hidden');
    particles = [];
    drawRiver();
    showParadox();
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
