// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao site Smart Bags!");
});

// Interação com os cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        this.classList.toggle("selecionado");
    });
});

// Formulário de contato
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao site Smart Bags!");
});

// Interação com os cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        this.classList.toggle("selecionado");
    });
});

// Formulário de contato
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();