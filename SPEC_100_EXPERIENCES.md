# YATRA — Spec for 100 New Experiences (#51–#150)

**Target audience**: 12-year-old girl navigating family alienation, growing up, identity, friendship.
**Tone**: Honest, non-preachy, poetic but direct. Never condescending. Treats the reader as an intelligent person facing real struggles.
**Deploy target**: GitHub Pages at `abhaypsingh.github.io/yatra/`
**Stack**: Pure HTML + CSS + JS. Zero dependencies. Everything offline-capable.

---

## PART 1: ARCHITECTURE REFERENCE

### 1.1 File Structure Per Experience

```
ExperienceName/
├── index.html
├── style.css
└── experienceName.js    (lowercase camelCase of directory)
```

Directory = PascalCase. JS filename = camelCase. HTML/CSS always `index.html` and `style.css`.

### 1.2 HTML Template (copy exactly, fill in blanks)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="{{VOID_COLOR}}">
  <title>{{TITLE_WITH_ENTITIES}} &mdash; {{subtitle}}</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="../yatra-nav.css">
  <script src="../yatra-nav.js" defer></script>
</head>
<body>

  <!-- ========== OPENING ========== -->
  <div id="opening" class="opening">
    <div class="opening-content">
      <div class="devanagari">{{DEVANAGARI_ENTITIES}}</div>
      <h1>{{DISPLAY_NAME}}</h1>
      <p class="opening-sub">{{subtitle}}</p>
      <div class="opening-text">
        <p>{{opening_p1}}</p>
        <p><em>{{opening_p2}}</em></p>
        <p>{{opening_p3}}</p>
      </div>
      <button id="beginBtn" class="btn-primary">begin</button>
    </div>
  </div>

  <!-- ========== CANVAS ========== -->
  <canvas id="bgCanvas"></canvas>

  <!-- ========== SCENE ========== -->
  <div id="sceneView" class="scene-view hidden">
    <div class="scene-inner">
      <h2 class="scene-title" id="sceneTitle"></h2>
      <div class="scene-body" id="sceneBody"></div>

      <div class="{{REVEAL_BOX_CLASS}} hidden" id="{{REVEAL_BOX_ID}}">
        <p class="{{REVEAL_LABEL_CLASS}}">{{reveal_label}}:</p>
        <p class="{{REVEAL_TEXT_CLASS}}" id="{{REVEAL_TEXT_ID}}"></p>
      </div>

      <div class="ask-box hidden" id="askBox">
        <p class="ask-prompt" id="askPrompt"></p>
        <textarea id="askInput" class="ask-textarea" rows="2" placeholder="Write here if you want to..."></textarea>
        <button id="askBtn" class="btn-primary btn-small">continue</button>
      </div>

      <div class="{{TRUTH_BOX_CLASS}} hidden" id="{{TRUTH_BOX_ID}}">
        <p class="{{TRUTH_TEXT_CLASS}}" id="{{TRUTH_TEXT_ID}}"></p>
      </div>

      <div class="scene-actions">
        <button id="{{REVEAL_BTN_ID}}" class="btn-primary btn-small">{{reveal_button_text}}</button>
        <button id="nextBtn" class="btn-primary btn-small hidden">next</button>
      </div>
      <p class="scene-progress" id="progressText"></p>
    </div>
  </div>

  <!-- ========== COMPLETE ========== -->
  <div id="complete" class="complete hidden">
    <div class="complete-inner">
      <h2 class="complete-title">{{completion_title}}</h2>
      <p class="complete-text">{{completion_p1}}</p>
      <p class="complete-mid">{{completion_p2_with_em}}</p>
      <p class="complete-closing">{{completion_p3_italic}}</p>
      <div class="complete-actions">
        <button id="againBtn" class="btn-primary btn-small">begin again</button>
      </div>
    </div>
  </div>

  <!-- ========== NAV ========== -->
  <nav id="navFloat" class="nav-float">
    <button id="navAbout" class="nav-btn" aria-label="about">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    </button>
  </nav>

  <!-- ========== ABOUT ========== -->
  <div id="aboutOverlay" class="about-overlay hidden">
    <div class="about-card">
      <button id="aboutClose" class="about-close">&times;</button>
      <h2>{{DISPLAY_NAME}} <span class="about-deva">{{DEVANAGARI_ENTITIES}}</span></h2>
      <p><strong>{{DISPLAY_NAME}}</strong> {{about_definition}}</p>
      <p>{{about_research}}</p>
      <p>{{about_closing}}</p>
      <p>Everything stays on your device. Nothing is sent anywhere.</p>
    </div>
  </div>

  <script src="{{jsFilename}}.js"></script>
</body>
</html>
```

### 1.3 CSS Template (copy exactly, change :root vars and accent-specific colors)

```css
/* ============================================================
   {{NAME}} — {{subtitle}}
   {{canvas_description}}
   ============================================================ */

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --void: {{void}};
  --deep: {{deep}};
  --surface: {{surface}};
  --text: {{text}};
  --text-dim: {{text_dim}};
  --accent: {{accent}};
  --accent-warm: {{accent_warm}};
  --accent-glow: {{accent_glow}};
  --font-body: Georgia, 'Times New Roman', serif;
  --font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

html, body {
  width: 100%; min-height: 100vh;
  background: var(--void); color: var(--text);
  font-family: var(--font-body); line-height: 1.7;
  overflow-x: hidden; -webkit-font-smoothing: antialiased;
}

.hidden { display: none !important; }

#bgCanvas {
  position: fixed; inset: 0; width: 100%; height: 100%;
  z-index: 0; pointer-events: none;
}

/* ==================== OPENING ==================== */
.opening {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--void); z-index: 100;
  transition: opacity 1.2s ease, transform 1.2s ease;
}
.opening.fade-out { opacity: 0; transform: scale(1.04); pointer-events: none; }
.opening-content { text-align: center; padding: 2rem; max-width: 520px; }

.devanagari {
  font-size: 2.6rem; color: var(--accent); margin-bottom: 0.3rem;
  opacity: 0; animation: fadeUp 1s 0.3s ease forwards;
}
.opening h1 {
  font-size: 2.2rem; font-weight: 400; letter-spacing: 0.12em; color: var(--text);
  margin-bottom: 0.2rem; opacity: 0; animation: fadeUp 1s 0.6s ease forwards;
}
.opening-sub {
  font-size: 1rem; color: var(--text-dim); letter-spacing: 0.1em; font-style: italic;
  margin-bottom: 2rem; opacity: 0; animation: fadeUp 1s 0.9s ease forwards;
}
.opening-text { text-align: left; margin-bottom: 2.5rem; }
.opening-text p {
  font-size: 0.92rem; color: var(--text-dim); margin-bottom: 0.8rem;
  opacity: 0; animation: fadeUp 0.8s ease forwards;
}
.opening-text p:nth-child(1) { animation-delay: 1.2s; }
.opening-text p:nth-child(2) { animation-delay: 1.5s; }
.opening-text p:nth-child(3) { animation-delay: 1.8s; }
.opening-text em { color: var(--text); }

/* ==================== BUTTONS ==================== */
.btn-primary {
  background: transparent; border: 1px solid var(--accent); color: var(--accent);
  padding: 0.75rem 2rem; font-family: var(--font-body); font-size: 0.95rem;
  letter-spacing: 0.08em; cursor: pointer; transition: all 0.4s ease;
  opacity: 0; animation: fadeUp 0.8s 2.2s ease forwards;
}
.btn-primary:hover { background: var(--accent); color: var(--void); }
.btn-small { opacity: 1; animation: none; padding: 0.6rem 1.5rem; font-size: 0.85rem; }

/* ==================== SCENE VIEW ==================== */
.scene-view {
  position: relative; z-index: 10;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 2rem 1.5rem; animation: fadeIn 0.8s ease;
}
.scene-inner { max-width: 520px; width: 100%; }
.scene-title {
  font-size: 1.3rem; font-weight: 400; color: var(--text);
  margin-bottom: 1.2rem; letter-spacing: 0.04em; text-align: center;
}
.scene-body { margin-bottom: 1.5rem; }
.scene-body p {
  font-size: 0.92rem; color: var(--text-dim); line-height: 1.9;
  margin-bottom: 0.8rem;
}
.scene-body em { color: var(--text); }

.{{REVEAL_BOX_CLASS}} {
  background: var(--deep); border: 1px solid {{deep_border}}; border-radius: 10px;
  padding: 1.2rem 1.5rem; margin-bottom: 1.2rem;
  border-left: 2px solid var(--accent);
  animation: fadeIn 0.6s ease;
}
.{{REVEAL_LABEL_CLASS}} {
  font-family: var(--font-ui); font-size: 0.68rem; color: var(--accent);
  letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.4rem;
}
.{{REVEAL_TEXT_CLASS}} {
  font-size: 0.9rem; color: {{reveal_text_color}}; line-height: 1.7;
}

.ask-box { margin-bottom: 1.2rem; animation: fadeIn 0.6s ease; }
.ask-prompt {
  font-size: 0.85rem; color: var(--accent-warm); margin-bottom: 0.8rem;
  font-style: italic;
}
.ask-textarea {
  width: 100%; background: var(--deep); border: 1px solid var(--surface);
  border-radius: 10px; padding: 0.8rem 1rem; color: var(--text);
  font-family: var(--font-body); font-size: 0.88rem; line-height: 1.7;
  resize: vertical; margin-bottom: 0.8rem; transition: border-color 0.3s ease;
}
.ask-textarea:focus { outline: none; border-color: var(--accent); }
.ask-textarea::placeholder { color: var(--text-dim); opacity: 0.5; }

.{{TRUTH_BOX_CLASS}} {
  background: var(--deep); border: 1px solid var(--surface); border-radius: 10px;
  padding: 1.2rem 1.5rem; margin-bottom: 1.5rem;
  border-left: 2px solid var(--accent-warm);
  animation: fadeIn 1s ease;
}
.{{TRUTH_TEXT_CLASS}} {
  font-size: 0.9rem; color: var(--accent-warm); line-height: 1.8;
}

