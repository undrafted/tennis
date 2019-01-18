var canvas;
var canvasContext;
var ball = {
  x: 50,
  y: 50,
  speedX: 5,
  speedY: 4
};

var leftPaddle = {
  y: 250
};

const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(renderGame, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", function(evt) {
    var mousePos = calculateMousePos(evt);
    console.log(mousePos);
    // set left Paddle Y position (mouse is at the center of paddle)
    leftPaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function renderGame() {
  moveEverything();
  drawEverything();
}

function moveEverything() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.x > canvas.width || ball.x < 0) {
    // reverse ball direction if it hits the canvas boundary
    ball.speedX = -ball.speedX;
  }
  if (ball.y > canvas.height || ball.y < 0) {
    // reverse ball direction if it hits the canvas boundary
    ball.speedY = -ball.speedY;
  }
}

function drawEverything() {
  // draw the game area
  colorRect(0, 0, canvas.width, canvas.height, "black");
  // draw the left paddle
  colorRect(0, leftPaddle.y, 10, PADDLE_HEIGHT, "white");
  // draw the ball
  colorCircle(ball.x, ball.y, 10, "white");
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
