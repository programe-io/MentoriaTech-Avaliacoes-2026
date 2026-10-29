
const $ = (selector) => document.querySelector(selector);

const form = $("#post-form");
const postText = $("#post-text");
const postsContainer = $("#posts");

const defaultPosts = [
  {
    id: 1,
    user: "Lucas Martins",
    handle: "@lucas.fit",
    avatar: "L",
    time: "Hoje",
    text: "Treino de peito concluído! 💪 Cada dia é uma nova oportunidade de evoluir. #Constancia",
    workout: "🏋️ TREINO CONCLUÍDO · PEITO E TRÍCEPS",
    likes: 12,
    liked: false,
    comments: ["Bora evoluir! 🔥"]
  },
  {
    id: 2,
    user: "Marina Costa",
    handle: "@marina.move",
    avatar: "M",
    time: "Hoje",
    text: "Não precisa ser perfeito, só precisa começar. Hoje foi dia de cardio! 🏃‍♀️",
    workout: "⚡ CARDIO · FOCO E DISCIPLINA",
    likes: 24,
    liked: false,
    comments: []
  }
];

function loadPosts() {
  try {
    const saved = localStorage.getItem("fitsocial-posts");
    return saved ? JSON.parse(saved) : defaultPosts;
  } catch {
    return defaultPosts;
  }
}

let posts = loadPosts();

function savePosts() {
  localStorage.setItem("fitsocial-posts", JSON.stringify(posts));
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
  $("#post-count").textContent = posts.filter(
    post => post.user === "Você"
  ).length;

  postsContainer.innerHTML = posts.map(post => `
    <article class="post" data-id="${post.id}">
      <div class="post-header">
        <div class="avatar">${escapeHTML(post.avatar)}</div>
        <div class="post-user">
          <strong>${escapeHTML(post.user)}</strong>
          <span>${escapeHTML(post.handle)}</span>
        </div>
        <span class="post-time">${escapeHTML(post.time)}</span>
      </div>

      <p class="post-content">${escapeHTML(post.text)}</p>

      ${post.workout ? `
        <div class="workout-banner">${escapeHTML(post.workout)}</div>
      ` : ""}

      <div class="post-actions">
        <button class="action-btn ${post.liked ? "liked" : ""}"
          data-action="like"
          aria-pressed="${post.liked}">
          ${post.liked ? "❤️" : "🤍"} Curtir ${post.likes}
        </button>
        <button class="action-btn" data-action="comment">
          💬 Comentar (${post.comments.length})
        </button>
      </div>

      <div class="comment-list">
        ${post.comments.map(comment => `
          <div class="comment">
            <strong>Visitante:</strong> ${escapeHTML(comment)}
          </div>
        `).join("")}
      </div>

      <form class="comment-form">
        <input name="comment" maxlength="200"
          placeholder="Escreva um comentário..."
          aria-label="Escreva um comentário" required>
        <button class="btn" type="submit">Enviar</button>
      </form>
    </article>
  `).join("");
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const text = postText.value.trim();
  if (!text) return;

  posts.unshift({
    id: Date.now(),
    user: "Você",
    handle: "@visitante",
    avatar: "V",
    time: "Agora",
    text,
    workout: "",
    likes: 0,
    liked: false,
    comments: []
  });

  savePosts();
  renderPosts();
  postText.value = "";
});

postsContainer.addEventListener("click", event => {
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
});

postsContainer.addEventListener("submit", event => {
  if (!event.target.matches(".comment-form")) return;

  event.preventDefault();

  const article = event.target.closest(".post");
  const post = posts.find(item => item.id === Number(article.dataset.id));
  const input = event.target.elements.comment;
  const comment = input.value.trim();

  if (!post || !comment) return;

  post.comments.push(comment);
  savePosts();
  renderPosts();
});

// Desafio de 7 dias
let completedDays = Number(localStorage.getItem("fitsocial-days")) || 0;
completedDays = Math.min(7, Math.max(0, completedDays));

function updateChallenge() {
  $("#progress").style.width = `${completedDays / 7 * 100}%`;
  $("#progress-label").textContent =
    `${completedDays} de 7 dias concluídos`;

  $("#complete-day").disabled = completedDays >= 7;
  $("#complete-day").textContent =
    completedDays >= 7 ? "🏆 Desafio concluído!" : "✓ Concluir um dia";
}

$("#complete-day").addEventListener("click", () => {
  if (completedDays >= 7) return;

  completedDays++;
  localStorage.setItem("fitsocial-days", completedDays);
  updateChallenge();
});

$("#year").textContent = new Date().getFullYear();

renderPosts();
updateChallenge();
