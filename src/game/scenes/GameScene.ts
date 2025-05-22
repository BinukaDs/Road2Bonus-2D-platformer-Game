import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  background: Phaser.GameObjects.Image;
  camera: Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("ninja", "assets/ninja.png");
    this.load.image("key", "assets/Key.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("rock", "assets/rock.png");
    this.load.image("bg", "assets/bg.png");
    this.load.image("platform", "assets/platform-bg.png");
    this.load.image("sky", "assets/sky-background.png");
  }

  create() {
    const ground = this.physics.add.staticGroup();
    ground.create(500, 1280, "platform").setScale(1).refreshBody();
    gr
    this.camera = this.cameras.main;

    this.background = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "bg"
    );
    this.background.setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );

    // Optional: If you want the background to stay fixed to the camera
    this.background.setScrollFactor(0);

    this.player = this.physics.add.sprite(100, 500, "ninja");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);
    this.physics.add.collider(this.player, ground);

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-560);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(560);
    } else if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-500);
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(500);
    } else if (this.cursors.space?.isDown) {
      this.player.setVelocityY(-500);
      this.player.setAccelerationX(400);
    } else {
      this.player.setVelocity(0);
    }

    // if (this.cursors.up?.isDown && this.player.body?.blocked.down) {
    //   this.player.setVelocity(-500);
    // }
  }
}

export default GameScene;
