// ===== FRUIT MERGE: a Suika-style game in plain JavaScript =====

// Grab things from the HTML page
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Little helper functions
function circle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

circle(200, 300, 40, '#d62839');
