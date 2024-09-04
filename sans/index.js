var img = document.getElementById("sand");
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var input = document.getElementById("input");
new FontFace("Sans", "sans.ttf");

ctx.shadowBlur = 50;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowColor = "hsl(0 100 50)";

function draw() {
    ctx.drawImage(img, 0, 0, 640, 480);
    ctx.fillStyle = "red";
    ctx.font = "30px Sans";
    for (let p = 1; p < 20; p++) ctx.fillText(input.value, 200, 100); }

function load() { draw(); };

input.addEventListener("change", update);
function update(e) {
    draw() }