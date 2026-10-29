// Posts de Exemplo Iniciais
const initialPosts = [
  {
    id: 1,
    author: "Ana Souza",
    avatar: "https://picsum.photos/40/40?random=1",
    time: "Há 15 minutos",
    content: "Finalizando meu novo projeto de desenvolvimento web! 🚀 Quem mais aí está codando hoje?",
    likes: 4,
    isLiked: false
  },
  {
    id: 2,
    author: "Lucas Ferreira",
    avatar: "https://picsum.photos/40/40?random=2",
    time: "Há 1 hora",
    content: "O dia está perfeito para tomar um café e estudar JavaScript modernizado! ☕💻",
    likes: 12,
    isLiked: false
  }
];

let posts = [...initialPosts];

// Seleção de elementos do DOM
const postInput = document.getElementById('postInput');
const publishBtn = document.getElementById('publishBtn');
const feedList = document.getElementById('feedList');

// Renderiza a lista de posts na tela
function renderFeed() {
  feedList.innerHTML = posts.map(post => `
    <article class="post-card">
      <div class="post-user">
        <img src="${post.avatar}" class="avatar" alt="Avatar">
        <div class="user-info">
          <h4>${post.author}</h4>
          <span>${post.time}</span>
        </div>
      </div>
      
      <p class="post-content">${post.content}</p>

      <div class="post-actions">
        <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <i class="${post.isLiked ? 'fas' : 'far'} fa-heart"></i>
          <span>${post.likes} ${post.likes === 1 ? 'Curtida' : 'Curtidas'}</span>
        </button>
        <button class="action-btn" onclick="deletePost(${post.id})">
          <i class="far fa-trash-alt"></i> Excluir
        </button>
      </div>
    </article>
  `).join('');
}

// Criar nova publicação
publishBtn.addEventListener('click', () => {
  const text = postInput.value.trim();
  
  if (text === '') {
    alert('Escreva algo para publicar!');
    return;
  }

  const newPost = {
    id: Date.now(),
    author: "Você",
    avatar: "https://picsum.photos/40/40?random=10",
    time: "Agora mesmo",
    content: text,
    likes: 0,
    isLiked: false
  };

  posts.unshift(newPost);
  postInput.value = '';
  renderFeed();
});

// Curtir / Descurtir Post
window.toggleLike = function(id) {
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
  renderFeed();
};

// Excluir Post
window.deletePost = function(id) {
  posts = posts.filter(post => post.id !== id);
  renderFeed();
};

// Inicialização
renderFeed();