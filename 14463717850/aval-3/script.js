document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".profile-nav a");
    const backLinks = document.querySelectorAll(".back-link");
    const sections = document.querySelectorAll(".section-card, .sidebar-aside");

    // Função para esconder todas as seções dinâmicas
    function hideAllSections() {
        sections.forEach(sec => {
            sec.style.display = "none";
        });
    }

    // Ao clicar em um link do menu da capa
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            hideAllSections();
            if (targetSection) {
                targetSection.style.display = "block";
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Ao clicar no botão "Voltar ao Início"
    backLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            hideAllSections();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});