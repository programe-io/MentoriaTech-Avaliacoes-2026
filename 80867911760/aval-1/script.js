
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Corrida</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: #20232a;
            color: white;
            text-align: center;
            padding: 20px;
        }

        h1 {
            margin-bottom: 10px;
            color: #ffd43b;
        }

        #pontuacao {
            font-size: 22px;
            margin: 15px;
        }

        #jogo {
            position: relative;
            width: 320px;
            height: 500px;
            max-width: 100%;
            margin: auto;
            overflow: hidden;
            background: #444;
            border-left: 8px solid #55aa55;
            border-right: 8px solid #55aa55;
        }

        .faixa {
            position: absolute;
            left: 50%;
            width: 8px;
            height: 60px;
            background: white;
            transform: translateX(-50%);
        }

        #carro {
            position: absolute;
            width: 42px;
            height: 70px;
            bottom: 20px;
            left: 130px;
            background: #ff3030;
            border-radius: 10px 10px 5px 5px;
            border: 3px solid white;
            z-index: 2;
        }

        #carro::before {
            content: "";
            position: absolute;
            top: 12px;
            left: 6px;
            width: 24px;
            height: 20px;
            background: #8be9fd;
            border-radius: 5px;
        }

        #carro::after {
            content: "";
            position: absolute;
            bottom: 5px;
            left: 6px;
            width: 24px;
            height: 8px;
            background: #ffd43b;
            border-radius: 3px;
        }

        .obstaculo {
            position: absolute;
            width: 42px;
            height: 65px;
            background: #2674ff;
            border: 3px solid white;
            border-radius: 8px;
            top: -80px;
        }

        #mensagem {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15px;
            z-index: 5;
            padding: 20px;
        }

        button {
            padding: 12px 24px;
            background: #ffd43b;
            border: none;
            border-radius: 8px;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
        }

        button:hover {
            opacity: 0.85;
        }

        .controles {
            margin: 15px auto;
            display: flex;
            justify-content: center;
            gap: 20px;
        }

        .controles button {
            width: 85px;
            font-size: 24px;
            touch-action: manipulation;
        }

        p {
            margin-top: 12px;
            color: #ddd;
        }
    </style>
</head>

<body>

    <h1>🏎️ Corrida Maluca</h1>
    <div id="pontuacao">Pontos: 0</div>

    <div id="jogo">
        <div id="carro"></div>

        <div id="mensagem">
            <h2>🏁 Corrida Maluca</h2>
            <p>Desvie dos carros e faça pontos!</p>
            <button id="iniciar">Começar jogo</button>
        </div>
    </div>

    <div class="controles">
        <button id="esquerda" aria-label="Mover para a esquerda">⬅️</button>
        <button id="direita" aria-label="Mover para a direita">➡️</button>
    </div>

    <p>Use as setas do teclado ou os botões para dirigir.</p>

    <script>
        const jogo = document.getElementById("jogo");
        const carro = document.getElementById("carro");
        const pontuacaoTexto = document.getElementById("pontuacao");
        const mensagem = document.getElementById("mensagem");
        const botaoIniciar = document.getElementById("iniciar");

        let posicao = 130;
        let pontos = 0;
        let velocidade = 4;
        let obstaculos = [];
        let faixas = [];
        let rodando = false;
        let quadro;
        let ultimoObstaculo = 0;
        let ultimoTempo = 0;

        // Cria as faixas da pista
        for (let i = 0; i < 6; i++) {
            const faixa = document.createElement("div");
            faixa.className = "faixa";
            faixa.style.top = (i * 100) + "px";
            jogo.appendChild(faixa);
            faixas.push(faixa);
        }

        function moverCarro(direcao) {
            if (!rodando) return;

            posicao += direcao * 25;
            posicao = Math.max(0, Math.min(264, posicao));
            carro.style.left = posicao + "px";
        }

        document.addEventListener("keydown", function(evento) {
            if (evento.key === "ArrowLeft") {
                evento.preventDefault();
                moverCarro(-1);
            }

            if (evento.key === "ArrowRight") {
                evento.preventDefault();
                moverCarro(1);
            }
        });

        document.getElementById("esquerda").addEventListener("click", () => {
            moverCarro(-1);
        });

        document.getElementById("direita").addEventListener("click", () => {
            moverCarro(1);
        });

        function criarObstaculo() {
            const obstaculo = document.createElement("div");
            obstaculo.className = "obstaculo";

            const pistas = [35, 100, 165, 230];
            const pista = pistas[Math.floor(Math.random() * pistas.length)];

            obstaculo.style.left = pista + "px";
            jogo.appendChild(obstaculo);

            obstaculos.push({
                elemento: obstaculo,
                x: pista,
                y: -80,
                contado: false
            });
        }

        function verificarColisao(a, b) {
            return (
                a.x < b.x + b.largura &&
                a.x + a.largura > b.x &&
                a.y < b.y + b.altura &&
                a.y + a.altura > b.y
            );
        }

        function atualizar(tempo) {
            if (!rodando) return;

            const delta = ultimoTempo
                ? Math.min((tempo - ultimoTempo) / 16.67, 2)
                : 1;

            ultimoTempo = tempo;

            // Move as faixas da pista
            faixas.forEach(faixa => {
                let y = parseFloat(faixa.style.top);
                y += velocidade * delta;

                if (y > 500) y = -60;

                faixa.style.top = y + "px";
            });

            // Cria novos obstáculos
            if (tempo - ultimoObstaculo > 1000) {
                criarObstaculo();
                ultimoObstaculo = tempo;
            }

            const carroRect = {
                x: posicao,
                y: 410,
                largura: 42,
                altura: 70
            };

            obstaculos.forEach(obstaculo => {
                obstaculo.y += velocidade * delta;
                obstaculo.elemento.style.top = obstaculo.y + "px";

                if (verificarColisao(carroRect, {
                    x: obstaculo.x,
                    y: obstaculo.y,
                    largura: 42,
                    altura: 65
                })) {
                    fimDeJogo();
                }

                if (!obstaculo.contado && obstaculo.y > 500) {
                    obstaculo.contado = true;
                    pontos += 10;
                    pontuacaoTexto.textContent = "Pontos: " + pontos;

                    if (pontos % 50 === 0) {
                        velocidade += 0.5;
                    }
                }
            });

            obstaculos = obstaculos.filter(obstaculo => {
                if (obstaculo.y > 520) {
                    obstaculo.elemento.remove();
                    return false;
                }
                return true;
            });

            if (rodando) {
                quadro = requestAnimationFrame(atualizar);
            }
        }

        function fimDeJogo() {
            rodando = false;
            cancelAnimationFrame(quadro);

            mensagem.innerHTML = `
                <h2>💥 Fim de jogo!</h2>
                <p>Sua pontuação: ${pontos}</p>
                <button id="reiniciar">Jogar novamente</button>
            `;

            mensagem.style.display = "flex";

            document.getElementById("reiniciar").addEventListener(
                "click", iniciarJogo
            );
        }

        function iniciarJogo() {
            obstaculos.forEach(obstaculo => obstaculo.elemento.remove());
            obstaculos = [];

            posicao = 130;
            pontos = 0;
            velocidade = 4;
            ultimoObstaculo = 0;
            ultimoTempo = 0;
            rodando = true;

            carro.style.left = posicao + "px";
            pontuacaoTexto.textContent = "Pontos: 0";

            mensagem.style.display = "none";

            cancelAnimationFrame(quadro);
            quadro = requestAnimationFrame(atualizar);
        }

        botaoIniciar.addEventListener("click", iniciarJogo);
    </script>

</body>
</html>
