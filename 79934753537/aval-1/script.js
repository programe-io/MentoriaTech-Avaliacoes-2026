// =========================
// Tema Princesinha Sofia
// script.js
// =========================

// Mensagens dos botões
function amizade() {
    alterarMensagem("💜 A amizade é o maior tesouro de um reino!");
}

function magia() {
    alterarMensagem("✨ A magia acontece quando fazemos o bem!");
}

function castelo() {
    alterarMensagem("🏰 Bem-vindo ao castelo encantado da Princesinha Sofia!");
}

// Altera o texto da mensagem
function alterarMensagem(texto) {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = texto;

    mensagem.style.transform = "scale(1.2)";

    setTimeout(() => {
        mensagem.style.transform = "scale(1)";
    }, 300);
}

// Anima a imagem quando clicada
const imagem = document.querySelector("img");

if (imagem) {
    imagem.addEventListener("click", () => {
        imagem.style.transform = "rotate(10deg) scale(1.1)";

        setTimeout(() => {
            imagem.style.transform = "rotate(0deg) scale(1)";
        }, 500);

        criarConfetes();
    });
}

// Boas-vindas
window.onload = function () {
    alert("👑 Bem-vindo ao Reino da Princesinha Sofia!");
};

// Confetes de emojis
function criarConfetes() {

    const emojis = ["✨","💜","🌸","👑","⭐"];

    for(let i = 0; i < 25; i++){

        const confete = document.createElement("div");

        confete.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        confete.style.position = "fixed";
        confete.style.left = Math.random() * 100 + "vw";
        confete.style.top = "-20px";
        confete.style.fontSize = (20 + Math.random() * 20) + "px";
        confete.style.pointerEvents = "none";
        confete.style.transition = "4s linear";

        document.body.appendChild(confete);

        setTimeout(() => {
            confete.style.top = "110vh";
        }, 10);

        setTimeout(() => {
            confete.remove();
        }, 4000);
    }

}

// Música (opcional)
// Adicione um arquivo chamado "musica.mp3" na mesma pasta
const musica = new Audio("musica.mp3");

function tocarMusica() {
    musica.play();
}

// Tecla M para tocar/parar a música
document.addEventListener("keydown", function(event){

    if(event.key.toLowerCase() === "m"){

        if(musica.paused){
            musica.play();
            alterarMensagem("🎵 Música iniciada!");
        }else{
            musica.pause();
            alterarMensagem("⏸️ Música pausada!");
        }

    }

});
