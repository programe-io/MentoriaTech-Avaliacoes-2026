// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao site do iPhone 17!");
});

// Animação dos cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        this.classList.toggle("selecionado");
    });
});

// Efeito ao clicar nas cores
const cores = document.querySelectorAll(".bolinhas span");

cores.forEach(cor => {
    cor.addEventListener("click", function() {

        cores.forEach(item => {
            item.style.border = "2px solid white";
        });

        this.style.border = "4px solid #888";

        alert("Você selecionou uma cor do iPhone 17!");
    });
});