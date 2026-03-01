/* ============================================================
   YATRA NAVIGATION — cross-experience navigation drawer
   Injected into all experience pages and the landing page.
   Zero dependencies. Uses host page CSS custom properties.
   ============================================================ */

(function () {
  'use strict';

  /* ==================== EXPERIENCE DATA ==================== */
  var SECTIONS = [
    {
      title: 'The Foundation',
      items: [
        ['GrowingUpStrong', 'Growing Up Strong', ''],
        ['Parampara', 'Parampar\u0101', 'the unbroken chain']
      ]
    },
    {
      title: 'Inner Work',
      items: [
        ['SatiGarden', 'Sati', 'mindful awareness'],
        ['Mala', 'M\u0101l\u0101', '108 beads'],
        ['Dharma', 'Dharma', 'the compass'],
        ['Pratibimba', 'Pratibimba', 'the reflection'],
        ['Rasa', 'Rasa', 'the nine emotions'],
        ['Sparsha', 'Sparsha', 'where feelings live'],
        ['Stuti', 'Stuti', 'praise'],
        ['Nidra', 'Nidr\u0101', 'the letting go'],
        ['Sahasa', 'S\u0101hasa', 'courage'],
        ['Prana', 'Pr\u0101\u1E47a', 'breath'],
        ['Dhairya', 'Dhairya', 'patience'],
        ['Viveka', 'Viveka', 'discernment'],
        ['Swabhava', 'Svabh\u0101va', 'true nature'],
        ['Mauna', 'Mauna', 'silence'],
        ['Daya', 'Day\u0101', 'self-compassion'],
        ['Sahaya', 'Sah\u0101ya', 'asking for help'],
        ['Upeksha', 'Upek\u1E63\u0101', 'equanimity'],
        ['Abhaya', 'Abhaya', 'fearlessness'],
        ['Shraddha', '\u015Araddh\u0101', 'faith in yourself']
      ]
    },
    {
      title: 'Seeing Others',
      items: [
        ['Drishti', 'D\u1E5B\u1E63\u1E6Di', 'the eyes of others'],
        ['Shruti', '\u015Aruti', 'that which is heard'],
        ['Karma', 'Karma', 'the ripple'],
        ['Katha', 'Kath\u0101', 'the story'],
        ['Shabda', 'Shabda', 'the weight of words'],
        ['Maitri', 'Maitr\u012B', 'loving-kindness'],
        ['Ahimsa', 'Ahi\u1E43s\u0101', 'non-harm'],
        ['Sakhi', 'Sakh\u012B', 'friendship'],
        ['Seva', 'Sev\u0101', 'selfless service']
      ]
    },
    {
      title: 'Healing',
      items: [
        ['Kintsugi', 'Kintsugi', 'golden repair'],
        ['Agni', 'Agni', 'the sacred fire'],
        ['Setu', 'Setu', 'the bridge'],
        ['Sangam', 'Sangam', 'the confluence'],
        ['Anitya', 'Anitya', 'impermanence'],
        ['Kshama', 'Kshama', 'forgiveness'],
        ['Pratyaya', 'Pratyaya', 'trust'],
        ['Pratiksha', 'Prat\u012Bk\u1E63\u0101', 'waiting']
      ]
    },
    {
      title: 'Growing',
      items: [
        ['Smriti', 'Sm\u1E5Bti', 'that which is remembered'],
        ['Vana', 'Vana', 'the forest'],
        ['Leela', 'L\u012Bl\u0101', 'divine play'],
        ['Akasha', '\u0100k\u0101sha', 'the sky'],
        ['Samay', 'Samay', 'time'],
        ['Taal', 'T\u0101l', 'rhythm'],
        ['Prithvi', 'P\u1E5Bthiv\u012B', 'earth'],
        ['Utsaha', 'Uts\u0101ha', 'hope'],
        ['Vinoda', 'Vinoda', 'lightness'],
        ['Santosha', 'Santo\u1E63a', 'contentment'],
        ['Sthairya', 'Sthairya', 'steadiness'],
        ['Sankalpa', 'Sa\u1E45kalpa', 'sacred resolve']
      ]
    },
    {
      title: 'Your Space',
      items: [
        ['Taara', 'T\u0101r\u0101', 'your sky'],
        ['Akshara', 'Akshara', 'the unsent letter'],
        ['Dhvani', 'Dhvani', 'sound sanctuary'],
        ['Darpan', 'Darpa\u1E47', 'the mirror'],
        ['Kavya', 'K\u0101vya', 'the poem within'],
        ['Rangoli', 'Rangoli', 'sacred patterns'],
        ['Chaaya', 'Ch\u0101y\u0101', 'the shadow'],
        ['Sutra', 'S\u016Btra', 'the thread'],
        ['Jugnu', 'Jugnu', 'the firefly jar'],
        ['Sapna', 'Sapna', 'the dream journal']
      ]
    }
  ];

  /* ==================== DETECT CONTEXT ==================== */
  var path = window.location.pathname;
  var pathParts = path.replace(/\/+$/, '').split('/');
  var lastDir = pathParts[pathParts.length - 1] || '';

  if (lastDir === 'index.html') {
    lastDir = pathParts[pathParts.length - 2] || '';
  }

  var allDirs = [];
  SECTIONS.forEach(function (s) {
    s.items.forEach(function (item) {
      allDirs.push(item[0]);
    });
  });

  var isLanding = allDirs.indexOf(lastDir) === -1;
  var currentDir = isLanding ? '' : lastDir;
  var basePath = isLanding ? '' : '../';

  /* track visit for Taara journey map */
  if (currentDir) {
    try { localStorage.setItem('yatra-visited-' + currentDir, '' + Date.now()); } catch (e) {}
  }

  /* ==================== SVG ICONS ==================== */
  var GRID_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<rect x="3" y="3" width="7" height="7" rx="1"/>' +
    '<rect x="14" y="3" width="7" height="7" rx="1"/>' +
    '<rect x="3" y="14" width="7" height="7" rx="1"/>' +
    '<rect x="14" y="14" width="7" height="7" rx="1"/>' +
    '</svg>';

  var HOME_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/>' +
    '</svg>';

  /* ==================== BUILD OVERLAY ==================== */
  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'yatra-nav-overlay';
    overlay.id = 'yatraNavOverlay';

    var card = document.createElement('div');
    card.className = 'yatra-nav-card';

    /* close */
    var closeBtn = document.createElement('button');
    closeBtn.className = 'yatra-nav-close';
    closeBtn.innerHTML = '\u00d7';
    closeBtn.setAttribute('aria-label', 'close navigation');
    card.appendChild(closeBtn);

    /* header */
    var header = document.createElement('div');
    header.className = 'yatra-nav-header';
    var h2 = document.createElement('h2');
    h2.className = 'yatra-nav-title';
    h2.textContent = 'Yatra';
    header.appendChild(h2);
    var sub = document.createElement('p');
    sub.className = 'yatra-nav-sub';
    sub.textContent = 'the journey \u2014 60 experiences';
    header.appendChild(sub);
    card.appendChild(header);

    /* home link */
    var homeLink = document.createElement('a');
    homeLink.className = 'yatra-nav-home' + (isLanding ? ' current' : '');
    homeLink.href = basePath + 'index.html';
    homeLink.innerHTML = HOME_ICON + '<span>Home</span>';
    card.appendChild(homeLink);

    /* sections */
    SECTIONS.forEach(function (section) {
      var sectionEl = document.createElement('div');
      sectionEl.className = 'yatra-nav-section';

      var titleEl = document.createElement('div');
      titleEl.className = 'yatra-nav-section-title';
      titleEl.textContent = section.title;
      sectionEl.appendChild(titleEl);

      var listEl = document.createElement('ul');
      listEl.className = 'yatra-nav-list';

      section.items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'yatra-nav-item';

        var a = document.createElement('a');
        a.className = 'yatra-nav-link' + (item[0] === currentDir ? ' current' : '');
        a.href = basePath + item[0] + '/index.html';

        var nameSpan = document.createElement('span');
        nameSpan.className = 'yatra-nav-link-name';
        nameSpan.textContent = item[1];
        a.appendChild(nameSpan);

        if (item[2]) {
          var subSpan = document.createElement('span');
          subSpan.className = 'yatra-nav-link-sub';
          subSpan.textContent = item[2];
          a.appendChild(subSpan);
        }

        li.appendChild(a);
        listEl.appendChild(li);
      });

      sectionEl.appendChild(listEl);
      card.appendChild(sectionEl);
    });

    overlay.appendChild(card);

    closeBtn.addEventListener('click', function () { closeOverlay(); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeOverlay();
    });

    return overlay;
  }

  /* ==================== BUILD TRIGGER ==================== */
  function buildTrigger() {
    var btn = document.createElement('button');
    btn.className = 'yatra-nav-trigger';
    btn.setAttribute('aria-label', 'explore all experiences');
    btn.setAttribute('title', 'explore all experiences');
    btn.innerHTML = GRID_ICON;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openOverlay();
    });

    return btn;
  }

  /* ==================== OPEN / CLOSE ==================== */
  var overlay = null;

  function openOverlay() {
    if (!overlay) {
      overlay = buildOverlay();
      document.body.appendChild(overlay);
    }
    void overlay.offsetHeight;
    overlay.classList.add('visible');

    var cur = overlay.querySelector('.yatra-nav-link.current');
    if (cur) {
      setTimeout(function () {
        cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 100);
    }

    document.addEventListener('keydown', handleEsc);
  }

  function closeOverlay() {
    if (overlay) overlay.classList.remove('visible');
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(e) {
    if (e.key === 'Escape' || e.keyCode === 27) closeOverlay();
  }

  /* ==================== INJECT ==================== */
  function init() {
    var trigger = buildTrigger();

    if (isLanding) {
      var wrap = document.createElement('div');
      wrap.className = 'yatra-nav-landing-float';
      wrap.appendChild(trigger);
      document.body.appendChild(wrap);
    } else {
      var navFloat = document.getElementById('navFloat');
      var navWhisper = document.getElementById('navWhisper');
      var target = navFloat || navWhisper;

      if (target) {
        target.insertBefore(trigger, target.firstChild);
      } else {
        var wrap = document.createElement('div');
        wrap.className = 'yatra-nav-landing-float';
        wrap.style.opacity = '1';
        wrap.appendChild(trigger);
        document.body.appendChild(wrap);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
