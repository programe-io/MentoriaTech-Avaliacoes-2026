<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cultura Japonesa</title>

<style>
body{
    margin:0;
    font-family:Arial, sans-serif;
    background:#f5f5f5;
}

header{
    background:linear-gradient(135deg,#d32f2f,#b71c1c);
    color:white;
    text-align:center;
    padding:50px 20px;
}

.container{
    max-width:1000px;
    margin:30px auto;
    padding:20px;
}

.card{
    background:white;
    padding:20px;
    margin-bottom:20px;
    border-radius:12px;
    box-shadow:0 4px 8px rgba(0,0,0,0.1);
}

h2{
    color:#d32f2f;
}

button{
    background:#d32f2f;
    color:white;
    border:none;
    padding:12px 20px;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
}

button:hover{
    background:#b71c1c;
}

#curiosidade{
    margin-top:20px;
    font-size:18px;
    font-weight:bold;
    color:#333;
}

footer{
    background:#222;
    color:white;
    text-align:center;
    padding:15px;
    margin-top:30px;
}
</style>
</head>
<body>

<header>
    <h1>🎌 Cultura Japonesa</h1>
    <p>Conheça tradições, costumes e curiosidades do Japão.</p>
</header>

<div class="container">

    <div class="card">
        <h2>🍣 Gastronomia</h2>
        <p>
            A culinária japonesa é famosa por pratos como sushi, sashimi,
            ramen e tempurá, valorizando ingredientes frescos e apresentação.
        </p>
    </div>

    <div class="card">
        <h2>🏯 Tradições</h2>
        <p>
            O Japão possui tradições centenárias, como a cerimônia do chá,
            o uso de quimonos e festivais culturais chamados matsuri.
        </p>
    </div>

    <div class="card">
        <h2>🌸 Curiosidade Aleatória</h2>
        <button onclick="mostrarCuriosidade()">
            Mostrar Curiosidade
        </button>

        <p id="curiosidade"></p>
    </div>

</div>

<footer>
    © 2026 - Cultura Japonesa
</footer>

<script>
function mostrarCuriosidade() {

    const curiosidades = [
        "🌸 As flores de cerejeira (sakura) são um símbolo nacional do Japão.",
        "🚅 O Japão possui alguns dos trens mais rápidos do mundo, os Shinkansen.",
        "🎎 O Festival das Meninas é comemorado em 3 de março.",
        "🍜 O ramen é um dos pratos mais populares do país.",
        "🗻 O Monte Fuji é a montanha mais famosa do Japão.",
        "🎮 O Japão é referência mundial em tecnologia e videogames."
    ];

    const sorteio = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").textContent =
        curiosidades[sorteio];
}
</script>

</body>
</html>