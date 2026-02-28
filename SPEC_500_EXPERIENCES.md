# YATRA — 500 New Experiences Specification

> **Total after build: 558 experiences** (58 existing + 500 new)
> **Repo:** github.com/abhaypsingh/yatra → abhaypsingh.github.io/yatra/
> **Stack:** Pure HTML + CSS + vanilla JS. Zero dependencies. Offline-capable.

---

## PART 1: PROJECT CONVENTIONS

### File Structure
```
Root: C:\Users\abhay\Sync\RespetFatherApp\
Each experience:
  {DirName}/index.html
  {DirName}/style.css
  {DirName}/{camelCase}.js

DirName = PascalCase (e.g. MeraGhar)
JS file = camelCase (e.g. meraGhar.js)
```

### HTML Boilerplate (every experience)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{DisplayName} — {subtitle}</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="../yatra-nav.css">
  <script src="../yatra-nav.js" defer></script>
</head>
<body>
  <div id="opening" class="opening">
    <div class="opening-content">
      <p class="sanskrit">{Devanagari}</p>
      <h1>{DisplayName}</h1>
      <p class="subtitle">{subtitle}</p>
      <p class="desc">{poetic intro, 3-4 lines with <br>}</p>
      <button id="beginBtn" class="begin-btn">begin</button>
    </div>
  </div>
  <!-- main screens (all .hidden initially) -->
  <div id="navFloat" class="nav-float">
    <button id="navAbout" class="nav-btn" aria-label="about this experience">?</button>
  </div>
  <div id="aboutOverlay" class="about-overlay hidden">
    <div class="about-card">
      <button id="aboutClose" class="about-close" aria-label="close">&times;</button>
      <h2>About {DisplayName}</h2>
      <p>{para 1}</p><p>{para 2}</p>
      <p class="about-note">Part of <strong>Yatra</strong> — a journey of 558 experiences.</p>
    </div>
  </div>
  <script src="{camelCase}.js"></script>
</body>
</html>
```

### CSS Boilerplate (every style.css)
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --void: {#06-#0a darkest};  --deep: {#10-#1c panels};
  --surface: {#18-#24 elevated};  --text: {#b0-#d0 primary};
  --text-dim: {#50-#70 secondary};  --accent: {unique hex};
}
body { min-height:100%; background:var(--void); color:var(--text);
  font-family:'Segoe UI',system-ui,sans-serif; line-height:1.7; overflow-x:hidden; }
/* OR serif: 'Palatino Linotype',Palatino,Georgia,serif */

.opening { position:fixed;inset:0;display:flex;align-items:center;
  justify-content:center;background:var(--void);z-index:100;transition:opacity 1.2s; }
.opening.fade-out { opacity:0;pointer-events:none; }
.opening.hidden { display:none; }
.hidden { display:none !important; }
.nav-float { position:fixed;bottom:1.5rem;right:1.5rem;display:flex;gap:0.5rem;
  opacity:0;transition:opacity 0.8s;z-index:50; }
.nav-float.visible { opacity:1; }
.nav-btn { width:40px;height:40px;border-radius:50%;background:var(--deep);
  border:1px solid rgba(255,255,255,0.06);color:var(--text-dim);font-size:1.1rem;
  cursor:pointer;display:flex;align-items:center;justify-content:center; }
.about-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;
  align-items:center;justify-content:center;z-index:200;opacity:0;transition:opacity 0.4s; }
.about-overlay.visible { opacity:1; }
.about-overlay.hidden { display:none; }
```

### JS Boilerplate (every IIFE)
```javascript
(function () {
  'use strict';
  var opening=document.getElementById('opening'),
      beginBtn=document.getElementById('beginBtn'),
      navFloat=document.getElementById('navFloat'),
      navAbout=document.getElementById('navAbout'),
      aboutOverlay=document.getElementById('aboutOverlay'),
      aboutClose=document.getElementById('aboutClose');

  beginBtn.addEventListener('click', function () {
    opening.classList.add('fade-out');
    setTimeout(function () {
      opening.classList.add('hidden');
      navFloat.classList.add('visible');
      /* show main screen */
    }, 1200);
  });

  navAbout.addEventListener('click', function () {
    aboutOverlay.classList.remove('hidden');
    void aboutOverlay.offsetWidth;
    aboutOverlay.classList.add('visible');
  });
  function closeAbout() {
    aboutOverlay.classList.remove('visible');
    setTimeout(function(){aboutOverlay.classList.add('hidden');},400);
  }
  aboutClose.addEventListener('click', closeAbout);
  aboutOverlay.addEventListener('click', function(e){
    if(e.target===aboutOverlay)closeAbout();
  });
})();
```

### localStorage: keys prefixed `yatra-{lowercase}`, always try/catch, JSON for objects
### Colors: always dark mode, --void darkest, unique --accent per experience
### Fonts: serif OR sans-serif (never external fonts)

### Interaction Types
JOURNAL, STORY, MEDITATION, CANVAS, BODY-MAP, SORT, ASSESSMENT, RITUAL, COLLECTION, VISUALIZATION, SCALE, LETTER, DIALOGUE, DECK, AUDIO, GAME, TIMELINE, TREE, MAP, COUNTER

---

## PART 2: INTEGRATION (per batch)

1. **yatra-nav.js** — add `['DirName','DisplayName','subtitle']` to correct section; update count
2. **Taara/taara.js** — same entries + cx/cy for constellation
3. **index.html** — add card HTML in section; update hero+footer count
4. **landing.css** — add `.card-dirname:hover{border-color:X} .card-dirname::before{background:X} .card-dirname .card-enter{color:X}`
5. `git add ... && git commit && git push`

Build in pairs (2 at a time). 500 experiences = 250 commits.

---

## PART 3: 20 NEW SECTIONS (25 experiences each)

| # | Section | cx | cy | Theme |
|---|---------|----|----|-------|
| 1 | Self-Discovery | 15 | 12 | Who you are beneath the labels |
| 2 | Emotional Landscape | 38 | 10 | Full range of feelings |
| 3 | Family & Roots | 62 | 12 | Heritage, home, complex bonds |
| 4 | Friendship & Belonging | 85 | 15 | Social life, loneliness, loyalty |
| 5 | Communication | 8 | 28 | Speaking, listening, being heard |
| 6 | The Body | 92 | 28 | Physical self, health, movement |
| 7 | The Mind | 12 | 42 | Thinking patterns, focus, clarity |
| 8 | Creativity | 88 | 42 | Art, sound, words, making things |
| 9 | Nature & Earth | 8 | 55 | Natural world as teacher |
| 10 | Big Questions | 50 | 50 | Meaning, death, God, existence |
| 11 | Daily Rituals | 92 | 55 | Everyday micro-practices |
| 12 | Resilience | 12 | 68 | Coping, surviving, bouncing back |
| 13 | Justice & Ethics | 35 | 75 | Fairness, standing up, moral grit |
| 14 | Digital Life | 65 | 75 | Screens, social media, online self |
| 15 | Transitions | 88 | 68 | Change, loss, new beginnings |
| 16 | Boundaries | 8 | 82 | Saying no, self-protection |
| 17 | Joy & Play | 32 | 88 | Delight, humor, lightness |
| 18 | Stories & Wisdom | 55 | 85 | Parables, mythology, archetypes |
| 19 | Dreams & Vision | 78 | 82 | Imagination, possibility, future |
| 20 | Legacy | 50 | 95 | What you leave behind |

---

## PART 4: ALL 500 EXPERIENCES


### SECTION 1: SELF-DISCOVERY (25)

1. **Aham** — अहम् — "I am" | JOURNAL | Accent: #a890c8 | Key: `yatra-aham`
Complete "I am..." 12 ways (when alone, when scared, when proud, when no one watches, etc). Sealed self-portrait. Revisit months later to compare.

2. **Chitra** — चित्र — "self-portrait" | CANVAS | Accent: #c8a078 | Key: `yatra-chitra`
Draw yourself — not how you look, but how you feel inside. Abstract shapes, colors, lines on a canvas. Save snapshots over time.

3. **Mukha** — मुख — "the mask" | SORT | Accent: #8890b0 | Key: `yatra-mukha`
Drag traits into two columns: "what I show the world" vs "what I keep hidden." See the gap between your public and private self.

4. **Bija** — बीज — "the seed" | JOURNAL | Accent: #78a868 | Key: `yatra-bija`
Name 5 things that are small in you now but want to grow — a skill, a quality, a dream. Return monthly to water them with a sentence of progress.

5. **Gupha** — गुफ़ा — "the cave" | MEDITATION | Accent: #6878a0 | Key: `yatra-gupha`
Guided visualization: descend into a cave inside yourself. At the bottom, find one object. Describe it. It represents something you need.

6. **Prakriti** — प्रकृति — "constitution" | ASSESSMENT | Accent: #90a878 | Key: `yatra-prakriti`
20 questions mapping your nature across 5 axes: fire/water/earth/air/space. Radar chart reveals your elemental balance.

7. **Chhavi** — छवि — "image" | SCALE | Accent: #b088a0 | Key: `yatra-chhavi`
8 sliders: how you see yourself vs how you think others see you. The gap between the two is where insecurity lives.

8. **Vritti** — वृत्ति — "thought waves" | VISUALIZATION | Accent: #6898c0 | Key: `yatra-vritti`
Watch animated thought-waves on a canvas. Tap to add a thought (word). Watch it ripple and fade. Practice letting thoughts pass.

9. **Sakshi** — साक्षी — "the witness" | RITUAL | Accent: #a0a0b8 | Key: `yatra-sakshi`
60-second practice: observe your thoughts without engaging. Each thought you notice, tap. Counter shows how many passed. Practice non-attachment.

10. **Vaasana** — वासना — "deep patterns" | JOURNAL | Accent: #c09068 | Key: `yatra-vaasana`
Name 3 habits/patterns you repeat without choosing to. For each, write: when did it start? What triggers it? What would you do instead?

11. **Lakshya** — लक्ष्य — "aim" | TREE | Accent: #88b898 | Key: `yatra-lakshya`
Plant a goal as a seed. It grows into a tree. Add branches (steps toward it). Leaves appear as you check off steps over weeks.

12. **Ichchha** — इच्छा — "desire" | SORT | Accent: #c8a850 | Key: `yatra-ichchha`
List 10 things you want. Drag them into: need / want / think I should want. Discover the difference between your desires and others' expectations.

13. **Parichay** — परिचय — "introduction" | LETTER | Accent: #a088c0 | Key: `yatra-parichay`
Write a letter introducing yourself to someone who knows nothing about you. Not facts — truths. What would you want them to understand?

14. **Antaranga** — अन्तरंग — "innermost" | JOURNAL | Accent: #7080a8 | Key: `yatra-antaranga`
3 prompts: What do you think about most? What do you avoid thinking about? What thought keeps coming back no matter what?

15. **Kavacha** — कवच — "armor" | BODY-MAP | Accent: #8898a8 | Key: `yatra-kavacha`
Tap where you put on armor: the jaw you clench, the shoulders you raise, the smile you fake. Name what each piece protects you from.

16. **Preraka** — प्रेरक — "what moves you" | COLLECTION | Accent: #c07858 | Key: `yatra-preraka`
Collect things that inspire you: a word, a quote, a color, a memory. Each becomes a card in your inspiration deck. Draw from it on hard days.

17. **Dosha** — दोष — "imperfection" | JOURNAL | Accent: #a07868 | Key: `yatra-dosha`
Name 3 imperfections you carry. For each: who told you this was a flaw? Is it really? Could it also be a strength? Reframe the narrative.

18. **Anga** — अंग — "parts" | MAP | Accent: #8880a8 | Key: `yatra-anga`
Map 8 parts of your identity (student, sibling, friend, dreamer, etc.). Which ones feel most like you? Which ones feel forced on you?

19. **Swarup** — स्वरूप — "true form" | DIALOGUE | Accent: #b898a0 | Key: `yatra-swarup`
Simulated dialogue with your "true self." Ask questions, receive reflective prompts. "What do you know that nobody taught you?"

20. **Mantra** — मन्त्र — "sacred phrase" | JOURNAL | Accent: #c8b868 | Key: `yatra-mantra`
Craft a personal mantra — one sentence you can repeat when things get hard. Test it against 5 hard scenarios. Refine until it holds.

21. **Chetana** — चेतना — "awareness" | COUNTER | Accent: #70a0a8 | Key: `yatra-chetana`
For one day, notice every time you judge yourself. Tap to count. At end of day, see the number. Awareness is the first step to change.

22. **Jnana** — ज्ञान — "self-knowledge" | ASSESSMENT | Accent: #a8a080 | Key: `yatra-jnana`
15 "I know / I don't know" statements about yourself. The honest "I don't know" answers are where real self-discovery begins.

23. **Moksha** — मोक्ष — "liberation" | STORY | Accent: #b8a070 | Key: `yatra-moksha`
5 cages: the need to be perfect, to be liked, to be right, to be strong, to be normal. Enter each. Find the key. Walk out.

24. **Naama** — नाम — "name" | JOURNAL | Accent: #a898b8 | Key: `yatra-naama`
What does your name mean? Who chose it? What name would you give yourself? Write the story of your name and the name you'd choose.

25. **Swayam** — स्वयं — "the self" | VISUALIZATION | Accent: #90a8c0 | Key: `yatra-swayam`
A canvas with a glowing core. Add circles around it for roles, labels, expectations. Tap the core to pulse — the center is always you.


### SECTION 2: EMOTIONAL LANDSCAPE (25)

26. **Krodha** — क्रोध — "anger" | STORY | Accent: #c85040 | Key: `yatra-krodha`
6 anger scenarios (someone lies about you, unfair punishment, etc.). For each: feel it, name it, choose from 3 responses. See the ripple of each.

27. **Shoka** — शोक — "grief" | JOURNAL | Accent: #7080a0 | Key: `yatra-shoka`
Write about something you lost — a person, a pet, a version of your life. 4 prompts guide you: what you miss, what you learned, what remains.

28. **Harsha** — हर्ष — "delight" | COLLECTION | Accent: #c8b040 | Key: `yatra-harsha`
Collect moments of unexpected joy. Date-stamped micro-entries. Over months, see that delight happens more often than you think.

29. **Lajja** — लज्जा — "shame" | DIALOGUE | Accent: #a07078 | Key: `yatra-lajja`
Shame says: "You are bad." Guilt says: "You did something bad." Learn the difference through 6 scenarios. Shame loses power when named.

30. **Irshya** — ईर्ष्या — "envy" | SORT | Accent: #70a868 | Key: `yatra-irshya`
List 5 things you envy in others. Sort each: do I actually want this, or do I want the feeling it represents? Envy is a compass.

31. **Vishada** — विषाद — "despair" | MEDITATION | Accent: #606880 | Key: `yatra-vishada`
When everything feels heavy. A slow breathing guide with dimming light. 3 minutes. One prompt: "This feeling is real. And it will pass."

32. **Ullasa** — उल्लास — "elation" | GAME | Accent: #d0b040 | Key: `yatra-ullasa`
Tap the screen to launch golden sparks. Faster tapping = bigger bursts. Silly, joyful, no purpose. Sometimes you just need to feel light.

33. **Udvega** — उद्वेग — "anxiety" | BODY-MAP | Accent: #8088a8 | Key: `yatra-udvega`
Where does anxiety live in your body? Tap the spots. Name what you're anxious about for each. Breathing exercise targeted at each area.

34. **Sneha** — स्नेह — "tenderness" | LETTER | Accent: #c090a0 | Key: `yatra-sneha`
Write a tender note to someone — including yourself. Not apology, not gratitude — just tenderness. "I see how hard you're trying."

35. **Garva** — गर्व — "pride" | JOURNAL | Accent: #c8a060 | Key: `yatra-garva`
Name 5 things you're genuinely proud of. Not grades or awards — things you chose to do, qualities you built, moments you didn't back down.

36. **Santapa** — सन्ताप — "anguish" | STORY | Accent: #905868 | Key: `yatra-santapa`
The moment the ground falls away. 4 stories of anguish with no easy resolution. Practice sitting with discomfort without rushing to fix it.

