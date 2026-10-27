/**
 * Meu Mundo — André Luis
 * Lógica em JavaScript Puro
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ícones da biblioteca Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // Atualizar ano no rodapé
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 1. ALTERNÂNCIA DE TEMA (DARK / LIGHT)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // 2. MENU MOBILE RESPONSIVO
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 3. MENSAGEM DE BOAS-VINDAS FLUTUANTE
    // ==========================================
    const welcomeBanner = document.getElementById('welcome-banner');
    const closeWelcomeBtn = document.getElementById('close-welcome');

    // Exibir banner após 1.5 segundos
    setTimeout(() => {
        welcomeBanner.classList.add('show');
    }, 1500);

    closeWelcomeBtn.addEventListener('click', () => {
        welcomeBanner.classList.remove('show');
    });

    // ==========================================
    // 4. HIGHLIGHT NA NAVEGAÇÃO AO ROLAR
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ==========================================
    // 5. DESTAQUE E SIMULAÇÃO DO TOCADOR DE MÚSICA
    // ==========================================
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const musicDisc = document.getElementById('music-disc');
    let isPlaying = false;

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;

            if (isPlaying) {
                musicDisc.classList.add('spinning');
                playIcon.setAttribute('data-lucide', 'pause');
            } else {
                musicDisc.classList.remove('spinning');
                playIcon.setAttribute('data-lucide', 'play');
            }

            // Atualizar os ícones do Lucide
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    }
});
