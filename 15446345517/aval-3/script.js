
function like(element) {
  const post = element.closest(".post");
  const likes = post.querySelector(".likes");

  let count = parseInt(likes.textContent);

  if (element.classList.contains("liked")) {
    element.classList.remove("liked");
    element.textContent = "♡";
    count--;
  } else {
    element.classList.add("liked");
    element.textContent = "♥";
    count++;
  }

  likes.textContent = count + " curtidas";
}

function comment(button) {
  const post = button.closest(".post");
  const input = post.querySelector(".comment-area input");
  const comments = post.querySelector(".comments");

  if (input.value.trim() === "") return;

  const p = document.createElement("p");
  const strong = document.createElement("strong");

  strong.textContent = "seu_usuario ";
  p.appendChild(strong);
  p.appendChild(document.createTextNode(input.value));

  comments.appendChild(p);
  input.value = "";
}

function focusComment(element) {
  element.closest(".post")
    .querySelector(".comment-area input").focus();
}

function follow(button) {
  if (button.textContent === "Seguir") {
    button.textContent = "Seguindo";
  } else {
    button.textContent = "Seguir";
  }
}

function createPost() {
  const image = document.getElementById("imageUrl").value.trim();
  const caption = document.getElementById("caption").value.trim();

  if (!image) {
    alert("Insira uma URL de imagem!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const header = document.createElement("div");
  header.className = "post-header";

  const avatar = document.createElement("img");
  avatar.src = "https://i.pravatar.cc/100?img=11";

  const username = document.createElement("strong");
  username.textContent = "seu_usuario";

  header.append(avatar, username);

  const photo = document.createElement("img");
  photo.className = "post-image";
  photo.src = image;
  photo.alt = "Nova publicação";

  const actions = document.createElement("div");
  actions.className = "post-actions";

  const heart = document.createElement("span");
  heart.textContent = "♡";
  heart.onclick = () => like(heart);

  const chat = document.createElement("span");
  chat.textContent = "💬";
  chat.onclick = () => focusComment(chat);

  const share = document.createElement("span");
  share.textContent = "➤";

  actions.append(heart, chat, share);

  const info = document.createElement("div");
  info.className = "post-info";

  const likes = document.createElement("strong");
  likes.className = "likes";
  likes.textContent = "0 curtidas";

  const description = document.createElement("p");
  const bold = document.createElement("strong");
  bold.textContent = "seu_usuario ";

  description.append(bold, document.createTextNode(caption));

  const comments = document.createElement("div");
  comments.className = "comments";

  info.append(likes, description, comments);

  const area = document.createElement("div");
  area.className = "comment-area";

  const input = document.createElement("input");
  input.placeholder = "Adicione um comentário...";

  const button = document.createElement("button");
  button.textContent = "Publicar";
  button.onclick = () => comment(button);

  area.append(input, button);

  post.append(header, photo, actions, info, area);

  document.getElementById("feed").prepend(post);

  document.getElementById("imageUrl").value = "";
  document.getElementById("caption").value = "";
}