37. **Mudita** — मुदिता — "joy for others" | RITUAL | Accent: #80b888 | Key: `yatra-mudita`
Name someone who succeeded where you wanted to. Write one genuine sentence of happiness for them. The hardest and most freeing practice.

38. **Autsukya** — औत्सुक्य — "longing" | JOURNAL | Accent: #a890b8 | Key: `yatra-autsukya`
What do you long for? Not want — long for. A person, a place, a feeling, a time. Describe it so precisely you can almost touch it.

39. **Dainya** — दैन्य — "helplessness" | DIALOGUE | Accent: #7888a0 | Key: `yatra-dainya`
When you can't fix it. Simulated dialogue exploring: what CAN you control? What must you accept? Finding agency inside helplessness.

40. **Amarsha** — अमर्ष — "indignation" | ASSESSMENT | Accent: #c87050 | Key: `yatra-amarsha`
10 scenarios of unfairness. Rate each: how angry does this make you? Reveals your justice triggers — what you will not tolerate.

41. **Trushna** — तृष्णा — "craving" | SCALE | Accent: #c09048 | Key: `yatra-trushna`
5 cravings (approval, control, comfort, certainty, belonging). Slider for each: how much does this drive you? The awareness reduces the grip.

42. **Chinta** — चिन्ता — "worry" | TREE | Accent: #7890a0 | Key: `yatra-chinta`
Plant a worry. It grows branches (what-ifs). For each branch, add: is this likely? Is this in my control? Prune the tree to what remains.

43. **Asha** — आशा — "hope" | VISUALIZATION | Accent: #c8b868 | Key: `yatra-asha`
A dark canvas. Tap to place tiny lights. Each light = one thing you hope for. The sky fills. Even in darkness, you carry light.

44. **Kshobha** — क्षोभ — "disturbance" | COUNTER | Accent: #a08070 | Key: `yatra-kshobha`
Track emotional disturbances for a day. Each one gets a category: people, self, school, family, unknown. See your pattern by end of day.

45. **Priti** — प्रीति — "affection" | COLLECTION | Accent: #c888a0 | Key: `yatra-priti`
Collect people you feel affection for. For each, write one sentence about why. A gallery of love you may have forgotten you carry.

46. **Ghrina** — घृणा — "disgust" | JOURNAL | Accent: #808870 | Key: `yatra-ghrina`
What disgusts you morally? Injustice, cruelty, dishonesty? Name 5 things. This is not negativity — it's your moral immune system.

47. **Vismaya** — विस्मय — "amazement" | DECK | Accent: #80a8c8 | Key: `yatra-vismaya`
A deck of 30 astonishing facts about the universe, the body, nature. Draw one daily. Remember: reality is wilder than any fiction.

48. **Nirveda** — निर्वेद — "disillusion" | STORY | Accent: #908878 | Key: `yatra-nirveda`
5 disillusions: a hero who fails, a promise broken, a truth that hurts. What survives disillusion is real. What crumbles was never yours.

49. **Karuna** — करुणा — "compassion" | MEDITATION | Accent: #a888b0 | Key: `yatra-karuna`
3-minute guided meditation. Bring someone suffering to mind. Breathe in their pain. Breathe out warmth. Tonglen in its simplest form.

50. **Samvedana** — संवेदना — "sensitivity" | JOURNAL | Accent: #b898a8 | Key: `yatra-samvedana`
Are you "too sensitive"? Write what you notice that others miss. Sensitivity is not weakness — it is a superpower without a manual.


### SECTION 3: FAMILY & ROOTS (25)

51. **Griha** — गृह — "home" | MAP | Accent: #b89868 | Key: `yatra-griha`
Draw a floor plan of your home from memory. Place emotions in rooms. The kitchen = warmth? Your room = safety? The front door = ?

52. **Pitri** — पितृ — "father" | LETTER | Accent: #a09080 | Key: `yatra-pitri`
Write to your father — what you want him to know, what you wish he understood, what you're grateful for, what hurt. Seal it.

53. **Matri** — मातृ — "mother" | LETTER | Accent: #c090a8 | Key: `yatra-matri`
Write to your mother — the same four prompts. Different parent, different letter, different weight.

54. **Kula** — कुल — "lineage" | TIMELINE | Accent: #a8a078 | Key: `yatra-kula`
Build a timeline of your family as far back as you know. Each ancestor gets a one-line story. See the chain that leads to you.

55. **Vamsha** — वंश — "heritage" | COLLECTION | Accent: #b8a070 | Key: `yatra-vamsha`
Collect family traditions, recipes, phrases, habits you inherited. Each one is a thread connecting you to people you may never meet.

56. **Vibhajana** — विभाजन — "the split" | STORY | Accent: #808898 | Key: `yatra-vibhajana`
When a family divides. 4 stories from a child's perspective — loyalty conflicts, two homes, two truths. You are not the problem.

57. **Dwara** — द्वार — "the doorway" | JOURNAL | Accent: #8890a0 | Key: `yatra-dwara`
Describe the front door of every home you remember. What did it feel like to walk through it? Each door is a chapter.

58. **Thali** — थाली — "the plate" | COLLECTION | Accent: #c8a058 | Key: `yatra-thali`
Foods that are family. Collect dishes and the memories attached. Grandma's dal. Birthday cake. The meal after a fight. Food is love made visible.

59. **Chhat** — छत — "the roof" | JOURNAL | Accent: #9088a0 | Key: `yatra-chhat`
What does safety feel like? Describe a moment you felt completely safe at home. If you can't, describe what safe would look like.

60. **Virah** — विरह — "separation" | MEDITATION | Accent: #7080a0 | Key: `yatra-virah`
For the distance you carry. A breathing meditation focused on the person you're separated from. Not fixing it — just holding the feeling.

61. **Milan** — मिलन — "reunion" | VISUALIZATION | Accent: #a8b890 | Key: `yatra-milan`
Two dots on a canvas. They drift apart. They drift back. Sometimes reunion takes years. The animation is patient. So are you.

62. **Rishta** — रिश्ता — "bond" | MAP | Accent: #b88878 | Key: `yatra-rishta`
Map your relationships: who's close, who's distant, who's complicated. Drag people on a target diagram. The center is you.

63. **MeraGhar** — मेरा घर — "my home" | CANVAS | Accent: #c8a870 | Key: `yatra-meraghar`
Draw your ideal home — not the building, the feeling. What colors? What sounds? Who's there? What's the rule on the door?

64. **Aanchal** — आंचल — "shelter" | JOURNAL | Accent: #b888a0 | Key: `yatra-aanchal`
Who sheltered you? Write about someone who made you feel protected. Not just parents — maybe a teacher, a friend, a stranger.

65. **Vasiyat** — वसीयत — "inheritance" | ASSESSMENT | Accent: #a0a078 | Key: `yatra-vasiyat`
What did you inherit beyond DNA? Stubbornness? Kindness? Anxiety? Humor? Name 8 inherited traits. Which do you want to keep?

66. **Moola** — मूल — "root" | TREE | Accent: #78a060 | Key: `yatra-moola`
Build your root system. Each root is a source of strength: a person, a memory, a value, a place. Deeper roots = harder to uproot.

67. **Angana** — आंगन — "courtyard" | JOURNAL | Accent: #c8b078 | Key: `yatra-angana`
The space between inside and outside. Write about the liminal places in your family — the car ride, the hallway, the silence before dinner.

68. **Chutti** — छुट्टी — "holiday" | COLLECTION | Accent: #b8a848 | Key: `yatra-chutti`
Collect family holidays and the real feelings behind them. The perfect photo vs the argument. The tradition vs the tension.

69. **Bichhua** — बिछुआ — "the sting" | JOURNAL | Accent: #c07060 | Key: `yatra-bichhua`
A family member's words that stung. Write the sentence. Write what it felt like. Write what you wish they'd said instead.

70. **Aashray** — आश्रय — "refuge" | STORY | Accent: #8098a8 | Key: `yatra-aashray`
5 stories of children finding refuge in unlikely places: a library, a sport, a friendship, a diary, an imaginary world. Where is yours?

71. **Bandhan** — बन्धन — "ties that bind" | SCALE | Accent: #a08878 | Key: `yatra-bandhan`
8 family bonds. Slider for each: feels like connection ↔ feels like a cage. Both can be true. Name which ones need loosening.

72. **Pehla** — पहला — "the first" | TIMELINE | Accent: #a898a0 | Key: `yatra-pehla`
Timeline of firsts: first memory, first friend, first fear, first loss, first time you understood something about your family.

73. **Dadi** — दादी — "grandmother" | LETTER | Accent: #b8a880 | Key: `yatra-dadi`
Write to a grandparent — living or gone. What do you wish you could ask them? What do you think they'd say?

74. **Bhratu** — भ्रातृ — "sibling" | DIALOGUE | Accent: #90a8a0 | Key: `yatra-bhratu`
If you have a sibling: what do they see that you don't? Simulated prompts. If not: what would you say to a sibling you never had?

75. **Parivar** — परिवार — "family" | JOURNAL | Accent: #b89870 | Key: `yatra-parivar`
Define family in your own words. Not the dictionary. Not the law. Your definition. Write it, and know it can change.


### SECTION 4: FRIENDSHIP & BELONGING (25)

76. **Sangati** — संगति — "company you keep" | MAP | Accent: #b87888 | Key: `yatra-sangati`
Place friends on a map: inner circle, middle ring, outer ring. Who moved recently? Who's drifting? Who's steady? Maps change, and that's okay.

77. **Dosti** — दोस्ती — "friendship" | JOURNAL | Accent: #c88878 | Key: `yatra-dosti`
What makes someone your friend? Write your 5 rules of friendship. Then ask: do you follow your own rules?

78. **Kalaha** — कलह — "conflict" | STORY | Accent: #c07058 | Key: `yatra-kalaha`
A fight with a friend. 4 branching paths: explode, withdraw, explain, listen. See how each plays out over days and weeks.

79. **Tanha** — तन्हा — "alone" | MEDITATION | Accent: #606878 | Key: `yatra-tanha`
For the lonely moments. Not a fix — a companion. Ambient canvas with slow particles. One message: "Lonely is not the same as alone."

80. **Jhund** — झुंड — "the group" | ASSESSMENT | Accent: #8898a0 | Key: `yatra-jhund`
12 group scenarios: do you follow, lead, or leave? Reveals your relationship with belonging vs. individuality.

81. **Pehchaan** — पहचान — "recognition" | JOURNAL | Accent: #a888b8 | Key: `yatra-pehchaan`
Write about a time someone truly saw you — not your performance, your real self. What did they say or do? How did it feel?

82. **Daraar** — दरार — "the crack" | STORY | Accent: #907070 | Key: `yatra-daraar`
A friendship cracking. 3 stories: the drift, the betrayal, the misunderstanding. Each with a reflection: could it be repaired?

83. **Mazaak** — मज़ाक — "teasing" | SORT | Accent: #c8a858 | Key: `yatra-mazaak`
10 examples of teasing. Sort: funny vs. hurtful. Learn to tell the difference. "Just kidding" doesn't erase pain.

84. **Raaz** — राज़ — "secret" | JOURNAL | Accent: #8078a0 | Key: `yatra-raaz`
Do you keep friends' secrets? Do they keep yours? Write about a secret that weighed on you — carrying it, sharing it, or breaking it.

85. **Vaada** — वादा — "promise" | COLLECTION | Accent: #a8a080 | Key: `yatra-vaada`
Collect promises — ones you made, ones made to you, ones kept, ones broken. Promises are the architecture of trust.

86. **Dhoka** — धोखा — "betrayal" | LETTER | Accent: #c06858 | Key: `yatra-dhoka`
Write to someone who betrayed you. Or write to someone you betrayed. Not to send — to understand. Both letters teach something.

87. **Saheli** — सहेली — "companion" | JOURNAL | Accent: #b890a0 | Key: `yatra-saheli`
Describe your ideal friend in vivid detail. Then ask: am I this person for someone else?

88. **Nishtha** — निष्ठा — "loyalty" | STORY | Accent: #8888b8 | Key: `yatra-nishtha`
5 loyalty dilemmas: your friend cheats, your friend lies about someone, your group bullies someone. What does loyalty actually require?

89. **Sahara** — सहारा — "support" | BODY-MAP | Accent: #80a898 | Key: `yatra-sahara`
Who holds you up? Tap body regions and name who supports that part of you: who makes you think (head), feel safe (chest), move forward (feet).

90. **Judai** — जुदाई — "parting" | JOURNAL | Accent: #7878a0 | Key: `yatra-judai`
Write about a friendship that ended. What you miss. What you learned. What you would say if you had one more conversation.

91. **Baithak** — बैठक — "gathering" | GAME | Accent: #c0a868 | Key: `yatra-baithak`
Host a virtual gathering: invite 5 people (real or imagined, living or historical). Where would you sit? What would you talk about?

92. **Anukaran** — अनुकरण — "imitation" | ASSESSMENT | Accent: #a09888 | Key: `yatra-anukaran`
Do you change yourself to fit in? 10 scenarios. How much do you shape-shift? Awareness of social masks isn't shame — it's power.

93. **Pahel** — पहल — "initiative" | DECK | Accent: #88b088 | Key: `yatra-pahel`
30 friendship actions: "Text someone you haven't talked to in a month", "Ask someone how they really are." Draw one daily.

94. **Akela** — अकेला — "the outsider" | STORY | Accent: #708090 | Key: `yatra-akela`
You're not invited. You're at a table where nobody talks to you. 4 exclusion stories. Each with: what would you do? What do you wish someone did for you?

95. **Viswas** — विश्वास — "trust in others" | SCALE | Accent: #90a0b0 | Key: `yatra-viswas`
8 statements about trusting people. Slider: strongly agree ↔ strongly disagree. See your trust profile. Neither extreme is healthy.

96. **Sathi** — साथी — "companion on the road" | JOURNAL | Accent: #a8a898 | Key: `yatra-sathi`
Not all friends are forever. Write about a friendship that served its season. Gratitude for companions who were there when needed.

97. **Milap** — मिलाप — "meeting" | VISUALIZATION | Accent: #88a8b0 | Key: `yatra-milap`
Two particles on canvas. They orbit, approach, sometimes connect and glow, sometimes drift apart. Friendships have their own gravity.

98. **Wapsi** — वापसी — "return" | JOURNAL | Accent: #a09078 | Key: `yatra-wapsi`
A friendship you lost and might want back. Write the first message you'd send. You don't have to send it. But writing it helps.

99. **Sparsh** — स्पर्श — "the touch" | JOURNAL | Accent: #b898a0 | Key: `yatra-sparsh2`
The hug that mattered. The hand on your shoulder. Write about a moment of physical kindness from a friend that you still carry.

100. **Sabhya** — सभ्य — "civility" | DIALOGUE | Accent: #8898a8 | Key: `yatra-sabhya`
Not everyone needs to be your friend. Simulated scenarios of being civil with people you dislike. Respect without friendship.


### SECTION 5: COMMUNICATION (25)

101. **Vaani** — वाणी — "voice" | AUDIO | Accent: #a090b8 | Key: `yatra-vaani`
Record yourself saying something true (Web Audio API capture). Play it back. Your voice carries more than words — hear your courage.

102. **Sanvaad** — संवाद — "dialogue" | DIALOGUE | Accent: #88a0b0 | Key: `yatra-sanvaad`
Practice 6 hard conversations: asking for help, saying no, admitting fault, setting a boundary, expressing love, speaking truth to power.

103. **Mook** — मूक — "the unspoken" | JOURNAL | Accent: #708090 | Key: `yatra-mook`
Write 5 things you wanted to say today but didn't. For each: why didn't you? Fear? Politeness? Protection? The unspoken shapes you.

104. **Prashna** — प्रश्न — "the question" | DECK | Accent: #8898c0 | Key: `yatra-prashna`
40 deep questions to ask yourself or others. Draw one daily: "What are you pretending not to know?" "What would you do if no one judged you?"

105. **Uttara** — उत्तर — "the answer" | JOURNAL | Accent: #a0a8b0 | Key: `yatra-uttara`
Sometimes there is no answer. Write about a question that has no resolution. Sit with it. Not everything needs solving.

