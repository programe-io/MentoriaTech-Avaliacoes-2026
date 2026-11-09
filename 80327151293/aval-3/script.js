// JavaScript - Perfil Paty Nordestina | Prova Desenvolvimento de Sistemas
const btnSeguir = document.getElementById('btnSeguir');
let seguindo = false;

// Botão seguir / seguindo
btnSeguir.addEventListener('click', () => {
  seguindo = !seguindo;
    if (seguindo) {
        btnSeguir.textContent = 'Seguindo';
            btnSeguir.classList.remove('bg‑serra');
                btnSeguir.classList.add('bg‑gray‑200', 'text‑barro');
                  } else {
                      btnSeguir.textContent = 'Seguir';
                          btnSeguir.classList.add('bg‑serra');
                              btnSeguir.classList.remove('bg‑gray‑200', 'text‑barro');
                                }
                                });

                                // Efeito curtir nas postagens
                                const botoesCurtir = document.querySelectorAll('.btn‑curtir');
                                botoesCurtir.forEach(botao => {
                                  let curtido = false;
                                    botao.addEventListener('click', () => {
                                        curtido = !curtido;
                                            if(curtido) {
                                                  botao.classList.add('coracao‑ativo');
                                                        botao.innerHTML = '<i class="bx bxs‑heart"></i>';
                                                            } else {
                                                                  botao.classList.remove('coracao‑ativo');
                                                                        botao.innerHTML = '<i class="bx bx‑heart"></i>';
                                                                            }
                                                                              });
                                                                              });

                                                                              // Efeito ao clicar nas fotos do perfil
                                                                              const fotos = document.querySelectorAll('.grid‑perfil img');
                                                                              fotos.forEach(foto => {
                                                                                foto.addEventListener('click', () => {
                                                                                    foto.style.transform = 'scale(0.95)';
                                                                                        setTimeout(() => {
                                                                                              foto.style.transform = 'scale(1)';
                                                                                                  }, 150);
                                                                                                    });
                                                                                                    });
                                                                                                    