<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Pegue as Estrelas ✨</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff9ecf, #c084fc);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .game {
            width: 90%;
            max-width: 700px;
            text-align: center;
        }

        h1 {
            color: white;
            font-size: 38px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 5px #8b3a70;
        }

        .info {
            background: rgba(255, 255, 255, 0.9);
            padding: 12px;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-around;
            font-size: 20px;
            font-weight: bold;
        }

        #areaJogo {
            position: relative;
            width: 100%;
            height: 500px;
            background: linear-gradient(
                #ffd6ec,
                #fbcfe8
            );
            border: 5px solid white;
            border-radius: 0 0 20px 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        #jogadora {
            position: absolute;
            bottom: 20px;
            left: 50%;
            width: 60px;
            height: 60px;
            background: #ec4899;
            border-radius: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 35px;
            cursor: pointer;
            user-select: none;
        }

        .estrela {
            position: absolute;
            font-size: 35px;
            user-select: none;
        }

        .coracao {
            position: absolute;
            font-size: 30px;
            user-select: none;
        }

        .obstaculo {
            position: absolute;
            font-size: 35px;
            user-select: none;
        }

        button {
            margin-top: 15px;
            padding: 13px 30px;
            border: none;
            border-radius: 20px;
            background: #ec4899;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }

        button:hover {
            background: #db2777;
            transform: scale(1.05);
        }

        .instrucoes {
            color: white;
            margin-top: 12px;
            font-size: 16px;
        }
    </style>
</head>

<body>

    <div class="game">

        <h1>✨ Pegue as Estrelas ✨</h1>

        <div class="info">
            <span>⭐ Pontos: <span id="pontos">0</span></span>
            <span>❤️ Vidas: <span id="vidas">3</span></span>
        </div>

        <div id="areaJogo">

            <div id="jogadora">👧</div>

        </div>

        <button onclick="iniciarJogo()">
            🎮 Começar Jogo
        </button>

        <p class="instrucoes">
            Use as teclas ← → para se movimentar e pegue as estrelas!
        </p>

    </div>


    <script>

        // =========================================
        // CONFIGURAÇÕES
        // =========================================

        const area = document.getElementById("areaJogo");
        const jogadora = document.getElementById("jogadora");

        const pontosTexto = document.getElementById("pontos");
        const vidasTexto = document.getElementById("vidas");

        let pontos = 0;
        let vidas = 3;

        let posicaoJogadora = 50;

        let jogoAtivo = false;

        let velocidade = 3;

        let objetos = [];

        let intervalo;


        // =========================================
        // MOVIMENTAÇÃO DA JOGADORA
        // =========================================

        document.addEventListener("keydown", (event) => {

            if (!jogoAtivo) return;

            if (event.key === "ArrowLeft") {

                posicaoJogadora -= 5;

                if (posicaoJogadora < 5) {
                    posicaoJogadora = 5;
                }
            }

            if (event.key === "ArrowRight") {

                posicaoJogadora += 5;

                if (posicaoJogadora > 95) {
                    posicaoJogadora = 95;
                }
            }

            jogadora.style.left =
                posicaoJogadora + "%";
        });


        // =========================================
        // INICIAR JOGO
        // =========================================

        function iniciarJogo() {

            pontos = 0;
            vidas = 3;

            velocidade = 3;

            pontosTexto.textContent = pontos;
            vidasTexto.textContent = vidas;

            jogoAtivo = true;

            limparObjetos();

            clearInterval(intervalo);

            intervalo = setInterval(() => {

                criarObjeto();

            }, 800);

        }


        // =========================================
        // CRIAR OBJETOS
        // =========================================

        function criarObjeto() {

            const objeto =
                document.createElement("div");

            const tipo =
                Math.random();

            let ehEstrela = true;


            // 70% de chance de estrela

            if (tipo < 0.7) {

                objeto.className = "estrela";
                objeto.textContent = "⭐";

            }

            // 20% de chance de coração

            else if (tipo < 0.9) {

                objeto.className = "coracao";
                objeto.textContent = "💖";

            }

            // 10% de chance de obstáculo

            else {

                objeto.className = "obstaculo";
                objeto.textContent = "💣";

                ehEstrela = false;
            }


            const posicao =
                Math.random() * 90 + 5;

            objeto.style.left =
                posicao + "%";

            objeto.style.top = "-40px";

            area.appendChild(objeto);


            const dados = {
                elemento: objeto,
                velocidade: velocidade,
                estrela: ehEstrela
            };

            objetos.push(dados);

        }


        // =========================================
        // ATUALIZAR JOGO
        // =========================================

        function atualizarJogo() {

            if (!jogoAtivo) return;


            objetos.forEach((objeto, index) => {

                const elemento =
                    objeto.elemento;

                let topo =
                    parseFloat(elemento.style.top);

                topo += objeto.velocidade;

                elemento.style.top =
                    topo + "px";


                // Verificar colisão

                if (verificarColisao(
                    elemento,
                    jogadora
                )) {

                    if (objeto.estrela) {

                        ganharPonto();

                    } else {

                        perderVida();

                    }

                    elemento.remove();

                    objetos.splice(index, 1);

                    return;
                }


                // Saiu da tela

                if (topo > area.clientHeight) {

                    elemento.remove();

                    objetos.splice(index, 1);

                }

            });


            requestAnimationFrame(atualizarJogo);

        }


        // =========================================
        // VERIFICAR COLISÃO
        // =========================================

        function verificarColisao(a, b) {

            const rectA =
                a.getBoundingClientRect();

            const rectB =
                b.getBoundingClientRect();


            return !(
                rectA.bottom < rectB.top ||
                rectA.top > rectB.bottom ||
                rectA.right < rectB.left ||
                rectA.left > rectB.right
            );

        }


        // =========================================
        // GANHAR PONTO
        // =========================================

        function ganharPonto() {

            pontos++;

            pontosTexto.textContent =
                pontos;


            // Aumentar dificuldade

            if (pontos % 5 === 0) {

                velocidade += 0.5;

            }

        }


        // =========================================
        // PERDER VIDA
        // =========================================

        function perderVida() {

            vidas--;

            vidasTexto.textContent =
                vidas;


            if (vidas <= 0) {

                terminarJogo();

            }

        }


        // =========================================
        // TERMINAR JOGO
        // =========================================

        function terminarJogo() {

            jogoAtivo = false;

            clearInterval(intervalo);

            alert(
                "💔 Fim de jogo!\n\n" +
                "Sua pontuação foi: " +
                pontos +
                " pontos!"
            );

        }


        // =========================================
        // LIMPAR OBJETOS
        // =========================================

        function limparObjetos() {

            objetos.forEach(objeto => {

                objeto.elemento.remove();

            });

            objetos = [];

        }


        // =========================================
        // INICIAR LOOP
        // =========================================

        requestAnimationFrame(atualizarJogo);

    </script>

</body>
</html>