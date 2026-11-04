// Dados iniciais dos Posts
let posts = [
  {
    id: 1,
    username: "dev_lifestyle",
    userPic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    location: "São Paulo, Brasil",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    likes: 124,
    isLiked: false,
    caption: "Café, código e foco total no projeto do dia! ☕💻",
    comments: [
      { username: "carlos_dev", text: "Incrível! Qual stack está usando?" },
      { username: "ana_silva", text: "Muito top! 🚀" }
    ]
  },
  {
    id: 2,
    username: "marina_r",
    userPic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    location: "Rio de Janeiro, Brasil",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    likes: 342,
    isLiked: true,
    caption: "Dia de praia para recarregar as energias 🌊☀️",
    comments: [
      { username: "dev_lifestyle", text: "Lugar espetacular!" }
    ]
  }
];

// Elementos DOM
const feedContainer = document.getElementById("feed");
const createModal = document.getElementById("create-modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const createPostForm = document.getElementById("create-post-form");
const themeToggleBtn = document.getElementById("theme-toggle");

// Renderizar o Feed
function renderFeed() {
  feedContainer.innerHTML = "";

  posts.forEach((post) => {
    const postEl = document.createElement("article");
    postEl.classList.add("post");

    postEl.innerHTML = `
      <div class="post-header">
        <div class="user-info">
          <img src="${post.userPic}" alt="${post.username}">
          <div>
            <div class="username">${post.username}</div>
            ${post.location ? `<div class="location">${post.location}</div>` : ""}
          </div>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>

      <div class="post-img-wrapper" onclick="handleDoubleClick(${post.id})">
        <img src="${post.imageUrl}" class="post-img" alt="Post">
        <i class="fa-solid fa-heart heart-overlay" id="overlay-${post.id}"></i>
      </div>

      <div class="post-actions">
        <div class="action-btns">
          <i class="${post.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart ${post.isLiked ? 'liked' : ''}" 
             onclick="toggleLike(${post.id})"></i>
          <i class="fa-regular fa-comment"></i>
          <i class="fa-regular fa-paper-plane"></i>
        </div>
        <i class="fa-regular fa-bookmark"></i>
      </div>

      <div class="likes-count">${post.likes} curtidas</div>

      <div class="caption">
        <strong>${post.username}</strong> ${post.caption}
      </div>

      <div class="comments-list">
        ${post.comments.map(c => `<div><strong>${c.username}</strong> ${c.text}</div>`).join('')}
      </div>

      <form class="add-comment-box" onsubmit="handleAddComment(event, ${post.id})">
        <input type="text" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    `;

    feedContainer.appendChild(postEl);
  });
}

// Toggle Like
function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    renderFeed();
  }
}

// Duplo clique para curtir na imagem
function handleDoubleClick(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    if (!post.isLiked) {
      post.isLiked = true;
      post.likes += 1;
    }
    
    // Animação do Coração
    const heartOverlay = document.getElementById(`overlay-${postId}`);
    if (heartOverlay) {
      heartOverlay.classList.add("animate");
      setTimeout(() => heartOverlay.classList.remove("animate"), 800);
    }

    renderFeed();
  }
}

// Adicionar Comentário
function handleAddComment(event, postId) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const commentText = input.value.trim();

  if (commentText) {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.comments.push({ username: "meu_perfil", text: commentText });
      renderFeed();
    }
  }
}

// Alternar Modal de Criação
openModalBtn.addEventListener("click", () => createModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => createModal.classList.add("hidden"));

// Criar Novo Post
createPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const imageUrl = document.getElementById("post-image-url").value;
  const caption = document.getElementById("post-caption").value;
  const location = document.getElementById("post-location").value;

  const newPost = {
    id: Date.now(),
    username: "meu_perfil",
    userPic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    location: location,
    imageUrl: imageUrl,
    likes: 0,
    isLiked: false,
    caption: caption,
    comments: []
  };

  posts.unshift(newPost);
  renderFeed();

  // Resetar e fechar modal
  createPostForm.reset();
  createModal.classList.add("hidden");
});

// Alternar Modo Escuro / Claro
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Inicialização
renderFeed();