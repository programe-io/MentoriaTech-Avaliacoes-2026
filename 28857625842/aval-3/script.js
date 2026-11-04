document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('feed');
  const modal = document.getElementById('postModal');
  const btnOpenModal = document.getElementById('btnOpenModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCreatePost = document.getElementById('btnCreatePost');

  // Controle do Modal
  btnOpenModal.addEventListener('click', () => modal.classList.add('active'));
  btnCloseModal.addEventListener('click', () => modal.classList.remove('active'));

  // Criar Novo Post
  btnCreatePost.addEventListener('click', () => {
    const imgUrl = document.getElementById('newImgUrl').value.trim();
    const caption = document.getElementById('newCaption').value.trim();

    if (!imgUrl) return alert('Insira a URL da imagem!');

    const postElement = createPostElement('meu_usuario', imgUrl, caption || 'Nova publicação! ✨');
    feed.prepend(postElement);

    document.getElementById('newImgUrl').value = '';
    document.getElementById('newCaption').value = '';
    modal.classList.remove('active');
  \});

  // Função para Gerar HTML do Post
  function createPostElement(username, imgUrl, caption) {
    const article = document.createElement('article');
    article.classList.add('post');

    article.innerHTML = `
      <header class="post-header">
        <div class="user-info">
          <img src="https://picsum.photos/40/40?random=\${Math.floor(Math.random() * 500)\}" alt="Avatar" class="avatar">
          <span class="username">\${username\}</span>
        </div>
        <button class="more-options">• • •</button>
      </header>
      
      <div class="post-img-container">
        <img src="\${imgUrl\}" alt="Post Image" class="post-img">
        <span class="heart-overlay">❤️</span>
      </div>

      <div class="post-actions">
        <button class="action-btn btn-like">🤍</button>
        <button class="action-btn">💬</button>
        <button class="action-btn">✈️</button>
      </div>

      <div class="post-info">
        <p class="likes-count"><strong><span class="like-num">0</span> curtidas</strong></p>
        <p class="caption"><strong>\${username\}</strong> \${caption\}</p>
        <div class="comments-list"></div>
        <span class="time-ago">AGORA MESMO</span>
      </div>

      <div class="add-comment-box">
        <input type="text" class="comment-input" placeholder="Adicione um comentário...">
        <button class="btn-post-comment">Publicar</button>
      </div>
    `;

    setupPostInteractions(article);
    return article;
  \}

  // Interatividade (Curtir e Comentar)
  function setupPostInteractions(post) {
    const btnLike = post.querySelector('.btn-like');
    const likeNum = post.querySelector('.like-num');
    const imgContainer = post.querySelector('.post-img-container');
    const heartOverlay = post.querySelector('.heart-overlay');
    const commentInput = post.querySelector('.comment-input');
    const btnComment = post.querySelector('.btn-post-comment');
    const commentsList = post.querySelector('.comments-list');

    let likes = parseInt(likeNum.textContent);
    let isLiked = false;

    function toggleLike() {
      isLiked = !isLiked;
      likes += isLiked ? 1 : -1;
      likeNum.textContent = likes;
      btnLike.textContent = isLiked ? '❤️' : '🤍';
      btnLike.classList.toggle('liked', isLiked);
    \}

    // Clique no botão curtir
    btnLike.addEventListener('click', toggleLike);

    // Duplo clique na imagem (Efeito do coração)
    imgContainer.addEventListener('dblclick', () => {
      if (!isLiked) toggleLike();
      
      heartOverlay.classList.add('active');
      setTimeout(() => heartOverlay.classList.remove('active'), 800);
    \});

    // Enviar comentário
    btnComment.addEventListener('click', () => {
      const text = commentInput.value.trim();
      if (!text) return;

      const commentParagraph = document.createElement('p');
      commentParagraph.classList.add('comment');
      commentParagraph.innerHTML = `<strong>você</strong> \${text\}`;
      
      commentsList.appendChild(commentParagraph);
      commentInput.value = '';
    \});
  \}

  // Inicializa o post existente
  document.querySelectorAll('.post').forEach(setupPostInteractions);
\});$0