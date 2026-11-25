const storiesData = [
  { user: "ana.lima", avatar: "https://picsum.photos" },
  { user: "lucas_dev", avatar: "https://picsum.photos" },
  { user: "mari.fotografia", avatar: "https://picsum.photos" },
  { user: "pedro.viagens", avatar: "https://picsum.photos" },
  { user: "carol.design", avatar: "https://picsum.photos" }
];

let postsData = [
  {
    id: 1,
    username: "mari.fotografia",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Luz da tarde na costa. Sem filtros!",
    likes: 128,
    liked: false,
    comments: [
      { user: "ana.lima", text: "Que foto incrível!" },
      { user: "lucas_dev", text: "Cores sensacionais." }
    ]
  },
  {
    id: 2,
    username: "lucas_dev",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Refatorando o front-end com JavaScript puro.",
    likes: 84,
    liked: false,
    comments: [
      { user: "carol.design", text: "Setup bem limpo!" }
    ]
  }
];

const storiesContainer = document.getElementById("stories-container");
const feedContainer = document.getElementById("feed-container");
const searchInput = document.getElementById("search-input");

function renderStories() {
  storiesContainer.innerHTML = storiesData
    .map(
      (story) => `
      <div class="story" title="Ver story de ${story.user}">
        <div class="story-ring">
          <img src="${story.avatar}" alt="Avatar de ${story.user}" />
        </div>
        <span>${story.user}</span>
      </div>
    `
    )
    .join("");
}

function renderFeed(filter = "") {
  const normalized = filter.trim().toLowerCase();
  const filteredPosts = postsData.filter((post) =>
    post.username.toLowerCase().includes(normalized)
  );

  if (filteredPosts.length === 0) {
    feedContainer.innerHTML = `<p style="text-align:center; color:#737373; padding:24px;">Nenhuma publicação encontrada.</p>`;
    return;
  }

  feedContainer.innerHTML = filteredPosts
    .map(
      (post) => `
      <article class="post" data-id="${post.id}">
        <div class="post-header">
          <img src="${post.avatar}" alt="Avatar de ${post.username}" />
          <strong>${post.username}</strong>
        </div>

        <img src="${post.image}" alt="Publicação de ${post.username}" class="post-image" />

        <div class="post-actions">
          <button class="like-btn ${post.liked ? "liked" : ""}" data-action="like" aria-label="Curtir">
            ${post.liked ? "♥" : "♡"}
          </button>
        </div>

        <div class="post-body">
          <div class="likes-count">${post.likes} curtidas</div>
          <p class="caption"><span>${post.username}</span>${post.caption}</p>
          <div class="comments-list">
            ${post.comments
              .map((c) => `<p><strong>${c.user}</strong>${c.text}</p>`)
              .join("")}
          </div>
        </div>

        <form class="comment-form" data-action="comment">
          <input type="text" placeholder="Adicione um comentário..." required />
          <button type="submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");
}

feedContainer.addEventListener("click", (e) => {
  const btn = e.target.closest('[data-action="like"]');
  if (!btn) return;

  const postEl = btn.closest(".post");
  const postId = Number(postEl.dataset.id);
  const post = postsData.find((item) => item.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed(searchInput.value);
});

feedContainer.addEventListener("submit", (e) => {
  const form = e.target.closest('[data-action="comment"]');
  if (!form) return;
  e.preventDefault();

  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const postEl = form.closest(".post");
  const postId = Number(postEl.dataset.id);
  const post = postsData.find((item) => item.id === postId);
  if (!post) return;

  post.comments.push({ user: "voce", text });
  input.value = "";
  renderFeed(searchInput.value);
});

searchInput.addEventListener("input", (e) => {
  renderFeed(e.target.value);
});

renderStories();
renderFeed();
