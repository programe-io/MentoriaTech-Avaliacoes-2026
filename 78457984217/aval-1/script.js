
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Verificador de Idade</title>
</head>
<body>
    <h1>Verifique sua idade</h1>

    <input type="number" id="idade" placeholder="Digite sua idade">

    <button onclick="verificar()">Verificar</button>

    <h2 id="resultado"></h2>

    <script>
        function verificar() {
            let idade = Number(document.getElementById("idade").value);

            if (idade >= 18) {
                document.getElementById("resultado").innerHTML =
                    "Você é maior de idade!";
            } else if (idade > 0) {
                document.getElementById("resultado").innerHTML =
                    "Você é menor de idade!";
            } else {
                document.getElementById("resultado").innerHTML =
                    "Digite uma idade válida!";
            }
        }
    </script>
</body>
</html>
