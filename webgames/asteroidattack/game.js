var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var checkSize = window.innerWidth;

var intro_song = document.getElementById("intro");
intro_song.loop = true;
var game_song = document.getElementById("game");
game_song.loop = true;
var gameover_song = document.getElementById("gameover");
gameover_song.loop = true;
var shoot_sound = document.getElementById("shoot");
shoot_sound.volume = 0.1;

var game_intro = true;
var gameover = false;
var control = false;
var shooting = false;
var score = 0;
var score_tracker = 0;
var mouseX = 0;
var mouseY = 0;
var text_add;
var text_char;
var text_sub;
var now = Date.now();
var gradient = ctx.createLinearGradient(0,canvas.height / 2,canvas.width,0);
var play_color = gradient;
var controls_color = gradient;
back_color = gradient;

var buttons = {
	intro: {
		play: {
			x: WIDTH / 2 - 150,
			y: HEIGHT / 2 - 30,
			w: 310,
			h: 50
		},
		controls: {
			x: WIDTH / 2 - 150,
			y: HEIGHT / 2 + 30,
			w: 310,
			h: 50
		}
	},
	go: {
	    play: {
	        x: WIDTH / 2 - 150,
			y: HEIGHT / 2 - 30,
			w: 310,
			h: 50
	    },
	    main: {
	        x: WIDTH / 2 - 150,
			y: HEIGHT / 2 + 30,
			w: 310,
			h: 50
	    }
	}
};

function mouseClicked(e) {
	// Update mouse (x, y) position each click
	mouseX = e.pageX - canvas.offsetLeft;
	mouseY = e.pageY - canvas.offsetTop;
	
	if (game_intro) {
		// If click is inside play button area, end game_intro
		if (buttons.intro.play.x <= mouseX &&
			mouseX <= buttons.intro.play.x + buttons.intro.play.w &&
			buttons.intro.play.y <= mouseY &&
			buttons.intro.play.y + buttons.intro.play.h >= mouseY) {
		
			game_intro = false;
		}
		if (buttons.intro.controls.x <= mouseX &&
			mouseX <= buttons.intro.controls.x + buttons.intro.controls.w &&
			buttons.intro.controls.y <= mouseY &&
			buttons.intro.controls.y + buttons.intro.controls.h >= mouseY) {
		
			game_intro = false;
			control = true;
		}
	}
	
	if (control) {
		if (0 <= mouseX &&
			mouseX <= 100 &&
			0 <= mouseY &&
			100 >= mouseY) {
			
			control = false;
			game_intro = true;
		}
	}
	
	if (gameover) {
		if (buttons.go.play.x <= mouseX &&
			mouseX <= buttons.go.play.x + buttons.go.play.w &&
			buttons.go.play.y <= mouseY &&
			buttons.go.play.y + buttons.go.play.h >= mouseY) {
			
			gameover = false;
		}
		if (buttons.go.main.x <= mouseX &&
			mouseX <= buttons.go.main.x + buttons.go.main.w &&
			buttons.go.main.y <= mouseY &&
			buttons.go.main.y + buttons.go.main.h >= mouseY) {
			
			gameover = false;
			game_intro = true;
			intro_song.currentTime = 0;
		}
	}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}

function explosion(x, y, num) {
	//if (num === 0) {
		//now = Date.now();
	//
	/*console.log(num);
	var framerate = 100;
	//while (last_update <= 5000) {
		var time = Date.now();
		var last_update = time - now;
		if (last_update >= framerate) {
			//now = Date.now();
			img.explosion.src = "img/explosions/regularExplosion01.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 2) {
			img.explosion.src = "img/explosions/regularExplosion02.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 3) {
			img.explosion.src = "img/explosions/regularExplosion03.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 4) {
			img.explosion.src = "img/explosions/regularExplosion04.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 5) {
			img.explosion.src = "img/explosions/regularExplosion05.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 6) {
			img.explosion.src = "img/explosions/regularExplosion06.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 7) {
			img.explosion.src = "img/explosions/regularExplosion07.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		if (last_update >= framerate * 8) {
			img.explosion.src = "img/explosions/regularExplosion08.png";
			//ctx.drawImage(img.explosion, 100, 200);
		}
		ctx.drawImage(img.explosion, x, y);
		num++;
	//}*/
	ctx.drawImage(img.explosion, x, y);
}

