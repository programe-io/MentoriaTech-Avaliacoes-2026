// 1. Cria o botão de alternar tema dinamicamente via JS
const botaoTema = document.createElement('button');
botaoTema.innerText = '🌓 Alternar Tema';
botaoTema.style.cssText = `
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background-color: #764ba2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
`;

// 2. Insere o botão dentro do cartão (card)
document.querySelector('.card').appendChild(botaoTema);

// 3. Função para mudar as cores em tempo real
botaoTema.addEventListener('click', () => {
    const card = document.querySelector('.card');
    const titulo = document.querySelector('h1');
    const paragrafo = document.querySelector('p');

    // Verifica se já está no modo escuro
    if (card.style.backgroundColor === 'rgb(51, 51, 51)') {
        // Volta para o Modo Claro
        card.style.backgroundColor = '#ffffff';
        titulo.style.color = '#333333';
        paragrafo.style.color = '#666666';
    } else {
        // Vai para o Modo Escuro
        card.style.backgroundColor = '#333333';
        titulo.style.color = '#ffffff';
        paragrafo.style.color = '#cccccc';
    }
});
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação de Estrutura Semântica</title>
    <style>
        /* CSS Integrado */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .card {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }

        header {
            margin-bottom: 20px;
        }

        h1 {
            color: #333333;
            font-size: 2rem;
        }

        /* Destaque visual para o bloco de navegação */
        nav {
            background-color: #f4f7f6;
            padding: 10px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        nav a {
            color: #764ba2;
            text-decoration: none;
            font-weight: bold;
            margin: 0 12px;
            font-size: 0.95rem;
            display: inline-block;
        }

        nav a:hover {
            text-decoration: underline;
        }

        p {
            color: #666666;
            font-size: 1rem;
            line-height: 1.6;
        }
    </style>
</head>
<body>

    <main class="card">
        
        <!-- HEADER OBRIGATÓRIO -->
        <header>
            <h1>Meu Projeto</h1>
        </header>

        <!-- NAV OBRIGATÓRIO (Inserido e revisado com links estruturados) -->
        <nav>
            <a href="#home">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#contato">Contato</a>
        </nav>
        
        <p>Conteúdo principal do site validado com as tags estruturais corretas.</p>

    </main>

    <script>
        // O JavaScript pode ser inserido aqui para interações futuras.
        console.log("Estrutura HTML validada com sucesso.");
    </script>
</body>
</html>
