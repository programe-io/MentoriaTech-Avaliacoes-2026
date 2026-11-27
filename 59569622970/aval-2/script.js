script.js

// Interações extras, locais e sem servidor. textContent evita interpretar HTML digitado.

const posts = document.querySelector('#posts');

document.querySelector('#publish').addEventListener('submit', event => {

  event.preventDefault();

    const input = document.querySelector('#post-text');

      const text = input.value.trim();

        if (!text) { input.setCustomValidity('Escreva uma ideia antes de publicar.'); 
        input.reportValidity(); return; }

          input.setCustomValidity('');

            const article = document.createElement('article'); article.className = 'card post';

              article.innerHTML = '<header class="post-header"><div class="avatar">C</div><div><strong>Cauã 
              Matheus Gomes Fernandes</strong><span>Agora · publicação local</span></div></header><p 
              class="post-text"></p><div class="post-actions"><button type="button" data-like aria-
              pressed="false">Curtir <span>0</span></button><button type="button" data-
              comment>Comentar</button></div><div class="comments" aria-live="polite"></div><form 
              class="comment-form" hidden><label>Seu comentário<input required 
              maxlength="280"></label><button>Adicionar comentário</button></form>';

                article.querySelector('.post-text').textContent = text;

                  posts.prepend(article); input.value = ''; document.querySelector('#status').textContent = 
                  'Publicação adicionada ao feed local.';

                  });

                  document.querySelector('#post-text').addEventListener('input', event => 
                  event.target.setCustomValidity(''));

                  posts.addEventListener('click', event => {

                    const like = event.target.closest('[data-like]');

                      if (like) { const active = like.getAttribute('aria-pressed') === 'true'; 
                      like.setAttribute('aria-pressed', String(!active)); like.querySelector('span').textContent = 
                      active ? '0' : '1'; }

                        const comment = event.target.closest('[data-comment]');

                          if (comment) { const form = comment.closest('article').querySelector('form'); form.hidden = 
                          !form.hidden; if (!form.hidden) form.querySelector('input').focus(); }

                          });

                          posts.addEventListener('submit', event => {

                            event.preventDefault(); const form = event.target; const input = form.querySelector('input');

                              if (!input.value.trim()) return;

                                const p = document.createElement('p'); p.textContent = 'Você: ' + input.value.trim(); 
                                form.closest('article').querySelector('.comments').append(p); input.value = '';

                                });



                                // Identificação local do projeto; não envia dados.

                                const aluno = "Cauã Matheus Gomes Fernandes";




                                