
const style = document.createElement("style");

style.textContent = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #fafafa;
  color: #262626;
  font-family: Arial, sans-serif;
}

header {
  height: 60px;
  background: white;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-family: cursive;
  font-size: 30px;
  font-weight: bold;
}

header input {
  padding: 10px;
  background: #efefef;
  border: none;
  border-radius: 8px;
}

nav {
  display: flex;
  gap: 18px;
  font-size: 24px;
}

nav span, button {
  cursor: pointer;
}

.container {
  width: min(935px, 100%);
  margin: 30px auto;
  display: grid;
  grid-template-columns: minmax(0, 600px) 290px;
  gap: 30px;
  padding: 0 10px;
}

.stories {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 18px 12px;
  background: white;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 22px;
}

.story {
  min-width: 60px;
  text-align: center;
  font-size: 12px;
}

.story img {
  width: 58px;
  height: 58px;
  object-fit: cover;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #e1306c;
  margin-bottom: 5px;
}

.post {
  background: white;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
}

.post-header {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 50%;
}

.username {
  font-size: 14px;
  font-weight: bold;
}

.location {
  color: #888;
  font-size: 12px;
  margin-top: 4px;
}

.more {
  margin-left: auto;
  cursor: pointer;
}

.post-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.actions {
  display: flex;
  gap: 16px;
  padding: 12px;
}

.actions button {
  border: none;
  background: none;
  font-size: 25px;
}

.actions .save {
  margin-left: auto;
}

.likes, .caption, .comments {
  padding: 4px 12px;
  font-size: 14px;
}

.likes {
  font-weight: bold;
}

.caption {
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.comments {
  color: #888;
  padding-bottom: 12px;
}

.comment-form {
  display: flex;
  border-top: 1px solid #eee;
  padding: 12px;
}

.comment-form input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 0;
}

.comment-form button {
  border: none;
  background: none;
  color: #0095f6;
  font-weight: bold;
}

.right {
  padding-top: 15px;
}

.profile, .suggestion {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  font-size: 13px;
}

.profile img, .suggestion img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info, .suggestion-info {
  flex: 1;
}

.muted {
  color: #888;
  font-size: 12px;
  margin-top: 5px;
}

.follow {
  color: #0095f6;
  cursor: pointer;
  font-weight: bold;
}

h4 {
  color: #888;
  margin: 25px 0 18px;
}

@media (max-width: 760px) {
  .container {
    display: block;
    margin: 10px auto;
    padding: 0;
  }

  .right {
    display: none;
  }

  .post, .stories {
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }

  header {
    padding: 0 12px;
  }

  header input {
    display: none;
  }

  nav {
    gap: 12px;
  }
}
`;

document.head.appendChild(style);

document.body.innerHTML = `
<header>
  <div class="logo">Instagram</div>
  <input placeholder="Pesquisar">
  <nav>
    <span title="Início">⌂</span>
    <span title="Mensagens">✉</span>
    <span title="Criar publicação" id="create">＋</span>
    <span title="Curtidas">♡</span>
    <span title="Perfil">☻</span>
  </nav>
</header>

<div class="container">
  <main>
    <section class="stories" id="stories"></section>
    <section id="feed"></section>
  </main>

  <aside class="right">
    <div class="profile">
      <img src="https://i.pravatar.cc/100?img=12">
      <div class="profile-info">
        <b>seu_usuario</b>
        <div class="muted">Seu nome</div>
      </div>
      <span class="follow">Mudar</span>
    </div>

    <h4>Sugestões para você</h4>
    <div id="suggestions"></div>
  </aside>
</div>
`;

const people = [
  ["mariana.silva", 47],
  ["pedro.costa", 11],
  ["julia.oliveira", 32],
  ["gabriel", 53],
  ["ana.lima", 44],
  ["lucas", 15]
];

const posts = [
  {
    user: "mariana.silva",
    avatar: 47,
    location: "Teresina, PI",
    image: "photo-1534528741775-53994a69daeb",
    caption: "Vivendo cada momento ✨❤️",
    likes: 1248
  },
  {
    user: "pedro.costa",
    avatar: 11,
    location: "Praia 🌊",
    image: "photo-1507525428034-b723cf961d3e",
    caption: "Que lugar incrível! 🌴☀️",
    likes: 856
  },
  {
    user: "julia.oliveira",
    avatar: 32,
    location: "Em casa",
    image: "photo-1490750967868-88aa4486c946",
    caption: "Pequenas coisas, grandes felicidades 🌷",
    likes: 432
  }
];

const avatarURL = id => `https://i.pravatar.cc/100?img=${id}`;

