document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postText = document.getElementById('post-text');
    const postImage = document.getElementById('post-image');
    const feedContainer = document.getElementById('feed-container');

    // Banco de dados simulado inicial (Array de posts)
    let posts = [
        {
            id: 1,
            author: "Maria Silva",
            text: "Acabei de configurar meu primeiro layout utilizando Flexbox e estou adorando a simplicidade! 🚀",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
            likes: 4,
            isLiked: false,
            comments: [
                { author: "Carlos Dev", text: "Muito bom! Flexbox facilita demais a vida." }
            ]
        }
    ];

    // Função para renderizar todos os posts no feed
    function renderFeed() {
        feedContainer.innerHTML = '';

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';

            // Estrutura HTML do Post dinâmico
            postCard.innerHTML = `
                <div class="post-author">${post.author}</div>
                <div class="post-text">${post.text}</div>
                ${post.image ? `<img src="${post.image}" alt="Mídia do post" class="post-img">` : ''}
                
                <div class="post-actions">
                    <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                        ❤️ <span class="like-count">${post.likes}</span> Curtidas
                    </button>
                    <button class="action-btn">
                        💬 ${post.comments.length} Comentários
                    </button>
                </div>

                <div class="comments-section">
                    <div class="comment-list">
                        ${post.comments.map(c => `<div class="comment-item"><strong>${c.author}:</strong> ${c.text}</div>`).join('')}
                    </div>
                    <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                        <input type="text" class="comment-input" placeholder="Escreva um comentário..." required>
                        <button type="submit" class="comment-btn">Enviar</button>
                    </form>
                </div>
            `;

            feedContainer.appendChild(postCard);
        });
    }

    // Evento de submissão de nova publicação
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(),
            author: "Você (Usuário)",
            text: postText.value,
            image: postImage.value.trim() !== '' ? postImage.value : null,
            likes: 0,
            isLiked: false,
            comments: []
        };

        posts.unshift(newPost); // Adiciona no início do array
        renderFeed();

        // Limpa o formulário
        postText.value = '';
        postImage.value = '';
    });

    // Funções globais para manipulação de ações
    window.toggleLike = function(postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            if (post.isLiked) {
                post.likes -= 1;
                post.isLiked = false;
            } else {
                post.likes += 1;
                post.isLiked = true;
            }
            renderFeed();
        }
    };

    window.addComment = function(e, postId) {
        e.preventDefault();
        const input = e.target.querySelector('.comment-input');
        const commentText = input.value.trim();

        if (commentText) {
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.comments.push({
                    author: "Você",
                    text: commentText
                });
                renderFeed();
            }
        }
    };

    // Renderização inicial ao carregar a página
    renderFeed();
});