// Animação de entrada das seções ao rolar
    const sections = document.querySelectorAll('section');
        
            const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                                entry.target.classList.add('visible');
                                                            }
                                                                    });
                                                                        }, {
                                                                                threshold: 0.15,
                                                                                        rootMargin: '0px 0px -50px 0px'
                                                                                            });

                                                                                                sections.forEach(section => {
                                                                                                        observer.observe(section);
                                                                                                            });

                                                                                                                // Smooth scroll para os links do menu
                                                                                                                    document.querySelectorAll('nav a').forEach(anchor => {
                                                                                                                            anchor.addEventListener('click', function(e) {
                                                                                                                                        e.preventDefault();
                                                                                                                                                    const target = document.querySelector(this.getAttribute('href'));
                                                                                                                                                                if (target) {
                                                                                                                                                                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                                                                                                                                            }
                                                                                                                                                                                                    });
                                                                                                                                                                                                        });