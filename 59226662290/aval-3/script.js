document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector("header h1");

    titulo.addEventListener("click", function () {
        alert("Você está visualizando uma página sobre Trent Alexander-Arnold!");
    });

    const imagem = document.querySelector(".foto-jogador");

    imagem.addEventListener("mouseover", function () {
        imagem.style.transform = "scale(1.05)";
        imagem.style.transition = "0.3s";
    });

    imagem.addEventListener("mouseout", function () {
        imagem.style.transform = "scale(1)";
    });
});