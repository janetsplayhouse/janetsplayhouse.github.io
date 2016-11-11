var WIDTH = 640;
var HEIGHT = 360;

var enemies = [
    {x:100, y: 100, speedY:1, w:40, h:40},
    {x:260, y: 100, speedY:2, w:40, h:40},
    {x:380, y: 100, speedY:3, w:40, h:40},
    {x:450, y: 100, speedY:6, w:40, h:40}];
	
var player = {x:10, y:160, speedX:2.5, w:40, h:40, isMoving:false};

var goal = {x:560, y:160, w:40, h:40};

var sprites = {};
    
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var movePlayer = function () {
	player.isMoving = true;
};

var stopPlayer = function () {
	player.isMoving = false;
};

canvas.addEventListener("mousedown", movePlayer);
canvas.addEventListener("mouseup", stopPlayer);
canvas.addEventListener("touchstart", movePlayer);
canvas.addEventListener("touchend", stopPlayer);

var load_data = function () {
	sprites.player = new Image();
	sprites.player.src = "img/player.png";
	
	sprites.background = new Image();
	sprites.background.src = "img/background.png";
	
	sprites.enemy = new Image();
	sprites.enemy.src = "img/enemy.png";
	
	sprites.goal = new Image();
	sprites.goal.src = "img/goal.png";
}

var check_collision = function (rect1, rect2) {
	var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
	var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
	return closeOnWidth && closeOnHeight;
}

var draw = function () {
	//Background
	ctx.drawImage(sprites.background, 0, 0);
	
    //Draw Player
	ctx.drawImage(sprites.player, player.x, player.y);
	
	//Draw Goal
	ctx.drawImage(sprites.goal, goal.x, goal.y);
		
	//Draw Enemies
	//var j = 0;
    /*
    while (j < n) {
        ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
        j++;
    }
	*/
	/*
	for (var j = 0; j < n; j++) {
		ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
	}
	*/
	enemies.forEach(function(element, index) {
		ctx.drawImage(sprites.enemy, element.x, element.y);
	})
};

var update = function () {
	
	//Move Player
	if (player.isMoving) {
		player.x += player.speedX;
	}
	
	//Move Enemies
	enemies.forEach(function(element, index) {
		element.y += element.speedY;
		
		if (element.y <= 0) {
			element.y = 0;
			element.speedY *= -1;
		} else if (element.y >= HEIGHT - element.h) {
			element.y = HEIGHT - element.h;
			element.speedY *= -1;
		}
		if (check_collision(player, element)) {
			gameLive = false;
			alert("You lose, try again!");
			window.location = "";
		}
	})
	
	if (check_collision(player, goal)) {
		gameLive = false;
		alert("You Won!");
		window.location = "";
	}	
};

var step = function () {
	draw();
	update();
	window.requestAnimationFrame(step);
};

load_data();
step();