import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// Initialize Farcaster SDK
sdk.actions.ready();

// Crypto-themed 5-letter words
const CRYPTO_WORDS = [
  'BLOCK', 'CHAIN', 'TOKEN', 'MINER', 'STAKE',
  'YIELD', 'DEFI', 'NODES', 'LAYER', 'PROOF',
  'VAULT', 'WHALE', 'HODL', 'SHARD', 'SWAP',
  'FARM', 'POOL', 'HASH', 'COIN', 'LEDGE',
  'ASSET', 'TRADE', 'WALLET', 'KEYS', 'SEED',
  'AIRDROP', 'PUMP', 'DUMP', 'FLASH', 'LOOP',
  'BRIDGE', 'MINT', 'BURN', 'FORK', 'NODE',
  'PEER', 'DAPP', 'GAS', 'FEE', 'BULL',
  'BEAR', 'MOON', 'HOLD', 'SELL', 'BUY',
  'RISK', 'GAIN', 'LOSS', 'MARKET', 'CAP'
].filter(w => w.length === 5);

// Valid 5-letter words for guessing (expanded list)
const VALID_WORDS = new Set([
  ...CRYPTO_WORDS,
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
  'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
  'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART',
  'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARMOR', 'ARRAY', 'ARROW', 'ASIAN', 'ASIDE',
  'ASSET', 'AVOID', 'AWARD', 'AWARE', 'AWFUL', 'BASIC', 'BASIS', 'BEACH', 'BEAST', 'BEGIN',
  'BEING', 'BELOW', 'BENCH', 'BERRY', 'BIRTH', 'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST',
  'BLAZE', 'BLEED', 'BLEND', 'BLESS', 'BLIND', 'BLOCK', 'BLOOD', 'BLOOM', 'BLOWN', 'BOARD',
  'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED',
  'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BRUSH', 'BUILD', 'BUILT',
  'BURST', 'BUYER', 'CABLE', 'CANDY', 'CARGO', 'CARRY', 'CATCH', 'CAUSE', 'CEASE', 'CHAIN',
  'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD',
  'CHINA', 'CHOSE', 'CHUNK', 'CIVIC', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK',
  'CLIFF', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOTH', 'CLOUD', 'COACH', 'COAST', 'CORAL', 'COULD',
  'COUNT', 'COURT', 'COVER', 'CRACK', 'CRAFT', 'CRANE', 'CRASH', 'CRAZY', 'CREAM', 'CREEK',
  'CRIME', 'CRISP', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CRUSH', 'CURVE', 'CYCLE', 'DAILY',
  'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DECAY', 'DECOR', 'DELAY', 'DELTA', 'DENSE',
  'DEPTH', 'DIARY', 'DIRTY', 'DISCO', 'DOING', 'DONOR', 'DOUBT', 'DOUGH', 'DOZEN', 'DRAFT',
  'DRAIN', 'DRAMA', 'DRANK', 'DRAWN', 'DREAD', 'DREAM', 'DRESS', 'DRIED', 'DRIFT', 'DRILL',
  'DRINK', 'DRIVE', 'DROIT', 'DROWN', 'DRUNK', 'DRYER', 'DYING', 'EAGER', 'EARLY', 'EARTH',
  'EATEN', 'EIGHT', 'ELDER', 'ELECT', 'ELITE', 'EMPTY', 'ENDED', 'ENEMY', 'ENJOY', 'ENTER',
  'ENTRY', 'EQUAL', 'ERROR', 'ESSAY', 'ETHIC', 'EVENT', 'EVERY', 'EXACT', 'EXILE', 'EXIST',
  'EXTRA', 'FAITH', 'FALSE', 'FANCY', 'FATAL', 'FAULT', 'FAVOR', 'FEAST', 'FIBER', 'FIELD',
  'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLAME', 'FLASH', 'FLEET', 'FLESH',
  'FLOAT', 'FLOOD', 'FLOOR', 'FLORA', 'FLOUR', 'FLUID', 'FLUSH', 'FLYER', 'FOCAL', 'FOCUS',
  'FORCE', 'FORGE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FREAK',
  'FRESH', 'FRONT', 'FROST', 'FRUIT', 'FULLY', 'FUNNY', 'GHOST', 'GIANT', 'GIVEN', 'GLAD',
  'GLASS', 'GLOBE', 'GLORY', 'GLOVE', 'GOING', 'GOLD', 'GOODS', 'GRACE', 'GRADE', 'GRAIN',
  'GRAND', 'GRANT', 'GRAPH', 'GRASP', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GREET', 'GRIEF',
  'GRILL', 'GRIND', 'GROSS', 'GROUP', 'GROVE', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE',
  'GUILT', 'HABIT', 'HAPPY', 'HARRY', 'HARSH', 'HAVEN', 'HEART', 'HEAVY', 'HEDGE', 'HELLO',
  'HENCE', 'HERBS', 'HINGE', 'HOBBY', 'HONEY', 'HONOR', 'HOPED', 'HORSE', 'HOSTS', 'HOTEL',
  'HOUSE', 'HUMAN', 'HUMOR', 'HURRY', 'IDEAL', 'IMAGE', 'IMPLY', 'INDEX', 'INDIA', 'INNER',
  'INPUT', 'INTEL', 'INTER', 'INTRO', 'ISSUE', 'JAPAN', 'JEWEL', 'JIMMY', 'JOINT', 'JONES',
  'JUDGE', 'JUICE', 'JUMBO', 'KARMA', 'KEEPS', 'KEYED', 'KILLS', 'KINDS', 'KINGS', 'KNIFE',
  'KNOCK', 'KNOWN', 'KNOWS', 'LABEL', 'LABOR', 'LAKES', 'LANDS', 'LARGE', 'LASER', 'LATER',
  'LAUGH', 'LAYER', 'LEADS', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEMON', 'LEVEL',
  'LEVER', 'LIGHT', 'LIKED', 'LIMIT', 'LINED', 'LINKS', 'LISTS', 'LIVED', 'LIVER', 'LIVES',
  'LOANS', 'LOCAL', 'LODGE', 'LOGIC', 'LOOKS', 'LOOSE', 'LORDS', 'LOSES', 'LOTUS', 'LOVED',
  'LOVER', 'LOWER', 'LOYAL', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MAKES',
  'MARCH', 'MARKS', 'MARRY', 'MARSH', 'MATCH', 'MAYBE', 'MAYOR', 'MEALS', 'MEANS', 'MEANT',
  'MEDAL', 'MEDIA', 'MEETS', 'MELON', 'MERCY', 'MERGE', 'MERIT', 'METAL', 'METER', 'MICRO',
  'MIDST', 'MIGHT', 'MILES', 'MILLS', 'MINDS', 'MINER', 'MINOR', 'MINUS', 'MIXED', 'MODEL',
  'MODES', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE',
  'MUSIC', 'NAMED', 'NAMES', 'NAILS', 'NAIVE', 'NAKED', 'NAVAL', 'NEEDS', 'NERVE', 'NEVER',
  'NEWER', 'NEWLY', 'NIGHT', 'NINE', 'NOBLE', 'NODAL', 'NOISE', 'NORMS', 'NORTH', 'NOTED',
  'NOTES', 'NOTRE', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'OLIVE', 'OMEGA',
  'ONSET', 'OPENS', 'OPERA', 'OPTED', 'ORBIT', 'ORDER', 'OTHER', 'OUGHT', 'OUTER', 'OWNED',
  'OWNER', 'OXIDE', 'OZONE', 'PACKS', 'PAGES', 'PAINT', 'PAIRS', 'PANEL', 'PANIC', 'PAPER',
  'PARKS', 'PARTY', 'PASTA', 'PASTE', 'PATCH', 'PATHS', 'PAUSE', 'PEACE', 'PEARL', 'PENNY',
  'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PICKS', 'PIECE', 'PILOT', 'PINCH', 'PITCH',
  'PIXEL', 'PIZZA', 'PLACE', 'PLAIN', 'PLANE', 'PLANS', 'PLANT', 'PLATE', 'PLAYS', 'PLAZA',
  'PLEAD', 'PLEAT', 'PLOTS', 'PLUMB', 'POEMS', 'POET', 'POINT', 'POKER', 'POLAR', 'POLLS',
  'POOLS', 'PORCH', 'PORTS', 'POSED', 'POSTS', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE',
  'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROBE', 'PROMO', 'PROOF', 'PROSE', 'PROUD', 'PROVE',
  'PROXY', 'PULSE', 'PUNCH', 'PUPPY', 'PURSE', 'QUEEN', 'QUERY', 'QUEST', 'QUEUE', 'QUICK',
  'QUIET', 'QUITE', 'QUOTA', 'QUOTE', 'RADAR', 'RADIO', 'RAILS', 'RAINY', 'RAISE', 'RALLY',
  'RANCH', 'RANGE', 'RANKS', 'RAPID', 'RATED', 'RATES', 'RATIO', 'REACH', 'REACT', 'READS',
  'READY', 'REALM', 'REBEL', 'REFER', 'REIGN', 'RELAX', 'RELAY', 'REPLY', 'RESET', 'RIDER',
  'RIDGE', 'RIFLE', 'RIGHT', 'RIGID', 'RINGS', 'RISEN', 'RISES', 'RISKS', 'RISKY', 'RIVAL',
  'RIVER', 'ROADS', 'ROBOT', 'ROCKS', 'ROCKY', 'ROGUE', 'ROLES', 'ROOMS', 'ROOTS', 'ROSES',
  'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RUGBY', 'RULED', 'RULER', 'RULES', 'RURAL', 'SADLY',
  'SAFER', 'SAINT', 'SALAD', 'SALES', 'SALLY', 'SALON', 'SANDY', 'SANTA', 'SAUCE', 'SAVED',
  'SAVES', 'SCALE', 'SCAM', 'SCARE', 'SCENE', 'SCOPE', 'SCORE', 'SCOUT', 'SCREW', 'SEALS',
  'SEATS', 'SEEDS', 'SEEKS', 'SEEMS', 'SELLS', 'SENDS', 'SENSE', 'SERVE', 'SETUP', 'SEVEN',
  'SHADE', 'SHAKE', 'SHALL', 'SHAME', 'SHAPE', 'SHARE', 'SHARK', 'SHARP', 'SHEEP', 'SHEER',
  'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIPS', 'SHIRT', 'SHOCK', 'SHOES', 'SHOOK',
  'SHOOT', 'SHOPS', 'SHORE', 'SHORT', 'SHOTS', 'SHOWN', 'SHOWS', 'SIDES', 'SIGHT', 'SIGMA',
  'SIGNS', 'SILLY', 'SIMON', 'SINCE', 'SITES', 'SIXTH', 'SIXTY', 'SIZED', 'SIZES', 'SKILL',
  'SKIN', 'SKIRT', 'SKULL', 'SLATE', 'SLAVE', 'SLEEP', 'SLEPT', 'SLICE', 'SLIDE', 'SLOPE',
  'SLOTS', 'SMALL', 'SMART', 'SMELL', 'SMILE', 'SMITH', 'SMOKE', 'SNAKE', 'SOLAR', 'SOLID',
  'SOLVE', 'SONGS', 'SORRY', 'SORTS', 'SOULS', 'SOUND', 'SOUTH', 'SPACE', 'SPAIN', 'SPARE',
  'SPARK', 'SPEAK', 'SPEED', 'SPELL', 'SPEND', 'SPENT', 'SPICE', 'SPILL', 'SPINE', 'SPIRIT',
  'SPLIT', 'SPOKE', 'SPOON', 'SPORT', 'SPOTS', 'SPRAY', 'SQUAD', 'STACK', 'STAFF', 'STAGE',
  'STAIN', 'STAKE', 'STALL', 'STAMP', 'STAND', 'STARK', 'STARS', 'START', 'STATE', 'STATS',
  'STAYS', 'STEAL', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STEMS', 'STEPS', 'STERN', 'STICK',
  'STILL', 'STOCK', 'STOLE', 'STONE', 'STOOD', 'STOPS', 'STORE', 'STORM', 'STORY', 'STOVE',
  'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUITS', 'SUNNY', 'SUPER',
  'SURGE', 'SWAMP', 'SWEAR', 'SWEAT', 'SWEEP', 'SWEET', 'SWEPT', 'SWIFT', 'SWING', 'SWISS',
  'SWORD', 'SWORE', 'SWORN', 'SYRUP', 'TABLE', 'TAKEN', 'TAKES', 'TALES', 'TALKS', 'TANKS',
  'TAPES', 'TASKS', 'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEARS', 'TEETH', 'TELLS', 'TEMPO',
  'TENDS', 'TERMS', 'TESTS', 'TEXAS', 'TEXTS', 'THANK', 'THEFT', 'THEME', 'THICK', 'THIEF',
  'THING', 'THINK', 'THIRD', 'THORN', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGHT',
  'TIMER', 'TIMES', 'TIRED', 'TITAN', 'TITLE', 'TODAY', 'TOKEN', 'TONES', 'TOOLS', 'TOOTH',
  'TOPIC', 'TORCH', 'TOTAL', 'TOUCH', 'TOUGH', 'TOURS', 'TOWEL', 'TOWER', 'TOWNS', 'TOXIC',
  'TRACE', 'TRACK', 'TRADE', 'TRAIL', 'TRAIN', 'TRAIT', 'TRASH', 'TREAT', 'TREES', 'TREND',
  'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRIPS', 'TROOP', 'TRUCK', 'TRULY', 'TRUMP',
  'TRUNK', 'TRUST', 'TRUTH', 'TUMOR', 'TUNED', 'TUNES', 'TURNS', 'TWICE', 'TWINS', 'TWIST',
  'TYPES', 'ULTRA', 'UNCLE', 'UNDER', 'UNDUE', 'UNION', 'UNITE', 'UNITY', 'UNTIL', 'UPPER',
  'UPSET', 'URBAN', 'URGED', 'USAGE', 'USERS', 'USING', 'USUAL', 'VAGUE', 'VALID', 'VALUE',
  'VALVE', 'VAPOR', 'VAULT', 'VEGAS', 'VENUE', 'VERGE', 'VERSE', 'VIDEO', 'VIEWS', 'VILLA',
  'VINYL', 'VIRAL', 'VIRUS', 'VISIT', 'VITAL', 'VIVID', 'VOCAL', 'VOGUE', 'VOICE', 'VOTER',
  'VOTES', 'WAGES', 'WAGON', 'WAIST', 'WALKS', 'WALLS', 'WANTS', 'WASTE', 'WATCH', 'WATER',
  'WAVES', 'WEARS', 'WEARY', 'WEEKS', 'WEIGH', 'WEIRD', 'WELLS', 'WELSH', 'WHALE', 'WHEAT',
  'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WIDEN', 'WIDER', 'WIDTH',
  'WINDS', 'WINES', 'WINGS', 'WITCH', 'WIVES', 'WOMAN', 'WOMEN', 'WOODS', 'WORDS', 'WORKS',
  'WORLD', 'WORMS', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WOVEN', 'WRIST',
  'WRITE', 'WRONG', 'WROTE', 'YACHT', 'YARDS', 'YEARS', 'YIELD', 'YOUNG', 'YOURS', 'YOUTH',
  'ZONES', 'ZEBRA', 'ZEROS'
]);

