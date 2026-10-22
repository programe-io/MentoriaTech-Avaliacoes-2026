
const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector("#menu");

// Abrir e fechar o menu em telas pequenas
botaoMenu.addEventListener("click", function () {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

    botaoMenu.setAttribute("aria-expanded", String(!aberto));
    menu.classList.toggle("is-open", !aberto);
});

// Fechar o menu depois de clicar em um link
menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        botaoMenu.setAttribute("aria-expanded", "false");
    });
});

// Expandir e recolher o conteúdo dos artigos
document.querySelectorAll(".botao-leitura").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const id = botao.getAttribute("data-target");
        const texto = document.getElementById(id);

        const expandido =
            botao.getAttribute("aria-expanded") === "true";

        texto.hidden = expandido;
        botao.setAttribute("aria-expanded", String(!expandido));
        botao.textContent = expandido ? "Ler mais" : "Mostrar menos";
    });
});

// Atualizar o ano do rodapé
document.getElementById("ano-atual").textContent =
    new Date().getFullYear();
