// Seleção de Tags no campo de criação de posts
let selectedTag = "✨ Vibe";
const tagButtons = document.querySelectorAll('.tag-opt');

tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tagButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTag = btn.getAttribute('data-tag');
    });
});

// Lógica para publicar novo post no feed
const publishBtn = document.getElementById('publishBtn');
const postInput = document.getElementById('postInput');
const postsContainer = document.getElementById('postsContainer');

publishBtn.addEventListener('click', () => {
    const text = postInput.value.trim();
    if (!text) {
        alert('Escreva alguma coisa antes de publicar, Paola!');
        return;
    }

    // Criar elemento do post
    const postDiv = document.createElement('div');
    postDiv.className = 'feed-item';
    
    postDiv.innerHTML = `
        <div class="feed-item-header">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar">
            <div>
                <h4>Paola Kesya</h4>
                <span class="feed-time">Agora mesmo</span>
            </div>
            <span class="feed-tag">${selectedTag}</span>
        </div>
        <p class="feed-text">${escapeHtml(text)}</p>
        <div class="feed-footer-actions">
            <button class="like-btn" onclick="toggleLike(this)">
                <i class="far fa-heart"></i> <span>0</span>
            </button>
        </div>
    `;

    // Adicionar ao topo da lista
    postsContainer.prepend(postDiv);

    // Limpar input
    postInput.value = '';
});

// Função para curtir um post
function toggleLike(button) {
    button.classList.toggle('liked');
    const spanCount = button.querySelector('span');
    let count = parseInt(spanCount.textContent);
    
    if (button.classList.contains('liked')) {
        count++;
        button.querySelector('i').classList.remove('far');
        button.querySelector('i').classList.add('fas');
    } else {
        count--;
        button.querySelector('i').classList.remove('fas');
        button.querySelector('i').classList.add('far');
    }
    spanCount.textContent = count;
}

// Segurança básica para escapar caracteres HTML inseridos pelo usuário
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}