// Game State
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

let gameState = {
  solution: '',
  guesses: [],
  currentGuess: '',
  gameOver: false,
  won: false,
  puzzleNumber: 1,
  revealedRows: 0
};

let stats = {
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  distribution: [0, 0, 0, 0, 0, 0],
  lastPlayed: null
};

// DOM Elements
const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const resultModal = document.getElementById('result-modal');
const statsModal = document.getElementById('stats-modal');
const helpModal = document.getElementById('help-modal');
const toastEl = document.getElementById('toast');

// Get today's puzzle number and word
function getTodaysPuzzle() {
  const startDate = new Date('2024-01-01').getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceStart = Math.floor((today.getTime() - startDate) / (1000 * 60 * 60 * 24));
  const puzzleNumber = daysSinceStart + 1;
  const wordIndex = daysSinceStart % CRYPTO_WORDS.length;
  return {
    puzzleNumber,
    word: CRYPTO_WORDS[wordIndex],
    date: today.toISOString().split('T')[0]
  };
}

// Initialize the game
function initGame() {
  // Clear old game data to ensure fresh evaluation with fixed algorithm
  const GAME_VERSION = 2;
  const savedVersion = localStorage.getItem('cryptoPuzzleVersion');
  if (savedVersion !== String(GAME_VERSION)) {
    localStorage.removeItem('cryptoPuzzleGame');
    localStorage.setItem('cryptoPuzzleVersion', GAME_VERSION);
  }
  
  loadStats();
  
  const puzzle = getTodaysPuzzle();
  gameState.puzzleNumber = puzzle.puzzleNumber;
  gameState.solution = puzzle.word;
  
  document.getElementById('puzzle-number').textContent = `Puzzle #${puzzle.puzzleNumber}`;
  
  // Check if already played today
  const savedGame = loadGameState();
  if (savedGame && savedGame.date === puzzle.date) {
    gameState = { ...gameState, ...savedGame };
    renderSavedGame();
    if (gameState.gameOver) {
      setTimeout(() => showResult(), 500);
    }
  } else {
    gameState.guesses = [];
    gameState.currentGuess = '';
    gameState.gameOver = false;
    gameState.won = false;
    createBoard();
  }
  
  createKeyboard();
  setupEventListeners();
  startCountdown();
}