.scene-actions { text-align: center; margin-bottom: 1rem; display: flex; gap: 0.8rem; justify-content: center; }
.scene-progress {
  font-family: var(--font-ui); font-size: 0.7rem; color: var(--text-dim);
  letter-spacing: 0.08em; text-align: center; opacity: 0.5;
}

/* ==================== COMPLETE ==================== */
.complete {
  position: relative; z-index: 10;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 2rem 1.5rem; animation: fadeIn 1s ease;
}
.complete-inner { max-width: 520px; width: 100%; text-align: center; }
.complete-title {
  font-size: 1.6rem; font-weight: 400; color: var(--accent);
  margin-bottom: 1rem; letter-spacing: 0.06em;
}
.complete-text {
  font-size: 0.92rem; color: var(--text-dim); line-height: 1.9;
  margin-bottom: 1.2rem;
}
.complete-mid {
  font-size: 0.92rem; color: var(--text-dim); line-height: 1.9;
  margin-bottom: 1.2rem;
}
.complete-mid em { color: var(--text); }
.complete-closing {
  font-size: 0.92rem; color: var(--text); line-height: 1.9;
  margin-bottom: 2rem; font-style: italic;
}
.complete-actions { display: flex; gap: 0.8rem; justify-content: center; }

/* ==================== NAV, ABOUT ==================== */
.nav-float {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 50;
  display: flex; gap: 0.5rem; opacity: 0; pointer-events: none; transition: opacity 0.5s ease;
}
.nav-float.visible { opacity: 1; pointer-events: auto; }
.nav-btn {
  width: 40px; height: 40px; border-radius: 50%; background: var(--deep);
  border: 1px solid var(--surface); color: var(--text-dim); cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
}
.nav-btn:hover { border-color: var(--accent); color: var(--accent); }
.nav-btn svg { width: 18px; height: 18px; }

.about-overlay {
  position: fixed; inset: 0; background: rgba(6, 4, 4, 0.93);
  display: flex; align-items: center; justify-content: center;
  z-index: 200; padding: 1.5rem; opacity: 0;
  transition: opacity 0.4s ease; pointer-events: none;
}
.about-overlay.visible { opacity: 1; pointer-events: auto; }
.about-card {
  background: var(--deep); border: 1px solid var(--surface); border-radius: 12px;
  padding: 2.5rem; max-width: 480px; width: 100%; position: relative;
}
.about-card h2 { font-size: 1.4rem; font-weight: 400; color: var(--text); margin-bottom: 1.2rem; }
.about-deva { color: var(--accent); font-size: 1rem; }
.about-card p { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 1rem; line-height: 1.7; }
.about-card strong { color: var(--text); }
.about-close {
  position: absolute; top: 1rem; right: 1rem; background: none; border: none;
  color: var(--text-dim); font-size: 1.5rem; cursor: pointer; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center; transition: color 0.3s ease;
}
.about-close:hover { color: var(--text); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 600px) {
  .opening-content { padding: 1.5rem; }
  .devanagari { font-size: 2.2rem; }
  .opening h1 { font-size: 1.8rem; }
  .scene-title { font-size: 1.15rem; }
}
```

### 1.4 JS Template (IIFE pattern, sequential reveal flow)

```javascript
/* ============================================================
   {{NAME}} — {{subtitle}}
   {{canvas_description}}
   ============================================================ */

