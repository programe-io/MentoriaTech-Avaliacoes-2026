
// ===== ANIMAÇÃO DOS PRODUTOS =====

const products = document.querySelectorAll(".product-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.2
});

products.forEach(product => {

    product.style.opacity = "0";

    product.style.transform = "translateY(40px)";

    product.style.transition = "0.8s ease";

    observer.observe(product);

});


// ===== ANIMAÇÃO DAS SEÇÕES =====

const sections = document.querySelectorAll(
    ".trends, .about, .contact"
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

            item.style.color = "#222";

        });

        this.style.color = "#b18a62";

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

const footer = document.querySelector("footer p");

footer.textContent =
    `© ${new Date().getFullYear()} VOGUE STUDIO — Todos os direitos reservados.`;


// ===== MENSAGEM NO CONSOLE =====

console.log("VOGUE STUDIO carregado com sucesso!");