106. **Sunna** — सुनना — "listening" | RITUAL | Accent: #80a8a0 | Key: `yatra-sunna`
60-second listening practice: close eyes, notice every sound around you. Tap to log each sound. Most people hear 3. Train to hear 10.

107. **Lipika** — लिपिका — "the writer" | JOURNAL | Accent: #b8a878 | Key: `yatra-lipika`
Free-write for 3 minutes (timer). No editing, no backspace. Whatever comes out, comes out. Raw and unfiltered.

108. **Sanket** — संकेत — "the signal" | SORT | Accent: #a08890 | Key: `yatra-sanket`
10 body language signals: crossed arms, eye contact, fidgeting, leaning in, etc. Sort by: comfort vs. discomfort. Read the room.

109. **Artha** — अर्थ — "meaning" | STORY | Accent: #90a088 | Key: `yatra-artha`
Same sentence, 5 contexts. "I'm fine" after a test vs. after a fight vs. from a parent vs. to a stranger. Meaning lives in context.

110. **Chupp** — चुप — "the silence between" | MEDITATION | Accent: #687088 | Key: `yatra-chupp`
A 2-minute meditation on silence in conversation. When to let silence be. When silence is its own answer. Practice the pause.

111. **Pukaar** — पुकार — "the cry" | LETTER | Accent: #c07868 | Key: `yatra-pukaar`
Write the sentence you've been holding back — the one you need someone to hear. Not to send. To finally let it exist outside your head.

112. **Sach** — सच — "truth" | ASSESSMENT | Accent: #a0a890 | Key: `yatra-sach`
12 situations: would you tell the truth? Always easy to say yes in theory. The real test is in the details. See your honesty profile.

113. **Jhooth** — झूठ — "the lie" | JOURNAL | Accent: #908878 | Key: `yatra-jhooth`
Write about a lie you told. Why? What happened? Would you lie again? No judgment — understanding. Lies are rarely simple.

114. **Maafi** — माफ़ी — "apology" | STORY | Accent: #90a0a8 | Key: `yatra-maafi`
The anatomy of a real apology vs. a fake one. 5 scenarios. Write the real apology for each. "I'm sorry you feel that way" doesn't count.

115. **Aashirvaad** — आशीर्वाद — "blessing" | LETTER | Accent: #b8a868 | Key: `yatra-aashirvaad`
Write a blessing for someone — not religious, just kind. "May you never doubt that you are enough." Save a gallery of blessings sent.

116. **Shikayat** — शिकायत — "complaint" | SORT | Accent: #a88870 | Key: `yatra-shikayat`
List 5 complaints. Sort: within my control / not within my control. For the first group: what's one action? For the second: can you release it?

117. **Samjhauta** — समझौता — "compromise" | STORY | Accent: #8898a0 | Key: `yatra-samjhauta`
5 compromise scenarios between friends, family, self. Which feel fair? Which feel like surrender? The line between compromise and erasure.

118. **Bhasha** — भाषा — "language" | JOURNAL | Accent: #a0a0b8 | Key: `yatra-bhasha`
What language do you think in? Dream in? Cry in? Write about the languages you carry and what each one holds for you.

119. **Kathani** — कथनी — "what you say" | COUNTER | Accent: #b89880 | Key: `yatra-kathani`
Track for one day: compliments vs. complaints vs. neutral. Tap each time you speak. See your ratio. No judgment — awareness.

120. **Dhvani2** — ध्वनि — "the tone" | SCALE | Accent: #8888a8 | Key: `yatra-dhvani2`
Same words, different tone. 8 sentences. Slider: gentle ↔ harsh. Notice how tone changes everything. Practice the gentle version.

121. **Shanti** — शान्ति — "peaceful speech" | RITUAL | Accent: #78a8a0 | Key: `yatra-shanti2`
Before speaking, pause 3 seconds. Practice with 6 prompts. Habituate the gap between impulse and speech. The pause is the power.

122. **Mudra2** — मुद्रा — "the gesture" | BODY-MAP | Accent: #a09098 | Key: `yatra-mudra2`
Map 8 gestures and what they communicate: the nod, the shrug, the eye roll, the look away, the open palm. Non-verbal vocabulary.

123. **Sampark** — सम्पर्क — "connection" | GAME | Accent: #80b0a0 | Key: `yatra-sampark`
Write a message to a real person you haven't talked to in 30+ days. The experience generates a prompt. You choose whether to actually send it.

124. **Vachan** — वचन — "word given" | JOURNAL | Accent: #a8a890 | Key: `yatra-vachan`
Your word is your architecture. Write about a time you kept a promise that cost you. Write about a time you broke one. Which weighs more?

125. **Abhivyakti** — अभिव्यक्ति — "expression" | CANVAS | Accent: #b888a8 | Key: `yatra-abhivyakti`
Express how you feel right now using only shapes and colors — no words, no letters. Abstract emotional painting. Save with date.


### SECTION 6: THE BODY (25)

126. **Sharira** — शरीर — "the body" | BODY-MAP | Accent: #c09078 | Key: `yatra-sharira`
Full body outline. Tap areas that feel: strong, tired, hurt, numb, alive. Color-coded heatmap of your physical state today.

127. **Roop** — रूप — "form" | JOURNAL | Accent: #b888a0 | Key: `yatra-roop`
Write 3 things your body can do that amaze you. Not how it looks — what it does. Breathe, heal, carry you through hard days.

128. **Nritya** — नृत्य — "dance" | AUDIO | Accent: #c87878 | Key: `yatra-nritya`
Web Audio API generates a simple rhythm. Instructions: move any part of your body for 60 seconds. No one is watching. Just move.

129. **Netra** — नेत्र — "eyes" | RITUAL | Accent: #7898b0 | Key: `yatra-netra`
Eye relaxation: follow a slowly moving dot on screen for 60 seconds. Then close your eyes for 30. Screen fatigue reset.

130. **Hridaya** — हृदय — "heart" | MEDITATION | Accent: #c07888 | Key: `yatra-hridaya`
Hand on heart. Feel the beat. 2-minute meditation on the fact that your heart has never stopped working for you. Gratitude for the invisible.

131. **Hasta** — हस्त — "hands" | JOURNAL | Accent: #a89888 | Key: `yatra-hasta`
What have your hands done today? Made, held, typed, hurt, helped? A daily micro-journal of what your hands tell your story.

132. **Pada** — पद — "steps" | COUNTER | Accent: #88a078 | Key: `yatra-pada`
Mindful walking practice. Walk 20 steps slowly. Tap for each one. Feel your feet. The ground has always held you.

133. **Aahar** — आहार — "nourishment" | COLLECTION | Accent: #c8a860 | Key: `yatra-aahar`
What nourishes you — food and beyond? Collect sources of nourishment: a meal, a hug, a song, a nap, silence. Build your nourishment menu.

134. **Viram** — विराम — "rest" | MEDITATION | Accent: #7080a0 | Key: `yatra-viram`
Permission to rest. 3-minute screen with slow breathing animation and one message: "You have done enough today."

135. **Swasthya** — स्वास्थ्य — "wellness" | SCALE | Accent: #80a890 | Key: `yatra-swasthya`
Rate 6 areas today: sleep, energy, pain, mood, appetite, calm. Track over weeks. See your body's patterns — the data is yours.

136. **Bala** — बल — "strength" | JOURNAL | Accent: #a89070 | Key: `yatra-bala`
What kind of strong are you? Physical, emotional, quiet, loud, stubborn, gentle? Write your own definition of strength.

137. **Arogya** — आरोग्य — "health" | DECK | Accent: #78b088 | Key: `yatra-arogya`
30 micro-wellness prompts: "Drink water now", "Stretch your neck", "Name one thing you ate that was kind to your body."

138. **Chaal** — चाल — "gait" | JOURNAL | Accent: #a08880 | Key: `yatra-chaal`
How do you walk? Fast, slow, head down, looking around? Your walk tells a story. Write what yours says about you today.

139. **Kesh** — केश — "hair" | JOURNAL | Accent: #b89888 | Key: `yatra-kesh`
Hair is identity. Write about your relationship with your hair — cutting it, growing it, hiding it, loving it, hating it.

140. **Nabhi** — नाभि — "center" | MEDITATION | Accent: #a89880 | Key: `yatra-nabhi`
Find your center of gravity. Stand, close eyes, breathe into your belly. 90-second centering practice with animation.

141. **Nidaan** — निदान — "root cause" | JOURNAL | Accent: #8898a0 | Key: `yatra-nidaan`
A headache. A stomachache. Trouble sleeping. Write about a time your body told you something before your mind caught up.

142. **Sweda** — स्वेद — "effort" | COUNTER | Accent: #c89060 | Key: `yatra-sweda`
Track physical effort today. Any movement counts: walking, cleaning, playing, stretching. Your body wants to be used.

143. **Drishya** — दृश्य — "what you see" | CANVAS | Accent: #80a8b8 | Key: `yatra-drishya`
Look in a mirror for 30 seconds. Then draw what you saw — not a portrait, but the feeling of seeing yourself.

144. **Rogya** — रोग्य — "the illness" | JOURNAL | Accent: #889088 | Key: `yatra-rogya`
Write about a time you were sick. Who took care of you? What did you learn about needing others?

145. **Nishvasana** — निश्वासन — "the exhale" | RITUAL | Accent: #7090a0 | Key: `yatra-nishvasana`
10 deep exhales. Each one releases something: a tension, a word, a memory. Name it before you exhale. 90-second practice.

146. **Mudra3** — मुद्रा — "hand seal" | VISUALIZATION | Accent: #a098a8 | Key: `yatra-mudra3`
8 traditional mudras illustrated. Try each for 30 seconds. Notice what shifts. Ancient technology for the body-mind.

147. **Aalingana** — आलिंगन — "the embrace" | JOURNAL | Accent: #c090a0 | Key: `yatra-aalingana`
Write about a hug you needed and got. A hug you needed and didn't get. A hug you gave. Physical affection is not optional.

148. **Nidra2** — निद्रा — "sleep" | RITUAL | Accent: #606888 | Key: `yatra-nidra2`
Evening wind-down: name 3 things from today (good, hard, done). Slow breathing animation. Screen dims to black. A ritual for rest.

149. **Chikitsa** — चिकित्सा — "healing the body" | STORY | Accent: #88a898 | Key: `yatra-chikitsa`
4 stories of bodies healing: a broken bone, a fever, a wound, exhaustion. The body knows how to heal if you let it.

150. **Deha** — देह — "the physical" | SCALE | Accent: #a08898 | Key: `yatra-deha`
How do you feel about your body today? 5 sliders: comfortable, strong, beautiful, mine, enough. Track changes over time.


### SECTION 7: THE MIND (25)

151. **Manas** — मनस् — "the mind" | VISUALIZATION | Accent: #7888c0 | Key: `yatra-manas`
Canvas: thoughts as floating bubbles. Tap to pop one. New ones appear. Observe: you cannot stop thoughts, but you can choose which to engage.

152. **Buddhi** — बुद्धि — "intellect" | ASSESSMENT | Accent: #a0a8b8 | Key: `yatra-buddhi`
15 questions across 5 thinking styles: logical, creative, empathetic, strategic, intuitive. Radar chart of how your mind works.

153. **Tarka** — तर्क — "reasoning" | GAME | Accent: #88a0b8 | Key: `yatra-tarka`
6 logical puzzles with moral dimensions. Not just "what's the answer" but "what did your brain assume and why?"

154. **Kalpana** — कल्पना — "imagination" | CANVAS | Accent: #a888c8 | Key: `yatra-kalpana`
Prompt: "Draw something that doesn't exist yet." Free canvas. The imagination muscle strengthens with use.

155. **Samsaya** — संशय — "doubt" | JOURNAL | Accent: #808890 | Key: `yatra-samsaya`
Write about something you doubt: yourself, a belief, a relationship, the future. Doubt is not weakness — it's intelligence.

156. **Ekagrata** — एकाग्रता — "concentration" | GAME | Accent: #6898a8 | Key: `yatra-ekagrata`
A dot moves slowly across the screen. Follow it with your eyes. If you look away, it pauses. Train sustained attention. Timer tracks focus.

157. **Vikalpa** — विकल्प — "alternative" | SORT | Accent: #90a0a8 | Key: `yatra-vikalpa`
A problem arrives. Generate 5 possible solutions. Sort by: creative / practical / risky / safe. Practice flexible thinking.

158. **Dharana** — धारणा — "holding attention" | RITUAL | Accent: #7090b0 | Key: `yatra-dharana`
Pick one object in your room. Observe it for 60 seconds. Write everything you notice. Attention reveals what rushing hides.

159. **Chiti** — चिति — "awareness" | MEDITATION | Accent: #8090a8 | Key: `yatra-chiti`
Open awareness meditation. 3 minutes. Notice sounds, sensations, thoughts — without grabbing any. The observer behind the thoughts.

160. **Prajna** — प्रज्ञा — "wisdom" | DECK | Accent: #a8a890 | Key: `yatra-prajna`
40 wisdom statements from 8 traditions. Draw daily. Sit with it for 30 seconds. Some will resonate. Some will challenge. Both are useful.

161. **Manana** — मनन — "contemplation" | JOURNAL | Accent: #a09888 | Key: `yatra-manana`
One question per day to contemplate (not answer immediately): "What would you do differently if no one remembered?" Write before bed.

162. **Vichara** — विचार — "inquiry" | DIALOGUE | Accent: #8888b0 | Key: `yatra-vichara`
Self-inquiry: "Who am I when I remove my name, age, school, family?" Prompted dialogue that strips away labels to find what remains.

163. **Bodha** — बोध — "understanding" | STORY | Accent: #90a8a0 | Key: `yatra-bodha`
5 "aha" moments from history: a child who understood gravity, a girl who saw injustice, a teenager who found their voice. Understanding arrives suddenly.

164. **Smaran** — स्मरण — "remembering" | TIMELINE | Accent: #a89890 | Key: `yatra-smaran`
Build a timeline of moments you understood something important. Not facts learned — truths realized. Your wisdom autobiography.

165. **Tantra** — तन्त्र — "method" | ASSESSMENT | Accent: #a088a0 | Key: `yatra-tantra`
How do you learn best? 12 questions mapping: visual, auditory, reading, doing, teaching. Know your method. Use it deliberately.

166. **Supta** — सुप्त — "dormant" | JOURNAL | Accent: #7080a0 | Key: `yatra-supta`
What ability, dream, or interest is dormant in you? What put it to sleep? What would wake it up? Write a letter to your sleeping potential.

167. **Jagrit** — जागृत — "awakened" | RITUAL | Accent: #a8b090 | Key: `yatra-jagrit`
Morning awakening: 3 questions before you leave bed. What am I feeling? What matters today? What am I grateful for? 60-second ritual.

168. **Smriti2** — स्मृति — "memory" | JOURNAL | Accent: #a09888 | Key: `yatra-smriti2`
Write your earliest memory in as much detail as possible. Colors, sounds, feelings. Memory is the first story you ever told yourself.

169. **Drushti** — दृष्टि — "perspective" | STORY | Accent: #8898a8 | Key: `yatra-drushti2`
Same event, 3 perspectives: the child, the parent, the stranger watching. Your perspective is real but never complete.

170. **Avidya** — अविद्या — "not-knowing" | SCALE | Accent: #808878 | Key: `yatra-avidya`
10 topics: how much do you know? Slider: expert ↔ no idea. Honest "I don't know" is the beginning of learning. Celebrate ignorance.

171. **Chitta** — चित्त — "mind-stuff" | VISUALIZATION | Accent: #7888a8 | Key: `yatra-chitta`
Canvas: calm water. Tap to drop thoughts (stones). Watch ripples. When you stop, the water clears. Visual metaphor for mental stillness.

172. **Pratyahara** — प्रत्याहार — "withdrawal" | RITUAL | Accent: #6080a0 | Key: `yatra-pratyahara`
Sensory withdrawal: close eyes, cover ears, sit still for 90 seconds. Timer guides you. What remains when you remove input? You do.

173. **Samadhi** — समाधि — "absorption" | MEDITATION | Accent: #7888b0 | Key: `yatra-samadhi`
5-minute deep focus meditation. Screen shows only a glowing dot. Breathe. When thoughts come, the dot dims. When you refocus, it brightens.

