<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Contador</title>
</head>
<body>

    <h1>Contador</h1>

    <h2 id="numero">0</h2>

    <button onclick="diminuir()">-</button>
    <button onclick="aumentar()">+</button>

    <script>
        let valor = 0;

        function atualizarTela() {
            document.getElementById("numero").innerText = valor;
        }

        function aumentar() {
            valor++;
            atualizarTela();
        }

        function diminuir() {
            valor--;
            atualizarTela();
        }
    </script>

</body>
</html>