// Create game board
function createBoard() {
  boardEl.innerHTML = '';
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    row.dataset.row = i;
    for (let j = 0; j < WORD_LENGTH; j++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.col = j;
      row.appendChild(tile);
    }
    boardEl.appendChild(row);
  }
}

// Render saved game state
function renderSavedGame() {
  createBoard();
  gameState.guesses.forEach((guess, rowIndex) => {
    const row = boardEl.children[rowIndex];
    if (!row) return;
    const result = getGuessResult(guess);
    for (let i = 0; i < WORD_LENGTH; i++) {
      const tile = row.children[i];
      if (!tile) continue;
      tile.textContent = guess[i];
      tile.classList.add('filled', result[i]);
    }
  });
  updateKeyboardColors();
}

// Create keyboard
function createKeyboard() {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];
  
  keyboardEl.innerHTML = '';
  rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'keyboard-row';
    row.forEach(key => {
      const keyEl = document.createElement('button');
      keyEl.className = 'key';
      keyEl.textContent = key;
      keyEl.dataset.key = key;
      if (key === 'ENTER' || key === '⌫') {
        keyEl.classList.add('wide');
      }
      keyEl.addEventListener('click', () => handleKeyPress(key));
      rowEl.appendChild(keyEl);
    });
    keyboardEl.appendChild(rowEl);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Physical keyboard
  document.addEventListener('keydown', (e) => {
    if (gameState.gameOver) return;
    
    if (e.key === 'Enter') {
      handleKeyPress('ENTER');
    } else if (e.key === 'Backspace') {
      handleKeyPress('⌫');
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      handleKeyPress(e.key.toUpperCase());
    }
  });
  
  // Modal buttons
  document.getElementById('stats-btn').addEventListener('click', () => showStatsModal());
  document.getElementById('help-btn').addEventListener('click', () => helpModal.classList.add('active'));
  document.getElementById('close-result').addEventListener('click', () => resultModal.classList.remove('active'));
  document.getElementById('close-stats').addEventListener('click', () => statsModal.classList.remove('active'));
  document.getElementById('close-help').addEventListener('click', () => helpModal.classList.remove('active'));
  document.getElementById('share-btn').addEventListener('click', shareResult);
  
  // Close modals on backdrop click
  [resultModal, statsModal, helpModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
}

