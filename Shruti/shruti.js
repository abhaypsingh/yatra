/* ============================================================
   SHRUTI — that which is heard
   Deep listening: surface → meaning → need
   6 conversations × 3 layers
   ============================================================ */

(function () {
  'use strict';

  // ==================== CONVERSATION DATA ====================
  var CONVERSATIONS = [
    {
      // 1: Father and daughter at dinner
      context: "A father and his twelve-year-old daughter sit at the dinner table. She is looking at her phone. He has been quiet for a while.",
      surface: [
        { speaker: "Father", text: "Can you put the phone away at dinner, please?" },
        { speaker: "Daughter", text: "I'm just texting. It's not a big deal." },
        { speaker: "Father", text: "I asked you to put it away." },
        { speaker: "Daughter", text: "You always make everything into a thing. Fine." }
      ],
      meaning: [
        { speaker: "Father", said: "Can you put the phone away at dinner?", meant: "This is the only time I get to see you today. I don't want to share it with a screen." },
        { speaker: "Daughter", said: "I'm just texting. It's not a big deal.", meant: "I don't understand why this matters to you so much. My friends are my world right now." },
        { speaker: "Father", said: "I asked you to put it away.", meant: "I feel invisible. I feel like I'm losing you and I don't know how to say that." },
        { speaker: "Daughter", said: "You always make everything into a thing.", meant: "I'm scared that every conversation becomes a fight. I don't know how to connect with you without one of us getting hurt." }
      ],
      need: [
        "He needs to feel that he still matters to her.",
        "She needs to feel that his love isn't conditional on obedience.",
        "They both need the same thing: to know that the other person wants to be here, at this table, together.",
        "The phone was never the problem."
      ],
      reflection: "Behind every rule about a phone or a screen is a person saying: 'I want your presence. I want to matter to you while I still can.'"
    },
    {
      // 2: Teenager and mother after school
      context: "A teenager comes home from school. Her mother asks a question from the kitchen.",
      surface: [
        { speaker: "Mother", text: "How was school?" },
        { speaker: "Teenager", text: "Fine." },
        { speaker: "Mother", text: "Did anything happen?" },
        { speaker: "Teenager", text: "No. Can I go to my room?" },
        { speaker: "Mother", text: "I'm just asking." },
        { speaker: "Teenager", text: "You're always just asking." }
      ],
      meaning: [
        { speaker: "Mother", said: "How was school?", meant: "Are you okay? I've been thinking about you all day and I have no idea what your world looks like anymore." },
        { speaker: "Teenager", said: "Fine.", meant: "Something happened but I don't have the words yet. And I'm not sure you'd understand." },
        { speaker: "Mother", said: "Did anything happen?", meant: "I can feel that something is wrong. Please let me in." },
        { speaker: "Teenager", said: "Can I go to my room?", meant: "I need to process this alone first. I need space to feel before I can speak." },
        { speaker: "Mother", said: "I'm just asking.", meant: "I feel helpless. I used to know everything about your day and now I know nothing." },
        { speaker: "Teenager", said: "You're always just asking.", meant: "I want to talk to you. I just don't know how to start. And your questions feel like pressure instead of invitation." }
      ],
      need: [
        "She needs her mother to be available without being urgent.",
        "Her mother needs to know she hasn't been shut out permanently.",
        "The teenager wants to be asked, but in a way that doesn't require an immediate answer — she needs the door left open, not pushed open.",
        "The mother needs to hear: 'I'll come to you when I'm ready. Just be there.'"
      ],
      reflection: "'Fine' is rarely fine. It is a holding word — a placeholder for feelings that haven't found their shape yet. The best response to 'fine' is not more questions. It is patient presence."
    },
    {
      // 3: Two friends after one cancels plans
      context: "Two friends are texting. One has cancelled plans for the third time this month.",
      surface: [
        { speaker: "Friend A", text: "Hey, can we reschedule tomorrow? Something came up." },
        { speaker: "Friend B", text: "Sure. No worries." },
        { speaker: "Friend A", text: "You're the best. Next week for sure!" },
        { speaker: "Friend B", text: "Sounds good." }
      ],
      meaning: [
        { speaker: "Friend A", said: "Something came up.", meant: "I'm overwhelmed and I can't hold one more social commitment right now. I don't know how to say that without sounding like I don't care about you." },
        { speaker: "Friend B", said: "Sure. No worries.", meant: "This is the third time. I'm starting to wonder if you actually want to see me." },
        { speaker: "Friend A", said: "Next week for sure!", meant: "I feel guilty. I'm overcommitting to make up for it, even though I don't know if I'll be able to keep that promise either." },
        { speaker: "Friend B", said: "Sounds good.", meant: "I've stopped believing you. And I'm too tired to say how much that hurts." }
      ],
      need: [
        "Friend A needs permission to be honest: 'I'm struggling and I need grace right now.'",
        "Friend B needs honesty: 'I can't right now, but you matter to me. Here's when I can.'",
        "Both need the safety to say what's real instead of what's polite.",
        "A friendship can survive cancellation. It cannot survive the feeling of not mattering."
      ],
      reflection: "'No worries' is often the most worried thing a person can say. It is the sound of someone deciding not to make their hurt your problem."
    },
    {
      // 4: Father picking up child from mother's house (divorce context)
      context: "A father arrives to pick up his daughter for the weekend. She is standing in the doorway with her backpack.",
      surface: [
        { speaker: "Father", text: "Ready to go, sweetheart?" },
        { speaker: "Daughter", text: "Do I have to?" },
        { speaker: "Father", text: "...I have the whole weekend planned." },
        { speaker: "Daughter", text: "I have a thing with my friends on Saturday." },
        { speaker: "Father", text: "We'll work it out. Come on." },
        { speaker: "Daughter", text: "Whatever." }
      ],
      meaning: [
        { speaker: "Father", said: "Ready to go, sweetheart?", meant: "I've been counting the days. Please be glad to see me." },
        { speaker: "Daughter", said: "Do I have to?", meant: "I'm tired of going back and forth. I'm tired of living in two places. I'm not rejecting you — I'm exhausted by the logistics of loving two people who can't be in the same room." },
        { speaker: "Father", said: "I have the whole weekend planned.", meant: "I'm terrified that if I don't fill every minute with activities, you'll realize you'd rather be somewhere else." },
        { speaker: "Daughter", said: "I have a thing with my friends.", meant: "My friends are the one constant. They don't split. They don't have schedules. I need that stability right now." },
        { speaker: "Father", said: "We'll work it out.", meant: "Please don't make me fight for time with you. It already costs me everything I have." },
        { speaker: "Daughter", said: "Whatever.", meant: "I don't have the energy to navigate your feelings and my feelings and Mom's feelings. So I shut down. It's easier." }
      ],
      need: [
        "He needs to hear: 'I'm glad you're here, Dad.' Even once. Even quiet.",
        "She needs to stop being the bridge between two worlds. She needs her parents to carry the weight of the logistics so she can just be a child.",
        "He needs to know that her resistance is not rejection.",
        "She needs to know that his plans are not about control — they're about not wanting to waste a single moment with her."
      ],
      reflection: "'Do I have to?' is not defiance. From a child of divorce, it is exhaustion. It is the sound of someone who loves two people and is tired of the distance between them."
    },
    {
      // 5: Teacher and student after class
      context: "A teacher holds a student back after class. The student got a failing grade on an assignment.",
      surface: [
        { speaker: "Teacher", text: "I need to talk to you about your essay." },
        { speaker: "Student", text: "I know. It was bad." },
        { speaker: "Teacher", text: "It wasn't bad. It was missing. You didn't turn it in." },
        { speaker: "Student", text: "I forgot." },
        { speaker: "Teacher", text: "This is the third time." },
        { speaker: "Student", text: "I'll do better. Can I go?" }
      ],
      meaning: [
        { speaker: "Teacher", said: "I need to talk to you about your essay.", meant: "I see potential in you that you're wasting, and it breaks my heart because I've seen this pattern before." },
        { speaker: "Student", said: "It was bad.", meant: "Please don't look too close. If you see how much I'm struggling, I'll have to admit it's real." },
        { speaker: "Teacher", said: "You didn't turn it in.", meant: "This isn't about the essay. Something is wrong. An essay is small — what's the big thing that's making the small things impossible?" },
        { speaker: "Student", said: "I forgot.", meant: "I didn't forget. I couldn't do it. I sat in front of a blank screen until 2 a.m. and then I gave up. I don't know why." },
        { speaker: "Teacher", said: "This is the third time.", meant: "I am trying to get you to let me help before this becomes something I can't fix." },
        { speaker: "Student", said: "I'll do better. Can I go?", meant: "If I stay here any longer I might cry. And I cannot cry in school. So please just let me leave." }
      ],
      need: [
        "The teacher needs the student to understand: 'I'm not angry. I'm worried.'",
        "The student needs the teacher to say: 'Forget the essay. Are you okay?'",
        "Both are talking about a piece of paper when neither of them is thinking about a piece of paper.",
        "The essay is a symptom. The conversation they need to have hasn't started yet."
      ],
      reflection: "When someone keeps failing at small things, the problem is almost never the small things. Missing homework is visible. What causes it is not."
    },
    {
      // 6: Parent saying goodnight
      context: "A father stands in the doorway of his daughter's bedroom at night. She is already under the covers, facing the wall.",
      surface: [
        { speaker: "Father", text: "Goodnight." },
        { speaker: "Daughter", text: "Night." },
        { speaker: "Father", text: "...I love you." },
        { speaker: "Daughter", text: "..." },
        { speaker: "Father", text: "Okay. Sleep well." }
      ],
      meaning: [
        { speaker: "Father", said: "Goodnight.", meant: "Today was hard. I don't know where we went wrong. But I'm here." },
        { speaker: "Daughter", said: "Night.", meant: "I heard you. I can't look at you right now because I'm still upset. But I heard you." },
        { speaker: "Father", said: "I love you.", meant: "No matter what happened today. No matter what you think of me. This doesn't change. It never will." },
        { speaker: "Daughter", said: "(silence)", meant: "I love you too. I can't say it right now because saying it would mean everything is okay, and it's not okay yet. But I love you too." },
        { speaker: "Father", said: "Okay. Sleep well.", meant: "I'll be here tomorrow. And the day after. And every day after that. Even when you don't answer. Even when the door is closed." }
      ],
      need: [
        "She needs him to keep saying goodnight. Even when she doesn't answer. Especially when she doesn't answer.",
        "He needs to know that the silence isn't empty — it's full of things she doesn't know how to say yet.",
        "They both need time. Not to fix anything. Just to let the love they feel become something they can show.",
        "The goodnight is enough. It is a rope thrown across a canyon. One day she will grab it."
      ],
      reflection: "Silence from someone you love is not always rejection. Sometimes it is the loudest way of saying: 'I'm not ready to be okay yet, but don't stop trying.'"
    }
  ];

  // ==================== STATE ====================
  var state = {
    current: 0,
    total: CONVERSATIONS.length
  };

  // ==================== DOM ====================
  function buildDots() {
    var dots = document.getElementById('progressDots');
    dots.innerHTML = '';
    for (var i = 0; i < state.total; i++) {
      var dot = document.createElement('span');
      dot.className = 'progress-dot';
      if (i < state.current) dot.classList.add('done');
      if (i === state.current) dot.classList.add('active');
      dots.appendChild(dot);
    }
    document.getElementById('progressLabel').textContent = (state.current + 1) + ' / ' + state.total;
  }

  // ==================== RENDER LAYERS ====================
  function renderSurface(conv) {
    var container = document.getElementById('dialogueSurface');
    container.innerHTML = '';

    conv.surface.forEach(function (line, idx) {
      var div = document.createElement('div');
      div.className = 'dialogue-line';
      div.style.animationDelay = (idx * 0.15) + 's';

      var spk = document.createElement('span');
      spk.className = 'speaker';
      spk.textContent = line.speaker;

      var txt = document.createElement('span');
      txt.className = 'dialogue-text';
      txt.textContent = '"' + line.text + '"';

      div.appendChild(spk);
      div.appendChild(txt);
      container.appendChild(div);
    });
  }

  function renderMeaning(conv) {
    var container = document.getElementById('dialogueMeaning');
    container.innerHTML = '';

    conv.meaning.forEach(function (line, idx) {
      var div = document.createElement('div');
      div.className = 'meaning-line';
      div.style.animationDelay = (idx * 0.2) + 's';

      var spk = document.createElement('div');
      spk.className = 'meaning-speaker';
      spk.textContent = line.speaker;

      var said = document.createElement('div');
      said.className = 'meaning-said';
      said.textContent = '"' + line.said + '"';

      var meant = document.createElement('div');
      meant.className = 'meaning-meant';
      meant.textContent = line.meant;

      div.appendChild(spk);
      div.appendChild(said);
      div.appendChild(meant);
      container.appendChild(div);
    });
  }

  function renderNeed(conv) {
    var container = document.getElementById('dialogueNeed');
    container.innerHTML = '';

    var div = document.createElement('div');
    div.className = 'need-text';

    conv.need.forEach(function (line, idx) {
      var p = document.createElement('p');
      p.textContent = line;
      p.style.opacity = '0';
      p.style.animation = 'fadeUp 0.6s ' + (idx * 0.3) + 's ease forwards';
      div.appendChild(p);
    });

    container.appendChild(div);
    document.getElementById('layerReflection').textContent = conv.reflection;
  }

  // ==================== SHOW SCENE ====================
  function showScene() {
    var conv = CONVERSATIONS[state.current];

    buildDots();

    // Set context
    document.getElementById('sceneContext').textContent = conv.context;

    // Show surface, hide deeper layers
    renderSurface(conv);

    var layerS = document.getElementById('layerSurface');
    var layerM = document.getElementById('layerMeaning');
    var layerN = document.getElementById('layerNeed');

    layerS.classList.remove('hidden');
    layerS.style.animation = 'none';
    layerS.offsetHeight;
    layerS.style.animation = 'layerEnter 0.6s ease';

    layerM.classList.add('hidden');
    layerN.classList.add('hidden');

    // Show the "listen deeper" button
    document.getElementById('goDeeper1').style.display = '';

    // Update next button
    var nextBtn = document.getElementById('nextScene');
    if (state.current >= state.total - 1) {
      nextBtn.textContent = 'enter the silence →';
    } else {
      nextBtn.textContent = 'next conversation →';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== LAYER TRANSITIONS ====================
  function revealMeaning() {
    var conv = CONVERSATIONS[state.current];
    renderMeaning(conv);

    // Hide button
    document.getElementById('goDeeper1').style.display = 'none';

    var layerM = document.getElementById('layerMeaning');
    layerM.classList.remove('hidden');
    layerM.style.animation = 'none';
    layerM.offsetHeight;
    layerM.style.animation = 'layerEnter 0.6s ease';

    setTimeout(function () {
      layerM.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  function revealNeed() {
    var conv = CONVERSATIONS[state.current];
    renderNeed(conv);

    document.getElementById('goDeeper2').style.display = 'none';

    var layerN = document.getElementById('layerNeed');
    layerN.classList.remove('hidden');
    layerN.style.animation = 'none';
    layerN.offsetHeight;
    layerN.style.animation = 'layerEnter 0.6s ease';

    setTimeout(function () {
      layerN.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  // ==================== NAVIGATION ====================
  function nextScene() {
    state.current++;

    if (state.current >= state.total) {
      document.getElementById('engine').classList.add('hidden');
      document.getElementById('closing').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Reset deeper buttons
    document.getElementById('goDeeper1').style.display = '';
    document.getElementById('goDeeper2').style.display = '';

    showScene();
  }

  function saveReflection() {
    var text = document.getElementById('closingInput').value.trim();
    if (!text) return;

    try {
      var entries = JSON.parse(localStorage.getItem('shruti_reflections') || '[]');
      entries.unshift({ text: text, date: new Date().toISOString() });
      localStorage.setItem('shruti_reflections', JSON.stringify(entries));
    } catch (e) { /* ignore */ }

    var btn = document.getElementById('sealBtn');
    btn.textContent = 'sealed \u2713';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'seal this hearing';
      btn.disabled = false;
    }, 2000);
  }

  function restart() {
    state.current = 0;
    document.getElementById('closingInput').value = '';
    document.getElementById('goDeeper1').style.display = '';
    document.getElementById('goDeeper2').style.display = '';
    document.getElementById('closing').classList.add('hidden');
    document.getElementById('engine').classList.remove('hidden');
    showScene();
  }

  // ==================== EVENT LISTENERS ====================
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('engine').classList.remove('hidden');
      document.getElementById('navFloat').classList.add('visible');
      showScene();
    }, 1200);
  });

  document.getElementById('goDeeper1').addEventListener('click', revealMeaning);
  document.getElementById('goDeeper2').addEventListener('click', revealNeed);
  document.getElementById('nextScene').addEventListener('click', nextScene);
  document.getElementById('sealBtn').addEventListener('click', saveReflection);
  document.getElementById('restartBtn').addEventListener('click', restart);

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
