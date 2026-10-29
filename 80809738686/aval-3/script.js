// Posts de Exemplo Iniciais
const initialPosts = [
  {
    id: 1,
    username: "ana_dev",
    userAvatar: "https://picsum.photos/40/40?random=2",
    imageUrl: "https://picsum.photos/500/500?random=20",
    caption: "Dia de focar em CSS e Layouts responsivos! 🚀",
    likes: 15,
    isLiked: false
  },
  {
    id: 2,
    username: "carlos_tech",
    userAvatar: "https://picsum.photos/40/40?random=3",
    imageUrl: "https://picsum.photos/500/500?random=21",
    caption: "Café + código, combinação perfeita do dia ☕💻",
    likes: 32,
    isLiked: false
  }
];

let posts = [...initialPosts];

// Seleção de Elementos
const feed = document.getElementById('feed');
const imgUrlInput = document.getElementById('imgUrlInput');
const captionInput = document.getElementById('captionInput');
const postBtn = document.getElementById('postBtn');

// Renderizar Posts no Feed
function renderFeed() {
  feed.innerHTML = posts.map(post => `
    <article class="post-card">
      <div class="post-header">
        <img src="${post.userAvatar}" alt="${post.username}">
        <span>${post.username}</span>
      </div>
      
      <img src="${post.imageUrl}" class="post-img" alt="Post">

      <div class="post-actions">
        <i class="${post.isLiked ? 'fas liked' : 'far'} fa-heart" onclick="toggleLike(${post.id})"></i>
        <i class="far fa-comment"></i>
        <i class="far fa-paper-plane"></i>
      </div>

      <div class="post-details">
        <div class="likes-count">${post.likes} curtidas</div>
        <div class="caption">
          <span>${post.username}</span>${post.caption}
        </div>
      </div>
    </article>
  `).join('');
}

// Criar Novo Post
postBtn.addEventListener('click', () => {
  const caption = captionInput.value.trim();
  const imgUrl = imgUrlInput.value.trim() || `https://picsum.photos/500/500?random=${Date.now()}`;

  if (!caption) {
    alert("Escreva uma legenda!");
    return;
  }

  const newPost = {
    id: Date.now(),
    username: "seu_usuario",
    userAvatar: "https://picsum.photos/60/60?random=1",
    imageUrl: imgUrl,
    caption: caption,
    likes: 0,
    isLiked: false
  };

  posts.unshift(newPost);
  captionInput.value = '';
  imgUrlInput.value = '';
  renderFeed();
});

// Dar Like / Dislike
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

// Inicializa a exibição
renderFeed();