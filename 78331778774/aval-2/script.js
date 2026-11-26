// 1 - CURTIR POST - clica no coração e ele fica vermelho
document.querySelectorAll('.acoes').forEach(function(acoes) {
  let coracao = acoes.querySelector('span');
    let curtido = false;
      let contador = acoes.parentElement.querySelector('p b');

        coracao.style.cursor = 'pointer';
          coracao.addEventListener('click', function() {
              curtido = !curtido;
                  if (curtido) {
                        coracao.textContent = '❤️';
                              coracao.style.transform = 'scale(1.4)';
                                    setTimeout(function(){ coracao.style.transform = 'scale(1)'; }, 200);
                                        } else {
                                              coracao.textContent = '🤍';
                                                  }
                                                    });
                                                    });

                                                    // 2 - BOTÃO SEGUIR / SEGUINDO
                                                    document.querySelectorAll('.sugestao button').forEach(function(btn) {
                                                      btn.addEventListener('click', function() {
                                                          if (btn.textContent === 'Seguir') {
                                                                btn.textContent = 'Seguindo';
                                                                      btn.style.color = 'gray';
                                                                          } else {
                                                                                btn.textContent = 'Seguir';
                                                                                      btn.style.color = '#0095f6';
                                                                                          }
                                                                                            });
                                                                                            });

                                                                                            // 3 - BOTÃO TROCAR PERFIL
                                                                                            let btnTrocar = document.querySelector('.meu-perfil button');
                                                                                            if (btnTrocar) {
                                                                                              btnTrocar.addEventListener('click', function() {
                                                                                                  let nome = prompt('Digite seu novo nome de usuário:');
                                                                                                      if (nome) {
                                                                                                            document.querySelector('.meu-perfil b').textContent = nome;
                                                                                                                  document.querySelector('.perfil-info h2').textContent = nome;
                                                                                                                        alert('Perfil atualizado para @' + nome);
                                                                                                                            }
                                                                                                                              });
                                                                                                                              }

                                                                                                                              // 4 - BOTÃO EDITAR PERFIL
                                                                                                                              let btnEditar = document.querySelector('.perfil-destaque button');
                                                                                                                              if (bt