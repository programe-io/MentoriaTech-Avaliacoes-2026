document.querySelectorAll('.like-button').forEach((button) => {
      button.addEventListener('click', () => {
          const isLiked = button.getAttribute('aria-pressed') === 'true';
              const post = button.closest('.post');
                  const count = post.querySelector('.likes-count');
                      const current = Number(count.textContent.match(/[\d.]+/)[0].replace('.', ''));
                          const updated = current + (isLiked ? -1 : 1);

                              button.setAttribute('aria-pressed', String(!isLiked));
                                  button.classList.toggle('liked', !isLiked);
                                      button.textContent = isLiked ? '♡' : '♥';
                                          count.textContent = `${updated.toLocaleString('pt-BR')} curtidas`;
                                            });
                                            });

                                            document.querySelectorAll('.save-button').forEach((button) => {
                                              button.addEventListener('click', () => {
                                                  const isSaved = button.getAttribute('aria-pressed') === 'true';
                                                      button.setAttribute('aria-pressed', String(!isSaved));
                                                          button.textContent = isSaved ? '♧' : '▣';
                                                            });
                                                            });

                                                            document.querySelectorAll('.comment-focus').forEach((button) => {
                                                              button.addEventListener('click', () => {
                                                                  button.closest('.post').querySelector('.comment-form input').focus();
                                                                    });
                                                                    });

                                                                    document.querySelectorAll('.comment-form').forEach((form) => {
                                                                      const input = form.querySelector('input');
                                                                        const publish = form.querySelector('button');

                                                                          input.addEventListener('input', () => {
                                                                              publish.disabled = input.value.trim().length === 0;
                                                                                });
                                                                                  publish.disabled = true;

                                                                                    form.addEventListener('submit', (event) => {
                                                                                        event.preventDefault();
                                                                                            const text = input.value.trim();
                                                                                                if (!text) return;

                                                                                                    const comment = document.createElement('p');
                                                                                                        comment.className = 'comment-line';
                                                                                                            const username = document.createElement('strong');
                                                                                                                username.textContent = 'marina.silva ';
                                                                                                                    comment.append(username, document.createTextNode(text));
                                                                                                                        form.parentElement.querySelector('.post-copy').insertBefore(comment, form.parentElement.querySelector('time'));
                                                                                                                            input.value = '';
                                                                                                                                publish.disabled = true;
                                                                                                                                  });
                                                                                                                                  });
                                                                                                                                  
})