document.addEventListener("DOMContentLoaded", function () {

    // Mensagem de boas-vindas
    alert("Bem-vindo(a) ao meu projeto Sobre Mim!");

    // Mudar o título ao clicar
    const titulo = document.querySelector("header h1");

    titulo.addEventListener("click", function () {
        titulo.textContent = "Obrigado por visitar meu perfil!";
    });

    // Destacar seções ao passar o mouse
    const secoes = document.querySelectorAll("section");

    secoes.forEach(function (secao) {
        secao.addEventListener("mouseover", function () {
            secao.style.transform = "scale(1.02)";
            secao.style.transition = "0.3s";
        });

        secao.addEventListener("mouseout", function () {
            secao.style.transform = "scale(1)";
        });
    });

});