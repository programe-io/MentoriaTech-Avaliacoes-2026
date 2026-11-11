const posts = document.querySelectorAll('.post');

posts.forEach(post => {
  const likeBtn = post.querySelector('.like-btn');
  const postImg = post.querySelector('.post-img');
  const bigHeart = post.querySelector('.big-heart');
  const countSpan = post.querySelector('.count');
  const saveBtn = post.querySelector('.save-btn');

  // Função para alternar curtida
  function toggleLike() {
    let currentLikes = parseInt(countSpan.textContent);

    if (likeBtn.classList.contains('liked')) {
      likeBtn.classList.remove('liked', 'fa-solid');
      likeBtn.classList.add('fa-regular');
      countSpan.textContent = currentLikes - 1;
    } else {
      likeBtn.classList.add('liked', 'fa-solid');
      likeBtn.classList.remove('fa-regular');
      countSpan.textContent = currentLikes + 1;
    }
  }

  // Clique no ícone de coração
  likeBtn.addEventListener('click', toggleLike);

  // Clique duplo na foto (curte e mostra coração grande)
  postImg.addEventListener('dblclick', () => {
    if (!likeBtn.classList.contains('liked')) {
      toggleLike();
    }
    
    // Animação do coração central
    bigHeart.classList.add('show');
    setTimeout(() => {
      bigHeart.classList.remove('show');
    }, 700);
  });

  // Botão de salvar postagem
  saveBtn.addEventListener('click', () => {
    if (saveBtn.classList.contains('fa-regular')) {
      saveBtn.classList.remove('fa-regular');
      saveBtn.classList.add('fa-solid');
    } else {
      saveBtn.classList.remove('fa-solid');
      saveBtn.classList.add('fa-regular');
    }
  });
});