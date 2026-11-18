
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Calculadora</title>
</head>
<body>
    <h1>Calculadora de Soma</h1>

    <input type="number" id="n1" placeholder="Primeiro número">

    <input type="number" id="n2" placeholder="Segundo número">

    <button onclick="somar()">Somar</button>

    <h2 id="resultado">Resultado: </h2>

    <script>
        function somar() {
            let a = Number(document.getElementById("n1").value);
            let b = Number(document.getElementById("n2").value);

            let soma = a + b;

            document.getElementById("resultado").innerHTML =
                "Resultado: " + soma;
        }
    </script>
</body>
</html>
