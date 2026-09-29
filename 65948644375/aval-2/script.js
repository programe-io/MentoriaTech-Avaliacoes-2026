const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// MENU MOBILE

menuBtn.addEventListener("click", function () {

navLinks.classList.toggle("active");


});

// FECHAR MENU AO CLICAR EM UM LINK

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

link.addEventListener("click", function () {

    navLinks.classList.remove("active");

});


});

// FORMULÁRIO

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {

event.preventDefault();

const nome = document.getElementById("nome").value;

formMessage.textContent =
    `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. 🚀`;

form.reset();


});