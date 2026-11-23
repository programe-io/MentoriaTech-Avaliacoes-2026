// 1. Selecionando os elementos do HTML
const btnSeguir = document.querySelector('.btn-primario');
const btnMensagem = document.querySelector('.btn-secundario');
const nomeUsuario = document.querySelector('.nome').textContent;

// 2. Variável de controle de estado
let estaSeguindo = false;

// 3. Evento de clique no botão "Seguir"
btnSeguir.addEventListener('click', () => {
  estaSeguindo = !estaSeguindo; // Inverte o estado (true/false)

    if (estaSeguindo) {
        btnSeguir.textContent = 'Seguindo ✓';
            btnSeguir.style.backgroundColor = '#16a34a'; // Muda para verde
              } else {
                  btnSeguir.textContent = 'Seguir';
                      btnSeguir.style.backgroundColor = ''; // Volta para a cor original do CSS
                        }
                        });

                        // 4. Evento de clique no botão "Mensagem"
                        btnMensagem.addEventListener('click', () => {
                          const mensagem = prompt(`Escreva sua mensagem para ${nomeUsuario}:`);

                            // Verifica se o usuário digitou algo e não apenas espaços em branco
                              if (mensagem && mensagem.trim() !== '') {
                                  alert(`Mensagem enviada com sucesso para ${nomeUsuario}!\n\n"${mensagem}"`);
                                    } else if (mensagem !== null) {
                                        alert('Por favor, digite uma mensagem antes de enviar.');
                                          }
                                          });
                                          