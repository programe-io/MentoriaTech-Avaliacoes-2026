const storiesData = [
  { user: "ana_silva", avatar: "https://picsum.photos" },
  { user: "lucas_dev", avatar: "https://picsum.photos" },
  { user: "mari_fotos", avatar: "https://picsum.photos" },
  { user: "pedro_viagens", avatar: "https://picsum.photos" },
  { user: "bia_cafe", avatar: "https://picsum.photos" }
];

const postsData = [
  {
    id: 1,
    user: "ana_silva",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Tarde tranquila explorando novas ideias de código.",
    likes: 42,
    liked: false,
    comments: [{ user: "lucas_dev", text: "Ficou ótimo!" }]
  },
  {
    id: 2,
    user: "pedro_viagens",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Vista de hoje antes do pôr do sol.",
    likes: 89,
    liked: false,
    comments: []
  }
];

const storiesBar = document.getElementById("storiesBar");
const feedContainer = document.getElementById("feedContainer");
const searchInput = document.getElementById("searchInput");

function renderStories() {
  storiesBar.innerHTML = storiesData
    .map(
      (story) => `
      <div class="story">
        <div class="story-ring">
          <img src="${story.avatar}" alt="Story de ${story.user}" />
        </div>
        <span>${story.user}</span>
      </div>
    `
    )
    .join("");
}

function toggleLike(postId) {
  const post = postsData.find((item) => item.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed(searchInput.value);
}

function addComment(postId, text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const post = postsData.find((item) => item.id === postId);
  if (!post) return;
  post.comments.push({ user: "voce", text: trimmed });
  renderFeed(searchInput.value);
}

function renderFeed(filter = "") {
  const normalized = filter.trim().toLowerCase();
  const filteredPosts = postsData.filter((post) =>
    post.user.toLowerCase().includes(normalized)
  );

  feedContainer.innerHTML = filteredPosts
    .map(
      (post) => `
      <article class="post" data-id="${post.id}">
        <div class="post-header">
          <img class="post-avatar" src="${post.avatar}" alt="${post.user}" />
          <span>${post.user}</span>
        </div>
        <img
          class="post-image"
          src="${post.image}"
          alt="Publicação de ${post.user}"
          ondblclick="toggleLike(${post.id})"
        />
        <div class="post-actions">
          <button
            type="button"
            class="like-btn ${post.liked ? "liked" : ""}"
            aria-label="Curtir"
            onclick="toggleLike(${post.id})"
          >
            ${post.liked ? "♥" : "♡"}
          </button>
        </div>
        <div class="post-body">
          <p class="likes-count">${post.likes} curtidas</p>
          <p class="caption"><span>${post.user}</span>${post.caption}</p>
          <div class="comments-list">
            ${post.comments
              .map((c) => `<p><strong>${c.user}</strong>${c.text}</p>`)
              .join("")}
          </div>
        </div>
        <form class="comment-form" data-post-id="${post.id}">
          <input
            type="text"
            class="comment-input"
            placeholder="Adicione um comentário..."
            aria-label="Adicione um comentário"
          />
          <button type="submit" class="comment-submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");

  document.querySelectorAll(".comment-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const postId = Number(form.dataset.postId);
      const input = form.querySelector(".comment-input");
      addComment(postId, input.value);
      input.value = "";
    });
  });
}

searchInput.addEventListener("input", (event) => {
  renderFeed(event.target.value);
});

renderStories();
renderFeed();
