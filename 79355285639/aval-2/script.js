const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const charCount = document.getElementById('charCount');
const posts = document.getElementById('publicacoes');

postText.addEventListener('input', () => {
  charCount.textContent = `${postText.value.length} / 280`;
  });

  postForm.addEventListener('submit', (event) => {
    event.preventDefault();
      const text = postText.value.trim();
        if (!text) return;

          const post = document.createElement('article');
            post.className = 'post';
              post.innerHTML = `
                  <div class="post-header">
                        <div class="avatar avatar-you">VC</div>
                              <div class="post-author"><h2>Você</h2><time>Agora</time></div>
                                    <button class="more-button" aria-label="Mais opções">···</button>
                                        </div>
                                            <p class="post-text"></p>
                                                <div class="post-stats"><span>♡ <span class="like-count">0</span> curtidas</span><span>0 comentários</span></div>
                                                    <div class="post-actions"><button class="like-button" type="button">♡ <span>Curtir</span></button><button type="button" class="comment-button">▢ <span>Comentar</span></button></div>
                                                      `;
                                                        post.querySelector('.post-text').textContent = text;
                                                          posts.prepend(post);
                                                            postForm.reset();
                                                              charCount.textContent = '0 / 280';
                                                              });

                                                              posts.addEventListener('click', (event) => {
                                                                const button = event.target.closest('.like-button');
                                                                  if (!button) return;

                                                                    const liked = button.classList.toggle('liked');
                                                                      const count = button.closest('.post').querySelector('.like-count');
                                                                        count.textContent = Number(count.textContent) + (liked ? 1 : -1);
                                                                          button.querySelector('span').textContent = liked ? 'Curtido' : 'Curtir';
                                                                          });
                                                                          