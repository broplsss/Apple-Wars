scene('wipeSave', () => {
  document.getElementById('theGoodStuff').innerHTML = msArray[msMode];
  
  layers([
    'bg',
    'particles',
    'overlay',
    'details',
    'ui',
  ],'bg');

  const backBtn = add([
    text('Back'),
    scale(UIscaler/100),
    pos(UIscaler*0.1,UIscaler*0.1),
    origin('topleft'),
    area(),
    layer('ui'),
    "backButton",
    'yellowHover'
  ]);
  
  const wsTitle = add([
    text('Wipe Save?', { font: 'sinko' }),
    scale(UIscaler/8),
    layer('ui'),
    pos(width()/2, height()*0.2),
    origin('center')
  ]);

  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('overlay'),
    opacity(0.7)
  ]);

  const killerApple = add([
    sprite('apple'),
    pos(center()),
    scale(UIscaler/13),
    origin('center'),
    layer('ui'),
    area(),
    'killerApple'
  ]);

  const info = add([
    text('Quickly click the apple ten times\nto delete your progress... FOREVER!'),
    pos(width()/2, height()- UIscaler*2),
    origin('center'),
    scale(UIscaler/120),
    layer('ui')
  ]);

  onClick('backButton', (b) => {
    play('click');
    go('settings');
  });

  var clicks = 0;

  onClick('killerApple', (k) => {
    play('click');
    clicks++;
    info.text = `${clicks}/10`;
    info.scale = UIscaler/80;
    if (clicks == 1) {
      setTimeout(() => {
        clicks = 0;
        info.text = 'Quickly click the apple ten times\nto delete your progress... FOREVER!';
        info.scale = UIscaler/120;
      }, 5000);
    } else if (clicks == 10) {
      canBeSaved = false;
      setData('save', Default);
      Data = Default;
      killerApple.pos.x = -width();
      backBtn.pos.x = -width();
      play('sauced');
      add([
        sprite('applesauce'),
        pos(center()),
        scale(UIscaler/13),
        origin('center'),
        layer('ui'),
        area(),
        lifespan(2, { fade: 2 })
      ]);
      
      setTimeout(()=>{location.reload();}, 2000)
    };
  });

  loop(0.1, () => {
    particle();
  });

  
});























scene('save', () => {

  if (!canBeSaved) {
    go('menu');
    //alert('This session was marked as unsavable :(');
  };

  alert(JSON.stringify(Data))
  
  layers([
    'bg',
    'particles',
    'response',

    'bg2',
    'ui',
  ],'bg');
  
  const bg = add([
    rect(width(), height()),
    pos(0,0),
    color(0,0,0),
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
    go('menu');
  });
});