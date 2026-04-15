<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página com HTML, CSS e JS</title>
    
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 50px;
        }

        .card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
            width: 300px;
        }

        button {
            background-color: #2ecc71;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }

        button:hover {
            background-color: #27ae60;
        }

        .destaque {
            color: #e74c3c;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="card">
        <h1>Contador</h1>
        <p>Cliques: <span id="contador">0</span></p>
        <button id="botaoInterativo">Clicar!</button>
        
        <p id="mensagem"></p>
    </div>

    <script>
        // 1. Selecionamos os elementos que vamos manipular
        const botao = document.getElementById('botaoInterativo');
        const displayContador = document.getElementById('contador');
        const mensagem = document.getElementById('mensagem');

        let numeroCliques = 0;

        // 2. Adicionamos um "ouvinte de evento" (Event Listener)
        botao.addEventListener('click', () => {
            numeroCliques++; // Aumenta 1
            
            // 3. Atualizamos o texto na tela
            displayContador.innerText = numeroCliques;

            // 4. Lógica condicional básica
            if (numeroCliques >= 10) {
                mensagem.innerText = "Uau, você é persistente!";
                mensagem.className = "destaque";
                botao.style.backgroundColor = "#e74c3c";
            }
        });
    </script>
    </body>
</html>