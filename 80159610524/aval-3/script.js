// Seleção dos elementos do DOM
const likeBtn = document.getElementById('likeBtn');
const likesNumber = document.getElementById('likesNumber');
const commentInput = document.querySelector('.comment-input');
const postCommentBtn = document.querySelector('.post-comment-btn');

let isLiked = false;
let currentLikes = 1240;

// Função para gerenciar a curtida
likeBtn.addEventListener('click', () => {
  isLiked = !isLiked;
  
  if (isLiked) {
    likeBtn.classList.add('liked');
    currentLikes++;
  \} else {
    likeBtn.classList.remove('liked');
    currentLikes--;
  \}
  
  // Atualiza o número exibido com formatação simples
  likesNumber.textContent = currentLikes.toLocaleString('pt-BR');
\});

// Ação de publicar comentário
postCommentBtn.addEventListener('click', () => {
  const commentText = commentInput.value.trim();
  
  if (commentText !== '') {
    alert(`Comentário enviado com sucesso: "\${commentText\}"`);
    commentInput.value = ''; // Limpa o campo
  \}
\});$0