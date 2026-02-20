/* ============================================================
   ANITYA — impermanence
   Six meditations on things that fade
   ============================================================ */

(function () {
  'use strict';

  var MEDITATIONS = [
    {
      title: 'The Sandcastle',
      paragraphs: [
        'You built it with your hands. Towers, a moat, a wall with windows. You smoothed the sides with wet fingers. You pressed a shell into the gate.',
        'The tide came. You knew it would come. You watched anyway.',
        'First the moat filled. Then the wall softened. Then the towers leaned and fell, slowly, like something tired. The shell floated free.',
        'By morning there was nothing. Just flat sand, as if you had never been there at all.'
      ],
      wisdom: 'The sandcastle was never meant to last. It was meant to be built. The joy was in the building.'
    },
    {
      title: 'The Sunset',
      paragraphs: [
        'You stopped what you were doing because the sky was on fire. Orange bleeding into pink bleeding into purple bleeding into nothing.',
        'You thought: I should take a photo. But you knew \u2014 you already knew \u2014 that the photo would not be this. The photo would be a picture of a sky. This was the sky itself, and it was dying while you watched.',
        'Three minutes. Maybe four. The colors deepened, then thinned, then greyed.',
        'Now it is dark. The sunset is gone. But you are still standing here, and something in your chest is wider than it was.'
      ],
      wisdom: 'You cannot keep a sunset. But the sunset kept you still for four minutes. That stillness is yours.'
    },
    {
      title: 'The Friendship',
      paragraphs: [
        'There was a year when you were inseparable. Inside jokes no one else understood. A language that belonged to two people.',
        'You do not remember when it changed. There was no fight. No moment. Just a slow widening \u2014 like two boats that drifted apart on a lake so calm you could not feel the current.',
        'You see their posts online. They have new friends. New jokes. The language you built together has no speakers left.',
        'You are not sad, exactly. You are something for which there is no word \u2014 something between gratitude and ache.'
      ],
      wisdom: 'Some friendships are not meant to last forever. They are meant to teach you that you are capable of closeness. That lesson does not expire.'
    },
    {
      title: 'The Season',
      paragraphs: [
        'Autumn was your favorite. The smell of wet leaves. The way the light changed \u2014 softer, lower, gold instead of white. The feeling that the world was getting ready to rest.',
        'You did not notice the last warm day. You were busy. The leaves turned and fell and you forgot to watch.',
        'Now it is winter. The trees are bare. The cold has a weight to it. You think: I should have paid more attention.',
        'But spring will come. It always comes. The cycle does not ask for your attention \u2014 it gives it anyway.'
      ],
      wisdom: 'You will miss most endings. That is not failure. The seasons do not need you to witness them to be beautiful.'
    },
    {
      title: 'The Memory',
      paragraphs: [
        'You remember a morning. You were small. Someone was making breakfast. There was music, or maybe it was just humming. Sunlight on a floor. A feeling of safety so complete that you did not even know it was safety \u2014 you thought it was just what the world was.',
        'You cannot remember who was humming. You cannot remember the song. The edges of the memory are soft, like a photograph left in the sun.',
        'One day you will try to recall this and it will be gone. Not all at once. Just a little more faded, a little more uncertain, until you are not sure if it happened or if you dreamed it.',
        'But right now, in this moment, you can still feel the sunlight on that floor. Hold it gently. It is dissolving in your hands.'
      ],
      wisdom: 'A fading memory is not a failure of love. It is proof that you once lived so fully inside a moment that you forgot to take notes.'
    },
    {
      title: 'The Face You Love',
      paragraphs: [
        'Look at someone you love. Really look. The lines around their eyes. The way their hair falls. The exact color of their skin in this light, at this age, on this day.',
        'They will not always look like this. Neither will you. The face you love today is already different from the face you loved last year. Cells replaced. Lines deepened. Something in the eyes that was not there before.',
        'This is not sad. This is the proof that they are alive. A living face is a changing face. Only the dead stay the same.',
        'So look. Not to hold, but to honor. This version of them exists only now. Tomorrow there will be a new version, equally worthy of your attention.'
      ],
      wisdom: 'The people you love are not permanent. That is why looking at them \u2014 really looking \u2014 is an act of devotion.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var engine       = document.getElementById('engine');
  var canvas       = document.getElementById('fadeCanvas');
  var ctx          = canvas.getContext('2d');
  var medCard      = document.getElementById('medCard');
  var medNumber    = document.getElementById('medNumber');
  var medTitle     = document.getElementById('medTitle');
  var medBody      = document.getElementById('medBody');
  var medFadeMsg   = document.getElementById('medFadeMsg');
  var fadeWisdom   = document.getElementById('fadeWisdom');
  var nextBtn      = document.getElementById('nextBtn');
  var closing      = document.getElementById('closing');
  var restartBtn   = document.getElementById('restartBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var current = 0;
  var phase = 'reading'; /* reading -> fading -> wisdom */
  var particles = [];
  var animating = false;

  /* ---------- canvas ---------- */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* drifting motes */
  function Mote() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.5 + 0.3;
    this.vy = -(Math.random() * 0.3 + 0.1);
    this.vx = (Math.random() - 0.5) * 0.2;
    this.alpha = Math.random() * 0.2 + 0.05;
    this.pulse = Math.random() * Math.PI * 2;
  }
  Mote.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += 0.02;
    if (this.y < -5) { this.y = canvas.height + 5; this.x = Math.random() * canvas.width; }
  };
  Mote.prototype.draw = function () {
    var a = this.alpha + Math.sin(this.pulse) * 0.05;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(160, 170, 200, ' + Math.max(0, a) + ')';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    for (var i = 0; i < 80; i++) particles.push(new Mote());
  }

  function animate() {
    if (!animating) return;
    ctx.fillStyle = 'rgba(8, 8, 12, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animating) return;
    animating = true;
    initParticles();
    ctx.fillStyle = 'rgba(8, 8, 12, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();
  }

  /* ---------- show meditation ---------- */
  function showMeditation() {
    var m = MEDITATIONS[current];
    medNumber.textContent = 'meditation ' + (current + 1) + ' of ' + MEDITATIONS.length;
    medTitle.textContent = m.title;

    medBody.innerHTML = '';
    medBody.classList.remove('fading');
    for (var i = 0; i < m.paragraphs.length; i++) {
      var p = document.createElement('p');
      p.className = 'med-para';
      p.textContent = m.paragraphs[i];
      medBody.appendChild(p);
    }

    medFadeMsg.classList.add('hidden');
    phase = 'reading';
    nextBtn.textContent = 'let it fade';

    medCard.style.animation = 'none';
    void medCard.offsetWidth;
    medCard.style.animation = 'fadeIn 0.8s ease';
  }

  /* ---------- advance ---------- */
  nextBtn.addEventListener('click', function () {
    if (phase === 'reading') {
      /* fade the text */
      medBody.classList.add('fading');
      phase = 'fading';
      nextBtn.textContent = 'what remains';
      setTimeout(function () {
        /* auto-advance if still on fading */
      }, 3000);
    } else if (phase === 'fading') {
      /* show wisdom */
      medFadeMsg.classList.remove('hidden');
      fadeWisdom.textContent = MEDITATIONS[current].wisdom;
      phase = 'wisdom';
      if (current < MEDITATIONS.length - 1) {
        nextBtn.textContent = 'next \u2192';
      } else {
        nextBtn.textContent = 'the truth';
      }
    } else if (phase === 'wisdom') {
      if (current < MEDITATIONS.length - 1) {
        current++;
        showMeditation();
      } else {
        engine.classList.add('hidden');
        closing.classList.remove('hidden');
      }
    }
  });

  /* ---------- restart ---------- */
  restartBtn.addEventListener('click', function () {
    current = 0;
    closing.classList.add('hidden');
    engine.classList.remove('hidden');
    showMeditation();
  });

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      startAnimation();
      showMeditation();
    }, 1200);
  });

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
