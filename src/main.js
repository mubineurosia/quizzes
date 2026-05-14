import Phaser from "phaser";
import "./style.css";
import { AdMobBridge, FirebaseBridge } from "./integrations.js";

const STORAGE_KEY = "english-shooter-academy";
const firebaseBridge = new FirebaseBridge(STORAGE_KEY);
const adMobBridge = new AdMobBridge();

const COLORS = {
  ink: 0x101826,
  panel: 0x162235,
  panel2: 0x233147,
  cyan: 0x48d7ff,
  cyanDark: 0x1498c7,
  gold: 0xffc857,
  orange: 0xff7a45,
  red: 0xff4d6d,
  green: 0x50e3a4,
  violet: 0x8d7dff,
  white: 0xf5fbff,
  muted: 0xa9bad6
};

const WEAPONS = [
  { id: "spark", name: "Spark Pistol", color: 0x50e3a4, damage: 1, unlock: 0 },
  { id: "pulse", name: "Pulse Rifle", color: 0x48d7ff, damage: 1, unlock: 800 },
  { id: "nova", name: "Nova Blaster", color: 0xffc857, damage: 2, unlock: 1800 }
];

const OUTFITS = [
  { id: "cadet", name: "Cadet", color: 0x48d7ff, unlock: 0 },
  { id: "runner", name: "Runner", color: 0xff7a45, unlock: 500 },
  { id: "champion", name: "Champion", color: 0x50e3a4, unlock: 1500 }
];

const QUESTIONS = [
  {
    id: "g1",
    topic: "Grammar",
    difficulty: "Beginner",
    question: "Choose the correct sentence.",
    options: ["She go to school.", "She goes to school.", "She going school.", "She gone school."],
    answer: "She goes to school.",
    tip: "Use -s with he, she, or it in the simple present."
  },
  {
    id: "g2",
    topic: "Grammar",
    difficulty: "Beginner",
    question: "Which word completes this? I ___ happy today.",
    options: ["am", "is", "are", "be"],
    answer: "am",
    tip: "Use am with I."
  },
  {
    id: "g3",
    topic: "Grammar",
    difficulty: "Intermediate",
    question: "Find the correct passive voice.",
    options: ["The letter wrote Ali.", "The letter was written by Ali.", "Ali was wrote the letter.", "The letter written Ali."],
    answer: "The letter was written by Ali.",
    tip: "Passive voice often uses be plus past participle."
  },
  {
    id: "g4",
    topic: "Grammar",
    difficulty: "Advanced",
    question: "Choose the sentence with correct subject-verb agreement.",
    options: ["Neither answer are right.", "Neither of the answers is right.", "Neither answers is right.", "Neither of answers are right."],
    answer: "Neither of the answers is right.",
    tip: "Neither is commonly treated as singular in formal English."
  },
  {
    id: "v1",
    topic: "Vocabulary",
    difficulty: "Beginner",
    question: "What does brave mean?",
    options: ["Afraid", "Courageous", "Hungry", "Late"],
    answer: "Courageous",
    tip: "Brave means ready to face danger."
  },
  {
    id: "v2",
    topic: "Vocabulary",
    difficulty: "Intermediate",
    question: "Which word means to improve something?",
    options: ["Enhance", "Reduce", "Borrow", "Forget"],
    answer: "Enhance",
    tip: "Enhance means make better or stronger."
  },
  {
    id: "v3",
    topic: "Vocabulary",
    difficulty: "Advanced",
    question: "What does ambiguous mean?",
    options: ["Clear", "Having more than one meaning", "Very old", "Impossible"],
    answer: "Having more than one meaning",
    tip: "Ambiguous language can be understood in different ways."
  },
  {
    id: "s1",
    topic: "Synonyms",
    difficulty: "Beginner",
    question: "Pick the synonym of fast.",
    options: ["Quick", "Slow", "Soft", "Deep"],
    answer: "Quick",
    tip: "A synonym has a similar meaning."
  },
  {
    id: "s2",
    topic: "Synonyms",
    difficulty: "Intermediate",
    question: "Pick the synonym of begin.",
    options: ["Start", "Finish", "Break", "Carry"],
    answer: "Start",
    tip: "Begin and start can often be used in the same way."
  },
  {
    id: "s3",
    topic: "Synonyms",
    difficulty: "Advanced",
    question: "Pick the closest synonym of meticulous.",
    options: ["Careless", "Detailed", "Angry", "Silent"],
    answer: "Detailed",
    tip: "Meticulous means very careful and detail-focused."
  },
  {
    id: "a1",
    topic: "Antonyms",
    difficulty: "Beginner",
    question: "Pick the antonym of hot.",
    options: ["Warm", "Cold", "Bright", "Small"],
    answer: "Cold",
    tip: "An antonym has the opposite meaning."
  },
  {
    id: "a2",
    topic: "Antonyms",
    difficulty: "Intermediate",
    question: "Pick the antonym of generous.",
    options: ["Kind", "Selfish", "Helpful", "Friendly"],
    answer: "Selfish",
    tip: "Generous people share; selfish people do not."
  },
  {
    id: "a3",
    topic: "Antonyms",
    difficulty: "Advanced",
    question: "Pick the antonym of obsolete.",
    options: ["Outdated", "Modern", "Broken", "Ordinary"],
    answer: "Modern",
    tip: "Obsolete means no longer used or outdated."
  },
  {
    id: "t1",
    topic: "Tenses",
    difficulty: "Beginner",
    question: "Which is simple past?",
    options: ["I play.", "I played.", "I am playing.", "I will play."],
    answer: "I played.",
    tip: "Simple past often uses -ed for regular verbs."
  },
  {
    id: "t2",
    topic: "Tenses",
    difficulty: "Intermediate",
    question: "Choose present perfect.",
    options: ["I saw the movie.", "I have seen the movie.", "I see the movie.", "I will see the movie."],
    answer: "I have seen the movie.",
    tip: "Present perfect uses have or has plus past participle."
  },
  {
    id: "t3",
    topic: "Tenses",
    difficulty: "Advanced",
    question: "Choose the past perfect sentence.",
    options: ["She had left before I arrived.", "She leaves before I arrive.", "She has left now.", "She will leave soon."],
    answer: "She had left before I arrived.",
    tip: "Past perfect uses had plus past participle for an earlier past action."
  },
  {
    id: "sp1",
    topic: "Spelling",
    difficulty: "Beginner",
    question: "Choose the correct spelling.",
    options: ["Recieve", "Receive", "Receeve", "Reciive"],
    answer: "Receive",
    tip: "Remember: i before e except after c has exceptions, but receive follows it."
  },
  {
    id: "sp2",
    topic: "Spelling",
    difficulty: "Intermediate",
    question: "Choose the correct spelling.",
    options: ["Necessary", "Neccessary", "Necesary", "Nesessary"],
    answer: "Necessary",
    tip: "Necessary has one c and two s letters."
  },
  {
    id: "sp3",
    topic: "Spelling",
    difficulty: "Advanced",
    question: "Choose the correct spelling.",
    options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
    answer: "Accommodate",
    tip: "Accommodate has double c and double m."
  },
  {
    id: "sc1",
    topic: "Sentence Correction",
    difficulty: "Beginner",
    question: "Fix this: He are my friend.",
    options: ["He is my friend.", "He am my friend.", "He be my friend.", "He were my friend."],
    answer: "He is my friend.",
    tip: "Use is with he, she, or it."
  },
  {
    id: "sc2",
    topic: "Sentence Correction",
    difficulty: "Intermediate",
    question: "Fix this: I have went there.",
    options: ["I have gone there.", "I has gone there.", "I have go there.", "I went gone there."],
    answer: "I have gone there.",
    tip: "After have, use the past participle gone."
  },
  {
    id: "sc3",
    topic: "Sentence Correction",
    difficulty: "Advanced",
    question: "Choose the best correction.",
    options: ["If I was you, I would study.", "If I were you, I would study.", "If I am you, I studied.", "If I be you, I study."],
    answer: "If I were you, I would study.",
    tip: "Use were in unreal conditional sentences."
  },
  {
    id: "ps1",
    topic: "Parts of Speech",
    difficulty: "Beginner",
    question: "What part of speech is quickly?",
    options: ["Noun", "Verb", "Adverb", "Pronoun"],
    answer: "Adverb",
    tip: "Adverbs often describe how an action happens."
  },
  {
    id: "ps2",
    topic: "Parts of Speech",
    difficulty: "Intermediate",
    question: "What part of speech is beautiful?",
    options: ["Adjective", "Verb", "Conjunction", "Preposition"],
    answer: "Adjective",
    tip: "Adjectives describe nouns."
  },
  {
    id: "ps3",
    topic: "Parts of Speech",
    difficulty: "Advanced",
    question: "Identify the conjunction: I stayed home because it rained.",
    options: ["stayed", "home", "because", "rained"],
    answer: "because",
    tip: "Because connects the reason to the main idea."
  },
  {
    id: "boss1",
    topic: "Grammar",
    difficulty: "Advanced",
    question: "Choose the grammatically strongest sentence.",
    options: [
      "The data suggests a clear trend.",
      "The data suggest a clear trend.",
      "The datas suggests a clear trend.",
      "The data is suggest a clear trend."
    ],
    answer: "The data suggest a clear trend.",
    tip: "In formal use, data can be treated as plural."
  },
  {
    id: "boss2",
    topic: "Vocabulary",
    difficulty: "Advanced",
    question: "Which word means brief and clear?",
    options: ["Concise", "Noisy", "Distant", "Fragile"],
    answer: "Concise",
    tip: "Concise writing uses few words without losing meaning."
  }
];

