/* ============================================================
   SEVA — selfless service
   Six small acts that ripple further than you think
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'Notice Someone Who Is Invisible',
      body: [
        'Every school, every family, every room has someone who fades into the background. Not because they want to \u2014 because no one has looked at them closely enough to see them.',
        '<em>The quiet kid at the edge of the table. The janitor who knows your name but whose name you have never asked. The sibling who stopped asking for attention because they learned it would not come.</em>'
      ],
      why: 'Being invisible is one of the loneliest experiences a human being can have. It says: you do not matter enough to be noticed. But it only takes one person seeing you to change that. One person saying your name. One person making eye contact and meaning it. The act of noticing someone is, in itself, an act of service.',
      prompt: 'Who in your life might be invisible right now? What would it take to see them?',
      ripple: 'The person you notice will remember it. Not for a day \u2014 for years. Because when you are invisible, the first person who sees you becomes unforgettable. And something changes in them: they start looking for other invisible people. The seeing spreads. One act of noticing can change the culture of an entire room.'
    },
    {
      title: 'Defend Someone Who Cannot Defend Themselves',
      body: [
        'The joke that targets someone smaller. The rumor that targets someone quieter. The exclusion that targets someone different. You see it happening. Others see it too. Everyone is calculating the cost of speaking up.',
        '<em>The cost is real. But so is the cost of staying silent.</em>'
      ],
      why: 'The person being targeted does not need you to be their hero. They need you to be their witness. Someone who says: I saw that. That was not okay. Even if you say it afterward, privately. Even if you say it with your presence rather than your words. Showing up is itself an act of defense.',
      prompt: 'When was a time someone stood up for you? What did it feel like?',
      ripple: 'Every bystander who stays silent teaches the aggressor that cruelty has no consequences. Every bystander who speaks teaches the opposite. You do not have to be loud. You do not have to be confrontational. Sometimes all it takes is sitting next to the person who was excluded. Walking with them. Including them. The ripple is not just for the person you defended. It changes what the entire group believes is acceptable.'
    },
    {
      title: 'Do Something Without Being Asked',
      body: [
        'The dishes in the sink. The younger sibling who needs help with homework. The parent who looks exhausted. The friend who is carrying too much.',
        'You could wait to be asked. You could pretend not to notice. <em>Or you could just\u2026 do it. Without announcement. Without expecting thanks.</em>'
      ],
      why: 'Unsolicited help is a love language that transcends all others. It says: I see what you are carrying, and I am choosing to lighten it. Not because you asked, but because I noticed. In families under pressure, this kind of quiet service is oxygen. It does not fix the big problems. But it reminds everyone that they are not alone.',
      prompt: 'What is something you could do this week for someone without being asked? Something small.',
      ripple: 'The person you helped will feel it disproportionately to the size of the act. A clean kitchen when you expected a mess. A problem solved before you knew it was there. These are not small things. They are proof that someone is paying attention to your life. And the energy that frees up \u2014 the energy they would have spent on that task \u2014 goes somewhere. Often toward another act of kindness. Service is contagious.'
    },
    {
      title: 'Listen Without Trying to Fix',
      body: [
        'Someone is talking. Not about facts \u2014 about feelings. They are sad, or angry, or confused, and they are trusting you with it.',
        'The impulse is immediate: fix it. Offer advice. Tell them what to do. Relate it back to your own experience. <em>But what if the most helpful thing is the hardest thing \u2014 just listening?</em>'
      ],
      why: 'Most people do not need solutions. They need to feel heard. When you listen without fixing, you give someone the rarest gift in the world: the experience of being fully received. No judgment, no agenda, no impatience. Just: I am here. I hear you. Keep going.',
      prompt: 'Who in your life needs to be listened to right now? What would it take to just\u2026 listen?',
      ripple: 'A person who has been truly heard walks away lighter. Not because the problem is solved, but because it has been shared. And they become better listeners themselves \u2014 because they know what it feels like. One conversation where you do nothing but listen can change the way someone processes their entire life. That is not an exaggeration. That is what therapists do, and it is available to anyone willing to be quiet.'
    },
    {
      title: 'Be Kind to Someone Who Does Not Deserve It',
      body: [
        'They were rude. They were unfair. They wronged you or someone you care about. Every instinct says they do not deserve your kindness.',
        '<em>And you would be right. They do not deserve it. That is exactly what makes it seva.</em>'
      ],
      why: 'Kindness to people who deserve it is easy. It is natural, effortless, reciprocal. Kindness to people who do not deserve it is something else entirely. It is a decision. It is the choice to respond to the world not based on what it gives you, but based on who you want to be. This is the heart of selfless service: acting from your values, not from the situation.',
      prompt: 'Who is someone difficult in your life? What would unearned kindness toward them look like?',
      ripple: 'Undeserved kindness is disarming. The person who receives it does not know what to do with it. It breaks the script. They expected retaliation, and they got grace. This does not always change them \u2014 but it always changes you. It proves that your character is not controlled by other people\u2019s behavior. And that proof is worth more than any revenge.'
    },
    {
      title: 'Take Care of Yourself',
      body: [
        'This is the seva that nobody talks about. The service you owe yourself. Eating when you are hungry. Sleeping when you are tired. Saying no when you are depleted. Asking for help when you are drowning.',
        '<em>Taking care of yourself is not selfish. It is the first act of service. Because you cannot pour from an empty vessel.</em>'
      ],
      why: 'Every tradition that teaches seva also teaches self-care. The monk meditates before serving. The doctor heals themselves first. The flight attendant puts on their own mask before helping others. This is not contradiction. It is sequence. You matter too. Your needs are not less important than everyone else\u2019s.',
      prompt: 'What is one act of self-care you have been putting off? What would it take to do it today?',
      ripple: 'When you take care of yourself, you model something radical for everyone around you: that it is okay to have needs. That rest is not laziness. That boundaries are not selfishness. The children who watch you take care of yourself learn to take care of themselves. The friends who see you rest learn to rest. Self-seva is the service that makes all other service possible.'
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
  var whyBox       = document.getElementById('whyBox');
  var whyText      = document.getElementById('whyText');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var rippleBox    = document.getElementById('rippleBox');
  var rippleText   = document.getElementById('rippleText');
  var whyBtn       = document.getElementById('whyBtn');
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

  /* ---------- canvas: outward-flowing light from center ---------- */
  var rays = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Ray() { this.reset(); }
  Ray.prototype.reset = function () {
    var cx = bgCanvas.width / 2;
    var cy = bgCanvas.height / 2;
    var angle = Math.random() * Math.PI * 2;
    var dist = Math.random() * 20;
    this.x = cx + Math.cos(angle) * dist;
    this.y = cy + Math.sin(angle) * dist;
    this.vx = Math.cos(angle) * (Math.random() * 0.4 + 0.1);
    this.vy = Math.sin(angle) * (Math.random() * 0.4 + 0.1);
    this.r = Math.random() * 1.5 + 0.3;
    this.life = Math.random() * 400 + 200;
    this.age = 0;
    this.alpha = Math.random() * 0.15 + 0.03;
    var t = Math.random();
    if (t < 0.5) {
      this.color = [112, 168, 128];
    } else if (t < 0.8) {
      this.color = [128, 180, 140];
    } else {
      this.color = [192, 152, 88];
    }
  };
  Ray.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    if (this.age > this.life) this.reset();
  };
  Ray.prototype.draw = function () {
    var fade = 1 - (this.age / this.life);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + (this.alpha * fade) + ')';
    ctx.fill();
  };

  for (var i = 0; i < 60; i++) {
    var ray = new Ray();
    ray.age = Math.floor(Math.random() * ray.life);
    rays.push(ray);
  }

  function animate() {
    ctx.fillStyle = 'rgba(8, 10, 10, 0.03)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < rays.length; j++) {
      rays[j].update();
      rays[j].draw();
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

    whyText.textContent = s.why;
    askPrompt.textContent = s.prompt;
    rippleText.textContent = s.ripple;
    askInput.value = '';

    whyBox.classList.add('hidden');
    askBox.classList.add('hidden');
    rippleBox.classList.add('hidden');
    whyBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  whyBtn.addEventListener('click', function () {
    whyBtn.classList.add('hidden');
    whyBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
    rippleBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    rippleBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