function intro() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img.background, 0, 0);
	ctx.drawImage(img.asteroid, asteroid.x, asteroid.y);
	ctx.drawImage(img.title, canvas.width / 2 - 250, 30);
	
	asteroid.y += asteroid.speedY;
	asteroid.x += asteroid.speedX;
	if (asteroid.y >= HEIGHT + 10) {
		asteroid.x = getRandomInt(0, WIDTH);
		asteroid.y = getRandomInt(-150, -100);
		asteroid.speedY = getRandomInt(3, 11);
		asteroid.speedX = getRandomInt(-3, 3);
	}
	
	addEventListener("keydown", function (e) {
		var keyCode = (e.keyCode) ? e.keyCode : e.which;
		switch (keyCode) {
			case 13:
				//game_intro = false;
				break;
		}
	}, false);

	ctx.font = "30px Verdana";
	
	// Create gradient
	gradient.addColorStop("0", "magenta");
	gradient.addColorStop("0.5", "blue");
	gradient.addColorStop("1.0", "red");
	
	//ctx.fillStyle = "#FFFFFF";
	//ctx.fillRect(WIDTH / 2 - 150, HEIGHT / 2 - 30, 310, 50);
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		
		var play_button_pos = mousePos.x < buttons.intro.play.x + buttons.intro.play.w &&
							mousePos.x > buttons.intro.play.x &&
							mousePos.y < buttons.intro.play.y + buttons.intro.play.h &&
							mousePos.y > buttons.intro.play.y;
							
		var controls_button_pos = mousePos.x < buttons.intro.controls.x + buttons.intro.controls.w &&
							mousePos.x > buttons.intro.controls.x &&
							mousePos.y < buttons.intro.controls.y + buttons.intro.controls.h &&
							mousePos.y > buttons.intro.controls.y;
		
		//Check mouse location and change fillStyle
		if (play_button_pos) {
			
			play_color = "#FFFFFF";
			document.addEventListener('mousedown', mouseClicked, false);
		} else {
			play_color = gradient;
		}
		
		if (controls_button_pos) {
			controls_color = "#FFFFFF";
			document.addEventListener('mousedown', mouseClicked, false);
		} else {
			controls_color = gradient;
		}
		
	}, false);
	
	//ctx.fillStyle = gradient;
	ctx.fillStyle = play_color;
	ctx.fillText("Play", WIDTH / 2 - 30, HEIGHT / 2);
	ctx.fillStyle = controls_color;
	ctx.fillText("Controls", WIDTH / 2 - 60, HEIGHT / 2 + 60);
}

function game_over() {
	//Set score_tracker to 0 so score will reset when game restarts
	score_tracker = 0;
	
	//Find number of characters in ("Score: " + score) to center on screen
	if (score < 10) {
		text_add = 1;
	} else if (10 <= score && score < 100) {
		text_add = 2;
	} else if (100 <= score && score < 1000) {
		text_add = 3;
	} else if (1000 <= score && score < 10000) {
		text_add = 4;
	} else if (10000 <= score && score < 100000) {
		text_add = 5;
	}
	text_char = text_add + 7;
	text_sub = text_char * 7.5;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img.background, 0, 0);
	ctx.drawImage(img.gameover, WIDTH / 2 - 250, 30);
	ctx.font="30px Verdana";
	
	ctx.fillStyle = play_color;
	ctx.fillText("Play Again", WIDTH / 2 - 75, HEIGHT / 2);
	
	ctx.fillStyle = controls_color;
	ctx.fillText("Main Menu", WIDTH / 2 - 75, HEIGHT / 2 + 60);
	
	ctx.fillStyle = "#CC00FF";
	ctx.fillText("Score: " + score, WIDTH / 2 - text_sub, HEIGHT - 100);
}

function controls() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img.background, 0, 0);
	canvas.addEventListener("mousemove", function (evt) {
		var mousePos = getMousePos(canvas, evt);
	
		var back_pos = 0 <= mousePos.x &&
						mousePos.x <= 100 &&
						0 <= mousePos.y &&
						50 >= mousePos.y;
	
		if (back_pos) {
			back_color = "#FFFFFF";
			document.addEventListener('mousedown', mouseClicked, false);
		} else {
			back_color = gradient;
		}
	}, false);
	
	ctx.font = "30px Verdana";
	ctx.fillStyle = back_color;
	ctx.fillText("Back", 30, 40);
	
	ctx.font = "100px Verdana";
	ctx.fillStyle = gradient;
	ctx.fillText("Controls", WIDTH / 2 - 200, 100);
	
	ctx.font = "30px Verdana";
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.strokeStyle = "rgb(255, 0, 0)"
	ctx.lineWidth = 2;
	
	ctx.fillText("Move Left/Right:", WIDTH / 2 - (7.5 * 16), 200);
	ctx.strokeText("Move Left/Right:", WIDTH / 2 - (7.5 * 16), 200);
	
	ctx.fillText("Turn on Rapid-Fire Shooting:", WIDTH / 2 - (7.5 * 28), 300);
	ctx.strokeText("Turn on Rapid-Fire Shooting:", WIDTH / 2 - (7.5 * 28), 300);
	
	ctx.fillText("Disable SFX/Music:", WIDTH / 2 - (7.5 * 18), 400);
	ctx.strokeText("Disable SFX/Music:", WIDTH / 2 - (7.5 * 18), 400);
	
	ctx.font = "20px Verdana";
	ctx.fillStyle = "#FFFFFF";
	
	ctx.fillText("A/D or Arrow Keys", WIDTH / 2 - (5 * 17), 250);	
	ctx.fillText("Spacebar", WIDTH / 2 - (5 * 8), 350);
	ctx.fillText("Enter/Return (SHIFT to enable)", WIDTH / 2 - (5 * 30), 450);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var img = {};

