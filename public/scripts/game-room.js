var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
//context.canvas.width = window.innerWidth*.6;
//context.canvas.height = window.innerHeight*.6;
var name_entry;
var shape_choice;
var color_choice;

class Character {
    constructor(name, shape, color, radius, x, y) {
        this.name = name;
        this.shape = shape;
        this.color = color;
        this.radius = radius;
        this.x = x;
        this.y = y;
    }
    drawCircle() {
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    drawSquare() {
        context.beginPath();
        context.rect(this.x - 10, this.y - 10, 20, 20);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    drawTriangle() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - 10, this.y);
        context.lineTo(this.x, this.y - 20);
        context.lineTo(this.x + 10, this.y);
        context.fillStyle = this.color;
        context.fill();
        context.closePath()
    }
    drawDisplayName() {
        context.font = "10px 'Lucida Console', Monaco, monospace";
        context.fillText(this.name, this.x - 1.5 * this.radius, this.y - 1.5 * this.radius);
    }
    draw() {
        if(this.shape == "circle") {
            this.drawCircle();
        }
        else if(this.shape == "square") {
            this.drawSquare();
        }
        else if(this.shape == "triangle") {
            this.drawTriangle();
        }
        this.drawDisplayName();
    }
}

class Table {
    constructor(x, y, width, height, name, page) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.page = page;
    }
    drawName() {
        context.font = "10px 'Lucida Console', Monaco, monospace";
        context.fillStyle = "white";
        context.fillText(this.name, this.x, this.y); 
    }
    draw() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "#34AD42";
        context.fill();
        context.closePath();
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

function keyDownHandler(event) {
    if(event.code == "ArrowLeft") {
        leftPressed = true;
    }
    else if(event.code == "ArrowRight") {
        rightPressed = true;
    }
    else if(event.code == "ArrowUp") {
    	upPressed = true;
    }
    if(event.code == "ArrowDown") {
    	downPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.code == "ArrowLeft") {
        leftPressed = false;
    }
    else if(event.code == "ArrowRight") {
        rightPressed = false;
    }
    else if(event.code == "ArrowUp") {
    	upPressed = false;
    }
    if(event.code == "ArrowDown") {
    	downPressed = false;
    }
}

var epsilon = 2;

function movementHandler(character) {
    if(leftPressed) {
        if(character.x - epsilon < character.radius) {
            character.draw();
        }
        else {
            character.x -= epsilon;
        }
    }
    else if(rightPressed) {
        if(character.x + epsilon > canvas.width - character.radius) {
            character.draw();
        }
        else {
            character.x += epsilon;
        }
    }
    else if(upPressed) {
        if(character.y + epsilon < character.radius + 5) {
            character.draw();
        }
        else {
            character.y -= epsilon;
        }
    }
    else if(downPressed) {
        if(character.y - epsilon > canvas.height - character.radius - 5) {
            character.draw();
        }
        else {
            character.y += epsilon;
        }
    }
}

const character = new Character(name_entry, shape_choice, color_choice, 10, 400, 550);
const gameOfLife = new Table(10, 300, 150, 100, "Game of Life", "/game-of-life");
const blackjack = new Table(640, 300, 150, 100, "Blackjack", "/blackJack");

function swapPage(route, routeType) {
    var data = {};
    $.ajax({
      type: routeType,
      url: route,
      //data,
      success: function (data) {
        window.location.replace(route);
      },
      error: function (xhr) {
        window.alert(JSON.stringify(xhr));
        window.location.replace('/');
      }
    });
  }

function characterIsInTable (character, table) {
    let tableRightBound = table.x + table.width;
    let tableBottomBound = table.y + table.height;
    if(character.x >= table.x && character.x <= tableRightBound && character.y >= table.y && character.y <= tableBottomBound) {
        return 1;
    }
    else {
        return 0;
    }
}

function roomDriver() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    character.draw();
    gameOfLife.draw();
    gameOfLife.drawName();
    blackjack.draw();
    blackjack.drawName();
    if(characterIsInTable(character, gameOfLife)) {
        swapPage(gameOfLife.page, 'GET');
    }
    if(characterIsInTable(character, blackjack)) {
        swapPage(blackjack.page, 'GET');

    }
    movementHandler(character);
}

alert("Use the arrow keys to move your character. Move your character to a table to play a game.");

// Repeat createRoom function every 10 milliseconds.
setInterval(roomDriver, 10);