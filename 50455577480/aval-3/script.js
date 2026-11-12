const likeBtn = document.getElementById('like-btn');
const likeCount = document.getElementById('like-count');
let liked = false;
let count = 124;

// Alterna curtida ao clicar no coração
likeBtn.addEventListener('click', () => {
  liked = !liked;
  if (liked) {
    likeBtn.textContent = '❤️';
    count++;
  \} else {
    likeBtn.textContent = '🤍';
    count--;
  \}
  likeCount.textContent = count;
\});

// Adiciona novos comentários na tela
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = commentInput.value.trim();
  
  if (text !== '') {
    const newComment = document.createElement('p');
    newComment.innerHTML = `<strong>voce</strong> \${text\}`;
    commentsList.appendChild(newComment);
    commentInput.value = '';
  \}$0