/* ============================================================
   UDAAN — the flight
   Dreams and goals: on the wire, then in the sky
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var wireList     = document.getElementById('wireList');
  var wireEmpty    = document.getElementById('wireEmpty');
  var flightList   = document.getElementById('flightList');
  var flightEmpty  = document.getElementById('flightEmpty');
  var flightSection= document.getElementById('flightSection');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var goalDetail   = document.getElementById('goalDetail');
  var detailIcon   = document.getElementById('detailIcon');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var detailActions= document.getElementById('detailActions');
  var detailFly    = document.getElementById('detailFly');
  var detailGround = document.getElementById('detailGround');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-udaan-goals';
  var goals = [];
  var currentIdx = -1;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) goals = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(goals)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    /* clear */
    var wCards = wireList.querySelectorAll('.goal-card');
    for (var i = 0; i < wCards.length; i++) wCards[i].parentNode.removeChild(wCards[i]);
    var fCards = flightList.querySelectorAll('.goal-card');
    for (var j = 0; j < fCards.length; j++) fCards[j].parentNode.removeChild(fCards[j]);

    var onWire = [];
    var inFlight = [];

    goals.forEach(function (g, idx) {
      if (g.achieved) inFlight.push({ goal: g, idx: idx });
      else onWire.push({ goal: g, idx: idx });
    });

    /* wire */
    if (onWire.length === 0) {
      wireEmpty.classList.remove('hidden');
    } else {
      wireEmpty.classList.add('hidden');
      onWire.forEach(function (item) {
        wireList.appendChild(buildCard(item.goal, item.idx));
      });
    }

    /* flight */
    if (inFlight.length === 0) {
      flightEmpty.classList.remove('hidden');
      flightSection.style.display = 'none';
    } else {
      flightEmpty.classList.add('hidden');
      flightSection.style.display = '';
      inFlight.reverse();
      inFlight.forEach(function (item) {
        flightList.appendChild(buildCard(item.goal, item.idx));
      });
    }
  }

  function buildCard(g, idx) {
    var card = document.createElement('div');
    card.className = 'goal-card' + (g.achieved ? ' achieved' : '');

    var icon = document.createElement('span');
    icon.className = 'goal-icon';
    icon.textContent = g.achieved ? '\uD83D\uDD4A' : '\u2022';
    card.appendChild(icon);

    var body = document.createElement('div');
    body.className = 'goal-body';

    var text = document.createElement('p');
    text.className = 'goal-text';
    text.textContent = g.text;
    body.appendChild(text);

    var dateEl = document.createElement('p');
    dateEl.className = 'goal-date';
    var d = new Date(g.timestamp);
    dateEl.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'short'
    });
    body.appendChild(dateEl);

    card.appendChild(body);

    card.addEventListener('click', function () {
      showDetail(idx);
    });

    return card;
  }

  /* ==================== DETAIL ==================== */
  function showDetail(idx) {
    currentIdx = idx;
    var g = goals[idx];

    detailIcon.textContent = g.achieved ? '\uD83D\uDD4A' : '\u2022';
    detailText.textContent = g.text;

    var d = new Date(g.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    if (g.achieved) {
      detailFly.style.display = 'none';
      detailGround.style.display = '';
    } else {
      detailFly.style.display = '';
      detailGround.style.display = 'none';
    }

    goalDetail.classList.remove('hidden');
  }

  function hideDetail() {
    goalDetail.classList.add('hidden');
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

  function saveGoal() {
    var text = writeInput.value.trim();
    if (!text) return;

    goals.push({
      text: text,
      achieved: false,
      timestamp: Date.now()
    });
    save();
    closeWrite();
    render();
  }

  /* ==================== FLY / GROUND ==================== */
  function setFree() {
    if (currentIdx < 0) return;
    goals[currentIdx].achieved = true;
    save();
    hideDetail();
    render();
  }

  function backToWire() {
    if (currentIdx < 0) return;
    goals[currentIdx].achieved = false;
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
  writeSave.addEventListener('click', saveGoal);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveGoal();
    }
  });

  detailClose.addEventListener('click', hideDetail);
  goalDetail.addEventListener('click', function (e) {
    if (e.target === goalDetail) hideDetail();
  });
  detailFly.addEventListener('click', setFree);
  detailGround.addEventListener('click', backToWire);

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
