// Função para calcular aproveitamento do time
function calcularAproveitamento() {
    let vitorias = parseInt(prompt("Digite o número de vitórias:"));
    let empates = parseInt(prompt("Digite o número de empates:"));
    let derrotas = parseInt(prompt("Digite o número de derrotas:"));

    let jogos = vitorias + empates + derrotas;
    let pontos = (vitorias * 3) + (empates * 1);

    let aproveitamento = (pontos / (jogos * 3)) * 100;

    document.getElementById("resultado").innerHTML =
        "Aproveitamento: " + aproveitamento.toFixed(2) + "%";
}

// Função para classificar desempenho
function classificarTime() {
    let golsMarcados = parseInt(prompt("Gols marcados:"));
    let golsSofridos = parseInt(prompt("Gols sofridos:"));

    let saldo = golsMarcados - golsSofridos;
    let classificacao = "";

    if (saldo > 10) {
        classificacao = "Excelente desempenho 🏆";
    } else if (saldo > 0) {
        classificacao = "Bom desempenho 👍";
    } else if (saldo === 0) {
        classificacao = "Desempenho equilibrado ⚖️";
    } else {
        classificacao = "Precisa melhorar ⚠️";
    }

    document.getElementById("resultado").innerHTML =
        "Saldo de gols: " + saldo + "<br>" + classificacao;
}

// Função simples de simulação de partida
function simularPartida() {
    let golsTimeA = Math.floor(Math.random() * 5);
    let golsTimeB = Math.floor(Math.random() * 5);

    let resultado = "";

    if (golsTimeA > golsTimeB) {
        resultado = "Time A venceu!";
    } else if (golsTimeB > golsTimeA) {
        resultado = "Time B venceu!";
    } else {
        resultado = "Empate!";
    }

    document.getElementById("resultado").innerHTML =
        `Placar: ${golsTimeA} x ${golsTimeB} <br> ${resultado}`;
}