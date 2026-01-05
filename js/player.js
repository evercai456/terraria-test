class Player {
  constructor() {
    this.width = TILE_SIZE * 0.8;
    this.height = TILE_SIZE * 1.8;

    // Inicia no meio do mundo horizontalmente
    this.x = (WORLD_WIDTH * TILE_SIZE) / 2;
    // Inicia um pouco acima do nível 30 para não nascer dentro da terra
    this.y = 20 * TILE_SIZE;

    this.velX = 0;
    this.velY = 0;
    this.onGround = false;
  }

  update(input, world) {
    // 1. Movimentação Horizontal
    if (input.keys["ArrowLeft"] || input.keys["a"]) {
      this.velX = -PLAYER_SPEED;
    } else if (input.keys["ArrowRight"] || input.keys["d"]) {
      this.velX = PLAYER_SPEED;
    } else {
      this.velX *= 0.7;
      if (Math.abs(this.velX) < 0.1) this.velX = 0;
    }

    // 2. Movimento X + Sistema de Degrau (ajustado para não "quicar")
    const oldY = this.y;
    this.x += this.velX;

    // Se colidir lateralmente, tentamos subir o degrau
    if (this.checkCollision(world, "x")) {
      // Tenta subir exatamente a altura de um bloco (TILE_SIZE)
      this.y -= TILE_SIZE + 1;

      if (this.checkCollision(world, "x")) {
        // Se ainda assim colidir, é uma parede alta: volta para a posição anterior
        this.y = oldY;
      } else {
        // Se não colidir mais, ele subiu! Mantemos o Y novo, mas sem dar impulso de pulo
        // Apenas garantimos que ele não fique "voando"
        this.y += TILE_SIZE;
      }
    }

    // 3. Gravidade (sempre aplicada)
    this.velY += GRAVITY;

    // 4. Pulo (apenas se a tecla for pressionada E estiver no chão)
    if (
      (input.keys["ArrowUp"] || input.keys["w"] || input.keys[" "]) &&
      this.onGround
    ) {
      this.velY = JUMP_FORCE;
      this.onGround = false;
    }

    // 5. Movimento Y
    this.y += this.velY;

    // Antes de checar colisão Y, assumimos que não está no chão
    // A função checkCollision vai setar onGround = true se tocar em algo embaixo
    let wasOnGround = this.onGround;
    this.onGround = false;
    this.checkCollision(world, "y");
  }

  checkCollision(world, axis) {
    let collided = false;
    let left = Math.floor(this.x / TILE_SIZE);
    let right = Math.floor((this.x + this.width) / TILE_SIZE);
    let top = Math.floor(this.y / TILE_SIZE);
    let bottom = Math.floor((this.y + this.height) / TILE_SIZE);

    // Limites do mapa
    left = Math.max(0, left);
    right = Math.min(world.width - 1, right);
    top = Math.max(0, top);
    bottom = Math.min(world.height - 1, bottom);

    for (let x = left; x <= right; x++) {
      for (let y = top; y <= bottom; y++) {
        if (world.tiles[x] && world.tiles[x][y] !== BLOCKS.AIR) {
          collided = true;
          if (axis === "x") {
            if (this.velX > 0) this.x = x * TILE_SIZE - this.width;
            else if (this.velX < 0) this.x = (x + 1) * TILE_SIZE;
          } else {
            if (this.velY > 0) {
              this.y = y * TILE_SIZE - this.height;
              this.onGround = true;
              this.velY = 0;
            } else if (this.velY < 0) {
              this.y = (y + 1) * TILE_SIZE;
              this.velY = 0;
            }
          }
        }
      }
    }
    return collided;
  }
  draw(ctx, camera) {
    // Corpo
    ctx.fillStyle = "#3498db";
    ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);

    // Cabeça
    ctx.fillStyle = "#ffdbac";
    ctx.fillRect(
      this.x - camera.x,
      this.y - camera.y,
      this.width,
      this.height / 3
    );

    // Olho
    ctx.fillStyle = "black";
    ctx.fillRect(
      this.x - camera.x + this.width / 2,
      this.y - camera.y + 5,
      3,
      3
    );
  }
}
