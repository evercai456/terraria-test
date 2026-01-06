import { Game } from "./game.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game(ctx, canvas);

function loop() {
  game.update();
  game.draw();
  requestAnimationFrame(loop);
}

loop();
