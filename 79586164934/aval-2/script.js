const authorInput = document.getElementById("authorInput");
const postInput = document.getElementById("postInput");
const charCount = document.getElementById("charCount");
const publishBtn = document.getElementById("publishBtn");
const feedList = document.getElementById("feedList");

const defaultPosts = [
  {
    id: 1,
    author: "Marina Costa",
    time: "Agora mesmo",
    text: "Começando mais um projeto front-end com HTML, CSS e JavaScript puro!",
    likes: 4,
    liked: false,
    comments: ["Boa! Nada como dominar a base."]
  },
  {
    id: 2,
    author: "Lucas Mendes",
    time: "Há 15 min",
    text: "Café passado na hora + código limpo = combinação perfeita.",
    likes: 7,
    liked: true,
    comments: []
  }
];

let posts = JSON.parse(localStorage.getItem("miniFeedPosts")) || defaultPosts;

function savePosts() {
  localStorage.setItem("miniFeedPosts", JSON.stringify(posts));
}

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "VC";
}

function renderFeed() {
  feedList.innerHTML = posts
    .map(
      (post) => `
      <article class="post-card">
        <div class="post-top">
          <div class="post-user">
            <div class="avatar">${getInitials(post.author)}</div>
            <div>
              <h3>${post.author}</h3>
              <span>${post.time}</span>
            </div>
          </div>
          <button class="delete-btn" onclick="deletePost(${post.id})">Excluir</button>
        </div>

        <p class="post-text">${post.text}</p>

        <div class="post-actions">
          <button class="action-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
            &#9829; ${post.likes} Curtir
          </button>
          <span class="action-btn">&#128172; ${post.comments.length} Comentários</span>
        </div>

        <div class="comments-box">
          ${post.comments.map((c) => `<div class="comment-item">${c}</div>`).join("")}
          <form class="comment-form" onsubmit="addComment(event, ${post.id})">
            <input type="text" placeholder="Escreva um comentário..." required>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </article>
    `
    )
    .join("");
}

postInput.addEventListener("input", () => {
  const remaining = 280 - postInput.value.length;
  charCount.textContent = remaining;
});

publishBtn.addEventListener("click", () => {
  const text = postInput.value.trim();
  if (!text) return;

  const author = authorInput.value.trim() || "Visitante";
  const newPost = {
    id: Date.now(),
    author,
    time: "Agora mesmo",
    text,
    likes: 0,
    liked: false,
    comments: []
  };

  posts.unshift(newPost);
  savePosts();
  renderFeed();

  postInput.value = "";
  charCount.textContent = "280";
});

function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  savePosts();
  renderFeed();
}

function addComment(event, id) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const commentText = input.value.trim();
  if (!commentText) return;

  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.comments.push(commentText);
  savePosts();
  renderFeed();
}

function deletePost(id) {
  posts = posts.filter((p) => p.id !== id);
  savePosts();
  renderFeed();
}

renderFeed();