174. **Chakra** — चक्र — "cycles" | JOURNAL | Accent: #a07898 | Key: `yatra-chakra`
Name a cycle you're stuck in: fight → guilt → silence → fight. Draw it as a circle. Then write: where could you break the loop?

175. **Turiya** — तुरीय — "the fourth state" | MEDITATION | Accent: #6878a0 | Key: `yatra-turiya`
Beyond waking, dreaming, sleeping. 3-minute meditation with no instruction except: be aware of being aware. The simplest and deepest practice.


### SECTION 8: CREATIVITY (25)

176. **Kala** — कला — "art" | CANVAS | Accent: #c888a0 | Key: `yatra-kala`
Free canvas with 12 brushes (dotted, flowing, sharp, fading, thick, thin, etc). No prompt. No purpose. Just make something.

177. **Ranga** — रंग — "color" | CANVAS | Accent: #c87888 | Key: `yatra-ranga`
Your mood in color. Canvas shows a gradient picker. Paint today's mood. Save daily — your color diary emerges.

178. **Swar** — स्वर — "note" | AUDIO | Accent: #80a8c0 | Key: `yatra-swar`
A simple instrument: 7 notes (Sa Re Ga Ma Pa Dha Ni) generated via Web Audio API. Play. Record short melodies. Save favorites.

179. **Laya** — लय — "rhythm" | AUDIO | Accent: #c88050 | Key: `yatra-laya`
Layer 4 rhythm tracks (kick, snap, clap, tap) at different speeds. Web Audio API. Build grooves. Feel how rhythm organizes chaos.

180. **Rachna** — रचना — "composition" | JOURNAL | Accent: #a898a8 | Key: `yatra-rachna`
Write a very short story (100 words max). 5 opening prompts: "The door was already open...", "Nobody noticed when...", etc.

181. **Srushti** — सृष्टि — "creation" | VISUALIZATION | Accent: #80a0c8 | Key: `yatra-srushti`
Watch creation happen: canvas auto-generates a landscape (stars, mountains, water, trees) from simple algorithms. Generative art as meditation.

182. **Alankara** — अलंकार — "ornament" | CANVAS | Accent: #c8a870 | Key: `yatra-alankara`
Decorate a simple shape (circle, square, triangle) with patterns. Repetition, reflection, rotation. Ornament is how culture expresses itself.

183. **Chitrakala** — चित्रकला — "painting" | CANVAS | Accent: #b87888 | Key: `yatra-chitrakala`
Paint-by-emotion: 6 emotions, each mapped to a color. Tap emotion, paint on canvas. Let the painting reveal your emotional landscape.

184. **Sahitya** — साहित्य — "literature" | JOURNAL | Accent: #a8a098 | Key: `yatra-sahitya`
Write a 6-word story. Hemingway did it. "For sale: baby shoes, never worn." 6 words that hold an entire world. Save your collection.

185. **Abhinaya** — अभिनय — "performance" | STORY | Accent: #c89080 | Key: `yatra-abhinaya`
You're given a character and a situation. Write their inner monologue. Practice seeing from inside someone else's experience.

186. **Bindu** — बिन्दु — "the point" | CANVAS | Accent: #a088b0 | Key: `yatra-bindu`
Start with a single dot at center. Build outward with dots, lines, circles. See what emerges. Every creation starts with one point.

187. **Rekha** — रेखा — "the line" | CANVAS | Accent: #8888a8 | Key: `yatra-rekha`
Draw with one continuous line — don't lift your finger/mouse. What can you create without breaking the thread? A visual constraint game.

188. **Mandala** — मण्डल — "sacred circle" | CANVAS | Accent: #a080b0 | Key: `yatra-mandala`
Guided mandala drawing: concentric rings with pattern instructions. Layer by layer, from center out. Completion is the meditation.

189. **Ankur** — अंकुर — "sprout" | TREE | Accent: #78a868 | Key: `yatra-ankur`
Plant a creative idea as a seed. Water it daily with 1 sentence of development. Watch it grow into a branching tree of possibilities.

190. **Vyanjana** — व्यंजना — "suggestion" | DECK | Accent: #a0a098 | Key: `yatra-vyanjana`
30 creative prompts: "Combine two animals into one", "Design a room with no straight lines", "Write a lullaby for the moon."

191. **Alap** — आलाप — "prelude" | AUDIO | Accent: #8098b8 | Key: `yatra-alap`
A slow, ambient soundscape you build note by note with Web Audio. No rhythm, no structure — just tones that hover and blend. Sound meditation.

192. **Bhava** — भाव — "mood" | ASSESSMENT | Accent: #a88890 | Key: `yatra-bhava`
What is your creative mood today? 8 options (playful, melancholy, fierce, tender, curious, restless, still, wild). Matched to a creative prompt.

193. **Natya** — नाट्य — "drama" | DIALOGUE | Accent: #c09078 | Key: `yatra-natya`
Write a 3-line dialogue between two people who love each other but are fighting. Constraint breeds creativity.

194. **Chhand** — छन्द — "meter" | JOURNAL | Accent: #a8a0a8 | Key: `yatra-chhand`
Write a haiku (5-7-5 syllables) every day. The constraint forces precision. Save your haiku collection. Tiny poems, infinite depth.

195. **Sthapatya** — स्थापत्य — "architecture" | CANVAS | Accent: #90a090 | Key: `yatra-sthapatya`
Design a building using only geometric shapes on canvas. What is it for? A library of dreams? A museum of feelings? Name it.

196. **Sangeet** — संगीत — "music" | GAME | Accent: #8888c0 | Key: `yatra-sangeet`
Simon-style memory game but with musical tones. Repeat the sequence. Train musical memory while making something beautiful.

197. **Roopa** — रूपा — "form" | VISUALIZATION | Accent: #a090b0 | Key: `yatra-roopa`
Generative art: simple rules create complex patterns. Watch L-systems grow, fractals bloom, spirals unfold. Beauty from mathematics.

198. **Chitrapat** — चित्रपट — "screen" | JOURNAL | Accent: #b8a088 | Key: `yatra-chitrapat`
Write a scene from a movie about your life. Who's the main character? What's the scene? What's the music playing?

199. **Ujjwala** — उज्ज्वल — "brilliance" | CANVAS | Accent: #c8b848 | Key: `yatra-ujjwala`
Draw with light: white/gold strokes on black canvas with glow effect (canvas shadow blur). Everything you draw radiates.

200. **Prerna** — प्रेरणा — "inspiration" | COLLECTION | Accent: #b898a0 | Key: `yatra-prerna`
Collect creative sparks: an image idea, a color combo, a word that sounds good, a shape that interests you. Your creative bank.


### SECTION 9: NATURE & EARTH (25)

201. **Jala** — जल — "water" | VISUALIZATION | Accent: #4898b0 | Key: `yatra-jala`
Canvas water simulation: tap to create ripples. Watch them interact, merge, dissipate. Water teaches patience by example.

202. **Vayu** — वायु — "wind" | AUDIO | Accent: #78a8b0 | Key: `yatra-vayu`
Generate wind sounds at different intensities. Slider from breeze to storm. Close your eyes. Wind doesn't judge. It just moves.

203. **Teja** — तेज — "fire" | VISUALIZATION | Accent: #c87840 | Key: `yatra-teja`
Canvas fire simulation: particles rising, flickering, consuming. Fire destroys and transforms. Write what you'd put into this fire.

204. **Bhumi** — भूमि — "earth" | MEDITATION | Accent: #889068 | Key: `yatra-bhumi`
Grounding meditation: imagine roots growing from your feet into the earth. 2-minute practice. The earth holds 8 billion people. It can hold you.

205. **Vruksha** — वृक्ष — "tree" | TREE | Accent: #68a060 | Key: `yatra-vruksha`
Grow a tree on canvas over days. Each visit adds a ring. Storms (hard days) make the wood stronger. Your tree tells your weather.

206. **Pushpa** — पुष्प — "flower" | VISUALIZATION | Accent: #c888a0 | Key: `yatra-pushpa`
Watch a flower bloom in slow generative animation. Petal by petal. Some things cannot be rushed. Let it unfold.

207. **Nadi** — नदी — "river" | JOURNAL | Accent: #5898b0 | Key: `yatra-nadi`
Write about your life as a river: where did it start? Where did it narrow? Where did it widen? Where are you now? Where do you flow?

208. **Parvata** — पर्वत — "mountain" | STORY | Accent: #8898a0 | Key: `yatra-parvata`
5 mountain parables: the mountain that waited, the river that carved, the tree that grew from stone. Ancient patience for modern impatience.

209. **Sagara** — सागर — "ocean" | AUDIO | Accent: #4888a8 | Key: `yatra-sagara`
Web Audio API ocean waves. Adjustable: calm to stormy. Breathing sync option. The most ancient white noise. Let it hold you.

210. **Megha** — मेघ — "cloud" | CANVAS | Accent: #8898b8 | Key: `yatra-megha`
Draw clouds on a blue-grey canvas. No two are alike. Clouds don't try to be permanent. Practice making impermanent things.

211. **Surya** — सूर्य — "sun" | RITUAL | Accent: #c8a848 | Key: `yatra-surya`
Morning sun salutation: not yoga poses, but 5 morning acknowledgments. I see the light. I feel warmth. I am here. Today matters. Begin.

212. **Chandra** — चन्द्र — "moon" | VISUALIZATION | Accent: #a8a8c8 | Key: `yatra-chandra`
Shows current moon phase (calculated by date). Write one sentence for each phase. Full moon = fullness. New moon = beginning. Track monthly.

213. **Nakshatra** — नक्षत्र — "star" | JOURNAL | Accent: #8098c0 | Key: `yatra-nakshatra`
Write about a night sky you remember. Where were you? Who was with you? The same stars that watched your ancestors watch you.

214. **Ritu** — ऋतु — "season" | ASSESSMENT | Accent: #90a880 | Key: `yatra-ritu`
What season are you in emotionally? Spring (new growth), summer (abundance), autumn (letting go), winter (rest). 8 questions determine it.

215. **Varsha** — वर्षा — "rain" | AUDIO | Accent: #5888a8 | Key: `yatra-varsha`
Rain generator: light drizzle to downpour. Web Audio noise with bandpass. Optional thunder. The sound of the world being washed clean.

216. **Hima** — हिम — "snow" | VISUALIZATION | Accent: #a0b0c8 | Key: `yatra-hima`
Snowfall on canvas: gentle, individual flakes. Each one unique. Watch them accumulate. Silence made visible.

217. **Mriga** — मृग — "deer" | STORY | Accent: #a89878 | Key: `yatra-mriga`
5 animal parables: the deer's alertness, the tortoise's shell, the bird's migration, the ant's persistence, the whale's song. Nature's lessons.

218. **Pakshi** — पक्षी — "bird" | JOURNAL | Accent: #80a8a0 | Key: `yatra-pakshi`
If you were a bird, what kind? Where would you fly? What would you see from above? Write about the freedom you imagine.

219. **Pathara** — पत्थर — "stone" | MEDITATION | Accent: #889088 | Key: `yatra-pathara`
Be a stone for 2 minutes. Unmoving, unhurried, unchanged by weather. A meditation on steadiness. The stone does not need to perform.

220. **Beej** — बीज — "seed" | RITUAL | Accent: #78a060 | Key: `yatra-beej`
Plant a metaphorical seed daily: one intention. Water it with one action. Check back weekly. What grows from tiny consistent effort.

221. **Upavan** — उपवन — "garden" | CANVAS | Accent: #68a870 | Key: `yatra-upavan`
Draw your inner garden: what's blooming? What's wilting? What needs water? What needs to be uprooted? A landscape of your inner ecology.

222. **Jharna** — झरना — "waterfall" | VISUALIZATION | Accent: #5898a8 | Key: `yatra-jharna`
Canvas waterfall: particles cascading endlessly. Mesmerizing. Sometimes you just need to watch something beautiful and do nothing.

223. **Dharti** — धरती — "the ground" | JOURNAL | Accent: #90a078 | Key: `yatra-dharti`
Write about a place outdoors that feels like yours: a bench, a tree, a rooftop, a park corner. Your anchor in the physical world.

224. **Ambar** — अम्बर — "sky" | VISUALIZATION | Accent: #6888c0 | Key: `yatra-ambar`
24-hour sky simulation on canvas. Dawn, day, dusk, night — cycling slowly. Current time of day reflected. The sky never stops changing. Neither do you.

225. **Pralay** — प्रलय — "the storm" | STORY | Accent: #607090 | Key: `yatra-pralay`
4 stories of surviving storms — literal and metaphorical. The tree that bent, the house that held, the person who waited. Storms end.


### SECTION 10: BIG QUESTIONS (25)

226. **Satya** — सत्य — "truth" | JOURNAL | Accent: #a8a890 | Key: `yatra-satya`
Write 3 truths nobody tells you at 12: about growing up, about adults, about the world. Then write 3 truths you've figured out alone.

227. **Mrityu** — मृत्यु — "death" | STORY | Accent: #708090 | Key: `yatra-mrityu`
Not morbid — honest. 4 gentle stories about loss: a grandparent, a pet, an era, a version of yourself. Grief is love with nowhere to go.

228. **Kaal** — काल — "time" | VISUALIZATION | Accent: #8898a8 | Key: `yatra-kaal`
Canvas timeline: your birth to age 80. Mark where you are now. See how early in the story you are. So much of the book is unwritten.

229. **Ishwara** — ईश्वर — "God / the divine" | JOURNAL | Accent: #a098b8 | Key: `yatra-ishwara`
Do you believe in something larger than yourself? Write about it without defending it. Belief is private. This page does not judge.

230. **Nyaya** — न्याय — "justice" | STORY | Accent: #8090a8 | Key: `yatra-nyaya`
5 scenarios where justice and mercy conflict. Which wins? Neither answer is wrong. The tension between them is where wisdom lives.

231. **Swatantra** — स्वतन्त्र — "freedom" | SCALE | Accent: #a8a078 | Key: `yatra-swatantra`
8 types of freedom: speech, movement, thought, identity, choice, solitude, expression, refusal. Slider: how free do you feel in each?

232. **Samsara** — संसार — "the world" | MAP | Accent: #88a0a0 | Key: `yatra-samsara`
Map the world as you experience it: your neighborhood, your school, the internet, the places you dream about. Your personal world map.

233. **Ananta** — अनन्त — "infinity" | VISUALIZATION | Accent: #7080b0 | Key: `yatra-ananta`
Zoom into a fractal: Mandelbrot-style. Every zoom reveals more detail, endlessly. Infinity exists in math. Does it exist in you?

234. **Vidhi** — विधि — "fate" | STORY | Accent: #a09888 | Key: `yatra-vidhi`
Do things happen for a reason? 4 stories where random events change a life. Is it fate, luck, or just chaos? What do you believe?

235. **Jigyasa** — जिज्ञासा — "curiosity" | DECK | Accent: #80a8b0 | Key: `yatra-jigyasa`
50 unanswerable questions: "Where does consciousness live?", "Do animals dream?", "Will humans exist in 1000 years?" Draw one. Sit with it.

236. **Satta** — सत्ता — "existence" | JOURNAL | Accent: #8888a0 | Key: `yatra-satta`
Why do you exist? Not the biology — the meaning you give it. Write your personal reason for being here. It can change tomorrow.

237. **Vidya** — विद्या — "knowledge" | ASSESSMENT | Accent: #90a8a0 | Key: `yatra-vidya`
What's worth knowing? Rank 10 types of knowledge: math, empathy, cooking, history, coding, gardening, philosophy, music, survival, art.

238. **Ahankara** — अहंकार — "ego" | DIALOGUE | Accent: #a08878 | Key: `yatra-ahankara`
Simulated dialogue with your ego. It defends, protects, inflates, and sometimes lies. Getting to know it is not the same as defeating it.

239. **Sukha** — सुख — "happiness" | JOURNAL | Accent: #b8a870 | Key: `yatra-sukha`
Is happiness a goal or a side effect? Write about a time you were happy without trying to be. What were you doing? Who were you with?

