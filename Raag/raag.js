/* ============================================================
   RAAG — the melody
   The songs that are the soundtrack of your life
   ============================================================ */

(function () {
  'use strict';

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var main         = document.getElementById('main');
  var songsEl      = document.getElementById('songs');
  var songsEmpty   = document.getElementById('songsEmpty');
  var addBtn       = document.getElementById('addBtn');
  var writeView    = document.getElementById('writeView');
  var writeName    = document.getElementById('writeName');
  var writeArtist  = document.getElementById('writeArtist');
  var writeInput   = document.getElementById('writeInput');
  var writeCancel  = document.getElementById('writeCancel');
  var writeSave    = document.getElementById('writeSave');
  var detailView   = document.getElementById('detailView');
  var detailName   = document.getElementById('detailName');
  var detailArtist = document.getElementById('detailArtist');
  var detailText   = document.getElementById('detailText');
  var detailDate   = document.getElementById('detailDate');
  var detailClose  = document.getElementById('detailClose');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var STORE_KEY = 'yatra-raag-songs';
  var songs = [];

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) songs = JSON.parse(raw);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(songs)); }
    catch (e) {}
  }

  /* ==================== RENDER ==================== */
  function render() {
    songsEl.innerHTML = '';

    if (songs.length === 0) {
      songsEmpty.classList.remove('hidden');
      return;
    }

    songsEmpty.classList.add('hidden');

    songs.slice().reverse().forEach(function (s) {
      var card = document.createElement('div');
      card.className = 'song-card';

      var note = document.createElement('div');
      note.className = 'song-note';
      note.textContent = '\u266A';
      card.appendChild(note);

      var name = document.createElement('div');
      name.className = 'song-name';
      name.textContent = s.name;
      card.appendChild(name);

      if (s.artist) {
        var artist = document.createElement('div');
        artist.className = 'song-artist';
        artist.textContent = s.artist;
        card.appendChild(artist);
      }

      if (s.memory) {
        var memory = document.createElement('p');
        memory.className = 'song-memory';
        memory.textContent = s.memory;
        card.appendChild(memory);
      }

      card.addEventListener('click', function () { showDetail(s); });
      songsEl.appendChild(card);
    });
  }

  /* ==================== DETAIL ==================== */
  function showDetail(s) {
    detailName.textContent = s.name;
    detailArtist.textContent = s.artist || '';
    detailText.textContent = s.memory || '';
    var d = new Date(s.timestamp);
    detailDate.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    detailView.classList.remove('hidden');
  }

  function hideDetail() { detailView.classList.add('hidden'); }

  /* ==================== WRITE ==================== */
  function openWrite() {
    writeName.value = '';
    writeArtist.value = '';
    writeInput.value = '';
    writeView.classList.remove('hidden');
    setTimeout(function () { writeName.focus(); }, 100);
  }

  function closeWrite() { writeView.classList.add('hidden'); }

  function saveSong() {
    var name = writeName.value.trim();
    if (!name) return;
    var artist = writeArtist.value.trim();
    var memory = writeInput.value.trim();
    songs.push({ name: name, artist: artist, memory: memory, timestamp: Date.now() });
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
  writeSave.addEventListener('click', saveSong);
  writeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveSong(); }
  });

  detailClose.addEventListener('click', hideDetail);
  detailView.addEventListener('click', function (e) { if (e.target === detailView) hideDetail(); });

  navAbout.addEventListener('click', openAbout);
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) { if (e.target === aboutOverlay) closeAbout(); });

})();
