const STORAGE_KEY = "mini_feed_posts_v1";

const postForm = document.getElementById("post-form");
const authorInput = document.getElementById("author-input");
const contentInput = document.getElementById("content-input");
const feedEl = document.getElementById("feed");

let posts = loadPosts();

function loadPosts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  return [
    {
      id: crypto.randomUUID(),
      author: "Lucas Mendes",
      content: "Bem-vindo ao MiniFeed! Crie uma postagem acima, curta ou comente.",
      createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      likes: 2,
      liked: false,
      comments: ["Ficou bem simples e rápido de testar!"]
    }
  ];
}

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function renderFeed() {
  feedEl.innerHTML = "";

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.className = "card";

    const commentsHtml = post.comments
      .map((c) => `<div class="comment-item">${escapeHtml(c)}</div>`)
      .join("");

    article.innerHTML = `
      <div class="post-header">
        <span class="post-author">${escapeHtml(post.author)}</span>
        <span class="post-time">${escapeHtml(post.createdAt)}</span>
      </div>
      <p class="post-content">${escapeHtml(post.content)}</p>
      <div class="post-actions">
        <button class="like-btn ${post.liked ? "liked" : ""}" data-action="like" data-id="${post.id}">
          ${post.liked ? "♥ Curtido" : "♡ Curtir"} (${post.likes})
        </button>
      </div>
      <div class="comments-list">${commentsHtml}</div>
      <form class="comment-form" data-id="${post.id}">
        <input type="text" placeholder="Escreva um comentário..." required />
        <button type="submit">Comentar</button>
      </form>
    `;

    feedEl.appendChild(article);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();
  if (!author || !content) return;

  posts.unshift({
    id: crypto.randomUUID(),
    author,
    content,
    createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    likes: 0,
    liked: false,
    comments: []
  });

  savePosts();
  renderFeed();
  contentInput.value = "";
});

feedEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='like']");
  if (!btn) return;

  const post = posts.find((p) => p.id === btn.dataset.id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  savePosts();
  renderFeed();
});

feedEl.addEventListener("submit", (e) => {
  const form = e.target.closest(".comment-form");
  if (!form) return;

  e.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === form.dataset.id);
  if (!post) return;

  post.comments.push(text);
  savePosts();
  renderFeed();
});

renderFeed();