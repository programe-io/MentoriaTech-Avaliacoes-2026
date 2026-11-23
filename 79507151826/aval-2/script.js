
let pontos = 0;
let nivel = 1;

// Ganhar pontos
function ganharPontos() {
    pontos += 10;

    document.getElementById("pontos").innerText =
        "Pontos: " + pontos;

    // Subir de nível
    if (pontos >= nivel * 100) {
        nivel++;

        alert("🎉 VOCÊ SUBIU DE NÍVEL! Nível: " + nivel);
    }

    document.getElementById("nivel").innerText =
        "Nível: " + nivel;
}

// Reiniciar jogo
function reiniciar() {
    pontos = 0;
    nivel = 1;

    document.getElementById("pontos").innerText =
        "Pontos: 0";

    document.getElementById("nivel").innerText =
        "Nível: 1";
}

// Mensagem de boas-vindas
function iniciar() {
    alert("🎮 Bem-vindo ao Gamer Zone!");
}

console.log("Sistema Gamer iniciado!");
