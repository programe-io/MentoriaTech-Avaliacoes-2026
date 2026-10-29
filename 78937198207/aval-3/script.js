
const app = document.createElement("div");
document.body.appendChild(app);

const style = document.createElement("style");
style.textContent = `
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #262626;
  background: #fafafa;
}
button, input { font: inherit; }
button { cursor: pointer; border: none; background: none; }
.layout { display: flex; }
.sidebar {
  position: fixed; width: 230px; height: 100vh;
  padding: 28px 18px; border-right: 1px solid #ddd;
  background: white; display: flex; flex-direction: column;
}
.logo { font-family: cursive; font-size: 30px; margin: 5px 10px 35px; }
.nav { display: grid; gap: 12px; }
.nav button {
  padding: 13px 10px; text-align: left;
  border-radius: 8px; font-size: 16px;
}
.nav button:hover { background: #f1f1f1; }
.main {
  margin-left: 230px; width: calc(100% - 230px);
  display: flex; justify-content: center; gap: 45px;
  padding: 30px 25px;
}
.center { width: 470px; max-width: 100%; }
.stories {
  display: flex; gap: 15px; overflow-x: auto;
  background: white; padding: 17px 12px;
  border: 1px solid #ddd; border-radius: 8px;
}
.story { min-width: 62px; text-align: center; font-size: 11px; }
.ring {
  width: 60px; height: 60px; border-radius: 50%;
  padding: 3px; margin: auto auto 6px;
  background: linear-gradient(45deg, #ffb300, #ff0069, #a033ff);
}
.ring img {
  width: 100%; height: 100%; border-radius: 50%;
  border: 2px solid white; object-fit: cover;
}
.post {
  margin-top: 22px; background: white;
  border: 1px solid #ddd; border-radius: 5px;
  overflow: hidden;
}
.post-header { display: flex; align-items: center; gap: 10px; padding: 12px; }
.avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.username { font-weight: bold; }
.more { margin-left: auto; font-size: 22px; }
.photo { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.actions { display: flex; gap: 14px; padding: 12px 12px 6px; }
.actions button { font-size: 25px; }
.actions .save { margin-left: auto; }
.details { padding: 0 12px 13px; }
.likes { font-weight: bold; margin: 5px 0 8px; }
.caption { line-height: 1.5; }
.comment-list { margin-top: 7px; color: #444; }
.comment-form { display: flex; border-top: 1px solid #eee; padding: 12px; }
.comment-form input { border: none; outline: none; flex: 1; min-width: 0; }
.comment-form button { color: #0095f6; font-weight: bold; }
.right { width: 290px; padding-top: 12px; }
.profile, .suggestion { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.profile img { width: 45px; height: 45px; }
.muted { color: #888; font-size: 12px; margin-top: 4px; }
.blue { color: #0095f6; font-weight: bold; font-size: 12px; margin-left: auto; }
.section-title { display: flex; justify-content: space-between; color: #888; margin: 25px 0 18px; }
@media(max-width: 1000px) {
  .sidebar { width: 75px; padding: 20px 8px; }
  .logo { font-size: 0; }
  .logo:after { content: "◎"; font-size: 30px; }
  .nav button { text-align: center; font-size: 0; }
  .nav button span { font-size: 23px; }
  .main { margin-left: 75px; width: calc(100% - 75px); }
  .right { display: none; }
}
@media(max-width: 600px) {
  .sidebar {
    top: auto; bottom: 0; height: 55px; width: 100%;
    padding: 4px; border-right: none; border-top: 1px solid #ddd;
    z-index: 10;
  }
  .logo { display: none; }
  .nav { display: flex; justify-content: space-around; gap: 0; }
  .nav button { padding: 10px 8px; }
  .main { margin: 0; padding: 0 0 65px; width: 100%; display: block; }
  .center { width: 100%; }
  .stories { border-radius: 0; border-left: 0; border-right: 0; }
  .post { margin-top: 10px; border-left: 0; border-right: 0; border-radius: 0; }
}
`;
document.head.appendChild(style);

