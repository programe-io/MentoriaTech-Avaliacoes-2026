const tweetForm = document.getElementById('tweetForm');
const tweetInput = document.getElementById('tweetInput');
const feedPosts = document.getElementById('feedPosts');
const charCounter = document.getElementById('charCounter');

// Contador de caracteres dinâmico
tweetInput.addEventListener('input', () => {
    const remaining = 280 - tweetInput.value.length;
    charCounter.textContent = remaining;

    if (remaining <= 20) {
        charCounter.classList.add('warning');
    } else {
        charCounter.classList.remove('warning');
    }
});

// Manipulador do envio da postagem
tweetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = tweetInput.value.trim();
    if (!text) return;

    // Criando a estrutura do novo post dinamicamente
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    newPost.innerHTML = `
        <div class="avatar">👤</div>
        <div class="post-body">
            <div class="post-header">
                <span class="post-author">Usuário Anon</span>
                <span class="post-username">@anonimo</span>
            </div>
            <p class="post-text">${escapeHTML(text)}</p>
            <div class="post-actions">
                <button class="like-btn" onclick="toggleLike(this)">❤️ <span class="like-count">0</span></button>
                <button class="delete-btn" onclick="deletePost(this)">🗑️ Excluir</button>
            </div>
        </div>
    `;

    // Adiciona o post sempre no topo do Feed
    feedPosts.insertBefore(newPost, feedPosts.firstChild);

    // Reseta o formulário e o contador
    tweetForm.reset();
    charCounter.textContent = '280';
    charCounter.classList.remove('warning');
});

// Função para Curtir / Descurtir
function toggleLike(button) {
    const countSpan = button.querySelector('.like-count');
    let currentLikes = parseInt(countSpan.textContent);

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        countSpan.textContent = currentLikes - 1;
    } else {
        button.classList.add('liked');
        countSpan.textContent = currentLikes + 1;
    }
}

// Função para Remover Post
function deletePost(button) {
    const postElement = button.closest('.post');
    if (confirm('Tem certeza que deseja excluir esta publicação?')) {
        postElement.style.opacity = '0';
        postElement.style.transform = 'scale(0.9)';
        postElement.style.transition = 'all 0.2s ease-out';
        
        setTimeout(() => {
            postElement.remove();
        }, 200);
    }
}

// Segurança elementar para evitar injeção de scripts maliciosos (XSS)
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}
