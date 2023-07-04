var isInMajikLand = false;

setInterval(() => {
  if (isInMajikLand) {
    hash(epicPasswordVerifier)
    .then((c) => {
      if (c != majikPassword) go('menu');
    });
  };
}, 500);




scene('majikLand', () => {
  isInMajikLand = true;
  canBeSaved = false;
  
  layers([
    'bg',
    'particles',
    'response',

    'betterBG',
    'ui',
  ],'bg');

  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('betterBG')
  ]);
  
  const bg = add([
    rect(width() - UIscaler, height() - UIscaler),
    pos(UIscaler/2, UIscaler/2),
    color(30,0,30),
    layer('betterBG'),
    z(5)
  ]);

  add([
    text('Back'),
    scale(UIscaler/100),
    pos(UIscaler*0.1,UIscaler*0.1),
    origin('topleft'),
    area(),
    layer('ui'),
    "backButton",
    'pinkHover'
  ]);

  onMouseMove(() => {
    every('pinkHover', (b) => {
      b.color = {r:255,g:255,b:255};
    });
  });
  onHover('pinkHover', (b) => {
    b.color = {r:255,g:180,b:255};
  });

  onClick('backButton', (b) => {
    play('click');
    isInMajikLand = false;
    go('menu');
  });

  onUpdate(() => {
    bg.color = {
      r: randi(15,70), 
      g: 0, 
      b: randi(15,70)
    };
    bg.pos = {
      x: UIscaler/2 +randi(-UIscaler/3, UIscaler/3),
      y: UIscaler/2 +randi(-UIscaler/3, UIscaler/3)
    };

    if (!isInMajikLand) go('menu');
  });



  // AAAAAAAAAAAAAAAAA
  // AAAAAAAAAAAAAAAAA
  // AAAAAAAMOGUSAAAAA
  // AAAAAAAAAAAAAAAAA
  // AAAAAAAAAAAAAAAAA

  function cheatMSG(t) {
    add([
      text(t),
      pos(width()/2 +randi(-UIscaler,UIscaler), 
        height()/2 +randi(-UIscaler,UIscaler)),
      lifespan(0.5, {fade:0.5}),
      scale(UIscaler / 70),
      layer('ui'),
      origin('center'),
      z(12345)
    ]);
  };
  
  add([
    sprite('wizardApple'),
    scale(UIscaler / 25),
    pos(width()/2 - UIscaler*3, 
        height()/2 -UIscaler*2),
    area(),
    layer('ui'),
    origin('center'),
    "majikwizard"
  ]);
  
  add([
    sprite('money'),
    scale(UIscaler / 25),
    pos(width()/2, 
        height()/2 -UIscaler*2),
    area(),
    layer('ui'),
    origin('center'),
    "munni"
  ]);

  add([
    sprite('boolyApple'),
    scale(UIscaler / 25),
    pos(width()/2 + UIscaler*3, 
        height()/2 -UIscaler*2),
    area(),
    layer('ui'),
    origin('center'),
    "boolyMachine"
  ]);

  // second row

  add([
    sprite('communistApple'),
    scale(UIscaler / 25),
    pos(width()/2 - UIscaler*3, 
        height()/2 +UIscaler*2),
    area(),
    layer('ui'),
    origin('center'),
    "kommie"
  ]);
  
  add([
    sprite('strongerPoison'),
    scale(UIscaler / 25),
    pos(width()/2, 
        height()/2 +UIscaler*2),
    area(),
    layer('ui'),
    origin('center'),
    "debugPotion"
  ]);

  /*add([
    sprite('boolyApple'),
    scale(UIscaler / 25),
    pos(width()/2 + UIscaler*3, 
        height()/2 +UIscaler*2),
    area(),
    layer('ui'),
    origin('center'),
    "boolyMachine"
  ]);*/
  

  setTimeout(() => {
    onClick('munni', (m) => {
      money += 1000000;
      cheatMSG('+$1,000,000');
    });
    
    onClick('majikwizard', (m) => {
      majik = !majik;
      o_u_r = false;
      if (majik) cheatMSG('Majik ON');
      else cheatMSG('Majik OFF');
    });

    onClick('boolyMachine', (m) => {
      applecalypse = !applecalypse;
      if (applecalypse) cheatMSG('Applecalypse ON');
      else cheatMSG('Applecalypse OFF');
    });

    onClick('kommie', (m) => {
      o_u_r = !o_u_r;
      majik = false;
      if (o_u_r) cheatMSG('Komunism ON');
      else cheatMSG('Komunism OFF');
    });

    onClick('debugPotion', (m) => {
      debug.inspect = !debug.inspect;
      if (applecalypse) cheatMSG('Debug ON');
      else cheatMSG('Debug OFF');
    });
  }, 1000);

  
});
