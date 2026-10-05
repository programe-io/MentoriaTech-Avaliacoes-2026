// MENU MOBILE

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});


// BOTÃO "SAIBA MAIS"

const btnSaibaMais = document.getElementById("btnSaibaMais");

btnSaibaMais.addEventListener("click", () => {
    document.getElementById("sobre").scrollIntoView({
        behavior: "smooth"
    });
});


// FORMULÁRIO

const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    resultado.textContent =
        `Obrigado, ${nome}! Sua mensagem foi enviada.`;

    formulario.reset();
});