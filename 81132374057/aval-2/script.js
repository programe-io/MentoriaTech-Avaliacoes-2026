const listaStories = [
  { usuario: "ana.ui", avatar: "https://picsum.photos" },
  { usuario: "lucas.js", avatar: "https://picsum.photos" },
  { usuario: "cafe.code", avatar: "https://picsum.photos" },
  { usuario: "viagens.br", avatar: "https://picsum.photos" },
  { usuario: "setup.lab", avatar: "https://picsum.photos" }
];

let posts = [
  {
    id: 1,
    usuario: "ana.ui",
    avatar: "https://picsum.photos",
    imagem: "https://picsum.photos",
    legenda: "Fim de tarde perfeito depois de fechar o deploy.",
    curtidas: 128,
    curtido: false,
    salvo: false,
    comentarios: [
      { autor: "lucas.js", texto: "Que foto incrível!" }
    ]
  },
  {
    id: 2,
    usuario: "cafe.code",
    avatar: "https://picsum.photos",
    imagem: "https://picsum.photos",
    legenda: "Primeiro café antes de refatorar o CSS.",
    curtidas: 84,
    curtido: true,
    salvo: false,
    comentarios: []
  }
];

const storiesEl = document.getElementById("stories");
const feedEl = document.getElementById("feed");
const modal = document.getElementById("modal-post");
const btnNovoPost = document.getElementById("btn-novo-post");
const fecharModal = document.getElementById("fechar-modal");
const formPost = document.getElementById("form-post");

function renderizarStories() {
  storiesEl.innerHTML = listaStories
    .map(
      (s) => `
      <div class="story">
        <div class="story-anel">
          <img src="${s.avatar}" alt="Story de ${s.usuario}" />
        </div>
        <span>${s.usuario}</span>
      </div>
    `
    )
    .join("");
}

function renderizarFeed() {
  feedEl.innerHTML = posts
    .map(
      (post) => `
      <article class="post" data-id="${post.id}">
        <header class="post-topo">
          <img src="${post.avatar}" alt="Avatar de ${post.usuario}" />
          <strong>${post.usuario}</strong>
        </header>

        <div class="post-midia" ondblclick="curtirPorDuploClique(${post.id}, this)">
          <img src="${post.imagem}" alt="Publicação de ${post.usuario}" />
          <span class="coracao-animado">❤️</span>
        </div>

        <div class="post-acoes">
          <div class="acoes-esquerda">
            <button type="button" onclick="alternarCurtida(${post.id})" aria-label="Curtir">
              ${post.curtido ? "❤️" : "🤍"}
            </button>
            <button type="button" onclick="focarComentario(${post.id})" aria-label="Comentar">
              💬
            </button>
          </div>
          <button type="button" onclick="alternarSalvar(${post.id})" aria-label="Salvar">
            ${post.salvo ? "🔖" : "📑"}
          </button>
        </div>

        <div class="post-info">
          <span class="curtidas">${post.curtidas} curtidas</span>
          <p><strong>${post.usuario}</strong> ${post.legenda}</p>
          <div class="lista-comentarios">
            ${post.comentarios
              .map((c) => `<p><strong>${c.autor}</strong> ${c.texto}</p>`)
              .join("")}
          </div>
        </div>

        <form class="form-comentario" onsubmit="adicionarComentario(event, ${post.id})">
          <input id="input-coment-${post.id}" type="text" placeholder="Adicione um comentário..." required />
          <button type="submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");
}

function alternarCurtida(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.curtido = !post.curtido;
  post.curtidas += post.curtido ? 1 : -1;
  renderizarFeed();
}

function curtirPorDuploClique(id, container) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  if (!post.curtido) {
    post.curtido = true;
    post.curtidas += 1;
    renderizarFeed();
  }

  const cardAtualizado = document.querySelector(`.post[data-id="${id}"] .coracao-animado`);
  if (cardAtualizado) {
    cardAtualizado.classList.add("mostrar");
    setTimeout(() => cardAtualizado.classList.remove("mostrar"), 600);
  }
}

function alternarSalvar(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.salvo = !post.salvo;
  renderizarFeed();
}

function focarComentario(id) {
  const input = document.getElementById(`input-coment-${id}`);
  if (input) input.focus();
}

function adicionarComentario(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-coment-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  const post = posts.find((p) => p.id === id);
  post.comentarios.push({ autor: "voce.dev", texto });
  renderizarFeed();
}

btnNovoPost.addEventListener("click", () => modal.showModal());
fecharModal.addEventListener("click", () => modal.close());

formPost.addEventListener("submit", (e) => {
  e.preventDefault();
  const novo = {
    id: Date.now(),
    usuario: document.getElementById("input-usuario").value.trim(),
    avatar: "https://picsum.photos",
    imagem: document.getElementById("input-imagem").value.trim(),
    legenda: document.getElementById("input-legenda").value.trim(),
    curtidas: 0,
    curtido: false,
    salvo: false,
    comentarios: []
  };

  posts.unshift(novo);
  formPost.reset();
  modal.close();
  renderizarFeed();
});

renderizarStories();
renderizarFeed();