var player = {
	x: WIDTH / 2,
	y: HEIGHT - 100,
	speedX: 7.5,
	w: 120,
	h: 75,
};

var asteroids = [
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	},
	{
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(3, 11),
	speedX: getRandomInt(-3, 3)
	}
];

var asteroid = {
	x: getRandomInt(0, WIDTH),
	y: getRandomInt(-150, -100),
	w: 60,
	h: 48,
	speedY: getRandomInt(1, 5),
	speedX: getRandomInt(-3, 3)
};

var laser = {
	x: player.x + player.w / 2,
	y: player.y,
	w: 5,
	h: 20
};

var Key = {
	up: false,
	down: false,
	left: false,
	right: false
};

addEventListener("keydown", function (e) {
	var keyCode = (e.keyCode) ? e.keyCode : e.which;
	switch(keyCode) {
		case 65:
			Key.left = true;
			break;
		case 68:
			Key.right = true;
			break;
		case 37:
			Key.left = true;
			break;
		case 39:
			Key.right = true;
			break;
		case 32:
			if (shooting == false) {
				laser.x = player.x + player.w / 2;
				shooting = true;
				break;
			} else if (shooting == true) {
				shooting = false;
				break;
			}
	}
}, false);

addEventListener("keyup", function (e) {
	var keyCode = (e.keyCode) ? e.keyCode : e.which;
	switch(keyCode) {
		case 65:
			Key.left = false;
			break;
		case 68:
			Key.right = false;
			break;
		case 37:
			Key.left = false;
			break;
		case 39:
			Key.right = false;
			break;
		//case 32:
			//shooting = false;
			//break;
	}
}, false);

function shoot() {
	if (laser.y === player.y) {
		shoot_sound.currentTime = 0;
		shoot_sound.play();
	}
	ctx.fillStyle = "#FFFFFF";
	//for (var i = 0; i < 75; i++) {
		//ctx.drawImage(img.laser, laser.x, laser.y);
		//laser.y -= 0.5;
	if (laser.y > -100) {
		ctx.drawImage(img.laser, laser.x, laser.y);
		laser.y -= 35;
		shooting = true;
	}
	if (laser.y <= -100) {
		laser.x = player.x + player.w / 2;
		laser.y = player.y;
		//shooting = false;
	}
}

/*  
	Function resizeWindow is not being used
    but we are going to keep it here
*/

function resizeWindow() {
	var widthToHeight = 4 / 3;
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	var newWidthToHeight = newWidth / newHeight;

	if (newWidthToHeight > widthToHeight) {
		newWidth = newHeight * widthToHeight;
		gameArea.style.height = newHeight + 'px';
		gameArea.style.width = newWidth + 'px';
	} else {
		newHeight = newWidth / widthToHeight;
		gameArea.style.width = newWidth + 'px';
		gameArea.style.height = newHeight + 'px';
	}
	
	gameArea.style.marginTop = (-newHeight / 2) + 'px';
	gameArea.style.marginLeft = (-newWidth / 2) + 'px';
	gameArea.style.fontSize = (newWidth / 400) + 'em';
	
	
	canvas.width = newWidth;
	canvas.height = newHeight;
}

function load_data() {
	img.background = new Image();
	img.background.src = "img/background.png";
	
	img.asteroid = new Image();
	img.asteroid.src = "img/asteroid_final1.png";
	
	img.player = new Image();
	img.player.src = "img/player5.png";
	
	img.laser = new Image();
	img.laser.src = "img/laser.png";
	
	img.title = new Image();
	img.title.src = "img/title.png";
	
	img.explosion = new Image();
	img.explosion.src = "img/regularExplosion02.png";
	
	img.gameover = new Image();
	img.gameover.src = "img/gameover.png";
}

function draw() {
	//Boundary box for player collisions to make it seem more accurate
	var player_cx = player.x + 15;
	var player_cy = player.y + 30;
	var player_cw = player.w - 30;
	var player_ch = player.h - 43;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img.background, 0, 0);
	/* Fill player boundary box
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(player_cx, player_cy, player_cw, player_ch);
	*/
	ctx.drawImage(img.player, player.x, player.y);
	
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Score: "+score, WIDTH - 300, 30);
	
	asteroids.forEach(function(element, index) {
		ctx.drawImage(img.asteroid, element.x, element.y);
		//ctx.fillStyle = "#FFFFFF";
		//ctx.fillRect(element.x, element.y, element.w, element.h);
	})
}

