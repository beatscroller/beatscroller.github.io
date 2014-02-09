/**
    Draws a set of audio bars on an HTML5 Canvas Element.
    The bars will be evenly spread across the width of the canvas
    Bar values should be between 0 and 1
*/

function AudioBars(canvas, color, barCount, verticalFlip) {
    this.canvas = canvas;
    this.color = color;
    this.verticalFlip = verticalFlip;

    this.bars = [];
    this.bars.length = barCount;

    this.limits = [];
    this.limits.length = barCount;

    for (var i=0; i < barCount; i++)
    {
        this.limits[i] = 0.5;
    }

    this.spacing = 3;
}

AudioBars.prototype.updateIntensities = function(intensities)
{
    this.bars = [];
    this.bars.length = intensities.length;
    var barWidth = canvas.width / intensities.length;

    for (var i = 0; i < intensities.length; i++)
    {
        // calculate the current bar's position
        var barHeight = canvas.height * intensities[i] * this.limits[i];
        var barHorizonalOffset = i * barWidth;

        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle=this.color;

        var barTop;

        if (this.verticalFlip) {
            barTop = 0;
        }
        else {
            barTop = canvas.height - barHeight;
        }

        // insert it to the bars rectangle array
        this.bars[i] = new Rectangle(barHorizonalOffset, barTop, barWidth - this.spacing, barHeight);
    }
}

AudioBars.prototype.updateLimit = function(position) {
    for (var i = 0; i < this.limits.length - 1; i++)
    {
        this.limits[i] = this.limits[i+1];
    }

    this.limits[this.limits.length] = position;
}

AudioBars.prototype.draw = function() {
    ctx.fillStyle=this.color;

    for (var i in this.bars)
    {
        var bar = this.bars[i];
        ctx.fillRect(bar.left, bar.top, bar.width, bar.height);
    }
}

AudioBars.prototype.collidesWith = function(rectangle) {
    for (var i in this.bars)
    {
        var bar = this.bars[i];

        if (bar.intersects(rectangle))
        {
            return true;
        }
    }

    return false;
}

