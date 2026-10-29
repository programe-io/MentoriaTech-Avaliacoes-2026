
const initialPosts = [
  {
    id: 1,
    author: "Luna Vampire",
    avatar: "🧛",
    category: "Série",
    title: "Team Damon ou Team Stefan? 🩸",
    text: "Vamos falar de The Vampire Diaries! O Damon tem aquele jeito sarcástico que conquista todo mundo, mas o Stefan também tem seu charme. Qual dos dois irmãos Salvatore é o seu favorito? 👀",
    image: "https://placehold.co/900x420/25152f/f5d0fe?text=THE+VAMPIRE+DIARIES",
    likes: 128,
    comments: [],
    liked: false
  },
  {
    id: 2,
    author: "Capitão dos Mares",
    avatar: "🏴‍☠️",
    category: "One Piece",
    title: "O sonho do Rei dos Piratas! ☠️",
    text: "One Piece é muito mais do que encontrar um tesouro. A amizade dos Chapéus de Palha é incrível! Qual integrante da tripulação você levaria para uma aventura?",
    image: "https://placehold.co/900x420/182d45/b9dcff?text=ONE+PIECE",
    likes: 256,
    comments: [],
    liked: false
  },
  {
    id: 3,
    author: "Hashira da Lua",
    avatar: "⚔️",
    category: "Demon Slayer",
    title: "Qual é a respiração mais poderosa? 🔥",
    text: "Entre a Respiração da Água, do Fogo, do Trovão e do Sol, qual vocês acham mais incrível? Tanjiro, Zenitsu e Rengoku têm momentos inesquecíveis!",
    image: "https://placehold.co/900x420/25233d/d9d0ff?text=DEMON+SLAYER",
    likes: 194,
    comments: [],
    liked: false
  }
];

let posts = initialPosts.map(post => ({ ...post }));
let currentFilter = "Todos";
let nextId = 4;

const feed = document.getElementById("feed");

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderFeed() {
  const filtered = posts.filter(post => {
    if (currentFilter === "Todos") return true;

    if (currentFilter === "Anime") {
      return ["Anime", "One Piece", "Demon Slayer"]
        .includes(post.category);
    }

    if (currentFilter === "Série") {
      return post.category === "Série";
    }

    return post.category === currentFilter;
  });

  document.getElementById("postCount").textContent =
    `${filtered.length} publicação(ões)`;

  if (!filtered.length) {
    feed.innerHTML =
      '<div class="empty">Nenhuma publicação nesta categoria ainda. ✨</div>';
    return;
  }

  feed.innerHTML = filtered.map(post => `
    <article class="post">
      <div class="post-head">
        <div class="avatar">${escapeHTML(post.avatar)}</div>

        <div class="user-info">
          <strong>${escapeHTML(post.author)}</strong>
          <small>Na comunidade GeekVerse</small>
        </div>

        <span class="tag">${escapeHTML(post.category)}</span>
      </div>

      ${post.image ? `
        <img
          class="post-image"
          src="${escapeHTML(post.image)}"
          alt="${escapeHTML(post.title)}"
          loading="lazy"
          onerror="this.style.display='none'"
        >
      ` : ""}

      <div class="post-content">
        <h3>${escapeHTML(post.title)}</h3>
        <p>${escapeHTML(post.text)}</p>
      </div>

      <div class="post-actions">
        <button
          class="action-btn ${post.liked ? "liked" : ""}"
          onclick="toggleLike(${post.id})"
        >
          ${post.liked ? "♥ Curtido" : "♡ Curtir"}
          · ${post.likes}
        </button>

        <button
          class="action-btn"
          onclick="toggleComments(${post.id})"
        >
          💬 Comentários (${post.comments.length})
        </button>
      </div>

      <div class="comments" id="comments-${post.id}">
        <div class="comment-form">
          <input
            id="comment-input-${post.id}"
            placeholder="Escreva um comentário..."
          >
          <button onclick="addComment(${post.id})">
            Enviar
          </button>
        </div>

        <div class="comment-list">
          ${post.comments.map(comment => `
            <p>
              <strong>${escapeHTML(comment.author)}:</strong>
              ${escapeHTML(comment.text)}
            </p>
          `).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function createPost() {
  const authorInput = document.getElementById("author");
  const textInput = document.getElementById("postText");
  const category = document.getElementById("category").value;

  const author = authorInput.value.trim() || "Fã Geek";
  const text = textInput.value.trim();

  if (!text) {
    alert("Escreva algo antes de publicar!");
    return;
  }

  const titles = {
    "Série": "Minha opinião sobre séries 📺",
    "Anime": "Vamos conversar sobre animes ✨",
    "One Piece": "Uma aventura pelos mares 🏴‍☠️",
    "Demon Slayer": "Uma nova batalha começa ⚔️"
  };

  posts.unshift({
    id: nextId++,
    author,
    avatar: "🌟",
    category,
    title: titles[category],
    text,
    image: "",
    likes: 0,
    comments: [],
    liked: false
  });

  textInput.value = "";
  currentFilter = "Todos";

  updateFilters();
  renderFeed();
}

function toggleLike(id) {
  const post = posts.find(post => post.id === id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  renderFeed();
}

function toggleComments(id) {
  const area = document.getElementById(`comments-${id}`);
  const wasOpen = area.classList.contains("open");

  renderFeed();

  if (!wasOpen) {
    document.getElementById(`comments-${id}`)
      .classList.add("open");
  }
}

function addComment(id) {
  const post = posts.find(post => post.id === id);
  if (!post) return;

  const input = document.getElementById(`comment-input-${id}`);
  const text = input.value.trim();
  const author =
    document.getElementById("author").value.trim() || "Fã Geek";

  if (!text) return;

  post.comments.push({ author, text });

  renderFeed();

  document.getElementById(`comments-${id}`)
    .classList.add("open");
}

function updateFilters() {
  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === currentFilter
    );
  });
}

document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateFilters();
    renderFeed();
  });
});

renderFeed();
