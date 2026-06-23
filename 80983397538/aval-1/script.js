<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Previsão do Clima</title>

<style>
body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #4facfe, #00f2fe);
    margin: 0;
    padding: 0;
    text-align: center;
    color: white;
}

header {
    padding: 30px;
}

.container {
    background: rgba(255,255,255,0.2);
    max-width: 500px;
    margin: 30px auto;
    padding: 25px;
    border-radius: 15px;
}

input {
    width: 80%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    margin-bottom: 10px;
}

button {
    background: #0077ff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
}

button:hover {
    background: #005fcc;
}

#resultado {
    margin-top: 20px;
    font-size: 20px;
}
</style>
</head>
<body>

<header>
    <h1>🌤️ Previsão do Clima</h1>
    <p>Digite uma cidade para ver uma previsão simulada.</p>
</header>

<div class="container">
    <input type="text" id="cidade" placeholder="Digite o nome da cidade">
    <br>
    <button onclick="verClima()">Consultar Clima</button>

    <div id="resultado"></div>
</div>

<script>
function verClima() {
    const cidade = document.getElementById("cidade").value;

    if (cidade === "") {
        document.getElementById("resultado").innerHTML =
            "⚠️ Digite uma cidade.";
        return;
    }

    const climas = [
        "☀️ Ensolarado - 32°C",
        "⛅ Parcialmente nublado - 27°C",
        "🌧️ Chuvoso - 22°C",
        "⛈️ Tempestades - 20°C",
        "🌤️ Céu limpo - 29°C"
    ];

    const sorteio = Math.floor(Math.random() * climas.length);

    document.getElementById("resultado").innerHTML =
        `<h2>${cidade}</h2>
         <p>${climas[sorteio]}</p>`;
}
</script>

</body>
</html>