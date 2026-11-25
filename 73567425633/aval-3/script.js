
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// Abrir e fechar o menu
menuToggle.addEventListener("click", function() {
    menu.classList.toggle("ativo");

    const aberto = menu.classList.contains("ativo");

    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.textContent = aberto ? "✕" : "☰";
});

// Fechar o menu ao clicar em um link
const links = menu.querySelectorAll("a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        menu.classList.remove("ativo");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Atualizar o ano automaticamente
document.getElementById("ano").textContent =
    new Date().getFullYear();
