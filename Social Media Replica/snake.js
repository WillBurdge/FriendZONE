// Set up the canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define the size of each square in the grid
var gridSize = 10;

// Define the initial snake position and direction
var snake = [{ x: 10, y: 10 }];
var direction = "right";

// Define the initial food position
var food = { x: 20, y: 20 };

// Define a function to draw a square
function drawSquare(x, y) {
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

// Define a function to draw the snake
function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    drawSquare(snake[i].x, snake[i].y);
  }
}

// Define a function to draw the food
function drawFood() {
  drawSquare(food.x, food.y);
}

// Define a function to move the snake
function moveSnake() {
  // Determine the new head position based on the current direction
  var newHead;
  switch (direction) {
    case "up":
      newHead = { x: snake[0].x, y: snake[0].y - 1 };
      break;
    case "down":
      newHead = { x: snake[0].x, y: snake[0].y + 1 };
      break;
    case "left":
      newHead = { x: snake[0].x - 1, y: snake[0].y };
      break;
    case "right":
      newHead = { x: snake[0].x + 1, y: snake[0].y };
      break;
  }

  // Check if the new head position is valid
  if (newHead.x < 0 || newHead.x >= canvas.width / gridSize ||
      newHead.y < 0 || newHead.y >= canvas.height / gridSize) {
    // Game over if the snake hits a wall
    alert("Game over!");
    location.reload();
    return;
  }
  for (var i = 1; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      // Game over if the snake hits itself
      alert("Game over!");
      location.reload();
      return;
    }
  }

  // Check if the new head position is on the food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Add a new square to the snake and generate a new food position
    snake.push(snake[snake.length - 1]);
    food.x = Math.floor(Math.random() * canvas.width / gridSize);
    food.y = Math.floor(Math.random() * canvas.height / gridSize);
  }

  // Move the snake by adding the new head and removing the tail
  snake.unshift(newHead);
  snake.pop();
}

// Define a function to handle keyboard input
function handleInput(event) {
  switch (event.keyCode) {
    case 38: // Up arrow