// Handle key press
function handleKeyPress(key) {
  if (gameState.gameOver) return;
  
  if (key === 'ENTER') {
    submitGuess();
  } else if (key === '⌫') {
    deleteLetter();
  } else if (gameState.currentGuess.length < WORD_LENGTH) {
    addLetter(key);
  }
}

// Add letter
function addLetter(letter) {
  if (gameState.currentGuess.length >= WORD_LENGTH) return;
  if (gameState.guesses.length >= MAX_ATTEMPTS) return;
  
  const row = boardEl.children[gameState.guesses.length];
  if (!row) return;
  
  gameState.currentGuess += letter;
  const tile = row.children[gameState.currentGuess.length - 1];
  if (tile) {
    tile.textContent = letter;
    tile.classList.add('filled');
  }
}

// Delete letter
function deleteLetter() {
  if (gameState.currentGuess.length === 0) return;
  
  const row = boardEl.children[gameState.guesses.length];
  if (!row) return;
  
  const tile = row.children[gameState.currentGuess.length - 1];
  if (tile) {
    tile.textContent = '';
    tile.classList.remove('filled');
  }
  gameState.currentGuess = gameState.currentGuess.slice(0, -1);
}

// Submit guess
function submitGuess() {
  if (gameState.gameOver) return;
  if (gameState.guesses.length >= MAX_ATTEMPTS) return;
  
  if (gameState.currentGuess.length !== WORD_LENGTH) {
    showToast('Not enough letters');
    shakeRow();
    return;
  }
  
  const guess = gameState.currentGuess;
  const result = getGuessResult(guess);
  const currentRow = gameState.guesses.length;
  
  gameState.guesses.push(guess);
  gameState.currentGuess = '';
  
  revealGuess(currentRow, guess, result);
  
  // Check win/lose
  if (guess === gameState.solution) {
    gameState.won = true;
    gameState.gameOver = true;
    setTimeout(() => {
      bounceRow(currentRow);
      updateStats(true);
      setTimeout(() => showResult(), 1500);
    }, WORD_LENGTH * 300 + 300);
  } else if (gameState.guesses.length >= MAX_ATTEMPTS) {
    gameState.gameOver = true;
    setTimeout(() => {
      updateStats(false);
      showResult();
    }, WORD_LENGTH * 300 + 500);
  }
  
  saveGameState();
}

