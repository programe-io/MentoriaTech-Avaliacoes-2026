const postForm = document.getElementById("post-form");
const authorInput = document.getElementById("author-input");
const contentInput = document.getElementById("content-input");
const feedEl = document.getElementById("feed");

let posts = [
  {
    id: crypto.randomUUID(),
    author: "Lucas",
    content: "Testando este mini feed feito com HTML, CSS e JavaScript puro.",
    time: "Agora mesmo",
    likes: 2,
    liked: false,
    comments: ["Ficou bem direto e funcional!"]
  }
];

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderFeed() {
  feedEl.innerHTML = posts
    .map(
      (post) => `
      <article class="card" data-id="${post.id}">
        <div class="post-header">
          <span class="post-author">${escapeHTML(post.author)}</span>
          <span>${escapeHTML(post.time)}</span>
        </div>
        <p class="post-content">${escapeHTML(post.content)}</p>
        <button class="like-btn ${post.liked ? "liked" : ""}" data-action="like">
          Curtir (${post.likes})
        </button>

        <div class="comments">
          ${post.comments
            .map((c) => `<div class="comment-item">${escapeHTML(c)}</div>`)
            .join("")}
          <form class="comment-form" data-action="comment">
            <input
              type="text"
              placeholder="Escreva um comentário..."
              required
            />
            <button type="submit">Comentar</button>
          </form>
        </div>
      </article>
    `
    )
    .join("");
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
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    likes: 0,
    liked: false,
    comments: []
  });

  contentInput.value = "";
  renderFeed();
});

feedEl.addEventListener("click", (e) => {
  const btn = e.target.closest('[data-action="like"]');
  if (!btn) return;

  const card = e.target.closest(".card");
  const post = posts.find((item) => item.id === card.dataset.id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
});

feedEl.addEventListener("submit", (e) => {
  const form = e.target.closest('[data-action="comment"]');
  if (!form) return;

  e.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const card = e.target.closest(".card");
  const post = posts.find((item) => item.id === card.dataset.id);
  if (!post) return;

  post.comments.push(text);
  renderFeed();
});

renderFeed();
