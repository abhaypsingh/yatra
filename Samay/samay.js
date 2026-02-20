/* ============================================================
   SAMAY — time
   Capture a single day in vivid detail
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'samay_capsules';

  var PROMPTS = [
    { id: 'q1', question: 'What did you eat today?' },
    { id: 'q2', question: 'What song is stuck in your head?' },
    { id: 'q3', question: 'Who did you talk to today?' },
    { id: 'q4', question: 'What were you worried about?' },
    { id: 'q5', question: 'What made you laugh or smile?' },
    { id: 'q6', question: 'What were you wearing?' },
    { id: 'q7', question: 'What was the weather like?' },
    { id: 'q8', question: 'One thing you want to remember about today' }
  ];

  /* ---------- DOM ---------- */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var engine         = document.getElementById('engine');
  var captureCard    = document.getElementById('captureCard');
  var captureDate    = document.getElementById('captureDate');
  var sealBtn        = document.getElementById('sealBtn');
  var sealedCard     = document.getElementById('sealedCard');
  var viewCapsulesBtn = document.getElementById('viewCapsulesBtn');
  var capsules       = document.getElementById('capsules');
  var capsulesSub    = document.getElementById('capsulesSub');
  var capsulesGrid   = document.getElementById('capsulesGrid');
  var capsulesBack   = document.getElementById('capsulesBack');
  var detail         = document.getElementById('detail');
  var detailCard     = document.getElementById('detailCard');
  var detailBack     = document.getElementById('detailBack');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ---------- persistence ---------- */
  function loadAll() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : {}; }
    catch (e) { return {}; }
  }
  function saveEntry(key, entry) {
    var all = loadAll();
    all[key] = entry;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function dkey(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function formatDate(d) {
    var months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function formatDateShort(d) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function todayDone() { return !!loadAll()[dkey(new Date())]; }

  /* ---------- capture ---------- */
  function showCapture() {
    captureDate.textContent = formatDate(new Date());
    for (var i = 0; i < PROMPTS.length; i++) {
      document.getElementById(PROMPTS[i].id).value = '';
    }
    sealBtn.textContent = 'seal this day';
    sealBtn.disabled = false;
  }

  sealBtn.addEventListener('click', function () {
    var answers = [];
    var hasAny = false;
    for (var i = 0; i < PROMPTS.length; i++) {
      var el = document.getElementById(PROMPTS[i].id);
      var val = el.value.trim();
      answers.push({ question: PROMPTS[i].question, answer: val });
      if (val) hasAny = true;
    }
    if (!hasAny) return;

    saveEntry(dkey(new Date()), {
      timestamp: Date.now(),
      answers: answers
    });

    sealBtn.textContent = 'sealed \u2713';
    sealBtn.disabled = true;
    captureCard.classList.add('hidden');
    sealedCard.classList.remove('hidden');
  });

  /* ---------- capsules list ---------- */
  function showCapsules() {
    engine.classList.add('hidden');
    detail.classList.add('hidden');
    capsules.classList.remove('hidden');

    var all = loadAll();
    var keys = Object.keys(all).sort().reverse();
    capsulesSub.textContent = keys.length + ' day' + (keys.length === 1 ? '' : 's') + ' captured';
    capsulesGrid.innerHTML = '';

    if (keys.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'capsules-empty';
      empty.textContent = 'No capsules yet.';
      capsulesGrid.appendChild(empty);
      return;
    }

    for (var k = 0; k < keys.length; k++) {
      (function (key) {
        var entry = all[key];
        var parts = key.split('-');
        var entryDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

        var item = document.createElement('div');
        item.className = 'capsule-item';
        item.addEventListener('click', function () { showDetail(key); });

        var icon = document.createElement('div');
        icon.className = 'capsule-icon';
        icon.textContent = '\u23F3';

        var info = document.createElement('div');
        var dateEl = document.createElement('div');
        dateEl.className = 'capsule-date';
        dateEl.textContent = formatDateShort(entryDate);

        /* find first non-empty answer as preview */
        var preview = document.createElement('div');
        preview.className = 'capsule-preview';
        var previewText = '';
        if (entry.answers) {
          for (var a = 0; a < entry.answers.length; a++) {
            if (entry.answers[a].answer) {
              previewText = entry.answers[a].answer;
              break;
            }
          }
        }
        if (previewText.length > 60) previewText = previewText.substring(0, 57) + '\u2026';
        preview.textContent = previewText;

        info.appendChild(dateEl);
        info.appendChild(preview);
        item.appendChild(icon);
        item.appendChild(info);
        capsulesGrid.appendChild(item);
      })(keys[k]);
    }
  }

  /* ---------- detail view ---------- */
  function showDetail(key) {
    capsules.classList.add('hidden');
    detail.classList.remove('hidden');

    var all = loadAll();
    var entry = all[key];
    if (!entry) return;

    var parts = key.split('-');
    var entryDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

    detailCard.innerHTML = '';

    var dateEl = document.createElement('div');
    dateEl.className = 'detail-date';
    dateEl.textContent = formatDate(entryDate);
    detailCard.appendChild(dateEl);

    if (entry.answers) {
      for (var a = 0; a < entry.answers.length; a++) {
        if (entry.answers[a].answer) {
          var pair = document.createElement('div');
          pair.className = 'detail-pair';

          var q = document.createElement('div');
          q.className = 'detail-question';
          q.textContent = entry.answers[a].question;

          var ans = document.createElement('div');
          ans.className = 'detail-answer';
          ans.textContent = entry.answers[a].answer;

          pair.appendChild(q);
          pair.appendChild(ans);
          detailCard.appendChild(pair);
        }
      }
    }
  }

  viewCapsulesBtn.addEventListener('click', showCapsules);
  capsulesBack.addEventListener('click', function () {
    capsules.classList.add('hidden');
    engine.classList.remove('hidden');
  });
  detailBack.addEventListener('click', function () {
    detail.classList.add('hidden');
    capsules.classList.remove('hidden');
  });

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');

      if (todayDone()) {
        engine.classList.remove('hidden');
        captureCard.classList.add('hidden');
        sealedCard.classList.remove('hidden');
      } else {
        engine.classList.remove('hidden');
        showCapture();
      }
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
