UTIL = {};

UTIL.getTime = function() {
    return new Date().getTime();
}

UTIL.rgbToHtml = function(r, g, b) {
    var decColor = 0x1000000 + b + 0x100 * g + 0x10000 * r ;
    return '#' + decColor.toString(16).substr(1);
}

UTIL.dice = function(max) {
    return Math.floor(Math.random() * (max + 1));
}
