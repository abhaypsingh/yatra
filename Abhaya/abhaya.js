/* ============================================================
   ABHAYA — fearlessness
   Six definitions of what it means to feel safe
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'Safe in Your Body',
      body: [
        'Safety starts here. In the body. In knowing that no one will hurt you physically. That the space you stand in is yours. That you can move through the world without bracing for impact.',
        '<em>When your body feels safe, your shoulders drop. Your jaw unclenches. You breathe all the way down to your stomach instead of catching it in your chest.</em>'
      ],
      absence: 'When your body does not feel safe, everything changes. You scan rooms before entering. You calculate distances to exits. You flinch at sudden movements. Your nervous system is always on, always watching, always waiting. You are never fully anywhere because part of you is always ready to leave.',
      prompt: 'Does your body feel safe right now? Where do you feel it \u2014 or where do you feel the absence of it?',
      truth: 'You have an absolute right to physical safety. This is not negotiable. Not with a parent, not with a friend, not with anyone. If someone makes your body feel unsafe, that is their failure, not yours. And telling someone about it is not betrayal \u2014 it is the bravest thing a person can do.'
    },
    {
      title: 'Safe to Feel',
      body: [
        'This is the safety of having emotions and being allowed to have them. Crying without being told to stop. Being angry without being punished for it. Feeling joy without someone making you feel guilty.',
        '<em>Emotional safety means: what I feel is real, and it matters, even when it is inconvenient for the people around me.</em>'
      ],
      absence: 'When you are not safe to feel, you learn to hide. You smile when you are sad. You say "I\u2019m fine" so many times it becomes automatic. You stop crying because crying made things worse. Over time, you forget what you actually feel. The hiding becomes so good that you hide from yourself.',
      prompt: 'Is there an emotion you have learned to hide? What would it be like to let it exist, just here, just for a moment?',
      truth: 'Every emotion you have is valid. Not every action is \u2014 but every feeling is. Anger is valid. Sadness without reason is valid. Joy in dark times is valid. The people who love you well will make room for all of it. The ones who only love your happy version do not love you. They love their comfort.'
    },
    {
      title: 'Safe to Be Yourself',
      body: [
        'This is the safety of walking into a room and not performing. Not adjusting your voice, your posture, your personality to match what someone expects. Being the same person in public that you are alone.',
        '<em>This kind of safety is rare. Most people do not find it until much later in life. Some never do.</em>'
      ],
      absence: 'Without this safety, you become a collection of masks. One for school, one for home, one for friends, one for social media. Each mask is exhausting to maintain. And underneath all of them, the real you gets quieter and quieter until you are not sure who that person is anymore.',
      prompt: 'Where are you most yourself? Is there a place, a person, a moment where the mask comes off?',
      truth: 'The world will try to edit you. It will tell you that parts of you are too much or not enough. Your laugh is too loud. Your interests are too strange. Your heritage is too different. Ignore every word of it. The things that make you different are not defects. They are the entire point. You were not born to blend in. No one was.'
    },
    {
      title: 'Safe to Say No',
      body: [
        'This is the safety of having boundaries and not being punished for them. Saying "I do not want to" without a lecture. Saying "that makes me uncomfortable" without being mocked. Saying "not right now" without losing someone\u2019s love.',
        '<em>Boundaries are not walls. They are doors you get to control.</em>'
      ],
      absence: 'When "no" is not safe, you learn to say yes to everything. Yes to plans you hate. Yes to touch you did not want. Yes to conversations that drain you. Yes becomes your default because no has too high a price. And slowly, the things that are yours \u2014 your time, your energy, your body \u2014 stop belonging to you.',
      prompt: 'Is there something you want to say no to but have not? What would it feel like to say it?',
      truth: 'You are allowed to say no. To anyone. At any time. For any reason. "No" is a complete sentence. The people who respect your no are the people who deserve your yes. And if someone punishes you for a boundary, they are telling you something important about themselves \u2014 not about you.'
    },
    {
      title: 'Safe to Make Mistakes',
      body: [
        'This is the safety of getting it wrong and knowing you will still be loved. Failing a test. Saying the wrong thing. Breaking something. Making a choice you regret. And having someone look at you and say: it is okay. You are still okay.',
        '<em>In the safest homes, mistakes are lessons. In the least safe homes, mistakes are crimes.</em>'
      ],
      absence: 'Without this safety, perfectionism takes root. You stop trying new things because you might fail. You lie about small mistakes because the truth feels too dangerous. You set impossible standards for yourself and then hate yourself for not meeting them. The fear of failure becomes worse than failure itself.',
      prompt: 'What is a mistake you are carrying? What would it mean to set it down?',
      truth: 'You will make thousands of mistakes in your life. Thousands. And not one of them will make you unworthy of love. The adults who taught you that mistakes are catastrophic were wrong. They were probably taught the same lie by the adults who raised them. You can break that chain right now, today, by being gentle with yourself when you get something wrong.'
    },
    {
      title: 'Safe to Be Alone',
      body: [
        'This is the quietest safety. The safety of solitude without loneliness. Of being by yourself and feeling whole instead of abandoned. Of sitting in silence and not needing to fill it with noise or screens or other people\u2019s validation.',
        '<em>You are safe to be alone when being alone is a choice, not a sentence.</em>'
      ],
      absence: 'When solitude is not safe, you cling. To friends, to devices, to noise, to anything that fills the space. Being alone feels like being forgotten. Quiet feels like rejection. And you start to believe that your worth depends on being wanted, needed, included \u2014 that without someone else\u2019s attention, you disappear.',
      prompt: 'When you are alone, what do you feel? Is it peace, or is it something else?',
      truth: 'Learning to be alone without being lonely is one of the greatest skills a human being can develop. It means you are enough company for yourself. It means your sense of worth comes from inside, not from likes or invitations or someone else\u2019s approval. The people who are comfortable alone are the ones who choose their relationships from desire, not desperation. They love others freely because they do not need others to survive.'
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
  var absenceBox   = document.getElementById('absenceBox');
  var absenceText  = document.getElementById('absenceText');
  var reflectBox   = document.getElementById('reflectBox');
  var reflectPrompt = document.getElementById('reflectPrompt');
  var reflectInput = document.getElementById('reflectInput');
  var truthBox     = document.getElementById('truthBox');
  var truthText    = document.getElementById('truthText');
  var absenceBtn   = document.getElementById('absenceBtn');
  var reflectBtn   = document.getElementById('reflectBtn');
  var truthBtn     = document.getElementById('truthBtn');
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
  var animFrame = null;

  /* ---------- canvas: warm lantern orbs ---------- */
  var lanterns = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Lantern() { this.reset(); }
  Lantern.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.baseR = Math.random() * 20 + 8;
    this.r = this.baseR;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = -Math.random() * 0.12 - 0.02;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.015 + 0.008;
    this.alpha = Math.random() * 0.06 + 0.02;
    var warmth = Math.random();
    if (warmth < 0.6) {
      this.color = [200, 176, 104];
    } else if (warmth < 0.85) {
      this.color = [220, 190, 120];
    } else {
      this.color = [240, 220, 160];
    }
  };
  Lantern.prototype.update = function () {
    this.pulse += this.pulseSpeed;
    this.r = this.baseR + Math.sin(this.pulse) * 4;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -50) this.x = bgCanvas.width + 50;
    if (this.x > bgCanvas.width + 50) this.x = -50;
    if (this.y < -50) { this.y = bgCanvas.height + 50; this.x = Math.random() * bgCanvas.width; }
  };
  Lantern.prototype.draw = function () {
    var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    grad.addColorStop(0, 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + (this.alpha * 1.5) + ')');
    grad.addColorStop(0.5, 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + (this.alpha * 0.5) + ')');
    grad.addColorStop(1, 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  };

  for (var i = 0; i < 30; i++) lanterns.push(new Lantern());

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 6, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < lanterns.length; j++) {
      lanterns[j].update();
      lanterns[j].draw();
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
    var s = SCENES[idx];

    sceneTitle.textContent = s.title;
    sceneBody.innerHTML = '';
    for (var p = 0; p < s.body.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.body[p];
      sceneBody.appendChild(pEl);
    }

    absenceText.textContent = s.absence;
    reflectPrompt.textContent = s.prompt;
    truthText.textContent = s.truth;
    reflectInput.value = '';

    absenceBox.classList.add('hidden');
    reflectBox.classList.add('hidden');
    truthBox.classList.add('hidden');
    absenceBtn.classList.remove('hidden');
    reflectBtn.classList.add('hidden');
    truthBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  absenceBtn.addEventListener('click', function () {
    absenceBtn.classList.add('hidden');
    absenceBox.classList.remove('hidden');
    setTimeout(function () {
      reflectBtn.classList.remove('hidden');
      absenceBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  reflectBtn.addEventListener('click', function () {
    reflectBtn.classList.add('hidden');
    reflectBox.classList.remove('hidden');
    truthBtn.classList.remove('hidden');
    reflectBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  truthBtn.addEventListener('click', function () {
    truthBtn.classList.add('hidden');
    reflectBox.classList.add('hidden');
    truthBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    truthBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
