const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

let direction = "right";
let moveX = 300;
let moveY = 200;
let interval = 0;
const gridWidth = 600;
const gridHeight = 400;
const moveSize = 10;
const snake = [{
    x: moveX,
    y: moveX,
}];

let foodX = Math.floor(Math.random() * (gridWidth / moveSize)) * moveSize;
let foodY = Math.floor(Math.random() * (gridHeight / moveSize)) * moveSize;

const drawFrame = () => {
    // we clean the canvas to draw new one
    context.clearRect(0, 0, canvas.width, canvas.height);

    // drawing empty canvas
    drawGrid();
    // adding food to the grid
    drawFood();

    // adding to beginning of array new head position
    snake.unshift({
        x: moveX,
        y: moveY,
    });

    // if head is at food position, add one more element to array and regenerate food
    if (moveX === foodX && moveY == foodY) {
        snake.unshift({
            x: foodX,
            y: foodY,
        });

        regenerateFood();
    } else {
        // else check if snake didn't hit it's own tale
        if (gameStatusHandler()) {
            window.clearInterval(interval);
            alert("You lost!");
        }
    }

    // removing last element of array
    snake.pop();

    // draw snake on the grid
    snake.forEach((s, i) => {
        context.fillStyle = i === 0 ? "#690101" : "#ff0000";
        context.fillRect(s.x, s.y, moveSize, moveSize);
    });

};

// creating new canvas rect
const drawGrid = () => {
    context.fillStyle = "#cacaca";
    context.fillRect(0, 0, gridWidth, gridHeight);
};

// draws food
const drawFood = () => {
    context.fillStyle = "#0000ff";
    context.fillRect(foodX, foodY, moveSize, moveSize);
};

// gets new food coordinate
const regenerateFood = () => {
    foodX = Math.floor(Math.random() * (gridWidth / moveSize)) * moveSize;
    foodY = Math.floor(Math.random() * (gridHeight / moveSize)) * moveSize;
};

// checks if game is lost
const gameStatusHandler = () => {
    let isGameLost = false;

    // snake out of bounds, 9 represents 1 point out of bounds that counts as lost game
    if (snake[0].x < 0 - 9 || snake[0].x > gridWidth - 9 || snake[0].y < 0 - 9 || snake[0].y > gridHeight - 9) {
        isGameLost = true;
    }

    // snake hit own but
    snake.forEach((s, i) => {
        if (snake[0].x === s.x && snake[0].y === s.y && i > 0) {
            isGameLost = true;
        }
    });

    return isGameLost;
};

interval = window.setInterval(() => {
    if (direction === "up") {
        moveY -= moveSize;
    }
    if (direction === "down") {
        moveY += moveSize;
    }
    if (direction === "left") {
        moveX -= moveSize;
    }
    if (direction === "right") {
        moveX += moveSize;
    }

    drawFrame();
}, 100);

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
    if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
    if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});

// init
drawFrame();
