<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo da Velha</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #222;
            color: white;
            text-align: center;
            margin: 0;
            padding: 30px;
        }

        h1 {
            margin-bottom: 10px;
        }

        #status {
            font-size: 20px;
            margin: 20px;
        }

        .tabuleiro {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 5px;
            justify-content: center;
            margin: 20px auto;
        }

        .casa {
            background: #444;
            border: none;
            font-size: 40px;
            font-weight: bold;
            color: white;
            cursor: pointer;
            border-radius: 8px;
        }

        .casa:hover {
            background: #555;
        }

        button#reiniciar {
            padding: 12px 25px;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            background: #00aaff;
            color: white;
            cursor: pointer;
        }

        button#reiniciar:hover {
            background: #0088cc;
        }
    </style>
</head>

<body>

    <h1>🎮 Jogo da Velha</h1>

    <div id="status">Vez do jogador X</div>

    <div class="tabuleiro">
        <button class="casa"></button>
        <button class="casa"></button>
        <button class="casa"></button>

        <button class="casa"></button>
        <button class="casa"></button>
        <button class="casa"></button>

        <button class="casa"></button>
        <button class="casa"></button>
        <button class="casa"></button>
    </div>

    <button id="reiniciar">Reiniciar</button>

    <script>
        const casas = document.querySelectorAll(".casa");
        const status = document.getElementById("status");
        const reiniciar = document.getElementById("reiniciar");

        let jogadorAtual = "X";
        let jogoAtivo = true;
        let tabuleiro = ["", "", "", "", "", "", "", ""];

        const vitorias = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        casas.forEach((casa, indice) => {
            casa.addEventListener("click", () => jogar(indice));
        });

        function jogar(indice) {
            if (tabuleiro[indice] !== "" || !jogoAtivo) {
                return;
            }

            tabuleiro[indice] = jogadorAtual;
            casas[indice].textContent = jogadorAtual;

            verificarResultado();
        }

        function verificarResultado() {
            for (let combinacao of vitorias) {
                const [a, b, c] = combinacao;

                if (
                    tabuleiro[a] !== "" &&
                    tabuleiro[a] === tabuleiro[b] &&
                    tabuleiro[a] === tabuleiro[c]
                ) {
                    status.textContent = `🎉 Jogador ${jogadorAtual} venceu!`;
                    jogoAtivo = false;
                    return;
                }
            }

            if (!tabuleiro.includes("")) {
                status.textContent = "🤝 Empate!";
                jogoAtivo = false;
                return;
            }

            jogadorAtual = jogadorAtual === "X" ? "O" : "X";
            status.textContent = `Vez do jogador ${jogadorAtual}`;
        }

        reiniciar.addEventListener("click", () => {
            tabuleiro = ["", "", "", "", "", "", "", ""];
            jogadorAtual = "X";
            jogoAtivo = true;

            casas.forEach(casa => {
                casa.textContent = "";
            });

            status.textContent = "Vez do jogador X";
        });
    </script>

</body>