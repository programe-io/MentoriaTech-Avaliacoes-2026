const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent = "🎉 Você clicou no botão! Bem-vindo ao JavaScript!";
});