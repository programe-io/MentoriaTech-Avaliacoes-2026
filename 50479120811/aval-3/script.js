
// ELEMENTOS DO MENU

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// ABRIR E FECHAR MENU

menuToggle.addEventListener("click", function() {

    const aberto = menu.classList.toggle("aberto");

    if (aberto) {
        menuToggle.textContent = "✕";
        menuToggle.setAttribute("aria-expanded", "true");
    } else {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }

});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".menu a").forEach(function(link) {

    link.addEventListener("click", function() {

        menu.classList.remove("aberto");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// FORMULÁRIO DE CADASTRO

const formulario = document.getElementById("formNewsletter");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const email = document.getElementById("email").value.trim();

    const mensagem = document.getElementById("mensagem");

    if (email === "") {

        mensagem.textContent = "Digite seu e-mail!";

        return;

    }

    mensagem.textContent = "Cadastro realizado com sucesso!";

    formulario.reset();

});
