// ========== TECHVERSE - JAVASCRIPT ==========

// 1. EFEITO DIGITAÇÃO NO TÍTULO
const titulo = document.querySelector('header h1');
const textoOriginal = titulo.textContent;
titulo.textContent = '';
let i = 0;

function digitar() {
  if (i < textoOriginal.length) {
      titulo.textContent += textoOriginal.charAt(i);
          i++;
              setTimeout(digitar, 90);
                }
                }
                digitar();

                // 2. PLANETAS SEGUEM O MOUSE
                const p1 = document.querySelector('.p1');
                const p2 = document.querySelector('.p2');

                document.addEventListener('mousemove', (e) => {
                  const x = (e.clientX / window.innerWidth - 0.5) * 30;
                    const y = (e.clientY / window.innerHeight - 0.5) * 30;

                      if (p1) p1.style.transform = `translate(${x}px, ${y}px)`;
                        if (p2) p2.style.transform = `translate(${-x}px, ${-y}px)`;
                        });

                        // 3. EFEITO 3D NOS CARDS QUANDO PASSA O MOUSE
                        const cards = document.querySelectorAll('.card');

                        cards.forEach(card => {
                          card.addEventListener('mousemove', (e) => {
                              const rect = card.getBoundingClientRect();
                                  const x = e.clientX - rect.left;
                                      const y = e.clientY - rect.top;

                                          const rotateX = (y / rect.height - 0.5) * -15;
                                              const rotateY = (x / rect.width - 0.5) * 15;

                                                  card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                                                    });

                                                      card.addEventListener('mouseleave', () => {
                                                          card.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
                                                            });

                                                              // 4. CLIQUE NOS CARDS
                                                                card.addEventListener('click', () => {
                                                                    const tema = card.querySelector('h3').textContent;
                                                                        alert(`Você entrou na galáxia: ${tema} 🚀`);
                                                                          });
                                                                          });

                                                                          // 5. CRIAR ESTRELAS CADENTES ALEATÓRIAS
                                                                          function criarEstrelaCadente() {
                                                                            const estrela = document.createElement('div');
                                                                              estrela.style.position = 'fixed';
                                                                                estrela.style.width = '80px';
                                                                                  estrela.style.height = '2px';
                                                                                    estrela.style.background = 'linear-gradient(90deg, #fff, transparent)';
                                                                                      estrela.style.top = Math.random() * 50 + '%';
                                                                                        estrela.style.left = Math.random() * 80 + '%';
                                                                                          estrela.style.transform = 'rotate(-45deg)';
                                                                                            estrela.style.zIndex = '0';
                                                                                              estrela.style.opacity = '1';
                                                                                                estrela.style.transition = 'all 1s';
                                                                                                  estrela.style.pointerEvents = 'none';

                                                                                                    document.body.appendChild(estrela);

                                                                                                      setTimeout(() => {
                                                                                                          estrela.style.transform = 'rotate(-45deg) translateX(-200px)';
                                                                                                              estrela.style.opacity = '0';
                                                                                                                }, 50);

                                                                                                                  setTimeout(() => estrela.remove(), 1100);
                                                                                                                  }

                                                                                                                  // Uma estrela cadente a cada 3 segundos
                                                                                                                  setInterval(criarEstrelaCadente, 3000);

                                                                                                                  // 6. BOTÃO EXPLORAR COM SCROLL SUAVE
                                                                                                                  const btn = document.querySelector('.btn');
                                                                                                                  if (btn) {
                                                                                                                    btn.addEventListener('click', (e) => {
                                                                                                                        e.preventDefault();
                                                                                                                            document.querySelector('#explorar').scrollIntoView({
                                                                                                                                  behavior: 'smooth'
                                                                                                                                      });
                                                                                                                                        });
                                                                                                                                        }

                                                                                                                                        console.log('TechVerse carregado com sucesso! 🌌');