// Seleciona todos os botões de "Acessar Aulas"
const botoes = document.querySelectorAll('.btn-acessar');

botoes.forEach((botao) => {
  botao.addEventListener('click', () => {
      // Pega a lista de aulas logo abaixo do botão clicado
          const listaAulas = botao.nextElementSibling;

              // Alterna entre mostrar e esconder a lista
                  if (listaAulas.style.display === 'none') {
                        listaAulas.style.display = 'block';
                              botao.textContent = 'Ocultar Aulas';
                                  } else {
                                        listaAulas.style.display = 'none';
                                              botao.textContent = 'Acessar Aulas';
                                                  }
                                                    });
                                                    });

                                                    // Marca a aula como concluída (risca o texto) ao clicar na caixinha
                                                    const checkboxes = document.querySelectorAll('.check-aula');

                                                    checkboxes.forEach((checkbox) => {
                                                      checkbox.addEventListener('change', () => {
                                                          const itemAula = checkbox.parentElement;
                                                              if (checkbox.checked) {
                                                                    itemAula.style.textDecoration = 'line-through';
                                                                          itemAula.style.color = '#64748b';
                                                                              } else {
                                                                                    itemAula.style.textDecoration = 'none';
                                                                                          itemAula.style.color = '#f8fafc';
                                                                                              }
                                                                                                });
                                                                                                });
                                                                                                