document.querySelector("#stories").innerHTML = `
  <div class="story">
    <img src="${avatarURL(12)}"><div>Seu story</div>
  </div>
  ${people.map(([name, id]) => `
    <div class="story">
      <img src="${avatarURL(id)}"><div>${name}</div>
    </div>
  `).join("")}
`;

function renderPosts() {
  document.querySelector("#feed").innerHTML = posts.map((post, index) => `
    <article class="post">
      <div class="post-header">
        <img class="avatar" src="${avatarURL(post.avatar)}">
        <div>
          <div class="username">${post.user}</div>
          <div class="location">${post.location}</div>
        </div>
        <span class="more">•••</span>
      </div>

      <img class="post-image"
        src="https://images.unsplash.com/${post.image}?w=900&auto=format&fit=crop"
        alt="Publicação de ${post.user}">

      <div class="actions">
        <button data-action="like" data-index="${index}"
          style="color:${post.liked ? '#ff3040' : '#262626'}">
          ${post.liked ? "♥" : "♡"}
        </button>
        <button data-action="focus" data-index="${index}">♧</button>
        <button data-action="share" data-index="${index}">➤</button>
        <button class="save" data-action="save" data-index="${index}">
          ${post.saved ? "▣" : "♧"}
        </button>
      </div>

      <div class="likes">${post.likes.toLocaleString("pt-BR")} curtidas</div>
      <div class="caption"><b>${post.user}</b> ${post.caption}</div>
      <div class="comment-list">
        ${(post.comments || []).map(comment => `
          <div class="caption"><b>seu_usuario</b> ${escapeHTML(comment)}</div>
        `).join("")}
      </div>
      <div class="comments">Ver comentários</div>

      <form class="comment-form" data-index="${index}">
        <input name="comment" placeholder="Adicione um comentário..." required>
        <button>Publicar</button>
      </form>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

renderPosts();

document.querySelector("#feed").addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const post = posts[Number(button.dataset.index)];

  switch (button.dataset.action) {
    case "like":
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      renderPosts();
      break;

    case "focus":
      button.closest(".post").querySelector("input[name=comment]").focus();
      break;

    case "save":
      post.saved = !post.saved;
      renderPosts();
      break;

    case "share":
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href)
          .then(() => alert("Link copiado!"))
          .catch(() => alert("Não foi possível copiar o link."));
      } else {
        alert("Copie o endereço desta página para compartilhar.");
      }
      break;
  }
});

document.querySelector("#feed").addEventListener("submit", event => {
  if (!event.target.matches(".comment-form")) return;

  event.preventDefault();

  const index = Number(event.target.dataset.index);
  const input = event.target.elements.comment;
  const comment = input.value.trim();

  if (!comment) return;

  posts[index].comments ||= [];
  posts[index].comments.push(comment);

  renderPosts();
});

document.querySelector("#suggestions").innerHTML = people.slice(1, 4)
  .map(([name, id]) => `
    <div class="suggestion">
      <img src="${avatarURL(id)}">
      <div class="suggestion-info">
        <b>${name}</b>
        <div class="muted">Sugestão para você</div>
      </div>
      <span class="follow" data-follow>Seguir</span>
    </div>
  `).join("");

document.querySelector("#suggestions").addEventListener("click", event => {
  const button = event.target.closest("[data-follow]");
  if (!button) return;

  const following = button.textContent === "Seguindo";
  button.textContent = following ? "Seguir" : "Seguindo";
});

document.querySelector("#create").addEventListener("click", () => {
  const caption = prompt("Digite a legenda da publicação:");
  if (caption === null) return;

  const url = prompt("Cole a URL de uma imagem:");
  if (!url || !/^https?:\/\//i.test(url)) return;

  posts.unshift({
    user: "seu_usuario",
    avatar: 12,
    location: "Sua localização",
    image: "",
    caption,
    likes: 0,
    customImage: url
  });

  // Usa a imagem fornecida pelo usuário.
  renderPosts();
  const firstImage = document.querySelector(".post .post-image");
  firstImage.src = url;
});
