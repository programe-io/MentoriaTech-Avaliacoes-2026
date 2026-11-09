document.addEventListener('DOMContentLoaded', () => {
  const feedContainer = document.getElementById('feed-container');
  const publishBtn = document.getElementById('publish-btn');

  // 1. Interação nos Botões de Curtir e Comentar (Delegação de Eventos)
  feedContainer.addEventListener('click', (event) => {
    const likeBtn = event.target.closest('.btn-like');
    
    if (likeBtn) {
      const countSpan = likeBtn.querySelector('.like-count');
      let currentLikes = parseInt(countSpan.textContent.replace(/\D/g, '')) || 0;
      const isLiked = likeBtn.classList.contains('liked');

      if (isLiked) {
        likeBtn.classList.remove('liked');
        currentLikes--;
      } else {
        likeBtn.classList.add('liked');
        currentLikes++;
      }

      countSpan.textContent = `(${currentLikes})`;
    }

    const commentBtn = event.target.closest('.btn-comment');
    if (commentBtn) {
      const commentText = prompt('Digite seu comentário:');
      if (commentText && commentText.trim() !== '') {
        alert(`Comentário adicionado: "${commentText.trim()}"`);
      }
    }
  });

  // 2. Criar Nova Publicação Dinamicamente
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const postText = prompt('O que você gostaria de publicar?');
      if (postText && postText.trim() !== '') {
        createNewPost(postText.trim());
      }
    });
  }

  function createNewPost(text) {
    const article = document.createElement('article');
    article.className = 'card post-card';
    article.innerHTML = `
      <header class="post-header">
        <div class="user-info">
          <div class="avatar">U</div>
          <div class="user-details">
            <strong>Seu Nome</strong>
            <span class="post-time">agora mesmo</span>
          </div>
        </div>
      </header>

      <p class="post-text">${escapeHTML(text)}</p>

      <footer class="post-actions">
        <button class="btn btn-action btn-like">
          <span class="icon">❤️</span> Curtir <span class="like-count">(0)</span>
        </button>
        <button class="btn btn-action btn-comment">
          <span class="icon">💬</span> Comentar
        </button>
      </footer>
    `;

    feedContainer.prepend(article);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});