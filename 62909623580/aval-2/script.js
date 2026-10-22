
// ==============================
// FASHION FEED — INTERAÇÕES
// ==============================

const postForm = document.querySelector("#post-form");
const postText = document.querySelector("#post-text");
const charCount = document.querySelector("#char-count");
const postsContainer = document.querySelector("#posts-container");
const categoryFilter = document.querySelector("#category-filter");
const emptyMessage = document.querySelector("#empty-message");

// Imagem gratuita do Unsplash usada como capa padrão
// para as publicações criadas neste protótipo.
const defaultFashionImage =
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85";

// Contador de caracteres
postText.addEventListener("input", () => {
  charCount.textContent = `${postText.value.length}/500 caracteres`;
});

// Criar elementos com texto seguro
function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

// Criar o cabeçalho de uma publicação
function createPostHeader() {
  const header = createElement("div", "post-header");
  const userInfo = createElement("div", "user-info");
  const avatar = createElement("span", "avatar", "M");
  const details = createElement("div");
  const name = createElement("strong", "", "Marina Oliveira");
  const role = createElement("span", "muted", "Apaixonada por moda");
  const time = createElement("span", "post-time", "Agora");

  details.append(name, role);
  userInfo.append(avatar, details);
  header.append(userInfo, time);

  return header;
}

// Criar uma publicação completa
function createPost(text) {
  const article = createElement("article", "post-card card");
  article.dataset.category = "looks";

  const description = createElement("p", "post-text", text);

  const image = document.createElement("img");
  image.className = "post-image";
  image.src = defaultFashionImage;
  image.alt = "Inspiração de look para uma publicação de moda";
  image.loading = "lazy";

  const tags = createElement("div", "post-tags");
  tags.append(createElement("span", "", "#MeuLook"));
  tags.append(createElement("span", "", "#FashionFeed"));

  const actions = createElement("div", "post-actions");

  const likeButton = createElement("button", "action-button like-button");
  likeButton.type = "button";
  likeButton.setAttribute("aria-pressed", "false");
  likeButton.append(
    document.createTextNode("♡ ")
  );

  likeButton.append(
    createElement("span", "like-label", "Curtir"),
    createElement("span", "like-count", "0")
  );

  const commentButton = createElement(
    "button",
    "action-button comment-button",
    "♧ Comentar"
  );
  commentButton.type = "button";

  actions.append(likeButton, commentButton);

  const commentForm = createElement("form", "comment-form");
  const input = document.createElement("input");
  input.name = "comment";
  input.placeholder = "Escreva um comentário...";
  input.maxLength = 250;
  input.required = true;
  input.setAttribute("aria-label", "Escreva um comentário");

  const sendButton = createElement("button", "", "Enviar");
  sendButton.type = "submit";

  commentForm.append(input, sendButton);
  commentForm.hidden = true;

  const comments = createElement("div", "comments-list");
  comments.setAttribute("aria-live", "polite");

  article.append(
    createPostHeader(),
    description,
    image,
    tags,
    actions,
    commentForm,
    comments
  );

  return article;
}

// Publicar um novo look
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = postText.value.trim();

  if (!text) {
    postText.focus();
    return;
  }

  const newPost = createPost(text);

  // Coloca a nova publicação no início do feed.
  postsContainer.prepend(newPost);

  postForm.reset();
  charCount.textContent = "0/500 caracteres";

  // Se o filtro estiver em outra categoria, mostra
  // todas as publicações para exibir o novo post.
  categoryFilter.value = "todos";
  filterPosts();

  newPost.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Curtidas e abertura do formulário de comentário
// Um único listener atende aos cards existentes e novos.
postsContainer.addEventListener("click", (event) => {
  const likeButton = event.target.closest(".like-button");

  if (likeButton) {
    const countElement = likeButton.querySelector(".like-count");
    const wasLiked = likeButton.getAttribute("aria-pressed") === "true";
    const currentCount = Number(countElement.textContent) || 0;

    likeButton.setAttribute("aria-pressed", String(!wasLiked));
    countElement.textContent = String(
      Math.max(0, currentCount + (wasLiked ? -1 : 1))
    );

    return;
  }

  const commentButton = event.target.closest(".comment-button");

  if (commentButton) {
    const card = commentButton.closest(".post-card");
    const form = card.querySelector(".comment-form");

    form.hidden = !form.hidden;

    if (!form.hidden) {
      form.querySelector("input").focus();
    }
  }
});

// Enviar comentários sem interpretar o conteúdo como HTML
postsContainer.addEventListener("submit", (event) => {
  const form = event.target.closest(".comment-form");

  if (!form) return;

  event.preventDefault();

  const input = form.querySelector('input[name="comment"]');
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  const card = form.closest(".post-card");
  const comments = card.querySelector(".comments-list");

  const comment = createElement("p", "comment-item");
  const author = createElement("strong", "", "Você: ");

  comment.append(author, document.createTextNode(text));
  comments.append(comment);

  form.reset();
  form.hidden = true;
});

// Filtrar publicações por categoria
function filterPosts() {
  const selectedCategory = categoryFilter.value;
  const posts = postsContainer.querySelectorAll(".post-card");

  let visibleCount = 0;

  posts.forEach((post) => {
    const matches =
      selectedCategory === "todos" ||
      post.dataset.category === selectedCategory;

    post.hidden = !matches;

    if (matches) visibleCount++;
  });

  emptyMessage.hidden = visibleCount > 0;
}

categoryFilter.addEventListener("change", filterPosts);

// Executa o filtro inicial
filterPosts();
