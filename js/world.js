// js/world.js
export class World {
  constructor() {
    this.tileSize = Math.floor(32 / 6); // pixels reduzidos em 6x
    this.cols = 300;
    this.rows = 120;

    this.grassHeight = 25; // GRAMA RETA
    this.tiles = [];

    this.generate();
  }

  generate() {
    for (let y = 0; y < this.rows; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < this.cols; x++) {
        this.tiles[y][x] = 0; // céu
      }
    }

    for (let x = 0; x < this.cols; x++) {
      // grama reta
      this.tiles[this.grassHeight][x] = 1;

      // variação SOMENTE abaixo da grama
      let dirtDepth = 4 + Math.floor(Math.random() * 4);
      let stoneStart =
        this.grassHeight + dirtDepth + Math.floor(Math.random() * 6);

      for (let y = this.grassHeight + 1; y < this.rows; y++) {
        if (y < stoneStart) {
          this.tiles[y][x] = 2; // terra irregular
        } else {
          this.tiles[y][x] = 3; // pedra irregular
        }
      }
    }
  }

  draw(ctx) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const t = this.tiles[y][x];
        if (t === 0) continue;

        if (t === 1) ctx.fillStyle = "#2ecc71"; // grama
        if (t === 2) ctx.fillStyle = "#8e5a2a"; // terra
        if (t === 3) ctx.fillStyle = "#7f8c8d"; // pedra

        ctx.fillRect(
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }
}
