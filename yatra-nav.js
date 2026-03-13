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
        ['Sapna', 'Sapna', 'the dream journal'],
        ['Kalpana', 'Kalpan\u0101', 'the imagination'],
        ['Bodhi', 'Bodhi', 'the awakening'],
        ['Rahasya', 'Rahasya', 'the secret'],
        ['Prashna', 'Prashna', 'the question'],
        ['Chitta', 'Chitta', 'the mind-canvas'],
        ['Udaan', 'Ud\u0101n', 'the flight'],
        ['Hasya', 'Hasya', 'the laugh'],
        ['Ghar', 'Ghar', 'home'],
        ['Ankur', 'Ankur', 'the sprout'],
        ['Shloka', 'Shloka', 'the verse'],
        ['Rina', 'Rina', 'the debt of love'],
        ['Vismaya', 'Vismaya', 'wonder'],
        ['Parva', 'Parva', 'the chapter'],
        ['Sahaj', 'Sahaj', 'the natural'],
        ['Samvad', 'Samv\u0101d', 'the conversation'],
        ['Chhap', 'Chhap', 'the imprint'],
        ['Niti', 'Niti', 'the rule you live by'],
        ['Pratidaan', 'Pratid\u0101n', 'the gift returned'],
        ['Pariksha', 'Par\u012Bksh\u0101', 'the real test'],
        ['Sthan', 'Sth\u0101n', 'the place'],
        ['Ritu', '\u1E5Atu', 'the season within'],
        ['Ichha', 'Icch\u0101', 'the wish'],
        ['Gandha', 'Gandha', 'the scent'],
        ['Aabhaar', '\u0100abh\u0101r', 'gratitude'],
        ['Raag', 'R\u0101g', 'the melody'],
        ['Pratham', 'Pratham', 'the first time'],
        ['Sharira', 'Shar\u012Bra', 'the body'],
        ['Swad', 'Sw\u0101d', 'the taste'],
        ['Prani', 'Pr\u0101\u1E47\u012B', 'the creature'],
        ['Guru', 'Guru', 'the teacher'],
        ['Rekha', 'Rekh\u0101', 'the boundary'],
        ['Rang', 'Rang', 'the colour'],
        ['Sangraha', 'Sa\u1E45graha', 'the collection'],
        ['Vachan', 'Vachan', 'the promise'],
        ['Bhool', 'Bh\u016Bl', 'the mistake'],
        ['Megha', 'Megha', 'the cloud'],
        ['Nayak', 'N\u0101yak', 'the hero'],
        ['Jeet', 'J\u012Bt', 'the victory'],
        ['Charya', 'Chary\u0101', 'the ritual'],
        ['Pakvan', 'Pakv\u0101n', 'the recipe'],
        ['Utsav', 'Utsav', 'the celebration'],
        ['Safar', 'Safar', 'the journey'],
        ['Kala', 'Kal\u0101', 'the art'],
        ['Virah', 'Virah', 'the longing'],
        ['Chitra', 'Chitra', 'the picture'],
        ['Khoj', 'Khoj', 'the discovery'],
        ['Ehsaas', 'Ehs\u0101s', 'the unnamed feeling'],
        ['Pehchaan', 'Pehch\u0101n', 'the identity'],
        ['Dwar', 'Dw\u0101r', 'the door'],
        ['Awaaz', '\u0100w\u0101z', 'the voice'],
        ['Gehrai', 'Gehr\u0101\u012B', 'the depth'],
        ['Pankh', 'Pankh', 'the wing'],
        ['Silsila', 'Silsil\u0101', 'the chain'],
        ['Keelak', 'K\u012Blak', 'the anchor'],
        ['Parchhaayi', 'Parchh\u0101y\u012B', 'the reflection in others'],
        ['Antaraal', 'Antar\u0101l', 'the space between'],
        ['Chhaap', 'Chh\u0101p', 'the imprint'],
        ['Gunja', 'G\u016Bnj', 'the echo'],
        ['Dehleez', 'Dehl\u012Bz', 'the threshold'],
        ['Neev', 'N\u012Bv', 'the foundation'],
        ['Mod', 'Mo\u1E5B', 'the turn'],
        ['Seedhi', 'S\u012Bdh\u012B', 'the staircase'],
        ['Trishna', 'Trishn\u0101', 'the thirst'],
        ['Pehlu', 'Pehl\u016B', 'the facet'],
        ['Gathri', 'Ga\u1E6Dhr\u012B', 'the bundle'],
        ['Dhund', 'Dhund', 'the fog'],
        ['Jheel', 'Jh\u012Bl', 'the lake'],
        ['Angaara', 'Ang\u0101r\u0101', 'the ember'],
        ['Rishta', 'Risht\u0101', 'the bond'],
        ['Baans', 'B\u0101ns', 'the bamboo'],
        ['Raasta', 'R\u0101st\u0101', 'the path'],
        ['Tanha', 'Tanh\u0101', 'the solitude'],
        ['Gilhari', 'Gilhar\u012B', 'the squirrel'],
        ['Lehren', 'Lehren', 'the waves'],
        ['Beej', 'B\u012Bj', 'the seed'],
        ['Panaah', 'Pan\u0101h', 'the refuge'],
        ['Aahat', '\u0100hat', 'the footstep'],
        ['Titli', 'Titl\u012B', 'the butterfly'],
        ['Naqsha', 'Naqsh\u0101', 'the map'],
        ['Koshish', 'Koshish', 'the attempt'],
        ['Dhaga', 'Dh\u0101g\u0101', 'the thread'],
        ['Thakan', 'Thak\u0101n', 'the tiredness'],
        ['Deewar', 'D\u012Bv\u0101r', 'the wall'],
        ['Aasman', '\u0100sm\u0101n', 'the sky'],
        ['Gali', 'Gal\u012B', 'the lane'],
        ['Roshni', 'Roshn\u012B', 'the light'],
        ['Dhaara', 'Dh\u0101r\u0101', 'the stream'],
        ['Darr', 'Darr', 'the fear'],
        ['Tohfa', 'Tohf\u0101', 'the gift'],
        ['Zid', 'Zid', 'the stubbornness'],
        ['Gehraai', 'Gehr\u0101\u012B', 'the depth'],
        ['Lamha', 'Lamh\u0101', 'the moment'],
        ['Umeed', 'Um\u012Bd', 'the hope'],
        ['Chaabi', 'Ch\u0101b\u012B', 'the key'],
        ['Parcham', 'Parcham', 'the flag'],
        ['Baadal', 'B\u0101dal', 'the cloud'],
        ['Chingaari', 'Ching\u0101r\u012B', 'the spark'],
        ['Pehel', 'Pehel', 'the initiative'],
        ['Jugaad', 'Jug\u0101\u1E0D', 'the improvisation'],
        ['Saans', 'S\u0101ns', 'the breath'],
        ['Bheed', 'Bh\u012B\u1E0D', 'the crowd'],
        ['Phool', 'Ph\u016Bl', 'the flower'],
        ['Sach', 'Sach', 'the truth'],
        ['Aadat', '\u0100dat', 'the habit'],
        ['Afsana', 'Afs\u0101n\u0101', 'the tale'],
        ['Dhoop', 'Dh\u016Bp', 'the sunlight'],
        ['Chhat', 'Chhat', 'the roof'],
        ['Gufa', 'Guf\u0101', 'the cave'],
        ['Patang', 'Patang', 'the kite'],
        ['Mitti', 'Mi\u1E6D\u1E6D\u012B', 'the soil'],
        ['Khidki', 'Khi\u1E0Dk\u012B', 'the window'],
        ['Pukaar', 'Puk\u0101r', 'the call'],
        ['Chaand', 'Ch\u0101nd', 'the moon'],
        ['Dhaal', '\u1E0Ch\u0101l', 'the shield'],
        ['Jharokha', 'Jharokh\u0101', 'the balcony'],
        ['Naav', 'N\u0101v', 'the boat'],
        ['Ghanti', 'Gha\u1E47\u1E6D\u012B', 'the bell'],
        ['Daana', 'D\u0101n\u0101', 'the grain'],
        ['Pehra', 'Pahr\u0101', 'the vigil'],
        ['Girah', 'Girah', 'the knot'],
        ['Thali', 'Th\u0101l\u012B', 'the plate'],
        ['Diya', 'D\u012By\u0101', 'the lamp'],
        ['Pinjra', 'Pinjr\u0101', 'the cage'],
        ['Aangan', '\u0100\u1E45gan', 'the courtyard'],
        ['Lorhi', 'Lor\u012B', 'the lullaby'],
        ['Paani', 'P\u0101n\u012B', 'the water'],
        ['Tukda', '\u1E6Cuk\u1E0D\u0101', 'the fragment'],
        ['Chaal', 'Ch\u0101l', 'the move'],
        ['Seepi', 'S\u012Bp\u012B', 'the shell'],
        ['Duvidha', 'Duvidh\u0101', 'the dilemma'],
        ['Nishaan', 'Nish\u0101n', 'the scar'],
        ['Potli', 'Potl\u012B', 'the pouch'],
        ['Shor', 'Shor', 'the noise'],
        ['Jhula', 'Jh\u016Bl\u0101', 'the swing'],
        ['Khilona', 'Khilaun\u0101', 'the toy'],
        ['Ped', 'Pe\u1E5B', 'the tree'],
        ['Katori', 'Ka\u1E6Dor\u012B', 'the bowl'],
        ['Rangmanch', 'Rangmanch', 'the stage'],
        ['Saheli', 'Sahel\u012B', 'the confidante'],
        ['Chhutti', 'Chhu\u1E6D\u1E6D\u012B', 'the holiday'],
        ['Boli', 'Bol\u012B', 'the tongue'],
        ['Daag', 'D\u0101g', 'the stain'],
        ['Ginti', 'Gint\u012B', 'the counting'],
        ['Manzil', 'Manzil', 'the destination'],
        ['Patthar', 'Patthar', 'the stone'],
        ['Siyahi', 'Siy\u0101h\u012B', 'the ink'],
        ['Parda', 'Pard\u0101', 'the curtain'],
        ['Raakh', 'R\u0101kh', 'the ash'],
        ['Koyla', 'Koyl\u0101', 'the coal'],
        ['Samundar', 'Samundar', 'the ocean'],
        ['Chowk', 'Chowk', 'the crossroads'],
        ['Chiriya', 'Chi\u1E5Biy\u0101', 'the bird'],
        ['Dastaan', 'D\u0101st\u0101n', 'the saga'],
        ['Chauka', 'Chauk\u0101', 'the kitchen'],
        ['Morcha', 'Morch\u0101', 'the stand'],
        ['Khamoshi', 'Kh\u0101mosh\u012B', 'the silence'],
        ['Angoothi', 'Ang\u016Bth\u012B', 'the ring'],
        ['Seema', 'S\u012Bm\u0101', 'the border'],
        ['Dhool', 'Dh\u016Bl', 'the dust'],
        ['Chunaav', 'Chun\u0101v', 'the choice'],
        ['Talaash', 'Tal\u0101sh', 'the search'],
        ['Daud', 'Dau\u1E0D', 'the race'],
        ['Thikana', '\u1E6Chik\u0101n\u0101', 'the address'],
        ['Mela', 'Mel\u0101', 'the fair'],
        ['Barish', 'B\u0101rish', 'the rain'],
        ['Takiya', 'Takiy\u0101', 'the pillow'],
        ['Haath', 'H\u0101th', 'the hand'],
        ['Bijli', 'Bijl\u012B', 'the lightning'],
        ['Ghungroo', 'Ghungr\u016B', 'the anklet bell'],
        ['Basta', 'Bast\u0101', 'the school bag'],
        ['Chaukhat', 'Chaukha\u1E6D', 'the doorframe'],
        ['Gudiya', 'Gu\u1E0Diy\u0101', 'the doll'],
        ['Kanch', 'K\u0101nch', 'the glass'],
        ['Thandak', '\u1E6Chan\u1E0Dak', 'the coolness'],
        ['Kasauti', 'Kasau\u1E6D\u012B', 'the touchstone'],
        ['Palkan', 'Palken', 'the eyelids'],
        ['Musafir', 'Mus\u0101fir', 'the traveller'],
        ['Loha', 'Loh\u0101', 'the iron'],
        ['Teer', 'T\u012Br', 'the arrow'],
        ['Dhuan', 'Dhu\u0101n', 'the smoke'],
        ['Jaal', 'J\u0101l', 'the net'],
        ['Chamak', 'Chamak', 'the shine'],
        ['Boond', 'B\u016Bnd', 'the drop'],
        ['Kharoch', 'Kharonch', 'the scratch'],
        ['Maang', 'M\u0101ng', 'the demand'],
        ['Cheekh', 'Ch\u012Bkh', 'the scream'],
        ['Sannata', 'Sann\u0101\u1E6D\u0101', 'the stillness'],
        ['Daayra', 'D\u0101yr\u0101', 'the circle']
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
    sub.textContent = 'the journey \u2014 248 experiences';
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
