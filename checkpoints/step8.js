// ===== FRUIT MERGE: a Suika-style game in plain JavaScript =====

// Grab things from the HTML page
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('score');

// Game settings (change these to play around!)
const GRAVITY = 0.4;
const BOUNCE = 0.3;
const FRICTION = 0.98;
const DROP_Y = 50;

// All the fruits, from smallest to biggest
const FRUITS = [
  { name: 'cherry',     radius: 14, color: '#d62839' },
  { name: 'strawberry', radius: 20, color: '#ff6b6b' },
  { name: 'grape',      radius: 27, color: '#9b5de5' },
  { name: 'orange',     radius: 34, color: '#ff9f1c' },
  { name: 'apple',      radius: 42, color: '#8ac926' },
  { name: 'pear',       radius: 51, color: '#e9d985' },
  { name: 'peach',      radius: 60, color: '#ffafcc' },
  { name: 'pineapple',  radius: 70, color: '#ffd60a' },
  { name: 'melon',      radius: 82, color: '#b5e48c' },
  { name: 'watermelon', radius: 96, color: '#2d6a4f' },
];

// The game's memory (these change while we play)
let fruits = [];
let score = 0;
let mouseX = canvas.width / 2;
let nextType = randomType();
let canDrop = true;

// Little helper functions
function randomType() {
  return Math.floor(Math.random() * 5);
}

function makeFruit(x, y, type) {
  return { x: x, y: y, vx: 0, vy: 0, type: type, radius: FRUITS[type].radius };
}

function circle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawFruit(x, y, type) {
  const r = FRUITS[type].radius;
  circle(x, y, r, FRUITS[type].color);                          // body
  circle(x - r * 0.35, y - r * 0.35, r * 0.25, 'rgba(255,255,255,0.5)'); // shine
  circle(x - r * 0.3, y + r * 0.1, r * 0.1, '#3b2a1a');          // left eye
  circle(x + r * 0.3, y + r * 0.1, r * 0.1, '#3b2a1a');          // right eye
}

// Mouse controls
canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
});

canvas.addEventListener('click', () => {
  if (!canDrop) return;
  fruits.push(makeFruit(dropX(), DROP_Y, nextType));
  nextType = randomType();
  canDrop = false;
  setTimeout(() => { canDrop = true; }, 500);
});

function dropX() {
  const r = FRUITS[nextType].radius;
  return Math.min(Math.max(mouseX, r), canvas.width - r);
}

// Physics: falling
function moveFruits() {
  fruits.forEach((f) => {
    f.vy += GRAVITY;    // gravity pulls a tiny bit more every frame
    f.vx *= FRICTION;   // sliding slows down a tiny bit every frame
    f.x += f.vx;
    f.y += f.vy;
  });
}

function keepInJar(f) {
  if (f.y + f.radius > canvas.height) {   // floor
    f.y = canvas.height - f.radius;
    f.vy *= -BOUNCE;
  }
  if (f.x - f.radius < 0) {               // left wall
    f.x = f.radius;
    f.vx *= -BOUNCE;
  }
  if (f.x + f.radius > canvas.width) {    // right wall
    f.x = canvas.width - f.radius;
    f.vx *= -BOUNCE;
  }
}

// Physics: bumping into each other
function handleCollisions() {
  for (let i = 0; i < fruits.length; i++) {
    for (let j = i + 1; j < fruits.length; j++) {
      const a = fruits[i];
      const b = fruits[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      const minDistance = a.radius + b.radius;

      if (distance >= minDistance || distance === 0) continue; // not touching

      // Same fruit? Merge them into a bigger one!
      if (a.type === b.type && a.type < FRUITS.length - 1) {
        merge(i, j);
        return;
      }

      // Push them apart so they don't overlap
      const overlap = (minDistance - distance) / 2;
      const nx = dx / distance;
      const ny = dy / distance;
      a.x -= nx * overlap;
      a.y -= ny * overlap;
      b.x += nx * overlap;
      b.y += ny * overlap;

      // If they are still moving into each other, take that speed away
      const towards = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
      if (towards > 0) {
        a.vx -= nx * towards / 2;
        a.vy -= ny * towards / 2;
        b.vx += nx * towards / 2;
        b.vy += ny * towards / 2;
      }
    }
  }
}

function merge(i, j) {
  const a = fruits[i];
  const b = fruits[j];
  const newType = a.type + 1;
  fruits.splice(j, 1);   // remove b first (j is the bigger number)
  fruits.splice(i, 1);   // then remove a
  fruits.push(makeFruit((a.x + b.x) / 2, (a.y + b.y) / 2, newType));
  score += newType * 10;
}

// Drawing everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (canDrop) drawFruit(dropX(), DROP_Y, nextType);
  fruits.forEach((f) => drawFruit(f.x, f.y, f.type));
  scoreText.textContent = score;
}

// The game loop: runs about 60 times every second
function gameLoop() {
  moveFruits();
  for (let k = 0; k < 4; k++) {
    handleCollisions();
    fruits.forEach((f) => keepInJar(f));
  }
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
