// Seleciona os elementos do formulário e do feed
const formPost = document.getElementById('form-post');
const inputAutor = document.getElementById('autor-post');
const inputTexto = document.getElementById('texto-post');
const feed = document.getElementById('feed');

// Adiciona evento ao enviar o formulário
formPost.addEventListener('submit', function(evento) {
  evento.preventDefault(); // Evita o recarregamento da página

    const autor = inputAutor.value.trim();
      const texto = inputTexto.value.trim();

        if (autor === '' || texto === '') return;

          criarPostagem(autor, texto);

            // Limpa apenas o campo de texto para facilitar novas postagens
              inputTexto.value = '';
              });

              // Função que monta o HTML da nova postagem e adiciona no topo do feed
              function criarPostagem(autor, texto) {
                const inicial = autor.charAt(0).toUpperCase();
                  
                    const novoPost = document.createElement('article');
                      novoPost.classList.add('post');

                        novoPost.innerHTML = `
                            <header class="post-cabecalho">
                                  <div class="avatar">${inicial}</div>
                                        <div>
                                                <h2 class="post-autor">${autor}</h2>
                                                        <span class="post-hora">Agora mesmo</span>
                                                              </div>
                                                                  </header>
                                                                      <p class="post-conteudo">${texto}</p>
                                                                          <footer class="post-rodape">
                                                                                <button class="btn-curtir" onclick="alternarCurtida(this)">
                                                                                        ❤️ Curtir (<span class="contador">0</span>)
                                                                                              </button>
                                                                                                  </footer>
                                                                                                    `;

                                                                                                      // Insere a nova postagem antes da primeira postagem existente
                                                                                                        feed.prepend(novoPost);
                                                                                                        }

                                                                                                        // Função para curtir e descurtir postagens
                                                                                                        function alternarCurtida(botao) {
                                                                                                          const spanContador = botao.querySelector('.contador');
                                                                                                            let curtidas = parseInt(spanContador.textContent);

                                                                                                              if (botao.classList.contains('curtido')) {
                                                                                                                  botao.classList.remove('curtido');
                                                                                                                      curtidas--;
                                                                                                                        } else {
                                                                                                                            botao.classList.add('curtido');
                                                                                                                                curtidas++;
                                                                                                                                  }

                                                                                                                                    spanContador.textContent = curtidas;
                                                                                                                                    }
                                                                                                                                    