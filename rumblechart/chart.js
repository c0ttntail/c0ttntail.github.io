var baseimg = document.getElementById("base");
var div = document.getElementById("div");
var c = document.getElementById("chart");
var chart = c.getContext("2d");
var size = 480;
var stats = [0.5, 0.5, 0.5, 0.5, 0.5, 1]; // Mobility, Aerial, Spawn Pace, Range Biase, Reactivity, Creativity

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
    mouseD = 1 + Math.round(.016667*Math.abs(90+ ((180/Math.PI) * Math.atan((mouseY-240)/(mouseX-240)) + 180*(mouseX < 240)))) % 6; // 90+ ((180/Math.PI) * Math.atan((mouseY-240)/(mouseX-240)) + 180*(mouseX < 240))
    if (mouseC == 0) {if (mouseS != 0) {mouseS = 0}} else {if (mouseS == 0) {mouseS = mouseD}};       // ((mouseS * (mouseS <= 0)) * !mouseC) + (((mouseD * (mouseS == 0)) + (mouseS * (mouseS != 0))) * mouseC)
    if (mouseS != 0) {stats[mouseS - 1] = mouseV};
    console.log(mouseD + " - " + mouseS + "   " + stats);
    chart.clearRect(0,0, chart.width, chart.height)
    drawStats(stats[3], stats[4], stats[5], stats[0], stats[1], stats[2]);
}
div.onmousemove = function(event) {mouseDetect(event)}