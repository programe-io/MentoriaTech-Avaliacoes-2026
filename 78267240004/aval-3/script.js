// ==== Barbearia Premium - JavaScript ====

// 🔄 Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', function(e) {
            e.preventDefault();
                    const alvo = document.querySelector(this.getAttribute('href'));
                            if (alvo) {
                                        alvo.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                    });
                                                    });

                                                    // 📱 Menu mobile
                                                    const menuBtn = document.getElementById('menuBtn');
                                                    let menuAberto = false;

                                                    if (menuBtn) {
                                                        menuBtn.addEventListener('click', () => {
                                                                menuAberto = !menuAberto;
                                                                        if (menuAberto) {
                                                                                    alert('Menu aberto! Você pode adicionar um menu dropdown aqui.');
                                                                                            }
                                                                                                });
                                                                                                }

                                                                                                // ✨ Animação ao rolar a página
                                                                                                const observarElementos = document.querySelectorAll('section');

                                                                                                const observador = new IntersectionObserver((entradas) => {
                                                                                                    entradas.forEach(entrada => {
                                                                                                            if (entrada.isIntersecting) {
                                                                                                                        entrada.target.style.opacity = '1';
                                                                                                                                    entrada.target.style.transform = 'translateY(0)';
                                                                                                                                            }
                                                                                                                                                });
                                                                                                                                                }, { threshold: 0.1 });

                                                                                                                                                observarElementos.forEach(secao => {
                                                                                                                                                    secao.style.opacity = '0';
                                                                                                                                                        secao.style.transform = 'translateY(20px)';
                                                                                                                                                            secao.style.transition = 'all 0.6s ease-out';
                                                                                                                                                                observador.observe(secao);
                                                                                                                                                                });

                                                                                                                                                                // 📋 Confirmação de agendamento
                                                                                                                                                                const botoesAgendar = document.querySelectorAll('button, a[href*="whatsapp"]');
                                                                                                                                                                botoesAgendar.forEach(botao => {
                                                                                                                                                                    botao.addEventListener('click', function() {
                                                                                                                                                                            if (this.textContent.includes('Agendar') || this.textContent.includes('WhatsApp')) {
                                                                                                                                                                                        console.log('Usuário quer agendar um horário!');
                                                                                                                                                                                                }
                                                                                                                                                                                                    });
                                                                                                                                                                                                    });
                                                                                                                                                                                                    