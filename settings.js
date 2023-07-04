scene('settings', () => {

  document.getElementById('theGoodStuff').innerHTML = msArray[msMode];

  var optionPage = 0;

  layers([
    'bg',
    'particles',
    'overlay',
    'ui',
  ],'ui');

  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('bg')
  ]);

  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('overlay'),
    opacity(0.7)
  ]);

  add([
    text('Options', { font: 'sinko' }),
    scale(UIscaler/8),
    layer('ui'),
    pos(width()/2, height()*0.1),
    origin('center')
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

  var optPerPage = 0;
  for (let i = 0; i < settingsNames.length; i++) {
    if (UIscaler*3 +UIscaler*i < height() - UIscaler*2.5) {
      optPerPage++;
    };
  };

  //debug.log(optPerPage)

  if (optPerPage < settingsNames.length) {
    var pageNum = add([
      text('1'),
      pos(width()/2, height()-UIscaler),
      origin('center'),
      layer('ui'),
      scale(UIscaler/100),
      "pageNum"
    ]);
  
    add([
      sprite('arrow'),
      pos(width()/2 -UIscaler, height()-UIscaler),
      origin('center'),
      layer('ui'),
      scale(UIscaler/64),
      area(),
      rotate(180),
      "leftArrow"
    ]);
    add([
      sprite('arrow'),
      pos(width()/2 +UIscaler, height()-UIscaler),
      origin('center'),
      layer('ui'),
      scale(UIscaler/64),
      area(),
      "rightArrow"
    ]);
    
  } else { var pageNum = {}; };

  ////

  onClick('backButton', (b) => {
    play('click');
    go('menu');
  });

  onMouseMove(() => {
    every('yellowHover', (b) => {
      b.color = {r:255,g:255,b:255};
    });
  });
  onHover('yellowHover', (b) => {
    b.color = {r:255,g:255,b:0};
  });


  ////////////

  function renderOpts() {
    destroyAll("optThing");
    var testlist = [];
    
    for (let i = 0; i < settingsNames.length; i++) {
    if (UIscaler*3 +UIscaler*i < height() - UIscaler*2.5
       &&
    settingsNames[i+(optPerPage * optionPage)] != undefined) {

      let optNum = i+(optPerPage * optionPage);
      testlist.push(optNum);
      
      add([
        text(settingsNames[optNum]),
        pos(UIscaler*2, UIscaler*3 +UIscaler*i),
        origin('topleft'),
        scale(UIscaler/100),
        "optThing",
      ]);
  
  
      if ((typeof Object.values(gameSettings)[optNum]) == 'boolean') {
        add([
          sprite('switchOff'),
          pos(width()-UIscaler*2, UIscaler*3 +UIscaler*i),
          origin('topright'),
          scale(UIscaler/64),
          opacity(0),
          area(),
          "switch",
          "switchHitbox",
          "optThing",
          `${settingsNames[i]}`,
          {
            'type': settingsNames[optNum],
            'on': false,
            'off': true
          }
        ]);
        add([
          sprite('switchOn'),
          pos(width()-UIscaler*2, UIscaler*3 +UIscaler*i),
          origin('topright'),
          scale(UIscaler/64),
          opacity(0),
          "switch",
          "optThing",
          `${settingsNames[i]}`,
          {
            'type': settingsNames[optNum],
            'on': true,
            'off': false
          }
        ]);
      } else {
        add([
          sprite('apple'),
          pos(width()-UIscaler*2, UIscaler*3 +UIscaler*i),
          origin('topright'),
          scale(UIscaler/64),
          opacity(1),
          area(),
          "button",
          "optThing",
          {
            'bid': extToIntSettingsNames[optNum],
          }
        ]);
      };
      };
    }; // for loop end

    
    pageNum.text = optionPage+1;

    //debug.log(`rendered ${optPerPage * optionPage}`)
  };

  renderOpts();
  
  ////////////

  onClick('leftArrow', () => {
    optionPage--;
    if (optionPage < 0) {
      optionPage = Math.ceil(settingsNames.length / optPerPage) -1;
    };
    renderOpts();
  });

  onClick('rightArrow', () => {
    optionPage++;
    if (optionPage >= Math.ceil(settingsNames.length / optPerPage)) {
      optionPage = 0;
    };
    renderOpts();
  });

  ////////////
  

  onClick('switchHitbox', (sh) => {
    play('click');
    var settingVal = gameSettings[extToIntSettingsNames[settingsNames.indexOf(sh.type)]];

    gameSettings[extToIntSettingsNames[settingsNames.indexOf(sh.type)]] = !settingVal;
  });

  onClick('button', (b) => {
    play('click');
    var optCode = Default.options[b.bid];
    var optFunc = new Function(optCode);
    optFunc();
  });

  onUpdate(() => {
    for (let i = 0; i < settingsNames.length; i++) {
      every(`${settingsNames[i]}`, (sw) => {
        var settingVal = gameSettings[extToIntSettingsNames[settingsNames.indexOf(sw.type)]];
        
        if (sw.on) if (settingVal) {
          sw.opacity = 1;
        } else { sw.opacity = 0; };
        if (sw.off) if (!settingVal) {
          sw.opacity = 1;
        } else { sw.opacity = 0; };
      });
    };
  });

  if (false) {
  loop(0.1, () => {
    particle();
  });
  };
    
});