/* ============================================================
   PRATYAYA — trust
   Six stories about trust: broken, rebuilt, misplaced, earned,
   given too fast, withheld too long
   ============================================================ */

(function () {
  'use strict';

  var STORIES = [
    {
      title: 'The Broken Promise',
      kind: 'trust broken',
      paragraphs: [
        'Someone promised they would be there. Not in a dramatic way \u2014 no contract, no ceremony. Just the quiet kind of promise that lives between people who care about each other.',
        'They were not there.',
        'Maybe they had a reason. Maybe the reason was even good. But the space where they should have been standing is empty, and that emptiness has a sound. <em>It sounds like the word they said: I promise.</em>'
      ],
      deeper: 'what really broke',
      deeperText: 'When a promise breaks, the thing that shatters is not the plan or the event. It is the belief that this person\u2019s words mean something. Every future promise they make will now be weighed against this one. That is the real cost \u2014 not the absence, but the doubt that follows.',
      wisdom: 'A broken promise does not always mean a broken person. Sometimes good people fail. The question is not whether they broke it \u2014 but what they do next. Do they pretend it did not happen? Or do they stand in the wreckage and say: I am sorry. I was wrong. Let me try again.'
    },
    {
      title: 'The Slow Repair',
      kind: 'trust rebuilt',
      paragraphs: [
        'After the break, something strange begins. It is not forgiveness \u2014 not yet. It is smaller than that. It is a Tuesday. A phone call that comes when it was supposed to. A ride that arrives on time.',
        'Nothing dramatic. Nothing cinematic. Just a series of tiny, boring, reliable moments where someone does exactly what they said they would do.',
        'One brick. Then another. Then another. <em>Trust is not rebuilt in a single grand gesture. It is rebuilt in a thousand ordinary ones.</em>'
      ],
      deeper: 'how it works',
      deeperText: 'Researchers have found that trust recovery follows a specific pattern: first, acknowledgment of what happened. Then, consistent small actions over time. Not occasional big ones \u2014 consistent small ones. Showing up. Following through. Doing the boring, unglamorous work of being reliable.',
      wisdom: 'If someone is trying to rebuild your trust, look at the small things. Not the apology \u2014 anyone can apologize. Look at the Tuesday afternoon. The text that says I am running five minutes late. The promise kept when no one was watching. That is where trust lives.'
    },
    {
      title: 'The Wrong Person',
      kind: 'trust misplaced',
      paragraphs: [
        'You told someone a secret. Not because they earned it, but because you needed to tell someone \u2014 anyone \u2014 and they were there.',
        'They told someone else. And that person told someone else. And now the thing that was yours is everywhere, and you cannot take it back.',
        'The anger is real. But underneath the anger is something quieter: the knowledge that you gave something precious to someone who was not ready to hold it.'
      ],
      deeper: 'what you can learn',
      deeperText: 'Misplaced trust is not proof that you are naive or stupid. It is proof that you needed connection and reached for the nearest hand. That need is not weakness. But learning to test the water before diving in \u2014 sharing something small first, seeing how they hold it \u2014 is a skill that protects the deepest parts of you.',
      wisdom: 'Not everyone deserves access to your inner world. That is not cynicism. It is discernment. Trust is an invitation, not a door you leave open for everyone. The people who earn it are the ones who handle the small truths carefully before you give them the big ones.'
    },
    {
      title: 'The Person Who Showed Up',
      kind: 'trust earned',
      paragraphs: [
        'You did not ask for help. You did not even know you needed it. But someone noticed. They did not make a speech about it. They just appeared.',
        'A plate of food left outside your door. A message that said only: <em>I am here if you need me.</em> A ride offered without being asked. A silence held without being filled.',
        'They did not need credit. They did not need you to say thank you. They just needed to know you were okay.'
      ],
      deeper: 'why this matters',
      deeperText: 'Trust earned through action \u2014 not words, not promises, but consistent, quiet action \u2014 is the most durable kind. It does not announce itself. It does not ask to be noticed. It simply shows up and keeps showing up, until one day you realize: this person is safe. I know this not because they told me, but because they showed me.',
      wisdom: 'Pay attention to the people who show up when there is nothing to gain. When you are not fun, not exciting, not useful to them. When you are just someone who is struggling. Those are the people who love you for real. Hold onto them.'
    },
    {
      title: 'Too Fast',
      kind: 'trust given too quickly',
      paragraphs: [
        'You met someone and it was electric. You told them everything in a week. Your fears, your family, your secrets. It felt like relief \u2014 like finally someone understood.',
        'Then something shifted. Maybe they pulled away. Maybe you realized you barely knew them. Maybe the intimacy that felt so real was just the adrenaline of being seen.',
        'You are standing in the wreckage of a house you built in a day. <em>Houses built in a day fall in a day.</em>'
      ],
      deeper: 'the pattern',
      deeperText: 'Instant intimacy is often a sign of hunger, not connection. When you have been alone or unseen for a long time, the first person who pays attention can feel like a soulmate. But trust that skips the testing phase is trust without a foundation. It is not the other person\u2019s fault. It is the speed.',
      wisdom: 'Slow down. Real connection can survive slowness. In fact, it requires it. The friendships and relationships that last are the ones where trust was built layer by layer \u2014 where each person earned the next level before receiving it. If someone cannot wait for you to open at your own pace, they are not your person.'
    },
    {
      title: 'The Closed Door',
      kind: 'trust withheld too long',
      paragraphs: [
        'Someone keeps trying. They show up. They call. They ask how you are. They stand at the door you have locked and they knock, gently, again and again.',
        'You do not open it. Not because they have done something wrong. But because the last person who stood at that door hurt you, and now every knock sounds like a threat.',
        'The door stays closed. Weeks. Months. And one day, the knocking stops. <em>Not because they stopped caring. But because even love gets tired of talking to wood.</em>'
      ],
      deeper: 'the cost',
      deeperText: 'Withholding trust is a rational response to being hurt. But when it becomes a permanent state \u2014 when the walls you built for protection become a prison \u2014 you end up losing the very people who were trying to reach you. The tragedy is not that you were careful. It is that you were careful for so long that the good ones gave up.',
      wisdom: 'Protection and isolation look identical from the outside. But from the inside, one feels safe and the other feels hollow. If someone is knocking and they have given you no reason to fear them \u2014 only the ghosts of the people before them \u2014 consider opening the door. Even a crack. Even for a moment. You can always close it again. But some doors, once sealed, become very hard to reopen.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var storyView    = document.getElementById('storyView');
  var storyTitle   = document.getElementById('storyTitle');
  var storyKind    = document.getElementById('storyKind');
  var storyBody    = document.getElementById('storyBody');
  var storyLayer   = document.getElementById('storyLayer');
  var layerHeading = document.getElementById('layerHeading');
  var layerText    = document.getElementById('layerText');
  var storyWisdom  = document.getElementById('storyWisdom');
  var wisdomText   = document.getElementById('wisdomText');
  var deeperBtn    = document.getElementById('deeperBtn');
  var wisdomBtn    = document.getElementById('wisdomBtn');
  var storyNext    = document.getElementById('storyNext');
  var storyProgress = document.getElementById('storyProgress');
  var completeEl   = document.getElementById('complete');
  var againBtn     = document.getElementById('againBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var currentIdx = 0;
  var animFrame = null;

  /* ---------- canvas: warm floating threads ---------- */
  var threads = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Thread() { this.reset(); }
  Thread.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.len = Math.random() * 30 + 10;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.005;
    this.vx = (Math.random() - 0.5) * 0.12;
    this.vy = (Math.random() - 0.5) * 0.12;
    this.alpha = Math.random() * 0.15 + 0.03;
    this.warm = Math.random() > 0.3;
  };
  Thread.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
    if (this.x < -40 || this.x > bgCanvas.width + 40) this.vx *= -1;
    if (this.y < -40 || this.y > bgCanvas.height + 40) this.vy *= -1;
  };
  Thread.prototype.draw = function () {
    var x2 = this.x + Math.cos(this.angle) * this.len;
    var y2 = this.y + Math.sin(this.angle) * this.len;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x2, y2);
    if (this.warm) {
      ctx.strokeStyle = 'rgba(176, 128, 96, ' + this.alpha + ')';
    } else {
      ctx.strokeStyle = 'rgba(104, 136, 160, ' + this.alpha + ')';
    }
    ctx.lineWidth = 0.8;
    ctx.stroke();
  };

  for (var i = 0; i < 40; i++) threads.push(new Thread());

  function animate() {
    ctx.fillStyle = 'rgba(10, 8, 8, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < threads.length; j++) {
      threads[j].update();
      threads[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- story flow ---------- */
  function showStory(idx) {
    if (idx >= STORIES.length) {
      storyView.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }

    currentIdx = idx;
    var s = STORIES[idx];

    storyTitle.textContent = s.title;
    storyKind.textContent = s.kind;
    storyBody.innerHTML = '';
    for (var p = 0; p < s.paragraphs.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.paragraphs[p];
      storyBody.appendChild(pEl);
    }

    layerHeading.textContent = s.deeper;
    layerText.textContent = s.deeperText;
    wisdomText.textContent = s.wisdom;

    storyLayer.classList.add('hidden');
    storyWisdom.classList.add('hidden');
    deeperBtn.classList.remove('hidden');
    wisdomBtn.classList.add('hidden');
    storyNext.classList.add('hidden');
    storyProgress.textContent = (idx + 1) + ' of ' + STORIES.length;

    storyView.classList.remove('hidden');
    completeEl.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deeperBtn.addEventListener('click', function () {
    deeperBtn.classList.add('hidden');
    storyLayer.classList.remove('hidden');
    wisdomBtn.classList.remove('hidden');
    storyLayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  wisdomBtn.addEventListener('click', function () {
    wisdomBtn.classList.add('hidden');
    storyWisdom.classList.remove('hidden');
    storyNext.classList.remove('hidden');
    storyWisdom.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  storyNext.addEventListener('click', function () {
    showStory(currentIdx + 1);
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      showStory(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    showStory(0);
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
