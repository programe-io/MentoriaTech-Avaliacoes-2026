<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tubarão-Raposa — Alopias</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Arial, sans-serif;
        }

        body {
            background: linear-gradient(180deg, #1a3a5c 0%, #0d1f33 100%);
            color: #f0f8ff;
            min-height: 100vh;
            padding: 2rem;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 15px rgba(255,255,255,0.3);
        }

        .subtitulo {
            text-align: center;
            color: #9cc4e4;
            margin-bottom: 2rem;
            font-style: italic;
        }

        .cartao {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
        }

        h2 {
            color: #7fc8f8;
            margin-bottom: 1rem;
            border-bottom: 2px solid rgba(127,200,248,0.3);
            padding-bottom: 0.5rem;
        }

        .destaque {
            background: rgba(127,200,248,0.15);
            border-left: 4px solid #7fc8f8;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0 8px 8px 0;
        }

        ul {
            margin-left: 1.5rem;
            line-height: 1.8;
        }

        li {
            margin-bottom: 0.5rem;
        }

        /* Elementos interativos */
        .botao {
            background: linear-gradient(90deg, #2a70a9, #3a90d9);
            color: white;
            border: none;
            padding: 0.9rem 1.8rem;
            font-size: 1rem;
            border-radius: 10px;
            cursor: pointer;
            margin: 0.5rem 0.5rem 0.5rem 0;
            transition: all 0.3s ease;
        }

        .botao:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(58,144,217,0.4);
        }

        .botao.secundario {
            background: rgba(255,255,255,0.1);
            border: 1px solid #7fc8f8;
        }

        .painel {
            margin-top: 1rem;
            padding: 1.5rem;
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
            display: none;
            animation: aparecer 0.5s ease forwards;
        }

        @keyframes aparecer {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .relogio {
            font-size: 1.2rem;
            font-family: monospace;
            color: #9cc4e4;
            margin-top: 1rem;
        }

        .curiosidade-aleatoria {
            font-style: italic;
            color: #bfe3ff;
            padding: 1rem;
            background: rgba(127,200,248,0.1);
            border-radius: 8px;
            margin-top: 1rem;
        }

        footer {
            text-align: center;
            margin-top: 3rem;
            color: #6a94b8;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🦈 Tubarão-Raposa</h1>
        <p class="subtitulo">Gênero <em>Alopias</em> — O rabo que faz a diferença</p>

        <!-- Seção: O que é -->
        <div class="cartao">
            <h2>📌 O que é?</h2>
            <p>O tubarão-raposa é um gênero de tubarões marinhos da família <strong>Alopiidae</strong>, reconhecido principalmente pelo seu <strong>rabo extremamente longo</strong>, que pode ser do mesmo tamanho do resto do corpo!</p>
            
            <div class="destaque">
                Existem 3 espécies reconhecidas: Raposa-Comum, Raposa-de-Olhos-Grandes e Raposa-Pelágica.
            </div>
        </div>

        <!-- Seção: Habitat -->
        <div class="cartao">
            <h2>🌊 Habitat</h2>
            <p>Vive em oceanos tropicais e temperados, tanto em águas costeiras quanto em mar aberto. Pode ser encontrado em profundidades de até 500 metros, mas frequentemente aparece perto da superfície.</p>
        </div>

        <!-- Seção: Curiosidades com JS -->
        <div class="cartao">
            <h2>💡 Curiosidades Interativas</h2>
            
            <button class="botao" onclick="mostrarCuriosidade()">Mostrar Curiosidade Aleatória</button>
            <button class="botao secundario" onclick="mostrarTodas()">Ver Todas as Curiosidades</button>
            <button class="botao secundario" onclick="esconderTodas()">Esconder</button>

            <div class="curiosidade-aleatoria" id="caixaCuriosidade">
                Clique no botão acima para ver uma curiosidade!
            </div>

            <div class="painel" id="painelCompleto">
                <h3>Todas as Curiosidades:</h3>
                <ul id="listaCompleta"></ul>
            </div>
        </div>

        <!-- Seção: Dados Dinâmicos -->
        <div class="cartao">
            <h2>📊 Dados Rápidos</h2>
            <button class="botao" onclick="atualizarDados()">Carregar Dados</button>
            <div id="dadosCarregados" style="margin-top: 1rem;"></div>
            
            <div class="relogio" id="relogio"></div>
        </div>

        <footer>
            🦈 Página criada com JavaScript — 2026 | Proteja os oceanos 🌊
        </footer>
    </div>

    <script>
        // Banco de dados com informações
        const curiosidades = [
            "O rabo representa até 50% do comprimento total do corpo!",
            "Usam o rabo como arma: dão golpes nos cardumes para atordoar ou capturar presas.",
            "Alimentam-se principalmente de peixes pequenos, lulas e plâncton (dependendo da espécie).",
            "São inofensivos para os seres humanos.",
            "Podem chegar a 6 metros de comprimento no total.",
            "São animais migratórios, percorrendo grandes distâncias pelo oceano.",
            "Estão ameaçados por pesca excessiva e captura acidental — a população diminuiu muito nas últimas décadas.",
            "Têm olhos grandes, adaptados para enxergar em águas profundas e com pouca luz.",
            "São ovíparos: os filhotes se desenvolvem em ovos dentro da mãe e nascem vivos.",
            "Cada filhote já nasce com cerca de 1,5 metro de comprimento!"
        ];

        // Mostrar curiosidade aleatória
        function mostrarCuriosidade() {
            const indice = Math.floor(Math.random() * curiosidades.length);
            const caixa = document.getElementById('caixaCuriosidade');
            caixa.style.opacity = 0;
            
            setTimeout(() => {
                caixa.innerHTML = `✨ ${curiosidades[indice]}`;
                caixa.style.opacity = 1;
            }, 200);
        }

        // Mostrar todas as curiosidades
        function mostrarTodas() {
            const painel = document.getElementById('painelCompleto');
            const lista = document.getElementById('listaCompleta');
            
            lista.innerHTML = '';
            curiosidades.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                lista.appendChild(li);
            });
            
            painel.style.display = 'block';
        }

        // Esconder painel
        function esconderTodas() {
            document.getElementById('painelCompleto').style.display = 'none';
            document.getElementById('caixaCuriosidade').innerHTML = 'Clique no botão acima para ver uma curiosidade!';
        }

        // Carregar dados
        function atualizarDados() {
            const dados = {
                nome: "Tubarão-Raposa",
                familia: "Alopiidae",
                comprimentoMax: "6 metros",
                pesoMax: "500 kg",
                expectativaVida: "Até 50 anos",
                dieta: "Peixes, lulas, camarões",
                status: "Vulnerável / Em perigo"
            };

            const alvo = document.getElementById('dadosCarregados');
            alvo.innerHTML = '';

            // Criar elementos dinamicamente
            for (const [chave, valor] of Object.entries(dados)) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${chave}:</strong> ${valor}`;
                p.style.margin = '0.5rem 0';
                p.style.padding = '0.5rem';
                p.style.background = 'rgba(255,255,255,0.05)';
                p.style.borderRadius = '6px';
                alvo.appendChild(p);
            }
        }

        // Relógio atualizado em tempo real
        function atualizarRelogio() {
            const agora = new Date();
            const hora = agora.toLocaleTimeString('pt-BR');
            document.getElementById('relogio').textContent = `🕒 Atualizado em: ${hora}`;
        }

        // Iniciar relógio ao carregar a página
        setInterval(atualizarRelogio, 1000);
        atualizarRelogio();
    </script>
</body>
</html>