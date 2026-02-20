/* ============================================================
   KARMA — the ripple
   Choice-and-consequence visualization
   5 scenarios with branching ripple chains + canvas ripple effects
   ============================================================ */

(function () {
  'use strict';

  // ==================== CANVAS RIPPLE SYSTEM ====================
  var canvas, ctx, W, H;
  var ripples = [];
  var animFrame;

  function initCanvas() {
    canvas = document.getElementById('rippleCanvas');
    ctx = canvas.getContext('2d');
    resize();
    loop();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  window.addEventListener('resize', resize);

  function spawnRipple(x, y, color) {
    ripples.push({
      x: x, y: y,
      radius: 0,
      maxRadius: 150 + Math.random() * 200,
      speed: 0.8 + Math.random() * 0.5,
      life: 1,
      color: color || '168, 168, 200'
    });
  }

  function loop() {
    ctx.fillStyle = 'rgba(10, 10, 16, 0.06)';
    ctx.fillRect(0, 0, W, H);

    for (var i = ripples.length - 1; i >= 0; i--) {
      var r = ripples[i];
      r.radius += r.speed;
      r.life = 1 - (r.radius / r.maxRadius);

      if (r.life <= 0) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + r.color + ',' + (r.life * 0.3) + ')';
      ctx.lineWidth = 1.5 * r.life;
      ctx.stroke();
    }

    animFrame = requestAnimationFrame(loop);
  }

  // ==================== SCENARIO DATA ====================
  var SCENARIOS = [
    {
      context: "Your father asks you to help carry groceries from the car. You're in the middle of a show on your phone.",
      moment: "He's standing at the door with bags in both hands, waiting.",
      choices: [
        {
          text: "\"Hold on, I'm watching something.\" You don't look up.",
          tone: "harsh",
          chain: [
            { depth: "you", desc: "He carries them alone. He doesn't say anything." },
            { depth: "your father", desc: "At dinner, he's quieter than usual. He's thinking: even this small thing, she couldn't do for me." },
            { depth: "his work", desc: "The next morning, a coworker asks for help with a task. He almost says no. He's tired of being the one who always carries things for people who don't notice." },
            { depth: "the coworker", desc: "The coworker struggles alone. She goes home that night and snaps at her son for not helping with dishes. The cycle continues." }
          ],
          insight: "A moment of indifference doesn't stay in the room where it happened. It travels."
        },
        {
          text: "You pause the show, get up, and grab two bags without being asked twice.",
          tone: "kind",
          chain: [
            { depth: "you", desc: "It takes ninety seconds. You barely miss anything." },
            { depth: "your father", desc: "He doesn't say much. But something in his shoulders relaxes. He feels seen. He feels like his daughter is growing into someone who notices." },
            { depth: "his work", desc: "The next morning, he holds the elevator for a stranger rushing to make it. Small generosities flow from people who feel full." },
            { depth: "the stranger", desc: "The stranger — running late, anxious — arrives at her meeting on time. She's calmer. She listens better. Her team notices." }
          ],
          insight: "Ninety seconds of effort. A chain of ease that reaches four people deep. That's how kindness actually works."
        }
      ]
    },
    {
      context: "A new kid joins your class mid-year. She sits alone at lunch, reading a book. Your friends are whispering about her clothes.",
      moment: "One of your friends says, loud enough for the new girl to hear: \"What is she wearing?\" Everyone laughs. You have a choice.",
      choices: [
        {
          text: "You laugh with them. It's easier.",
          tone: "harsh",
          chain: [
            { depth: "the new girl", desc: "She heard. She pretends she didn't. She turns a page in her book without reading a single word." },
            { depth: "that evening", desc: "She tells her mother she doesn't want to go back to school. Her mother, who moved cities for a new job, feels like she ruined her daughter's life." },
            { depth: "her mother", desc: "The guilt makes her overcompensate. She buys things they can't afford. The stress follows her to work." },
            { depth: "one year later", desc: "The new girl has learned: fitting in means hiding who you are. She starts changing herself to avoid being seen. A piece of her goes quiet forever." }
          ],
          insight: "One laugh. One girl who learned to hide herself. Cruelty doesn't need to be loud. The quietest kind is joining in."
        },
        {
          text: "You don't laugh. You walk over and sit next to her. \"What are you reading?\"",
          tone: "kind",
          chain: [
            { depth: "the new girl", desc: "She looks up, startled. She shows you the cover. You say 'that's cool.' It's the first real thing anyone has said to her in this school." },
            { depth: "your friends", desc: "They notice. They don't say anything, but tomorrow the jokes are quieter. One person not laughing changes the math of cruelty." },
            { depth: "one month later", desc: "The new girl joins your lunch table. She's funny, it turns out. She draws in the margins of her notebook. She becomes someone you actually like." },
            { depth: "her mother", desc: "That evening, the girl says: 'Someone talked to me today.' Her mother cries in the bathroom — from relief." }
          ],
          insight: "The bravest thing a person can do in a group is not join in. One act of ordinary courage can change the entire direction of someone's story."
        }
      ]
    },
    {
      context: "Your father tells you that you can't go to a party on Saturday night. He says it's because he doesn't know the parents who are hosting it.",
      moment: "You're furious. Everyone else is going. You have a choice about what you say next.",
      choices: [
        {
          text: "\"You never let me do anything! You just want to control my life! I hate this!\" You slam your door.",
          tone: "harsh",
          chain: [
            { depth: "your father", desc: "He stands in the hallway, alone. The word 'hate' sits in his chest like a stone." },
            { depth: "that night", desc: "He calls his own father — your grandfather — for the first time in months. He says: 'Am I doing this wrong?' His father doesn't know what to say." },
            { depth: "the next day", desc: "He's more distant. Not because he's angry, but because he's second-guessing every decision. He starts saying yes to things he shouldn't, trying not to be the villain." },
            { depth: "six months later", desc: "The guardrails are gone. Not because he stopped caring, but because the cost of your anger was more than he could carry." }
          ],
          insight: "The word 'hate' from your child doesn't bounce off. It enters. Parents who seem to stop caring sometimes didn't stop — they were worn down by the cost of caring."
        },
        {
          text: "\"That's not fair.\" You're frustrated, but you don't slam anything. Later, you come back: \"Can we talk about it?\"",
          tone: "kind",
          chain: [
            { depth: "your father", desc: "He sits with you. He explains: he doesn't know these parents. He grew up in a place where community watched over children. Here, he has to do it alone." },
            { depth: "the conversation", desc: "You don't agree. But you hear him. He offers a compromise: he'll drive you, meet the parents, and pick you up at 10." },
            { depth: "at the party", desc: "You go. You're safe. He waits in the car reading the news, not because he doesn't trust you, but because being nearby is the only way he knows how to say 'I love you' in a world he doesn't fully understand." },
            { depth: "the next time", desc: "When the next party comes, you tell him about it early. He says yes faster. Trust was built, not broken." }
          ],
          insight: "Disagreement doesn't have to be destruction. 'Can we talk about it?' is the most powerful sentence in any family. It keeps the bridge standing."
        }
      ]
    },
    {
      context: "Your teacher returns your essay with a lot of red marks. She's written at the top: 'I know you can do better than this.'",
      moment: "You're embarrassed. Your friend glances at your paper. You have a choice.",
      choices: [
        {
          text: "You crumple the paper and say: \"She doesn't know what she's talking about. I don't care.\"",
          tone: "harsh",
          chain: [
            { depth: "you", desc: "You throw it away. But that night, lying in bed, the red marks play behind your eyelids. You feel small." },
            { depth: "the teacher", desc: "She notices the crumpled paper in the bin. She spent forty minutes writing those comments. She thinks: maybe I should stop trying so hard with students who don't want to hear it." },
            { depth: "the next student", desc: "The next essay she grades, she writes less. A student who needed her detailed feedback doesn't get it." },
            { depth: "one year later", desc: "You remember her comment. 'I know you can do better.' You realize she was the only teacher who ever said that. By then, she's stopped saying it to anyone." }
          ],
          insight: "When someone holds you to a high standard, the easiest response is anger. The hardest — and the most important — is to hear the belief hiding inside the criticism."
        },
        {
          text: "You take a breath. After class, you ask: \"Can you show me what you mean?\"",
          tone: "kind",
          chain: [
            { depth: "the teacher", desc: "She looks surprised. Most students never come back. She spends fifteen minutes showing you exactly how to improve." },
            { depth: "you", desc: "You rewrite the essay. It's harder than you expected. It's also better than anything you've written before." },
            { depth: "the teacher", desc: "She tells the other teachers at lunch: 'One of my students came back to learn.' It reminds her why she does this." },
            { depth: "next year", desc: "She writes on the next struggling student's paper: 'I know you can do better.' Because your response taught her that the words still matter." }
          ],
          insight: "One student who comes back to learn is enough to keep a teacher going for another year. Your response to criticism shapes how someone treats the person after you."
        }
      ]
    },
    {
      context: "You overhear your father on the phone late at night. He's speaking in his first language, quietly. You catch the word for 'difficult' and the word for 'alone.'",
      moment: "He hangs up and sees you standing in the hallway. His eyes are red. He says: \"Go to bed, it's late.\"",
      choices: [
        {
          text: "You go to bed without saying anything. It's his business.",
          tone: "harsh",
          chain: [
            { depth: "your father", desc: "He sits alone at the kitchen table for another hour. He is carrying something heavy and no one in this country knows the language it lives in." },
            { depth: "the next morning", desc: "He makes breakfast like nothing happened. He is very good at this — making nothing out of everything." },
            { depth: "over time", desc: "The distance between you grows. Not from fights, but from all the doors that were never opened. Silence becomes the shape of your relationship." },
            { depth: "years later", desc: "You wish you had said something that night. You'll remember the hallway. The red eyes. The closed door." }
          ],
          insight: "Sometimes the biggest act of harm is not cruelty — it's walking past someone's pain because it felt easier than stepping toward it."
        },
        {
          text: "You walk over. You don't say anything. You just sit down next to him.",
          tone: "kind",
          chain: [
            { depth: "your father", desc: "He doesn't explain. He doesn't need to. Someone is here. For the first time in months, he doesn't feel alone." },
            { depth: "that silence", desc: "You sit together for five minutes. No phones, no words. Just presence. It is the most he has felt like a father — and a person — in a long time." },
            { depth: "the next day", desc: "He's lighter. He makes a joke at breakfast. He calls his mother and tells her: my daughter sat with me last night." },
            { depth: "your grandmother", desc: "On the other side of the world, an old woman smiles and thinks: he raised her well. The loneliness in her heart lifts, just a little." }
          ],
          insight: "You don't need to fix someone's pain to help them carry it. Sometimes the most powerful thing you can do is sit down and stay."
        }
      ]
    }
  ];

  // ==================== STATE ====================
  var state = {
    current: 0,
    total: SCENARIOS.length,
    choices: [] // 'kind' or 'harsh'
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

  // ==================== SHOW SCENARIO ====================
  function showScenario() {
    var sc = SCENARIOS[state.current];
    buildDots();

    document.getElementById('scenarioContext').textContent = sc.context;
    document.getElementById('scenarioMoment').textContent = sc.moment;

    // Build choices
    var choicesEl = document.getElementById('choices');
    choicesEl.innerHTML = '';

    sc.choices.forEach(function (choice, idx) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.dataset.index = idx;
      btn.addEventListener('click', function () {
        makeChoice(idx);
      });
      choicesEl.appendChild(btn);
    });

    // Hide result
    document.getElementById('rippleResult').classList.add('hidden');

    // Show card
    var card = document.getElementById('scenarioCard');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'fadeIn 0.6s ease';

    // Update next button
    var nextBtn = document.getElementById('nextScenario');
    if (state.current >= state.total - 1) {
      nextBtn.textContent = 'see the web →';
    } else {
      nextBtn.textContent = 'next moment →';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== MAKE CHOICE ====================
  function makeChoice(idx) {
    var sc = SCENARIOS[state.current];
    var choice = sc.choices[idx];

    state.choices.push(choice.tone);

    // Style buttons
    var buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(function (btn, i) {
      if (i === idx) {
        btn.classList.add('chosen-' + choice.tone);
      } else {
        btn.classList.add('not-chosen');
      }
      btn.style.pointerEvents = 'none';
    });

    // Spawn visual ripple
    var color = choice.tone === 'kind' ? '104, 184, 160' : '200, 120, 104';
    spawnRipple(W / 2, H / 2, color);
    setTimeout(function () { spawnRipple(W / 2 + 30, H / 2 - 20, color); }, 400);
    setTimeout(function () { spawnRipple(W / 2 - 40, H / 2 + 30, color); }, 800);

    // Show ripple chain
    setTimeout(function () {
      showRippleChain(choice);
    }, 600);
  }

  function showRippleChain(choice) {
    var container = document.getElementById('rippleChain');
    container.innerHTML = '';

    var depthLabels = ['ripple 1', 'ripple 2', 'ripple 3', 'ripple 4'];

    choice.chain.forEach(function (step, idx) {
      var div = document.createElement('div');
      div.className = 'ripple-step';
      div.style.animationDelay = (idx * 0.4) + 's';

      var depth = document.createElement('div');
      depth.className = 'ripple-depth';
      depth.textContent = depthLabels[idx] || 'ripple ' + (idx + 1);

      var desc = document.createElement('div');
      desc.className = 'ripple-desc ' + choice.tone;
      desc.textContent = step.desc;

      div.appendChild(depth);
      div.appendChild(desc);
      container.appendChild(div);

      // Spawn visual ripple for each step
      var color = choice.tone === 'kind' ? '104, 184, 160' : '200, 120, 104';
      setTimeout(function () {
        var x = W * (0.2 + Math.random() * 0.6);
        var y = H * (0.2 + Math.random() * 0.6);
        spawnRipple(x, y, color);
      }, idx * 500 + 300);
    });

    document.getElementById('rippleInsight').textContent = choice.insight;
    document.getElementById('rippleResult').classList.remove('hidden');

    setTimeout(function () {
      document.getElementById('rippleResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  // ==================== NEXT / COMPLETE ====================
  function nextScenario() {
    state.current++;

    if (state.current >= state.total) {
      showReflection();
      return;
    }

    showScenario();
  }

  function showReflection() {
    document.getElementById('engine').classList.add('hidden');
    document.getElementById('reflection').classList.remove('hidden');

    // Count choices
    var kindCount = state.choices.filter(function (c) { return c === 'kind'; }).length;
    var harshCount = state.choices.filter(function (c) { return c === 'harsh'; }).length;

    var summary = document.getElementById('reflectionSummary');
    summary.innerHTML =
      '<div class="summary-stat"><span class="summary-num kind">' + kindCount + '</span><span class="summary-label">kind ripples</span></div>' +
      '<div class="summary-stat"><span class="summary-num harsh">' + harshCount + '</span><span class="summary-label">harsh ripples</span></div>';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveReflection() {
    var text = document.getElementById('reflectionInput').value.trim();
    if (!text) return;

    try {
      var entries = JSON.parse(localStorage.getItem('karma_reflections') || '[]');
      entries.unshift({ text: text, choices: state.choices.slice(), date: new Date().toISOString() });
      localStorage.setItem('karma_reflections', JSON.stringify(entries));
    } catch (e) { /* ignore */ }

    var btn = document.getElementById('sealBtn');
    btn.textContent = 'sealed \u2713';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'seal this seeing';
      btn.disabled = false;
    }, 2000);
  }

  function restart() {
    state.current = 0;
    state.choices = [];
    document.getElementById('reflectionInput').value = '';
    document.getElementById('reflection').classList.add('hidden');
    document.getElementById('engine').classList.remove('hidden');
    showScenario();
  }

  // ==================== EVENT LISTENERS ====================
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('engine').classList.remove('hidden');
      document.getElementById('navFloat').classList.add('visible');
      showScenario();
    }, 1200);
  });

  document.getElementById('nextScenario').addEventListener('click', nextScenario);
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

  // ==================== INIT ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCanvas);
  } else {
    initCanvas();
  }

})();
