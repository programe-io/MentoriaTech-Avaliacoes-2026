
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Tabuada</title>
</head>
<body>
    <h1>Gerador de Tabuada</h1>

    <input type="number" id="numero"
    placeholder="Digite um número">

    <button onclick="gerar()">Gerar tabuada</button>

    <div id="resultado"></div>

    <script>
        function gerar() {
            let numero = Number(
                document.getElementById("numero").value
            );

            let texto = "";

            if (document.getElementById("numero").value === "") {
                texto = "Digite um número!";
            } else {
                for (let i = 1; i <= 10; i++) {
                    texto += numero + " x " + i +
                    " = " + (numero * i) + "<br>";
                }
            }

            document.getElementById("resultado").innerHTML = texto;
        }
    </script>
</body>
</html>
