document.addEventListener('DOMContentLoaded', () => {
  const btnPublish = document.getElementById('btnPublish');
  const postContent = document.getElementById('postContent');
  const feedList = document.getElementById('feedList');

  // Adicionar novo post ao topo
  btnPublish.addEventListener('click', () => {
    const text = postContent.value.trim();

    if (!text) {
      alert('Escreva algo para publicar!');
      return;
    \}

    const newPost = createPostElement('Você', text);
    feedList.prepend(newPost);
    postContent.value = '';
  \});

  // Criar elemento DOM do post
  function createPostElement(author, content) {
    const article = document.createElement('article');
    article.classList.add('card', 'post');

    const randomId = Math.floor(Math.random() * 1000);

    article.innerHTML = `
      <header class="post-header">
        <img src="https://picsum.photos/45/45?random=\${randomId\}" alt="Avatar" class="avatar">
        <div class="author-details">
          <strong>\${author\}</strong>
          <span class="timestamp">Agora mesmo</span>
        </div>
      </header>

      <p class="post-text">\${content\}</p>

      <div class="post-actions">
        <button class="action-btn btn-like">
          <span class="icon">❤️</span> 
          <span class="like-count">0</span>
        </button>
        <button class="action-btn btn-share">
          <span class="icon">🔗</span> Compartilhar
        </button>
      </div>
    `;

    setupPostInteractions(article);
    return article;
  \}

  // Interatividade (Curtir e Compartilhar)
  function setupPostInteractions(post) {
    const btnLike = post.querySelector('.btn-like');
    const likeCountSpan = post.querySelector('.like-count');
    const btnShare = post.querySelector('.btn-share');

    let likes = 0;
    let liked = false;

    // Lógica do botão curtir
    btnLike.addEventListener('click', () => {
      liked = !liked;
      likes += liked ? 1 : -1;
      likeCountSpan.textContent = likes;
      btnLike.classList.toggle('active', liked);
    \});

    // Lógica de compartilhar (Copiar texto)
    btnShare.addEventListener('click', () => {
      const text = post.querySelector('.post-text').textContent;
      navigator.clipboard.writeText(text);
      
      const originalText = btnShare.innerHTML;
      btnShare.innerHTML = '<span class="icon">✅</span> Copiado!';
      
      setTimeout(() => {
        btnShare.innerHTML = originalText;
      \}, 1500);
    \});
  \}

  // Inicializa o post de exemplo
  document.querySelectorAll('.post').forEach(setupPostInteractions);
\});$0