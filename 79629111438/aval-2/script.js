/**
 * ==========================================================================
 * MINI REDE SOCIAL - LÓGICA DE FUNCIONAMENTO (JAVASCRIPT PURO / ES6+)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELEÇÃO DE ELEMENTOS DO DOM
    const postInput = document.querySelector('#postInput');
    const btnPublish = document.querySelector('#btnPublish');
    const feed = document.querySelector('#feed');

    // Chave para persistência no LocalStorage
    const STORAGE_KEY = 'mini_feed_posts';

    // 2. DADOS INICIAIS (Caso o LocalStorage esteja vazio)
    const initialPosts = [
        {
            id: 101,
            author: 'Carla Beatriz',
            initials: 'CB',
            color: '#e91e63',
            time: 'Há 15 minutos',
            content: 'Estrutura e lógica do feed controladas puramente em JavaScript.',
            likes: 5,
            liked: false
        }
    ];

    // 3. INICIALIZAÇÃO
    let posts = carregarPosts();
    renderizarFeed();

    // 4. EVENTOS
    if (btnPublish && postInput) {
        btnPublish.addEventListener('click', criarNovoPost);

        // Permite enviar apertando Enter (com Shift+Enter para nova linha)
        postInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                criarNovoPost();
            }
        });
    }

    // 5. FUNÇÕES PRINCIPAIS

    /**
     * Cria e adiciona um novo post ao feed a partir do input
     */
    function criarNovoPost() {
        const texto = postInput.value.trim();
        if (!texto) return;

        const novoPost = {
            id: Date.now(),
            author: 'Você',
            initials: 'VC',
            color: '#0d6efd',
            time: 'Agora mesmo',
            content: texto,
            likes: 0,
            liked: false
        };

        posts.unshift(novoPost);
        salvarPosts();
        renderizarFeed();

        postInput.value = '';
    }

    /**
     * Alterna o estado de curtida de um post
     * @param {number} id - ID do post a ser alterado
     */
    function alternarCurtida(id) {
        posts = posts.map(post => {
            if (post.id === id) {
                const novoLiked = !post.liked;
                return {
                    ...post,
                    liked: novoLiked,
                    likes: novoLiked ? post.likes + 1 : post.likes - 1
                };
            }
            return post;
        });

        salvarPosts();
        renderizarFeed();
    }

    /**
     * Remove um post pelo ID
     * @param {number} id - ID do post a ser deletado
     */
    function deletarPost(id) {
        posts = posts.filter(post => post.id !== id);
        salvarPosts();
        renderizarFeed();
    }

    /**
     * Limpa o container e re-renderiza a lista de posts atualizada
     */
    function renderizarFeed() {
        if (!feed) return;
        feed.innerHTML = '';

        if (posts.length === 0) {
            feed.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">Nenhuma publicação ainda. Seja o primeiro a publicar!</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'card';

            postElement.innerHTML = `
                <header class="post-header">
                    <div class="avatar" style="background-color: ${post.color}">${post.initials}</div>
                    <div class="post-info">
                        <div class="author">${escapeHTML(post.author)}</div>
                        <div class="time">${post.time}</div>
                    </div>
                </header>
                <div class="post-body">${escapeHTML(post.content)}</div>
                <footer class="post-footer">
                    <button class="action-btn ${post.liked ? 'active' : ''}" data-action="like">
                        👍 ${post.likes} Curtidas
                    </button>
                    <button class="action-btn" data-action="delete" style="margin-left: auto;">
                        🗑️ Excluir
                    </button>
                </footer>
            `;

            // Eventos dos botões do post
            const btnLike = postElement.querySelector('[data-action="like"]');
            const btnDelete = postElement.querySelector('[data-action="delete"]');

            btnLike.addEventListener('click', () => alternarCurtida(post.id));
            btnDelete.addEventListener('click', () => deletarPost(post.id));

            feed.appendChild(postElement);
        });
    }

    // 6. PERSISTÊNCIA E UTILITÁRIOS

    function salvarPosts() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }

    function carregarPosts() {
        const salvos = localStorage.getItem(STORAGE_KEY);
        return salvos ? JSON.parse(salvos) : [...initialPosts];
    }

    /**
     * Escapa caracteres especiais para evitar ataques XSS
     */
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});
```<FollowUp label="Quer uma explicação de como integrar perfeitamente esses três arquivos (HTML, CSS e JS)?" query="Explique como conectar os três arquivos separados (index.html, style.css e script.js) na mesma pasta."/>