// Get guess result - follows official Wordle rules
function getGuessResult(guess) {
  const solution = gameState.solution.toUpperCase();
  const guessUpper = guess.toUpperCase();
  const result = Array(WORD_LENGTH).fill('absent');
  const solutionUsed = Array(WORD_LENGTH).fill(false);
  
  // First pass: mark exact position matches (GREEN)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessUpper[i] === solution[i]) {
      result[i] = 'correct';
      solutionUsed[i] = true;
    }
  }
  
  // Second pass: mark letters in wrong position (YELLOW)
  // Only if that letter exists in an unused position of the solution
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'correct') continue;
    
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!solutionUsed[j] && guessUpper[i] === solution[j]) {
        result[i] = 'present';
        solutionUsed[j] = true;
        break;
      }
    }
  }
  
  // All remaining letters stay 'absent' (GRAY)
  return result;
}

// Reveal guess with animation
function revealGuess(rowIndex, guess, result) {
  const row = boardEl.children[rowIndex];
  if (!row) return;
  
  for (let i = 0; i < WORD_LENGTH; i++) {
    const tile = row.children[i];
    if (!tile) continue;
    
    setTimeout(() => {
      tile.classList.add('reveal');
      setTimeout(() => {
        tile.classList.add(result[i]);
        updateKeyColor(guess[i], result[i]);
      }, 250);
    }, i * 300);
  }
}

