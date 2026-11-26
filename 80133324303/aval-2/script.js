const postForm = document.getElementById("post-form");
const authorInput = document.getElementById("author-input");
const contentInput = document.getElementById("content-input");
const feedEl = document.getElementById("feed");

let posts = [
  {
    id: 1,
    author: "Ana Souza",
    time: "Agora mesmo",
    content: "Testando o novo mini feed construído com HTML, CSS e JavaScript puro!",
    likes: 2,
    liked: false,
    comments: ["Ficou bem clean!"]
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
          <span class="post-time">${escapeHTML(post.time)}</span>
        </div>
        <p class="post-content">${escapeHTML(post.content)}</p>
        <div class="post-actions">
          <button type="button" class="like-btn ${post.liked ? "liked" : ""}" data-action="like">
            ${post.liked ? "Curtido" : "Curtir"} (${post.likes})
          </button>
        </div>
        <div class="comments">
          ${post.comments
            .map((comment) => `<div class="comment">${escapeHTML(comment)}</div>`)
            .join("")}
        </div>
        <form class="comment-form" data-action="comment">
          <input type="text" placeholder="Escreva um comentário..." required />
          <button type="submit">Comentar</button>
        </form>
      </article>
    `
    )
    .join("");
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();
  if (!author || !content) return;

  posts.unshift({
    id: Date.now(),
    author,
    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    content,
    likes: 0,
    liked: false,
    comments: []
  });

  contentInput.value = "";
  renderFeed();
});

feedEl.addEventListener("click", (event) => {
  const likeBtn = event.target.closest('[data-action="like"]');
  if (!likeBtn) return;

  const card = likeBtn.closest(".card");
  const post = posts.find((item) => item.id === Number(card.dataset.id));
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderFeed();
});

feedEl.addEventListener("submit", (event) => {
  const form = event.target.closest('[data-action="comment"]');
  if (!form) return;

  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const card = form.closest(".card");
  const post = posts.find((item) => item.id === Number(card.dataset.id));
  if (!post) return;

  post.comments.push(text);
  renderFeed();
});

renderFeed();