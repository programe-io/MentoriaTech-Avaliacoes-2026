<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dayla Linda da Moto Pro v3</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
        }

        body {
            background: linear-gradient(135deg, #1e112a 0%, #0f081d 100%);
            font-family: 'Segoe UI', Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            color: #fff;
            padding: 10px;
        }

        h1 {
            margin-bottom: 15px;
            font-size: 2rem;
            text-align: center;
            color: #ff4757;
            text-shadow: 0 0 10px rgba(255, 71, 87, 0.6);
        }

        .game-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 600px;
        }

        /* Canvas */
        canvas {
            border: 4px solid #ff4757;
            border-radius: 15px;
            background: #22252a;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
            width: 100%;
            height: auto;
            aspect-ratio: 3 / 2;
        }

        /* Painel de Controles */
        .controles-painel {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            width: 100%;
            margin-top: 15px;
        }

        .btn-acao {
            background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 18px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
            transition: all 0.1s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            touch-action: manipulation;
        }

        .btn-acao:active {
            transform: translateY(4px);
            box-shadow: 0 2px 5px rgba(255, 71, 87, 0.4);
        }

        #btnReset {
            grid-column: span 2;
            background: linear-gradient(135deg, #2ed573 0%, #7bed9f 100%);
            box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4);
            display: none;
        }

        .dica {
            margin-top: 12px;
            font-size: 0.85rem;
            color: #a4b0be;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="game-container">
        <h1>Dayla Linda da Moto Pro 🏍️✨</h1>
        
        <canvas id="gameCanvas" width="600" height="400"></canvas>

        <div class="controles-painel">
            <button class="btn-acao" id="btnSubir">⬆️ SUBIR</button>
            <button class="btn-acao" id="btnDescer">⬇️ DESCER</button>
            <button class="btn-acao" id="btnReset">🔄 JOGAR DE NOVO</button>
        </div>

        <div class="dica">
            Desvie dos Cones Laranjas 📐 e pegue os Corações de Ouro ❤️ para pontuar mais!
        </div>
    </div>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const btnReset = document.getElementById("btnReset");

        // Estado do Jogo
        let score, highScore, lives, gameOver, gameSpeed, frameCount, obstacles, collectibles;
        let invulnerableFrames = 0;

        // Carregar Recorde Salvo anterior
        highScore = localStorage.getItem("dayla_highscore") || 0;

        // Dados da Dayla
        const dayla = {
            x: 60,
            y: 180,
            width: 55,
            height: 35,
            speed: 6,
            corPrimaria: "#ff4757",
            corCabelo: "#ff6b81"
        };

        const inputs = { up: false, down: false };

        function init() {
            score = 0;
            lives = 3;
            gameOver = false;
            gameSpeed = 5;
            frameCount = 0;
            obstacles = [];
            collectibles = [];
            dayla.y = 180;
            invulnerableFrames = 0;
            btnReset.style.display = "none";
        }

        // --- CONTROLES (Teclado e Toque) ---
        window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") inputs.up = true;
            if (e.code === "ArrowDown" || e.code === "KeyS") inputs.down = true;
        });
        window.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") inputs.up = false;
            if (e.code === "ArrowDown" || e.code === "KeyS") inputs.down = false;
        });

        const btnSubir = document.getElementById("btnSubir");
        const btnDescer = document.getElementById("btnDescer");

        btnSubir.addEventListener("mousedown", () => inputs.up = true);
        btnSubir.addEventListener("mouseup", () => inputs.up = false);
        btnSubir.addEventListener("touchstart", (e) => { e.preventDefault(); inputs.up = true; });
        btnSubir.addEventListener("touchend", () => inputs.up = false);

        btnDescer.addEventListener("mousedown", () => inputs.down = true);
        btnDescer.addEventListener("mouseup", () => inputs.down = false);
        btnDescer.addEventListener("touchstart", (e) => { e.preventDefault(); inputs.down = true; });
        btnDescer.addEventListener("touchend", () => inputs.down = false);

        btnReset.addEventListener("click", init);


        // --- ENTIDADES (Obstáculos e Moedas) ---
        function spawnEntities() {
            // Spawn de Obstáculos (Cones)
            let spawnRate = Math.max(35, 75 - Math.floor(gameSpeed * 1.5));
            if (frameCount % spawnRate === 0) {
                const size = Math.random() * (35 - 20) + 20;
                obstacles.push({
                    x: canvas.width,
                    y: Math.random() * (canvas.height - size - 60) + 30,
                    width: size,
                    height: size
                });
            }

            // NOVO: Spawn de Itens Coletáveis (Corações de Ouro)
            if (frameCount % 110 === 0 && Math.random() > 0.4) {
                collectibles.push({
                    x: canvas.width,
                    y: Math.random() * (canvas.height - 50) + 25,
                    size: 15,
                    width: 20, // Para caixa de colisão rápida
                    height: 20,
                    pego: false
                });
            }
        }

        function checkCollision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        }

        // --- ATUALIZAÇÃO DA LÓGICA ---
        function update() {
            if (gameOver) {
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem("dayla_highscore", highScore);
                }
                btnReset.style.display = "block";
                return;
            }

            frameCount++;
            score++;

            if (score % 500 === 0) gameSpeed += 0.5;
            if (invulnerableFrames > 0) invulnerableFrames--;

            // Movimento da Moto
            if (inputs.up && dayla.y > 15) dayla.y -= dayla.speed;
            if (inputs.down && dayla.y < canvas.height - dayla.height - 25) dayla.y += dayla.speed;

            spawnEntities();

            // Mover e Checar Cones (Obstáculos)
            for (let i = obstacles.length - 1; i >= 0; i--) {
                obstacles[i].x -= gameSpeed;

                if (invulnerableFrames === 0 && checkCollision(dayla, obstacles[i])) {
                    lives--;
                    invulnerableFrames = 90; // Fica invulnerável por 1.5 segundos (90 frames)
                    obstacles.splice(i, 1); // Remove o obstáculo atingido
                    
                    if (lives <= 0) gameOver = true;
                    continue;
                }

                if (obstacles[i].x + obstacles[i].width < 0) obstacles.splice(i, 1);
            }

            // Mover e Checar Moedas/Corações (Coletáveis)
            for (let i = collectibles.length - 1; i >= 0; i--) {
                collectibles[i].x -= gameSpeed;

                if (checkCollision(dayla, collectibles[i])) {
                    score += 150; // Dá um baita bônus de pontos!
                    collectibles.splice(i, 1);
                    continue;
                }

                if (collectibles[i].x + collectibles[i].width < 0) collectibles.splice(i, 1);
            }
        }

        // --- RENDERIZAÇÃO GRÁFICA ---
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Estrada em movimento
            ctx.strokeStyle = "#444d56";
            ctx.lineWidth = 6;
            ctx.setLineDash([30, 20]);
            ctx.lineDashOffset = -frameCount * gameSpeed;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 3); ctx.lineTo(canvas.width, canvas.height / 3);
            ctx.moveTo(0, (canvas.height / 3) * 2); ctx.lineTo(canvas.width, (canvas.height / 3) * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Desenhar os Corações de Ouro (Moedas)
            for (let col of collectibles) {
                ctx.fillStyle = "#ffd700"; // Cor de ouro
                ctx.shadowColor = "#ffa500";
                ctx.shadowBlur = 10;
                
                // Desenha um formato de coração simples geométrico
                ctx.beginPath();
                ctx.arc(col.x, col.y, col.size/2, 0, Math.PI, true);
                ctx.arc(col.x + col.size, col.y, col.size/2, 0, Math.PI, true);
                ctx.lineTo(col.x + col.size/2, col.y + col.size);
                ctx.closePath();
                ctx.fill();
                
                ctx.shadowBlur = 0; // Reseta o brilho
            }

            // Desenhar Cones (Obstáculos)
            for (let obs of obstacles) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
                ctx.fillRect(obs.x, obs.y + obs.height - 2, obs.width, 5);

                ctx.fillStyle = "#ffa502";
                ctx.beginPath();
                ctx.moveTo(obs.x + obs.width / 2, obs.y);
                ctx.lineTo(obs.x, obs.y + obs.height);
                ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "#fff";
                ctx.fillRect(obs.x + obs.width*0.25, obs.y + obs.height*0.4, obs.width*0.5, obs.height*0.2);
            }

            // Desenhar a Dayla (Pisca se estiver invulnerável)
            if (invulnerableFrames === 0 || Math.floor(frameCount / 4) % 2 === 0) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                ctx.fillRect(dayla.x, dayla.y + dayla.height, dayla.width, 8);

                ctx.fillStyle = dayla.corPrimaria;
                ctx.fillRect(dayla.x, dayla.y, dayla.width - 5, dayla.height - 5);
                
                ctx.fillStyle = dayla.corCabelo;
                ctx.fillRect(dayla.x - 8, dayla.y + 2, 16, 12);

                ctx.fillStyle = "#111";
                ctx.beginPath();
                ctx.arc(dayla.x + 8, dayla.y + dayla.height - 2, 9, 0, Math.PI * 2);
                ctx.arc(dayla.x + dayla.width - 10, dayla.y + dayla.height - 2, 9, 0, Math.PI * 2);
                ctx.fill();
            }

            // INTERFACE (HUD Superior)
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 16px sans-serif";
            ctx.fillText(`Pontos: ${score}`, 20, 35);
            ctx.fillStyle = "#ffd700";
            ctx.fillText(`Recorde: ${highScore}`, 180, 35);

            // Desenhar as Vidas (Corações no canto superior direito)
            ctx.fillStyle = "#ff4757";
            ctx.font = "20px sans-serif";
            let vidaTexto = "";
            for(let i=0; i<lives; i++) vidaTexto += "❤️";
            ctx.textAlign = "right";
            ctx.fillText(vidaTexto, canvas.width - 20, 35);
            ctx.textAlign = "left";

            // Tela de Fim de Jogo
            if (gameOver) {
                ctx.fillStyle = "rgba(15, 8, 29, 0.9)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#ff4757";
                ctx.font = "bold 36px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("FIM DA CORRIDA! 💥", canvas.width / 2, canvas.height / 2 - 30);
                
                ctx.fillStyle = "#fff";
                ctx.font = "20px sans-serif";
                ctx.fillText(`Pontuação: ${score}`, canvas.width / 2, canvas.height / 2 + 15);
                
                if (score >= highScore) {
                    ctx.fillStyle = "#ffd700";
                    ctx.fillText("⭐ NOVO RECORDE! ⭐", canvas.width / 2, canvas.height / 2 + 50);
                }

                ctx.textAlign = "left";
            }
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Start imediato
        init();
        gameLoop();
    </script>
</body>
</html>