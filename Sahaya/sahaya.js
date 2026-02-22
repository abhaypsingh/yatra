/* ============================================================
   SAHAYA — asking for help
   Six moments where you need help but cannot bring yourself to ask
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'You Are Drowning in Schoolwork',
      body: [
        'The assignments are piling up. You missed one, then another, and now you are behind in three subjects. The hole gets deeper every day.',
        'You sit at your desk staring at the screen. You know you need help. A teacher, a tutor, a parent. <em>But if you ask, they will know you fell behind. They will know you could not handle it.</em>'
      ],
      fear: 'If I ask for help, they will think I am lazy. They will think I do not care. They will think I am not smart enough.',
      truth: 'Every teacher you have ever had would rather hear "I am struggling" than watch you drown in silence. Asking for help with schoolwork is not an admission of failure. It is a sign that you understand something most adults still struggle with: no one learns alone. The smartest people in any room are usually the ones who ask the most questions.'
    },
    {
      title: 'You Feel Sad and You Do Not Know Why',
      body: [
        'There is no reason. Nothing happened. No one was mean to you. But the heaviness is there \u2014 in your chest, behind your eyes, in the way everything feels like it takes twice the energy it should.',
        'Someone asks if you are okay. You say yes. Because how do you explain sadness that has no story? <em>How do you ask for help with something you cannot name?</em>'
      ],
      fear: 'If I tell someone, they will ask me what is wrong, and I will not have an answer. They will think I am being dramatic. They will not understand.',
      truth: 'Sadness does not always need a reason. Sometimes the body is tired, the brain is overloaded, or the heart is carrying things you have not processed yet. You do not need a diagnosis to deserve comfort. You do not need a story to deserve a hug. "I feel sad and I do not know why" is a complete sentence. And the right people will hear it and sit with you anyway.'
    },
    {
      title: 'Someone Is Hurting You',
      body: [
        'It might be words. It might be exclusion. It might be something worse. Someone is making your life smaller and darker, and they know it.',
        'You have thought about telling someone. But every time you get close, the fear stops you. <em>What if they do not believe you? What if it gets worse?</em>'
      ],
      fear: 'If I tell, nothing will change. Or it will change and get worse. They will say I am making it up. They will say I should be tougher.',
      truth: 'What is happening to you is not okay. That is true regardless of who is doing it or why. You deserve to be safe, and you cannot always make yourself safe alone \u2014 that is not your job. It is the job of the adults around you. Telling someone is not weakness and it is not tattling. It is self-preservation. And if the first person you tell does not help, tell another. Keep telling until someone listens. Because someone will.'
    },
    {
      title: 'You Made a Mistake You Cannot Fix',
      body: [
        'You did something. Maybe you lied. Maybe you broke something. Maybe you hurt someone. The mistake sits in your stomach like a stone, and every hour it gets heavier.',
        'You could tell someone. They might know what to do. But telling means admitting what happened. <em>And admitting means becoming the person who did that thing.</em>'
      ],
      fear: 'If I tell the truth, they will be disappointed. They will see me differently. They will stop trusting me.',
      truth: 'Here is what actually happens when you admit a mistake to someone who cares about you: there is a hard moment. Maybe a few hard minutes. And then \u2014 relief. Because the weight you have been carrying alone is now shared. The person who loves you will not love you less for being honest. They will love you more. Confession is not the end of trust. It is the beginning of rebuilding it.'
    },
    {
      title: 'Your Family Needs Help',
      body: [
        'Money is tight, or someone is sick, or the house is chaotic in ways you cannot explain to your friends. You carry it quietly, pretending everything is fine.',
        'A counselor, a teacher, a friend\u2019s parent \u2014 they have all said "let me know if you need anything." <em>But you never do. Because your family\u2019s struggles feel like your family\u2019s secret.</em>'
      ],
      fear: 'If people know what our family is really like, they will judge us. They will pity us. It will make everything worse.',
      truth: 'Every family struggles. The ones that look perfect from the outside are often the ones working hardest to hide their cracks. Accepting help is not betraying your family. It is loving your family enough to let someone lighten the load. A meal from a neighbor. A conversation with a counselor. A ride from a friend\u2019s parent. These are not charity. They are community. And community is how families have survived since the beginning of time.'
    },
    {
      title: 'You Just Need Someone to Talk To',
      body: [
        'Not a therapist (although that would be fine too). Not a lecture. Not advice. Just someone who will sit and listen without trying to fix you.',
        'You pick up your phone. You scroll through contacts. You put it down. <em>Everyone seems busy. Everyone has their own problems. You do not want to be a burden.</em>'
      ],
      fear: 'I am too much. My problems are too small to bother someone with. They have real things to deal with. I should handle this myself.',
      truth: 'You are not a burden. Let that land. You are not a burden. The people in your contacts \u2014 the ones who matter \u2014 are not keeping score. They are not weighing your problems against theirs to decide if you deserve their time. They would want to know. And if the roles were reversed, you would want to be called. Send the text. Make the call. The three hardest words are often: can we talk? But on the other side of those words is everything you need.'
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
  var fearBox      = document.getElementById('fearBox');
  var fearText     = document.getElementById('fearText');
  var askBox       = document.getElementById('askBox');
  var askInput     = document.getElementById('askInput');
  var askSend      = document.getElementById('askSend');
  var truthBox     = document.getElementById('truthBox');
  var truthText    = document.getElementById('truthText');
  var faceBtn      = document.getElementById('faceBtn');
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

  /* ---------- canvas: reaching tendrils of light ---------- */
  var tendrils = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Tendril() { this.reset(); }
  Tendril.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = bgCanvas.height + 10;
    this.targetY = Math.random() * bgCanvas.height * 0.3;
    this.speed = Math.random() * 0.3 + 0.1;
    this.sway = Math.random() * Math.PI * 2;
    this.swayAmp = Math.random() * 30 + 10;
    this.swaySpeed = Math.random() * 0.01 + 0.005;
    this.alpha = Math.random() * 0.15 + 0.03;
    this.r = Math.random() * 1.5 + 0.5;
  };
  Tendril.prototype.update = function () {
    this.y -= this.speed;
    this.sway += this.swaySpeed;
    if (this.y < this.targetY) this.reset();
  };
  Tendril.prototype.draw = function () {
    var sx = this.x + Math.sin(this.sway) * this.swayAmp;
    var progress = 1 - (this.y / bgCanvas.height);
    var a = this.alpha * progress;
    ctx.beginPath();
    ctx.arc(sx, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(88, 168, 144, ' + a + ')';
    ctx.fill();
  };

  for (var i = 0; i < 45; i++) {
    var t = new Tendril();
    t.y = Math.random() * bgCanvas.height;
    tendrils.push(t);
  }

  function animate() {
    ctx.fillStyle = 'rgba(8, 10, 10, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < tendrils.length; j++) {
      tendrils[j].update();
      tendrils[j].draw();
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

    fearText.textContent = s.fear;
    truthText.textContent = s.truth;
    askInput.value = '';

    fearBox.classList.add('hidden');
    askBox.classList.add('hidden');
    truthBox.classList.add('hidden');
    faceBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  faceBtn.addEventListener('click', function () {
    faceBtn.classList.add('hidden');
    fearBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  });

  askSend.addEventListener('click', function () {
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
