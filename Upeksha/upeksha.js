/* ============================================================
   UPEKSHA — equanimity
   Six provocations and the space between stimulus and response
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    {
      title: 'Someone Insults You in Front of Others',
      body: [
        'It comes out of nowhere. Maybe it is a joke at your expense. Maybe it is something cruel about how you look, how you talk, where you come from.',
        'The room gets quiet. Or worse \u2014 the room laughs. <em>Everyone is watching to see what you will do.</em>'
      ],
      impulse: 'Hit back. Say something worse. Make them feel as small as they just made you feel. Show everyone you are not weak.',
      clarity: 'The person who insulted you wants a reaction. That is the entire point. Your silence, your calm, your refusal to perform for them \u2014 that is not weakness. It is the most powerful thing in the room. You can feel the anger fully without letting it choose your next move. Responding later, privately, clearly \u2014 that is strength. Reacting instantly is just reflex.'
    },
    {
      title: 'You See Something Unfair Online',
      body: [
        'A post. A comment. A video. Someone said something that is wrong, hurtful, ignorant. Your blood heats up. Your thumbs are already moving.',
        '<em>You need to say something. You need to fix this. Right now.</em>'
      ],
      impulse: 'Type the reply. Correct them. Destroy their argument. Share it everywhere so everyone can see how wrong they are.',
      clarity: 'Here is what almost never happens: someone reads an angry comment from a stranger and thinks, "You know what, they are right. I will change my mind now." Outrage feels productive. It almost never is. The pause is not about letting injustice slide. It is about choosing the response that actually changes something instead of just the one that feels good for ten seconds.'
    },
    {
      title: 'A Friend Leaves You Out',
      body: [
        'They made plans. You found out after. The photos are there on the screen \u2014 everyone smiling, together, without you.',
        'The sting is instant. <em>Then the stories start: they do not like you. They never did. You are the one everyone tolerates but no one chooses.</em>'
      ],
      impulse: 'Confront them. Or go silent. Pull away completely. Make them feel what you are feeling. Show them you do not need them.',
      clarity: 'The stories your brain writes in this moment are almost always fiction. People leave others out for a thousand reasons, and most of them have nothing to do with how they feel about you. The pause lets you separate the fact \u2014 you were not included this time \u2014 from the story \u2014 you are unwanted forever. One is painful. The other is a lie your hurt is telling you.'
    },
    {
      title: 'A Parent Disappoints You',
      body: [
        'A promise broken. A conversation that went wrong. Something they said that showed they do not understand you at all. Or maybe they understood you perfectly and chose not to act on it.',
        '<em>The disappointment is heavier because you expected better. Because you needed them to be better.</em>'
      ],
      impulse: 'Shut down. Stop trying. Stop caring. If they cannot be what you need, then you will stop needing anything from anyone.',
      clarity: 'Parents are human beings who are failing at the hardest job that exists. That does not excuse everything. But the impulse to shut down completely \u2014 to decide that because one person disappointed you, all vulnerability is dangerous \u2014 that punishes you more than it punishes them. You can hold the disappointment and the love at the same time. You can say "that hurt" without saying "I am done."'
    },
    {
      title: 'You Fail in Front of Everyone',
      body: [
        'The wrong answer in class. The missed goal. The voice crack during the presentation. The thing you worked hard on that just\u2026 did not work.',
        'The heat rises to your face. <em>Everyone saw. Everyone will remember. You want to disappear.</em>'
      ],
      impulse: 'Never try again. Avoid the situation forever. Replay the moment a thousand times. Convince yourself you are not good enough to be here.',
      clarity: 'The moment of failure feels eternal. It is not. Studies show that other people forget your embarrassments exponentially faster than you do. This is called the spotlight effect \u2014 you think the light is on you, but everyone else is worried about their own spotlight. The pause after failure is sacred. It is where you choose between "I failed" and "I am a failure." One is an event. The other is an identity. Choose the event.'
    },
    {
      title: 'Someone Gets What You Deserved',
      body: [
        'The grade, the role, the recognition, the attention. You worked harder. You cared more. But someone else got it.',
        '<em>The unfairness burns. And underneath the burn, a darker thought: maybe you are just not enough.</em>'
      ],
      impulse: 'Resent them. Diminish what they did. Find reasons it was unfair. Or turn it inward: hate yourself for not being better.',
      clarity: 'Envy is one of the most honest emotions. It tells you exactly what you value. The pause is not about pretending you are happy for them \u2014 not yet. It is about hearing what the envy is really saying: I want this. I care about this. That is useful information. The person who got what you wanted is not your enemy. And the narrative that life is a zero-sum game \u2014 that their win is your loss \u2014 is the biggest lie competition ever told.'
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
  var impulseBox   = document.getElementById('impulseBox');
  var impulseText  = document.getElementById('impulseText');
  var pauseBox     = document.getElementById('pauseBox');
  var breathCounter = document.getElementById('breathCounter');
  var breathFill   = document.getElementById('breathFill');
  var clarityBox   = document.getElementById('clarityBox');
  var clarityText  = document.getElementById('clarityText');
  var feelBtn      = document.getElementById('feelBtn');
  var pauseBtn     = document.getElementById('pauseBtn');
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
  var settling = 0;

  /* ---------- canvas: pendulum particles ---------- */
  var pendulums = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Pendulum() { this.reset(); }
  Pendulum.prototype.reset = function () {
    this.cx = Math.random() * bgCanvas.width;
    this.cy = Math.random() * bgCanvas.height;
    this.angle = (Math.random() - 0.5) * Math.PI * 0.6;
    this.maxAngle = Math.abs(this.angle);
    this.speed = Math.random() * 0.015 + 0.008;
    this.length = Math.random() * 40 + 15;
    this.r = Math.random() * 1.8 + 0.5;
    this.alpha = Math.random() * 0.2 + 0.05;
    this.phase = Math.random() * Math.PI * 2;
    this.damping = 0.9998;
  };
  Pendulum.prototype.update = function () {
    this.phase += this.speed;
    /* settling reduces amplitude over time */
    this.maxAngle *= (this.damping - settling * 0.0003);
    if (this.maxAngle < 0.001) this.maxAngle = 0.001;
    this.angle = Math.sin(this.phase) * this.maxAngle;
  };
  Pendulum.prototype.draw = function () {
    var px = this.cx + Math.sin(this.angle) * this.length;
    var py = this.cy + Math.cos(this.angle) * this.length;
    var a = this.alpha * (0.5 + 0.5 * (1 - this.maxAngle / 0.95));
    ctx.beginPath();
    ctx.arc(px, py, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(104, 120, 168, ' + a + ')';
    ctx.fill();
  };

  for (var i = 0; i < 55; i++) pendulums.push(new Pendulum());

  function animate() {
    ctx.fillStyle = 'rgba(8, 8, 14, 0.05)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < pendulums.length; j++) {
      pendulums[j].update();
      pendulums[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- breathing exercise ---------- */
  function runBreathing(cb) {
    var breaths = 0;
    var totalBreaths = 3;
    var inDuration = 3000;
    var outDuration = 4000;

    function breathIn() {
      breathCounter.textContent = 'breathe in\u2026';
      breathFill.style.transition = 'width ' + (inDuration / 1000) + 's ease';
      breathFill.style.width = '100%';
      setTimeout(breathOut, inDuration);
    }

    function breathOut() {
      breathCounter.textContent = 'breathe out\u2026';
      breathFill.style.transition = 'width ' + (outDuration / 1000) + 's ease';
      breathFill.style.width = '0%';
      breaths++;
      settling += 1;
      if (breaths < totalBreaths) {
        setTimeout(breathIn, outDuration);
      } else {
        setTimeout(function () {
          breathCounter.textContent = 'clarity.';
          cb();
        }, outDuration);
      }
    }

    breathIn();
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

    impulseText.textContent = s.impulse;
    clarityText.textContent = s.clarity;

    impulseBox.classList.add('hidden');
    pauseBox.classList.add('hidden');
    clarityBox.classList.add('hidden');
    feelBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    breathFill.style.transition = 'none';
    breathFill.style.width = '0%';
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;

    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  feelBtn.addEventListener('click', function () {
    feelBtn.classList.add('hidden');
    impulseBox.classList.remove('hidden');
    setTimeout(function () {
      pauseBtn.classList.remove('hidden');
      pauseBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1000);
  });

  pauseBtn.addEventListener('click', function () {
    pauseBtn.classList.add('hidden');
    pauseBox.classList.remove('hidden');
    pauseBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    runBreathing(function () {
      clarityBox.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
      clarityBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
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
    settling = 0;
    for (var k = 0; k < pendulums.length; k++) pendulums[k].reset();
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
