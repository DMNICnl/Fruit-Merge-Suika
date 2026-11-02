// ===== FRUIT MERGE: a Suika-style game in plain JavaScript =====

// Grab things from the HTML page
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

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

// Little helper functions
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

drawFruit(80, 500, 0);
drawFruit(180, 480, 3);
drawFruit(300, 420, 9);
