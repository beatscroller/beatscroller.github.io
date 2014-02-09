/**
    Represents a rectangle in 2D space. The top-left corner is (0,0).
 */

function Player(canvas) {
    this.canvas = canvas;
    this.currFrame = 0;
    this.frameCount = 55;
    this.slowdownRatio = 5;
    this.spritesPerRow = 3;
    this.spriteMap = new Image();
    this.spriteMap.src = 'img/sprites/alien.png';
}

Player.prototype.draw = function(rectangle) {
    var ctx = this.canvas.getContext("2d");

    var animationFrame = Math.floor(this.currFrame / this.slowdownRatio);

    var xIndex = animationFrame % this.spritesPerRow;
    var yIndex = Math.floor(animationFrame / this.spritesPerRow);

    var xPos = Math.round(xIndex * rectangle.width);
    var yPos = yIndex * rectangle.height;

    //console.log(xPos);
    ctx.drawImage(this.spriteMap,xPos,yPos,rectangle.width,rectangle.height,rectangle.left,rectangle.top,rectangle.width,rectangle.height);


    this.currFrame = (this.currFrame + 1) % this.frameCount;
}

