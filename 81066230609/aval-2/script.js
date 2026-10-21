const posts = [
      {
          author: 'Marina Costa',
              text: 'Começando o dia com um café quentinho e muitas ideias novas ☕✨ Qual é a coisa que sempre melhora o dia de vocês?',
                  time: new Date(Date.now() - 1000 * 60 * 18),
                      likes: 12,
                          liked: false,
                              color: 'coral'
                                },
                                  {
                                      author: 'Pedro Lima',
                                          text: 'Lembrete do dia: um passo de cada vez também te leva longe. 🌱',
                                              time: new Date(Date.now() - 1000 * 60 * 60 * 2),
                                                  likes: 8,
                                                      liked: false,
                                                          color: 'blue'
                                                            }
                                                            ];

                                                            const feedList = document.getElementById('feedList');
                                                            const postForm = document.getElementById('postForm');
                                                            const postText = document.getElementById('postText');
                                                            const authorName = document.getElementById('authorName');
                                                            const charCount = document.getElementById('charCount');
                                                            const avatarColors = ['coral', 'blue', 'green', 'gold', 'pink'];

                                                            function formatTime(date) {
                                                              return new Intl.DateTimeFormat('pt-BR', {
                                                                  day: 'numeric',
                                                                      month: 'short',
                                                                          hour: '2-digit',
                                                                              minute: '2-digit'
                                                                                }).format(date);
                                                                                }

                                                                                function makeElement(tag, className, text) {
                                                                                  const element = document.createElement(tag);
                                                                                    if (className) element.className = className;
                                                                                      if (text !== undefined) element.textContent = text;
                                                                                        return element;
                                                                                        }

                                                                                        function renderPosts() {
                                                                                          feedList.replaceChildren();

                                                                                            posts.forEach((post) => {
                                                                                                const card = makeElement('article', 'post card');
                                                                                                    const header = makeElement('div', 'post-header');
                                                                                                        const avatar = makeElement('div', `avatar post-avatar ${post.color}`, post.author.charAt(0).toUpperCase());
                                                                                                            avatar.setAttribute('aria-hidden', 'true');

                                                                                                                const details = makeElement('div', 'post-details');
                                                                                                                    details.append(
                                                                                                                          makeElement('p', 'post-author', post.author),
                                                                                                                                makeElement('p', 'post-time', formatTime(post.time))
                                                                                                                                    );
                                                                                                                                        header.append(avatar, details, makeElement('span', 'post-menu', '···'));

                                                                                                                                            const content = makeElement('p', 'post-content', post.text);
                                                                                                                                                const actions = makeElement('div', 'post-actions');
                                                                                                                                                    const likeButton = makeElement('button', `like-button${post.liked ? ' liked' : ''}`);
                                                                                                                                                        likeButton.type = 'button';
                                                                                                                                                        
]