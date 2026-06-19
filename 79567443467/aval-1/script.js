<!DOCTYPE html>
<html>
<head>
    <title>Exemplo JavaScript</title>
</head>
<body>

    <h1>Teste com JavaScript</h1>

    <button onclick="mostrarMensagem()">
        Clique aqui
    </button>

    <p id="resultado"></p>

    <script>
        function mostrarMensagem() {
            document.getElementById("resultado").innerHTML =
            "Olá! Você executou um código JavaScript 🎉";
        }
    </script>

</body>
</html>