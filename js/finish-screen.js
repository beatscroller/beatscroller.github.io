/**
    Display a "game over" screen when the game ends
*/

function FinishScreen(canvas) {
    this.canvas = canvas;
    this.endMenu = document.getElementById('endMenuWrapper');
}

FinishScreen.prototype.draw = function(caption, score) {
    var ctx = this.canvas.getContext("2d");

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var scoreStr = "Score: "+score;

    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;

    ctx.fillStyle = "fdfdfd";
    ctx.font = "bold 96px press_start_2pregular";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "666666";
    var captionWidth = ctx.measureText(caption).width;
    ctx.fillText(caption, centerX - (captionWidth / 2), (centerY - 48));
    ctx.strokeText(caption, centerX - (captionWidth / 2), (centerY - 48));

    ctx.font = "bold 48px press_start_2pregular";
    ctx.fillStyle = "white";
    var scoreWidth = ctx.measureText(scoreStr).width;
    ctx.fillText(scoreStr, centerX - (scoreWidth / 2), (centerY + 48));
}

FinishScreen.prototype.showEndMenu = function() {
	this.endMenu.style.display = 'block';
}

FinishScreen.prototype.hideEndMenu = function() {
	this.endMenu.style.display = 'none';
}

FinishScreen.prototype.createTwitterButton = function(shareUrl, shareText) {
	$('#gameTwitterButtonContainer').html('');

    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', shareUrl)
        .attr('data-text', shareText);
    $('#gameTwitterButtonContainer').append(tweetBtn);

    twttr.widgets.load();
}

FinishScreen.prototype.setShareText = function(score, trackTitle) {
	var shareUrl = document.URL;
	var shareText = 'I Scored ' + score + ' while playing "' + trackTitle + '" on BeatScroller, can you beat me?'; 

	this.createTwitterButton(shareUrl, shareText);
}