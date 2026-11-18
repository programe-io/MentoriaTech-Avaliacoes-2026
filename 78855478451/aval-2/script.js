
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo dos Gatos 🐱</title>

    <style>
        body {
            background-color: #fff0f5;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 40px;
            color: #553344;
        }

        h1 {
            color: #d65c91;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            margin: auto;
            box-shadow: 0 4px 15px #0002;
        }

        button {
            background: #e879a8;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            cursor: pointer;
            margin: 10px;
            font-size: 16px;
        }

        button:hover {
            background: #c94e83;
        }

        #resultado {
            font-size: 20px;
            margin-top: 20px;
            color: #a33c70;
        }
    </style>
</head>

<body>

    <div class="container">

        <h1>🐱 Mundo dos Gatos 🐾</h1>

        <p>Bem-vindo ao mundo dos felinos!</p>

        <h2>Você gosta de gatos?</h2>

        <button onclick="gostar()">Sim! ❤️</button>
        <button onclick="naoGostar()">Não 😿</button>

        <p id="resultado"></p>

        <hr>

        <h2>Curiosidades sobre gatos</h2>

        <button onclick="curiosidade()">
            Descobrir curiosidade
        </button>

        <p id="curiosidade"></p>

        <hr>

        <h2>Quantos gatos você tem?</h2>

        <input type="number" id="quantidade" min="0"
               placeholder="Digite um número">

        <button onclick="mostrarGatos()">Enviar</button>

        <p id="resposta"></p>

    </div>

    <script>

        function gostar() {
            document.getElementById("resultado").innerHTML =
                "Que ótimo! Gatos são animais incríveis! 😻";
        }

        function naoGostar() {
            document.getElementById("resultado").innerHTML =
                "Tudo bem! Cada pessoa tem seu animal favorito! 🐶";
        }

        function curiosidade() {

            const curiosidades = [
                "Gatos dormem muitas horas por dia! 😴",
                "Gatos usam os bigodes para perceber o ambiente! 🐱",
                "O ronronar pode acontecer quando estão relaxados! 💗",
                "Gatos possuem excelente visão em pouca luz! 🌙",
                "Cada gato possui um jeito único de se comunicar!"
            ];

            let numero = Math.floor(
                Math.random() * curiosidades.length
            );

            document.getElementById("curiosidade").innerHTML =
                curiosidades[numero];
        }

        function mostrarGatos() {

            let quantidade = document.getElementById("quantidade").value;

            if (quantidade === "" || quantidade < 0) {
                document.getElementById("resposta").innerHTML =
                    "Digite uma quantidade válida!";
            } else {
                document.getElementById("resposta").innerHTML =
                    "Você tem " + quantidade + " gato(s)! 🐈";
            }

        }

    </script>

</body>
</html>
