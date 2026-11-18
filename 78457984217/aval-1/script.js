
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Contador</title>
</head>
<body>
    <h1>Contador de Cliques</h1>

    <p id="numero">0</p>

    <button onclick="contar()">Clique aqui</button>

    <script>
        let contador = 0;

        function contar() {
            contador++;
            document.getElementById("numero").innerHTML = contador;
        }
    </script>
</body>
</html>
