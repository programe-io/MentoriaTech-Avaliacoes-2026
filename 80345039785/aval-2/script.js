document.querySelectorAll('.like-button').forEach((button) => {
        button.addEventListener('click', () => {
                const liked = button.getAttribute('aria-pressed') === 'true';
                        button.setAttribute('aria-pressed', String(!liked));
                                button.classList.toggle('is-liked', !liked);
                                        button.querySelector('span').textContent = liked ? '♡' : '♥';

                                                const count = button.closest('.post').querySelector('.likes-count');
                                                        const current = Number(count.textContent.replace(/\D/g, ''));
                                                                const updated = current + (liked ? -1 : 1);
                                                                        count.textContent = `${updated.toLocaleString('pt-BR')} curtidas`;
                                                                            });
                                                                            });

                                                                            document.querySelector('.follow-button').addEventListener('click', (event) => {
                                                                                const button = event.currentTarget;
                                                                                    const following = button.classList.toggle('is-following');
                                                                                        button.textContent = following ? 'Seguindo ✓' : 'Seguir';
                                                                                        });

                                                                                        document.querySelector('.comment-form').addEventListener('submit', (event) => {
                                                                                            event.preventDefault();
                                                                                                const input = event.currentTarget.querySelector('input');
                                                                                                    const comment = input.value.trim();
                                                                                                        if (!comment) return;

                                                                                                            const commentsLink = document.querySelector('.comments-link');
                                                                                                                const commentElement = document.createElement('p');
                                                                                                                    commentElement.className = 'new-comment';
                                                                                                                        commentElement.innerHTML = `<strong>Você</strong> ${escapeHTML(comment)}`;
                                                                                                                            commentsLink.before(commentElement);
                                                                                                                                input.value = '';
                                                                                                                                });

                                                                                                                                function escapeHTML(text) {
                                                                                                                                    const element = document.createElement('span');
                                                                                                                                        element.textContent = text;
                                                                                                                                            return element.innerHTML;
                                                                                                                                            }
                                                                                                                                            
})