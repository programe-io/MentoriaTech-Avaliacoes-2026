document.addEventListener("DOMContentLoaded", () => {

    console.log("Site carregado!");

    const titulo = document.querySelector("h1");

    titulo.addEventListener("click", () => {

        titulo.textContent = "Bem-vindo ao Meu Site!";

    });

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("mouseover", () => {
            link.style.color = "yellow";
        });

        link.addEventListener("mouseout", () => {
            link.style.color = "white";
        });

    });

});