/* ============================================================
   STHAIRYA — steadiness
   Six moments of chaos and the practice of finding your center
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'When the People You Love Are Fighting',
      body: [
        'The voices are loud. Or worse \u2014 the silence is loud. Two people you love are on opposite sides of something, and you are standing in the middle.',
        '<em>You feel the ground shift. You feel yourself being pulled toward one side, then the other. You want to fix it. You want to disappear.</em>'
      ],
      shaking: 'Everything is falling apart. If they cannot hold it together, how am I supposed to? I need to pick a side. I need to make this stop. If I am good enough, quiet enough, perfect enough, maybe they will stop.',
      still: 'You are not the referee. You are not the mediator. You are not the glue. When the people you love are fighting, your only job is to stay whole. Their conflict belongs to them. Your steadiness belongs to you. You did not cause this. You cannot fix this. But you can survive this \u2014 and you will \u2014 by finding the one place that does not shake: the quiet center inside you that knows who you are regardless of what is happening around you.'
    },
    {
      title: 'When Friendships Are Shifting',
      body: [
        'The person who was your closest friend last year barely talks to you now. Groups are rearranging. Alliances are forming that do not include you. The social map is being redrawn and no one asked your permission.',
        '<em>You do not know where you belong anymore. Maybe you never did.</em>'
      ],
      shaking: 'I am losing everyone. The people who knew me are becoming strangers. I must have done something wrong. I am going to end up alone.',
      still: 'Friendships at your age are supposed to shift. This is not a sign that something is wrong with you. It is a sign that everyone is growing, and growth does not happen in sync. The friends you lose were not wasted \u2014 they taught you things about yourself that you will carry forever. And the friends you have not met yet are out there, becoming the people who will understand the person you are becoming. Steadiness here means trusting the process even when it hurts.'
    },
    {
      title: 'When Your World Changes Shape',
      body: [
        'A move. A new school. A parent\u2019s new partner. A sibling leaving. The geography of your daily life rearranges, and suddenly nothing is where it used to be.',
        'The old room. The old route. The old normal. <em>Gone. And the new normal does not feel normal yet.</em>'
      ],
      shaking: 'I did not choose this. I did not want this. I want to go back. Everything was better before. I do not know how to be in this new version of my life.',
      still: 'You have survived every single change that has ever happened to you. Every one. The first day of every new school. The first night in every new room. The first morning of every new reality. You adapted. Not because it was easy, but because you are more adaptable than you know. Steadiness during change is not about liking the change. It is about knowing that you have a center that travels with you. Your identity is not your address, your school, or your family\u2019s shape. It is something deeper. And it is still here.'
    },
    {
      title: 'When the News Terrifies You',
      body: [
        'The screen shows things that are too big to process. War. Climate. Injustice. Systems that seem broken beyond repair. Adults who seem to have no answers.',
        '<em>The future feels like something to survive instead of something to look forward to.</em>'
      ],
      shaking: 'The world is broken and no one is fixing it. What is the point of studying or planning or dreaming if everything is falling apart? I am inheriting a mess.',
      still: 'Your fear is rational. The problems are real. But here is what the news never shows you: for every headline of destruction, there are a thousand quiet acts of repair happening off-camera. Teachers showing up. Scientists working. Neighbors helping. Young people like you refusing to accept what the previous generation accepted. Steadiness in the face of a broken world is not denial. It is the decision to focus your energy where it matters \u2014 in your own circle, with your own hands, starting today. That is not small. That is how every large change in history began.'
    },
    {
      title: 'When Your Body Is Changing',
      body: [
        'Taller. Wider. Different. The face in the mirror keeps rearranging itself. Your voice sounds strange. Your skin does unexpected things. Your emotions come in waves that have no warning.',
        '<em>You are living in a body that is under construction, and no one gave you the blueprints.</em>'
      ],
      shaking: 'I do not recognize myself. I do not feel like me. Everything is awkward and uncomfortable and I cannot control any of it. When does this stop?',
      still: 'Every human being who has ever lived went through this. Every single one. The adults you admire \u2014 the ones who seem so comfortable in their bodies \u2014 all had a time when they felt exactly what you feel now. Your body is not betraying you. It is becoming. And the process is messy, uncomfortable, and sometimes mortifying \u2014 but it is also miraculous. You are literally building the body that will carry you through the rest of your life. Steadiness here means being patient with a process you did not choose but that is working in your favor.'
    },
    {
      title: 'When the Future Is Unknown',
      body: [
        'What will next year look like? Where will you be? Who will you be with? The questions pile up and none of them have answers. The uncertainty is its own kind of vertigo.',
        'Everyone else seems to know where they are going. <em>You feel like you are standing at a crossroads with no signs.</em>'
      ],
      shaking: 'I do not know what is going to happen. I cannot plan if I do not know. What if I choose wrong? What if everything gets worse? I need certainty and no one will give it to me.',
      still: 'No one has certainty. Not your parents. Not your teachers. Not the most successful person you can imagine. The future is unknown for everyone, always. The difference between anxiety and excitement is not the feeling \u2014 it is the story you tell about it. Steadiness in uncertainty is the most mature skill any human can develop. It sounds like this: I do not know what is coming, and I trust myself to handle it when it arrives. Not because I am fearless. But because I have handled everything that has come before.'
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
  var shakingBox   = document.getElementById('shakingBox');
  var shakingText  = document.getElementById('shakingText');
  var groundBox    = document.getElementById('groundBox');
  var groundInput  = document.getElementById('groundInput');
  var groundBtn    = document.getElementById('groundBtn');
  var stillBox     = document.getElementById('stillBox');
  var stillText    = document.getElementById('stillText');
  var feelBtn      = document.getElementById('feelBtn');
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
  var stability = 0;

  /* ---------- canvas: motes that stabilize over time ---------- */
  var motes = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Mote() { this.reset(); }
  Mote.prototype.reset = function () {
    this.cx = Math.random() * bgCanvas.width;
    this.cy = Math.random() * bgCanvas.height;
    this.x = this.cx;
    this.y = this.cy;
    this.r = Math.random() * 1.5 + 0.5;
    this.jitter = Math.random() * 4 + 2;
    this.speed = Math.random() * 0.03 + 0.01;
    this.phase = Math.random() * Math.PI * 2;
    this.phaseY = Math.random() * Math.PI * 2;
    this.alpha = Math.random() * 0.2 + 0.05;
    var t = Math.random();
    if (t < 0.5) {
      this.color = [144, 128, 104];
    } else if (t < 0.8) {
      this.color = [160, 140, 112];
    } else {
      this.color = [184, 152, 96];
    }
  };
  Mote.prototype.update = function () {
    this.phase += this.speed;
    this.phaseY += this.speed * 0.7;
    var dampen = Math.max(0.1, 1 - stability * 0.15);
    this.x = this.cx + Math.sin(this.phase) * this.jitter * dampen;
    this.y = this.cy + Math.cos(this.phaseY) * this.jitter * dampen;
    /* slow drift */
    this.cx += (Math.random() - 0.5) * 0.1;
    this.cy += (Math.random() - 0.5) * 0.1;
    if (this.cx < 0) this.cx = bgCanvas.width;
    if (this.cx > bgCanvas.width) this.cx = 0;
    if (this.cy < 0) this.cy = bgCanvas.height;
    if (this.cy > bgCanvas.height) this.cy = 0;
  };
  Mote.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < 60; i++) motes.push(new Mote());

  function animate() {
    ctx.fillStyle = 'rgba(10, 9, 8, 0.05)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < motes.length; j++) {
      motes[j].update();
      motes[j].draw();
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

    shakingText.textContent = s.shaking;
    stillText.textContent = s.still;
    groundInput.value = '';

    shakingBox.classList.add('hidden');
    groundBox.classList.add('hidden');
    stillBox.classList.add('hidden');
    feelBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  feelBtn.addEventListener('click', function () {
    feelBtn.classList.add('hidden');
    shakingBox.classList.remove('hidden');
    setTimeout(function () {
      groundBox.classList.remove('hidden');
      groundBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1000);
  });

  groundBtn.addEventListener('click', function () {
    groundBox.classList.add('hidden');
    stillBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    stability += 1;
    stillBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    stability = 0;
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