// Update keyboard key color
function updateKeyColor(letter, status) {
  const key = document.querySelector(`.key[data-key="${letter}"]`);
  if (!key) return;
  
  // Don't downgrade from correct
  if (key.classList.contains('correct')) return;
  // Don't downgrade from present to absent
  if (key.classList.contains('present') && status === 'absent') return;
  
  key.classList.remove('correct', 'present', 'absent');
  key.classList.add(status);
}

// Update all keyboard colors (for restored game)
function updateKeyboardColors() {
  gameState.guesses.forEach(guess => {
    const result = getGuessResult(guess);
    for (let i = 0; i < WORD_LENGTH; i++) {
      updateKeyColor(guess[i], result[i]);
    }
  });
}

// Shake row animation
function shakeRow() {
  const row = boardEl.children[gameState.guesses.length];
  if (!row) return;
  row.classList.add('shake');
  setTimeout(() => row.classList.remove('shake'), 400);
}

// Bounce row animation
function bounceRow(rowIndex) {
  const row = boardEl.children[rowIndex];
  if (!row) return;
  for (let i = 0; i < row.children.length; i++) {
    setTimeout(() => {
      if (row.children[i]) {
        row.children[i].classList.add('bounce');
      }
    }, i * 100);
  }
}

// Show toast message
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2000);
}

