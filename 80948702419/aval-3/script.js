const storiesData = [
  {
    id: 1,
    user: "lucas.m",
    avatar: "https://pravatar.cc",
    storyImg: "https://picsum.photos",
    seen: false
  },
  {
    id: 2,
    user: "bia.design",
    avatar: "https://pravatar.cc",
    storyImg: "https://picsum.photos",
    seen: false
  },
  {
    id: 3,
    user: "rafa.code",
    avatar: "https://pravatar.cc",
    storyImg: "https://picsum.photos",
    seen: false
  },
  {
    id: 4,
    user: "camila.s",
    avatar: "https://pravatar.cc",
    storyImg: "https://picsum.photos",
    seen: false
  },
  {
    id: 5,
    user: "pedro.fot",
    avatar: "https://pravatar.cc",
    storyImg: "https://picsum.photos",
    seen: false
  }
];

let posts = [
  {
    id: 1,
    username: "bia.design",
    avatar: "https://pravatar.cc",
    image: "https://picsum.photos",
    caption: "Fim de tarde nas montanhas. Luz perfeita!",
    likes: 128,
    liked: false,
    saved: false,
    comments: [{ user: "lucas.m", text: "Que visual incrível!" }]
  },
  {
    id: 2,
    username: "rafa.code",
    avatar: "https://pravatar.cc",
    image: "https://picsum.photos",
    caption: "Parceiro de código de hoje.",
    likes: 84,
    liked: true,
    saved: false,
    comments: []
  }
];

let searchTerm = "";

const storiesEl = document.getElementById("stories");
const feedEl = document.getElementById("feed");
const searchInput = document.getElementById("searchInput");
const modalBackdrop = document.getElementById("modalBackdrop");
const storyViewer = document.getElementById("storyViewer");
const storyViewerUser = document.getElementById("storyViewerUser");
const storyViewerImg = document.getElementById("storyViewerImg");

function renderStories() {
  storiesEl.innerHTML = storiesData
    .map(
      (s) => `
      <div class="story" data-story-id="${s.id}">
        <div class="story-ring ${s.seen ? "seen" : ""}">
          <img src="${s.avatar}" alt="${s.user}" />
        </div>
        <span>${s.user}</span>
      </div>
    `
    )
    .join("");
}

function openStory(storyId) {
  const story = storiesData.find((s) => s.id === storyId);
  if (!story) return;

  story.seen = true;
  storyViewerUser.textContent = `@${story.user}`;
  storyViewerImg.src = story.storyImg;
  storyViewer.classList.add("open");
  renderStories();
}

function toggleLike(postId, forceLike = false) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  if (forceLike) {
    if (!post.liked) {
      post.liked = true;
      post.likes += 1;
    }
  } else {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }

  renderFeed();
}

function toggleSave(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  post.saved = !post.saved;
  renderFeed();
}

function renderFeed() {
  const filteredPosts = posts.filter((p) =>
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    feedEl.innerHTML = `<div class="empty-state">Nenhuma postagem encontrada para "@${searchTerm}".</div>`;
    return;
  }

  feedEl.innerHTML = filteredPosts
    .map(
      (post) => `
      <article class="post" data-post-id="${post.id}">
        <div class="post-header">
          <div class="post-author">
            <img src="${post.avatar}" alt="${post.username}" />
            <span>${post.username}</span>
          </div>
        </div>

        <div class="post-media" data-action="double-like">
          <img src="${post.image}" alt="Post de ${post.username}" />
          <div class="heart-pop">♥</div>
        </div>

        <div class="post-actions">
          <div class="actions-left">
            <button
              class="icon-btn ${post.liked ? "liked" : ""}"
              data-action="like"
              aria-label="Curtir"
            >
              ${post.liked ? "♥" : "♡"}
            </button>
            <button
              class="icon-btn"
              data-action="focus-comment"
              aria-label="Comentar"
            >
              💬
            </button>
          </div>
          <button
            class="icon-btn ${post.saved ? "saved" : ""}"
            data-action="save"
            aria-label="Salvar"
            title="${post.saved ? "Salvo" : "Salvar"}"
          >
            ${post.saved ? "★" : "☆"}
          </button>
        </div>

        <div class="likes-count">${post.likes} curtidas</div>

        <div class="caption">
          <span class="user">${post.username}</span>${post.caption}
        </div>

        <div class="comments">
          ${post.comments
            .map((c) => `<div><strong>${c.user}</strong> ${c.text}</div>`)
            .join("")}
        </div>

        <form class="comment-form">
          <input type="text" placeholder="Adicione um comentário..." />
          <button type="submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");
}

/* Eventos delegados nos Stories */
storiesEl.addEventListener("click", (e) => {
  const storyCard = e.target.closest(".story");
  if (!storyCard) return;
  openStory(Number(storyCard.dataset.storyId));
});

/* Eventos delegados no Feed */
feedEl.addEventListener("click", (e) => {
  const postEl = e.target.closest(".post");
  if (!postEl) return;

  const postId = Number(postEl.dataset.postId);
  const action = e.target.dataset.action;

  if (action === "like") toggleLike(postId);
  if (action === "save") toggleSave(postId);
  if (action === "focus-comment") {
    postEl.querySelector(".comment-form input").focus();
  }
});

feedEl.addEventListener("dblclick", (e) => {
  const mediaEl = e.target.closest(".post-media");
  if (!mediaEl) return;

  const postEl = mediaEl.closest(".post");
  const postId = Number(postEl.dataset.postId);

  toggleLike(postId, true);

  const updatedMedia = feedEl.querySelector(
    `.post[data-post-id="${postId}"] .heart-pop`
  );
  if (updatedMedia) {
    updatedMedia.classList.add("show");
    setTimeout(() => updatedMedia.classList.remove("show"), 550);
  }
});

feedEl.addEventListener("submit", (e) => {
  if (!e.target.classList.contains("comment-form")) return;
  e.preventDefault();

  const postEl = e.target.closest(".post");
  const postId = Number(postEl.dataset.postId);
  const input = e.target.querySelector("input");
  const text = input.value.trim();

  if (!text) return;

  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.comments.push({ user: "voce.dev", text });
    renderFeed();
  }
});

/* Pesquisa em tempo real */
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();
  renderFeed();
});

/* Modal de nova postagem */
document.getElementById("openModalBtn").addEventListener("click", () => {
  modalBackdrop.classList.add("open");
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
  modalBackdrop.classList.remove("open");
});

document.getElementById("publishPostBtn").addEventListener("click", () => {
  const username =
    document.getElementById("postUsername").value.trim() || "voce.dev";
  const rawUrl = document.getElementById("postImageUrl").value.trim();
  const caption =
    document.getElementById("postCaption").value.trim() || "Nova foto no feed!";
  const randomSeed = Math.floor(Math.random() * 1000);
  const image = rawUrl || `https://picsum.photos{randomSeed}/800/600`;

  posts.unshift({
    id: Date.now(),
    username,
    avatar: `https://pravatar.cc{(randomSeed % 60) + 1}`,
    image,
    caption,
    likes: 0,
    liked: false,
    saved: false,
    comments: []
  });

  document.getElementById("postImageUrl").value = "";
  document.getElementById("postCaption").value = "";
  modalBackdrop.classList.remove("open");
  renderFeed();
});

/* Fechar visualizador de Story */
document.getElementById("closeStoryBtn").addEventListener("click", () => {
  storyViewer.classList.remove("open");
});

storyViewer.addEventListener("click", (e) => {
  if (e.target === storyViewer) {
    storyViewer.classList.remove("open");
  }
});

/* Inicialização */
renderStories();
renderFeed();
