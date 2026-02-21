/* ============================================================
   DAYA — self-compassion
   Six moments where the inner critic speaks, and you learn
   to answer with kindness
   ============================================================ */

(function () {
  'use strict';

  var MOMENTS = [
    {
      title: 'The Test You Failed',
      scene: [
        'You studied. You tried. You still did not get the grade you wanted. The paper comes back and the number on it feels like a verdict.',
        'Everyone else seems to understand. Everyone else seems fine. <em>You are the one who could not do it.</em>'
      ],
      critic: 'You are stupid. Everyone else gets it. You never will. Why do you even try?',
      truth: 'A grade is a measurement of one moment on one day. It is not a measurement of your intelligence, your worth, or your future. The bravest thing is not getting it right \u2014 it is trying again after getting it wrong. You tried. That is not failure. That is courage wearing ordinary clothes.'
    },
    {
      title: 'The Friendship That Changed',
      scene: [
        'You used to be close. You used to tell each other everything. Now they sit with other people and laugh at things you were not part of.',
        'You replay conversations looking for the moment it shifted. <em>What did you do wrong?</em>'
      ],
      critic: 'They left because you are boring. You are too much. You are not enough. No one really wants to be around you.',
      truth: 'Friendships change. That is not a verdict on your worth \u2014 it is the nature of growing up. People move at different speeds and in different directions. The ones who stay are not staying because you are perfect. They are staying because they choose you as you are. And the ones who leave make room for the ones who belong.'
    },
    {
      title: 'The Thing You Said',
      scene: [
        'It came out of your mouth before you could stop it. Something cruel, or stupid, or just wrong. You saw the look on their face and your stomach dropped.',
        'That was hours ago. Maybe days. <em>You are still replaying it.</em> Over and over, like pressing a bruise to see if it still hurts.'
      ],
      critic: 'You are a terrible person. You always say the wrong thing. You hurt people. That is who you are.',
      truth: 'A good person who says a bad thing is still a good person. The fact that it haunts you \u2014 that you feel the weight of it \u2014 is proof that you care. Bad people do not lose sleep over their words. You can apologize. You can learn. One sentence does not define a life.'
    },
    {
      title: 'The Way You Look',
      scene: [
        'You stand in front of a mirror and the list starts automatically. Too tall, too short, too heavy, too thin, too much of one thing, not enough of another.',
        'You see someone online who looks perfect and the gap between them and you feels like a canyon. <em>You want to stop looking but you cannot.</em>'
      ],
      critic: 'You are ugly. No one thinks you are attractive. You will never look the way you are supposed to look.',
      truth: 'Your body carried you here. It breathes for you, heals your cuts, lets you hug the people you love. It is not a decoration. It is a vehicle for your life. The images you compare yourself to are curated, filtered, and unreal. Your body is real. And real is enough.'
    },
    {
      title: 'Your Family',
      scene: [
        'Other families seem normal. They eat dinner together. They go on vacations. They do not fight the way yours does, or split the way yours did, or carry the heaviness yours carries.',
        'You love them and you are angry at them and you feel guilty for being angry. <em>All of it at once.</em>'
      ],
      critic: 'Your family is broken because of you. If you were different, things would be different. You are the reason it is hard.',
      truth: 'No child is responsible for the choices adults make. Not one. The weight of a family\u2019s struggles belongs to the adults who created the situation, not the child who lives inside it. You are allowed to love imperfect people. You are allowed to be hurt by them. You are allowed to feel both things without choosing a side. That is not confusion. That is the whole truth.'
    },
    {
      title: 'Just Existing',
      scene: [
        'Some days there is no specific thing. No event, no failure, no argument. Just a low hum of <em>not enough</em> that follows you from the moment you wake up.',
        'You smile at people. You do your work. Inside, the voice is constant: you should be more. You should be better. You should be different than this.'
      ],
      critic: 'You are not enough. You have never been enough. You will never be enough.',
      truth: 'Enough is not a place you arrive at. It is not a grade, a weight, a number of friends, or a version of yourself you have not become yet. You are enough right now \u2014 not because you have achieved something, but because you exist. You did not earn your worth. You were born with it. And nothing \u2014 not a bad day, not a mistake, not a cruel voice inside your head \u2014 can take it away.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var momentView   = document.getElementById('momentView');
  var momentTitle  = document.getElementById('momentTitle');
  var momentScene  = document.getElementById('momentScene');
  var criticBox    = document.getElementById('criticBox');
  var criticText   = document.getElementById('criticText');
  var friendBox    = document.getElementById('friendBox');
  var friendInput  = document.getElementById('friendInput');
  var friendSend   = document.getElementById('friendSend');
  var truthBox     = document.getElementById('truthBox');
  var truthText    = document.getElementById('truthText');
  var hearCritic   = document.getElementById('hearCritic');
  var nextMoment   = document.getElementById('nextMoment');
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

  /* ---------- canvas: soft warm pulsing glow ---------- */
  var orbs = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Orb() { this.reset(); }
  Orb.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.baseR = Math.random() * 40 + 20;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.008 + 0.003;
    this.vx = (Math.random() - 0.5) * 0.1;
    this.vy = (Math.random() - 0.5) * 0.1;
    this.alpha = Math.random() * 0.04 + 0.01;
  };
  Orb.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += this.pulseSpeed;
    if (this.x < -60 || this.x > bgCanvas.width + 60) this.vx *= -1;
    if (this.y < -60 || this.y > bgCanvas.height + 60) this.vy *= -1;
  };
  Orb.prototype.draw = function () {
    var r = this.baseR + Math.sin(this.pulse) * 8;
    var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
    grad.addColorStop(0, 'rgba(176, 120, 144, ' + (this.alpha * 1.5) + ')');
    grad.addColorStop(1, 'rgba(176, 120, 144, 0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  };

  for (var i = 0; i < 15; i++) orbs.push(new Orb());

  function animate() {
    ctx.fillStyle = 'rgba(10, 8, 10, 0.04)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < orbs.length; j++) {
      orbs[j].update();
      orbs[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- moment flow ---------- */
  function showMoment(idx) {
    if (idx >= MOMENTS.length) {
      momentView.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }

    currentIdx = idx;
    var m = MOMENTS[idx];

    momentTitle.textContent = m.title;
    momentScene.innerHTML = '';
    for (var p = 0; p < m.scene.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = m.scene[p];
      momentScene.appendChild(pEl);
    }

    criticText.textContent = m.critic;
    truthText.textContent = m.truth;
    friendInput.value = '';

    criticBox.classList.add('hidden');
    friendBox.classList.add('hidden');
    truthBox.classList.add('hidden');
    hearCritic.classList.remove('hidden');
    nextMoment.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + MOMENTS.length;

    momentView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hearCritic.addEventListener('click', function () {
    hearCritic.classList.add('hidden');
    criticBox.classList.remove('hidden');

    /* after a pause, show the friend prompt */
    setTimeout(function () {
      friendBox.classList.remove('hidden');
      friendBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  });

  friendSend.addEventListener('click', function () {
    /* show truth regardless of whether they wrote something */
    friendBox.classList.add('hidden');
    truthBox.classList.remove('hidden');
    nextMoment.classList.remove('hidden');
    truthBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  nextMoment.addEventListener('click', function () {
    showMoment(currentIdx + 1);
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      showMoment(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    showMoment(0);
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
