<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Dominó</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #2e6f40;
            color: white;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            user-select: none;
        }
        h1 { margin: 5px; }
        #status { font-size: 1.2rem; margin-bottom: 15px; font-weight: bold; background: rgba(0,0,0,0.2); padding: 5px 15px; border-radius: 5px; }
        
        .painel {
            width: 90%;
            max-width: 800px;
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            box-sizing: border-box;
        }
        
        .titulo-painel { font-weight: bold; margin-bottom: 10px; color: #ddd; }
        
        /* Mesa de Jogo */
        #mesa {
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            overflow-x: auto;
            padding: 10px;
            background: #235431;
            border: 2px dashed #1d4528;
        }

        /* Estilo da Pedra de Dominó */
        .pedra {
            width: 45px;
            height: 80px;
            background: #fcfcfc;
            color: #111;
            border-radius: 6px;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
            box-sizing: border-box;
            font-weight: bold;
            font-size: 1.4rem;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            border: 1px solid #ccc;
            flex-shrink: 0;
        }
        .pedra.deitada {
            transform: rotate(90deg);
            margin: 0 15px;
        }
        .pedra.bot {
            background: #222;
            border: 1px solid #444;
            color: #222; /* Esconde os números do bot */
        }
        .linha-divisoria {
            width: 85%;
            height: 2px;
            background: #888;
        }
        
        #mao-jogador {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 10px 0;
        }
        
        .controles {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }
        button {
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: bold;
            background: #e67e22;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover { background: #d35400; }
        button:disabled { background: #7f8c8d; cursor: not-allowed; }
    </style>
</head>
<body>

    <h1>Jogo de Dominó</h1>
    <div id="status">Iniciando o jogo...</div>

    <!-- MÃO DO COMPUTADOR -->
    <div class="painel">
        <div class="titulo-painel">Computador (<span id="qtd-bot">0</span> pedras)</div>
        <div id="mao-bot" style="display: flex; gap: 5px; opacity: 0.6;"></div>
    </div>

    <!-- MESA DO JOGO -->
    <div class="painel">
        <div class="titulo-painel">Mesa</div>
        <div id="mesa">Nenhuma pedra na mesa.</div>
    </div>

    <!-- MÃO DO JOGADOR HUMANO -->
    <div class="painel">
        <div class="titulo-painel">Sua Mão</div>
        <div id="mao-jogador"></div>
        <div class="controles">
            <button id="btn-comprar" onclick="comprarPedra()">Comprar Pedra</button>
            <button id="btn-passar" onclick="passarTurno()" disabled>Passar Vez</button>
        </div>
    </div>

    <script>
        let totalPedras = [];
        let maoJogador = [];
        let maoBot = [];
        let mesa = []; // Guarda objetos {a, b}
        let turno = 'jogador'; // 'jogador' ou 'bot'

        // Inicializa todas as 28 combinações do dominó (0-0 até 6-6)
        function gerarPedras() {
            totalPedras = [];
            for (let i = 0; i <= 6; i++) {
                for (let j = i; j <= 6; j++) {
                    totalPedras.push({ a: i, b: j });
                }
            }
            // Apenas embaralha o monte
            totalPedras.sort(() => Math.random() - 0.5);
        }

        function iniciarJogo() {
            gerarPedras();
            mesa = [];
            
            // Distribui 7 pedras para cada um
            maoJogador = totalPedras.splice(0, 7);
            maoBot = totalPedras.splice(0, 7);
            
            turno = 'jogador';
            atualizarInterface();
            verificarPossibilidadesComprar();
        }

        function criarElementoPedra(pedra, ocultar = false, onClickFn = null) {
            const div = document.createElement('div');
            div.className = 'pedra';
            
            if (ocultar) {
                div.classList.add('bot');
                div.innerHTML = '<div>?</div><div class="linha-divisoria"></div><div>?</div>';
            } else {
                div.innerHTML = `<div>${pedra.a}</div><div class="linha-divisoria"></div><div>${pedra.b}</div>`;
                if (onClickFn) {
                    div.onclick = () => onClickFn(pedra);
                }
            }
            return div;
        }

        function atualizarInterface() {
            // Limpa as áreas
            const divMao = document.getElementById('mao-jogador');
            const divBot = document.getElementById('mao-bot');
            const divMesa = document.getElementById('mesa');
            
            divMao.innerHTML = '';
            divBot.innerHTML = '';
            divMesa.innerHTML = '';

            // Renderiza mão do jogador
            maoJogador.forEach(pedra => {
                divMao.appendChild(criarElementoPedra(pedra, false, tentarJogarJogador));
            });

            // Renderiza visual das pedras escondidas do Bot
            document.getElementById('qtd-bot').innerText = maoBot.length;
            maoBot.forEach(pedra => {
                divBot.appendChild(criarElementoPedra(pedra, true));
            });

            // Renderiza a mesa
            if (mesa.length === 0) {
                divMesa.innerText = "Mesa vazia. Jogue qualquer pedra para começar!";
            } else {
                mesa.forEach(pedra => {
                    const elemento = criarElementoPedra(pedra);
                    elemento.classList.add('deitada'); // Estilização estética horizontal
                    divMesa.appendChild(elemento);
                });
            }

            // Atualiza barra de status
            if (turno === 'jogador') {
                document.getElementById('status').innerText = "Seu Turno! Escolha uma pedra válida.";
            } else {
                document.getElementById('status').innerText = "Computador pensando...";
            }
        }

        // Obtém os valores disponíveis nas duas extremidades livres da mesa
        function obterPontasMesa() {
            if (mesa.length === 0) return null;
            return {
                esquerda: mesa[0].a,
                direita: mesa[mesa.length - 1].b
            };
        }

        function tentarJogarJogador(pedra) {
            if (turno !== 'jogador') return;

            const pontas = obterPontasMesa();

            // Se a mesa estiver vazia, qualquer jogada é válida
            if (!pontas) {
                maoJogador = maoJogador.filter(p => p !== pedra);
                mesa.push(pedra);
                finalizarJogada();
                return;
            }

            // Verifica encaixe na esquerda ou direita
            let jogadaValida = false;

            if (pedra.a === pontas.esquerda || pedra.b === pontas.esquerda) {
                // Inverte a pedra se necessário para encaixar corretamente
                if (pedra.a === pontas.esquerda) {
                    mesa.unshift({ a: pedra.b, b: pedra.a });
                } else {
                    mesa.unshift(pedra);
                }
                jogadaValida = true;
            } else if (pedra.a === pontas.direita || pedra.b === pontas.direita) {
                if (pedra.a === pontas.direita) {
                    mesa.push(pedra);
                } else {
                    mesa.push({ a: pedra.b, b: pedra.a });
                }
                jogadaValida = true;
            }

            if (jogadaValida) {
                maoJogador = maoJogador.filter(p => p !== pedra);
                finalizarJogada();
            } else {
                alert("Essa pedra não encaixa em nenhuma das pontas da mesa!");
            }
        }

        function comprarPedra() {
            if (totalPedras.length === 0) {
                alert("O monte de compras está vazio!");
                verificarPossibilidadesComprar();
                return;
            }

            const novaPedra = totalPedras.pop();
            if (turno === 'jogador') {
                maoJogador.push(novaPedra);
                atualizarInterface();
                verificarPossibilidadesComprar();
            } else {
                maoBot.push(novaPedra);
            }
        }

        function verificarPossibilidadesComprar() {
            const pontas = obterPontasMesa();
            const btnComprar = document.getElementById('btn-comprar');
            const btnPassar = document.getElementById('btn-passar');

            if (!pontas) {
                btnComprar.disabled = true;
                btnPassar.disabled = true;
                return;
            }

            // Vê se o jogador possui alguma pedra útil
            const temJogada = maoJogador.some(p => 
