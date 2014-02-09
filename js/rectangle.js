/**
    Represents a rectangle in 2D space. The top-left corner is (0,0).
 */

function Rectangle(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
}

Rectangle.prototype.left = function() {
    return this.left;
}

Rectangle.prototype.top = function() {
    return this.top;
}

Rectangle.prototype.width = function() {
    return this.width;
}

Rectangle.prototype.height = function() {
    return this.height;
}

Rectangle.prototype.right = function() {
    return this.left + this.width;
};

Rectangle.prototype.bottom = function() {
    return this.top + this.height;
};

Rectangle.prototype.valueInRange = function(value, min, max) {
    return (value >= min) && (value <= max);
}

Rectangle.prototype.intersects = function(otherRect) {
    var xOverlap = (this.valueInRange(this.left, otherRect.left, otherRect.left + otherRect.width) ||
                    this.valueInRange(otherRect.left, this.left, this.left + this.width));

    var yOverlap = (this.valueInRange(this.top, otherRect.top, otherRect.top + otherRect.height) ||
                    this.valueInRange(otherRect.top, this.top, this.top + this.height));

    return (xOverlap && yOverlap);
}

