<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Média - Trabalho Escolar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        \}
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
            width: 300px;
        \}
        input {
            width: 80%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        \}
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        \}
        button:hover {
            background-color: #0056b3;
        \}
        #resultado {
            margin-top: 15px;
            font-weight: bold;
        \}
    </style>
</head>
<body>

    <div class="container">
        <h2>Calculadora de Média</h2>
        <input type="number" id="nota1" placeholder="Digite a 1ª nota" step="0.1"><br>
        <input type="number" id="nota2" placeholder="Digite a 2ª nota" step="0.1"><br>
        <button onclick="calcularMedia()">Calcular Média</button>
        <div id="resultado"></div>
    </div>

    <script>
        // Função em JavaScript acionada pelo botão
        function calcularMedia() {
            // Pegando os valores digitados nos inputs pelo ID
            const n1 = parseFloat(document.getElementById('nota1').value);
            const n2 = parseFloat(document.getElementById('nota2').value);

            // Validando se os campos estão preenchidos
            if (isNaN(n1) || isNaN(n2)) {
                document.getElementById('resultado').innerHTML = "Por favor, digite as duas notas!";
                document.getElementById('resultado').style.color = "red";
                return;
            \}

            // Calculando a média
            const media = (n1 + n2) / 2;

            // Verificando aprovação (média 6.0 como exemplo)
            if (media >= 6.0) {
                document.getElementById('resultado').innerHTML = `Média: \${media.toFixed(1)\} - <span style="color: green;">Aprovado! 🎉</span>`;
            \} else {
                document.getElementById('resultado').innerHTML = `Média: \${media.toFixed(1)\} - <span style="color: red;">Reprovado. 📚</span>`;
            \}
        \}
    </script>

</body>
</html>$0