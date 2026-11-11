document.querySelectorAll('.post').forEach(post => {
  const likeBtn = post.querySelector('.like-btn');
  const postImg = post.querySelector('.post-img');
  const countSpan = post.querySelector('.count');
  const commentForm = post.querySelector('.comment-form');
  const commentInput = commentForm.querySelector('input');
  const commentsList = post.querySelector('.comments-list');
  const commentFocusBtn = post.querySelector('.comment-focus-btn');

  let isLiked = false;

  // Função para alternar curtida
  function toggleLike() {
    let currentLikes = parseInt(countSpan.textContent);
    if (!isLiked) {
      likeBtn.textContent = '❤️';
      countSpan.textContent = currentLikes + 1;
      isLiked = true;
    } else {
      likeBtn.textContent = '🤍';
      countSpan.textContent = currentLikes - 1;
      isLiked = false;
    }
  }

  // Curtir pelo botão de coração
  likeBtn.addEventListener('click', toggleLike);

  // Curtir com duplo clique na imagem
  postImg.addEventListener('dblclick', () => {
    if (!isLiked) toggleLike();
  });

  // Focar no campo de comentário ao clicar no balão
  commentFocusBtn.addEventListener('click', () => {
    commentInput.focus();
  });

  // Adicionar novo comentário
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = commentInput.value.trim();
    if (text !== '') {
      const newComment = document.createElement('p');
      newComment.innerHTML = `<strong>voce</strong> ${text}`;
      commentsList.appendChild(newComment);
      commentInput.value = '';
    }
  });
});