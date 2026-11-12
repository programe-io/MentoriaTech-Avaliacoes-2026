
const botao = document.getElementById("btn");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
  mensagem.textContent = "SISTEMA CONECTADO! BEM-VINDO AO FUTURO.";
  mensagem.style.color = "#00ffff";
});
