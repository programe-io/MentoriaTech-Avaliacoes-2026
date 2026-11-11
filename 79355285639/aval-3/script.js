const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
    toast.classList.add('show');
      clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
        }

        document.querySelectorAll('.like-button').forEach((button) => {
          button.addEventListener('click', () => {
              const post = button.closest('.post');
                  const count = post.querySelector('.likes-count');
                      const liked = button.classList.toggle('liked');
                          const current = Number(count.dataset.count || count.textContent.replace(/[^0-9]/g, ''));
                              const updated = current + (liked ? 1 : -1);
                                  count.dataset.count = updated;
                                      count.textContent = `${updated.toLocaleString('pt-BR')} curtidas`;
                                        });
                                        });

                                        document.querySelectorAll('.save-button').forEach((button) => {
                                          button.addEventListener('click', () => {
                                              const saved = button.classList.toggle('saved');
                                                  button.setAttribute('aria-label', saved ? 'Remover dos salvos' : 'Salvar');
                                                      showToast(saved ? 'Publicação salva.' : 'Publicação removida dos salvos.');
                                                        });
                                                        });

                                                        document.querySelectorAll('.comment-focus').forEach((button) => {
                                                          button.addEventListener('click', () => button.closest('.post').querySelector('.comment-form input').focus());
                                                          });

                                                          document.querySelectorAll('.share-button').forEach((button) => {
                                                            button.addEventListener('click', () => showToast('Link da publicação copiado!'));
                                                            });

                                                            document.querySelectorAll('.comment-form').forEach((form) => {
                                                              form.addEventListener('submit', (event) => {
                                                                  event.preventDefault();
                                                                      const input = form.querySelector('input');
                                                                          const text = input.value.trim();
                                                                              if (!text) return;
                                                                                  const comment = document.createElement('p');
                                                                                      const username = document.createElement('strong');
                                                                                          username.textContent = 'meu.perfil ';
                                                                                              comment.append(username, document.createTextNode(text));
                                                                                                  form.previousElementSibling.append(comment);
                                                                                                      input.value = '';
                                                                                                          showToast('Comentário publicado.');
                                                                                                            });
                                                                                                            });

                                                                                                            document.querySelectorAll('.follow-button, .follow-inline').forEach((button) => {
                                                                                                              button.addEventListener('click', () => {
                                                                                                                  const following = button.dataset.following !== 'true';
                                                                                                                      button.dataset.following = String(following);
                                                                                                                          button.textContent = following ? 'Seguindo' : 'Seguir';
                                                                                                                              button.classList.toggle('following', following);
                                                                                                                                });
                                                                                                                                });

                                                                                                                                document.querySelectorAll('.story').forEach((story) => {
                                                                                                                                  story.addEventListener('click', () => showToast(`Story de ${story.dataset.story}`));
                                                                                                                                  });

                                                                                                                                  document.querySelectorAll('.emoji-button').forEach((button) => {
                                                                                                                                    button.addEventListener('click', () => {
                                                                                                                                        const input = button.closest('.comment-form').querySelector('input');
                                                                                                                                            input.value += '😊';
                                                                                                                                                input.focus();
                                                                                                                                                  });
                                                                                                                                                  });

                                                                                                                                                  document.getElementById('createButton').addEventListener('click', () => showToast('Criação de publicação selecionada.'));
                                                                                                                                                  document.getElementById('mobileCreate').addEventListener('click', () => showToast('Criação de publicação selecionada.'));
                                                                                                                                                  document.querySelectorAll('.post-menu').forEach((button) => button.addEventListener('click', () => showToast('Mais opções da publicação.')));
                                                                                                                                                  document.querySelectorAll('.more-text, .view-comments').forEach((button) => button.addEventListener('click', () => button.closest('.post').querySelector('.comment-form input').focus()));
                                                                                                                                                  