// Postagens iniciais do feed
let posts = [
  {
    id: 1,
    autor: "Mariana Costa",
    tempo: "Há 2 horas",
    titulo: "Risoto Cremoso de Cogumelos",
    descricao: "Segredo de hoje: usar caldo de legumes caseiro bem quente e finalizar com manteiga gelada e parmesão ralado na hora!",
    imagem: "https://unsplash.com",
    curtidas: 24,
    curtidoPorMim: false,
    comentarios: [
      { autor: "Carlos", texto: "Ficou com uma cara ótima! Qual cogumelo você usou?" },
      { autor: "Mariana Costa", texto: "Usei paris frescos e um pouco de shitake!" }
    ]
  },
  {
    id: 2,
    autor: "Lucas Mendes",
    tempo: "Há 5 horas",
    titulo: "Pão Caseiro Rústico de Fermentação Natural",
    descricao: "Depois de 18 horas na geladeira, saiu do forno com essa casca crocante. Só farinha, água, sal e levain.",
    imagem: "https://unsplash.com",
    curtidas: 41,
    curtidoPorMim: true,
    comentarios: []
  }
];

const feedContainer = document.getElementById("feed-posts");
const formPost = document.getElementById("form-post");

// Renderiza todo o feed na tela
function renderizarFeed() {
  feedContainer.innerHTML = posts
    .map((post) => {
      const inicial = post.autor.charAt(0).toUpperCase();
      const imagemHtml = post.imagem
        ? `<img src="${post.imagem}" alt="${post.titulo}" class="post-imagem">`
        : "";

      const comentariosHtml = post.comentarios
        .map(
          (c) =>
            `<li class="comentario-item"><strong>${c.autor}:</strong> ${c.texto}</li>`
        )
        .join("");

      return `
        <article class="post">
          <div class="post-cabecalho">
            <div class="avatar">${inicial}</div>
            <div class="post-autor">
              <strong>${post.autor}</strong>
              <small>${post.tempo}</small>
            </div>
          </div>

          <div class="post-corpo">
            <h3>${post.titulo}</h3>
            <p>${post.descricao}</p>
          </div>

          ${imagemHtml}

          <div class="post-acoes">
            <button 
              class="btn-acao ${post.curtidoPorMim ? "curtido" : ""}" 
              onclick="alternarCurtida(${post.id})"
            >
              ${post.curtidoPorMim ? "❤️" : "🤍"} Curtir (${post.curtidas})
            </button>
            <button class="btn-acao" onclick="focarComentario(${post.id})">
              💬 Comentar (${post.comentarios.length})
            </button>
          </div>

          <div class="comentarios-secao">
            <ul class="lista-comentarios">
              ${comentariosHtml}
            </ul>
            <form class="form-comentario" onsubmit="adicionarComentario(event, ${post.id})">
              <input 
                type="text" 
                id="input-comentario-${post.id}" 
                placeholder="Escreva um comentário..." 
                required
              >
              <button type="submit">Enviar</button>
            </form>
          </div>
        </article>
      `;
    })
    .join("");
}

// Publica um novo post no topo do feed
formPost.addEventListener("submit", (e) => {
  e.preventDefault();

  const autor = document.getElementById("autor").value.trim();
  const titulo = document.getElementById("titulo").value.trim();
  const imagem = document.getElementById("imagem").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  const novoPost = {
    id: Date.now(),
    autor,
    tempo: "Agora mesmo",
    titulo,
    descricao,
    imagem,
    curtidas: 0,
    curtidoPorMim: false,
    comentarios: []
  };

  posts.unshift(novoPost);
  formPost.reset();
  renderizarFeed();
});

// Curtir ou descurtir
function alternarCurtida(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.curtidoPorMim = !post.curtidoPorMim;
  post.curtidas += post.curtidoPorMim ? 1 : -1;
  renderizarFeed();
}

// Foca no campo de comentário do post clicado
function focarComentario(id) {
  const input = document.getElementById(`input-comentario-${id}`);
  if (input) input.focus();
}

// Adiciona um comentário ao post
function adicionarComentario(event, id) {
  event.preventDefault();
  const input = document.getElementById(`input-comentario-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  const post = posts.find((p) => p.id === id);
  if (post) {
    post.comentarios.push({
      autor: "Você",
      texto
    });
    renderizarFeed();
  }
}

// Inicializa o feed
renderizarFeed();
