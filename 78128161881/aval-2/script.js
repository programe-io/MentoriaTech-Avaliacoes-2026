
/* ===== MINI FEED | INTERAÇÕES ===== */

const postInput = document.querySelector("#post-input");
const publishButton = document.querySelector("#publish-button");
const postsContainer = document.querySelector("#posts-container");
const formMessage = document.querySelector("#form-message");
const emptyState = document.querySelector("#empty-state");
const postCount = document.querySelector("#profile-post-count");

// Atualiza a quantidade de publicações
function updatePostCount() {
  postCount.textContent =
    postsContainer.querySelectorAll(".post").length;
}

// Cria uma nova publicação
function createPost(text) {
  const post = document.createElement("article");
  post.className = "post card";

  post.innerHTML = `
    <div class="post-header">
      <span class="avatar avatar-blue">E</span>

      <div class="post-author">
        <strong>Esdras Marques</strong>
        <span>@esdras · agora</span>
      </div>

      <button class="more-button" type="button">
        ···
      </button>
    </div>

    <p class="post-text"></p>

    <div class="post-actions">
      <button
        class="action-button like-button"
        type="button"
        aria-pressed="false"
      >
        <span class="action-icon">♡</span>
        <span class="like-label">Curtir</span>
        <span class="like-count">0</span>
      </button>

      <button
        class="action-button comment-toggle"
        type="button"
      >
        <span class="action-icon">◯</span>
        Comentar
      </button>
    </div>

    <div class="comments-area" hidden>
      <div class="comments-list"></div>

      <form class="comment-form">
        <input
          type="text"
          placeholder="Escreva um comentário..."
        >

        <button type="submit">Enviar</button>
      </form>
    </div>
  `;

  // Insere o texto da publicação
  post.querySelector(".post-text").textContent = text;

  // Adiciona a publicação no início do feed
  postsContainer.prepend(post);

  emptyState.hidden = true;

  updatePostCount();

  postInput.value = "";
  formMessage.textContent = "";
}

// Função para publicar
function publishPost() {
  const text = postInput.value.trim();

  if (!text) {
    formMessage.textContent =
      "Escreva algo antes de publicar.";

    postInput.focus();
    return;
  }

  createPost(text);
}

// Evento do botão publicar
publishButton.addEventListener("click", publishPost);

// Permite publicar pressionando Enter
postInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    publishPost();
  }
});

// CURTIDAS E ABERTURA DOS COMENTÁRIOS

postsContainer.addEventListener("click", (event) => {

  // Curtir publicação
  const likeButton = event.target.closest(".like-button");

  if (likeButton) {
    const liked =
      likeButton.getAttribute("aria-pressed") === "true";

    const countElement =
      likeButton.querySelector(".like-count");

    const count = Number(countElement.textContent) || 0;

    likeButton.setAttribute(
      "aria-pressed",
      String(!liked)
    );

    likeButton.classList.toggle("liked", !liked);

    likeButton.querySelector(".action-icon").textContent =
      liked ? "♡" : "♥";

    likeButton.querySelector(".like-label").textContent =
      liked ? "Curtir" : "Curtido";

    countElement.textContent =
      liked ? Math.max(0, count - 1) : count + 1;

    return;
  }

  // Abrir ou fechar comentários
  const commentToggle =
    event.target.closest(".comment-toggle");

  if (commentToggle) {
    const area =
      commentToggle.closest(".post")
      .querySelector(".comments-area");

    area.hidden = !area.hidden;

    if (!area.hidden) {
      area.querySelector("input").focus();
    }
  }
});

// ADICIONAR COMENTÁRIOS

postsContainer.addEventListener("submit", (event) => {

  const form = event.target.closest(".comment-form");

  if (!form) return;

  event.preventDefault();

  const input = form.querySelector("input");

  const commentText = input.value.trim();

  if (!commentText) return;

  // Cria o comentário
  const comment = document.createElement("div");
  comment.className = "comment";

  const author = document.createElement("strong");
  author.textContent = "Esdras";

  const text = document.createElement("span");
  text.textContent = commentText;

  comment.append(author, text);

  // Adiciona na lista de comentários
  form.closest(".comments-area")
    .querySelector(".comments-list")
    .append(comment);

  input.value = "";
});

// Inicialização
updatePostCount();
