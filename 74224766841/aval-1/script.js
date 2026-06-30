// Navegação suave já funciona pelo CSS scroll-behavior

// Destacar link ativo no menu conforme scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                  current = section.getAttribute('id');
                      }
                        });

                          navLinks.forEach(link => {
                              link.classList.remove('active');
                                  if (link.getAttribute('href') === '#' + current) {
                                        link.classList.add('active');
                                            }
                                              });
                                              });

                                              // Efeito parallax sutil nas imagens
                                              window.addEventListener('scroll', () => {
                                                const scrolled = window.pageYOffset;
                                                  const parallax = document.querySelector('.info-block img');
                                                    if (parallax) {
                                                        parallax.style.transform = `translateY(${scrolled * 0.1}px)`;
                                                          }
                                                          });

                                                          // Animação de entrada nos cards
                                                          const observer = new IntersectionObserver((entries) => {
                                                            entries.forEach(entry => {
                                                                if (entry.isIntersecting) {
                                                                      entry.target.style.opacity = '1';
                                                                            entry.target.style.transform = 'translateY(0)';
                                                                                }
                                                                                  });
                                                                                  });

                                                                                  document.querySelectorAll('.card, .theory-card').forEach(card => {
                                                                                    card.style.opacity = '0';
                                                                                      card.style.transform = 'translateY(30px)';
                                                                                        card.style.transition = '0.6s';
                                                                                          observer.observe(card);
                                                                                          });

                                                                                          console.log('Cosmos carregado. Boa viagem pelo universo!');