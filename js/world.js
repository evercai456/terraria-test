// js/world.js
export class World {
  constructor(canvasHeight) {
    this.tileSize = Math.floor(32 / 6); // redução 6x
    this.cols = 400;
    this.rows = Math.floor(canvasHeight / this.tileSize);

    // grama FICA NO CHÃO DA TELA
    this.grassHeight = this.rows - 37;

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
      // grama reta no chão
      this.tiles[this.grassHeight][x] = 1;

      // profundidade variável SOMENTE abaixo
      const dirtDepth = 4 + Math.floor(Math.random() * 4);
      const stoneStart =
        this.grassHeight + dirtDepth + Math.floor(Math.random() * 6);

      for (let y = this.grassHeight + 1; y < this.rows; y++) {
        if (y < stoneStart) {
          this.tiles[y][x] = 2; // terra
        } else {
          this.tiles[y][x] = 3; // pedra
        }
      }
    }
  }

  draw(ctx) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const t = this.tiles[y][x];
        if (t === 0) continue;

        if (t === 1) ctx.fillStyle = "#2ecc71";
        if (t === 2) ctx.fillStyle = "#8e5a2a";
        if (t === 3) ctx.fillStyle = "#7f8c8d";

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
