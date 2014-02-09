function TunnelGenerator() {

}

/**
 * Should return a value between 0 and 1
 */
TunnelGenerator.prototype.calcPosition = function(time) {
    var funcCount = 5.0;

    var ultraLowFreq = this.normalize(Math.cos(time / 550.0));
    var lowFreq = this.normalize(Math.sin(time / 350.0));
    var mediumFreq = this.normalize(Math.cos(time / 100.0));
    var heighFreq = this.normalize(Math.sin(time / 50.0)) * 0.5;
    var pyramid = this.generatePyramid(time, 3000, 150);

    return (ultraLowFreq + lowFreq + mediumFreq + heighFreq + pyramid) / funcCount;
}

TunnelGenerator.prototype.generatePyramid = function(currTime, timeInterval, onTime)
{
    var modVal = (currTime % timeInterval);
    var halfOnTime = onTime / 2;

    if (modVal < onTime) {
        if (modVal < halfOnTime){
            return ((onTime - modVal) / onTime) * 0.5;
        }
        else {
            return (modVal / onTime) * 0.5;
        }
    }
    else {
        return 0.5;
    }
}

TunnelGenerator.prototype.generateSawTooth = function(currTime, timeInterval, onTime) {
    var modVal = (currTime % timeInterval);
    var halfOnTime = (onTime / 2);

    if (modVal < onTime) {
        return ((onTime - modVal) / onTime) * 0.5;
    }
    else {
        return 0.5;
    }
}

/**
 * convert from [-1,1] to [0,1]
 */
TunnelGenerator.prototype.normalize = function(val) {
    return (val + 1.0) * 0.5;
}

/**
 * Return a value between 0 and 1, relative to the screen's height
 */
TunnelGenerator.prototype.calcHeight = function(time) {
    //return 0.15 + (this.normalize(Math.cos(time / 200.0)) * 0.1);
    return 0.1;
}
