<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Interativo com HTML, CSS e JS</title>
    
    <style>
        /* CSS BASE (Tema Claro por padrão) */
        :root {
            --bg-site: #f4f7f6;
            --bg-card: white;
            --texto-principal: #333;
            --texto-secundario: #7f8c8d;
            --titulo: #2c3e50;
            --cor-primaria: #3498db;
        }

        /* Variáveis para o Tema Escuro */
        [data-theme="dark"] {
            --bg-site: #1e272e;
            --bg-card: #2f3640;
            --texto-principal: #f5f6fa;
            --texto-secundario: #dcdde1;
            --titulo: #00a8ff;
            --cor-primaria: #9c88ff;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave de tema */
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--texto-principal);
            background-color: var(--bg-site);
            padding: 0 20px;
        }

        header, main, footer {
            max-width: 900px;
            margin: 0 auto;
        }

        hr {
            border: 0;
            height: 1px;
            background: #ddd;
            margin: 30px 0;
        }

        /* CABEÇALHO */
        header {
            padding: 40px 0 20px 0;
            text-align: center;
            position: relative;
        }

        /* Botão do Modo Escuro */
        #btn-tema {
            position: absolute;
            top: 15px;
            right: 0;
            padding: 8px 12px;
            background-color: var(--cor-primaria);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
        }

        header h1 {
            color: var(--titulo);
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        nav ul {
            list-style: none;
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 25px;
        }

        nav a {
            text-decoration: none;
            color: var(--cor-primaria);
            font-weight: bold;
            padding: 8px 16px;
            border-radius: 5px;
        }

        nav a:hover {
            background-color: var(--cor-primaria);
            color: white;
        }

        /* CONTEÚDO */
        main {
            background: var(--bg-card);
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        section {
            margin-bottom: 40px;
        }

        section h2 {
            color: var(--titulo);
            border-bottom: 2px solid var(--cor-primaria);
            padding-bottom: 5px;
            margin-bottom: 20px;
        }

        /* Área do Contador Interativo */
        .contador-container {
            background: rgba(0, 0, 0, 0.05);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-top: 20px;
        }

        .btn-contador {
            padding: 10px 20px;
            font-size: 1rem;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        .btn-contador:active {
            transform: scale(0.95); /* Efeito de clique físico */
        }

        footer {
            text-align: center;
            padding: 30px 0;
            color: var(--texto-secundario);
        }
    </style>
</head>
<body>

    <header>
        <button id="btn-tema">Alternar Tema 🌗</button>

        <h1>Site Dinâmico com JS</h1>
        <p>HTML (Estrutura) + CSS (Estilo) + JavaScript (Ação)</p>
        
        <nav>
            <ul>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#interacao">Interação</a></li>
            </ul>
        </nav>
    </header>

    <hr>

    <main>
        <section id="sobre">
            <h2>O papel do JavaScript</h2>
            <p>O JavaScript permite modificar o HTML e o CSS dinamicamente. Ele escuta o que o usuário faz (como cliques, digitação ou rolagem de página) e executa funções lógicas imediatamente.</p>
        </section>

        <section id="interacao">
            <h2>Teste a Interatividade abaixo:</h2>
            
            <div class="contador-container">
                <h3>Contador de Cliques</h3>
                <p>Você clicou no botão <strong id="numero-cliques">0</strong> vezes.</p>
                <button class="btn-contador" id="btn-clique">Me Clique!</button>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 - Aprendendo Desenvolvimento Web Interativo.</p>
    </footer>

    <script>
        // --- 1. LÓGICA DO CONTADOR ---
        let totalCliques = 0;
        
        // Selecionamos os elementos do HTML que vamos usar
        const botaoClique = document.getElementById('btn-clique');
        const displayCliques = document.getElementById('numero-cliques');

        // Escutamos o evento de clique no botão do contador
        botaoClique.addEventListener('click', () => {
            totalCliques++; // Soma +1 ao contador
            displayCliques.textContent = totalCliques; // Atualiza o texto no HTML
        });


        // --- 2. LÓGICA DO MODO ESCURO ---
        const botaoTema = document.getElementById('btn-tema');
        const htmlDaPagina = document.documentElement; // Pega a tag <html>

        botaoTema.addEventListener('click', () => {
            // Verifica se o tema atual já é dark
            if (htmlDaPagina.getAttribute('data-theme') === 'dark') {
                htmlDaPagina.removeAttribute('data-theme'); // Volta pro claro
            } else {
                htmlDaPagina.setAttribute('data-theme', 'dark'); // Muda pro escuro
            }
        });
    </script>

</body>
</html>