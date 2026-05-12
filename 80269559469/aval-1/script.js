// JavaScript
const botao = document.getElementById("btn");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
  mensagem.textContent = "Você clicou no botão!";
});