const botao = document.getElementById("btn-interacao");
const mensagem = document.getElementById("mensagem-retorno");

botao.addEventListener("click", function () {

    mensagem.textContent =
        "Olá! Obrigado por visitar meu portfólio 🚀";

    botao.textContent = "Obrigado! ❤️";

});