
const $ = selector => document.querySelector(selector);

const initialPosts = [
  {
    id: 1,
    user: "ana.lifestyle",
    avatar: "A",
    caption: "Um dia lindo para aproveitar a natureza! ☀️🌿",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80",
    likes: 128,
    liked: false,
    comments: ["Que lugar incrível! 😍"]
  },
  {
    id: 2,
    user: "lucas.dev",
    avatar: "L",
    caption: "Café, código e muita criatividade. 💻☕",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    likes: 76,
    liked: false,
    comments: []
  }
];

function loadPosts() {
  try {
    const saved = localStorage.getItem("instamini-posts");
    return saved ? JSON.parse(saved) : initialPosts;
  } catch {
    return initialPosts;
  }
}

let posts = loadPosts();

function savePosts() {
  localStorage.setItem("instamini-posts", JSON.stringify(posts));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderPosts() {
  const term = $("#search").value.trim().toLowerCase();

  const filtered = posts.filter(post =>
    `${post.user} ${post.caption}`.toLowerCase().includes(term)
  );

  $("#empty").hidden = filtered.length > 0;

  $("#posts").innerHTML = filtered.map(post => `
    <article class="post" data-id="${post.id}">
      <header class="post-header">
        <div class="avatar">${escapeHTML(post.avatar)}</div>
        <div class="post-user">
          <strong>${escapeHTML(post.user)}</strong>
          <small>Publicado recentemente</small>
        </div>
        <button class="more-btn" aria-label="Mais opções">···</button>
      </header>

      ${post.image ? `
        <img class="post-image"
          src="${escapeHTML(post.image)}"
          alt="Foto publicada por ${escapeHTML(post.user)}"
          loading="lazy">
      ` : `
        <div class="post-placeholder" aria-label="Publicação sem foto">📸</div>
      `}

      <div class="post-body">
        <div class="actions">
          <button class="action ${post.liked ? "liked" : ""}"
            data-action="like" aria-label="Curtir"
            aria-pressed="${post.liked}">
            ${post.liked ? "♥" : "♡"}
          </button>
          <button class="action" data-action="comment"
            aria-label="Comentar">♧</button>
          <button class="action" data-action="share"
            aria-label="Compartilhar">➤</button>
        </div>

        <p class="likes">${post.likes} curtidas</p>
        <p class="caption">
          <strong>${escapeHTML(post.user)}</strong>
          ${escapeHTML(post.caption)}
        </p>

        <div class="comments">
          ${post.comments.map(comment => `
            <p><strong>visitante</strong> ${escapeHTML(comment)}</p>
          `).join("")}
        </div>

        <form class="comment-form">
          <input name="comment" maxlength="200"
            placeholder="Adicione um comentário..."
            aria-label="Adicionar comentário" required>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </article>
  `).join("");
}

// Criar publicação
$("#post-form").addEventListener("submit", event => {
  event.preventDefault();

  const input = $("#post-text");
  const caption = input.value.trim();

  if (!caption) return;

  posts.unshift({
    id: Date.now(),
    user: "visitante",
    avatar: "V",
    caption,
    image: "",
    likes: 0,
    liked: false,
    comments: []
  });

  savePosts();
  renderPosts();
  input.value = "";
});

// Curtir, comentar e compartilhar
$("#posts").addEventListener("click", async event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const article = button.closest(".post");
  const post = posts.find(item => item.id === Number(article.dataset.id));

  if (!post) return;

  if (button.dataset.action === "like") {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    savePosts();
    renderPosts();
  }

  if (button.dataset.action === "comment") {
    article.querySelector('input[name="comment"]').focus();
  }

  if (button.dataset.action === "share") {
    try {
      await navigator.clipboard.writeText(
        `${location.href} — Publicação de ${post.user}: ${post.caption}`
      );
      button.textContent = "✓";
    } catch {
      alert("Não foi possível copiar o texto neste navegador.");
    }
  }
});

// Adicionar comentários
$("#posts").addEventListener("submit", event => {
  if (!event.target.matches(".comment-form")) return;

  event.preventDefault();

  const article = event.target.closest(".post");
  const post = posts.find(item => item.id === Number(article.dataset.id));
  const comment = event.target.elements.comment.value.trim();

  if (!post || !comment) return;

  post.comments.push(comment);
  savePosts();
  renderPosts();
});

// Pesquisar usuários e publicações
$("#search").addEventListener("input", renderPosts);

// Botões de seguir
document.querySelectorAll(".follow-btn").forEach(button => {
  button.addEventListener("click", () => {
    const following = button.textContent === "Seguindo";
    button.textContent = following ? "Seguir" : "Seguindo";
    button.style.color = following ? "#0095f6" : "#8e8e8e";
  });
});

$("#home-btn").addEventListener("click", () => {
  $("#search").value = "";
  renderPosts();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("#year").textContent = new Date().getFullYear();

renderPosts();
