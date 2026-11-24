
// Abrir e fechar menu mobile
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

// Formulário de contato
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;

    document.getElementById("feedback").textContent =
        `Obrigado, ${nome}! Sua mensagem foi registrada nesta demonstração.`;

    this.reset();
});
