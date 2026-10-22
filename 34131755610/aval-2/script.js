
const postForm = document.querySelector("#post-form");
const postText = document.querySelector("#post-text");
const charCount = document.querySelector("#char-count");
const feed = document.querySelector("#feed");

// Atualiza a contagem de caracteres
postText.addEventListener("input", () => {
  charCount.textContent = `${postText.value.length}/500`;
});

// Cria o avatar do usuário
function createAvatar(letter, extraClass = "avatar-green") {
  const avatar = document.createElement("div");

  avatar.className = `avatar ${extraClass}`;
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = letter.toUpperCase();

  return avatar;
}

// Cria uma nova publicação
function createPost(text) {
  const article = document.createElement("article");
  article.className = "post card";

  // Cabeçalho
  const header = document.createElement("div");
  header.className = "post-header";
  header.appendChild(createAvatar("D"));

  const author = document.createElement("div");
  author.className = "post-author";

  const name = document.createElement("strong");
  name.textContent = "Demétrio";

  const time = document.createElement("span");
  time.textContent = "Agora · ✨ Comunidade";

  author.append(name, time);
  header.appendChild(author);

  const more = document.createElement("button");
  more.className = "more-button";
  more.type = "button";
  more.setAttribute("aria-label", "Mais opções");
  more.textContent = "•••";

  header.appendChild(more);

  // Texto da publicação
  const paragraph = document.createElement("p");
  paragraph.className = "post-text";
  paragraph.textContent = text;

  // Área dos botões
  const actions = document.createElement("div");
  actions.className = "post-actions";

  const like = document.createElement("button");
  like.className = "action-button like-button";
  like.type = "button";
  like.setAttribute("aria-pressed", "false");

  like.innerHTML =
    '<span aria-hidden="true">♡</span> Curtir ' +
    '<span class="like-count">0</span>';

  const comment = document.createElement("button");
  comment.className = "action-button comment-button";
  comment.type = "button";
  comment.innerHTML = "💬 Comentar";

  actions.append(like, comment);

  // Formulário de comentários
  const commentForm = document.createElement("form");
  commentForm.className = "comment-form hidden";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Escreva um comentário...";
  input.maxLength = 200;
  input.required = true;
  input.setAttribute("aria-label", "Escreva um comentário");

  const submit = document.createElement("button");
  submit.className = "primary-button small-button";
  submit.type = "submit";
  submit.textContent = "Enviar";

  commentForm.append(input, submit);

  const comments = document.createElement("div");
  comments.className = "comments-list";
  comments.setAttribute("aria-live", "polite");

  article.append(
    header,
    paragraph,
    actions,
    commentForm,
    comments
  );

  return article;
}

// Publicar uma nova postagem
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = postText.value.trim();

  if (!text) {
    postText.focus();
    return;
  }

  const newPost = createPost(text);
  const firstPost = feed.querySelector(".post");

  if (firstPost) {
    feed.insertBefore(newPost, firstPost);
  } else {
    feed.appendChild(newPost);
  }

  postText.value = "";
  charCount.textContent = "0/500";

  newPost.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Curtir postagens e abrir comentários
feed.addEventListener("click", (event) => {
  const likeButton = event.target.closest(".like-button");

  if (likeButton) {
    const countElement =
      likeButton.querySelector(".like-count");

    const isLiked =
      likeButton.getAttribute("aria-pressed") === "true";

    const currentCount = Number(countElement.textContent);

    likeButton.setAttribute(
      "aria-pressed",
      String(!isLiked)
    );

    likeButton.classList.toggle("liked", !isLiked);

    likeButton.querySelector("span:first-child").textContent =
      isLiked ? "♡" : "♥";

    countElement.textContent = String(
      currentCount + (isLiked ? -1 : 1)
    );

    return;
  }

  const commentButton =
    event.target.closest(".comment-button");

  if (commentButton) {
    const form = commentButton
      .closest(".post")
      .querySelector(".comment-form");

    form.classList.toggle("hidden");

    if (!form.classList.contains("hidden")) {
      form.querySelector("input").focus();
    }
  }
});

// Enviar comentários
feed.addEventListener("submit", (event) => {
  const form = event.target.closest(".comment-form");

  if (!form) return;

  event.preventDefault();

  const input = form.querySelector("input");
  const text = input.value.trim();

  if (!text) return;

  const item = document.createElement("div");
  item.className = "comment-item";

  const author = document.createElement("strong");
  author.textContent = "Demétrio";

  const message = document.createElement("span");
  message.textContent = text;

  item.append(author, message);

  form.closest(".post")
    .querySelector(".comments-list")
    .appendChild(item);

  input.value = "";
  form.classList.add("hidden");
});

// Destacar o link selecionado no menu
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
