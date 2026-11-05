
// ===== ANIMAÇÃO DOS PRATOS =====

const cards = document.querySelectorAll(".menu-card");

const cardObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            cardObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {

    cardObserver.observe(card);

});


// ===== ANIMAÇÃO DAS SEÇÕES =====

const sections = document.querySelectorAll(
    ".specialties, .about, .contact"
);

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            sectionObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

sections.forEach(section => {

    sectionObserver.observe(section);

});


// ===== MENU DE NAVEGAÇÃO =====

const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {

    link.addEventListener("click", function() {

        menuLinks.forEach(item => {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


// ===== EFEITO NOS BOTÕES =====

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.letterSpacing = "2px";

    });

    button.addEventListener("mouseleave", () => {

        button.style.letterSpacing = "1px";

    });

});


// ===== ANO AUTOMÁTICO NO RODAPÉ =====

const footerText = document.querySelector("footer p");

footerText.textContent =
    `© ${new Date().getFullYear()} Sabor & Brasa. Todos os direitos reservados.`;


// ===== MENSAGEM DE INICIALIZAÇÃO =====

console.log("Sabor & Brasa carregado com sucesso!");

console.log("Sistema de restaurante iniciado.");
