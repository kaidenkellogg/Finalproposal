// 🧍 Player setup
let player;
let playerSize = 30;
let speed = 3;

// 🟥 Obstacles
let obstacles = [];

function setup() {
  createCanvas(600, 400);
  createPlayer();
  createObstacles(5); // Create 5 obstacles
}

function draw() {
  background(220);
  drawBorders();
  movePlayer();
  drawPlayer();
  moveObstacles();
  drawExit();
  checkWin();
}

// ✅ Create and control a player
function createPlayer() {
  player = createVector(50, height / 2);
}

function drawPlayer() {
  fill(0, 0, 255);
  ellipse(player.x, player.y, playerSize);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += speed;
  if (keyIsDown(UP_ARROW)) player.y -= speed;
  if (keyIsDown(DOWN_ARROW)) player.y += speed;
}

// ✅ Add interactive elements
function mousePressed() {
  drawMouseObject(mouseX, mouseY);
}

function drawMouseObject(x, y) {
  fill(random(255), random(255), random(255));
  rect(x, y, 20, 20);
}

function createObstacles(num) {
  for (let i = 0; i < num; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      w: random(20, 50),
      h: random(20, 50),
      color: [random(255), random(255), random(255)],
      dx: random(-2, 2),
      dy: random(-2, 2)
    });
  }
}

// ✅ Move obstacles dynamically
function moveObstacles() {
  for (let obs of obstacles) {
    obs.x += obs.dx;
    obs.y += obs.dy;

    // Wrap around screen
    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;

    fill(obs.color);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
}

// ✅ Game boundaries and goal
function drawBorders() {
  noFill();
  stroke(0);
  strokeWeight(4);
  rect(0, 0, width, height);
}

function drawExit() {
  fill(0, 255, 0);
  rect(width - 40, height / 2 - 20, 30, 40); // Exit point
}

function checkWin() {
  if (
    player.x > width - 40 &&
    player.y > height / 2 - 20 &&
    player.y < height / 2 + 20
  ) {
    textSize(32);
    fill(0, 200, 0);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop(); // Stop the game
  }
}