// Generate share grid
function generateShareGrid() {
  const emojiMap = {
    correct: '🟩',
    present: '🟨',
    absent: '⬛'
  };
  
  let grid = '';
  gameState.guesses.forEach(guess => {
    const result = getGuessResult(guess);
    grid += result.map(r => emojiMap[r]).join('') + '\n';
  });
  
  return grid.trim();
}

// Show result modal
function showResult() {
  const title = document.getElementById('result-title');
  const message = document.getElementById('result-message');
  const word = document.getElementById('result-word');
  const grid = document.getElementById('share-grid');
  
  if (gameState.won) {
    title.textContent = '🎉 You Won!';
    message.textContent = `You found the word in ${gameState.guesses.length} ${gameState.guesses.length === 1 ? 'try' : 'tries'}`;
  } else {
    title.textContent = '😔 Game Over';
    message.textContent = 'Better luck tomorrow!';
  }
  
  word.textContent = gameState.solution;
  grid.innerHTML = generateShareGrid().replace(/\n/g, '<br>');
  
  // Update stats display
  document.getElementById('stat-played').textContent = stats.played;
  document.getElementById('stat-win-rate').textContent = stats.played ? Math.round((stats.won / stats.played) * 100) + '%' : '0%';
  document.getElementById('stat-streak').textContent = stats.currentStreak;
  document.getElementById('stat-best').textContent = stats.maxStreak;
  
  resultModal.classList.add('active');
}

// Show stats modal
function showStatsModal() {
  document.getElementById('modal-stat-played').textContent = stats.played;
  document.getElementById('modal-stat-win-rate').textContent = stats.played ? Math.round((stats.won / stats.played) * 100) + '%' : '0%';
  document.getElementById('modal-stat-streak').textContent = stats.currentStreak;
  document.getElementById('modal-stat-best').textContent = stats.maxStreak;
  
  // Render distribution
  const distEl = document.getElementById('distribution');
  const maxDist = Math.max(...stats.distribution, 1);
  distEl.innerHTML = '';
  
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.className = 'dist-row';
    
    const label = document.createElement('span');
    label.className = 'dist-label';
    label.textContent = i + 1;
    
    const bar = document.createElement('div');
    bar.className = 'dist-bar';
    bar.style.width = `${Math.max((stats.distribution[i] / maxDist) * 100, 8)}%`;
    bar.textContent = stats.distribution[i];
    
    if (gameState.won && gameState.guesses.length === i + 1) {
      bar.classList.add('highlight');
    }
    
    row.appendChild(label);
    row.appendChild(bar);
    distEl.appendChild(row);
  }
  
  statsModal.classList.add('active');
}

// Share result
async function shareResult() {
  const text = `Daily Crypto Puzzle #${gameState.puzzleNumber} ${gameState.won ? gameState.guesses.length : 'X'}/6\n\n${generateShareGrid()}`;
  
  try {
    // Try Farcaster compose first
    await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`);
  } catch (e) {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!');
    } catch (err) {
      showToast('Share failed');
    }
  }
}

// Update stats
function updateStats(won) {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if this is a new day
  if (stats.lastPlayed !== today) {
    stats.played++;
    
    if (won) {
      stats.won++;
      stats.currentStreak++;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
      stats.distribution[gameState.guesses.length - 1]++;
    } else {
      stats.currentStreak = 0;
    }
    
    stats.lastPlayed = today;
    saveStats();
  }
}

// Countdown timer
function startCountdown() {
  function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Local storage helpers
function saveGameState() {
  const puzzle = getTodaysPuzzle();
  const state = {
    guesses: gameState.guesses,
    gameOver: gameState.gameOver,
    won: gameState.won,
    date: puzzle.date
  };
  localStorage.setItem('cryptoPuzzleGame', JSON.stringify(state));
}

function loadGameState() {
  try {
    return JSON.parse(localStorage.getItem('cryptoPuzzleGame'));
  } catch {
    return null;
  }
}

function saveStats() {
  localStorage.setItem('cryptoPuzzleStats', JSON.stringify(stats));
}

function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem('cryptoPuzzleStats'));
    if (saved) {
      stats = { ...stats, ...saved };
    }
  } catch {
    // Use default stats
  }
}

// Start the game
initGame();


