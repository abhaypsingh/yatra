/* ============================================================
   DHARMA — the compass
   8 moral dilemmas, builds a value-compass from choices
   ============================================================ */

(function () {
  'use strict';

  // ==================== VALUES ====================
  // Each choice maps to one or two values
  var VALUES = ['courage', 'compassion', 'honesty', 'loyalty', 'justice', 'selflessness'];

  var VALUE_COLORS = {
    courage: '#c87060',
    compassion: '#60a8c0',
    honesty: '#c9a84c',
    loyalty: '#a078c0',
    justice: '#70b088',
    selflessness: '#c08878'
  };

  // ==================== DILEMMA DATA ====================
  var DILEMMAS = [
    {
      context: "Your best friend copied answers on a test. The teacher suspects cheating and asks the class if anyone saw anything. Your friend is looking at you.",
      question: "Everyone is silent. The teacher says if no one comes forward, the whole class loses five points. What do you do?",
      choices: [
        {
          text: "Stay silent. You would never betray your friend, no matter what.",
          values: ['loyalty'],
          reflection: "You chose loyalty. Your friend is safe. But 28 other students just lost five points for something they had nothing to do with. Loyalty to one person can become injustice to many."
        },
        {
          text: "Talk to your friend after class and tell them they need to confess on their own.",
          values: ['compassion', 'honesty'],
          reflection: "You chose the harder middle path \u2014 honest enough to name the problem, compassionate enough to let your friend own the solution. Not every moral choice has to be dramatic."
        },
        {
          text: "Raise your hand and tell the truth.",
          values: ['honesty', 'justice'],
          reflection: "You chose honesty and justice. The class is spared. Your friend may not forgive you. Sometimes doing the right thing costs you the person you did it for."
        }
      ]
    },
    {
      context: "Your father gives you a rule you think is unfair: no phone after 9 PM on school nights. Your friends are all online at 10.",
      question: "You could easily hide your phone under your pillow. He would never know. What do you do?",
      choices: [
        {
          text: "Keep the phone hidden. The rule is unfair and you deserve to make your own choices.",
          values: ['courage'],
          reflection: "You chose autonomy \u2014 a kind of courage. But a secret kept from someone who trusts you changes the space between you, even when they never find out."
        },
        {
          text: "Follow the rule even though you hate it. A promise is a promise, even a forced one.",
          values: ['loyalty', 'honesty'],
          reflection: "You chose to honor the agreement even when it cost you. That is a rare form of honesty \u2014 keeping a rule not because you agree with it, but because trust matters more than convenience."
        },
        {
          text: "Tell your father the rule feels unfair and ask to negotiate a different time.",
          values: ['courage', 'honesty'],
          reflection: "You chose to speak up rather than sneak around. This takes courage \u2014 confrontation is harder than deception. The outcome may not change, but the relationship stays honest."
        }
      ]
    },
    {
      context: "A kid at school is being bullied. Not hit \u2014 just excluded. Every day, no one sits with him at lunch. No one picks him for teams. He pretends not to notice.",
      question: "You could sit with him. But your friends will think it is weird. They might start excluding you too. What do you do?",
      choices: [
        {
          text: "Sit with him. Whatever happens, happens.",
          values: ['courage', 'compassion'],
          reflection: "You chose courage and compassion. Both are expensive. You may lose social standing. He may gain the first real moment of belonging in months. You decided his loneliness mattered more than your comfort."
        },
        {
          text: "Stay with your friends but be nice to him when no one is watching.",
          values: ['compassion'],
          reflection: "You chose private compassion. It is real \u2014 but it is also safe. Kindness that only exists when no one is watching helps the giver more than the receiver. He is still alone at that table."
        },
        {
          text: "Talk to your friends about including him. Try to change the group from inside.",
          values: ['justice', 'courage'],
          reflection: "You chose to change the system instead of just your own seat. This is justice \u2014 trying to shift the norm, not just your own behavior. It may not work. But it addresses the root."
        }
      ]
    },
    {
      context: "You find a wallet on the ground with $200 in it. There is an ID inside. The person lives three blocks away. No one saw you pick it up.",
      question: "You could keep the money. Or you could return it. No one would ever know either way.",
      choices: [
        {
          text: "Keep it. Finders keepers. They should have been more careful.",
          values: [],
          reflection: "You chose self-interest. It is the easiest path, and no one will judge you because no one saw. But you will know. That is the thing about character \u2014 it is what you do when no one is watching."
        },
        {
          text: "Return the wallet with everything in it.",
          values: ['honesty', 'selflessness'],
          reflection: "You chose honesty and selflessness when no one required you to. This is the purest form of integrity \u2014 doing the right thing not for credit, not from fear, but because of who you want to be."
        },
        {
          text: "Return the wallet but keep the cash. Compromise.",
          values: ['honesty'],
          reflection: "You chose partial honesty \u2014 enough to feel okay, not enough to be whole. Most people live here. The question is whether you are comfortable with it."
        }
      ]
    },
    {
      context: "Your mother says something unkind about your father. She does not know you heard. It is not the first time.",
      question: "You love them both. What do you do?",
      choices: [
        {
          text: "Pretend you did not hear. It is easier for everyone.",
          values: ['loyalty'],
          reflection: "You chose to protect the peace. Sometimes silence is a form of loyalty to both people \u2014 refusing to be pulled into a conflict that is not yours to solve."
        },
        {
          text: "Tell your mother that what she said hurt you, even if she did not mean for you to hear it.",
          values: ['courage', 'honesty'],
          reflection: "You chose to speak a hard truth to someone you love. This takes extraordinary courage. You are not choosing sides \u2014 you are choosing honesty over comfort."
        },
        {
          text: "Say nothing to her, but later tell your father that you love him. Without explaining why.",
          values: ['compassion', 'selflessness'],
          reflection: "You chose to heal without confronting. You cannot fix what happens between them. But you can make sure the one who was hurt feels loved. Sometimes the wisest action is indirect."
        }
      ]
    },
    {
      context: "You worked on a group project for two weeks. Your partner did almost nothing. The teacher asks each of you to rate the other person's contribution.",
      question: "If you are honest, your partner will fail. If you are generous, they will get credit they did not earn. What do you do?",
      choices: [
        {
          text: "Rate them honestly. They did not do the work.",
          values: ['honesty', 'justice'],
          reflection: "You chose honesty and justice. The grade will reflect reality. Your partner will face consequences. This is fair \u2014 but fairness sometimes feels cold. The question is whether you tried to talk to them first."
        },
        {
          text: "Give them a decent rating. Everyone has things going on that you do not know about.",
          values: ['compassion', 'selflessness'],
          reflection: "You chose compassion over accuracy. Maybe they were struggling with something invisible. You absorbed an unfairness to spare someone else. This is selfless \u2014 but it also means you carried a weight that was not yours."
        },
        {
          text: "Talk to your partner before ratings are due. Give them a chance to step up or explain.",
          values: ['courage', 'compassion'],
          reflection: "You chose the most difficult option \u2014 a direct, honest conversation before judgment. This takes both courage and compassion. It treats them as a person, not just a problem."
        }
      ]
    },
    {
      context: "You see your older cousin shoplifting. It is a small thing \u2014 a pair of headphones. They see that you saw.",
      question: "They say: \"Do not tell anyone. It is not a big deal.\" What do you do?",
      choices: [
        {
          text: "Keep their secret. Family is family.",
          values: ['loyalty'],
          reflection: "You chose loyalty. The bond of family is real and powerful. But loyalty without limits can become complicity. Where is the line between protecting someone and enabling them?"
        },
        {
          text: "Tell them you are not comfortable with it and that they should put it back.",
          values: ['courage', 'honesty'],
          reflection: "You chose to hold someone you love to a standard. This is not betrayal \u2014 it is the highest form of loyalty. You cared enough about who they are to say something."
        },
        {
          text: "Say nothing now, but refuse to go shopping with them again.",
          values: ['justice'],
          reflection: "You chose a quiet boundary. You did not confront, but you did not participate. Boundaries are a form of justice \u2014 drawing lines about what you will and will not be part of."
        }
      ]
    },
    {
      context: "A friend tells you a secret: they are being hurt at home. They make you promise not to tell anyone. They are scared of what will happen if you do.",
      question: "You promised. But they are in danger. What do you do?",
      choices: [
        {
          text: "Keep the promise. They trusted you and you gave your word.",
          values: ['loyalty'],
          reflection: "You chose the weight of a promise. Loyalty is sacred. But there are moments when keeping a promise means watching someone stay in harm. The hardest moral question is when two right things collide."
        },
        {
          text: "Tell a trusted adult. Break the promise to protect them.",
          values: ['courage', 'selflessness'],
          reflection: "You chose to betray a promise to save a person. They may hate you for it. They may thank you in ten years. Courage is not the absence of fear \u2014 it is acting when the cost is real and the outcome is uncertain."
        },
        {
          text: "Go back to your friend and tell them you cannot keep this secret. Help them tell someone together.",
          values: ['courage', 'compassion', 'honesty'],
          reflection: "You chose to honor both the person and the truth. You did not go behind their back. You did not stay silent. You walked with them toward the hard thing. This is the fullest expression of love."
        }
      ]
    }
  ];

  // ==================== STATE ====================
  var state = {
    current: 0,
    total: DILEMMAS.length,
    scores: {} // value -> count
  };

  VALUES.forEach(function (v) { state.scores[v] = 0; });

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

  // ==================== SHOW DILEMMA ====================
  function showDilemma() {
    var d = DILEMMAS[state.current];
    buildDots();

    document.getElementById('dilemmaContext').textContent = d.context;
    document.getElementById('dilemmaQuestion').textContent = d.question;

    var choicesEl = document.getElementById('dilemmaChoices');
    choicesEl.innerHTML = '';

    d.choices.forEach(function (choice, idx) {
      var btn = document.createElement('button');
      btn.className = 'dilemma-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', function () {
        makeChoice(idx);
      });
      choicesEl.appendChild(btn);
    });

    document.getElementById('choiceResult').classList.add('hidden');

    var card = document.getElementById('dilemmaCard');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'fadeIn 0.6s ease';

    var nextBtn = document.getElementById('nextDilemma');
    if (state.current >= state.total - 1) {
      nextBtn.textContent = 'see your compass \u2192';
    } else {
      nextBtn.textContent = 'next dilemma \u2192';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== MAKE CHOICE ====================
  function makeChoice(idx) {
    var d = DILEMMAS[state.current];
    var choice = d.choices[idx];

    // Score values
    choice.values.forEach(function (v) {
      state.scores[v] = (state.scores[v] || 0) + 1;
    });

    // Style buttons
    var buttons = document.querySelectorAll('.dilemma-btn');
    buttons.forEach(function (btn, i) {
      if (i === idx) btn.classList.add('chosen');
      else btn.classList.add('not-chosen');
      btn.style.pointerEvents = 'none';
    });

    // Show result
    document.getElementById('resultText').textContent = choice.reflection;

    var valuesText = choice.values.length > 0
      ? 'values revealed: ' + choice.values.join(', ')
      : 'no compass value was strengthened';
    document.getElementById('resultValue').textContent = valuesText;

    document.getElementById('choiceResult').classList.remove('hidden');

    setTimeout(function () {
      document.getElementById('choiceResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  // ==================== NEXT ====================
  function nextDilemma() {
    state.current++;

    if (state.current >= state.total) {
      showCompass();
      return;
    }

    showDilemma();
  }

  // ==================== COMPASS VISUALIZATION ====================
  function showCompass() {
    document.getElementById('engine').classList.add('hidden');
    document.getElementById('compass').classList.remove('hidden');

    // Build SVG radar chart
    var svg = document.getElementById('compassSvg');
    var svgNS = 'http://www.w3.org/2000/svg';
    svg.innerHTML = '';

    var cx = 200, cy = 200, maxR = 150;
    var n = VALUES.length;

    // Find max score for scaling
    var maxScore = 0;
    VALUES.forEach(function (v) {
      if (state.scores[v] > maxScore) maxScore = state.scores[v];
    });
    if (maxScore === 0) maxScore = 1;

    // Draw axis lines and labels
    VALUES.forEach(function (v, i) {
      var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      var x = cx + maxR * Math.cos(angle);
      var y = cy + maxR * Math.sin(angle);

      // Axis line
      var line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', x);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'rgba(120, 114, 144, 0.2)');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      // Label
      var labelX = cx + (maxR + 20) * Math.cos(angle);
      var labelY = cy + (maxR + 20) * Math.sin(angle);
      var text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', labelX);
      text.setAttribute('y', labelY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('fill', VALUE_COLORS[v]);
      text.setAttribute('font-size', '11');
      text.setAttribute('font-family', '-apple-system, sans-serif');
      text.textContent = v;
      svg.appendChild(text);
    });

    // Draw concentric rings
    for (var ring = 1; ring <= 3; ring++) {
      var r = (ring / 3) * maxR;
      var circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', r);
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', 'rgba(120, 114, 144, 0.1)');
      circle.setAttribute('stroke-width', '1');
      svg.appendChild(circle);
    }

    // Draw value polygon
    var points = [];
    VALUES.forEach(function (v, i) {
      var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      var r = (state.scores[v] / maxScore) * maxR;
      if (r < 15) r = 15; // Minimum visibility
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);
      points.push(x.toFixed(1) + ',' + y.toFixed(1));
    });

    var polygon = document.createElementNS(svgNS, 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', 'rgba(201, 168, 76, 0.15)');
    polygon.setAttribute('stroke', 'rgba(201, 168, 76, 0.6)');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);

    // Value dots
    VALUES.forEach(function (v, i) {
      var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      var r = (state.scores[v] / maxScore) * maxR;
      if (r < 15) r = 15;
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);

      var dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', x.toFixed(1));
      dot.setAttribute('cy', y.toFixed(1));
      dot.setAttribute('r', '4');
      dot.setAttribute('fill', VALUE_COLORS[v]);
      svg.appendChild(dot);
    });

    // Build value tags
    var valuesEl = document.getElementById('compassValues');
    valuesEl.innerHTML = '';

    // Sort values by score (highest first)
    var sorted = VALUES.slice().sort(function (a, b) {
      return state.scores[b] - state.scores[a];
    });

    sorted.forEach(function (v) {
      if (state.scores[v] > 0) {
        var tag = document.createElement('span');
        tag.className = 'value-tag ' + v;
        tag.textContent = v + ' (' + state.scores[v] + ')';
        valuesEl.appendChild(tag);
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== SAVE ====================
  function saveCompass() {
    try {
      var entries = JSON.parse(localStorage.getItem('dharma_compasses') || '[]');
      entries.unshift({
        scores: Object.assign({}, state.scores),
        date: new Date().toISOString()
      });
      localStorage.setItem('dharma_compasses', JSON.stringify(entries));
    } catch (e) { /* ignore */ }

    var btn = document.getElementById('saveCompass');
    btn.textContent = 'saved \u2713';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'keep this compass';
      btn.disabled = false;
    }, 2000);
  }

  function restart() {
    state.current = 0;
    VALUES.forEach(function (v) { state.scores[v] = 0; });
    document.getElementById('compass').classList.add('hidden');
    document.getElementById('engine').classList.remove('hidden');
    showDilemma();
  }

  // ==================== EVENT LISTENERS ====================
  document.getElementById('beginBtn').addEventListener('click', function () {
    document.getElementById('opening').classList.add('fade-out');
    setTimeout(function () {
      document.getElementById('opening').style.display = 'none';
      document.getElementById('engine').classList.remove('hidden');
      document.getElementById('navFloat').classList.add('visible');
      showDilemma();
    }, 1200);
  });

  document.getElementById('nextDilemma').addEventListener('click', nextDilemma);
  document.getElementById('saveCompass').addEventListener('click', saveCompass);
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
