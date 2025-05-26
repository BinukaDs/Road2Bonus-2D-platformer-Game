import Phaser from "phaser";
import { ObstacleManager } from "../ObstacleManager";
import { BackgroundManager } from "../BackgroundManager";
type ObstacleConfig = {
  y: number;
  scale: number;
};

class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  background: Phaser.GameObjects.Image;
  camera: Phaser.Cameras.Scene2D.Camera;
  obstacles: Phaser.Physics.Arcade.Group;
  obstacleManage: ObstacleManager;
  bgManager: BackgroundManager;

  obstacleSettings: Record<string, ObstacleConfig> = {
    rock: { y: 700, scale: 0.15 },
    key: { y: 420, scale: 0.1 },
  };

  constructor() {
    super("GameScene");
    this.bgManager = new BackgroundManager(this);
  }

  preload() {
    this.load.image("ninja", "assets/ninja.png");
    this.load.image("key", "assets/Key.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("rock", "assets/rock.png");
    this.load.image("bg", "assets/bg.png");
    this.load.image("ground", "assets/platform-bg.png");
    this.load.image("sky", "assets/sky-background.png");
    this.bgManager.preload();
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

    // this.background = this.add.image(
    //   this.cameras.main.width / 2,
    //   this.cameras.main.height / 2,
    //   "bg"
    // );
    // this.background.setDisplaySize(
    //   this.cameras.main.width,
    //   this.cameras.main.height
    // );

    // this.background.setScrollFactor(0);

    this.player = this.physics.add.sprite(
      this.cameras.main.width / 5,
      500,
      "ninja"
    );
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);
    this.physics.add.collider(this.player, ground);

    this.player.setDrag(0); // no resistance

    // platforms
    this.obstacles = this.physics.add.group();

    // this.time.addEvent({
    //   delay: 2000,
    //   callback: this.spawnObstacle,
    //   callbackScope: this,
    //   loop: true,
    // });
    this.sheduleNextObstacle();
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
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-560);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(560);
    } else if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-500);
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(500);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.space?.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-2650);
      //   this.player.setVelocityX(1250);
    }
    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-750);
    }
    if (this.cursors.down?.isDown) {
      this.player.setVelocityY(500);
    }

    // if (this.cursors.up?.isDown && this.player.body?.blocked.down) {
    //   this.player.setVelocity(-500);
    // }

    this.obstacles.getChildren().forEach((obstacle) => {
      if (obstacle.x < -obstacle.width) {
        this.obstacles.remove(obstacle, true, true);
      }
    });
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

  sheduleNextObstacle() {
    const delay = Phaser.Math.Between(1500, 3000);

    this.time.delayedCall(delay, () => {
      this.spawnObstacle();
      this.sheduleNextObstacle();
    });
  }

  private createKey(): Phaser.Physics.Arcade.Sprite {
    const key = this.obstacles.create(this.cameras.main.width + 50, 500, "key");
    key.setScale(0.15);
    key.setVelocityX(-700);
    key.setImmovable(true);
    key.body.allowGravity = false;

    return key;
  }

  private createRock(): Phaser.Physics.Arcade.Sprite {
    const rock = this.obstacles.create(
      this.cameras.main.width + 50,
      700,
      "rock"
    );
    rock.setScale(0.15);
    rock.setVelocityX(-1000);
    rock.setImmovable(true);
    rock.body.allowGravity = false;

    return rock;
  }

  private createPlatform(): Phaser.Physics.Arcade.Sprite {
    const platform = this.obstacles.create(
      this.cameras.main.width + 50,
      475,
      "platform"
    );
    platform.setScale(0.15);
    platform.setVelocityX(-800);
    platform.setImmovable(true);
    platform.body.allowGravity = false;
    // this.physics.add.collider(this.player, platform);
    return platform;
  }
}

export default GameScene;
