const STORAGE_KEY = "ecofeed_natureza_v1";
const CURRENT_USER = "Marina Silva";

const VISUAL_MAP = {
  none: null,
  forest: { icon: "🌳", bg: "linear-gradient(135deg, #d7ead2, #b4d8ae)" },
  bird: { icon: "🦜", bg: "linear-gradient(135deg, #fff1c9, #f7dc8c)" },
  river: { icon: "🌊", bg: "linear-gradient(135deg, #d0ecf7, #a4d6eb)" },
  sprout: { icon: "🌱", bg: "linear-gradient(135deg, #dff0dc, #bfe1bc)" }
};

const initialPosts = [
  {
    id: 1,
    author: "Lucas Andrade",
    avatar: "🥾",
    time: "Há 2 horas",
    topic: "Trilhas",
    visual: "forest",
    text: "Subi a trilha do mirante cedinho. A neblina entre as árvores e o som da água lá embaixo deixam tudo mais calmo.",
    likes: 14,
    liked: false,
    comments: [
      { author: "Camila Rocha", text: "Que visual incrível! Levo sempre água e saco de lixo na mochila." }
    ]
  },
  {
    id: 2,
    author: "Camila Rocha",
    avatar: "🦋",
    time: "Há 5 horas",
    topic: "Fauna",
    visual: "bird",
    text: "Dois tucanos pousaram na árvore em frente ao quintal hoje de manhã. Manter plantas nativas faz toda diferença.",
    likes: 22,
    liked: true,
    comments: [
      { author: "Lucas Andrade", text: "Que sorte! Observar aves de longe é sempre um presente." }
    ]
  },
  {
    id: 3,
    author: "Rafael Mendes",
    avatar: "🌊",
    time: "Ontem",
    topic: "Águas",
    visual: "river",
    text: "Mutirão de limpeza na margem do rio neste fim de semana: recolhemos dezenas de garrafas e plásticos antes que chegassem mais longe.",
    likes: 31,
    liked: false,
    comments: []
  }
];

function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function loadPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error("Erro ao carregar posts:", err);
  }
  return initialPosts;
}

let posts = loadPosts();
let activeTopic = "Todos";
let openCommentPostIds = new Set([1, 2]);

const feedList = document.getElementById("feedList");
const emptyMsg = document.getElementById("emptyMsg");
const postForm = document.getElementById("postForm");
const postText = document.getElementById("postText");
const postTopic = document.getElementById("postTopic");
const postVisual = document.getElementById("postVisual");
const topicButtons = document.querySelectorAll(".topic-btn");
const statPosts = document.getElementById("statPosts");
const statLikes = document.getElementById("statLikes");

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function updateStats() {
  statPosts.textContent = String(posts.length);
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);
  statLikes.textContent = String(totalLikes);
}

function renderFeed() {
  const filtered =
    activeTopic === "Todos"
      ? posts
      : posts.filter((post) => post.topic === activeTopic);

  feedList.innerHTML = "";
  emptyMsg.hidden = filtered.length > 0;

  filtered.forEach((post) => {
    const visualData = VISUAL_MAP[post.visual];
    const isCommentsOpen = openCommentPostIds.has(post.id);

    const bannerHTML = visualData
      ? `<div class="post-banner" style="background: ${visualData.bg}" aria-hidden="true">${visualData.icon}</div>`
      : "";

    const commentsHTML = isCommentsOpen
      ? `
        <div class="comments-box">
          ${post.comments
            .map(
              (c) =>
                `<div class="comment-item"><strong>${escapeHTML(c.author)}</strong>${escapeHTML(c.text)}</div>`
            )
            .join("")}
          <form class="comment-form" data-comment-form="${post.id}">
            <input
              type="text"
              placeholder="Escreva um comentário..."
              aria-label="Escreva um comentário"
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      `
      : "";

    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <div class="post-header">
        <div class="post-author-wrap">
          <span class="avatar">${escapeHTML(post.avatar)}</span>
          <div>
            <div class="post-author">${escapeHTML(post.author)}</div>
            <div class="post-time">${escapeHTML(post.time)}</div>
          </div>
        </div>
        <span class="topic-tag">${escapeHTML(post.topic)}</span>
      </div>

      <p class="post-text">${escapeHTML(post.text)}</p>
      ${bannerHTML}

      <div class="post-actions">
        <button class="action-btn ${post.liked ? "liked" : ""}" data-like="${post.id}">
          ${post.liked ? "♥" : "♡"} <span>${post.likes}</span>
        </button>
        <button class="action-btn" data-toggle-comments="${post.id}">
          💬 <span>${post.comments.length}</span>
        </button>
      </div>

      ${commentsHTML}
    `;

    feedList.appendChild(article);
  });

  updateStats();
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = postText.value.trim();
  if (!text) return;

  const newPost = {
    id: Date.now(),
    author: CURRENT_USER,
    avatar: "🌿",
    time: "Agora mesmo",
    topic: postTopic.value,
    visual: postVisual.value,
    text,
    likes: 0,
    liked: false,
    comments: []
  };

  posts.unshift(newPost);
  openCommentPostIds.add(newPost.id);
  savePosts();

  postText.value = "";
  postVisual.value = "none";

  if (activeTopic !== "Todos" && activeTopic !== newPost.topic) {
    activeTopic = "Todos";
    topicButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.topic === "Todos");
    });
  }

  renderFeed();
});

topicButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    topicButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeTopic = btn.dataset.topic;
    renderFeed();
  });
});

feedList.addEventListener("click", (event) => {
  const likeBtn = event.target.closest("[data-like]");
  if (likeBtn) {
    const id = Number(likeBtn.dataset.like);
    const post = posts.find((p) => p.id === id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    savePosts();
    renderFeed();
    return;
  }

  const commentToggleBtn = event.target.closest("[data-toggle-comments]");
  if (commentToggleBtn) {
    const id = Number(commentToggleBtn.dataset.toggleComments);
    if (openCommentPostIds.has(id)) {
      openCommentPostIds.delete(id);
    } else {
      openCommentPostIds.add(id);
    }
    renderFeed();
  }
});

feedList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-comment-form]");
  if (!form) return;

  event.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const id = Number(form.dataset.commentForm);
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.comments.push({
    author: CURRENT_USER,
    text
  });
  openCommentPostIds.add(id);
  savePosts();
  renderFeed();
});

renderFeed();