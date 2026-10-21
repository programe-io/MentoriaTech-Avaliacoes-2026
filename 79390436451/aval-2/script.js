const postForm = document.getElementById('postForm');
const postText = document.getElementById('postText');
const posts = document.getElementById('posts');

function createPost(text) {
  const article = document.createElement('article');
    article.className = 'post-card';

      const header = document.createElement('div');
        header.className = 'post-header';
          header.innerHTML = `
              <div class="avatar avatar-you">A</div>
                  <div class="post-author"><strong>Alex Silva</strong><span>@alexsilva · agora</span></div>
                      <button class="more-button" type="button" aria-label="Mais opções">···</button>
                        `;

                          const copy = document.createElement('p');
                            copy.className = 'post-copy';
                              copy.textContent = text;

                                const actions = document.createElement('div');
                                  actions.className = 'post-actions';
                                    actions.innerHTML = `
                                        <button class="like-button" type="button" aria-pressed="false"><span class="heart">♡</span> <span class="like-count">0</span></button>
                                            <button class="action-button" type="button"><span>◯</span> 0 comentários</button>
                                                <button class="share-button" type="button" aria-label="Compartilhar publicação">↗</button>
                                                  `;

                                                    article.append(header, copy, actions);
                                                      return article;
                                                      }

                                                      postForm.addEventListener('submit', (event) => {
                                                        event.preventDefault();
                                                          const text = postText.value.trim();
                                                            if (!text) return;

                                                              posts.prepend(createPost(text));
                                                                postForm.reset();
                                                                });

                                                                document.addEventListener('click', (event) => {
                                                                  const likeButton = event.target.closest('.like-button');
                                                                    if (!likeButton) return;

                                                                      const liked = likeButton.getAttribute('aria-pressed') === 'true';
                                                                        const count = likeButton.querySelector('.like-count');
                                                                          const currentCount = Number(count.textContent);

                                                                            likeButton.setAttribute('aria-pressed', String(!liked));
                                                                              likeButton.classList.toggle('liked', !liked);
                                                                                count.textContent = String(currentCount + (liked ? -1 : 1));
                                                                                  likeButton.querySelector('.heart').textContent = liked ? '♡' : '♥';
                                                                                  });
                                                                                  