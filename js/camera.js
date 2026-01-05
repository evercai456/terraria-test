class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    // Tente valores entre 0.05 (muito suave) e 0.2 (mais firme)
    this.lerpSpeed = 0.15;
  }

  update(player, canvas) {
    // Alvo: posição do player menos metade da tela para centralizar
    let targetX = player.x - canvas.width / 2 + player.width / 2;
    let targetY = player.y - canvas.height / 2 + player.height / 2;

    // Suavização (Interpolação Linear)
    this.x += (targetX - this.x) * this.lerpSpeed;
    this.y += (targetY - this.y) * this.lerpSpeed;

    // Limites do Mundo (Opcional: impede a câmera de mostrar o "vazio" fora do mapa)
    if (this.x < 0) this.x = 0;
    const maxWorldWidth = WORLD_WIDTH * TILE_SIZE;
    if (this.x > maxWorldWidth - canvas.width)
      this.x = maxWorldWidth - canvas.width;
  }
}
