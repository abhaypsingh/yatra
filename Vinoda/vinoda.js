/* ============================================================
   VINODA — lightness
   Six absurd questions and reframes — permission to laugh
   ============================================================ */

(function () {
  'use strict';

  var QUESTIONS = [
    {
      question: 'If your worries were animals, what animals would they be?',
      reframe: 'Picture this: your biggest worry is a very anxious chipmunk running around your brain holding a tiny clipboard. Your second worry is a grumpy pelican who keeps trying to swallow things that are too big. Suddenly they are a little less terrifying. This is not silly \u2014 this is a real therapy technique. When you give a worry a ridiculous form, your brain stops fusing with it. It becomes something you have, not something you are.'
    },
    {
      question: 'If you could only communicate using sounds from a kitchen, how would you say "I love you"?',
      reframe: 'Maybe a gentle tap of a spoon on a mug, twice. Or the sound of water being poured into a glass for someone. Or the quiet click of a stove being turned on to make them tea. The truth is, love is already mostly communicated without words. A plate of food. A door left unlocked. A light left on. The kitchen knows this better than any love poem.'
    },
    {
      question: 'If aliens watched your life for one day, what would confuse them most?',
      reframe: 'Probably the part where you spend hours staring at a small glowing rectangle, occasionally making a sound that means you are amused, then feeling bad about it afterward. Or the part where you put on different fabrics depending on which other humans you will see. Or the part where you voluntarily walk into a building at 7 AM to sit in rows. Seen from the outside, almost everything humans do is absurd. That is not a problem. That is what makes us interesting.'
    },
    {
      question: 'What is the dumbest thing you have ever laughed at so hard you could not breathe?',
      reframe: 'Whatever you just remembered \u2014 that is medicine. Actual, clinical, proven medicine. Laughter floods your brain with endorphins, drops your cortisol, relaxes your muscles for up to 45 minutes, and boosts your immune system. The thing that made you laugh until you could not breathe was not a waste of time. It was your body healing itself. The dumber it was, the better it worked.'
    },
    {
      question: 'If you had to explain gravity to a fish, how would you do it?',
      reframe: 'The fish would say: what do you mean things fall down? Everything I know floats. And they would be right \u2014 in their world. This is actually a profound point disguised as a silly question: most of the things you believe are obvious and true are only obvious and true inside the world you know. Other people live in different water. Their "obvious" is different. This is not a reason to doubt everything. It is a reason to be curious about everything.'
    },
    {
      question: 'If your life had a laugh track, which moment today would get the biggest laugh?',
      reframe: 'There is a version of your day that is a comedy. The exact same events \u2014 the same stumbles, awkward silences, minor disasters, things that went wrong \u2014 are hilarious when seen from a distance. Comedians know this: tragedy plus time equals comedy. You do not always need to wait for the time. Sometimes you can find the comedy while you are still in the tragedy. Not to dismiss it. But to survive it with your spirit intact.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var questionView = document.getElementById('questionView');
  var questionNum  = document.getElementById('questionNum');
  var questionText = document.getElementById('questionText');
  var answerInput  = document.getElementById('answerInput');
  var answerBtn    = document.getElementById('answerBtn');
  var skipBtn      = document.getElementById('skipBtn');
  var reframe      = document.getElementById('reframe');
  var reframeText  = document.getElementById('reframeText');
  var nextActions  = document.getElementById('nextActions');
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

  /* ---------- canvas: playful floating sparks ---------- */
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
    this.r = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -Math.random() * 0.6 - 0.1;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.04 + 0.02;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.life = Math.random() * 300 + 150;
    this.age = 0;
    /* warm playful colors */
    var colors = [
      [208, 168, 48],
      [220, 180, 60],
      [200, 150, 40],
      [230, 190, 80],
      [180, 140, 50]
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };
  Spark.prototype.update = function () {
    this.wobble += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobble) * 0.5;
    this.y += this.vy;
    this.age++;
    if (this.age > this.life || this.y < -10) this.reset();
  };
  Spark.prototype.draw = function () {
    var fade = 1 - (this.age / this.life);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + (this.alpha * fade) + ')';
    ctx.fill();
  };

  for (var i = 0; i < 50; i++) sparks.push(new Spark());

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 8, 0.05)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < sparks.length; j++) {
      sparks[j].update();
      sparks[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- question flow ---------- */
  function showQuestion(idx) {
    if (idx >= QUESTIONS.length) {
      questionView.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }

    currentIdx = idx;
    var q = QUESTIONS[idx];

    questionNum.textContent = 'question ' + (idx + 1);
    questionText.textContent = q.question;
    answerInput.value = '';
    reframeText.textContent = q.reframe;

    reframe.classList.add('hidden');
    nextActions.classList.add('hidden');
    answerBtn.parentElement.classList.remove('hidden');
    progressText.textContent = (idx + 1) + ' of ' + QUESTIONS.length;

    questionView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function revealReframe() {
    answerBtn.parentElement.classList.add('hidden');
    reframe.classList.remove('hidden');
    nextActions.classList.remove('hidden');
    reframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  answerBtn.addEventListener('click', revealReframe);
  skipBtn.addEventListener('click', revealReframe);

  nextBtn.addEventListener('click', function () {
    showQuestion(currentIdx + 1);
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      showQuestion(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    showQuestion(0);
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
