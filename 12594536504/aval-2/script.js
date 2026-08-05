        document.addEventListener('DOMContentLoaded', () => {
            const menuToggle = document.getElementById('mobile-menu');
            const navLinksContainer = document.getElementById('nav-links');
            const navLinks = document.querySelectorAll('.nav-links a');
            const header = document.getElementById('header');
            const sections = document.querySelectorAll('section');

            // 1. Menu Hambúrguer (Mobile)
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
            });

            // Fecha o menu mobile ao clicar em qualquer link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                });
            });

            // 2. Estilo do Header ao Rolar
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // 3. ScrollSpy (Ativa o link correto no menu)
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${currentId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => observer.observe(section));

            // 4. Animação de Revelação (Reveal on Scroll)
            const revealElements = document.querySelectorAll('.reveal');

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            revealElements.forEach(el => revealObserver.observe(el));
        });