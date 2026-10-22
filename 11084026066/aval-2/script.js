
const botao = document.getElementById("meuBotao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
    mensagem.textContent = "Você clicou no botão!";
});
