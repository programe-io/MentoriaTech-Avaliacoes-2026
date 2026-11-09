const postInput = document.getElementById('post-input');
const postBtn = document.getElementById('post-btn');
const postsContainer = document.getElementById('posts-container');
const charCounter = document.getElementById('char-counter');

// Atualiza o contador de caracteres restantes
postInput.addEventListener('input', () => {
  const remaining = 280 - postInput.value.length;
  charCounter.textContent = remaining;
  
  if (remaining < 20) {
    charCounter.style.color = '#ef4444';
  } else {
    charCounter.style.color = '#6b7280';
  }
});

// Adiciona uma nova publicação ao feed
postBtn.addEventListener('click', () => {
  const text = postInput.value.trim();
  
  if (text === '') {
    alert('Por favor, digite algo antes de publicar!');
    return;
  }

  // Cria o elemento da publicação
  const newPost = document.createElement('div');
  newPost.classList.add('post');
  
  newPost.innerHTML = `
    <div class="post-header">
      <span class="user-name">Você</span>
      <span class="post-time">agora mesmo</span>
    </div>
    <p class="post-content">${escapeHTML(text)}</p>
    <div class="post-actions">
      <button class="like-btn" onclick="toggleLike(this)">❤️ <span class="like-count">0</span></button>
    </div>
  `;

  // Insere no topo do container de posts
  postsContainer.insertBefore(newPost, postsContainer.firstChild);

  // Limpa o campo de texto e reseta o contador
  postInput.value = '';
  charCounter.textContent = '280';
  charCounter.style.color = '#6b7280';
});

// Função para curtir/descurtir posts
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

// Segurança básica para evitar injeção de código malicioso (XSS)
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}