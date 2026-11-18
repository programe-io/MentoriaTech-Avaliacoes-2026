
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Boas-vindas</title>
</head>
<body>
    <h1>Mensagem especial</h1>

    <button onclick="mensagem()">
        Clique aqui
    </button>

    <h2 id="resultado"></h2>

    <script>
        function mensagem() {
            document.getElementById("resultado").innerHTML =
                "Você é capaz de conquistar seus sonhos! 🌟";
        }
    </script>
</body>
</html>
