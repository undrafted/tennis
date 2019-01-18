var canvas;
var canvasContext;
var ball = {
  x: 50,
  y: 0,
  speed: 5
};

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(renderGame, 1000 / framesPerSecond);
};

function renderGame() {
  moveEverything();
  drawEverything();
}

function moveEverything() {
  ball.x += ball.speed;

  if (ball.x > canvas.width || ball.x < 0) {
    // reverse ball direction if it hits the canvas boundary
    ball.speed = -ball.speed;
  }
}

function drawEverything() {
  // draw the game area
  colorRect(0, 0, canvas.width, canvas.height, "black");
  // draw the left pad
  colorRect(0, 210, 10, 100, "white");
  // draw the ball
  colorCircle(ball.x, 150, 10, "white");
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  //arc
  // first 2 args - center of circle
  // other args: radius, angle, circumference, clockwise
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
