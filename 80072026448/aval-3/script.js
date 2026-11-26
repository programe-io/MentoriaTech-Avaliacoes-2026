const storiesData = [
  { user: "ana.dev", avatar: "https://unsplash.com" },
  { user: "lucas.design", avatar: "https://unsplash.com" },
  { user: "bia.travel", avatar: "https://unsplash.com" },
  { user: "rafa.code", avatar: "https://unsplash.com" },
  { user: "mari.foto", avatar: "https://unsplash.com" }
];

let posts = [
  {
    id: 1,
    user: "ana.dev",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    caption: "Setup pronto para mais um dia de código e café.",
    likes: 42,
    liked: false,
    comments: [{ user: "lucas.design", text: "Setup muito limpo!" }]
  },
  {
    id: 2,
    user: "bia.travel",
    avatar: "https://unsplash.com",
    image: "https://unsplash.com",
    caption: "Fim de tarde na praia.",
    likes: 118,
    liked: true,
    comments: []
  }
];

const storiesBar = document.getElementById("storiesBar");
const feedContainer = document.getElementById("feedContainer");
const searchInput = document.getElementById("searchInput");
const postModal = document.getElementById("postModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const newPostForm = document.getElementById("newPostForm");

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

function renderPosts(filterText = "") {
  const query = filterText.trim().toLowerCase();
  const filtered = posts.filter(
    (p) => p.user.toLowerCase().includes(query) || p.caption.toLowerCase().includes(query)
  );

  feedContainer.innerHTML = filtered
    .map(
      (post) => `
      <article class="post">
        <div class="post-header">
          <img src="${post.avatar}" alt="${post.user}" />
          <span>${post.user}</span>
        </div>

        <img class="post-image" src="${post.image}" alt="Postagem de ${post.user}" />

        <div class="post-actions">
          <button
            class="like-btn ${post.liked ? "liked" : ""}"
            onclick="toggleLike(${post.id})"
            aria-label="Curtir"
          >
            ${post.liked ? "♥" : "♡"}
          </button>
        </div>

        <div class="post-body">
          <div class="likes-count">${post.likes} curtidas</div>
          <p><strong>${post.user}</strong> ${post.caption}</p>

          <div class="comments-list">
            ${post.comments
              .map((c) => `<p><strong>${c.user}</strong> ${c.text}</p>`)
              .join("")}
          </div>
        </div>

        <form class="comment-form" onsubmit="addComment(event, ${post.id})">
          <input type="text" placeholder="Adicione um comentário..." required />
          <button type="submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");
}

function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts(searchInput.value);
}

function addComment(event, postId) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  post.comments.push({ user: "voce", text });
  input.value = "";
  renderPosts(searchInput.value);
}

openModalBtn.addEventListener("click", () => postModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => postModal.classList.add("hidden"));

postModal.addEventListener("click", (e) => {
  if (e.target === postModal) postModal.classList.add("hidden");
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const image = document.getElementById("postImage").value.trim();
  const caption = document.getElementById("postCaption").value.trim();

  const newPost = {
    id: Date.now(),
    user: "voce",
    avatar: "https://unsplash.com",
    image,
    caption,
    likes: 0,
    liked: false,
    comments: []
  };

  posts = [newPost, ...posts];
  newPostForm.reset();
  postModal.classList.add("hidden");
  renderPosts(searchInput.value);
});

searchInput.addEventListener("input", (e) => renderPosts(e.target.value));

renderStories();
renderPosts();