
"use strict";

// Menu de navegação para celulares
const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");

menuBotao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");

    menuBotao.setAttribute("aria-expanded", String(aberto));
    menuBotao.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
    menuBotao.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu após clicar em um link
menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        menuBotao.setAttribute("aria-expanded", "false");
        menuBotao.setAttribute("aria-label", "Abrir menu");
        menuBotao.textContent = "☰";
    });
});

// Atualiza automaticamente o ano do rodapé
document.getElementById("ano").textContent =
    new Date().getFullYear();

// Validação demonstrativa do formulário
const formContato = document.getElementById("formContato");
const aviso = document.getElementById("aviso");

formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!formContato.checkValidity()) {
        formContato.reportValidity();
        return;
    }

    aviso.textContent =
        "Formulário preenchido! Para enviar a mensagem de verdade, " +
        "é necessário conectar este site a um serviço de envio.";

    formContato.reset();
});
