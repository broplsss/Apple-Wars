var bulletStats = {
  'appleSeed': {
    'speed': 15,
    'scaler': 170,
    'damage': 30,
    'spread': 10,
    'cooldown': 5,
    'amount': 1,
    'poison': 0,
    'info': 'An average apple seed, with decent damage.',
    'name': 'apple seed'
  },
  'strawberrySeed': {
    'speed': 25,
    'scaler': 200,
    'damage': 15,
    'spread': 20,
    'cooldown': 3,
    'amount': 3,
    'poison': 0,
    'info': 'Low damage, but three are shot at a time.',
    'name': 'strawberry seed'
  },
  'cherryPit': {
    'speed': 15,
    'scaler': 160,
    'damage': 50,
    'spread': 15,
    'cooldown': 6,
    'amount': 1,
    'poison': 5,
    'info': 'A heavy cherry pit, with a little bit of poison inside.',
    'name': 'cherry pit'
  },
  'grape': {
    'speed': 15,
    'scaler': 110,
    'damage': 70,
    'spread': 15,
    'cooldown': 6,
    'amount': 1,
    'poison': 0,
    'isGrape': true,
    'info': 'A solid grape with good damage.',
    'name': 'grape'
  },
  'peachPit': {
    'speed': 12,
    'scaler': 120,
    'damage': 75,
    'spread': 20,
    'cooldown': 7,
    'amount': 1,
    'poison': 9,
    'info': 'Great damage, large, and good poison.',
    'name': 'peach pit'
  },
  'pear': {
    'speed': 50,
    'scaler': 50,
    'damage': 150,
    'spread': 5,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'isGrape': true,
    'isPear': true,
    'info': 'Super fast and strong missile that explodes on impact.',
    'name': 'pear'
  },
  'nuclearGrape': {
    'speed': 20,
    'scaler': 110,
    'damage': 250,
    'spread': 10,
    'cooldown': 10,
    'amount': 1,
    'poison': 30,
    'isNuke': true,
    'info': 'A sneaky grape with a nuke hidden inside.',
    'name': 'nuclear grape'
  },
  'blueberry': {
    'speed': 15,
    'scaler': 180,
    'damage': 25,
    'spread': 30,
    'cooldown': 5,
    'amount': 3,
    'poison': 0,
    'info': 'Relatively low damage, but three are shot at once.',
    'name': 'blueberry'
  },
  'yewBerry': {
    'speed': 15,
    'scaler': 190,
    'damage': 10,
    'spread': 30,
    'cooldown': 5,
    'amount': 3,
    'poison': 14,
    'info': 'Low damage on impact, but extreme poison and with a triple shot.',
    'name': 'yew berry'
  },
  'banana': {
    'speed': 40,
    'scaler': 45,
    'damage': 50,
    'spread': 5,
    'cooldown': 5,
    'amount': 1,
    'poison': 0,
    'isBanana': true,
    'info': 'A large boomerang with good damage.',
    'name': 'banana'
  },
  'raspberry': {
    'speed': 25,
    'scaler': 140,
    'damage': 50,
    'spread': 15,
    'cooldown': 5,
    'amount': 1,
    'poison': 0,
    'isRaspberry': true,
    'info': 'High impact damage, with eight flying drupelets.',
    'name': 'raspberry'
  },
  'pomegranate': {
    'speed': 30,
    'scaler': 50,
    'damage': 100,
    'spread': 10,
    'cooldown': 5,
    'amount': 1,
    'poison': 0,
    'isPomegranate': true,
    'info': 'Super damage with 20 arils going in all directions on impact.',
    'name': 'pomegranate'
  },
  'watermelon': {
    'speed': 20,
    'scaler': 40,
    'damage': 200,
    'spread': 10,
    'cooldown': 7,
    'amount': 1,
    'poison': 0,
    'isWatermelon': true,
    'info': 'Insane damage with 8 slices and 8 seeds split on impact.',
    'name': 'watermelon'
  },
  'thermoGrape': {
    'speed': 25,
    'scaler': 100,
    'damage': 500,
    'spread': 5,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'info': 'Vaporizes all basic enemies in the explosion area.',
    'name': 'thermonuclear grape',
    'isThermo': true
  },
  'durian': {
    'speed': 25,
    'scaler': 45,
    'damage': 60,
    'spread': 15,
    'cooldown': 10,
    'amount': 1,
    'poison': 20,
    'info': 'Extreme poison damage, and a toxic cloud left behind.',
    'name': 'durian',
    'isDurian': true,
  },
  'dragonfruit': {
    'speed': 25,
    'scaler': 40,
    'damage': 150,
    'spread': 15,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'info': 'Deals a ton of damage without any messy explosions.',
    'name': 'dragonfruit',
  },
  'cherry': {
    'speed': 15,
    'scaler': 90,
    'damage': 75,
    'spread': 15,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'info': 'Just a cherry, spits out a pit on impact.',
    'name': 'cherry',
    'isCherry': true,
  },
  'peach': {
    'speed': 20,
    'scaler': 60,
    'damage': 100,
    'spread': 20,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'info': 'Deals high damage and shoots out a peach pit on impact.',
    'name': 'peach',
    'isPeach': true,
  },
  'strawberry': {
    'speed': 25,
    'scaler': 100,
    'damage': 50,
    'spread': 15,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'info': 'Medium impact damage but splits into eight strawberry seeds.',
    'name': 'strawberry',
    'isStrawberry': true,
  },
  'coconut': {
    'speed': 20,
    'scaler': 50,
    'damage': 150,
    'spread': 20,
    'cooldown': 10,
    'amount': 1,
    'poison': 0,
    'info': 'Cuts cleanly in half (somehow) on impact.',
    'name': 'coconut',
    'isCoconut': true,
  },
};











var explosionData = {
  'thermo': {
    'size': 7,
    'shake': 1.5,
    'dmg': [100, 351]
  },
  'nuke': {
    'size': 10,
    'shake': 4,
    'dmg': [20, 41]
  },
  'pear': {
    'size': 18,
    'shake': 8,
    'dmg': [10, 26]
  },
};





var splitterStats = {
  'raspberry': {
    'sprite': 'raspberryDrupelet',
    'split': 8,
    'damage': 15,
    'scale': 250
  },
  'pomegranate': {
    'sprite': 'pomegranateAril',
    'split': 20,
    'damage': 15,
    'scale': 240
  },
  'watermelon': {
    'sprite': 'watermelonSlice',
    'split': 8,
    'damage': 50,
    'scale': 64,
    'wtmln': true
  },
  'watermelonSlice': {
    'sprite': 'watermelonSeed',
    'split': 8,
    'damage': 10,
    'scale': 250
  },
  'strawberry': {
    'sprite': 'strawberrySeed',
    'split': 8,
    'damage': 10,
    'scale': 200
  },
  'peach': {
    'sprite': 'peachPit',
    'split': 1,
    'damage': 75,
    'scale': 120,
    'poison': 9
  },
  'cherry': {
    'sprite': 'cherryPit',
    'split': 1,
    'damage': 50,
    'scale': 160,
    'poison': 5
  },
  'coconut': {
    'sprite': 'coconutHalf',
    'split': 2,
    'damage': 80,
    'scale': 50,
    'poison': 0
  },
};