240. **Dukha** — दुःख — "suffering" | STORY | Accent: #708088 | Key: `yatra-dukha`
The Buddha's first truth. 4 sources of suffering: wanting what you can't have, losing what you love, not understanding, being alive. Sit with each.

241. **Prakriti2** — प्रकृति — "nature of reality" | VISUALIZATION | Accent: #7898a0 | Key: `yatra-prakriti2`
Particles on canvas: sometimes wave, sometimes particle. Observation changes behavior. Quantum metaphor for how attention shapes reality.

242. **Vivarta** — विवर्त — "appearance vs reality" | STORY | Accent: #909088 | Key: `yatra-vivarta`
5 optical illusions paired with life illusions: the rich family that's sad, the strong person who's breaking, the quiet kid who's screaming inside.

243. **Moksha2** — मोक्ष — "what is freedom really" | JOURNAL | Accent: #a0a0a8 | Key: `yatra-moksha2`
If you were completely free — no school, no rules, no expectations — what would you do? The answer reveals your deepest values.

244. **Shristi** — सृष्टि — "origin" | TIMELINE | Accent: #8090b0 | Key: `yatra-shristi`
13.8 billion year timeline: Big Bang to you. Zoom into the last sliver. You are the most recent chapter of the universe knowing itself.

245. **Sandeha** — सन्देह — "uncertainty" | MEDITATION | Accent: #808898 | Key: `yatra-sandeha`
3-minute meditation on not knowing. The future is uncertain. The past is incomplete. Right now is all you have. And right now is enough.

246. **Pralaya** — प्रलय — "dissolution" | JOURNAL | Accent: #687088 | Key: `yatra-pralaya`
What would you save if everything was taken away? 5 things. Then 3. Then 1. What's left is your core.

247. **Maaya** — माया — "illusion" | GAME | Accent: #a090b0 | Key: `yatra-maaya`
Visual puzzles: things that look one way but are another. Paired with questions about assumptions in your own life.

248. **Punarjanma** — पुनर्जन्म — "rebirth" | JOURNAL | Accent: #90a098 | Key: `yatra-punarjanma`
You wake up tomorrow as a completely new person. Same body, but fresh start. What would you keep? What would you drop? Write the new version.

249. **Dharma2** — धर्म — "duty vs desire" | STORY | Accent: #a09880 | Key: `yatra-dharma2`
Arjuna's dilemma: duty says one thing, heart says another. 4 modern versions. There is no clean answer. Only your answer.

250. **Anubhava** — अनुभव — "direct experience" | JOURNAL | Accent: #a8a0a0 | Key: `yatra-anubhava`
What have you learned from experience that no book could teach you? Write 5 truths that only living taught you.


### SECTION 11: DAILY RITUALS (25)

251. **Prabhaat** — प्रभात — "dawn" | RITUAL | Accent: #c8a860 | Key: `yatra-prabhaat`
Morning ritual: 1 intention, 1 gratitude, 1 breath. 45 seconds. Screen shows sunrise gradient. Start every day with presence.

252. **Sandhya** — सन्ध्या — "twilight" | RITUAL | Accent: #8070a0 | Key: `yatra-sandhya`
Evening ritual: 1 thing learned, 1 thing released, 1 thing appreciated. Screen shows sunset. Bookend your days with awareness.

253. **Aahuti** — आहुति — "offering" | JOURNAL | Accent: #c89058 | Key: `yatra-aahuti`
Daily offering: write one kind thing you did today. Not for credit — for noticing. Kindness that goes unnoticed by you still counts.

254. **Suchi** — सूची — "the list" | COLLECTION | Accent: #a0a098 | Key: `yatra-suchi`
Daily list: 3 things that went well, 1 thing that was hard, 1 thing you're curious about. Simple. Trackable. Reveals patterns over weeks.

255. **Japa** — जप — "repetition" | COUNTER | Accent: #a8a078 | Key: `yatra-japa`
Choose a word (peace, strong, enough, loved). Tap 108 times. Each tap = one silent repetition. The oldest meditation technology. Digital mala.

256. **Bhojana** — भोजन — "the meal" | RITUAL | Accent: #c8a858 | Key: `yatra-bhojana`
Before eating: pause. Name where the food came from. Name who made it. Take one slow bite. Mindful eating in 30 seconds.

257. **Snana** — स्नान — "bathing" | RITUAL | Accent: #5898a8 | Key: `yatra-snana`
The shower meditation: name something to wash away (a worry, a criticism, a bad moment). Visualize it going down the drain.

258. **Chalan** — चलन — "the walk" | COUNTER | Accent: #88a080 | Key: `yatra-chalan`
Mindful walk: 100 steps. Count each one. At step 50, stop and notice: 3 things you see, 2 you hear, 1 you feel. Continue.

259. **Lekhan** — लेखन — "daily writing" | JOURNAL | Accent: #b8a888 | Key: `yatra-lekhan`
3-sentence journal: What happened. How I felt. What I noticed. Radical simplicity. Done in under a minute. Compounding insight over months.

260. **Swadhyaya** — स्वाध्याय — "self-study" | DECK | Accent: #9098a8 | Key: `yatra-swadhyaya`
30 self-study prompts drawn daily: "What pattern repeated today?", "When did I feel most myself?", "What am I avoiding?"

261. **Deepa** — दीप — "the lamp" | VISUALIZATION | Accent: #c8a848 | Key: `yatra-deepa`
Light a virtual diya (oil lamp). Write one wish on the flame. Watch it burn steadily. A daily ritual of hope. Previous wishes archived.

262. **Anushasan** — अनुशासन — "discipline" | COUNTER | Accent: #a09078 | Key: `yatra-anushasan`
Track one habit you're building: tap each day you did it. Streak counter. Calendar grid fills with dots. Discipline is freedom in disguise.

263. **Sparshana** — स्पर्शन — "touching ground" | RITUAL | Accent: #889078 | Key: `yatra-sparshana`
Touch something real: a wall, a table, the floor. Feel its texture for 10 seconds. Grounding when the world spins. Physical anchor.

264. **Muhurta** — मुहूर्त — "the auspicious moment" | JOURNAL | Accent: #b8a870 | Key: `yatra-muhurta`
Name the best moment of today. Not the best event — the best moment. The laugh at lunch. The sun through the window. Train your radar.

265. **Anushthan** — अनुष्ठान — "the practice" | COLLECTION | Accent: #a0a090 | Key: `yatra-anushthan`
Design your own daily practice: pick from 8 micro-activities (breathe, write, count, draw, listen, move, thank, notice). Build your ritual.

266. **Disha** — दिशा — "direction" | JOURNAL | Accent: #8898a8 | Key: `yatra-disha`
Morning compass: what direction am I heading today? Not a to-do list — an intention. "Today I face what I've been avoiding."

267. **Kshana** — क्षण — "the instant" | RITUAL | Accent: #a0a0a8 | Key: `yatra-kshana`
Freeze this exact moment. Write everything you notice right now: the light, the sound, your posture, your mood. A snapshot of now.

268. **Vidhi2** — विधि — "the method" | ASSESSMENT | Accent: #90a098 | Key: `yatra-vidhi2`
What rituals do you already have? Morning phone check, bedtime routine, etc. Map them. Which serve you? Which run you?

269. **Ahladini** — आह्लादिनी — "delight power" | COLLECTION | Accent: #c8a868 | Key: `yatra-ahladini`
Collect daily micro-delights: the first sip of water, a funny text, the bus arriving on time. Train your brain to notice the good.

270. **Vishram** — विश्राम — "deep rest" | MEDITATION | Accent: #606888 | Key: `yatra-vishram`
5-minute guided rest: body scan from toes to crown, releasing each area. Not sleep — conscious rest. The reset button.

271. **Naman** — नमन — "bow" | RITUAL | Accent: #a8a098 | Key: `yatra-naman`
Before starting anything: a mental bow. To the task, to the day, to yourself. 10 seconds of acknowledgment. Begin with respect.

272. **Sankalp** — संकल्प — "daily resolve" | JOURNAL | Accent: #b89860 | Key: `yatra-sankalp`
One sentence: "Today I will ___." Not a task — a way of being. "Today I will be patient." Track which resolves you kept.

273. **Yoga** — योग — "union" | RITUAL | Accent: #80a898 | Key: `yatra-yoga`
Not poses — connection. 60-second practice: connect breath to body, body to ground, ground to earth, earth to sky. You are part of everything.

274. **Jyoti** — ज्योति — "inner light" | VISUALIZATION | Accent: #c8b060 | Key: `yatra-jyoti`
Candle flame on canvas. Focus on it for 60 seconds. When your mind wanders, the flame flickers. When you return, it steadies. Trataka practice.

275. **Swachhata** — स्वच्छता — "cleanliness" | RITUAL | Accent: #88a8a0 | Key: `yatra-swachhata`
Clean one thing mindfully: your desk, your bag, your browser tabs. Before + after feeling. External order creates internal calm.


### SECTION 12: RESILIENCE (25)

276. **Sahana** — सहन — "endurance" | STORY | Accent: #a09070 | Key: `yatra-sahana`
5 stories of endurance: the runner at mile 20, the student who failed 3 times, the immigrant who started over. You are already enduring.

277. **Utthana** — उत्थान — "rising" | JOURNAL | Accent: #c8a058 | Key: `yatra-utthana`
Write about a time you fell and got back up. Not heroically — just the quiet getting up. That's the hardest and most ordinary kind of courage.

278. **Dridha** — दृढ — "firmness" | SCALE | Accent: #a08868 | Key: `yatra-dridha`
8 pressure situations (peer pressure, family expectations, social media). Slider: I would bend ↔ I would hold. See your flexibility profile.

279. **Punarnirman** — पुनर्निर्माण — "rebuilding" | TREE | Accent: #88a878 | Key: `yatra-punarnirman`
After something breaks: a trust, a plan, a belief. Build a new tree from the rubble. Each branch = one step of rebuilding.

280. **Veera** — वीर — "hero" | JOURNAL | Accent: #c89050 | Key: `yatra-veera`
You don't need to save the world. Write about a small heroic moment: when you stood up, spoke out, showed up, held on.

281. **Kshamata** — क्षमता — "capacity" | ASSESSMENT | Accent: #90a0a0 | Key: `yatra-kshamata`
Rate your current capacity across 6 areas: physical, emotional, mental, social, creative, spiritual. Which tank is full? Which needs filling?

282. **Nirbhaya** — निर्भय — "fearless action" | STORY | Accent: #c88050 | Key: `yatra-nirbhaya`
4 moments requiring fearless action — not the absence of fear but acting despite it. Choose your response. See the consequence.

283. **Phir** — फिर — "again" | COUNTER | Accent: #a0a088 | Key: `yatra-phir`
The try-again tracker. Failed at something? Tap "again." The number grows. Each tap is not failure — it's persistence made visible.

284. **Stambha** — स्तम्भ — "pillar" | MAP | Accent: #9098a0 | Key: `yatra-stambha`
Map your 5 pillars of strength: people, beliefs, skills, memories, places. When one cracks, the others hold. Know your support structure.

285. **Kashta** — कष्ट — "hardship" | JOURNAL | Accent: #808078 | Key: `yatra-kashta`
Write about the hardest thing you've been through. Then write: what did it teach you? What muscle did it build? Hardship is an unwanted teacher.

286. **Upaya** — उपाय — "remedy" | DECK | Accent: #80a8a0 | Key: `yatra-upaya`
30 coping strategies: call a friend, walk for 5 minutes, draw, scream into a pillow, clean something, write it out. Draw when you need one.

287. **Jivana** — जीवन — "life force" | VISUALIZATION | Accent: #a8b078 | Key: `yatra-jivana`
Canvas: a heartbeat line. It wobbles, dips, sometimes flatlines — then returns. Your life force has survived every bad day so far.

288. **Sthiti** — स्थिति — "staying" | MEDITATION | Accent: #788898 | Key: `yatra-sthiti`
When you want to run: stay. 2-minute practice of sitting with discomfort. No fixing, no fleeing. Just staying. The discomfort peaks and fades.

289. **Dravya** — द्रव्य — "resource" | COLLECTION | Accent: #a09880 | Key: `yatra-dravya`
Collect your internal resources: "I can make people laugh", "I know how to be alone", "I notice when others hurt." Your survival toolkit.

290. **Anvaya** — अन्वय — "connection to past strength" | TIMELINE | Accent: #a0a890 | Key: `yatra-anvaya`
Timeline of every hard thing you survived. See the evidence. You have a 100% survival rate so far.

291. **Sthira** — स्थिर — "steady" | RITUAL | Accent: #809088 | Key: `yatra-sthira`
When shaking: plant feet, press palms together, breathe 5 times. 30-second stabilization ritual. Your body can steady your mind.

292. **Vipad** — विपद — "crisis" | STORY | Accent: #907070 | Key: `yatra-vipad`
4 crisis stories: the diagnosis, the divorce, the move, the loss. Not how they were solved — how they were survived, one hour at a time.

293. **Pratirodha** — प्रतिरोध — "resistance" | JOURNAL | Accent: #a08870 | Key: `yatra-pratirodha`
What are you resisting? Write it. Then ask: am I resisting because it's wrong, or because it's hard? Different answers need different responses.

294. **Ujjivana** — उज्जीवन — "revival" | JOURNAL | Accent: #88a868 | Key: `yatra-ujjivana`
After the worst is over. Write about what revived you: a person, a moment, a sentence, a meal, a dawn. The thing that reminded you to stay.

295. **Raksha** — रक्षा — "protection" | BODY-MAP | Accent: #a08898 | Key: `yatra-raksha`
Where does your body protect itself when threatened? Tap the areas that tighten: jaw, fists, stomach, throat. Awareness loosens the armor.

296. **Pratikara** — प्रतिकार — "response" | SORT | Accent: #a09890 | Key: `yatra-pratikara`
8 hard situations. For each, sort responses: fight / flight / freeze / tend. Which is your default? Knowing your pattern gives you choice.

297. **Sambal** — सम्बल — "sustenance" | JOURNAL | Accent: #a8a070 | Key: `yatra-sambal`
What keeps you going on the worst days? Not motivation — the bare minimum that makes you put one foot forward. Name it. Honor it.

298. **Saahas** — साहस — "daring" | DECK | Accent: #c88858 | Key: `yatra-saahas`
30 micro-dares: "Say good morning to a stranger", "Ask a question in class", "Try a food you've never eaten." Draw one daily. Small bravery compounds.

299. **Astitva** — अस्तित्व — "survival" | JOURNAL | Accent: #889080 | Key: `yatra-astitva`
You are the descendant of people who survived famine, war, migration, heartbreak. Their resilience is in your DNA. Write what you inherited.

300. **Punarjivan** — पुनर्जीवन — "new life" | VISUALIZATION | Accent: #80a898 | Key: `yatra-punarjivan`
Phoenix animation on canvas: ashes, embers, a shape rising, glowing, flying. You have rebuilt before. You will rebuild again.


### SECTION 13: JUSTICE & ETHICS (25)

301. **Nyaya2** — न्याय — "fairness" | SORT | Accent: #8090a8 | Key: `yatra-nyaya2`
10 situations. Sort: fair / unfair / complicated. The "complicated" pile is where ethics actually lives.

302. **Niti** — नीति — "moral principle" | ASSESSMENT | Accent: #90a0a0 | Key: `yatra-niti`
15 ethical dilemmas. Your choices map onto 5 moral foundations: care, fairness, loyalty, authority, sanctity. See your moral architecture.

303. **Saakshi** — साक्षी — "witness" | STORY | Accent: #a09888 | Key: `yatra-saakshi`
You see someone being bullied. 4 response paths: join in, walk away, intervene, tell someone. Each ripples. Being a witness is never neutral.

304. **Himsa** — हिंसा — "violence" | JOURNAL | Accent: #c06858 | Key: `yatra-himsa`
Violence isn't just fists. Words, exclusion, silence, gossip. Write about a non-physical violence you witnessed or experienced. Name it.

305. **Samaanta** — समानता — "equality" | SCALE | Accent: #7898a8 | Key: `yatra-samaanta`
8 statements about equality (gender, wealth, race, ability). Slider: how equal is the world? How equal should it be? The gap is your work.

