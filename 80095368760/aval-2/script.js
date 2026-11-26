// Postagens iniciais do feed
const postsPadrao = [
  {
    id: 1,
    autor: "Luna Golden",
    arroba: "@luna_golden",
    avatar: "https://unsplash.com",
    tempo: "Há 2 horas",
    texto: "Dia de parque hoje! Corri atrás da bolinha até cansar e ainda fiz três amigos novos. 🎾🐕",
    imagem: "https://unsplash.com",
    curtidas: 24,
    curtido: false,
    comentarios: [
      { autor: "@thor_husky", texto: "Amanhã eu vou no parque também!" }
    ]
  },
  {
    id: 2,
    autor: "Thor Husky",
    arroba: "@thor_husky",
    avatar: "https://unsplash.com",
    tempo: "Há 5 horas",
    texto: "Quando meu humano fala a palavra 'passear' mas pega a chave do carro para ir ao veterinário... 👀",
    imagem: "https://unsplash.com",
    curtidas: 68,
    curtido: true,
    comentarios: [
      { autor: "@mel_poodle", texto: "Fui enganada assim semana passada 😂" },
      { autor: "@bob_beagle", texto: "Força guerreiro!" }
    ]
  },
  {
    id: 3,
    autor: "Mel Poodle",
    arroba: "@mel_poodle",
    avatar: "https://unsplash.com",
    tempo: "Ontem",
    texto: "Alguém mais ama tirar um cochilo depois do almoço no sofá que 'não pode subir'? 😴🛋️",
    imagem: "",
    curtidas: 41,
    curtido: false,
    comentarios: []
  }
];

// Carregar dados salvos no navegador
let feedPosts = JSON.parse(localStorage.getItem("auauFeedPosts")) || postsPadrao;
let filtroAtual = "todos";

function salvarNoNavegador() {
  localStorage.setItem("auauFeedPosts", JSON.stringify(feedPosts));
}

// Elementos da interface
const timelineEl = document.getElementById("timeline");
const textoPostInput = document.getElementById("texto-post");
const boxUrlImagem = document.getElementById("box-url-imagem");
const urlImagemInput = document.getElementById("url-imagem");
const btnToggleFoto = document.getElementById("btn-toggle-foto");
const btnPublicar = document.getElementById("btn-publicar");
const abasBtns = document.querySelectorAll(".aba-btn");

// Mostrar/Ocultar campo de URL da foto
btnToggleFoto.addEventListener("click", () => {
  boxUrlImagem.classList.toggle("hidden");
  if (!boxUrlImagem.classList.contains("hidden")) {
    urlImagemInput.focus();
  }
});

// Publicar novo post
btnPublicar.addEventListener("click", () => {
  const texto = textoPostInput.value.trim();
  const imagem = urlImagemInput.value.trim();

  if (!texto && !imagem) {
    alert("Escreva algo ou adicione uma foto antes de postar!");
    return;
  }

  const novoPost = {
    id: Date.now(),
    autor: "Bob Beagle",
    arroba: "@bob_beagle",
    avatar: "https://unsplash.com",
    tempo: "Agora mesmo",
    texto,
    imagem,
    curtidas: 0,
    curtido: false,
    comentarios: []
  };

  feedPosts.unshift(novoPost);
  salvarNoNavegador();
  renderizarFeed();

  textoPostInput.value = "";
  urlImagemInput.value = "";
  boxUrlImagem.classList.add("hidden");
});

// Renderizar Timeline
function renderizarFeed() {
  timelineEl.innerHTML = "";

  const listaFiltrada = filtroAtual === "curtidos"
    ? feedPosts.filter(p => p.curtido)
    : feedPosts;

  if (listaFiltrada.length === 0) {
    timelineEl.innerHTML = `<p style="text-align:center; color:#64748b; padding:20px;">Nenhuma postagem encontrada aqui ainda 🐾</p>`;
    return;
  }

  listaFiltrada.forEach(post => {
    const postEl = document.createElement("article");
    postEl.className = "post-card";

    const comentariosHTML = post.comentarios.map(c => `
      <div class="comentario-item">
        <strong>${c.autor}</strong> ${c.texto}
      </div>
    `).join("");

    postEl.innerHTML = `
      <div class="post-cabecalho">
        <div class="post-autor-info">
          <img src="${post.avatar}" alt="${post.autor}" class="avatar">
          <div>
            <span class="post-autor-nome">${post.autor} <small style="color:#64748b; font-weight:400;">${post.arroba}</small></span>
            <span class="post-tempo">${post.tempo}</span>
          </div>
        </div>
        ${post.arroba === "@bob_beagle" ? `<button class="btn-excluir" onclick="excluirPost(${post.id})">Excluir</button>` : ""}
      </div>

      ${post.texto ? `<p class="post-texto">${post.texto}</p>` : ""}
      ${post.imagem ? `<img src="${post.imagem}" alt="Foto do post" class="post-imagem">` : ""}

      <div class="post-acoes">
        <button class="btn-acao ${post.curtido ? 'curtido' : ''}" onclick="curtirPost(${post.id})">
          ${post.curtido ? '❤️' : '🤍'} ${post.curtidas} Curtir
        </button>
        <button class="btn-acao" onclick="focarComentario(${post.id})">
          💬 ${post.comentarios.length} Comentar
        </button>
      </div>

      <div class="area-comentarios">
        <div class="lista-comentarios">${comentariosHTML}</div>
        <form class="form-comentar" onsubmit="adicionarComentario(event, ${post.id})">
          <input type="text" id="input-com-${post.id}" placeholder="Escreva um comentário..." required>
          <button type="submit">Enviar</button>
        </form>
      </div>
    `;

    timelineEl.appendChild(postEl);
  });
}

// Curtir / Descurtir
function curtirPost(id) {
  const post = feedPosts.find(p => p.id === id);
  if (!post) return;

  post.curtido = !post.curtido;
  post.curtidas += post.curtido ? 1 : -1;
  salvarNoNavegador();
  renderizarFeed();
}

// Adicionar Comentário
function adicionarComentario(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-com-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  const post = feedPosts.find(p => p.id === id);
  if (post) {
    post.comentarios.push({
      autor: "@bob_beagle",
      texto
    });
    salvarNoNavegador();
    renderizarFeed();
  }
}

// Focar no campo de comentário ao clicar no botão Comentar
function focarComentario(id) {
  const input = document.getElementById(`input-com-${id}`);
  if (input) input.focus();
}

// Excluir postagem própria
function excluirPost(id) {
  feedPosts = feedPosts.filter(p => p.id !== id);
  salvarNoNavegador();
  renderizarFeed();
}

// Alternar abas ("Explorar Feed" vs "Curtidos por mim")
abasBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    abasBtns.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    filtroAtual = btn.dataset.filtro;
    renderizarFeed();
  });
});

// Inicializar feed
renderizarFeed();
