/* ============================================================
   SHRADDHA — faith in yourself
   Six pieces of evidence that you can trust who you are becoming
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'You Have Survived Everything So Far',
      body: [
        'Think about it. Every hard day. Every loss. Every humiliation. Every night when you did not know how you would get through tomorrow. You are here.',
        '<em>Your survival rate is 100 percent. That is not luck. That is you.</em>'
      ],
      evidence: 'You adapted to a new school. You endured a family that changed shape. You lived through days when getting out of bed was the hardest thing you could imagine, and you got out of bed anyway. You have been knocked down by things that would break most adults, and you are still standing. Not unscathed \u2014 no one is unscathed \u2014 but standing.',
      prompt: 'What is the hardest thing you have survived? What did surviving it teach you about yourself?',
      verdict: 'The person who survived all of that is the same person who will face whatever comes next. You are not meeting the future as a stranger. You are meeting it as someone with a proven track record of making it through. That is not optimism. That is evidence.'
    },
    {
      title: 'You Have Learned Things No One Taught You',
      body: [
        'Not from a classroom. Not from a textbook. There are things you know now \u2014 about people, about yourself, about how the world works \u2014 that no one sat you down and explained.',
        '<em>You figured them out. Through observation, through pain, through the slow accumulation of living.</em>'
      ],
      evidence: 'You learned to read a room. You learned when someone is lying. You learned the difference between people who care about you and people who care about what you give them. You learned that silence can mean ten different things. You learned to carry adult-sized knowledge in a child-sized body. None of that was in the curriculum.',
      prompt: 'What is something important you know that no one taught you? How did you learn it?',
      verdict: 'A person who can learn without being taught is a person who will never be stuck. Classrooms end. Schools end. Teachers move on. But your ability to observe, absorb, and understand \u2014 that is yours forever. It is the most reliable tool you own, and it works in every situation, every country, every stage of life.'
    },
    {
      title: 'You Have Loved Despite the Risk',
      body: [
        'Loving people is the most dangerous thing a human being can do. It means handing someone the ability to hurt you and trusting them not to. And you have done it. You have loved people even after being hurt by others.',
        '<em>That is not naivety. That is the bravest thing there is.</em>'
      ],
      evidence: 'After everything \u2014 after broken trust, after disappointment, after watching love fail to protect the people you care about \u2014 you still have the capacity to care. You still worry about people. You still feel the pull toward connection. The part of you that loves has been tested harder than most adults\u2019 and it is still working.',
      prompt: 'Who do you love, even though loving them is a risk?',
      verdict: 'A person whose capacity for love has survived pain has the strongest heart in the room. Not the hardest heart \u2014 the strongest. Because hardness is just fear with a wall around it. But loving after being hurt? That is faith. In people, in connection, in yourself. And it means that no matter what happens, you will always be able to build relationships that matter.'
    },
    {
      title: 'You Know Right from Wrong Without Being Told',
      body: [
        'When someone is being treated unfairly, you feel it. When someone lies, something in you tightens. When you see kindness, something in you opens. You have a moral compass that works.',
        '<em>No one installed it. It grew. From everything you have watched, experienced, and lived through.</em>'
      ],
      evidence: 'You have seen what cruelty looks like and you know you do not want to add to it. You have seen what honesty costs and you respect the people who pay it. You have felt the difference between being treated with dignity and being treated with contempt. Your sense of fairness was forged in real life, not in a book. That makes it strong.',
      prompt: 'When did you last feel strongly that something was right or wrong? What told you?',
      verdict: 'A person with a working moral compass does not need permission to be good. They do not need external rules to treat people well. They do it because something inside them insists on it. That something is not weakness or softness. It is the core of who you are. And it means you can trust yourself in situations where there is no rulebook \u2014 because you carry the rulebook inside.'
    },
    {
      title: 'You Have Asked Hard Questions',
      body: [
        'Most people go their whole lives avoiding the questions that matter. Why am I here? Who am I really? What do I believe? What is true?',
        '<em>You are asking those questions now. At an age when most people are trying not to think at all. That matters more than you know.</em>'
      ],
      evidence: 'The fact that you are here \u2014 engaging with something like this, sitting with uncomfortable prompts, thinking about your own life with this level of honesty \u2014 is itself extraordinary. Most people twice your age have not done this. Not because they cannot, but because they will not. You are choosing to look at yourself directly. That takes more courage than anything in any action movie.',
      prompt: 'What question about your own life keeps coming back? What are you trying to understand?',
      verdict: 'A person who asks hard questions will always find answers that matter. Not quick answers. Not comfortable answers. But real ones. The world is full of people who accepted the first easy explanation and stopped thinking. You are not one of them. And that means your understanding of yourself and others will keep deepening for the rest of your life. You will never be stuck in a shallow version of reality.'
    },
    {
      title: 'You Are Still Becoming',
      body: [
        'You are not finished. Not even close. The person you are today is a rough draft of someone extraordinary, and most of the chapters have not been written yet.',
        '<em>But a rough draft is not nothing. A rough draft is everything. Every great thing that was ever made started as one.</em>'
      ],
      evidence: 'Look at who you were a year ago. Two years ago. Five years ago. You are not the same person. You have grown in ways you cannot fully see because you are too close to the canvas. But the growth is real. Your vocabulary is bigger. Your empathy is deeper. Your understanding of the world is wider. You are a person in motion, and the direction is forward.',
      prompt: 'What is one way you have grown in the last year that you are quietly proud of?',
      verdict: 'Faith in yourself is not about who you are today. It is about who you are becoming. And the trajectory is clear: you are becoming more yourself. More honest, more aware, more capable. The future version of you will look back at this moment and say: that was when I started to see it. That was when I started to trust myself. And they will be right.'
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
  var evidenceBox  = document.getElementById('evidenceBox');
  var evidenceText = document.getElementById('evidenceText');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var verdictBox   = document.getElementById('verdictBox');
  var verdictText  = document.getElementById('verdictText');
  var seeBtn       = document.getElementById('seeBtn');
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
  var lightLevel = 0;

  /* ---------- canvas: gathering light particles ---------- */
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
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 1.5 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.008;
    this.baseAlpha = Math.random() * 0.15 + 0.03;
  };
  Spark.prototype.update = function () {
    this.pulse += this.pulseSpeed;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;
  };
  Spark.prototype.draw = function () {
    var a = this.baseAlpha * (0.6 + 0.4 * Math.sin(this.pulse));
    var boost = lightLevel * 0.08;
    /* shift from cool indigo to warm amber as light grows */
    var cr = Math.round(140 + lightLevel * 15);
    var cg = Math.round(120 + lightLevel * 10);
    var cb = Math.round(190 - lightLevel * 18);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + (a + boost) + ')';
    ctx.fill();
  };

  for (var i = 0; i < 50; i++) sparks.push(new Spark());

  function animate() {
    ctx.fillStyle = 'rgba(10, 8, 14, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    /* center glow grows with lightLevel */
    if (lightLevel > 0) {
      var grad = ctx.createRadialGradient(
        bgCanvas.width / 2, bgCanvas.height / 2, 0,
        bgCanvas.width / 2, bgCanvas.height / 2, 200 + lightLevel * 30
      );
      grad.addColorStop(0, 'rgba(168, 144, 200, ' + (lightLevel * 0.01) + ')');
      grad.addColorStop(1, 'rgba(168, 144, 200, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

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
    var s = SCENES[idx];

    sceneTitle.textContent = s.title;
    sceneBody.innerHTML = '';
    for (var p = 0; p < s.body.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.body[p];
      sceneBody.appendChild(pEl);
    }

    evidenceText.textContent = s.evidence;
    askPrompt.textContent = s.prompt;
    verdictText.textContent = s.verdict;
    askInput.value = '';

    evidenceBox.classList.add('hidden');
    askBox.classList.add('hidden');
    verdictBox.classList.add('hidden');
    seeBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  seeBtn.addEventListener('click', function () {
    seeBtn.classList.add('hidden');
    evidenceBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
    verdictBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    lightLevel += 1;
    verdictBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    lightLevel = 0;
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
