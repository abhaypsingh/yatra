/* ============================================================
   CHHAP — the imprint
   A map of people who shaped who you are becoming
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var main          = document.getElementById('main');
  var imprintsEl    = document.getElementById('imprints');
  var imprintsEmpty = document.getElementById('imprintsEmpty');
  var addBtn        = document.getElementById('addBtn');
  var writeView     = document.getElementById('writeView');
  var writeName     = document.getElementById('writeName');
  var writeRole     = document.getElementById('writeRole');
  var writeInput    = document.getElementById('writeInput');
  var writeCancel   = document.getElementById('writeCancel');
  var writeSave     = document.getElementById('writeSave');
  var detailView    = document.getElementById('detailView');
  var detailInitial = document.getElementById('detailInitial');
  var detailName    = document.getElementById('detailName');
  var detailRole    = document.getElementById('detailRole');
  var detailText    = document.getElementById('detailText');
  var detailDate    = document.getElementById('detailDate');
  var detailClose   = document.getElementById('detailClose');
  var navFloat      = document.getElementById('navFloat');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-chhap-imprints';
  var imprints = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) imprints = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(imprints)); }
    catch (e) {}
  }

  /* ==================== INITIALS ==================== */
  function initials(name) {
    if (!name) return '?';
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /* ==================== RENDER ==================== */
  function render() {
    imprintsEl.innerHTML = '';

    if (imprints.length === 0) {
      imprintsEmpty.classList.remove('hidden');
      return;
    }

    imprintsEmpty.classList.add('hidden');

    imprints.forEach(function (imp) {
      var card = document.createElement('div');
      card.className = 'imprint-card';

      var circle = document.createElement('div');
      circle.className = 'imprint-initial';
      circle.textContent = initials(imp.name);
      card.appendChild(circle);

      var name = document.createElement('p');
      name.className = 'imprint-name';
      name.textContent = imp.name;
      card.appendChild(name);

      if (imp.role) {
        var role = document.createElement('p');
        role.className = 'imprint-role';
        role.textContent = imp.role;
        card.appendChild(role);
      }

      card.addEventListener('click', function () { showDetail(imp); });
      imprintsEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(imp) {
    detailInitial.textContent = initials(imp.name);
    detailName.textContent = imp.name;
    detailRole.textContent = imp.role || '';
    detailRole.style.display = imp.role ? '' : 'none';
    detailText.textContent = imp.imprint;
    var d = new Date(imp.timestamp);
    detailDate.textContent = 'named ' + d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeName.value = '';
    writeRole.value = '';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeName.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveImprint() {
    var name = writeName.value.trim();
    var imprint = writeInput.value.trim();
    if (!name || !imprint) return;
    var role = writeRole.value.trim();
    imprints.push({ name: name, role: role, imprint: imprint, timestamp: Date.now() });
    save();
    closeWrite();
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
      load(); render();
    }, 1200);
  });

  addBtn.addEventListener('click', openWrite);
  writeCancel.addEventListener('click', closeWrite);
  writeSave.addEventListener('click', saveImprint);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveImprint(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
