const storiesData = [
  { user: "ana.lima", avatar: "https://picsum.photos" },
  { user: "lucas_dev", avatar: "https://picsum.photos" },
  { user: "bia.fotos", avatar: "https://picsum.photos" },
  { user: "rafa.ui", avatar: "https://picsum.photos" },
  { user: "marina_c", avatar: "https://picsum.photos" }
];

let postsData = [
  {
    id: 1,
    user: "ana.lima",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Tarde tranquila explorando novas ideias de design.",
    likes: 128,
    liked: false,
    saved: false,
    comments: ["Ficou muito bom!", "Que luz incrível."]
  },
  {
    id: 2,
    user: "lucas_dev",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Refatorando código e tomando café.",
    likes: 84,
    liked: false,
    saved: false,
    comments: ["Setup limpo demais."]
  }
];

const storiesBar = document.getElementById("storiesBar");
const feedContainer = document.getElementById("feedContainer");
const searchInput = document.getElementById("searchInput");

function renderStories() {
  storiesBar.innerHTML = storiesData
    .map(
      (story) => `
      <div class="story" title="${story.user}">
        <div class="story-ring">
          <img src="${story.avatar}" alt="${story.user}" />
        </div>
        <span>${story.user}</span>
      </div>
    `
    )
    .join("");
}

function renderFeed(filter = "") {
  const query = filter.trim().toLowerCase();
  const filteredPosts = postsData.filter((post) =>
    post.user.toLowerCase().includes(query)
  );

  feedContainer.innerHTML = filteredPosts
    .map(
      (post) => `
      <article class="post" data-id="${post.id}">
        <div class="post-header">
          <img class="post-avatar" src="${post.avatar}" alt="${post.user}" />
          <span class="post-user">${post.user}</span>
        </div>

        <img class="post-image" src="${post.image}" alt="Post de ${post.user}" />

        <div class="post-actions">
          <div>
            <button class="action-btn like-btn ${post.liked ? "liked" : ""}" aria-label="Curtir">
              ${post.liked ? "♥" : "♡"}
            </button>
          </div>
          <button class="action-btn save-btn" aria-label="Salvar">
            ${post.saved ? "🔖" : "📑"}
          </button>
        </div>

        <div class="post-body">
          <p class="post-likes">${post.likes} curtidas</p>
          <p class="post-caption"><strong>${post.user}</strong> ${post.caption}</p>

          <div class="comments-list">
            ${post.comments.map((c) => `<p><strong>voce</strong> ${c}</p>`).join("")}
          </div>

          <form class="comment-form">
            <input type="text" class="comment-input" placeholder="Adicione um comentário..." />
            <button type="submit" class="comment-submit">Publicar</button>
          </form>
        </div>
      </article>
    `
    )
    .join("");
}

feedContainer.addEventListener("click", (e) => {
  const postEl = e.target.closest(".post");
  if (!postEl) return;
  const postId = Number(postEl.dataset.id);
  const post = postsData.find((p) => p.id === postId);
  if (!post) return;

  if (e.target.closest(".like-btn")) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed(searchInput.value);
  }

  if (e.target.closest(".save-btn")) {
    post.saved = !post.saved;
    renderFeed(searchInput.value);
  }
});

feedContainer.addEventListener("submit", (e) => {
  if (!e.target.classList.contains("comment-form")) return;
  e.preventDefault();

  const postEl = e.target.closest(".post");
  const postId = Number(postEl.dataset.id);
  const input = e.target.querySelector(".comment-input");
  const text = input.value.trim();
  if (!text) return;

  const post = postsData.find((p) => p.id === postId);
  post.comments.push(text);
  renderFeed(searchInput.value);
});

searchInput.addEventListener("input", (e) => {
  renderFeed(e.target.value);
});

renderStories();
renderFeed();
