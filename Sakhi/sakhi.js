/* ============================================================
   SAKHI — friendship
   Paired orbiting particles connected by faint lines
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'The Friend Who Changed',
      body: [
        'You were inseparable. You finished each other\u2019s sentences. You had inside jokes no one else understood. And then, slowly, something shifted.',
        '<em>They found new people. New interests. New versions of themselves that did not include you.</em>'
      ],
      feeling: 'It feels like a death with no funeral. The person is still there \u2014 at school, online, in your contacts \u2014 but the friendship is a ghost. And the worst part is that no one validates the grief. Because \u201cit\u2019s just a friendship.\u201d But it was not just a friendship. It was your world.',
      prompt: 'Have you lost a friendship that mattered? What do you miss most?',
      truth: 'People outgrow each other. It does not mean the friendship was not real. It does not mean you were not enough. It means two people grew in different directions \u2014 and that is one of the most natural and most painful things in life. The love was real even if the friendship is not. And the person you became inside that friendship? You get to keep that.'
    },
    {
      title: 'Being the Outsider',
      body: [
        'The lunch table with no empty seat for you. The group chat you were not added to. The birthday party you heard about on Monday.',
        '<em>Standing at the edge of a room full of people who all seem to know something you do not.</em>'
      ],
      feeling: 'Being on the outside feels like being invisible and visible at the same time. Everyone can see you, but no one sees you. And you start to wonder if there is something fundamentally wrong with you \u2014 something everyone else can detect but no one will name.',
      prompt: 'When have you felt like the outsider? What did you tell yourself about why?',
      truth: 'The outsider\u2019s story is almost never what they think it is. You think: I am not enough. The truth is usually: I have not found my people yet. Every person who has ever belonged somewhere was once the new one, the quiet one, the one standing at the edge. Belonging is not about changing who you are. It is about finding the people who want exactly who you already are.'
    },
    {
      title: 'The Friend Who Hurts You',
      body: [
        'They make you laugh. They also make you feel small. They are fun to be around. They also talk about you when you leave the room.',
        '<em>They are generous sometimes. They also keep score of everything they give you.</em>'
      ],
      feeling: 'A friendship that hurts is the most confusing relationship in the world. Because it is not all bad. The good parts are real. The laughter is real. But so is the knot in your stomach before you see them. So is the way you edit yourself to avoid their judgment. So is the relief you feel when they cancel.',
      prompt: 'Is there a friendship in your life that confuses you? One that feels good and bad at the same time?',
      truth: 'A friendship should not require you to become smaller. If you have to hide parts of yourself \u2014 your opinions, your other friends, your family, your feelings \u2014 to keep someone close, the price of that closeness is too high. You are allowed to love someone and still recognize that they are not good for you. Those two things can be true at the same time.'
    },
    {
      title: 'The Jealousy',
      body: [
        'Your best friend gets picked for the team. Gets the grade. Gets the attention. Gets the thing you wanted.',
        'And you are happy for them. You are. <em>But underneath the happiness is something else \u2014 something that feels ugly and small and shameful.</em>'
      ],
      feeling: 'Jealousy among friends is the emotion no one wants to admit. Because good friends are supposed to be happy for each other. And you are happy. But you are also hurting. And the shame of the jealousy feels worse than the jealousy itself.',
      prompt: 'Have you ever been jealous of a friend? What was it really about?',
      truth: 'Jealousy is not a character flaw. It is information. It tells you what you want. It tells you what you value. It tells you where you feel inadequate. A good friend can feel jealous and still show up with genuine love. The measure of friendship is not the absence of jealousy. It is what you do with it. Name it. Feel it. Let it pass. Then cheer louder.'
    },
    {
      title: 'The Friend Who Stayed',
      body: [
        'When your family fell apart. When you said the wrong thing. When you were not fun to be around. When you cried too much, talked too much, asked too much.',
        '<em>When everyone else quietly stepped back \u2014 this person stepped forward.</em>'
      ],
      feeling: 'Loyal friendship feels like a warm room on a cold night. You did not have to earn it. You did not have to perform for it. Someone simply decided that you were worth staying for \u2014 not the best version of you, not the easy version, but the real, messy, complicated version.',
      prompt: 'Who has stayed for you? What did their staying teach you?',
      truth: 'The friends who stay through the hard parts are rare. They are not the most exciting friends or the most popular ones. They are the ones who show up when showing up costs something. If you have even one person like this, you are wealthy in the way that matters most. And the best way to honor that kind of friendship is to be that kind of friend to someone else.'
    },
    {
      title: 'Being a Good Friend',
      body: [
        'Listening when you would rather talk. Showing up when you would rather stay home. Telling the truth when a lie would be easier. Being happy for them when you are struggling.',
        '<em>Keeping their secrets even when it would be so satisfying to share.</em>'
      ],
      feeling: 'Real friendship is not just love. It is labor. It costs attention, time, honesty, and sometimes your own comfort. And no one teaches you this. The movies show friendship as effortless \u2014 two people who just click. But clicking is the beginning. Friendship is what happens after the clicking, when the work begins.',
      prompt: 'What is the hardest part of being a good friend for you?',
      truth: 'You do not have to be a perfect friend. You have to be a present one. Show up. Listen. Tell the truth with kindness. Apologize when you are wrong. Celebrate when they win. Stay when it is hard. These are not extraordinary acts. They are the ordinary, unglamorous, daily choices that turn a person into a friend. And they are available to you right now, today, with whoever you choose.'
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
  var feelingBox   = document.getElementById('feelingBox');
  var feelingText  = document.getElementById('feelingText');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var truthBox     = document.getElementById('truthBox');
  var truthText    = document.getElementById('truthText');
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

  /* ---------- canvas: paired orbiting particles ---------- */
  var pairs = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Pair() { this.reset(); }
  Pair.prototype.reset = function () {
    var cx = Math.random() * bgCanvas.width;
    var cy = Math.random() * bgCanvas.height;
    this.cx = cx;
    this.cy = cy;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
    this.dist = Math.random() * 30 + 12;
    this.drift = { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.15 };
    this.r = Math.random() * 1.2 + 0.5;
    this.alpha = Math.random() * 0.2 + 0.05;
    var t = Math.random();
    if (t < 0.5) {
      this.c1 = [200, 120, 136];
      this.c2 = [180, 140, 150];
    } else if (t < 0.8) {
      this.c1 = [208, 160, 112];
      this.c2 = [200, 130, 140];
    } else {
      this.c1 = [160, 120, 140];
      this.c2 = [180, 100, 120];
    }
  };
  Pair.prototype.update = function () {
    this.angle += this.speed;
    this.cx += this.drift.x;
    this.cy += this.drift.y;
    if (this.cx < -50 || this.cx > bgCanvas.width + 50 ||
        this.cy < -50 || this.cy > bgCanvas.height + 50) {
      this.reset();
    }
  };
  Pair.prototype.draw = function () {
    var x1 = this.cx + Math.cos(this.angle) * this.dist;
    var y1 = this.cy + Math.sin(this.angle) * this.dist;
    var x2 = this.cx - Math.cos(this.angle) * this.dist;
    var y2 = this.cy - Math.sin(this.angle) * this.dist;

    /* connecting line */
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'rgba(' + this.c1[0] + ',' + this.c1[1] + ',' + this.c1[2] + ',' + (this.alpha * 0.3) + ')';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    /* particle 1 */
    ctx.beginPath();
    ctx.arc(x1, y1, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.c1[0] + ',' + this.c1[1] + ',' + this.c1[2] + ',' + this.alpha + ')';
    ctx.fill();

    /* particle 2 */
    ctx.beginPath();
    ctx.arc(x2, y2, this.r * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.c2[0] + ',' + this.c2[1] + ',' + this.c2[2] + ',' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < 35; i++) {
    pairs.push(new Pair());
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 8, 8, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < pairs.length; j++) {
      pairs[j].update();
      pairs[j].draw();
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

    feelingText.textContent = s.feeling;
    askPrompt.textContent = s.prompt;
    truthText.textContent = s.truth;
    askInput.value = '';

    feelingBox.classList.add('hidden');
    askBox.classList.add('hidden');
    truthBox.classList.add('hidden');
    feelBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  feelBtn.addEventListener('click', function () {
    feelBtn.classList.add('hidden');
    feelingBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
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
