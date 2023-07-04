let ww = window.innerWidth;
let wh = window.innerHeight;
let kaboomDimensions = {};
let ratio = 0.6;


if (ww * ratio > wh) {
  kaboomDimensions = {
    w: wh / ratio,
    h: wh
  };
} else {
  kaboomDimensions = {
    w: ww,
    h: ww * ratio
  };
};


kaboom({ 
  background: [0,0,0],
  crisp: true,
  width: kaboomDimensions.w,
  height: kaboomDimensions.h,
});

if (ww < wh) alert('Rotate your screen and reload for the optimal Apple Wars experience ;)');

var scaler = width()/22; // 22
var UIscaler = width()/16; // 16

var version = 'BETA';

debug.inspect = false;
var showDraws = false;

// cheats ;)
var epicSecretDoorHehehe = 0;
var epicSecretDoorOpenWOW = false;
var epicPasswordVerifier = 'hi';

var stupidMode = false;
var buyEverything = false;
var applecalypse = false;
var tooMuchMoney = !false;
var majik = false;
var appleGoSpiiiiin = false;
var machineSeed = false;
var o_u_r = false;

var allowIframes = !false;

var defaultStats = {
  'totalKills': 0,
  'matchKills': 0,
  'totalDeaths': 0,
  'totalShots': 0,
  'matchShots': 0,
  'totalShotsTaken': 0,
  'matchShotsTaken': 0,
  'totalMoney': 0,
  'matchMoney': 0,
  'totalDamageTaken': 0,
  'totalDamageSent': 0,
  'matchDamageTaken': 0,
  'matchDamageSent': 0,
  'totalPoisonDamageTaken': 0,
  'matchPoisonDamageTaken': 0,
  'totalBossesSeen': 0,
  'matchBossesSeen': 0,
  'totalBossesKilled': 0,
  'matchBossesKilled': 0,
  'mostEnemiesOnScreen': 0,
  'fallingApplesClicked': 0,
  'fallingGreenApplesClicked': 0,
  'wins': 0,
  'endlessSurvivalTime': 0
};

var canBeSaved = true;
const Default = {
  'money': 0, 
  'kills': 0, 
  'bullet': 'appleSeed',
  'bullets': [], 
  'upgrades': {},
  'buffs': [],
  'buffsOn': [],
  'abilities': [],
  'ability': '',
  'skin': 'apple',
  'skins': [],
  'stats': defaultStats,
  'xp': 0,
  'options': {
    'mobile': isTouch(),
    'joystick': false,
    'quitButton': true,
    'transitions': true, 
    'fpsFix': true,
    'bgContrast': false,
    'dmgIndicator': true,
    'splitSFX': true,
    'poisonBubbles': true,
    'clearData': `go('wipeSave')`,
  }
};
// CHANGE DATA VARIABLE TOO

var settingsNames = [
  'Mobile Mode',
  'Joystick',
  'Quit Button',
  'Transitions',
  'FPS Fixer',
  'Dim Background',
  'Damage Indicator',
  'Bullet Split SFX',
  'Poison Bubbles',
  'Wipe Save'
];

// also line 137

function lsnd(v) { loadSound(v, `sounds/${v}.mp3`); };

lsnd('click');
lsnd('hit');
lsnd('explosion');
lsnd('sauced');
lsnd('shoot');


