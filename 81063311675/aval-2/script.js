const postList = document.getElementById('posts');
const postText = document.getElementById('postText');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
    toast.classList.add('visible');
      clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('visible'), 2300);
        }

        function attachPostActions(post) {
          const likeButton = post.querySelector('.like-button');
            likeButton.addEventListener('click', () => {
                const count = post.querySelector('.like-count');
                    const liked = likeButton.classList.toggle('liked');
                        count.textContent = Number(count.textContent) + (liked ? 1 : -1);
                            likeButton.innerHTML = `<span>${liked ? '♥' : '♡'}</span> ${liked ? 'Curtido' : 'Curtir'}`;
                              });

                                post.querySelector('.comment-button').addEventListener('click', () => {
                                    const input = post.querySelector('.comment-area input');
                                        input.focus();
                                          });

                                            const commentInput = post.querySelector('.comment-area input');
                                              const addComment = () => {
                                                  const text = commentInput.value.trim();
                                                      if (!text) return;
                                                          const comment = document.createElement('p');
                                                              comment.className = 'comment-item';
                                                                  const author = document.createElement('strong');
                                                                      author.textContent = 'Marina';
                                                                          comment.append(author, document.createTextNode(text));
                                                                              post.querySelector('.comments-list').append(comment);
                                                                                  commentInput.value = '';
                                                                                    };
                                                                                      post.querySelector('.send-comment').addEventListener('click', addComment);
                                                                                        commentInput.addEventListener('keydown', event => {
                                                                                            if (event.key === 'Enter') {
                                                                                                  event.preventDefault();
                                                                                                        addComment();
                                                                                                            }
                                                                                                              });

                                                                                                                post.querySelector('.share-button').addEventListener('click', async () => {
                                                                                                                    try {
                                                                                                                          await navigator.clipboard.writeText(window.location.href);
                                                                                                                                showToast('Link da página copiado!');
                                                                                                                                    } catch {
                                                                                                                                          showToast('Compartilhe esta publicação com seus amigos!');
                                                                                                                                              }
                                                                                                                                                });
                                                                                                                                                }

                                                                                                                                                function createPost(text) {
                                                                                                                                                  const post = document.createElement('article');
                                                                                                                                                    post.className = 'post card';
                                                                                                                                                      post.dataset.search = text.toLocaleLowerCase('pt-BR');

                                                                                                                                                        const header = document.createElement('div');
                                                                                                                                                          header.className = 'post-header';
                                                                                                                                                            header.innerHTML = '<div class="avatar avatar-me">M</div><div class="post-author"><strong>Marina Costa</strong><span>@marinacosta · agora</span></div><button class="more-button" aria-label="Mais opções">···</button>';
                                                                                                                                                              const copy = document.createElement('p');
                                                                                                                                                                copy.className = 'post-copy';
                                                                                                                                                                  copy.textContent = text;
                                                                                                                                                                    const engagement = document.createElement('div');
                                                                                                                                                                      engagement.className = 'post-engagement';
                                                                                                                                                                        engagement.innerHTML = '<span>♡ <b class="like-count">0</b> curtidas</span><span>0 comentários · 0 compartilhamentos</span>';
                                                                                                                                                                          const actions = document.createElement('div');
                                                                                                                                                                            actions.className = 'post-actions';
                                                                                                                                                                              actions.innerHTML = '<button class="like-button"><span>♡</span> Curtir</button><button class="comment-button"><span>▢</span> Comentar</button><button class="share-button"><span>↗</span> Compartilhar</button>';
                                                                                                                                                                                const comments = document.createElement('div');
                                                                                                                                                                                  comments.className = 'comment-area';
                                                                                                                                                                                    comments.innerHTML = '<input type="text" placeholder="Escreva um comentário..." aria-label="Escreva um comentário" /><button class="send-comment" aria-label="Enviar comentário">➤</button><div class="comments-list"></div>';
                                                                                                                                                                                      post.append(header, copy, engagement, actions, comments);
                                                                                                                                                                                        attachPostActions(post);
                                                                                                                                                                                          return post;
                                                                                                                                                                                          }

                                                                                                                                                                                          document.querySelectorAll('.post').forEach(attachPostActions);

                                                                                                                                                                                          document.getElementById('publishButton').addEventListener('click', () => {
                                                                                                                                                                                            const text = postText.value.trim();
                                                                                                                                                                                              if (!text) {
                                                                                                                                                                                                  postText.focus();
                                                                                                                                                                                                      showToast('Escreva algo antes de publicar 🙂');
                                                                                                                                                                                                          return;
                                                                                                                                                                                                            }
                                                                                                                                                                                                              postList.prepend(createPost(text));
                                                                                                                                                                                                                postText.value = '';
                                                                                                                                                                                                                  showToast('Sua publicação foi compartilhada! ✨');
                                                                                                                                                                                                                    document.getElementById('emptyState').hidden = true;
                                                                                                                                                                                                                    });

                                                                                                                                                                                                                    postText.addEventListener('keydown', event => {
                                                                                                                                                                                                                      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                                                                                                                                                                                                                          document.getElementById('publishButton').click();
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                            document.getElementById('searchInput').addEventListener('input', event => {
                                                                                                                                                                                                                              const query = event.target.value.trim().toLocaleLowerCase('pt-BR');
                                                                                                                                                                                                                                let visible = 0;
                                                                                                                                                                                                                                  postList.querySelectorAll('.post').forEach(post => {
                                                                                                                                                                                                                                      const matches = post.dataset.search.includes(query) || post.textContent.toLocaleLowerCase('pt-BR').includes(query);
                                                                                                                                                                                                                                          post.hidden = !matches;
                                                                                                                                                                                                                                              if (matches) visible++;
                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                  document.getElementById('emptyState').hidden = visible !== 0;
                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                  document.querySelectorAll('.follow-button').forEach(button => {
                                                                                                                                                                                                                                                    button.addEventListener('click', () => {
                                                                                                                                                                                                                                                        const following = button.classList.toggle('following');
                                                                                                                                                                                                                                                            button.textContent = following ? '✓' : '+';
                                                                                                                                                                                                                                                                button.setAttribute('aria-label', following ? 'Deixar de seguir' : 'Seguir');
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                  document.getElementById('photoButton').addEventListener('click', () => showToast('A publicação de fotos estará disponível em breve! 📷'));
                                                                                                                                                                                                                                                                  document.getElementById('moodButton').addEventListener('click', () => {
                                                                                                                                                                                                                                                                    postText.value = `${postText.value}${postText.value ? ' ' : ''}😊`;
                                                                                                                                                                                                                                                                      postText.focus();
                                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                                      document.getElementById('refreshSuggestions').addEventListener('click', () => showToast('Sugestões atualizadas!'));
                                                                                                                                                                                                                                                                      document.getElementById('sortButton').addEventListener('click', event => {
                                                                                                                                                                                                                                                                        const newest = event.currentTarget.dataset.newest !== 'true';
                                                                                                                                                                                                                                                                          event.currentTarget.dataset.newest = String(newest);
                                                                                                                                                                                                                                                                            event.currentTarget.innerHTML = newest ? 'Mais recentes <span>⌄</span>' : 'Mais relevantes <span>⌄</span>';
                                                                                                                                                                                                                                                                              showToast(newest ? 'Exibindo publicações recentes' : 'Exibindo publicações relevantes');
                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                              document.querySelectorAll('.story').forEach(story => {
                                                                                                                                                                                                                                                                                story.addEventListener('click', () => showToast(story.classList.contains('add-story') ? 'Compartilhe um momento com seus amigos! ✨' : 'Este story estará disponível em breve!'));
                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                