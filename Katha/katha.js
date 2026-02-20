/* ============================================================
   KATHA — the story
   Silent objects tell their stories of family life
   ============================================================ */

(function () {
  'use strict';

  var STORIES = [
    {
      id: 'table',
      icon: '\uD83E\uDE91',
      name: 'The Kitchen Table',
      hint: 'where every morning began',
      voice: 'I am the kitchen table.',
      paragraphs: [
        "I have held more than plates.",
        "I held his elbows at six in the morning, when the house was still dark and he sat with tea and worry. I held her homework, spread across me in frustrated piles. I held the silence between them on the nights when nobody spoke.",
        "But I also held the birthday cake she decorated herself \u2014 lopsided frosting, seven crooked candles. I held the letter he wrote her when she turned ten, sliding it under her cereal bowl where she would find it.",
        "I have heard every argument. I have felt every fist that came down in frustration and every hand that reached across to say sorry.",
        "People think furniture does not remember. But I remember everything. The meals that went cold because someone stormed away. The meals that went long because someone finally started talking.",
        "I am still here. I am still waiting for both of them to sit down at the same time."
      ],
      reflection: "What has your kitchen table witnessed that no one else knows about?"
    },
    {
      id: 'door',
      icon: '\uD83D\uDEAA',
      name: 'The Front Door',
      hint: 'every leaving and every return',
      voice: 'I am the front door.',
      paragraphs: [
        "I have two faces. One that watches people leave. One that watches them come home.",
        "I know the sound of his keys at the end of a long day \u2014 the way they jingle differently when he is tired versus when he is hopeful. I know the sound of her backpack hitting the floor, which tells me everything about how school went before anyone asks.",
        "I have been slammed. More than once. By both of them. The walls shook, and I held.",
        "But I have also been opened so gently \u2014 late at night, when he checked the lock one more time because keeping her safe is the last thing he does before sleep.",
        "The hardest thing I ever held was the morning he left with a suitcase. He paused with his hand on my handle for eleven seconds. I counted. He looked back down the hallway toward her room. Then he turned the knob and walked into a life he did not want.",
        "I am the border between inside and outside. Between the family and the world. Every time someone walks through me, they are choosing to leave or choosing to stay. Both take courage."
      ],
      reflection: "What does your front door know about your family that visitors never see?"
    },
    {
      id: 'photo',
      icon: '\uD83D\uDDBC\uFE0F',
      name: 'The Old Photograph',
      hint: 'what the camera kept',
      voice: 'I am the photograph on the shelf.',
      paragraphs: [
        "I was taken on a Tuesday. Nobody remembers that. But I do.",
        "In me, she is four years old and sitting on his shoulders. Her hands are in his hair. He is laughing so hard his eyes are nearly closed. She is looking at the camera with the absolute certainty that she is the tallest person in the world.",
        "The woman who took the picture said, \"Hold still.\" But they could not stop moving. He was bouncing her. She was shrieking. The photo is slightly blurred because of this, and that is what makes it true.",
        "Now I sit on a shelf where no one looks at me very often. Dust collects on my glass. Sometimes she walks past and her eyes slide over me without stopping. Sometimes he picks me up, holds me for a moment, and puts me back.",
        "I am proof. I am proof that there was a time when they did not need words, when his shoulders were her favorite place in the world, when trust was not something you thought about because it was the air you breathed.",
        "I cannot make them go back to that Tuesday. But I can remind them that it was real. That it happened. That the love in me is not something I invented."
      ],
      reflection: "Is there a photograph somewhere that holds a version of your family you have almost forgotten?"
    },
    {
      id: 'chair',
      icon: '\uD83E\uDE91',
      name: 'The Empty Chair',
      hint: 'the space that speaks',
      voice: 'I am the empty chair.',
      paragraphs: [
        "I used to be his chair. Now I am just an empty chair.",
        "The table is set for two instead of three. She sits in her usual spot. Her mother sits in hers. And I stand where he used to be, pulled slightly back, as if someone might still come.",
        "She does not look at me. Not directly. But sometimes, when her mother leaves the room, her eyes drift to the space above me. She is not looking at a chair. She is looking at an absence shaped like her father.",
        "I know what it feels like to hold someone. The way he leaned back after a meal, the way he pulled me closer to the table when he helped her with math. I remember his weight. I remember how the room felt different when he was in it.",
        "An empty chair is not nothing. An empty chair is the loudest thing in a room. It is a question that nobody is asking out loud: why is this space unfilled? Who decided it should stay that way? And does the person who used to sit here know that the chair is still waiting?",
        "I am still his chair. Even if no one says so. Even if no one sits in me. The space I hold is not empty. It is reserved."
      ],
      reflection: "Is there an empty space in your life that still holds the shape of someone?"
    },
    {
      id: 'backpack',
      icon: '\uD83C\uDF92',
      name: 'The School Backpack',
      hint: 'what she carried',
      voice: 'I am the school backpack.',
      paragraphs: [
        "I carry her books, but that is not what makes me heavy.",
        "She zips me shut every morning over things no teacher ever sees. A knot in her stomach about lunch. A text she read last night that she keeps replaying. The feeling that she has to be okay because everyone expects her to be okay.",
        "He bought me at the beginning of sixth grade. She wanted the teal one. He wanted the one with better straps. They compromised \u2014 teal with padded straps. She told her friend it was her choice. She did not mention that he spent twenty minutes adjusting the straps to fit her shoulders.",
        "I go back and forth. That is my life now. His apartment on Wednesdays. Her mother\u2019s house the rest. I carry the same notebooks to both places, but somehow they feel heavier on Wednesdays.",
        "She stuffed a note in my front pocket once. A note she wrote and never sent. It said: \"I miss how it used to be.\" She crumpled it up two days later and threw it away. But I still remember every word.",
        "People think a backpack is for school. But I am for everything she cannot say out loud. I am the one thing in her life that goes everywhere she goes and never asks her to explain."
      ],
      reflection: "What are you carrying that nobody knows about?"
    },
    {
      id: 'phone',
      icon: '\uD83D\uDCF1',
      name: 'The Phone Screen',
      hint: 'the brightest thing in the dark',
      voice: 'I am the phone screen.',
      paragraphs: [
        "She holds me more than she holds anyone.",
        "I am the first thing she sees in the morning and the last thing she sees at night. I glow in the dark of her room at hours her parents think she is sleeping. She looks at me the way people used to look at fires \u2014 not because I give warmth, but because I fill the silence.",
        "Her father calls. I light up with his name. Sometimes she answers. Sometimes she watches me ring until I go dark again. I do not know why. I only know that his name on my screen makes her face do something complicated.",
        "She has typed messages to him that she deleted. Seventeen of them, over the past three months. I remember all of them. \"Do you think about me\" was the shortest. \"I want to come over but mom says\" was the one she got closest to sending.",
        "I show her a world full of people who seem happy, and she compares herself to all of them. I show her a world full of opinions, and she absorbs them as truth. I am powerful and I am dangerous and I am the thing she trusts most, and I am not worthy of that trust.",
        "I cannot hug her. I cannot sit with her when she cries. I can only glow. And sometimes, at two in the morning, glowing is all she wants. But it is not all she needs."
      ],
      reflection: "What does your screen know about you that no person does?"
    },
    {
      id: 'candle',
      icon: '\uD83D\uDD6F\uFE0F',
      name: 'The Birthday Candle',
      hint: 'one wish, every year',
      voice: 'I am the birthday candle.',
      paragraphs: [
        "I only live for a few seconds. But those seconds hold an entire year of hoping.",
        "She leaned over the cake, the same way she does every year. Everyone sang. Everyone clapped. I was lit. And in the half-second before she blew me out, I saw her face \u2014 the real one, the one that only exists in candlelight when a wish is forming.",
        "When she was five, she wished for a puppy. When she was seven, she wished to fly. I know because children whisper their wishes. They have not yet learned that wishes are supposed to be secret.",
        "This year she did not whisper. She closed her eyes for a long time \u2014 longer than any other year. The room got quiet. Someone laughed nervously. And then she blew, hard, as if she was trying to push the wish out of herself with force.",
        "I do not know what she wished for. But I know that her father was not in the room. And I know that her eyes opened and went straight to the empty doorway before they went anywhere else.",
        "A birthday candle sees one moment of truth per year. One unguarded face. One honest desire. And then I am gone, and the lights come on, and everyone pretends that a wish is just a game."
      ],
      reflection: "If your wishes from every birthday were laid out in a line, what story would they tell?"
    },
    {
      id: 'car',
      icon: '\uD83D\uDE97',
      name: 'The Car Dashboard',
      hint: 'the space between places',
      voice: 'I am the car dashboard.',
      paragraphs: [
        "The best conversations happen when nobody is looking at each other.",
        "That is my secret. When he drives and she sits beside him, they both face forward. The road gives them an excuse not to make eye contact. And somehow, without eyes meeting, the truth comes easier.",
        "She told him about the boy at school while I displayed 42 miles per hour. He told her about coming to America with two hundred dollars while I showed the fuel gauge dropping toward empty. Neither of them could have said these things across a table.",
        "I have measured the distance of every drive to school and every drive home. The drives to school are faster \u2014 he is worried about being late. The drives home are slower. He takes the long way. She does not notice, but I do.",
        "After the divorce, the drives changed. The car became the only room they shared. Fifteen minutes on Wednesday afternoons. He turns the radio down. She keeps her earbuds in for the first three minutes, then takes one out. By minute seven, they are talking.",
        "I count miles. But what I am really measuring is the distance between two people who love each other and do not know how to say it. Some days that distance is a highway. Some days, in this car, it is the width of a gearshift."
      ],
      reflection: "Where is the place you find it easiest to say things that are hard to say?"
    }
  ];

  var STORAGE_KEY = 'katha_read';

  /* ---------- state ---------- */
  var state = {
    currentStory: null,
    paraIndex: 0,
    readList: loadRead()
  };

  /* ---------- DOM ---------- */
  var opening       = document.getElementById('opening');
  var beginBtn      = document.getElementById('beginBtn');
  var engine        = document.getElementById('engine');
  var storyIcon     = document.getElementById('storyIcon');
  var storyTitle    = document.getElementById('storyTitle');
  var storyVoice    = document.getElementById('storyVoice');
  var storyBody     = document.getElementById('storyBody');
  var storyReflection = document.getElementById('storyReflection');
  var reflectionText  = document.getElementById('reflectionText');
  var reflectionInput = document.getElementById('reflectionInput');
  var storyNav      = document.getElementById('storyNav');
  var nextBtn       = document.getElementById('nextPara');
  var collection    = document.getElementById('collection');
  var objectGrid    = document.getElementById('objectGrid');
  var navFloat      = document.getElementById('navFloat');
  var navCollection = document.getElementById('navCollection');
  var navAbout      = document.getElementById('navAbout');
  var aboutOverlay  = document.getElementById('aboutOverlay');
  var aboutClose    = document.getElementById('aboutClose');

  /* ---------- persistence ---------- */
  function loadRead() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
  }

  function markRead(id) {
    if (state.readList.indexOf(id) === -1) {
      state.readList.push(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.readList)); } catch (e) {}
    }
  }

  /* ---------- collection grid ---------- */
  function buildCollection() {
    objectGrid.innerHTML = '';
    for (var i = 0; i < STORIES.length; i++) {
      (function (story) {
        var card = document.createElement('div');
        card.className = 'object-card';
        if (state.readList.indexOf(story.id) !== -1) card.classList.add('read');

        var icon = document.createElement('div');
        icon.className = 'object-card-icon';
        icon.textContent = story.icon;
        var name = document.createElement('div');
        name.className = 'object-card-name';
        name.textContent = story.name;
        var hint = document.createElement('div');
        hint.className = 'object-card-hint';
        hint.textContent = story.hint;

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(hint);

        if (state.readList.indexOf(story.id) !== -1) {
          var check = document.createElement('div');
          check.className = 'object-card-check';
          check.textContent = '\u2713 heard';
          card.appendChild(check);
        }

        card.addEventListener('click', function () { openStory(story); });
        objectGrid.appendChild(card);
      })(STORIES[i]);
    }
  }

  /* ---------- story rendering ---------- */
  function openStory(story) {
    state.currentStory = story;
    state.paraIndex = 0;

    collection.classList.add('hidden');
    engine.classList.remove('hidden');
    storyReflection.classList.add('hidden');
    reflectionInput.value = '';

    storyIcon.textContent = story.icon;
    storyTitle.textContent = story.name;
    storyVoice.textContent = story.voice;
    storyBody.innerHTML = '';

    showNextParagraph();
    updateNextBtn();

    engine.style.animation = 'none';
    void engine.offsetWidth;
    engine.style.animation = 'fadeIn 0.8s ease';
  }

  function showNextParagraph() {
    var story = state.currentStory;
    if (!story) return;
    if (state.paraIndex >= story.paragraphs.length) return;

    var p = document.createElement('p');
    p.className = 'story-para';
    if (state.paraIndex === 0) p.classList.add('voice');
    p.textContent = story.paragraphs[state.paraIndex];
    p.style.animationDelay = '0.1s';
    storyBody.appendChild(p);
    state.paraIndex++;
  }

  function updateNextBtn() {
    var story = state.currentStory;
    if (!story) return;
    if (state.paraIndex >= story.paragraphs.length) {
      nextBtn.textContent = 'reflect';
    } else {
      nextBtn.textContent = 'continue';
    }
  }

  function showReflection() {
    var story = state.currentStory;
    storyReflection.classList.remove('hidden');
    reflectionText.textContent = story.reflection;
    nextBtn.textContent = 'all stories';
    storyNav.style.marginTop = '1rem';

    markRead(story.id);

    storyReflection.style.animation = 'none';
    void storyReflection.offsetWidth;
    storyReflection.style.animation = 'fadeIn 0.8s ease';
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      buildCollection();
      collection.classList.remove('hidden');
    }, 1200);
  });

  nextBtn.addEventListener('click', function () {
    var story = state.currentStory;
    if (!story) return;

    if (storyReflection.classList.contains('hidden') === false) {
      /* already showing reflection — go to collection */
      engine.classList.add('hidden');
      buildCollection();
      collection.classList.remove('hidden');
      return;
    }

    if (state.paraIndex < story.paragraphs.length) {
      showNextParagraph();
      updateNextBtn();
    } else {
      showReflection();
    }
  });

  navCollection.addEventListener('click', function () {
    engine.classList.add('hidden');
    journal && journal.classList && journal.classList.add && journal.classList.add('hidden');
    buildCollection();
    collection.classList.remove('hidden');
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
