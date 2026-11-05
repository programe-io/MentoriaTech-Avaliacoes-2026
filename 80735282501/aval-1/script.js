<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo da Cobrinha (Snake)</title>
    <style>
        body {
            background-color: #111;
            color: white;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        h1 {
            margin: 5px;
        }
        #placar {
            font-size: 24px;
            margin-bottom: 10px;
        }
        canvas {
            border: 4px solid #fff;
            background-color: #000;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body>

    <h1>Jogo da Cobrinha</h1>
    <div id="placar">Pontuação: 0</div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const placarElemento = document.getElementById("placar");

        // Tamanho de cada bloco/quadrado do jogo
        const tamanhoBloco = 20;
        const contagemBlocos = canvas.width / tamanhoBloco;

        // Posição inicial da cobrinha (centro)
        let cobra = [
            { x: 10, y: 10 }
        ];

        // Posição inicial da comida
        let comida = { x: 5, y: 5 };

        // Velocidade/Direção do movimento (começa parada)
        let dx = 0;
        let dy = 0;

        let pontuacao = 0;
        let velocidadeJogo = 100; // Atualiza a cada 100 milissegundos
        let loopJogo;

        // Inicia o loop principal do jogo
        function iniciarJogo() {
            loopJogo = setInterval(atualizar, velocidadeJogo);
        }

        // Função principal que roda a cada ciclo
        function atualizar() {
            moverCobra();

            if (verificarFimDeJogo()) {
                clearInterval(loopJogo);
                alert("Fim de Jogo! Sua pontuação: " + pontuacao);
                reiniciar();
                return;
            }

            verificarComida();
            desenhar();
        }

        // Limpa a tela e desenha os elementos
        function desenhar() {
            // Limpa o Canvas
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Desenha a comida (Vermelha)
            ctx.fillStyle = "#ff4757";
            ctx.fillRect(comida.x * tamanhoBloco, comida.y * tamanhoBloco, tamanhoBloco - 2, tamanhoBloco - 2);

            // Desenha a cobra (Verde)
            ctx.fillStyle = "#2ed573";
            cobra.forEach((pedaco, index) => {
                // A cabeça da cobra tem uma cor ligeiramente diferente
                if (index === 0) ctx.fillStyle = "#1e90ff";
                else ctx.fillStyle = "#2ed573";
                
                ctx.fillRect(pedaco.x * tamanhoBloco, pedaco.y * tamanhoBloco, tamanhoBloco - 2, tamanhoBloco - 2);
            });
        }

        // Move a cobra baseada na direção atual (dx, dy)
        function moverCobra() {
            // Só move se o jogador já tiver pressionado alguma tecla
            if (dx === 0 && dy === 0) return;

            // Cria a nova cabeça baseada na posição atual e direção
            const cabeca = { x: cobra[0].x + dx, y: cobra[0].y + dy };
            
            // Adiciona a nova cabeça no início do array
            cobra.unshift(cabeca);
            
            // Remove o último pedaço (efeito de movimento)
            cobra.pop();
        }

        // Controla as direções pelas setas do teclado
        window.addEventListener("keydown", e => {
            switch (e.key) {
                case "ArrowUp":
                    if (dy === 1) break; // Impede de voltar para trás diretamente
                    dx = 0; dy = -1;
                    break;
                case "ArrowDown":
                    if (dy === -1) break;
                    dx = 0; dy = 1;
                    break;
                case "ArrowLeft":
                    if (dx === 1) break;
                    dx = -1; dy = 0;
                    break;
                case "ArrowRight":
                    if (dx === -1) break;
                    dx = 1; dy = 0;
                    break;
            }
        });

        // Verifica colisões com as paredes ou com o próprio corpo
        function verificarFimDeJogo() {
            const cabeca = cobra[0];

            // Colisão com as paredes
            if (cabeca.x < 0 || cabeca.x >= contagemBlocos || cabeca.y < 0 || cabeca.y >= contagemBlocos) {
                return true;
            }

            // Colisão com o próprio corpo
            for (let i = 1; i < cobra.length; i++) {
                if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) {
                    return true;
                }
            }
            return false;
        }

        // Verifica se a cobra comeu a comida
        function verificarComida() {
            if (cobra[0].x === comida.x && cobra[0].y === comida.y) {
                pontuacao += 10;
                placarElemento.innerText = "Pontuação: " + pontuacao;
                
                // Em vez de tirar o último pedaço no movimento, adicionamos um novo duplicando a cauda
                cobra.push({ ...cobra[cobra.length - 1] });
                
                gerarComida();
            }
        }

        // Gera uma nova comida em uma posição aleatória vazia
        function gerarComida() {
            comida.x = Math.floor(Math.random() * contagemBlocos);
            comida.y = Math.floor(Math.random() * contagemBlocos);

            // Garante que a comida não nasça em cima da cobra
            cobra.forEach(pedaco => {
                if (pedaco.x === comida.x && pedaco.y === comida.y) {
                    gerarComida();
                }
            });
        }

        // Reinicia o estado do jogo
        function reiniciar() {
            cobra = [{ x: 10, y: 10 }];
            dx = 0;
            dy = 0;
            pontuacao = 0;
            placarElemento.innerText = "Pontuação: " + pontuacao;
            gerarComida();
            iniciarJogo();
        }

        // Inicialização prática
        gerarComida();
        iniciarJogo();
    </script>
</body>
</html>
