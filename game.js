var canvas;
var canvasContext;
var ball = {
  x: 50,
  y: 50,
  speedX: 20,
  speedY: 4
};
const WINNING_SCORE = 3;

var scores = {
  player1: 0,
  player2: 0
};
var showWinScreen = false;

var leftPaddle = {
  y: 250
};

var rightPaddle = {
  y: 250
};

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

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

function handleMouseClick() {
  if (showWinScreen) {
    scores = {
      player1: 0,
      player2: 0
    };

    showWinScreen = false;
  }
}

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  var framesPerSecond = 30;
  setInterval(renderGame, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", function(evt) {
    var mousePos = calculateMousePos(evt);
    // set left Paddle Y position (mouse is at the center of paddle)
    leftPaddle.y = mousePos.y - PADDLE_HEIGHT / 2;
  });

  canvas.addEventListener("mousedown", handleMouseClick);
};

function renderGame() {
  moveEverything();
  drawEverything();
}

function checkBallCollision(paddle) {
  if (ball.y > paddle.y && ball.y < paddle.y + PADDLE_HEIGHT) {
    ball.speedX = -ball.speedX;

    // some kind of math to compute the steepness when the paddle hits the ball
    ball.speedY = (ball.y - (paddle.y + PADDLE_HEIGHT / 2)) * 0.35;
  } else {
    if (paddle === leftPaddle) {
      scores.player2 += 1;
    } else {
      scores.player1 += 1;
    }

    console.log(scores);
    ballReset();
  }
}

// very advanced AI algorithm
function computerMovement() {
  var rightPaddleYCenter = rightPaddle.y + PADDLE_HEIGHT / 2;
  if (rightPaddleYCenter < ball.y - 35) {
    rightPaddle.y += 6;
  } else if (rightPaddleYCenter > ball.y + 35) {
    rightPaddle.y -= 6;
  }
}

function moveEverything() {
  if (showWinScreen) {
    return;
  }
  // let the right paddle (some kind of ai shit) chase the ball
  computerMovement();

  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.x < 0 || ball.x > canvas.width) {
    checkBallCollision(ball.x < 0 ? leftPaddle : rightPaddle);
  }

  if (ball.y > canvas.height || ball.y < 0) {
    // reverse ball direction if it hits the canvas boundary
    ball.speedY = -ball.speedY;
  }
}

function drawNet() {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}

function drawEverything() {
  // draw the game area
  colorRect(0, 0, canvas.width, canvas.height, "black");

  if (showWinScreen) {
    canvasContext.fillStyle = "white";
    if (scores.player1 >= WINNING_SCORE) {
      canvasContext.fillText("Player1 won! Good job jimmy!", 335, 200);
    } else {
      canvasContext.fillText("The bot won! Humans are fcked!", 325, 200);
    }

    canvasContext.fillText(`Click to play again...`, 350, 500);
    return;
  }

  // just draw middle net
  drawNet();

  // draw the left paddle
  colorRect(0, leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
  // draw the right paddle
  colorRect(
    canvas.width - PADDLE_WIDTH,
    rightPaddle.y,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    "white"
  );
  // draw the ball
  colorCircle(ball.x, ball.y, 10, "white");

  // display scores
  canvasContext.fillText(`Player 1 Score: ${scores.player1}`, 100, 100);
  canvasContext.fillText(
    `Player 2 Score: ${scores.player2}`,
    canvas.width - 100,
    100
  );
}

// if the ball goes out of bounds (the paddles didn't hit it),
// reset ball position to middle and reverse its direction
function ballReset() {
  if (scores.player1 >= WINNING_SCORE || scores.player2 >= WINNING_SCORE) {
    showWinScreen = true;
  }
  ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speedX: -ball.speedX,
    speedY: ball.speedY
  };
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
