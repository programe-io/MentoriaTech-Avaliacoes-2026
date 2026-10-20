const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
    mensagem.textContent =
        "Obrigada por conhecer um pouquinho sobre mim!";
});