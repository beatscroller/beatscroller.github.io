/**
    Draws a set of audio bars on an HTML5 Canvas Element.
    The bars will be evenly spread across the width of the canvas
    Bar values should be between 0 and 1
*/

function StarField(canvas, color, starCount) {
    this.canvas = canvas;
    this.color = color;
    this.starCount = starCount;
    this.speed = 6;
    this.border = 3;
}

StarField.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

StarField.prototype.generateRandomStars = function(starCount) {
    this.stars = [];
    this.stars.length = starCount;

    for (var i = 0; i < starCount; i++) {
        var xPos = this.getRandomInt(this.border, canvas.width - this.border);
        var yPos = this.getRandomInt(this.border, canvas.height - this.border);
        this.stars[i] = new Rectangle(xPos, yPos, 0, 0);
    }
}

StarField.prototype.scrollStarsLeft = function() {
    for (var i = 0; i < this.starCount; i++) {
        this.stars[i].left = this.stars[i].left - this.speed;

        if (this.stars[i].left < this.border) {
            this.stars[i] = this.generateStarOnRightEdge();
        }
    }
}

StarField.prototype.generateStarOnRightEdge = function() {
    var xPos = canvas.width - this.border;
    var yPos = this.getRandomInt(this.border, canvas.height - this.border);
    return new Rectangle(xPos, yPos, 0, 0);
}

StarField.prototype.draw = function() {
    if (this.stars === undefined)
    {
        this.generateRandomStars(this.starCount);
    }

    this.scrollStarsLeft();

    for (var i = 0; i < this.stars.length; i++)
    {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle=this.color;

        ctx.fillRect(this.stars[i].left, this.stars[i].top, 2, 2);
    }
}

