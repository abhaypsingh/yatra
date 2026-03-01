/* ============================================================
   KALPANA — the imagination
   Wild "what if" questions and impossible answers
   ============================================================ */

(function () {
  'use strict';

  /* ==================== SEED QUESTIONS ==================== */
  var SEEDS = [
    'What if you could breathe underwater?',
    'What if animals could talk to you?',
    'What if you could visit any moment in history?',
    'What if you could fly, but only at night?',
    'What if colors had sounds?',
    'What if you could live inside any book?',
    'What if gravity stopped for one hour?',
    'What if everyone could see emotions as colors?',
    'What if you could send one message to your past self?',
    'What if you woke up as someone else for a day?',
    'What if you could taste music?',
    'What if the ocean was made of stories?',
    'What if trees remembered everything they had seen?',
    'What if you could pause time whenever you wanted?',
    'What if shadows could whisper?'
  ];

  /* ==================== DOM ==================== */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var main          = document.getElementById('main');
  var seedsEl       = document.getElementById('seeds');
  var ownBtn        = document.getElementById('ownBtn');
  var gallery       = document.getElementById('gallery');
  var galleryEmpty  = document.getElementById('galleryEmpty');
  var writeView     = document.getElementById('writeView');
  var writeQuestion = document.getElementById('writeQuestion');
  var writeInput    = document.getElementById('writeInput');
  var writeCancel   = document.getElementById('writeCancel');
  var writeSave     = document.getElementById('writeSave');
  var customView    = document.getElementById('customView');
  var customInput   = document.getElementById('customInput');
  var customCancel  = document.getElementById('customCancel');
  var customNext    = document.getElementById('customNext');
  var visionDetail  = document.getElementById('visionDetail');
  var detailQuestion= document.getElementById('detailQuestion');
  var detailAnswer  = document.getElementById('detailAnswer');
  var detailDate    = document.getElementById('detailDate');
  var detailClose   = document.getElementById('detailClose');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-kalpana-visions';
  var visions = [];
  var currentQuestion = '';

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) visions = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(visions)); }
    catch (e) {}
  }

  /* ==================== SEEDS ==================== */
  function showSeeds() {
    seedsEl.innerHTML = '';

    /* pick 4 random seeds, avoiding already-answered questions */
    var answered = {};
    visions.forEach(function (v) { answered[v.question] = true; });

    var available = SEEDS.filter(function (s) { return !answered[s]; });
    if (available.length === 0) available = SEEDS.slice();

    /* shuffle and take 4 */
    var shuffled = available.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = t;
    }
    var show = shuffled.slice(0, 4);

    show.forEach(function (q) {
      var btn = document.createElement('button');
      btn.className = 'seed';
      btn.textContent = q;
      btn.addEventListener('click', function () {
        openWrite(q);
      });
      seedsEl.appendChild(btn);
    });
  }

  /* ==================== RENDER ==================== */
  function render() {
    var existing = gallery.querySelectorAll('.vision-card');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    if (visions.length === 0) {
      galleryEmpty.classList.remove('hidden');
      return;
    }

    galleryEmpty.classList.add('hidden');

    var sorted = visions.slice().reverse();
    sorted.forEach(function (v) {
      var card = document.createElement('div');
      card.className = 'vision-card';

      var q = document.createElement('p');
      q.className = 'vision-q';
      q.textContent = v.question;
      card.appendChild(q);

      var a = document.createElement('p');
      a.className = 'vision-a';
      a.textContent = v.answer;
      card.appendChild(a);

      var d = document.createElement('p');
      d.className = 'vision-date';
      var dt = new Date(v.timestamp);
      d.textContent = dt.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      card.appendChild(d);

      card.addEventListener('click', function () { showDetail(v); });
      gallery.appendChild(card);
    });

    showSeeds();
  }

  /* ==================== WRITE ==================== */
  function openWrite(question) {
    currentQuestion = question;
    writeQuestion.textContent = question;
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() {
    writeView.classList.add('hidden');
  }

  function saveVision() {
    var answer = writeInput.value.trim();
    if (!answer) return;

    visions.push({
      question: currentQuestion,
      answer: answer,
      timestamp: Date.now()
    });
    save();
    closeWrite();
    render();
  }

  /* ==================== CUSTOM QUESTION ==================== */
  function openCustom() {
    customInput.value = 'What if ';
    customView.classList.remove('hidden');
    setTimeout(function () {
      customInput.focus();
      customInput.setSelectionRange(8, 8);
    }, 100);
  }

  function closeCustom() {
    customView.classList.add('hidden');
  }

  function nextCustom() {
    var q = customInput.value.trim();
    if (!q) return;
    if (q.charAt(q.length - 1) !== '?') q += '?';
    closeCustom();
    openWrite(q);
  }

  /* ==================== DETAIL ==================== */
  function showDetail(v) {
    detailQuestion.textContent = v.question;
    detailAnswer.textContent = v.answer;
    var dt = new Date(v.timestamp);
    detailDate.textContent = dt.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    visionDetail.classList.remove('hidden');
  }

  function hideDetail() {
    visionDetail.classList.add('hidden');
  }

  /* ==================== ABOUT ==================== */
  function openAbout() {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  }

  function closeAbout() {
    aboutOverlay.classList.remove('visible');
    setTimeout(function () { aboutOverlay.classList.add('hidden'); }, 400);
  }

  /* ==================== EVENTS ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      main.classList.remove('hidden');
      navFloat.classList.add('visible');
      load();
      showSeeds();
      render();
    }, 1200);
  });

  ownBtn.addEventListener('click', openCustom);
  customCancel.addEventListener('click', closeCustom);
  customNext.addEventListener('click', nextCustom);
  customInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); nextCustom(); }
  });

  writeCancel.addEventListener('click', closeWrite);
  writeSave.addEventListener('click', saveVision);

  detailClose.addEventListener('click', hideDetail);
  visionDetail.addEventListener('click', function (e) {
    if (e.target === visionDetail) hideDetail();
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
