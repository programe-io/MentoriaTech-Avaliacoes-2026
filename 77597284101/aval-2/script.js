<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moto Rider JS Pro</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="game-wrapper">
        <div class="overlay game-over" id="gameOverScreen">
            <h2>FIM DE CORRIDA</h2>
            <p>Pontuação total: <span id="finalScore">0</span></p>
            <button class="btn-action" id="btnRestart">Acelerar de Novo</button>
        </div>

        <div class="game-header">
            <h1>Moto Rider JS</h1>
            <div class="stats">
                <div class="stat-box">GAS: <span id="fuelDisplay">100</span>%</div>
                <div class="stat-box">PTS: <span id="scoreDisplay">0</span></div>
            </div>
        </div>

        <canvas id="gameCanvas" width="850" height="400"></canvas>
        <p class="instructions">Use as setas ▲ e ▼ para pilotar. Colete os galões de combustível!</p>
    </div>

    <script src="game.js"></script>
</body>
</html>