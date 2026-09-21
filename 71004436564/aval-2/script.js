// Mostra qual jogo foi selecionado
function mostrarJogo(jogo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerText = "Você selecionou: " + jogo + " 🎮";
}

// Mostra uma mensagem de boas-vindas
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerText =
        "Olá! Eu sou Kaick Duarte. Seja bem-vindo ao meu site! 🚀";
}
