/* ============================================================
   GROWING UP STRONG - Application JavaScript
   Complete SPA with interactivity, routing, quizzes,
   scenarios, journal, and progress tracking
   ============================================================ */

(function () {
  'use strict';

  // ==================== STATE ====================
  const state = {
    currentPage: 'home',
    pagesVisited: new Set(['home']),
    totalPages: 8,
    quizScore: 0,
    quizCurrent: 0,
    scenarioCurrent: 0,
    totalScenarios: 5,
    carouselIndex: 0,
    carouselTotal: 0,
  };

  // Load visited pages from localStorage
  try {
    const saved = localStorage.getItem('gus_visited');
    if (saved) {
      JSON.parse(saved).forEach(function (p) { state.pagesVisited.add(p); });
    }
  } catch (e) { /* ignore */ }

  // ==================== SPLASH SCREEN ====================
  function initSplash() {
    var splash = document.getElementById('splash');
    var navbar = document.getElementById('navbar');
    var mainContent = document.getElementById('mainContent');
    var progressBar = document.getElementById('progressBar');
    var footer = document.getElementById('appFooter');

    setTimeout(function () {
      splash.classList.add('fade-out');
      setTimeout(function () {
        splash.style.display = 'none';
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
        progressBar.classList.remove('hidden');
        progressBar.classList.add('visible');
        footer.classList.remove('hidden');
        footer.classList.add('visible');
        updateProgress();
      }, 600);
    }, 2000);
  }

  // ==================== NAVIGATION / ROUTING ====================
  function navigateTo(pageId) {
    if (pageId === state.currentPage) return;

    // Hide all pages
    var pages = document.querySelectorAll('.page');
    pages.forEach(function (p) { p.classList.remove('active'); });

    // Show target page
    var target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
      state.currentPage = pageId;
      state.pagesVisited.add(pageId);

      // Save to localStorage
      try {
        localStorage.setItem('gus_visited', JSON.stringify(Array.from(state.pagesVisited)));
      } catch (e) { /* ignore */ }

      // Update nav links
      document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.toggle('active', link.dataset.page === pageId);
      });

      // Close mobile menu
      var navLinks = document.getElementById('navLinks');
      var hamburger = document.getElementById('hamburger');
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update progress
      updateProgress();

      // Trigger animations for the new page
      animateStatNumbers(target);
    }
  }

  function updateProgress() {
    var fill = document.getElementById('progressFill');
    var pct = (state.pagesVisited.size / state.totalPages) * 100;
    fill.style.width = pct + '%';
  }

  // ==================== EVENT DELEGATION ====================
  document.addEventListener('click', function (e) {
    // Navigation via data-page attribute
    var pageTarget = e.target.closest('[data-page]');
    if (pageTarget) {
      e.preventDefault();
      navigateTo(pageTarget.dataset.page);
      return;
    }

    // Accordion
    var accHeader = e.target.closest('.accordion-header');
    if (accHeader) {
      var item = accHeader.parentElement;
      var wasOpen = item.classList.contains('open');
      // Close all others in same accordion
      item.parentElement.querySelectorAll('.accordion-item').forEach(function (ai) {
        ai.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
      return;
    }

    // Quiz buttons
    var quizBtn = e.target.closest('.quiz-btn');
    if (quizBtn && !quizBtn.classList.contains('correct') && !quizBtn.classList.contains('incorrect')) {
      handleQuizAnswer(quizBtn);
      return;
    }

    // Reset quiz
    if (e.target.id === 'resetQuiz') {
      resetQuiz();
      return;
    }

    // Scenario choices
    var scenarioChoice = e.target.closest('.scenario-choice');
    if (scenarioChoice && !scenarioChoice.classList.contains('selected')) {
      handleScenarioChoice(scenarioChoice);
      return;
    }

    // Scenario navigation
    if (e.target.id === 'nextScenario') {
      navigateScenario(1);
      return;
    }
    if (e.target.id === 'prevScenario') {
      navigateScenario(-1);
      return;
    }

    // Carousel
    if (e.target.id === 'carouselNext' || e.target.closest('#carouselNext')) {
      moveCarousel(1);
      return;
    }
    if (e.target.id === 'carouselPrev' || e.target.closest('#carouselPrev')) {
      moveCarousel(-1);
      return;
    }
    var dot = e.target.closest('.carousel-dot');
    if (dot) {
      var idx = parseInt(dot.dataset.index, 10);
      setCarousel(idx);
      return;
    }

    // Socratic reveal buttons
    var revealBtn = e.target.closest('.reveal-btn');
    if (revealBtn && !revealBtn.classList.contains('waiting')) {
      handleSocraticReveal(revealBtn);
      return;
    }

    // Socratic thread navigation
    var threadNavBtn = e.target.closest('[data-thread-nav]');
    if (threadNavBtn) {
      scrollToThread(threadNavBtn.dataset.threadNav);
      return;
    }

    // Journal prompt buttons
    var promptBtn = e.target.closest('.journal-prompt-btn');
    if (promptBtn) {
      document.getElementById('journalText').value = promptBtn.dataset.prompt + '\n\n';
      document.getElementById('journalText').focus();
      return;
    }

    // Save journal entry
    if (e.target.id === 'saveEntry') {
      saveJournalEntry();
      return;
    }

    // Clear journal
    if (e.target.id === 'clearEntry') {
      document.getElementById('journalTitle').value = '';
      document.getElementById('journalText').value = '';
      return;
    }

    // Delete journal entry
    var deleteBtn = e.target.closest('.journal-entry-btn.delete');
    if (deleteBtn) {
      deleteJournalEntry(deleteBtn.dataset.id);
      return;
    }

    // Load journal entry
    var loadBtn = e.target.closest('.journal-entry-btn.load');
    if (loadBtn) {
      loadJournalEntry(loadBtn.dataset.id);
      return;
    }
  });

  // Hamburger menu
  document.getElementById('hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    var navLinks = document.getElementById('navLinks');
    var hamburger = document.getElementById('hamburger');
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  // ==================== STAT NUMBER ANIMATION ====================
  function animateStatNumbers(container) {
    var statNums = container.querySelectorAll('.stat-number[data-target]');
    statNums.forEach(function (el) {
      var target = parseInt(el.dataset.target, 10);
      var current = 0;
      var duration = 1500;
      var step = target / (duration / 16);
      var timer;

      function tick() {
        current += step;
        if (current >= target) {
          el.textContent = target;
          return;
        }
        el.textContent = Math.floor(current);
        timer = requestAnimationFrame(tick);
      }

      // Use IntersectionObserver if available
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              current = 0;
              tick();
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.5 });
        observer.observe(el);
      } else {
        tick();
      }
    });
  }

  // ==================== RESPECT QUIZ ====================
  var quizFeedbackTexts = {
    0: {
      correct: "Exactly! This shows respect AND independence. She's listening, asking questions, and proposing a solution. That's maturity.",
      incorrect: "This is actually respectful! She's listening, asking for more info, and working toward a solution. Respect doesn't mean silence."
    },
    1: {
      correct: "Right. This shuts down communication and shows no interest in understanding. Even if she's frustrated, there are better ways to express it.",
      incorrect: "Think about it: slamming doors and making absolute statements ('you ALWAYS', 'you don't know ANYTHING') isn't disagreement — it's dismissal. That's disrespectful."
    },
    2: {
      correct: "Perfect recognition! She disagrees but acknowledges the caring behind the words. That's respect and strength combined.",
      incorrect: "This IS respectful! Disagreeing politely while acknowledging care is the gold standard of mature communication."
    },
    3: {
      correct: "Yes — being physically present but mentally absent when someone is trying to protect you is a form of disrespect. It says 'your words don't matter to me.'",
      incorrect: "Even though she's not being openly rude, ignoring someone who's trying to help you is still disrespectful. Imagine doing this to a friend."
    },
    4: {
      correct: "Brilliant! She's asserting independence while actively seeking wisdom. This is the kind of response that makes parents trust their kids more.",
      incorrect: "This IS respectful! Asking for someone's experience while maintaining your own decision-making power is incredibly mature."
    },
    5: {
      correct: "Correct. Dismissing someone's entire life experience based on where they're from or their age is disrespectful. Different ≠ irrelevant. Human wisdom transcends borders and generations.",
      incorrect: "Even if things ARE different now, dismissing all of someone's wisdom because of their background is disrespectful. Some truths are universal."
    }
  };

  function handleQuizAnswer(btn) {
    var scenario = btn.closest('.quiz-scenario');
    var correct = scenario.dataset.correct;
    var answer = btn.dataset.answer;
    var buttons = scenario.querySelectorAll('.quiz-btn');
    var feedback = scenario.querySelector('.quiz-feedback');
    var idx = state.quizCurrent;

    // Disable buttons
    buttons.forEach(function (b) {
      b.style.pointerEvents = 'none';
      if (b.dataset.answer === correct) {
        b.classList.add('correct');
      } else if (b === btn && answer !== correct) {
        b.classList.add('incorrect');
      }
    });

    // Show feedback
    var isCorrect = answer === correct;
    if (isCorrect) state.quizScore++;

    feedback.textContent = isCorrect ?
      quizFeedbackTexts[idx].correct :
      quizFeedbackTexts[idx].incorrect;
    feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct' : 'incorrect');

    // Move to next after delay
    setTimeout(function () {
      state.quizCurrent++;
      var scenarios = document.querySelectorAll('.quiz-scenario');

      if (state.quizCurrent < scenarios.length) {
        scenario.classList.remove('active');
        scenarios[state.quizCurrent].classList.add('active');
        document.getElementById('quizCurrent').textContent = state.quizCurrent + 1;
      } else {
        // Show final score
        scenario.classList.remove('active');
        var scoreSection = document.getElementById('quizScore');
        scoreSection.classList.remove('hidden');
        document.getElementById('scoreValue').textContent = state.quizScore;
        document.getElementById('scoreTotal').textContent = scenarios.length;

        var msg;
        var pct = state.quizScore / scenarios.length;
        if (pct === 1) {
          msg = "Perfect score! You clearly understand the difference between respect and disrespect. You've got emotional intelligence that most adults would envy.";
        } else if (pct >= 0.66) {
          msg = "Great job! You have a strong sense of respectful communication. Keep building on this foundation.";
        } else {
          msg = "Good effort! These distinctions can be tricky. The important thing is that you're thinking about them. Try again to sharpen your instincts.";
        }
        document.getElementById('scoreMessage').textContent = msg;
      }
    }, 2500);
  }

  function resetQuiz() {
    state.quizScore = 0;
    state.quizCurrent = 0;

    document.getElementById('quizScore').classList.add('hidden');
    document.getElementById('quizCurrent').textContent = '1';

    var scenarios = document.querySelectorAll('.quiz-scenario');
    scenarios.forEach(function (s, i) {
      s.classList.toggle('active', i === 0);
      s.querySelectorAll('.quiz-btn').forEach(function (b) {
        b.classList.remove('correct', 'incorrect');
        b.style.pointerEvents = '';
      });
      var fb = s.querySelector('.quiz-feedback');
      fb.className = 'quiz-feedback';
      fb.textContent = '';
    });
  }

  // ==================== SCENARIO ENGINE ====================
  function handleScenarioChoice(btn) {
    var choices = btn.closest('.scenario-choices');
    var scenarioBody = btn.closest('.scenario-body');
    var choice = btn.dataset.choice;

    // Mark selected
    choices.querySelectorAll('.scenario-choice').forEach(function (c) {
      c.classList.remove('selected');
      c.style.pointerEvents = 'none';
    });
    btn.classList.add('selected');

    // Show results
    var results = scenarioBody.querySelector('.scenario-results');
    results.classList.remove('hidden');

    // Show the specific result
    results.querySelectorAll('.result').forEach(function (r) {
      r.classList.remove('show');
    });
    var result = results.querySelector('[data-result="' + choice + '"]');
    if (result) {
      result.classList.add('show');
    }
  }

  function navigateScenario(direction) {
    var scenarios = document.querySelectorAll('.scenario-card');
    var newIdx = state.scenarioCurrent + direction;

    // On last scenario, "Finish" shows the completion message
    if (newIdx >= state.totalScenarios) {
      var currentCard = scenarios[state.scenarioCurrent];
      var selected = currentCard.querySelector('.scenario-choice.selected');
      if (selected) {
        document.getElementById('scenarioFinal').classList.remove('hidden');
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      return;
    }

    if (newIdx < 0) return;

    scenarios[state.scenarioCurrent].classList.remove('active');
    scenarios[newIdx].classList.add('active');
    state.scenarioCurrent = newIdx;

    document.getElementById('scenarioCounter').textContent =
      (newIdx + 1) + ' / ' + state.totalScenarios;
    document.getElementById('prevScenario').disabled = newIdx === 0;

    // Update next button text
    if (newIdx === state.totalScenarios - 1) {
      document.getElementById('nextScenario').textContent = 'Finish';
    } else {
      document.getElementById('nextScenario').textContent = 'Next \u2192';
    }
  }

  // ==================== QUOTES CAROUSEL ====================
  function initCarousel() {
    var track = document.querySelector('.carousel-track');
    var cards = track.querySelectorAll('.quote-card');
    var dotsContainer = document.getElementById('carouselDots');
    state.carouselTotal = cards.length;

    // Create dots
    for (var i = 0; i < cards.length; i++) {
      var dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }
  }

  function moveCarousel(direction) {
    var newIdx = state.carouselIndex + direction;
    if (newIdx < 0) newIdx = state.carouselTotal - 1;
    if (newIdx >= state.carouselTotal) newIdx = 0;
    setCarousel(newIdx);
  }

  function setCarousel(idx) {
    state.carouselIndex = idx;
    var track = document.querySelector('.carousel-track');
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';

    document.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }

  // Auto-advance carousel
  var carouselInterval;
  function startCarouselAuto() {
    carouselInterval = setInterval(function () {
      moveCarousel(1);
    }, 6000);
  }
  function stopCarouselAuto() {
    clearInterval(carouselInterval);
  }

  // Pause on hover/touch
  var carouselEl = document.querySelector('.quotes-carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopCarouselAuto);
    carouselEl.addEventListener('mouseleave', startCarouselAuto);
    carouselEl.addEventListener('touchstart', stopCarouselAuto, { passive: true });
    carouselEl.addEventListener('touchend', function () {
      startCarouselAuto();
    });
  }

  // ==================== JOURNAL ====================
  function updateJournalDate() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('journalDate').textContent = now.toLocaleDateString('en-US', options);
  }

  function getJournalEntries() {
    try {
      var entries = localStorage.getItem('gus_journal');
      return entries ? JSON.parse(entries) : [];
    } catch (e) {
      return [];
    }
  }

  function saveJournalEntries(entries) {
    try {
      localStorage.setItem('gus_journal', JSON.stringify(entries));
    } catch (e) { /* ignore */ }
  }

  function saveJournalEntry() {
    var title = document.getElementById('journalTitle').value.trim();
    var text = document.getElementById('journalText').value.trim();

    if (!text) {
      alert('Write something before saving!');
      return;
    }

    var entry = {
      id: Date.now().toString(),
      title: title || 'Untitled Entry',
      text: text,
      date: new Date().toISOString()
    };

    var entries = getJournalEntries();
    entries.unshift(entry);
    saveJournalEntries(entries);

    // Clear editor
    document.getElementById('journalTitle').value = '';
    document.getElementById('journalText').value = '';

    renderJournalEntries();
  }

  function deleteJournalEntry(id) {
    if (!confirm('Delete this entry? This cannot be undone.')) return;

    var entries = getJournalEntries().filter(function (e) { return e.id !== id; });
    saveJournalEntries(entries);
    renderJournalEntries();
  }

  function loadJournalEntry(id) {
    var entries = getJournalEntries();
    var entry = entries.find(function (e) { return e.id === id; });
    if (entry) {
      document.getElementById('journalTitle').value = entry.title;
      document.getElementById('journalText').value = entry.text;
      document.getElementById('journalText').focus();
    }
  }

  function renderJournalEntries() {
    var container = document.getElementById('journalEntries');
    var entries = getJournalEntries();
    var empty = document.getElementById('emptyJournal');

    if (entries.length === 0) {
      container.innerHTML = '';
      container.appendChild(empty);
      empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';

    var html = '';
    entries.forEach(function (entry) {
      var date = new Date(entry.date);
      var dateStr = date.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit'
      });
      var preview = entry.text.length > 200 ?
        entry.text.substring(0, 200) + '...' : entry.text;

      html += '<div class="journal-entry-card">' +
        '<div class="journal-entry-header">' +
          '<span class="journal-entry-title">' + escapeHtml(entry.title) + '</span>' +
          '<span class="journal-entry-date">' + dateStr + '</span>' +
        '</div>' +
        '<p class="journal-entry-preview">' + escapeHtml(preview) + '</p>' +
        '<div class="journal-entry-actions">' +
          '<button class="journal-entry-btn load" data-id="' + entry.id + '">Edit</button>' +
          '<button class="journal-entry-btn delete" data-id="' + entry.id + '">Delete</button>' +
        '</div>' +
      '</div>';
    });

    container.innerHTML = html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ==================== TOUCH SWIPE FOR CAROUSEL ====================
  var touchStartX = 0;
  var touchEndX = 0;

  if (carouselEl) {
    carouselEl.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselEl.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          moveCarousel(1);
        } else {
          moveCarousel(-1);
        }
      }
    });
  }

  // ==================== KEYBOARD NAVIGATION ====================
  document.addEventListener('keydown', function (e) {
    // Arrow keys for carousel when voices page is active
    if (state.currentPage === 'voices') {
      if (e.key === 'ArrowLeft') moveCarousel(-1);
      if (e.key === 'ArrowRight') moveCarousel(1);
    }
    // Escape closes mobile menu
    if (e.key === 'Escape') {
      document.getElementById('navLinks').classList.remove('open');
      document.getElementById('hamburger').classList.remove('active');
    }
  });

  // ==================== SCROLL ANIMATIONS ====================
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.stat-card, .feature-card, .timeline-item, .nav-card').forEach(function (el) {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  // ==================== SOCRATIC DIALOGUES ====================
  var THINK_PAUSE_MS = 4000; // 4 second thinking pause

  function handleSocraticReveal(btn) {
    var threadId = btn.dataset.thread;
    var nextStep = parseInt(btn.dataset.next, 10);
    var thread = document.getElementById('thread-' + threadId);

    // Add waiting state with countdown
    btn.classList.add('waiting');
    var originalText = btn.textContent;
    var secondsLeft = Math.ceil(THINK_PAUSE_MS / 1000);
    btn.innerHTML = '<span class="timer-text">Think for ' + secondsLeft + 's...</span>';

    var countdownTimer = setInterval(function () {
      secondsLeft--;
      if (secondsLeft > 0) {
        btn.innerHTML = '<span class="timer-text">Think for ' + secondsLeft + 's...</span>';
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);

    setTimeout(function () {
      clearInterval(countdownTimer);

      // Hide the button that was clicked
      btn.style.display = 'none';

      // Also hide the think prompt before the button
      var prevThink = btn.previousElementSibling;
      if (prevThink && prevThink.classList.contains('think-prompt')) {
        prevThink.style.opacity = '0.4';
        prevThink.style.animation = 'none';
      }

      // Reveal the next step
      var nextStepEl = thread.querySelector('[data-step="' + nextStep + '"]');
      if (nextStepEl) {
        nextStepEl.classList.add('revealed');

        // Scroll the new step into view
        setTimeout(function () {
          nextStepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }

      // Track completed threads
      var isInsight = nextStepEl && nextStepEl.querySelector('.insight-bubble');
      if (isInsight) {
        markThreadCompleted(threadId);
      }
    }, THINK_PAUSE_MS);
  }

  function markThreadCompleted(threadId) {
    var navDot = document.querySelector('[data-thread-nav="' + threadId + '"]');
    if (navDot) {
      navDot.classList.remove('active');
      navDot.classList.add('completed');
    }

    // Save to localStorage
    try {
      var completed = JSON.parse(localStorage.getItem('gus_threads') || '[]');
      if (completed.indexOf(threadId) === -1) {
        completed.push(threadId);
        localStorage.setItem('gus_threads', JSON.stringify(completed));
      }
    } catch (e) { /* ignore */ }

    // Activate next thread dot
    var nextId = parseInt(threadId, 10) + 1;
    var nextDot = document.querySelector('[data-thread-nav="' + nextId + '"]');
    if (nextDot && !nextDot.classList.contains('completed')) {
      nextDot.classList.add('active');
    }
  }

  function scrollToThread(threadId) {
    var thread = document.getElementById('thread-' + threadId);
    if (thread) {
      thread.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update active dots
      document.querySelectorAll('.thread-dot').forEach(function (d) {
        if (!d.classList.contains('completed')) {
          d.classList.remove('active');
        }
      });
      var clickedDot = document.querySelector('[data-thread-nav="' + threadId + '"]');
      if (clickedDot) {
        clickedDot.classList.add('active');
      }
    }
  }

  function initSocraticState() {
    // Restore completed threads from localStorage
    try {
      var completed = JSON.parse(localStorage.getItem('gus_threads') || '[]');
      completed.forEach(function (threadId) {
        var navDot = document.querySelector('[data-thread-nav="' + threadId + '"]');
        if (navDot) {
          navDot.classList.add('completed');
        }
      });
    } catch (e) { /* ignore */ }
  }

  // ==================== INITIALIZATION ====================
  function init() {
    initSplash();
    initCarousel();
    startCarouselAuto();
    updateJournalDate();
    renderJournalEntries();
    initScrollAnimations();
    initSocraticState();

    // Initialize scenario counter
    document.getElementById('scenarioCounter').textContent = '1 / ' + state.totalScenarios;
    document.getElementById('quizTotal').textContent =
      document.querySelectorAll('.quiz-scenario').length;
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
