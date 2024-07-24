var baseimg = document.getElementById("base");
var div = document.getElementById("div");
var c = document.getElementById("chart");
var chart = c.getContext("2d");
var size = 480;
var stats = [2.5, 2.5, 2.5, 2.5, 2.5, 2.5]; // Mobility, Aerial, Spawn Pace, Range Biase, Reactivity, Creativity
var hue = 180
chart.lineWidth = size/60;

function drawStats() {
    chart.clearRect(0,0, size, size);
    chart.drawImage(baseimg, 0, 0, size, size);
    chart.beginPath();
    chart.moveTo((size*.5), (size*.5 + stats[3]*size*.06375));
    chart.lineTo((size*.5 - stats[4]*size*0.055209118), (size*.5 + stats[4]*size*0.031875));
    chart.lineTo((size*.5 - stats[5]*size*0.055209118), (size*.5 - stats[5]*size*0.031875));
    chart.lineTo((size*.5), (size*.5 - stats[0]*size*.06375))
    chart.lineTo((size*.5 + stats[1]*size*0.055209118), (size*.5 - stats[1]*size*0.031875))
    chart.lineTo((size*.5 + stats[2]*size*0.055209118), (size*.5 + stats[2]*size*0.031875))
    chart.closePath();
    chart.fillStyle = "hsl("+hue+" 100 50 / 50%)";
    chart.strokeStyle = "hsl("+hue+" 100 50)";
    chart.fill();
    chart.stroke(); }

document.onkeydown = (e) => {
    hue += 3 * ((e.key == "ArrowDown") - (e.key == "ArrowUp"));
    chart.fillStyle = "hsl("+hue+" 100 50 / 50%)";
    chart.strokeStyle = "hsl("+hue+" 100 50)";
    drawStats(); };
    
var mouseV
var mouseS
function mouseDetect(event) {
    var mouseC = event.buttons > 0;
    mouseV = Math.min(5, Math.sqrt((size*.5 - event.offsetX)**2 + (size*.5 - event.offsetY)**2) /30.6);
    mouseV = mouseV + Math.abs(Math.sin(mouseV*Math.PI + Math.PI*.5))**.5 * ((Math.round(mouseV * 5) * .2) - mouseV)
    var mouseD = 1 + Math.round(.016667*Math.abs(90+ ((180/Math.PI) * Math.atan((event.offsetY-size*.5)/(event.offsetX-size*.5)) + 180*(event.offsetX < size*.5)))) % 6;
    if (mouseC == 0) {if (mouseS != 0) {mouseS = 0}} else {if (mouseS == 0) {mouseS = mouseD}};
    if (mouseS != 0) {stats[mouseS - 1] = mouseV};
    drawStats(); }
drawStats();

div.onmousemove = function(event) {mouseDetect(event)};