306. **Adhikara** — अधिकार — "rights" | STORY | Accent: #8898a8 | Key: `yatra-adhikara`
5 rights you have: to be safe, to be heard, to be wrong, to change your mind, to say no. Stories of each being tested.

307. **Kartavya** — कर्तव्य — "duty" | DIALOGUE | Accent: #a0a088 | Key: `yatra-kartavya`
When duty and desire conflict: study vs. play, family obligation vs. personal need. Simulated dialogue exploring both sides without choosing for you.

308. **Virodha** — विरोध — "protest" | JOURNAL | Accent: #c07858 | Key: `yatra-virodha`
Write about something you think is wrong in the world. Not a rant — a clear statement. What is wrong. Why it matters. What one person could do.

309. **Dand** — दण्ड — "punishment" | STORY | Accent: #908078 | Key: `yatra-dand`
Is punishment ever fair? 4 scenarios: a crime, a mistake, a child's misbehavior, a systemic failure. What is justice without cruelty?

310. **Samriddhi** — समृद्धि — "prosperity" | SORT | Accent: #a8a870 | Key: `yatra-samriddhi`
Sort 10 items of "richness": money, love, knowledge, health, freedom, time, friendship, safety, purpose, creativity. What's truly wealthy?

311. **Satark** — सतर्क — "vigilance" | JOURNAL | Accent: #8890a0 | Key: `yatra-satark`
What injustice would you not stay silent about? Write your line in the sand. Knowing your non-negotiables before you're tested.

312. **Pakshpaat** — पक्षपात — "bias" | GAME | Accent: #a09890 | Key: `yatra-pakshpaat`
Implicit bias test: rapid word-association tasks. Notice your brain's shortcuts. Awareness doesn't eliminate bias but makes you honest about it.

313. **Uttardayitva** — उत्तरदायित्व — "responsibility" | STORY | Accent: #90a098 | Key: `yatra-uttardayitva`
When something goes wrong: whose fault is it? 4 scenarios of shared responsibility. Taking responsibility is not the same as taking blame.

314. **Prayashchitta** — प्रायश्चित्त — "atonement" | LETTER | Accent: #a088a0 | Key: `yatra-prayashchitta`
Write to someone you wronged. Not to send — to reckon with. What happened. What you'd undo. What you've learned. Atonement starts inside.

315. **Sarvahita** — सर्वहित — "the common good" | STORY | Accent: #80a098 | Key: `yatra-sarvahita`
5 dilemmas where individual benefit conflicts with common good. Sharing resources, breaking rules for the right reason, sacrificing comfort.

316. **Shaasan** — शासन — "governance" | GAME | Accent: #889098 | Key: `yatra-shaasan`
You run a small community. 6 decisions: resource allocation, conflict resolution, rule-making. No right answers — only trade-offs.

317. **Samvad** — संवाद — "moral dialogue" | DIALOGUE | Accent: #a0a0a8 | Key: `yatra-samvad2`
Argue both sides of a hard question: is lying ever right? Is stealing food wrong? Practice holding two truths simultaneously.

318. **Pratishtha** — प्रतिष्ठा — "dignity" | JOURNAL | Accent: #a89890 | Key: `yatra-pratishtha`
When was your dignity violated? When did you violate someone else's? Dignity is the floor beneath all rights. Write about the floor.

319. **Satyagraha** — सत्याग्रह — "truth-force" | STORY | Accent: #a8a080 | Key: `yatra-satyagraha`
Gandhi's concept: standing firm in truth without violence. 3 modern examples for a 12-year-old: the classroom, the playground, the family table.

320. **Dayalu** — दयालु — "merciful" | SORT | Accent: #90a8a8 | Key: `yatra-dayalu`
10 offenses. Sort: deserves punishment / deserves mercy / deserves understanding. Mercy is not weakness. It's the hardest strength.

321. **Samanvaya** — समन्वय — "coordination" | GAME | Accent: #88a0a8 | Key: `yatra-samanvaya`
Cooperation game: 2 animated dots must pass through obstacles together. Moving one moves the other. Success requires thinking beyond yourself.

322. **Vivechana** — विवेचना — "discrimination" | JOURNAL | Accent: #a08888 | Key: `yatra-vivechana`
Write about a time someone was treated differently for being different. What happened? What did you feel? What would you do now?

323. **Dharm** — धर्म — "right action" | DECK | Accent: #a0a890 | Key: `yatra-dharm`
30 daily ethical prompts: "Did I tell the truth today?", "Did I exclude anyone?", "Did I help someone without being asked?"

324. **Svadharma** — स्वधर्म — "your own duty" | JOURNAL | Accent: #a89880 | Key: `yatra-svadharma`
What is YOUR duty — not society's, not your parents', not your friends'? Write what you feel called to do. That's your dharma.

325. **Samata** — समता — "equanimity in justice" | MEDITATION | Accent: #7888a0 | Key: `yatra-samata`
When the world is unfair: breathe. Not to accept injustice — to steady yourself enough to fight it clearly, not blindly.


### SECTION 14: DIGITAL LIFE (25)

326. **Parda** — पर्दा — "the screen" | COUNTER | Accent: #7888b0 | Key: `yatra-parda`
Screen awareness tracker. Tap each time you pick up your phone today. Just count. No judgment. Awareness is the first tool.

327. **Chhaya2** — छाया — "digital shadow" | JOURNAL | Accent: #8090a8 | Key: `yatra-chhaya2`
Your digital footprint: what would a stranger learn about you from your online presence? Write the version of you that the internet sees.

328. **Pratidhvani** — प्रतिध्वनि — "the echo chamber" | STORY | Accent: #a09090 | Key: `yatra-pratidhvani`
5 scenarios of information bubbles: only seeing what you agree with. How algorithms shape your reality without you noticing.

329. **Tulana** — तुलना — "comparison" | SCALE | Accent: #b88878 | Key: `yatra-tulana`
8 things you compare on social media: looks, lifestyle, friends, talent, happiness, popularity, family, intelligence. Slider for each. See the damage.

330. **Bilkul** — बिलकुल — "the real" | JOURNAL | Accent: #a0a098 | Key: `yatra-bilkul`
Write something true that you would never post. The gap between your real life and your online life is the space where loneliness grows.

331. **Phanda** — फंदा — "the trap" | GAME | Accent: #c08060 | Key: `yatra-phanda`
Doom-scrolling simulator: infinite scroll of attention-grabbing cards. Each tap costs a "life minute." See how quickly 30 minutes vanishes.

332. **Vipanna** — विपन्न — "disconnected" | RITUAL | Accent: #608898 | Key: `yatra-vipanna`
Digital detox timer: set 15/30/60 minutes. Calming animation plays. When done: write what you noticed during the silence. Do this weekly.

333. **Samagri** — सामग्री — "content" | SORT | Accent: #9098a0 | Key: `yatra-samagri`
Sort your media diet: what you watch, read, listen to. Categories: nourishing / numbing / toxic / educational / social. See your intake.

334. **Abhigyan** — अभिज्ञान — "identity online" | JOURNAL | Accent: #8888a8 | Key: `yatra-abhigyan`
Who are you online vs. offline? Write both descriptions. If they're different, ask: which one is performing? Which one is real?

335. **Sandesh** — सन्देश — "the message" | LETTER | Accent: #80a8a0 | Key: `yatra-sandesh`
Write a text message you wish you'd sent differently. Rewrite it 3 times: angry version, honest version, kind version. See which feels right.

336. **Manoranjan** — मनोरंजन — "entertainment" | ASSESSMENT | Accent: #a89888 | Key: `yatra-manoranjan`
How much of your day is passive entertainment? 10 questions. Pie chart result: creating vs. consuming vs. connecting vs. escaping.

337. **Vigyapan** — विज्ञापन — "advertising" | GAME | Accent: #c0a060 | Key: `yatra-vigyapan`
Spot the manipulation: 8 ads analyzed for emotional tricks (fear, belonging, inadequacy, urgency). Train to see what's being sold beyond the product.

338. **Suraksha** — सुरक्षा — "safety online" | STORY | Accent: #7090a0 | Key: `yatra-suraksha`
5 online safety scenarios: sharing location, talking to strangers, forwarding images, passwords, cyberbullying. Practice the safe response.

339. **Anusandhan** — अनुसन्धान — "research" | GAME | Accent: #8898a8 | Key: `yatra-anusandhan`
Fact-checking game: 10 headlines. Real or fake? Check sources. Practice: pause before sharing. Truth moves slow. Lies move fast.

340. **Niyantrana** — नियन्त्रण — "control" | JOURNAL | Accent: #a09088 | Key: `yatra-niyantrana`
Does your phone control you or do you control it? Write 5 rules for your digital life. Post them where you'll see them.

341. **Samachar** — समाचार — "news" | STORY | Accent: #8090a0 | Key: `yatra-samachar`
The news is designed to scare you. 3 stories showing: what the headline says vs. the full context vs. what's actually in your control.

342. **Virasat** — विरासत — "digital legacy" | JOURNAL | Accent: #a0a090 | Key: `yatra-virasat`
If your phone showed everything to everyone tomorrow — what would you be proud of? What would you delete? Act now, not later.

343. **Mitrata** — मित्रता — "online friendship" | STORY | Accent: #90a0a8 | Key: `yatra-mitrata`
Can online friends be real friends? 3 stories: the friend you've never met, the friend who disappeared, the friend who was someone else.

344. **Pratibha** — प्रतिभा — "sharing talent" | COLLECTION | Accent: #a88890 | Key: `yatra-pratibha`
Create, don't just consume. Collect one creative thing you made each week — a drawing, a sentence, a melody. Your creation gallery.

345. **Kshanti** — क्षान्ति — "digital patience" | COUNTER | Accent: #8098a0 | Key: `yatra-kshanti`
Practice waiting: when you get a notification, wait 5 minutes before checking. Count each successful wait. Build the muscle.

346. **Samvahana** — सम्वाहन — "the feed" | VISUALIZATION | Accent: #a090a8 | Key: `yatra-samvahana`
Canvas: an infinite stream of colored dots flowing past. Some you grab. Some you miss. The feed never ends. You can always step away.

347. **Guptata** — गुप्तता — "privacy" | ASSESSMENT | Accent: #7888a0 | Key: `yatra-guptata`
10 questions about what you share online. Score: how private are you? Neither extreme is ideal. Find your boundary.

348. **Moha2** — मोह — "digital attachment" | JOURNAL | Accent: #a08888 | Key: `yatra-moha2`
What would you miss most if your phone disappeared? Write about it. Then ask: is that love, or dependence?

349. **Nishkama** — निष्काम — "without wanting" | RITUAL | Accent: #80a0a0 | Key: `yatra-nishkama`
Post something online without checking the likes. Or don't post at all. Practice creating for yourself, not for validation.

350. **Aikya** — ऐक्य — "digital and real" | JOURNAL | Accent: #90a098 | Key: `yatra-aikya`
The goal: your online self and your real self are the same person. Write 3 commitments toward integration.


### SECTION 15: TRANSITIONS (25)

351. **Parivartan** — परिवर्तन — "transformation" | JOURNAL | Accent: #a090a0 | Key: `yatra-parivartan`
Write about a change that was forced on you. Then write about a change you chose. How did each feel? You survived both.

352. **Uttar** — उत्तर — "the move" | MAP | Accent: #8898a0 | Key: `yatra-uttar`
Map every place you've lived or been significant to you. Draw connections. Your geography is your biography.

353. **Antara2** — अन्तर — "the gap" | JOURNAL | Accent: #808898 | Key: `yatra-antara2`
Write about the space between who you were and who you're becoming. That gap is not failure — it's growth in progress.

354. **Shishira** — शिशिर — "winter" | MEDITATION | Accent: #6878a0 | Key: `yatra-shishira`
For seasons of difficulty. Guided meditation: winter is not death, it's dormancy. Everything that will bloom is resting underground.

355. **Vasanta** — वसन्त — "spring" | VISUALIZATION | Accent: #78a868 | Key: `yatra-vasanta`
Canvas: bare branches slowly sprouting leaves, flowers. Spring always comes. The animation takes 3 minutes. Worth the wait.

356. **Pravesh** — प्रवेश — "entering" | JOURNAL | Accent: #90a8a0 | Key: `yatra-pravesh`
Write about entering a new space: new school, new group, new family structure. What did you carry in? What did you leave at the door?

357. **Vidaai** — विदाई — "farewell" | LETTER | Accent: #8888a0 | Key: `yatra-vidaai`
Write a farewell letter to a version of yourself you're leaving behind: the child, the naive one, the scared one. Thank them.

358. **Naya** — नया — "the new" | JOURNAL | Accent: #a8b090 | Key: `yatra-naya`
List 5 new things in your life this year. Which ones did you welcome? Which ones were forced? Both are valid. Both shape you.

359. **Gaman** — गमन — "departure" | STORY | Accent: #8090a0 | Key: `yatra-gaman`
4 departures: leaving a home, a school, a friendship, a belief. Not all goodbyes are sad. Some are necessary. Some are freedom.

360. **Dwar** — द्वार — "threshold" | VISUALIZATION | Accent: #a098a8 | Key: `yatra-dwar`
Canvas: a doorway. Light on one side, dark on the other. Which side are you on? Which side are you heading toward? Tap to step through.

361. **Rupa** — रूप — "changing form" | TIMELINE | Accent: #a08898 | Key: `yatra-rupa`
Build a timeline of how you've changed: beliefs at 8, 10, 12. Interests that came and went. The self is not fixed — it's a river.

362. **Sandhikaal** — सन्धिकाल — "transitional time" | JOURNAL | Accent: #889090 | Key: `yatra-sandhikaal`
You are between child and teenager. Write what you miss about being small. Write what excites you about growing. Both are true right now.

363. **Prayana** — प्रयाण — "journey" | MAP | Accent: #8898a8 | Key: `yatra-prayana`
Map your life as a journey: where you started, the detours, the mountains, the valleys, where you are now, where you hope to go.

364. **Vikarsa** — विकर्ष — "growing pains" | BODY-MAP | Accent: #a08878 | Key: `yatra-vikarsa`
Where do you feel growing pains — physical and emotional? Tap the body map. Growth hurts. That's not a bug. It's the process.

365. **Udaya** — उदय — "sunrise" | RITUAL | Accent: #c8a858 | Key: `yatra-udaya`
New beginning ritual: name what's ending. Name what's beginning. Light a virtual candle for the transition. Every end is a start.

366. **Avasthana** — अवस्थान — "stages" | ASSESSMENT | Accent: #90a0a0 | Key: `yatra-avasthana`
Where are you in the change cycle? Shock, denial, struggle, acceptance, growth. 8 questions. Knowing your stage helps you navigate it.

367. **Vikalasa** — विकास — "development" | TREE | Accent: #78a870 | Key: `yatra-vikalasa`
Track your development across 6 areas: emotional, social, intellectual, physical, creative, spiritual. Which areas are growing fastest?

368. **Sthirata** — स्थिरता — "stability" | JOURNAL | Accent: #8898a0 | Key: `yatra-sthirata`
During chaos: what stays constant? Write 5 things that don't change even when everything else does. Your anchors.

369. **Navin** — नवीन — "renewal" | RITUAL | Accent: #80a8a0 | Key: `yatra-navin`
Monthly renewal: review the past month. Release one thing. Adopt one thing. Repeat. A gentle rhythm of continuous change.

370. **Aarambha** — आरम्भ — "beginning" | JOURNAL | Accent: #a0a898 | Key: `yatra-aarambha`
Every day is a beginning. Write the first sentence of today's story. Not what happened — what this day is about. Author your narrative.

371. **Patan** — पतन — "the fall" | STORY | Accent: #807078 | Key: `yatra-patan`
4 stories about falling: from grace, from certainty, from trust, from a height. The fall is not the end. The landing teaches you how to fly.

372. **Udghatan** — उद्घाटन — "opening" | VISUALIZATION | Accent: #a888a8 | Key: `yatra-udghatan`
Canvas: a closed flower, a locked box, a sealed letter. Tap to open each. What's inside? Write what each opening reveals about you.

373. **Abhyudaya** — अभ्युदय — "rising up" | JOURNAL | Accent: #b8a060 | Key: `yatra-abhyudaya`
After a failure, a loss, a bad season. Write the first line of the next chapter. Not the resolution — just the beginning of getting up.

