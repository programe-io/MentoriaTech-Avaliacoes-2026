<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Planeta Terra com JavaScript</title>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #000;
    }
    canvas {
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <canvas id="earthCanvas" width="400" height="400"></canvas>
  <script>
    const canvas = document.getElementById('earthCanvas');
    const ctx = canvas.getContext('2d');
    const radius = 200;
    let angle = 0;

    function drawEarth() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenha o oceano
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#2b65ec';
      ctx.fill();
      ctx.closePath();

      // Desenha continentes simplificados
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle);

      // Continente 1
      ctx.beginPath();
      ctx.ellipse(-30, -50, 60, 40, Math.PI / 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#2ecc71';
      ctx.fill();
      ctx.closePath();

      // Continente 2
      ctx.beginPath();
      ctx.ellipse(50, 40, 50, 30, -Math.PI / 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#2ecc71';
      ctx.fill();
      ctx.closePath();

      ctx.restore();

      // Atualiza o ângulo para girar
      angle += 0.01;

      requestAnimationFrame(drawEarth);
    }

    drawEarth();
  </script>
</body>
</html>