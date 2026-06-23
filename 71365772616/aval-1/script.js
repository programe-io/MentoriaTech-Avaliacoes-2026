<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Escolha Royale - Free Fire JS</title>
    <style>
        /* Estilização Geral (Tema Dark/Gamer) */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Impact', 'Arial Black', sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0d0d1a, #1a0033);
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
        }

        /* Painel do Jogo */
        .hud-top {
            font-family: Arial, sans-serif;
            background: rgba(0,0,0,0.6);
            padding: 10px 20px;
            border-radius: 20px;
            border: 1px solid #ff6600;
            margin-bottom: 20px;
            font-size: 1.2rem;
            color: #00ffff;
            text-shadow: 0 0 5px #00ffff;
        }

        .royale-container {
            background: rgba(20, 20, 30, 0.9);
            border: 3px solid #ff6600;
            box-shadow: 0 0 30px rgba(255, 102, 0, 0.4);
            border-radius: 15px;
            padding: 30px;
            width: 90%;
            max-width: 450px;
            text-align: center;
        }

        h1 {
            color: #ffcc00;
            font-size: 2.2rem;
            letter-spacing: 2px;
            margin-bottom: 20px;
            text-shadow: 2px 2px 0 #000;
        }

        /* Área de Sorteio */
        .display-item {
            background: #090910;
            border: 2px dashed #444;
            border-radius: 10px;
            height: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
            transition: all 0.3s;
        }

        .item-icon {
            font-size: 4rem;
            margin-bottom: 10px;
        }

        .item-name {
            font-family: Arial, sans-serif;
            font-size: 1.1rem;
            color: #aaa;
            letter-spacing: 1px;
        }

        /* Botão de Giro */
        .spin-btn {
            background: linear-gradient(to bottom, #ff9900, #ff3300);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.5rem;
            text-transform: uppercase;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0 5px 0 #992200, 0 0 15px rgba(255, 51, 0, 0.4);
            width: 100%;
            transition: all 0.1s;
        }

        .spin-btn:hover {
            background: linear-gradient(to bottom, #ffaa11, #ff4411);
        }

        .spin-btn:active {
            transform: translateY(4px);
            box-shadow: 0 1px 0 #992200;
        }

        .spin-btn:disabled {
            background: #444;
            box-shadow: none;
            cursor: not-allowed;
        }

        /* Efeito de vitória BOOYAH */
        .booyah-screen {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }

        .booyah-text {
            font-size: 5rem;
            background: linear-gradient(to bottom, #fff, #ffcc00, #ff3300);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 20px #ff3300);
            animation: pop 0.5s ease-out;
        }
    </style>
</head>
<body>

    <div class="hud-top">
        💎 <span id="diamond-count">800</span> Dimas
    </div>

    <div class="royale-container">
        <h1>ESCOLHA ROYALE</h1>
        
        <div class="display-item" id="display-box">
            <div class="item-icon" id="item-icon">❓</div>
            <div class="item-name" id="item-name">Clique abaixo para girar!</div>
        </div>

        <button class="spin-btn" id="spin-button" onclick="girarRoyale()">Girar - 9 💎</button>
    </div>

    <div class="booyah-screen" id="booyah-screen" onclick="fecharBooyah()">
        <h2 class="booyah-text">BOOYAH!</h2>
        <p style="font-family: Arial; margin-top: 20px; color: #fff;">Você conseguiu o prêmio máximo!</p>
        <p style="font-family: Arial; color: #ffcc00; font-size: 0.9rem; margin-top: 10px;">(Clique em qualquer lugar para voltar)</p>
    </div>

    <script>
        // Configurações do Estado do Jogo
        let diamantes = 800;
        let precoGiro = 9;
        
        // Lista de prêmios possíveis (Ícone, Nome, Se é o prêmio máximo)
        const listaItens = [
            { icon: "💥", name: "Caixa de Armas", raro: false },
            { icon: "🎟️", name: "Ticket Diamante Royale", raro: false },
            { icon: "👕", name: "Camisa de Time", raro: false },
            { icon: "📦", name: "Token de Evolução", raro: false },
            { icon: "👟", name: "Tênis Astro", raro: false },
            { icon: "👖", name: "CALÇA ANGELICAL RARA!", raro: true } // O Grande Prêmio!
        ];

        function girarRoyale() {
            if (diamantes < precoGiro) {
                alert("Diamantes insuficientes! Recarregue seus dimas. 💎");
                return;
            }

            // Deduz os diamantes e atualiza a tela
            diamantes -= precoGiro;
            document.getElementById("diamond-count").innerText = diamantes;

            // Desativa o botão temporariamente durante a animação
            const btn = document.getElementById("spin-button");
            btn.disabled = true;

            const displayBox = document.getElementById("display-box");
            const iconElement = document.getElementById("item-icon");
            const nameElement = document.getElementById("item-name");

            let fakesGiros = 0;
            
            // Efeito de "Roleta correndo rápido" usando setInterval
            const intervaloAnimacao = setInterval(() => {
                // Pega um item aleatório para fingir que está girando
                let itemAleatorio = listaItens[Math.floor(Math.random() * listaItens.length)];
                iconElement.innerText = itemAleatorio.icon;
                nameElement.innerText = itemAleatorio.name;
                displayBox.style.borderColor = "#ff6600";

                fakesGiros++;

                // Quando a animação terminar (após 15 trocas de itens)
                if (fakesGiros > 15) {
                    clearInterval(intervaloAnimacao);
                    
                    // Sorteio Real Definitivo
                    finalizarSorteio(iconElement, nameElement, displayBox, btn);
                }
            }, 100);
        }

        function finalizarSorteio(iconElement, nameElement, displayBox, btn) {
            // Sorteia o resultado final
            const resultadoFinal = listaItens[Math.floor(Math.random() * listaItens.length)];
            
            iconElement.innerText = resultadoFinal.icon;
            nameElement.innerText = resultadoFinal.name;

            // Se o jogador der a sorte de pegar a Calça Angelical
            if (resultadoFinal.raro) {
                displayBox.style.borderColor = "#00ffff";
                displayBox.style.boxShadow = "0 0 20px #00ffff";
                
                // Abre a tela de BOOYAH!
                setTimeout(() => {
                    document.getElementById("booyah-screen").style.display = "flex";
                }, 300);
            } else {
                displayBox.style.borderColor = "#444";
                displayBox.style.boxShadow = "none";
            }

            // Aumenta o preço do próximo giro (igualzinho ao jogo original)
            if (precoGiro == 9) precoGiro = 29;
            else if (precoGiro == 29) precoGiro = 99;
            else if (precoGiro == 99) precoGiro = 199;
            else precoGiro = 399;

            btn.innerText = `Girar - ${precoGiro} 💎`;
            btn.disabled = false;
        }

        function fecharBooyah() {
            document.getElementById("booyah-screen").style.display = "none";
        }
    </script>
</body>
</html>