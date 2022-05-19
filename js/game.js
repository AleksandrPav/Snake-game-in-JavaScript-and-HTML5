const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");

const ground = document.createElement(`IMG`);
ground.src = "/ground.png";

const foodImg = document.createElement(`IMG`);
foodImg.src = "/food.png";

let box = 48;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 23 + 1)) * box,
    y: Math.floor((Math.random() * 11 + 1)) * box,
};

let snake = [];
snake[0] = {
    x: 12 * box,
    y: 6 * box
};
let width = canvas.width;
let height = canvas.height;

const blockSize = 30;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;

document.addEventListener("keydown", direction);
let d;
function direction(e) {
   let k = e.keyCode;
	if ([38,39,40,37].indexOf(k) >= 0) e.preventDefault();
	if (k == 39 && d != 3) d = 1; //Вправо
	if (k == 40 && d != 4) d = 2; //Вниз
	if (k == 37 && d != 1) d = 3; //Влево
	if (k == 38 && d != 2) d = 4; //Вверх
}
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++){
        if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game),alert("Ваш счёт: " + score);
    }
}
let drawBorder = function () {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
    };
    

function drawGame() {
    



    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 1.5, box * 1.5);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 23 + 1)) * box,
            y: Math.floor((Math.random() * 11 + 1)) * box,
        };
        
    } else {
        snake.pop();
    }
    if (snakeX < 0 || snakeX > box * 24 || snakeY < 0 || snakeY > box * 16)
        clearInterval(game), alert("Ваш счёт: " + score);

        


    
    if (d == 3) snakeX -= box;
    if (d == 1) snakeX += box;
    if (d == 4) snakeY -= box;
    if (d == 2) snakeY += box;
    
    let newHead = {
        x: snakeX,
        y: snakeY,
    };


    eatTail(newHead, snake);
    snake.unshift(newHead);
}
drawGame
let game = setInterval(function () {
    drawGame();
    drawBorder();
}, 150);
