// Dados iniciais de Stories
const storiesData = [
  {
    id: 1,
    usuario: "lucas.foto",
    avatar: "https://unsplash.com",
    imagem: "https://unsplash.com",
    visto: false
  },
  {
    id: 2,
    usuario: "ana.viagens",
    avatar: "https://unsplash.com",
    imagem: "https://unsplash.com",
    visto: false
  },
  {
    id: 3,
    usuario: "cafe.arte",
    avatar: "https://unsplash.com",
    imagem: "https://unsplash.com",
    visto: false
  },
  {
    id: 4,
    usuario: "pedro.code",
    avatar: "https://unsplash.com",
    imagem: "https://unsplash.com",
    visto: false
  },
  {
    id: 5,
    usuario: "julia.fit",
    avatar: "https://unsplash.com",
    imagem: "https://unsplash.com",
    visto: false
  }
];

// Dados iniciais do Feed
const postsIniciais = [
  {
    id: 101,
    usuario: "ana.viagens",
    avatar: "https://unsplash.com",
    local: "Barra Grande, Piauí",
    imagem: "https://unsplash.com",
    legenda: "Fim de tarde inesquecível pé na areia! 🌊☀️",
    curtidas: 142,
    curtido: false,
    salvo: false,
    tempo: "Há 2 horas",
    comentarios: [
      { autor: "lucas.foto", texto: "Que lugar incrível!" }
    ]
  },
  {
    id: 102,
    usuario: "pedro.code",
    avatar: "https://unsplash.com",
    local: "Home Office",
    imagem: "https://unsplash.com",
    legenda: "Finalizando mais um projeto front-end com café passado na hora ☕💻",
    curtidas: 89,
    curtido: true,
    salvo: true,
    tempo: "Há 5 horas",
    comentarios: [
      { autor: "camila.dev", texto: "Setup top demais!" }
    ]
  }
];

// Sugestões da Sidebar
const sugestoesData = [
  { usuario: "design.diario", detalhe: "Seguido por lucas.foto", avatar: "https://unsplash.com", seguindo: false },
  { usuario: "natureza.br", detalhe: "Novo no Instagram", avatar: "https://unsplash.com", seguindo: false },
  { usuario: "receitas.rapidas", detalhe: "Sugestão para você", avatar: "https://unsplash.com", seguindo: false }
];

let posts = JSON.parse(localStorage.getItem("instaClonePosts")) || postsIniciais;
let apenasSalvos = false;
let termoPesquisa = "";
let storyTimer = null;

function salvarPosts() {
  localStorage.setItem("instaClonePosts", JSON.stringify(posts));
}

// 1. Renderizar Stories
function renderizarStories() {
  const container = document.getElementById("stories-container");
  container.innerHTML = "";

  storiesData.forEach(story => {
    const item = document.createElement("div");
    item.className = "story-item";
    item.innerHTML = `
      <div class="story-ring ${story.visto ? 'visto' : ''}">
        <img src="${story.avatar}" alt="${story.usuario}">
      </div>
      <span>${story.usuario}</span>
    `;
    item.addEventListener("click", () => abrirStory(story.id));
    container.appendChild(item);
  });
}

// Visualizador de Story com barra de progresso
function abrirStory(id) {
  const story = storiesData.find(s => s.id === id);
  if (!story) return;

  story.visto = true;
  renderizarStories();

  const modal = document.getElementById("modal-story");
  const fill = document.getElementById("story-progress-fill");
  document.getElementById("story-avatar").src = story.avatar;
  document.getElementById("story-username").textContent = story.usuario;
  document.getElementById("story-image").src = story.imagem;

  modal.classList.remove("hidden");
  fill.style.transition = "none";
  fill.style.width = "0%";

  setTimeout(() => {
    fill.style.transition = "width 4s linear";
    fill.style.width = "100%";
  }, 50);

  clearTimeout(storyTimer);
  storyTimer = setTimeout(fecharStory, 4050);
}

function fecharStory() {
  clearTimeout(storyTimer);
  document.getElementById("modal-story").classList.add("hidden");
}

document.getElementById("fechar-story").addEventListener("click", fecharStory);

