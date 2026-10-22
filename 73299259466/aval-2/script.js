const botao = document.getElementById("botaoMissao");
const mensagem = document.getElementById("mensagem");

const missoes = [
  "🏙️ Explore uma experiência nova!",
  "🐾 Descubra um jogo de animais!",
  "🏃 Complete um desafio de obby!",
  "🤝 Convide um amigo para jogar!",
  "⭐ Experimente um jogo diferente!"
];

botao.addEventListener("click", function () {
  const indice = Math.floor(Math.random() * missoes.length);

  mensagem.textContent = missoes[indice];
  botao.textContent = "TENTAR OUTRA MISSÃO";
});