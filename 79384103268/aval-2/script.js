const postList = document.getElementById('postList');
const composer = document.getElementById('composer');
const postText = document.getElementById('postText');
const feedSort = document.getElementById('feedSort');

[...postList.querySelectorAll('.post')].forEach((post, index, posts) => {
  post.dataset.order = String(posts.length - index);
  });

  postList.addEventListener('click', (event) => {
    const likeButton = event.target.closest('.like-button');
      if (likeButton) {
          const post = likeButton.closest('.post');
              const count = post.querySelector('.like-count');
                  const liked = likeButton.getAttribute('aria-pressed') === 'true';
                      const updatedCount = Number(count.textContent) + (liked ? -1 : 1);

                          count.textContent = updatedCount;
                              post.dataset.likes = updatedCount;
                                  likeButton.setAttribute('aria-pressed', String(!liked));
                                      likeButton.classList.toggle('liked', !liked);
                                          likeButton.innerHTML = `<span>${liked ? '♡' : '♥'}</span> ${liked ? 'Curtir' : 'Curtido'}`;
                                              return;
                                                }

                                                  if (event.target.closest('.comment-button')) {
                                                      postText.focus();
                                                          postText.placeholder = 'Escreva algo para iniciar a conversa...';
                                                              return;
                                                                }

                                                                  if (event.target.closest('.share-button')) {
                                                                      const button = event.target.closest('.share-button');
                                                                          button.innerHTML = '<span>✓</span> Compartilhado';
                                                                              window.setTimeout(() => {
                                                                                    button.innerHTML = '<span>↗</span> Compartilhar';
                                                                                        }, 1600);
                                                                                          }
                                                                                          });

                                                                                          composer.addEventListener('submit', (event) => {
                                                                                            event.preventDefault();
                                                                                              const message = postText.value.trim();
                                                                                                if (!message) {
                                                                                                    postText.focus();
                                                                                                        return;
                                                                                                          }

                                                                                                            const post = document.createElement('article');
                                                                                                              post.className = 'post card';
                                                                                                                post.dataset.likes = '0';
                                                                                                                  post.dataset.order = String(Math.max(0, ...[...postList.querySelectorAll('.post')].map((item) => Number(item.dataset.order))) + 1);
                                                                                                                    post.innerHTML = `
                                                                                                                        <div class="post-header">
                                                                                                                              <span class="avatar avatar-you">V</span>
                                                                                                                                    <div class="post-author"><strong>Você</strong><span>agora <b>·</b> Comunidade</span></div>
                                                                                                                                          <button class="more-button" type="button" aria-label="Mais opções da publicação">···</button>
                                                                                                                                              </div>
                                                                                                                                                  <p class="post-copy"></p>
                                                                                                                                                      <div class="post-stats"><span class="like-summary">♥ <span class="like-count">0</span> curtidas</span><span>0 comentários</span></div>
                                                                                                                                                          <div class="post-actions">
                                                                                                                                                                <button class="like-button" type="button" aria-pressed="false"><span>♡</span> Curtir</button>
                                                                                                                                                                      <button class="comment-button" type="button"><span>▢</span> Comentar</button>
                                                                                                                                                                            <button class="share-button" type="button"><span>↗</span> Compartilhar</button>
                                                                                                                                                                                </div>`;
                                                                                                                                                                                  post.querySelector('.post-copy').textContent = message;
                                                                                                                                                                                    postList.prepend(post);
                                                                                                                                                                                      postText.value = '';
                                                                                                                                                                                        postText.placeholder = 'O que está rolando no futebol?';
                                                                                                                                                                                          post.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                                                                                                                                          });

                                                                                                                                                                                          feedSort.addEventListener('change', () => {
                                                                                                                                                                                            const posts = [...postList.querySelectorAll('.post')];
                                                                                                                                                                                              if (feedSort.value === 'popular') {
                                                                                                                                                                                                  posts.sort((a, b) => Number(b.dataset.likes) - Number(a.dataset.likes));
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                        posts.sort((a, b) => Number(b.dataset.order) - Number(a.dataset.order));
                                                                                                                                                                                                          }

                                                                                                                                                                                                            posts.forEach((post) => postList.append(post));
                                                                                                                                                                                                            });
                                                                                                                                                                                                            