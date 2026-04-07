<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Sistema Solar JS</title>

<style>
  body {
    margin: 0;
    background: black;
    overflow: hidden;
  }

  canvas {
    display: block;
  }
</style>
</head>

<body>

<canvas id="espaco"></canvas>

<script>
const canvas = document.getElementById("espaco");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centroX = canvas.width / 2;
const centroY = canvas.height / 2;

// Planetas
const planetas = [
  { nome: "Mercúrio", raio: 60, tamanho: 4, cor: "gray", velocidade: 0.04 },
  { nome: "Vênus", raio: 90, tamanho: 6, cor: "orange", velocidade: 0.03 },
  { nome: "Terra", raio: 130, tamanho: 7, cor: "blue", velocidade: 0.02 },
  { nome: "Marte", raio: 170, tamanho: 6, cor: "red", velocidade: 0.015 },
  { nome: "Júpiter", raio: 220, tamanho: 12, cor: "#d2b48c", velocidade: 0.01 },
  { nome: "Saturno", raio: 280, tamanho: 10, cor: "#deb887", velocidade: 0.008 }
];

// Ângulo inicial
planetas.forEach(p => p.angulo = Math.random() * Math.PI * 2);

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sol
  ctx.beginPath();
  ctx.arc(centroX, centroY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();

  planetas.forEach(p => {
    // órbita (linha)
    ctx.beginPath();
    ctx.arc(centroX, centroY, p.raio, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.stroke();

    // posição do planeta
    let x = centroX + Math.cos(p.angulo) * p.raio;
    let y = centroY + Math.sin(p.angulo) * p.raio;

    // planeta
    ctx.beginPath();
    ctx.arc(x, y, p.tamanho, 0, Math.PI * 2);
    ctx.fillStyle = p.cor;
    ctx.fill();

    // atualizar ângulo (movimento)
    p.angulo += p.velocidade;
  });

  requestAnimationFrame(desenhar);
}

desenhar();

// Ajustar tela ao redimensionar
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
</script>

</body>
</html>