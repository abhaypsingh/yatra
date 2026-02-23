/* ============================================================
   SANTOSHA — contentment
   Six moments of "not enough" and the practice of fullness
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'The Scroll',
      body: [
        'You open your phone. Within thirty seconds, you have seen three vacations you are not on, two friend groups you are not in, one person who looks the way you wish you did, and a life that seems impossibly effortless.',
        '<em>You put the phone down feeling worse than when you picked it up. And you do not even know why.</em>'
      ],
      wanting: 'I want that life. I want to look like that. I want to be invited there. Everyone else has figured something out that I have not. Everyone else is living while I am just watching.',
      prompt: 'When you scroll, what makes you feel the sharpest pang of wanting? What do you wish you had?',
      fullness: 'What you are seeing is not life. It is a highlight reel \u2014 curated, filtered, staged. The person in that photo took forty shots and chose the one where their smile looked effortless. The friend group in that video had an argument an hour before. You are comparing your behind-the-scenes to everyone else\u2019s performance. The contentment you are looking for will never be found in a screen. It is found in putting the screen down and looking at what is already in the room.'
    },
    {
      title: 'The Friend Who Has More',
      body: [
        'Their house is bigger. Their clothes are nicer. Their family takes trips. They have things you cannot have, and they do not even seem to notice.',
        'You love them. But sometimes, sitting in their room, surrounded by the things they take for granted, <em>you feel a quiet ache that has no polite name.</em>'
      ],
      wanting: 'It is not fair. Why do they get all of that and I do not? If I had what they have, I would be happier. I would be more confident. I would be more myself.',
      prompt: 'What do you have that you take for granted the same way they take their things for granted?',
      fullness: 'The ache is real and you do not have to pretend it is not there. But here is what money and things cannot buy, and what you may already have: a person who checks on you. A moment today where you laughed without thinking about it. A skill you are building. A memory that still makes you smile. A body that carried you here. Contentment is not pretending you do not want more. It is refusing to believe that more is the only path to enough.'
    },
    {
      title: 'The Grade That Was Not Perfect',
      body: [
        'You got a B. Or a 78. Or second place. It was good. It was not the best. And the gap between good and best feels like a canyon.',
        'Someone says "that\u2019s great!" and you smile. <em>But inside, the voice is already calculating what you should have done differently.</em>'
      ],
      wanting: 'I should have studied harder. I should have been smarter. If I cannot be the best, what is the point? Second place is just the first loser.',
      prompt: 'When was the last time you were proud of something you did, even though it was not perfect?',
      fullness: 'Perfectionism is not high standards. It is a cage. The person who gets 100% and the person who gets 85% learn almost the same amount. But the person who gets 85% and sleeps, plays, daydreams, and lives \u2014 they learn something the perfectionist never does: that they are more than a score. Your worth was never in the number. The number is a snapshot of one moment. You are a whole life.'
    },
    {
      title: 'The Body in the Mirror',
      body: [
        'You look. You measure. You compare. Too tall, too short, too wide, too thin, too dark, too pale, too much of this, not enough of that.',
        'The mirror shows you a body. <em>Your brain shows you a list of everything that is wrong with it.</em>'
      ],
      wanting: 'If I looked different, everything would be easier. People would treat me better. I would feel confident. I would stop hiding.',
      prompt: 'What is one thing your body did for you today that had nothing to do with how it looks?',
      fullness: 'Your body is not a project. It is not a work in progress. It is not an apology. It is the only home you will ever have, and it has been carrying you faithfully through every single day of your life. It breathed while you slept. It healed when you cut yourself. It let you taste food and hear music and feel sunshine on your skin. The industries that profit from your dissatisfaction have spent billions teaching you to see flaws. Contentment is choosing to see function, miracle, and home instead.'
    },
    {
      title: 'The Family That Is Not "Normal"',
      body: [
        'Other families eat dinner together. Other families have two parents in one house. Other families do not have the silences, the tension, the complicated arrangements.',
        'At school, when someone talks about their family like it is simple, <em>you feel the gap between their story and yours like a gulf.</em>'
      ],
      wanting: 'I want a normal family. I want holidays that are not complicated. I want to stop explaining why things are the way they are. I want what everyone else seems to have.',
      prompt: 'What is one good thing your family has given you, even in its imperfect shape?',
      fullness: 'There is no normal family. There are only families that hide their complexity better than others. Behind every front door is a story more tangled than it appears. Your family\u2019s shape is not a defect. It is a fact. And inside that shape, there is love \u2014 imperfect, messy, sometimes hard to see, but real. The families that teach you the most are rarely the easiest ones. Contentment is not pretending your family is perfect. It is finding the love inside the imperfection and choosing to build on that.'
    },
    {
      title: 'The Life You Imagined',
      body: [
        'When you were younger, you had a picture of what your life would look like by now. Maybe it was clearer. Maybe it was simpler. Maybe there were things in it that have not happened yet.',
        'The gap between the life you imagined and the life you have <em>can feel like the biggest "not enough" of all.</em>'
      ],
      wanting: 'This is not how it was supposed to be. I was supposed to be further along. I was supposed to have figured things out by now. Something went wrong somewhere.',
      prompt: 'What is one thing in your life right now that you never imagined but are glad exists?',
      fullness: 'You are twelve. Or thirteen. Or fourteen. You are at the very beginning of a story so long and so unpredictable that the version of you ten years from now will barely recognize who you are today. The life you imagined was drawn with a child\u2019s crayon. The life you are living is being painted with colors you have not discovered yet. Contentment is not giving up on the future. It is trusting that the present \u2014 this messy, imperfect, unfinished present \u2014 is exactly where the story needs you to be.'
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
  var wantingBox   = document.getElementById('wantingBox');
  var wantingText  = document.getElementById('wantingText');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var fullnessBox  = document.getElementById('fullnessBox');
  var fullnessText = document.getElementById('fullnessText');
  var wantBtn      = document.getElementById('wantBtn');
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

  /* ---------- canvas: settling leaves ---------- */
  var leaves = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Leaf() { this.reset(true); }
  Leaf.prototype.reset = function (init) {
    this.x = Math.random() * bgCanvas.width;
    this.y = init ? Math.random() * bgCanvas.height : -10;
    this.r = Math.random() * 2 + 0.5;
    this.vy = Math.random() * 0.25 + 0.08;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.sway = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.015 + 0.005;
    this.swayAmp = Math.random() * 20 + 8;
    this.alpha = Math.random() * 0.2 + 0.05;
    var colors = [
      [136, 168, 112],
      [120, 150, 96],
      [160, 180, 120],
      [200, 168, 96],
      [140, 160, 100]
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };
  Leaf.prototype.update = function () {
    this.sway += this.swaySpeed;
    this.x += this.vx + Math.sin(this.sway) * 0.3;
    this.y += this.vy;
    if (this.y > bgCanvas.height + 10) this.reset(false);
  };
  Leaf.prototype.draw = function () {
    var sx = this.x + Math.sin(this.sway) * this.swayAmp;
    ctx.beginPath();
    ctx.arc(sx, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < 45; i++) leaves.push(new Leaf());

  function animate() {
    ctx.fillStyle = 'rgba(8, 10, 6, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < leaves.length; j++) {
      leaves[j].update();
      leaves[j].draw();
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

    wantingText.textContent = s.wanting;
    askPrompt.textContent = s.prompt;
    fullnessText.textContent = s.fullness;
    askInput.value = '';

    wantingBox.classList.add('hidden');
    askBox.classList.add('hidden');
    fullnessBox.classList.add('hidden');
    wantBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  wantBtn.addEventListener('click', function () {
    wantBtn.classList.add('hidden');
    wantingBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1000);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
    fullnessBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    fullnessBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
