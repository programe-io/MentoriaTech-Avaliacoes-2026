document.getElementById('post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const textarea = document.getElementById('post-input');
    const text = textarea.value.trim();
    if (!text) return;

    createPostElement(text);
    textarea.value = '';
    updateCharCounter();
});

const textarea = document.getElementById('post-input');
textarea.addEventListener('input', updateCharCounter);

function updateCharCounter() {
    const counter = document.getElementById('char-counter');
    const length = textarea.value.length;
    counter.textContent = `${length} / 280`;
    
    if (length > 280) {
        counter.style.color = 'var(--danger)';
    } else {
        counter.style.color = 'var(--text-muted)';
    }
}

function createPostElement(contentText) {
    const timeline = document.getElementById('feed-timeline');
    
    const postArticle = document.createElement('article');
    postArticle.className = 'post-card';
    
    postArticle.innerHTML = `
        <div class="post-header">
            <div class="avatar">PL</div>
            <div class="post-meta">
                <h3>Pethros L.</h3>
                <span class="post-time">Agora mesmo</span>
            </div>
        </div>
        <div class="post-content">
            <p></p>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn" onclick="toggleLike(this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="like-count">0</span>
            </button>
            <button class="action-btn delete-btn" onclick="deletePost(this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Excluir
            </button>
        </div>
    `;
    
    // Evita vulnerabilidade XSS injetando texto seguro de forma nativa
    postArticle.querySelector('.post-content p').textContent = contentText;
    
    // Insere o novo post no topo da timeline
    timeline.insertBefore(postArticle, timeline.firstChild);
}

function toggleLike(btn) {
    btn.classList.toggle('liked');
    const countSpan = btn.querySelector('.like-count');
    let currentCount = parseInt(countSpan.textContent, 10);
    
    if (btn.classList.contains('liked')) {
        countSpan.textContent = currentCount + 1;
    } else {
        countSpan.textContent = currentCount - 1;
    }
}

function deletePost(btn) {
    const postCard = btn.closest('.post-card');
    postCard.style.animation = 'fadeIn 0.2s ease-out reverse';
    setTimeout(() => {
        postCard.remove();
    }, 200);
}
