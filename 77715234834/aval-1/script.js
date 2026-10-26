
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

// Abre e fecha o menu em telas pequenas
botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu depois que um link é selecionado
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
        botaoMenu.textContent = "☰";
    });
});

// Atualiza o ano automaticamente
document.querySelector("#ano").textContent =
    new Date().getFullYear();

// Anima as seções quando aparecem na tela
const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
} else {
    elementos.forEach((elemento) => {
        elemento.classList.add("visivel");
    });
}
