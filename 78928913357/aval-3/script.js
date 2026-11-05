// Função para curtir / descurtir o post
function toggleLike(icon) {
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
  icon.classList.toggle('liked');
}

// Função para adicionar comentário dinamicamente
function addComment(postId) {
  const input = document.getElementById(`input-comment-${postId}`);
  const commentText = input.value.trim();

  if (commentText !== '') {
    const commentsSection = document.getElementById(`comments-${postId}`);
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<strong>seu_usuario</strong> ${commentText}`;
    
    commentsSection.appendChild(newComment);
    input.value = '';
  }
}