const DEFAULT_LEADERBOARD = [
  { name: "Mia", score: 1840 },
  { name: "Rafi", score: 1660 },
  { name: "Nora", score: 1390 },
  { name: "Ari", score: 1120 }
];

const defaultProgress = () => ({
  coins: 160,
  xp: 0,
  battlePassXp: 0,
  bestScore: 0,
  missionUnlocked: 1,
  selectedWeapon: "spark",
  selectedOutfit: "cadet",
  unlockedWeapons: ["spark"],
  unlockedOutfits: ["cadet"],
  wrongQueue: [],
  weakness: {},
  achievements: {},
  dailyKey: "",
  dailyRewardKey: "",
  gamesPlayed: 0,
  correctTotal: 0,
  wrongTotal: 0
});

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return { ...defaultProgress(), ...saved };
  } catch {
    return defaultProgress();
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  firebaseBridge.syncProgress(progress);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function wrappedText(text, maxChars) {
  if (text.length <= maxChars) return text;
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else {
      line += ` ${word}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.join("\n");
}

function addProgressRewards(progress, { coins = 0, xp = 0, battlePassXp = 0 }) {
  progress.coins += coins;
  progress.xp += xp;
  progress.battlePassXp += battlePassXp;

  for (const weapon of WEAPONS) {
    if (progress.coins >= weapon.unlock && !progress.unlockedWeapons.includes(weapon.id)) {
      progress.unlockedWeapons.push(weapon.id);
    }
  }

  for (const outfit of OUTFITS) {
    if (progress.xp >= outfit.unlock && !progress.unlockedOutfits.includes(outfit.id)) {
      progress.unlockedOutfits.push(outfit.id);
    }
  }
}

function weightedQuestion(progress, roundIndex, mode, forceAdvanced = false) {
  if (progress.wrongQueue.length && Math.random() < 0.25) {
    const id = progress.wrongQueue.shift();
    const retry = QUESTIONS.find((q) => q.id === id);
    if (retry) return retry;
  }

  const weakTopics = Object.entries(progress.weakness)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic);

  const desiredDifficulty = forceAdvanced
    ? "Advanced"
    : roundIndex > 15 || mode === "battle"
      ? "Advanced"
      : roundIndex > 6 || mode === "mission"
        ? "Intermediate"
        : "Beginner";

  let pool = QUESTIONS.filter((q) => q.difficulty === desiredDifficulty);
  if (weakTopics.length && Math.random() < 0.45) {
    const weakPool = pool.filter((q) => weakTopics.includes(q.topic));
    if (weakPool.length) pool = weakPool;
  }

  if (!pool.length) pool = QUESTIONS;
  return Phaser.Utils.Array.GetRandom(pool);
}

class SoundBank {
  constructor() {
    this.context = null;
    this.music = null;
    this.enabled = true;
  }

  ensure() {
    if (this.context) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  }

  tone(freq, duration, type = "sine", volume = 0.08, slide = 0) {
    if (!this.enabled) return;
    this.ensure();
    const now = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(this.context.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  shoot() {
    this.tone(180, 0.09, "sawtooth", 0.09, -80);
  }

  correct() {
    this.tone(520, 0.08, "triangle", 0.08, 160);
    setTimeout(() => this.tone(760, 0.1, "triangle", 0.06, 120), 80);
  }

  wrong() {
    this.tone(160, 0.18, "square", 0.08, -70);
  }

  reward() {
    [480, 620, 780, 980].forEach((freq, index) => setTimeout(() => this.tone(freq, 0.09, "triangle", 0.06), index * 70));
  }

  startMusic() {
    if (this.music || !this.enabled) return;
    this.ensure();
    const notes = [196, 247, 294, 330, 392, 330, 294, 247];
    let index = 0;
    this.music = setInterval(() => {
      this.tone(notes[index % notes.length], 0.16, "sine", 0.018);
      index += 1;
    }, 220);
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.music) {
      clearInterval(this.music);
      this.music = null;
    }
    if (this.enabled) this.startMusic();
    return this.enabled;
  }
}

const soundBank = new SoundBank();

class AcademyScene extends Phaser.Scene {
  loadProgress() {
    this.progress = loadProgress();
    return this.progress;
  }

  saveProgress() {
    saveProgress(this.progress);
  }

  addTopHud(title = "English Shooter Academy") {
    const { width } = this.scale;
    this.add.rectangle(width / 2, 34, width, 68, COLORS.ink, 0.68).setDepth(20);
    this.add.text(20, 15, title, {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#f5fbff",
      fontStyle: "bold"
    }).setDepth(21);

    this.add.text(width - 24, 16, `Coins ${this.progress.coins}  XP ${this.progress.xp}`, {
      fontFamily: "Arial",
      fontSize: "15px",
      color: "#ffc857",
      fontStyle: "bold"
    }).setOrigin(1, 0).setDepth(21);
  }

  makeButton(x, y, width, height, label, onClick, config = {}) {
    const container = this.add.container(x, y).setDepth(config.depth || 30);
    const bg = this.add.rectangle(0, 0, width, height, config.fill || COLORS.cyan, config.alpha ?? 1)
      .setStrokeStyle(2, config.stroke || 0xffffff, 0.75);
    const text = this.add.text(0, 0, label, {
      fontFamily: "Arial",
      fontSize: `${config.fontSize || 17}px`,
      color: config.color || "#101826",
      fontStyle: "bold",
      align: "center",
      wordWrap: { width: width - 18 }
    }).setOrigin(0.5);

    container.add([bg, text]);
    bg.setInteractive({ useHandCursor: true })
      .on("pointerover", () => bg.setScale(1.03))
      .on("pointerout", () => bg.setScale(1))
      .on("pointerdown", () => {
        soundBank.ensure();
        soundBank.startMusic();
        soundBank.tone(360, 0.05, "triangle", 0.035);
        onClick?.();
      });
    return container;
  }

  addSceneBackground(speed = 0.35) {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, 0x101826);
    const bandColors = [0x14243a, 0x183f4f, 0x34234d, 0x123c35];
    for (let i = 0; i < 10; i += 1) {
      const stripe = this.add.rectangle(width / 2, i * 90 + 30, width * 1.6, 42, bandColors[i % bandColors.length], 0.28);
      stripe.setAngle(i % 2 ? -8 : 8);
      this.tweens.add({
        targets: stripe,
        x: width / 2 + (i % 2 ? 24 : -24),
        duration: 1600 + i * 120,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
    }

    for (let i = 0; i < 36; i += 1) {
      const dot = this.add.circle(Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), Phaser.Math.Between(1, 3), COLORS.cyan, 0.24);
      this.tweens.add({
        targets: dot,
        y: dot.y + Phaser.Math.Between(18, 42) * speed,
        alpha: { from: 0.12, to: 0.55 },
        duration: Phaser.Math.Between(1300, 2600),
        yoyo: true,
        repeat: -1
      });
    }
  }
}

class BootScene extends AcademyScene {
  constructor() {
    super("BootScene");
  }

  create() {
    this.createTextures();
    this.loadProgress();

    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      const baseUrl = import.meta.env.BASE_URL || "/";
      navigator.serviceWorker.register(`${baseUrl}sw.js`, { scope: baseUrl }).catch(() => {});
    }

    this.scene.start("IntroScene");
  }

  createTextures() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    g.clear();
    g.fillStyle(0x48d7ff, 1);
    g.fillCircle(30, 24, 18);
    g.fillStyle(0x162235, 1);
    g.fillRoundedRect(16, 39, 28, 36, 8);
    g.fillStyle(0xffc857, 1);
    g.fillRoundedRect(38, 43, 34, 9, 4);
    g.fillStyle(0xf5fbff, 1);
    g.fillCircle(24, 21, 4);
    g.fillCircle(36, 21, 4);
    g.generateTexture("hero", 82, 82);

    g.clear();
    g.fillStyle(0xff4d6d, 1);
    g.fillRoundedRect(4, 8, 70, 46, 18);
    g.fillStyle(0x162235, 1);
    g.fillCircle(23, 26, 6);
    g.fillCircle(55, 26, 6);
    g.fillStyle(0xffc857, 1);
    g.fillRoundedRect(24, 39, 30, 5, 3);
    g.generateTexture("enemy", 80, 64);

    g.clear();
    g.fillStyle(0x50e3a4, 1);
    g.fillCircle(16, 16, 12);
    g.fillStyle(0xf5fbff, 1);
    g.fillCircle(16, 16, 5);
    g.generateTexture("bullet", 32, 32);

    g.clear();
    g.fillStyle(0xffc857, 1);
    g.fillCircle(22, 22, 20);
    g.fillStyle(0xff7a45, 1);
    g.fillCircle(22, 22, 13);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(22, 22, 6);
    g.generateTexture("burst", 44, 44);

    g.clear();
    g.fillStyle(0x8d7dff, 1);
    g.fillRoundedRect(0, 0, 96, 96, 26);
    g.fillStyle(0x233147, 1);
    g.fillRoundedRect(16, 16, 64, 64, 18);
    g.fillStyle(0xffc857, 1);
    g.fillTriangle(48, 26, 68, 66, 28, 66);
    g.generateTexture("badge", 96, 96);

    g.destroy();
  }
}

class IntroScene extends AcademyScene {
  constructor() {
    super("IntroScene");
  }

  create() {
    this.loadProgress();
    this.addSceneBackground(1);
    const { width, height } = this.scale;
    const centerX = width / 2;

    const title = this.add.text(centerX, 72, "English Shooter Academy", {
      fontFamily: "Arial",
      fontSize: `${clamp(width / 20, 28, 56)}px`,
      color: "#f5fbff",
      fontStyle: "bold",
      align: "center"
    }).setOrigin(0.5).setAlpha(0);

    const sub = this.add.text(centerX, 128, "Shoot the correct answer. Learn fast. Win faster.", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#a9bad6",
      align: "center"
    }).setOrigin(0.5).setAlpha(0);

    const arena = this.add.rectangle(centerX, height * 0.58, Math.min(width - 34, 760), Math.min(370, height * 0.54), 0x162235, 0.78)
      .setStrokeStyle(3, COLORS.cyan, 0.55);
    const hero = this.add.image(-90, height * 0.76, "hero").setScale(1.32);
    const enemyA = this.add.image(width + 90, height * 0.47, "enemy").setScale(1.05);
    const enemyB = this.add.image(width + 140, height * 0.61, "enemy").setScale(0.92).setTint(0xffc857);

    const qPanel = this.add.rectangle(centerX, height * 0.25, Math.min(width - 42, 620), 78, COLORS.panel, 0.92)
      .setStrokeStyle(2, COLORS.gold, 0.8)
      .setAlpha(0);
    const qText = this.add.text(centerX, height * 0.25, "Tutorial: Which word means brave?", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#f5fbff",
      fontStyle: "bold",
      align: "center",
      wordWrap: { width: Math.min(width - 70, 580) }
    }).setOrigin(0.5).setAlpha(0);

    const optionLabels = ["Courageous", "Late", "Hungry", "Tiny"];
    const options = optionLabels.map((label, index) => {
      const x = centerX + (index - 1.5) * Math.min(150, width / 4.8);
      const y = height * 0.42 + (index % 2) * 76;
      const box = this.add.rectangle(x, y, Math.min(138, width / 4.6), 48, index === 0 ? COLORS.green : COLORS.panel2, 0.96)
        .setStrokeStyle(2, 0xffffff, 0.45)
        .setAlpha(0);
      const text = this.add.text(x, y, label, {
        fontFamily: "Arial",
        fontSize: "15px",
        color: index === 0 ? "#101826" : "#f5fbff",
        fontStyle: "bold",
        align: "center",
        wordWrap: { width: Math.min(120, width / 5) }
      }).setOrigin(0.5).setAlpha(0);
      return { box, text };
    });

    const tip = this.add.text(centerX, height - 118, "Tap or click the answer target. Use A/D or arrows to move on PC.", {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#f5fbff",
      align: "center",
      wordWrap: { width: width - 34 }
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({ targets: [title, sub], alpha: 1, y: "-=10", duration: 700, ease: "Sine.out" });
    this.tweens.add({ targets: hero, x: centerX - 190, duration: 900, ease: "Back.out", delay: 250 });
    this.tweens.add({ targets: enemyA, x: centerX + 170, duration: 900, ease: "Back.out", delay: 550 });
    this.tweens.add({ targets: enemyB, x: centerX + 30, duration: 900, ease: "Back.out", delay: 700 });
    this.tweens.add({ targets: [qPanel, qText, tip, ...options.flatMap((o) => [o.box, o.text])], alpha: 1, duration: 600, delay: 1050 });

    this.time.delayedCall(1750, () => {
      const bullet = this.add.image(hero.x + 48, hero.y - 18, "bullet").setScale(0.7);
      soundBank.shoot();
      this.tweens.add({
        targets: bullet,
        x: options[0].box.x,
        y: options[0].box.y,
        duration: 390,
        ease: "Quad.in",
        onComplete: () => {
          bullet.destroy();
          this.explode(options[0].box.x, options[0].box.y);
          soundBank.correct();
          options[0].box.setFillStyle(COLORS.gold);
        }
      });
    });

    this.makeButton(centerX, height - 54, Math.min(width - 60, 310), 54, "Enter Battlefield", () => {
      this.scene.start("MenuScene");
    }, { fill: COLORS.gold, stroke: COLORS.white, fontSize: 19 });
  }

  explode(x, y) {
    for (let i = 0; i < 12; i += 1) {
      const p = this.add.image(x, y, "burst").setScale(0.18).setAlpha(0.9);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-86, 86),
        y: y + Phaser.Math.Between(-58, 58),
        alpha: 0,
        scale: 0.02,
        duration: 520,
        ease: "Quad.out",
        onComplete: () => p.destroy()
      });
    }
  }
}

class MenuScene extends AcademyScene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.loadProgress();
    this.addSceneBackground();
    this.addTopHud("English Shooter Academy");
    const { width, height } = this.scale;
    const centerX = width / 2;

    const hero = this.add.image(centerX, height * 0.22, "hero").setScale(width < 520 ? 1.08 : 1.35);
    this.tweens.add({ targets: hero, y: hero.y - 10, duration: 1200, yoyo: true, repeat: -1, ease: "Sine.inOut" });

    this.add.text(centerX, height * 0.32, "Choose your training run", {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#f5fbff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const columns = width > 760 ? 3 : 1;
    const buttonWidth = columns === 3 ? 220 : Math.min(width - 44, 360);
    const startY = height * 0.42;
    const gapY = 68;
    const modes = [
      ["Arcade Mode", "Endless adaptive quiz shooting", () => this.scene.start("GameScene", { mode: "arcade" }), COLORS.cyan],
      ["Mission Mode", `Level ${this.progress.missionUnlocked} boss path`, () => this.scene.start("MissionScene"), COLORS.green],
      ["Battle Mode", "1v1 quiz duel simulation", () => this.scene.start("GameScene", { mode: "battle" }), COLORS.orange],
      ["Daily Challenge", "Timed coin and XP hunt", () => this.scene.start("GameScene", { mode: "daily" }), COLORS.gold],
      ["Spin Rewards", "Coins, XP and unlock boosts", () => this.scene.start("RewardScene", { view: "spin" }), COLORS.violet],
      ["Progress Hub", "Pass, skins, leaderboard", () => this.scene.start("RewardScene", { view: "hub" }), COLORS.panel2]
    ];

    modes.forEach(([title, detail, action, fill], index) => {
      const col = columns === 3 ? index % 3 : 0;
      const row = columns === 3 ? Math.floor(index / 3) : index;
      const x = columns === 3 ? centerX + (col - 1) * 246 : centerX;
      const y = startY + row * gapY;
      const button = this.makeButton(x, y, buttonWidth, 56, title, action, {
        fill,
        color: fill === COLORS.panel2 ? "#f5fbff" : "#101826",
        stroke: COLORS.white,
        fontSize: 17
      });
      this.add.text(x, y + 34, detail, {
        fontFamily: "Arial",
        fontSize: "12px",
        color: "#a9bad6",
        align: "center",
        wordWrap: { width: buttonWidth }
      }).setOrigin(0.5, 0).setDepth(button.depth + 1);
    });

    const audioLabel = soundBank.enabled ? "Sound On" : "Sound Off";
    this.makeButton(width - 72, height - 40, 106, 42, audioLabel, () => {
      soundBank.toggle();
      this.scene.restart();
    }, { fill: COLORS.panel2, color: "#f5fbff", fontSize: 13 });
  }
}

class MissionScene extends AcademyScene {
  constructor() {
    super("MissionScene");
  }

  create() {
    this.loadProgress();
    this.addSceneBackground();
    this.addTopHud("Mission Mode");
    const { width, height } = this.scale;
    const centerX = width / 2;

    this.add.text(centerX, 104, "Clear missions to unlock boss quizzes, weapons, and maps.", {
      fontFamily: "Arial",
      fontSize: "17px",
      color: "#a9bad6",
      align: "center",
      wordWrap: { width: width - 44 }
    }).setOrigin(0.5);

    const levels = [
      { id: 1, title: "Grammar Gate", topic: "Grammar", map: "Metro Arena" },
      { id: 2, title: "Vocabulary Vault", topic: "Vocabulary", map: "Neon Library" },
      { id: 3, title: "Tense Tower", topic: "Tenses", map: "Sky Bridge" },
      { id: 4, title: "Boss Exam", topic: "Mixed Advanced", map: "Final Zone" }
    ];

    levels.forEach((level, index) => {
      const y = 172 + index * 92;
      const locked = level.id > this.progress.missionUnlocked;
      const panelWidth = Math.min(width - 40, 560);
      this.add.rectangle(centerX, y, panelWidth, 74, locked ? 0x18202e : COLORS.panel, 0.95)
        .setStrokeStyle(2, locked ? 0x3a465c : COLORS.cyan, 0.6);
      this.add.text(centerX - panelWidth / 2 + 18, y - 22, level.title, {
        fontFamily: "Arial",
        fontSize: "18px",
        color: locked ? "#6f7d95" : "#f5fbff",
        fontStyle: "bold"
      });
      this.add.text(centerX - panelWidth / 2 + 18, y + 5, `${level.topic} | ${level.map}`, {
        fontFamily: "Arial",
        fontSize: "14px",
        color: locked ? "#59677f" : "#a9bad6"
      });
      this.makeButton(centerX + panelWidth / 2 - 72, y, 110, 42, locked ? "Locked" : "Start", () => {
        if (!locked) this.scene.start("GameScene", { mode: "mission", missionLevel: level.id });
      }, {
        fill: locked ? 0x3a465c : COLORS.green,
        color: locked ? "#a9bad6" : "#101826",
        fontSize: 14
      });
    });

    this.makeButton(82, height - 42, 124, 44, "Back", () => this.scene.start("MenuScene"), {
      fill: COLORS.panel2,
      color: "#f5fbff",
      fontSize: 14
    });
  }
}

class GameScene extends AcademyScene {
  constructor() {
    super("GameScene");
  }

  init(data) {
    this.mode = data.mode || "arcade";
    this.missionLevel = data.missionLevel || 1;
  }

  create() {
    this.loadProgress();
    this.addSceneBackground(1.1);
    const { width, height } = this.scale;
    this.arena = { left: 20, right: width - 20, top: 112, bottom: height - 126 };
    this.round = 0;
    this.score = 0;
    this.combo = 0;
    this.health = this.mode === "battle" ? 4 : 5;
    this.correct = 0;
    this.wrong = 0;
    this.tips = [];
    this.targets = [];
    this.bullets = [];
    this.bossHealth = 0;
    this.enemyScore = 0;
    this.timeLeft = this.mode === "daily" ? 90 : 0;
    this.roundGoal = this.mode === "battle" ? 10 : this.mode === "mission" ? 9 : Infinity;
    this.gameOver = false;

    this.createHud();
    this.createHero();
    this.createControls();
    this.spawnQuestion();

    this.input.keyboard.on("keydown-SPACE", () => this.fireAtNearest());
    this.input.on("pointerdown", (pointer, objects) => {
      if (objects.length) return;
      if (pointer.y < 92 || pointer.y > height - 90) return;
      this.shootAt(pointer.x, pointer.y, null);
    });

    if (this.mode === "battle") {
      this.battleTimer = this.time.addEvent({
        delay: 1250,
        loop: true,
        callback: () => {
          if (this.gameOver) return;
          const odds = clamp(0.38 + this.round * 0.025, 0.38, 0.72);
          if (Math.random() < odds) this.enemyScore += Phaser.Math.Between(70, 140);
          this.updateHud();
        }
      });
    }

    if (this.mode === "daily") {
      this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          if (this.gameOver) return;
          this.timeLeft -= 1;
          this.updateHud();
          if (this.timeLeft <= 0) this.endRound("Time is up");
        }
      });
    }
  }

  createHud() {
    const { width } = this.scale;
    const modeTitle = {
      arcade: "Arcade Mode",
      mission: `Mission ${this.missionLevel}`,
      battle: "Quiz Battle",
      daily: "Daily Challenge"
    }[this.mode];

    this.add.rectangle(width / 2, 45, width, 90, COLORS.ink, 0.78).setDepth(50);
    this.questionBox = this.add.rectangle(width / 2, 92, Math.min(width - 24, 860), 72, COLORS.panel, 0.96)
      .setStrokeStyle(2, COLORS.cyan, 0.65)
      .setDepth(51);
    this.modeText = this.add.text(18, 12, modeTitle, {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#f5fbff",
      fontStyle: "bold"
    }).setDepth(52);
    this.scoreText = this.add.text(width - 18, 12, "", {
      fontFamily: "Arial",
      fontSize: "15px",
      color: "#ffc857",
      fontStyle: "bold",
      align: "right"
    }).setOrigin(1, 0).setDepth(52);
    this.questionText = this.add.text(width / 2, 92, "", {
      fontFamily: "Arial",
      fontSize: `${width < 480 ? 16 : 20}px`,
      color: "#f5fbff",
      align: "center",
      fontStyle: "bold",
      wordWrap: { width: Math.min(width - 58, 800) }
    }).setOrigin(0.5).setDepth(52);
  }

  createHero() {
    const { width, height } = this.scale;
    const outfit = OUTFITS.find((item) => item.id === this.progress.selectedOutfit) || OUTFITS[0];
    this.hero = this.add.image(width / 2, height - 82, "hero").setScale(width < 500 ? 0.9 : 1.05).setDepth(12);
    this.hero.setTint(outfit.color);
    this.aimLine = this.add.line(0, 0, this.hero.x, this.hero.y - 16, this.hero.x, this.hero.y - 86, COLORS.cyan, 0.25).setDepth(8);
    this.keys = this.input.keyboard.addKeys("A,D,LEFT,RIGHT,W,S,UP,DOWN");
  }

  createControls() {
    const { width, height } = this.scale;
    this.moveLeft = false;
    this.moveRight = false;

    const left = this.add.rectangle(48, height - 45, 70, 56, COLORS.panel2, 0.7)
      .setStrokeStyle(2, COLORS.cyan, 0.35)
      .setInteractive()
      .setDepth(60);
    const right = this.add.rectangle(126, height - 45, 70, 56, COLORS.panel2, 0.7)
      .setStrokeStyle(2, COLORS.cyan, 0.35)
      .setInteractive()
      .setDepth(60);
    this.add.text(left.x, left.y, "Left", { fontFamily: "Arial", fontSize: "13px", color: "#f5fbff", fontStyle: "bold" }).setOrigin(0.5).setDepth(61);
    this.add.text(right.x, right.y, "Right", { fontFamily: "Arial", fontSize: "13px", color: "#f5fbff", fontStyle: "bold" }).setOrigin(0.5).setDepth(61);

    left.on("pointerdown", () => (this.moveLeft = true));
    left.on("pointerup", () => (this.moveLeft = false));
    left.on("pointerout", () => (this.moveLeft = false));
    right.on("pointerdown", () => (this.moveRight = true));
    right.on("pointerup", () => (this.moveRight = false));
    right.on("pointerout", () => (this.moveRight = false));

    this.add.text(width / 2, height - 42, "Tap an answer target to shoot", {
      fontFamily: "Arial",
      fontSize: "13px",
      color: "#a9bad6",
      align: "center",
      wordWrap: { width: width - 220 }
    }).setOrigin(0.5).setDepth(60);
  }

  spawnQuestion() {
    if (this.gameOver) return;
    this.clearTargets();
    this.round += 1;
    const bossRound = this.mode === "mission" && this.round >= this.roundGoal;
    if (bossRound && !this.bossHealth) {
      this.bossHealth = 3 + Math.floor(this.missionLevel / 2);
      this.cameras.main.shake(260, 0.006);
    }
    this.currentQuestion = weightedQuestion(this.progress, this.round + this.correct, this.mode, bossRound);
    this.questionText.setText(wrappedText(this.currentQuestion.question, this.scale.width < 480 ? 44 : 70));
    this.updateHud();

    const { width, height } = this.scale;
    const spacing = Math.min(190, (width - 64) / 4);
    const startX = width / 2 - spacing * 1.5;
    const baseY = bossRound ? height * 0.37 : height * 0.36;
    const answers = Phaser.Utils.Array.Shuffle([...this.currentQuestion.options]);

    if (bossRound) {
      this.boss = this.add.image(width / 2, height * 0.22, "enemy").setScale(1.5).setTint(COLORS.violet).setDepth(7);
      this.add.text(width / 2, this.boss.y + 62, `Boss HP ${this.bossHealth}`, {
        fontFamily: "Arial",
        fontSize: "15px",
        color: "#ffc857",
        fontStyle: "bold"
      }).setOrigin(0.5).setDepth(8).setName("bossHpText");
      this.tweens.add({ targets: this.boss, x: width / 2 + 24, duration: 900, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    }

    answers.forEach((answer, index) => {
      const y = baseY + (index % 2) * Math.min(122, height * 0.16);
      const target = this.createTarget(startX + index * spacing, y, answer, answer === this.currentQuestion.answer, index, bossRound);
      this.targets.push(target);
    });
  }

  createTarget(x, y, answer, isCorrect, index, bossRound) {
    const width = clamp(this.scale.width / 4.9, 120, 176);
    const container = this.add.container(x, y).setDepth(18);
    const glowColor = isCorrect ? COLORS.green : COLORS.red;
    const shell = this.add.rectangle(0, 0, width, 82, COLORS.panel2, 0.96).setStrokeStyle(2, glowColor, 0.35);
    const enemy = this.add.image(0, -36, "enemy").setScale(0.62).setTint(isCorrect ? 0xffffff : 0xff9aa6);
    const text = this.add.text(0, 15, wrappedText(answer, 17), {
      fontFamily: "Arial",
      fontSize: `${this.scale.width < 480 ? 12 : 14}px`,
      color: "#f5fbff",
      fontStyle: "bold",
      align: "center",
      wordWrap: { width: width - 14 }
    }).setOrigin(0.5);

    container.add([shell, enemy, text]);
    container.setSize(width, 100);
    container.setInteractive(new Phaser.Geom.Rectangle(-width / 2, -50, width, 100), Phaser.Geom.Rectangle.Contains);
    container.option = answer;
    container.isCorrect = isCorrect;
    container.speed = (bossRound ? 1.8 : 1.1) + this.round * 0.09 + index * 0.12;
    container.dir = index % 2 ? -1 : 1;
    container.shell = shell;
    container.on("pointerdown", () => this.shootAtTarget(container));
    this.tweens.add({
      targets: container,
      y: y + Phaser.Math.Between(-16, 16),
      duration: 720 + index * 110,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut"
    });
    return container;
  }

  update(time, delta) {
    if (this.gameOver) return;
    const dt = delta / 16.666;
    const speed = 5.8 * dt;
    const movingLeft = this.keys.A.isDown || this.keys.LEFT.isDown || this.moveLeft;
    const movingRight = this.keys.D.isDown || this.keys.RIGHT.isDown || this.moveRight;
    if (movingLeft) this.hero.x -= speed;
    if (movingRight) this.hero.x += speed;
    this.hero.x = clamp(this.hero.x, 38, this.scale.width - 38);
    this.aimLine.setTo(this.hero.x, this.hero.y - 22, this.hero.x, this.hero.y - 112);

    for (const target of this.targets) {
      if (!target.active) continue;
      target.x += target.speed * target.dir * dt;
      if (target.x < this.arena.left + target.width / 2 || target.x > this.arena.right - target.width / 2) {
        target.dir *= -1;
      }
    }
  }

  shootAtTarget(target) {
    if (!target?.active || this.gameOver) return;
    this.shootAt(target.x, target.y, target);
  }

  shootAt(x, y, target) {
    if (this.gameOver) return;
    soundBank.shoot();
    const weapon = WEAPONS.find((item) => item.id === this.progress.selectedWeapon) || WEAPONS[0];
    const bullet = this.add.image(this.hero.x + 24, this.hero.y - 28, "bullet").setScale(0.62).setTint(weapon.color).setDepth(28);
    this.tweens.add({
      targets: bullet,
      x,
      y,
      duration: Phaser.Math.Distance.Between(this.hero.x, this.hero.y, x, y) * 1.05,
      ease: "Quad.in",
      onComplete: () => {
        bullet.destroy();
        const hit = target || this.targets.find((candidate) => candidate.active && Phaser.Math.Distance.Between(candidate.x, candidate.y, x, y) < 68);
        if (hit) this.resolveShot(hit);
      }
    });
  }

  fireAtNearest() {
    const nearest = this.targets
      .filter((target) => target.active)
      .sort((a, b) => Math.abs(a.x - this.hero.x) - Math.abs(b.x - this.hero.x))[0];
    if (nearest) this.shootAtTarget(nearest);
  }

  resolveShot(target) {
    if (!target.active || this.gameOver) return;
    if (target.isCorrect) this.correctShot(target);
    else this.wrongShot(target);
  }

  correctShot(target) {
    this.combo += 1;
    this.correct += 1;
    const multiplier = 1 + Math.floor(this.combo / 3) * 0.25;
    const award = Math.round((100 + this.round * 8) * multiplier);
    this.score += award;
    this.progress.correctTotal += 1;
    this.progress.weakness[this.currentQuestion.topic] = Math.max(0, (this.progress.weakness[this.currentQuestion.topic] || 0) - 1);
    this.tips.push(this.currentQuestion.tip);
    target.shell.setFillStyle(COLORS.green);
    soundBank.correct();
    this.explode(target.x, target.y);
    target.disableInteractive();
    this.tweens.add({ targets: target, scale: 1.14, alpha: 0, duration: 260, onComplete: () => target.destroy() });

    if (this.bossHealth) {
      const weapon = WEAPONS.find((item) => item.id === this.progress.selectedWeapon) || WEAPONS[0];
      this.bossHealth -= weapon.damage;
      this.cameras.main.shake(110, 0.004);
      const bossHpText = this.children.getByName("bossHpText");
      if (bossHpText) bossHpText.setText(`Boss HP ${Math.max(0, this.bossHealth)}`);
      if (this.bossHealth <= 0) {
        this.time.delayedCall(450, () => this.endRound("Mission cleared"));
        return;
      }
    }

    this.updateHud();
    this.time.delayedCall(520, () => {
      if (this.round >= this.roundGoal && this.mode !== "arcade" && !this.bossHealth) {
        this.endRound(this.mode === "battle" ? "Battle complete" : "Run complete");
      } else {
        this.spawnQuestion();
      }
    });
  }

  wrongShot(target) {
    this.combo = 0;
    this.wrong += 1;
    this.health -= 1;
    this.progress.wrongTotal += 1;
    this.progress.weakness[this.currentQuestion.topic] = (this.progress.weakness[this.currentQuestion.topic] || 0) + 2;
    if (!this.progress.wrongQueue.includes(this.currentQuestion.id)) this.progress.wrongQueue.push(this.currentQuestion.id);
    soundBank.wrong();
    this.cameras.main.flash(170, 255, 25, 55);
    this.cameras.main.shake(150, 0.006);
    target.shell.setFillStyle(COLORS.red);
    this.updateHud();

    this.time.delayedCall(480, () => {
      if (this.health <= 0) this.endRound("Health depleted");
      else this.spawnQuestion();
    });
  }

  updateHud() {
    const battle = this.mode === "battle" ? `  Rival ${this.enemyScore}` : "";
    const timer = this.mode === "daily" ? `  Time ${this.timeLeft}` : "";
    const boss = this.bossHealth ? `  Boss HP ${this.bossHealth}` : "";
    this.scoreText.setText(`Score ${this.score}  HP ${this.health}  Combo x${Math.max(1, this.combo)}${battle}${timer}${boss}`);
  }

  clearTargets() {
    this.targets.forEach((target) => target.destroy());
    this.targets = [];
    if (this.boss) {
      this.boss.destroy();
      this.boss = null;
    }
    this.children.getChildren()
      .filter((child) => child.name === "bossHpText")
      .forEach((child) => child.destroy());
  }

  explode(x, y) {
    for (let i = 0; i < 15; i += 1) {
      const p = this.add.image(x, y, "burst").setScale(0.16).setAlpha(0.95).setDepth(34);
      this.tweens.add({
        targets: p,
        x: x + Phaser.Math.Between(-96, 96),
        y: y + Phaser.Math.Between(-72, 72),
        alpha: 0,
        scale: 0.02,
        duration: 540,
        ease: "Quad.out",
        onComplete: () => p.destroy()
      });
    }
  }

  async endRound(reason) {
    if (this.gameOver) return;
    this.gameOver = true;
    this.clearTargets();
    this.progress.gamesPlayed += 1;
    const wonBattle = this.mode !== "battle" || this.score >= this.enemyScore;
    const coins = Math.max(20, Math.floor(this.score / 85)) + (wonBattle ? 25 : 0);
    const xp = Math.max(25, Math.floor(this.score / 55)) + this.correct * 8;
    addProgressRewards(this.progress, { coins, xp, battlePassXp: xp });
    if (this.score > this.progress.bestScore) this.progress.bestScore = this.score;
    if (this.mode === "mission" && this.bossHealth <= 0) this.progress.missionUnlocked = Math.max(this.progress.missionUnlocked, this.missionLevel + 1);
    this.progress.wrongQueue = this.progress.wrongQueue.slice(-8);
    this.saveProgress();
    await firebaseBridge.submitLeaderboard({ name: "You", score: this.score, date: todayKey() });
    soundBank.reward();

    const { width, height } = this.scale;
    const panelW = Math.min(width - 30, 620);
    const panelH = Math.min(height - 80, 520);
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.ink, 0.72).setDepth(80);
    this.add.rectangle(width / 2, height / 2, panelW, panelH, COLORS.panel, 0.98)
      .setStrokeStyle(3, wonBattle ? COLORS.green : COLORS.gold, 0.8)
      .setDepth(81);
    this.add.text(width / 2, height / 2 - panelH / 2 + 34, reason, {
      fontFamily: "Arial",
      fontSize: "26px",
      color: "#f5fbff",
      fontStyle: "bold",
      align: "center"
    }).setOrigin(0.5).setDepth(82);

    const result = this.mode === "battle" ? (wonBattle ? "Victory" : "Close match") : `${this.correct} correct shots`;
    this.add.text(width / 2, height / 2 - panelH / 2 + 76, `${result} | Score ${this.score}`, {
      fontFamily: "Arial",
      fontSize: "17px",
      color: "#ffc857",
      fontStyle: "bold",
      align: "center"
    }).setOrigin(0.5).setDepth(82);

    const uniqueTips = [...new Set(this.tips)].slice(0, 3);
    const weaknesses = Object.entries(this.progress.weakness)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([topic]) => topic)
      .join(", ") || "Balanced";

    this.add.text(width / 2, height / 2 - 66, `Rewards: ${coins} coins, ${xp} XP\nFocus next: ${weaknesses}`, {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#f5fbff",
      align: "center",
      lineSpacing: 8,
      wordWrap: { width: panelW - 50 }
    }).setOrigin(0.5).setDepth(82);

    this.add.text(width / 2, height / 2 + 36, uniqueTips.length ? uniqueTips.join("\n") : "Keep shooting correct answers to build a combo multiplier.", {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#a9bad6",
      align: "center",
      lineSpacing: 6,
      wordWrap: { width: panelW - 48 }
    }).setOrigin(0.5).setDepth(82);

    this.makeButton(width / 2 - 105, height / 2 + panelH / 2 - 58, 170, 48, "Play Again", () => {
      this.scene.start("GameScene", { mode: this.mode, missionLevel: this.missionLevel });
    }, { fill: COLORS.green, fontSize: 15, depth: 90 });
    this.makeButton(width / 2 + 105, height / 2 + panelH / 2 - 58, 170, 48, "Menu", () => {
      this.scene.start("MenuScene");
    }, { fill: COLORS.panel2, color: "#f5fbff", fontSize: 15, depth: 90 });
  }
}

class RewardScene extends AcademyScene {
  constructor() {
    super("RewardScene");
  }

  init(data) {
    this.view = data.view || "hub";
  }

  async create() {
    this.loadProgress();
    this.addSceneBackground();
    this.addTopHud(this.view === "spin" ? "Spin Rewards" : "Progress Hub");
    const { width, height } = this.scale;
    const centerX = width / 2;

    this.makeButton(78, height - 42, 122, 44, "Back", () => this.scene.start("MenuScene"), {
      fill: COLORS.panel2,
      color: "#f5fbff",
      fontSize: 14
    });

    if (this.view === "spin") this.createSpinView();
    else await this.createHubView();
  }

  createSpinView() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    const centerY = height * 0.46;
    const radius = Math.min(width * 0.34, 170);
    const rewards = [
      { label: "40 coins", coins: 40, color: COLORS.gold },
      { label: "80 XP", xp: 80, color: COLORS.cyan },
      { label: "Skin boost", xp: 160, color: COLORS.green },
      { label: "120 coins", coins: 120, color: COLORS.orange },
      { label: "Pass XP", battlePassXp: 140, color: COLORS.violet },
      { label: "Ad bonus", coins: 180, ad: true, color: COLORS.red }
    ];

    const wheel = this.add.container(centerX, centerY).setDepth(15);
    rewards.forEach((reward, index) => {
      const angle = Phaser.Math.DegToRad(index * 60 - 90);
      const wedge = this.add.triangle(0, 0, 0, 0, radius * Math.cos(angle), radius * Math.sin(angle), radius * Math.cos(angle + Math.PI / 3), radius * Math.sin(angle + Math.PI / 3), reward.color, 0.88)
        .setStrokeStyle(1, COLORS.white, 0.35);
      const label = this.add.text(Math.cos(angle + Math.PI / 6) * radius * 0.58, Math.sin(angle + Math.PI / 6) * radius * 0.58, reward.label, {
        fontFamily: "Arial",
        fontSize: "13px",
        color: "#101826",
        fontStyle: "bold",
        align: "center",
        wordWrap: { width: 72 }
      }).setOrigin(0.5);
      label.setAngle(index * 60 - 60);
      wheel.add([wedge, label]);
    });
    this.add.triangle(centerX, centerY - radius - 18, -12, 0, 12, 0, 0, 28, COLORS.white, 1).setDepth(20);

    const info = this.add.text(centerX, centerY + radius + 42, "Spin once per visit. Rewarded ad bonus uses an offline test adapter.", {
      fontFamily: "Arial",
      fontSize: "15px",
      color: "#a9bad6",
      align: "center",
      wordWrap: { width: width - 42 }
    }).setOrigin(0.5).setDepth(20);

    let spun = false;
    this.makeButton(centerX, height - 104, Math.min(width - 58, 300), 52, "Spin Wheel", async () => {
      if (spun) return;
      spun = true;
      const reward = Phaser.Utils.Array.GetRandom(rewards);
      if (reward.ad) await adMobBridge.showRewardedAd("spin-wheel");
      this.tweens.add({
        targets: wheel,
        angle: 1440 + rewards.indexOf(reward) * 60,
        duration: 2200,
        ease: "Cubic.out",
        onComplete: () => {
          addProgressRewards(this.progress, reward);
          this.saveProgress();
          info.setText(`You won ${reward.label}. Coins ${this.progress.coins} | XP ${this.progress.xp}`);
          soundBank.reward();
        }
      });
    }, { fill: COLORS.gold, fontSize: 18 });
  }

  async createHubView() {
    const { width, height } = this.scale;
    const centerX = width / 2;
    const top = 96;
    const panelWidth = Math.min(width - 36, 720);
    const passLevel = Math.floor(this.progress.battlePassXp / 250) + 1;
    const passProgress = (this.progress.battlePassXp % 250) / 250;
    const leaderboard = await firebaseBridge.loadLeaderboard(DEFAULT_LEADERBOARD);

    this.add.rectangle(centerX, top + 74, panelWidth, 128, COLORS.panel, 0.95)
      .setStrokeStyle(2, COLORS.cyan, 0.55);
    this.add.text(centerX - panelWidth / 2 + 18, top + 26, "Battle Pass", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#f5fbff",
      fontStyle: "bold"
    });
    this.add.text(centerX - panelWidth / 2 + 18, top + 58, `Season level ${passLevel} | ${this.progress.battlePassXp} pass XP`, {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#a9bad6"
    });
    this.add.rectangle(centerX, top + 104, panelWidth - 36, 18, COLORS.panel2, 1);
    this.add.rectangle(centerX - (panelWidth - 36) / 2 + (panelWidth - 36) * passProgress / 2, top + 104, (panelWidth - 36) * passProgress, 18, COLORS.gold, 1);

    const ownedWeapons = WEAPONS.map((weapon) => `${this.progress.unlockedWeapons.includes(weapon.id) ? "Unlocked" : `${weapon.unlock} coins`}: ${weapon.name}`).join("\n");
    const ownedOutfits = OUTFITS.map((outfit) => `${this.progress.unlockedOutfits.includes(outfit.id) ? "Unlocked" : `${outfit.unlock} XP`}: ${outfit.name}`).join("\n");
    this.add.rectangle(centerX, top + 246, panelWidth, 130, COLORS.panel, 0.95).setStrokeStyle(2, COLORS.green, 0.48);
    this.add.text(centerX - panelWidth / 2 + 18, top + 196, "Loadout Unlocks", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#f5fbff",
      fontStyle: "bold"
    });
    this.add.text(centerX - panelWidth / 2 + 18, top + 226, ownedWeapons, {
      fontFamily: "Arial",
      fontSize: "13px",
      color: "#a9bad6",
      lineSpacing: 5
    });
    this.add.text(centerX + 22, top + 226, ownedOutfits, {
      fontFamily: "Arial",
      fontSize: "13px",
      color: "#a9bad6",
      lineSpacing: 5
    });

    this.add.rectangle(centerX, top + 406, panelWidth, 160, COLORS.panel, 0.95).setStrokeStyle(2, COLORS.gold, 0.52);
    this.add.text(centerX - panelWidth / 2 + 18, top + 338, "Leaderboard", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#f5fbff",
      fontStyle: "bold"
    });
    leaderboard.slice(0, 5).forEach((row, index) => {
      this.add.text(centerX - panelWidth / 2 + 24, top + 372 + index * 22, `${index + 1}. ${row.name}`, {
        fontFamily: "Arial",
        fontSize: "14px",
        color: row.name === "You" ? "#ffc857" : "#f5fbff",
        fontStyle: row.name === "You" ? "bold" : "normal"
      });
      this.add.text(centerX + panelWidth / 2 - 24, top + 372 + index * 22, `${row.score}`, {
        fontFamily: "Arial",
        fontSize: "14px",
        color: "#a9bad6"
      }).setOrigin(1, 0);
    });

    const dailyReady = this.progress.dailyRewardKey !== todayKey();
    this.makeButton(centerX, height - 102, Math.min(width - 56, 320), 50, dailyReady ? "Claim Daily Reward" : "Daily Claimed", () => {
      if (!dailyReady) return;
      this.progress.dailyRewardKey = todayKey();
      addProgressRewards(this.progress, { coins: 90, xp: 60, battlePassXp: 60 });
      this.saveProgress();
      soundBank.reward();
      this.scene.restart({ view: "hub" });
    }, { fill: dailyReady ? COLORS.green : COLORS.panel2, color: dailyReady ? "#101826" : "#a9bad6", fontSize: 16 });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#101826",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  input: {
    activePointers: 3
  },
  render: {
    antialias: true,
    pixelArt: false
  },
  scene: [BootScene, IntroScene, MenuScene, MissionScene, GameScene, RewardScene]
};

new Phaser.Game(config);
