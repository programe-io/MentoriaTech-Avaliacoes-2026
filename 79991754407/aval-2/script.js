const initialFeed = [
  {
    id: 1,
    author: "@laura.atelier",
    time: "Há 2 horas",
    tag: "alfaiataria",
    tagLabel: "#Alfaiataria",
    image: "https://unsplash.com",
    caption: "Conjunto leve em tons neutros para dias quentes sem perder a estrutura.",
    likes: 124,
    liked: false,
    comments: [
      { user: "@bia.moda", text: "Caimento impecável!" }
    ]
  },
  {
    id: 2,
    author: "@sofia.street",
    time: "Há 5 horas",
    tag: "casual",
    tagLabel: "#CasualChic",
    image: "https://unsplash.com",
    caption: "Combinação prática de sobreposição para resolver a rotina da semana.",
    likes: 89,
    liked: false,
    comments: []
  },
  {
    id: 3,
    author: "@clara.detalhes",
    time: "Ontem",
    tag: "acessorios",
    tagLabel: "#Acessórios",
    image: "https://unsplash.com",
    caption: "Bolsa estruturada e metais dourados para elevar um look monocromático.",
    likes: 210,
    liked: false,
    comments: [
      { user: "@marina.v", text: "Essa textura faz toda diferença." }
    ]
  }
];

let posts = [...initialFeed];
let savedIds = JSON.parse(localStorage.getItem("lookfeed_saved") || "[]");
let activeTag = "todos";
let showOnlySaved = false;

const feedContainer = document.getElementById("feed-container");
const storyChips = document.querySelectorAll(".story-chip");
const savedFilterBtn = document.getElementById("saved-filter-btn");
const savedCountEl = document.getElementById("saved-count");
const modal = document.getElementById("new-post-modal");
const openModalBtn = document.getElementById("open-new-post");
const closeModalBtn = document.getElementById("close-new-post");
const closeBackdrop = document.getElementById("close-modal-backdrop");
const newPostForm = document.getElementById("new-post-form");

function updateSavedCounter() {
  savedCountEl.textContent = savedIds.length;
  localStorage.setItem("lookfeed_saved", JSON.stringify(savedIds));
}

function renderFeed() {
  let visiblePosts = posts;

  if (activeTag !== "todos") {
    visiblePosts = visiblePosts.filter((post) => post.tag === activeTag);
  }

  if (showOnlySaved) {
    visiblePosts = visiblePosts.filter((post) => savedIds.includes(post.id));
  }

  if (visiblePosts.length === 0) {
    feedContainer.innerHTML = `<div class="empty-state">Nenhum look encontrado neste filtro.</div>`;
    return;
  }

  feedContainer.innerHTML = visiblePosts.map((post) => {
    const isSaved = savedIds.includes(post.id);
    const initials = post.author.replace("@", "").slice(0, 2);

    return `
      <article class="feed-card" data-id="${post.id}">
        <header class="card-header">
          <div class="author-info">
            <div class="avatar">${initials}</div>
            <div>
              <div class="author-name">${post.author}</div>
              <div class="post-time">${post.time}</div>
            </div>
          </div>
          <span class="tag-badge">${post.tagLabel}</span>
        </header>

        <img src="${post.image}" alt="Look publicado por ${post.author}" class="card-photo" loading="lazy" />

        <div class="card-body">
          <div class="action-bar">
            <div class="action-group">
              <button class="action-btn like-btn ${post.liked ? "liked" : ""}" data-id="${post.id}">
                ${post.liked ? "♥" : "♡"} <span>${post.likes}</span>
              </button>
            </div>
            <button class="action-btn save-btn ${isSaved ? "saved" : ""}" data-id="${post.id}">
              ${isSaved ? "Salvo ★" : "Salvar ☆"}
            </button>
          </div>

          <p class="caption"><strong>${post.author}</strong>${post.caption}</p>

          <div class="comments-list">
            ${post.comments.map((c) => `<div><strong>${c.user}</strong> ${c.text}</div>`).join("")}
          </div>

          <form class="comment-form" data-id="${post.id}">
            <input type="text" placeholder="Adicione um comentário..." required />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </article>
    `;
  }).join("");
}

feedContainer.addEventListener("click", (event) => {
  const likeBtn = event.target.closest(".like-btn");
  if (likeBtn) {
    const id = Number(likeBtn.dataset.id);
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      renderFeed();
    }
    return;
  }

  const saveBtn = event.target.closest(".save-btn");
  if (saveBtn) {
    const id = Number(saveBtn.dataset.id);
    if (savedIds.includes(id)) {
      savedIds = savedIds.filter((item) => item !== id);
    } else {
      savedIds.push(id);
    }
    updateSavedCounter();
    renderFeed();
  }
});

feedContainer.addEventListener("submit", (event) => {
  const form = event.target.closest(".comment-form");
  if (!form) return;
  event.preventDefault();

  const id = Number(form.dataset.id);
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === id);
  if (post) {
    post.comments.push({ user: "@voce", text });
    renderFeed();
  }
});

storyChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    storyChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeTag = chip.dataset.tag;
    renderFeed();
  });
});

savedFilterBtn.addEventListener("click", () => {
  showOnlySaved = !showOnlySaved;
  savedFilterBtn.classList.toggle("active", showOnlySaved);
  savedFilterBtn.setAttribute("aria-pressed", String(showOnlySaved));
  renderFeed();
});

openModalBtn.addEventListener("click", () => {
  modal.hidden = false;
});

function closeModal() {
  modal.hidden = true;
}

closeModalBtn.addEventListener("click", closeModal);
closeBackdrop.addEventListener("click", closeModal);

newPostForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const authorRaw = document.getElementById("post-author").value.trim();
  const author = authorRaw.startsWith("@") ? authorRaw : `@${authorRaw}`;
  const tagSelect = document.getElementById("post-tag");
  const tag = tagSelect.value;
  const tagLabel = `#${tagSelect.options[tagSelect.selectedIndex].text.replace(/\s+/g, "")}`;
  const image = document.getElementById("post-image").value.trim();
  const caption = document.getElementById("post-caption").value.trim();

  posts.unshift({
    id: Date.now(),
    author,
    time: "Agora mesmo",
    tag,
    tagLabel,
    image,
    caption,
    likes: 1,
    liked: true,
    comments: []
  });

  newPostForm.reset();
  closeModal();
  renderFeed();
});

updateSavedCounter();
renderFeed();
