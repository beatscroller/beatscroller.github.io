var canvas = document.getElementById("canvas")
audioElement = document.getElementById("audio"),
	ctx = canvas.getContext("2d"),
	width = $(canvas).width(),
	height = $(canvas).height(),

	player = {
		x: 0,
		y: 0,
		defaultX: 0,
		defaultY: 0,
		width: 42,
		height: 55.75,
		speed: 200,
		velX: 0,
		velY: 0,
		color: "green",
		jumping: false,
		isHit: false,
		immuneFrames: 20
	},

	keys = [],
	friction = 0.9,
	gravity = 0;

var gameWon = false;
var gameInProgress = false;
var gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, '#000000');
gradient.addColorStop(1, '#004159');

var topAudioBars = new AudioBars(canvas, "#59DBF1", 100, true);
var bottomAudioBars = new AudioBars(canvas, "#8C65D3", 100, false);
var starField = new StarField(canvas, "#FFFFFF", 20);
var tunnelGenerator = new TunnelGenerator();
var playerSprite = new Player(canvas);
var lives = new Lives(canvas, 3);
var finishScreen = new FinishScreen(canvas);
var audioVisualizer = new AudioVisualizer();
var soundCloud = new SoundCloud();
var scoreKeeper = new ScoreKeeper();

canvas.width = width;
canvas.height = height;

document.getElementById('audio').addEventListener('play', function() {
	gameInProgress = true;
});

document.getElementById('audio').addEventListener('pause', function() {
	gameWon = true;
	finishGame();
});


function updatePlayerPosition() {
	if (keys[40]) {
		// down arrow
		if (player.velY < player.speed) {
			player.velY++;
		}
	}

	if (keys[38]) {
		// up arrow
		if (player.velY < player.speed) {
			player.velY--;
		}
	}
	if (keys[39]) {
		// right arrow
		if (player.velX < player.speed) {
			player.velX++;
		}
	}
	if (keys[37]) {
		// left arrow
		if (player.velX > -player.speed) {
			player.velX--;
		}
	}

	// update player's position
	player.velX *= friction;
	player.velY *= friction;

	player.x += player.velX;
	player.y += player.velY;

	// check that player cant escape the canvas
	if (player.x >= width - player.width) {
		player.x = width - player.width - 1;
	} else if (player.x <= 0) {
		player.x = 1;
	}

	if (player.y >= height - player.height) {
		player.y = height - player.height - 1;
	} else if (player.y <= 0) {
		player.y = 1;
	}
}

function updateAudioBarPositions() {
	var arr = [];
	if (audioVisualizer.byteFrequencyData) {
		arr = audioVisualizer.byteFrequencyData;
	} else {
		arr.length = 100;

		for (var i = 0; i < arr.length; i++) {
			arr[i] = 0;
		}
	}

	topAudioBars.updateIntensities(arr);
	bottomAudioBars.updateIntensities(arr);

	var topPosition = tunnelGenerator.calcPosition(new Date().getTime());
	var bottomPosition = 1 - topPosition;

	// add tunnel height to create spacing between the bars
	var tunnelHeight = tunnelGenerator.calcHeight(new Date().getTime());

	topPosition = Math.max(0, topPosition - tunnelHeight);
	bottomPosition = Math.max(0, bottomPosition - tunnelHeight);

	topAudioBars.updateLimit(topPosition);
	bottomAudioBars.updateLimit(bottomPosition);
}

function draw() {
	// clear graphics
	ctx.clearRect(0, 0, width, height);

	// draw bg
	if (player.isHit) {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = gradient;
	}

	ctx.fillRect(0, 0, width, height);

	// draw stars
	starField.draw();

	// draw audiobars
	topAudioBars.draw();
	bottomAudioBars.draw();

	// draw lives
	if (gameInProgress) lives.draw();


	// draw score
	scoreKeeper.draw(gameInProgress);

	// draw player
	var padding = 2;
	playerSprite.draw(new Rectangle(player.x, player.y, player.width, player.height));
}

function detectCollision() {
	var playerRect = new Rectangle(player.x, player.y, player.width, player.height);
	return (topAudioBars.collidesWith(playerRect) || bottomAudioBars.collidesWith(playerRect));
}

function finishGame() {
	if (gameInProgress) {
		gameInProgress = false;

		player.isHit = false;
		draw();

		if (gameWon) {
			finishScreen.draw('YOU WON', scoreKeeper.score);
			finishScreen.setShareText(scoreKeeper.score, soundCloud.nowPlayingTitleText);
		} else {
			audioElement.pause();
			finishScreen.draw('GAME OVER', scoreKeeper.score);
			finishScreen.setShareText(scoreKeeper.score, soundCloud.nowPlayingTitleText);
		}

		soundCloud.hideNowPlaying();
		finishScreen.showEndMenu();
	}
}

function update() {
	if (!gameWon) {
		if (gameInProgress && this.lives.lifeCount === 0) {
			finishGame(false);
		} else {
			// move player according to arrow keys
			updatePlayerPosition();
			updateAudioBarPositions();

			draw();

			player.immuneFrames--;
			if (detectCollision() && (player.immuneFrames <= 0)) {
				player.isHit = true;
				player.immuneFrames = 30;
				this.lives.subtract();
			} else {
				player.isHit = false;
			}

			if (gameInProgress) scoreKeeper.increment();
			requestAnimationFrame(update);
		}
	}
}

function isUpDownKey(keyCode) {
	return (keyCode === 38) || (keyCode === 40);
}


function resetGame() {
	gameWon = false;
	lives = new Lives(canvas, 3);
	scoreKeeper = new ScoreKeeper();

	player.x = player.defaultX;
	player.y = player.defaultY;
	player.speed = 200;

	audioElement.currentTime = 0;
	finishScreen.hideEndMenu();
}

function restart() {
	gameInProgress = true;

	resetGame();
	audioElement.play();

	update();
	soundCloud.showNowPlaying();
}

function newSong() {
	//reset the gam variables 
	resetGame();

	// Clear the hash
	window.location.hash = '';

	soundCloud.clearTextBox();
	soundCloud.showMenu();
	setPlayerDefaults();

	update();
}

function setPlayerDefaults() {
	if ($('.menu-form-container').width() > 0) {
		player.defaultX = (width / 2) - ($('.menu-form-container').width() / 2) - player.width - 20;
	} else {
		player.defaultX = 0;
	}

	player.defaultY = height / 2 - 28;
}

document.body.addEventListener("keydown", function(e) {
	if (isUpDownKey(e.keyCode)) {
		event.preventDefault();
	}

	keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	if (isUpDownKey(e.keyCode)) {
		event.preventDefault();
	}

	keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
	update();

	//If the hash part exists then the song should start
	if (window.location.hash) {
		var trackId = window.location.hash.replace('#', '');
		audioElement.src = 'http://api.soundcloud.com/tracks/' + trackId + '/stream?client_id=bbbb71ccc1f61f5eb6d933c3b4771396';
		audioElement.play();
		soundCloud.hideMenu();
		soundCloud.loadNowPlaying(trackId);
	} else {
		soundCloud.showMenu();
	}

	setPlayerDefaults();

	player.x = player.defaultX;
	player.y = player.defaultY;
});