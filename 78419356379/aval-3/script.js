document.addEventListener('DOMContentLoaded', () => {
      const formPost = document.getElementById('form-post');
        const textoPost = document.getElementById('texto-post');
          const listaPosts = document.getElementById('lista-posts');
            const contadorCaracteres = document.getElementById('contador-caracteres');
              const LIMITE_CARACTERES = 280;

                // Atualiza contador de caracteres em tempo real
                  textoPost.addEventListener('input', () => {
                      const restantes = LIMITE_CARACTERES - textoPost.value.length;
                          contadorCaracteres.textContent = restantes;
                              contadorCaracteres.style.color = restantes < 20 ? '#e0245e' : '#65676b';
                                });

                                  // Publicar novo post
                                    formPost.addEventListener('submit', (evento) => {
                                        evento.preventDefault();

                                            const conteudo = textoPost.value.trim();
                                                if (!conteudo || conteudo.length > LIMITE_CARACTERES) return;

                                                    const novoPost = criarElementoPost('Você', conteudo);
                                                        listaPosts.prepend(novoPost); // Insere no topo do feed

                                                            // Limpa o campo e reseta o contador
                                                                textoPost.value = '';
                                                                    contadorCaracteres.textContent = LIMITE_CARACTERES;
                                                                      });

                                                                        // Função para montar o HTML seguro de uma nova postagem
                                                                          function criarElementoPost(autor, texto) {
                                                                              const article = document.createElement('article');
                                                                                  article.classList.add('post-card');

                                                                                      article.innerHTML = `
                                                                                            <header class="post-cabecalho">
                                                                                                    <img src="https://ui-avatars.com{encodeURIComponent(autor)}&background=0D8ABC&color=fff" alt="Avatar de ${autor}" class="avatar">
                                                                                                            <div class="post-info-autor">
                                                                                                                      <h2>${autor}</h2>
                                                                                                                                <time>Agora mesmo</time>
                                                                                                                                        </div>
                                                                                                                                              </header>
                                                                                                                                                    <div class="post-conteudo">
                                                                                                                                                            <p></p>
                                                                                                                                                                  </div>
                                                                                                                                                                        <footer class="post-rodape">
                                                                                                                                                                                <button type="button" class="btn-interacao btn-curtir" aria-pressed="false">
                                                                                                                                                                                          ❤️ <span class="contador-likes">0</span> Curtir
                                                                                                                                                                                                  </button>
                                                                                                                                                                                                          <button type="button" class="btn-interacao btn-comentar">
                                                                                                                                                                                                                    💬 Comentar
                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                  </footer>
                                                                                                                                                                                                                                      `;

                                                                                                                                                                                                                                          // Usa textContent para evitar injeção de HTML malicioso (XSS)
                                                                                                                                                                                                                                              article.querySelector('.post-conteudo p').textContent = texto;

                                                                                                                                                                                                                                                  return article;
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                      // Delegação de eventos para curtir postagens (existentes e novas)
                                                                                                                                                                                                                                                        listaPosts.addEventListener('click', (evento) => {
                                                                                                                                                                                                                                                            const btnCurtir = evento.target.closest('.btn-curtir');
                                                                                                                                                                                                                                                                if (!btnCurtir) return;

                                                                                                                                                                                                                                                                    const spanContador = btnCurtir.querySelector('.contador-likes');
                                                                                                                                                                                                                                                                        let likes = parseInt(spanContador.textContent, 10);
                                                                                                                                                                                                                                                                            const jaCurtiu = btnCurtir.classList.contains('curtido');

                                                                                                                                                                                                                                                                                if (jaCurtiu) {
                                                                                                                                                                                                                                                                                      likes--;
                                                                                                                                                                                                                                                                                            btnCurtir.classList.remove('curtido');
                                                                                                                                                                                                                                                                                                  btnCurtir.setAttribute('aria-pressed', 'false');
                                                                                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                                                                                            likes++;
                                                                                                                                                                                                                                                                                                                  btnCurtir.classList.add('curtido');
                                                                                                                                                                                                                                                                                                                        btnCurtir.setAttribute('aria-pressed', 'true');
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                spanContador.textContent = likes;
                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                  
})