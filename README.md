# Fruit Merge — a Suika-style game in vanilla JS

Open `index.html` in your browser to play. Move the mouse over the jar, click to drop a fruit.
Two of the same fruit merge into a bigger one. Don't let the pile cross the red line!

## Files
- `index.html` — the skeleton (canvas + score)
- `style.css`  — the clothes (centering, the jar look)
- `game.js`    — the brain (the finished game)

## Checkpoints (match the video steps)
`checkpoints/step3.js` … `step9.js` are what `game.js` looks like at the end of each step.
Stuck? Copy a checkpoint over your `game.js` and keep going.

| Step | What you add | Built-ins you meet |
|---|---|---|
| 3 | draw a circle | getElementById, getContext, beginPath, arc, Math.PI, fillStyle, fill |
| 4 | fruit list + faces | arrays, objects, rgba |
| 5 | gravity + game loop | forEach, push, clearRect, requestAnimationFrame |
| 6 | mouse dropping | addEventListener, getBoundingClientRect, Math.random, Math.floor, Math.min/max, setTimeout |
| 7 | bumping | for loops, Math.hypot |
| 8 | merging + score | splice, textContent |
| 9 | game over + best | localStorage, Number, some, fillRect, fillText |

## Practice challenges
1. Change `GRAVITY`, `BOUNCE`, `FRICTION` and feel the difference.
2. Show the *next* fruit in a small preview box.
3. Play a sound when fruits merge (`new Audio('pop.mp3').play()`).
4. Make it work on a phone (`touchstart` / `touchmove`).
5. Rebuild the whole game from an empty file without looking.
