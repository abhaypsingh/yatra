/* ============================================================
   PRITHVI — earth
   Six nature scenes, each with a hidden life lesson
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'The Storm',
      paragraphs: [
        'The sky darkens. The wind arrives first \u2014 not gentle, but urgent, bending trees sideways, scattering everything that is not rooted.',
        'Then the rain. Not a drizzle but a wall of water, hammering the earth until the ground cannot hold any more. Rivers swell. Paths disappear. The world becomes unrecognizable.',
        'And then \u2014 it passes. The sky cracks open. Light pours through. The air smells like it has been washed. Birds return. The earth is still here. <em>It was always going to be here.</em>'
      ],
      lesson: 'Emotional storms feel like they will last forever. They never do. The worst moments of your life are weather, not climate. You do not have to stop the storm. You only have to survive it. And you will \u2014 because you always have.'
    },
    {
      title: 'The River',
      paragraphs: [
        'A river begins as almost nothing. A trickle of snowmelt on a mountainside, so small you could step over it without noticing.',
        'It meets a rock. It does not stop. It does not try to break the rock. It simply goes around. Another rock. Around again. A fallen tree. Under it, over it, around it.',
        'By the time it reaches the valley, it has carved canyons. Not through force, but through <em>persistence</em>. The Grand Canyon was made by water that refused to stop moving.'
      ],
      lesson: 'You do not need to be the strongest person in the room. You do not need to win every argument or break every obstacle. You just need to keep moving. Persistence \u2014 quiet, patient, daily persistence \u2014 is the most powerful force on earth.'
    },
    {
      title: 'The Seed',
      paragraphs: [
        'A seed falls into the soil and everything goes dark. There is no light. No warmth. No indication that anything is happening at all.',
        'Weeks pass. From the outside, nothing. Just dirt. Anyone looking would say nothing is growing here.',
        'But underground, in silence, roots are reaching downward. Slowly. Carefully. Finding water, finding minerals, building a foundation that no one can see. And then one morning \u2014 <em>a green shoot breaks the surface.</em>'
      ],
      lesson: 'The most important growth in your life will be invisible. There will be long stretches where nothing seems to change, where you feel stuck in the dark. That is not failure. That is you building roots. And roots \u2014 the ones no one can see \u2014 are what make everything above ground possible.'
    },
    {
      title: 'The Mountain',
      paragraphs: [
        'A mountain does not argue with the wind. It does not flinch at lightning. It does not move when the ground shakes.',
        'Not because it is numb. Not because it does not feel. But because it knows what it is. It knows where it stands. It was here before the storm arrived, and it will be here after the storm leaves.',
        'Snow covers it. Rain erodes it. Climbers carve paths into it. <em>And still it stands.</em> Not unchanged \u2014 but unmoved from its foundation.'
      ],
      lesson: 'There will be people who try to shake you. Situations that try to move you from who you are. You are allowed to be affected \u2014 a mountain is shaped by weather. But your foundation, your core, does not have to move. Know where you stand, and stand there.'
    },
    {
      title: 'The Forest Fire',
      paragraphs: [
        'A wildfire destroys everything. The trees, the undergrowth, the homes of every creature that lived there. Afterward: blackened earth, smoke, silence.',
        'It looks like death. It looks like the end.',
        'But beneath the ash, something is already happening. Seeds that could <em>only</em> germinate in fire are cracking open. Nutrients locked in decades of dead wood are flooding back into the soil. Within a month, green shoots appear. Within a year, the forest floor is more alive than it has been in decades.'
      ],
      lesson: 'Some things in your life will burn down. Friendships, plans, the way things were supposed to be. It will feel like destruction. But some seeds inside you can only open after fire. The version of you that grows back will be stronger, more alive, more deeply rooted \u2014 because of what you lost, not despite it.'
    },
    {
      title: 'The Tide',
      paragraphs: [
        'Twice a day, every day, the ocean pulls back from the shore. The sand is exposed, the tide pools empty, the boats sit on mud. It looks like the water is leaving.',
        'It always comes back.',
        'Not because someone asks it to. Not because the shore deserves it. But because that is what the ocean does. <em>It returns.</em> The same shore, the same rhythm, for four billion years.'
      ],
      lesson: 'The people who love you may seem to pull away sometimes. Life pulls them. Their own struggles pull them. It can feel like abandonment. But real love is tidal \u2014 it goes out, and it comes back. If someone truly loves you, they will return. And if you truly love someone, you will too. Again and again. That is what love does.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var scene        = document.getElementById('scene');
  var sceneTitle   = document.getElementById('sceneTitle');
  var sceneBody    = document.getElementById('sceneBody');
  var sceneLesson  = document.getElementById('sceneLesson');
  var lessonText   = document.getElementById('lessonText');
  var revealBtn    = document.getElementById('revealBtn');
  var nextBtn      = document.getElementById('nextBtn');
  var sceneProgress = document.getElementById('sceneProgress');
  var completeEl   = document.getElementById('complete');
  var againBtn     = document.getElementById('againBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var currentScene = 0;
  var animFrame = null;

  /* ---------- canvas: organic floating particles ---------- */
  var particles = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* Different particle types for earth feel */
  function Leaf() { this.reset(); }
  Leaf.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 2 + 0.5;
    this.drift = (Math.random() - 0.5) * 0.3;
    this.fall = Math.random() * 0.2 + 0.05;
    this.sway = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.015 + 0.005;
    this.alpha = Math.random() * 0.3 + 0.05;
    /* earthy colors */
    var colors = [
      [120, 160, 96],
      [96, 140, 80],
      [176, 144, 96],
      [144, 120, 80],
      [100, 130, 90]
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };
  Leaf.prototype.update = function () {
    this.sway += this.swaySpeed;
    this.x += this.drift + Math.sin(this.sway) * 0.3;
    this.y += this.fall;
    if (this.y > bgCanvas.height + 10) {
      this.y = -10;
      this.x = Math.random() * bgCanvas.width;
    }
    if (this.x < -10) this.x = bgCanvas.width + 10;
    if (this.x > bgCanvas.width + 10) this.x = -10;
  };
  Leaf.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < 55; i++) particles.push(new Leaf());

  function animate() {
    ctx.fillStyle = 'rgba(8, 10, 6, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < particles.length; j++) {
      particles[j].update();
      particles[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- scene rendering ---------- */
  function showScene(idx) {
    if (idx >= SCENES.length) {
      scene.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }

    currentScene = idx;
    var s = SCENES[idx];

    sceneTitle.textContent = s.title;
    sceneBody.innerHTML = '';
    for (var p = 0; p < s.paragraphs.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.paragraphs[p];
      sceneBody.appendChild(pEl);
    }

    sceneLesson.classList.add('hidden');
    revealBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    sceneProgress.textContent = (idx + 1) + ' of ' + SCENES.length;

    scene.classList.remove('hidden');
    completeEl.classList.add('hidden');

    /* scroll to top of scene */
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  revealBtn.addEventListener('click', function () {
    var s = SCENES[currentScene];
    lessonText.textContent = s.lesson;
    sceneLesson.classList.remove('hidden');
    revealBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');

    /* smooth scroll to lesson */
    sceneLesson.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  nextBtn.addEventListener('click', function () {
    showScene(currentScene + 1);
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
