document.querySelectorAll('.like-button').forEach(function (button) {
        button.addEventListener('click', function () {
                const count = button.closest('.post').querySelector('.like-count');
                        const currentlyLiked = button.getAttribute('aria-pressed') === 'true';
                                const initialCount = Number.parseInt(count.textContent, 10);
                                        const updatedCount = initialCount + (currentlyLiked ? -1 : 1);

                                                button.setAttribute('aria-pressed', String(!currentlyLiked));
                                                        button.classList.toggle('is-liked', !currentlyLiked);
                                                                button.textContent = currentlyLiked ? '♡' : '♥';
                                                                        count.textContent = updatedCount + ' curtidas';
                                                                            });
                                                                            });
                                                                            
})