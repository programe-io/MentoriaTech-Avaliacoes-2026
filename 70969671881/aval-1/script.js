// script.js

const button = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

button.addEventListener("click", () => {
  mensagem.innerText = "Você clicou no botão!";
});