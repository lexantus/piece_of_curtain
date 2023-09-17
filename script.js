/** @type {HTMLCanvasElement} **/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "#fff5de";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = "rgb(0, 0, 0, 0.1)";
/* type GlobalCompositeOperation = "color" | "color-burn" | "color-dodge" | "copy" | "darken" |
   "destination-atop" | "destination-in" | "destination-out" | "destination-over" |
   "difference" | "exclusion" | "hard-light" | "hue" | "lighten" | "lighter" | "luminosity" |
   "multiply" | "overlay" | "saturation" | "screen" | "soft-light" | "source-atop" |
   "source-in" | "source-out" | "source-over" | "xor";
*/

// TODO: performance issue when using "destination-over" width shadow
// ctx.globalCompositeOperation = "destination-over";

const rand = (min, max) => Math.random() * (max - min) + min;

let drawing = false;

class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = rand(-2, 2);
    this.speedY = rand(-2, 2);
    this.maxSize = rand(5, 27);
    this.size = 0;
    this.angleX = rand(0, 6.2);
    this.angleY = rand(0, 6.2);
    this.angle = 0;
    this.vs = rand(0.5, 0.7); // velocity of size
    this.va = rand(0.05, 0.25); // velocity of angle
    this.vax = rand(0.02, 0.48); // velocity of angle x
    this.vay = rand(0.02, 0.48); // velocity of angle y
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angle += this.va;
    this.angleX += this.vax;
    this.angleY += this.vay;
    if (this.size < this.maxSize) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
      let double = this.size * 2;
      ctx.strokeStyle = "#3c5186";
      ctx.lineWidth = 1;
      ctx.strokeRect(0 - double / 2, 0 - double / 2, double, double);
      let triple = this.size * 3;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "white";
      ctx.strokeRect(0 - triple / 2, 0 - triple / 2, triple, triple);
      ctx.restore();

      requestAnimationFrame(this.update.bind(this));
    }
  }
}

window.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  for (let i = 0; i < 3; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});

window.addEventListener("mousedown", function(e) {
  drawing = true;
  for (let i = 0; i < 6; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});

window.addEventListener("mouseup", function() {
  drawing = false;
});
