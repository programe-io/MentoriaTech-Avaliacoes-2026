// Espera o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Seleção dos elementos
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu li a');

    // =========================
    // Controle do Menu Responsivo
    // =========================
    // Abrir/fechar menu ao clicar no botão
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        // Alterna ícone do menu (☰ ×)
        menuBtn.textContent = menu.classList.contains('active') ? '×' : '☰';
    });

    // Fechar menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });

    // =========================
    // Efeito de rolagem suave (já ativado no CSS, reforçado aqui)
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));
            if (alvo) {
                alvo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =========================
    // Efeito de destaque na barra de navegação ao rolar
    // =========================
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 23, 42, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.padding = '15px 0';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'blur(0)';
            nav.style.padding = '20px 0';
        }
    });

    // =========================
    // Efeito de animação ao aparecer elementos na tela
    // =========================
    const elementosAnimados = document.querySelectorAll('article, .sidebar-card, .gallery img');

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Define estado inicial e observa os elementos
    elementosAnimados.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(el);
    });

    // =========================
    // Galeria: clique para ampliar imagem (exemplo simples)
    // =========================
    const imagensGaleria = document.querySelectorAll('.gallery img');
    imagensGaleria.forEach(img => {
        img.addEventListener('click', () => {
            // Cria elemento de visualização ampliada
            const overlayImg = document.createElement('div');
            overlayImg.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.9); display: flex;
                align-items: center; justify-content: center;
                z-index: 9999; cursor: pointer;
            `;

            const imgAmpliada = document.createElement('img');
            imgAmpliada.src = img.src;
            imgAmpliada.style.cssText = `
                width: 90%; max-width: 800px; border-radius: 14px;
                object-fit: contain;
            `;

            overlayImg.appendChild(imgAmpliada);
            document.body.appendChild(overlayImg);

            // Fechar ao clicar
            overlayImg.addEventListener('click', () => overlayImg.remove());
        });
    });

});