var shopTitles = [
  'Bullets',
  'Upgrades',
  'Skins',
  'Buffs',
  'Abilities',
  //'Boxes'
];
var typeSpriteNames = [
  'bulletsIcon',
  'upgradesIcon',
  'skinsIcon',
  'buffsIcon',
  'abilitiesIcon',
  //'unknown'
];
var lockedBulletBrightness = 0.2;

var lifestealHealthGain = 5;


var shopItems = [
  [
    {
      'name': 'Apple Seed',
      'cost': 0,
      'owned': true,
      'requires': 'none',
      'icon': 'appleSeed',
      'titleScale': 160
    },
    {
      'name': 'Strawberry\nSeed',
      'cost': 5000,
      'owned': false,
      'requires': 'none',
      'icon': 'strawberrySeed',
      'titleScale': 160
    },
    {
      'name': 'Cherry\nPit',
      'cost': 12000,
      'owned': false,
      'requires': 'none',
      'icon': 'cherryPit',
      'titleScale': 140
    },
    {
      'name': 'Grape',
      'cost': 17000,
      'owned': false,
      'requires': 'none',
      'icon': 'grape',
      'titleScale': 110
    },
    {
      'name': 'Peach\nPit',
      'cost': 25000,
      'owned': false,
      'requires': 'cherryPit',
      'icon': 'peachPit',
      'titleScale': 140
    },
    {
      'name': 'Strawberry',
      'cost': 12500,
      'owned': false,
      'requires': 'strawberrySeed',
      'icon': 'strawberry',
      'titleScale': 160
    },
    {
      'name': 'Blueberry',
      'cost': 20000,
      'owned': false,
      'requires': 'strawberrySeed',
      'icon': 'blueberry',
      'titleScale': 160
    },
    {
      'name': 'Cherry',
      'cost': 30000,
      'owned': false,
      'requires': 'cherryPit',
      'icon': 'cherry',
      'titleScale': 150
    },
    {
      'name': 'Peach',
      'cost': 40000,
      'owned': false,
      'requires': 'peachPit',
      'icon': 'peach',
      'titleScale': 150
    },
    {
      'name': 'Yew\nBerry',
      'cost': 50000,
      'owned': false,
      'requires': 'peachPit',
      'icon': 'yewBerry',
      'titleScale': 140
    },
    {
      'name': 'Banana\nBoomerang',
      'cost': 60000,
      'owned': false,
      'requires': 'grape',
      'icon': 'banana',
      'titleScale': 150
    },
    {
      'name': 'Coconut',
      'cost': 90000,
      'owned': false,
      'requires': 'grape',
      'icon': 'coconut',
      'titleScale': 160
    },
    {
      'name': 'Raspberry',
      'cost': 40000,
      'owned': false,
      'requires': 'blueberry',
      'icon': 'raspberry',
      'titleScale': 150
    },
    {
      'name': 'Pomegranate',
      'cost': 85000,
      'owned': false,
      'requires': 'raspberry',
      'icon': 'pomegranate',
      'titleScale': 170
    },
    {
      'name': 'Watermelon',
      'cost': 200000,
      'owned': false,
      'requires': 'pomegranate',
      'icon': 'watermelon',
      'titleScale': 160
    },
    {
      'name': 'Durian',
      'cost': 55000,
      'owned': false,
      'requires': 'peachPit',
      'icon': 'durian',
      'titleScale': 150
    },
    {
      'name': 'Dragonfruit',
      'cost': 70000,
      'owned': false,
      'requires': 'cherry',
      'icon': 'dragonfruit',
      'titleScale': 170
    },
    {
      'name': 'Pear\nMissile',
      'cost': 60000,
      'owned': false,
      'requires': 'blueberry',
      'icon': 'pear',
      'titleScale': 140
    },
    {
      'name': 'Nuclear\nGrape',
      'cost': 100000,
      'owned': false,
      'requires': 'grape',
      'icon': 'nuclearGrape',
      'titleScale': 140
    },
    {
      'name': 'Thermonuclear\nGrape',
      'cost': 400000,
      'owned': false,
      'requires': 'nuclearGrape',
      'icon': 'thermoGrape',
      'titleScale': 200
    },
  ],









  

  







  
  [
    {
      'name': 'Sharp\nSeeds', // +15%
      'titleScale': 150,
      'icon': 'moreDamage',
      'prices': [1000, 1500, 2000, 3000, 4000, 5500],
      'owned': 0,
      'desc': 'Each projectile does more damage.'
    },
    {
      'name': 'Stronger\nPeel', // +7%
      'titleScale': 150,
      'icon': 'protection',
      'prices': [1200, 2000, 2800, 3800, 5000, 6400],
      'owned': 0,
      'desc': 'Evil apples do less damage to you.'
    },
    {
      'name': 'Dramatic\nDodges', // +10%
      'titleScale': 160,
      'icon': 'moveFaster',
      'prices': [800, 1800, 3000, 4000, 5500],
      'owned': 0,
      'desc': 'Your invisible apple legs move faster.'
    },
    {
      'name': 'Cash\nPump', // +15%
      'titleScale': 140,
      'icon': 'moneyBonus',
      'prices': [1500, 2500, 4000, 7500],
      'owned': 0,
      'desc': 'Incoming money is multiplied.' 
    },
    {
      'name': 'Rapid\nRegen', // +30%
      'titleScale': 150,
      'icon': 'regeneration',
      'prices': [800, 1600, 2700, 4000, 6000],
      'owned': 0,
      'desc': 'Regain your health back faster.'
    },
    {
      'name': 'Impeckable\nImmunity', // +10hp
      'titleScale': 160,
      'icon': 'maxHealth',
      'prices': [2000, 4000, 7000],
      'owned': 0,
      'desc': 'Have a higher max health.'
    },
    {
      'name': 'Rocket\nSeeds', // +20%
      'titleScale': 150,
      'icon': 'fasterBullets',
      'prices': [800, 1500, 3000],
      'owned': 0,
      'desc': 'Your projectiles will fly faster.'
    },
    {
      'name': 'Giant\nGMOs', // +15%
      'titleScale': 140,
      'icon': 'largerBullets',
      'prices': [2000, 4000, 7000],
      'owned': 0,
      'desc': 'Your projectiles are slightly bigger.'
    },
    {
      'name': 'Multi\nShot', // up to +2
      'titleScale': 140,
      'icon': 'extraBullets',
      'prices': [1500, 2000, 2500, 3500, 5000, 7000],
      'owned': 0,
      'desc': 'Add a chance that you throw an extra projectile.'
    },
    {
      'name': 'Extreme\nExplosives', // +20%
      'titleScale': 160,
      'icon': 'strongExplosions',
      'prices': [1500, 2500, 4000],
      'owned': 0,
      'desc': 'Explosive projectiles are stronger.'
    },
    {
      'name': 'Unbreakable\nApple', // +10%
      'titleScale': 160,
      'icon': 'explosionResistance',
      'prices': [1500, 4000, 9000, 17000, 25000],
      'owned': 0,
      'desc': 'Take less damage from explosions.'
    },
    {
      'name': 'Perfect\nRecipies', // +20%
      'titleScale': 150,
      'icon': 'strongerPoison',
      'prices': [1000, 2000, 3500, 5000],
      'owned': 0,
      'desc': 'Poison is more effective.'
    },
    {
      'name': 'Amazing\nAntibodies', // +10%
      'titleScale': 160,
      'icon': 'poisonResistance',
      'prices': [900, 1500, 2200, 3000, 4000, 5500],
      'owned': 0,
      'desc': 'Poison does less damage to you.'
    },
    {
      'name': 'Ability\nRecovery', // +10%
      'titleScale': 160,
      'icon': 'abilityCooldown',
      'prices': [1400, 2200, 3500, 7000, 12000],
      'owned': 0,
      'desc': 'Ability cooldowns get shortened.'
    },
  ],











  

  


  


  





  



  [
    {
      'name': 'Default',
      'price': 0,
      'owned': true,
      'icon': 'apple',
      'titleScale': 140
    },
    {
      'name': 'Dark Red',
      'price': 500,
      'owned': false,
      'icon': 'skin_dark',
      'titleScale': 150
    },
    {
      'name': 'Hat Apple',
      'price': 3000,
      'owned': false,
      'icon': 'skin_hat',
      'titleScale': 160
    },
    {
      'name': 'Lenny\nApple',
      'price': 4000,
      'owned': false,
      'icon': 'skin_lenny',
      'titleScale': 160
    },
    {
      'name': 'Cat Apple',
      'price': 6000,
      'owned': false,
      'icon': 'skin_cat',
      'titleScale': 160
    },
    {
      'name': 'Chicken\nApple',
      'price': 7000,
      'owned': false,
      'icon': 'skin_chicken',
      'titleScale': 160
    },
    {
      'name': 'Donut\nApple',
      'price': 8000,
      'owned': false,
      'icon': 'skin_donut',
      'titleScale': 160
    },
    {
      'name': 'Cactus\nApple',
      'price': 9000,
      'owned': false,
      'icon': 'skin_cactus',
      'titleScale': 160
    },
    {
      'name': 'Robot',
      'price': 10000,
      'owned': false,
      'icon': 'skin_robot',
      'titleScale': 130
    },
    {
      'name': 'Blobfish',
      'price': 15000,
      'owned': false,
      'icon': 'skin_blobfish',
      'titleScale': 130
    },
    {
      'name': 'Cursed\nApple',
      'price': 25000,
      'owned': false,
      'icon': 'skin_text',
      'titleScale': 160
    },
    {
      'name': 'Apple\nApple',
      'price': 10000,
      'owned': false,
      'icon': 'skin_appleapple',
      'titleScale': 160
    },
    {
      'name': 'Apple\nApple\nApple',
      'price': 30000,
      'owned': false,
      'icon': 'skin_appleappleapple',
      'titleScale': 180
    },
    {
      'name': 'Silver\nApple',
      'price': 10000,
      'owned': false,
      'icon': 'skin_silver',
      'titleScale': 160
    },
    {
      'name': 'Golden\nApple',
      'price': 25000,
      'owned': false,
      'icon': 'skin_gold',
      'titleScale': 160
    },
    {
      'name': 'Diamond\nApple',
      'price': 50000,
      'owned': false,
      'icon': 'skin_diamond',
      'titleScale': 160
    },
    /*{
      'name': 'King\nApple',
      'price': 100000,
      'owned': false,
      'icon': 'skin_king',
      'titleScale': 160
    },*/
  ],




  

  

  

  

  




  [
    {
      'name': 'Auto Fire',
      'price': 20000,
      'owned': false,
      'active': false,
      'icon': 'autoFire',
      'titleScale': 160,
      'desc': 'Hold down the shoot button to fire.'
    },
    {
      'name': 'Escapist',
      'price': 15000,
      'owned': false,
      'active': false,
      'icon': 'lowHealthSpeed',
      'titleScale': 150,
      'desc': 'Double your speed at low health.'
    },
    {
      'name': 'Frenzy',
      'price': 25000,
      'owned': false,
      'active': false,
      'icon': 'damageCombo',
      'titleScale': 130,
      'desc': 'Outgoing damage increases until you get hit.'
    },
    {
      'name': 'Upward\nTrends',
      'price': 35000,
      'owned': false,
      'active': false,
      'icon': 'moneyCombo',
      'titleScale': 160,
      'desc': 'Incoming money increases until you get hit.'
    },
    {
      'name': 'Big Boi\nTakedown',
      'price': 25000,
      'owned': false,
      'active': false,
      'icon': 'extraBossDamage',
      'titleScale': 150,
      'desc': 'Deal extra damage to bosses.'
    },
    {
      'name': 'Pick Pocket',
      'price': 40000,
      'owned': false,
      'active': false,
      'icon': 'extraMoneyIncome',
      'titleScale': 170,
      'desc': 'Gain more money from everything that gives.'
    },
    {
      'name': 'Poison\nCure',
      'price': 40000,
      'owned': false,
      'active': false,
      'icon': 'zeroPoisonDamage',
      'titleScale': 150,
      'desc': 'Take no poison damage.'
    },
    {
      'name': 'Tough\nPeel',
      'price': 50000,
      'owned': false,
      'active': false,
      'icon': 'zeroExplosionDamage',
      'titleScale': 150,
      'desc': 'Take no explosion damage.'
    },
    {
      'name': 'Lifesteal',
      'price': 30000,
      'owned': false,
      'active': false,
      'icon': 'killHealth',
      'titleScale': 150,
      'desc': 'Gain health on kill.'
    },
    {
      'name': 'Ruined\nHarvest', 
      'price': 20000,
      'owned': false,
      'active': false,
      'icon': 'extraPoison',
      'titleScale': 150,
      'desc': 'All of your projectiles poison the enemy.'
    },
    {
      'name': 'Everything\nExplodes',
      'price': 50000,
      'owned': false,
      'active': false,
      'icon': 'everythingExplodes',
      'titleScale': 150,
      'desc': 'Things that didn\'t explode before do now.'
    },
    {
      'name': 'Rage\nQuitter',
      'price': 7000,
      'owned': false,
      'active': false,
      'icon': 'rageQuit',
      'titleScale': 150,
      'desc': 'Deal more damage when you quit.'
    },
    {
      'name': 'Last\nStand',
      'price': 35000,
      'owned': false,
      'active': false,
      'icon': 'deathExplosion',
      'titleScale': 150,
      'desc': 'Explode when you get applesauced.'
    },
  ],















  [
    {
      'name': 'Apple\nSniper',
      'price': 8000,
      'owned': false,
      'active': false,
      'icon': 'randomSnipe',
      'titleScale': 150,
      'desc': 'Sauce one random enemy instantly.',
      'cooldown': 8
    },
    {
      'name': 'Apple Fan',
      'price': 15000,
      'owned': false,
      'active': false,
      'icon': 'appleFan',
      'titleScale': 150,
      'desc': 'Blow all the enemies away from you.',
      'cooldown': 10
    },
    {
      'name': 'Time\nFreeze',
      'price': 40000,
      'owned': false,
      'active': false,
      'icon': 'slowMotion',
      'titleScale': 150,
      'desc': 'Slow down time for 5 seconds.',
      'cooldown': 15
    },
    {
      'name': 'Immortal\nApple',
      'price': 35000,
      'owned': false,
      'active': false,
      'icon': 'noDamage',
      'titleScale': 150,
      'desc': 'Take zero damage for 5 seconds.',
      'cooldown': 15
    },
    {
      'name': 'Berserk',
      'price': 35000,
      'owned': false,
      'active': false,
      'icon': 'doubleDamage',
      'titleScale': 120,
      'desc': 'Double outgoing damage for 5 seconds.',
      'cooldown': 20
    },
    {
      'name': 'Safe\nSmasher',
      'price': 40000,
      'owned': false,
      'active': false,
      'icon': 'doubleMoney',
      'titleScale': 150,
      'desc': 'Double incoming money for 5 seconds.',
      'cooldown': 20
    },
    {
      'name': 'Fruit\nBasket',
      'price': 40000,
      'owned': false,
      'active': false,
      'icon': 'fruitBasket',
      'titleScale': 150,
      'desc': 'Shoot any type of seed or fruit for 5 seconds.',
      'cooldown': 15
    },
    {
      'name': 'Clean\nSweep',
      'price': 35000,
      'owned': false,
      'active': false,
      'icon': '360bullets',
      'titleScale': 150,
      'desc': 'Fire a spray of 30 bullets in all directions.',
      'cooldown': 10
    },
    {
      'name': 'Noxious\nGasses',
      'price': 35000,
      'owned': false,
      'active': false,
      'icon': 'poisonEveryone',
      'titleScale': 150,
      'desc': 'Poison every enemy.',
      'cooldown': 15
    },
  ],







  /*

  [
    {
      'name': 'Basic\nCrate',
      'price': 10,
      'owned': 0,
      'icon': 'crate',
      'titleScale': 150
    },
    {
      'name': 'Spicy\nBarrel',
      'price': 30,
      'owned': 0,
      'icon': 'barrel',
      'titleScale': 150
    },
  ],

  */
];


