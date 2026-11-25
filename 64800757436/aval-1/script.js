 JavaScript — script.js

javascript

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

// Fechar menu ao clicar em um link
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu").classList.remove("active");
    });
});

// Matrícula pelo WhatsApp
function matricular(plano) {

    const telefone = "5599999999999";

    const mensagem =
        `Olá! Tenho interesse no plano ${plano} da Power Fitness Academy. Gostaria de mais informações sobre a matrícula.`;

    const url =
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}

console.log("Power Fitness Academy carregada!");