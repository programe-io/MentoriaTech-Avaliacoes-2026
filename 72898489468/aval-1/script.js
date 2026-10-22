
const botao = document.getElementById("botaoMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
  mensagem.textContent =
    "Toda mulher merece respeito, segurança e liberdade. " +
    "Combater a violência é responsabilidade de todos!";

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(mensagem.textContent)
      .then(() => {
        botao.textContent = "Mensagem copiada!";
      })
      .catch(() => {
        botao.textContent = "Mensagem exibida acima!";
      });
  } else {
    botao.textContent = "Mensagem exibida acima!";
  }
});
