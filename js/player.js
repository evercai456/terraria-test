export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 28;
    this.h = 40;
  }

  update() {}

  draw(ctx) {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
