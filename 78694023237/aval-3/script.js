const tweetForm = document.getElementById("tweetForm");
const tweetInput = document.getElementById("tweetInput");
const charCount = document.getElementById("charCount");
const feedList = document.getElementById("feedList");
const searchInput = document.getElementById("searchInput");

// Posts iniciais de exemplo
const defaultPosts = [
  {
    id: 1,
    name: "Ana Silva",
    handle: "@anasilva",
    avatar: "👩🏻",
    text: "Acabei de criar meu primeiro clone do X usando apenas HTML, CSS e JavaScript! 🚀",
    time: "2h",
    likes: 14,
    liked: false,
    retweets: 3,
    retweeted: false,
    isMine: false
  },
  {
    id: 2,
    name: "Dev Brasil",
    handle: "@devbrasil",
    avatar: "💻",
    text: "Dica do dia: dominar JavaScript puro facilita muito o aprendizado de qualquer framework.",
    time: "5h",
    likes: 42,
    liked: true,
    retweets: 11,
    retweeted: false,
    isMine: false
  }
];

let posts = JSON.parse(localStorage.getItem("x_clone_posts")) || defaultPosts;

function savePosts() {
  localStorage.setItem("x_clone_posts", JSON.stringify(posts));
}

// Renderizar Feed
function renderPosts(filter = "") {
  feedList.innerHTML = "";

  const filtered = posts.filter(post =>
    post.text.toLowerCase().includes(filter.toLowerCase()) ||
    post.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <div class="avatar">${post.avatar}</div>
      <div class="post-content">
        <div class="post-header">
          <strong>${post.name}</strong>
          <span>${post.handle}</span>
          <span>·</span>
          <time>${post.time}</time>
        </div>
        <p class="post-text"></p>
        <div class="post-footer">
          <button class="action-btn ${post.retweeted ? "retweeted" : ""}" onclick="toggleRetweet(${post.id})">
            🔁 ${post.retweets}
          </button>
          <button class="action-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
            ${post.liked ? "❤️" : "🤍"} ${post.likes}
          </button>
          ${post.isMine ? `<button class="action-btn delete-btn" onclick="deletePost(${post.id})">🗑️ Apagar</button>` : ""}
        </div>
      </div>
    `;

    // Evita injeção de HTML no texto do usuário
    article.querySelector(".post-text").textContent = post.text;
    feedList.appendChild(article);
  });
}

// Criar novo post
tweetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = tweetInput.value.trim();
  if (!text) return;

  const newPost = {
    id: Date.now(),
    name: "Você",
    handle: "@voce_dev",
    avatar: "🧑🏻",
    text: text,
    time: "Agora",
    likes: 0,
    liked: false,
    retweets: 0,
    retweeted: false,
    isMine: true
  };

  posts.unshift(newPost);
  savePosts();
  tweetInput.value = "";
  charCount.textContent = "280";
  renderPosts(searchInput.value);
});

// Contador de caracteres
tweetInput.addEventListener("input", () => {
  const remaining = 280 - tweetInput.value.length;
  charCount.textContent = remaining;
  charCount.style.color = remaining <= 20 ? "#f4212e" : "#71767b";
});

// Curtir
window.toggleLike = function(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  savePosts();
  renderPosts(searchInput.value);
};

// Repostar
window.toggleRetweet = function(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.retweeted = !post.retweeted;
  post.retweets += post.retweeted ? 1 : -1;
  savePosts();
  renderPosts(searchInput.value);
};

// Apagar post próprio
window.deletePost = function(id) {
  posts = posts.filter(p => p.id !== id);
  savePosts();
  renderPosts(searchInput.value);
};

// Pesquisa em tempo real
searchInput.addEventListener("input", (e) => {
  renderPosts(e.target.value);
});

// Inicializar
renderPosts();
