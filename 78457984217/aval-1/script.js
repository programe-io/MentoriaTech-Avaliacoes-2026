let pontosJogador = 0;
let pontosPC = 0;

function jogar(escolha) {
    const opcoes = ["pedra", "papel", "tesoura"];

    const escolhaPC =
        opcoes[Math.floor(Math.random() * 3)];

    let resultado = "";

    if (escolha === escolhaPC) {
        resultado = "🤝 EMPATE!";
    } else if (
        (escolha === "pedra" && escolhaPC === "tesoura") ||
        (escolha === "papel" && escolhaPC === "pedra") ||
        (escolha === "tesoura" && escolhaPC === "papel")
    ) {
        resultado = "🏆 VOCÊ VENCEU!";
        pontosJogador++;
    } else {
        resultado = "💻 O COMPUTADOR VENCEU!";
        pontosPC++;
    }

    document.getElementById("mensagem").textContent =
        resultado;

    document.getElementById("jogadas").textContent =
        `Você: ${escolha} | Computador: ${escolhaPC}`;

    document.getElementById("pontosJogador").textContent =
        pontosJogador;

    document.getElementById("pontosPC").textContent =
        pontosPC;
}

function reiniciar() {
    pontosJogador = 0;
    pontosPC = 0;

    document.getElementById("pontosJogador").textContent = "0";
    document.getElementById("pontosPC").textContent = "0";

    document.getElementById("mensagem").textContent =
        "Prepare-se!";

    document.getElementById("jogadas").textContent =
        "Você: - | Computador: -";
}