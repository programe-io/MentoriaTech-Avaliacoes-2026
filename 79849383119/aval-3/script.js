// Curtir pelo botão de coração
function toggleLikeBtn(button) {
  const post = button.closest('.post');
  const countSpan = post.querySelector('.count');
  let count = parseInt(countSpan.textContent);

  if (button.textContent === '🤍') {
    button.textContent = '❤️';
    countSpan.textContent = count + 1;
  \} else {
    button.textContent = '🤍';
    countSpan.textContent = count - 1;
  \}
\}

// Curtir com duplo clique na imagem
function toggleLike(container) {
  const post = container.closest('.post');
  const likeBtn = post.querySelector('.like-btn');
  const heartAnim = container.querySelector('.heart-animation');

  // Mostra a animação do coração grande na foto
  heartAnim.classList.add('active');
  setTimeout(() => {
    heartAnim.classList.remove('active');
  \}, 700);

  // Só incrementa se ainda não estiver curtido
  if (likeBtn.textContent === '🤍') {
    toggleLikeBtn(likeBtn);
  \}
\}

// Salvar postagem
function toggleSave(button) {
  if (button.style.opacity === '0.5') {
    button.style.opacity = '1';
    alert('Post removido dos salvos.');
  \} else {
    button.style.opacity = '0.5';
    alert('Post salvo na coleção de Jamily!');
  \}
\}

// Adicionar novo comentário
function addComment(event, form) {
  event.preventDefault();
  const input = form.querySelector('input');
  const commentText = input.value.trim();

  if (commentText !== '') {
    const post = form.closest('.post');
    const commentsList = post.querySelector('.comments-list');

    const newComment = document.createElement('p');
    newComment.innerHTML = `<strong>jamily.oficial</strong> \${commentText\}`;
    
    commentsList.appendChild(newComment);
    input.value = '';
  \}
\}$0