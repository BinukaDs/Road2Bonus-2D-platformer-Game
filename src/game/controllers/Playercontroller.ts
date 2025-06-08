import Phaser, { Game } from "phaser";
import GameScene from "../scenes/GameScene";

export class PlayerController {
  private scene: GameScene;
  public sprite!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  preload() {
    // run spriteSheet
    this.scene.load.spritesheet("player-run", "assets/player-run.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    // jump spriteSheet
    this.scene.load.spritesheet("player-jump", "assets/player-jump.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.cursors = this.scene.input.keyboard?.createCursorKeys();

    this.sprite = this.scene.physics.add.sprite(100, 450, "player-run");
    this.sprite.setCollideWorldBounds(true);

    // Run animation
    this.scene.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNumbers("player-run", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Fast run
    this.scene.anims.create({
      key: "run-fast",
      frames: this.scene.anims.generateFrameNumbers("player-run", {
        start: 0,
        end: 5,
      }),
      frameRate: 20,
      repeat: -1,
    });

    // Jump animation
    this.scene.anims.create({
      key: "jump",
      frames: this.scene.anims.generateFrameNumbers("player-jump", {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      repeat: 0,
    });

    // this.sprite.play("run");
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setScale(5);
  }

  update() {
    if (this.cursors.left?.isDown) {
      this.sprite.setVelocityX(-560);
    } else if (this.cursors.right?.isDown) {
      this.sprite.setVelocityX(560);
      this.sprite.play("jump", true);
    } else if (this.cursors.up?.isDown) {
      this.sprite.setVelocityY(-500);
    } else if (this.cursors.down?.isDown) {
      this.sprite.setVelocityY(500);
    } else {
      this.sprite.setVelocityX(0);
    }
    if (this.cursors.space?.isDown && this.sprite.body?.touching.down) {
      this.sprite.setVelocityY(-2650);
      this.sprite.play("jump", true);
      this.sprite.setVelocityX(1250);
    } else if (
      this.sprite.body?.blocked.down &&
      this.sprite.anims.currentAnim?.key !== "run"
    ) {
      this.sprite.play("run", true);
    }

    if (this.cursors.up?.isDown) {
      this.sprite.setVelocityY(-750);
    }
    if (this.cursors.down?.isDown) {
      this.sprite.setVelocityY(500);
    }
  }
}
