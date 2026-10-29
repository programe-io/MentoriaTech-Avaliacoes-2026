
function mostrarMensagem() {
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent =
    "⚽ O jogo começou! Boa sorte!";
}

// Efeito ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  console.log("Mundo do Futebol carregado!");
});