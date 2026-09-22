// Botão voltar ao topo
const btnTopo = document.getElementById('topo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
            btnTopo.classList.add('visible');
                } else {
                        btnTopo.classList.remove('visible');
                            }
                            });

                            btnTopo.addEventListener('click', () => {
                                window.scrollTo({
                                        top: 0,
                                                behavior: 'smooth'
                                                    });
                                                    });

                                                    // Smooth scroll para links do menu
                                                    document.querySelectorAll('nav a').forEach(link => {
                                                        link.addEventListener('click', (e) => {
                                                                e.preventDefault();
                                                                        const targetId = link.getAttribute('href');
                                                                                const target = document.querySelector(targetId);
                                                                                        if (target) {
                                                                                                    const offset = 70; // altura aproximada do nav sticky
                                                                                                                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                                                                                                                            window.scrollTo({
                                                                                                                                            top: top,
                                                                                                                                                            behavior: 'smooth'
                                                                                                                                                                        });
                                                                                                                                                                                }
                                                                                                                                                                                    });
                                                                                                                                                                                    });

                                                                                                                                                                                    // Interação simples na galeria
                                                                                                                                                                                    document.querySelectorAll('.gallery-item').forEach(item => {
                                                                                                                                                                                        item.addEventListener('click', () => {
                                                                                                                                                                                                const title = item.getAttribute('data-title');
                                                                                                                                                                                                        alert(`🎨 ${title}\n\nMomento icônico do Volume 1 de Demon Slayer!\n(Em breve mais imagens aqui)`);
                                                                                                                                                                                                            });
                                                                                                                                                                                                            });

                                                                                                                                                                                                            // Mensagem no console (só pra ficar legal)
                                                                                                                                                                                                            console.log('%c🗡️ Meu Blog de Mangá — Demon Slayer Volume 1', 'color: #c41e3a; font-size: 16px; font-weight: bold;');
                                                                                                                                                                                                            console.log('%cCriado por J.Gabriel • Site básico viuuuu', 'color: #a0a0a0; font-size: 12px;');
                                                                                                                                                                                                            