/* ============================================================
   DRISHTI — the eyes of others
   Perspective-shift scenario engine
   6 scenarios × 2 perspectives + mirror reflection
   ============================================================ */

(function () {
  'use strict';

  // ==================== SCENARIO DATA ====================
  // Each scenario has sideA (the first impression) and sideB (the hidden truth)
  var SCENARIOS = [
    {
      // 1: The Strict Father
      tagA: "through her eyes",
      tagB: "through his eyes",
      sideA: [
        "Her father checks her phone every Sunday.",
        "<p class=\"inner-thought\">It feels like he doesn't trust me. Like he thinks I'm doing something wrong. My friends' parents don't do this. Why can't he just believe I'm a good person?</p>",
        "Last week he said no to a sleepover at Maya's house. Maya's mom even called to say it was fine. He still said no.",
        "<p class=\"inner-thought\">I wanted to scream. Everyone else gets to go. He just wants to control everything. He doesn't care about what I want — he only cares about being in charge.</p>",
        "She stopped telling him things after that. What's the point? He'll just say no."
      ],
      sideB: [
        "When his daughter was nine, one of her classmates was contacted by a stranger through a group chat. The parents had no idea until the school called.",
        "He sat in his car in the parking lot for twenty minutes, unable to drive. It could have been her.",
        "<p class=\"inner-thought\">I grew up in a place where everyone knew everyone. Here, the dangers are invisible. They come through the screen she holds in her hand.</p>",
        "He asked Maya's parents if they would be home all evening. They said they'd be at a dinner until 10. The girls would be alone for four hours.",
        "He said no. He didn't explain why because he didn't want his daughter to carry that fear.",
        "<p class=\"inner-thought\">She thinks I don't trust her. I trust her completely. It's the world I don't trust. And she is the most precious thing in it.</p>"
      ],
      reflection: "What looks like control sometimes comes from a place you cannot see — a fear so deep they carry it silently, rather than let it touch you."
    },
    {
      // 2: The Absent Mother
      tagA: "through his eyes",
      tagB: "through her eyes",
      sideA: [
        "His mother stopped coming to his games in seventh grade.",
        "She used to be at every single one. Front row, cheering so loud it was embarrassing. Then suddenly — nothing. An empty seat where she used to be.",
        "<p class=\"inner-thought\">I scored the winning goal and looked up and she wasn't there. I stopped looking up after that.</p>",
        "She's always 'tired.' Always in her room with the door closed. Sometimes she doesn't come down for dinner. His dad says give her space.",
        "<p class=\"inner-thought\">I think she just stopped caring. Maybe when you grow up, people you love just... disappear. Even when they're still in the house.</p>"
      ],
      sideB: [
        "The diagnosis came in March. She didn't tell the kids.",
        "Depression doesn't look like sadness. It looks like a door that gets heavier every day. It looks like standing in the shower unable to move. It looks like wanting to cheer at your son's game but feeling like your body is filled with concrete.",
        "<p class=\"inner-thought\">I can hear them downstairs. I can hear him laughing. I want to go down. I am telling my legs to move and they won't.</p>",
        "She writes him notes and leaves them in his backpack. \"I'm so proud of you.\" She doesn't know if he finds them.",
        "She sees the look on his face. She knows what he thinks. She cannot explain that the person who stopped showing up is not the person she wants to be.",
        "<p class=\"inner-thought\">The worst part isn't the illness. It's watching my son believe I chose to leave, when the truth is I'm fighting every single day to stay.</p>"
      ],
      reflection: "Absence doesn't always mean someone left. Sometimes the people who seem furthest away are fighting the hardest battle just to remain."
    },
    {
      // 3: The Hard-Pushing Immigrant Father
      tagA: "through her eyes",
      tagB: "through his eyes",
      sideA: [
        "Every night, it's the same. \"Did you study? Show me your homework. What did you get on the test?\"",
        "Her friends' parents ask them how their day was. Her father asks for grades.",
        "<p class=\"inner-thought\">Sometimes I think he only loves the version of me that gets A's. Like the real me — the one who draws, who daydreams, who wants to write stories — isn't enough for him.</p>",
        "When she got a B+ in math, he didn't yell. He got quiet. That was worse. He sat at the table and looked at the report card like she had hurt him.",
        "<p class=\"inner-thought\">I'm twelve. I'm not a grade. I'm a person. I wish he could see the difference.</p>"
      ],
      sideB: [
        "He came to this country with four hundred dollars. He did not speak the language well. He had a master's degree from back home that no one here would recognize.",
        "For two years he cleaned offices at night so he could go to interviews during the day. He ate one meal. He did not tell his family.",
        "<p class=\"inner-thought\">There was one door that was always open, no matter what country you come from, no matter how they look at you, no matter what they think of your accent. Education. That door cannot be closed once you walk through it.</p>",
        "When he sees her B+, he does not see failure. He sees the gap between where she is and where she could be — and he knows that gap is where life gets hard for people who look like them.",
        "He doesn't know how to say: I push you because the world will push you harder, and I would rather you be ready than be surprised.",
        "<p class=\"inner-thought\">She thinks I see a grade. I see her future. I see every door that was closed on me, and I want to give her the key to every single one.</p>"
      ],
      reflection: "The ones who push hardest sometimes do it because they know exactly how it feels when the world pushes you and no one prepared you for it."
    },
    {
      // 4: The Friend Who Vanished
      tagA: "through your eyes",
      tagB: "through hers",
      sideA: [
        "You and Priya were inseparable. You had inside jokes, a shared playlist, a plan to go to the same college someday.",
        "Then in October, she just... stopped. Stopped replying to messages. Sat with other people at lunch. Looked through you in the hallway like you were a stranger.",
        "<p class=\"inner-thought\">What did I do? I've replayed every conversation. I can't find the moment I messed up. Maybe I'm just not enough. Maybe people leave and that's just how it works.</p>",
        "You tried once more. Sent her a message: \"Did I do something wrong?\" She left it on read.",
        "You stopped trying after that."
      ],
      sideB: [
        "Priya's parents started fighting in September. Not arguing — fighting. Doors slamming. Her mother crying in the bathroom. Her father sleeping in his car.",
        "She heard the word \"divorce\" through the wall. She couldn't breathe.",
        "<p class=\"inner-thought\">Everything is falling apart. I can't be normal right now. I can't laugh about playlists when my family is breaking. If I sit with her she'll ask what's wrong and I'll break apart in the middle of the cafeteria.</p>",
        "She saw the message: \"Did I do something wrong?\" She typed three different replies. Deleted all of them. How do you explain that you're not leaving someone — you're just drowning?",
        "<p class=\"inner-thought\">I didn't stop loving you. I stopped being able to hold anything. Even the good things. Especially the good things. Because they reminded me of when everything was whole.</p>"
      ],
      reflection: "When someone pulls away, the reason is almost never about you. Most silence isn't rejection — it's someone trying to survive without dragging you into the wreckage."
    },
    {
      // 5: The Unfair Teacher
      tagA: "through his eyes",
      tagB: "through her eyes",
      sideA: [
        "Mr. Desai never lets anything slide. Turn in homework a minute late? Zero. Talk to your neighbor? Name on the board. Forget your book? Sit in the hall.",
        "Everyone else's teacher is chill. Mr. Desai acts like every class is a courtroom and he's the judge.",
        "<p class=\"inner-thought\">He called my parents because I forgot my assignment. It was one time. Other teachers give second chances. He treats us like we're in prison.</p>",
        "The other day, he made a kid redo an entire essay because the margins were wrong. Who even cares about margins?",
        "<p class=\"inner-thought\">I think he just likes the power. Some adults are like that. They never grew out of being a bully — they just got a classroom instead of a playground.</p>"
      ],
      sideB: [
        "When she was fifteen, her mother worked two jobs and no one checked her homework. She was smart but no one told her that being smart wasn't enough — you had to show up. Consistently. Precisely.",
        "She failed her first college application because of a formatting error. A scholarship that would have changed her family's life. Gone. Over margins.",
        "<p class=\"inner-thought\">No one taught me that details matter. No one held me to a standard. They said I was smart and let me float — and when it mattered, I sank.</p>",
        "She became a teacher because she wanted to be the person she never had. The one who holds you to the standard now, when the stakes are small, so you're ready when the stakes are everything.",
        "She saw a student roll his eyes when she gave a zero for a late assignment. She didn't react.",
        "<p class=\"inner-thought\">You'll understand in ten years. Or maybe you won't, and that's okay too. But I will not let you leave my classroom unprepared for a world that will not give you second chances just because you're charming.</p>"
      ],
      reflection: "Strictness without explanation looks like cruelty. But sometimes the people who hold you to the highest standard are the ones who see the most in you."
    },
    {
      // 6: The Divorced Father (closest to home)
      tagA: "through the daughter's eyes",
      tagB: "through the father's eyes",
      sideA: [
        "Her parents split up when she was eight. She lives with her mom. She sees her dad on weekends — sometimes.",
        "He always has rules. Even though he's not there every day, he acts like he gets to have opinions about her life. Screen time, bedtime, what she wears to school.",
        "<p class=\"inner-thought\">You're not even here. You don't see my morning routine. You don't know what my week looks like. How can you make rules for a life you're not part of?</p>",
        "Her mom says he's \"controlling.\" Her mom says he \"doesn't understand how things work now.\" Her mom says she doesn't have to listen if she doesn't want to.",
        "So she stopped listening.",
        "<p class=\"inner-thought\">Maybe when you leave a family, you lose the right to have a say. That's just how it works. You can't parent from the outside.</p>"
      ],
      sideB: [
        "He didn't leave. He was asked to leave. The difference matters, but it's a difference his daughter will never hear, because he promised himself he would never make her choose sides.",
        "Every other weekend, he gets forty-eight hours. He has mapped out every minute in his head — not to control, but because each one is precious and he is terrified of wasting them.",
        "<p class=\"inner-thought\">I know she thinks I'm strict. I have two days to show her that someone in this world will hold the line for her. Two days to be the guardrail she doesn't know she needs yet.</p>",
        "He hears what she's been told. He can see it in the way she looks at him — like he's a stranger giving unsolicited advice instead of her father.",
        "He does not correct it. He does not say \"that's not what happened.\" He does not put his hurt on her shoulders.",
        "<p class=\"inner-thought\">She will grow up. One day she will have the full picture. Until then, I will keep showing up every weekend with the same rules, the same love, the same quiet refusal to disappear — even when she wishes I would.</p>",
        "He drives home Sunday night on an empty highway and does not turn on the radio."
      ],
      reflection: "The parent who keeps showing up — with rules, with boundaries, with love you didn't ask for — is not the one who is trying to control you. They are the one who refused to let go."
    }
  ];

  // ==================== STATE ====================
  var state = {
    current: 0,        // scenario index (0-5)
    total: SCENARIOS.length,
    showingSideB: false
  };

  // ==================== DOM REFS ====================
  var $opening     = document.getElementById('opening');
  var $engine      = document.getElementById('engine');
  var $mirror      = document.getElementById('mirror');
  var $progressDots = document.getElementById('progressDots');
  var $progressLabel = document.getElementById('progressLabel');
  var $sideA       = document.getElementById('sideA');
  var $sideB       = document.getElementById('sideB');
  var $tagA        = document.getElementById('tagA');
  var $tagB        = document.getElementById('tagB');
  var $bodyA       = document.getElementById('bodyA');
  var $bodyB       = document.getElementById('bodyB');
  var $reflPrompt  = document.getElementById('reflectionPrompt');
  var $navFloat    = document.getElementById('navFloat');

  // ==================== PROGRESS ====================
  function buildDots() {
    $progressDots.innerHTML = '';
    for (var i = 0; i < state.total; i++) {
      var dot = document.createElement('span');
      dot.className = 'progress-dot';
      if (i < state.current) dot.classList.add('done');
      if (i === state.current) dot.classList.add('active');
      $progressDots.appendChild(dot);
    }
    $progressLabel.textContent = (state.current + 1) + ' / ' + state.total;
  }

  // ==================== RENDER NARRATIVE ====================
  function renderParagraphs(container, lines) {
    container.innerHTML = '';
    lines.forEach(function (line, idx) {
      // If line already contains HTML tags, insert directly
      if (line.indexOf('<p ') === 0 || line.indexOf('<p>') === 0) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = line;
        var el = wrapper.firstChild;
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        container.appendChild(el);
        setTimeout(function (e) {
          e.style.opacity = '1';
          e.style.transform = 'translateY(0)';
        }, 150 * idx, el);
      } else {
        var p = document.createElement('p');
        p.textContent = line;
        p.style.opacity = '0';
        p.style.transform = 'translateY(12px)';
        p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        container.appendChild(p);
        setTimeout(function (e) {
          e.style.opacity = '1';
          e.style.transform = 'translateY(0)';
        }, 150 * idx, p);
      }
    });
  }

  // ==================== SHOW SCENARIO ====================
  function showScenario() {
    var sc = SCENARIOS[state.current];
    state.showingSideB = false;

    buildDots();

    // Side A
    $tagA.textContent = sc.tagA;
    renderParagraphs($bodyA, sc.sideA);

    // Show A, hide B
    $sideA.classList.remove('hidden');
    $sideB.classList.add('hidden');

    // Reset animation
    $sideA.style.animation = 'none';
    $sideA.offsetHeight; // reflow
    $sideA.style.animation = 'panelEnter 0.6s ease';

    // Update "next" button text
    var nextBtn = document.getElementById('nextScenario');
    if (state.current >= state.total - 1) {
      nextBtn.textContent = 'enter the mirror →';
    } else {
      nextBtn.textContent = 'next moment →';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== SHOW SIDE B ====================
  function showSideB() {
    var sc = SCENARIOS[state.current];
    state.showingSideB = true;

    // Hide the "show other side" button
    document.getElementById('showOtherSide').style.display = 'none';

    // Populate side B
    $tagB.textContent = sc.tagB;
    renderParagraphs($bodyB, sc.sideB);
    $reflPrompt.textContent = sc.reflection;

    // Show B
    $sideB.classList.remove('hidden');
    $sideB.style.animation = 'none';
    $sideB.offsetHeight;
    $sideB.style.animation = 'revealEnter 0.8s ease';

    // Scroll to side B
    setTimeout(function () {
      $sideB.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  // ==================== NEXT SCENARIO ====================
  function nextScenario() {
    state.current++;

    if (state.current >= state.total) {
      // Show mirror
      $engine.classList.add('hidden');
      $mirror.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Reset show button
    document.getElementById('showOtherSide').style.display = '';
    showScenario();
  }

  // ==================== SAVE MIRROR REFLECTION ====================
  function saveMirrorReflection() {
    var text = document.getElementById('mirrorInput').value.trim();
    if (!text) return;

    var entry = {
      text: text,
      date: new Date().toISOString()
    };

    try {
      var entries = JSON.parse(localStorage.getItem('drishti_reflections') || '[]');
      entries.unshift(entry);
      localStorage.setItem('drishti_reflections', JSON.stringify(entries));
    } catch (e) { /* ignore */ }

    // Visual confirmation
    var btn = document.getElementById('saveMirror');
    btn.textContent = 'sealed ✓';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = 'seal this seeing';
      btn.disabled = false;
    }, 2000);
  }

  // ==================== RESTART ====================
  function restart() {
    state.current = 0;
    state.showingSideB = false;

    document.getElementById('mirrorInput').value = '';
    document.getElementById('showOtherSide').style.display = '';

    $mirror.classList.add('hidden');
    $engine.classList.remove('hidden');
    showScenario();
  }

  // ==================== EVENT LISTENERS ====================
  // Begin
  document.getElementById('beginBtn').addEventListener('click', function () {
    $opening.classList.add('fade-out');
    setTimeout(function () {
      $opening.style.display = 'none';
      $engine.classList.remove('hidden');
      $navFloat.classList.add('visible');
      showScenario();
    }, 1200);
  });

  // Show other side
  document.getElementById('showOtherSide').addEventListener('click', showSideB);

  // Next scenario
  document.getElementById('nextScenario').addEventListener('click', nextScenario);

  // Save mirror
  document.getElementById('saveMirror').addEventListener('click', saveMirrorReflection);

  // Restart
  document.getElementById('restartBtn').addEventListener('click', restart);

  // About
  document.getElementById('navAbout').addEventListener('click', function () {
    var about = document.getElementById('aboutOverlay');
    about.classList.remove('hidden');
    about.classList.add('visible');
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

  // Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('aboutOverlay').classList.remove('visible');
      document.getElementById('aboutOverlay').classList.add('hidden');
    }
  });

})();
