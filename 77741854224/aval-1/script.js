
const botao = document.getElementById("botaoSurpresa");
const mensagem = document.getElementById("mensagem");

const frases = [
  "Você é incrível do jeitinho que é! 💖",
  "Nunca deixe de acreditar nos seus sonhos! 🌷",
  "Seu brilho é único. Continue brilhando! ✨",
  "Você merece momentos lindos e felizes! 🎀",
  "Seja sua própria inspiração! 💕"
];

botao.addEventListener("click", function () {
  const indice = Math.floor(Math.random() * frases.length);
  mensagem.textContent = frases[indice];
});

const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const resposta = document.getElementById("resposta");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeDigitado = nome.value.trim();

  if (nomeDigitado.length === 0) {
    resposta.textContent = "Por favor, digite seu nome! 💗";
    return;
  }

  resposta.textContent =
    `Seja bem-vinda ao Clube das Meninas, ${nomeDigitado}! 🎀`;

  formulario.reset();
});
