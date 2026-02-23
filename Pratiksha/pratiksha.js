/* ============================================================
   PRATIKSHA — waiting
   Six kinds of waiting and the art of living in limbo
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'Waiting for Someone to Change',
      body: [
        'You have seen who they could be. The good version. The version that shows up on their best day. You know it is in there.',
        'So you wait. You give them another chance, and another, and another. <em>Because if you stop waiting, it means accepting that the person you need them to be may not be the person they are.</em>'
      ],
      weight: 'Every time they disappoint you, you feel it twice \u2014 once for the disappointment itself, and once for the hope that refuses to die. The hope is heavier than the hurt. Because the hurt will fade. But the hope keeps you anchored to a version of reality that may never arrive.',
      prompt: 'Who are you waiting to change? What would it mean if they never did?',
      wisdom: 'You can love someone and stop waiting for them to be different. These are not the same thing. Waiting for someone to change is an act of loyalty to a future that does not exist yet. At some point, loyalty to a fiction becomes disloyalty to yourself. You deserve to build your life on what is real \u2014 not on what you hope will someday be real. Letting go of the wait is not giving up on them. It is choosing yourself.'
    },
    {
      title: 'Waiting for an Apology',
      body: [
        'They hurt you. They know they hurt you. And the words "I am sorry" have not come. Maybe they never will.',
        'You check. Not obviously, but you check. In their tone. In their eyes. In the way they act around you. <em>Looking for any sign that they know what they did.</em>'
      ],
      weight: 'The waiting turns the wound into something worse \u2014 a question. Did it matter? Do I matter? If they are not sorry, does that mean it was not wrong? The absence of an apology can hurt more than the thing itself, because it leaves the story unfinished.',
      prompt: 'What apology are you still waiting for? What would hearing it change?',
      wisdom: 'Some apologies will never come. Not because you do not deserve them \u2014 you do \u2014 but because the person who owes them may not be capable of giving them. They may not see what they did. They may see it and not know how to say it. They may be waiting for you to go first. The hardest truth about apologies is this: your healing cannot depend on someone else\u2019s courage. You can close the story yourself. Not with forgiveness, if you are not ready. But with the decision to stop waiting for someone else to write your ending.'
    },
    {
      title: 'Waiting to Be Chosen',
      body: [
        'For the team. For the group. For the invitation. For the person who looks at everyone in the room and picks you. The waiting to be chosen is the waiting to be seen \u2014 to be told that you belong.',
        '<em>And every time someone else is chosen, the math in your head recalculates your worth.</em>'
      ],
      weight: 'The worst part is the performance. Trying to be likable enough, interesting enough, useful enough to be picked. Adjusting yourself to fit what you think they want. Waiting to be chosen turns you into an audition instead of a person.',
      prompt: 'Where in your life are you waiting to be chosen? What if you chose yourself first?',
      wisdom: 'Here is the secret that changes everything: you do not have to wait to be chosen. You can choose yourself. You can sit at the empty table and see who joins you. You can start the project alone and see who shows up. You can be the one who invites instead of the one who waits. The people who belong with you will recognize you \u2014 not the performance, not the audition, but you. And the ones who need you to perform to earn their attention were never going to see you anyway.'
    },
    {
      title: 'Waiting for Things to Make Sense',
      body: [
        'Why did this happen? Why did they leave? Why is this family like this? Why is this life like this? The questions do not have answers, and the absence of answers feels like a hole in the floor.',
        '<em>You keep looking for the reason. The explanation that will make the pain logical. Because if it is logical, maybe it is bearable.</em>'
      ],
      weight: 'The human brain needs narrative. It needs cause and effect. When things happen that have no clear reason \u2014 when pain arrives without a story \u2014 the brain invents one. Usually the story is: it must be my fault. Because if it is your fault, at least it makes sense.',
      prompt: 'What in your life are you still trying to make sense of?',
      wisdom: 'Some things will never make sense. Not because you are not smart enough to understand them, but because they genuinely do not have a tidy explanation. People leave for reasons that have nothing to do with you. Families break for reasons that existed before you were born. Pain arrives without a permission slip. And the hardest, most freeing thing you can ever learn is this: not everything needs to make sense to be survived. You can hold something you do not understand without letting it define you.'
    },
    {
      title: 'Waiting for the Pain to Stop',
      body: [
        'It is there when you wake up. It is there at school. It is there when you are laughing with friends and suddenly it finds you again. The pain that has moved in like a tenant who does not pay rent.',
        '<em>Everyone says it gets better. But "better" feels like a country on a map you cannot read.</em>'
      ],
      weight: 'The cruelest thing about pain is its patience. It does not hurry. It does not keep a schedule. It does not owe you a timeline. And the people who tell you "time heals" mean well, but they cannot tell you how much time \u2014 and that silence is its own kind of agony.',
      prompt: 'What pain are you waiting to end? What would "better" look like?',
      wisdom: 'Pain does not leave all at once. It does not pack its bags and close the door behind it. It leaves the way a tide goes out \u2014 gradually, with waves that come back smaller each time. You will have a day where you realize you went two hours without thinking about it. Then half a day. Then a whole day. And the absence will feel strange at first, like a phantom limb. Better is not the absence of pain. Better is the moment when the pain shares the room with other things \u2014 joy, curiosity, connection \u2014 instead of taking up all the space.'
    },
    {
      title: 'Waiting for Your Life to Start',
      body: [
        'When I am older. When I leave this house. When I am done with school. When I have my own money. When things settle down. When I finally get to be in charge of my own life.',
        '<em>The waiting for "real life" to begin. As if everything before it is just a rehearsal.</em>'
      ],
      weight: 'The danger of this waiting is that it steals the present. Every beautiful thing that happens now gets discounted because it is happening in the "before." You stop investing in today because you are saving all your energy for a tomorrow that keeps moving further away.',
      prompt: 'What are you putting off until your "real life" begins?',
      wisdom: 'This is your real life. Right now. Not the preview, not the dress rehearsal, not the waiting room. This. The friendships you have now are real. The things you learn now are real. The person you are now is real. Adolescence is not a hallway between childhood and adulthood. It is a room. A whole, complete, important room. And you are allowed to decorate it, live in it, and love it \u2014 even if you know you will not stay here forever. Every age is the real age. Every day is the real day. There is no "after." There is only now, with all its imperfect, waiting, in-between glory.'
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
  var weightBox    = document.getElementById('weightBox');
  var weightText   = document.getElementById('weightText');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var wisdomBox    = document.getElementById('wisdomBox');
  var wisdomText   = document.getElementById('wisdomText');
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

  /* ---------- canvas: slow rain-like drifting drops ---------- */
  var drops = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Drop() { this.reset(true); }
  Drop.prototype.reset = function (init) {
    this.x = Math.random() * bgCanvas.width;
    this.y = init ? Math.random() * bgCanvas.height : -Math.random() * 50;
    this.vy = Math.random() * 0.3 + 0.1;
    this.vx = (Math.random() - 0.5) * 0.08;
    this.r = Math.random() * 1.2 + 0.3;
    this.alpha = Math.random() * 0.15 + 0.03;
    this.trail = Math.random() * 8 + 3;
    var colors = [
      [128, 120, 168],
      [110, 105, 150],
      [145, 135, 180],
      [100, 95, 140],
      [160, 150, 190]
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  };
  Drop.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > bgCanvas.height + 10) this.reset(false);
  };
  Drop.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 2, this.y - this.trail);
    ctx.strokeStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
    ctx.lineWidth = this.r;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  for (var i = 0; i < 50; i++) drops.push(new Drop());

  function animate() {
    ctx.fillStyle = 'rgba(8, 8, 14, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < drops.length; j++) {
      drops[j].update();
      drops[j].draw();
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

    weightText.textContent = s.weight;
    askPrompt.textContent = s.prompt;
    wisdomText.textContent = s.wisdom;
    askInput.value = '';

    weightBox.classList.add('hidden');
    askBox.classList.add('hidden');
    wisdomBox.classList.add('hidden');
    feelBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  feelBtn.addEventListener('click', function () {
    feelBtn.classList.add('hidden');
    weightBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1000);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
    wisdomBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    wisdomBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
