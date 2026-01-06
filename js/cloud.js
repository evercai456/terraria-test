export class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.scale = 0.8 + Math.random() * 1.4;
    this.speed = 0.04 + Math.random() * 0.06; // bem mais lento

    // formatos diferentes inspirados na imagem
    const shapes = [
      [
        "   011110   ",
        " 111111110 ",
        "1111111111 ",
        "1111111111 ",
        " 111111110 ",
      ],
      ["  01110   ", " 1111110 ", "11111111 ", " 1111110 "],
      ["   0111110  ", " 111111111 ", "1111111111 ", " 111111111 "],
      ["  0011100 ", " 01111110", "111111111", " 11111110"],
    ];

    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  }

  update() {
    this.x += this.speed;
    if (this.x > window.innerWidth + 200) {
      this.x = -200;
    }
  }

  draw(ctx) {
    const px = Math.floor(3 * this.scale);

    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        const p = this.shape[y][x];
        if (p === " ") continue;

        if (p === "1") ctx.fillStyle = "#ffffff";
        if (p === "0") ctx.fillStyle = "#e6e6e6";

        ctx.fillRect(this.x + x * px, this.y + y * px, px, px);
      }
    }

    // sombra inferior suave
    ctx.fillStyle = "#dcdcdc";
    ctx.fillRect(
      this.x + px * 2,
      this.y + px * (this.shape.length - 1),
      px * (this.shape[0].length - 4),
      px
    );
  }
}
