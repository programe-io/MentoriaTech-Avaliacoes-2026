// Dados mockados
const users = [
  { id: 1, username: "ana_silva", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, username: "pedro_dev", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, username: "maria_foto", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, username: "lucas_travels", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, username: "carla_design", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 6, username: "joao_coder", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: 7, username: "beatriz_art", avatar: "https://i.pravatar.cc/150?img=7" },
];

const posts = [
  {
    id: 1,
    user: users[0],
    image: "https://picsum.photos/id/1015/800/800",
    likes: 1243,
    caption: "Fim de tarde perfeito na praia ",
    comments: 48,
    time: "2 HORAS",
    liked: false
  },
  {
    id: 2,
    user: users[1],
    image: "https://picsum.photos/id/1018/800/900",
    likes: 892,
    caption: "Novo projeto no ar! 💻 #coding #dev",
    comments: 31,
    time: "5 HORAS",
    liked: true
  },
  {
    id: 3,
    user: users[2],
    image: "https://picsum.photos/id/1025/800/700",
    likes: 2341,
    caption: "Meu cãozinho feliz 🐶❤️",
    comments: 112,
    time: "1 DIA",
    liked: false
  },
  {
    id: 4,
    user: users[3],
    image: "https://picsum.photos/id/1039/800/1000",
    likes: 567,
    caption: "Montanhas e liberdade 🏔️",
    comments: 19,
    time: "2 DIAS",
    liked: false
  },
  {
    id: 5,
    user: users[4],
    image: "https://picsum.photos/id/1043/800/800",
    likes: 1789,
    caption: "Design é sobre detalhes ✨",
    comments: 67,
    time: "3 DIAS",
    liked: true
  }
];

// Renderizar Stories
function renderStories() {
  const storiesContainer = document.getElementById("stories");
  
  users.forEach(user => {
    const story = document.createElement("div");
    story.className = "story";
    story.innerHTML = `
      <div class="story-img">
        <img src="${user.avatar}" alt="${user.username}">
      </div>
      <span>${user.username}</span>
    `;
    storiesContainer.appendChild(story);
  });
}

// Renderizar Feed
function renderFeed() {
  const feed = document.getElementById("feed");
  
  posts.forEach(post => {
    const postElement = document.createElement("article");
    postElement.className = "post";
    postElement.dataset.id = post.id;
    
    postElement.innerHTML = `
      <div class="post-header">
        <div class="post-user">
          <img src="${post.user.avatar}" alt="${post.user.username}">
          <span>${post.user.username}</span>
        </div>
        <i class="fas fa-ellipsis-h"></i>
      </div>
      
      <div class="post-image">
        <img src="${post.image}" alt="Post">
      </div>
      
      <div class="post-actions">
        <div class="left">
          <i class="fa${post.liked ? 's' : 'r'} fa-heart ${post.liked ? 'liked' : ''}" data-action="like"></i>
          <i class="far fa-comment"></i>
          <i class="far fa-paper-plane"></i>
        </div>
        <i class="far fa-bookmark"></i>
      </div>
      
      <div class="post-likes">${formatLikes(post.likes)} curtidas</div>
      
      <div class="post-caption">
        <strong>${post.user.username}</strong>${post.caption}
      </div>
      
      <div class="post-comments">Ver todos os ${post.comments} comentários</div>
      
      <div class="post-time">${post.time}</div>
    `;
    
    feed.appendChild(postElement);
  });
}

// Formatar número de likes
function formatLikes(num) {
  return num.toLocaleString("pt-BR");
}

// Toggle like
function toggleLike(heartIcon) {
  const postElement = heartIcon.closest(".post");
  const postId = parseInt(postElement.dataset.id);
  const post = posts.find(p => p.id === postId);
  const likesElement = postElement.querySelector(".post-likes");
  
  if (post.liked) {
    post.liked = false;
    post.likes--;
    heartIcon.classList.remove("fas", "liked");
    heartIcon.classList.add("far");
  } else {
    post.liked = true;
    post.likes++;
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas", "liked");
  }
  
  likesElement.textContent = `${formatLikes(post.likes)} curtidas`;
}

// Eventos
document.addEventListener("click", (e) => {
  if (e.target.dataset.action === "like") {
    toggleLike(e.target);
  }
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderFeed();
});