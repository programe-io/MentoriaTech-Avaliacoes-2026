
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vinda ao Elegance Nails! 💗");
});

// Efeito ao clicar nos links do menu
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.textContent);
    });
});

// Mensagem ao clicar no botão de inspirações
const botao = document.querySelector(".botao");

botao.addEventListener("click", function() {
    alert("Prepare-se para descobrir lindas inspirações! 💅");
});
