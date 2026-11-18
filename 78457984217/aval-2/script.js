
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Saudação</title>
</head>
<body>
    <h1>Olá! Qual é o seu nome?</h1>

    <input type="text" id="nome" placeholder="Digite seu nome">

    <button onclick="saudar()">Enviar</button>

    <h2 id="resultado"></h2>

    <script>
        function saudar() {
            let nome = document.getElementById("nome").value;

            document.getElementById("resultado").innerHTML =
                "Seja bem-vindo(a), " + nome + "!";
        }
    </script>
</body>
</html>
