// Função para curtir um post
function curtirPost(button) {
  const likeCountElement = button.querySelector('.like-count');
  let currentLikes = parseInt(likeCountElement.textContent);
  likeCountElement.textContent = currentLikes + 1;
}

// Manipulação da adição de novos posts via formulário
document.addEventListener('DOMContentLoaded', () => {
  const blogForm = document.getElementById('blogForm');
  const postsGrid = document.getElementById('posts');

  blogForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura dos valores digitados
    const titulo = document.getElementById('titulo').value;
    const categoria = document.getElementById('categoria').value;
    const conteudo = document.getElementById('conteudo').value;

    // Criação do HTML do novo artigo
    const newPost = document.createElement('article');
    newPost.classList.add('post-card');

    const dataAtual = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    newPost.innerHTML = `
      <div class="post-tag">${categoria}</div>
      <h2 class="post-title">${titulo}</h2>
      <p class="post-excerpt">${conteudo}</p>
      <div class="post-footer">
        <span class="post-date">${dataAtual}</span>
        <button class="like-btn" onclick="curtirPost(this)">❤️ <span class="like-count">0</span></button>
      </div>
    `;

    // Adiciona o novo post no início do Grid
    postsGrid.prepend(newPost);

    // Limpa os campos do formulário
    blogForm.reset();
  });
});