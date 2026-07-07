// ===== CARROSSEL INFINITO =====
// Duplica os itens para criar o efeito de loop infinito contínuo
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items; // Duplica para loop perfeito
    }

    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                menu?.classList.remove('active');
            }
        });
    });

    // ===== MENU ATIVO AO SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== NEWSLETTER =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`✅ Obrigado por se inscrever!\nE-mail: ${email}`);
            newsletterForm.reset();
        });
    }

    // ===== ANIMAÇÃO AO SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.award-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== CLICK NOS CARDS DO CARROSSEL =====
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            alert(`🎬 Você selecionou: ${title}\n\nEm breve mais detalhes!`);
        });
    });

    console.log('🎬 StreamVibes carregado com sucesso!');
});