// 2. Renderizar Feed
function renderizarFeed() {
  const feedEl = document.getElementById("feed-posts");
  feedEl.innerHTML = "";

  const filtrados = posts.filter(p => {
    const matchSalvo = !apenasSalvos || p.salvo;
    const matchBusca = p.usuario.toLowerCase().includes(termoPesquisa) ||
                       p.legenda.toLowerCase().includes(termoPesquisa);
    return matchSalvo && matchBusca;
  });

  if (filtrados.length === 0) {
    feedEl.innerHTML = `<p style="text-align:center; color:#8e8e8e; padding:30px;">Nenhuma publicação encontrada.</p>`;
    return;
  }

  filtrados.forEach(post => {
    const card = document.createElement("article");
    card.className = "post-card";

    const comentariosHTML = post.comentarios.map(c => `
      <div class="comment-line"><strong>${c.autor}</strong> ${c.texto}</div>
    `).join("");

    card.innerHTML = `
      <div class="post-header">
        <div class="post-user">
          <img src="${post.avatar}" alt="${post.usuario}">
          <div class="post-user-meta">
            <strong>${post.usuario}</strong>
            ${post.local ? `<span>${post.local}</span>` : ""}
          </div>
        </div>
      </div>

      <div class="post-image-wrapper" ondblclick="curtirDuploClique(${post.id}, this)">
        <img src="${post.imagem}" alt="Publicação de ${post.usuario}">
        <span class="heart-burst">❤️</span>
      </div>

      <div class="post-actions">
        <div class="actions-left">
          <button class="action-btn" onclick="alternarCurtida(${post.id})">
            ${post.curtido ? "❤️" : "🤍"}
          </button>
          <button class="action-btn" onclick="focarInputComentario(${post.id})">💬</button>
        </div>
        <button class="action-btn" onclick="alternarSalvo(${post.id})" title="Salvar">
          ${post.salvo ? "🔖" : "📑"}
        </button>
      </div>

      <div class="post-body">
        <div class="likes-count">${post.curtidas} curtidas</div>
        ${post.legenda ? `<div class="caption"><strong>${post.usuario}</strong> ${post.legenda}</div>` : ""}
        <div class="comments-list">${comentariosHTML}</div>
        <div class="post-time">${post.tempo}</div>
      </div>

      <form class="comment-form" onsubmit="enviarComentario(event, ${post.id})">
        <input type="text" id="com-input-${post.id}" placeholder="Adicione um comentário..." required>
        <button type="submit">Publicar</button>
      </form>
    `;

    feedEl.appendChild(card);
  });
}

// Curtir pelo botão
function alternarCurtida(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.curtido = !post.curtido;
  post.curtidas += post.curtido ? 1 : -1;
  salvarPosts();
  renderizarFeed();
}

// Curtir com duplo clique na imagem + animação
function curtirDuploClique(id, wrapperEl) {
  const heart = wrapperEl.querySelector(".heart-burst");
  heart.classList.add("animar");
  setTimeout(() => heart.classList.remove("animar"), 600);

  const post = posts.find(p => p.id === id);
  if (post && !post.curtido) {
    post.curtido = true;
    post.curtidas += 1;
    salvarPosts();
    setTimeout(renderizarFeed, 450);
  }
}

// Salvar publicação
function alternarSalvo(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.salvo = !post.salvo;
  salvarPosts();
  renderizarFeed();
}

// Comentários
function enviarComentario(e, id) {
  e.preventDefault();
  const input = document.getElementById(`com-input-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  const post = posts.find(p => p.id === id);
  if (post) {
    post.comentarios.push({ autor: "camila.dev", texto });
    salvarPosts();
    renderizarFeed();
  }
}

function focarInputComentario(id) {
  const input = document.getElementById(`com-input-${id}`);
  if (input) input.focus();
}

// 3. Sugestões da Sidebar
function renderizarSugestoes() {
  const lista = document.getElementById("lista-sugestoes");
  lista.innerHTML = "";

  sugestoesData.forEach((sug, index) => {
    const row = document.createElement("div");
    row.className = "suggestion-item";
    row.innerHTML = `
      <div class="suggestion-left">
        <img src="${sug.avatar}" alt="${sug.usuario}">
        <div>
          <strong>${sug.usuario}</strong>
          <span>${sug.detalhe}</span>
        </div>
      </div>
      <button class="btn-follow ${sug.seguindo ? 'seguindo' : ''}" onclick="toggleSeguir(${index})">
        ${sug.seguindo ? 'Seguindo' : 'Seguir'}
      </button>
    `;
    lista.appendChild(row);
  });
}

function toggleSeguir(index) {
  sugestoesData[index].seguindo = !sugestoesData[index].seguindo;
  renderizarSugestoes();
}

// 4. Criar Novo Post
const modalCriar = document.getElementById("modal-criar");
document.getElementById("btn-abrir-criar").addEventListener("click", () => {
  modalCriar.classList.remove("hidden");
});
document.getElementById("fechar-criar").addEventListener("click", () => {
  modalCriar.classList.add("hidden");
});

