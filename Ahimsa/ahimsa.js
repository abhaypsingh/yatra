/* ============================================================
   AHIMSA — non-harm
   Six moments where harm is easy and kindness is a choice
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'The Gossip You Could Spread',
      body: [
        'You know something about someone. Something private. Something that would be interesting to share, that would make people lean in, that would make you the center of the conversation for five minutes.',
        '<em>It is right there on the tip of your tongue. And the group is waiting.</em>'
      ],
      harm: 'You tell. The story spreads. By the end of the day, twenty people know something that was never theirs to know. The person it belongs to finds out. They do not know who started it, but they feel the change \u2014 the looks, the whispers, the sudden distance. A trust is broken that they did not even know was being tested.',
      cost: 'The five minutes of attention cost someone their dignity. And the people who leaned in to listen? They learned something about you too: that you will trade someone else\u2019s secret for a moment in the spotlight. Next time they have a secret, they will keep it from you. The gossip bought you attention and cost you trust.',
      choice: 'The non-harm is silence. Not dramatic silence. Not self-righteous silence. Just\u2026 not saying it. Letting the conversation move on. Choosing to be the person who could have told but did not. That person is rare. That person is trusted. That person is safe to be around. And that is worth more than any story.'
    },
    {
      title: 'The Voice Inside That Hates You',
      body: [
        'You look at yourself \u2014 in a mirror, in a photo, in a memory \u2014 and the voice starts. It is your voice, but crueler than anyone else\u2019s.',
        '<em>You would never say these things to a friend. But to yourself, they come easily, fluently, as if you have been rehearsing them your whole life.</em>'
      ],
      harm: 'You are ugly. You are stupid. You are too much and not enough at the same time. No one actually likes you. You deserve what happened to you. The voice does not shout. It states these as facts. And the worst part is that you believe it, because it sounds like the truth spoken by the person who knows you best.',
      cost: 'Self-hatred is the most efficient form of violence because the victim and the aggressor are the same person. There is no escape, no restraining order, no going home. Every cruel thing you say to yourself lowers the floor of what you will accept from others. If you believe you are worthless, you will let people treat you as worthless. The inner cruelty creates the outer reality.',
      choice: 'Ahimsa toward yourself is not vanity. It is survival. The practice is simple and impossibly hard: when the voice speaks, ask \u2014 would I say this to someone I love? If the answer is no, then it is not truth. It is violence. And you can choose, one sentence at a time, to stop committing it. Not because you are perfect. Because you are human. And humans deserve gentleness from themselves.'
    },
    {
      title: 'The Silent Treatment',
      body: [
        'Someone hurt you. Or annoyed you. Or disappointed you. And instead of saying what you feel, you go quiet. Not the quiet of processing. The quiet of punishment.',
        '<em>You know exactly what you are doing. You can feel their confusion, their anxiety, their desperate attempts to figure out what went wrong. And part of you wants them to suffer the way you did.</em>'
      ],
      harm: 'The silent treatment is a withdrawal of love disguised as peace. It says: you have to earn my presence back. It makes the other person responsible for solving a puzzle they did not create. It is control dressed as calm. And it works \u2014 which is why it is dangerous.',
      cost: 'The person on the receiving end learns that your love has conditions. That at any moment, for any reason, you might disappear. This creates anxiety \u2014 they start walking on eggshells, monitoring your mood, editing themselves to avoid triggering your silence. The relationship becomes a performance. And both of you lose.',
      choice: 'The non-harm is saying the hard thing. "I am hurt." "I need space, and I will come back." "What you did affected me and I want to talk about it." These sentences are harder than silence. They require vulnerability. But they keep the door open instead of locking it. You can take space without taking hostages.'
    },
    {
      title: 'Judging Someone\u2019s Family',
      body: [
        'Their parents are divorced. Or their mom works three jobs. Or their dad is not around. Or their house is smaller, louder, more chaotic than yours. You notice. Everyone notices.',
        '<em>And somewhere in your mind, a judgment forms \u2014 about them, based on their family\u2019s shape.</em>'
      ],
      harm: 'The judgment does not stay in your mind. It leaks. Through a raised eyebrow. A change in tone. An invitation not extended. A comment made to someone else. The person feels it \u2014 they always feel it \u2014 even when you think you are hiding it. And what they feel is this: I am less than. My family makes me less than.',
      cost: 'Every family is a universe that you cannot see from the outside. The quiet house may be hiding loneliness. The loud house may be full of love. The broken family may have the strongest bonds precisely because they chose to keep loving through the breaking. When you judge a family, you close a door to understanding someone who might have taught you something no one else could.',
      choice: 'The non-harm is curiosity instead of judgment. What is their life actually like? What have they learned from their family that you have not learned from yours? Every family shape has strengths that other shapes lack. The child of divorce knows resilience. The child of a single parent knows independence. The child of chaos knows adaptability. See the strength. It is always there.'
    },
    {
      title: 'Laughing at Someone to Fit In',
      body: [
        'The joke lands. Everyone laughs. The target of the joke is standing right there, trying to laugh too, trying to pretend it does not sting. You could be quiet. You could even say something.',
        '<em>But the group is laughing and belonging feels so good and you are so tired of being on the outside.</em>'
      ],
      harm: 'You laugh. You add to the noise. Maybe you add your own joke, building on the first one. For a moment, you are inside the circle \u2014 part of the group, part of the warmth. But the warmth was built on someone else\u2019s pain. The belonging was purchased with their exclusion.',
      cost: 'The person you laughed at will remember. Not the joke \u2014 they will forget the joke. But the fact that you laughed. That you chose the group over them. And you will remember too, in the quiet moments, when the group is not around and you are alone with who you are. Belonging built on cruelty is not belonging. It is a rental agreement with people who will turn on you the moment you become the easier target.',
      choice: 'The non-harm is the hardest social act a young person can perform: not laughing. Or better yet, changing the subject. Or best of all, saying "that is not funny" \u2014 not with anger, but with calm. The group may turn on you for a moment. But the person you did not laugh at will never forget you. And the kind of belonging you build by standing up is the kind that lasts.'
    },
    {
      title: 'The Cruelty You Received, Passed On',
      body: [
        'Someone hurt you. A parent, a peer, a stranger. The wound is still there \u2014 raw, unprocessed, looking for an exit. And then someone smaller, weaker, or more vulnerable crosses your path.',
        '<em>The impulse is ancient: hurt people hurt people. The pain needs somewhere to go.</em>'
      ],
      harm: 'You snap at a younger sibling. You exclude someone who has less power. You repeat the exact words that were said to you, aimed at someone who cannot defend themselves. The cycle completes. The violence that entered you exits through someone else. For a moment, the pressure releases.',
      cost: 'But the relief is a lie. Passing on pain does not reduce your own. It doubles it \u2014 because now you carry the original wound and the guilt of what you just did. And the person you hurt will carry it forward too, looking for their own exit. This is how cruelty reproduces. This is how cycles begin that last for generations.',
      choice: 'The non-harm is the bravest act in this entire collection: absorbing the pain instead of passing it on. Saying: it stops with me. The cruelty I received will not leave my hands. This is extraordinarily hard. It may be the hardest thing a human being can do. But every cycle that has ever been broken was broken by one person who decided: I will not do to others what was done to me. You can be that person. Today.'
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
  var harmBox      = document.getElementById('harmBox');
  var harmText     = document.getElementById('harmText');
  var costBox      = document.getElementById('costBox');
  var costText     = document.getElementById('costText');
  var choiceBox    = document.getElementById('choiceBox');
  var choiceText   = document.getElementById('choiceText');
  var harmBtn      = document.getElementById('harmBtn');
  var costBtn      = document.getElementById('costBtn');
  var choiceBtn    = document.getElementById('choiceBtn');
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

  /* ---------- canvas: expanding ripple circles ---------- */
  var ripples = [];
  var particles = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.1;
    this.vy = (Math.random() - 0.5) * 0.1;
    this.alpha = Math.random() * 0.12 + 0.03;
    var t = Math.random();
    if (t < 0.6) {
      this.color = [144, 184, 136];
    } else if (t < 0.85) {
      this.color = [128, 168, 120];
    } else {
      this.color = [184, 168, 120];
    }
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < 40; i++) particles.push(new Particle());

  /* spontaneous ripples */
  function spawnRipple() {
    ripples.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      r: 0,
      maxR: Math.random() * 80 + 30,
      speed: Math.random() * 0.3 + 0.15,
      alpha: Math.random() * 0.08 + 0.02
    });
  }

  function animate() {
    ctx.fillStyle = 'rgba(8, 10, 8, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    for (var j = 0; j < particles.length; j++) {
      particles[j].update();
      particles[j].draw();
    }

    for (var k = ripples.length - 1; k >= 0; k--) {
      var rp = ripples[k];
      rp.r += rp.speed;
      var fade = 1 - (rp.r / rp.maxR);
      if (fade <= 0) { ripples.splice(k, 1); continue; }
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(144, 184, 136, ' + (rp.alpha * fade) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    if (Math.random() < 0.02) spawnRipple();

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

    harmText.textContent = s.harm;
    costText.textContent = s.cost;
    choiceText.textContent = s.choice;

    harmBox.classList.add('hidden');
    costBox.classList.add('hidden');
    choiceBox.classList.add('hidden');
    harmBtn.classList.remove('hidden');
    costBtn.classList.add('hidden');
    choiceBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  harmBtn.addEventListener('click', function () {
    harmBtn.classList.add('hidden');
    harmBox.classList.remove('hidden');
    setTimeout(function () {
      costBtn.classList.remove('hidden');
      harmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  costBtn.addEventListener('click', function () {
    costBtn.classList.add('hidden');
    costBox.classList.remove('hidden');
    setTimeout(function () {
      choiceBtn.classList.remove('hidden');
      costBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  choiceBtn.addEventListener('click', function () {
    choiceBtn.classList.add('hidden');
    choiceBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    /* spawn a burst of gentle ripples */
    for (var r = 0; r < 3; r++) spawnRipple();
    choiceBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
