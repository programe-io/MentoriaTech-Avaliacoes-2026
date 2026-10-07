const botao = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent =
        "Cada treino é uma oportunidade para evoluir. Nunca desista dos seus objetivos!";
});
