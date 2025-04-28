var graphimg = document.getElementById("graph");
var labelimg = document.getElementById("label");
var guideimg = document.getElementById("guide");
var hue = document.getElementById("hue");
var sat = document.getElementById("sat");
var val = document.getElementById("val");
var contain = document.getElementById("contain");
var add = document.getElementById("add");
var dump = document.getElementById("dump");
var shadowedC = document.getElementById("shadowedC");
var c = document.getElementById("chart");
var chart = c.getContext("2d");
var size = 480;
var chartTemplate, restrict, stats, extras
function charting(l, r, t) {
    chartTemplate = l;
    restrict = r;
    labelimg.src = "label" + t + ".png"
    stats = [];
    extras = [];
    for (point in chartTemplate) stats[point] = Math.ceil(Math.floor(chartTemplate[point])*.5); };
charting([5, 5, 5, 5.5, 5, 5], 11, "Shoeless");
var color = [180, 100, 50]
var hexSat = 0;
var shadowed = false;
var show = [true, true, true, true, true];
chart.lineWidth = size/60;
chart.shadowBlur = 15;
chart.shadowOffsetX = 0;
chart.shadowOffsetY = 0;
function sin(angle) { return Math.sin(angle * (Math.PI / 180)); }
function cos(angle) { return Math.cos(angle * (Math.PI / 180)); }

function drawBase() {
    for (let l = Math.floor(chartTemplate[1]); l > 0; l--) {
        chart.beginPath();
        chart.moveTo((size/2), (size/2 - size/3*( l / Math.floor(chartTemplate[1]) )));
        for (let p = 1; p < stats.length; p++) {
            chart.lineTo((size/2 + (size/3 * cos( p * (360/stats.length) - 90 ) )*( l / Math.floor(chartTemplate[1]) )), (size/2 + (size/3 * sin( p * (360/stats.length) - 90 ))*( l / Math.floor(chartTemplate[1]) ))); };
        chart.closePath();
        chart.fillStyle = "hsl("+color[0]+" "+hexSat+" "+( 5 + 25*( l / Math.floor(chartTemplate[1]) ))+")";
        chart.fill();
        chart.shadowBlur = 15 * shadowed };
    chart.shadowBlur = 15; };
function drawStats() {
    chart.clearRect(0,0, size, size);
    chart.shadowColor = "hsl(0 0 0)";
    if (show[0] == true) drawBase();
    if (show[1] == true) {
        for (let l = 0; l < stats.length; l++) {
            chart.setTransform(1, 0, 0, 1, size/2, size/2)
            chart.rotate((( 360 / stats.length ) * l +180) * Math.PI / 180);
            chart.drawImage(graphimg, -4.5, 0); };
        chart.setTransform(1,0,0,1,0,0); };
    if (show[2] == true) chart.drawImage(labelimg, 0, 0, size, size);
    if (show[3] == true) {
        for (extra of extras) {
            chart.beginPath();
            chart.moveTo((size/2), (size/2 - size/3*( extra[0] / Math.floor(chartTemplate[1]) )));
            for (let p = 1; p < stats.length; p++) {
                chart.lineTo((size/2 + (size/3 * cos( p * (360/stats.length) - 90 ) )*( extra[p] / Math.floor(chartTemplate[1]) )), (size/2 + (size/3 * sin( p * (360/stats.length) - 90 ))*( extra[p] / Math.floor(chartTemplate[1]) ))); };
            chart.closePath();
            chart.shadowColor = "hsl("+extra[Math.floor(chartTemplate[1]) +1]+" "+extra[Math.floor(chartTemplate[1]) +2]+" "+extra[Math.floor(chartTemplate[1]) +3]+")";
            chart.fillStyle = "hsl("+extra[Math.floor(chartTemplate[1]) +1]+" "+extra[Math.floor(chartTemplate[1]) +2]+" "+extra[Math.floor(chartTemplate[1]) +3]+" / 50%)";
            chart.strokeStyle = "hsl("+extra[Math.floor(chartTemplate[1]) +1]+" "+extra[Math.floor(chartTemplate[1]) +2]+" "+extra[Math.floor(chartTemplate[1]) +3]+")";
            chart.fill();
            chart.stroke(); };
        chart.beginPath();
        chart.moveTo((size/2), (size/2 - size/3*( stats[0] / Math.floor(chartTemplate[1]) )));
        for (let p = 1; p < stats.length; p++) {
            chart.lineTo((size/2 + (size/3 * cos( p * (360/stats.length) - 90 ) )*( stats[p] / Math.floor(chartTemplate[1]) )), (size/2 + (size/3 * sin( p * (360/stats.length) - 90 ))*( stats[p] / Math.floor(chartTemplate[1]) ))); };
        chart.closePath();
        chart.shadowColor = "hsl("+color[0]+" "+color[1]+" "+color[2]+")";
        chart.fillStyle = "hsl("+color[0]+" "+color[1]+" "+color[2]+"/ 50%)";
        chart.strokeStyle = "hsl("+color[0]+" "+color[1]+" "+color[2]+")";
        chart.fill();
        chart.stroke(); };
    chart.shadowColor = "hsl(0 0 0)";
    if (show[4] == true) chart.drawImage(guideimg, 0, 0, size, size); };

