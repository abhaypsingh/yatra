/* ============================================================
   SANKALPA — sacred resolve
   Rising sparks that grow brighter, becoming steady flames
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'I Will Speak When It Matters',
      body: [
        'The moment arrives. Someone says something cruel. Something unfair happens. A question is asked and you know the answer. Your opinion matters and no one has asked for it.',
        '<em>The words are right there, in your throat, ready. And you swallow them.</em>'
      ],
      why: 'Silence has a cost. Not the peaceful silence of choosing stillness, but the silence of suppression \u2014 of making yourself small because speaking up feels dangerous. Every time you swallow your truth, a part of you learns that your voice does not matter. But it does. It matters more than you know.',
      prompt: 'What is something you have been wanting to say? To whom?',
      flame: 'Your voice does not have to be loud to be powerful. It does not have to be perfect to be important. Speaking when it matters is not about being brave in the moment. It is about deciding, in advance, that you will not betray yourself with silence. You can be scared and still speak. That is what resolve looks like.'
    },
    {
      title: 'I Will Not Let Others Define Me',
      body: [
        'They say you are too quiet. Too loud. Too sensitive. Too much. Not enough. They have opinions about your body, your family, your choices, your future.',
        '<em>And some of these voices belong to people you love \u2014 which makes them harder to ignore.</em>'
      ],
      why: 'When someone defines you, they draw a box. And if you accept their definition, you live inside that box. But you are not a box. You are a living, changing, growing person who cannot be captured in someone else\u2019s sentence about who you are.',
      prompt: 'What is a label someone has given you that does not fit? What would you replace it with?',
      flame: 'You are the only author of your story. Other people can offer descriptions, opinions, observations. But the definition \u2014 the final word on who you are \u2014 that belongs to you alone. I will listen to feedback. I will consider other perspectives. But I will not outsource my identity to anyone else\u2019s comfort.'
    },
    {
      title: 'I Will Be Kind Even When It Costs Me',
      body: [
        'Kindness is easy when it is free. Smiling at a friend. Saying something nice. Holding a door. But real kindness \u2014 the kind that matters \u2014 has a price.',
        '<em>It means being kind to the person everyone is excluding. It means not joining the gossip even when it would buy you belonging. It means choosing someone else\u2019s dignity over your own comfort.</em>'
      ],
      why: 'Cheap kindness changes nothing. Costly kindness changes everything. And you will face this choice more often than you think \u2014 the choice between what is easy and what is kind. They are almost never the same thing.',
      prompt: 'When has kindness cost you something? Was it worth it?',
      flame: 'This resolve does not mean you will always succeed. It means you will always try. Some days the cost will feel too high, and you will choose the easy path. That is human. The resolve is not in being perfect. It is in returning \u2014 again and again \u2014 to the intention to be kind. Even after you fail. Especially after you fail.'
    },
    {
      title: 'I Will Forgive But I Will Remember',
      body: [
        'Forgiveness sounds noble until you are the one who has to do it. Until the person who hurt you is still there. Until the apology never comes.',
        '<em>Until everyone tells you to move on while you are still bleeding.</em>'
      ],
      why: 'Forgiveness is not amnesia. It is not pretending it did not happen. It is not saying it was okay. Forgiveness is deciding that the person who hurt you does not get to keep hurting you through your own anger. It is freedom \u2014 not for them, but for you.',
      prompt: 'Is there something you want to forgive but feel you cannot? What would forgiving it give you?',
      flame: 'I will forgive because carrying anger is exhausting and I deserve to be free. But I will remember because memory is protection. I will remember so I can recognize the pattern if it returns. I will remember so I can build better boundaries. Forgiveness and memory are not opposites. Together, they are wisdom.'
    },
    {
      title: 'I Will Ask For Help When I Need It',
      body: [
        'Asking for help feels like admitting defeat. Like you are not strong enough, smart enough, capable enough. Like you are burdening someone.',
        '<em>So you carry it. And carry it. Until your knees buckle.</em>'
      ],
      why: 'The strongest people you know ask for help. The bravest thing a human being can say is: I cannot do this alone. It takes more courage to reach out a hand than to clench a fist. And the people who love you? They are waiting for you to ask. They have been waiting.',
      prompt: 'What are you carrying right now that you could ask someone to help with?',
      flame: 'I resolve to ask before I break. Not after. Not when it is too late. Not when the weight has already damaged me. I will ask early. I will ask honestly. And I will let people help me without shame \u2014 because needing help is not weakness. It is the most human thing in the world.'
    },
    {
      title: 'I Will Keep Going',
      body: [
        'Not the dramatic perseverance of climbing a mountain. The quiet perseverance of getting up on a Tuesday when nothing is particularly wrong but nothing is particularly right either.',
        '<em>The keeping-going that no one sees. The showing up for your own life when your own life is not showing up for you.</em>'
      ],
      why: 'Most of life is not the mountaintop or the valley. It is the flat middle ground where nothing much happens and you have to decide, every single day, to keep walking. This is where character is built. Not in the crisis, but in the ordinary.',
      prompt: 'What makes you want to keep going, even on the hard days?',
      flame: 'I will keep going. Not because I am sure it will get better. Not because I have a plan. Not because someone promised me a happy ending. I will keep going because I am here, and being here means something, and the person I am becoming deserves to see what comes next. That is enough. That has always been enough.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var sceneView    = document.getElementById('sceneView');
  var sceneTitle   = document.getElementById('sceneTitle');
  var sceneBody    = document.getElementById('sceneBody');
  var whyBox       = document.getElementById('whyBox');
  var whyText      = document.getElementById('whyText');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var flameBox     = document.getElementById('flameBox');
  var flameText    = document.getElementById('flameText');
  var whyBtn       = document.getElementById('whyBtn');
  var nextBtn      = document.getElementById('nextBtn');
  var progressText = document.getElementById('progressText');
  var completeEl   = document.getElementById('complete');
  var againBtn     = document.getElementById('againBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var currentIdx = 0;
  var flamesLit = 0;
  var animFrame = null;

  /* ---------- canvas: rising sparks becoming flames ---------- */
  var sparks = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Spark() { this.reset(); }
  Spark.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = bgCanvas.height + Math.random() * 40;
    this.vy = -(Math.random() * 0.4 + 0.1);
    this.vx = (Math.random() - 0.5) * 0.2;
    this.r = Math.random() * 1.5 + 0.3;
    this.life = Math.random() * 500 + 300;
    this.age = 0;
    this.alpha = Math.random() * 0.15 + 0.03;
    var t = Math.random();
    if (t < 0.5) {
      this.color = [200, 144, 64];
    } else if (t < 0.8) {
      this.color = [208, 168, 80];
    } else {
      this.color = [180, 120, 50];
    }
    /* lit sparks are brighter and steadier */
    this.isLit = Math.random() < (flamesLit / 6) * 0.6;
    if (this.isLit) {
      this.alpha = Math.random() * 0.2 + 0.1;
      this.vy *= 0.5;
      this.r *= 1.4;
    }
  };
  Spark.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.isLit) {
      this.vx += (Math.random() - 0.5) * 0.02;
    }
    this.age++;
    if (this.age > this.life || this.y < -20) this.reset();
  };
  Spark.prototype.draw = function () {
    var fade = 1 - (this.age / this.life);
    var a = this.alpha * fade;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + a + ')';
    ctx.fill();
    if (this.isLit && fade > 0.3) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + (a * 0.15) + ')';
      ctx.fill();
    }
  };

  for (var i = 0; i < 50; i++) {
    var s = new Spark();
    s.age = Math.floor(Math.random() * s.life);
    s.y = Math.random() * bgCanvas.height;
    sparks.push(s);
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 8, 6, 0.03)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < sparks.length; j++) {
      sparks[j].update();
      sparks[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- scene flow ---------- */
  function showScene(idx) {
    if (idx >= SCENES.length) {
      sceneView.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }

    currentIdx = idx;
    var sc = SCENES[idx];

    sceneTitle.textContent = sc.title;
    sceneBody.innerHTML = '';
    for (var p = 0; p < sc.body.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = sc.body[p];
      sceneBody.appendChild(pEl);
    }

    whyText.textContent = sc.why;
    askPrompt.textContent = sc.prompt;
    flameText.textContent = sc.flame;
    askInput.value = '';

    whyBox.classList.add('hidden');
    askBox.classList.add('hidden');
    flameBox.classList.add('hidden');
    whyBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  whyBtn.addEventListener('click', function () {
    whyBtn.classList.add('hidden');
    whyBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
    flameBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    flamesLit = Math.min(6, currentIdx + 1);
    flameBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  nextBtn.addEventListener('click', function () {
    showScene(currentIdx + 1);
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      showScene(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    flamesLit = 0;
    completeEl.classList.add('hidden');
    showScene(0);
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
