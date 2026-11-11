let apoios = 0;

const botao = document.getElementById("btnApoiar");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
  apoios++;
  contador.textContent = apoios;
  mensagem.textContent = "Obrigado por apoiar este projeto!";
\});$0