/* ============================================================
   SMRITI — that which is remembered
   Time capsule letters to your future self
   Sealed until target date, stored in localStorage
   ============================================================ */

(function () {
  'use strict';

  // ==================== STATE ====================
  var selectedAge = null;
  var currentView = 'opening'; // opening, vault, write, read

  // ==================== STORAGE ====================
  function getCapsules() {
    try { return JSON.parse(localStorage.getItem('smriti_capsules') || '[]'); }
    catch (e) { return []; }
  }

  function saveCapsules(capsules) {
    try { localStorage.setItem('smriti_capsules', JSON.stringify(capsules)); }
    catch (e) { /* ignore */ }
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ==================== DATE HELPERS ====================
  function getOpenDate(currentAge, targetAge) {
    var now = new Date();
    var yearsUntil = targetAge - currentAge;
    if (yearsUntil < 1) yearsUntil = 1;
    var openDate = new Date(now.getFullYear() + yearsUntil, now.getMonth(), now.getDate());
    return openDate;
  }

  function isReady(capsule) {
    return new Date() >= new Date(capsule.openDate);
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function timeUntil(dateStr) {
    var now = new Date();
    var target = new Date(dateStr);
    var diff = target - now;

    if (diff <= 0) return 'ready to open';

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var years = Math.floor(days / 365);
    var remainDays = days % 365;
    var months = Math.floor(remainDays / 30);

    var parts = [];
    if (years > 0) parts.push(years + (years === 1 ? ' year' : ' years'));
    if (months > 0) parts.push(months + (months === 1 ? ' month' : ' months'));
    if (years === 0 && months === 0) parts.push(days + (days === 1 ? ' day' : ' days'));

    return parts.join(', ') + ' remaining';
  }

  // ==================== RENDER VAULT ====================
  function renderVault() {
    var capsules = getCapsules();
    var container = document.getElementById('capsules');

    if (capsules.length === 0) {
      container.innerHTML = '<div class="capsules-empty"><p>Your vault is empty.</p><p>Write your first letter to your future self.</p></div>';
      return;
    }

    // Sort: ready first, then by open date
    capsules.sort(function (a, b) {
      var aReady = isReady(a);
      var bReady = isReady(b);
      if (aReady && !bReady) return -1;
      if (!aReady && bReady) return 1;
      return new Date(a.openDate) - new Date(b.openDate);
    });

    var html = '';
    capsules.forEach(function (cap) {
      var ready = isReady(cap);
      html += '<div class="capsule-card" data-id="' + cap.id + '">' +
        '<div class="capsule-left">' +
          '<div class="capsule-age">To me at ' + cap.targetAge + '</div>' +
          '<div class="capsule-date">Written ' + formatDate(cap.writtenDate) + ' (age ' + cap.writtenAge + ')</div>' +
          (ready ? '' : '<div class="capsule-countdown">' + timeUntil(cap.openDate) + '</div>') +
        '</div>' +
        '<span class="capsule-status ' + (ready ? 'ready' : 'sealed') + '">' +
          (ready ? (cap.opened ? 'opened' : 'ready') : 'sealed') +
        '</span>' +
      '</div>';
    });

    container.innerHTML = html;

    // Attach click handlers
    container.querySelectorAll('.capsule-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = this.dataset.id;
        handleCapsuleClick(id);
      });
    });
  }

  function handleCapsuleClick(id) {
    var capsules = getCapsules();
    var cap = capsules.find(function (c) { return c.id === id; });
    if (!cap) return;

    if (isReady(cap)) {
      openCapsule(cap, capsules);
    } else {
      // Sealed — show a gentle message
      var card = document.querySelector('[data-id="' + id + '"]');
      var status = card.querySelector('.capsule-status');
      var original = status.textContent;
      status.textContent = 'not yet...';
      setTimeout(function () { status.textContent = original; }, 1500);
    }
  }

  function openCapsule(cap, capsules) {
    // Mark as opened
    if (!cap.opened) {
      cap.opened = true;
      cap.openedDate = new Date().toISOString();
      saveCapsules(capsules);
    }

    // Show read phase
    showView('read');

    var meta = document.getElementById('readMeta');
    meta.innerHTML =
      '<strong>To: me at ' + cap.targetAge + '</strong><br>' +
      'Written on ' + formatDate(cap.writtenDate) + ', when you were ' + cap.writtenAge + '<br>' +
      'Opened on ' + formatDate(cap.openedDate || new Date().toISOString());

    document.getElementById('readBody').textContent = cap.text;
  }

  // ==================== VIEW MANAGEMENT ====================
  function showView(view) {
    currentView = view;
    document.getElementById('opening').style.display = view === 'opening' ? '' : 'none';
    document.getElementById('vault').classList.toggle('hidden', view !== 'vault');
    document.getElementById('writePhase').classList.toggle('hidden', view !== 'write');
    document.getElementById('readPhase').classList.toggle('hidden', view !== 'read');

    if (view === 'vault') {
      renderVault();
      document.getElementById('navFloat').classList.add('visible');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== WRITE LOGIC ====================
  function initWritePhase() {
    selectedAge = null;
    document.getElementById('writeBody').value = '';
    document.getElementById('sealBtn').disabled = true;
    document.getElementById('writeDate').textContent = '';

    // Reset age buttons
    document.querySelectorAll('.age-btn').forEach(function (btn) {
      btn.classList.remove('selected');
    });

    showView('write');
  }

  function selectAge(age) {
    selectedAge = age;

    // Highlight
    document.querySelectorAll('.age-btn').forEach(function (btn) {
      btn.classList.toggle('selected', parseInt(btn.dataset.age) === age);
    });

    // Calculate open date
    var currentAge = parseInt(document.getElementById('currentAge').value) || 12;
    var openDate = getOpenDate(currentAge, age);
    document.getElementById('writeDate').textContent = 'Opens ' + formatDate(openDate.toISOString());

    checkCanSeal();
  }

  function checkCanSeal() {
    var text = document.getElementById('writeBody').value.trim();
    var canSeal = selectedAge !== null && text.length >= 10;
    document.getElementById('sealBtn').disabled = !canSeal;
  }

  function sealLetter() {
    var text = document.getElementById('writeBody').value.trim();
    if (!text || !selectedAge) return;

    var currentAge = parseInt(document.getElementById('currentAge').value) || 12;
    var openDate = getOpenDate(currentAge, selectedAge);

    var capsule = {
      id: Date.now().toString(),
      text: text,
      writtenAge: currentAge,
      targetAge: selectedAge,
      writtenDate: new Date().toISOString(),
      openDate: openDate.toISOString(),
      opened: false,
      openedDate: null
    };

    var capsules = getCapsules();
    capsules.push(capsule);
    saveCapsules(capsules);

    // Visual feedback
    var btn = document.getElementById('sealBtn');
    btn.textContent = 'sealed \u2713';
    btn.disabled = true;

    setTimeout(function () {
      btn.textContent = 'seal this letter';
      showView('vault');
    }, 1200);
  }

  // ==================== EVENT LISTENERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      showView('vault');
    }, 1200);
  });

  // Write new
  document.getElementById('writeNewBtn').addEventListener('click', initWritePhase);

  // Age selection
  document.querySelectorAll('.age-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectAge(parseInt(this.dataset.age));
    });
  });

  // Body input
  document.getElementById('writeBody').addEventListener('input', checkCanSeal);

  // Prompt chips
  document.querySelectorAll('.prompt-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var body = document.getElementById('writeBody');
      body.value += (body.value ? '\n\n' : '') + this.dataset.prompt + ' ';
      body.focus();
      checkCanSeal();
    });
  });

  // Seal
  document.getElementById('sealBtn').addEventListener('click', sealLetter);

  // Back buttons
  document.getElementById('writeBack').addEventListener('click', function () {
    showView('vault');
  });
  document.getElementById('readBack').addEventListener('click', function () {
    showView('vault');
  });

  // About
  document.getElementById('navAbout').addEventListener('click', function () {
    document.getElementById('aboutOverlay').classList.remove('hidden');
    document.getElementById('aboutOverlay').classList.add('visible');
  });
  document.getElementById('aboutClose').addEventListener('click', function () {
    document.getElementById('aboutOverlay').classList.remove('visible');
    document.getElementById('aboutOverlay').classList.add('hidden');
  });
  document.getElementById('aboutOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('visible');
      this.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('aboutOverlay').classList.remove('visible');
      document.getElementById('aboutOverlay').classList.add('hidden');
    }
  });

})();
