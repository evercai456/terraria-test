// js/game.js
import { World } from "./world.js";
import { Player } from "./player.js";
import { Cloud } from "./cloud.js";

export class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.world = new World(canvas.height);

    const spawnX = 10 * this.world.tileSize;
    const spawnY =
      this.world.grassHeight * this.world.tileSize - this.world.tileSize * 2;

    this.player = new Player(spawnX, spawnY, this.world);

    // nuvens (mais espalhadas)
    this.clouds = [];
    const cloudCount = 10;

    for (let i = 0; i < cloudCount; i++) {
      this.clouds.push(
        new Cloud(
          Math.random() * (canvas.width * 1.5) - canvas.width * 0.25, // mais espalhado horizontal
          20 +
            Math.random() *
              (this.world.grassHeight * this.world.tileSize * 0.35) // mais espalhado vertical
        )
      );
    }
  }

  update() {
    this.clouds.forEach((c) => c.update());
    this.player.update();
  }

  draw() {
    this.ctx.fillStyle = "#4aa3ff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.clouds.forEach((c) => c.draw(this.ctx));

    this.world.draw(this.ctx);
    this.player.draw(this.ctx);
  }
}