loadSpriteAtlas('sprites/skins.png', {
  'skin_dark': { x: 64, y: 64, width: 64, height: 64 },
  'skin_shocked': { x: 0, y: 0, width: 64, height: 64 },
  'skin_lenny': { x: 0, y: 64, width: 64, height: 64 },
  'skin_hat': { x: 64, y: 128, width: 64, height: 64 },
  'skin_cat': { x: 0, y: 128, width: 64, height: 64 },
  'skin_chicken': { x: 128, y: 128, width: 64, height: 64 },
  'skin_robot': { x: 128, y: 64, width: 64, height: 64 },
  'skin_gold': { x: 64, y: 0, width: 64, height: 64 },
  'skin_diamond': { x: 128, y: 0, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/allBullets.png', {
  'appleSeed': { x: 0, y: 0, width: 64, height: 64 },
  'banana': { x: 64, y: 0, width: 64, height: 64 },
  'blueberry': { x: 128, y: 0, width: 64, height: 64 },
  'cherryPit': { x: 192, y: 0, width: 64, height: 64 },
  'grape': { x: 256, y: 0, width: 64, height: 64 },
  'nuclearGrape': { x: 0, y: 64, width: 64, height: 64 },
  'peachPit': { x: 64, y: 64, width: 64, height: 64 },
  'pear': { x: 128, y: 64, width: 64, height: 64 },
  'pomegranate': { x: 192, y: 64, width: 64, height: 63 },
  'pomegranateAril': { x: 256, y: 64, width: 64, height: 64 },
  'raspberry': { x: 0, y: 128, width: 64, height: 64 },
  'raspberryDrupelet': { x: 64, y: 128, width: 64, height: 64 },
  'strawberrySeed': { x: 128, y: 128, width: 64, height: 64 },
  'watermelon': { x: 192, y: 128, width: 64, height: 64 },
  'watermelonSeed': { x: 256, y: 128, width: 64, height: 64 },
  'watermelonSlice': { x: 0, y: 192, width: 64, height: 64 },
  'yewBerry': { x: 64, y: 188, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/shopItems.png', {
  'everythingExplodes': { x: 0, y: 0, width: 64, height: 64 },
  'extraBullets': { x: 64, y: 0, width: 64, height: 64 },
  'largerBullets': { x: 128, y: 0, width: 64, height: 64 },
  'extraPoison': { x: 192, y: 0, width: 64, height: 64 },
  'moveFaster': { x: 0, y: 64, width: 64, height: 64 },
  'fasterBullets': { x: 64, y: 64, width: 64, height: 64 },
  'moreDamage': { x: 128, y: 64, width: 64, height: 64 },
  'strongerPoison': { x: 192, y: 64, width: 64, height: 63 },
  'poisonResistance': { x: 0, y: 128, width: 64, height: 63 },
  'regeneration': { x: 64, y: 128, width: 64, height: 64 },
  'protection': { x: 128, y: 128, width: 64, height: 64 },
  'strongExplosions': { x: 192, y: 128, width: 64, height: 64 },
  'explosionResistance': { x: 0, y: 192, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/fancyBooly.png', {
  'ironBooly': { x: 0, y: 0, width: 64, height: 64 },
  'goldBooly': { x: 64, y: 0, width: 64, height: 64 }
});

loadSpriteAtlas('sprites/bullets2.png', {
  'durian': { x: 0, y: 0, width: 64, height: 64 },
  'thermoGrape': { x: 64, y: 0, width: 64, height: 64 },
  'dragonfruit': { x: 128, y: 0, width: 64, height: 64 },
  'coconutHalf': { x: 0, y: 64, width: 64, height: 64 },
  'coconut': { x: 64, y: 64, width: 64, height: 64 },
  'cherry': { x: 128, y: 64, width: 64, height: 64 },
  'strawberry': { x: 0, y: 128, width: 64, height: 64 },
  'peach': { x: 64, y: 128, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/buffs.png', {
  'randomSnipe': { x: 0, y: 0, width: 64, height: 64 },
  'killHealth': { x: 64, y: 0, width: 64, height: 64 },
  'zeroPoisonDamage': { x: 128, y: 0, width: 64, height: 64 },
  'damageCombo': { x: 192, y: 0, width: 64, height: 64 },

  'extraBossDamage': { x: 0, y: 64, width: 64, height: 64 },
  'rageQuit': { x: 64, y: 64, width: 64, height: 64 },
  'zeroExplosionDamage': { x: 128, y: 64, width: 64, height: 64 },
  'moneyCombo': { x: 192, y: 64, width: 64, height: 64 },

  'lowHealthSpeed': { x: 0, y: 128, width: 64, height: 64 },
  'deathExplosion': { x: 64, y: 128, width: 64, height: 64 },
  'abilityCooldown': { x: 128, y: 128, width: 64, height: 64 },
  'extraMoneyIncome': { x: 192, y: 128, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/abilities.png', {
  'autoFire': { x: 0, y: 0, width: 64, height: 64 },
  'noDamage': { x: 64, y: 0, width: 64, height: 64 },
  'poisonEveryone': { x: 128, y: 0, width: 64, height: 64 },
  'doubleDamage': { x: 0, y: 64, width: 64, height: 64 },
  'appleFan': { x: 64, y: 64, width: 64, height: 64 },
  'fruitBasket': { x: 128, y: 64, width: 64, height: 64 },
  'slowMotion': { x: 0, y: 128, width: 64, height: 64 },
  '360bullets': { x: 64, y: 128, width: 64, height: 64 },
  'doubleMoney': { x: 128, y: 128, width: 64, height: 64 },
});


loadSpriteAtlas('sprites/other.png', {
  'arrow': { x: 0, y: 0, width: 64, height: 64 },
  'money': { x: 64, y: 0, width: 64, height: 64 },
  'maxHealth': { x: 128, y: 0, width: 64, height: 64 },
  'switchOff': { x: 192, y: 0, width: 64, height: 64 },

  'applePortal': { x: 0, y: 64, width: 64, height: 64 },
  'grapeSplatter': { x: 64, y: 64, width: 64, height: 64 },
  'poisonBubble': { x: 128, y: 64, width: 64, height: 64 },
  'moneyBonus': { x: 192, y: 64, width: 64, height: 64 },

  'switchOn': { x: 0, y: 128, width: 64, height: 64 },
  'fire': { x: 64, y: 128, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/shopTypes.png', {
  'bulletsIcon': { x: 0, y: 0, width: 64, height: 64 },
  'upgradesIcon': { x: 64, y: 0, width: 64, height: 64 },
  'skinsIcon': { x: 128, y: 0, width: 64, height: 64 },
  
  'buffsIcon': { x: 0, y: 64, width: 64, height: 64 },
  'abilitiesIcon': { x: 64, y: 64, width: 64, height: 64 }
});

loadSpriteAtlas('sprites/skins2.png', {
  'skin_king': { x: 0, y: 0, width: 64, height: 64 },
  'skin_text': { x: 64, y: 0, width: 64, height: 64 },
  'skin_donut': { x: 128, y: 0, width: 64, height: 64 },
  'skin_blobfish': { x: 192, y: 0, width: 64, height: 64 },
  
  'skin_silver': { x: 0, y: 64, width: 64, height: 64 },
  'crate': { x: 64, y: 64, width: 64, height: 64 },
  'barrel': { x: 128, y: 64, width: 64, height: 64 },
  
  'skin_appleapple': { x: 0, y: 128, width: 64, height: 64 },
  'skin_appleappleapple': { x: 64, y: 128, width: 64, height: 64 },
  'skin_cactus': { x: 128, y: 128, width: 64, height: 64 },
});

loadSpriteAtlas('sprites/other2.png', {
  'xp': { x: 0, y: 0, width: 64, height: 64 },
  'poisonCloud': { x: 64, y: 0, width: 64, height: 64 }
});

loadSpriteAtlas('sprites/particles.png', {
  'speedParticle': { x: 0, y: 0, width: 64, height: 64 },
  'slowParticle': { x: 64, y: 0, width: 64, height: 64 },
  'zap': { x: 128, y: 0, width: 64, height: 64 }
});



function ls(s) {
  loadSprite(s,`sprites/${s}.png`)
}; // load sprite

function lsph(s) {
  loadSprite(s,`sprites/unknown.png`)
}; // load sprite placeholder

ls('apple')
ls('applesauce');
ls('boolyApple');
ls('shootButton');
ls('boom');
ls('quitButton');
ls('wizardApple');
ls('unknown');
ls('target');
ls('applePortal');
ls('communistApple');
ls('abilityBtn');
ls('impact');

var extToIntSettingsNames = Object.keys(Default.options);

var clearData = false;
if (clearData) {
  setData('save', Default);
};
var Data = getData('save', Default);

if (Object.keys(Default).toString() 
    != 
   Object.keys(Data).toString()) {
  var diff = arrayDiff(Object.keys(Default), Object.keys(Data));
  for (let i = 0; i < diff.length; i++) {
    Data[diff[i]] = Default[diff[i]];
  };
  
} else if 
  (Object.keys(Default.options).toString() 
    != 
   Object.keys(Data.options).toString()) {
  for (let i = 0; i < arrayDiff(Object.keys(Default.options), Object.keys(Data.options)).length; i++) {
    
    var diff = arrayDiff(Object.keys(Default.options), Object.keys(Data.options));
    for (let i = 0; i < diff.length; i++) {
      Data.options[diff[i]] = Default.options[diff[i]];
    };
  };
}

if (['fire','watermelonSeed'].includes(Data.bullet)) {
  Data.bullet = 'appleSeed';
};

if (majik
   ||
  stupidMode
   ||
  buyEverything
   ||
  applecalypse
   ||
  tooMuchMoney
   ||
  appleGoSpiiiiin
   ||
  machineSeed
   ||
  o_u_r) {

  canBeSaved = false;
}

//setTimeout(() => {bullet = 'dragonfruit';}, 1000);

setTimeout(() => {
  setInterval(() => {
    if (canBeSaved) {
      
    Data = {
      'money': money, 
      'kills': sauceCount, 
      'bullet': bullet,
      'bullets': [], 
      'upgrades': {}, 
      'buffs': [],
      'buffsOn': [],
      'abilities': [],
      'ability': '',
      'skin': playerSkin,
      'skins': [],
      'stats': {},
      'xp': 0,
      'options': gameSettings
    };

    for (let i = 0; i < shopItems[0].length; i++) {
      var cItem = shopItems[0][i];
      if (cItem.owned == true) {
        Data.bullets.push(cItem.icon);
      };
    };
    
    for (let i = 0; i < shopItems[1].length; i++) {
      var cItem = shopItems[1][i];
      if (cItem.owned > 0) {
        Data.upgrades[cItem.icon] = cItem.owned;
      };
    };

    for (let i = 0; i < shopItems[2].length; i++) {
      var cItem = shopItems[2][i];
      if (cItem.owned == true) {
        Data.skins.push(cItem.icon);
      };
    };

    for (let i = 0; i < shopItems[3].length; i++) {
      var cItem = shopItems[3][i];
      if (cItem.owned == true) {
        Data.buffs.push(cItem.icon);
      };
    };
      
    for (let i = 0; i < shopItems[3].length; i++) {
      var cItem = shopItems[3][i];
      if (cItem.active == true) {
        Data.buffsOn.push(cItem.icon);
      };
    };

    for (let i = 0; i < shopItems[4].length; i++) {
      var cItem = shopItems[4][i];
      if (cItem.owned == true) {
        Data.abilities.push(cItem.icon);
      };
    };
      
    for (let i = 0; i < shopItems[4].length; i++) {
      var cItem = shopItems[4][i];
      if (cItem.active == true) {
        Data.ability.push(cItem.icon);
      };
    };

    Data.xp = xpPoints;

    
    setData('save', Data);
      
    } else {
      //document.getElementById('majikIsReal').innerHTML = '<p>Saving disabled</p>';
    };
  }, 5000);
}, 1000);




// from codegrepper.com
function arrayDiff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}


// not mine

function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}



var gameSettings = Data.options; 

var particleLoopRunning = false;
var fpsMeter = '-';
var fps = 1;

var sauceCount = Data.kills;
var money =      Data.money;
var bullet =     Data.bullet;

var playerSkin = Data.skin; 

var shopType = 1;


if (tooMuchMoney) money = 100000000;

function fpsmod(n) {
  var fps2 = 1/dt();
  return (n*(60/fps2));
};



for (let i = 0; i < shopItems[0].length; i++) {
  var cItem = shopItems[0][i].icon;
  if (Data.bullets.includes(cItem)) {
    shopItems[0][i].owned = true;
  };
};

for (let i = 0; i < shopItems[1].length; i++) {
  var cItem = shopItems[1][i].icon;
  if (Object.keys(Data.upgrades).includes(cItem)) {
    shopItems[1][i].owned = Data.upgrades[cItem];
  };
};

for (let i = 0; i < shopItems[2].length; i++) {
  var cItem = shopItems[2][i].icon;
  if (Data.skins.includes(cItem)) {
    shopItems[2][i].owned = true;
  };
};

for (let i = 0; i < shopItems[3].length; i++) {
  var cItem = shopItems[3][i].icon;
  if (Data.buffs.includes(cItem)) {
    shopItems[3][i].owned = true;
  };
};

for (let i = 0; i < shopItems[3].length; i++) {
  var cItem = shopItems[3][i].icon;
  if (Data.buffsOn.includes(cItem)) {
    shopItems[3][i].active = true;
  };
};

for (let i = 0; i < shopItems[4].length; i++) {
  var cItem = shopItems[4][i].icon;
  if (Data.abilities.includes(cItem)) {
    shopItems[4][i].owned = true;
  };
};

for (let i = 0; i < shopItems[4].length; i++) {
  var cItem = shopItems[4][i].icon;
  if (Data.ability.includes(cItem)) {
    shopItems[4][i].active = true;
  };
};


//shopItems[5][0].owned = Data.boxes[0];
//shopItems[5][1].owned = Data.boxes[1];
var xpPoints = Data.xp;





var itemsArray = [];
shopItems[shopType].forEach(function (item, index) {
  itemsArray.push(item.icon)
});
var itemsArray2 = [];
  shopItems[3].forEach(function (item, index) {
    itemsArray2.push(item.icon)
});
var itemsArray3 = [];
  shopItems[4].forEach(function (item, index) {
    itemsArray3.push(item.icon)
});




var englishBullets = {};
for (let i = 0; i < shopItems[0].length; i++) {
  var crntB = shopItems[0][i];
  englishBullets[crntB.icon] = (crntB.name).replace('\n',' ');
};

function itemOwned(i) {
  if (itemsArray.includes(i)) {
    return shopItems[1][itemsArray.indexOf(i)].owned;

  } else if (itemsArray2.includes(i)) {
    return shopItems[3][itemsArray2.indexOf(i)].active;

  } else {
    return shopItems[4][itemsArray3.indexOf(i)].active;
  }
};

function particle() {
  if (debug.fps() >= 20) {
    particleLoopRunning = true;
    let particleLife = rand(0,10);
    let particleSprite = 'apple';
    if (randi(0,20) == 5) { particleSprite = 'boolyApple'; };
    add([
      pos(rand(0,width()), -20),
      sprite(particleSprite),
      origin('center'),
      scale(UIscaler/ (25+(particleLife*8)) ),
      lifespan(1+(particleLife/5), { fade: (1+(particleLife/5))*0.9 }),
      move(DOWN, UIscaler*(2 + (3 - particleLife*0.3))),
      layer('particles'),
      rotate(rand(0,360)),
      area(),
      'particle',
      {
        'spriteCranberry': particleSprite
      }
    ]);

    
  } else destroyAll('particle');
};


if (debug.inspect || showDraws) {
  setInterval(() => {
      debug.log(`draw: ${debug.drawCalls()} objs: ${debug.objCount()} dt: ${dt()}`)
  }, 500);
};


scene('menu', () => {
  
  document.getElementById('theGoodStuff').innerHTML = msArray[msMode];

  layers([
    'bg',
    'particles',
    'response',
    'ui',
    'overlay'
  ],'bg');

  /*
  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,255),
    layer('overlay'),
    z(420),
    "crashed"
  ]);

  add([
    text(':(', {font:'apl386'}),
    pos(UIscaler*1.5, UIscaler*1.5),
    color(WHITE),
    scale(UIscaler/50),
    layer('overlay'),
    z(421),
    "crashed"
  ]);

  setTimeout(() => {
    destroyAll('crashed');
  }, 100);
  */

  const bg = add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('bg'),
    area(),
    "beanz"
  ]);

  const over = add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('overlay'),
    opacity(0),
    'over'
  ]);

  const title = add([
    text('Apple Wars', { font: 'sinko' }),
    scale(UIscaler/8),
    layer('ui'),
    pos(width()/2, height()*0.3),
    origin('center'),
    rotate(0)
  ]);

  var thatGuysProbablyUsingKillAuraBro = '';

  const verDisplay = add([
    text(version),
    scale(UIscaler/200),
    pos(UIscaler/20, UIscaler/20),
    origin('topleft'),
    layer('ui'),
  ]);

  const playy = add([
    text('Start'),
    scale(UIscaler/100),
    pos(width()/2, height()*0.5),
    origin('center'),
    layer('ui'),
    area(),
    'startButton',
    'yellowHover'
  ]);

  const settings = add([
    text('Options'),
    scale(UIscaler/100),
    pos(width()/2, height()*0.6),
    origin('center'),
    layer('ui'),
    area(),
    'settings',
    'yellowHover'
  ]);

  const shop = add([
    text('Shop'),
    scale(UIscaler/100),
    pos(width()/2, height()*0.7),
    origin('center'),
    layer('ui'),
    area(),
    'shop',
    'yellowHover'
  ]);


  add([
    rect(width()/4, UIscaler*0.7),
    color(50,50,50),
    origin('right'),
    pos(width()-UIscaler*0.6, height()-UIscaler*0.6),
    layer('ui')
  ]);

  var xpLevel = Math.floor(xpPoints/xpPerLevel);
  var xpRemaining = xpPoints % xpPerLevel;
  
  add([
    rect(width()*0.243 /xpPerLevel*xpRemaining, UIscaler*0.6),
    color(255,220,0),
    origin('left'),
    pos(width()-UIscaler*0.55-width()/4, height()-UIscaler*0.6),
    layer('ui')
  ]);

  add([
    text(xpLevel, {font:'apl386'}),
    color(0,0,0),
    origin('left'),
    pos(width()-UIscaler*0.54-width()/4, height()-UIscaler*0.6),
    layer('ui'),
    scale(UIscaler/110),
    opacity(0.6)
  ]);

  add([
    text('Experience', {font:'apl386'}),
    color(150,150,150),
    origin('botleft'),
    pos(
      width()-UIscaler*4.6, 
      height()-UIscaler*0.9
    ),
    layer('ui'),
    scale(UIscaler/250)
  ]);
  
  const xpIcon = add([
    sprite('xp'),
    pos(width()-UIscaler*0.6, height()-UIscaler*0.6),
    origin('center'),
    layer('ui'),
    scale(UIscaler/64),
  ]);


  if (epicSecretDoorOpenWOW) {
    add([
      sprite('applePortal'),
      pos(width()-UIscaler/16, height()-UIscaler/16),
      origin('botright'),
      scale(UIscaler/40),
      layer('ui'),
      z(123),
      area(),
      "majikDoor"
    ]);
  };

  if (!canBeSaved) {
    add([
      text('Game unsavable.'),
      pos(width()-UIscaler/16, height()-UIscaler/16),
      origin('botright'),
      scale(UIscaler/200),
      layer('ui'),
      z(125),
      color(255,0,0),
      lifespan(1.5, { fade: 0.5 })
    ]);
  };


  onClick('majikDoor', (d) => {
    let ans = prompt('Enter the secret password for the secret door... or else you will be locked up in my secret location forever...');
    epicPasswordVerifier = ans;

    hash(ans).then((code) => {
      if (code == majikPassword) {
        go('majikLand');
      } else if (ans == null) {
        alert('yeah u better run');
        
      } else {
        alert('u failed now suffer the consequences');
        window.location.href = "http://endless.horse";
      };
    });
  });

  
  //if (!particleLoopRunning) particle();

  var particleResponses = [
    'ouch',
    'ow',
    'rude',
    'hey',
    ':(',
    'bully',
    'aaaa',
    'i cri',
    'snif',
    'D:'
  ];

  onClick('particle', (p) => {
    shake(UIscaler/10);
    play('sauced');
    add([
      pos(p.pos),
      sprite('applesauce'),
      scale(p.scale),
      rotate(rand(0,360)),
      layer('bg'),
      origin('center'),
      lifespan(2, { fade: 1 })
    ]);
    
    add([
      pos(p.pos.x+rand(-UIscaler,UIscaler),p.pos.y+rand(-UIscaler,UIscaler)),
      text(choose(particleResponses)),
      scale(UIscaler/rand(150,200)),
      layer('response'),
      origin('center'),
      lifespan(1, { fade: 1 })
    ]);
    
    bg.color = {r:20,g:20,b:20};
    setTimeout(()=>{bg.color = {r:0,g:0,b:0};},70);

    if (p.spriteCranberry == 'boolyApple'
    &&
    epicSecretDoorHehehe < 5) {
      
      //epicSecretDoorHehehe++;
      add([
        pos(width(), height()),
        origin('botright'),
        text(`${epicSecretDoorHehehe}/5`),
        lifespan(1, {fade: 1}),
        layer('ui'),
        scale(UIscaler/200),
        color(255,255,0)
      ]);
    };

    if (epicSecretDoorHehehe >= 5) {
      epicSecretDoorOpenWOW = true;
    };

    destroy(p);
  });


  function fadeOut() {
    every('over', (o) => {
      o.opacity += 0.1;
      if (o.opacity >= 1) {
        setTimeout(() => {
          go('game');
        }, 500);
      } else {
        setTimeout(() => {
          fadeOut();
        }, 100);
      };
    });
  };

  var iHaveNoIdeaWhyIDidThisLol = false; var idkManMaybeItsSkill = ''; var prettySureItsAnAutoclicker = 0; onKeyPress('up', () => { thatGuysProbablyUsingKillAuraBro += 'u'; }); onKeyPress('down', () => { thatGuysProbablyUsingKillAuraBro += 'm'; }); onKeyPress('left', () => { thatGuysProbablyUsingKillAuraBro += 'l'; }); onKeyPress('right', () => { thatGuysProbablyUsingKillAuraBro += 'r'; }); onCharInput((ch) => { thatGuysProbablyUsingKillAuraBro += '['+ch+']'; }); onKeyPress('enter', () => { thatGuysProbablyUsingKillAuraBro += 'e'; }); onClick('beanz', (b) => { prettySureItsAnAutoclicker++; }); onUpdate(() => { if ((thatGuysProbablyUsingKillAuraBro.slice(-15) == 'uuddlrlr[b][a]e' || prettySureItsAnAutoclicker >= 100) && !iHaveNoIdeaWhyIDidThisLol) {idkManMaybeItsSkill = '<input id="cheatsButCooler"></input>'; document.getElementById('cheats').innerHTML = idkManMaybeItsSkill;  iHaveNoIdeaWhyIDidThisLol = true}; if (document.getElementById('cheatsButCooler').value == 'majik apel') { majik = true; }; if (document.getElementById('cheatsButCooler').value == 'apel record') { appleGoSpiiiiin = true; }; if (document.getElementById('cheatsButCooler').value == 'veri cash moni') { canBeSaved = false; money += 1000000; }; });

  onClick('startButton', (s) => {
    play('click');
    if (window == window.top || allowIframes) {
      if (gameSettings.transitions) {
        fadeOut();
      } else {
        go('game');
      };
    } else /*if ((window.top.location.href).includes('?v=1'))*/ {
      alert('Open in a new tab!');
      window.open("https://apple-wars.mrvoo.repl.co", '_blank');
    } /*else {
      canvas.outerHTML = '';
    };*/
  });

  onClick('settings', (o) => {
    play('click');
    go('settings');
  });

  onClick('shop', (o) => {
    play('click');
    go('shop');
  });

  onMouseMove(() => {
    every('yellowHover', (b) => {
      b.color = {r:255,g:255,b:255};
    });
  });
  onHover('yellowHover', (b) => {
    b.color = {r:255,g:255,b:0};
  });

  onUpdate(() => {
    isInMajikLand = false;

    title.pos.y = (height()*0.3) + Math.sin(time()*3) *scaler *0.2;
    title.angle = 120;
  });

  loop(0.1, () => {
    particle();
  });
  

});




go('menu');