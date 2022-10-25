const getGameFunctions = ({ gameObj = {} }) => {
  const GameObj = gameObj;
  GameObj.gameData = {
    player: false,
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    clearState: false,
    plant: 0,
    nearWall: false,
    placeTube: false,
    toBeaker: false,
    key: false,
    state: false,
    playerSpeed: false,
    lastState: false,
    x_data: false,
    y_data: false,
    score: 0,
    stage: false,
    scene: false,
    stageDataID: false,
    gameEngineState: false,
    gameObject: false,
    gameScreenX: false,
    gameScreenY: false,
    validated: false,
    endGame: () => {},
    popupBox: () => {},
    matchRequirements: true,
    mgr: false,
  };

  GameObj.setEndGame = (endGame, mgr) => {
    GameObj.gameData.endGame = endGame;
    GameObj.gameData.mgr = mgr;
  };

  GameObj.gameDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  GameObj.moveUp = async () => {
    GameObj.gameData.player.setTexture('playerUp');
    GameObj.gameData.up += 1;
  };

  GameObj.moveDown = async () => {
    GameObj.gameData.player.setTexture('playerDown');
    GameObj.gameData.down += 1;
  };

  GameObj.moveLeft = async () => {
    GameObj.gameData.player.setTexture('playerLeft');
    GameObj.gameData.left += 1;
  };

  GameObj.moveRight = async () => {
    GameObj.gameData.player.setTexture('playerRight');
    GameObj.gameData.right += 1;
  };

  GameObj.resetGame = async () => {
    GameObj.gameData.clearState = 1;
  };

  GameObj.end = async () => {
    if (GameObj.gameData.score === 0) {
      GameObj.gameData.validated = false;
    } else if (GameObj.gameData.score > 0) {
      GameObj.gameData.validated = true;
      GameObj.gameData.score = 0;
    }
    if (GameObj.gameData.matchRequirements) {
      GameObj.gameData.endGame(GameObj.gameData.validated, GameObj.gameData.mgr.sourceCodeData);
    }
  };

  GameObj.plant = async () => {
    GameObj.gameData.plant += 1;
  };

  GameObj.nearWall = async () => GameObj.gameData.nearWall;

  GameObj.placeTube = async (num) => {
    GameObj.gameData.placeTube = num;
  };

  GameObj.takeTube = async (num, to) => {
    GameObj.gameData.placeTube = num;
    GameObj.gameData.toBeaker = to;
  };

  window.moveUp = GameObj.moveUp;
  window.moveDown = GameObj.moveDown;
  window.moveLeft = GameObj.moveLeft;
  window.moveRight = GameObj.moveRight;
  window.resetGame = GameObj.resetGame;
  window.end = GameObj.end;
  window.plant = GameObj.plant;
  window.nearWall = GameObj.nearWall;
  window.placeTube = GameObj.placeTube;
  window.takeTube = GameObj.takeTube;
  window.gameDelay = GameObj.gameDelay;

  GameObj.getGameStageID = () => GameObj.gameData.stageDataID;

  GameObj.playerBounds = () => {
    if (GameObj.gameData.player.x <= 32) {
      GameObj.gameData.player.x = 32;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }

    if (GameObj.gameData.player.x >= 742) {
      GameObj.gameData.player.x = 742;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }

    if (GameObj.gameData.player.y <= 32) {
      GameObj.gameData.player.y = 32;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }

    if (GameObj.gameData.player.y >= 417 - 32) {
      GameObj.gameData.player.y = 417 - 32;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }
  };

  GameObj.initializeScene = () => {
    GameObj.gameData.state = 'idle';
    GameObj.gameData.playerSpeed = 3;
    GameObj.gameData.lastState = 'idle';
    GameObj.gameData.right = 0;
    GameObj.gameData.left = 0;
    GameObj.gameData.up = 0;
    GameObj.gameData.down = 0;
    GameObj.gameData.x_data = 0;
    GameObj.gameData.y_data = 0;
    GameObj.gameData.score = 0;
    GameObj.gameData.scene = false;
  };

  GameObj.updateGameActions = () => {
    if (GameObj.gameData.right > 0) {
      GameObj.gameData.player.x += 64;
      GameObj.gameData.right -= 1;
    }
    if (GameObj.gameData.left > 0) {
      GameObj.gameData.player.x -= 64;
      GameObj.gameData.left -= 1;
    }
    if (GameObj.gameData.up > 0) {
      GameObj.gameData.player.y -= 64;
      GameObj.gameData.up -= 1;
    }
    if (GameObj.gameData.down > 0) {
      GameObj.gameData.player.y += 64;
      GameObj.gameData.down -= 1;
    }

    GameObj.playerBounds();
  };

  GameObj.setupGameConfig = (Phaser, parentElement = 'outputContainer', canvasElement = 'userCanvas') => {
    const Scene1 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene1() {
        Phaser.Scene.call(this, { key: 'Scene_1' });
        GameObj.initializeScene();
        this.stage = 'Scene_1';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map1.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.graphics = this.add.graphics();
        this.obst = this.add.sprite(
          this.sys.game.config.width / 2,
          (64 * 2),
          'pond',
        );
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(
          this.sys.game.config.width - (64 * 2),
          (64 * 3),
          'goal',
        );
        this.goal.setScale(2);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score += 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene2 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene2() {
        Phaser.Scene.call(this, { key: 'Scene_2' });
        GameObj.initializeScene();
        this.stage = 'Scene_2';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map2.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('foodBasket', 'foodBucket.png');
        this.load.image('rock', 'rock.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, (64 * 2), 'pond');
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(this.sys.game.config.width - 128, this.sys.game.config.height / 3 - 32, 'foodBasket');
        this.goal.setScale(1);
        this.rock = this.add.sprite(this.sys.game.config.width - 128, this.sys.game.config.height / 3 - 128, 'rock');
        this.rock = this.add.sprite(32, 300, 'rock');
        // this.rock.setScale(1.5);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        const rockRect = this.rock.getBounds();
        playerRect.top += 80;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, rockRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
          // this.scene.restart();
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene3 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene3() {
        Phaser.Scene.call(this, { key: 'Scene_3' });
        GameObj.initializeScene();
        this.stage = 'Scene_3';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map3.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('bush', 'bush.png');
        this.load.image('treelog', 'treeLog.png');
        this.load.image('mailBox', 'mailBox.png');
        this.load.audio('theme', 'Frankenstein_Goes_to_Jamaica.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 32, 'pond');
        this.obst.setScale(0.4);
        this.goal = this.add.sprite(this.sys.game.config.width / 1.2, this.sys.game.config.height / 2, 'mailBox');
        this.goal.setScale(1);
        this.bush = this.add.sprite(this.sys.game.config.width / 2 + 32, 86, 'bush');
        this.bush.setScale(0.3);
        this.bush = this.add.sprite(600, 400 + 16, 'bush');
        this.bush.setScale(0.3);
        this.treeLog = this.add.sprite(this.sys.game.config.width / 3, this.sys.game.config.height / 2, 'treelog');
        this.treeLog.setScale(1);
        this.treeLog = this.add.sprite(76, 416, 'treelog');
        this.treeLog.setScale(1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();
        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const logRect = this.treeLog.getBounds();
        const bushRect = this.bush.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, logRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, bushRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene4 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene4() {
        Phaser.Scene.call(this, { key: 'Scene_4' });
        GameObj.initializeScene();
        this.stage = 'Scene_4';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.image('key', 'key.png');
        this.load.image('door', 'trapDoor.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 4 + 50, 'pond');
        this.obst.setScale(0.5);
        this.door = this.add.sprite(this.sys.game.config.width - 64, this.sys.game.config.height / 3 - 64, 'door');
        this.door.setScale(0.02);
        this.goal = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 6, 'key');
        this.goal.setScale(0.1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        GameObj.gameData.key = 0;
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        const doorRect = this.door.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          this.goal.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key === 0) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox('you don\'t Have the Key');
          } else {
            GameObj.gameData.score = 1;
          }
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene5 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene5() {
        Phaser.Scene.call(this, { key: 'Scene_5' });
        GameObj.initializeScene();
        this.stage = 'Scene_5';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('sage', 'sage.png');
        this.load.image('shroom', 'shroom.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2.5, 'pond');
        this.obst.setScale(0.5);
        this.door = this.add.sprite(this.sys.game.config.width - 64, this.sys.game.config.height / 3, 'sage');
        this.door.setScale(0.2);
        this.goal = this.add.sprite(this.sys.game.config.width / 2, 100, 'shroom');
        this.goal.setScale(1);
        this.goal2 = this.add.sprite(this.sys.game.config.width / 4, 400, 'shroom');
        this.goal2.setScale(1);
        this.goal3 = this.add.sprite(this.sys.game.config.width / 6, this.sys.game.config.height / 2, 'shroom');
        this.goal3.setScale(1);
        this.goal4 = this.add.sprite(this.sys.game.config.width / 3, 100, 'shroom');
        this.goal4.setScale(1);
        this.goal5 = this.add.sprite(this.sys.game.config.width / 4, this.sys.game.config.height / 2, 'shroom');
        this.goal5.setScale(1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const doorRect = this.door.getBounds();
        const goalRect1 = this.goal.getBounds();
        const goalRect2 = this.goal2.getBounds();
        const goalRect3 = this.goal3.getBounds();
        const goalRect4 = this.goal4.getBounds();
        const goalRect5 = this.goal5.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect1)) {
          this.goal.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect2)) {
          this.goal2.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect3)) {
          this.goal3.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect4)) {
          this.goal4.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect5)) {
          this.goal5.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key < 5) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox('You don\'t have enough Mushrooms bruh !');
          } else {
            GameObj.gameData.score = 1;
          }
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene6 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene6() {
        Phaser.Scene.call(this, { key: 'Scene_6' });
        GameObj.initializeScene();
        this.stage = 'Scene_6';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map1.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.graphics = this.add.graphics();
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'pond');
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(32, 64 + 96, 'goal');
        this.goal.setScale(2);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene7 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene7() {
        Phaser.Scene.call(this, { key: 'Scene_7' });
        GameObj.initializeScene();
        this.stage = 'Scene_7';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map2.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('foodBasket', 'foodBucket.png');
        this.load.image('rock', 'rock.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, (64 * 2), 'pond');
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(96, 96 + 64, 'foodBasket');
        this.goal.setScale(1);
        this.rock = this.add.sprite(this.sys.game.config.width - 128, this.sys.game.config.height / 2, 'rock');
        this.rock = this.add.sprite(32, 420, 'rock');
        // this.rock.setScale(1.5);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        const rockRect = this.rock.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
          // this.scene.restart();
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, rockRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene8 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene8() {
        Phaser.Scene.call(this, { key: 'Scene_8' });
        GameObj.initializeScene();
        this.stage = 'Scene_8';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map3.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('bush', 'bush.png');
        this.load.image('treelog', 'treeLog.png');
        this.load.image('mailBox', 'mailBox.png');
        this.load.audio('theme', 'Frankenstein_Goes_to_Jamaica.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);

        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 32, 'pond');
        this.obst.setScale(0.4);
        this.goal = this.add.sprite(32, 210, 'mailBox');
        this.goal.setScale(1);
        this.bush = this.add.sprite(this.sys.game.config.width / 2 + 32, 86, 'bush');
        this.bush.setScale(0.3);
        this.bush = this.add.sprite(600, 400 + 16, 'bush');
        this.bush.setScale(0.3);
        this.treeLog = this.add.sprite(20, 148, 'treelog');
        this.treeLog.setScale(1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const logRect = this.treeLog.getBounds();
        const bushRect = this.bush.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, logRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, bushRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene9 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene9() {
        Phaser.Scene.call(this, { key: 'Scene_9' });
        GameObj.initializeScene();
        this.stage = 'Scene_9';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.image('key', 'key.png');
        this.load.image('door', 'trapDoor.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 64, 'pond');
        this.obst.setScale(0.5);
        this.door = this.add.sprite(160, 100, 'door');
        this.door.setScale(0.02);
        this.goal = this.add.sprite(160, 232, 'key');
        this.goal.setScale(0.1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const doorRect = this.door.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key === 0) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox('you don\'t have the key');
          } else {
            GameObj.gameData.score = 1;
          }
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          this.goal.destroy();
          GameObj.gameData.key = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene10 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene10() {
        Phaser.Scene.call(this, { key: 'Scene_10' });
        GameObj.initializeScene();
        this.stage = 'Scene_10';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('sage', 'sage.png');
        this.load.image('shroom', 'shroom.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);

        this.door = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 3, 'sage');
        this.door.setScale(0.2);
        this.goal = this.add.sprite(this.sys.game.config.width / 2, 100, 'shroom');
        this.goal.setScale(1);
        this.goal2 = this.add.sprite(this.sys.game.config.width / 4, 400, 'shroom');
        this.goal2.setScale(1);
        this.goal3 = this.add.sprite(this.sys.game.config.width / 6, this.sys.game.config.height / 4, 'shroom');
        this.goal3.setScale(1);
        this.goal4 = this.add.sprite(this.sys.game.config.width / 3, 100, 'shroom');
        this.goal4.setScale(1);
        this.goal5 = this.add.sprite(this.sys.game.config.width / 4, this.sys.game.config.height / 4, 'shroom');
        this.goal5.setScale(1);
        const camera = this.cameras.main;
        GameObj.gameData.key = 0;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const doorRect = this.door.getBounds();
        const goalRect1 = this.goal.getBounds();
        const goalRect2 = this.goal2.getBounds();
        const goalRect3 = this.goal3.getBounds();
        const goalRect4 = this.goal4.getBounds();
        const goalRect5 = this.goal5.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key < 5) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox('You don\'t have enough Mushrooms bruh !');
          } else {
            GameObj.gameData.score = 1;
          }
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect1)) {
          this.goal.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect2)) {
          this.goal2.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect3)) {
          this.goal3.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect4)) {
          this.goal4.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect5)) {
          this.goal5.destroy();
          GameObj.gameData.key += 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    if (!GameObj.gameData.gameEngineState) {
      let gameWidth;
      let gameHeight;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        gameWidth = window.screen.width;
        gameHeight = window.screen.height;
        if (gameWidth > 800) {
          gameWidth = 800;
        }
        if (gameHeight > 1000) {
          gameHeight = 1000;
        }
        GameObj.gameData.gameScreenX = gameWidth;
        GameObj.gameData.gameScreenY = gameHeight;
        // gameHeight /= 2;
      } else {
        const styleElement = getComputedStyle(document.getElementById(parentElement));
        gameWidth = parseInt(styleElement.width.replace('px', ''), 10);
        gameHeight = parseInt(styleElement.height.replace('px', ''), 10);
        GameObj.gameData.gameScreenX = gameWidth;
        GameObj.gameData.gameScreenY = gameHeight;
      }

      const config = {
        type: Phaser.AUTO,
        // width: gameWidth,
        // height: gameHeight,
        width: gameWidth,
        height: gameHeight,
        pixelArt: true,
        autoResize: true,
        parent: document.getElementById(canvasElement),
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10],
        audio: {
          disableWebAudio: true,
        },
      };

      // if (isMobile) {
      //   config.context = canvasContext;
      // } else {

      // }

      try {
        const game = new Phaser.Game(config);
        GameObj.gameData.gameObject = game;
        GameObj.gameData.gameEngineState = true;
      } catch (err) {
        console.error(err);
      }
    }
    return GameObj;
  };

  GameObj.executeCode = (code) => {
    try {
      GameObj.gameData.matchRequirements = true;
      GameObj.gameData.scene.restart();
      eval(`(async () => {${`await gameDelay(500);\n${code}`}})()`); // eslint-disable-line no-eval
    } catch (error) {
      GameObj.gameData.popupBox('Please check your code');
      throw new Error(error);
    }
  };

  GameObj.initGame = (
    phaser, parentElement, canvasElement, response, popupBox,
  ) => {
    GameObj.gameData.stageDataID = `Scene_${response.questionObject.qid}`;
    GameObj.gameData.score = 0;
    GameObj.gameData.popupBox = popupBox;
    GameObj.setupGameConfig(
      phaser, parentElement, canvasElement,
    );
    return GameObj;
  };

  return {
    GameObj,
  };
};

