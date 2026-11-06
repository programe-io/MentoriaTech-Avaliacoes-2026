// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Efeito de Revelação Suave (Scroll Reveal) para as seções do blog
    const sections = document.querySelectorAll(".blog-section");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            }
        });
    };

    // Executa uma vez no início e depois a cada scroll
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);


    // 2. Destaca temporariamente a seção ao clicar nos links do sumário
    const summaryLinks = document.querySelectorAll(".summary-box a");

    summaryLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Remove destaque prévio se houver
                sections.forEach(sec => sec.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)");
                
                // Aplica um brilho dourado temporário na seção selecionada
                setTimeout(() => {
                    targetSection.style.transition = "box-shadow 0.5s ease";
                    targetSection.style.boxShadow = "0 0 20px rgba(214, 175, 55, 0.6)";
                }, 400); 
            }
        });
    });
});
