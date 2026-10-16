
const botao = document.getElementById("botaoMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent =
        "Obrigado pela visita! Estou sempre aprendendo algo novo.";

    botao.textContent = "Obrigado!";
});
