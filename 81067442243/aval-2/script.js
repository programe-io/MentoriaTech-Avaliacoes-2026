const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const postList = document.getElementById('postList');

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
    const content = postText.value.trim();
      if (!content) return;

        const post = document.createElement('article');
          post.className = 'post';
            post.innerHTML = `
                <div class="post-header">
                      <div class="avatar">V</div>
                            <div class="post-author"><strong>Você</strong><span>agora · <span class="public-icon">◎</span> Público</span></div>
                                  <button class="more-button" aria-label="Mais opções">···</button>
                                      </div>
                                          <p class="post-copy"></p>
                                              <div class="post-reactions"><span>💜</span> <span class="like-count">0 curtidas</span><span class="comment-count">0 comentários</span></div>
                                                  <div class="post-actions"><button class="like-button" type="button" aria-pressed="false">♡ <span>Curtir</span></button><button type="button" class="comment-button">▱ <span>Comentar</span></button><button type="button" class="share-button">↗ <span>Compartilhar</span></button></div>
                                                    `;
                                                      post.querySelector('.post-copy').textContent = content;
                                                        postList.prepend(post);
                                                          postForm.reset();
                                                          });

                                                          postList.addEventListener('click', (event) => {
                                                            const button = event.target.closest('.like-button');
                                                              if (!button) return;

                                                                const post = button.closest('.post');
                                                                  const count = post.querySelector('.like-count');
                                                                    const liked = button.getAttribute('aria-pressed') === 'true';
                                                                      const currentCount = Number.parseInt(count.textContent, 10) || 0;
                                                                        const nextCount = currentCount + (liked ? -1 : 1);

                                                                          button.setAttribute('aria-pressed', String(!liked));
                                                                            button.classList.toggle('liked', !liked);
                                                                              button.innerHTML = `${liked ? '♡' : '♥'} <span>${liked ? 'Curtir' : 'Curtido'}</span>`;
                                                                                count.textContent = `${nextCount} ${nextCount === 1 ? 'curtida' : 'curtidas'}`;
                                                                                });
                                                                                