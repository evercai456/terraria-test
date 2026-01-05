class Input {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, pressed: false, button: -1 };

    window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.key] = false));

    // Atualiza a posição do mouse na tela
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Detecta quando o botão é pressionado
    window.addEventListener("mousedown", (e) => {
      this.mouse.pressed = true;
      this.mouse.button = e.button;
    });

    // Detecta quando o botão é solto
    window.addEventListener("mouseup", () => {
      this.mouse.pressed = false;
      this.mouse.button = -1;
    });

    // Bloqueia o menu chato do botão direito
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}
