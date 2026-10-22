
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

// Abre e fecha o menu no celular
menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");

    menuBtn.textContent = aberto ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", aberto);
});

// Fecha o menu ao clicar em um link
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Atualiza o ano automaticamente
document.getElementById("ano").textContent =
    new Date().getFullYear();

// Anima os cartões quando aparecem na tela
const elementos = document.querySelectorAll(
    ".card, .trofeu, .estatisticas div"
);

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observer.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elementos.forEach((elemento) => {
        elemento.classList.add("revelar");
        observador.observe(elemento);
    });
}