document.querySelectorAll('.like-button').forEach((button) => {
      button.addEventListener('click', () => {
          const post = button.closest('.post');
              const count = post.querySelector('.like-count');
                  const liked = button.getAttribute('aria-pressed') === 'true';
                      const numericCount = Number(count.textContent.replace('.', ''));

                          button.setAttribute('aria-pressed', String(!liked));
                              button.classList.toggle('liked', !liked);
                                  button.textContent = liked ? '♡' : '♥';
                                      count.textContent = (numericCount + (liked ? -1 : 1)).toLocaleString('pt-BR');
                                        });
                                        });

                                        document.querySelectorAll('.save-button').forEach((button) => {
                                          button.addEventListener('click', () => {
                                              const saved = button.getAttribute('aria-pressed') === 'true';
                                                  button.setAttribute('aria-pressed', String(!saved));
                                                      button.textContent = saved ? '♧' : '▣';
                                                          button.style.color = saved ? '' : '#f5f5f5';
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
                                                                                          comment.innerHTML = `<strong>meu.perfil</strong> ${escapeHTML(text)}`;
                                                                                              form.before(comment);
                                                                                                  input.value = '';
                                                                                                    });
                                                                                                    });

                                                                                                    function escapeHTML(value) {
                                                                                                      return value.replace(/[&<>"']/g, (character) => ({
                                                                                                          '&': '&amp;',
                                                                                                              '<': '&lt;',
                                                                                                                  '>': '&gt;',
                                                                                                                      '"': '&quot;',
                                                                                                                          "'": '&#39;'
                                                                                                                            })[character]);
                                                                                                                            }
                                                                                                                            
})