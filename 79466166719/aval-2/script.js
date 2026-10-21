const postsContainer = document.getElementById('posts');
const postInput = document.getElementById('postText');
const publishButton = document.getElementById('publishButton');

function createPost(text) {
  const post = document.createElement('article');
    post.className = 'post card';

      const header = document.createElement('div');
        header.className = 'post-header';
          header.innerHTML = '<span class="avatar avatar-you">M</span><div class="post-author"><strong>Marina</strong><span>Agora · 🌎</span></div><button class="more-button" type="button" aria-label="Mais opções">···</button>';

            const copy = document.createElement('p');
              copy.className = 'post-copy';
                copy.textContent = text;

                  const stats = document.createElement('div');
                    stats.className = 'post-stats';
                      stats.innerHTML = '<span>💙 <b class="like-count">0</b></span><span>0 comentários</span>';

                        const actions = document.createElement('div');
                          actions.className = 'post-actions';
                            actions.innerHTML = '<button class="like-button" type="button"><span>♡</span> Curtir</button><button type="button" class="comment-button"><span>◯</span> Comentar</button><button type="button" class="share-button"><span>↗</span> Compartilhar</button>';

                              post.append(header, copy, stats, actions);
                                postsContainer.prepend(post);
                                }

                                publishButton.addEventListener('click', () => {
                                  const text = postInput.value.trim();
                                    if (!text) {
                                        postInput.focus();
                                            return;
                                              }

                                                createPost(text);
                                                  postInput.value = '';
                                                  });

                                                  postInput.addEventListener('keydown', (event) => {
                                                    if (event.key === 'Enter' && !event.shiftKey) {
                                                        event.preventDefault();
                                                            publishButton.click();
                                                              }
                                                              });

                                                              postsContainer.addEventListener('click', (event) => {
                                                                const button = event.target.closest('.like-button');
                                                                  if (!button) return;

                                                                    const count = button.closest('.post').querySelector('.like-count');
                                                                      const liked = button.classList.toggle('liked');
                                                                        button.querySelector('span').textContent = liked ? '♥' : '♡';
                                                                          count.textContent = Number(count.textContent) + (liked ? 1 : -1);
                                                                          });
                                                                          