374. **Dhaara** — धारा — "flow" | MEDITATION | Accent: #6898a8 | Key: `yatra-dhaara`
When transitions feel overwhelming: flow meditation. You are a river, not a lake. Movement is your nature. 3-minute practice.

375. **Nirmaan** — निर्माण — "construction" | CANVAS | Accent: #a09878 | Key: `yatra-nirmaan`
You're building a new version of yourself. Draw the blueprint: what's the foundation? What are the walls? What's the view from the window?


### SECTION 16: BOUNDARIES (25)

376. **Seema** — सीमा — "boundary" | JOURNAL | Accent: #a08890 | Key: `yatra-seema`
Write 5 things you will not tolerate. Not angrily — clearly. Boundaries aren't walls. They're doors you choose when to open.

377. **Mana** — मना — "refusal" | STORY | Accent: #c07868 | Key: `yatra-mana`
6 scenarios where saying no is hard: a friend's request, a parent's demand, peer pressure, guilt-tripping, emotional blackmail, your own urges.

378. **Lakshman** — लक्ष्मण — "the line" | CANVAS | Accent: #a88878 | Key: `yatra-lakshman`
Draw your line: literally. A canvas where you draw a boundary. Write what's on each side. Inside = yours. Outside = not your problem.

379. **Sthapana** — स्थापना — "establishing" | DIALOGUE | Accent: #8898a0 | Key: `yatra-sthapana`
Practice boundary-setting language: "I need...", "I'm not comfortable with...", "I can do X but not Y." 6 simulated practice conversations.

380. **Kashtha** — काष्ठ — "the limit" | SCALE | Accent: #a09078 | Key: `yatra-kashtha`
8 areas: how much can you give before it costs you? Slider from "fine" to "too much." Find where your limits actually are.

381. **Kshetra** — क्षेत्र — "territory" | MAP | Accent: #88a090 | Key: `yatra-kshetra`
Map your personal space: physical, emotional, digital, time. Where do people trespass? Where do you let them? Awareness is the fence.

382. **Dwar2** — द्वार — "the gate" | SORT | Accent: #a0a0a0 | Key: `yatra-dwar2`
10 people/situations. Sort into: always welcome / sometimes welcome / never welcome. You are the gatekeeper of your own life.

383. **Aparadh** — अपराध — "guilt" | JOURNAL | Accent: #908078 | Key: `yatra-aparadh`
Do you feel guilty saying no? Write about it. Where did the guilt come from? Is it protecting someone, or is it controlling you?

384. **Antarala** — अन्तराल — "space between" | MEDITATION | Accent: #708898 | Key: `yatra-antarala`
The healthy space between you and others. 2-minute meditation. You can love someone and still need space. Space is not rejection.

385. **Svaadhikaara** — स्वाधिकार — "sovereignty" | JOURNAL | Accent: #a89878 | Key: `yatra-svaadhikaara`
Your body is yours. Your time is yours. Your feelings are yours. Write what sovereignty means to you at age 12.

386. **Tyaga** — त्याग — "letting go" | STORY | Accent: #8888a0 | Key: `yatra-tyaga`
4 things to let go of: a toxic friendship, an impossible expectation, someone else's opinion of you, the need to be right. Stories of release.

387. **Virakti** — विरक्ति — "detachment" | JOURNAL | Accent: #808898 | Key: `yatra-virakti`
Detachment is not coldness — it's not letting someone else's storm become yours. Write about a time you stayed calm in someone else's chaos.

388. **Nishiddha** — निषिद्ध — "off-limits" | COLLECTION | Accent: #c07070 | Key: `yatra-nishiddha`
Collect your non-negotiables: things you will never compromise on. Privacy, safety, respect, truth. Your sacred off-limits list.

389. **Svasthaan** — स्वस्थान — "own place" | CANVAS | Accent: #a09888 | Key: `yatra-svasthaan`
Design your ideal personal space: colors, objects, rules, sounds. Draw it. Your space reflects your boundaries. Create the room you need.

390. **Nischaya** — निश्चय — "decision" | STORY | Accent: #90a0a0 | Key: `yatra-nischaya`
5 moments of firm decision: "I will not apologize for existing", "I will not carry your shame", "I will not pretend." Practice deciding.

391. **Pratikar** — प्रतिकार — "pushing back" | DIALOGUE | Accent: #c08868 | Key: `yatra-pratikar`
Practice pushback: when someone crosses a line, what do you say? 6 scenarios with response options. Firmness without aggression.

392. **Vairagya** — वैराग्य — "dispassion" | MEDITATION | Accent: #708090 | Key: `yatra-vairagya`
Not caring less — caring wisely. 3-minute meditation on choosing where to invest your emotional energy. Not everything deserves your fire.

393. **Sthaana** — स्थान — "knowing your place" | JOURNAL | Accent: #a0a098 | Key: `yatra-sthaana`
Not where society puts you — where you put yourself. Write about where you belong by choice, not by assignment.

394. **Shakti** — शक्ति — "power" | ASSESSMENT | Accent: #c89058 | Key: `yatra-shakti`
Where is your power? 10 questions mapping: physical, emotional, intellectual, social, creative, moral. Which do you use? Which do you neglect?

395. **Nivarana** — निवारण — "prevention" | DECK | Accent: #8898a0 | Key: `yatra-nivarana`
30 boundary-protection strategies: "I'll call you back", "I need to think about that", "That doesn't work for me." Memorize the phrases.

396. **Aavarana** — आवरण — "the shield" | VISUALIZATION | Accent: #88a0b0 | Key: `yatra-aavarana`
Canvas: a gentle shield of light around a figure. Not a wall — a filter. Letting good in, keeping harm out. Your energetic boundary.

397. **Prahara** — प्रहार — "the strike" | JOURNAL | Accent: #c07060 | Key: `yatra-prahara`
When someone hits where it hurts: your family, your appearance, your intelligence. Write the blow. Then write: does this define me? No.

398. **Atma** — आत्म — "self-worth" | RITUAL | Accent: #b8a070 | Key: `yatra-atma`
Daily affirmation: "I am worth protecting." Say it. Write it. Repeat until you believe it. 30 seconds that change everything.

399. **Maryada** — मर्यादा — "proper limit" | STORY | Accent: #a09890 | Key: `yatra-maryada`
The difference between being kind and being used. 4 stories. Kindness has limits. Learning where they are is not selfishness.

400. **Nirvana** — निर्वाण — "beyond suffering" | MEDITATION | Accent: #7888a8 | Key: `yatra-nirvana`
Not the destination — the practice. 5-minute meditation. Release one expectation. Release one resentment. What remains is peace.


### SECTION 17: JOY & PLAY (25)

401. **Aananda** — आनन्द — "bliss" | COLLECTION | Accent: #c8b050 | Key: `yatra-aananda`
Collect bliss: micro-moments of unexpected joy. Warm socks. A perfect bite. A friend's laugh. The collection becomes a happiness map.

402. **Kreeda** — क्रीडा — "play" | GAME | Accent: #d0a848 | Key: `yatra-kreeda`
Pointless beautiful game: tap colored circles before they fade. No score. No level. Just the pleasure of catching color.

403. **Hasya** — हास्य — "laughter" | JOURNAL | Accent: #c8a840 | Key: `yatra-hasya`
Write about the last time you laughed until you cried. Who was there? What was funny? Laughter is the body's way of saying "I'm safe."

404. **Utsava** — उत्सव — "celebration" | RITUAL | Accent: #c8b060 | Key: `yatra-utsava`
Celebrate something today. Anything: a Tuesday, a small win, surviving. Write what you're celebrating. Light a virtual sparkler.

405. **Rangeen** — रंगीन — "colorful" | CANVAS | Accent: #c87080 | Key: `yatra-rangeen`
Splash color: tap anywhere for bursts of random color explosions on black canvas. Pure visual joy. No meaning needed.

406. **Kautuka** — कौतुक — "wonder" | DECK | Accent: #80a8c0 | Key: `yatra-kautuka`
30 wonder prompts: "Look at your hand for 30 seconds", "What's the strangest animal?", "How does music make you feel things?" Reignite wonder.

407. **Masti** — मस्ती — "mischief" | GAME | Accent: #c89048 | Key: `yatra-masti`
Wholesome mischief generator: "Leave a kind anonymous note", "Rearrange your bookshelf by color", "Wear your clothes backwards for an hour."

408. **Khushi** — ख़ुशी — "happiness" | SCALE | Accent: #b8a858 | Key: `yatra-khushi`
Rate your happiness across 5 domains: friends, family, self, school, future. Track weekly. See which areas are rising and falling.

409. **Phuhar** — फुहार — "drizzle" | VISUALIZATION | Accent: #6898b8 | Key: `yatra-phuhar`
Canvas: gentle rain on water. Tap to add drops. Each drop = something small that made you smile today. A drizzle of good things.

410. **Khel** — खेल — "game" | GAME | Accent: #c88868 | Key: `yatra-khel`
Memory card game with emotion faces: match pairs. Simple, satisfying. Practice recognizing emotions while playing.

411. **Chamak** — चमक — "sparkle" | CANVAS | Accent: #c8b848 | Key: `yatra-chamak`
Draw with sparkles: every stroke glitters and slowly fades. Make something that shines briefly and disappears. Beauty doesn't need to be permanent.

412. **Jhoomna** — झूमना — "swaying" | AUDIO | Accent: #a888b0 | Key: `yatra-jhoomna`
Generate a gentle swaying melody (simple sine waves, pentatonic). Close eyes. Sway. 90 seconds of letting the body be music.

413. **Taarey** — तारे — "stars" | VISUALIZATION | Accent: #8098c8 | Key: `yatra-taarey`
Canvas: tap to place stars. Hold to make them bigger. Drag to connect constellations. Name your constellations. Build a silly sky.

414. **Sapna** — सपना — "daydream" | JOURNAL | Accent: #a890c0 | Key: `yatra-sapna`
Give yourself permission to daydream. Write the daydream: where are you? What's happening? Daydreaming is the mind's rehearsal for the future.

415. **Chutkula** — चुटकुला — "joke" | COLLECTION | Accent: #c8a848 | Key: `yatra-chutkula`
Collect your favorite jokes, funny moments, things that made you snort-laugh. Your personal comedy archive for bad days.

416. **Paheli** — पहेली — "riddle" | GAME | Accent: #a0a8b0 | Key: `yatra-paheli`
30 riddles from various traditions. Not trivia — lateral thinking. "I speak without a mouth and hear without ears. What am I?" (An echo.)

417. **Naachna** — नाचना — "dancing" | RITUAL | Accent: #c87888 | Key: `yatra-naachna`
30-second dance break: audio generates a beat. Just move. Nobody's watching. Your body remembers joy even when your mind forgets.

418. **Tamasha** — तमाशा — "spectacle" | VISUALIZATION | Accent: #c8a058 | Key: `yatra-tamasha`
Fireworks on canvas: tap anywhere for bursts. Multi-color, particle trails, fading sparks. Celebrate for no reason.

419. **Hulchul** — हलचल — "commotion" | GAME | Accent: #c89058 | Key: `yatra-hulchul`
Chaos canvas: bouncing balls, spinning shapes, colors colliding. Tap to add more. Sometimes joy is messy, loud, and ridiculous.

420. **Mithaas** — मिठास — "sweetness" | JOURNAL | Accent: #c8a868 | Key: `yatra-mithaas`
What's the sweetest thing anyone has said to you? Write it. Read it aloud. Let it land. You were worth saying that to.

421. **Cheshta** — चेष्टा — "play effort" | COUNTER | Accent: #a8a880 | Key: `yatra-cheshta`
Track play: how many minutes did you play today (not screens)? Running, drawing, pretending, building, exploring. Play is not optional.

422. **Saral** — सरल — "simplicity" | JOURNAL | Accent: #90a898 | Key: `yatra-saral`
Write about a perfectly simple moment: tea in the morning, walking without a destination, sitting with someone in silence. Simplicity is luxury.

423. **Prashansa** — प्रशंसा — "appreciation" | LETTER | Accent: #b8a078 | Key: `yatra-prashansa`
Write a gushing appreciation for something ordinary: gravity, spoons, the color blue, Tuesdays. Absurd gratitude is still gratitude.

424. **Ramaiya** — रमैय्या — "playfulness" | DECK | Accent: #c89850 | Key: `yatra-ramaiya`
30 playful prompts: "Invent a new holiday", "Name your socks", "Write a love letter to pizza." The world needs more nonsense.

425. **Prashanti** — प्रशान्ति — "deep peace" | MEDITATION | Accent: #6898a0 | Key: `yatra-prashanti`
The joy of stillness. 3-minute meditation. No guidance. Just silence. Peace is not the absence of noise — it's the presence of enough.


### SECTION 18: STORIES & WISDOM (25)

426. **Panchatantra** — पञ्चतन्त्र — "five principles" | STORY | Accent: #c8a868 | Key: `yatra-panchatantra`
5 animal fables retold for modern life: the crow and the pitcher (resourcefulness), the tortoise and the hare (patience), each with reflection.

427. **Upanishad** — उपनिषद् — "sitting near" | JOURNAL | Accent: #a098a8 | Key: `yatra-upanishad`
Ancient wisdom questions rephrased: "What is real?", "What is the self?", "What survives death?" Write your honest answers. No wrong ones.

428. **Jataka** — जातक — "birth stories" | STORY | Accent: #b8a070 | Key: `yatra-jataka`
5 Buddhist birth stories simplified: tales of compassion, sacrifice, and wisdom from the Buddha's past lives. Each with a modern parallel.

429. **Mahabharata** — महाभारत — "the great story" | STORY | Accent: #a89868 | Key: `yatra-mahabharata`
5 moments from the Mahabharata: Karna's loyalty, Draupadi's fury, Arjuna's doubt, Yudhishthira's truth, Bhishma's vow. Epic moral complexity.

430. **Aesop** — ईसप — "the fable" | STORY | Accent: #a0a088 | Key: `yatra-aesop`
5 Aesop's fables with a twist: what if the fox got the grapes? What if the boy who cried wolf was telling the truth? Reimagine the moral.

431. **Sufi** — सूफ़ी — "the mystic" | STORY | Accent: #9088b0 | Key: `yatra-sufi`
5 Sufi teaching stories: Nasruddin's donkey, the blind men and the elephant, the thirsty fish. Wisdom wrapped in humor.

432. **Zen** — ज़ेन — "the koan" | JOURNAL | Accent: #788898 | Key: `yatra-zen`
5 Zen koans: "What is the sound of one hand clapping?", "Show me your original face." Don't answer — sit with the impossibility.

433. **Veda** — वेद — "ancient knowledge" | DECK | Accent: #a8a878 | Key: `yatra-veda`
30 verses from world wisdom traditions (Vedas, Tao, Bible, Quran, Torah, Dhammapada). One daily. No doctrine — just truth that resonates.

434. **Lokokti** — लोकोक्ति — "proverb" | COLLECTION | Accent: #b89870 | Key: `yatra-lokokti`
Collect proverbs from every culture you can find. Indian, Japanese, African, European. Compare: humanity agrees on more than it thinks.

435. **Rishi** — ऋषि — "the sage" | DIALOGUE | Accent: #a098a0 | Key: `yatra-rishi`
Simulated dialogue with a wise elder. Ask questions about life, fairness, growing up. Answers are prompts, not prescriptions.

436. **Parable** — दृष्टान्त — "the parable" | STORY | Accent: #a0a080 | Key: `yatra-parable`
5 universal parables: the prodigal son, the mustard seed, the three fish, the rope and the snake. Stories that teach without lecturing.

437. **Purana** — पुराण — "ancient tales" | STORY | Accent: #b89858 | Key: `yatra-purana`
5 stories from Hindu mythology: Ganesha's broken tusk, Hanuman's leap, Savitri's argument with Death. Gods who are surprisingly human.

438. **Wabi** — わび — "beauty in imperfection" | JOURNAL | Accent: #889888 | Key: `yatra-wabi`
Japanese wabi-sabi: find beauty in something imperfect, incomplete, or impermanent. Write about it. The crack is where the light gets in.