(function () {
  'use strict';

  var SCENES = [
    // SEE EXPERIENCE DEFINITIONS BELOW FOR CONTENT
  ];

  /* ---------- DOM ---------- */
  var opening      = document.getElementById('opening');
  var beginBtn     = document.getElementById('beginBtn');
  var bgCanvas     = document.getElementById('bgCanvas');
  var ctx          = bgCanvas.getContext('2d');
  var sceneView    = document.getElementById('sceneView');
  var sceneTitle   = document.getElementById('sceneTitle');
  var sceneBody    = document.getElementById('sceneBody');
  var revealBox    = document.getElementById('{{REVEAL_BOX_ID}}');
  var revealText   = document.getElementById('{{REVEAL_TEXT_ID}}');
  var askBox       = document.getElementById('askBox');
  var askPrompt    = document.getElementById('askPrompt');
  var askInput     = document.getElementById('askInput');
  var askBtn       = document.getElementById('askBtn');
  var truthBox     = document.getElementById('{{TRUTH_BOX_ID}}');
  var truthText    = document.getElementById('{{TRUTH_TEXT_ID}}');
  var revealBtn    = document.getElementById('{{REVEAL_BTN_ID}}');
  var nextBtn      = document.getElementById('nextBtn');
  var progressText = document.getElementById('progressText');
  var completeEl   = document.getElementById('complete');
  var againBtn     = document.getElementById('againBtn');
  var navFloat     = document.getElementById('navFloat');
  var navAbout     = document.getElementById('navAbout');
  var aboutOverlay = document.getElementById('aboutOverlay');
  var aboutClose   = document.getElementById('aboutClose');

  var currentIdx = 0;
  var animFrame = null;

  /* ---------- canvas ---------- */
  // UNIQUE PER EXPERIENCE — see canvas pattern catalog below

  /* ---------- scene flow ---------- */
  function showScene(idx) {
    if (idx >= SCENES.length) {
      sceneView.classList.add('hidden');
      completeEl.classList.remove('hidden');
      return;
    }
    currentIdx = idx;
    var s = SCENES[idx];
    sceneTitle.textContent = s.title;
    sceneBody.innerHTML = '';
    for (var p = 0; p < s.body.length; p++) {
      var pEl = document.createElement('p');
      pEl.innerHTML = s.body[p];
      sceneBody.appendChild(pEl);
    }
    revealText.textContent = s.reveal;   // field name varies
    askPrompt.textContent = s.prompt;
    truthText.textContent = s.truth;     // field name varies
    askInput.value = '';
    revealBox.classList.add('hidden');
    askBox.classList.add('hidden');
    truthBox.classList.add('hidden');
    revealBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    progressText.textContent = (idx + 1) + ' of ' + SCENES.length;
    sceneView.classList.remove('hidden');
    completeEl.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  revealBtn.addEventListener('click', function () {
    revealBtn.classList.add('hidden');
    revealBox.classList.remove('hidden');
    setTimeout(function () {
      askBox.classList.remove('hidden');
      askBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  askBtn.addEventListener('click', function () {
    askBox.classList.add('hidden');
    truthBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    truthBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  nextBtn.addEventListener('click', function () { showScene(currentIdx + 1); });

  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      animate();
      showScene(0);
    }, 1200);
  });

  againBtn.addEventListener('click', function () {
    completeEl.classList.add('hidden');
    showScene(0);
  });

  /* ---------- about ---------- */
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
```

### 1.5 Canvas Pattern Catalog

Pick one per experience. Each creates ~30-60 particles/objects with subtle movement.

| Pattern | Description | Used in |
|---------|-------------|---------|
| **Drift** | Particles drift slowly in one direction, fading and resetting | Seva, Pratiksha |
| **Orbit-pairs** | Paired particles orbit each other, connected by faint lines | Sakhi |
| **Rise** | Sparks float upward, some glowing brighter (progressive) | Sankalpa, Shraddha |
| **Settle** | Particles jitter, gradually becoming calmer as user progresses | Upeksha, Sthairya |
| **Ripple** | Circles expand outward from random points and fade | Ahimsa, Maitri |
| **Lantern** | Floating orbs with radial gradient glow, pulsing gently | Abhaya |
| **Rain** | Drops fall with trailing lines | Pratiksha |
| **Leaves** | Particles sway side-to-side while drifting down | Santosha |
| **Radiate** | Particles emanate from screen center outward | Seva |
| **Wander** | Particles move in random walk, changing direction slowly | Dharma |
| **Float** | Particles float with slight bobbing, like underwater | Anitya |
| **Swirl** | Particles follow gentle spiral paths | new |
| **Embers** | Bright dots that flicker and pulse like campfire sparks | new |
| **Firefly** | Intermittent blinking particles that appear/disappear | new |
| **Constellation** | Static dots with faint connecting lines that slowly rotate | new |
| **Mist** | Large, very faint circles that overlap and drift | new |
| **Tide** | Particles move left-right in wave pattern | new |
| **Ascend** | Particles start fast and slow to stillness | new |

### 1.6 SCENES Array Field Names (vary by reveal label)

The three-phase reveal uses different naming per experience. Pick ONE set:

| Reveal Label | Box/ID Pattern | Field in SCENES |
|--------------|----------------|-----------------|
| "what it feels like" | feelingBox / feelingText | `feeling` |
| "why it matters" | whyBox / whyText | `why` |
| "the harm" | harmBox / harmText | `harm` |
| "what you carry" | weightBox / weightText | `weight` |
| "the cost" | costBox / costText | `cost` |
| "the struggle" | struggleBox / struggleText | `struggle` |

And the final truth reveal:

| Truth Label | Box/ID Pattern | Field in SCENES |
|-------------|----------------|-----------------|
| (no label, just text) | truthBox / truthText | `truth` |
| (no label) | flameBox / flameText | `flame` |
| (no label) | rippleBox / rippleText | `ripple` |
| (no label) | wisdomBox / wisdomText | `wisdom` |
| (no label) | choiceBox / choiceText | `choice` |

### 1.7 Unicode / Entity Patterns

In JS strings, use `\u` escapes: `\u0101` for ā, `\u2014` for —, `\u2019` for ', `\u201c`/`\u201d` for "".
In HTML, use `&#x` entities: `&#x101;` for ā, `&mdash;` for —.
Devanagari range: U+0900–U+097F. Each character is `&#DDDD;` (decimal).

### 1.8 Landing Page Integration Per Experience

**In `index.html`**: Add card in correct section:
```html
<a href="{{Dir}}/index.html" class="card card-{{lowercase}}">
  <div class="card-sanskrit">{{DEVANAGARI}}</div>
  <h3 class="card-name">{{DisplayName}}</h3>
  <p class="card-subtitle">{{subtitle}}</p>
  <p class="card-desc">{{card_description_140_chars}}</p>
  <span class="card-enter">enter &rarr;</span>
</a>
```

**In `landing.css`**: Add accent rules:
```css
.card-{{lowercase}}:hover { border-color: {{accent}}; }
.card-{{lowercase}}::before { background: {{accent}}; }
.card-{{lowercase}} .card-enter { color: {{accent}}; }
```

**In `yatra-nav.js`**: Add to correct section in SECTIONS array:
```javascript
['{{Dir}}', '{{DisplayName}}', '{{subtitle}}']
```

**Update counts**: hero desc, footer text, yatra-nav.js subtitle.

### 1.9 Validation

After creating each experience's JS file: `node -c ExperienceName/experienceName.js`
After all done: `git add . && git commit && git push origin master`

---

## PART 2: THE 100 NEW EXPERIENCES

Each entry below provides everything needed to build the experience. Write FULL prose (4-6 sentences per field) matching the emotional depth of existing experiences like Sakhi, Sankalpa, Seva. The body field always has 2 entries (paragraphs), with the second wrapped in `<em>` tags. Use `\u2014` for em-dashes and `\u2019` for apostrophes in JS strings.

---

### SECTION: Inner Work (20 new → #51–#70)

#### #51 Tapas तपस् — discipline
- **Dir**: `Tapas` | **JS**: `tapas.js` | **Accent**: `#c87040` (burnt orange)
- **Canvas**: Embers — flickering bright dots that pulse like campfire sparks
- **Reveal label**: "why it matters" | **Truth label**: (truth)
- **Scenes**:
  1. "The Alarm Clock" — Getting up when you don't want to. The bed is warm, the world is cold, and no one would know if you stayed.
  2. "The Practice" — The instrument, the sport, the skill. Day 1 is exciting. Day 30 is boring. Day 100 is where it begins.
  3. "The Boring Middle" — Between starting and finishing is a vast middle where nothing seems to happen. This is where most people quit.
  4. "The Body Resists" — Your body wants comfort. Your mind wants ease. Discipline is the quiet voice that says: do it anyway.
  5. "The Promise to Yourself" — You made a commitment. No one is watching. No one will know if you break it. Except you.
  6. "The Fire Inside" — Tapas literally means heat. The heat of effort. The heat of transformation. You cannot be forged without fire.
- **Opening**: No one becomes who they want to be by accident. It takes practice. Daily, unglamorous, invisible practice. / The kind of effort that no one applauds. The kind that happens when no one is watching. / Six moments where discipline is the only door.
- **Completion**: Discipline is not punishment. It is devotion to your future self. Every time you show up when it's hard, you are building someone you haven't met yet.
- **Card desc**: The alarm clock. The boring middle. The promise to yourself. Six moments where discipline is the only door. Tapas is not punishment. It is devotion to the person you are becoming.

#### #52 Satya सत्य — truth
- **Dir**: `Satya` | **JS**: `satya.js` | **Accent**: `#b0a050` (muted gold)
- **Canvas**: Constellation — static dots with faint connecting lines that slowly rotate
- **Reveal**: "what it costs" | **Truth**: (truth)
- **Scenes**:
  1. "The Easy Lie" — It would be so simple. One sentence. No one gets hurt. Except something inside you gets a little smaller.
  2. "The Hard Truth" — Someone asks you a question and the honest answer will hurt them. Do you protect them or respect them?
  3. "The Truth About Yourself" — The hardest honesty is inward. Admitting what you want. What you fear. What you've done.
  4. "The Lie Everyone Agrees On" — The group has a version of events. It's not what happened. But agreeing is so much easier.
  5. "The Silence That Lies" — You didn't say anything untrue. You just didn't say anything. Is silence a lie?
  6. "Living in Truth" — Truth is not a single moment of confession. It is a way of being. A daily practice of not pretending.
- **Opening**: Truth sounds simple. Tell the truth. Don't lie. But anyone who has been alive for twelve years knows it is the most complicated word in the language. / Because sometimes the truth hurts. Sometimes it's dangerous. Sometimes you don't even know what it is. / Six moments where honesty is the hardest and most important choice.
- **Completion**: You will not always tell the truth. You will sometimes protect yourself or others with silence or softness. That is human. But the person who practices truth — who returns to it even after failing — that person builds a life that can bear weight.

#### #53 Svadhyaya स्वाध्याय — self-study
- **Dir**: `Svadhyaya` | **JS**: `svadhyaya.js` | **Accent**: `#8880b0` (soft indigo)
- **Canvas**: Mist — large, very faint overlapping circles that drift slowly
- **Reveal**: "look closer" | **Truth**: (insight)
- **Scenes**:
  1. "Your Patterns" — The same argument. The same feeling. The same reaction. You've been here before. What is the pattern?
  2. "Your Triggers" — What makes you shut down? What makes you lash out? What makes you go quiet? The map of your triggers is the map of your wounds.
  3. "Your Stories" — The narratives you tell yourself: I'm not smart enough. I'm too much. No one really likes me. Where did these stories start?
  4. "Your Body's Signals" — Tight jaw. Clenched fists. Butterflies. Your body speaks before your mind does. Are you listening?
  5. "Your Defenses" — Humor. Withdrawal. Perfectionism. Anger. The armor you built to survive. Is it still protecting you or is it a cage?
  6. "Your Growth" — Who were you a year ago? What have you learned? What have you let go of? The evidence of your own evolution.
- **Opening**: The most important subject you will ever study is yourself. Not in a self-absorbed way. In a self-aware way. / Knowing your patterns, your triggers, your stories, your defenses. Because you cannot change what you cannot see. / Six ways of looking inward.
- **Completion**: Self-study is not self-criticism. It is curiosity turned inward. The gentlest, bravest thing you can do is look at yourself clearly and say: I see you. I understand why you are this way. And I choose what comes next.

#### #54 Dhyana ध्यान — meditation
- **Dir**: `Dhyana` | **JS**: `dhyana.js` | **Accent**: `#6878a8` (twilight blue)
- **Canvas**: Float — particles float with slight bobbing, like underwater
- **Reveal**: "why it matters" | **Truth**: (stillness)
- **Scenes**:
  1. "The Busy Mind" — You sit still. Your mind does not. Groceries, homework, that thing she said, tomorrow, yesterday, a song.
  2. "The Breath Anchor" — One breath in. One breath out. When the mind wanders (it will), bring it back. No judgment. Just return.
  3. "The Uncomfortable Silence" — Silence is loud at first. Everything you've been avoiding comes rushing in.
  4. "The Body Scan" — Attention moves from head to toes. Where is there tension? Where is there ease? The body remembers what the mind forgets.
  5. "The Thought Clouds" — Thoughts are not you. They pass through you like clouds through sky. Watch them arrive. Watch them leave.
  6. "The Still Point" — Somewhere beneath the noise, there is quiet. You don't create it. You uncover it. It was always there.
- **Opening**: Meditation is not about becoming calm. It is about becoming aware. Aware of the chaos, the noise, the feelings — without being swept away by them. / It is the practice of returning. Again and again. To the breath. To the present. To yourself. / Six doorways into stillness.

#### #55 Vairagya वैराग्य — letting go
- **Dir**: `Vairagya` | **JS**: `vairagya.js` | **Accent**: `#8090a0` (ash blue)
- **Canvas**: Leaves — particles sway side-to-side while drifting slowly down
- **Reveal**: "what you're holding" | **Truth**: (release)
- **Scenes**:
  1. "The Outcome" — You did everything right and it still didn't work. Letting go of the outcome you were promised.
  2. "The Old Self" — The person you were last year doesn't fit anymore. But letting go of who you were feels like losing someone.
  3. "The Need to Control" — If you just try harder, plan better, worry more — you can make it right. Can you?
  4. "The Approval" — Their opinion of you feels like oxygen. What happens when you stop needing it?
  5. "The Grudge" — You've been carrying this for months. It's heavy. It's familiar. What would you be without it?
  6. "The Future You Imagined" — The life you planned. The friendship that was supposed to last. The family that was supposed to stay whole. Letting go of the script.
- **Opening**: Letting go is not giving up. It is setting down what you cannot carry anymore — and discovering your hands are free. / Not free because you stopped caring. Free because you chose to stop suffering over what you cannot change. / Six things you might be ready to release.

#### #56 Chitta चित्त — the mind
- **Dir**: `Chitta` | **JS**: `chitta.js` | **Accent**: `#7890b8` (steel blue)
- **Canvas**: Wander — particles move in random walk, changing direction slowly
- **Reveal**: "what's happening" | **Truth**: (understanding)
- **Scenes**:
  1. "The Spiral" — One worry connects to another connects to another. Before you know it, you're catastrophizing at 2 AM.
  2. "The Comparison Machine" — Your mind automatically measures you against everyone. Smarter, prettier, happier, better. It never stops.
  3. "The Replay" — The same moment, over and over. What you should have said. What you should have done. The mind's favorite torture.
  4. "The Fortune Teller" — Your mind predicts the future. It's always bad. It's almost never right. But it feels so real.
  5. "The Inner Courtroom" — Judge, jury, prosecutor — all you. The verdict is always guilty. The sentence is always shame.
  6. "The Quiet Witness" — Behind all the noise, there is a part of you that simply watches. It does not judge. It does not react. It sees.
- **Opening**: Your mind is the most powerful tool you have. It is also the most dangerous one. Because it does not come with an instruction manual. / It spirals. It compares. It catastrophizes. It replays. It judges. And it feels like truth — even when it isn't. / Six patterns of the mind, and how to see them without being owned by them.

#### #57 Iccha इच्छा — desire
- **Dir**: `Iccha` | **JS**: `iccha.js` | **Accent**: `#c88860` (warm amber)
- **Canvas**: Embers
- **Reveal**: "the deeper want" | **Truth**: (truth)
- **Scenes**:
  1. "The Scroll" — You want what they have. The life, the friends, the body, the confidence. But what is it you actually want?
  2. "The Hunger" — Something is missing and you can't name it. So you eat, buy, scroll, distract. The hunger stays.
  3. "Wanting to Be Wanted" — The desire beneath most desires: to matter to someone. To be chosen. To be enough.
  4. "The Dangerous Wish" — You wish your family was different. Your body was different. Your life was different. Is the wish serving you?
  5. "The Thing You Won't Admit" — There's something you want so badly it scares you to say it out loud. Even to yourself.
  6. "Enough" — What if the thing you're searching for is not something you need to find — but something you need to recognize?
- **Opening**: Desire is not the enemy. It is the compass. It tells you what you value, what you lack, what you dream. / But unchecked desire is a fire that consumes more than it warms. The question is not: what do you want? The question is: why do you want it? / Six desires. Each one hiding something deeper.

#### #58 Lajja लज्जा — shame
- **Dir**: `Lajja` | **JS**: `lajja.js` | **Accent**: `#986878` (muted rose)
- **Canvas**: Mist — large faint circles that overlap and drift
- **Reveal**: "where it comes from" | **Truth**: (truth)
- **Scenes**:
  1. "The Thing You Did" — It replays at random. In the shower. Before sleep. You cringe. You wish you could disappear.
  2. "The Body Shame" — Too tall, too short, too much, not enough. The mirror becomes an enemy.
  3. "The Family Shame" — Your family is different. Divorced. Poor. Loud. Quiet. Foreign. You carry it like a secret.
  4. "The Secret" — Something happened that you've told no one. Not because it's your fault. Because shame convinced you it was.
  5. "The Performance" — You pretend to be fine. Happy. Normal. The performance is exhausting but the alternative — being seen — is terrifying.
  6. "Shame vs Guilt" — Guilt says: I did something bad. Shame says: I am bad. One of these is useful. The other is a lie.
- **Opening**: Shame is the most powerful and least discussed emotion in human life. It hides in the dark. It grows in silence. It convinces you that you are the only one. / You are not the only one. Every person you have ever admired has felt exactly what you feel right now. / Six moments of shame. Each one a door to freedom.

#### #59 Krodha क्रोध — anger
- **Dir**: `Krodha` | **JS**: `krodha.js` | **Accent**: `#c85040` (deep red)
- **Canvas**: Embers — flickering, pulsing bright dots
- **Reveal**: "what's underneath" | **Truth**: (truth)
- **Scenes**:
  1. "The Flash" — It comes fast. Hot face, tight fists, racing heart. Before you can think, the words are out.
  2. "The Slow Burn" — This anger has been building for weeks. Months. Small things piling up until the smallest thing tips it over.
  3. "The Righteous Anger" — Something genuinely unfair happened. Your anger is valid. But what do you do with valid anger?
  4. "Anger as Armor" — Sometimes anger is easier than sadness. Easier than fear. Easier than asking for what you need.
  5. "The Aftermath" — The anger passes. What's left? Regret. Broken things. Words you can't take back. The person you hurt.
  6. "Anger as Information" — Anger is not the problem. Anger is the alarm. It tells you: a boundary was crossed. A need was unmet. Something matters to you.
- **Opening**: You have been told that anger is bad. That good girls don't get angry. That anger is destructive. / Here is the truth: anger is information. It is your psyche's alarm system. The question is not whether you feel angry. It is what your anger is trying to tell you. / Six angers. Each one carrying a message.

#### #60 Bhaya भय — mapping fear
- **Dir**: `Bhaya` | **JS**: `bhaya.js` | **Accent**: `#607898` (cool slate)
- **Canvas**: Firefly — intermittent blinking particles that appear and disappear
- **Reveal**: "what it's protecting" | **Truth**: (truth)
- **Scenes**:
  1. "Fear of Rejection" — Raising your hand. Sending the text. Saying how you feel. What if they say no?
  2. "Fear of Failure" — If you never try, you never fail. But you also never become.
  3. "Fear of Being Seen" — Real visibility. Not performance. Being actually, truly known. Terrifying.
  4. "Fear of Loss" — The people you love could leave. The things you have could disappear. So you hold everything too tight.
  5. "Fear of the Unknown" — The new school. The uncertain future. The question no one can answer: what happens next?
  6. "Fear as a Map" — Every fear points to something you care about. The bigger the fear, the more it matters. Fear is not a wall. It is a signpost.
- **Opening**: Fear keeps you safe. Fear also keeps you small. The art is learning to tell the difference — which fears are protecting you and which fears are imprisoning you.

#### #61 Mudita मुदिता — joy in others' joy
- **Dir**: `Mudita` | **JS**: `mudita.js` | **Accent**: `#90b870` (bright sage)
- **Canvas**: Ripple — expanding circles from random points
- **Reveal**: "what blocks it" | **Truth**: (practice)
- **Scenes**:
  1. "Your Friend Wins" — They got the part. The grade. The attention. You are happy. And something else. Can both be true?
  2. "The Sibling Who Shines" — They seem to get everything easily. Love, praise, success. Where does that leave you?
  3. "The Stranger's Good Life" — Online, everyone is thriving. Vacations, achievements, perfect families. Why not you?
  4. "When Joy Feels Impossible" — You are suffering. They are celebrating. The gap between your life and theirs feels like an ocean.
  5. "The Practice" — Choose one person today. Genuinely wish them well. Feel it in your chest. Mudita is a muscle.
  6. "Joy Is Not a Pie" — Someone else's happiness does not reduce yours. There is not a limited supply. Joy expands when shared.

#### #62 Titiksha तितिक्षा — endurance
- **Dir**: `Titiksha` | **JS**: `titiksha.js` | **Accent**: `#787878` (iron gray)
- **Canvas**: Drift — slow particles moving in one direction
- **Reveal**: "what it builds" | **Truth**: (truth)
- **Scenes**:
  1. "The Day That Won't End" — Nothing dramatic. Just heaviness. Getting through requires everything you have.
  2. "The Chronic Struggle" — A problem that doesn't resolve. A situation that doesn't improve. Living with what you cannot fix.
  3. "The Pain You Can't Explain" — No one sees it. No one understands it. You carry it alone and wonder how long.
  4. "The Unfair Weight" — You carry more than other kids your age. It's not right. And you carry it anyway.
  5. "Endurance Is Not Silence" — Bearing it does not mean suffering alone. Endurance includes asking for help, crying, resting.
  6. "What Endurance Teaches" — You discover you are stronger than you thought. Not because the pain was worth it — but because you survived it.

#### #63 Pratyahara प्रत्याहार — turning inward
- **Dir**: `Pratyahara` | **JS**: `pratyahara.js` | **Accent**: `#686888` (deep lavender)
- **Canvas**: Mist
- **Reveal**: "what you find" | **Truth**: (stillness)
- **Scenes**:
  1. "The Noise" — Notifications, opinions, music, voices, demands. The world pours in through every opening.
  2. "The Closing" — What if you turned it all off? Just for five minutes. No screen. No sound. No input.
  3. "The Discomfort" — Silence feels wrong at first. Anxious. Boring. Empty. Sit with it.
  4. "The Inner Landscape" — Behind the noise, there is a world inside you. Feelings. Images. Memories. Knowing.
  5. "The Recharge" — Turning inward is not hiding. It is refueling. You cannot give from empty.
  6. "The Choice" — You get to decide what enters your mind. Not everything deserves your attention.

#### #64 Sadhana साधना — daily practice
- **Dir**: `Sadhana` | **JS**: `sadhana.js` | **Accent**: `#a09050` (warm ochre)
- **Canvas**: Rise — sparks floating upward
- **Reveal**: "why it works" | **Truth**: (truth)
- **Scenes**:
  1. "The First Day" — Exciting. New. Full of intention. This time will be different.
  2. "The Third Week" — The excitement is gone. The practice is just... effort. This is where it matters.
  3. "The Missed Day" — You forgot. Or you chose not to. The guilt. The temptation to abandon it entirely.
  4. "The Invisible Progress" — You can't see growth from inside it. Like height — you don't notice until someone measures.
  5. "The Compound Effect" — One push-up is nothing. One push-up every day for a year is transformation.
  6. "Your Sadhana" — It doesn't have to be meditation or yoga. Reading. Journaling. Walking. Breathing. Choose one thing. Do it daily.

#### #65 Sthiti स्थिति — grounding
- **Dir**: `Sthiti` | **JS**: `sthiti.js` | **Accent**: `#807060` (warm earth)
- **Canvas**: Settle — particles that gradually reduce jitter amplitude
- **Reveal**: "how to ground" | **Truth**: (practice)
- **Scenes**:
  1. "The Overwhelm" — Everything at once. School, family, friends, feelings. The ground disappears.
  2. "Five Senses" — Five things you see. Four you hear. Three you touch. Two you smell. One you taste. You are here.
  3. "Your Feet" — Feel the floor beneath you. Push into it. The earth is holding you up. It has never stopped.
  4. "The Anchor Breath" — When everything spins, one breath is a rope. Hold it. Follow it down.
  5. "The Safe Place" — Real or imagined. A room, a memory, a person's arms. Go there in your mind. Stay.
  6. "You Are the Ground" — You have been looking for stability outside yourself. What if you are the stable thing?

#### #66 Dana दान — generosity
- **Dir**: `Dana` | **JS**: `dana.js` | **Accent**: `#58a878` (jade green)
- **Canvas**: Radiate — particles emanating outward from center
- **Reveal**: "what happens when you give" | **Truth**: (truth)
- **Scenes**:
  1. "Time" — The most valuable thing you have. Giving it to someone is an act of love they may not recognize.
  2. "Attention" — Full presence. No phone. No wandering mind. Just: I am here, and I am listening to you.
  3. "Credit" — Giving someone credit for their idea. Their contribution. Their effort. Even when you could claim it.
  4. "The Benefit of the Doubt" — Assuming the best instead of the worst. A form of generosity most people never consider.
  5. "Forgiveness" — The most expensive gift. Given not because they deserve it but because you refuse to carry the weight.
  6. "What You Can't Afford" — You think you have nothing to give. You have a smile. A kind word. Your presence. These are currencies that never run out.

#### #67 Shreyasi श्रेयसी — the better path
- **Dir**: `Shreyasi` | **JS**: `shreyasi.js` | **Accent**: `#a88050` (burnished gold)
- **Canvas**: Constellation
- **Reveal**: "the easier path" | **Truth**: (the better path)
- **Scenes**:
  1. "Popular vs Right" — The popular choice gets applause. The right choice gets silence. Which one builds character?
  2. "Comfortable vs Growing" — Growth lives outside comfort. Every time you choose ease, you choose to stay the same.
  3. "Reacting vs Responding" — The reaction is instant and satisfying. The response takes three breaths and changes everything.
  4. "Short-term vs Long-term" — The marshmallow test. The daily choice between what feels good now and what builds something lasting.
  5. "Blaming vs Owning" — It's their fault. Maybe. But what's your part? Owning your part is the harder, better path.
  6. "Knowing vs Doing" — You know what's right. Everyone does. The gap between knowing and doing is where character lives.

#### #68 Abhyasa अभ्यास — persistent practice
- **Dir**: `Abhyasa` | **JS**: `abhyasa.js` | **Accent**: `#908058` (brass)
- **Canvas**: Rise
- **Reveal**: "what changes" | **Truth**: (truth)
- **Scenes**:
  1. "The Beginner" — Everything is hard. Everyone else seems to know. The gap between where you are and where you want to be is vast.
  2. "The Plateau" — You were improving. Now you're not. The plateau is not failure — it is consolidation.
  3. "The Setback" — Two steps forward, one step back. The setback does not erase the progress.
  4. "The Invisible Work" — No one sees you practicing. No one sees the drafts, the attempts, the quiet hours.
  5. "The Breakthrough" — It comes without warning. Something clicks. All that invisible work was building toward this.
  6. "The Lifelong Student" — Mastery is not a destination. It is the decision to keep learning. Forever. About everything.

#### #69 Smaran स्मरण — the memories that made you
- **Dir**: `Smaran` | **JS**: `smaran.js` | **Accent**: `#a89070` (warm sepia)
- **Canvas**: Firefly — intermittent blinking particles
- **Reveal**: "what it shaped" | **Truth**: (truth)
- **Scenes**:
  1. "The Kitchen" — A specific smell. A voice calling you. The texture of the table. Your earliest memory of home.
  2. "The First Time" — First day of school. First friend. First time you realized the world was bigger than your house.
  3. "The Moment You Changed" — Something happened and you were never the same after. It might have been small. It wasn't.
  4. "The Person Who Saw You" — One person looked at you and really saw you. A teacher, a grandparent, a stranger. You remember it decades later.
  5. "The Hurt That Taught" — A memory you wish you could erase. But when you look at it now, it taught you something you needed.
  6. "The Ordinary Day" — No special occasion. Just a Tuesday. But something about the light, the laughter, the stillness — it stayed.

#### #70 Prajna प्रज्ञा — inner wisdom
- **Dir**: `Prajna` | **JS**: `prajna.js` | **Accent**: `#8878a8` (deep amethyst)
- **Canvas**: Constellation
- **Reveal**: "how you know" | **Truth**: (wisdom)
- **Scenes**:
  1. "The Gut Feeling" — You can't explain it. You can't prove it. But something in you knows. Are you listening?
  2. "The Thing You Learned Without Being Taught" — No class, no lesson. You just... understood. Where did that come from?
  3. "The Pattern You See" — You notice things other people miss. Patterns in behavior, in situations, in yourself.
  4. "The Quiet Knowing" — In the middle of chaos, something in you is calm. It knows what to do. Trust it.
  5. "Wisdom vs Knowledge" — Knowledge is what you learn from books. Wisdom is what you learn from living. You have both.
  6. "The Elder Inside" — There is a part of you that is older than your age. Wiser than your years. It has been with you always.

---

### SECTION: Seeing Others (15 new → #71–#85)

#### #71 Karuna करुणा — compassion
- **Dir**: `Karuna` | **JS**: `karuna.js` | **Accent**: `#5898a8` (ocean teal)
- **Canvas**: Ripple
- **Scenes**: 1. "The Suffering You See" 2. "The Suffering You Don't" 3. "Compassion Fatigue" 4. "Compassion for the Difficult Person" 5. "Compassion Without Fixing" 6. "Compassion for Yourself"

#### #72 Sneha स्नेह — affection
- **Dir**: `Sneha` | **JS**: `sneha.js` | **Accent**: `#c88898` (soft rose)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "The Hug You Needed" 2. "The Nickname" 3. "The Quiet Presence" 4. "The Small Gesture" 5. "Affection You Can't Return" 6. "Showing Love in Your Language"

#### #73 Guru गुरु — the teacher
- **Dir**: `Guru` | **JS**: `guru.js` | **Accent**: `#a89060` (amber)
- **Canvas**: Lantern
- **Scenes**: 1. "The Teacher in the Classroom" 2. "The Teacher Who Hurt You" 3. "The Friend Who Taught You" 4. "The Lesson in Failure" 5. "The Book That Changed You" 6. "You, the Teacher"

#### #74 Vatsalya वात्सल्य — parental love
- **Dir**: `Vatsalya` | **JS**: `vatsalya.js` | **Accent**: `#b08868` (warm clay)
- **Canvas**: Lantern
- **Scenes**: 1. "The Love That Looks Like Control" 2. "The Love That Can't Reach You" 3. "The Imperfect Parent" 4. "What They Sacrificed" 5. "The Argument" 6. "Love You'll Understand Later"

#### #75 Sangha संघ — community
- **Dir**: `Sangha` | **JS**: `sangha.js` | **Accent**: `#78a880` (sage)
- **Canvas**: Constellation
- **Scenes**: 1. "The Table" 2. "The Team" 3. "The Chosen Family" 4. "When Community Fails" 5. "Finding Your People" 6. "Being Someone's Community"

#### #76 Paraspar परस्पर — reciprocity
- **Dir**: `Paraspar` | **JS**: `paraspar.js` | **Accent**: `#8898a8` (steel blue)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "The One Who Always Gives" 2. "The One Who Always Takes" 3. "Keeping Score" 4. "Receiving Gracefully" 5. "The Uneven Friendship" 6. "Balance"

#### #77 Samvad संवाद — dialogue
- **Dir**: `Samvad` | **JS**: `samvad.js` | **Accent**: `#a0a070` (olive)
- **Canvas**: Wander
- **Scenes**: 1. "Talking vs Communicating" 2. "The Argument That Goes in Circles" 3. "Saying What You Mean" 4. "The Conversation You're Avoiding" 5. "Listening to Understand, Not Reply" 6. "The Repair Conversation"

#### #78 Nyaya न्याय — justice
- **Dir**: `Nyaya` | **JS**: `nyaya.js` | **Accent**: `#6888a0` (justice blue)
- **Canvas**: Drift
- **Scenes**: 1. "When It's Not Fair" 2. "The Rule That's Wrong" 3. "Speaking Up for Others" 4. "Justice vs Revenge" 5. "The Privilege You Didn't Choose" 6. "Making Things More Fair"

#### #79 Sahishnuta सहिष्णुता — tolerance
- **Dir**: `Sahishnuta` | **JS**: `sahishnuta.js` | **Accent**: `#88a898` (mint)
- **Canvas**: Float
- **Scenes**: 1. "The Person Who Annoys You" 2. "The Belief You Don't Share" 3. "The Way They Live" 4. "Tolerance vs Agreement" 5. "Your Own Intolerance" 6. "Living Together Differently"

#### #80 Adarsha आदर्श — role model
- **Dir**: `Adarsha` | **JS**: `adarsha.js` | **Accent**: `#b8a058` (gold)
- **Canvas**: Rise
- **Scenes**: 1. "The Person You Admire" 2. "The Flawed Hero" 3. "The Invisible Role Model" 4. "The Anti-Model" 5. "Who You're Becoming For Someone Else" 6. "Choosing Your Own Standards"

#### #81 Bandhu बन्धु — kinship
- **Dir**: `Bandhu` | **JS**: `bandhu.js` | **Accent**: `#a08870` (terra cotta)
- **Canvas**: Constellation
- **Scenes**: 1. "Blood Family" 2. "Chosen Family" 3. "The Bond That Survives Distance" 4. "The Relative Who Understands" 5. "Family You Haven't Met" 6. "You Are Someone's Kin"

#### #82 Drishya दृश्य — point of view
- **Dir**: `Drishya` | **JS**: `drishya.js` | **Accent**: `#7888b8` (periwinkle)
- **Canvas**: Wander
- **Scenes**: 1. "Your Version" 2. "Their Version" 3. "The Version No One Tells" 4. "The Camera Angle" 5. "The News vs The Truth" 6. "Holding Multiple Truths"

#### #83 Aashirwad आशीर्वाद — blessing
- **Dir**: `Aashirwad` | **JS**: `aashirwad.js` | **Accent**: `#c8a858` (warm gold)
- **Canvas**: Radiate
- **Scenes**: 1. "The Words Someone Said to You" 2. "The Blessing You Didn't Recognize" 3. "What You'd Say to Your Younger Self" 4. "Blessing Someone Difficult" 5. "The Everyday Blessing" 6. "You Are a Blessing to Someone"

#### #84 Sakshin साक्षिन् — the witness
- **Dir**: `Sakshin` | **JS**: `sakshin.js` | **Accent**: `#688898` (quiet teal)
- **Canvas**: Float
- **Scenes**: 1. "Watching Without Judging" 2. "Being Witnessed" 3. "The Bystander" 4. "Holding Space" 5. "The Silent Support" 6. "Witnessing Yourself"

#### #85 Prema प्रेम — love
- **Dir**: `Prema` | **JS**: `prema.js` | **Accent**: `#c07080` (warm rose)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "Love That Doesn't Say It" 2. "Love That Hurts" 3. "Love at a Distance" 4. "Love You Don't Deserve (You Do)" 5. "Loving Someone Who Can't Love You Back" 6. "What Love Actually Is"

---

### SECTION: Healing (15 new → #86–#100)

#### #86 Viraha विरह — longing
- **Dir**: `Viraha` | **JS**: `viraha.js` | **Accent**: `#8878a0` (dusk purple)
- **Canvas**: Rain — drops falling with trailing lines
- **Scenes**: 1. "Missing Someone" 2. "Missing Who They Were" 3. "Missing a Place" 4. "Missing a Version of Yourself" 5. "The Ache That Won't Name Itself" 6. "Longing as Love"

#### #87 Shanti शान्ति — peace
- **Dir**: `Shanti` | **JS**: `shanti.js` | **Accent**: `#70a098` (calm teal)
- **Canvas**: Float
- **Scenes**: 1. "After the Storm" 2. "The Ceasefire" 3. "Peace with Imperfection" 4. "Peace with the Past" 5. "Inner Peace vs Outer Chaos" 6. "The Practice of Peace"

#### #88 Chikitsa चिकित्सा — healing
- **Dir**: `Chikitsa` | **JS**: `chikitsa.js` | **Accent**: `#68a880` (healing green)
- **Canvas**: Rise
- **Scenes**: 1. "The Wound You Ignore" 2. "The Healing That Hurts" 3. "Setbacks in Recovery" 4. "The Scar" 5. "Asking for Help to Heal" 6. "You Are Already Healing"

#### #89 Mukti मुक्ति — liberation
- **Dir**: `Mukti` | **JS**: `mukti.js` | **Accent**: `#88a8c8` (sky blue)
- **Canvas**: Ascend — particles start fast and slow to stillness
- **Scenes**: 1. "Freedom from Others' Expectations" 2. "Freedom from Your Own Perfectionism" 3. "Freedom from the Past" 4. "Freedom from the Need to Perform" 5. "Freedom to Feel" 6. "What Freedom Actually Looks Like"

#### #90 Punarjanma पुनर्जन्म — rebirth
- **Dir**: `Punarjanma` | **JS**: `punarjanma.js` | **Accent**: `#90a860` (spring green)
- **Canvas**: Rise
- **Scenes**: 1. "The End of Something" 2. "The Empty Space" 3. "The First New Thing" 4. "Who You Are Now" 5. "Gratitude for the Breaking" 6. "The Person You Couldn't Have Become Otherwise"

#### #91 Chaaya छाया — shadow
- **Dir**: `Chaaya` | **JS**: `chaaya.js` | **Accent**: `#686080` (deep violet)
- **Canvas**: Mist
- **Scenes**: 1. "The Part You Hide" 2. "The Jealousy" 3. "The Anger You Deny" 4. "The Need You Won't Admit" 5. "Meeting Your Shadow" 6. "Integration"

#### #92 Amrita अमृत — nectar
- **Dir**: `Amrita` | **JS**: `amrita.js` | **Accent**: `#c8a860` (honey)
- **Canvas**: Lantern
- **Scenes**: 1. "The Beautiful Moment Inside the Hard Day" 2. "The Kindness from a Stranger" 3. "The Unexpected Laugh" 4. "The Song That Found You" 5. "The Ordinary Made Sacred" 6. "Sweetness Is Not Denial"

#### #93 Bandhan बन्धन — bonds that bind
- **Dir**: `Bandhan` | **JS**: `bandhan.js` | **Accent**: `#907868` (dusty bronze)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "The Obligation" 2. "The Guilt Trip" 3. "The Toxic Loyalty" 4. "The Enmeshment" 5. "Cutting the Cord" 6. "Healthy Bonds vs Binding Bonds"

#### #94 Vishranti विश्रान्ति — rest
- **Dir**: `Vishranti` | **JS**: `vishranti.js` | **Accent**: `#6878a0` (soft night blue)
- **Canvas**: Float
- **Scenes**: 1. "The Exhaustion You Hide" 2. "Rest Is Not Laziness" 3. "The Guilt of Resting" 4. "What Your Body Is Telling You" 5. "Permission to Stop" 6. "Rest as Resistance"

#### #95 Sutra सूत्र — thread
- **Dir**: `Sutra` | **JS**: `sutra.js` | **Accent**: `#a89080` (linen)
- **Canvas**: Constellation — static dots with connecting lines
- **Scenes**: 1. "The Thread Between You and Your Past" 2. "The Thread Between You and Someone You Lost" 3. "The Thread You Don't See" 4. "The Thread That Breaks" 5. "The Thread You Choose" 6. "Everything Is Connected"

#### #96 Nirveda निर्वेद — disillusionment
- **Dir**: `Nirveda` | **JS**: `nirveda.js` | **Accent**: `#788080` (gray-green)
- **Canvas**: Drift
- **Scenes**: 1. "The Hero Who Fell" 2. "The Promise That Broke" 3. "The World Is Not What They Said" 4. "Growing Up Is Losing Illusions" 5. "The Gift of Seeing Clearly" 6. "Building on Truth Instead of Fantasy"

#### #97 Samashti समष्टि — wholeness
- **Dir**: `Samashti` | **JS**: `samashti.js` | **Accent**: `#88a088` (sage)
- **Canvas**: Radiate
- **Scenes**: 1. "The Pieces of You" 2. "The Part That Doesn't Fit" 3. "Contradictions" 4. "Nothing Is Missing" 5. "Integration" 6. "You Were Never Broken"

#### #98 Prayashchitta प्रायश्चित्त — making amends
- **Dir**: `Prayashchitta` | **JS**: `prayashchitta.js` | **Accent**: `#a08868` (warm umber)
- **Canvas**: Rise
- **Scenes**: 1. "The Thing You Did" 2. "The Apology" 3. "When Sorry Isn't Enough" 4. "Making It Right" 5. "Forgiving Yourself" 6. "Changed Behavior Is the Real Amend"

#### #99 Sparsha-Chitta स्पर्शचित्त — emotional safety
- **Dir**: `SparshaChitta` | **JS**: `sparshaChitta.js` | **Accent**: `#a08890` (mauve)
- **Canvas**: Lantern
- **Scenes**: 1. "The Flinch" 2. "The Wall You Built" 3. "Trusting Again" 4. "Safe People vs Unsafe People" 5. "Your Right to Safety" 6. "Building Safety from the Inside"

#### #100 Kshar क्षार — what remains
- **Dir**: `Kshar` | **JS**: `kshar.js` | **Accent**: `#808870` (lichen)
- **Canvas**: Settle
- **Scenes**: 1. "What the Fire Didn't Burn" 2. "What the Flood Didn't Wash Away" 3. "What the Lie Didn't Destroy" 4. "What the Distance Didn't Weaken" 5. "What the Pain Didn't Take" 6. "You Remain"

---

### SECTION: Growing (20 new → #101–#120)

#### #101 Udaya उदय — dawn
- **Dir**: `Udaya` | **JS**: `udaya.js` | **Accent**: `#c8a060` (sunrise gold)
- **Canvas**: Rise
- **Scenes**: 1. "After the Worst Night" 2. "The First Morning After" 3. "New School, New Start" 4. "The Day Everything Changed" 5. "Small Beginnings" 6. "Every Day Is a New Dawn"

#### #102 Bija बीज — seed
- **Dir**: `Bija` | **JS**: `bija.js` | **Accent**: `#78a060` (green)
- **Canvas**: Rise
- **Scenes**: 1. "The Idea" 2. "The Kindness" 3. "The Habit" 4. "The Belief" 5. "The Conversation" 6. "What You Plant Today"

#### #103 Pushpa पुष्प — bloom
- **Dir**: `Pushpa` | **JS**: `pushpa.js` | **Accent**: `#c87890` (pink)
- **Canvas**: Radiate
- **Scenes**: 1. "Late Bloomers" 2. "Blooming in the Wrong Garden" 3. "The Season You Bloom" 4. "Blooming Isn't Pretty" 5. "Your Unique Bloom" 6. "You Are Already Blooming"

#### #104 Chandra चन्द्र — the moon
- **Dir**: `Chandra` | **JS**: `chandra.js` | **Accent**: `#a0a8c0` (moonlight)
- **Canvas**: Float
- **Scenes**: 1. "The Full Moon" 2. "The New Moon" 3. "The Waning" 4. "The Eclipse" 5. "The Tides You Pull" 6. "Your Phases Are Natural"

#### #105 Sagara सागर — the ocean
- **Dir**: `Sagara` | **JS**: `sagara.js` | **Accent**: `#5088a8` (deep sea)
- **Canvas**: Tide — particles moving in wave pattern
- **Scenes**: 1. "The Surface" 2. "The Depths" 3. "The Current" 4. "The Storm" 5. "The Calm After" 6. "You Are Deeper Than You Know"

#### #106 Parvata पर्वत — the mountain
- **Dir**: `Parvata` | **JS**: `parvata.js` | **Accent**: `#808878` (stone)
- **Canvas**: Settle
- **Scenes**: 1. "The Base" 2. "The Climb" 3. "The False Summit" 4. "The View From Halfway" 5. "The Summit" 6. "The Mountain Doesn't Rush"

#### #107 Dhara धारा — flow
- **Dir**: `Dhara` | **JS**: `dhara.js` | **Accent**: `#5898b0` (river blue)
- **Canvas**: Tide
- **Scenes**: 1. "The Resistance" 2. "The Surrender" 3. "The Obstacle" 4. "The Fork" 5. "The Confluence" 6. "Water Always Finds a Way"

#### #108 Ritu ऋतु — seasons
- **Dir**: `Ritu` | **JS**: `ritu.js` | **Accent**: `#a89858` (autumn)
- **Canvas**: Leaves
- **Scenes**: 1. "Spring" 2. "Summer" 3. "Autumn" 4. "Winter" 5. "The Season You're In" 6. "Everything Has Its Time"

#### #109 Rangoli रंगोली — patterns
- **Dir**: `Rangoli` | **JS**: `rangoli.js` | **Accent**: `#c87060` (vermillion)
- **Canvas**: Radiate
- **Scenes**: 1. "The Pattern You Repeat" 2. "The Pattern That Protects You" 3. "The Pattern That Traps You" 4. "Breaking the Pattern" 5. "New Patterns" 6. "The Beauty in the Design"

#### #110 Kavya काव्य — the poetic eye
- **Dir**: `Kavya` | **JS**: `kavya.js` | **Accent**: `#9880a8` (plum)
- **Canvas**: Firefly
- **Scenes**: 1. "The Ordinary Made Extraordinary" 2. "The Words You Can't Find" 3. "The Feeling That Needs Language" 4. "The Story Only You Can Tell" 5. "Beauty in Broken Things" 6. "Your Life Is a Poem"

#### #111 Nritya नृत्य — movement
- **Dir**: `Nritya` | **JS**: `nritya.js` | **Accent**: `#c08058` (copper)
- **Canvas**: Swirl — particles following gentle spiral paths
- **Scenes**: 1. "The Body Knows" 2. "Moving Through Emotion" 3. "The Stillness Before" 4. "When Words Fail, Move" 5. "Your Rhythm" 6. "Dancing in the Dark"

#### #112 Raga राग — inner melody
- **Dir**: `Raga` | **JS**: `raga.js` | **Accent**: `#b87858` (warm bronze)
- **Canvas**: Tide
- **Scenes**: 1. "The Song That Understands" 2. "The Silence Between Notes" 3. "Your Emotional Soundtrack" 4. "The Music You Make" 5. "Harmony and Dissonance" 6. "Every Life Has a Melody"

#### #113 Swaraj स्वराज — self-governance
- **Dir**: `Swaraj` | **JS**: `swaraj.js` | **Accent**: `#b89848` (sovereign gold)
- **Canvas**: Constellation
- **Scenes**: 1. "Your Rules" 2. "When Others Govern You" 3. "The Inner Tyrant" 4. "Choosing Your Values" 5. "The Freedom of Discipline" 6. "Governing Yourself with Kindness"

#### #114 Lakshya लक्ष्य — aim
- **Dir**: `Lakshya` | **JS**: `lakshya.js` | **Accent**: `#c8a048` (target gold)
- **Canvas**: Rise
- **Scenes**: 1. "The Dream" 2. "The First Step" 3. "The Distraction" 4. "The Doubt" 5. "The Adjusting" 6. "Walking Toward"

#### #115 Parakram पराक्रम — valor
- **Dir**: `Parakram` | **JS**: `parakram.js` | **Accent**: `#c08048` (bronze)
- **Canvas**: Embers
- **Scenes**: 1. "The Moment Before Courage" 2. "The Quiet Bravery" 3. "Standing Alone" 4. "The Cost of Being Brave" 5. "Valor Is Not Fearlessness" 6. "Your Bravest Moment"

#### #116 Moksha मोक्ष — freedom
- **Dir**: `Moksha` | **JS**: `moksha.js` | **Accent**: `#80a8c8` (liberation blue)
- **Canvas**: Ascend
- **Scenes**: 1. "Free from What Others Think" 2. "Free from Perfection" 3. "Free from the Past" 4. "Free to Be Wrong" 5. "Free to Change Your Mind" 6. "What Freedom Feels Like"

#### #117 Swapna स्वप्न — the dream
- **Dir**: `Swapna` | **JS**: `swapna.js` | **Accent**: `#9088c0` (dream violet)
- **Canvas**: Firefly
- **Scenes**: 1. "The Dream You Tell No One" 2. "The Dream That Scares You" 3. "The Dream Someone Laughed At" 4. "The Dream That Changed" 5. "The Small Dream" 6. "Permission to Dream"

#### #118 Jigyasa जिज्ञासा — curiosity
- **Dir**: `Jigyasa` | **JS**: `jigyasa.js` | **Accent**: `#78a8b8` (curious blue)
- **Canvas**: Wander
- **Scenes**: 1. "The Question No One Asks" 2. "The Why Behind the Why" 3. "Learning from Everything" 4. "The Uncomfortable Question" 5. "Curiosity vs Judgment" 6. "Stay Curious"

#### #119 Kaushal कौशल — craft
- **Dir**: `Kaushal` | **JS**: `kaushal.js` | **Accent**: `#a89060` (craft gold)
- **Canvas**: Rise
- **Scenes**: 1. "What Your Hands Know" 2. "The First Terrible Attempt" 3. "The 10,000 Hours" 4. "Skill vs Talent" 5. "The Joy of Getting Better" 6. "What You're Building"

#### #120 Sahyogi सहयोगी — collaboration
- **Dir**: `Sahyogi` | **JS**: `sahyogi.js` | **Accent**: `#68a898` (teal)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "Working Together" 2. "The Difficult Partner" 3. "Compromising Without Losing Yourself" 4. "Trusting Others' Strengths" 5. "When You Need to Lead" 6. "When You Need to Follow"

---

### SECTION: The Digital World (new, 10 → #121–#130)

#### #121 Chhavi छवि — image
- **Dir**: `Chhavi` | **JS**: `chhavi.js` | **Accent**: `#8888c0` (screen blue)
- **Canvas**: Firefly
- **Scenes**: 1. "The Profile" 2. "The Filter" 3. "The Curated Life" 4. "Who Sees the Real You" 5. "The Gap Between Image and Reality" 6. "Choosing Authenticity"

#### #122 Tulana तुलना — comparison
- **Dir**: `Tulana` | **JS**: `tulana.js` | **Accent**: `#a88880` (faded rose)
- **Canvas**: Drift
- **Scenes**: 1. "The Scroll of Perfect Lives" 2. "The Highlight Reel" 3. "Comparing Insides to Outsides" 4. "The Metric You Chose" 5. "Your Own Measuring Stick" 6. "Enough Is Not a Number"

#### #123 Vichalan विचलन — distraction
- **Dir**: `Vichalan` | **JS**: `vichalan.js` | **Accent**: `#a89888` (warm gray)
- **Canvas**: Wander
- **Scenes**: 1. "The Notification" 2. "The Rabbit Hole" 3. "The Numbing" 4. "What You're Avoiding" 5. "The Reclamation" 6. "Your Attention Is Precious"

#### #124 Satyata सत्यता — authenticity
- **Dir**: `Satyata` | **JS**: `satyata.js` | **Accent**: `#a8a058` (true gold)
- **Canvas**: Rise
- **Scenes**: 1. "The Mask Online" 2. "The Mask at School" 3. "The Mask at Home" 4. "The Cost of Pretending" 5. "One Authentic Moment" 6. "Being Real Is Revolutionary"

#### #125 Prabhav प्रभाव — influence
- **Dir**: `Prabhav` | **JS**: `prabhav.js` | **Accent**: `#7888a0` (influence blue)
- **Canvas**: Ripple
- **Scenes**: 1. "Who Shapes Your Thoughts" 2. "The Algorithm" 3. "The Trend You Followed" 4. "The Peer Pressure You Didn't Notice" 5. "Your Influence on Others" 6. "Choosing Your Influences"

#### #126 Kshanabhangur क्षणभंगुर — ephemeral
- **Dir**: `Kshanabhangur` | **JS**: `kshanabhangur.js` | **Accent**: `#9898a8` (fleeting gray)
- **Canvas**: Firefly
- **Scenes**: 1. "The Story That Disappears" 2. "The Moment Before Screenshot" 3. "What Permanence Means Online" 4. "Digital Memory vs Human Memory" 5. "What Deserves to Last" 6. "Let It Go"

#### #127 Virasat विरासत — legacy
- **Dir**: `Virasat` | **JS**: `virasat.js` | **Accent**: `#a88870` (heritage brown)
- **Canvas**: Constellation
- **Scenes**: 1. "What You Inherit" 2. "What You Pass On" 3. "The Digital Footprint" 4. "The Story They'll Tell About You" 5. "Choosing What to Keep" 6. "Building Something That Lasts"

#### #128 Saksham सक्षम — empowerment
- **Dir**: `Saksham` | **JS**: `saksham.js` | **Accent**: `#68a890` (empowered teal)
- **Canvas**: Radiate
- **Scenes**: 1. "Using, Not Being Used" 2. "The Tool vs The Trap" 3. "Creating vs Consuming" 4. "Setting Boundaries with Technology" 5. "The Power of Disconnecting" 6. "Technology in Service of Your Life"

#### #129 Drishtikon दृष्टिकोण — lens
- **Dir**: `Drishtikon` | **JS**: `drishtikon.js` | **Accent**: `#8078a0` (lens purple)
- **Canvas**: Wander
- **Scenes**: 1. "The Feed You're Fed" 2. "The Bubble" 3. "The Other Side" 4. "Critical Thinking" 5. "Your Own Lens" 6. "Seeing Beyond the Screen"

#### #130 Pratishtha प्रतिष्ठा — reputation
- **Dir**: `Pratishtha` | **JS**: `pratishtha.js` | **Accent**: `#a09868` (dignified gold)
- **Canvas**: Settle
- **Scenes**: 1. "What They Say About You" 2. "What You Say About Yourself" 3. "The Rumor" 4. "Character vs Reputation" 5. "Rebuilding After a Mistake" 6. "Your Name Is Yours"

---

### SECTION: Family (new, 10 → #131–#140)

#### #131 Kutumb कुटुम्ब — family
- **Dir**: `Kutumb` | **JS**: `kutumb.js` | **Accent**: `#b09060` (hearth)
- **Canvas**: Lantern
- **Scenes**: 1. "The Family You Were Born Into" 2. "The Family That Changed Shape" 3. "The Family Secret" 4. "The Family Strength" 5. "The Family You Choose" 6. "Family Is a Verb"

#### #132 Ghar घर — home
- **Dir**: `Ghar` | **JS**: `ghar.js` | **Accent**: `#a89868` (warm sand)
- **Canvas**: Lantern
- **Scenes**: 1. "The Smell of Home" 2. "When Home Isn't Safe" 3. "Two Homes" 4. "The Home You Carry Inside" 5. "Making a Space Yours" 6. "Home Is Not a Place"

#### #133 Pitamah पितामह — ancestors
- **Dir**: `Pitamah` | **JS**: `pitamah.js` | **Accent**: `#908868` (ancient bronze)
- **Canvas**: Constellation
- **Scenes**: 1. "The Name You Carry" 2. "The Story Before Your Story" 3. "What They Survived" 4. "What They Dreamed" 5. "The Debt You Don't Owe" 6. "You Are Their Wildest Hope"

#### #134 Janani जननी — mother
- **Dir**: `Janani` | **JS**: `janani.js` | **Accent**: `#b08878` (warm rose)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "The Love You See" 2. "The Love That's Complicated" 3. "What She Carries" 4. "The Arguments" 5. "Understanding Later" 6. "Love Is Not Agreement"

#### #135 Pita पिता — father
- **Dir**: `Pita` | **JS**: `pita.js` | **Accent**: `#907858` (dark amber)
- **Canvas**: Lantern
- **Scenes**: 1. "The Love He Shows" 2. "The Love He Can't Show" 3. "What He Gave Up" 4. "The Distance" 5. "What You Wish He Knew" 6. "Love Across the Gap"

#### #136 Bhratra भ्रातृ — sibling
- **Dir**: `Bhratra` | **JS**: `bhratra.js` | **Accent**: `#8898a0` (sibling blue)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "The Rivalry" 2. "The Alliance" 3. "The Favorite" 4. "The Shared Language" 5. "Growing Apart" 6. "The Bond That Survives"

#### #137 Vivad विवाद — family conflict
- **Dir**: `Vivad` | **JS**: `vivad.js` | **Accent**: `#a87060` (conflict red)
- **Canvas**: Settle
- **Scenes**: 1. "The Fight You Overheard" 2. "Being Caught in the Middle" 3. "Taking Sides" 4. "The Silence After" 5. "It's Not Your Fault" 6. "Conflict Is Not the End of Love"

#### #138 Antara अन्तर — the space between
- **Dir**: `Antara` | **JS**: `antara.js` | **Accent**: `#7880a0` (gap blue)
- **Canvas**: Drift
- **Scenes**: 1. "Between Two Homes" 2. "Between Two Parents" 3. "Between Two Cultures" 4. "Between Two Versions of You" 5. "The Bridge You Build" 6. "The Space Is Yours"

#### #139 Gharonda घरौंदा — building home
- **Dir**: `Gharonda` | **JS**: `gharonda.js` | **Accent**: `#a09060` (clay)
- **Canvas**: Rise
- **Scenes**: 1. "What Home Means to You" 2. "The Ritual" 3. "The Object" 4. "The Feeling" 5. "Home in a Person" 6. "Building Your Own"

#### #140 Sthapana स्थापना — foundation
- **Dir**: `Sthapana` | **JS**: `sthapana.js` | **Accent**: `#887860` (stone)
- **Canvas**: Settle
- **Scenes**: 1. "What Was Built for You" 2. "What Cracked" 3. "What Held" 4. "What You're Rebuilding" 5. "The Foundation Is You" 6. "You Can Build on Anything"

---

### SECTION: School & Purpose (new, 10 → #141–#150)

#### #141 Vidya विद्या — knowledge
- **Dir**: `Vidya` | **JS**: `vidya.js` | **Accent**: `#7898b0` (knowledge blue)
- **Canvas**: Constellation
- **Scenes**: 1. "Learning vs Being Taught" 2. "The Subject You Hate" 3. "The Subject That Lights You Up" 4. "Learning from Failure" 5. "Learning Outside School" 6. "You Know More Than You Think"

#### #142 Pariksha परीक्षा — the test
- **Dir**: `Pariksha` | **JS**: `pariksha.js` | **Accent**: `#a08870` (paper brown)
- **Canvas**: Settle
- **Scenes**: 1. "The Grade" 2. "The Pressure" 3. "The Blank Mind" 4. "You Are Not Your Score" 5. "What Tests Don't Measure" 6. "The Test That Matters"

#### #143 Prayatna प्रयत्न — effort
- **Dir**: `Prayatna` | **JS**: `prayatna.js` | **Accent**: `#b09050` (effort gold)
- **Canvas**: Rise
- **Scenes**: 1. "Trying When You Don't Want To" 2. "Effort Without Guarantee" 3. "Effort Others Don't See" 4. "When Effort Isn't Enough" 5. "Effort vs Perfection" 6. "The Honor of Trying"

#### #144 Asafalta असफलता — failure
- **Dir**: `Asafalta` | **JS**: `asafalta.js` | **Accent**: `#808080` (gray)
- **Canvas**: Drift
- **Scenes**: 1. "The Public Failure" 2. "The Private Failure" 3. "The Failure That Freed You" 4. "The Failure You Can't Forgive" 5. "Failing Forward" 6. "Everyone You Admire Has Failed"

#### #145 Jigyasa जिज्ञासा — curiosity
- **NOTE**: Already #118. Replace with:

#### #145 Medhavi मेधावी — intelligence
- **Dir**: `Medhavi` | **JS**: `medhavi.js` | **Accent**: `#8890a8` (mind blue)
- **Canvas**: Wander
- **Scenes**: 1. "The Smart Kid Label" 2. "The Kinds of Smart" 3. "When Smart Isn't Enough" 4. "The Intelligence No One Measures" 5. "Your Kind of Brilliant" 6. "Smart Is Not a Fixed Thing"

#### #146 Drridha दृढ — determination
- **Dir**: `Drridha` | **JS**: `drridha.js` | **Accent**: `#988060` (iron rust)
- **Canvas**: Settle
- **Scenes**: 1. "The Wall" 2. "The Doubt" 3. "The Detour" 4. "The Stubborn Hope" 5. "Determination vs Stubbornness" 6. "The Long Game"

#### #147 Khelna खेलना — play
- **Dir**: `Khelna` | **JS**: `khelna.js` | **Accent**: `#c89040` (playful orange)
- **Canvas**: Swirl
- **Scenes**: 1. "When Did You Stop Playing?" 2. "Play Without Purpose" 3. "The Joy of Being Bad at Something" 4. "Play as Rest" 5. "The Game You Invent" 6. "Play Is Not a Waste of Time"

#### #148 Rachna रचना — creation
- **Dir**: `Rachna` | **JS**: `rachna.js` | **Accent**: `#b87870` (creation red)
- **Canvas**: Radiate
- **Scenes**: 1. "The Blank Page" 2. "The Ugly Draft" 3. "The Critic" 4. "The Flow State" 5. "Creating for Yourself" 6. "What You Create Creates You"

#### #149 Sahyatra सहयात्रा — fellow traveler
- **Dir**: `Sahyatra` | **JS**: `sahyatra.js` | **Accent**: `#78a888` (journey green)
- **Canvas**: Orbit-pairs
- **Scenes**: 1. "The Person Walking Beside You" 2. "The Mentor" 3. "The Rival Who Makes You Better" 4. "The Stranger Who Understands" 5. "You Are Someone's Fellow Traveler" 6. "We Walk Together"

#### #150 Swapna स्वप्न — the dream
- **NOTE**: Already #117. Replace with:

#### #150 Prarambh प्रारम्भ — the beginning
- **Dir**: `Prarambh` | **JS**: `prarambh.js` | **Accent**: `#c8a850` (dawn gold)
- **Canvas**: Rise
- **Scenes**: 1. "The First Step" 2. "The Fear of Starting" 3. "Starting Over" 4. "Starting Small" 5. "The Courage to Begin" 6. "Every Ending Is a Beginning"

---

## PART 3: INTEGRATION INSTRUCTIONS

### 3.1 Build Order

Build experiences in batches of 5-10. After each batch:
1. Validate all JS files: `node -c ExperienceName/experienceName.js`
2. Add cards to `index.html` in correct sections
3. Add accent colors to `landing.css`
4. Add entries to `yatra-nav.js` SECTIONS array
5. Update counts in hero, footer, and yatra-nav.js
6. Git commit and push

### 3.2 Section Assignments for Landing Page

| Section | New Experiences |
|---------|----------------|
| Inner Work | #51-70 (Tapas through Prajna) |
| Seeing Others | #71-85 (Karuna through Prema) |
| Healing | #86-100 (Viraha through Kshar) |
| Growing | #101-120 (Udaya through Sahyogi) |
| The Digital World (NEW) | #121-130 (Chhavi through Pratishtha) |
| Family (NEW) | #131-140 (Kutumb through Sthapana) |
| School & Purpose (NEW) | #141-150 (Vidya through Prarambh) |

### 3.3 Final Counts

After all 100 are built:
- Hero: "One hundred and fifty experiences"
- Footer: "One hundred and fifty experiences built with love..."
- yatra-nav.js subtitle: "the journey — 150 experiences"

### 3.4 Content Writing Guidelines

When writing scene prose, follow these rules:
- **body** field: Always an array of 2 strings. First is plain text. Second is wrapped in `<em>` tags.
- **reveal** field (feeling/why/harm/etc): 3-5 sentences. Emotionally honest. Names the feeling precisely.
- **prompt** field: One question. Personal. Not academic. Starts with "Have you..." or "When was..." or "What would..."
- **truth** field: 4-6 sentences. The wisdom. Not preachy. Not a lecture. A gentle, honest observation that respects the reader's intelligence.
- Use `\u2014` for em-dashes, `\u2019` for apostrophes, `\u201c`/`\u201d` for quotes in JS strings.
- Never use the word "just" to minimize feelings.
- Never use "you should" or "you need to." Use "you can" or "what if."
- The reader is 12. She is smart. She is carrying adult-sized pain. Treat her accordingly.