const getGameFunctionsMob = `
const getGameFunctions = ({ gameObj = {} }) => {
  const GameObj = gameObj;
  GameObj.gameData = {
    player: false,
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    clearState: false,
    plant: 0,
    nearWall: false,
    placeTube: false,
    toBeaker: false,
    key: false,
    state: false,
    playerSpeed: false,
    lastState: false,
    x_data: false,
    y_data: false,
    score: 0,
    stage: false,
    scene: false,
    stageDataID: false,
    gameEngineState: false,
    gameObject: false,
    gameScreenX: false,
    gameScreenY: false,
    validated: false,
    endGame: () => {},
    popupBox: () => {},
    matchRequirements: true,
    mgr: false,
  };

  GameObj.setEndGame = (endGame, mgr) => {
    GameObj.gameData.endGame = endGame;
    GameObj.gameData.mgr = mgr;
  };

  GameObj.gameDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  GameObj.moveUp = async () => {
    GameObj.gameData.player.setTexture('playerUp');
    GameObj.gameData.up += 1;
  };

  GameObj.moveDown = async () => {
    GameObj.gameData.player.setTexture('playerDown');
    GameObj.gameData.down += 1;
  };

  GameObj.moveLeft = async () => {
    GameObj.gameData.player.setTexture('playerLeft');
    GameObj.gameData.left += 1;
  };

  GameObj.moveRight = async () => {
    GameObj.gameData.player.setTexture('playerRight');
    GameObj.gameData.right += 1;
  };

  GameObj.resetGame = async () => {
    GameObj.gameData.clearState = 1;
  };

  GameObj.end = async () => {
    if (GameObj.gameData.score === 0) {
      GameObj.gameData.validated = false;
    } else if (GameObj.gameData.score > 0) {
      GameObj.gameData.validated = true;
      GameObj.gameData.score = 0;
    }
    if (GameObj.gameData.matchRequirements) {
      GameObj.gameData.endGame(GameObj.gameData.validated, GameObj.gameData.mgr.sourceCodeData);
    }
  };

  GameObj.plant = async () => {
    GameObj.gameData.plant += 1;
  };

  GameObj.nearWall = async () => GameObj.gameData.nearWall;

  GameObj.placeTube = async (num) => {
    GameObj.gameData.placeTube = num;
  };

  GameObj.takeTube = async (num, to) => {
    GameObj.gameData.placeTube = num;
    GameObj.gameData.toBeaker = to;
  };

  window.moveUp = GameObj.moveUp;
  window.moveDown = GameObj.moveDown;
  window.moveLeft = GameObj.moveLeft;
  window.moveRight = GameObj.moveRight;
  window.resetGame = GameObj.resetGame;
  window.end = GameObj.end;
  window.plant = GameObj.plant;
  window.nearWall = GameObj.nearWall;
  window.placeTube = GameObj.placeTube;
  window.takeTube = GameObj.takeTube;
  window.gameDelay = GameObj.gameDelay;

  GameObj.getGameStageID = () => GameObj.gameData.stageDataID;

  GameObj.playerBounds = () => {
    if (GameObj.gameData.player.x <= 32) {
      GameObj.gameData.player.x = 32;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }

    if (GameObj.gameData.player.x >= 742) {
      GameObj.gameData.player.x = 742;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }

    if (GameObj.gameData.player.y <= 32) {
      GameObj.gameData.player.y = 32;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }

    if (GameObj.gameData.player.y >= 417 - 32) {
      GameObj.gameData.player.y = 417 - 32;
      GameObj.gameData.nearWall = 1;
    } else {
      GameObj.gameData.nearWall = 0;
    }
  };

  GameObj.initializeScene = () => {
    GameObj.gameData.state = 'idle';
    GameObj.gameData.playerSpeed = 3;
    GameObj.gameData.lastState = 'idle';
    GameObj.gameData.right = 0;
    GameObj.gameData.left = 0;
    GameObj.gameData.up = 0;
    GameObj.gameData.down = 0;
    GameObj.gameData.x_data = 0;
    GameObj.gameData.y_data = 0;
    GameObj.gameData.score = 0;
    GameObj.gameData.scene = false;
  };

  GameObj.updateGameActions = () => {
    if (GameObj.gameData.right > 0) {
      GameObj.gameData.player.x += 64;
      GameObj.gameData.right -= 1;
    }
    if (GameObj.gameData.left > 0) {
      GameObj.gameData.player.x -= 64;
      GameObj.gameData.left -= 1;
    }
    if (GameObj.gameData.up > 0) {
      GameObj.gameData.player.y -= 64;
      GameObj.gameData.up -= 1;
    }
    if (GameObj.gameData.down > 0) {
      GameObj.gameData.player.y += 64;
      GameObj.gameData.down -= 1;
    }

    GameObj.playerBounds();
  };

  GameObj.setupGameConfig = (Phaser, parentElement = 'outputContainer', canvasElement = 'userCanvas') => {
    const Scene1 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene1() {
        Phaser.Scene.call(this, { key: 'Scene_1' });
        GameObj.initializeScene();
        this.stage = 'Scene_1';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map1.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.graphics = this.add.graphics();
        this.obst = this.add.sprite(
          this.sys.game.config.width / 2,
          (64 * 2),
          'pond',
        );
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(
          this.sys.game.config.width - (64 * 2),
          (64 * 3),
          'goal',
        );
        this.goal.setScale(2);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score += 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene2 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene2() {
        Phaser.Scene.call(this, { key: 'Scene_2' });
        GameObj.initializeScene();
        this.stage = 'Scene_2';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map2.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('foodBasket', 'foodBucket.png');
        this.load.image('rock', 'rock.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, (64 * 2), 'pond');
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(this.sys.game.config.width - 128, this.sys.game.config.height / 3 - 32, 'foodBasket');
        this.goal.setScale(1);
        this.rock = this.add.sprite(this.sys.game.config.width - 128, this.sys.game.config.height / 3 - 128, 'rock');
        this.rock = this.add.sprite(32, 300, 'rock');
        // this.rock.setScale(1.5);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        const rockRect = this.rock.getBounds();
        playerRect.top += 80;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, rockRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
          // this.scene.restart();
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene3 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene3() {
        Phaser.Scene.call(this, { key: 'Scene_3' });
        GameObj.initializeScene();
        this.stage = 'Scene_3';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map3.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('bush', 'bush.png');
        this.load.image('treelog', 'treeLog.png');
        this.load.image('mailBox', 'mailBox.png');
        this.load.audio('theme', 'Frankenstein_Goes_to_Jamaica.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 32, 'pond');
        this.obst.setScale(0.4);
        this.goal = this.add.sprite(this.sys.game.config.width / 1.2, this.sys.game.config.height / 2, 'mailBox');
        this.goal.setScale(1);
        this.bush = this.add.sprite(this.sys.game.config.width / 2 + 32, 86, 'bush');
        this.bush.setScale(0.3);
        this.bush = this.add.sprite(600, 400 + 16, 'bush');
        this.bush.setScale(0.3);
        this.treeLog = this.add.sprite(this.sys.game.config.width / 3, this.sys.game.config.height / 2, 'treelog');
        this.treeLog.setScale(1);
        this.treeLog = this.add.sprite(76, 416, 'treelog');
        this.treeLog.setScale(1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();
        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const logRect = this.treeLog.getBounds();
        const bushRect = this.bush.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, logRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, bushRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene4 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene4() {
        Phaser.Scene.call(this, { key: 'Scene_4' });
        GameObj.initializeScene();
        this.stage = 'Scene_4';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.image('key', 'key.png');
        this.load.image('door', 'trapDoor.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 4 + 50, 'pond');
        this.obst.setScale(0.5);
        this.door = this.add.sprite(this.sys.game.config.width - 64, this.sys.game.config.height / 3 - 64, 'door');
        this.door.setScale(0.02);
        this.goal = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 6, 'key');
        this.goal.setScale(0.1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        GameObj.gameData.key = 0;
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        const doorRect = this.door.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          this.goal.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key === 0) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox("you don't Have the Key");
          } else {
            GameObj.gameData.score = 1;
          }
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene5 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene5() {
        Phaser.Scene.call(this, { key: 'Scene_5' });
        GameObj.initializeScene();
        this.stage = 'Scene_5';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('sage', 'sage.png');
        this.load.image('shroom', 'shroom.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2.5, 'pond');
        this.obst.setScale(0.5);
        this.door = this.add.sprite(this.sys.game.config.width - 64, this.sys.game.config.height / 3, 'sage');
        this.door.setScale(0.2);
        this.goal = this.add.sprite(this.sys.game.config.width / 2, 100, 'shroom');
        this.goal.setScale(1);
        this.goal2 = this.add.sprite(this.sys.game.config.width / 4, 400, 'shroom');
        this.goal2.setScale(1);
        this.goal3 = this.add.sprite(this.sys.game.config.width / 6, this.sys.game.config.height / 2, 'shroom');
        this.goal3.setScale(1);
        this.goal4 = this.add.sprite(this.sys.game.config.width / 3, 100, 'shroom');
        this.goal4.setScale(1);
        this.goal5 = this.add.sprite(this.sys.game.config.width / 4, this.sys.game.config.height / 2, 'shroom');
        this.goal5.setScale(1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const doorRect = this.door.getBounds();
        const goalRect1 = this.goal.getBounds();
        const goalRect2 = this.goal2.getBounds();
        const goalRect3 = this.goal3.getBounds();
        const goalRect4 = this.goal4.getBounds();
        const goalRect5 = this.goal5.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect1)) {
          this.goal.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect2)) {
          this.goal2.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect3)) {
          this.goal3.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect4)) {
          this.goal4.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect5)) {
          this.goal5.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key < 5) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox("You don't have enough Mushrooms bruh !");
          } else {
            GameObj.gameData.score = 1;
          }
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene6 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene6() {
        Phaser.Scene.call(this, { key: 'Scene_6' });
        GameObj.initializeScene();
        this.stage = 'Scene_6';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map1.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.graphics = this.add.graphics();
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'pond');
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(32, 64 + 96, 'goal');
        this.goal.setScale(2);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene7 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene7() {
        Phaser.Scene.call(this, { key: 'Scene_7' });
        GameObj.initializeScene();
        this.stage = 'Scene_7';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map2.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('foodBasket', 'foodBucket.png');
        this.load.image('rock', 'rock.png');
        this.load.audio('theme', 'Four_Under_the_Floor.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, (64 * 2), 'pond');
        this.obst.setScale(0.5);
        this.goal = this.add.sprite(96, 96 + 64, 'foodBasket');
        this.goal.setScale(1);
        this.rock = this.add.sprite(this.sys.game.config.width - 128, this.sys.game.config.height / 2, 'rock');
        this.rock = this.add.sprite(32, 420, 'rock');
        // this.rock.setScale(1.5);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const goalRect = this.goal.getBounds();
        const rockRect = this.rock.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
          // this.scene.restart();
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, rockRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }

        return null;
      },
    });

    const Scene8 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene8() {
        Phaser.Scene.call(this, { key: 'Scene_8' });
        GameObj.initializeScene();
        this.stage = 'Scene_8';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map3.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('bush', 'bush.png');
        this.load.image('treelog', 'treeLog.png');
        this.load.image('mailBox', 'mailBox.png');
        this.load.audio('theme', 'Frankenstein_Goes_to_Jamaica.mp3');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);

        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 32, 'pond');
        this.obst.setScale(0.4);
        this.goal = this.add.sprite(32, 210, 'mailBox');
        this.goal.setScale(1);
        this.bush = this.add.sprite(this.sys.game.config.width / 2 + 32, 86, 'bush');
        this.bush.setScale(0.3);
        this.bush = this.add.sprite(600, 400 + 16, 'bush');
        this.bush.setScale(0.3);
        this.treeLog = this.add.sprite(20, 148, 'treelog');
        this.treeLog.setScale(1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const logRect = this.treeLog.getBounds();
        const bushRect = this.bush.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, logRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, bushRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          GameObj.gameData.score = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene9 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene9() {
        Phaser.Scene.call(this, { key: 'Scene_9' });
        GameObj.initializeScene();
        this.stage = 'Scene_9';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('goal', 'goal.png');
        this.load.image('key', 'key.png');
        this.load.image('door', 'trapDoor.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);
        this.obst = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 64, 'pond');
        this.obst.setScale(0.5);
        this.door = this.add.sprite(160, 100, 'door');
        this.door.setScale(0.02);
        this.goal = this.add.sprite(160, 232, 'key');
        this.goal.setScale(0.1);
        const camera = this.cameras.main;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const pondRect = this.obst.getBounds();
        const doorRect = this.door.getBounds();
        const goalRect = this.goal.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, pondRect)) {
          GameObj.gameData.player.x = GameObj.gameData.x_data;
          GameObj.gameData.player.y = GameObj.gameData.y_data;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key === 0) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox("you don't have the key");
          } else {
            GameObj.gameData.score = 1;
          }
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
          this.goal.destroy();
          GameObj.gameData.key = 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    const Scene10 = new Phaser.Class({
      Extends: Phaser.Scene,

      initialize:

      function Scene10() {
        Phaser.Scene.call(this, { key: 'Scene_10' });
        GameObj.initializeScene();
        this.stage = 'Scene_10';
      },

      preload() {
        this.load.path = 'https://raw.githubusercontent.com/ABIBV/rn-assets/main/assets/';
        this.load.image('img_3500', 'img_3500.jpg');
        this.load.image('playerDown', 'down.png');
        this.load.image('playerUp', 'up.png');
        this.load.image('playerRight', 'right.png');
        this.load.image('playerLeft', 'left.png');
        this.load.tilemapTiledJSON('map', 'map4.json');
        this.load.image('objects', 'objects.png');
        this.load.image('pond', 'pond.png');
        this.load.image('sage', 'sage.png');
        this.load.image('shroom', 'shroom.png');
        GameObj.gameData.scene = this.scene;
      },

      create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset1 = map.addTilesetImage('objects', 'objects');
        const tileset2 = map.addTilesetImage('img_3500', 'img_3500');
        map.createStaticLayer('groundLayer', tileset2, 0, 0);
        map.createStaticLayer('worldLayer_1', tileset1);
        map.createStaticLayer('worldLayer_2', tileset1);
        map.createStaticLayer('worldLayer_3', tileset1);
        GameObj.gameData.player = this.physics.add
          .sprite(32, 64, 'playerDown')
          .setSize(30, 40)
          .setScale(0.5)
          .setOffset(0, 24)
          .setDepth(10);

        this.door = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 3, 'sage');
        this.door.setScale(0.2);
        this.goal = this.add.sprite(this.sys.game.config.width / 2, 100, 'shroom');
        this.goal.setScale(1);
        this.goal2 = this.add.sprite(this.sys.game.config.width / 4, 400, 'shroom');
        this.goal2.setScale(1);
        this.goal3 = this.add.sprite(this.sys.game.config.width / 6, this.sys.game.config.height / 4, 'shroom');
        this.goal3.setScale(1);
        this.goal4 = this.add.sprite(this.sys.game.config.width / 3, 100, 'shroom');
        this.goal4.setScale(1);
        this.goal5 = this.add.sprite(this.sys.game.config.width / 4, this.sys.game.config.height / 4, 'shroom');
        this.goal5.setScale(1);
        const camera = this.cameras.main;
        GameObj.gameData.key = 0;
        camera.startFollow(GameObj.gameData.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      },

      update() {
        if (GameObj.gameData.clearState === 1) {
          this.scene.restart();
          GameObj.gameData.clearState = 0;
        }
        GameObj.updateGameActions();

        const playerRect = GameObj.gameData.player.getBounds();
        const doorRect = this.door.getBounds();
        const goalRect1 = this.goal.getBounds();
        const goalRect2 = this.goal2.getBounds();
        const goalRect3 = this.goal3.getBounds();
        const goalRect4 = this.goal4.getBounds();
        const goalRect5 = this.goal5.getBounds();
        playerRect.top += 50;

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, doorRect)) {
          if (GameObj.gameData.key < 5) {
            GameObj.gameData.matchRequirements = false;
            GameObj.gameData.popupBox("You don't have enough Mushrooms bruh !");
          } else {
            GameObj.gameData.score = 1;
          }
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect1)) {
          this.goal.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect2)) {
          this.goal2.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect3)) {
          this.goal3.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect4)) {
          this.goal4.destroy();
          GameObj.gameData.key += 1;
        }

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect5)) {
          this.goal5.destroy();
          GameObj.gameData.key += 1;
        }

        GameObj.gameData.x_data = GameObj.gameData.player.x;
        GameObj.gameData.y_data = GameObj.gameData.player.y;

        if (GameObj.gameData.stageDataID !== this.stage) {
          this.scene.restart();
          GameObj.gameData.score = 0;
          this.scene.start(GameObj.gameData.stageDataID);
          this.stage = GameObj.gameData.stageDataID;
        }
        return null;
      },
    });

    if (!GameObj.gameData.gameEngineState) {
      let gameWidth;
      let gameHeight;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        gameWidth = window.screen.width;
        gameHeight = window.screen.height;
        if (gameWidth > 800) {
          gameWidth = 800;
        }
        if (gameHeight > 1000) {
          gameHeight = 1000;
        }
        GameObj.gameData.gameScreenX = gameWidth;
        GameObj.gameData.gameScreenY = gameHeight;
        // gameHeight /= 2;
      } else {
        const styleElement = getComputedStyle(document.getElementById(parentElement));
        gameWidth = parseInt(styleElement.width.replace('px', ''), 10);
        gameHeight = parseInt(styleElement.height.replace('px', ''), 10);
        GameObj.gameData.gameScreenX = gameWidth;
        GameObj.gameData.gameScreenY = gameHeight;
      }

      const config = {
        type: Phaser.AUTO,
        // width: gameWidth,
        // height: gameHeight,
        width: gameWidth,
        height: gameHeight,
        pixelArt: true,
        autoResize: true,
        parent: document.getElementById(canvasElement),
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9, Scene10],
        audio: {
          disableWebAudio: true,
        },
      };

      // if (isMobile) {
      //   config.context = canvasContext;
      // } else {

      // }

      try {
        const game = new Phaser.Game(config);
        GameObj.gameData.gameObject = game;
        GameObj.gameData.gameEngineState = true;
      } catch (err) {
        GameObj.gameData.popupBox('Error initializing game: ' + err.message);
      }
    }
    return GameObj;
  };

  GameObj.executeCode = (code) => {
    try {
      GameObj.gameData.matchRequirements = true;
      GameObj.gameData.scene.restart();
      const exec = '(async () => { try { await gameDelay(500);\\n' + code +' } catch (err) { GameObj.gameData.popupBox("title: error from execcode, " + err.message); } })()';
      eval(exec);
    } catch (err) {
      GameObj.gameData.popupBox('Please check your code');
      throw new Error(err);
    }
  };

  GameObj.initGame = (
    phaser, parentElement, canvasElement, response, popupBox,
  ) => {
    GameObj.gameData.stageDataID = 'Scene_' + response.questionObject.qid;
    GameObj.gameData.score = 0;
    GameObj.gameData.popupBox = popupBox;
    GameObj.setupGameConfig(
      phaser, parentElement, canvasElement,
    );
    return GameObj;
  };

  return {
    GameObj,
  };
}`;

const { GameObj } = getGameFunctions({});

const {
  gameData,
  executeCode,
  end,
  gameDelay,
  getGameStageID,
  initGame,
  initializeScene,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  nearWall,
  placeTube,
  plant,
  playerBounds,
  resetGame,
  setEndGame,
  setupGameConfig,
  takeTube,
  updateGameActions,
} = GameObj;

export default null;

export {
  gameData,
  executeCode,
  end,
  gameDelay,
  getGameStageID,
  initGame,
  initializeScene,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  nearWall,
  placeTube,
  plant,
  playerBounds,
  resetGame,
  setEndGame,
  setupGameConfig,
  takeTube,
  updateGameActions,
  getGameFunctionsMob,
  getGameFunctions,
};
