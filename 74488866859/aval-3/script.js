<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🐍 Jogo da Cobrinha</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            color: #fff;
        }

        h1 {
            margin-bottom: 10px;
            font-size: 2rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .placar {
            display: flex;
            gap: 30px;
            margin-bottom: 15px;
            font-size: 1.2rem;
            font-weight: bold;
        }

        .placar span {
            background: rgba(255,255,255,0.15);
            padding: 8px 20px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }

        canvas {
            background: #0f2027;
            border: 4px solid #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            max-width: 100%;
            touch-action: none;
        }

        .controles {
            margin-top: 15px;
            text-align: center;
            font-size: 0.95rem;
            opacity: 0.85;
        }

        .btn {
            margin-top: 15px;
            padding: 12px 30px;
            background: #ff6b6b;
            color: #fff;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(255,107,107,0.5);
        }

        /* Controles mobile */
        .mobile-controls {
            display: none;
            margin-top: 20px;
            grid-template-columns: repeat(3, 60px);
            grid-template-rows: repeat(3, 60px);
            gap: 5px;
        }

        .mobile-controls button {
            background: rgba(255,255,255,0.2);
            border: 2px solid #fff;
            border-radius: 10px;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
        }

        .mobile-controls button:active {
            background: rgba(255,255,255,0.4);
        }

        .up { grid-column: 2; grid-row: 1; }
        .left { grid-column: 1; grid-row: 2; }
        .right { grid-column: 3; grid-row: 2; }
        .down { grid-column: 2; grid-row: 3; }

        @media (max-width: 600px) {
            .mobile-controls { display: grid; }
            h1 { font-size: 1.5rem; }
        }
    </style>
</head>
<body>
    <h1>🐍 Jogo da Cobrinha</h1>
    <div class="placar">
        <span>Pontos: <span id="pontos">0</span></span>
        <span>Recorde: <span id="recorde">0</span></span>
    </div>

    <canvas id="game" width="400" height="400"></canvas>

    <div class="controles">
        Use as <b>setas do teclado</b> ou <b>WASD</b> para mover
    </div>

    <div class="mobile-controls">
        <button class="up" data-dir="up">▲</button>
        <button class="left" data-dir="left">◀</button>
        <button class="right" data-dir="right">▶</button>
        <button class="down" data-dir="down">▼</button>
    </div>

    <button class="btn" id="btnReiniciar">🔄 Reiniciar</button>

    <script>
        // ===== Configurações do jogo =====
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        const tamanhoBloco = 20;
        const colunas = canvas.width / tamanhoBloco;
        const linhas = canvas.height / tamanhoBloco;

        // ===== Estado do jogo =====
        let cobra, comida, direcao, proximaDirecao, pontos, recorde, gameOver, loopJogo;

        recorde = parseInt(localStorage.getItem('recordeSnake') || '0');
        document.getElementById('recorde').textContent = recorde;

        // ===== Inicialização =====
        function iniciarJogo() {
            cobra = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 }
            ];
            direcao = 'right';
            proximaDirecao = 'right';
            pontos = 0;
            gameOver = false;
            document.getElementById('pontos').textContent = pontos;
            gerarComida();
            if (loopJogo) clearInterval(loopJogo);
            loopJogo = setInterval(atualizar, 120);
        }

        // ===== Gera comida em posição aleatória =====
        function gerarComida() {
            comida = {
                x: Math.floor(Math.random() * colunas),
                y: Math.floor(Math.random() * linhas)
            };
            // Evita gerar em cima da cobra
            for (let parte of cobra) {
                if (parte.x === comida.x && parte.y === comida.y) {
                    return gerarComida();
                }
            }
        }

        // ===== Atualiza o jogo a cada frame =====
        function atualizar() {
            if (gameOver) return;

            direcao = proximaDirecao;
            const cabeca = { ...cobra[0] };

            switch (direcao) {
                case 'up': cabeca.y--; break;
                case 'down': cabeca.y++; break;
                case 'left': cabeca.x--; break;
                case 'right': cabeca.x++; break;
            }

            // Verifica colisão com paredes
            if (cabeca.x < 0 || cabeca.x >= colunas || cabeca.y < 0 || cabeca.y >= linhas) {
                return fimDeJogo();
            }

            // Verifica colisão com o próprio corpo
            for (let parte of cobra) {
                if (cabeca.x === parte.x && cabeca.y === parte.y) {
                    return fimDeJogo();
                }
            }

            cobra.unshift(cabeca);

            // Verifica se comeu a comida
            if (cabeca.x === comida.x && cabeca.y === comida.y) {
                pontos++;
                document.getElementById('pontos').textContent = pontos;
                gerarComida();
            } else {
                cobra.pop();
            }

            desenhar();
        }

        // ===== Desenha tudo na tela =====
        function desenhar() {
            // Fundo com gradiente
            ctx.fillStyle = '#0f2027';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Desenha grade sutil
            ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            for (let i = 0; i < colunas; i++) {
                for (let j = 0; j < linhas; j++) {
                    ctx.strokeRect(i * tamanhoBloco, j * tamanhoBloco, tamanhoBloco, tamanhoBloco);
                }
            }

            // Desenha a comida (maçã 🍎)
            ctx.fillStyle = '#ff4757';
            ctx.beginPath();
            ctx.arc(
                comida.x * tamanhoBloco + tamanhoBloco / 2,
                comida.y * tamanhoBloco + tamanhoBloco / 2,
                tamanhoBloco / 2 - 2,
                0, Math.PI * 2
            );
            ctx.fill();

            // Desenha a cobra
            cobra.forEach((parte, i) => {
                if (i === 0) {
                    // Cabeça mais brilhante
                    ctx.fillStyle = '#2ed573';
                } else {
                    // Corpo com gradiente
                    const tom = Math.max(100, 200 - i * 5);
                    ctx.fillStyle = `rgb(46, ${tom}, 115)`;
                }
                ctx.fillRect(
                    parte.x * tamanhoBloco + 1,
                    parte.y * tamanhoBloco + 1,
                    tamanhoBloco - 2,
                    tamanhoBloco - 2
                );

                // Olhos na cabeça
                if (i === 0) {
                    ctx.fillStyle = '#fff';
                    let olhoX1, olhoY1, olhoX2, olhoY2;
                    const centro = tamanhoBloco / 2;
                    const off = tamanhoBloco * 0.2;

                    if (direcao === 'right') {
                        olhoX1 = centro + off; olhoY1 = centro - off;
                        olhoX2 = centro + off; olhoY2 = centro + off;
                    } else if (direcao === 'left') {
                        olhoX1 = centro - off; olhoY1 = centro - off;
                        olhoX2 = centro - off; olhoY2 = centro + off;
                    } else if (direcao === 'up') {
                        olhoX1 = centro - off; olhoY1 = centro - off;
                        olhoX2 = centro + off; olhoY2 = centro - off;
                    } else {
                        olhoX1 = centro - off; olhoY1 = centro + off;
                        olhoX2 = centro + off; olhoY2 = centro + off;
                    }

                    ctx.beginPath();
                    ctx.arc(parte.x * tamanhoBloco + olhoX1, parte.y * tamanhoBloco + olhoY1, 2, 0, Math.PI * 2);
                    ctx.arc(parte.x * tamanhoBloco + olhoX2, parte.y * tamanhoBloco + olhoY2, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Mensagem de Game Over
            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 30px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('💀 GAME OVER', canvas.width / 2, canvas.height / 2 - 10);
                ctx.font = '18px Arial';
                ctx.fillText(`Pontos: ${pontos}`, canvas.width / 2, canvas.height / 2 + 25);
            }
        }

        // ===== Fim de jogo =====
        function fimDeJogo() {
            gameOver = true;
            clearInterval(loopJogo);
            if (pontos > recorde) {
                recorde = pontos;
                localStorage.setItem('recordeSnake', recorde);
                document.getElementById('recorde').textContent = recorde;
                alert('🏆 Novo recorde: ' + recorde + ' pontos!');
            }
            desenhar();
        }

        // ===== Controles por teclado =====
        document.addEventListener('keydown', (e) => {
            const tecla = e.key.toLowerCase();
            if ((tecla === 'arrowup' || tecla === 'w') && direcao !== 'down') proximaDirecao = 'up';
            else if ((tecla === 'arrowdown' || tecla === 's') && direcao !== 'up') proximaDirecao = 'down';
            else if ((tecla === 'arrowleft' || tecla === 'a') && direcao !== 'right') proximaDirecao = 'left';
            else if ((tecla === 'arrowright' || tecla === 'd') && direcao !== 'left') proximaDirecao = 'right';
        });

        // ===== Controles mobile (botões) =====
        document.querySelectorAll('.mobile-controls button').forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = btn.dataset.dir;
                if (dir === 'up' && direcao !== 'down') proximaDirecao = 'up';
                else if (dir === 'down' && direcao !== 'up') proximaDirecao = 'down';
                else if (dir === 'left' && direcao !== 'right') proximaDirecao = 'left';
                else if (dir === 'right' && direcao !== 'left') proximaDirecao = 'right';
            });
        });

        // ===== Controle por swipe no celular =====
        let toqueX, toqueY;
        canvas.addEventListener('touchstart', (e) => {
            toqueX = e.touches[0].clientX;
            toqueY = e.touches[0].clientY;
        });
        canvas.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - toqueX;
            const dy = e.changedTouches[0].clientY - toqueY;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0 && direcao !== 'left') proximaDirecao = 'right';
                else if (dx < 0 && direcao !== 'right') proximaDirecao = 'left';
            } else {
                if (dy > 0 && direcao !== 'up') proximaDirecao = 'down';
                else if (dy < 0 && direcao !== 'down') proximaDirecao = 'up';
            }
        });

        // ===== Botão reiniciar =====
        document.getElementById('btnReiniciar').addEventListener('click', iniciarJogo);

        // ===== Inicia o jogo =====
        iniciarJogo();
    </script>
</body>
