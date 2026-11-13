function likePost(button) {
  const count = button.querySelector("span");
  let likes = Number(count.textContent);

  if (button.classList.contains("liked")) {
    likes--;
    button.classList.remove("liked");
  } else {
    likes++;
    button.classList.add("liked");
  }

  count.textContent = likes;
}

function addPost() {
  const input = document.getElementById("postText");
  const text = input.value.trim();

  if (!text) {
    alert("Digite algo para publicar!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const header = document.createElement("div");
  header.className = "post-header";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "V";

  const info = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = "Você";

  const time = document.createElement("small");
  time.textContent = "Agora";

  info.append(name, time);
  header.append(avatar, info);

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  actions.innerHTML = `
    <button onclick="likePost(this)">
      ❤️ <span>0</span>
    </button>
    <button onclick="commentPost(this)">💬 Comentar</button>
    <button onclick="sharePost()">↗ Compartilhar</button>
  `;

  const comments = document.createElement("div");
  comments.className = "comments";

  post.append(header, paragraph, actions, comments);

  document.getElementById("posts")
    .prepend(post);

  input.value = "";
}

function commentPost(button) {
  const comment = prompt("Digite seu comentário:");

  if (!comment || !comment.trim()) return;

  const comments = button
    .closest(".post")
    .querySelector(".comments");

  const item = document.createElement("div");
  item.className = "comment-item";
  item.textContent = "Você: " + comment.trim();

  comments.appendChild(item);
}

function sharePost() {
  if (navigator.share) {
    navigator.share({
      title: "Meu Feed",
      text: "Confira esta publicação!"
    }).catch(() => {});
  } else {
    alert("Compartilhamento não disponível neste navegador.");
  }
}