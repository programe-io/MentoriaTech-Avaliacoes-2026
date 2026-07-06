const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
  mensagem.innerHTML = "🌍 3... 2... 1... Decolagem! Boa viagem pelo espaço! 🚀";
  document.body.style.background = "linear-gradient(to bottom, #020024, #090979, #00d4ff)";
});