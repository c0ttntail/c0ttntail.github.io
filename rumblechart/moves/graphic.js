var graphimg = document.getElementById("graph");
var labelimg = document.getElementById("label");
var contain = document.getElementById("contain");
var add = document.getElementById("add");
var dump = document.getElementById("dump");
var sCompC = document.getElementById("sCompC");
var c = document.getElementById("chart");
var chart = c.getContext("2d");
var size = 480;
var stats = [3, 3, 3, 3, 3, 3, 3, 3]; // Time, Velocity, Creativity, Situationality, Range, Damage, Height, Control, Difficulty
var polyHue = 180
var hexSat = 0
var sComp = false
var show = [true, true, true, true]
var extras = []
chart.lineWidth = size/60;
chart.shadowBlur = 15
chart.shadowOffsetX = 0;
chart.shadowOffsetY = 0;

function drawPenta() {
    for (let p = 1; p < 6; p++) {
        chart.beginPath();
        chart.moveTo((size*.5-(6-p)*size*0.0466690475583), (size*.5-(6-p)*size*0.0466690475583));
        chart.lineTo((size*.5-(6-p)*size*0.066), (size*.5));
        chart.lineTo((size*.5-(6-p)*size*0.0466690475583), (size*.5+(6-p)*size*0.0466690475583));
        chart.lineTo((size*.5), (size*.5+(6-p)*size*0.066));
        chart.lineTo((size*.5+(6-p)*size*0.0466690475583), (size*.5+(6-p)*size*0.0466690475583));
        chart.lineTo((size*.5+(6-p)*size*0.066), (size*.5));
        chart.lineTo((size*.5+(6-p)*size*0.0466690475583), (size*.5-(6-p)*size*0.0466690475583));
        chart.lineTo((size*.5), (size*.5-(6-p)*size*0.066));
        chart.closePath();
        chart.fillStyle = "hsl("+polyHue+" "+hexSat+" "+(33 - p*5)+")";
        chart.fill();
        chart.shadowBlur = 15 * sComp };
    chart.shadowBlur = 15; };
function drawStats() {
    chart.clearRect(0,0, size, size);
    chart.shadowColor = "hsl(0 0 0)";
    if (show[0] == true) {drawPenta();}
    if (show[1] == true) {chart.drawImage(graphimg, 0, 0, size, size);};
    if (show[2] == true) {chart.drawImage(labelimg, 0, 0, size, size);};
    if (show[3] == true) {
        for (extra of extras) {
            chart.beginPath();
            chart.moveTo((size*.5-extra[0]*size*0.0466690475583), (size*.5-extra[0]*size*0.0466690475583));
            chart.lineTo((size*.5-extra[1]*size*0.066), (size*.5));
            chart.lineTo((size*.5-extra[2]*size*0.0466690475583), (size*.5+extra[2]*size*0.0466690475583));
            chart.lineTo((size*.5), (size*.5+extra[3]*size*0.066));
            chart.lineTo((size*.5+extra[4]*size*0.0466690475583), (size*.5+extra[4]*size*0.0466690475583));
            chart.lineTo((size*.5+extra[5]*size*0.066), (size*.5));
            chart.lineTo((size*.5+extra[6]*size*0.0466690475583), (size*.5-extra[6]*size*0.0466690475583));
            chart.lineTo((size*.5), (size*.5-extra[7]*size*0.066));
            chart.closePath();
            chart.shadowColor = "hsl("+extra[8]+" 100 25)";
            chart.fillStyle = "hsl("+extra[8]+" 100 50 / 50%)";
            chart.strokeStyle = "hsl("+extra[8]+" 100 50)";
            chart.fill();
            chart.stroke(); };
        chart.beginPath();
        chart.moveTo((size*.5-stats[0]*size*0.0466690475583), (size*.5-stats[0]*size*0.0466690475583));
        chart.lineTo((size*.5-stats[1]*size*0.066), (size*.5));
        chart.lineTo((size*.5-stats[2]*size*0.0466690475583), (size*.5+stats[2]*size*0.0466690475583));
        chart.lineTo((size*.5), (size*.5+stats[3]*size*0.066));
        chart.lineTo((size*.5+stats[4]*size*0.0466690475583), (size*.5+stats[4]*size*0.0466690475583));
        chart.lineTo((size*.5+stats[5]*size*0.066), (size*.5));
        chart.lineTo((size*.5+stats[6]*size*0.0466690475583), (size*.5-stats[6]*size*0.0466690475583));
        chart.lineTo((size*.5), (size*.5-stats[7]*size*0.066));
        chart.closePath();
        chart.shadowColor = "hsl("+polyHue+" 100 25)";
        chart.fillStyle = "hsl("+polyHue+" 100 50 / 50%)";
        chart.strokeStyle = "hsl("+polyHue+" 100 50)";
        chart.fill();
        chart.stroke(); }; };

document.onkeydown = (e) => {
    if (e.shiftKey == 0) {polyHue += 3 * ((e.key == "ArrowDown") - (e.key == "ArrowUp"));} else {hexSat = Math.min(100, Math.max(0, hexSat + 3 * ((e.key == "ArrowUp") - (e.key == "ArrowDown"))));}
    if (e.key == "1") {show[0] = !show[0]};
    if (e.key == "2") {show[1] = !show[1]};
    if (e.key == "3") {show[2] = !show[2]};
    if (e.key == "4") {show[3] = !show[3]};
    drawStats(); };
    
var mouseV
var mouseS
function mouseDetect(event) { // update !!!!
    var mouseC = event.buttons > 0;
    mouseV = Math.min(5, Math.sqrt((size*.5 - event.offsetX)**2 + (size*.5 - event.offsetY)**2) /30.6);
    mouseV = mouseV + (Math.abs(Math.sin(2*mouseV*Math.PI+Math.PI*0.5))**0.5 * (Math.round(Math.abs(mouseV-0.25 % -1)) * 0.25 + 0.5)) * ((Math.round(mouseV * 2) * 0.5) - mouseV);
    var mouseD = 1 + Math.round(0.0222222222222*Math.abs(90+ ((180/Math.PI) * Math.atan((event.offsetY-size*.5)/(event.offsetX-size*.5)) + 180*(event.offsetX < size*.5)))) % 8;
    if (mouseC == 0) {if (mouseS != 0) {mouseS = 0}} else {if (mouseS == 0) {mouseS = 9 - mouseD}};
    if (mouseS != 0) {stats[mouseS - 1] = mouseV};
    drawStats(); };
drawStats();

contain.onmousemove = function(event) {mouseDetect(event)};
add.onmousedown = function(event) {
    extras.push([stats[0], stats[1], stats[2], stats[3], stats[4], stats[5], stats[6], stats[7], polyHue]); 
    stats = [3, 3, 3, 3, 3, 3, 3, 3];
    polyHue = 180;
    drawStats(); };
dump.onmousedown = function(event) {extras = []; drawStats();};
sCompC.onmousedown = function() {sComp = !sComp; drawStats(); console.log("sCompC")};