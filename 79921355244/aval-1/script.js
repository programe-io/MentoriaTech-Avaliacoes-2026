
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>🥛 Mundo do Leite</title>

<style>
body {
    background: linear-gradient(#87ceeb, #ffffff);
    font-family: Arial;
    text-align: center;
    color: #333;
}

h1 {
    color: #2675b9;
    font-size: 35px;
}

.vaca {
    font-size: 110px;
    margin: 20px;
    animation: pular 1s infinite alternate;
}

@keyframes pular {
    from { transform: translateY(0); }
    to { transform: translateY(-15px); }
}

button {
    background: #3498db;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 15px 25px;
    margin: 10px;
    font-size: 20px;
    cursor: pointer;
}

button:hover {
    background: #1d5f91;
}

#leite {
    font-size: 28px;
    color: #2675b9;
}

#mensagem {
    font-size: 22px;
}
</style>
</head>

<body>

<h1>🥛 MUNDO DO LEITE 🥛</h1>

<p>Ajude a vaquinha a produzir leite!</p>

<div class="vaca">🐄</div>

<h2 id="leite">Copos de leite: 0</h2>

<div id="copos">🥛</div>

<button onclick="produzir()">🐄 Produzir leite</button>
<button onclick="beber()">😋 Beber leite</button>
<button onclick="reiniciar()">🔄 Reiniciar</button>

<p id="mensagem">Vamos começar! 🥛</p>

<script>
let copos = 0;

function atualizar() {
    document.getElementById("leite").innerText =
        "Copos de leite: " + copos;

    document.getElementById("copos").innerText =
        "🥛 ".repeat(Math.min(copos, 20));
}

function produzir() {
    copos++;
    atualizar();

    document.getElementById("mensagem").innerText =
        "Muito bem! Você produziu um copo de leite! 🥛";
}

function beber() {
    if (copos > 0) {
        copos--;
        atualizar();

        document.getElementById("mensagem").innerText =
            "Hummm! Que leite gostoso! 😋";
    } else {
        document.getElementById("mensagem").innerText =
            "Não tem leite! Produza primeiro! 🐄";
    }
}

function reiniciar() {
    copos = 0;
    atualizar();

    document.getElementById("mensagem").innerText =
        "Tudo zerado! Vamos começar novamente!";
}
</script>

</body>
</html>
