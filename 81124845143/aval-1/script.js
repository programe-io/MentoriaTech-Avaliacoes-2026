const botao = document.getElementById("meuBotao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
    mensagem.textContent = "Parabéns! O JavaScript está funcionando!";
    botao.textContent = "Clicado!";
});