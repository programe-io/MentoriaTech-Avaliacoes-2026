
// SISTEMA GAMER

let jogador = {
    nome: "Player 1",
    vida: 100,
    pontos: 0,
    nivel: 1
};

// Iniciar jogo
function iniciarJogo() {
    alert("🎮 BEM-VINDO AO JOGO!");

    jogador.vida = 100;
    jogador.pontos = 0;
    jogador.nivel = 1;

    atualizarTela();
}

// Ganhar pontos
function ganharPontos() {
    jogador.pontos += 10;

    if (jogador.pontos >= jogador.nivel * 100) {
        jogador.nivel++;
        alert("🏆 NOVO NÍVEL: " + jogador.nivel);
    }

    atualizarTela();
}

// Receber dano
function receberDano() {
    jogador.vida -= 10;

    if (jogador.vida <= 0) {
        jogador.vida = 0;
        alert("💀 GAME OVER!");
    }

    atualizarTela();
}

// Recuperar vida
function recuperarVida() {
    jogador.vida += 20;

    if (jogador.vida > 100) {
        jogador.vida = 100;
    }

    atualizarTela();
}

// Atualizar informações
function atualizarTela() {
    document.getElementById("vida").innerText =
        jogador.vida;

    document.getElementById("pontos").innerText =
        jogador.pontos;

    document.getElementById("nivel").innerText =
        jogador.nivel;
}

console.log("🔥 SISTEMA GAMER CARREGADO!");
