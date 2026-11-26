const STORAGE_KEY = "naturegram_feed_v1";
const CURRENT_HANDLE = "@marina.eco";

const stories = [
  {
    id: "s1",
    author: "trilhas_sul",
    avatar: "🥾",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=70",
    caption: "Luz da manhã atravessando a mata fechada."
  },
  {
    id: "s2",
    author: "mar_vivo",
    avatar: "🐢",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70",
    caption: "Maré calma e água cristalina na costa."
  },
  {
    id: "s3",
    author: "picos_altos",
    avatar: "🏔️",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=70",
    caption: "Ar fresco e horizonte de pedra no fim da tarde."
  },
  {
    id: "s4",
    author: "fauna_livre",
    avatar: "🦜",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70",
    caption: "Vale coberto por névoa ao amanhecer."
  }
];

const defaultPosts = [
  {
    id: 1,
    username: "trilhas_sul",
    avatar: "🥾",
    location: "Serra do Mar, BR",
    topic: "Florestas",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=75",
    caption: "Caminhar entre árvores antigas lembra como o tempo desacelera quando prestamos atenção aos sons da mata.",
    likes: 128,
    liked: false,
    saved: false,
    timeAgo: "Há 2 horas",
    comments: [
      { user: "@marina.eco", text: "Essa iluminação entre as folhas está incrível!" }
    ]
  },
  {
    id: 2,
    username: "mar_vivo",
    avatar: "🐢",
    location: "Fernando de Noronha, PE",
    topic: "Oceanos",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=75",
    caption: "Preservar praias, recifes e manguezais é manter vivo o maior ecossistema do planeta.",
    likes: 214,
    liked: true,
    saved: true,
    timeAgo: "Há 5 horas",
    comments: [
      { user: "picos_altos", text: "Água limpa desse jeito dá orgulho de ver." }
    ]
  },
  {
    id: 3,
    username: "picos_altos",
    avatar: "🏔️",
    location: "Parque Nacional do Itatiaia",
    topic: "Montanhas",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=75",
    caption: "Depois de duas horas de subida, o silêncio lá em cima recompensa cada passo.",
    likes: 96,
    liked: false,
    saved: false,
    timeAgo: "Ontem",
    comments: []
  }
];

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        posts: Array.isArray(parsed.posts) ? parsed.posts : defaultPosts,
        seenStories: Array.isArray(parsed.seenStories) ? parsed.seenStories : []
      };
    }
  } catch (e) {
    console.error("Falha ao ler localStorage:", e);
  }
  return { posts: defaultPosts, seenStories: [] };
}

let state = loadState();
let selectedTopic = "Todos";

const storiesBar = document.getElementById("storiesBar");
const topicStrip = document.getElementById("topicStrip");
const postsStack = document.getElementById("postsStack");
const emptyState = document.getElementById("emptyState");
const metricPosts = document.getElementById("metricPosts");
const metricSaved = document.getElementById("metricSaved");

const newPostModal = document.getElementById("newPostModal");
const openNewPostBtn = document.getElementById("openNewPostBtn");
const closeNewPost = document.getElementById("closeNewPost");
const newPostForm = document.getElementById("newPostForm");

const storyModal = document.getElementById("storyModal");
const closeStory = document.getElementById("closeStory");
const storyAvatar = document.getElementById("storyAvatar");
const storyAuthor = document.getElementById("storyAuthor");
const storyImg = document.getElementById("storyImg");
const storyCaption = document.getElementById("storyCaption");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function updateMetrics() {
  metricPosts.textContent = String(state.posts.length);
  const savedCount = state.posts.filter((p) => p.saved).length;
  metricSaved.textContent = String(savedCount);
}

function renderStories() {
  storiesBar.innerHTML = stories
    .map((story) => {
      const isSeen = state.seenStories.includes(story.id);
      return `
        <button class="story-item" data-story-id="${story.id}">
          <span class="story-ring ${isSeen ? "seen" : ""}">
            <span class="story-circle">${escapeHTML(story.avatar)}</span>
          </span>
          <span class="story-label">${escapeHTML(story.author)}</span>
        </button>
      `;
    })
    .join("");
}

function renderPosts() {
  const filtered =
    selectedTopic === "Todos"
      ? state.posts
      : state.posts.filter((post) => post.topic === selectedTopic);

  postsStack.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach((post) => {
    const mediaHTML = post.image
      ? `<img src="${escapeHTML(post.image)}" alt="Foto de ${escapeHTML(post.location)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
         <div class="ig-fallback-visual" style="display:none;">🌿<span>${escapeHTML(post.topic)}</span></div>`
      : `<div class="ig-fallback-visual">🌿<span>${escapeHTML(post.topic)}</span></div>`;

    const commentsHTML = post.comments
      .map(
        (c) =>
          `<div class="ig-comment"><strong>${escapeHTML(c.user)}</strong><span>${escapeHTML(c.text)}</span></div>`
      )
      .join("");

    const article = document.createElement("article");
    article.className = "card ig-post";
    article.dataset.postId = String(post.id);

    article.innerHTML = `
      <div class="ig-post-header">
        <div class="ig-author-info">
          <span class="ig-avatar">${escapeHTML(post.avatar)}</span>
          <div>
            <span class="ig-username">${escapeHTML(post.username)}</span>
            <span class="ig-location">${escapeHTML(post.location)}</span>
          </div>
        </div>
        <span class="ig-badge">${escapeHTML(post.topic)}</span>
      </div>

      <div class="ig-media-wrap" data-double-like="${post.id}">
        ${mediaHTML}
        <div class="heart-burst" aria-hidden="true">♥</div>
      </div>

      <div class="ig-actions">
        <div class="ig-actions-left">
          <button class="icon-btn ${post.liked ? "liked" : ""}" data-like="${post.id}" aria-label="Curtir">
            ${post.liked ? "♥" : "♡"}
          </button>
          <button class="icon-btn" data-focus-comment="${post.id}" aria-label="Comentar">💬</button>
        </div>
        <button class="icon-btn" data-save="${post.id}" aria-label="Salvar">
          ${post.saved ? "🔖" : "📑"}
        </button>
      </div>

      <div class="ig-body">
        <div class="ig-likes">${post.likes} curtidas</div>
        <p class="ig-caption"><strong>${escapeHTML(post.username)}</strong>${escapeHTML(post.caption)}</p>
        <div class="ig-comments">${commentsHTML}</div>
        <div class="ig-time">${escapeHTML(post.timeAgo)}</div>

        <form class="ig-comment-form" data-comment-form="${post.id}">
          <input type="text" placeholder="Adicione um comentário..." required />
          <button type="submit">Publicar</button>
        </form>
      </div>
    `;

    postsStack.appendChild(article);
  });

  updateMetrics();
}

