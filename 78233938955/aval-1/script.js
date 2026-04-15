/**
 * MG MILLION DOLLAR ATELIER ENGINE v12.0
 * GSAP + ScrollTrigger Cinema Experience
 */

gsap.registerPlugin(ScrollTrigger);

const HeritageAtelier = {
    init: () => {
        HeritageAtelier.animateIntro();
        HeritageAtelier.setupLuxuryCursor();
        HeritageAtelier.setupScrollytelling();
    },

    // 1. Animação de Entrada Cinematográfica
    animateIntro: () => {
        const tl = gsap.timeline();
        tl.from(".reveal-text", { y: 100, opacity: 0, duration: 2, ease: "expo.out" })
          .from(".reveal-sub", { opacity: 0, duration: 1.5 }, "-=1");
    },

    // 2. Cursor de Luxo Interativo
    setupLuxuryCursor: () => {
        const cursor = document.getElementById('cursor-luxury');
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.6, ease: "power3.out" });
        });
        
        // Reação do cursor ao passar sobre as imagens (efeito de "olhar de perto")
        document.querySelectorAll('.zoom-img').forEach(img => {
            img.onmouseenter = () => gsap.to(cursor, { scale: 2, background: "rgba(184,151,109,0.1)", border: "1px solid #fff" });
            img.onmouseleave = () => gsap.to(cursor, { scale: 1, background: "none", border: "1px solid #b8976d" });
        });
    },

    // 3. O Motor de Explicação Visual (Mágica do Scroll)
    setupScrollytelling: () => {
        document.querySelectorAll('.atelier-item').forEach((section) => {
            const boxes = section.querySelectorAll('.explainer-box');
            const zoomImg = section.querySelector('.zoom-img');

            // A. Revelação das Caixas de Texto (Uma a uma)
            gsap.to(boxes, {
                opacity: 1,
                x: 0,
                stagger: 0.4, // Atraso entre cada caixa
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 30%", // Começa quando a seção está 30% visível
                    toggleActions: "play none none reverse" // Joga ao descer, reverte ao subir
                }
            });

            // B. Efeito de Zoom Out na Imagem (Conforme o usuário lê)
            gsap.to(zoomImg, {
                scale: 1, // Volta ao tamanho original
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom", // Começa quando a seção aparece na parte de baixo
                    end: "bottom top", // Termina quando a seção sai pela parte de cima
                    scrub: 1 // Sincroniza perfeitamente com o dedo no scroll
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', HeritageAtelier.init);