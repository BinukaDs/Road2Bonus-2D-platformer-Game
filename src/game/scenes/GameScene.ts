import Phaser from "phaser";
import { ObstacleManager } from "../ObstacleManager";
import { BackgroundManager } from "../BackgroundManager";
import { PlayerController } from "../controllers/Playercontroller";
type ObstacleConfig = {
  y: number;
  scale: number;
};

class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  background: Phaser.GameObjects.Image;
  camera: Phaser.Cameras.Scene2D.Camera;

  obstacleManager: ObstacleManager;
  bgManager!: BackgroundManager;
  playerController!: PlayerController;

  obstacleSettings: Record<string, ObstacleConfig> = {
    rock: { y: 700, scale: 0.15 },
    key: { y: 420, scale: 0.1 },
  };

  constructor() {
    super("GameScene");
    this.bgManager = new BackgroundManager(this);
    this.playerController = new PlayerController(this);
    this.obstacleManager = new ObstacleManager(this);
  }

  preload() {
    this.load.spritesheet("player", "assets/player-sprite-sheet.png", {
      frameWidth: 279,
      frameHeight: 384,
    });
    this.load.image("ninja", "assets/ninja.png");
    this.load.image("key", "assets/Key.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("rock", "assets/rock.png");

    this.bgManager.preload();
    this.playerController.preload();
    this.obstacleManager.preload();
  }

  create() {
    const platformWidth = 64;
    const screenWidth = this.scale.width;
    const ground = this.physics.add.staticGroup();

    for (let x = 0; x < screenWidth; x += platformWidth) {
      ground.create(x + platformWidth / 2, 1235, "ground");
    }
    this.bgManager.create();
    this.camera = this.cameras.main;

    this.playerController.create();

    this.playerController.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.playerController.sprite, ground);

    this.playerController.sprite.setDrag(0); // no resistance

    // platforms
    // this.obstacles = this.physics.add.group();

    // this.physics.add.overlap(
    //   this.player,
    //   this.obstacles,
    //   this.handleGameOver,
    //   undefined,
    //   this
    // );

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    this.bgManager.update();
    this.playerController.update();
    this.obstacleManager.sheduleNextObstacle();
    this.obstacleManager.update();
  }

  spawnObstacle() {
    const range = Phaser.Math.Between(1, 100);

    if (range <= 40) {
      this.createRock();
    } else if (range <= 70) {
      //   this.createPlatform();
    } else {
      this.createKey();
    }
    // const config = this.obstacleSettings[type];
    // const y = type === "rock" ? 700 : 420;
    // const obstacle = this.obstacles.create(
    //   this.cameras.main.width - 200,
    //   700,
    //   type
    // );
    // obstacle.setScale(0.15);
    // obstacle.setVelocityX(-800);
    // obstacle.setImmovable(true);
    // obstacle.body.allowGravity = false;
  }

  handleGameOver() {
    this.scene.restart();
  }

  // sheduleNextObstacle() {
  //   const delay = Phaser.Math.Between(1500, 3000);

  //   this.time.delayedCall(delay, () => {
  //     this.spawnObstacle();
  //     this.sheduleNextObstacle();
  //   });
  // }
}

export default GameScene;