function toggleLike(postId) {
  const post = state.posts.find((p) => p.id === Number(postId));
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  saveState();
  renderPosts();
}

function triggerHeartBurst(postId) {
  const card = postsStack.querySelector(`[data-post-id="${postId}"]`);
  if (!card) return;
  const burst = card.querySelector(".heart-burst");
  if (!burst) return;

  burst.classList.add("pop");
  setTimeout(() => burst.classList.remove("pop"), 550);
}

// Stories
storiesBar.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-story-id]");
  if (!btn) return;

  const story = stories.find((s) => s.id === btn.dataset.storyId);
  if (!story) return;

  if (!state.seenStories.includes(story.id)) {
    state.seenStories.push(story.id);
    saveState();
    renderStories();
  }

  storyAvatar.textContent = story.avatar;
  storyAuthor.textContent = story.author;
  storyImg.src = story.image;
  storyCaption.textContent = story.caption;

  storyModal.classList.add("open");
  storyModal.setAttribute("aria-hidden", "false");
});

closeStory.addEventListener("click", () => {
  storyModal.classList.remove("open");
  storyModal.setAttribute("aria-hidden", "true");
});

storyModal.addEventListener("click", (event) => {
  if (event.target === storyModal) {
    storyModal.classList.remove("open");
    storyModal.setAttribute("aria-hidden", "true");
  }
});

// Filtro de temas
topicStrip.addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (!chip) return;

  topicStrip.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  selectedTopic = chip.dataset.topic;
  renderPosts();
});

// Interações do feed
postsStack.addEventListener("click", (event) => {
  const likeBtn = event.target.closest("[data-like]");
  if (likeBtn) {
    toggleLike(likeBtn.dataset.like);
    return;
  }

  const saveBtn = event.target.closest("[data-save]");
  if (saveBtn) {
    const post = state.posts.find((p) => p.id === Number(saveBtn.dataset.save));
    if (!post) return;
    post.saved = !post.saved;
    saveState();
    renderPosts();
    return;
  }

  const commentFocusBtn = event.target.closest("[data-focus-comment]");
  if (commentFocusBtn) {
    const card = postsStack.querySelector(`[data-post-id="${commentFocusBtn.dataset.focusComment}"]`);
    const input = card?.querySelector(".ig-comment-form input");
    input?.focus();
  }
});

postsStack.addEventListener("dblclick", (event) => {
  const mediaWrap = event.target.closest("[data-double-like]");
  if (!mediaWrap) return;

  const postId = Number(mediaWrap.dataset.doubleLike);
  const post = state.posts.find((p) => p.id === postId);
  if (!post) return;

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    saveState();
    renderPosts();
  }
  triggerHeartBurst(postId);
});

postsStack.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-comment-form]");
  if (!form) return;

  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const post = state.posts.find((p) => p.id === Number(form.dataset.commentForm));
  if (!post) return;

  post.comments.push({ user: CURRENT_HANDLE, text });
  saveState();
  renderPosts();
});

// Modal nova publicação
openNewPostBtn.addEventListener("click", () => {
  newPostModal.classList.add("open");
  newPostModal.setAttribute("aria-hidden", "false");
});

closeNewPost.addEventListener("click", () => {
  newPostModal.classList.remove("open");
  newPostModal.setAttribute("aria-hidden", "true");
});

newPostModal.addEventListener("click", (event) => {
  if (event.target === newPostModal) {
    newPostModal.classList.remove("open");
    newPostModal.setAttribute("aria-hidden", "true");
  }
});

newPostForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = document.getElementById("postLocation").value.trim();
  const topic = document.getElementById("postTopic").value;
  const image = document.getElementById("postImageUrl").value.trim();
  const caption = document.getElementById("postCaption").value.trim();

  if (!location || !caption) return;

  const created = {
    id: Date.now(),
    username: CURRENT_HANDLE,
    avatar: "🦋",
    location,
    topic,
    image,
    caption,
    likes: 0,
    liked: false,
    saved: false,
    timeAgo: "Agora mesmo",
    comments: []
  };

  state.posts.unshift(created);
  saveState();

  selectedTopic = "Todos";
  topicStrip.querySelectorAll(".chip").forEach((c) => {
    c.classList.toggle("active", c.dataset.topic === "Todos");
  });

  newPostForm.reset();
  newPostModal.classList.remove("open");
  newPostModal.setAttribute("aria-hidden", "true");
  renderPosts();
});

renderStories();
renderPosts();