/* ============================================================
   SHABDA — the weight of words
   Same words, different worlds
   ============================================================ */

(function () {
  'use strict';

  var WORDS = [
    {
      sentence: "I\u2019m fine.",
      contexts: [
        {
          scene: "A coworker asks how your morning is going.",
          weight: "It means nothing. A reflex. You are already thinking about coffee."
        },
        {
          scene: "Your twelve-year-old daughter says it when you ask how school was.",
          weight: "It is a locked door. Behind it: a fight with a friend, a grade she is ashamed of, a feeling she cannot name. <span class=\"heavy\">\"Fine\" is the heaviest word a child can say.</span>"
        },
        {
          scene: "Your father texts it after you cancel dinner for the third time.",
          weight: "It means the opposite. It means he sat with the phone for five minutes before typing two words that cost him everything to send."
        }
      ],
      reflection: "How many times have you said \"I\u2019m fine\" when you were not? How many times have you believed it when someone else said it?"
    },
    {
      sentence: "I don\u2019t care.",
      contexts: [
        {
          scene: "Choosing where to eat with friends.",
          weight: "It means you genuinely have no preference. Easy. Light."
        },
        {
          scene: "A daughter says it when her father mentions his weekend plans.",
          weight: "It is armor. She cares so much that caring has become dangerous. <span class=\"heavy\">\"I don\u2019t care\" is what love sounds like when it is afraid of being hurt again.</span>"
        }
      ],
      reflection: "The sentence that sounds the most indifferent is often the one carrying the most feeling. Indifference takes effort."
    },
    {
      sentence: "You don\u2019t understand.",
      contexts: [
        {
          scene: "A teenager says it to a parent who suggests \"just ignoring\" the bullies.",
          weight: "She is right. The parent\u2019s world and her world are different countries. The advice is useless because the map is wrong."
        },
        {
          scene: "A father says it to his ex-wife during a phone call about custody.",
          weight: "He is not talking about the schedule. He is talking about years of trying to be present in a system that treats him as optional. <span class=\"heavy\">He means: you don\u2019t understand what it costs to keep showing up when everything says stop.</span>"
        }
      ],
      reflection: "\"You don\u2019t understand\" is almost never about intelligence. It is about distance \u2014 the gap between one person\u2019s experience and another\u2019s imagination."
    },
    {
      sentence: "Whatever.",
      contexts: [
        {
          scene: "Deciding which movie to stream.",
          weight: "A shrug. No stakes. The word weighs nothing."
        },
        {
          scene: "A daughter says it after her father tries to explain why he moved out.",
          weight: "It is a white flag disguised as a weapon. She has heard too many explanations. None of them fix anything. <span class=\"heavy\">\"Whatever\" means: I am too tired to fight and too hurt to listen.</span>"
        }
      ],
      reflection: "Small words become heavy when the person saying them has run out of bigger ones."
    },
    {
      sentence: "I\u2019m sorry.",
      contexts: [
        {
          scene: "You bump into a stranger at the grocery store.",
          weight: "Automatic. Forgotten before the next aisle."
        },
        {
          scene: "A father says it to his daughter, sitting on the edge of her bed, three months after the divorce.",
          weight: "It carries the weight of a house, a marriage, a thousand small failures he cannot undo. He means it more than he has ever meant anything. <span class=\"heavy\">And she is twelve, and she does not know yet that an apology can be real and still not be enough.</span>"
        }
      ],
      reflection: "An apology between strangers is a courtesy. An apology between family is a prayer. Same two words. Different universe."
    },
    {
      sentence: "It\u2019s not a big deal.",
      contexts: [
        {
          scene: "A friend forgets to text you back.",
          weight: "True. It is not. You move on in seconds."
        },
        {
          scene: "A mother says it when her daughter asks why dad was not invited to the school play.",
          weight: "It is a very big deal. The words are meant to close a door before the question gets dangerous. <span class=\"heavy\">\"Not a big deal\" is what adults say when the deal is so big they cannot face it.</span>"
        },
        {
          scene: "A father says it to himself, driving home alone after dropping her off.",
          weight: "He is lying to himself because the truth \u2014 that a forty-minute visit is all he gets \u2014 is not survivable at highway speed."
        }
      ],
      reflection: "The size of a thing depends on who is holding it. A pebble to one person is a boulder to another."
    },
    {
      sentence: "I miss you.",
      contexts: [
        {
          scene: "A text to a college friend you have not seen in months.",
          weight: "Warm. Easy. You will see them at Thanksgiving."
        },
        {
          scene: "A father writes it and deletes it from a text to his daughter. Three times.",
          weight: "He deletes it because he is afraid it will sound like pressure. Or guilt. Or need. <span class=\"heavy\">He does not know that she is in her room, looking at his contact photo, thinking the exact same three words.</span>"
        }
      ],
      reflection: "The words we delete tell more truth than the words we send. Somewhere there is a graveyard of unsent messages that would change everything."
    },
    {
      sentence: "Okay.",
      contexts: [
        {
          scene: "Your boss asks if you can join a 3pm meeting.",
          weight: "Agreement. Nothing more."
        },
        {
          scene: "A daughter says it when her father tells her he loves her at the end of a phone call.",
          weight: "She cannot say it back. Not because she does not feel it, but because feeling it is complicated now. <span class=\"heavy\">\"Okay\" is the word you use when the real word is too big to fit through your mouth.</span>"
        }
      ],
      reflection: "The smallest word in the language can hold the largest silence."
    }
  ];

  /* ---------- state ---------- */
  var state = {
    current: 0,
    contextIdx: 0,
    phase: 'reveal' // reveal -> contexts (one by one) -> reflection -> next
  };

  /* ---------- DOM ---------- */
  var opening        = document.getElementById('opening');
  var beginBtn       = document.getElementById('beginBtn');
  var engine         = document.getElementById('engine');
  var wordCard       = document.getElementById('wordCard');
  var wordNumber     = document.getElementById('wordNumber');
  var theWord        = document.getElementById('theWord');
  var contexts       = document.getElementById('contexts');
  var wordReflection = document.getElementById('wordReflection');
  var reflectionText = document.getElementById('reflectionText');
  var nextBtn        = document.getElementById('nextBtn');
  var completion     = document.getElementById('completion');
  var restartBtn     = document.getElementById('restartBtn');
  var navFloat       = document.getElementById('navFloat');
  var navAbout       = document.getElementById('navAbout');
  var aboutOverlay   = document.getElementById('aboutOverlay');
  var aboutClose     = document.getElementById('aboutClose');

  /* ---------- render ---------- */
  function showWord() {
    var w = WORDS[state.current];
    wordNumber.textContent = 'word ' + (state.current + 1) + ' of ' + WORDS.length;
    theWord.textContent = '\u201C' + w.sentence + '\u201D';
    contexts.innerHTML = '';
    wordReflection.classList.add('hidden');
    state.contextIdx = 0;
    state.phase = 'context';
    nextBtn.textContent = 'reveal context';

    wordCard.style.animation = 'none';
    void wordCard.offsetWidth;
    wordCard.style.animation = 'fadeIn 0.6s ease';
  }

  function showNextContext() {
    var w = WORDS[state.current];
    if (state.contextIdx >= w.contexts.length) return;

    var c = w.contexts[state.contextIdx];
    var card = document.createElement('div');
    card.className = 'context-card';
    var scene = document.createElement('div');
    scene.className = 'context-scene';
    scene.textContent = c.scene;
    var weight = document.createElement('div');
    weight.className = 'context-weight';
    weight.innerHTML = c.weight;
    card.appendChild(scene);
    card.appendChild(weight);
    contexts.appendChild(card);

    state.contextIdx++;

    if (state.contextIdx >= w.contexts.length) {
      nextBtn.textContent = 'the reflection';
      state.phase = 'reflection';
    } else {
      nextBtn.textContent = 'next context';
    }
  }

  function showReflection() {
    var w = WORDS[state.current];
    reflectionText.textContent = w.reflection;
    wordReflection.classList.remove('hidden');
    state.phase = 'next';

    if (state.current < WORDS.length - 1) {
      nextBtn.textContent = 'next word \u2192';
    } else {
      nextBtn.textContent = 'finish';
    }
  }

  /* ---------- events ---------- */
  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      engine.classList.remove('hidden');
      navFloat.classList.add('visible');
      showWord();
    }, 1200);
  });

  nextBtn.addEventListener('click', function () {
    if (state.phase === 'context') {
      showNextContext();
    } else if (state.phase === 'reflection') {
      showReflection();
    } else if (state.phase === 'next') {
      if (state.current < WORDS.length - 1) {
        state.current++;
        showWord();
      } else {
        engine.classList.add('hidden');
        completion.classList.remove('hidden');
      }
    }
  });

  restartBtn.addEventListener('click', function () {
    state.current = 0;
    state.contextIdx = 0;
    state.phase = 'reveal';
    completion.classList.add('hidden');
    engine.classList.remove('hidden');
    showWord();
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
