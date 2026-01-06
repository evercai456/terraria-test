export class Player {
  constructor(x, y, world) {
    this.world = world;

    this.w = world.tileSize * 1.2;
    this.h = world.tileSize * 2;

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;

    this.speed = 0.8;
    this.jumpForce = -4.5;
    this.gravity = 0.25;

    this.onGround = false;

    this.keys = {};
    window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
  }

  update() {
    // movimento horizontal
    this.vx = 0;
    if (this.keys["a"] || this.keys["ArrowLeft"]) this.vx = -this.speed;
    if (this.keys["d"] || this.keys["ArrowRight"]) this.vx = this.speed;

    // pulo
    if (
      (this.keys["w"] || this.keys[" "] || this.keys["ArrowUp"]) &&
      this.onGround
    ) {
      this.vy = this.jumpForce;
      this.onGround = false;
    }

    // gravidade
    this.vy += this.gravity;

    // mover
    this.x += this.vx;
    this.y += this.vy;

    this.checkGroundCollision();
  }

  checkGroundCollision() {
    const tileSize = this.world.tileSize;

    const footY = this.y + this.h;
    const tileY = Math.floor(footY / tileSize);
    const tileX1 = Math.floor(this.x / tileSize);
    const tileX2 = Math.floor((this.x + this.w) / tileSize);

    for (let tx of [tileX1, tileX2]) {
      const tile = this.world.tiles[tileY]?.[tx];
      if (tile === 1 || tile === 2 || tile === 3) {
        this.y = tileY * tileSize - this.h;
        this.vy = 0;
        this.onGround = true;
        return;
      }
    }

    this.onGround = false;
  }

  draw(ctx) {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
