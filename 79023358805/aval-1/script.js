
const botao = document.querySelector("#likeBtn");
const contador = document.querySelector("#likes");
const mensagem = document.querySelector("#mensagem");

let curtidas = 0;

botao.addEventListener("click", function() {
    curtidas++;
    contador.textContent = curtidas;

    mensagem.textContent = "❤️ Obrigado por apoiar o Mengão!";

    botao.style.background = "#8b0000";
});
