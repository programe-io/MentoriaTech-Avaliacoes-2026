
// PUBLICAÇÕES INICIAIS

const posts = [
  {
    id: 1,
    user: "marinette",
    initial: "M",
    avatarClass: "marinette",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900",
    caption: "Um dia maravilhoso em Paris! Essa cidade nunca deixa de me surpreender. ❤️🐞",
    likes: 128,
    liked: false,
    saved: false,
    comments: []
  },
  {
    id: 2,
    user: "adrien.agreste",
    initial: "A",
    avatarClass: "adrien",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=900",
    caption: "Aproveitando uma tarde livre pela cidade. ☀️",
    likes: 245,
    liked: false,
    saved: false,
    comments: []
  },
  {
    id: 3,
    user: "alya.cesaire",
    initial: "A",
    avatarClass: "alya",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900",
    caption: "Sempre existe uma nova história esperando para ser contada! 📸✨",
    likes: 390,
    liked: false,
    saved: false,
    comments: []
  },
  {
    id: 4,
    user: "kagami.t",
    initial: "K",
    avatarClass: "kagami",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
    caption: "Momentos tranquilos também são especiais. ✨",
    likes: 176,
    liked: false,
    saved: false,
    comments: []
  }
];

const postsContainer = document.getElementById("posts");
const modal = document.getElementById("createModal");
const toast = document.getElementById("toast");

let toastTimer;

// PROTEGER TEXTOS INSERIDOS PELOS USUÁRIOS

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// AVISOS NA TELA

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// MOSTRAR PUBLICAÇÕES

function renderPosts(list = posts) {
  postsContainer.innerHTML = "";

  if (list.length === 0) {
    postsContainer.innerHTML = `
      <div style="
        background:white;
        padding:35px 15px;
        text-align:center;
        border-radius:12px;
        color:#938991;
        font-size:13px;">
        Nenhuma publicação encontrada. 🐞
      </div>
    `;
    return;
  }

  list.forEach(post => {
    const article = document.createElement("article");

    article.className = "post";

    article.innerHTML = `
      <div class="post-header">

        <div class="post-avatar ${escapeHTML(post.avatarClass)}">
          ${escapeHTML(post.initial)}
        </div>

        <div class="post-user">
          <strong>${escapeHTML(post.user)}</strong>
          <small>Paris, França ✦</small>
        </div>

        <button class="post-more">···</button>

      </div>

      <img
        src="${escapeHTML(post.image)}"
        class="post-image"
        alt="Foto da publicação"
        loading="lazy"
      >

      <div class="post-actions">

        <button
          class="like-btn ${post.liked ? "liked" : ""}"
          data-action="like"
          data-id="${post.id}">
          ${post.liked ? "♥" : "♡"}
        </button>

        <button
          data-action="comment"
          data-id="${post.id}">
          ♧
        </button>

        <button
          data-action="share"
          data-id="${post.id}">
          ➤
        </button>

        <button
          class="save-btn"
          data-action="save"
          data-id="${post.id}">
          ${post.saved ? "▣" : "♧"}
        </button>

      </div>

      <div class="post-info">

        <p class="likes">
          ${post.likes} curtidas
        </p>

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

          <input
            type="text"
            placeholder="Adicione um comentário..."
            maxlength="300"
            required
          >

          <button type="submit">Publicar</button>

        </form>

      </div>
    `;

    postsContainer.appendChild(article);
  });
}

// CURTIR, SALVAR E COMPARTILHAR

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

    showToast(
      post.saved
        ? "Publicação salva! ✨"
        : "Publicação removida dos salvos."
    );

    renderPosts(filteredPosts());
  }

  if (action === "comment") {

    button.closest(".post")
      .querySelector(".comment-form input")
      .focus();
  }

  if (action === "share") {

    const message = "Olha essa publicação no MiraculiGram! 🐞";

    if (navigator.share) {

      navigator.share({
        title: "MiraculiGram",
        text: message
      }).catch(() => {});

    } else if (navigator.clipboard) {

      navigator.clipboard.writeText(message)
        .then(() => showToast("Mensagem copiada! ❤️"))
        .catch(() => showToast(message));

    } else {
      showToast(message);
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

  if (!post || !text) return;

  post.comments.push({
    user: "meu_perfil",
    text: text
  });

  renderPosts(filteredPosts());

  showToast("Comentário publicado! 💗");
});

// ABRIR E FECHAR A JANELA

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

  if (event.target === modal) {
    closeModal();
  }

});

// CRIAR UMA NOVA PUBLICAÇÃO

document.getElementById("postForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const username = document.getElementById("username")
      .value.trim();

    const image = document.getElementById("imageUrl")
      .value.trim();

    const caption = document.getElementById("caption")
      .value.trim();

    try {

      const url = new URL(image);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Imagem inválida");
      }

      if (!username) {
        throw new Error("Nome inválido");
      }

      posts.unshift({
        id: Date.now(),
        user: username,
        initial: username.charAt(0).toUpperCase(),
        avatarClass: "my-avatar",
        image: url.href,
        caption: caption,
        likes: 0,
        liked: false,
        saved: false,
        comments: []
      });

      document.getElementById("searchInput").value = "";

      renderPosts();

      event.target.reset();

      document.getElementById("username").value = "meu_perfil";

      closeModal();

      showToast("Sua publicação chegou a Paris! 🐞");

    } catch {
      showToast("Confira o link da imagem e seu nome!");
    }

  });

// PESQUISAR PUBLICAÇÕES

function filteredPosts() {

  const query = document.getElementById("searchInput")
    .value.toLowerCase().trim();

  return posts.filter(post =>
    post.user.toLowerCase().includes(query) ||
    post.caption.toLowerCase().includes(query)
  );
}

document.getElementById("searchInput")
  .addEventListener("input", () => {

    renderPosts(filteredPosts());

  });

// BOTÕES DE SEGUIR

document.querySelectorAll(".follow-btn").forEach(button => {

  button.addEventListener("click", () => {

    const following = button.classList.toggle("following");

    button.textContent = following
      ? "Seguindo"
      : "Seguir";

  });

});

// STORIES

document.querySelectorAll(".story").forEach(story => {

  story.addEventListener("click", () => {

    const name = story.dataset.name;

    if (name) {
      showToast(`Você abriu o story de ${name}! ✨`);
    } else {
      openModal();
    }

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

    const search = document.getElementById("searchInput");

    if (page === "home") {

      search.value = "";

      renderPosts();

    }

    if (page === "search") {

      search.focus();

      showToast("Procure seus personagens favoritos! 🔎");

    }

    if (page === "explore") {

      renderPosts([...posts].reverse());

      showToast("Explorando o universo Miraculous! ✨");

    }

    if (page === "messages") {

      showToast("Em breve: mensagens de Paris! 💌");

    }

    if (page === "notifications") {

      showToast("Você está por dentro das novidades! ❤️");

    }

  });

});

// INICIALIZAR O FEED

renderPosts();