439. **Ubuntu** — उबुन्टु — "I am because we are" | JOURNAL | Accent: #80a890 | Key: `yatra-ubuntu`
African philosophy: you exist because of others. Write about 5 people without whom you would be someone completely different.

440. **Ikigai** — इकिगाई — "reason to get up" | ASSESSMENT | Accent: #c89868 | Key: `yatra-ikigai`
Japanese concept: intersection of what you love, what you're good at, what the world needs, what sustains you. 12 questions. Find your center.

441. **Hygge** — ह्यूगे — "cozy togetherness" | COLLECTION | Accent: #c8a870 | Key: `yatra-hygge`
Danish concept: collect cozy moments. Candlelight, warm blankets, a friend's kitchen, a book in rain. Your coziness archive.

442. **Gita** — गीता — "the song" | STORY | Accent: #a8a080 | Key: `yatra-gita`
5 key moments from the Bhagavad Gita: Arjuna's despair, Krishna's counsel, the nature of action, the yoga of devotion. Battlefield wisdom.

443. **Rumi** — रूमी — "the beloved" | JOURNAL | Accent: #a088b8 | Key: `yatra-rumi`
5 Rumi quotes as journaling prompts: "The wound is where the light enters", "What you seek is seeking you." Write your response.

444. **Kaizen** — काइज़ेन — "continuous improvement" | COUNTER | Accent: #88a890 | Key: `yatra-kaizen`
Japanese concept: 1% better each day. Track one tiny daily improvement. Over months, the compound effect transforms you.

445. **Shloka** — श्लोक — "verse" | DECK | Accent: #a09890 | Key: `yatra-shloka`
30 Sanskrit verses with simple translations. Draw daily. Ancient words that still apply: "The truth alone triumphs."

446. **Mithos** — मिथोस — "myth" | STORY | Accent: #a890a0 | Key: `yatra-mithos`
5 myths from around the world: Icarus (hubris), Anansi (cleverness), Sedna (sacrifice), Prometheus (rebellion), Amaterasu (return from darkness).

447. **Hikayat** — हिकायत — "tale" | STORY | Accent: #b89878 | Key: `yatra-hikayat`
5 tales from the Arabian tradition: not just adventure, but wisdom about hospitality, cunning, justice, and the power of words.

448. **Bodhi** — बोधि — "enlightenment" | MEDITATION | Accent: #78a890 | Key: `yatra-bodhi`
Sit under the Bodhi tree (canvas with a great tree). Sit as long as you want. No guidance. No prompt. Just sitting and seeing what arises.

449. **Granth** — ग्रन्थ — "the book" | JOURNAL | Accent: #a8a088 | Key: `yatra-granth`
If your life were a book, write the table of contents. Chapter names for your life so far. What would you title the next chapter?

450. **Parampara2** — परम्परा — "the tradition" | JOURNAL | Accent: #b89870 | Key: `yatra-parampara2`
What traditions do you want to start? Not inherit — create. Write 3 traditions for your future family, your future self, your future home.


### SECTION 19: DREAMS & VISION (25)

451. **Swapna2** — स्वप्न — "the dream" | JOURNAL | Accent: #a088c0 | Key: `yatra-swapna2`
Write last night's dream in detail. If you can't remember, write the dream you wish you'd had. Dreams are letters from your unconscious.

452. **Drishti2** — दृष्टि — "vision" | CANVAS | Accent: #8890b8 | Key: `yatra-drishti3`
Draw your vision for your life at 25. Not a plan — a picture. Colors, shapes, feelings. What does the canvas of your future look like?

453. **Bhavishya** — भविष्य — "the future" | TIMELINE | Accent: #90a0b0 | Key: `yatra-bhavishya`
Build a future timeline: 15, 18, 25, 30, 40. At each age, write one sentence about who you hope to be. The future is a letter you're writing.

454. **Chetavani** — चेतावनी — "premonition" | JOURNAL | Accent: #8078a0 | Key: `yatra-chetavani`
Have you ever known something before it happened? Write about intuition: times your gut was right, times it was wrong. Trust it, but verify.

455. **Nirmiti** — निर्मिति — "creation of new" | JOURNAL | Accent: #a8a0a8 | Key: `yatra-nirmiti`
Invent something that doesn't exist: a tool, a place, a practice, a holiday. Describe it completely. Inventors start by imagining.

456. **Udaan** — उड़ान — "flight" | VISUALIZATION | Accent: #6898c0 | Key: `yatra-udaan`
Canvas: a bird taking flight from a cliff. It drops first, then soars. The drop is terrifying. The flight is everything. Click to begin.

457. **Aakanksha** — आकांक्षा — "aspiration" | LETTER | Accent: #b8a078 | Key: `yatra-aakanksha`
Write a letter to yourself at age 18. What do you hope you've become? What do you hope you still feel? Seal it with a date.

458. **Adarsha** — आदर्श — "ideal" | ASSESSMENT | Accent: #a0a0b0 | Key: `yatra-adarsha`
Who do you admire? 5 people: what quality do you admire in each? Those qualities are your aspirational map. You see them because they're in you.

459. **Sanrachna** — संरचना — "architecture" | CANVAS | Accent: #a89888 | Key: `yatra-sanrachna`
Design a building that represents your ideal self. How many rooms? What's in each? What's the view? Architecture as self-portrait.

460. **Tarang** — तरंग — "wave" | VISUALIZATION | Accent: #5898b0 | Key: `yatra-tarang`
Waves on canvas: sometimes gentle, sometimes fierce. Your energy moves in waves. Watch the cycle. Learn to ride, not resist.

461. **Ummeed** — उम्मीद — "expectation" | SORT | Accent: #a0a890 | Key: `yatra-ummeed`
10 expectations others have of you. Sort: shared with my own / forced on me / I've outgrown. Separate your vision from their projection.

462. **Sapneela** — सपनीला — "dreamy" | AUDIO | Accent: #8088b0 | Key: `yatra-sapneela`
Ambient dreamscape: layered sine waves, slow LFO, reverb. Web Audio. Eyes closed. Let the sound be the architecture of a dream.

463. **Prakalpa** — प्रकल्प — "the project" | TREE | Accent: #88a880 | Key: `yatra-prakalpa`
Name a project you want to create. Build a tree: trunk = the idea, branches = steps, leaves = skills needed. Watch it grow as you work.

464. **Khoj** — खोज — "quest" | STORY | Accent: #a89870 | Key: `yatra-khoj`
4 quest stories: the search for a lost thing, a lost person, a lost self, a lost world. Not all quests end. The searching is the point.

465. **Akalpita** — अकल्पित — "the unimaginable" | JOURNAL | Accent: #9088a8 | Key: `yatra-akalpita`
Write about something you never imagined happening — that happened. Good or bad. Life is wider than your imagination. Stay open.

466. **Nayapan** — नयापन — "newness" | DECK | Accent: #88a8a8 | Key: `yatra-nayapan`
30 "try something new" prompts: write with your non-dominant hand, learn 5 words in a new language, eat something unfamiliar. One daily.

467. **Sansar** — संसार — "the world I want" | JOURNAL | Accent: #80a898 | Key: `yatra-sansar`
If you could redesign one thing about the world, what would it be? Not fix — redesign. Describe it in detail. Visionaries start here.

468. **Prateeksha** — प्रतीक्षा — "waiting for vision" | MEDITATION | Accent: #7888a0 | Key: `yatra-prateeksha`
Sometimes vision doesn't come. 3-minute meditation on patience. Not forcing clarity — inviting it. The seed knows when to sprout.

469. **Utkarsha** — उत्कर्ष — "excellence" | JOURNAL | Accent: #b8a060 | Key: `yatra-utkarsha`
What does your personal excellence look like? Not compared to others — your best self on your best day. Describe that person. They're closer than you think.

470. **Vartman** — वर्तमान — "the present" | RITUAL | Accent: #a0a098 | Key: `yatra-vartman`
The best way to build the future: be fully here now. 60-second presence practice. 5 senses check. The present is the only place you can act.

471. **Yojana** — योजना — "the plan" | MAP | Accent: #90a098 | Key: `yatra-yojana`
Not a rigid plan — a map with multiple routes. Write 3 possible paths for the next year. You don't need to choose yet. Just see the options.

472. **Chamatkara** — चमत्कार — "miracle" | JOURNAL | Accent: #a890a8 | Key: `yatra-chamatkara`
Write about a small miracle: a coincidence, a kindness, a moment of perfect timing. Miracles happen. We just forget to notice.

473. **Aatmkatha** — आत्मकथा — "autobiography" | JOURNAL | Accent: #a8a098 | Key: `yatra-aatmkatha`
Write the first page of your autobiography. Not "I was born..." — the opening line that captures who you are. Rewrite it monthly.

474. **Kalaa** — कला — "future craft" | JOURNAL | Accent: #a09898 | Key: `yatra-kalaa`
What do you want to be skilled at by 20? Not for career — for joy. Drawing, cooking, guitar, coding, gardening? Name 3. Start one.

475. **Srishti2** — सृष्टि — "building worlds" | CANVAS | Accent: #7898b0 | Key: `yatra-srishti2`
Draw a world that exists only in your head. A floating city, an underwater school, a cloud library. Your imagination is real estate.


### SECTION 20: LEGACY (25)

476. **Virasat2** — विरासत — "what you leave" | JOURNAL | Accent: #a89878 | Key: `yatra-virasat2`
If you left the room and never came back — what would people remember? Write 3 things. Then ask: is that the legacy I want?

477. **Prabhava** — प्रभाव — "impact" | MAP | Accent: #90a0a0 | Key: `yatra-prabhava`
Map your impact: who have you affected? Family, friends, strangers. Draw lines from you to them. Your ripple is wider than you think.

478. **Chinh** — चिह्न — "mark" | CANVAS | Accent: #a8a080 | Key: `yatra-chinh`
Design your personal symbol/logo. Not a brand — a mark that represents your essence. What shape are you? What color? Draw it.

479. **Sandesa** — सन्देश — "the message" | LETTER | Accent: #b8a070 | Key: `yatra-sandesa`
Write a message for someone to read after you're gone. Not morbid — meaningful. What do you want them to know that you might not say?

480. **Chaap** — छाप — "imprint" | JOURNAL | Accent: #a09880 | Key: `yatra-chaap`
Everyone leaves an imprint on everyone they meet. Write about someone's imprint on you. Then: what imprint are you leaving?

481. **Nirman** — निर्माण — "what you built" | COLLECTION | Accent: #88a888 | Key: `yatra-nirman`
Collect things you've created: a friendship, a drawing, a habit, a joke that made someone laugh. Your creation portfolio.

482. **Prerna2** — प्रेरणा — "inspiring others" | JOURNAL | Accent: #b89878 | Key: `yatra-prerna2`
Have you ever inspired someone? You might not know it. Write about a time someone followed your example. Or a time you followed someone's.

483. **Kirtana** — कीर्तन — "what is sung about you" | JOURNAL | Accent: #a098a0 | Key: `yatra-kirtana`
What would people sing about you? Not literally — what story would they tell? Write the song of your life in 5 verses.

484. **Pratijna** — प्रतिज्ञा — "the vow" | LETTER | Accent: #a89870 | Key: `yatra-pratijna`
Write a vow to the future: "I promise to always...", "I vow to never...", "I will remember..." Seal it. Revisit on your birthday.

485. **Dharohar** — धरोहर — "heritage you create" | COLLECTION | Accent: #b8a068 | Key: `yatra-dharohar`
Start building your own traditions: a personal holiday, a weekly practice, a family recipe you'll pass down. Heritage is a choice.

486. **Nishani** — निशानी — "keepsake" | COLLECTION | Accent: #a8a090 | Key: `yatra-nishani`
Collect digital keepsakes: a sentence that mattered, a date that changed things, a name that shaped you. Your memory box.

487. **Smarak** — स्मारक — "memorial" | CANVAS | Accent: #8898a0 | Key: `yatra-smarak`
Design a memorial for something that ended: a friendship, a home, an era. Draw it. Memorials help us honor what was.

488. **Udaharan** — उदाहरण — "example" | STORY | Accent: #a09888 | Key: `yatra-udaharan`
5 people who changed the world by being an example, not by giving orders. Rosa Parks, Malala, a quiet teacher, a kind stranger. The power of example.

489. **Amanat** — अमानत — "what is entrusted" | JOURNAL | Accent: #a0a088 | Key: `yatra-amanat`
What has been entrusted to you? Someone's secret, someone's faith, your own potential. Write about the weight and honor of being trusted.

490. **Kshitij** — क्षितिज — "horizon" | VISUALIZATION | Accent: #6888b0 | Key: `yatra-kshitij`
Canvas: a horizon line. Above: sky (your possibilities). Below: earth (your foundation). You stand at the line. Look both ways.

491. **Samarpana** — समर्पण — "dedication" | LETTER | Accent: #a89890 | Key: `yatra-samarpana`
Write a dedication for your life — like the front page of a book. "For..." Who is your life dedicated to? It can change. But name it now.

492. **Phala** — फल — "fruit" | TREE | Accent: #88a868 | Key: `yatra-phala`
What fruit has your life produced so far? Kindnesses, skills, relationships, memories. Grow a tree. Each fruit gets a name. More than you think.

493. **Sparsha2** — स्पर्श — "the touch you leave" | JOURNAL | Accent: #a890a0 | Key: `yatra-sparsha3`
How do you want people to feel after spending time with you? Safer? Happier? Inspired? Write the feeling. That's your legacy.

494. **Rachanakar** — रचनाकार — "the creator" | JOURNAL | Accent: #a8a098 | Key: `yatra-rachanakar`
You are a creator: of moods, relationships, moments, ideas. What have you created today? What will you create tomorrow?

495. **Abhilekh** — अभिलेख — "record" | TIMELINE | Accent: #9098a0 | Key: `yatra-abhilekh`
Build the record of your life so far: milestones, turning points, quiet revolutions. The archive of who you've been becoming.

496. **Yatra2** — यात्रा — "the journey continues" | MAP | Accent: #a8a080 | Key: `yatra-yatra2`
Map every experience you've visited in this project. Not just stars — the emotional terrain. What changed in you? The journey continues.

497. **Amrita** — अमृत — "the nectar" | COLLECTION | Accent: #c8b060 | Key: `yatra-amrita`
Collect the nectar: the most important insight from every experience you've done. One sentence per experience. Your distilled wisdom.

498. **Param** — परम — "the ultimate" | JOURNAL | Accent: #a098a8 | Key: `yatra-param`
What is the most important thing you've learned about being human? One paragraph. The ultimate lesson. For now — it will change.

499. **Sandhaan** — सन्धान — "the connection" | VISUALIZATION | Accent: #80a0b0 | Key: `yatra-sandhaan`
Canvas: 558 dots, one for each experience. Lines connect those you've visited. Watch the web grow. Every experience connects to every other.

500. **Namaste** — नमस्ते — "the light in me sees the light in you" | MEDITATION | Accent: #c8a868 | Key: `yatra-namaste`
The final experience. Hands together. Eyes closed. 3 minutes. One thought: the same light that shines in everyone shines in you. Namaste.

---

## PART 5: QUICK REFERENCE

- **Total new experiences:** 500 (numbered 1-500 above)
- **Total after build:** 558 (58 existing + 500 new)
- **New sections:** 20 (25 experiences each)
- **Existing sections to keep:** Foundation, Inner Work, Seeing Others, Healing, Growing, Your Space
- **Interaction type distribution:** JOURNAL(~100), STORY(~55), MEDITATION(~25), CANVAS(~30), VISUALIZATION(~25), ASSESSMENT(~20), COLLECTION(~25), RITUAL(~25), DECK(~15), SORT(~20), SCALE(~15), LETTER(~15), DIALOGUE(~15), GAME(~20), COUNTER(~12), MAP(~10), TREE(~10), TIMELINE(~10), BODY-MAP(~8), AUDIO(~10)
- **Build strategy:** pairs of 2, integrate after each pair, commit + push
- **Naming:** all DirNames are unique PascalCase, all localStorage keys unique
- **Colors:** all accent colors unique, dark-mode only

**END OF SPECIFICATION**
