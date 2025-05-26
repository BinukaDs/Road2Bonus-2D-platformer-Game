import Phaser from "phaser";

export class BackgroundManager {
  private scene: Phaser.Scene;
  private clouds!: Phaser.GameObjects.TileSprite;
  private mountains!: Phaser.GameObjects.TileSprite;
  private ground!: Phaser.GameObjects.TileSprite;
  private sky!: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("clouds1", "assets/cloud-1.png");
    this.scene.load.image("clouds2", "assets/cloud-2.png");
    this.scene.load.image("mountains1", "assets/mountains-1.png");
    this.scene.load.image("mountains2", "assets/mountains-2.png");
    this.scene.load.image("ground1", "assets/ground-1.png");
    this.scene.load.image("ground2", "assets/ground-2.png");
    this.scene.load.image("sky", "assets/sky-background.png");
  }

  create() {
    const { width, height } = this.scene.scale;

    this.sky = this.scene.add
      .tileSprite(0, 0, height, width, "sky")
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDisplaySize(width, height);

    this.mountains = this.scene.add
      .tileSprite(0, height / 3, width, 0, "mountains1")
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.clouds = this.scene.add
      .tileSprite(0, 0, width, height, "clouds1")
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setScale(0.4);
    this.ground = this.scene.add
      .tileSprite(0, height / 1.5, width, height / 3, "ground1")
      .setOrigin(0, 0)
      .setScrollFactor(0);
  }

  update() {
    this.clouds.tilePositionX += 0.2;
    this.mountains.tilePositionX += 3.5;
    this.ground.tilePositionX += 7.0;
    this.sky.tilePositionX += 0.1;
  }
}
