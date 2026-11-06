
// Curtir publicação
function likePost(element) {
  const post = element.closest(".post");
  const button = post.querySelector(".actions span");
  const likes = post.querySelector(".likes");

  if (!post.dataset.liked) {
    post.dataset.liked = "true";
    button.innerHTML = "♥";
    button.classList.add("liked");

    let total = parseInt(likes.innerText);
    likes.innerText = (total + 1) + " curtidas";
  } else {
    delete post.dataset.liked;
    button.innerHTML = "♡";
    button.classList.remove("liked");

    let total = parseInt(likes.innerText);
    likes.innerText = (total - 1) + " curtidas";
  }
}

// Focar nos comentários
function focusComment(element) {
  element.closest(".post")
    .querySelector(".comment-form input").focus();
}

// Adicionar comentário
function addComment(event, form) {
  event.preventDefault();

  const input = form.querySelector("input");
  const text = input.value.trim();

  if (!text) return;

  const list = form.closest(".post")
    .querySelector(".comment-list");

  const comment = document.createElement("p");
  comment.className = "comment";

  const username = document.createElement("b");
  username.textContent = "seu_usuario ";

  comment.append(username, document.createTextNode(text));
  list.appendChild(comment);

  input.value = "";
}

// Criar nova publicação
document.getElementById("file").addEventListener("change", function() {
  const file = this.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Selecione uma imagem válida.");
    return;
  }

  const url = URL.createObjectURL(file);

  const post = document.createElement("article");
  post.className = "post";
  post.dataset.user = "seu_usuario";

  post.innerHTML = `
    <div class="post-header">
      <img src="https://i.pravatar.cc/100?img=12">
      <strong>seu_usuario</strong>
    </div>

    <img class="post-image" src="${url}"
      ondblclick="likePost(this)">

    <div class="actions">
      <span onclick="likePost(this)">♡</span>
      <span onclick="focusComment(this)">♧</span>
      <span onclick="alert('Compartilhar!')">➤</span>
      <span class="save">♧</span>
    </div>

    <div class="post-info">
      <div class="likes">0 curtidas</div>
      <p class="caption">
        <b>seu_usuario</b> Minha nova publicação! ✨
      </p>
      <div class="comment-list"></div>
    </div>

    <form class="comment-form" onsubmit="addComment(event,this)">
      <input placeholder="Adicione um comentário...">
      <button>Publicar</button>
    </form>
  `;

  document.getElementById("posts").prepend(post);
  this.value = "";
});

// Pesquisar usuários
document.getElementById("search").addEventListener("input", function() {
  const value = this.value.toLowerCase();

  document.querySelectorAll(".post").forEach(post => {
    post.style.display = post.dataset.user
      .toLowerCase().includes(value) ? "block" : "none";
  });
});
