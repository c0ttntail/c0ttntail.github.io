var baseimg = document.getElementById("base");
var div = document.getElementById("div");
var c = document.getElementById("chart");
var chart = c.getContext("2d");
var size = 480;
var stats = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]; // Mobility, Aerial, Spawn Pace, Range Biase, Reactivity, Creativity
var hue = 180

function drawStats() {
    chart.clearRect(0,0, size, size);
    chart.drawImage(baseimg, 0, 0, size, size);
    chart.beginPath();
    chart.moveTo((size*.5), (size*.5 + size*.375 * stats[3]));
    chart.lineTo((size*.5 - stats[4]*(size*0.324759526)), (size*.5 + stats[4]*(size*0.1875)));
    chart.lineTo((size*.5 - stats[5]*(size*0.324759526)), (size*.5 - stats[5]*(size*0.1875)));
    chart.lineTo((size*.5), (size*.5 - size*.375 * stats[0]))
    chart.lineTo((size*.5 + stats[1]*(size*0.324759526)), (size*.5 - stats[1]*(size*0.1875)))
    chart.lineTo((size*.5 + stats[2]*(size*0.324759526)), (size*.5 + stats[2]*(size*0.1875)))
    chart.closePath();
    chart.fill();
    chart.stroke(); }

chart.lineWidth = size/60;
chart.fillStyle = "hsl("+hue+" 100 50 / 50%)";
chart.strokeStyle = "hsl("+hue+" 100 50)";
document.onkeydown = (e) => {
    hue += 3 * ((e.key == "ArrowDown") - (e.key == "ArrowUp"));
    chart.fillStyle = "hsl("+hue+" 100 50 / 50%)";
    chart.strokeStyle = "hsl("+hue+" 100 50)";
    drawStats();
};
    
var mouseV
var mouseS
function mouseDetect(event) {
    mouseC = event.buttons > 0;
    mouseV = Math.min(1, Math.sqrt((size*.5 - event.offsetX)**2 + (size*.5 - event.offsetY)**2) / 180);
    mouseD = 1 + Math.round(.016667*Math.abs(90+ ((180/Math.PI) * Math.atan((event.offsetY-size*.5)/(event.offsetX-size*.5)) + 180*(event.offsetX < size*.5)))) % 6;
    if (mouseC == 0) {if (mouseS != 0) {mouseS = 0}} else {if (mouseS == 0) {mouseS = mouseD}};
    if (mouseS != 0) {stats[mouseS - 1] = mouseV};
    drawStats();
    console.log(mouseV);
}
drawStats();

div.onmousemove = function(event) {mouseDetect(event)};