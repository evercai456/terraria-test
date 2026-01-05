class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.input = new Input();
    this.world = new World();
    this.player = new Player();
    this.camera = new Camera();

    this.loop();
  }

  handleMouseInteraction() {
    if (!this.input.mouse.pressed) return;

    // 1. Onde o mouse está no mundo (considerando o scroll da câmera)
    const worldMouseX = this.input.mouse.x + this.camera.x;
    const worldMouseY = this.input.mouse.y + this.camera.y;

    // 2. Qual o índice do bloco (ex: bloco 10, bloco 25)
    const tileX = Math.floor(worldMouseX / TILE_SIZE);
    const tileY = Math.floor(worldMouseY / TILE_SIZE);

    // 3. Verifica se o clique está dentro do mapa
    if (
      tileX >= 0 &&
      tileX < WORLD_WIDTH &&
      tileY >= 0 &&
      tileY < WORLD_HEIGHT
    ) {
      if (this.input.mouse.button === 0) {
        // Botão Esquerdo
        this.world.tiles[tileX][tileY] = BLOCKS.AIR;
      } else if (this.input.mouse.button === 2) {
        // Botão Direito
        // Só coloca se o lugar estiver vazio
        if (this.world.tiles[tileX][tileY] === BLOCKS.AIR) {
          this.world.tiles[tileX][tileY] = BLOCKS.DIRT;
        }
      }
    }
  }

  update() {
    this.player.update(this.input, this.world);
    this.camera.update(this.player, this.canvas);

    // ESSENCIAL: Chama a interação do mouse todo frame
    this.handleMouseInteraction();
  }

  draw() {
    this.ctx.fillStyle = "#87CEEB";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.world.render(this.ctx, this.camera);
    this.player.draw(this.ctx, this.camera);

    // Opcional: Desenha um quadradinho branco onde o mouse está "mirando"
    this.drawMouseSelection();
  }

  drawMouseSelection() {
    const worldMouseX = this.input.mouse.x + this.camera.x;
    const worldMouseY = this.input.mouse.y + this.camera.y;
    const tileX = Math.floor(worldMouseX / TILE_SIZE) * TILE_SIZE;
    const tileY = Math.floor(worldMouseY / TILE_SIZE) * TILE_SIZE;

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(
      tileX - this.camera.x,
      tileY - this.camera.y,
      TILE_SIZE,
      TILE_SIZE
    );
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}
