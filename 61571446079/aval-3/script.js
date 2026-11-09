// Base de dados inicial
const stories = [
  { username: "ana_clara", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
  { username: "carlos_v", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  { username: "motovibe", img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80" },
  { username: "lucas_tech", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  { username: "juliatravel", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" }
];

let posts = [
  {
    id: 1,
    username: "motovibe",
    userAvatar: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=150&q=80",
    postImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    likes: 124,
    liked: false,
    caption: "Apex RR 1000 pronta para dominar a pista! 🚀🔥",
    comments: ["Máquina incrível!", "Qual o preço?"]
  },
  {
    id: 2,
    username: "juliatravel",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    postImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    likes: 382,
    liked: false,
    caption: "Mais um destino incrível concluído ✨🗺️",
    comments: ["Lugar maravilhoso!"]
  }
];

const suggestions = [
  { username: "marcos_dev", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" },
  { username: "tech_brasil", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80" }
];

// Elementos DOM
const storiesContainer = document.getElementById("stories-container");
const feedContainer = document.getElementById("feed-container");
const suggestionsContainer = document.getElementById("suggestions-container");

const createModal = document.getElementById("create-modal");
const openCreateBtn = document.getElementById("open-create");
const closeModalBtn = document.getElementById("close-modal");
const publishBtn = document.getElementById("publish-btn");

// Renderizar Stories
function renderStories() {
  storiesContainer.innerHTML = stories.map(s => `
    <div class="story-item">
      <div class="story-ring">
        <img src="${s.img}" alt="${s.username}">
      </div>
      <span>${s.username}</span>
    </div>
  `).join('');
}

// Renderizar Feed
function renderFeed() {
  feedContainer.innerHTML = posts.map(post => `
    <article class="post">
      <div class="post-header">
        <div class="post-user">
          <img src="${post.userAvatar}" alt="${post.username}">
          <span class="username">${post.username}</span>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>

      <div class="post-image">
        <img src="${post.postImage}" alt="Post image">
      </div>

      <div class="post-actions">
        <div class="action-btns">
          <i class="${post.liked ? 'fa-solid fa-heart liked' : 'fa-regular fa-heart'}" onclick="toggleLike(${post.id})"></i>
          <i class="fa-regular fa-comment"></i>
          <i class="fa-regular fa-paper-plane"></i>
        </div>
        <div class="bookmark-btn">
          <i class="fa-regular fa-bookmark"></i>
        </div>
      </div>

      <div class="likes-count">${post.likes} curtidas</div>

      <div class="post-caption">
        <span class="username">${post.username}</span>${post.caption}
      </div>

      <div class="comments-link">Ver todos os ${post.comments.length} comentários</div>

      <div class="comment-input-box">
        <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário...">
        <button onclick="addComment(${post.id})">Publicar</button>
      </div>
    </article>
  `).join('');
}

// Renderizar Sugestões
function renderSuggestions() {
  suggestionsContainer.innerHTML = suggestions.map(s => `
    <div class="suggestion-item">
      <img src="${s.avatar}" alt="${s.username}">
      <div class="user-info">
        <span class="username">${s.username}</span>
        <span class="fullname">Sugestão para você</span>
      </div>
      <button class="follow-btn">Seguir</button>
    </div>
  `).join('');
}

// Alternar Curtida
function toggleLike(id) {
  posts = posts.map(p => {
    if (p.id === id) {
      return {
        ...p,
        liked: !p.liked,
        likes: p.liked ? p.likes - 1 : p.likes + 1
      };
    }
    return p;
  });
  renderFeed();
}

// Adicionar Comentário
function addComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  if (input.value.trim() !== "") {
    posts = posts.map(p => {
      if (p.id === id) {
        return { ...p, comments: [...p.comments, input.value] };
      }
      return p;
    });
    renderFeed();
  }
}

// Modal Controles
openCreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createModal.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  createModal.classList.remove("active");
});

publishBtn.addEventListener("click", () => {
  const imgUrl = document.getElementById("post-img-url").value;
  const caption = document.getElementById("post-caption").value;

  if (imgUrl && caption) {
    const newPost = {
      id: Date.now(),
      username: "seu_usuario",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      postImage: imgUrl,
      likes: 0,
      liked: false,
      caption: caption,
      comments: []
    };

    posts.unshift(newPost);
    renderFeed();

    // Reset Form
    document.getElementById("post-img-url").value = "";
    document.getElementById("post-caption").value = "";
    createModal.classList.remove("active");
  }
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderFeed();
  renderSuggestions();
});