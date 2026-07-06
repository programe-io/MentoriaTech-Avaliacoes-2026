const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent =
        "🎮 Bem-vindo ao Game Blog! Prepare-se para muitas novidades do mundo gamer!";
});