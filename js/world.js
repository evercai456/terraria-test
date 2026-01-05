class World {
  constructor() {
    this.width = WORLD_WIDTH;
    this.height = WORLD_HEIGHT;
    this.tiles = [];
    this.clouds = []; // Array para armazenar as nuvens

    this.generateWorld();
    this.generateClouds(); // Cria as nuvens iniciais
  }

  generateWorld() {
    for (let x = 0; x < this.width; x++) {
      this.tiles[x] = [];

      // --- GERADOR DE MONTANHAS ---
      // Usamos Math.sin para criar ondulações suaves (montanhas)
      // O valor 30 é a altura média, o 10 é a altura da montanha
      const mountainHeight = Math.sin(x * 0.1) * 10;
      const surfaceLevel = Math.floor(30 + mountainHeight);

      const dirtDepth = surfaceLevel + 5 + Math.floor(Math.random() * 3);
      const stoneDepth = dirtDepth + 7 + Math.floor(Math.random() * 5);

      for (let y = 0; y < this.height; y++) {
        if (y < surfaceLevel) {
          this.tiles[x][y] = BLOCKS.AIR;
        } else if (y === surfaceLevel) {
          this.tiles[x][y] = BLOCKS.GRASS;
        } else if (y < stoneDepth) {
          this.tiles[x][y] = BLOCKS.DIRT;
        } else {
          this.tiles[x][y] = BLOCKS.STONE;
        }
      }
    }
  }
  generateClouds() {
    this.clouds = [];
    for (let i = 0; i < CLOUD_COUNT; i++) {
      this.clouds.push({
        x: Math.random() * (window.innerWidth * 3), // Espalha bem as nuvens
        y: 50 + Math.random() * 150,
        width: 80 + Math.random() * 100,
        height: 40 + Math.random() * 20,
        // Velocidade bem baixa: base de 0.1 + um extra aleatório pequeno
        speed: CLOUD_SPEED + Math.random() * 0.1,
      });
    }
  }

  updateClouds() {
    this.clouds.forEach((cloud) => {
      cloud.x -= cloud.speed; // Move da direita para a esquerda

      // Se a nuvem sair totalmente da tela pela esquerda, volta pela direita
      if (cloud.x + cloud.width < 0) {
        cloud.x = window.innerWidth;
        cloud.y = Math.random() * (window.innerHeight / 3);
      }
    });
  }

  render(ctx, camera) {
    this.updateClouds();
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

    this.clouds.forEach((cloud) => {
      // 1. A posição da nuvem na tela é a posição dela menos um pouco do movimento da câmera
      let drawX = cloud.x - camera.x * 0.1;

      // 2. O truque do "Loop Infinito" simplificado:
      // Se a nuvem sair muito para a esquerda da visão, joga ela para a direita do mundo
      const buffer = 200; // Espaço extra para não sumir do nada

      // Se a nuvem sumiu pela esquerda da tela (considerando a câmera)
      if (drawX + cloud.width < -buffer) {
        // Move a posição 'real' da nuvem para a direita da câmera atual
        cloud.x = camera.x + window.innerWidth + buffer;
      }

      // Se o player andar para trás e a nuvem sumir pela direita
      if (drawX > window.innerWidth + buffer) {
        cloud.x = camera.x - cloud.width - buffer;
      }

      // 3. Desenho
      ctx.beginPath();
      ctx.roundRect(drawX, cloud.y, cloud.width, cloud.height, 20);
      ctx.fill();
    });

    // --- LÓGICA DOS BLOCOS ---
    // (O restante do seu código de renderização de blocos continua aqui abaixo...)
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const tile = this.tiles[x][y];
        if (tile !== BLOCKS.AIR) {
          if (tile === BLOCKS.GRASS) ctx.fillStyle = "#7cfc00";
          if (tile === BLOCKS.DIRT) ctx.fillStyle = "#8b4513";
          if (tile === BLOCKS.STONE) ctx.fillStyle = "#808080";

          ctx.fillRect(
            x * TILE_SIZE - camera.x,
            y * TILE_SIZE - camera.y,
            TILE_SIZE,
            TILE_SIZE
          );
        }
      }
    }
  }
}
