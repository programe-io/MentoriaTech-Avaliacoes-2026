// Função para curtir e descurtir postagens
function toggleLike(button) {
  const post = button.closest('.post');
  const likesText = post.querySelector('.likes-count strong');
  let currentLikes = parseInt(likesText.textContent);

  if (button.textContent === '🤍') {
    button.textContent = '❤️';
    likesText.textContent = (currentLikes + 1) + ' pessoas';
  } else {
    button.textContent = '🤍';
    likesText.textContent = (currentLikes - 1) + ' pessoas';
  }
}

// Função para adicionar novos comentários
function addComment(button) {
  const container = button.closest('.add-comment');
  const input = container.querySelector('.comment-input');
  const commentText = input.value.trim();

  if (commentText !== '') {
    const commentsList = button.closest('.post-info').querySelector('.comments-list');
    const newComment = document.createElement('p');
    newComment.innerHTML = `<strong>voce</strong> ${commentText}`;
    commentsList.appendChild(newComment);
    input.value = '';
  }
}

// Permite enviar comentário pressionando a tecla Enter
document.querySelectorAll('.comment-input').forEach(input => {
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addComment(this.nextElementSibling);
    }
  });
});