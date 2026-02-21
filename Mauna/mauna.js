/* ============================================================
   MAUNA — silence
   Six kinds of silence, each with a different weight
   ============================================================ */

(function () {
  'use strict';

  var SILENCES = [
    {
      title: 'The Library',
      paragraphs: [
        'You are sitting in a library. No one is talking. Pages turn. Someone coughs and it sounds enormous. A chair scrapes against the floor and everyone looks up.',
        'This silence is <em>shared</em>. Everyone in this room chose to be quiet together. No one forced them. They came here because they wanted something that only stillness can give \u2014 the space to think.',
        'You are alone in a room full of people. And somehow, that feels safe.'
      ],
      question: 'Have you ever been in a silence that felt comfortable? Where was it?',
      truth: 'Shared silence is one of the deepest forms of connection. When you can sit with someone without needing to fill the space with words, you have found something rare. Not every silence is absence. Some silences are the most present you will ever be.'
    },
    {
      title: 'The Forest',
      paragraphs: [
        'You are standing among trees. There are no voices, no screens, no notifications. Just wind moving through leaves, a bird calling far away, water running somewhere you cannot see.',
        'Your thoughts are loud at first. The grocery list, the argument, the thing you should have said. But after a while, even those get quiet.',
        'Something underneath all the noise begins to surface. Something that was always there, waiting for the volume to come down. <em>Your own mind, finally audible.</em>'
      ],
      question: 'When was the last time you were truly quiet? What did you hear?',
      truth: 'Most people are afraid of silence because it forces them to hear themselves. The thoughts you avoid in the noise come forward in the quiet. That is not a threat. That is an invitation. The things that surface in silence are the things that need your attention most.'
    },
    {
      title: 'Being Left Out',
      paragraphs: [
        'Everyone is laughing at a table. You are not at the table. You can hear them from across the room \u2014 or across a screen. They did not invite you. Maybe they forgot. Maybe they did not forget.',
        'This silence is heavy. It presses on your chest. It is the silence of a phone that does not ring. A message that does not come. A seat that was not saved.',
        'This silence says: <em>you are not wanted here.</em> And even if that is not true, the silence is loud enough to drown out reason.'
      ],
      question: 'What does it feel like when you are left out? Where in your body do you feel it?',
      truth: 'The silence of exclusion is real pain. Brain scans show that social rejection activates the same areas as physical injury. You are not being dramatic. It actually hurts. But here is what that silence does not tell you: being left out of one room does not mean you are unwelcome in every room. The people who matter will save you a seat.'
    },
    {
      title: 'Choosing Solitude',
      paragraphs: [
        'You close the door. Not because you are sad. Not because you are running away. Because you need to be with yourself for a while.',
        'You put the phone on the desk, screen down. You sit. Maybe you read, or draw, or just breathe. No one needs anything from you right now. No one is watching.',
        'This is not loneliness. This is <em>the opposite of loneliness</em>. This is choosing your own company and finding it enough.'
      ],
      question: 'Do you enjoy being alone? What do you do when you choose solitude?',
      truth: 'The ability to be alone without being lonely is one of the most important skills you will ever develop. It means you are not dependent on other people to feel whole. You already are whole. Other people add to your life. They do not complete it.'
    },
    {
      title: 'After a Fight',
      paragraphs: [
        'The argument is over. No one won. The words that were said are still hanging in the air like smoke. Everyone has gone to different rooms.',
        'This silence is thick. It is full of everything that was said and everything that was not. Full of the moment right before you said the thing you wish you could take back.',
        'Someone has to break it. Someone has to walk across the hallway and knock on the door. <em>That walk is the longest walk in any house.</em>'
      ],
      question: 'After an argument, are you the one who breaks the silence? Or do you wait?',
      truth: 'The silence after a fight is a test of character, not stubbornness. The person who speaks first is not the one who lost \u2014 they are the one who decided the relationship mattered more than being right. That takes more courage than any argument ever will.'
    },
    {
      title: 'Between People Who Love Each Other',
      paragraphs: [
        'You are in a car with someone you love. Maybe a parent. Maybe a friend. The radio is off. Neither of you is talking.',
        'But this is not awkward. It is not cold. It is not the silence of two people who have nothing to say. It is the silence of two people who do not <em>need</em> to say anything.',
        'The road unrolls ahead. The world passes by the window. And this silence \u2014 this warm, weightless, unhurried silence \u2014 says more than a thousand conversations ever could.'
      ],
      question: 'Who can you be silent with? What makes that silence different?',
      truth: 'This is the rarest silence of all. It can only exist between people who feel safe with each other. If you have even one person you can be silent with \u2014 truly silent, without needing to perform or entertain or explain \u2014 you have something most people spend their whole lives looking for.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var silenceView  = document.getElementById('silenceView');
  var silenceTitle = document.getElementById('silenceTitle');
  var silenceBody  = document.getElementById('silenceBody');
  var silenceQuestion = document.getElementById('silenceQuestion');
  var questionText = document.getElementById('questionText');
  var reflectInput = document.getElementById('reflectInput');
  var silenceTruth = document.getElementById('silenceTruth');
  var truthText    = document.getElementById('truthText');
  var feelBtn      = document.getElementById('feelBtn');
  var reflectBtn   = document.getElementById('reflectBtn');
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

  /* ---------- canvas: very slow drifting dust in deep blue ---------- */
  var motes = [];

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function Mote() { this.reset(); }
  Mote.prototype.reset = function () {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.r = Math.random() * 1.2 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.08;
    this.vy = (Math.random() - 0.5) * 0.08;
    this.alpha = Math.random() * 0.2 + 0.03;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.008 + 0.003;
  };
  Mote.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += this.pulseSpeed;
    if (this.x < -10 || this.x > bgCanvas.width + 10) this.vx *= -1;
    if (this.y < -10 || this.y > bgCanvas.height + 10) this.vy *= -1;
  };
  Mote.prototype.draw = function () {
    var a = this.alpha * (0.5 + 0.5 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(104, 120, 160, ' + a + ')';
    ctx.fill();
  };

  for (var i = 0; i < 35; i++) motes.push(new Mote());

  function animate() {
    ctx.fillStyle = 'rgba(8, 8, 12, 0.03)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < motes.length; j++) {
      motes[j].update();
      motes[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- scene flow ---------- */
  function showSilence(idx) {
    if (idx >= SILENCES.length) {
      silenceView.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }

    currentIdx = idx;
    var s = SILENCES[idx];

    silenceTitle.textContent = s.title;
    silenceBody.innerHTML = '';
    for (var p = 0; p < s.paragraphs.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.paragraphs[p];
      silenceBody.appendChild(pEl);
    }

    questionText.textContent = s.question;
    reflectInput.value = '';
    silenceQuestion.classList.add('hidden');
    silenceTruth.classList.add('hidden');
    feelBtn.classList.remove('hidden');
    reflectBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SILENCES.length;

    silenceView.classList.remove('hidden');
    completeEl.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  feelBtn.addEventListener('click', function () {
    feelBtn.classList.add('hidden');
    silenceQuestion.classList.remove('hidden');
    reflectBtn.classList.remove('hidden');
    silenceQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  reflectBtn.addEventListener('click', function () {
    var s = SILENCES[currentIdx];
    truthText.textContent = s.truth;
    reflectBtn.classList.add('hidden');
    silenceTruth.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    silenceTruth.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  nextBtn.addEventListener('click', function () {
    showSilence(currentIdx + 1);
  });

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      showSilence(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    showSilence(0);
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
