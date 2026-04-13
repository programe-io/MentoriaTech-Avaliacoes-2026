<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Signo de Gêmeos com JavaScript</title>

    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #141e30, #243b55);
            font-family: Arial, sans-serif;
            color: white;
        \}

        .card {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            width: 320px;
            box-shadow: 0 0 20px rgba(0,0,0,0.6);
        \}

        img {
            width: 180px;
            margin: 20px 0;
        \}

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            background: #00c6ff;
            color: black;
            font-weight: bold;
            cursor: pointer;
        \}

        button:hover {
            background: #0072ff;
            color: white;
        \}
    </style>
</head>
<body>

    <div class="card">
        <h1>♊ Gêmeos</h1>

        <!-- Aqui a imagem será inserida -->
        <div id="imagem"></div>

        <p>Signo comunicativo, curioso e versátil.</p>

        <button onclick="mostrarImagem()">Mostrar imagem</button>
    </div>

    <script>
        function mostrarImagem() {
            const div = document.getElementById("imagem");

            div.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Gemini_symbol.svg/512px-Gemini_symbol.svg.png" alt="Signo de Gêmeos">
            `;
        \}
    </script>

</body>
</html>$0