 
// Mensagem de boas-vindas
window.addEventListener("load", function () {
    console.log("Bem-vindo ao meu projeto pessoal!");
});

// Efeito de entrada no cartão
const container = document.querySelector(".container");

container.style.opacity = "0";
container.style.transform = "translateY(30px)";
container.style.transition = "opacity 1s ease, transform 1s ease";

window.addEventListener("load", function () {
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
});

// Interação com as características
const caracteristicas = document.querySelectorAll(".item");

caracteristicas.forEach(function (item) {
    item.addEventListener("click", function () {
        alert("Essa é uma das minhas características: " + item.textContent);
    });
});

// Atualização automática do ano no rodapé
const footer = document.querySelector("footer");

footer.textContent = "© " + new Date().getFullYear() +
    " - Projeto pessoal de João Henrique";