function update() {
	//Reset score if update runs for the first time
	score_tracker += 0.1;
	if (score_tracker == 0.1) {
		score = 0;
	}
	//Boundary box for player collisions to make it seem more accurate
	var player_cx = player.x + 15;
	var player_cy = player.y + 30;
	var player_cw = player.w - 30;
	var player_ch = player.h - 43;
	
	if (Key.right == true) {
		player.x += player.speedX;
	} else if (Key.left == true) {
		player.x -= player.speedX;
	}
	
	if (player.x >= WIDTH - player.w) {
		player.x -= player.speedX;
	}
	if (player.x <= 0) {
		player.x += player.speedX;
	}
	
	if (shooting == true) {
		shoot();
	}
	
	//Asteroid collisions, updates, etc.
	asteroids.forEach(function(element, index) {
		//Update location
		element.y += element.speedY;
		element.x += element.speedX;
		//If it goes off screen, reset location
		if (element.y >= HEIGHT + 10) {
			element.x = getRandomInt(0, WIDTH);
			element.y = getRandomInt(-150, -100);
			element.speedY = getRandomInt(3, 11);
			element.speedX = getRandomInt(-3, 3);
		}
		//Collisions between player, game over
		if (player_cx < element.x + element.w &&
			player_cx + player_cw > element.x &&
			player_cy < element.y + element.h &&
			player_ch + player_cy > element.y) {
			
			gameover = true;
			//Reset each asteroid, player and laser location
			asteroids.forEach(function(element, index) {
				element.x = getRandomInt(0, WIDTH);
				element.y = getRandomInt(-150, -100);
				element.speedY = getRandomInt(3, 11);
				element.speedX = getRandomInt(-3, 3);
			})
			player.x = WIDTH / 2;
			laser.x = player.x + player.w / 2;
			laser.y = player.y;			
		}
		//Asteroid and laser collisions
		if (shooting == true) {
			if (element.x < laser.x + laser.w &&
				element.x + element.w > laser.x &&
				element.y < laser.y + laser.h &&
				element.h + element.y > laser.y) {
					
				//Update score
				score += 4 * element.speedY;
				
				explosion(element.x - 72, element.y - 72, 0);
				
				//Reset asteroid & laser positions
				laser.x = player.x + player.w / 2;
				laser.y = player.y;
				element.x = getRandomInt(0, WIDTH);
				element.y = getRandomInt(-150, -100);
				element.speedY = getRandomInt(3, 11);
				element.speedX = getRandomInt(-3, 3);
			}
		}
	})
}

function ngame() {
	if (game_intro == true) {
		gameover_song.pause();
		game_song.pause();
		intro_song.play();
		intro();
	} else if (control == true) {
		controls();
	} else if (gameover == true) {
		game_song.pause();
		intro_song.pause();
		gameover_song.play();
		game_over();
	} else {
		intro_song.pause();
		gameover_song.pause();
		game_song.play();
		//resizeWindow();  No longer being used
		draw();
		update();
	}
	
	addEventListener("keydown", function (e) {
		var keyCode = (e.keyCode) ? e.keyCode : e.which;
		switch (keyCode) {
			case 13:
				intro_song.volume = 0;
				game_song.volume = 0;
				gameover_song.volume = 0;
				shoot_sound.volume = 0;
				music = 0;				
				break;
			case 16:
				intro_song.volume = 1;
				game_song.volume = 1;
				gameover_song.volume = 1;
				shoot_sound.volume = 0.1;
				break;
		}
	}, false);
	
	if (checkSize > window.innerWidth || checkSize < window.innerWidth) {
		// If player resizes the window, change these variables to adjust objects on screen
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;
		checkSize = window.innerWidth;
		
		// Adjust player and buttons to fit the new screen size
		player = {
			x: WIDTH / 2,
			y: HEIGHT - 100,
			speedX: 7.5,
			w: 120,
			h: 75,
		};
		
		buttons = {
			intro: {
				play: {
					x: WIDTH / 2 - 150,
					y: HEIGHT / 2 - 30,
					w: 310,
					h: 50
				},
				controls: {
					x: WIDTH / 2 - 150,
					y: HEIGHT / 2 + 30,
					w: 310,
					h: 50
				}
			},
			go: {
				play: {
					x: WIDTH / 2 - 150,
					y: HEIGHT / 2 - 30,
					w: 310,
					h: 50
				},
				main: {
					x: WIDTH / 2 - 150,
					y: HEIGHT / 2 + 30,
					w: 310,
					h: 50
				}
			}
		};
	}
	
	window.requestAnimationFrame(ngame);
}

load_data();
ngame();