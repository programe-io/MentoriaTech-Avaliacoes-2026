
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
  mensagem.textContent =
    "Parabéns! Sua primeira página está funcionando!";
});
