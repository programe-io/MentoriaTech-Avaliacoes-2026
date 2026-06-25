<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Snake</title>
<style>
body{
    text-align:center;
    background:#222;
}
canvas{
    background:black;
}
</style>
</head>
<body>

<h1 style="color:white;">Snake</h1>
<canvas id="game" width="400" height="400"></canvas>

<script>
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 200;
let y = 200;
let dx = 20;
let dy = 0;

document.addEventListener("keydown", e=>{
    if(e.key=="ArrowUp"){dx=0;dy=-20;}
    if(e.key=="ArrowDown"){dx=0;dy=20;}
    if(e.key=="ArrowLeft"){dx=-20;dy=0;}
    if(e.key=="ArrowRight"){dx=20;dy=0;}
});

function desenhar(){
    ctx.clearRect(0,0,400,400);

    x += dx;
    y += dy;

    if(x<0)x=380;
    if(x>380)x=0;
    if(y<0)y=380;
    if(y>380)y=0;

    ctx.fillStyle="lime";
    ctx.fillRect(x,y,20,20);
}

setInterval(desenhar,100);
</script>

</body>
</html>