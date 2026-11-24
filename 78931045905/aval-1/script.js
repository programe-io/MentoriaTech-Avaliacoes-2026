
function mostrar(nome, descricao) {
    alert(nome + "\n\n" + descricao);
}

// Efeito de entrada dos cards
const cards = document.querySelectorAll(".card");

const observador = new IntersectionObserver((elementos) => {
    elementos.forEach(elemento => {
        if (elemento.isIntersecting) {
            elemento.target.style.opacity = "1";
            elemento.target.style.transform = "translateY(0)";
        }
    });
});

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.7s ease";
    observador.observe(card);
});
