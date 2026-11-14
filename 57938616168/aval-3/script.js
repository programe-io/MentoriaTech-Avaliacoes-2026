const likeBtn = document.getElementById('like-btn');
const likesCount = document.getElementById('likes-count');
const postImage = document.getElementById('post-image');
const bookmarkBtn = document.getElementById('bookmark-btn');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

// Estado inicial das curtidas
let isLiked = true;
let totalLikes = 14892;

// Função para alternar a curtida
function toggleLike() {
    isLiked = !isLiked;

        if (isLiked) {
                totalLikes++;
                        likeBtn.classList.remove('bx-heart');
                                likeBtn.classList.add('bxs-heart', 'liked-heart');
                                    } else {
                                            totalLikes--;
                                                    likeBtn.classList.remove('bxs-heart', 'liked-heart');
                                                            likeBtn.classList.add('bx-heart');
                                                                }

                                                                    // Formata o número com ponto (ex: 14.892)
                                                                        likesCount.textContent = `${totalLikes.toLocaleString('pt-BR')} curtidas`;
                                                                        }

                                                                        // Clique no ícone de coração
                                                                        likeBtn.addEventListener('click', toggleLike);

                                                                        // Duplo clique na foto para curtir
                                                                        postImage.addEventListener('dblclick', () => {
                                                                            if (!isLiked) {
                                                                                    toggleLike();
                                                                                        }
                                                                                        });

                                                                                        // Salvar publicação (ícone de bandeirinha)
                                                                                        bookmarkBtn.addEventListener('click', () => {
                                                                                            bookmarkBtn.classList.toggle('bx-bookmark');
                                                                                                bookmarkBtn.classList.toggle('bxs-bookmark');
                                                                                                });

                                                                                                // Adicionar novo comentário
                                                                                                commentForm.addEventListener('submit', (event) => {
                                                                                                    event.preventDefault(); // Evita recarregar a página

                                                                                                        const text = commentInput.value.trim();
                                                                                                            if (text === '') return;

                                                                                                                // Lista de emojis aleatórios para o novo comentário
                                                                                                                    const emojis = ['🥰', '✨', '💖', '🦋', '🌸', '😍'];
                                                                                                                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

                                                                                                                            // Cria o elemento HTML do comentário
                                                                                                                                const newComment = document.createElement('div');
                                                                                                                                    newComment.classList.add('comment');
                                                                                                                                        newComment.innerHTML = `
                                                                                                                                                <span class="comment-emoji">${randomEmoji}</span>
                                                                                                                                                        <p><strong>beatriz.sousa</strong> ${text}</p>
                                                                                                                                                            `;

                                                                                                                                                                // Adiciona na lista e limpa o campo de texto
                                                                                                                                                                    commentsList.appendChild(newComment);
                                                                                                                                                                        commentInput.value = '';
                                                                                                                                                                        });