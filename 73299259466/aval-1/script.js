const botao = document.getElementById("btnJogar");
const mensagem = document.getElementById("mensagem");

const frases = [
  "🔥 Treine sua mira e conquiste a vitória!",
  "🎯 Calma, estratégia e precisão!",
  "⚡ Seu próximo desafio começa agora!",
  "🏆 Nunca desista antes da última rodada!"
];

botao.addEventListener("click", function () {
  const indice = Math.floor(
    Math.random() * frases.length
  );

  mensagem.textContent = frases[indice];
  botao.textContent = "MODO PRO ATIVADO!";
});