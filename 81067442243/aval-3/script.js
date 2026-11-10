document.querySelectorAll('.like-button').forEach((button) => {
  button.addEventListener('click', () => {
      const liked = button.getAttribute('aria-pressed') !== 'true';
          const post = button.closest('.post');
              const count = post.querySelector('.like-count');
                  const current = Number(count.textContent.replace('.', ''));
                      button.setAttribute('aria-pressed', String(liked));
                          button.classList.toggle('liked', liked);
                              button.textContent = liked ? '♥' : '♡';
                                  count.textContent = (current + (liked ? 1 : -1)).toLocaleString('pt-BR');
                                    });
                                    });

                                    document.querySelectorAll('.save-button').forEach((button) => {
                                      button.addEventListener('click', () => {
                                          const saved = button.getAttribute('aria-pressed') !== 'true';
                                              button.setAttribute('aria-pressed', String(saved));
                                                  button.classList.toggle('saved', saved);
                                                      button.textContent = saved ? '▣' : '♧';
                                                        });
                                                        });

                                                        document.querySelectorAll('.comment-focus').forEach((button) => {
                                                          button.addEventListener('click', () => {
                                                              button.closest('.post').querySelector('.comment-form input').focus();
                                                                });
                                                                });

                                                                document.querySelectorAll('.comment-form').forEach((form) => {
                                                                  form.addEventListener('submit', (event) => {
                                                                      event.preventDefault();
                                                                          const input = form.querySelector('input');
                                                                              const text = input.value.trim();
                                                                                  if (!text) return;

                                                                                      const comment = document.createElement('p');
                                                                                          comment.className = 'caption new-comment';
                                                                                              comment.innerHTML = `<strong>marina.silva</strong> ${escapeHTML(text)}`;
                                                                                                  form.before(comment);
                                                                                                      input.value = '';
                                                                                                        });
                                                                                                        });

                                                                                                        function escapeHTML(value) {
                                                                                                          return value.replace(/[&<>"']/g, (character) => ({
                                                                                                              '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
                                                                                                                })[character]);
                                                                                                                }
                                                                                                                