app.innerHTML = `
<div class="layout">
  <aside class="sidebar">
    <div class="logo">Instagram</div>
    <nav class="nav">
      <button><span>⌂</span> &nbsp; Início</button>
      <button><span>⌕</span> &nbsp; Pesquisa</button>
      <button><span>▧</span> &nbsp; Explorar</button>
      <button><span>▶</span> &nbsp; Reels</button>
      <button><span>♡</span> &nbsp; Mensagens</button>
      <button><span>♧</span> &nbsp; Notificações</button>
      <button><span>⊕</span> &nbsp; Criar</button>
      <button><span>☻</span> &nbsp; Perfil</button>
    </nav>
  </aside>

  <main class="main">
    <section class="center">
      <div class="stories" id="stories"></div>
      <div id="feed"></div>
    </section>

    <aside class="right">
      <div class="profile">
        <img class="avatar" src="https://i.pravatar.cc/100?img=12">
        <div><div class="username">meu_perfil</div><div class="muted">Meu perfil</div></div>
        <button class="blue">Mudar</button>
      </div>
      <div class="section-title"><span>Sugestões para você</span><b style="color:#262626">Ver tudo</b></div>
      <div id="suggestions"></div>
    </aside>
  </main>
</div>
`;

const people = [
  { name: "mariana", img: 44 },
  { name: "lucas", img: 13 },
  { name: "julia", img: 47 },
  { name: "pedro", img: 11 },
  { name: "camila", img: 49 },
  { name: "rafael", img: 15 }
];

const avatarURL = id => `https://i.pravatar.cc/100?img=${id}`;

document.querySelector("#stories").innerHTML = people.map(p => `
  <div class="story">
    <div class="ring"><img src="${avatarURL(p.img)}"></div>
    <div>${p.name}</div>
  </div>
`).join("");

document.querySelector("#suggestions").innerHTML = people.slice(1, 5).map(p => `
  <div class="suggestion">
    <img class="avatar" src="${avatarURL(p.img)}">
    <div><div class="username">${p.name}</div><div class="muted">Sugestão para você</div></div>
    <button class="blue">Seguir</button>
  </div>
`).join("");

const posts = [
  {
    user: "mariana",
    avatar: 44,
    photo: "photo-1534528741775-53994a69daeb",
    likes: 1284,
    caption: "Um dia bonito para guardar na memória ✨"
  },
  {
    user: "lucas",
    avatar: 13,
    photo: "photo-1500530855697-b586d89ba3ee",
    likes: 847,
    caption: "Explorando lugares novos 🌎"
  },
  {
    user: "julia",
    avatar: 47,
    photo: "photo-1490750967868-88aa4486c946",
    likes: 2350,
    caption: "Flores e boas energias 🌸"
  }
];

posts.forEach((post, index) => {
  const el = document.createElement("article");
  el.className = "post";

  el.innerHTML = `
    <header class="post-header">
      <img class="avatar" src="${avatarURL(post.avatar)}">
      <div>
        <div class="username">${post.user} <span style="color:#3897f0">✓</span></div>
        <div class="muted">Recomendado para você</div>
      </div>
      <button class="more" aria-label="Mais opções">···</button>
    </header>

    <img class="photo"
      src="https://images.unsplash.com/${post.photo}?auto=format&fit=crop&w=900&q=85"
      alt="Foto publicada por ${post.user}">

    <div class="actions">
      <button class="like" aria-label="Curtir">♡</button>
      <button class="focus-comment" aria-label="Comentar">♧</button>
      <button aria-label="Compartilhar">➤</button>
      <button class="save" aria-label="Salvar">♧</button>
    </div>

    <div class="details">
      <div class="likes">${post.likes.toLocaleString("pt-BR")} curtidas</div>
      <div class="caption"><b>${post.user}</b> ${post.caption}</div>
      <div class="comment-list"></div>
    </div>

    <form class="comment-form">
      <input placeholder="Adicione um comentário..." aria-label="Comentário">
      <button type="submit">Publicar</button>
    </form>
  `;

  document.querySelector("#feed").appendChild(el);

  let liked = false;
  let likes = post.likes;

  const likeButton = el.querySelector(".like");
  const likeCount = el.querySelector(".likes");

  likeButton.addEventListener("click", () => {
    liked = !liked;
    likes += liked ? 1 : -1;
    likeButton.textContent = liked ? "♥" : "♡";
    likeButton.style.color = liked ? "#ed4956" : "#262626";
    likeCount.textContent = likes.toLocaleString("pt-BR") + " curtidas";
  });

  el.querySelector(".focus-comment").addEventListener("click", () => {
    el.querySelector(".comment-form input").focus();
  });

  el.querySelector(".comment-form").addEventListener("submit", event => {
    event.preventDefault();

    const input = el.querySelector(".comment-form input");
    const value = input.value.trim();

    if (!value) return;

    const comment = document.createElement("div");
    comment.className = "comment-list";

    const username = document.createElement("b");
    username.textContent = "voce ";

    comment.append(username, document.createTextNode(value));
    el.querySelector(".details").appendChild(comment);
    input.value = "";
  });
});
