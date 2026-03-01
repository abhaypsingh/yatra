/* ============================================================
   SAPNA — the dream journal
   Record your dreams before they fade
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var dreamSky     = document.getElementById('dreamSky');
  var dreamEmpty   = document.getElementById('dreamEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var moodOptions  = document.getElementById('moodOptions');
  var dreamDetail  = document.getElementById('dreamDetail');
  var detailMood   = document.getElementById('detailMood');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-sapna-dreams';
  var dreams = [];
  var selectedMood = '';

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) dreams = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(dreams)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    /* clear existing clouds */
    var existing = dreamSky.querySelectorAll('.dream-cloud');
    for (var i = 0; i < existing.length; i++) {
      existing[i].parentNode.removeChild(existing[i]);
    }

    if (dreams.length === 0) {
      dreamEmpty.classList.remove('hidden');
      return;
    }

    dreamEmpty.classList.add('hidden');

    /* show newest first */
    var sorted = dreams.slice().reverse();

    sorted.forEach(function (dream) {
      var cloud = document.createElement('div');
      cloud.className = 'dream-cloud';

      var text = document.createElement('p');
      text.className = 'dream-text';
      text.textContent = dream.text;
      cloud.appendChild(text);

      var meta = document.createElement('div');
      meta.className = 'dream-meta';

      if (dream.mood) {
        var moodEl = document.createElement('span');
        moodEl.className = 'dream-mood mood-' + dream.mood;
        moodEl.textContent = dream.mood;
        meta.appendChild(moodEl);
      }

      var dateEl = document.createElement('span');
      var d = new Date(dream.timestamp);
      dateEl.textContent = d.toLocaleDateString(undefined, {
        day: 'numeric', month: 'short'
      });
      meta.appendChild(dateEl);

      cloud.appendChild(meta);

      cloud.addEventListener('click', function () {
        showDetail(dream);
      });

      dreamSky.appendChild(cloud);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(dream) {
    detailText.textContent = dream.text;

    detailMood.innerHTML = '';
    if (dream.mood) {
      var moodEl = document.createElement('span');
      moodEl.className = 'dream-mood mood-' + dream.mood;
      moodEl.textContent = dream.mood;
      detailMood.appendChild(moodEl);
    }

    var d = new Date(dream.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    dreamDetail.classList.remove('hidden');
  }

  function hideDetail() {
    dreamDetail.classList.add('hidden');
  }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeInput.value = '';
    selectedMood = '';
    var btns = moodOptions.querySelectorAll('.mood-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove('selected');
    }
    writeView.classList.remove('hidden');
    setTimeout(function () { writeInput.focus(); }, 100);
  }

  function closeWrite() {
    writeView.classList.add('hidden');
  }

  function saveDream() {
    var text = writeInput.value.trim();
    if (!text) return;

    dreams.push({
      text: text,
      mood: selectedMood,
      timestamp: Date.now()
    });
    save();
    closeWrite();
    render();
  }

  /* ==================== MOOD SELECT ==================== */
  var moodBtns = moodOptions.querySelectorAll('.mood-btn');
  for (var i = 0; i < moodBtns.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        var mood = btn.getAttribute('data-mood');
        if (selectedMood === mood) {
          selectedMood = '';
          btn.classList.remove('selected');
        } else {
          selectedMood = mood;
          var all = moodOptions.querySelectorAll('.mood-btn');
          for (var j = 0; j < all.length; j++) all[j].classList.remove('selected');
          btn.classList.add('selected');
        }
      });
    })(moodBtns[i]);
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
  writeSave.addEventListener('click', saveDream);

  detailClose.addEventListener('click', hideDetail);
  dreamDetail.addEventListener('click', function (e) {
    if (e.target === dreamDetail) hideDetail();
  });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
