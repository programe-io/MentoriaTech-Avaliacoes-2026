const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const postList = document.getElementById('postList');

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
    const text = postText.value.trim();
      if (!text) return;

        const article = document.createElement('article');
          article.className = 'post-card';

            const header = document.createElement('div');
              header.className = 'post-header';
                header.innerHTML = '<div class="author"><span class="avatar avatar-me">M</span><div><h2>Você</h2><p>@meu.perfil <span>·</span> agora</p></div></div><button class="more-button" type="button" aria-label="Mais opções">···</button>';

                  const copy = document.createElement('p');
                    copy.className = 'post-copy';
                      copy.textContent = text;

                        const actions = document.createElement('div');
                          actions.className = 'post-actions';
                            actions.innerHTML = '<button class="action-button like-button" type="button" aria-pressed="false"><span class="heart">♡</span> <span class="like-count">0</span> curtidas</button><button class="action-button comment-button" type="button"><span>▢</span> 0 comentários</button><button class="action-button share-button" type="button" aria-label="Compartilhar publicação">↗</button>';

                              article.append(header, copy, actions);
                                postList.prepend(article);
                                  postText.value = '';
                                  });

                                  postList.addEventListener('click', (event) => {
                                    const button = event.target.closest('.like-button');
                                      if (!button) return;

                                        const liked = button.getAttribute('aria-pressed') === 'true';
                                          const count = button.querySelector('.like-count');
                                            const nextCount = Number(count.textContent) + (liked ? -1 : 1);
                                              count.textContent = String(Math.max(0, nextCount));
                                                button.setAttribute('aria-pressed', String(!liked));
                                                  button.classList.toggle('liked', !liked);
                                                    button.querySelector('.heart').textContent = liked ? '♡' : '♥';
                                                    });
                                                    