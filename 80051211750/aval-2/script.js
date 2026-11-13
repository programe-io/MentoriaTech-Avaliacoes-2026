document.addEventListener('DOMContentLoaded', () => {
  const feedStream = document.getElementById('feedStream');
  const toast = document.getElementById('comicToast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // 1. Interação nos Stories no topo
  const storyCards = document.querySelectorAll('.story-card');
  const storyViewer = document.getElementById('storyViewer');
  const storyText = document.getElementById('storyText');
  const closeStory = document.getElementById('closeStory');

  storyCards.forEach((card) => {
    card.addEventListener('click', () => {
      storyText.textContent = card.getAttribute('data-story');
      storyViewer.style.display = 'flex';
    });
  });

  closeStory.addEventListener('click', () => {
    storyViewer.style.display = 'none';
  });

  // 2. Filtro de tags no cabeçalho
  const filterBtns = document.querySelectorAll('.pill-filter');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedTag = btn.getAttribute('data-tag');

      document.querySelectorAll('.post-card').forEach((post) => {
        const postTag = post.getAttribute('data-tag');
        if (selectedTag === 'all' || postTag === selectedTag) {
          post.classList.remove('hidden');
        } else {
          post.classList.add('hidden');
        }
      });
    });
  });

  // 3. Delegação de eventos para Curtir (THWIP!), Comentar e Repostar
  feedStream.addEventListener('click', (e) => {
    // Curtir
    const likeBtn = e.target.closest('.action-like');
    if (likeBtn) {
      const countSpan = likeBtn.querySelector('span');
      let likes = parseInt(likeBtn.getAttribute('data-likes'), 10);

      if (likeBtn.classList.contains('liked')) {
        likes--;
        likeBtn.classList.remove('liked');
      } else {
        likes++;
        likeBtn.classList.add('liked');
        showToast('THWIP! CURTIDA ENVIADA!');
      }

      likeBtn.setAttribute('data-likes', likes);
      countSpan.textContent = likes;
    }

    // Abrir/fechar comentários
    const commentToggle = e.target.closest('.action-comment-toggle');
    if (commentToggle) {
      const card = commentToggle.closest('.post-card');
      const drawer = card.querySelector('.comments-drawer');
      drawer.classList.toggle('open');
    }

    // Repostar
    const shareBtn = e.target.closest('.action-share');
    if (shareBtn) {
      showToast('⚡ REPOSTADO NA SUA TEIA!');
    }
  });

  // 4. Enviar novo comentário em qualquer post
  feedStream.addEventListener('submit', (e) => {
    if (e.target.classList.contains('comment-form')) {
      e.preventDefault();
      const input = e.target.querySelector('input');
      const text = input.value.trim();
      if (!text) return;

      const list = e.target.previousElementSibling;
      const newComment = document.createElement('div');
      newComment.className = 'comment-item';
      newComment.innerHTML = `<strong>@voce.aranha:</strong> ${escapeHTML(text)}`;
      list.appendChild(newComment);

      input.value = '';
      showToast('💬 COMENTÁRIO PUBLICADO!');
    }
  });

  // 5. Publicar novo post no mini feed
  const publishBtn = document.getElementById('publishBtn');
  const postInput = document.getElementById('postInput');
  const postCategory = document.getElementById('postCategory');

  publishBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (!content) {
      showToast('ESCREVA ALGO ANTES DE LANÇAR!');
      return;
    }

    const tag = postCategory.value;
    const tagLabel = `#${tag.toUpperCase()}`;

    const newPost = document.createElement('article');
    newPost.className = 'post-card card-cyan';
    newPost.setAttribute('data-tag', tag);

    newPost.innerHTML = `
      <div class="post-header">
        <div class="user-info">
          <div class="avatar bg-red">VC</div>
          <div>
            <strong>Você (Aranha-Dev)</strong>
            <span class="handle">@voce.aranha • agora mesmo</span>
          </div>
        </div>
        <span class="post-topic">${tagLabel}</span>
      </div>
      <div class="post-body">
        <p>${escapeHTML(content)}</p>
      </div>
      <div class="post-actions">
        <button class="action-like" data-likes="1">🕸️ THWIP! (<span>1</span>)</button>
        <button class="action-comment-toggle">💬 COMENTAR</button>
        <button class="action-share">⚡ REPOSTAR</button>
      </div>
      <div class="comments-drawer">
        <div class="comment-list"></div>
        <form class="comment-form">
          <input type="text" placeholder="Escreva um comentário..." required>
          <button type="submit">OK</button>
        </form>
      </div>
    `;

    feedStream.prepend(newPost);
    postInput.value = '';
    showToast('🕸️ NOVO POST LANÇADO NO FEED!');
  });

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
