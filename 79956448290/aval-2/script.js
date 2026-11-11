const publishBtn = document.getElementById('publishBtn');
const postInput = document.getElementById('postInput');
const feedContainer = document.getElementById('feedContainer');

// Função para criar e publicar um novo post
publishBtn.addEventListener('click', () => {
  const text = postInput.value.trim();

  if (text === '') {
    alert('Por favor, escreva algo antes de publicar!');
    return;
  }

  const newPost = document.createElement('article');
  newPost.classList.add('post-card');

  newPost.innerHTML = `
    <div class="post-header">
      <div class="avatar">V</div>
      <div class="user-info">
        <strong>Você</strong>
        <span>Agora mesmo</span>
      </div>
    </div>
    <p class="post-content">${escapeHTML(text)}</p>
    <div class="post-footer">
      <button class="like-btn" onclick="toggleLike(this)">🤍 Curtir (<span>0</span>)</button>
    </div>
  `;

  // Adiciona o post no topo do feed
  feedContainer.prepend(newPost);
  postInput.value = '';
});

// Função para curtir e descurtir
function toggleLike(button) {
  const countSpan = button.querySelector('span');
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains('liked')) {
    button.classList.remove('liked');
    count--;
    button.innerHTML = `🤍 Curtir (<span>${count}</span>)`;
  } else {
    button.classList.add('liked');
    count++;
    button.innerHTML = `❤️ Curtir (<span>${count}</span>)`;
  }
}

// Evita problemas de segurança com tags HTML digitadas no texto
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])
  );
}