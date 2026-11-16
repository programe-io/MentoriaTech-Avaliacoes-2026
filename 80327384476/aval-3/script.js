// Função para curtir e descurtir a publicação
function toggleLike(button) {
  const post = button.closest('.post');
  const likesCountEl = post.querySelector('.likes-count');
  let currentLikes = parseInt(likesCountEl.textContent);

  if (button.textContent === '🤍') {
    button.textContent = '❤️';
    likesCountEl.textContent = currentLikes + 1;
  } else {
    button.textContent = '🤍';
    likesCountEl.textContent = currentLikes - 1;
  }
}

// Função para adicionar um novo comentário
function addComment(event, form) {
  event.preventDefault();
  
  const input = form.querySelector('input');
  const commentText = input.value.trim();
  
  if (commentText !== "") {
    const post = form.closest('.post');
    const commentsList = post.querySelector('.comments-list');
    
    const newComment = document.createElement('p');
    newComment.innerHTML = `<strong>voce</strong> ${commentText}`;
    
    commentsList.appendChild(newComment);
    input.value = "";
  }
}