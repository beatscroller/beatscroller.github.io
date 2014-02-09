/**
    Manage and draw the lives the player has
*/

function Lives(canvas, initialCount) {
    this.lifeCount = initialCount;
    this.canvas = canvas;

    this.heartImage = new Image();
    this.heartImage.src = 'img/8bit_heart.png';
}

Lives.prototype.draw = function() {
    var ctx = this.canvas.getContext("2d");

    var paddingTop = 20;
    var paddingRight = 20;
    var spacing = 7;

    for (var i = 0; i < this.lifeCount; i++) {
        var left = this.canvas.width - (paddingRight + ((i+1) * (this.heartImage.width + spacing)));
        ctx.drawImage(this.heartImage,left, paddingTop, this.heartImage.width, this.heartImage.height);
    }
}

Lives.prototype.subtract = function() {
    this.lifeCount--;
}

