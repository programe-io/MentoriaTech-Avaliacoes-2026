
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Sorteador</title>
</head>
<body>
    <h1>Sorteador de Números</h1>

    <p>Clique para sortear um número de 1 a 100.</p>

    <button onclick="sortear()">Sortear</button>

    <h2 id="resultado"></h2>

    <script>
        function sortear() {
            let numero = Math.floor(Math.random() * 100) + 1;

            document.getElementById("resultado").innerHTML =
                "Número sorteado: " + numero;
        }
    </script>
</body>
</html>
