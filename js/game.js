import { World } from "./world.js";
import { Player } from "./player.js";

export class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.world = new World(canvas.height);

    // spawn em cima da grama
    const spawnX = 10 * this.world.tileSize;
    const spawnY =
      this.world.grassHeight * this.world.tileSize - this.world.tileSize * 2;

    this.player = new Player(spawnX, spawnY, this.world);
  }

  update() {
    this.player.update();
  }

  draw() {
    this.ctx.fillStyle = "#4aa3ff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.world.draw(this.ctx);
    this.player.draw(this.ctx);
  }
}
