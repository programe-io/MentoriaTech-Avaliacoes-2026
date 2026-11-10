document.addEventListener('DOMContentLoaded', () => {
  const postText = document.getElementById('post-text');
  const btnPost = document.getElementById('btn-post');
  const postsContainer = document.getElementById('posts-container');

  // Posts iniciais de exemplo
  let posts = [
    {
      id: 1,
      author: 'Jonatas',
      content: 'Projeto de Mini Feed concluído com sucesso! 🚀',
      time: 'Agora mesmo',
      likes: 2,
      isLiked: false
    }
  ];

  // Função para renderizar todos os posts
  function renderPosts() {
    postsContainer.innerHTML = '';

    posts.forEach((post) => {
      const postCard = document.createElement('div');
      postCard.classList.add('post-card');

      postCard.innerHTML = `
        <div class="post-header">
          <span class="author">${post.author}</span>
          <span class="timestamp">${post.time}</span>
        </div>
        <p class="post-content">${post.content}</p>
        <div class="post-actions">
          <button class="btn-like ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
            ❤️ ${post.likes} ${post.likes === 1 ? 'Curtida' : 'Curtidas'}
          </button>
          <button class="btn-delete" onclick="deletePost(${post.id})">Excluir</button>
        </div>
      `;

      postsContainer.appendChild(postCard);
    });
  }

  // Função para adicionar uma nova publicação
  btnPost.addEventListener('click', () => {
    const text = postText.value.trim();

    if (text === '') {
      alert('Escreva algo antes de publicar!');
      return;
    }

    const newPost = {
      id: Date.now(),
      author: 'Usuário',
      content: text,
      time: 'Agora mesmo',
      likes: 0,
      isLiked: false
    };

    posts.unshift(newPost); // Adiciona no início da lista
    postText.value = ''; // Limpa o campo
    renderPosts();
  });

  // Função para curtir/descurtir
  window.toggleLike = (id) => {
    posts = posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    });
    renderPosts();
  };

  // Função para deletar post
  window.deletePost = (id) => {
    posts = posts.filter(post => post.id !== id);
    renderPosts();
  };

  // Primeira renderização
  renderPosts();
});