/* ============================================================
   PARAMPARA — the unbroken chain
   Seven generations of sacrifice, told in second person
   ============================================================ */

(function () {
  'use strict';

  var GENERATIONS = [
    {
      depth: 'Seven generations ago',
      story: "A woman you will never know woke before dawn to carry water. Five miles, every day, with a clay pot balanced on her head. She did not complain. She did not write about it. She simply walked, because her children needed to drink.",
      sacrifice: "Her body. Her youth. The hours that could have been her own. She gave them to the road and the river and the pot on her head.",
      gift: "Her children survived. They grew strong enough to dream of something beyond the well."
    },
    {
      depth: 'Six generations ago',
      story: "Her son worked fields that did not belong to him. He bent his back under a sun that did not care whether he lived or died. He saved a handful of coins each season \u2014 not for himself, but for a future he would not live to see.",
      sacrifice: "His freedom. His body bent until it could not straighten. His name, which history did not bother to record.",
      gift: "His son did not have to work the same fields. His coins bought a year of school."
    },
    {
      depth: 'Five generations ago',
      story: "That son walked to a schoolhouse three villages away. He was the first in his family to read. The other children laughed at his clothes. He sat in the back and learned anyway, because he understood something they did not: that letters were doors.",
      sacrifice: "His pride. The comfort of belonging. The years he spent being the outsider so that his children would not have to be.",
      gift: "He could read contracts. He could write letters. He moved his family out of the village and into a town."
    },
    {
      depth: 'Four generations ago',
      story: "His daughter married a man who built things with his hands. They opened a small shop. She kept the books. He kept the shelves stocked. They argued about money every month and agreed about their children every day: they would go further.",
      sacrifice: "Sleep. Security. The knowledge that one bad season could take everything. They lived on the edge so their children could live in the center.",
      gift: "Their son went to university. The first in the family to hold a degree."
    },
    {
      depth: 'Three generations ago',
      story: "That son became an engineer. He designed things that would outlast him. He married a teacher. Together, they filled their home with books and expectations. They were strict because they knew what the alternative looked like.",
      sacrifice: "Tenderness. They were so focused on building the future that they sometimes forgot to soften the present. Their children grew up disciplined and slightly afraid.",
      gift: "Their children had choices. Not just one path, but many. For the first time in the chain, the next generation could choose."
    },
    {
      depth: 'Two generations ago',
      story: "One of those children \u2014 your grandfather or grandmother \u2014 chose to leave home. They moved to a city, or across an ocean, carrying a suitcase and an accent and a determination that looked, from the outside, like stubbornness.",
      sacrifice: "Home. Language. The food that tasted like childhood. Friends who understood without explanation. They traded belonging for opportunity.",
      gift: "Their children grew up in a world with more doors than any generation before them had ever seen."
    },
    {
      depth: 'One generation ago',
      story: "Your father. He left his country so you could have choices he never had. He took work that was beneath his education. He learned customs that were not his own. He sat alone in apartments that did not feel like home, and he called you on the phone and pretended everything was fine.",
      sacrifice: "His comfort. His culture. The ease of being understood. The years he spent building a bridge between two worlds so you could walk across it without looking down.",
      gift: "You. You are what he built. You are the reason the chain held."
    }
  ];

  /* ---------- state ---------- */
  var state = {
    current: 0,
    phase: 'story' // story -> sacrifice -> gift -> next
  };

  /* ---------- DOM ---------- */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var engine         = document.getElementById('engine');
  var chainContainer = document.getElementById('chainContainer');
  var generationCard = document.getElementById('generationCard');
  var genDepth       = document.getElementById('genDepth');
  var genStory       = document.getElementById('genStory');
  var genSacrifice   = document.getElementById('genSacrifice');
  var sacrificeText  = document.getElementById('sacrificeText');
  var genGift        = document.getElementById('genGift');
  var giftText       = document.getElementById('giftText');
  var nextBtn        = document.getElementById('nextBtn');
  var summit         = document.getElementById('summit');
  var summitChain    = document.getElementById('summitChain');
  var restartBtn     = document.getElementById('restartBtn');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ---------- build chain ---------- */
  function buildChain() {
    chainContainer.innerHTML = '';
    for (var i = 0; i < GENERATIONS.length; i++) {
      if (i > 0) {
        var wire = document.createElement('div');
        wire.className = 'chain-wire';
        chainContainer.appendChild(wire);
      }
      var link = document.createElement('div');
      link.className = 'chain-link';
      link.textContent = (i + 1);
      if (i < state.current) link.classList.add('done');
      if (i === state.current) link.classList.add('active');
      chainContainer.appendChild(link);
    }
  }

  /* ---------- render generation ---------- */
  function showGeneration() {
    var g = GENERATIONS[state.current];
    genDepth.textContent = g.depth;
    genStory.textContent = g.story;
    sacrificeText.textContent = g.sacrifice;
    giftText.textContent = g.gift;

    genSacrifice.classList.add('hidden');
    genGift.classList.add('hidden');
    state.phase = 'sacrifice';
    nextBtn.textContent = 'what they gave up';

    buildChain();

    generationCard.style.animation = 'none';
    void generationCard.offsetWidth;
    generationCard.style.animation = 'fadeIn 0.6s ease';
  }

  function advance() {
    if (state.phase === 'sacrifice') {
      genSacrifice.classList.remove('hidden');
      state.phase = 'gift';
      nextBtn.textContent = 'what it made possible';
    } else if (state.phase === 'gift') {
      genGift.classList.remove('hidden');
      state.phase = 'next';
      if (state.current < GENERATIONS.length - 1) {
        nextBtn.textContent = 'next link \u2192';
      } else {
        nextBtn.textContent = 'the summit';
      }
    } else if (state.phase === 'next') {
      if (state.current < GENERATIONS.length - 1) {
        state.current++;
        showGeneration();
        /* scroll to top of engine */
        engine.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showSummit();
      }
    }
  }

  function showSummit() {
    engine.classList.add('hidden');
    summit.classList.remove('hidden');

    summitChain.innerHTML = '';
    for (var i = 0; i < GENERATIONS.length; i++) {
      var dot = document.createElement('div');
      dot.className = 'summit-dot';
      summitChain.appendChild(dot);
    }
    /* the "you" dot */
    var youDot = document.createElement('div');
    youDot.className = 'summit-dot';
    summitChain.appendChild(youDot);
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      showGeneration();
    }, 1200);
  });

  nextBtn.addEventListener('click', advance);

  restartBtn.addEventListener('click', function () {
    state.current = 0;
    state.phase = 'story';
    summit.classList.add('hidden');
    engine.classList.remove('hidden');
    showGeneration();
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
