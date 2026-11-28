document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
                const progressBar = document.getElementById('progressBar');
                    const backToTopBtn = document.getElementById('backToTop');
                        const sections = document.querySelectorAll('.card');
                            const navLinks = document.querySelectorAll('.nav-link');

                                // 1. Alternância de Tema (Claro / Escuro) com salvamento no LocalStorage
                                    const savedTheme = localStorage.getItem('theme');
                                        if (savedTheme === 'dark') {
                                                body.classList.add('dark-theme');
                                                        themeToggle.textContent = '☀️ Modo Claro';
                                                            }

                                                                themeToggle.addEventListener('click', () => {
                                                                        body.classList.toggle('dark-theme');
                                                                                const isDark = body.classList.contains('dark-theme');
                                                                                        themeToggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
                                                                                                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                                                                                                    });

                                                                                                        // 2. Eventos de Rolagem (Barra de Progresso, Botão Topo e Menu Ativo)
                                                                                                            window.addEventListener('scroll', () => {
                                                                                                                    // Barra de progresso
                                                                                                                            const scrollTop = window.scrollY;
                                                                                                                                    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                                                                                                                                            const scrollPercent = (scrollTop / docHeight) * 100;
                                                                                                                                                    progressBar.style.width = `${scrollPercent}%`;

                                                                                                                                                            // Mostrar/Esconder botão Voltar ao Topo
                                                                                                                                                                    if (scrollTop > 300) {
                                                                                                                                                                                backToTopBtn.classList.add('show');
                                                                                                                                                                                        } else {
                                                                                                                                                                                                    backToTopBtn.classList.remove('show');
                                                                                                                                                                                                            }

                                                                                                                                                                                                                    // Destacar tópico atual no Sumário
                                                                                                                                                                                                                            let currentSection = '';
                                                                                                                                                                                                                                    sections.forEach(section => {
                                                                                                                                                                                                                                                const sectionTop = section.offsetTop - 120;
                                                                                                                                                                                                                                                            if (scrollTop >= sectionTop) {
                                                                                                                                                                                                                                                                            currentSection = section.getAttribute('id');
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                        navLinks.forEach(link => {
                                                                                                                                                                                                                                                                                                                    link.classList.remove('active');
                                                                                                                                                                                                                                                                                                                                if (link.getAttribute('href') === `#${currentSection}`) {
                                                                                                                                                                                                                                                                                                                                                link.classList.add('active');
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                            // 3. Ação do botão Voltar ao Topo
                                                                                                                                                                                                                                                                                                                                                                                backToTopBtn.addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                                                                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                            
})