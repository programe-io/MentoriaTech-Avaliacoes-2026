const stories = [
  { user: "luisa.mar", avatar: "https://picsum.photos", story: "https://picsum.photos" },
  { user: "pedro.trilhas", avatar: "https://picsum.photos", story: "https://picsum.photos" },
  { user: "cafe.piaui", avatar: "https://picsum.photos", story: "https://picsum.photos" },
  { user: "ana.arte", avatar: "https://picsum.photos", story: "https://picsum.photos" },
  { user: "dev.br", avatar: "https://picsum.photos", story: "https://picsum.photos" }
];

const defaultPosts = [
  {
    id: 1,
    username: "luisa.mar",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Fim de tarde perfeito na costa! Nada supera essa brisa.",
    likes: 142,
    liked: false,
    saved: false,
    time: "HÁ 2 HORAS",
    comments: [
      { user: "pedro.trilhas", text: "Que lugar incrível!" }
    ]
  },
  {
    id: 2,
    username: "dev.br",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    caption: "Construindo interfaces rápidas com HTML, CSS e JavaScript puro.",
    likes: 89,
    liked: true,
    saved: true,
    time: "HÁ 5 HORAS",
    comments: []
  }
];

let posts = JSON.parse(localStorage.getItem("instaClonePosts")) || defaultPosts;

const storiesBar = document.getElementById("storiesBar");
const feedContainer = document.getElementById("feedContainer");

// Renderizar Stories
function renderStories() {
  storiesBar.innerHTML = stories
    .map(
      (s, index) => `
      <div class="story-item" onclick="openStory(${index})">
        <div class="story-ring">
          <img src="${s.avatar}" alt="${s.user}">
        </div>
        <span>${s.user}</span>
      </div>
    `
    )
    .join("");
}

// Renderizar Feed
function renderFeed() {
  localStorage.setItem("instaClonePosts", JSON.stringify(posts));

  feedContainer.innerHTML = posts
    .map(
      (post) => `
      <article class="post">
        <div class="post-header">
          <div class="post-user">
            <img src="${post.avatar}" alt="${post.username}">
            <span>${post.username}</span>
          </div>
        </div>

        <div class="post-image-wrapper" ondblclick="doubleClickLike(${post.id}, this)">
          <img src="${post.image}" alt="Post de ${post.username}">
          <div class="heart-overlay">&#9829;</div>
        </div>

        <div class="post-body">
          <div class="post-actions">
            <div class="left-actions">
              <button class="icon-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
                ${post.liked ? "&#9829;" : "&#9825;"}
              </button>
              <button class="icon-btn" onclick="focusComment(${post.id})">&#128172;</button>
            </div>
            <button class="icon-btn ${post.saved ? "saved" : ""}" onclick="toggleSave(${post.id})">
              ${post.saved ? "&#9733;" : "&#9734;"}
            </button>
          </div>

          <div class="likes-count">${post.likes} curtidas</div>
          <div class="caption"><strong>${post.username}</strong>${post.caption}</div>

          <div class="comments-list">
            ${post.comments
              .map((c) => `<div class="comment-row"><strong>${c.user}</strong> ${c.text}</div>`)
              .join("")}
          </div>

          <div class="post-time">${post.time}</div>

          <form class="add-comment" onsubmit="addComment(event, ${post.id})">
            <input id="comment-input-${post.id}" type="text" placeholder="Adicione um comentário..." required>
            <button type="submit">Publicar</button>
          </form>
        </div>
      </article>
    `
    )
    .join("");
}

function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
}

function doubleClickLike(id, wrapper) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
  }

  const heart = wrapper.querySelector(".heart-overlay");
  heart.classList.add("show");
  setTimeout(() => {
    heart.classList.remove("show");
    renderFeed();
  }, 600);
}

function toggleSave(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.saved = !post.saved;
  renderFeed();
}

function focusComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  if (input) input.focus();
}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${id}`);
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.comments.push({ user: "voce", text });
  renderFeed();
}

// Modal Nova Publicação
const postModal = document.getElementById("postModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const newPostForm = document.getElementById("newPostForm");

openModalBtn.addEventListener("click", () => postModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => postModal.classList.add("hidden"));

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("usernameInput").value.trim();
  const image = document.getElementById("imageUrlInput").value.trim();
  const caption = document.getElementById("captionInput").value.trim();

  posts.unshift({
    id: Date.now(),
    username,
    avatar: `https://picsum.photos{username}/100`,
    image,
    caption,
    likes: 1,
    liked: true,
    saved: false,
    time: "AGORA MESMO",
    comments: []
  });

  newPostForm.reset();
  postModal.classList.add("hidden");
  renderFeed();
});

// Modal Story
const storyModal = document.getElementById("storyModal");
const closeStoryBtn = document.getElementById("closeStoryBtn");

function openStory(index) {
  const story = stories[index];
  document.getElementById("storyAvatar").src = story.avatar;
  document.getElementById("storyUser").textContent = story.user;
  document.getElementById("storyImage").src = story.story;
  storyModal.classList.remove("hidden");
}

closeStoryBtn.addEventListener("click", () => storyModal.classList.add("hidden"));
storyModal.addEventListener("click", (e) => {
  if (e.target === storyModal) storyModal.classList.add("hidden");
});

renderStories();
renderFeed();
