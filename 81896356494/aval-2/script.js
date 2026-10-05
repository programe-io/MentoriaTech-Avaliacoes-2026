/* ==========================================
   PROJETO MINIFEED - LÓGICA JAVASCRIPT (script.js)
   ========================================== */

// Função para adicionar uma nova publicação ao feed
function addPost() {
    const textarea = document.getElementById('postText');
    const text = textarea.value.trim();

    // Valida se o campo não está vazio
    if (text === '') {
        alert('Por favor, digite alguma coisa antes de publicar!');
        return;
    }

    const feed = document.getElementById('feed');
    const newPost = document.createElement('div');
    newPost.className = 'card';

    // Cria a estrutura HTML da nova postagem
    newPost.innerHTML = `
        <div class="post-header">
            <div class="avatar">V</div>
            <div class="post-info">
                <h3>Você</h3>
                <span>Agora mesmo</span>
            </div>
        </div>
        <div class="post-content">
            ${escapeHtml(text)}
        </div>
        <div class="post-actions">
            <button class="btn-like" onclick="toggleLike(this)">👍 Curtir (<span class="count">0</span>)</button>
        </div>
    `;

    // Adiciona o novo post no topo do feed
    feed.prepend(newPost);

    // Limpa a caixa de texto
    textarea.value = '';
}

// Função para curtir e descurtir uma publicação
function toggleLike(btn) {
    const countSpan = btn.querySelector('.count');
    let count = parseInt(countSpan.textContent, 10);

    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        count--;
    } else {
        btn.classList.add('liked');
        count++;
    }

    countSpan.textContent = count;
}

// Função de segurança para evitar injeção de código (XSS)
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}