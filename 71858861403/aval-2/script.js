const botao = document.getElementById("btn-mensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
  mensagem.textContent = "JavaScript funcionando perfeitamente!";
});
