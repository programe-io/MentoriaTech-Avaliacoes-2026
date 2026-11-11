
let pontos = 0;

function ganharPontos() {
    pontos++;

    document.getElementById("pontuacao").innerText = pontos;

    if (pontos >= 10) {
        alert("PARABÉNS! VOCÊ VENCEU! 🏆");
        pontos = 0;
        document.getElementById("pontuacao").innerText = pontos;
    }
}
