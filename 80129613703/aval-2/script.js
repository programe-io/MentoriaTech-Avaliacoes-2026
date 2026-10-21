document.querySelectorAll('.like-button').forEach((button) => {
      button.addEventListener('click', () => {
          const post = button.closest('.post');
              const count = post.querySelector('.like-count');
                  const currentlyLiked = button.getAttribute('aria-pressed') === 'true';
                      const numericCount = Number(count.textContent.replace(/,/g, ''));
                          count.textContent = (numericCount + (currentlyLiked ? -1 : 1)).toLocaleString();
                              button.setAttribute('aria-pressed', String(!currentlyLiked));
                                  button.classList.toggle('liked', !currentlyLiked);
                                      button.textContent = currentlyLiked ? '♡' : '♥';
                                          button.setAttribute('aria-label', currentlyLiked ? 'Like post' : 'Unlike post');
                                            });
                                            });

                                            document.querySelectorAll('.bookmark-button').forEach((button) => {
                                              button.addEventListener('click', () => {
                                                  const saved = button.getAttribute('aria-pressed') === 'true';
                                                      button.setAttribute('aria-pressed', String(!saved));
                                                          button.classList.toggle('saved', !saved);
                                                              button.textContent = saved ? '♧' : '▣';
                                                                  button.setAttribute('aria-label', saved ? 'Save post' : 'Remove saved post');
                                                                    });
                                                                    });

                                                                    document.querySelectorAll('.follow-button').forEach((button) => {
                                                                      button.addEventListener('click', () => {
                                                                          const following = button.classList.toggle('following');
                                                                              button.textContent = following ? 'Following' : 'Follow';
                                                                                });
                                                                                });

                                                                                document.querySelectorAll('.story').forEach((story) => {
                                                                                  story.addEventListener('click', () => {
                                                                                      const name = story.querySelector('span:last-child').textContent;
                                                                                          if (name === 'Your story') {
                                                                                                window.alert('Your story is ready for a new moment.');
                                                                                                    } else {
                                                                                                          window.alert(`You’re viewing ${name}’s story.`);
                                                                                                              }
                                                                                                                });
                                                                                                                });
                                                                                                                
})