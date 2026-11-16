const posts = [
  {
    id: 1,
    username: "viagens.br",
    avatar: "https://pravatar.cc",
    image: "https://unsplash.com",
    likes: 124,
    liked: false,
    saved: false,
    caption: "Fim de tarde perfeito na praia! 🌊☀️ #ferias #praia",
    time: "Há 2 horas"
  },
  {
    id: 2,
    username: "carlos_dev",
    avatar: "https://pravatar.cc",
    image: "https://unsplash.com",
    likes: 89,
    liked: false,
    saved: false,
    caption: "Codando um clone do Instagram com HTML, CSS e JS! 💻🚀",
    time: "Há 5 horas"
  }
];

const feedContainer = document.getElementById("feed");

function renderFeed() {
  feedContainer.innerHTML = "";

  posts.forEach(post => {
    const postElement = document.createElement("article");
    postElement.classList.add("post");

    postElement.innerHTML = `
      <div class="post-header">
        <div class="post-user">
          <img src="${post.avatar}" alt="${post.username}">
          <span>${post.username}</span>
        </div>
        <span>•••</span>
      </div>

      <img src="${post.image}" alt="Post" class="post-image" ondblclick="toggleLike(${post.id})">

      <div class="post-actions">
        <div class="actions-left">
          <button class="action-btn" onclick="toggleLike(${post.id})">
            ${post.liked ? "❤️" : "🤍"}
          </button>
          <button class="action-btn">💬</button>
          <button class="action-btn">🚀</button>
        </div>
        <button class="action-btn" onclick="toggleSave(${post.id})">
          ${post.saved ? "🔖" : "📑"}
        </button>
      </div>

      <div class="post-info">
        <div class="likes-count">${post.likes} curtidas</div>
        <div class="caption"><span>${post.username}</span>${post.caption}</div>
        <div class="post-time">${post.time}</div>
      </div>
    `;

    feedContainer.appendChild(postElement);
  });
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
  }
}

function toggleSave(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.saved = !post.saved;
    renderFeed();
  }
}

// Inicializa o feed na tela
renderFeed();