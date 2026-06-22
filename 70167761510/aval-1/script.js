<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flor com Coração</title>

<style>
body{
    margin:0;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    background:linear-gradient(to top,#c2f0c2,#87ceeb);
}

canvas{
    background:white;
    border-radius:15px;
    box-shadow:0 0 20px rgba(0,0,0,0.2);
}
</style>
</head>
<body>

<canvas id="tela" width="500" height="500"></canvas>

<script>
const canvas = document.getElementById("tela");
const ctx = canvas.getContext("2d");

// Caule
ctx.fillStyle = "green";
ctx.fillRect(245, 220, 10, 180);

// Folhas
ctx.beginPath();
ctx.ellipse(220, 280, 35, 15, -0.5, 0, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();

ctx.beginPath();
ctx.ellipse(280, 330, 35, 15, 0.5, 0, Math.PI * 2);
ctx.fill();

// Pétalas
ctx.fillStyle = "#ff69b4";

function petala(x, y){
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();
}

petala(250, 120);
petala(180, 190);
petala(320, 190);
petala(250, 260);

// Coração
ctx.save();
ctx.translate(250, 190);
ctx.rotate(-Math.PI / 4);

ctx.fillStyle = "red";
ctx.fillRect(-30, -30, 60, 60);

ctx.beginPath();
ctx.arc(0, -30, 30, 0, Math.PI * 2);
ctx.arc(30, 0, 30, 0, Math.PI * 2);
ctx.fill();

ctx.restore();

// Texto
ctx.font = "30px Arial";
ctx.fillStyle = "#d63384";
ctx.textAlign = "center";
ctx.fillText("🌸 Flor de Amor ❤️", 250, 50);
</script>

</body>
</html>