document.onkeydown = (e) => {
    if (e.shiftKey == 0) {} else {hexSat = Math.min(100, Math.max(0, hexSat + 3 * ((e.key == "ArrowUp") - (e.key == "ArrowDown"))));}
    if (e.key == "1") show[0] = !show[0];
    if (e.key == "2") show[1] = !show[1];
    if (e.key == "3") show[2] = !show[2];
    if (e.key == "4") show[3] = !show[3];
    if (e.key == "5") show[4] = !show[4];
    drawStats(); };
    
var mouseV
var mouseS
function mouseDetect(event) {
    var mouseC = event.buttons > 0;
    mouseV = Math.min(Math.floor(chartTemplate[1]), (Math.sqrt((size/2 - event.offsetX)**2 + (size/2 - event.offsetY)**2) /30.6)*(Math.floor(chartTemplate[1])/5));
    var mouseD = 1 + Math.round((stats.length/360)*Math.abs(90+ ((180/Math.PI) * Math.atan((event.offsetY-size*.5)/(event.offsetX-size*.5)) + 180*(event.offsetX < size*.5)))) % stats.length;
    if (chartTemplate[mouseD-1] - Math.floor(chartTemplate[mouseD-1]) == 0) { // interpolate
        mouseV = Math.floor(mouseV)+.5+(Math.sin(Math.PI*(1.5+(mouseV % 1))))/2
    } else {
        mouseV += ( Math.abs(Math.sin(2*mouseV*Math.PI+Math.PI*0.5))**0.5 * (Math.round(Math.abs(mouseV-0.25 % -1)) * 0.25 + 0.5) ) * ( (Math.round(mouseV * 2) * 0.5) - mouseV ); };
    if (mouseC == 0) {if (mouseS != 0) {mouseS = 0}} else {if (mouseS == 0) {mouseS = mouseD}};
    if (mouseS != 0) stats[mouseS - 1] = mouseV;
    if ([1,3,5].includes(mouseS) && (stats[0]+stats[2]+stats[4] > restrict && restrict > 0)) { var statsE = (stats[0]+stats[2]+stats[4] - restrict) * -0.5;
        if (mouseS != 1) stats[0] += statsE;
        if (mouseS != 3) stats[2] += statsE;
        if (mouseS != 5) stats[4] += statsE;}
    drawStats(); };
drawStats();
contain.onmousemove = function(event) {mouseDetect(event)};

function addChart() {
    extras.push(stats.concat(color));
    stats = []
    for (point in chartTemplate) stats[point] = Math.ceil(Math.floor(chartTemplate[point])*.5);
    drawStats(); };

hue.oninput = function() {
    color[0] = this.value;
    drawStats(); };
sat.oninput = function() {
    color[1] = this.value;
    drawStats(); };
val.oninput = function() {
    color[2] = this.value;
    drawStats(); };