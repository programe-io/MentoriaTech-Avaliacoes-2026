
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".historia, .habilidades, .card"
).forEach(element => {
    element.classList.add("revelar");
    observer.observe(element);
});

const titulo = document.querySelector(".conteudo h1");

titulo.addEventListener("mouseenter", () => {
    titulo.style.textShadow = "0 0 25px #e32636";
});

titulo.addEventListener("mouseleave", () => {
    titulo.style.textShadow = "none";
});
