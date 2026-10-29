// Dados simulados do feed
const postsData = [
  {
    id: 1,
    author: "Ana Silva",
    avatar: "A",
    time: "Há 2 horas",
    content: "Hoje o dia está excelente para programar novas interfaces! 🚀",
    likes: 0,
    liked: false,
    comments: ["Concordo totalmente!"]
  }
];

// Inicialização do Feed
document.addEventListener("DOMContentLoaded", () => {
  renderFeed();

  // Evento para publicar novo post
  const publishBtn = document.getElementById("publishBtn");
  if (publishBtn) {
    publishBtn.addEventListener("click", handleCreatePost);
  }
});

// Renderizar todos os posts na tela
function renderFeed() {
  const feedContainer = document.getElementById("feed");
  if (!feedContainer) return;

  feedContainer.innerHTML = "";

  postsData.forEach((post) => {
    const postElement = document.createElement("article");
    postElement.className = "post";

    postElement.innerHTML = `
      <header class="post-header">
        <div class="avatar">${post.avatar}</div>
        <div class="post-info">
          <h4>${post.author}</h4>
          <time>${post.time}</time>
        </div>
      </header>

      <div class="post-content">
        <p>${post.content}</p>
      </div>

      <footer class="post-footer">
        <div class="post-actions">
          <button type="button" class="action-btn like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
            <span class="like-icon">👍</span> 
            <span>Curtir</span> 
            (<span class="like-count">${post.likes}</span>)
          </button>
        </div>

        <section class="comments-section">
          <form class="comment-form" onsubmit="handleComment(event, ${post.id})">
            <input type="text" placeholder="Escreva um comentário..." aria-label="Escreva um comentário">
          </form>

          <div class="comment-list">
            ${post.comments.map(comment => `
              <article class="comment">
                <strong>Comentário</strong>
                <p>${comment}</p>
              </article>
            `).join('')}
          </div>
        </section>
      </footer>
    `;

    feedContainer.appendChild(postElement);
  });
}

// Criar nova publicação
function handleCreatePost() {
  const textarea = document.getElementById("postText");
  const content = textarea ? textarea.value.trim() : "";

  if (!content) return;

  const newPost = {
    id: Date.now(),
    author: "Você",
    avatar: "V",
    time: "Agora mesmo",
    content: content,
    likes: 0,
    liked: false,
    comments: []
  };

  postsData.unshift(newPost);
  textarea.value = "";
  renderFeed();
}

// Curtir / Descurtir
function toggleLike(postId) {
  const post = postsData.find(p => p.id === postId);
  if (!post) return;

  if (post.liked) {
    post.likes--;
    post.liked = false;
  } else {
    post.likes++;
    post.liked