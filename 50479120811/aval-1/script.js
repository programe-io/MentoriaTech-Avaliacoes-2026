
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// ABRIR E FECHAR MENU

menuToggle.addEventListener("click", function() {
    menu.classList.toggle("aberto");

    if (menu.classList.contains("aberto")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".menu a").forEach(function(link) {
    link.addEventListener("click", function() {
        menu.classList.remove("aberto");
        menuToggle.textContent = "☰";
    });
});

// CADASTRO DE E-MAIL

const formulario = document.getElementById("formNewsletter");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem");

    if (email.trim() === "") {
        mensagem.textContent = "Digite seu e-mail!";
        return;
    }

    mensagem.textContent =
        "Cadastro realizado com sucesso!";

    formulario.reset();
});
