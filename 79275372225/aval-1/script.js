
// ===== ANIMAÇÃO DOS PROJETOS =====

const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.7s ease";

    observer.observe(card);

});


// ===== ANIMAÇÃO DA SEÇÃO SOBRE =====

const about = document.querySelector(".about");

const aboutObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.2
});

aboutObserver.observe(about);


// ===== MENU DE NAVEGAÇÃO =====

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("click", function() {

        links.forEach(item => {
            item.style.color = "#24231f";
        });

        this.style.color = "#a77c52";

    });

});


// ===== BOTÃO DE CONTATO =====

const contactButton = document.querySelector(".contact .btn");

contactButton.addEventListener("click", () => {

    console.log("Redirecionando para contato...");

});


// ===== ANO AUTOMÁTICO NO RODAPÉ =====

const footerText = document.querySelector("footer p");

footerText.textContent =
    `© ${new Date().getFullYear()} ARQ Studio — Todos os direitos reservados.`;
