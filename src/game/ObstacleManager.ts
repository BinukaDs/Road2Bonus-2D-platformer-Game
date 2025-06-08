import Phaser from "phaser";

type ObstacleType = "rock" | "key";

type ObstacleConfig = {
  y: number;
  scale: number;
};

const obstacleSettings: Record<string, ObstacleConfig> = {
  rock: { y: 700, scale: 0.15 },
  key: { y: 420, scale: 0.1 },
};
export class ObstacleManager {
  private scene: Phaser.Scene;
  obstacles: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("key", "assets/Key.png");
    this.scene.load.image("platform", "assets/platform.png");
    this.scene.load.image("rock", "assets/rock.png");
  }

  spawn() {
    const patterns = [["rock"], ["rock", "key"], ["key", "rock"], ["key"], []];

    const pattern = Phaser.Utils.Array.GetRandom(patterns);
    const range = Phaser.Math.Between(1, 100);

    pattern.forEach((type, index) => {
      const x = this.scene.scale.width + index * 100;
      const y = type === "rock" ? 700 : 420;
      
      // TODO: Obstacles not creating
      const obj = this.obstacles.create(x, y, type);
      obj.setScale(0.15);
      obj.setVelocityX(-800);
      obj.setImmovable(true);
      obj.body.allowGravity = false;
    });

    // let type: ObstacleType;
    // if (range <= 30) {
    //   type = "key";
    // } else {
    //   type = "rock";
    // }

    // const config = obstacleSettings[type];

    // const obstacle = this.group.create(
    //   this.scene.cameras.main.width + 50,
    //   config.y,
    //   type
    // );
    // obstacle.setScale(config.scale);
    // obstacle.setVelocityX(-800);
    // obstacle.setImmovable(true);
    // obstacle.body.allowGravity = false;
  }

  sheduleNextObstacle() {
    const delay = Phaser.Math.Between(1500, 3000);

    this.scene.time.delayedCall(delay, () => {
      this.spawn();
      this.sheduleNextObstacle();
    });
  }

  update() {
    // this.obstacles.getChildren().forEach((obstacle) => {
    //   if (
    //     obstacle instanceof Phaser.Physics.Arcade.Sprite &&
    //     obstacle.x < -obstacle.width
    //   ) {
    //     this.obstacles.remove(obstacle, true, true);
    //   }
    // });
    // this.obstacles.getChildren().forEach((obstacle) => {
    //   if (obstacle.x < -obstacle.width) {
    //     this.obstacles.remove(obstacle, true, true);
    //   }
    // });
  }

  // private createKey(): Phaser.Physics.Arcade.Sprite {
  //   const key = this.obstacles.create(this.cameras.main.width + 50, 500, "key");
  //   key.setScale(0.15);
  //   key.setVelocityX(-700);
  //   key.setImmovable(true);
  //   key.body.allowGravity = false;

  //   return key;
  // }

  // private createRock(): Phaser.Physics.Arcade.Sprite {
  //   const rock = this.obstacles.create(
  //     this.cameras.main.width + 50,
  //     700,
  //     "rock"
  //   );
  //   rock.setScale(0.15);
  //   rock.setVelocityX(-1000);
  //   rock.setImmovable(true);
  //   rock.body.allowGravity = false;

  //   return rock;
  // }

  // private createPlatform(): Phaser.Physics.Arcade.Sprite {
  //   const platform = this.obstacles.create(
  //     this.cameras.main.width + 50,
  //     475,
  //     "platform"
  //   );
  //   platform.setScale(0.15);
  //   platform.setVelocityX(-800);
  //   platform.setImmovable(true);
  //   platform.body.allowGravity = false;
  //   // this.physics.add.collider(this.player, platform);
  //   return platform;
  // }
}
