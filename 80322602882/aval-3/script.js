document.querySelectorAll('.post').forEach((post) => {
  const likeBtn = post.querySelector('.like-btn');
  const postImg = post.querySelector('.post-img');
  const likesCountEl = post.querySelector('.likes-count strong');
  const commentFocusBtn = post.querySelector('.comment-focus-btn');
  const commentForm = post.querySelector('.comment-form');
  const commentInput = post.querySelector('.comment-input');
  const commentsList = post.querySelector('.comments-list');

  let liked = false;
  let likes = parseInt(likesCountEl.textContent, 10);

  // Função para alternar curtida
  function toggleLike(forceLike = false) {
    if (forceLike && liked) return;

    liked = !liked;
    likes = liked ? likes + 1 : likes - 1;
    likeBtn.textContent = liked ? '❤️' : '🤍';
    likesCountEl.textContent = `${likes} curtidas`;
  }

  // Curtir pelo botão de coração
  likeBtn.addEventListener('click', () => toggleLike(false));

  // Curtir com duplo clique na imagem
  postImg.addEventListener('dblclick', () => toggleLike(true));

  // Focar no campo de comentário ao clicar no balão
  commentFocusBtn.addEventListener('click', () => {
    commentInput.focus();
  });

  // Adicionar novo comentário
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = commentInput.value.trim();

    if (text !== '') {
      const newComment = document.createElement('p');
      newComment.innerHTML = `<strong>voce</strong> ${text}`;
      commentsList.appendChild(newComment);
      commentInput.value = '';
    }
  });
});