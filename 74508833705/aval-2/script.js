// Mensagem ao carregar o site
window.addEventListener("load", () => {
    console.log("GR Studio carregado com sucesso!");
});

// Botão "Começar Agora"
const botao = document.getElementById("botao");

if (botao) {
    botao.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Bem-vindo ao GR Studio!");
    });
}

// Efeito no cabeçalho ao rolar a página
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "#020617";
    } else {
        header.style.background = "rgba(0,0,0,.4)";
    }
});

// Efeito de animação nos cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });
});