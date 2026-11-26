### 3. `script.js`

```javascript
const currentUser = {
  username: "camila.style",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
};

const stories = [
  {
    id: 1,
    username: "laura.atelier",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    storyImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    seen: false
  },
  {
    id: 2,
    username: "sofia.street",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
    storyImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    seen: false
  },
  {
    id: 3,
    username: "clara.vogue",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    storyImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    seen: false
  },
  {
    id: 4,
    username: "marina.luz",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&q=80",
    storyImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    seen: false
  }
];

const suggestions = [
  { username: "atelier.norte", subtitle: "Seguido por laura.atelier", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", following: false },
  { username: "estudio.linho", subtitle: "Sugestão para você", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80", following: false },
  { username: "bia.editorial", subtitle: "Novo no Instagram", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", following: false }
];

let posts = [
  {
    id: 101,
    username: "laura.atelier",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    location: "São Paulo, Brasil",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    caption: "Luz da manhã e alfaiataria leve para começar a semana.",
    likes: 342,
    liked: false,
    saved: false,
    time: "Há 2 horas",
    comments: [
      { user: "sofia.street", text: "Que paleta linda!" }
    ]
  },
  {
    id: 102,
    username: "camila.style",
    avatar: currentUser.avatar,
    location: "Rio de Janeiro",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    caption: "Explorando novas texturas e combinações urbanas.",
    likes: 518,
    liked: true,
    saved: true,
    time: "Há 6 horas",
    comments: []
  }
];

const storiesBar = document.getElementById("stories-bar");
const postsList = document.getElementById("posts-list");
const suggestionsList = document.getElementById("suggestions-list");
const feedView = document.getElementById("feed-view");
const profileView = document.getElementById("profile-view");
const navItems = document.querySelectorAll(".nav-item[data-view]");
const profileGrid = document.getElementById("profile-grid");
const profilePostsCount = document.getElementById("profile-posts-count");
const tabBtns = document.querySelectorAll(".tab-btn");

let activeProfileTab = "all";
let storyTimer = null;

function renderStories() {
  storiesBar.innerHTML = stories.map((s) => `
    <button class="story-item" data-story-id="${s.id}">
      <div class="story-ring ${s.seen ? "seen" : ""}">
        <img src="${s.avatar}" alt="${s.username}" />
      </div>
      <span>${s.username}</span>
    </button>
  `).join("");
}

function renderSuggestions() {
  suggestionsList.innerHTML = suggestions.map((item, idx) => `
    <div class="user-row">
      <img src="${item.avatar}" alt="${item.username}" class="avatar-sm" />
      <div class="user-meta">
        <strong>${item.username}</strong>
        <span>${item.subtitle}</span>
      </div>
      <button class="follow-btn ${item.following ? "following" : ""}" data-sug-idx="${idx}">
        ${item.following ? "Seguindo" : "Seguir"}
      </button>
    </div>
  `).join("");
}

function renderPosts() {
  postsList.innerHTML = posts.map((post) => `
    <article class="post-card" data-post-id="${post.id}">
      <header class="post-header">
        <div class="post-user">
          <img src="${post.avatar}" alt="${post.username}" />
          <div class="post-user-meta">
            <strong>${post.username}</strong>
            ${post.location ? `<span>${post.location}</span>` : ""}
          </div>
        </div>
      </header>

      <div class="post-media" data-double-like="${post.id}">
        <img src="${post.image}" alt="Publicação de ${post.username}" loading="lazy" />
        <div class="double-tap-heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="84" height="84" fill="#ffffff"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>

      <div class="post-actions">
        <div class="actions-left">
          <button class="icon-btn like-btn ${post.liked ? "liked" : ""}" data-like-id="${post.id}" aria-label="Curtir">
            ${post.liked
              ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
              : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`}
          </button>
          <button class="icon-btn focus-comment-btn" data-focus-id="${post.id}" aria-label="Comentar">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </button>
        </div>

        <button class="icon-btn save-btn" data-save-id="${post.id}" aria-label="Salvar">
          ${post.saved
            ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`
            : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`}
        </button>
      </div>

      <div class="likes-count">${post.likes.toLocaleString("pt-BR")} curtidas</div>
      <p class="post-caption"><strong>${post.username}</strong>${post.caption}</p>

      <div class="post-comments">
        ${post.comments.map((c) => `<div class="comment-line"><strong>${c.user}</strong>${c.text}</div>`).join("")}
      </div>

      <div class="post-time">${post.time}</div>

      <form class="comment-form" data-comment-form="${post.id}">
        <input type="text" placeholder="Adicione um comentário..." required />
        <button type="submit">Publicar</button>
      </form>
    </article>
  `).join("");
}

function renderProfile() {
  const myPosts = posts.filter((p) => p.username === currentUser.username);
  profilePostsCount.textContent = myPosts.length;

  const listToDisplay = activeProfileTab === "saved"
    ? posts.filter((p) => p.saved)
    : myPosts;

  profileGrid.innerHTML = listToDisplay.map((p) => `
    <div class="grid-tile">
      <img src="${p.image}" alt="${p.caption}" loading="lazy" />
    </div>
  `).join("");
}

function toggleLike(postId, forceLike = false) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  if (forceLike && post.liked) return;

  post.liked = forceLike ? true : !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts();
}

// Eventos no Feed
postsList.addEventListener("click", (e) => {
  const likeBtn = e.target.closest("[data-like-id]");
  if (likeBtn) {
    toggleLike(Number(likeBtn.dataset.likeId));
    return;
  }

  const saveBtn = e.target.closest("[data-save-id]");
  if (saveBtn) {
    const post = posts.find((p) => p.id === Number(saveBtn.dataset.saveId));
    if (post) {
      post.saved = !post.saved;
      renderPosts();
      renderProfile();
    }
    return;
  }

  const focusBtn = e.target.closest("[data-focus-id]");
  if (focusBtn) {
    const card = focusBtn.closest(".post-card");
    card.querySelector(".comment-form input").focus();
  }
});

// Duplo clique para curtir
postsList.addEventListener("dblclick", (e) => {
  const media = e.target.closest("[data-double-like]");
  if (!media) return;

  const id = Number(media.dataset.doubleLike);
  toggleLike(id, true);

  const updatedMedia = postsList.querySelector(`[data-double-like="${id}"] .double-tap-heart`);
  if (updatedMedia) {
    updatedMedia.classList.add("show");
    setTimeout(() => updatedMedia.classList.remove("show"), 650);
  }
});

// Enviar comentário
postsList.addEventListener("submit", (e) => {
  const form = e.target.closest("[data-comment-form]");
  if (!form) return;
  e.preventDefault();

  const id = Number(form.dataset.commentForm);
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === id);
  if (post) {
    post.comments.push({ user: currentUser.username, text });
    renderPosts();
  }
});

// Sugestões
suggestionsList.addEventListener("click", (e) => {