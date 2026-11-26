const commentForm = document.getElementById('commentForm');
const commentsDiv = document.getElementById('comments');

commentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const commentText = document.getElementById('comment').value.trim();

  if(name && commentText) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `<strong>${escapeHtml(name)}</strong><p>${escapeHtml(commentText)}</p>`;
    commentsDiv.appendChild(commentElement);

    commentForm.reset();
  }
});

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
