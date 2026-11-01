
function openModal() {
  document.getElementById("postModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("postModal").style.display = "none";
}

function toggleLike(button) {
  button.classList.toggle("active");
  button.textContent = button.classList.contains("active")
    ? "♥ Curtido"
    : "♡ Curtir";
}

function toggleSave(button) {
  button.classList.toggle("active");
  button.textContent = button.classList.contains("active")
    ? "🔖 Salvo"
    : "🔖 Salvar";
}

function focusComment(button) {
  const form = button.closest(".post").querySelector(".comment-form");
  form.querySelector("input").focus();
}

function addComment(event, form) {
  event.preventDefault();

  const input = form.querySelector("input");
  const text = input.value.trim();

  if (!text) return;

  const comment = document.createElement("p");
  comment.textContent = "Você: " + text;

  form.previousElementSibling.appendChild(comment);
  input.value = "";
}

function createPost() {
  const username = document.getElementById("newUsername").value.trim() || "Você";
  const image = document.getElementById("newImage").value.trim();
  const caption = document.getElementById("newCaption").value.trim();

  if (!caption) {
    alert("Escreva alguma coisa antes de publicar!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const header = document.createElement("div");
  header.className = "post-header";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = username.charAt(0).toUpperCase();

  const identity = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = username;

  const handle = document.createElement("small");
  handle.textContent = "@usuario";

  identity.append(name, handle);
  header.append(avatar, identity);

  post.appendChild(header);

  if (image) {
    const img = document.createElement("img");
    img.className = "post-image";
    img.src = image;
    img.alt = "Imagem da publicação";
    post.appendChild(img);
  }

  const actions = document.createElement("div");
  actions.className = "post-actions";

  const like = document.createElement("button");
  like.textContent = "♡ Curtir";
  like.onclick = () => toggleLike(like);

  const commentButton = document.createElement("button");
  commentButton.textContent = "💬 Comentar";
  commentButton.onclick = () => focusComment(commentButton);

  const save = document.createElement("button");
  save.textContent = "🔖 Salvar";
  save.onclick = () => toggleSave(save);

  actions.append(like, commentButton, save);
  post.appendChild(actions);

  const paragraph = document.createElement("p");
  const bold = document.createElement("strong");
  bold.textContent = username + " ";
  paragraph.append(bold, document.createTextNode(caption));
  post.appendChild(paragraph);

  const comments = document.createElement("div");
  comments.className = "comments";
  post.appendChild(comments);

  const form = document.createElement("form");
  form.className = "comment-form";
  form.onsubmit = (event) => addComment(event, form);

  const input = document.createElement("input");
  input.placeholder = "Adicione um comentário...";
  input.required = true;

  const send = document.createElement("button");
  send.textContent = "Enviar";

  form.append(input, send);
  post.appendChild(form);

  document.getElementById("feed").prepend(post);

  document.getElementById("newUsername").value = "";
  document.getElementById("newImage").value = "";
  document.getElementById("newCaption").value = "";

  closeModal();
}

function searchPosts() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  document.querySelectorAll(".post").forEach(post => {
    post.style.display = post.textContent.toLowerCase().includes(search)
      ? "block"
      : "none";
  });
}

function showFeed() {
  document.querySelectorAll(".post").forEach(post => post.style.display = "block");
  document.querySelector(".section-title").textContent = "Seu feed";
}

function showExplore() {
  showFeed();
  document.querySelector(".section-title").textContent = "Explorar";
}

function showSaved() {
  document.querySelectorAll(".post").forEach(post => {
    post.style.display = post.querySelector(".post-actions button:nth-child(3)").classList.contains("active")
      ? "block" : "none";
  });
  document.querySelector(".section-title").textContent = "Publicações salvas";
}

function showProfile() {
  showFeed();
  document.querySelector(".section-title").textContent = "Meu perfil";
}

function showMessages() {
  alert("Área de mensagens em desenvolvimento!");
}

function toggleFollow(button) {
  button.textContent = button.textContent === "Seguir" ? "Seguindo" : "Seguir";
  button.style.color = button.textContent === "Seguindo" ? "#999" : "#ed7800";
}
