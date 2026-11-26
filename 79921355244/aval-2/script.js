
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mundo dos Jogos</title>

<style>
body {
    background: linear-gradient(135deg, #13002b, #4b0082);
    color: white;
    font-family: Arial;
    text-align: center;
    margin: 0;
}

header {
    background: #220044;
    padding: 25px;
    box-shadow: 0 0 20px purple;
}

h1 {
    color: #ffcc00;
    font-size: 35px;
}

.jogos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    padding: 25px;
}

.card {
    background: #2b1550;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 15px #8a2be2;
}

.emoji {
    font-size: 65px;
}

button {
    background: #ffcc00;
    color: black;
    border: none;
    border-radius: 12px;
    padding: 13px 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}

button:hover {
    background: orange;
    transform: scale(1.08);
}

#resultado {
    color: #00ffcc;
    font-size: 22px;
}

footer {
    background: #100020;
    padding: 20px;
}
</style>
</head>

<body>

<header>
    <h1>🎮 MUNDO DOS JOGOS 🎮</h1>
    <p>Bem-vindo ao mundo da diversão!</p>
</header>

<h2>🔥 Escolha seu jogo!</h2>

<div class="jogos">

    <div class="card">
        <div class="emoji">🪨</div>
        <h2>Pedra, Papel e Tesoura</h2>
        <button onclick="pedra()">JOGAR</button>
    </div>

    <div class="card">
        <div class="emoji">🎲</div>
        <h2>Jogo de Dados</h2>
        <button onclick="dado()">JOGAR</button>
    </div>

    <div class="card">
        <div class="emoji">🔢</div>
        <h2>Adivinhe o Número</h2>
        <input id="numero" type="number" min="1" max="10"
        placeholder="Número de 1 a 10">
        <button onclick="adivinhar()">TENTAR</button>
    </div>

    <div class="card">
        <div class="emoji">❤️</div>
        <h2>Teste da Sorte</h2>
        <button onclick="sorte()">JOGAR</button>
    </div>

</div>

<h2 id="resultado">🏆 Os jogos estão esperando você!</h2>

<footer>
    <h3>🎮 MUNDO DOS JOGOS</h3>
    <p>Divirta-se e boa sorte! ⭐</p>
</footer>

<script>

function mostrar(texto) {
    document.getElementById("resultado").innerText = texto;
}

function pedra() {
    let opcoes = ["🪨 Pedra", "📄 Papel", "✂️ Tesoura"];
    let escolha = opcoes[Math.floor(Math.random() * 3)];

    mostrar("Você jogou contra o computador! Resultado: " + escolha);
}

function dado() {
    let numero = Math.floor(Math.random() * 6) + 1;
    mostrar("🎲 Você tirou o número " + numero + "!");
}

function adivinhar() {
    let escolha = Number(document.getElementById("numero").value);
    let sorteado = Math.floor(Math.random() * 10) + 1;

    if (escolha < 1 || escolha > 10 || !Number.isInteger(escolha)) {
        mostrar("Digite um número de 1 até 10!");
    } else if (escolha === sorteado) {
        mostrar("🏆 PARABÉNS! VOCÊ ACERTOU!");
    } else {
        mostrar("😅 Errou! O número era " + sorteado);
    }
}

function sorte() {
    let numero = Math.floor(Math.random() * 100) + 1;

    if (numero > 50) {
        mostrar("🍀 VOCÊ ESTÁ COM SORTE! Número: " + numero);
    } else {
        mostrar("😅 Tente novamente! Número: " + numero);
    }
}

</script>

</body>
</html>
