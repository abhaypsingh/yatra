/* ============================================================
   PRATIBIMBA — the reflection
   Twelve introspective questions, portrait assembly, persistence
   ============================================================ */

(function () {
  'use strict';

  /* ---------- questions ---------- */
  var QUESTIONS = [
    "What is something you believe today that you did not believe two years ago?",
    "When you are alone and no one is watching, what do you think about most?",
    "What is the hardest thing you have ever chosen to do \u2014 not something that happened to you, but something you decided?",
    "If you could have one conversation with anyone, living or dead, what would you want to understand from them?",
    "What are you most afraid of losing?",
    "Describe a moment when someone showed you kindness you did not expect.",
    "What is something you pretend to be okay with but are not?",
    "If your younger self could see you now, what would surprise them?",
    "What is a quality in someone else that you wish you had more of?",
    "When do you feel most like yourself?",
    "What have you forgiven that was difficult to forgive?",
    "Write one sentence to the person you will be in five years."
  ];

  var TOTAL = QUESTIONS.length;
  var STORAGE_KEY = 'pratibimba_portraits';

  /* ---------- state ---------- */
  var state = {
    current: 0,
    answers: []
  };

  /* ---------- DOM ---------- */
  var opening = document.getElementById('opening');
  var beginBtn = document.getElementById('beginBtn');
  var engine = document.getElementById('engine');
  var progressDots = document.getElementById('progressDots');
  var progressLabel = document.getElementById('progressLabel');
  var questionCard = document.getElementById('questionCard');
  var questionNumber = document.getElementById('questionNumber');
  var questionText = document.getElementById('questionText');
  var answerInput = document.getElementById('answerInput');
  var nextBtn = document.getElementById('nextQuestion');
  var portrait = document.getElementById('portrait');
  var portraitDate = document.getElementById('portraitDate');
  var portraitAnswers = document.getElementById('portraitAnswers');
  var portraitPast = document.getElementById('portraitPast');
  var saveBtn = document.getElementById('savePortrait');
  var restartBtn = document.getElementById('restartBtn');
  var pastOverlay = document.getElementById('pastOverlay');
  var pastEntries = document.getElementById('pastEntries');
  var pastClose = document.getElementById('pastClose');
  var navFloat = document.getElementById('navFloat');
  var navPast = document.getElementById('navPast');
  var navAbout = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose = document.getElementById('aboutClose');

  /* ---------- persistence ---------- */
  function loadPortraits() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function savePortraitData(p) {
    var all = loadPortraits();
    all.push(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (e) { /* storage full */ }
  }

  /* ---------- progress dots ---------- */
  function buildDots() {
    progressDots.innerHTML = '';
    for (var i = 0; i < TOTAL; i++) {
      var dot = document.createElement('span');
      dot.className = 'progress-dot';
      if (i < state.current) dot.className += ' done';
      if (i === state.current) dot.className += ' active';
      progressDots.appendChild(dot);
    }
    progressLabel.textContent = (state.current + 1) + ' / ' + TOTAL;
  }

  /* ---------- render question ---------- */
  function showQuestion() {
    questionNumber.textContent = 'question ' + (state.current + 1);
    questionText.textContent = QUESTIONS[state.current];
    answerInput.value = state.answers[state.current] || '';
    nextBtn.disabled = !(answerInput.value.trim().length > 0);
    nextBtn.textContent = state.current === TOTAL - 1 ? 'see portrait' : 'next \u2192';
    buildDots();

    questionCard.style.animation = 'none';
    void questionCard.offsetWidth;
    questionCard.style.animation = 'fadeIn 0.5s ease';

    answerInput.focus();
  }

  /* ---------- portrait ---------- */
  function formatDate(d) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function showPortrait() {
    engine.classList.add('hidden');
    portrait.classList.remove('hidden');
    navFloat.classList.add('visible');

    var now = new Date();
    portraitDate.textContent = formatDate(now);

    portraitAnswers.innerHTML = '';
    for (var i = 0; i < TOTAL; i++) {
      var qa = document.createElement('div');
      qa.className = 'portrait-qa';
      var q = document.createElement('div');
      q.className = 'portrait-q';
      q.textContent = QUESTIONS[i];
      var a = document.createElement('div');
      a.className = 'portrait-a';
      a.textContent = state.answers[i] || '';
      qa.appendChild(q);
      qa.appendChild(a);
      portraitAnswers.appendChild(qa);
    }

    var all = loadPortraits();
    if (all.length > 0) {
      portraitPast.innerHTML = '';
      var link = document.createElement('button');
      link.className = 'portrait-past-link';
      link.textContent = 'view ' + all.length + ' past portrait' + (all.length === 1 ? '' : 's');
      link.addEventListener('click', function () { openPastOverlay(); });
      portraitPast.appendChild(link);
    } else {
      portraitPast.innerHTML = '';
    }
  }

  /* ---------- past portraits overlay ---------- */
  function openPastOverlay() {
    var all = loadPortraits();
    pastEntries.innerHTML = '';
    if (all.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'past-empty';
      empty.textContent = 'No past portraits yet.';
      pastEntries.appendChild(empty);
    } else {
      for (var i = all.length - 1; i >= 0; i--) {
        (function (idx) {
          var entry = document.createElement('div');
          entry.className = 'past-entry';
          var dateEl = document.createElement('div');
          dateEl.className = 'past-entry-date';
          dateEl.textContent = all[idx].date;
          entry.appendChild(dateEl);
          entry.addEventListener('click', function () {
            showSavedPortrait(all[idx]);
          });
          pastEntries.appendChild(entry);
        })(i);
      }
    }
    pastOverlay.classList.remove('hidden');
    void pastOverlay.offsetWidth;
    pastOverlay.classList.add('visible');
  }

  function closePastOverlay() {
    pastOverlay.classList.remove('visible');
    setTimeout(function () { pastOverlay.classList.add('hidden'); }, 400);
  }

  function showSavedPortrait(p) {
    closePastOverlay();
    portraitDate.textContent = p.date;
    portraitAnswers.innerHTML = '';
    for (var i = 0; i < p.answers.length; i++) {
      var qa = document.createElement('div');
      qa.className = 'portrait-qa';
      var q = document.createElement('div');
      q.className = 'portrait-q';
      q.textContent = p.questions[i] || QUESTIONS[i] || '';
      var a = document.createElement('div');
      a.className = 'portrait-a';
      a.textContent = p.answers[i] || '';
      qa.appendChild(q);
      qa.appendChild(a);
      portraitAnswers.appendChild(qa);
    }
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      showQuestion();
    }, 1200);
  });

  answerInput.addEventListener('input', function () {
    state.answers[state.current] = answerInput.value;
    nextBtn.disabled = !(answerInput.value.trim().length > 0);
  });

  nextBtn.addEventListener('click', function () {
    if (nextBtn.disabled) return;
    state.answers[state.current] = answerInput.value;
    if (state.current < TOTAL - 1) {
      state.current++;
      showQuestion();
    } else {
      showPortrait();
    }
  });

  saveBtn.addEventListener('click', function () {
    var now = new Date();
    var portraitData = {
      date: formatDate(now),
      timestamp: now.getTime(),
      questions: QUESTIONS.slice(),
      answers: state.answers.slice()
    };
    savePortraitData(portraitData);
    saveBtn.textContent = 'sealed \u2713';
    saveBtn.disabled = true;
    setTimeout(function () {
      saveBtn.textContent = 'seal this portrait';
      saveBtn.disabled = false;
    }, 2000);
  });

  restartBtn.addEventListener('click', function () {
    state.current = 0;
    state.answers = [];
    portrait.classList.add('hidden');
    engine.classList.remove('hidden');
    showQuestion();
  });

  pastClose.addEventListener('click', closePastOverlay);
  pastOverlay.addEventListener('click', function (e) {
    if (e.target === pastOverlay) closePastOverlay();
  });

  navPast.addEventListener('click', function () { openPastOverlay(); });

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
