'use strict';

/**
 * Score Object
 */
function ScoreKeeper() {
	this.scoreElement = document.getElementById('score');
	this.score = 0;
};

/**
 * 
 */
ScoreKeeper.prototype.hide = function() {
	this.scoreElement.style.display = 'none';
};

/**
 * 
 */
ScoreKeeper.prototype.show = function() {
	this.scoreElement.style.display = 'block';
};

/**
 * 
 */
ScoreKeeper.prototype.draw = function(gameInProgress) {
	if (gameInProgress) {
		this.show();
	} else {
		this.hide();
	}

	this.scoreElement.innerText = this.score;		
};

/**
 * 
 */
ScoreKeeper.prototype.increment = function() {
	this.score++;
};

/**
 * 
 */
ScoreKeeper.prototype.clear = function() {
	this.score = 0;
};