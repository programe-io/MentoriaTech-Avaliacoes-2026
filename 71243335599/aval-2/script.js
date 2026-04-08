<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verão Interativo</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #FFD700, #FF8C00);
            font-family: Arial, sans-serif;
            overflow: hidden;
        }

        .sun {
            width: 100px;
            height: 100px;
            background: yellow;
            border-radius: 50%;
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0 0 50px yellow;
        }

        .cloud {
            width: 120px;
            height: 60px;
            background: #fff;
            border-radius: 60px;
            position: absolute;
            top: 100px;
            left: -150px;
            opacity: 0.8;
        }

        h1 {
            color: white;
            text-shadow: 2px 2px #FF4500;
            z-index: 10;
            position: relative;
        }
    </style>
</head>
<body>
    <div class="sun"></div>
    <div class="cloud"></div>
    <h1>Bem-vindo ao Verão!</h1>

    <script>
        // Movimento do sol
        const sun = document.querySelector('.sun');
        let sunPosition = 50; // posição inicial top
        let direction = 1; // direção do movimento

        function moveSun() {
            sunPosition += direction;
            if (sunPosition > 200 || sunPosition < 50) direction *= -1;
            sun.style.top = sunPosition + 'px';
        }

        setInterval(moveSun, 50); // atualiza a cada 50ms

        // Nuvem se movendo
        const cloud = document.querySelector('.cloud');
        let cloudPosition = -150;

        function moveCloud() {
            cloudPosition += 2;
            if (cloudPosition > window.innerWidth) cloudPosition = -150;
            cloud.style.left = cloudPosition + 'px';
        }

        setInterval(moveCloud, 30); // atualiza a cada 30ms
    </script>
</body>
</html>