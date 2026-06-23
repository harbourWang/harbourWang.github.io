(() => {
  const ROWS = 5;
  const COLS = 9;
  const CELL_W = 96;
  const CELL_H = 82;
  const FIELD_W = COLS * CELL_W;
  const FIELD_H = ROWS * CELL_H;
  const SAVE_KEY = 'green-shield-planet-save-v1';
  const START_ENERGY = 999999;

  const cooldowns = {
    short: 5,
    medium: 8,
    long: 12,
    veryLong: 20
  };

  const plants = [
    {
      id: 'blast-shroom', no: 1, name: '爆弹菇', icon: '🍄', role: '连射爆破', cost: 0, cooldown: 'short', unlock: 1,
      hp: 320, color: '#ff8b5f', fireRate: 1.05, damage: 34, projectileSpeed: 285, radius: 0.5, description: '无限乱斗基础输出，叠层后弹速和爆炸伤害暴涨。', strategy: '适合铺满多行，形成弹幕。', tags: ['shoot', 'splash']
    },
    {
      id: 'light-pod', no: 2, name: '电弧菇', icon: '🟣', role: '高速连击', cost: 0, cooldown: 'short', unlock: 1,
      hp: 300, color: '#b58cff', fireRate: 0.9, damage: 22, projectileSpeed: 330, description: '高速发射电弧孢子，叠层后追加连击。', strategy: '适合快速点满一行。', tags: ['shoot']
    },
    {
      id: 'dual-pod', no: 3, name: '双芯蘑菇', icon: '🫛', role: '双发炮台', cost: 0, cooldown: 'short', unlock: 1,
      hp: 330, color: '#61f2ff', fireRate: 1.9, damage: 23, projectileSpeed: 280, burst: 2, burstGap: 0.18, description: '一次连续发射两枚光弹，输出高于基础射手。', strategy: '中期补强输出，压制装甲敌人。', tags: ['shoot']
    },
    {
      id: 'iron-vine', no: 4, name: '钢帽菇墙', icon: '🛡️', role: '叠层肉盾', cost: 0, cooldown: 'short', unlock: 1,
      hp: 980, color: '#9eb7a0', description: '高生命值植物，用于阻挡敌人前进。', strategy: '拖住敌人，为输出植物争取时间。', tags: ['wall']
    },
    {
      id: 'burst-shroom', no: 5, name: '核爆蘑菇', icon: '💥', role: '一次性爆发', cost: 0, cooldown: 'medium', unlock: 1,
      hp: 180, color: '#ff8b5f', armTime: 1.2, radius: 1.35, damage: 150, description: '放置后短暂延迟爆炸，对周围敌人造成范围伤害。', strategy: '清理密集敌群或救急。', tags: ['bomb', 'oneShot']
    },
    {
      id: 'ice-mint', no: 6, name: '冰雾薄荷', icon: '❄️', role: '控制减速', cost: 125, cooldown: 'medium', unlock: 3,
      hp: 280, color: '#a6eeff', fireRate: 1.75, damage: 14, projectileSpeed: 230, slow: 0.55, slowTime: 3.2, description: '攻击敌人并附带减速效果。', strategy: '配合范围爆发，提高命中效率。', tags: ['shoot', 'slow']
    },
    {
      id: 'thunder-cactus', no: 7, name: '雷鸣仙人掌', icon: '🌵', role: '穿透输出', cost: 175, cooldown: 'medium', unlock: 5,
      hp: 330, color: '#a7ff7e', fireRate: 1.75, damage: 28, projectileSpeed: 330, pierce: 3, description: '发射电刺，可穿透同一行多个敌人。', strategy: '对排队推进的敌人效果优秀。', tags: ['shoot', 'pierce']
    },
    {
      id: 'toxin-vine', no: 8, name: '毒孢藤', icon: '🧪', role: '持续伤害', cost: 125, cooldown: 'medium', unlock: 5,
      hp: 300, color: '#baef5d', fireRate: 1.6, damage: 10, projectileSpeed: 235, poisonDps: 12, poisonTime: 5, description: '使敌人中毒，持续扣血，适合对付高血量敌人。', strategy: '克制高血量、慢速敌人。', tags: ['shoot', 'poison']
    },
    {
      id: 'quake-root', no: 9, name: '震地根须', icon: '〰️', role: '范围控制', cost: 175, cooldown: 'long', unlock: 6,
      hp: 420, color: '#c49a63', fireRate: 3.4, damage: 20, stunTime: 1.15, range: 2.6, description: '攻击所在行前方区域，短暂眩晕敌人。', strategy: '控制前排，衔接其他输出。', tags: ['quake', 'stun']
    },
    {
      id: 'reflect-leaf', no: 10, name: '反射叶盾', icon: '🍃', role: '特殊防御', cost: 125, cooldown: 'medium', unlock: 6,
      hp: 620, color: '#9be0a2', reflectChance: 0.35, description: '抵挡远程攻击，并有概率反弹外星弹体。', strategy: '应对远程枪兵与轰炸压力。', tags: ['wall', 'reflect']
    },
    {
      id: 'magnet-flower', no: 11, name: '磁吸花', icon: '🧲', role: '功能克制', cost: 100, cooldown: 'medium', unlock: 7,
      hp: 300, color: '#cda7ff', fireRate: 3.2, damage: 8, armorBreakTime: 7, range: 3.4, description: '吸附敌方机械护甲，使装甲敌人防御降低。', strategy: '破解装甲与Boss护盾。', tags: ['debuff']
    },
    {
      id: 'star-durian', no: 12, name: '星火榴莲', icon: '🌟', role: '范围输出', cost: 250, cooldown: 'long', unlock: 7,
      hp: 340, color: '#ffc75e', fireRate: 2.9, damage: 70, radius: 0.9, projectileSpeed: 170, description: '向目标区域投掷爆裂果实，对小范围敌人造成伤害。', strategy: '群体输出核心。', tags: ['lob', 'splash']
    },
    {
      id: 'healing-moss', no: 13, name: '治愈苔藓', icon: '💚', role: '辅助恢复', cost: 125, cooldown: 'medium', unlock: 8,
      hp: 300, color: '#76e392', healRate: 5, healAmount: 45, description: '周期性恢复周围植物生命值。', strategy: '维持防线，抵抗自爆与Boss轰炸。', tags: ['heal']
    },
    {
      id: 'laser-bamboo', no: 14, name: '激光竹塔', icon: '🎋', role: '高级直线输出', cost: 300, cooldown: 'long', unlock: 9,
      hp: 360, color: '#7bf0d2', fireRate: 0.38, damage: 18, beam: true, description: '发射持续激光，对同一行敌人造成高额伤害。', strategy: '后期主输出，适合长线阵地。', tags: ['beam']
    },
    {
      id: 'gaia-tree', no: 15, name: '盖亚巨树', icon: '🌳', role: '终极防御', cost: 400, cooldown: 'veryLong', unlock: 10,
      hp: 1400, color: '#62cc74', pulseRate: 8.5, damage: 55, knockback: 58, description: '超高生命值，周期性释放全屏自然脉冲，造成伤害并击退。', strategy: '最终关抗压和清场核心。', tags: ['ultimate', 'wall']
    }
  ];

  const enemies = [
    { id: 'scout', no: 1, name: '灰皮侦察兵', icon: '👽', role: '基础敌人', hp: 100, speed: 24, damage: 18, attackRate: 1.1, color: '#a5abb8', description: '血量低，速度普通。' },
    { id: 'jumper', no: 2, name: '跳跃斥候', icon: '🛸', role: '快速敌人', hp: 75, speed: 38, damage: 16, attackRate: 1, color: '#9ee7ff', description: '移动快，血量低。' },
    { id: 'armored', no: 3, name: '装甲步兵', icon: '🤖', role: '坦克敌人', hp: 230, armor: 0.32, speed: 18, damage: 24, attackRate: 1.2, color: '#b2b6bd', description: '血量高，移动慢。' },
    { id: 'gunner', no: 4, name: '能量枪兵', icon: '🔫', role: '远程敌人', hp: 135, speed: 18, damage: 18, ranged: true, range: 2.7, attackRate: 1.8, color: '#ffbc78', description: '在远处攻击植物。' },
    { id: 'drone', no: 5, name: '飞行探测器', icon: '🚁', role: '飞行敌人', hp: 120, speed: 31, damage: 16, flying: true, attackRate: 1.15, color: '#d7dcff', description: '不能被普通阻挡影响，需要快速击落。' },
    { id: 'engineer', no: 6, name: '护盾工程师', icon: '🛰️', role: '辅助敌人', hp: 160, speed: 20, damage: 15, shieldAura: true, attackRate: 1.25, color: '#d9a4ff', description: '为周围敌人增加护盾。' },
    { id: 'bomber', no: 7, name: '自爆虫', icon: '💣', role: '爆破敌人', hp: 105, speed: 32, damage: 75, suicide: true, attackRate: 1, color: '#ff7d76', description: '接近植物后自爆，对范围植物造成伤害。' },
    { id: 'mech', no: 8, name: '机械冲锋者', icon: '🏎️', role: '突袭敌人', hp: 180, armor: 0.18, speed: 46, damage: 22, attackRate: 0.95, color: '#ffc247', description: '可高速冲刺，压迫前排。' },
    { id: 'heavy', no: 9, name: '巨型护甲兵', icon: '🦾', role: '精英敌人', hp: 430, armor: 0.42, speed: 14, damage: 34, attackRate: 1.4, color: '#cad1d6', description: '高血量高防御，需要持续输出。' },
    { id: 'boss', no: 10, name: '母舰投影体', icon: '👾', role: 'Boss', hp: 1800, armor: 0.18, speed: 7, damage: 42, attackRate: 1.6, boss: true, color: '#a983ff', description: '拥有召唤、护盾、轰炸和干扰技能。' }
  ];

  const levels = [
    { id: 1, name: '城市边缘', theme: '肉鸽教学', unlockPlants: ['sun-sprout', 'light-pod'], enemyTypes: ['scout'], goal: '三选一卡牌，构筑本局流派', duration: 58, spawn: 8, intensity: 0.75 },
    { id: 2, name: '公园阵地', theme: '防御构筑', unlockPlants: ['iron-vine'], enemyTypes: ['scout', 'jumper'], goal: '用强化卡把防线堆起来', duration: 68, spawn: 7, intensity: 0.95 },
    { id: 3, name: '废弃磁轨路', theme: '控制与爆发', unlockPlants: ['burst-shroom', 'ice-mint'], enemyTypes: ['jumper', 'armored'], goal: '选择爆炸、冰冻或经济流派', duration: 78, spawn: 6.5, intensity: 1.05 },
    { id: 4, name: '城市能量墙', theme: '连射成型', unlockPlants: ['dual-pod'], enemyTypes: ['scout', 'armored'], goal: '把光弹流叠成弹幕', duration: 86, spawn: 6, intensity: 1.18 },
    { id: 5, name: '沙漠通讯站', theme: '穿透毒伤', unlockPlants: ['thunder-cactus', 'toxin-vine'], enemyTypes: ['scout', 'armored', 'drone'], goal: '用穿透、毒伤和击杀爆炸清屏', duration: 92, spawn: 5.7, intensity: 1.28 },
    { id: 6, name: '极地能源站', theme: '反击阵线', unlockPlants: ['quake-root', 'reflect-leaf'], enemyTypes: ['gunner', 'bomber'], goal: '在远程火力下选择反伤或控制牌', duration: 100, spawn: 5.4, intensity: 1.38 },
    { id: 7, name: '机械坠落场', theme: '破甲范围', unlockPlants: ['magnet-flower', 'star-durian'], enemyTypes: ['engineer', 'heavy', 'armored'], goal: '组合破甲与范围牌打穿高甲敌人', duration: 108, spawn: 5.1, intensity: 1.48 },
    { id: 8, name: '雨林生态塔', theme: '续航循环', unlockPlants: ['healing-moss'], enemyTypes: ['drone', 'bomber', 'gunner'], goal: '把治疗、减费和爆发叠成循环', duration: 116, spawn: 4.8, intensity: 1.58 },
    { id: 9, name: '轨道升降井', theme: '激光核心', unlockPlants: ['laser-bamboo'], enemyTypes: ['drone', 'heavy', 'mech'], goal: '用高级强化卡构筑终局输出', duration: 124, spawn: 4.55, intensity: 1.72 },
    { id: 10, name: '地球核心防御圈', theme: '最终构筑', unlockPlants: ['gaia-tree'], enemyTypes: ['scout', 'armored', 'engineer', 'bomber', 'heavy', 'boss'], goal: '带着一套爆炸卡组击败母舰投影体', duration: 145, spawn: 5, intensity: 1.9, bossAt: 20 }
  ];

  const rogueCards = [
    { id: 'solar-overdrive', icon: '☀️', name: '阳光过载', rarity: 'common', desc: '所有太阳 +15 能量，日能芽产出速度 +18%。', apply: (game) => { game.mods.sunValue += 15; game.mods.economyRate += 0.18; } },
    { id: 'pea-permit', icon: '🫘', name: '光弹许可', rarity: 'common', desc: '射击类植物伤害 +30%，攻速 +18%。', apply: (game) => { game.mods.shootDamage += 0.3; game.mods.fireRate += 0.18; } },
    { id: 'cheap-clone', icon: '🧬', name: '复制栽培', rarity: 'common', desc: '植物消耗 -15%，并获得 2 次免费种植。', apply: (game) => { game.mods.costScale *= 0.85; game.mods.freePlantCharges += 2; } },
    { id: 'ice-mark', icon: '❄️', name: '冰雾标记', rarity: 'common', desc: '减速时间 +1.4 秒；受减速敌人承受伤害 +45%。', apply: (game) => { game.mods.slowBonus += 1.4; game.mods.slowedDamage += 0.45; } },
    { id: 'thorn-wall', icon: '🛡️', name: '铁藤反击', rarity: 'common', desc: '植物最大生命 +30%；防御植物被攻击时反伤。', apply: (game) => { game.mods.plantHp += 0.3; game.mods.wallThorns += 22; buffExistingPlants(game, 0.3); } },
    { id: 'chain-spines', icon: '🌵', name: '棘刺连锁', rarity: 'rare', desc: '直线弹体穿透 +1，穿透弹与光弹伤害 +20%。', apply: (game) => { game.mods.pierceBonus += 1; game.mods.shootDamage += 0.2; } },
    { id: 'burst-kill', icon: '💥', name: '击杀爆裂', rarity: 'rare', desc: '敌人被击破时产生小范围爆炸，伤害可叠加。', apply: (game) => { game.mods.killSplashDamage += 48; } },
    { id: 'star-rain', icon: '🌟', name: '星火雨', rarity: 'rare', desc: '投掷/爆炸伤害 +50%，范围 +0.35 格。', apply: (game) => { game.mods.lobDamage += 0.5; game.mods.lobRadius += 0.35; } },
    { id: 'magnetic-hole', icon: '🧲', name: '磁暴漏洞', rarity: 'rare', desc: '破甲敌人额外承受 +65% 伤害，磁吸花冷却更快。', apply: (game) => { game.mods.magnetVuln += 0.65; game.mods.debuffRate += 0.35; } },
    { id: 'bean-gatling', icon: '⚡', name: '豆荚机关枪', rarity: 'rare', desc: '射击植物有 35% 概率追加一发弹体。', apply: (game) => { game.mods.extraShotChance += 0.35; } },
    { id: 'laser-split', icon: '🔆', name: '激光分裂', rarity: 'epic', desc: '激光额外命中 2 个目标，激光伤害 +30%。', apply: (game) => { game.mods.beamTargets += 2; game.mods.beamDamage += 0.3; } },
    { id: 'gaia-heartbeat', icon: '🌍', name: '盖亚心跳', rarity: 'epic', desc: '每 12 秒释放全屏脉冲，伤害随选择次数成长。', apply: (game) => { game.mods.globalPulseDamage += 24; } }
  ];

  const state = {
    screen: 'menu-screen',
    save: loadSave(),
    activeLevel: null,
    game: null,
    selectedPlant: null,
    shovel: false,
    modalAction: null,
    audioContext: null,
    raf: 0,
    lastTime: 0
  };

  const els = {
    screens: Array.from(document.querySelectorAll('.screen')),
    menu: document.getElementById('menu-screen'),
    levelList: document.getElementById('level-list'),
    codexList: document.getElementById('codex-list'),
    cardBar: document.getElementById('card-bar'),
    battlefield: document.getElementById('battlefield'),
    energyText: document.getElementById('energy-text'),
    baseLifeText: document.getElementById('base-life-text'),
    levelTitle: document.getElementById('level-title'),
    levelGoal: document.getElementById('level-goal'),
    waveProgress: document.querySelector('#wave-progress span'),
    hintText: document.getElementById('hint-text'),
    shovelButton: document.getElementById('shovel-button'),
    autoSunButton: document.getElementById('auto-sun-button'),
    speedButton: document.getElementById('speed-button'),
    pauseButton: document.getElementById('pause-button'),
    exitButton: document.getElementById('exit-button'),
    modal: document.getElementById('modal'),
    modalEyebrow: document.getElementById('modal-eyebrow'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    modalReward: document.getElementById('modal-reward'),
    modalPrimary: document.getElementById('modal-primary'),
    modalSecondary: document.getElementById('modal-secondary'),
    saveLevelCount: document.getElementById('save-level-count'),
    saveStarCount: document.getElementById('save-star-count'),
    saveUnlockText: document.getElementById('save-unlock-text'),
    rogueLevelText: document.getElementById('rogue-level-text'),
    rewardModal: document.getElementById('reward-modal'),
    rewardTitle: document.getElementById('reward-title'),
    rewardSubtitle: document.getElementById('reward-subtitle'),
    rewardOptions: document.getElementById('reward-options'),
    tutorialPanel: document.getElementById('tutorial-panel'),
    tutorialTitle: document.getElementById('tutorial-title'),
    tutorialText: document.getElementById('tutorial-text'),
    battleShell: document.getElementById('battle-shell'),
    soundToggle: document.getElementById('sound-toggle'),
    vibrationToggle: document.getElementById('vibration-toggle'),
    soundTestButton: document.getElementById('sound-test-button'),
    vibrationTestButton: document.getElementById('vibration-test-button')
  };

  function loadSave() {
    const base = {
      unlockedLevel: 1,
      completed: {},
      stars: {},
      sound: true,
      vibration: true,
      autoSun: true,
      speed: 1,
      tutorialDone: false
    };
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? { ...base, ...JSON.parse(raw) } : base;
    } catch (error) {
      return base;
    }
  }

  function persistSave() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state.save));
    updateSaveSummary();
  }

  function plantById(id) {
    return plants.find((plant) => plant.id === id);
  }

  function enemyById(id) {
    return enemies.find((enemy) => enemy.id === id);
  }

  function unlockedPlantIds(levelId = state.save.unlockedLevel) {
    return plants.slice(0, 5).map((plant) => plant.id);
  }

  function formatCooldown(plant) {
    return Math.round(cooldowns[plant.cooldown]) + '秒';
  }

  function switchScreen(id) {
    state.screen = id;
    els.screens.forEach((screen) => screen.classList.toggle('screen--active', screen.id === id));
    if (id === 'level-screen') renderLevels();
    if (id === 'codex-screen') renderCodex();
    if (id === 'menu-screen') updateSaveSummary();
  }

  function updateSaveSummary() {
    const completedLevels = Object.keys(state.save.completed).length;
    const stars = Object.values(state.save.stars).reduce((sum, value) => sum + Number(value || 0), 0);
    const lastUnlock = unlockedPlantIds().map(plantById).slice(-3).map((plant) => plant.name).join('、');
    els.saveLevelCount.textContent = completedLevels;
    els.saveStarCount.textContent = stars;
    els.saveUnlockText.textContent = lastUnlock || '爆弹菇、电弧菇';
    els.soundToggle.checked = state.save.sound;
    els.vibrationToggle.checked = state.save.vibration;
    syncAutoSunButton();
    syncSpeedButton();
  }

  function syncSpeedButton() {
    if (!els.speedButton) return;
    const speed = state.save.speed || 1;
    els.speedButton.textContent = `${speed}×`;
    els.speedButton.classList.toggle('active', speed > 1);
  }

  function syncAutoSunButton() {
    if (!els.autoSunButton) return;
    els.autoSunButton.textContent = `连种模式：${state.save.autoSun ? '开' : '关'}`;
    els.autoSunButton.classList.toggle('active', state.save.autoSun);
  }

  function renderLevels() {
    els.levelList.innerHTML = '';
    levels.forEach((level) => {
      const locked = level.id > state.save.unlockedLevel;
      const button = document.createElement('button');
      button.className = 'level-card' + (locked ? ' locked' : '');
      button.disabled = locked;
      const unlockedNames = level.unlockPlants.map(plantById).filter(Boolean).map((plant) => plant.name).join('、');
      button.innerHTML = `
        <span class="level-index">第${level.id}关</span>
        <strong>${level.name}</strong>
        <small>${level.theme}</small>
        <em>${level.goal}</em>
        <span class="unlock-line">${locked ? '未解锁' : '解锁：' + unlockedNames}</span>
        <span class="stars">${'★'.repeat(state.save.stars[level.id] || 0)}${'☆'.repeat(3 - (state.save.stars[level.id] || 0))}</span>
      `;
      button.addEventListener('click', () => startLevel(level.id));
      els.levelList.appendChild(button);
    });
  }

  function renderCodex() {
    els.codexList.innerHTML = '';
    plants.forEach((plant) => {
      const unlocked = plant.unlock <= state.save.unlockedLevel || plant.unlock === 1;
      const card = document.createElement('article');
      card.className = 'codex-card' + (unlocked ? '' : ' locked');
      card.innerHTML = `
        <div class="codex-icon" style="--plant-color:${plant.color}">${unlocked ? plant.icon : '？'}</div>
        <div>
          <div class="codex-title"><strong>${unlocked ? plant.name : '未解锁植物'}</strong><span>${plant.role}</span></div>
          <p>${unlocked ? plant.description : `第${plant.unlock}关解锁`}</p>
          <small>消耗 ${plant.cost} · 冷却 ${formatCooldown(plant)} · ${plant.strategy}</small>
        </div>
      `;
      els.codexList.appendChild(card);
    });
  }

  function createRogueMods() {
    return {
      sunValue: 25,
      economyRate: 0,
      costScale: 1,
      freePlantCharges: 0,
      shootDamage: 0,
      fireRate: 0,
      slowBonus: 0,
      slowedDamage: 0,
      plantHp: 0,
      wallThorns: 0,
      pierceBonus: 0,
      killSplashDamage: 0,
      lobDamage: 0,
      lobRadius: 0,
      magnetVuln: 0,
      debuffRate: 0,
      extraShotChance: 0,
      beamTargets: 0,
      beamDamage: 0,
      globalPulseDamage: 0
    };
  }

  function createGame(level) {
    return {
      level,
      time: 0,
      energy: START_ENERGY,
      baseLife: 3,
      grid: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
      plantEntities: [],
      enemies: [],
      projectiles: [],
      effects: [],
      suns: [],
      cooldowns: {},
      hitStop: 0,
      spawnTimer: 2,
      skyTimer: 3.5,
      enemyCount: 0,
      wave: 1,
      waveTimer: 0,
      bossSpawned: false,
      paused: false,
      ended: false,
      solarSlowUntil: 0,
      globalPulseTimer: 12,
      mods: createRogueMods(),
      chosenCards: [],
      tutorialStep: 0,
      events: {
        plantedSun: false,
        plantedShooter: false,
        collectedSun: false,
        defeatedEnemy: false,
        usedShovel: false
      },
      bossTimers: {
        summon: 8,
        shield: 14,
        bomb: 12,
        disrupt: 20
      }
    };
  }

  function fitBattleShell() {
    if (!els.battleShell) return;
    const padding = 32;
    const scale = Math.min(1, (window.innerWidth - padding) / 1334, (window.innerHeight - padding) / 750);
    els.battleShell.style.setProperty('--battle-scale', Math.max(0.45, scale).toFixed(3));
  }

  function startLevel(id) {
    const level = levels.find((item) => item.id === id);
    if (!level || level.id > state.save.unlockedLevel) return;
    closeModal();
    state.activeLevel = level;
    state.game = createGame(level);
    state.selectedPlant = null;
    state.shovel = false;
    state.lastTime = performance.now();
    setupBattlefield();
    renderCards();
    syncBattleUi();
    updateTutorial();
    fitBattleShell();
    switchScreen('game-screen');
    cancelAnimationFrame(state.raf);
    state.raf = requestAnimationFrame(loop);
  }

  function setupBattlefield() {
    els.battlefield.innerHTML = '';
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.style.left = `${col * CELL_W}px`;
        cell.style.top = `${row * CELL_H}px`;
        cell.addEventListener('click', () => handleCell(row, col));
        els.battlefield.appendChild(cell);
      }
    }
  }

  function renderCards() {
    const level = state.activeLevel;
    const ids = unlockedPlantIds(level.id);
    els.cardBar.innerHTML = '';
    ids.forEach((id) => {
      const plant = plantById(id);
      const card = document.createElement('button');
      card.className = 'plant-card';
      card.dataset.plant = id;
      card.innerHTML = `
        <span class="plant-card-icon" style="--plant-color:${plant.color}">${plant.icon}</span>
        <strong>${plant.name}</strong>
        <small>${plant.role}</small>
        <span class="cost">无限种植</span>
        <i class="cooldown-fill"></i>
      `;
      card.addEventListener('click', () => selectPlant(id));
      els.cardBar.appendChild(card);
    });
  }

  function selectPlant(id) {
    state.selectedPlant = id;
    state.shovel = false;
    els.shovelButton.classList.remove('active');
    els.hintText.textContent = `已选择 ${plantById(id).name}，点击可部署区域。`;
    syncCardStates();
  }

  function handleCell(row, col) {
    const game = state.game;
    if (!game || game.ended || game.paused) return;
    if (state.shovel) {
      removePlant(row, col, true);
      return;
    }
    if (!state.selectedPlant) {
      els.hintText.textContent = '请先选择植物卡牌。';
      return;
    }
    const plant = plantById(state.selectedPlant);
    if (game.grid[row][col]) {
      upgradePlant(game.grid[row][col]);
      return;
    }
    addPlant(plant, row, col);
    game.events.plantedShooter = true;
    pulse(cellCenter(row, col).x, cellCenter(row, col).y, '连种');
    playSound('plant');
    vibrate(18);
    syncBattleUi();
  }

  function addPlant(config, row, col) {
    const game = state.game;
    const entity = {
      id: `plant-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      config,
      row,
      col,
      x: col * CELL_W + CELL_W / 2,
      y: row * CELL_H + CELL_H / 2,
      hp: Math.round(config.hp * (1 + game.mods.plantHp)),
      maxHp: Math.round(config.hp * (1 + game.mods.plantHp)),
      timer: initialPlantTimer(config),
      auxTimer: 0,
      burstLeft: 0,
      burstTimer: 0,
      level: 1,
      kills: 0,
      el: document.createElement('div')
    };
    entity.el.className = `plant plant--${config.id}`;
    entity.el.style.setProperty('--plant-color', config.color);
    entity.el.innerHTML = `<span>${config.icon}</span><b></b><i>Lv1</i>`;
    placeEntity(entity.el, entity.x, entity.y);
    els.battlefield.appendChild(entity.el);
    game.grid[row][col] = entity;
    game.plantEntities.push(entity);
  }

  function plantCost(plant) {
    return 0;
  }

  function upgradePlant(plant) {
    plant.level += 1;
    plant.maxHp = Math.round(plant.maxHp * 1.22 + 35);
    plant.hp = plant.maxHp;
    plant.el.classList.add('level-up');
    plant.el.querySelector('i').textContent = `Lv${plant.level}`;
    setTimeout(() => plant.el && plant.el.classList.remove('level-up'), 220);
    pulse(plant.x, plant.y - 28, `升级 Lv${plant.level}`);
    playSound('power');
    vibrate(16);
    updatePlantHp(plant);
  }

  function buffExistingPlants(game, hpRatio) {
    game.plantEntities.forEach((plant) => {
      const extra = Math.round(plant.config.hp * hpRatio);
      plant.maxHp += extra;
      plant.hp += extra;
      updatePlantHp(plant);
    });
  }

  function initialPlantTimer(config) {
    if (config.tags.includes('bomb')) return 0;
    if (config.tags.includes('produce')) return 8;
    if (config.tags.includes('heal')) return config.healRate;
    if (config.tags.includes('ultimate')) return config.pulseRate;
    return 0.4;
  }

  function removePlant(row, col, refund) {
    const game = state.game;
    if (!game || row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
    const entity = game.grid[row][col];
    if (!entity) {
      els.hintText.textContent = '该格没有植物可铲除。';
      return;
    }
    game.grid[row][col] = null;
    game.plantEntities = game.plantEntities.filter((plant) => plant !== entity);
    entity.el.remove();
    if (refund) {
      game.energy += Math.floor(entity.config.cost * 0.25);
      game.events.usedShovel = true;
      els.hintText.textContent = `已移除 ${entity.config.name}，返还少量能量。`;
    }
    pulse(entity.x, entity.y, '移除');
    playSound('remove');
    syncBattleUi();
  }

  function loop(now) {
    const game = state.game;
    if (!game) return;
    const baseDt = Math.min(0.05, (now - state.lastTime) / 1000 || 0);
    const dt = baseDt * (state.save.speed || 1);
    state.lastTime = now;
    if (game.hitStop > 0) {
      game.hitStop -= baseDt;
    } else if (!game.paused && !game.ended) {
      updateGame(dt);
    }
    renderGame();
    if (!game.ended) state.raf = requestAnimationFrame(loop);
  }

  function updateGame(dt) {
    const game = state.game;
    game.time += dt;
    updateCooldowns(dt);
    updateSuns(dt);
    updatePlants(dt);
    updateEnemies(dt);
    updateProjectiles(dt);
    updateEffects(dt);
    updateSpawning(dt);
    updateBoss(dt);
    updateGlobalPulse(dt);
    updateTutorial();
    checkEndConditions();
    syncBattleUi();
  }

  function updateCooldowns(dt) {
    const game = state.game;
    Object.keys(game.cooldowns).forEach((id) => {
      game.cooldowns[id] = Math.max(0, game.cooldowns[id] - dt);
    });
  }

  function updateSuns(dt) {
    const game = state.game;
    return;
    game.skyTimer -= dt * (game.time < game.solarSlowUntil ? 0.45 : 1);
    if (game.skyTimer <= 0) {
      game.skyTimer = 7 + Math.random() * 3;
      spawnSun(40 + Math.random() * (FIELD_W - 80), 35 + Math.random() * (FIELD_H - 90));
    }
    game.suns.forEach((sun) => {
      sun.life -= dt;
      sun.y += Math.sin(game.time * 2 + sun.seed) * dt * 6;
      if (state.save.autoSun) {
        const dx = 36 - sun.x;
        const dy = 32 - sun.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        sun.x += (dx / distance) * 340 * dt;
        sun.y += (dy / distance) * 340 * dt;
        if (distance < 24) collectSun(sun, true);
      }
      placeEntity(sun.el, sun.x, sun.y);
      if (sun.life < 3) sun.el.classList.add('fading');
    });
    game.suns = game.suns.filter((sun) => {
      if (sun.life <= 0) {
        sun.el.remove();
        return false;
      }
      return true;
    });
  }

  function updateGlobalPulse(dt) {
    const game = state.game;
    if (!game.mods.globalPulseDamage) return;
    game.globalPulseTimer -= dt;
    if (game.globalPulseTimer > 0) return;
    game.globalPulseTimer = 12;
    const damage = game.mods.globalPulseDamage + game.chosenCards.length * 7;
    game.enemies.forEach((enemy) => damageEnemy(enemy, damage, null, true));
    pulse(FIELD_W / 2, 32, `盖亚心跳 ${Math.round(damage)}`);
    playSound('explode');
  }

  function adjustedFireRate(config) {
    const game = state.game;
    let bonus = game.mods.fireRate;
    if (config.tags.includes('debuff')) bonus += game.mods.debuffRate;
    return Math.max(0.18, (config.fireRate || 1) / (1 + bonus));
  }

  function scaledDamage(amount, plant) {
    const game = state.game;
    if (!game || !plant) return amount;
    const tags = plant.config.tags;
    let multiplier = 1;
    if (tags.includes('shoot') || tags.includes('pierce')) multiplier += game.mods.shootDamage;
    if (tags.includes('lob') || tags.includes('splash') || tags.includes('bomb')) multiplier += game.mods.lobDamage;
    if (tags.includes('beam')) multiplier += game.mods.beamDamage;
    multiplier += Math.max(0, (plant.level || 1) - 1) * 0.28;
    multiplier += Math.min(0.9, (plant.kills || 0) * 0.025);
    return amount * multiplier;
  }

  function spawnSun(x, y) {
    const game = state.game;
    const sun = {
      x,
      y,
      life: 8,
      seed: Math.random() * 10,
      el: document.createElement('button')
    };
    sun.el.className = 'sun-drop';
    sun.el.textContent = '☀';
    sun.el.addEventListener('click', () => collectSun(sun));
    placeEntity(sun.el, x, y);
    els.battlefield.appendChild(sun.el);
    game.suns.push(sun);
  }

  function collectSun(sun, automatic = false) {
    const game = state.game;
    if (!game || game.ended || !game.suns.includes(sun)) return;
    const value = game.mods.sunValue;
    game.energy += value;
    game.events.collectedSun = true;
    sun.life = 0;
    sun.el.remove();
    game.suns = game.suns.filter((item) => item !== sun);
    pulse(sun.x, sun.y, automatic ? `自动+${value}` : `+${value}`);
    playSound('sun');
    if (!automatic) vibrate(12);
    syncBattleUi();
  }

  function updatePlants(dt) {
    const game = state.game;
    [...game.plantEntities].forEach((plant) => {
      const config = plant.config;
      plant.timer -= dt;
      plant.auxTimer -= dt;
      if (config.tags.includes('produce') && plant.timer <= 0) {
        plant.timer = Math.max(3.2, 8 / (1 + game.mods.economyRate));
        spawnSun(plant.x, plant.y - 24);
      }
      if (config.tags.includes('bomb')) {
        if (plant.timer <= -config.armTime) explodePlant(plant);
        return;
      }
      if (config.tags.includes('heal') && plant.timer <= 0) {
        plant.timer = config.healRate;
        healAround(plant);
      }
      if (config.tags.includes('ultimate') && plant.timer <= 0) {
        plant.timer = config.pulseRate;
        gaiaPulse(plant);
      }
      if (config.tags.includes('quake') && plant.timer <= 0) {
        const targets = enemiesInRow(plant.row).filter((enemy) => enemy.x > plant.x && enemy.x < plant.x + config.range * CELL_W);
        if (targets.length) {
          plant.timer = adjustedFireRate(config);
          targets.forEach((enemy) => {
            damageEnemy(enemy, scaledDamage(config.damage, plant), plant);
            enemy.stun = Math.max(enemy.stun || 0, config.stunTime);
          });
          pulse(plant.x + CELL_W * 1.2, plant.y, '震荡');
        }
      }
      if (config.tags.includes('debuff') && plant.timer <= 0) {
        const target = nearestEnemy(plant.row, plant.x, config.range * CELL_W);
        if (target) {
          plant.timer = adjustedFireRate(config);
          target.armorBreak = Math.max(target.armorBreak || 0, config.armorBreakTime);
          damageEnemy(target, scaledDamage(config.damage, plant), plant);
          pulse(target.x, target.y, '破甲');
        }
      }
      if ((config.tags.includes('shoot') || config.tags.includes('lob') || config.tags.includes('beam')) && plant.timer <= 0) {
        const target = nearestEnemy(plant.row, plant.x, FIELD_W);
        if (target) {
          plant.timer = adjustedFireRate(config);
          if (config.beam) fireBeam(plant, target);
          else if (config.tags.includes('lob')) fireLob(plant, target);
          else fireProjectile(plant, target);
        }
      }
      if (plant.burstLeft > 0) {
        plant.burstTimer -= dt;
        if (plant.burstTimer <= 0) {
          const target = nearestEnemy(plant.row, plant.x, FIELD_W);
          if (target) fireProjectile(plant, target, true);
          plant.burstLeft -= 1;
          plant.burstTimer = config.burstGap || 0.18;
        }
      }
      updatePlantHp(plant);
    });
  }

  function fireProjectile(plant, target, burstShot = false) {
    const config = plant.config;
    const projectile = {
      x: plant.x + 26,
      y: plant.y - (burstShot ? 10 : 0),
      row: plant.row,
      speed: config.projectileSpeed,
      damage: scaledDamage(config.damage, plant),
      pierce: (config.pierce || 1) + state.game.mods.pierceBonus,
      plant,
      type: 'line',
      el: document.createElement('div')
    };
    projectile.el.className = `projectile projectile--${config.id}`;
    projectile.el.style.setProperty('--plant-color', config.color);
    els.battlefield.appendChild(projectile.el);
    state.game.projectiles.push(projectile);
    if (config.burst && !burstShot) {
      plant.burstLeft = config.burst - 1;
      plant.burstTimer = config.burstGap || 0.18;
    }
  }

  function fireLob(plant, target) {
    const config = plant.config;
    const projectile = {
      x: plant.x + 22,
      y: plant.y - 10,
      tx: target.x,
      ty: target.y,
      row: plant.row,
      speed: config.projectileSpeed,
      damage: scaledDamage(config.damage, plant),
      radius: (config.radius || 1) + state.game.mods.lobRadius,
      plant,
      type: 'lob',
      progress: 0,
      el: document.createElement('div')
    };
    projectile.el.className = 'projectile projectile--lob';
    projectile.el.style.setProperty('--plant-color', config.color);
    els.battlefield.appendChild(projectile.el);
    state.game.projectiles.push(projectile);
  }

  function fireBeam(plant, target) {
    const config = plant.config;
    const enemies = enemiesInRow(plant.row).filter((enemy) => enemy.x > plant.x);
    const limit = 4 + state.game.mods.beamTargets;
    enemies.slice(0, limit).forEach((enemy) => damageEnemy(enemy, scaledDamage(config.damage, plant), plant));
    const effect = document.createElement('div');
    effect.className = 'beam-effect';
    effect.style.left = `${plant.x}px`;
    effect.style.top = `${plant.y - 4}px`;
    effect.style.width = `${Math.max(40, FIELD_W - plant.x)}px`;
    els.battlefield.appendChild(effect);
    state.game.effects.push({ el: effect, life: 0.16 });
  }

  function updateProjectiles(dt) {
    const game = state.game;
    game.projectiles.forEach((projectile) => {
      if (projectile.type === 'lob') {
        const dx = projectile.tx - projectile.x;
        const dy = projectile.ty - projectile.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 12) {
          splash(projectile.tx, projectile.ty, projectile.radius, projectile.damage, projectile.plant);
          projectile.dead = true;
          projectile.el.remove();
          return;
        }
        projectile.x += (dx / distance) * projectile.speed * dt;
        projectile.y += (dy / distance) * projectile.speed * dt;
      } else {
        projectile.x += projectile.speed * dt;
        const hit = game.enemies.find((enemy) => !enemy.dead && enemy.row === projectile.row && Math.abs(enemy.x - projectile.x) < 26 && Math.abs(enemy.y - projectile.y) < 34);
        if (hit) {
          applyProjectileEffects(projectile, hit);
          projectile.pierce -= 1;
          if (projectile.pierce <= 0) {
            projectile.dead = true;
            projectile.el.remove();
            return;
          }
          projectile.x += 18;
        }
        if (projectile.x > FIELD_W + 40) {
          projectile.dead = true;
          projectile.el.remove();
          return;
        }
      }
      placeEntity(projectile.el, projectile.x, projectile.y);
    });
    game.projectiles = game.projectiles.filter((projectile) => !projectile.dead);
  }

  function applyProjectileEffects(projectile, enemy) {
    const config = projectile.plant.config;
    damageEnemy(enemy, projectile.damage, projectile.plant);
    if (state.game.mods.extraShotChance > 0 && Math.random() < state.game.mods.extraShotChance) {
      damageEnemy(enemy, projectile.damage * 0.6, projectile.plant);
      pulse(enemy.x, enemy.y - 18, '追加');
    }
    if (config.slow) enemy.slow = Math.max(enemy.slow || 0, config.slowTime + state.game.mods.slowBonus);
    if (config.poisonDps) enemy.poison = Math.max(enemy.poison || 0, config.poisonTime);
  }

  function updateEnemies(dt) {
    const game = state.game;
    game.enemies.forEach((enemy) => {
      if (enemy.dead) return;
      enemy.slow = Math.max(0, (enemy.slow || 0) - dt);
      enemy.poison = Math.max(0, (enemy.poison || 0) - dt);
      enemy.stun = Math.max(0, (enemy.stun || 0) - dt);
      enemy.armorBreak = Math.max(0, (enemy.armorBreak || 0) - dt);
      enemy.shield = Math.max(0, (enemy.shield || 0) - dt);
      enemy.attackTimer -= dt;
      if (enemy.poison > 0) damageEnemy(enemy, 12 * dt, null, true);
      if (enemy.dead) return;
      const blocking = findBlockingPlant(enemy);
      const rangedTarget = enemy.config.ranged ? findRangedPlant(enemy) : null;
      const target = blocking || rangedTarget;
      if (target && enemy.attackTimer <= 0) {
        enemy.attackTimer = enemy.config.attackRate;
        attackPlant(enemy, target);
        return;
      }
      if (!target && enemy.stun <= 0) {
        const slowFactor = enemy.slow > 0 ? 0.55 : 1;
        const shieldBoost = enemy.config.shieldAura ? 0.9 : 1;
        enemy.x -= enemy.config.speed * slowFactor * shieldBoost * dt;
        if (enemy.config.mech && enemy.x < FIELD_W * 0.65) enemy.x -= enemy.config.speed * dt;
      }
      if (enemy.config.shieldAura) grantShields(enemy);
      if (enemy.x < -20) {
        enemy.dead = true;
        enemy.el.remove();
        game.baseLife -= 1;
        pulse(22, enemy.y, '-1生命');
        vibrate(60);
      }
    });
    game.enemies = game.enemies.filter((enemy) => !enemy.dead);
  }

  function attackPlant(enemy, plant) {
    if (enemy.config.suicide) {
      splashPlantDamage(plant.row, plant.col, enemy.config.damage);
      enemy.dead = true;
      enemy.el.remove();
      pulse(enemy.x, enemy.y, '自爆');
      return;
    }
    let damage = enemy.config.damage;
    if (plant.config.tags.includes('wall') && state.game.mods.wallThorns > 0) {
      damageEnemy(enemy, state.game.mods.wallThorns, plant, true);
      pulse(plant.x, plant.y - 20, '荆棘');
    }
    if (enemy.config.ranged && plant.config.tags.includes('reflect') && Math.random() < plant.config.reflectChance) {
      damageEnemy(enemy, damage * 1.3, plant);
      pulse(plant.x, plant.y, '反弹');
      return;
    }
    plant.hp -= damage;
    pulse(plant.x, plant.y, `-${Math.round(damage)}`);
    if (plant.hp <= 0) removePlant(plant.row, plant.col, false);
    else updatePlantHp(plant);
  }

  function damageEnemy(enemy, amount, source, ignoreArmor = false) {
    if (enemy.dead) return;
    let damage = amount;
    const armor = enemy.config.armor || 0;
    if (!ignoreArmor && armor && enemy.armorBreak <= 0) damage *= 1 - armor;
    if (enemy.armorBreak > 0) damage *= 1 + state.game.mods.magnetVuln;
    if (enemy.slow > 0) damage *= 1 + state.game.mods.slowedDamage;
    if (enemy.shield > 0) damage *= 0.55;
    enemy.hp -= damage;
    enemy.el.classList.add('hit');
    if (damage >= 70) pulse(enemy.x, enemy.y - 24, Math.round(damage));
    setTimeout(() => enemy.el && enemy.el.classList.remove('hit'), 90);
    if (enemy.hp <= 0) killEnemy(enemy);
  }

  function killEnemy(enemy) {
    const game = state.game;
    enemy.dead = true;
    enemy.el.remove();
    if (Math.random() < 0.16 && !enemy.config.boss) spawnSun(enemy.x, enemy.y);
    if (game.mods.killSplashDamage > 0 && !enemy.config.boss) splash(enemy.x, enemy.y, 0.75, game.mods.killSplashDamage, null);
    pulse(enemy.x, enemy.y, '击破');
    game.enemyCount += 1;
    game.events.defeatedEnemy = true;
    playSound(enemy.config.boss ? 'win' : 'hit');
  }

  function updateSpawning(dt) {
    const game = state.game;
    game.spawnTimer -= dt;
    game.waveTimer += dt;
    if (game.waveTimer >= 18) {
      game.wave += 1;
      game.waveTimer = 0;
      pulse(FIELD_W / 2, 34, `第 ${game.wave} 波`);
      playSound('warning');
    }
    if (game.wave >= 8 && !game.bossSpawned) {
      spawnEnemy('boss', Math.floor(Math.random() * ROWS));
      game.bossSpawned = true;
      pulse(FIELD_W - 100, 40, 'Boss乱入');
    }
    if (game.spawnTimer <= 0) {
      const interval = Math.max(0.55, 2.4 - game.wave * 0.12);
      game.spawnTimer = interval;
      const count = Math.min(5, 1 + Math.floor(game.wave / 4));
      for (let index = 0; index < count; index += 1) {
        const enemyId = pickEnemyForTime(['scout', 'jumper', 'armored', 'gunner', 'drone', 'engineer', 'bomber', 'mech', 'heavy'], game.time, game.wave);
        spawnEnemy(enemyId, Math.floor(Math.random() * ROWS), FIELD_W + 44 + index * 34);
      }
    }
  }

  function pickEnemyForTime(pool, time, intensity) {
    const wave = state.game ? state.game.wave : (intensity || 1);
    const unlocked = pool.filter((id) => {
      if (wave < 2 && ['jumper', 'gunner', 'drone', 'engineer', 'bomber', 'mech', 'heavy'].includes(id)) return false;
      if (wave < 4 && ['engineer', 'bomber', 'mech', 'heavy'].includes(id)) return false;
      if (wave < 7 && ['mech', 'heavy'].includes(id)) return false;
      return true;
    });
    const options = unlocked.length ? unlocked : ['scout'];
    if (Math.random() < Math.min(0.46, wave * 0.035)) return options[options.length - 1];
    return options[Math.floor(Math.random() * options.length)] || 'scout';
  }

  function spawnEnemy(id, row, x = FIELD_W + 44) {
    const config = enemyById(id);
    const levelScale = 1 + (state.game.wave - 1) * 0.18;
    const entity = {
      id: `enemy-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      config,
      row,
      x,
      y: row * CELL_H + CELL_H / 2,
      hp: config.hp * (config.boss ? Math.max(1, levelScale * 0.65) : levelScale),
      maxHp: config.hp * (config.boss ? Math.max(1, levelScale * 0.65) : levelScale),
      attackTimer: config.attackRate,
      slow: 0,
      poison: 0,
      stun: 0,
      shield: 0,
      armorBreak: 0,
      el: document.createElement('div')
    };
    entity.el.className = `enemy enemy--${config.id}`;
    entity.el.style.setProperty('--enemy-color', config.color);
    entity.el.innerHTML = `<span>${config.icon}</span><b></b><i>${config.boss ? config.name : ''}</i>`;
    placeEntity(entity.el, entity.x, entity.y);
    els.battlefield.appendChild(entity.el);
    state.game.enemies.push(entity);
  }

  function updateBoss(dt) {
    const game = state.game;
    const boss = game.enemies.find((enemy) => enemy.config.boss && !enemy.dead);
    if (!boss) return;
    Object.keys(game.bossTimers).forEach((key) => {
      game.bossTimers[key] -= dt;
    });
    if (game.bossTimers.summon <= 0) {
      game.bossTimers.summon = 13;
      const count = 2 + Math.floor(Math.random() * 3);
      for (let index = 0; index < count; index += 1) {
        spawnEnemy(Math.random() < 0.5 ? 'scout' : 'armored', Math.floor(Math.random() * ROWS), FIELD_W + 80 + index * 30);
      }
      pulse(boss.x, boss.y - 35, '召唤');
      playSound('warning');
    }
    if (game.bossTimers.shield <= 0) {
      game.bossTimers.shield = 18;
      boss.shield = 6;
      pulse(boss.x, boss.y, '护盾');
      playSound('warning');
    }
    if (game.bossTimers.bomb <= 0) {
      game.bossTimers.bomb = 16;
      orbitalBomb();
    }
    if (game.bossTimers.disrupt <= 0) {
      game.bossTimers.disrupt = 24;
      game.solarSlowUntil = game.time + 8;
      pulse(FIELD_W / 2, 30, '磁场干扰');
      playSound('warning');
    }
  }

  function maybeOfferDraft(opening) {
    const game = state.game;
    if (!game || game.ended || game.drafting) return;
    const maxDrafts = Math.min(6, 2 + Math.ceil(game.level.duration / 28));
    if (!opening && (game.time < game.nextDraftAt || game.draftCount >= maxDrafts)) return;
    game.drafting = true;
    game.draftChoices = pickRogueCards(game);
    if (!opening) game.nextDraftAt += 22;
    els.rewardTitle.textContent = opening ? '开局选择一张核心强化' : `第 ${game.draftCount + 1} 次构筑强化`;
    els.rewardSubtitle.textContent = '战斗暂停，选择后继续刷怪。强化只在本局生效，可重复叠加。';
    els.rewardOptions.innerHTML = '';
    game.draftChoices.forEach((card) => {
      const button = document.createElement('button');
      button.className = `reward-option ${card.rarity}`;
      button.innerHTML = `
        <span class="reward-icon">${card.icon}</span>
        <strong>${card.name}</strong>
        <em>${rarityName(card.rarity)}</em>
        <p>${card.desc}</p>
      `;
      button.addEventListener('click', () => chooseRogueCard(card));
      els.rewardOptions.appendChild(button);
    });
    els.rewardModal.classList.remove('hidden');
    playSound('warning');
  }

  function pickRogueCards(game) {
    const pool = rogueCards.filter((card) => card.rarity !== 'epic' || game.level.id >= 5 || game.draftCount >= 2);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  function chooseRogueCard(card) {
    const game = state.game;
    if (!game) return;
    card.apply(game);
    game.chosenCards.push(card);
    game.draftCount += 1;
    game.drafting = false;
    els.rewardModal.classList.add('hidden');
    els.hintText.textContent = `获得强化：${card.name}。当前卡组等级 ${game.chosenCards.length + 1}`;
    pulse(FIELD_W / 2, 36, `获得 ${card.name}`);
    playSound('win');
    state.lastTime = performance.now();
    syncBattleUi();
    syncCardStates();
  }

  function rarityName(rarity) {
    return rarity === 'epic' ? '史诗' : rarity === 'rare' ? '稀有' : '普通';
  }

  function updateTutorial() {
    const game = state.game;
    if (!game || game.level.id !== 1 || state.save.tutorialDone || game.drafting) {
      els.tutorialPanel.classList.add('hidden');
      return;
    }
    const steps = [
      { title: '第1步：肉鸽构筑', text: '先选一张开局强化卡，它会决定本局流派。', done: () => game.chosenCards.length > 0 },
      { title: '第2步：建立经济', text: '选择日能芽，部署在左侧绿色区域。', done: () => game.events.plantedSun },
      { title: '第3步：布置火力', text: '选择光弹豆荚，放在日能芽右侧或同一行后排。', done: () => game.events.plantedShooter },
      { title: '第4步：收集太阳', text: '点击战场中出现的太阳能量，维持部署节奏。', done: () => game.events.collectedSun },
      { title: '第5步：击退敌人', text: '继续补充光弹豆荚，击破第一个灰皮侦察兵。', done: () => game.events.defeatedEnemy },
      { title: '第6步：等待下一张牌', text: '每隔一段时间会再次三选一，叠加强化让数值爆炸。', done: () => game.draftCount >= 2 || game.time > 38 }
    ];
    while (steps[game.tutorialStep] && steps[game.tutorialStep].done()) game.tutorialStep += 1;
    if (game.tutorialStep >= steps.length) {
      state.save.tutorialDone = true;
      persistSave();
      els.tutorialPanel.classList.add('hidden');
      pulse(FIELD_W / 2, 28, '教程完成');
      return;
    }
    const step = steps[game.tutorialStep];
    els.tutorialTitle.textContent = step.title;
    els.tutorialText.textContent = step.text;
    els.tutorialPanel.classList.remove('hidden');
  }

  function orbitalBomb() {
    const game = state.game;
    playSound('warning');
    for (let index = 0; index < 2; index += 1) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * 6);
      const center = cellCenter(row, col);
      const marker = document.createElement('div');
      marker.className = 'bomb-marker';
      placeEntity(marker, center.x, center.y);
      els.battlefield.appendChild(marker);
      game.effects.push({
        el: marker,
        life: 2,
        done: false,
        tick: () => splashPlantDamage(row, col, 140)
      });
    }
  }

  function updateEffects(dt) {
    const game = state.game;
    game.effects.forEach((effect) => {
      effect.life -= dt;
      if (effect.life <= 0 && !effect.done) {
        effect.done = true;
        if (effect.tick) effect.tick();
      }
      if (effect.life <= -0.2) {
        effect.el.remove();
        effect.dead = true;
      }
    });
    game.effects = game.effects.filter((effect) => !effect.dead);
  }

  function findBlockingPlant(enemy) {
    if (enemy.config.flying) return null;
    const col = Math.floor(enemy.x / CELL_W);
    for (let offset = 0; offset <= 1; offset += 1) {
      const targetCol = col - offset;
      if (targetCol < 0 || targetCol >= COLS) continue;
      const plant = state.game.grid[enemy.row][targetCol];
      if (plant && Math.abs(enemy.x - plant.x) < 46) return plant;
    }
    return null;
  }

  function findRangedPlant(enemy) {
    const rowPlants = state.game.plantEntities.filter((plant) => plant.row === enemy.row && enemy.x - plant.x < enemy.config.range * CELL_W && enemy.x > plant.x);
    return rowPlants.sort((a, b) => b.x - a.x)[0];
  }

  function nearestEnemy(row, x, range) {
    return state.game.enemies
      .filter((enemy) => !enemy.dead && enemy.row === row && enemy.x > x && enemy.x - x <= range)
      .sort((a, b) => a.x - b.x)[0];
  }

  function enemiesInRow(row) {
    return state.game.enemies.filter((enemy) => !enemy.dead && enemy.row === row);
  }

  function splash(x, y, radiusCells, damage, source) {
    const radius = radiusCells * CELL_W;
    state.game.enemies.forEach((enemy) => {
      const distance = Math.hypot(enemy.x - x, enemy.y - y);
      if (distance <= radius) damageEnemy(enemy, damage * (1 - distance / (radius * 1.8)), source);
    });
    pulse(x, y, '爆裂');
    playSound('explode');
  }

  function explodePlant(plant) {
    splash(plant.x, plant.y, plant.config.radius, plant.config.damage, plant);
    removePlant(plant.row, plant.col, false);
  }

  function healAround(source) {
    const game = state.game;
    game.plantEntities.forEach((plant) => {
      const adjacent = Math.abs(plant.row - source.row) <= 1 && Math.abs(plant.col - source.col) <= 1;
      if (adjacent) {
        plant.hp = Math.min(plant.maxHp, plant.hp + source.config.healAmount);
        updatePlantHp(plant);
      }
    });
    pulse(source.x, source.y, '治愈');
  }

  function gaiaPulse(source) {
    state.game.enemies.forEach((enemy) => {
      damageEnemy(enemy, source.config.damage, source);
      enemy.x += source.config.knockback;
    });
    pulse(source.x, source.y, '盖亚脉冲');
  }

  function splashPlantDamage(row, col, damage) {
    const game = state.game;
    for (let r = row - 1; r <= row + 1; r += 1) {
      for (let c = col - 1; c <= col + 1; c += 1) {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
        const plant = game.grid[r][c];
        if (!plant) continue;
        plant.hp -= damage;
        if (plant.hp <= 0) removePlant(r, c, false);
        else updatePlantHp(plant);
      }
    }
    pulse(col * CELL_W + CELL_W / 2, row * CELL_H + CELL_H / 2, '轰炸');
    playSound('explode');
    vibrate(80);
  }

  function grantShields(source) {
    state.game.enemies.forEach((enemy) => {
      if (enemy !== source && Math.hypot(enemy.x - source.x, enemy.y - source.y) < CELL_W * 1.4) {
        enemy.shield = Math.max(enemy.shield, 1.2);
      }
    });
  }

  function updatePlantHp(plant) {
    const bar = plant.el.querySelector('b');
    bar.style.transform = `scaleX(${Math.max(0, plant.hp / plant.maxHp)})`;
  }

  function renderGame() {
    const game = state.game;
    if (!game) return;
    game.enemies.forEach((enemy) => {
      placeEntity(enemy.el, enemy.x, enemy.y);
      enemy.el.querySelector('b').style.transform = `scaleX(${Math.max(0, enemy.hp / enemy.maxHp)})`;
      enemy.el.classList.toggle('slowed', enemy.slow > 0);
      enemy.el.classList.toggle('poisoned', enemy.poison > 0);
      enemy.el.classList.toggle('shielded', enemy.shield > 0);
      enemy.el.classList.toggle('broken', enemy.armorBreak > 0);
    });
    syncCardStates();
  }

  function syncBattleUi() {
    const game = state.game;
    if (!game) return;
    els.energyText.textContent = Math.floor(game.energy);
    els.baseLifeText.textContent = game.baseLife;
    els.rogueLevelText.textContent = game.chosenCards.length + 1;
    els.levelTitle.textContent = `第${game.level.id}关 · ${game.level.name}`;
    els.levelGoal.textContent = game.level.goal;
    els.waveProgress.style.width = `${Math.min(100, (game.time / game.level.duration) * 100)}%`;
    els.pauseButton.textContent = game.paused ? '继续' : '暂停';
  }

  function syncCardStates() {
    const game = state.game;
    if (!game) return;
    els.cardBar.querySelectorAll('.plant-card').forEach((card) => {
      const plant = plantById(card.dataset.plant);
      const cooling = game.cooldowns[plant.id] || 0;
      const cost = plantCost(plant);
      card.querySelector('.cost').textContent = game.mods.freePlantCharges > 0 ? `免费×${game.mods.freePlantCharges}` : `☀ ${cost}`;
      card.classList.toggle('selected', state.selectedPlant === plant.id && !state.shovel);
      card.classList.toggle('disabled', game.energy < cost && game.mods.freePlantCharges <= 0 || cooling > 0);
      const fill = card.querySelector('.cooldown-fill');
      fill.style.transform = `scaleY(${Math.min(1, cooling / cooldowns[plant.cooldown])})`;
    });
  }

  function checkEndConditions() {
    const game = state.game;
    if (game.baseLife <= 0) endLevel(false, `基地被突破！你坚持到第 ${game.wave} 波，击破 ${game.enemyCount} 个敌人。`);
  }

  function endLevel(win, message) {
    const game = state.game;
    if (!game || game.ended) return;
    game.ended = true;
    cancelAnimationFrame(state.raf);
    playSound(win ? 'win' : 'lose');
    vibrate(win ? 35 : 120);
    state.save.completed[game.level.id] = true;
    state.save.stars[game.level.id] = Math.max(state.save.stars[game.level.id] || 0, Math.min(3, Math.ceil(game.wave / 5)));
    state.save.unlockedLevel = 10;
    persistSave();
    showModal({
      eyebrow: '无限乱斗结算',
      title: win ? '防线超载胜利' : '防线被突破',
      message,
      reward: `最高波次：${game.wave} · 击破敌人：${game.enemyCount}。继续叠蘑菇等级可以撑更久。`,
      primaryText: '再来一局',
      primary: () => startLevel(1)
    });
  }

  function showModal(options) {
    els.modalEyebrow.textContent = options.eyebrow;
    els.modalTitle.textContent = options.title;
    els.modalMessage.textContent = options.message;
    els.modalReward.textContent = options.reward || '';
    els.modalPrimary.textContent = options.primaryText;
    state.modalAction = options.primary;
    els.modal.classList.remove('hidden');
  }

  function closeModal() {
    els.modal.classList.add('hidden');
    els.rewardModal.classList.add('hidden');
  }

  function pulse(x, y, text) {
    const effect = document.createElement('div');
    effect.className = 'pulse-text';
    effect.textContent = text;
    placeEntity(effect, x, y);
    els.battlefield.appendChild(effect);
    if (state.game) state.game.effects.push({ el: effect, life: 0.75, done: true });
  }

  function placeEntity(el, x, y) {
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }

  function cellCenter(row, col) {
    return { x: col * CELL_W + CELL_W / 2, y: row * CELL_H + CELL_H / 2 };
  }

  function getAudioContext() {
    if (!state.save.sound) return null;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!state.audioContext) state.audioContext = new AudioContext();
    if (state.audioContext.state === 'suspended') state.audioContext.resume();
    return state.audioContext;
  }

  function playSound(type) {
    const context = getAudioContext();
    if (!context) return;
    const presets = {
      click: [420, 520, 0.06, 'sine', 0.035],
      plant: [260, 520, 0.12, 'triangle', 0.045],
      sun: [720, 960, 0.1, 'sine', 0.045],
      hit: [190, 120, 0.08, 'square', 0.025],
      remove: [420, 210, 0.11, 'sawtooth', 0.03],
      warning: [120, 90, 0.18, 'sawtooth', 0.035],
      explode: [110, 55, 0.22, 'square', 0.045],
      win: [520, 900, 0.26, 'triangle', 0.05],
      lose: [180, 70, 0.3, 'sawtooth', 0.04]
    };
    const preset = presets[type] || presets.click;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = preset[3];
    oscillator.frequency.setValueAtTime(preset[0], now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, preset[1]), now + preset[2]);
    gain.gain.setValueAtTime(preset[4], now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + preset[2]);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + preset[2]);
  }

  function vibrate(ms) {
    if (state.save.vibration && navigator.vibrate) navigator.vibrate(ms);
  }

  function bindEvents() {
    window.addEventListener('resize', fitBattleShell);
    window.addEventListener('orientationchange', fitBattleShell);
    document.addEventListener('click', (event) => {
      if (event.target.closest('button')) playSound('click');
    });
    document.getElementById('start-button').addEventListener('click', () => startLevel(Math.min(state.save.unlockedLevel, 10)));
    document.getElementById('levels-button').addEventListener('click', () => switchScreen('level-screen'));
    document.getElementById('codex-button').addEventListener('click', () => switchScreen('codex-screen'));
    document.getElementById('settings-button').addEventListener('click', () => switchScreen('settings-screen'));
    document.querySelectorAll('[data-screen]').forEach((button) => {
      button.addEventListener('click', () => switchScreen(button.dataset.screen));
    });
    els.shovelButton.addEventListener('click', () => {
      state.shovel = !state.shovel;
      state.selectedPlant = null;
      els.shovelButton.classList.toggle('active', state.shovel);
      els.hintText.textContent = state.shovel ? '铲除模式：点击植物所在格移除。' : '选择植物卡牌，再点击格子部署。';
      syncCardStates();
    });
    els.autoSunButton.addEventListener('click', () => {
      state.save.autoSun = !state.save.autoSun;
      syncAutoSunButton();
      persistSave();
      els.hintText.textContent = state.save.autoSun ? '自动收集已开启，太阳会飞向能量栏。' : '自动收集已关闭，可手动点击太阳。';
    });
    els.speedButton.addEventListener('click', () => {
      state.save.speed = (state.save.speed || 1) >= 2 ? 1 : 2;
      syncSpeedButton();
      persistSave();
      els.hintText.textContent = state.save.speed > 1 ? '快速模式已开启：战斗速度 2 倍。' : '快速模式已关闭：战斗速度恢复 1 倍。';
      if (state.game) state.lastTime = performance.now();
    });
    els.pauseButton.addEventListener('click', () => {
      if (!state.game || state.game.ended) return;
      state.game.paused = !state.game.paused;
      state.lastTime = performance.now();
      syncBattleUi();
    });
    els.exitButton.addEventListener('click', () => {
      if (!state.game) {
        switchScreen('menu-screen');
        return;
      }
      if (!state.game.ended && !confirm('确定退出当前战斗吗？本关进度不会保存。')) return;
      cancelAnimationFrame(state.raf);
      closeModal();
      els.rewardModal.classList.add('hidden');
      state.game = null;
      state.selectedPlant = null;
      state.shovel = false;
      els.battlefield.innerHTML = '';
      switchScreen('menu-screen');
    });
    els.modalPrimary.addEventListener('click', () => {
      closeModal();
      if (state.modalAction) state.modalAction();
    });
    els.modalSecondary.addEventListener('click', () => {
      closeModal();
      switchScreen('menu-screen');
    });
    els.soundToggle.addEventListener('change', () => {
      state.save.sound = els.soundToggle.checked;
      persistSave();
    });
    els.vibrationToggle.addEventListener('change', () => {
      state.save.vibration = els.vibrationToggle.checked;
      persistSave();
    });
    els.soundTestButton.addEventListener('click', () => playSound('win'));
    els.vibrationTestButton.addEventListener('click', () => vibrate([30, 30, 60]));
    document.getElementById('reset-save-button').addEventListener('click', () => {
      if (!confirm('确定要重置本地存档吗？')) return;
      localStorage.removeItem(SAVE_KEY);
      state.save = loadSave();
      updateSaveSummary();
      renderLevels();
      renderCodex();
    });
  }

  function init() {
    bindEvents();
    renderLevels();
    renderCodex();
    updateSaveSummary();
  }

  init();
})();
