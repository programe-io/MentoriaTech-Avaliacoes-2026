
const posts = [
  {
    id: 1,
    user: "marcos1910",
    avatar: "https://i.pravatar.cc/100?img=47",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900",
    caption: "A paixão que passa de geração em geração. 🖤⚽ Vai, Corinthians!",
    likes: 310,
    comments: [],
    liked: false,
    saved: false
  },
  {
    id: 2,
    user: "biafiel",
    avatar: "https://i.pravatar.cc/100?img=12",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900",
    caption: "Dia de futebol é dia feliz! 🏆",
    likes: 189,
    comments: [],
    liked: false,
    saved: false
  },
  {
    id: 3,
    user: "lucas10",
    avatar: "https://i.pravatar.cc/100?img=44",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=900",
    caption: "Não importa o resultado, minha torcida nunca acaba! 🖤",
    likes: 425,
    comments: [],
    liked: false,
    saved: false
  }
];

const postsContainer = document.getElementById("posts");
const modal = document.getElementById("createModal");

// PROTEÇÃO DOS TEXTOS
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// EXIBIR PUBLICAÇÕES
function renderPosts(list = posts) {
  postsContainer.innerHTML = "";

  if (list.length === 0) {
    postsContainer.innerHTML = `
      <p style="text-align:center;padding:35px;color:#888">
        Nenhuma publicação encontrada. 🖤
      </p>
    `;
    return;
  }

  list.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <div class="post-header">
        <img src="${escapeHTML(post.avatar)}" class="avatar-img">

        <div>
          <strong>${escapeHTML(post.user)}</strong>
          <small>Fielgram • Compartilhado com todos</small>
        </div>

        <button class="more">···</button>
      </div>

      <img src="${escapeHTML(post.image)}"
        class="post-image" alt="Foto da publicação">

      <div class="post-actions">

        <button
          class="like-btn ${post.liked ? "liked" : ""}"
          data-action="like"
          data-id="${post.id}">
          ${post.liked ? "♥" : "♡"}
        </button>

        <button data-action="comment" data-id="${post.id}">
          ♧
        </button>

        <button data-action="share" data-id="${post.id}">
          ➤
        </button>

        <button class="save-btn"
          data-action="save"
          data-id="${post.id}">
          ${post.saved ? "▣" : "♧"}
        </button>

      </div>

      <div class="post-info">

        <p class="likes">${post.likes} curtidas</p>

        <p class="caption">
          <strong>${escapeHTML(post.user)}</strong>
          ${escapeHTML(post.caption)}
        </p>

        <div class="comment-list">
          ${post.comments.map(comment => `
            <p>
              <strong>${escapeHTML(comment.user)}</strong>
              ${escapeHTML(comment.text)}
            </p>
          `).join("")}
        </div>

        <form class="comment-form" data-id="${post.id}">
          <input type="text"
            placeholder="Adicione um comentário..."
            maxlength="300" required>

          <button type="submit">Publicar</button>
        </form>

      </div>
    `;

    postsContainer.appendChild(article);
  });
}

// CURTIDAS, SALVAMENTOS E COMENTÁRIOS
postsContainer.addEventListener("click", event => {

  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const post = posts.find(item => item.id === id);

  if (!post) return;

  const action = button.dataset.action;

  if (action === "like") {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    renderPosts(filteredPosts());
  }

  if (action === "save") {
    post.saved = !post.saved;
    renderPosts(filteredPosts());
  }

  if (action === "comment") {
    button.closest(".post")
      .querySelector(".comment-form input").focus();
  }

  if (action === "share") {
    const text = "Olha essa publicação na Fielgram! 🖤";

    if (navigator.share) {
      navigator.share({ title: "Fielgram", text })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => alert("Mensagem copiada!"));
    } else {
      alert(text);
    }
  }
});

// ADICIONAR COMENTÁRIOS
postsContainer.addEventListener("submit", event => {

  if (!event.target.matches(".comment-form")) return;

  event.preventDefault();

  const id = Number(event.target.dataset.id);
  const post = posts.find(item => item.id === id);

  const input = event.target.querySelector("input");
  const text = input.value.trim();

  if (!text || !post) return;

  post.comments.push({
    user: "amabile",
    text: text
  });

  renderPosts(filteredPosts());
});

// ABRIR E FECHAR PUBLICAÇÃO
function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

document.getElementById("openCreate")
  .addEventListener("click", openModal);

document.getElementById("mobileCreate")
  .addEventListener("click", openModal);

document.getElementById("closeModal")
  .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

// CRIAR NOVA PUBLICAÇÃO
document.getElementById("postForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const image = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    try {
      const url = new URL(image);

      if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error("Endereço inválido");
      }

      posts.unshift({
        id: Date.now(),
        user: "amabile",
        avatar: "https://i.pravatar.cc/100?img=5",
        image: url.href,
        caption: caption,
        likes: 0,
        comments: [],
        liked: false,
        saved: false
      });

      document.getElementById("searchInput").value = "";

      renderPosts();

      event.target.reset();
      closeModal();

    } catch {
      alert("Coloque um link válido para a imagem!");
    }
  });

// PESQUISAR PUBLICAÇÕES
function filteredPosts() {
  const query = document.getElementById("searchInput")
    .value.toLowerCase();

  return posts.filter(post =>
    post.user.toLowerCase().includes(query) ||
    post.caption.toLowerCase().includes(query)
  );
}

document.getElementById("searchInput")
  .addEventListener("input", () => {
    renderPosts(filteredPosts());
  });

// SEGUIR PESSOAS
document.querySelectorAll(".follow-btn").forEach(button => {

  button.addEventListener("click", () => {

    const following = button.classList.toggle("following");

    button.textContent = following ? "Seguindo" : "Seguir";
  });
});

// NAVEGAÇÃO
document.querySelectorAll(".nav-item").forEach(button => {

  button.addEventListener("click", () => {

    if (button.id === "openCreate") return;

    document.querySelectorAll(".nav-item")
      .forEach(item => item.classList.remove("active"));

    button.classList.add("active");

    const page = button.dataset.page;

    if (page === "home") {
      document.getElementById("searchInput").value = "";
      renderPosts();
    }

    if (page === "search") {
      document.getElementById("searchInput").focus();
    }

    if (page === "explore") {
      renderPosts([...posts].reverse());
    }

    if (page === "messages") {
      alert("Em breve: mensagens da Fielgram! ✉");
    }

    if (page === "notifications") {
      alert("Você está por dentro das novidades da Fielgram! 🖤");
    }

  });
});

// INICIAR O FEED
renderPosts();
