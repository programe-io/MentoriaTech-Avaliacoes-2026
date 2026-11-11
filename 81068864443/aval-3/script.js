const toast = document.getElementById('toast');
let toastTimer;

function notify(message) {
  toast.textContent = message;
    toast.classList.add('show');
      clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2300);
        }

        document.querySelectorAll('.like-button').forEach((button) => {
          button.addEventListener('click', () => {
              const liked = button.classList.toggle('liked');
                  button.textContent = liked ? '♥' : '♡';
                      const count = button.closest('.post-card').querySelector('.likes-count');
                          const number = Number(count.textContent.replace(/\D/g, '')) + (liked ? 1 : -1);
                              count.textContent = `${number.toLocaleString('pt-BR')} curtidas`;
                                });
                                });

                                document.querySelectorAll('.save-button').forEach((button) => {
                                  button.addEventListener('click', () => {
                                      const saved = button.classList.toggle('saved');
                                          button.textContent = saved ? '♟' : '♧';
                                              notify(saved ? 'Guardamos esse momento pra você ♡' : 'Publicação removida dos salvos');
                                                });
                                                });

                                                document.querySelectorAll('.follow-button').forEach((button) => {
                                                  button.addEventListener('click', () => {
                                                      const following = button.classList.toggle('following');
                                                          button.textContent = following ? 'Seguindo' : 'Seguir';
                                                            });
                                                            });

                                                            document.querySelectorAll('.story').forEach((story) => {
                                                              story.addEventListener('click', () => {
                                                                  const modal = document.getElementById('storyModal');
                                                                      const name = story.dataset.story;
                                                                          document.getElementById('storyName').textContent = name;
                                                                              modal.classList.add('open');
                                                                                  modal.setAttribute('aria-hidden', 'false');
                                                                                    });
                                                                                    });

                                                                                    function closeStory() {
                                                                                      const modal = document.getElementById('storyModal');
                                                                                        modal.classList.remove('open');
                                                                                          modal.setAttribute('aria-hidden', 'true');
                                                                                          }
                                                                                          document.querySelector('.modal-close').addEventListener('click', closeStory);
                                                                                          document.getElementById('storyModal').addEventListener('click', (event) => {
                                                                                            if (event.target.id === 'storyModal') closeStory();
                                                                                            });
                                                                                            document.addEventListener('keydown', (event) => {
                                                                                              if (event.key === 'Escape') closeStory();
                                                                                              });

                                                                                              document.querySelectorAll('.comment-button').forEach((button) => {
                                                                                                button.addEventListener('click', () => button.closest('.post-card').querySelector('.inline-comment span').focus());
                                                                                                });
                                                                                                document.querySelectorAll('.send-comment').forEach((button) => {
                                                                                                  button.addEventListener('click', () => {
                                                                                                      const field = button.closest('.inline-comment').querySelector('[contenteditable="true"]');
                                                                                                          const message = field.textContent.trim();
                                                                                                              if (!message || message === 'deixe um carinho...') {
                                                                                                                    field.focus();
                                                                                                                          return;
                                                                                                                              }
                                                                                                                                  field.textContent = 'deixe um carinho...';
                                                                                                                                      notify('Seu carinho chegou 💌');
                                                                                                                                        });
                                                                                                                                        });

                                                                                                                                        document.querySelectorAll('.inline-comment [contenteditable="true"]').forEach((field) => {
                                                                                                                                          field.addEventListener('focus', () => {
                                                                                                                                              if (field.textContent.trim() === 'deixe um carinho...') field.textContent = '';
                                                                                                                                                });
                                                                                                                                                  field.addEventListener('blur', () => {
                                                                                                                                                      if (!field.textContent.trim()) field.textContent = 'deixe um carinho...';
                                                                                                                                                        });
                                                                                                                                                          field.addEventListener('keydown', (event) => {
                                                                                                                                                              if (event.key === 'Enter') {
                                                                                                                                                                    event.preventDefault();
                                                                                                                                                                          field.closest('.inline-comment').querySelector('.send-comment').click();
                                                                                                                                                                              }
                                                                                                                                                                                });
                                                                                                                                                                                });
                                                                                                                                                                                document.querySelectorAll('.share-button').forEach((button) => {
                                                                                                                                                                                  button.addEventListener('click', () => notify('Link da publicação copiado!'));
                                                                                                                                                                                  });
                                                                                                                                                                                  document.querySelectorAll('.more-button').forEach((button) => {
                                                                                                                                                                                    button.addEventListener('click', () => notify('Tudo certo por aqui. Aproveite o feed ♡'));
                                                                                                                                                                                    });
                                                                                                                                                                                    document.querySelectorAll('.comments-link').forEach((button) => {
                                                                                                                                                                                      button.addEventListener('click', () => notify('Os comentários estão cheios de carinho 💬'));
                                                                                                                                                                                      });

                                                                                                                                                                                      ['searchNav', 'mobileSearch', 'bottomSearch'].forEach((id) => {
                                                                                                                                                                                        document.getElementById(id).addEventListener('click', () => notify('A busca está esperando por você 🔎'));
                                                                                                                                                                                        });
                                                                                                                                                                                        ['messagesButton', 'mobileMessages'].forEach((id) => {
                                                                                                                                                                                          document.getElementById(id).addEventListener('click', () => notify('Você tem mensagens cheias de carinho 💌'));
                                                                                                                                                                                          });
                                                                                                                                                                                          ['notificationsButton', 'bottomActivity'].forEach((id) => {
                                                                                                                                                                                            document.getElementById(id).addEventListener('click', () => notify('Você está em dia com as novidades ♡'));
                                                                                                                                                                                            });
                                                                                                                                                                                            ['createButton', 'bottomCreate'].forEach((id) => {
                                                                                                                                                                                              document.getElementById(id).addEventListener('click', () => notify('Uma nova lembrança merece ser compartilhada ✨'));
                                                                                                                                                                                              });
                                                                                                                                                                                              document.getElementById('switchAccount').addEventListener('click', () => notify('Só existe uma versão de você — e ela já é incrível ♡'));
                                                                                                                                                                                              document.getElementById('refreshSuggestions').addEventListener('click', () => notify('Mais pessoas legais estão chegando por aqui ✨'));
                                                                                                                                                                                              