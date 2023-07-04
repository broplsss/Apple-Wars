scene('shop', () => {

  document.getElementById('theGoodStuff').innerHTML = '';

  var shopPage = 1;
  var shopType = 0; // bullets, buffs

  layers([
    'bg',
    'particles',
    'overlay',
    'boxes',
    'details',
    'ui',
  ],'bg');

  const bg = add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('bg')
  ]);

  const shopTitle = add([
    text('Shop', { font: 'sinko' }),
    scale(UIscaler/8),
    layer('ui'),
    pos(width()/2, height()*0.1 -height()),
    origin('center'),
  ]);

  add([
    rect(width()+200, height()+200),
    pos(-100,-100),
    color(0,0,0),
    layer('overlay'),
    opacity(0.7)
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

  const pageNum = add([
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

  /*add([
    sprite('arrow'),
    pos(width()/2 -UIscaler*3, height()*0.1),
    origin('center'),
    layer('ui'),
    scale(UIscaler/64),
    area(),
    rotate(180),
    "leftArrowTitle"
  ]);
  add([
    sprite('arrow'),
    pos(width()/2 +UIscaler*3, height()*0.1),
    origin('center'),
    layer('ui'),
    scale(UIscaler/64),
    area(),
    "rightArrowTitle"
  ]);*/

  for (let i = 0; i < shopTitles.length; i++) {
    let n = i - Math.floor(shopTitles.length/2);
    if (i == 0) cVal = 0
    else cVal = 255;
    add([
      sprite(typeSpriteNames[i]),
      pos(width()/2 + n*scaler*2, height()*0.1),
      origin('center'),
      scale(scaler/45),
      layer('ui'),
      area(),
      color(cVal,255,cVal),
      "typeSprite",
      {
        'typeID': `${i}`
      }
    ]);
  };

  onClick('typeSprite', (t) => {
    every('typeSprite', (t2) => { 
      t2.color = WHITE;
      t2.pos.y = -height();
    });
    t.color = rgb(0,255,0);
    
    shopType = t.typeID;
    shopTitle.text = shopTitles[shopType];
    shopTitle.pos.y = height()*0.1;

    setTimeout(() => {
      every('typeSprite', (t2) => { 
        t2.pos.y = height()*0.1;
      });
      shopTitle.pos.y = -height();
    }, 300);
    
    
    play('click');
    shopPage = 1;
    renderShop();
  });

  /////

  add([
    sprite('money'),
    scale(UIscaler/64),
    layer('ui'),
    origin('botleft'),
    pos(UIscaler*0.1,height()-UIscaler*0.1),
    "moneyCounter"
  ]); 

  const shopMoneyCounter = add([
    text(money),
    scale(UIscaler/80),
    pos(UIscaler*1.1,height()-UIscaler*0.1),
    origin('botleft'),
    layer('ui'),
    "moneyCounter"
  ]);

  onClick('backButton', (b) => {
    play('click');
    go('menu');
  });
  /*
  onClick('leftArrowTitle', (a) => {
    play('click');
    shopPage = 1;
    if (shopType != 0) shopType--;
    else shopType = shopTitles.length-1;
    renderShop();
  });
  onClick('rightArrowTitle', (a) => {
    play('click');
    shopPage = 1;
    if (shopType != shopTitles.length-1) shopType++;
    else shopType = 0;
    renderShop();
  });*/

  
  // this was line 2022 once
  

  var itemsArray = [];
  shopItems[shopType].forEach(function (item, index) {
    itemsArray.push(item.icon)
  });

  ///////
  //////
  /////
  ////
  ///
  //
  function renderShop() {

    var itemsArray = [];
    shopItems[shopType].forEach(function (item, index) {
      console.log(shopItems[shopType])
      itemsArray.push(item.icon)
    });

    destroyAll('shopItem');
    //shopTitle.text = shopTitles[shopType];

    pageNum.text = Math.floor(shopPage);

    if (shopType == 5) {
      let boxHeight = height()-UIscaler*4;
      add([
        rect(UIscaler*7, boxHeight),
        pos(UIscaler*8 +UIscaler/2, UIscaler*2),
        color(255,255,255),
        layer('boxes'),
        opacity(0.2),
        area(),
        z(5),
        "shopItem",
        "openCrates",
      ]);
      add([
        text('Open Boxes'),
        pos(UIscaler*12, UIscaler*2.5),
        color(255,255,255),
        layer('boxes'),
        origin('top'),
        area(),
        scale(UIscaler/80),
        z(7),
        "shopItem",
      ]);
      add([
        sprite('crate'),
        pos(UIscaler*12, (boxHeight+UIscaler*4)/2),
        color(255,255,255),
        layer('boxes'),
        origin('center'),
        area(),
        scale(boxHeight / (64 * Math.sqrt(2))),
        z(6),
        rotate(0),
        "shopItem",
        "spinningCrate",
      ]);
    };


    //////////
    

    for (let coll = 0; coll < 4; coll++) {
      var shopItemID = parseInt((shopPage-1)*4+coll);
      var itemStats = shopItems[shopType][shopItemID];
        
      if (shopItems[shopType].length > shopItemID) {
      add([
        rect(UIscaler*3, (height()-UIscaler*4)),
        pos(UIscaler*4*coll +UIscaler/2, UIscaler*2),
        color(255,255,255),
        layer('boxes'),
        opacity(0.2),
        area(),
        "shopItem",
        'buyHitbox',
        {
          'item': itemStats.icon
        }
      ]);

      
    

      add([
        rect(UIscaler*2.5,UIscaler*0.75),
        pos(UIscaler*4*coll +UIscaler*0.75, height()-UIscaler*3),
        color(30,30,30),
        layer('details'),
        z(6),
        "shopItem"
      ]);

        
      if (shopType != 1) {
        var shopBarWidth = UIscaler*2.4;
      } else  {
        var shopBarWidth = UIscaler*2.6/itemStats.prices.length*itemStats.owned -UIscaler*0.2;
      };
    
      var itemTitle = itemStats.name;
      var itemDescOverride = false;
      var titleScaleOverride = itemStats.titleScale;
      var colorOverlay = [255,255,255];

      if (itemStats.requires != 'none'
         &&
        itemStats.requires != 'undefined'
         &&
        shopType == 0) {
          if (shopItems[0][itemsArray.indexOf(itemStats.requires)].owned == false) {
            var sbCol = [30,30,30];
            var itemDescOverride = `Unlocked after ${bulletStats[itemStats.requires].name} is bought.`;
            let lockedBulletBrightness2 = 255 * lockedBulletBrightness;
            var colorOverlay = [lockedBulletBrightness2, lockedBulletBrightness2, lockedBulletBrightness2];
          };
      } else {
        if (itemStats.icon == bullet) {
          var shopBarBlueVal = 200;
          
        } else if (shopType == 1) {
          if (itemStats.prices.length == itemStats.owned) {
            var shopBarBlueVal = 255;
          } else { var shopBarBlueVal = 0; };
          
        } else { var shopBarBlueVal = 0; };
        var sbCol = [0, 255, shopBarBlueVal];
      };

        if (shopType == 0) {
          if (shopItems[0][itemsArray.indexOf(itemStats.icon)].owned && itemStats.icon != bullet) {
            var sbCol = [0, 255, 0];
          };
        };

      if (shopType == 3 || shopType == 4) {
        if (itemStats.owned) {
          if (itemStats.active) {
            var shopBarText = `ACTIVATED`;
            var sbCol = [0, 255, 255];
          } else {
            var shopBarText = `ACTIVATE`;
            var sbCol = [0, 255, 0];
          }
        } else {
          var shopBarText = `\$${itemStats.price}`;
          var sbCol = [30, 30, 30];
        }
      };

      if (shopType == 5) {
        var sbCol = [0, 255, 0];
        var shopBarText = `\$${itemStats.price}`;
      };

      if (shopType == 0) {
        if (itemStats.icon == bullet) {
          var shopBarText = `EQUIPPED`;
          var shopBarTextScale = 160;
          var sbCol = [0, 255, 255];
        } else if (itemStats.owned) {
          var shopBarText = `EQUIP`;
          var shopBarTextScale = 110;
          var sbCol = [0, 255, 0];
        } else {
          var shopBarText = `\$${itemStats.cost}`;
          var shopBarTextScale = 110;
          if (shopBarText.length == 7) {
            shopBarTextScale = 130;
          };
          var sbCol = [30, 30, 30];
        };

        add([
          sprite(itemStats.icon),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*4.25),
          color(255,255,255),
          layer('details'),
          scale(UIscaler/32),
          origin('center'),
          color(colorOverlay[0],
               colorOverlay[1],
               colorOverlay[2],),
          "shopItem"
        ]);

        add([
          text(itemTitle),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*2.6),
          origin('center'),
          scale(UIscaler/titleScaleOverride),
          layer('details'),
          "shopItem"
        ]);


        if (itemStats.requires != 'none'
           &&
           itemStats.requires != 'undefined') {
          if (shopItems[0][itemsArray.indexOf(itemStats.requires)].owned == false) {
            var shopBarText = 'LOCKED!'
            var shopBarTextScale = 140;
            var sbCol = [30,30,30];
          };
        };








        
      } else if (shopType == 1) {
        
        var shopBarText = `\$${itemStats.prices[itemStats.owned]}`;
        if (shopBarText == '$undefined') {
          shopBarText = 'MAXED';
        };
        
        var shopBarTextScale = 10 +(shopBarText.length*20);

        add([
          sprite(itemStats.icon),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*4.25),
          color(255,255,255),
          layer('details'),
          scale(UIscaler/32),
          origin('center'),
          "shopItem"
        ]);

        add([
          text(itemTitle),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*2.6),
          origin('center'),
          scale(UIscaler/titleScaleOverride),
          layer('details'),
          "shopItem"
        ]);







        
      } else if (shopType == 2) {
        var shopBarText = `\$${itemStats.price}`;
        sbCol = [30, 30, 30];

        if (itemStats.owned) {
          shopBarText = 'EQUIP';
          sbCol = [0, 255, 0];
        };
        if (playerSkin == itemStats.icon.replace('skin_','')) {
          shopBarText = 'EQUIPPED';
          sbCol = [0, 255, 255];
        };


        var shopBarTextScale = 10+(shopBarText.length*20);
        if (shopBarTextScale < 100) {
          shopBarTextScale = 100;
        };
        

        add([
          sprite(itemStats.icon),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*4.25),
          color(255,255,255),
          layer('details'),
          scale(UIscaler/32),
          origin('center'),
          "shopItem"
        ]);

        add([
          text(itemTitle),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*2.6),
          origin('center'),
          scale(UIscaler/titleScaleOverride),
          layer('details'),
          "shopItem"
        ]);




        
      } else if (shopType == 3 || shopType == 4
      || shopType == 5) {
        //var shopBarText = `\$${itemStats.price}`;
        
        var shopBarTextScale = 
          10 +(shopBarText.length*20);

        add([
          sprite(itemStats.icon),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*4.25),
          color(255,255,255),
          layer('details'),
          scale(UIscaler/32),
          origin('center'),
          "shopItem"
        ]);

        add([
          text(itemTitle),
          pos(UIscaler*4*coll +UIscaler*2, UIscaler*2.6),
          origin('center'),
          scale(UIscaler/titleScaleOverride),
          layer('details'),
          "shopItem"
        ]);
      };


        
        
      add([
        rect(shopBarWidth, UIscaler*0.65),
        pos(UIscaler*4*coll +UIscaler*0.8, height()-UIscaler*2.95),
        color(sbCol[0], sbCol[1], sbCol[2]),
        layer('details'),
        z(8),
        `progressBar-${itemStats['name']}`,
        "shopItem"
      ]);
      
      add([
        text(shopBarText),
        pos(UIscaler*4*coll +UIscaler*2, height()-UIscaler*2.6),
        color(255,255,255),
        layer('details'),
        scale(UIscaler/shopBarTextScale),
        origin('center'),
        opacity(0.5),
        z(10),
        `progressText-${itemStats['name']}`,
        "shopItem"
      ]);

      var itemDescText;
      if (shopType == 1) {
        itemDescText = `${itemStats.desc}`;
        
      } else if (shopType == 0) {
        var shopBulletInfo = bulletStats[itemStats.icon];
        itemDescText = shopBulletInfo.info;

        if (itemDescOverride) {
          itemDescText = itemDescOverride;
        }
        
      } else if (shopType == 3 || shopType == 4) {
        itemDescText = `${itemStats.desc}`;
      } else if (shopType == 5) {
        itemDescText = `Owned: ${itemStats.owned}`;
      };

        
      if (shopType != 2) {
        add([
          text(itemDescText, { width: UIscaler*2.75 }),
          pos(UIscaler*4*coll +UIscaler*0.6, UIscaler*5.3),
          color(255,255,255),
          layer('details'),
          scale(UIscaler/200),
          origin('topleft'),
          "shopItem",
          "shopDesc",
          {
            'finalHeight': false
          }
        ]);
      };

      };

      every('leftArrowTitle', (a) => {
        a.pos.x = width()/2 -UIscaler*5;
      });
      every('rightArrowTitle', (a) => {
        a.pos.x = width()/2 +UIscaler*5;
      });
    };
    shopMoneyCounter.text = money;
  };
  renderShop();

  onMouseMove(() => {
    every('yellowHover', (b) => {
      b.color = {r:255,g:255,b:255};
    });
  });
  onHover('yellowHover', (b) => {
    b.color = {r:255,g:255,b:0};
  });

  onClick('leftArrow', () => { 
    play('click');
    if (shopPage == 1) {
      shopPage = Math.ceil(shopItems[shopType].length/4);
    } else {
      shopPage--;
    };
    renderShop(); 
  });

  onClick('rightArrow', () => { 
    play('click');
    if (shopPage == Math.ceil(shopItems[shopType].length/4)) {
      shopPage = 1;
    } else {
      shopPage++;
    };
    renderShop(); 
  });

  onClick('openCrates', (c) => {
    play('click');
    go('boxes');
  });


  function noMoneyAnim(h) {
    h.color = {r:255,g:180,b:180};
    shopMoneyCounter.color = {r:255,g:0,b:0};
    setTimeout(() => {
      h.color = {r:255,g:255,b:255};
      shopMoneyCounter.color = {r:255,g:255,b:255};
      setTimeout(() => {
        h.color = {r:255,g:180,b:180};
        shopMoneyCounter.color = {r:255,g:0,b:0};
        setTimeout(() => {
          h.color = {r:255,g:255,b:255};
          shopMoneyCounter.color = {r:255,g:255,b:255};
        }, 100);
      }, 100);
    }, 100);
  };

  onClick('buyHitbox', (h) => {
    play('click');
    var itemsArray = [];
    shopItems[shopType].forEach(function (item, index) {
      itemsArray.push(item.icon)
    });

    var currentItemIndex = itemsArray.indexOf(h.item);
    var currentItem = shopItems[shopType][currentItemIndex]
    if (shopType == 1) {
      if (currentItem.prices[currentItem.owned] <= money) {
        money -= currentItem.prices[currentItem.owned];
        shopItems[shopType][currentItemIndex].owned += 1;
        renderShop();
      } else if (currentItem.prices[currentItem.owned] != undefined) {
        noMoneyAnim(h);
      };



      

      

    



    } else if (shopType == 0) {
      if ((currentItem.requires != 'none'
           &&
           currentItem.requires != 'undefined'
           &
           shopItems[0][itemsArray.indexOf(currentItem.requires)].owned == false)) {
            h.color = {r:255,g:180,b:180};
            setTimeout(() => {
              h.color = {r:255,g:255,b:255};
            }, 100);
      } else {
        if (currentItem.owned) { 
          bullet = currentItem.icon;
          renderShop();
        } else if (currentItem.cost <= money) {
          money -= currentItem.cost;
          shopItems[shopType][currentItemIndex].owned = true;
          renderShop();
        } else if (currentItem.cost != undefined) {
          noMoneyAnim(h);
        };
      };




      
    } else if (shopType == 2) {

      if (currentItem.owned == false) {
        if (currentItem.price <= money) {
          money -= currentItem.price;
          shopItems[shopType][currentItemIndex].owned = true;
          playerSkin = currentItem.icon.replace('skin_','');
          renderShop();
        
        } else {
          noMoneyAnim(h);
        };
        
      } else {
        playerSkin = currentItem.icon.replace('skin_','');
        renderShop();
      };


      

      

    } else if (shopType == 3 || shopType == 4) {
      if (currentItem.owned == false) {
        if (currentItem.price <= money) {
          money -= currentItem.price;
          shopItems[shopType][currentItemIndex].owned = true;
          if (shopType == 3) {
            shopItems[shopType][currentItemIndex].active = true;
          };
          renderShop();
        
        } else {
          noMoneyAnim(h);
        };

        
      } else {

        var isActive = shopItems[shopType][currentItemIndex].active;
        
        if (shopType == 4) {
          for (let i = 0; i < shopItems[4].length; i++) {
            shopItems[4][i].active = false;
          };
        };

        if (shopType == 4 && isActive) {
          shopItems[shopType][currentItemIndex].active = false;
          
        } else {
          shopItems[shopType][currentItemIndex].active = !(shopItems[shopType][currentItemIndex].active)
        };
        
        renderShop();
      };

//////
      
    } else if (shopType == 5) {
      if (money >= currentItem.price) {
        money -= currentItem.price;
        shopItems[shopType][currentItemIndex].owned ++;

        renderShop();
      } else {
        noMoneyAnim(h);
      };
      
    };
  });

  ////////////
  
  var itemDescHeight = (height()-UIscaler*3) - UIscaler*5.4;
  var spinningCrateAngle = 0;
  onUpdate(() => {
    every('shopDesc', (sd) => {
      if (itemDescHeight < sd.height*sd.scale.x 
        &&
      !sd.finalHeight) {
        sd.scale.x -= 0.05;
        sd.scale.y -= 0.05;
      };
      if (sd.scale.x <= 0) {
        sd.scale.x = 0.05;
        sd.scale.y = 0.05;
        sd.finalHeight = true;
      };
      if (itemDescHeight >= sd.height*sd.scale.x) {
        sd.finalHeight = true;
      };
    });

    every('spinningCrate', (s) => {
      spinningCrateAngle += fpsmod(2);
      s.angle = spinningCrateAngle;
    });

  });

  if (false) {
  loop(0.1, () => {
    particle();
  });
  };

});