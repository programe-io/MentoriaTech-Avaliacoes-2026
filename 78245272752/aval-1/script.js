// ==========================================================================
// AURA BEAUTY - INTERATIVIDADES E FUNCIONALIDADES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMAÇÃO DE ROLAGEM SUAVE (SMOOTH SCROLL)
    // ----------------------------------------------------------------------
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. MODAL DE AGENDAMENTO SIMPLES
    // ----------------------------------------------------------------------
    const agendarBtns = document.querySelectorAll('.btn-primary, .btn');
    
    agendarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Evita o comportamento padrão caso seja um link direto
            if (btn.getAttribute('href') === '#servicos' || btn.getAttribute('href') === '#agendar') {
                return;
            }
            e.preventDefault();
            
            const servico = prompt('Qual serviço você deseja agendar? (ex: Skincare, Capilar, Bem-Estar)');
            
            if (servico) {
                alert(`Obrigado! Recebemos o seu interesse em "${servico}". Entraremos em contato em breve para confirmar seu horário!`);
            }
        });
    });

    // 3. ANIMAÇÃO DE REVELAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
    // ----------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    // Seleciona os cartões de serviços para aplicar o efeito de entrada
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealOnScroll.observe(card);
    });

    // 4. CABEÇALHO DINÂMICO AO ROLAR (HEADER SHADOW)
    // ----------------------------------------------------------------------
    const header = document.querySelector('header, .header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.padding = '15px 8%';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.03)';
                header.style.padding = '20px 8%';
            }
            header.style.transition = 'all 0.3s ease';
        });
    }

});