var crateOpening;

scene('boxes', () => {
  crateOpening = 'NONE';
  
  layers([
    'bg',
    'particles',
    'response',

    'bg2',
    'ui',
    'label'
  ],'bg');
  
  const bg = add([
    rect(width(), height()),
    pos(0,0),
    color(0,0,0),
    opacity(0.7),
    layer('bg2')
  ]);

  add([
    text('Back'),
    scale(UIscaler/100),
    pos(UIscaler*0.1,UIscaler*0.1),
    origin('topleft'),
    area(),
    layer('ui'),
    "backButton",
    'yellowHover'
  ]);

  add([
    text('Open Boxes', { font: 'sinko' }),
    scale(UIscaler/8),
    layer('ui'),
    pos(width()/2, height()*0.2),
    origin('center'),
  ]);

  

////////////////



  const crate = add([
    sprite('crate'),
    pos(width()/2 -UIscaler/15*50, height()*0.6),
    scale(UIscaler/15),
    area(),
    color(WHITE),
    layer('ui'),
    origin('center'),
    "openCrate",
  ]);
  const cLabel = add([
    text('x0'),
    pos(width()/2 -UIscaler/15*50 + UIscaler*2.2,
      height()*0.6 + UIscaler*1.9),
    scale(UIscaler/70),
    area(),
    color(WHITE),
    layer('label'),
    origin('right'),
    "crateLabel",
  ]);


  //


  const barrel = add([
    sprite('barrel'),
    pos(width()/2 +UIscaler/15*50, height()*0.6),
    scale(UIscaler/15),
    area(),
    color(WHITE),
    layer('ui'),
    origin('center'),
    "openBarrel",
  ]);
  const bLabel = add([
    text('x0'),
    pos(width()/2 +UIscaler/15*50 + UIscaler*2, 
      height()*0.6 + UIscaler*1.9),
    scale(UIscaler/70),
    area(),
    color(WHITE),
    layer('label'),
    origin('right'),
    "barrelLabel",
  ]);
  

  //

  if (shopItems[5][0].owned == 0) {
    crate.color = rgb(100,100,100);
    cLabel.color = RED;
  };
  if (shopItems[5][1].owned == 0) {
    barrel.color = rgb(100,100,100);
    bLabel.color = RED;
  };

  cLabel.text = `x${shopItems[5][0].owned}`;
  bLabel.text = `x${shopItems[5][1].owned}`;


/////////////

  

  onMouseMove(() => {
    every('yellowHover', (b) => {
      b.color = {r:255,g:255,b:255};
    });
  });
  onHover('yellowHover', (b) => {
    b.color = {r:255,g:255,b:0};
  });

  onClick('backButton', (b) => {
    play('click');
    go('shop');
  });

  loop(0.1, () => {
    particle();
  });





  onClick('openCrate', (c) => {
    if (shopItems[5][0].owned > 0) {
      crateOpening = 'c';
      shopItems[5][0].owned--;
      go('opening');
    } else {
      crate.color = rgb(255,100,100);
      setTimeout(() => {
        crate.color = rgb(100,100,100);
      }, 100);
    };
  });
  
  onClick('openBarrel', (b) => {
    if (shopItems[5][1].owned > 0) {
      crateOpening = 'b';
      shopItems[5][1].owned--;
      go('opening');
    } else {
      barrel.color = rgb(255,100,100);
      setTimeout(() => {
        barrel.color = rgb(100,100,100);
      }, 100);
    };
  });
});




//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////
//////////////////////





scene('opening', () => {
  if (crateOpening == 'c')
    var curSprite = 'crate';
    var openCount = 1;
  if (crateOpening == 'b')
    var curSprite = 'barrel';
    var openCount = 4;

  layers([
    'bg',
    'top'
  ],'top');
  
  const bg = add([
    rect(width(), height()),
    pos(0,0),
    color(0,0,0),
    opacity(0.7),
    layer('bg')
  ]);
  
  const box = add([
    sprite( curSprite ),
    pos(center()),
    scale(UIscaler/10),
    area(),
    color(WHITE),
    layer('top'),
    origin('center'),
    "openCrate",
  ]);

  var ot = 0;
  onUpdate(() => {
    ot += fpsmod(1/60);
    let n = Math.min(ot*0.196, 0.6);
    let m = Math.min(ot*100, 255);
    if (m == 255) { 
      m = 0; n = 0; 
      for (let i = 0; i < openCount; i++) { opened(); }; 
    };

    bg.color = rgb(m,m,m);
    box.pos.x = center().x + rand(-n, n)*UIscaler;
    box.pos.y = center().y + rand(-n, n)*UIscaler;
  });

  var rarities = {
    'Common': rgb(255,255,255),
    'Uncommon': rgb(0,255,0),
    'Rare': rgb(0,180,255),
    'Epic': rgb(255,50,50),
    'Legendary': rgb(255,220,0),
  };

  // name, rarity, location
  function showRes(n, r, l=0) {
    add([
      sprite(n),
      pos(center()),
      scale(UIscaler/10),
      area(),
      layer('top'),
      origin('center')
    ]);
    add([
      text(r),
      pos(width()/2, height()*0.8),
      scale(UIscaler/100),
      color(rarities[r]),
      origin('center'),
    ]);
  };

  function opened() {
    destroy(box);
    let r = randi(0,100);

    showRes('money', 'Legendary');

    if (r < 15) {
      // skin
    } else if (r < 40 +15) {
      // level up
    } else if (r < 30 +15+40) {
      // xp
    } else if (r < 5 +15+40+30) {
      // bullet
    } else {
      // money
    };
  };
});