// Dados Iniciais Simulados
const currentUser = {
  username: "dev_brasil",
  avatar: "https://pravatar.cc"
};

const storiesData = [
  { username: "ana.clara", avatar: "https://pravatar.cc", seen: false },
  { username: "lucas_m", avatar: "https://pravatar.cc", seen: false },
  { username: "viagens_br", avatar: "https://pravatar.cc", seen: false },
  { username: "tech_news", avatar: "https://pravatar.cc", seen: false },
  { username: "mariana.s", avatar: "https://pravatar.cc", seen: false },
  { username: "carlos_fit", avatar: "https://pravatar.cc", seen: false },
  { username: "cafe.com.codigo", avatar: "https://pravatar.cc", seen: false }
];

const suggestionsData = [
  { username: "ui_ux_design", subtitle: "Seguido por ana.clara", avatar: "https://pravatar.cc" },
  { username: "javascript.br", subtitle: "Sugestões para você", avatar: "https://pravatar.cc3" },
  { username: "fotografia_urbana", subtitle: "Novo no Instagram", avatar: "https://pravatar.cc" }
];

let postsData = [
  {
    id: 1,
    username: "viagens_br",
    userAvatar: "https://pravatar.cc",
    image: "https://unsplash.com",
    likes: 248,
    liked: false,
    saved: false,
    caption: "Fim de tarde perfeito para recarregar as energias! 🌊☀️ #praia #verao",
    time: "HÁ 2 HORAS",
    comments: [
      { user: "ana.clara", text: "Que lugar incrível!!" },
      { user: "lucas_m", text: "Precisando de umas férias assim." }
    ]
  },
  {
    id: 2,
    username: "cafe.com.codigo",
    userAvatar: "https://pravatar.cc",
    image: "https://unsplash.com",
    likes: 512,
    liked: true,
    saved: false,
    caption: "Setup pronto e café na xícara. Bora codar! 💻☕ #javascript #webdev",
    time: "HÁ 5 HORAS",
    comments: [
      { user: "tech_news", text: "Setup muito limpo!" }
    ]
  }
];

// Renderizar Stories
function renderStories() {
  const container = document.getElementById("storiesContainer");
  container.innerHTML = storiesData.map((story, index) => `
    <div class="story" onclick="viewStory(${index})">
      <div class="story-ring ${story.seen ? 'seen' : ''}">
        <img src="${story.avatar}" alt="${story.username}">
      </div>
      <span>${story.username}</span>
    </div>
  `).join("");
}

function viewStory(index) {
  storiesData[index].seen = true;
  renderStories();
}

// Renderizar Sugestões
function renderSuggestions() {
  const container = document.getElementById("suggestionsContainer");
  container.innerHTML = suggestionsData.map(item => `
    <div class="suggestion-item">
      <div class="suggestion-user">
        <img src="${item.avatar}" alt="${item.username}">
        <div>
          <h5>${item.username}</h5>
          <span>${item.subtitle}</span>
        </div>
      </div>
      <span class="switch-btn" onclick="toggleFollow(this)">Seguir</span>
    </div>
  `).join("");
}

function toggleFollow(btn) {
  if (btn.innerText === "Seguir") {
    btn.innerText = "Seguindo";
    btn.style.color = "#262626";
  } else {
    btn.innerText = "Seguir";
    btn.style.color = "#0095f6";
  }
}

// Renderizar Feed
function renderFeed() {
  const container = document.getElementById("feedContainer");
  container.innerHTML = postsData.map(post => `
    <article class="post" id="post-${post.id}">
      <div class="post-header">
        <div class="post-user">
          <img src="${post.userAvatar}" alt="${post.username}">
          <span>${post.username}</span>
        </div>
        <i class="fa-solid fa-ellipsis" style="cursor: pointer;"></i>
      </div>

      <div class="post-image-container" ondblclick="doubleClickLike(${post.id})">
        <img src="${post.image}" alt="Post" class="post-image">
        <i class="fa-solid fa-heart heart-overlay" id="overlay-${post.id}"></i>
      </div>

      <div class="post-actions">
        <div class="post-actions-left">
          <i class="${post.liked ? 'fa-solid fa-heart liked' : 'fa-regular fa-heart'}" onclick="toggleLike(${post.id})"></i>
          <i class="fa-regular fa-comment" onclick="focusComment(${post.id})"></i>
          <i class="fa-regular fa-paper-plane"></i>
        </div>
        <i class="${post.saved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}" onclick="toggleSave(${post.id})"></i>
      </div>

      <div class="post-info">
        <div class="likes-count">${post.likes} curtidas</div>
        <div class="caption"><span>${post.username}</span>${post.caption}</div>
        
        <div class="comments-list">
          ${post.comments.map(c => `
            <div class="comment-item"><span>${c.user}</span>${c.text}</div>
          `).join("")}
        </div>

        <div class="post-time">${post.time}</div>
      </div>

      <form class="comment-form" onsubmit="addComment(event, ${post.id})">
        <input type="text" id="input-${post.id}" placeholder="Adicione um comentário..." oninput="toggleCommentBtn(${post.id})">
        <button type="submit" id="btn-${post.id}">Publicar</button>
      </form>
    </article>
  `).join("");
}

// Interações dos Posts
function toggleLike(id) {
  const post = postsData.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
}

function doubleClickLike(id) {
  const post = postsData.find(p => p.id === id);
  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderFeed();
  }
  const overlay = document.getElementById(`overlay-${id}`);
  overlay.classList.add("animate");
  setTimeout(() => overlay.classList.remove("animate"), 700);
}

function toggleSave(id) {
  const post = postsData.find(p => p.id === id);
  post.saved = !post.saved;
  renderFeed();
}

function focusComment(id) {
  document.getElementById(`input-${id}`).focus();
}

function toggleCommentBtn(id) {
  const input = document.getElementById(`input-${id}`);
  const btn = document.getElementById(`btn-${id}`);
  if (input.value.trim().length > 0) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find(p => p.id === id);
  post.comments.push({ user: currentUser.username, text });
  renderFeed();
}

// Controle do Modal de Nova Postagem
const modal = document.getElementById("postModal");
document.getElementById("openPostModal").onclick = () => modal.style.display = "flex";
document.getElementById("closePostModal").onclick = () => modal.style.display = "none";

// Fechar modal ao clicar fora dele
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.getElementById("publishPostBtn").onclick = () => {
  const imageUrl = document.getElementById("newPostImage").value.trim();
  const caption = document.getElementById("newPostCaption").value.trim();

  if (!imageUrl) {
    alert("Insira a URL de uma imagem.");
    return;
  }

  const newPost = {
    id: Date.now(),
    username: currentUser.username,
    userAvatar: currentUser.avatar,
    image: imageUrl,
    likes: 0,
    liked: false,
    saved: false,
    caption: caption || "",
    time: "AGORA MESMO",
    comments: []
  };

  postsData.unshift(newPost);
  renderFeed();
  document.getElementById("newPostCaption").value = "";
  modal.style.display = "none";
};

// Inicializar Aplicação
renderStories();
renderSuggestions();
renderFeed();
