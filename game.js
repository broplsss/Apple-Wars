var incomingDamageMulti = 1;

function t() { return new Date().getTime() /1000; };

scene('game', () => {

  
  document.getElementById('theGoodStuff').innerHTML = '';

  camScale(gameCameraZoom);

  var stage = 1; // 1, 2, 3, 4

  var dead = false;
  var victory = false;
  var quit = false;
  var appleSpawnerSpeeder = 100;
  var spawnDelay = 5;
  var lastSpawn = t();
  var damageCombo = 1;
  var moneyCombo = 1;
  var abilityCooldown = 0;
  incomingDamageMulti = 1;

  var abDamage = 1;
  var abMoney = 1;
  var epicSpeedMulti = 1;

  var turnToMouse = true;

  var playerbulletlist = {};

  if (stupidMode) {
    bulletStats.banana.spread = 360;
    bulletStats.banana.amount = 100;
    bullet = 'banana';
  };

  if (majik) {
    bulletStats.fire =  {
      'speed': 13,
      'scaler': 70,
      'damage': 10,
      'spread': 30,
      'cooldown': 2,
      'amount': 8,
      'poison': 0
    };
    bullet = 'fire';
  };
  if (o_u_r) {
    bulletStats.watermelonSeed =  {
      'speed': 50,
      'scaler': 220,
      'damage': 1000,
      'spread': 3,
      'cooldown': 2,
      'amount': 1,
      'poison': 0
    };
    bullet = 'watermelonSeed';
  };


  layers([
    'ground',
    'bullets',
    'players',
    'poison',
    'explode',
    'effect',
    'ui',
    'overlay',
    'ui2',     // i ran out of names :)
    'overlay2'
  ],'ground');

  if (!gameSettings.joystick) {
    add([
      sprite('target'),
      pos(0,0),
      layer('effect'),
      scale(UIscaler/64),
      origin('center'),
      z(100),
      'ch'
    ]);
  };

  const ground2 = add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(bgColors.border.normal[0],
         bgColors.border.normal[1],
         bgColors.border.normal[2]),
    layer('ground'),
    fixed()
  ]);

  const ground = add([
    rect(width(), height()),
    pos(0,0),
    color(bgColors.ground.normal[0],
         bgColors.ground.normal[1],
         bgColors.ground.normal[2]),
    layer('ground'),
  ]);

  // nothing to see here
  var m1 = -1.6;
  var m2 = 1.3;
  
  add([
    rect(scaler*3, scaler*2),
    pos(width()*m1, height()*m2),
    color(bgColors.ground.normal[0],
         bgColors.ground.normal[1],
         bgColors.ground.normal[2]),
    layer('ground'),
  ]);

  add([
    sprite('apple'),
    pos(width()*m1 +scaler*0.7, height()*m2 +scaler*0.7),
    layer('players'),
    scale(scaler/64),
    origin('center'),
    "npcMaybe"
  ]);
  // nothing to see here

  if (gameSettings.bgContrast) {
    ground.color =  {r:bgColors.ground.contrast[0], g:bgColors.ground.contrast[1], b:bgColors.ground.contrast[2]};
    ground2.color = {r:bgColors.border.contrast[0], g:bgColors.border.contrast[1], b:bgColors.border.contrast[2]};
  };

  const over2 = add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('overlay2'),
    opacity(1),
    fixed(),
    'over2'
  ]);

  if (majik) playerSprite = 'wizardApple';
  else if (o_u_r) playerSprite = 'communistApple';
  else {
    if (playerSkin == 'apple') {
      playerSprite = playerSkin;
    } else {
      playerSprite = `skin_${playerSkin}`;
    };
  };
  
  const player = add([
    sprite(playerSprite),
    pos(center()),
    area(),
    layer('players'),
    origin('center'),
    scale(scaler/64),
    rotate(0),
    "player",
    "fighter",
    {
      'health': 100 + itemOwned('maxHealth')*10,
      'poison': 0
    }
  ]);

  const shootBtn = add([
    sprite('shootButton'),
    pos(width(),height()),
    area(),
    origin('botright'),
    scale(UIscaler/32),
    layer('ui'),
    opacity(0.7),
    fixed(),
    "shoot"
  ]);

  const quitBtn = add([
    sprite('quitButton'),
    pos(width()-UIscaler*2,height()-UIscaler*0.08),
    area(), 
    origin('botright'),
    scale(UIscaler/64),
    layer('ui'),
    opacity(0.7),
    fixed(),
    "quit"
  ]);

  const abilityBtn = add([
    sprite('abilityBtn'),
    pos(width()-UIscaler*0.6,height()-UIscaler*0.061), // 2, 0.16
    area(), 
    origin('botright'),
    scale(UIscaler/64),
    layer('ui'),
    opacity(0.7),
    fixed(),
    "ability"
  ]);

  add([
    rect(width(),UIscaler*0.8),
    pos(0,0),
    layer('ui'),
    color(0,0,0),
    fixed(),
  ]);

  const healthBar = add([
    rect(width(),UIscaler*0.7),
    pos(0,0),
    layer('ui'),
    z(5),
    color(200,30,30),
    fixed(),
  ]);
  const healthBarTWO = add([
    rect(width(),UIscaler*0.25),
    pos(0,UIscaler*0.45),
    layer('ui'),
    z(6),
    color(255,255,255),
    opacity(0.4),
    fixed(),
  ]);

  var fpsMeter = add([
    text('FPS: -'),
    pos(UIscaler*0.1,UIscaler*0.9),
    scale(UIscaler/150),
    origin('topleft'),
    layer('ui'),
    fixed(),
  ]);

  add([
    sprite('applesauce'),
    scale(UIscaler/64),
    layer('ui2'),
    origin('botleft'),
    pos(UIscaler*0.1,height()-UIscaler*1.1),
    opacity(0.7),
    fixed(),
    "sauceCounter"
  ])

  const sauceCountDisplay = add([
    text('0'),
    scale(UIscaler/80),
    pos(UIscaler*1.1,height()-UIscaler*1.1),
    origin('botleft'),
    layer('ui2'),
    opacity(0.7),
    fixed(),
    "sauceCounter"
  ]);

  const isPoisonedDisplay = add([
    text('POISONED'),
    scale(UIscaler/95),
    pos(0,0),
    origin('topleft'),
    opacity(0),
    layer('ui'),
    z(7),
    fixed(),
    color(127,0,230)
  ]);

  add([
    sprite('money'),
    scale(UIscaler/64),
    layer('ui2'),
    origin('botleft'),
    pos(UIscaler*0.1,height()-UIscaler*0.1),
    opacity(0.8),
    fixed(),
    "moneyCounter"
  ])

  const moneyCounter = add([
    text('0'),
    scale(UIscaler/80),
    pos(UIscaler*1.1,height()-UIscaler*0.1),
    origin('botleft'),
    layer('ui2'),
    opacity(0.7),
    fixed(),
    "moneyCounter"
  ]);

  add([
    rect(width(), UIscaler*0.4),
    pos(0, UIscaler*0.7),
    color(0,0,0),
    layer('ui'),
    z(10),
    fixed(),
    "bossBar"
  ]);
  const bossBarProgress = add([
    rect(width(), UIscaler*0.3),
    pos(0, UIscaler*0.75),
    color(0,150,200),
    layer('ui'),
    z(11),
    fixed(),
    "bossBar",
    "bossBarProgress"
  ]);
  const bossBarText = add([
    text('BOSS INCOMING...'),
    pos(0,UIscaler*0.75),
    origin('topleft'),
    scale(UIscaler/235),
    color(0,150,200),
    layer('ui'),
    z(12),
    fixed(),
    "bossBar",
    "bossBarText"
  ]);


  const abilityActive = add([
    text('Ability on cooldown!\n0.0s'),
    pos(width()- UIscaler*0.5 - (UIscaler*0.8), UIscaler*1.1),
    origin('topright'),
    scale(UIscaler/180),
    layer('ui'),
    z(15),
    fixed(),
  ]);

  const abilityActiveBG = add([
    rect(UIscaler*5.3 + (UIscaler*0.8), UIscaler*1),
    pos(width()- UIscaler*0.3, UIscaler*1),
    origin('topright'),
    color(0,0,0),
    opacity(0.5),
    layer('ui'),
    z(14),
    fixed(),
  ]);

  var abilityIcon = {};
  var hasAbility = false;
  var abilityNum;
  for (let i = 0; i < shopItems[4].length; i++) {
      if (shopItems[4][i].active) {
        hasAbility = true;
        abilityNum = i;
      };
  };
  var curAbility = shopItems[4][abilityNum];

  if (hasAbility) {
    abilityIcon = add([
      sprite(curAbility.icon),
      pos(width()- UIscaler*0.4, UIscaler*1.1),
      origin('topright'),
      scale(UIscaler*0.8/64),
      layer('ui'),
      z(16),
      fixed(),
    ]);
  };




  if (gameSettings.joystick) {
    var joystickScaler = scaler * joystickRadius;
    var joystickCenter = vec2(scaler*1.8 + joystickScaler,
        height() - scaler*3.2 - joystickScaler);

    /*every('moneyCounter', (m) => {
      m.pos.x += joystickScaler * 2.5;
    });
    every('sauceCounter', (m) => { 
      m.pos.x += joystickScaler * 2.5;
    });*/
    
    add([
      pos(joystickCenter),
      circle(joystickScaler),
      color(150,150,150),
      layer('ui'),
      opacity(0.3),
      outline(scaler/30, BLACK),
      fixed(),
      "joystickMain"
    ]);

    var jsStick = add([
      pos(joystickCenter),
      circle(joystickScaler/3),
      color(80,80,80),
      layer('ui'),
      opacity(0.3),
      outline(scaler/30, BLACK),
      fixed(),
      area(),
      "joystickStick"
    ]);
  };


  




  every('bossBar', (bb) => {
    bb.pos.x += width()*2;
  });

  function fadeIn() {
    every('over2', (o) => {
      o.opacity -= 0.1;
      if (!gameSettings.transitions) o.opacity = 0;
      if (o.opacity > 0) {
        setTimeout(() => {
          fadeIn();
        }, 100);
      };
    });
  };
  fadeIn();

  function fadeOut() {
    var nextDelay = 500;
    every('over2', (o) => {
      o.opacity += 0.1;
      if (!gameSettings.transitions) {
        o.opacity = 1;
        nextDelay = 0;
      };
      if (o.opacity >= 1) {
        setTimeout(() => {
          go('replayTransition');
        }, nextDelay);
      } else {
        setTimeout(() => {
          fadeOut();
        }, 100);
      };
    });
  };

  function forceQuit() {
    if (!quit && !dead && gameSettings.quitButton) {
      quit = true;
      play('explosion');
      if (itemOwned('rageQuit')) {
        addBoom(player.pos, 15, 35, 5);
      } else {
        addBoom(player.pos, 1, 4, 5);
      };
      shake(scaler/7);
      player.health = 0;
    };
  };
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////

  // abfunc
  function useAbility() {
    var hasAbility = false;
    var abilityNum;
    for (let i = 0; i < shopItems[4].length; i++) {
      if (shopItems[4][i].active) {
        hasAbility = true;
        abilityNum = i;
      };
    };
    if (hasAbility && abilityCooldown <= 0) {
      abilityActive.opacity = 1;
      abilityActiveBG.opacity = 0.5;
      abilityIcon.opacity = 1;

      var curAbility = shopItems[4][abilityNum];
      abilityCooldown = curAbility.cooldown * (1 -itemOwned('abilityCooldown')*0.1);

      //////////
      
      if (itemOwned('randomSnipe')) {
        var enemyCount = 0;
        every('enemy', (e) => { enemyCount++; });
        var enemySnipe = randi(0, enemyCount);

        var enemyCount = 0;
        every('enemy', (e) => {
          if (enemySnipe == enemyCount) {
            e.health = 0;
          };
          enemyCount++;
        });

      /////////////////
      /////////////////
        
      } else if (itemOwned('appleFan')) {
        for (let i = 0; i < 16; i++) {
          setTimeout(() => {
            every('enemy', (e) => {
              let distanceToPlayer = Math.sqrt(Math.abs(e.pos.x - player.pos.x)**2 + Math.abs(e.pos.y - player.pos.y)**2) /scaler;

              e.pos.x += (Math.cos(deg2rad(e.angle-90)) * scaler/(distanceToPlayer*2)) *1.5;
    e.pos.y += (Math.sin(deg2rad(e.angle-90)) * scaler/(distanceToPlayer*2)) *1.5;
            });
          }, 10*i)
        };

      /////////////////
      /////////////////

      } else if (itemOwned('360bullets')) {
        turnToMouse = false;
        for (let i = 0; i < 30; i++) {
          setTimeout(() => {
            player.angle += 360/30;
            shoot();
          }, i);
        };

        setTimeout(() => {
          turnToMouse = true;
        }, 35);
        

      /////////////////
      /////////////////

      } else if (itemOwned('noDamage')) {
        incomingDamageMulti = 0;
        
        setTimeout(() => {
          incomingDamageMulti = 1;
        }, 4700);
        setTimeout(() => {
          incomingDamageMulti = 0;
        }, 4800);
        
        setTimeout(() => {
          incomingDamageMulti = 1;
        }, 4900);
        setTimeout(() => {
          incomingDamageMulti = 0;
        }, 5000);
        
        setTimeout(() => {
          incomingDamageMulti = 1;
        }, 5100); // not 5s ;)

      /////////////////
      /////////////////
        
      } else if (itemOwned('fruitBasket')) {
        let oldB = bullet;
        
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            let n = randi(0, shopItems[0].length);
            bullet = shopItems[0][n].icon;
          }, 250*i);
        };
        setTimeout(() => {
          bullet = oldB;
        }, 5050);


      /////////////////
      /////////////////
        
      } else if (itemOwned('poisonEveryone')) {
        every('enemy', (e) => {
          e.poison = 8;
        });


      /////////////////
      /////////////////
        
      } else if (itemOwned('doubleDamage')) {
        abDamage = 2;
        setTimeout(() => {
          abDamage = 1;
        }, 5000);

      /////////////////
      /////////////////
        
      } else if (itemOwned('doubleMoney')) {
        abMoney = 2;
        moneyCounter.color = {'r':0, 'g':255, 'b':0};
        setTimeout(() => {
          abMoney = 1;
          moneyCounter.color = {'r':255, 'g':255, 'b':255};
        }, 5000);

      /////////////////
      /////////////////
        
      } else if (itemOwned('slowMotion')) {
        epicSpeedMulti = 0.2; // if u change this number the universe explodes
        setTimeout(() => {
          epicSpeedMulti = 1;
        }, 5000);

      // the end
        
      };

      
    };
  };

  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////
  /////////////////

  function addBoom(poss, min, max, scaleDiv) {
    add([
      sprite('boom'),
      layer('explode'),
      pos(poss),
      scale(scaler/scaleDiv),
      lifespan(1, { fade: 1 }),
      origin('center'),
      rotate(rand(0,360)),
      area({scale: 0.6}),
      "explosion",
      {
        'dMin': min,
        'dMax': max,
        'life': 0
      }
    ]);
  };

  function dmgInd(poss, dmg, poison = false) {
    if (gameSettings.dmgIndicator) {
      var c = [255,0,0];
      if (poison) c = [127,0,230];
      add([
        text(`-${dmg}`),
        pos(poss.x+rand(-scaler/2,scaler/2),
            poss.y+rand(-scaler/2,scaler/2)),
        layer('ui'),
        color(c[0], c[1], c[2]),
        lifespan(0.5, { fade: 0.5 }),
        scale(scaler/300)
      ]);
    };
  };

  function poisonCloud(p, s) {
    add([
      sprite('poisonCloud'),
      pos(p),
      layer('poison'),
      scale(scaler/s),
      rotate(rand(0,360)),
      opacity(0.5),
      area({scale: 0.8}),
      origin('center'),
      "poisonCloud"
    ]);
  };

  var shootDelay = 0;
  function shoot() {

    if (rand(0, 5-itemOwned('extraBullets')/3) < 1.5 && itemOwned('extraBullets') > 0) {
      var extraBullets = Math.floor(rand(1, Math.max(itemOwned('extraBullets')/2, 2)));
    } else { var extraBullets = 0; };

    let bst = bulletStats[bullet];
    if (!dead) {
      play('shoot');
      for (let i = 0; i < bst.amount + extraBullets; i++) {
      let spr = rand(-bst.spread/2,bst.spread/2);

      var isPearOverride = bst.isPear;
      

      var poisonOverride = bst.poison;
      if (itemOwned('extraPoison')) var poisonOverride = Math.max(bst.poison, 5);
      if (bst.isBanana) bananaAngleOverride = 25;
      else bananaAngleOverride = 0;

      let bltID = `${Math.random()}`;

      playerbulletlist[bltID] = add([
        sprite(bullet),
        scale(scaler/bst.scaler *(1+ itemOwned('largerBullets')*0.15)),
        origin('center'),
        layer('bullets'),
        pos(player.pos),
        rotate(player.angle +spr),
        cleanup(1),
        area(),
        lifespan(3, { fade: 0.3 }),
        "playerBullet",
        "bullet",
        {
          'speed': bst.speed,
          'damage': Math.floor(bst.damage *(1+itemOwned('moreDamage')*0.15)),
          'pAngle': player.angle+spr -bananaAngleOverride,
          'poison': poisonOverride,
          'special': {},
          'canBeCollected': 15
        }
      ]);

      for (let i = 0; i < Object.keys(bst).length; i++) {
        if (!(['speed', 'scaler', 'damage', 'spread', 'cooldown', 'amount', 'poison', 'info', 'name'].includes(Object.keys(bst)[i]))) {
          playerbulletlist[bltID].special[Object.keys(bst)[i]] = bst[Object.keys(bst)[i]];
          /*if (itemOwned('everythingExplodes')) {
            playerbulletlist[bltID].special.isPear = true;
          }; */
        };
      };
      //playerbulletlist[bltID];

        
      };
      if (majik && randi(0,10) == 1) {
        var splitOffset = randi(0, 360);
        for (let i = 0; i < 8; i++) {
          add([
            sprite('appleSeed'),
            scale(scaler/170 *(1+ itemOwned('largerBullets')*0.15)),
            origin('center'),
            layer('bullets'),
            pos(player.pos),
            rotate(i * (360/8) +splitOffset),
            cleanup(1),
            area(),
            lifespan(3, { fade: 0.3 }),
            "playerBullet",
            "bullet",
            {
              'speed': 15,
              'damage': Math.floor(30 *(1+itemOwned('moreDamage')*0.15)),
              'pAngle': i * (360/8) +splitOffset,
              'poison': 0,
            }
          ]);
        };
      };
      if (majik && randi(0,5) == 1) {
        add([
          sprite('strongerPoison'),
          scale(scaler/70 *(1+ itemOwned('largerBullets')*0.15)),
          origin('center'),
          layer('bullets'),
          pos(player.pos),
          rotate(randi(0, 360)),
          cleanup(1),
          area(),
          lifespan(3, { fade: 0.3 }),
          "playerBullet",
          "bullet",
          "majikBottel",
          {
            'speed': 20,
            'damage': Math.floor(10 *(1+itemOwned('moreDamage')*0.15)),
            'pAngle': randi(0, 360),
            'poison': 100,
          }
        ]);
      };
    };
  };

  function enemyShoot(e) {
    let bst = bulletStats[e.bullet];

    try {
      var sus = bst.amount;
    } catch (e) {
      alert(e.bullet)
    };

    if (!o_u_r) {
    play('shoot');
    for (let i = 0; i < bst.amount; i++) {
    let spr = rand(-bst.spread/2,bst.spread/2);
    add([
      sprite(e.bullet),
      scale(scaler/bst.scaler),
      origin('center'),
      layer('bullets'),
      pos(e.pos),
      rotate(e.angle +spr),
      cleanup(1),
      area(),
      "enemyBullet",
      "bullet",
      {
        'speed': bst.speed,
        'damage': Math.floor(bst.damage/4 *(1- itemOwned('protection')*0.07)),
        'pAngle': e.angle+spr,
        'poison': bst.poison,
        'special': {},
      }
    ]);
    };
    } else {

      var communismBad = [
        'pls help',
        'im starving',
        'i have no money',
        'bread bad',
        'factory bad',
        'i want property',
        'election pls',
        'youre mean',
        'spare me pls',
        'wheres my family'
      ];
      if (randi(0,6) == 1) {
        add([
          layer('effect'),
          text(choose(communismBad)),
          scale(scaler/150),
          pos(e.pos.x, e.pos.y - scaler/10),
          lifespan(0.5, { fade: 0.4 }),
          origin('center')
        ]);
      };
    };
  };

  

  onCollide('enemy', 'playerBullet', (e,b) => {
    e.health -= b.damage * damageCombo * abDamage;
    xpPoints += 1;
    
    if (itemOwned('damageCombo')) {
      damageCombo += 0.05;
      damageCombo = Math.min(damageCombo, 2);
      destroyAll('damageCombo');
      var val = parseFloat(damageCombo.toFixed(2));
      add([
        text(`x${val} damage`),
        pos(UIscaler*0.1,UIscaler*1.4),
        scale(UIscaler/150),
        origin('topleft'),
        lifespan(1, {fade: 0.5}),
        layer('ui'),
        fixed(),
        color(255,80,0),
        "damageCombo"
      ]);
    };
    if (itemOwned('moneyCombo')) {
      moneyCombo += 0.05;
      moneyCombo = Math.min(moneyCombo, 2);
      destroyAll('moneyCombo');
      var val = parseFloat(moneyCombo.toFixed(2));
      add([
        text(`x${val} money`),
        pos(UIscaler*0.1,UIscaler*(
          itemOwned('damageCombo')
          ? 1.9 : 1.4
        )),
        scale(UIscaler/150),
        origin('topleft'),
        lifespan(1, {fade: 0.5}),
        layer('ui'),
        fixed(),
        color(0,150,0),
        "moneyCombo"
      ]);
    };
      
    if (e.health > 0) play('hit');
    var dmg = Math.floor(b.damage * damageCombo);
    
    if (itemOwned('extraBossDamage') && e.isBoss) {
      e.health -= b.damage/2 *abDamage;
      dmg = Math.floor(b.damage * damageCombo + b.damage/2);
    };

    
    e.pos.x += Math.cos(deg2rad(b.pAngle+90)) * scaler/6 * epicSpeedMulti;
    e.pos.y += Math.sin(deg2rad(b.pAngle+90)) * scaler/6 * epicSpeedMulti;
    dmgInd(e.pos, dmg);
    
    if (b.special.isGrape == true) {
      add([
        sprite('grapeSplatter'),
        layer('ground'),
        pos(b.pos),
        scale(scaler/130),
        lifespan(0.3, { fade: 0.3 }),
        origin('center')
      ]);
    };
    if (b.special.isNuke == true) {
      var expMin = explosionData.nuke.dmg[0] *(1+ itemOwned('strongExplosions')*0.2);
      var expMax = explosionData.nuke.dmg[1] *(1+ itemOwned('strongExplosions')*0.2);
      play('explosion');
      addBoom(b.pos, expMin, expMax, explosionData.nuke.size);
      shake(scaler/explosionData.nuke.shake);
      poisonCloud(b.pos, 16);
    };
    if (b.special.isThermo == true) {
      var expMin = explosionData.thermo.dmg[0] *(1+ itemOwned('strongExplosions')*0.2);
      var expMax = explosionData.thermo.dmg[1] *(1+ itemOwned('strongExplosions')*0.2);
      play('explosion');
      addBoom(b.pos, expMin, expMax, explosionData.thermo.size);
      shake(scaler/explosionData.thermo.shake);
      poisonCloud(b.pos, 12);
    };
    if (b.special.isDurian) {
      poisonCloud(b.pos, 20);
    };
    if (b.poison != 'none') {
      e.poison = Math.max(b.poison,e.poison);
    };
    if (b.special.isPear == true && b.special.isNuke!=true && b.special.isThermo!=true) {
      play('explosion');
      var expMin = explosionData.pear.dmg[0] *(1+ itemOwned('strongExplosions')*0.2);
      var expMax = explosionData.pear.dmg[1] *(1+ itemOwned('strongExplosions')*0.2);
      addBoom(b.pos, expMin, expMax, explosionData.pear.size);
      shake(scaler/explosionData.pear.shake);
    };
    money += Math.floor((randi(1,10) *(1+ itemOwned('moneyBonus')*0.15) *(itemOwned('extraMoneyIncome') ? 1.5 : 1)) * damageCombo) * abMoney;

    function addImpact(p) {
      if (gameSettings.splitSFX) {
        add([
          sprite('impact'),
          layer('explode'),
          pos(p),
          scale(scaler/35),
          lifespan(0.2, { fade: 0.2 }),
          origin('center'),
          rotate(rand(0,360)),
          area()
        ]);
      };
    }; 

    function cap1(str) {
      let capitalized = str.charAt(0).toUpperCase() + str.slice(1);
      return capitalized;
    };
    function low1(str) {
      let capitalized = str.charAt(0).toLowerCase() + str.slice(1);
      return capitalized;
    };

    var isSplittable = false;
    for (let i = 0; i < Object.keys(splitterStats).length; i++) {
      var splitterName = Object.keys(splitterStats)[i];
      if (b.special[`is${cap1( splitterName )}`]) {
        isSplittable = true;
      };
    };
    
    if (isSplittable) {
      
      addImpact(b.pos);

      var splitterCurrent;
      for (let i = 0; i < Object.keys(b.special).length; i++) {
        if (!(['speed', 'scaler', 'damage', 'spread', 'cooldown', 'amount', 'poison', 'info', 'name'].includes(Object.keys(b.special)[i]))) {
          splitterCurrent = splitterStats[
            low1( Object.keys(b.special)[i].slice(2) )
          ];
        };
      };
      
      /*if (b.special.isRaspberry) {
        var splitterCurrent = splitterStats.raspberry;
      } else if (b.special.isPomegranate) {
        var splitterCurrent = splitterStats.pomegranate;
      } else if (b.special.isWatermelon) {
        var splitterCurrent = splitterStats.watermelon;
      } else {
        var splitterCurrent = splitterStats.watermelonSlice;
      };*/
      var splitOffset = randi(0, 360);
      for (let i = 0; i < splitterCurrent.split; i++) {
        add([
          sprite(splitterCurrent.sprite),
          scale(scaler/splitterCurrent.scale *(1+ itemOwned('largerBullets')*0.15)),
          origin('center'),
          layer('bullets'),
          pos(b.pos),
          rotate(i * (360/splitterCurrent.split) +splitOffset),
          cleanup(1),
          area(),
          lifespan(3, { fade: 0.3 }),
          "playerBullet",
          "bullet",
          {
            'speed': 30,
            'damage': Math.floor(splitterCurrent.damage *(1+itemOwned('moreDamage')*0.15)),
            'pAngle': i * (360/splitterCurrent.split) +splitOffset,
            'poison': splitterCurrent.poison,
            'special': {
              'isWatermelonSlice': splitterCurrent.wtmln
            }
          }
        ]);
      };
    };

    if (!b.special.isBanana) destroy(b);
    else {
      b.pAngle -= randi(80,130);
      addImpact(b.pos);
      b.canBeCollected -= 10;
    };

  });

  onCollide('player', 'enemyBullet', (p,b) => {
    p.health -= b.damage * incomingDamageMulti;
    damageCombo = 1;
    moneyCombo = 1;
    if (p.health > 0) play('hit');
    
    p.pos.x += Math.cos(deg2rad(b.pAngle+90)) * scaler/8;
    p.pos.y += Math.sin(deg2rad(b.pAngle+90)) * scaler/8;
    dmgInd(p.pos, b.damage * incomingDamageMulti);
    
    if (b.special.isGrape == true) {
      add([
        sprite('grapeSplatter'),
        layer('ground'),
        pos(b.pos),
        scale(scaler/130),
        lifespan(0.3, { fade: 0.3 }),
        origin('center')
      ]);
    };
    if (b.special.isNuke == true) {
      play('explosion');
      addBoom(b.pos, explosionData.nuke.dmg[0], explosionData.nuke.dmg[1], 0.5);
      shake(scaler/10);
    };
    if (b.special.isThermo == true) {
      play('explosion');
      addBoom(b.pos, explosionData.thermo.dmg[0], explosionData.thermo.dmg[1], 0.5);
      shake(scaler/10);
    };
    if (b.poison != 'none') {
      p.poison = Math.max(b.poison,p.poison);
      if (itemOwned('zeroPoisonDamage')) {
        p.poison = 0;
      };
    };
    if (b.special.isPear == true) {
      play('explosion');
      addBoom(b.pos, explosionData.pear.dmg[0], explosionData.nuke.dmg[1], 22);
      shake(scaler/10);
    };
    destroy(b);
  });
  

  
  onCollide('player', 'playerBullet', (p,b) => {
    if (b.special.isBanana && b.canBeCollected <= 0) {
      destroy(b);
    };
  });
  //explosionResistance

  onCollide('player', 'explosion', (f,e) => {
    var explodeDmgMulti = 1;
    if (itemOwned('zeroExplosionDamage')) {
      explodeDmgMulti = 0;
    };

    damageCombo = 1;
    moneyCombo = 1;
      
    if (e.life < 10) {
      let dmg = incomingDamageMulti * (explodeDmgMulti * (Math.floor(randi(e.dMin, e.dMax) *( 1- 0.1*itemOwned('explosionResistance')))));
      f.health -= dmg;
      dmgInd(f.pos, dmg);
    };
  });
  
  onCollide('enemy', 'explosion', (f,e) => {
    if (e.life < 10) {
      let dmg = randi(e.dMin, e.dMax)*abDamage;
      f.health -= dmg;
      dmgInd(f.pos, dmg);
    };
  });

  var bbpStage = 100;
  function decreaseBossIncoming() {
    var bp = bossBarProgress;
    
    bbpStage -= fpsmod(0.4);
    bp.width = width()/100 *bbpStage;
    
    setTimeout(() => {
      if (bbpStage <= 0) {
        bbpStage = 100;
        bp.color = {r:180, g:0, b:0};
        bp.width = width();
        bossStatus = 'active';
        every('bossBarText', (bt) => {
          bt.text = 'BOSS HEALTH';
          bt.color = {r:180, g:0, b:0};
        });
        add([
          sprite('boolyApple'),
          pos(rand(vec2(-scaler),vec2(width()+scaler,height()+scaler))),
          area(),
          layer('players'),
          origin('center'),
          scale(scaler/20),
          rotate(0),
          "enemy",
          "fighter",
          "boss",
          {
            'cooldown': 0,
            'health': 1000,
            'poison': 0,
            'bullet': choose(['appleSeed','strawberrySeed']),
            'isBoss': true 
          }
        ]);
      } else {
        decreaseBossIncoming();
      };
    }, 10);
  };

  var bossStatus = 'none';
  var framesSinceBoss = 0;
  var finaleTimer = 0;

  // ON UPDATE (duh)

  onUpdate(() => {
    
    framesSinceBoss++;

    abilityCooldown -= fpsmod(1/60);
    abilityActive.text = `Ability on cooldown!\n${abilityCooldown .toFixed(1)}s`
    if (abilityCooldown <= 0) {
      abilityActive.opacity = 0;
      abilityActiveBG.opacity = 0;
      abilityIcon.opacity = 0;
    };

    if (!dead) camPos(player.pos);
    //else camPos(center());

    var onShootButton = (mousePos().x > width()-UIscaler*2 &&  mousePos().y > height()-UIscaler*2);
    if (!gameSettings.mobile) onShootButton = false;
    

    if (!onShootButton && !gameSettings.joystick) { 
      let dx = toWorld(mousePos()).x - player.pos.x;
      let dy = player.pos.y - toWorld(mousePos()).y;
      let playerAngleRad = Math.atan2(dy, dx);
      if (turnToMouse) player.angle = rad2deg(playerAngleRad)*-1 -90;
    };
    //////////boonana

    var onShootButton2 = (mousePos().x > width()-UIscaler*2 &&  mousePos().y > height()-UIscaler*2);


    if (gameSettings.joystick) {
      //let distToJoystick = Math.sqrt(Math.abs(joystickCenter.x - mousePos().x)**2 + Math.abs(joystickCenter.y - mousePos().y)**2) /scaler;
      //let onJoystick = distToJoystick <= 1.5 ? true:false;
      
      let dx = mousePos().x - joystickCenter.x;
      let dy = joystickCenter.y - mousePos().y;
      let playerAngleRad = Math.atan2(dy, dx);
      if (turnToMouse && !onShootButton2) player.angle = rad2deg(playerAngleRad)*-1 -90;
    };

    /////////

    
        ////
    if (mouseIsDown() && !onShootButton && !victory) {

      var buffSpeedMulti = 1;
      if (itemOwned('lowHealthSpeed') &&
      player.health <= 20) {
        buffSpeedMulti = 2;
      };

      if (gameSettings.joystick ) {
      
        /*if (!onShootButton2)*/ jsStick.pos = mousePos();
        
        let dx = mousePos().x - joystickCenter.x;
        let dy = joystickCenter.y - mousePos().y;

        let distTJS = Math.sqrt(Math.abs(joystickCenter.x - mousePos().x)**2 + Math.abs(joystickCenter.y - mousePos().y)**2) /scaler;

        if (distTJS > 1.5) {
          let jsAngleRad = Math.atan2(dy, dx);
          let jsAngle = rad2deg(jsAngleRad*-1);
  
          let radius = scaler*1.5;
          let angSin = Math.sin(deg2rad(jsAngle));
          let angCos = Math.cos(deg2rad(jsAngle));

          jsStick.pos.x = joystickCenter.x + radius*angCos;
          jsStick.pos.y = joystickCenter.y + radius*angSin;
        };
        
        /*if (jsStick.pos.x > Math.sin(jsStick.pos.x)*1.5*scaler) {
          jsStick.pos.x = Math.sin(jsStick.pos.x)*1.5*scaler;
        };*/
      };

      player.pos.x += fpsmod((Math.cos(deg2rad(player.angle+90)) * scaler/16 *(1+ itemOwned('moveFaster')*0.1))* buffSpeedMulti);
      player.pos.y += fpsmod((Math.sin(deg2rad(player.angle+90)) * scaler/16 *(1+ itemOwned('moveFaster')*0.1))* buffSpeedMulti);
      // my eyes
    };

    if (gameSettings.mobile) {
      shootBtn.pos.x = width()
      quitBtn.pos.x = width()-UIscaler*3;
      abilityBtn.pos.x = width()-UIscaler*2;

      var hasAbility = false;
      for (let i = 0; i < shopItems[4].length; i++) {
        if (shopItems[4][i].active) {
          hasAbility = true;
        };
      };
      if (!hasAbility) {
        abilityBtn.pos.x = -width();
        quitBtn.pos.x = width()-UIscaler*2;
      };
      
    } else {
      shootBtn.pos.x = -width();
      quitBtn.pos.x = -width();
      abilityBtn.pos.x = -width();
      if (!itemOwned('autoFire') & isKeyPressed('f')) {
        shoot();
      };
      if (itemOwned('autoFire') & isKeyDown('f')) {
        if (shootDelay <= 0) {
          shoot();
          shootDelay = 7;
        };
      }
    };


    if (gameSettings.joystick && !mouseIsDown()) {
      jsStick.pos = joystickCenter;
    };

    
    // more cheats jejeje
    
    function spinningApple() {
      player.angle += 360/20;
      shoot();
      if (i != 19) {
        i++;
        setTimeout(spinningApple, 10)
      } else {
        turnToMouse = true;
        for (let j = 0; j < 10; j++) {
          setTimeout(shoot, j*(50))
        }
      };
    };
    if (appleGoSpiiiiin) {
      if (isKeyPressed('f')) {
        turnToMouse = false;
        i = 0;
        spinningApple();
      };
    };

    ///////

    
      
    

    every('playerBullet', (b) => {
      let xDiff = fpsmod(Math.cos(deg2rad(b.pAngle+90)) * scaler*(b.speed/100) *(1+ itemOwned('fasterBullets')*0.2));
      let yDiff = fpsmod(Math.sin(deg2rad(b.pAngle+90)) * scaler*(b.speed/100) *(1+ itemOwned('fasterBullets')*0.2));

      if (gameSettings.fpsFix) {
        b.pos.x += Math.min(scaler, xDiff);
        b.pos.y += Math.min(scaler, yDiff);
      } else {
        b.pos.x += xDiff;
        b.pos.y += yDiff;
      };
      
      if (b.special.isBanana) {
        b.angle += fpsmod(25);
        b.pAngle += fpsmod(7);
        b.canBeCollected -= 1;
      };
    });

    every('enemyBullet', (b) => {
      b.pos.x += fpsmod(Math.cos(deg2rad(b.pAngle+90)) * scaler*(b.speed/100) * epicSpeedMulti);
      b.pos.y += fpsmod(Math.sin(deg2rad(b.pAngle+90)) * scaler*(b.speed/100) * epicSpeedMulti);
    });

    every('majikBottel', (m) => {
      m.angle += fpsmod(7);
    });

    if (applecalypse) appleSpawnerSpeeder = 0;

    appleSpawnerSpeeder = Math.max(0, appleSpawnerSpeeder)
    spawnDelay = Math.max(0.4, spawnDelay);
    
    
    var rn = new Date().getTime() /1000;
    if (!dead) {
    if (stage == 1 && appleSpawnerSpeeder < 15) {
      stage = 2;
      add([
        text('Final Stretch!'),
        pos(width()/2, height()*0.25),
        scale(UIscaler/80),
        origin('center'),
        lifespan(2, {fade: 0.5}),
        layer('ui'),
        fixed()
      ]);
      
    } else if (stage == 2 && appleSpawnerSpeeder == 0) {
      stage = 3;
      finaleTimer = new Date().getTime() /1000;

    
    } else if (stage == 3 
      && 
    rn - finaleTimer >= 20) {
      stage = 4;
      appleSpawnerSpeeder = 10000000;
      every('enemy', (e) => {
        e.health = 0;
      });

      victory = true;
      camScale(1);
      turnToMouse = false;
      xpPoints += 5;

      moneyCounter.color = {r:0,g:255,b:0};
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          money += Math.floor((100 *(itemOwned('extraMoneyIncome') ? 1.5 : 1)) * damageCombo) * abMoney;
        }, 5*i+10) 
      };
      setTimeout(() => {
        moneyCounter.color = {r:255,g:255,b:255};
      }, 515)

      setTimeout(() => {
        add([
          rect(width()+200, height()+200),
          pos(-100,-100),
          color(0,0,0),
          layer('overlay'),
          opacity(0.7),
          fixed(),
        ]);

        add([
          text('Victory!', { font: 'sinko' }),
          scale(UIscaler/8),
          layer('ui2'),
          pos(width()/2, height()*0.3),
          origin('center'),
          fixed(),
        ]);

        every('sauceCounter', (c) => { c.opacity = 1; });
        every('moneyCounter', (c) => { c.opacity = 1; });

        const menuTryAgain = add([
          text('Play Again'),
          scale(UIscaler/100),
          pos(width()/2, height()*0.5),
          origin('center'),
          layer('ui2'),
          area(),
          fixed(),
          'retryButton',
          'yellowHover'
        ]);

        const menuGoToMain = add([
          text('Main Menu'),
          scale(UIscaler/100),
          pos(width()/2, height()*0.6),
          origin('center'),
          layer('ui2'),
          area(),
          fixed(),
          'menuButton',
          'yellowHover'
        ]);

        const menuShop = add([
          text('Shop'),
          scale(UIscaler/100),
          pos(width()/2, height()*0.7),
          origin('center'),
          layer('ui2'),
          area(),
          fixed(),
          'shopButton',
          'yellowHover'
        ]);

        onClick('retryButton', (b) => { 
          play('click');
          fadeOut();
        });
        onClick('menuButton', (b) => { play('click'); go('menu'); });
        onClick('shopButton', (b) => { play('click'); go('shop'); });

      }, 2000);
    };
    };

    if (stage == 3 && Math.floor(rn-finaleTimer) >= 10 && Math.floor(rn-finaleTimer) < 20 && !dead) {
      add([
        text(20 - Math.floor(rn-finaleTimer)),
        pos(width()/2, height()*0.25),
        scale(UIscaler/80),
        origin('center'),
        lifespan(0.2, {fade: 0.5}),
        layer('ui'),
        fixed()
      ]);
    };
    
    every('player', (p) => {
      if (victory) {
        p.angle += 5;
      };
    });
    
    

    // enemy spawning

    if (t() - lastSpawn >= spawnDelay) {
      lastSpawn = t();
      let newEnemyPos = rand(vec2(0), vec2(width(),height()));
      let distanceToPlayer = Math.sqrt(Math.abs(newEnemyPos.x - player.pos.x)**2 + Math.abs(newEnemyPos.y - player.pos.y)**2) /scaler;

      if (distanceToPlayer > spawnPadding && !dead) { 
        var enemyBullets = [];

        var weightTotal = enemyData[0].weight
          + enemyData[1].weight
          + enemyData[2].weight;
        var enemyRand = randi(0,weightTotal);
        var thisEnemy;
        
        if (enemyRand < enemyData[0].weight) {
          thisEnemy = enemyData[0];
        } else if (enemyRand < enemyData[0].weight +
        enemyData[1].weight) {
          thisEnemy = enemyData[1];
        } else {
          thisEnemy = enemyData[2];
        };

        var ebkeys = Object.keys(thisEnemy.bullets);
        for (let i = 0; i < ebkeys.length; i++) {
           for (let j = 0; j < thisEnemy.bullets[ebkeys[i]]; j++) {
             enemyBullets.push(ebkeys[i]);
           };
        };
          
        add([
          sprite(thisEnemy.icon),
          pos(newEnemyPos),
          area(),
          layer('players'),
          origin('center'),
          scale(scaler/64),
          rotate(0),
          "enemy",
          "fighter",
          {
            'cooldown': 0,
            'health': thisEnemy.health,
            'poison': 0,
            'bullet': choose(enemyBullets)
          }
        ]);
      };
    };

    if (player.health <= 0 && !dead) {
      add([
        sprite('applesauce'),
        pos(player.pos),
        layer('ground'),
        scale(scaler/32),
        rotate(rand(0,360)),
        lifespan(3, { fade: 2.5 }),
        origin('center')
      ]);
      play('sauced');

      if (itemOwned('deathExplosion')) {
        addBoom(player.pos, 25, 45, 8);
      };
      
      player.pos.x = width()*123;
      //camScale(1);
      dead = true;

      moneyCounter.color = {r:255,g:0,b:0};
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          money = Math.max(0, money-1);
        }, 5*i+10) 
      };
      setTimeout(() => {
        moneyCounter.color = {r:255,g:255,b:255};
      }, 515)

      setTimeout(() => {
        add([
          rect(width()+200, height()+200),
          pos(-100,-100),
          color(0,0,0),
          layer('overlay'),
          opacity(0.7),
          fixed(),
        ]);

        add([
          text('Applesauced!', { font: 'sinko' }),
          scale(UIscaler/8),
          layer('ui2'),
          pos(width()/2, height()*0.3),
          origin('center'),
          fixed(),
        ]);

        every('sauceCounter', (c) => { c.opacity = 1; });
        every('moneyCounter', (c) => { c.opacity = 1; });

        const menuTryAgain = add([
          text('Play Again'),
          scale(UIscaler/100),
          pos(width()/2, height()*0.5),
          origin('center'),
          layer('ui2'),
          area(),
          fixed(),
          'retryButton',
          'yellowHover'
        ]);

        const menuGoToMain = add([
          text('Main Menu'),
          scale(UIscaler/100),
          pos(width()/2, height()*0.6),
          origin('center'),
          layer('ui2'),
          area(),
          fixed(),
          'menuButton',
          'yellowHover'
        ]);

        const menuShop = add([
          text('Shop'),
          scale(UIscaler/100),
          pos(width()/2, height()*0.7),
          origin('center'),
          layer('ui2'),
          area(),
          fixed(),
          'shopButton',
          'yellowHover'
        ]);

        onClick('retryButton', (b) => { 
          play('click');
          fadeOut();
        });
        onClick('menuButton', (b) => { play('click'); go('menu'); });
        onClick('shopButton', (b) => { play('click'); go('shop'); });

      }, 2000);
    };


    every('enemy', (en) => {
      let dx = player.pos.x - en.pos.x;
      let dy = en.pos.y - player.pos.y;
      let enemyAngleRad = Math.atan2(dy, dx);

      if (dead) {
        en.angle += 5;
      } else {
        en.angle = rad2deg(enemyAngleRad)*-1 -90;
      };

      var enemyShootRange = 3;
      if (en.isBoss) enemyShootRange = 6;
      
      if ((Math.sqrt(Math.abs(en.pos.x - player.pos.x)**2 + Math.abs(en.pos.y - player.pos.y)**2) /scaler) < enemyShootRange) {
        if (en.cooldown <= 0 && !dead) {
          if (epicSpeedMulti < 1) {
            if (Math.floor(time()) % 5 == 0) enemyShoot(en);
          } else {
            enemyShoot(en);
          };
          
          en.cooldown = bulletStats[en.bullet].cooldown*5;
        };

      } else if (!dead) {
        var enemySpeed = 0.02;
        if (en.isBoss) enemySpeed = 0.05;
        en.pos.x += fpsmod(Math.cos(deg2rad(en.angle+90)) * scaler*0.02 * epicSpeedMulti);
        en.pos.y += fpsmod(Math.sin(deg2rad(en.angle+90)) * scaler*0.02 * epicSpeedMulti);
      };

      en.cooldown--;
      var basicKillReward = 100;
      if (en.isBoss) basicKillReward = 1000;
      if (en.health <= 0) {
        play('sauced');
        sauceCount++;
        add([
          sprite('applesauce'),
          pos(en.pos),
          layer('ground'),
          scale(scaler/64),
          rotate(rand(0,360)),
          lifespan(1, { fade: 1 }),
          origin('center')
        ]);
        money += Math.floor((basicKillReward *(1+ itemOwned('moneyBonus')*0.15) *(itemOwned('extraMoneyIncome') ? 1.5 : 1)) * damageCombo) * abMoney;
        if (en.isBoss) {
          every('bossBar', (bb) => {
            bb.pos.x += width()*2;
          });
          var bbpStage = 100;
          framesSinceBoss = 0;
          bossBarProgress.color = {r:0, g:150, b:200};
          bossBarText.color = {r:0, g:150, b:200};
          bossBarText.text = 'BOSS INCOMING...';
          bossStatus = 'none';
        };
        if (itemOwned('killHealth')) {
          player.health += lifestealHealthGain;
        };
        destroy(en);
        xpPoints += 5;
      };
    });
    // END EVERY ENEMY

    onClick('shoot', () => {
      if (!itemOwned('autoFire')) {
        if (shootDelay <= 0) {
          shoot();
          shootDelay = 1;
        };
        shootBtn.opacity = 1;
        setTimeout(() => {
          shootBtn.opacity = 0.7;
        }, 50);
      };
    });

    onHover('shoot', () => {
      if (itemOwned('autoFire') && isMouseDown()) {
        if (shootDelay <= 0) {
          shoot();
          shootDelay = 7;
        };
        shootBtn.opacity = 1;
        setTimeout(() => {
          shootBtn.opacity = 0.7;
        }, 50);
      };
    });
    shootDelay -= fpsmod(1);

    onClick('quit', () => {
      if (!dead) forceQuit();
    });

    onClick('ability', () => {
      if (!dead) useAbility();
    });

    var maxHealth = 100 + itemOwned('maxHealth')*10;

    if (player.health < maxHealth && !dead) player.health += fpsmod(0.05 *(1+ itemOwned('regeneration')*0.3));
    if (player.health > maxHealth) player.health = maxHealth;
    if (stupidMode) player.health = maxHealth;

    healthBar.width = width()/100 *player.health;
    if (player.health > 100) {
      healthBarTWO.width = width()/(maxHealth-100) *(player.health-100);
    } else {
      healthBarTWO.width = 0;
    };
    
    if (!dead && incomingDamageMulti == 1) {
      if (player.poison > 0) {
        healthBar.color = {r:127,g:0,b:230};
        isPoisonedDisplay.opacity = 1;
      } else {
        healthBar.color = {r:255,g:0,b:0};
        isPoisonedDisplay.opacity = 0;
      };
      
    } else if (!dead && incomingDamageMulti == 0) {
      healthBar.color = {r:130,g:200,b:255};
      isPoisonedDisplay.opacity = 0;
      
    } else {
      isPoisonedDisplay.opacity = 0;
    };

    sauceCountDisplay.text = sauceCount;
    moneyCounter.text = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    every('explosion', (ex) => {
      ex.angle += 5;
      ex.life += fpsmod(1);
    });

    every('fighter', (f) => {
      if (randi(0,6) == 2 && f.poison > 0 && gameSettings.poisonBubbles) {
        add([
          sprite('poisonBubble'),
          pos(f.pos.x+rand(-scaler/2,scaler/2),f.pos.y+rand(-scaler/2,scaler/2)),
          layer('poison'),
          lifespan(0.5, { fade: 0.5 }),
          scale(scaler/randi(300,500)),
          "poisonBubble"
        ]);
      };
    });

    every('poisonBubble', (pb) => {
      pb.pos.y -= scaler/50;
    });

    if (isKeyPressed('a') 
      && 
    !gameSettings.mobile) {
      forceQuit();
    };

    if (isKeyPressed('s')
       &&
    !gameSettings.mobile) {
      useAbility();
    };

    if (framesSinceBoss > 200 && randi(0,2000) == 1 && bossStatus == 'none' && !dead && stage == 1) {
      bossStatus = 'pending';
      every('bossBar', (bb) => {
        bb.pos.x -= width()*2;
      });
      bossBarProgress.width = width();
      add([
        text('BOSS INCOMING'),
        pos(center()),
        origin('center'),
        scale(UIscaler/50),
        color(255,255,255),
        layer('ui'),
        lifespan(2, { fade: 0.3 }),
        fixed()
      ]);
      var bbpStage = 100;
      decreaseBossIncoming();
    };

    if (bossStatus == 'active'
      ||
    bossStatus == 'pending') {
      fpsMeter.pos.y = UIscaler*1.2;
    } else {
      fpsMeter.pos.y = UIscaler*0.9;
    };

    every('boss', (b) => {
      every('bossBarProgress', (bp) => {
        if (bossStatus == 'active') {
          bp.width = width()/1000 *b.health
        } else {
          bp.width = width();
        }
      });
    });

    if (gameSettings.quitButton) {
      quitBtn.opacity = 0.7;
    } else { quitBtn.opacity = 0; };

    appleSpawnerSpeeder -= fpsmod(0.02);
    spawnDelay = appleSpawnerSpeeder/30;
    
    every('ch', (ch) => {ch.pos = toWorld(mousePos());});


    if (isKeyDown('g') && machineSeed) {
      shoot()
    };


    
    every('fighter', (f) => {
      if (((0 > f.pos.x 
       || 
      f.pos.x > width())
         ||
      (0 > f.pos.y 
       || 
      f.pos.y > height()))
         
         &&
      ((f.pos.x < width()*m1 || f.pos.x > width()*m1+scaler*3) 
      ||
      (f.pos.y < height()*m2 || f.pos.y > height()*m2+scaler*2))) {
  
        f.health -= fpsmod(borderDamage)*incomingDamageMulti;
      };


    });

    if (((0 > player.pos.x 
       || 
      player.pos.x > width())
         ||
      (0 > player.pos.y 
       || 
      player.pos.y > height()))
         
         &&
      ((player.pos.x < width()*m1 || player.pos.x > width()*m1+scaler*3) 
      ||
      (player.pos.y < height()*m2 || player.pos.y > height()*m2+scaler*2))
       
       && !dead) {
  
      add([
        text('Out of Bounds!'),
        pos(width()/2, height()*0.7),
        scale(UIscaler/90),
        origin('center'),
        lifespan(0.2),
        layer('ui'),
        color(255,255,255),
        fixed(),
        "outofbounds"
      ]);
    };

    if (victory) {
      every('enemy', (e) => {
        e.health = 0;
      });
      player.health = 100;
    };



    every('npcMaybe', (n) => {
      let dx = player.pos.x - n.pos.x;
      let dy = n.pos.y - player.pos.y;
      let playerAngleRad = Math.atan2(dy, dx);
      n.angle = rad2deg(playerAngleRad)*-1 -90;
    });

    every('poisonCloud', (p) => {
      p.angle -= fpsmod(1);
      p.opacity -= fpsmod(0.005);
      if (p.opacity <= 0.01) {
        destroy(p);
      };
    });

    if (abDamage == 2) {
      if (rand(1, 1/dt()) < 4) {
        let zpos = {
          x: player.pos.x +
           (rand(0,1)-0.5)*scaler,
          y: player.pos.y +
           (rand(0,1)-0.5)*scaler,
          };
      
        add([
          sprite('zap'),
          scale(scaler/64 /3),
          pos(zpos),
          layer('poison'),
          lifespan(0.5, {fade:0.5})
        ]);
      };
    };

    if (buffSpeedMulti == 2 && player.health <= 20) {
      if (rand(1, 1/dt()) < 5) {
        let zpos = {
          x: player.pos.x +
           (rand(0,1)-0.5)*scaler,
          y: player.pos.y +
           (rand(0,1)-0.5)*scaler,
          };
      
        add([
          sprite('speedParticle'),
          scale(scaler/64 /3),
          pos(zpos),
          layer('poison'),
          lifespan(0.5, {fade:0.5})
        ]);
      };
    };

    if (epicSpeedMulti == 0.2) {
      every('enemy', (e) => {
        if (rand(1, 1/dt()) < 3) {
          let zpos = {
            x: e.pos.x +
             (rand(0,1)-0.5)*scaler,
            y: e.pos.y +
             (rand(0,1)-0.5)*scaler,
            };
        
          add([
            sprite('slowParticle'),
            scale(scaler/64 /3),
            pos(zpos),
            layer('poison'),
            lifespan(0.4, {fade:0.4})
          ]);
        };
      });
    };
    

  });
  // END OF ACTION beanzz

  onCollide('enemy', 'poisonCloud', (e,p) => {
    e.poison = Math.max(e.poison, 6)
    e.poison++;
  });

  if (addGameGrid) {
  onDraw(() => {
    var scheme;
    if (gameSettings.bgContrast) {
      scheme = bgColors.border.contrast;
    } else {
      scheme = bgColors.border.normal;
    }; // gridData.density
    
    for (let i = -gridData.density; i <= gridData.density; i++) {
      var xPos = width()/2 + width()*i/(gridData.density*2 +2);
      var yPos = height()/2 + width()*i/(gridData.density*2 +2);
      drawLine({
        p1: vec2(xPos, 0),
        p2: vec2(xPos, height()),
        width: scaler/gridData.width,
        color: rgb(scheme[0],scheme[1],scheme[2]),
        opacity: gridData.opacity
      });
      drawLine({
        p1: vec2(0, yPos),
        p2: vec2(width(), yPos),
        width: scaler/gridData.width,
        color: rgb(scheme[0],scheme[1],scheme[2]),
        opacity: gridData.opacity
      });
    };
  });
  };



  loop(0.5, () => {
    fps = Math.ceil(1/dt());

    if (fps <= 15) {
      fpsMeter.color = {r:255,g:0,b:0};
    } else if (fps < 30) {
      fpsMeter.color = {r:255,g:200,b:0};
    } else { fpsMeter.color = {r:255,g:255,b:255}; };

    fpsMeter.text = 'FPS: ' + fps;

    ////////////
    
    every('player', (f) => {
      if (f.poison > 0) {
        let dmg = incomingDamageMulti * Math.floor((5 + f.poison/2) *(1- itemOwned('poisonResistance')*0.1))
        dmgInd(f.pos, dmg, true);

        if (itemOwned('zeroPoisonDamage') || incomingDamageMulti == 0) {
          f.poison = 0;
        } else {
          f.health -= dmg;
          f.poison--;
        };

          
      };
    });

    every('enemy', (f) => {
      if (f.poison > 0) {
        let dmg = Math.floor(5 + f.poison/2) *abDamage;
        dmgInd(f.pos, dmg, true);

        f.health -= dmg;
        f.poison--;
      };
    });
    
  });

  onMouseMove(() => {
    every('yellowHover', (b) => {
      b.color = {r:255,g:255,b:255};
    });
  });
  onHover('yellowHover', (b) => {
    b.color = {r:255,g:255,b:0};
  });

});






scene('replayTransition', () => {
  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0)
  ]);

  go('game')
});