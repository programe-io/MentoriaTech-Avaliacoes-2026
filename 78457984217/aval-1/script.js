
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Número Par ou Ímpar</title>
</head>
<body>
    <h1>Par ou Ímpar?</h1>

    <input type="number" id="numero"
    placeholder="Digite um número">

    <button onclick="verificar()">Verificar</button>

    <h2 id="resultado"></h2>

    <script>
        function verificar() {
            let numero = Number(
                document.getElementById("numero").value
            );

            if (document.getElementById("numero").value === "") {
                document.getElementById("resultado").innerHTML =
                    "Digite um número!";
            } else if (numero % 2 === 0) {
                document.getElementById("resultado").innerHTML =
                    "O número é PAR!";
            } else {
                document.getElementById("resultado").innerHTML =
                    "O número é ÍMPAR!";
            }
        }
    </script>
</body>
</html>
