/* ============================================================
   PRASHNA — the question
   A curiosity journal for life's unanswered questions
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var main           = document.getElementById('main');
  var questions      = document.getElementById('questions');
  var questionsEmpty = document.getElementById('questionsEmpty');
  var addBtn         = document.getElementById('addBtn');
  var writeView      = document.getElementById('writeView');
  var writeInput     = document.getElementById('writeInput');
  var writeCancel    = document.getElementById('writeCancel');
  var writeSave      = document.getElementById('writeSave');
  var questionDetail = document.getElementById('questionDetail');
  var detailMark     = document.getElementById('detailMark');
  var detailText     = document.getElementById('detailText');
  var detailInsightWrap = document.getElementById('detailInsightWrap');
  var detailInsight  = document.getElementById('detailInsight');
  var detailDate     = document.getElementById('detailDate');
  var detailClose    = document.getElementById('detailClose');
  var detailAddInsight = document.getElementById('detailAddInsight');
  var detailResolve  = document.getElementById('detailResolve');
  var insightView    = document.getElementById('insightView');
  var insightInput   = document.getElementById('insightInput');
  var insightCancel  = document.getElementById('insightCancel');
  var insightSave    = document.getElementById('insightSave');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-prashna-questions';
  var entries = [];
  var currentIdx = -1;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) entries = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(entries)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    var existing = questions.querySelectorAll('.q-card');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    if (entries.length === 0) {
      questionsEmpty.classList.remove('hidden');
      return;
    }

    questionsEmpty.classList.add('hidden');

    /* open questions first, then resolved, each group newest-first */
    var open = [];
    var resolved = [];
    entries.forEach(function (e, idx) {
      var item = { entry: e, idx: idx };
      if (e.resolved) resolved.push(item);
      else open.push(item);
    });
    open.reverse();
    resolved.reverse();
    var sorted = open.concat(resolved);

    sorted.forEach(function (item) {
      var e = item.entry;
      var idx = item.idx;

      var card = document.createElement('div');
      card.className = 'q-card' + (e.resolved ? ' resolved' : '');

      var mark = document.createElement('div');
      mark.className = 'q-mark';
      mark.textContent = e.resolved ? '\u2713' : '?';
      card.appendChild(mark);

      var body = document.createElement('div');
      body.className = 'q-body';

      var text = document.createElement('p');
      text.className = 'q-text';
      text.textContent = e.text;
      body.appendChild(text);

      if (e.insight) {
        var ins = document.createElement('p');
        ins.className = 'q-insight-preview';
        ins.textContent = e.insight;
        body.appendChild(ins);
      }

      var dateEl = document.createElement('p');
      dateEl.className = 'q-date';
      var d = new Date(e.timestamp);
      dateEl.textContent = d.toLocaleDateString(undefined, {
        day: 'numeric', month: 'short'
      });
      body.appendChild(dateEl);

      card.appendChild(body);

      card.addEventListener('click', function () {
        showDetail(idx);
      });

      questions.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(idx) {
    currentIdx = idx;
    var e = entries[idx];

    detailText.textContent = e.text;

    if (e.resolved) {
      detailMark.textContent = '\u2713';
      detailMark.classList.add('resolved');
      detailResolve.textContent = 'still wondering';
    } else {
      detailMark.textContent = '?';
      detailMark.classList.remove('resolved');
      detailResolve.textContent = 'mark as understood';
    }

    if (e.insight) {
      detailInsight.textContent = e.insight;
      detailInsightWrap.style.display = '';
    } else {
      detailInsightWrap.style.display = 'none';
    }

    var d = new Date(e.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    questionDetail.classList.remove('hidden');
  }

  function hideDetail() {
    questionDetail.classList.add('hidden');
    currentIdx = -1;
  }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() {
    writeView.classList.add('hidden');
  }

  function saveQuestion() {
    var text = writeInput.value.trim();
    if (!text) return;
    if (text.charAt(text.length - 1) !== '?') text += '?';

    entries.push({
      text: text,
      insight: '',
      resolved: false,
      timestamp: Date.now()
    });
    save();
    closeWrite();
    render();
  }

  /* ==================== INSIGHT ==================== */
  function openInsight() {
    if (currentIdx < 0) return;
    insightInput.value = entries[currentIdx].insight || '';
    hideDetail();
    insightView.classList.remove('hidden');
    setTimeout(function () { insightInput.focus(); }, 100);
  }

  function closeInsight() {
    insightView.classList.add('hidden');
  }

  function saveInsight() {
    if (currentIdx < 0) return;
    entries[currentIdx].insight = insightInput.value.trim();
    save();
    closeInsight();
    render();
  }

  /* ==================== RESOLVE ==================== */
  function toggleResolve() {
    if (currentIdx < 0) return;
    entries[currentIdx].resolved = !entries[currentIdx].resolved;
    save();
    hideDetail();
    render();
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
      render();
    }, 1200);
  });

  addBtn.addEventListener('click', openWrite);
  writeCancel.addEventListener('click', closeWrite);
  writeSave.addEventListener('click', saveQuestion);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveQuestion();
    }
  });

  detailClose.addEventListener('click', hideDetail);
  questionDetail.addEventListener('click', function (e) {
    if (e.target === questionDetail) hideDetail();
  });
  detailAddInsight.addEventListener('click', openInsight);
  detailResolve.addEventListener('click', toggleResolve);

  insightCancel.addEventListener('click', closeInsight);
  insightSave.addEventListener('click', saveInsight);

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
