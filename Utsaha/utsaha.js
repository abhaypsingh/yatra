/* ============================================================
   UTSAHA — hope
   Six dark rooms, each with a thread of light to find
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'The Diagnosis',
      dark: [
        'Someone you love gets sick. Not a cold. The kind of sick where the word itself changes the air in the room.',
        'Everything that mattered yesterday \u2014 grades, drama, plans \u2014 evaporates. The world shrinks to a hospital room and a face you are afraid to lose.',
        '<em>This was not supposed to happen.</em>'
      ],
      searchPrompt: 'In this darkness, what is one thing that is still true?',
      light: 'The diagnosis is real. The fear is real. But so is this: every single day, people who were told the worst news of their lives woke up the next morning and found something worth the day. A conversation. A hand to hold. A sunset through a hospital window. Hope does not require a guarantee. It only requires the decision to show up for the next hour.'
    },
    {
      title: 'The Move',
      dark: [
        'You are leaving. Not because you want to. Everything you know \u2014 your room, your school, your street, the tree you used to climb \u2014 is being pulled away from you.',
        'You will be the new kid. The one who does not know anyone. The one who eats lunch alone and walks the hallways like a ghost.',
        '<em>You did not choose this.</em>'
      ],
      searchPrompt: 'When everything changes, what stays the same?',
      light: 'You. You stay the same. Your humor, your way of seeing things, the things you love, the way you care about people \u2014 those travel with you. Every person you admire was once a stranger in a new room. The loneliness of being new is temporary. But the courage it builds is permanent. And somewhere in that new school, someone is waiting for a friend exactly like you.'
    },
    {
      title: 'The Betrayal',
      dark: [
        'Someone you trusted used your words against you. The secret you shared became a weapon. The person you believed in turned out to be someone else entirely.',
        'Now you do not know who is safe. Every smile looks like a mask. Every question feels like a trap.',
        '<em>If you cannot trust them, who can you trust?</em>'
      ],
      searchPrompt: 'What has this pain taught you that you could not have learned any other way?',
      light: 'It taught you that your trust is valuable. That it is not something to scatter but something to offer carefully, to people who have shown you \u2014 through actions, not words \u2014 that they can hold it. You now know the difference between someone who listens to know you and someone who listens to use you. That knowledge is a shield you will carry for the rest of your life. And it will protect you.'
    },
    {
      title: 'The Failure',
      dark: [
        'You tried your absolute best. You studied, prepared, practiced, gave everything you had. And it was not enough.',
        'The door closed. The spot went to someone else. The thing you wanted most slipped through your fingers.',
        '<em>What was it all for?</em>'
      ],
      searchPrompt: 'If this door is closed, what is one door that might still be open?',
      light: 'The effort was not wasted. Every hour you spent built something inside you that the result cannot take away: discipline, persistence, the knowledge that you can commit fully to something. Those are the materials for every future attempt. History is full of people whose greatest achievements came after their most devastating failures. Not despite them \u2014 because of them. The door that closed was not the only door.'
    },
    {
      title: 'The Broken Family',
      dark: [
        'The family you had is not the family you have now. There are separate houses, separate schedules, separate lives. Holidays feel like logistics. Conversations feel like minefields.',
        'You love both. You miss both. You feel guilty about both. Some days you are angry at everyone. Some days you are angry at yourself for being angry.',
        '<em>Other families are whole. Yours is in pieces.</em>'
      ],
      searchPrompt: 'What is one good thing that still exists in your family, even now?',
      light: 'A broken family is not a failed family. It is a family that changed shape. The love did not disappear when the structure did. It is still there \u2014 in the parent who calls even when it is hard, in the sibling who still makes you laugh, in the grandparent who holds your hand a little tighter now. The shape changed. The love did not. And you are not responsible for the break. But you can be part of what grows from it.'
    },
    {
      title: 'The Ordinary Day',
      dark: [
        'Nothing happened. Nothing dramatic, nothing terrible. Just another day that felt exactly like yesterday. And the day before. And the day before that.',
        'The sameness is the hardest part. No crisis to fight, no problem to solve. Just a low grey fog of <em>is this all there is?</em>',
        'You are twelve. Or thirteen. Or fourteen. And the future feels like a long hallway with no doors.'
      ],
      searchPrompt: 'What is one thing \u2014 even the smallest thing \u2014 that you are looking forward to?',
      light: 'The hallway has doors. You just cannot see them yet because you are standing in the middle. Every person who ever lived through a grey season will tell you the same thing: it ended. Not with fireworks. With a Tuesday morning when something small caught your attention \u2014 a song, a person, an idea \u2014 and the color came back in. The grey is not your life. It is a season. And seasons always, always change.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var sceneView    = document.getElementById('sceneView');
  var sceneTitle   = document.getElementById('sceneTitle');
  var sceneDark    = document.getElementById('sceneDark');
  var sceneSearch  = document.getElementById('sceneSearch');
  var searchPrompt = document.getElementById('searchPrompt');
  var searchInput  = document.getElementById('searchInput');
  var searchSend   = document.getElementById('searchSend');
  var sceneLight   = document.getElementById('sceneLight');
  var lightText    = document.getElementById('lightText');
  var lookBtn      = document.getElementById('lookBtn');
  var nextScene    = document.getElementById('nextScene');
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

  /* ---------- canvas: darkness with emerging light ---------- */
  var stars = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Star() { this.reset(); }
  Star.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 1.2 + 0.3;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.015 + 0.005;
    this.baseAlpha = Math.random() * 0.15 + 0.02;
  };
  Star.prototype.update = function () {
    this.pulse += this.pulseSpeed;
  };
  Star.prototype.draw = function () {
    var brightness = lightLevel * 0.5;
    var a = (this.baseAlpha + brightness) * (0.5 + 0.5 * Math.sin(this.pulse));
    if (a > 0.6) a = 0.6;

    /* color shifts from cool to warm as light increases */
    var r = Math.round(96 + lightLevel * 104);
    var g = Math.round(112 + lightLevel * 48);
    var b = Math.round(160 - lightLevel * 96);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r + lightLevel * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    ctx.fill();
  };

  for (var i = 0; i < 60; i++) stars.push(new Star());

  function animate() {
    ctx.fillStyle = 'rgba(8, 8, 10, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    /* warm glow in center as light grows */
    if (lightLevel > 0) {
      var cx = bgCanvas.width / 2;
      var cy = bgCanvas.height * 0.4;
      var gr = Math.min(bgCanvas.width, bgCanvas.height) * 0.4 * lightLevel;
      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
      grad.addColorStop(0, 'rgba(200, 160, 64, ' + (lightLevel * 0.03) + ')');
      grad.addColorStop(1, 'rgba(200, 160, 64, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    for (var j = 0; j < stars.length; j++) {
      stars[j].update();
      stars[j].draw();
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
    lightLevel = idx / SCENES.length;
    var s = SCENES[idx];

    sceneTitle.textContent = s.title;
    sceneDark.innerHTML = '';
    for (var p = 0; p < s.dark.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.dark[p];
      sceneDark.appendChild(pEl);
    }

    searchPrompt.textContent = s.searchPrompt;
    lightText.textContent = s.light;
    searchInput.value = '';

    sceneSearch.classList.add('hidden');
    sceneLight.classList.add('hidden');
    lookBtn.classList.remove('hidden');
    nextScene.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  lookBtn.addEventListener('click', function () {
    lookBtn.classList.add('hidden');
    sceneSearch.classList.remove('hidden');
    sceneSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  searchSend.addEventListener('click', function () {
    sceneSearch.classList.add('hidden');
    sceneLight.classList.remove('hidden');
    nextScene.classList.remove('hidden');

    /* increase canvas light */
    lightLevel = (currentIdx + 1) / SCENES.length;

    sceneLight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  nextScene.addEventListener('click', function () {
    showScene(currentIdx + 1);
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      lightLevel = 0;
      animate();
      showScene(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    lightLevel = 0;
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
