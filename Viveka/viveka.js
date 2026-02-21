/* ============================================================
   VIVEKA — discernment
   Sort burdens: what is mine to carry vs what is not
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'viveka_sessions';

  var BURDENS = [
    {
      title: 'A parent\u2019s sadness',
      desc: 'Someone you love is going through a hard time. You feel their sadness pressing down on you, as if it were your own.',
      mine: false,
      reflect: 'You can love someone deeply without carrying their sadness for them. Their feelings are theirs to feel. Your love can be a lamp beside them \u2014 not a sponge that absorbs their pain.',
      wisdom: 'Compassion is standing beside someone in the rain. It is not drowning with them.'
    },
    {
      title: 'A promise you made',
      desc: 'You told someone you would do something. It is harder than you expected, and part of you wants to quit. But you said you would.',
      mine: true,
      reflect: 'A promise is a bridge between who you are and who you want to be. Keeping it \u2014 even when it is hard \u2014 is one of the ways you build trust with yourself.',
      wisdom: 'Your word is the only thing that is truly yours to give.'
    },
    {
      title: 'Someone else\u2019s anger at you',
      desc: 'Someone is angry with you. You are not sure you did anything wrong, but their anger makes you feel guilty and small.',
      mine: false,
      reflect: 'Other people\u2019s anger often comes from their own unhealed places. If you truly did something wrong, you can apologize. But you are not responsible for managing their emotions.',
      wisdom: 'You can be sorry for someone\u2019s pain without accepting blame for it.'
    },
    {
      title: 'Your own mistake',
      desc: 'You said something hurtful. You knew it was wrong even as you said it. The memory keeps replaying.',
      mine: true,
      reflect: 'This one belongs to you \u2014 not as punishment, but as growth. Acknowledging what you did, making it right if you can, and then forgiving yourself. That is the whole path.',
      wisdom: 'Guilt that leads to change is a teacher. Guilt that only leads to more guilt is a prison.'
    },
    {
      title: 'A situation you cannot control',
      desc: 'Something is happening in your family, your school, or the world. It worries you constantly, but there is nothing you can do to change it.',
      mine: false,
      reflect: 'There is a difference between caring about something and carrying it. You can care deeply about things you cannot change without letting them crush you.',
      wisdom: 'Worry is not the same as action. And some things are not asking for your action \u2014 only your patience.'
    },
    {
      title: 'Being kind even when tired',
      desc: 'You are exhausted, frustrated, running low. But someone needs you to be patient and kind right now.',
      mine: true,
      reflect: 'Kindness when it is easy costs nothing. Kindness when you are tired \u2014 that is character. But remember: being kind to others starts with being kind to yourself first.',
      wisdom: 'You cannot pour from an empty cup. But you can choose not to pour poison.'
    },
    {
      title: 'Adults making decisions about you',
      desc: 'Important decisions about your life are being made by adults. You feel powerless, like your voice does not count.',
      mine: false,
      reflect: 'The decisions adults make are their responsibility, not yours. Even when those decisions affect you deeply, the weight of having made them belongs to them. Your job is not to fix their choices.',
      wisdom: 'You are not responsible for the world adults built around you. You are only responsible for who you become inside it.'
    },
    {
      title: 'Standing up for what is right',
      desc: 'You see something unfair happening. Speaking up might make things uncomfortable. Staying quiet would be easier.',
      mine: true,
      reflect: 'Courage is not the absence of fear. It is deciding that something matters more than your comfort. You do not have to be loud. You just have to be honest.',
      wisdom: 'The world changes one honest voice at a time.'
    }
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var engine       = document.getElementById('engine');
  var progress     = document.getElementById('progress');
  var burdenCard   = document.getElementById('burdenCard');
  var burdenTitle  = document.getElementById('burdenTitle');
  var burdenDesc   = document.getElementById('burdenDesc');
  var mineBtn      = document.getElementById('mineBtn');
  var notBtn       = document.getElementById('notBtn');
  var reflect      = document.getElementById('reflect');
  var reflectTitle = document.getElementById('reflectTitle');
  var reflectText  = document.getElementById('reflectText');
  var reflectWisdom = document.getElementById('reflectWisdom');
  var reflectNext  = document.getElementById('reflectNext');
  var completeEl   = document.getElementById('complete');
  var mineList     = document.getElementById('mineList');
  var notList      = document.getElementById('notList');
  var againBtn     = document.getElementById('againBtn');
  var historyBtn   = document.getElementById('historyBtn');
  var history      = document.getElementById('history');
  var historySub   = document.getElementById('historySub');
  var historyEntries = document.getElementById('historyEntries');
  var historyBack  = document.getElementById('historyBack');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ---------- state ---------- */
  var shuffled = [];
  var currentIdx = 0;
  var choices = []; /* { title, userSaidMine, actuallyMine } */
  var animFrame = null;

  /* ---------- persistence ---------- */
  function loadAll() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; }
    catch (e) { return []; }
  }
  function saveSession(entry) {
    var all = loadAll();
    all.push(entry);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function formatDate(d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ---------- shuffle ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ---------- canvas: balance scales / floating motes ---------- */
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
    this.r = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.alpha = Math.random() * 0.25 + 0.05;
    /* alternate blue and warm colors */
    this.warm = Math.random() > 0.5;
  };
  Mote.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10 || this.x > bgCanvas.width + 10 ||
        this.y < -10 || this.y > bgCanvas.height + 10) this.reset();
  };
  Mote.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    if (this.warm) {
      ctx.fillStyle = 'rgba(184, 152, 104, ' + this.alpha + ')';
    } else {
      ctx.fillStyle = 'rgba(88, 136, 176, ' + this.alpha + ')';
    }
    ctx.fill();
  };

  for (var i = 0; i < 50; i++) motes.push(new Mote());

  function animate() {
    ctx.fillStyle = 'rgba(8, 10, 14, 0.05)';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (var j = 0; j < motes.length; j++) {
      motes[j].update();
      motes[j].draw();
    }
    animFrame = requestAnimationFrame(animate);
  }

  /* ---------- engine ---------- */
  function startSession() {
    shuffled = shuffle(BURDENS);
    currentIdx = 0;
    choices = [];
    showBurden();
  }

  function showBurden() {
    if (currentIdx >= shuffled.length) {
      finishSession();
      return;
    }
    var b = shuffled[currentIdx];
    progress.textContent = (currentIdx + 1) + ' of ' + shuffled.length;
    burdenTitle.textContent = b.title;
    burdenDesc.textContent = b.desc;

    burdenCard.classList.remove('exiting');
    engine.classList.remove('hidden');
    reflect.classList.add('hidden');
  }

  function handleChoice(userSaidMine) {
    var b = shuffled[currentIdx];
    choices.push({
      title: b.title,
      userSaidMine: userSaidMine,
      actuallyMine: b.mine
    });

    /* show reflection */
    if (userSaidMine === b.mine) {
      reflectTitle.textContent = 'You see it clearly.';
    } else if (userSaidMine && !b.mine) {
      reflectTitle.textContent = 'You might be carrying too much.';
    } else {
      reflectTitle.textContent = 'This one is worth holding.';
    }

    reflectText.textContent = b.reflect;
    reflectWisdom.textContent = b.wisdom;

    engine.classList.add('hidden');
    reflect.classList.remove('hidden');
  }

  mineBtn.addEventListener('click', function () {
    burdenCard.classList.add('exiting');
    setTimeout(function () { handleChoice(true); }, 300);
  });

  notBtn.addEventListener('click', function () {
    burdenCard.classList.add('exiting');
    setTimeout(function () { handleChoice(false); }, 300);
  });

  reflectNext.addEventListener('click', function () {
    currentIdx++;
    showBurden();
  });

  function finishSession() {
    engine.classList.add('hidden');
    reflect.classList.add('hidden');
    completeEl.classList.remove('hidden');

    mineList.innerHTML = '';
    notList.innerHTML = '';

    var mineCount = 0;
    var notCount = 0;

    for (var k = 0; k < choices.length; k++) {
      var c = choices[k];
      var item = document.createElement('div');
      item.className = 'col-item';
      item.textContent = c.title;

      if (c.userSaidMine) {
        item.classList.add('mine');
        mineList.appendChild(item);
        mineCount++;
      } else {
        item.classList.add('not');
        notList.appendChild(item);
        notCount++;
      }
    }

    saveSession({
      timestamp: Date.now(),
      carried: mineCount,
      released: notCount,
      total: choices.length
    });
  }

  /* ---------- main events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      startSession();
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    startSession();
  });

  /* ---------- history ---------- */
  historyBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    history.classList.remove('hidden');

    var all = loadAll();
    historySub.textContent = all.length + ' session' + (all.length === 1 ? '' : 's');
    historyEntries.innerHTML = '';

    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = 'No sessions yet.';
      historyEntries.appendChild(empty);
      return;
    }

    for (var m = all.length - 1; m >= 0; m--) {
      var entry = all[m];
      var div = document.createElement('div');
      div.className = 'history-entry';

      var dateEl = document.createElement('div');
      dateEl.className = 'history-entry-date';
      dateEl.textContent = formatDate(new Date(entry.timestamp));

      var detail = document.createElement('div');
      detail.className = 'history-entry-detail';
      detail.textContent = 'carried ' + entry.carried + ' \u00b7 set down ' + entry.released;

      div.appendChild(dateEl);
      div.appendChild(detail);
      historyEntries.appendChild(div);
    }
  });

  historyBack.addEventListener('click', function () {
    history.classList.add('hidden');
    completeEl.classList.remove('hidden');
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
