var baseimg = document.getElementById("base");
var div = document.getElementById("div");
var c = document.getElementById("chart");
var chart = c.getContext("2d");
var size = 480;

chart.drawImage(baseimg, 0, 0, size, size);

chart.fillStyle = "rgb(0 255 255 / 50%)";
chart.strokeStyle = "rgb(0 255 255)"
chart.lineWidth = size/60;

function drawStats(a, b, c, d, e, f) {
    chart.beginPath();
    chart.moveTo((size*.5), (size*.5 + size*.375 * a));
    chart.lineTo((size*.5 - b*(size*0.324759526)), (size*.5 + b*(size*0.1875)));
    chart.lineTo((size*.5 - c*(size*0.324759526)), (size*.5 - c*(size*0.1875)));
    chart.lineTo((size*.5), (size*.5 - size*.375 * d))
    chart.lineTo((size*.5 + e*(size*0.324759526)), (size*.5 - e*(size*0.1875)))
    chart.lineTo((size*.5 + f*(size*0.324759526)), (size*.5 + f*(size*0.1875)))
    chart.closePath();
    chart.fill();
    chart.stroke(); }

var mouseX
var mouseY
var mouseV
var mouseS
function mouseDetect(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    mouseC = event.buttons > 0;
    mouseV = Math.min(size*.375, Math.sqrt((mouseX - size*.5)^2 + (mouseY - size*.5)^2));
    mouseD = (180/Math.PI) * Math.atan(mouseY/mouseX) + 180*(mouseX < 0) // (.016667*Math.abs((180/Math.PI) * Math.atan(mouseY/mouseX))) % 6;
    console.log(mouseD);
}
div.onmousemove = function(event) {mouseDetect(event)}

var stats = [0.5, 0.5, 1, 0.5, 0.5, 0.5]; // Range Bias, Reactivity, Creativity, Mobility, Aerial, Spawn Pace

drawStats(stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]);