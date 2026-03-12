/* ============================================================
   TAARA — your sky
   Constellation map of every experience in the journey
   ============================================================ */

(function () {
  'use strict';

  /* ==================== EXPERIENCE DATA ==================== */
  var SECTIONS = [
    {
      title: 'The Foundation', cx: 50, cy: 9,
      items: [
        ['GrowingUpStrong', 'Growing Up Strong', ''],
        ['Parampara', 'Parampar\u0101', 'the unbroken chain']
      ]
    },
    {
      title: 'Inner Work', cx: 24, cy: 36,
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
      title: 'Seeing Others', cx: 78, cy: 32,
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
      title: 'Healing', cx: 24, cy: 70,
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
      title: 'Growing', cx: 76, cy: 68,
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
      title: 'Your Space', cx: 50, cy: 92,
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
        ['Chaal', 'Ch\u0101l', 'the move']
      ]
    }
  ];

  /* ==================== DOM ==================== */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var skyView      = document.getElementById('skyView');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var starField    = document.getElementById('starField');
  var linesSvg     = document.getElementById('linesSvg');
  var tooltip      = document.getElementById('tooltip');
  var statsEl      = document.getElementById('stats');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  /* ==================== STATE ==================== */
  var allStars = [];
  var animFrame = null;

  /* ==================== VISIT CHECK ==================== */
  function isVisited(dir) {
    try { return !!localStorage.getItem('yatra-visited-' + dir); }
    catch (e) { return false; }
  }

  /* ==================== LAYOUT ==================== */
  var GA = 2.39996323; /* golden angle in radians */

  function computeLayout() {
    allStars = [];

    SECTIONS.forEach(function (sec) {
      var n = sec.items.length;
      var maxR = n <= 2 ? 3.5 : Math.min(14, 3.5 + n * 0.52);

      sec.items.forEach(function (item, i) {
        var x, y;

        if (n === 1) {
          x = sec.cx;
          y = sec.cy;
        } else if (n === 2) {
          x = sec.cx + (i === 0 ? -3 : 3);
          y = sec.cy;
        } else {
          var angle = i * GA;
          var r = maxR * Math.sqrt((i + 0.5) / n);
          x = sec.cx + r * Math.cos(angle);
          y = sec.cy + r * Math.sin(angle);
        }

        /* clamp to safe area */
        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        allStars.push({
          x: x, y: y,
          dir: item[0], name: item[1], sub: item[2],
          sectionTitle: sec.title,
          visited: isVisited(item[0])
        });
      });
    });
  }

  /* ==================== BUILD SKY ==================== */
  function buildSky() {
    starField.innerHTML = '';
    while (linesSvg.firstChild) linesSvg.removeChild(linesSvg.firstChild);

    var idx = 0;

    SECTIONS.forEach(function (sec) {
      var n = sec.items.length;
      var secStars = allStars.slice(idx, idx + n);
      idx += n;

      /* constellation lines */
      for (var i = 0; i < secStars.length - 1; i++) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', secStars[i].x);
        line.setAttribute('y1', secStars[i].y);
        line.setAttribute('x2', secStars[i + 1].x);
        line.setAttribute('y2', secStars[i + 1].y);
        linesSvg.appendChild(line);
      }

      /* section label */
      var topMost = sec.cy;
      secStars.forEach(function (s) { if (s.y < topMost) topMost = s.y; });

      var label = document.createElement('div');
      label.className = 'section-label';
      label.textContent = sec.title;
      label.style.left = sec.cx + '%';
      label.style.top = Math.max(1, topMost - 4) + '%';
      starField.appendChild(label);
    });

    /* star elements */
    allStars.forEach(function (star) {
      var a = document.createElement('a');
      a.className = 'star' + (star.visited ? ' visited' : '');
      a.href = '../' + star.dir + '/index.html';
      a.style.left = star.x + '%';
      a.style.top = star.y + '%';
      a.setAttribute('aria-label', star.name + (star.sub ? ' \u2014 ' + star.sub : ''));

      a.addEventListener('mouseenter', function () { showTooltip(star); });
      a.addEventListener('mouseleave', hideTooltip);
      a.addEventListener('focus', function () { showTooltip(star); });
      a.addEventListener('blur', hideTooltip);

      starField.appendChild(a);
    });

    updateStats();
  }

  /* ==================== TOOLTIP ==================== */
  function showTooltip(star) {
    var html = '<strong>' + star.name + '</strong>';
    if (star.sub) html += '<span class="tt-sub">' + star.sub + '</span>';
    tooltip.innerHTML = html;
    tooltip.style.left = star.x + '%';
    tooltip.style.top = star.y + '%';
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  /* ==================== STATS ==================== */
  function updateStats() {
    var lit = 0;
    allStars.forEach(function (s) { if (s.visited) lit++; });
    var total = allStars.length;

    if (lit === total && total > 0) {
      statsEl.innerHTML = 'All ' + total + ' stars alight<br><em>Your sky is full. You have traveled far.</em>';
      statsEl.classList.add('complete');
    } else {
      statsEl.textContent = lit + ' of ' + total + ' stars alight';
      statsEl.classList.remove('complete');
    }
  }

  /* ==================== CANVAS BACKGROUND ==================== */
  var bgDots = [];

  function initDots() {
    bgDots = [];
    for (var i = 0; i < 160; i++) {
      bgDots.push({
        px: Math.random(),
        py: Math.random(),
        r: Math.random() * 0.6 + 0.1,
        alpha: Math.random() * 0.22 + 0.03,
        phase: Math.random() * 6.28,
        speed: Math.random() * 0.02 + 0.005
      });
    }
  }

  function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }

  function animateBg() {
    ctx.fillStyle = '#060610';
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    var t = performance.now() * 0.001;
    var w = bgCanvas.width;
    var h = bgCanvas.height;

    for (var i = 0; i < bgDots.length; i++) {
      var d = bgDots[i];
      var a = d.alpha * (0.35 + 0.65 * Math.sin(d.phase + t * d.speed * 8));
      ctx.beginPath();
      ctx.arc(d.px * w, d.py * h, d.r, 0, 6.28);
      ctx.fillStyle = 'rgba(160,170,205,' + a + ')';
      ctx.fill();
    }

    animFrame = requestAnimationFrame(animateBg);
  }

  /* ==================== EVENTS ==================== */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      skyView.classList.remove('hidden');
      navFloat.classList.add('visible');
      resizeCanvas();
      initDots();
      computeLayout();
      buildSky();
      animateBg();
    }, 1200);
  });

  window.addEventListener('resize', function () {
    if (!skyView.classList.contains('hidden')) {
      resizeCanvas();
    }
  });

  /* about */
  navAbout.addEventListener('click', function () {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  });

  function closeAbout() {
    aboutOverlay.classList.remove('visible');
    setTimeout(function () { aboutOverlay.classList.add('hidden'); }, 400);
  }

  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function (e) {
    if (e.target === aboutOverlay) closeAbout();
  });

})();
