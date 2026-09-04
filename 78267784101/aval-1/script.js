// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                    });
                    });

                    // Rolagem suave para seção
                    function scrollToSection(sectionId) {
                        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
                        }

                        // Animação dos contadores
                        function animateCounter(elementId, target, duration) {
                            const element = document.getElementById(elementId);
                                let current = 0;
                                    const increment = target / (duration / 16);

                                        const timer = setInterval(() => {
                                                current += increment;
                                                        if (current >= target) {
                                                                    element.textContent = target;
                                                                                clearInterval(timer);
                                                                                        } else {
                                                                                                    element.textContent = Math.floor(current);
                                                                                                            }
                                                                                                                }, 16);
                                                                                                                }

                                                                                                                // Inicia contadores apenas quando visíveis
                                                                                                                const estatisticasSection = document.getElementById('estatisticas');
                                                                                                                let countersAnimated = false;

                                                                                                                const observer = new IntersectionObserver((entries) => {
                                                                                                                    entries.forEach(entry => {
                                                                                                                            if (entry.isIntersecting && !countersAnimated) {
                                                                                                                                        countersAnimated = true;
                                                                                                                                                    animateCounter('counter1', 200, 2000);
                                                                                                                                                                animateCounter('counter2', 206, 2000);
                                                                                                                                                                            animateCounter('counter3', 1000000, 2000);
                                                                                                                                                                                        animateCounter('counter4', 3000, 2000);
                                                                                                                                                                                                }
                                                                                                                                                                                                    });
                                                                                                                                                                                                    }, { threshold: 0.5 });

                                                                                                                                                                                                    observer.observe(estatisticasSection);

                                                                                                                                                                                                    // Links internos com rolagem suave
                                                                                                                                                                                                    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                                                                                                                                                                                                        anchor.addEventListener('click', function (e) {
                                                                                                                                                                                                                e.preventDefault();
                                                                                                                                                                                                                        scrollToSection(this.getAttribute('href').substring(1));
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                            