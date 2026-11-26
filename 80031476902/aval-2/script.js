// Dados dos Stories
const stories = [
  { name: "seu_gato", img: "https://unsplash.com" },
  { name: "luna_persa", img: "https://unsplash.com" },
  { name: "thor_frajola", img: "https://unsplash.com" },
  { name: "nina_laranja", img: "https://unsplash.com" },
  { name: "simba_rei", img: "https://unsplash.com" }
];

// Dados iniciais do Feed
let feedPosts = [
  {
    id: 1,
    username: "luna_persa",
    location: "Sofá da Sala",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    caption: "Acordei cedo só para pedir sachê e voltei a dormir 😴🐾",
    likes: 142,
    liked: false,
    saved: false,
    time: "HÁ 2 HORAS",
    comments: [
      { user: "thor_frajola", text: "Rotina perfeita!" }
    ]
  },
  {
    id: 2,
    username: "nina_laranja",
    location: "Caixa de Papelão",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    caption: "Meus humanos compraram uma cama cara, mas eu prefiro a caixa 📦✨",
    likes: 289,
    liked: true,
    saved: false,
    time: "HÁ 5 HORAS",
    comments: [
      { user: "simba_rei", text: "Clássico felino 😂" },
      { user: "luna_persa", text: "Nada supera uma boa caixa!" }
    ]
  }
];

const storiesContainer = document.getElementById("storiesContainer");
const feedContainer = document.getElementById("feedContainer");
const openNewPostBtn = document.getElementById("openNewPostBtn");
const cancelPostBtn = document.getElementById("cancelPostBtn");
const createPostCard = document.getElementById("createPostCard");
const newPostForm = document.getElementById("newPostForm");

// Renderiza Stories
function renderStories() {
  storiesContainer.innerHTML = stories.map(story => `
    <div class="story-item" onclick="alert('Visualizando story de @${story.name} 🐱')">
      <div class="story-ring">
        <img src="${story.img}" alt="${story.name}">
      </div>
      <span>${story.name}</span>
    </div>
  `).join("");
}

// Renderiza Feed
function renderFeed() {
  feedContainer.innerHTML = feedPosts.map(post => `
    <article class="post-card">
      <header class="post-header">
        <img src="${post.avatar}" alt="${post.username}" class="avatar">
        <div class="user-info">
          <strong>${post.username}</strong>
          <small>${post.location}</small>
        </div>
      </header>

      <div class="post-image-container" ondblclick="doubleClickLike(${post.id}, this)">
        <img src="${post.image}" alt="Foto de ${post.username}" class="post-image">
        <div class="heart-overlay">❤️</div>
      </div>

      <div class="post-actions">
        <div class="left-actions">
          <button class="action-btn" onclick="toggleLike(${post.id})">
            ${post.liked ? "❤️" : "🤍"}
          </button>
          <button class="action-btn" onclick="focusComment(${post.id})">💬</button>
        </div>
        <button class="action-btn" onclick="toggleSave(${post.id})">
          ${post.saved ? "🔖" : "🏷️"}
        </button>
      </div>

      <div class="post-body">
        <div class="likes-count">${post.likes} curtidas</div>
        <p class="caption"><strong>${post.username}</strong> ${post.caption}</p>
        <div class="time-ago">${post.time}</div>

        <div class="comments-list">
          ${post.comments.map(c => `
            <div class="comment-item"><strong>${c.user}</strong> ${c.text}</div>
          `).join("")}
        </div>
      </div>

      <form class="comment-form" onsubmit="addComment(event, ${post.id})">
        <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
}

// Curtir / Descurtir
function toggleLike(id) {
  const post = feedPosts.find(p => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
}

// Duplo clique na foto
function doubleClickLike(id, container) {
  const post = feedPosts.find(p => p.id === id);
  if (!post) return;

  const heart = container.querySelector(".heart-overlay");
  heart.classList.add("show");
  setTimeout(() => heart.classList.remove("show"), 600);

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    setTimeout(renderFeed, 650);
  }
}

// Salvar post
function toggleSave(id) {
  const post = feedPosts.find(p => p.id === id);
  if (!post) return;
  post.saved = !post.saved;
  renderFeed();
}

// Focar no campo de comentário
function focusComment(id) {
  document.getElementById(`comment-input-${id}`).focus();
}

// Adicionar comentário
function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = feedPosts.find(p => p.id === id);
  post.comments.push({ user: "voce_gatolover", text });
  renderFeed();
}

// Abrir/Fechar formulário de novo post
openNewPostBtn.addEventListener("click", () => createPostCard.classList.toggle("hidden"));
cancelPostBtn.addEventListener("click", () => createPostCard.classList.add("hidden"));

// Criar nova publicação
newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("postUser").value.replace("@", "");
  const image = document.getElementById("postImage").value;
  const caption = document.getElementById("postCaption").value;

  const newPost = {
    id: Date.now(),
    username,
    location: "Brasil",
    avatar: image,
    image,
    caption,
    likes: 1,
    liked: true,
    saved: false,
    time: "AGORA MESMO",
    comments: []
  };

  feedPosts.unshift(newPost);
  newPostForm.reset();
  createPostCard.classList.add("hidden");
  renderFeed();
});

// Inicializa
renderStories();
renderFeed();
