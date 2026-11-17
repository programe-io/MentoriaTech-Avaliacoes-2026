
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");

// MENU PARA CELULAR

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("open");

    menuBtn.textContent =
        navbar.classList.contains("open") ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});

// ANIMAÇÕES AO ROLAR A PÁGINA

const elementos = document.querySelectorAll(
    ".section-title, .history-container, .club-card, " +
    ".peak-container, .gallery-item, .portugal, " +
    ".trophy-card, .legacy-content"
);

elementos.forEach(elemento => {
    elemento.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

}, {
    threshold: 0.15
});

elementos.forEach(elemento => {
    observer.observe(elemento);
});

// BOTÃO VOLTAR AO TOPO

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ANO AUTOMÁTICO

document.getElementById("year").textContent =
    new Date().getFullYear();

// MENSAGEM NO CONSOLE

console.log("CR7 - A história de uma lenda!");


