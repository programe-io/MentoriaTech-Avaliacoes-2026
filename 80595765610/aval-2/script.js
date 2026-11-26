// Dados iniciais simulando um banco de dados
let posts = [
  {
    id: 1,
    autor: "Haras Serra Dourada",
    categoria: "Mangalarga",
    imagem: "https://unsplash.com",
    legenda: "Treino matinal de marcha picada com nosso garanhão Trovão. Excelente temperamento e comodidade.",
    data: "Há 2 horas",
    curtidas: 24,
    curtidoPorMim: false,
    comentarios: ["Que andamento limpo!", "Animal de muita qualidade."]
  },
  {
    id: 2,
    autor: "Rancho Vale Verde",
    categoria: "Quarto de Milha",
    imagem: "https://unsplash.com",
    legenda: "Preparação intensa para a próxima prova de três tambores. Explosão muscular impressionante.",
    data: "Há 5 horas",
    curtidas: 41,
    curtidoPorMim: true,
    comentarios: ["Vai dar trabalho na pista!"]
  },
  {
    id: 3,
    autor: "Coudelaria Al-Sahra",
    categoria: "Árabe",
    imagem: "https://unsplash.com",
    legenda: "Resistência e elegância no fim de tarde após uma trilha de 15 km.",
    data: "Ontem",
    curtidas: 37,
    curtidoPorMim: false,
    comentarios: []
  }
];

let filtroAtual = "Todos";

const feedContainer = document.getElementById("feed-container");
const formPost = document.getElementById("form-post");
const botoesFiltro = document.querySelectorAll(".btn-filtro");

// Renderiza os posts na tela
function renderizarFeed() {
  feedContainer.innerHTML = "";

  const postsFiltrados = filtroAtual === "Todos" 
    ? posts 
    : posts.filter(post => post.categoria === filtroAtual);

  if (postsFiltrados.length === 0) {
    feedContainer.innerHTML = `<p style="text-align:center; color:#786b61;">Nenhuma publicação encontrada nesta categoria.</p>`;
    return;
  }

  postsFiltrados.forEach(post => {
    const card = document.createElement("article");
    card.className = "post-card";

    const imgHTML = post.imagem 
      ? `<img src="${post.imagem}" alt="Foto do cavalo de ${post.autor}" class="post-img" onerror="this.style.display='none'">` 
      : "";

    const comentariosHTML = post.comentarios
      .map(c => `<li><strong>Visitante:</strong> ${c}</li>`)
      .join("");

    card.innerHTML = `
      <div class="post-header">
        <span class="post-autor">${post.autor}</span>
        <span class="post-badge">${post.categoria}</span>
      </div>
      ${imgHTML}
      <div class="post-body">
        <p class="post-legenda">${post.legenda}</p>
        <span class="post-data">${post.data}</span>
      </div>
      <div class="post-actions">
        <button class="btn-acao ${post.curtidoPorMim ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
          ${post.curtidoPorMim ? '❤️' : '🤍'} ${post.curtidas} Curtidas
        </button>
        <span class="btn-acao">💬 ${post.comentarios.length} Comentários</span>
      </div>
      <div class="comentarios-box">
        <ul class="lista-comentarios">${comentariosHTML}</ul>
        <form class="form-comentario" onsubmit="adicionarComentario(event, ${post.id})">
          <input type="text" placeholder="Escreva um comentário..." required>
          <button type="submit">Enviar</button>
        </form>
      </div>
    `;

    feedContainer.appendChild(card);
  });
}

// Adicionar nova postagem
formPost.addEventListener("submit", (e) => {
  e.preventDefault();

  const autor = document.getElementById("autor").value;
  const categoria = document.getElementById("categoria").value;
  const imagem = document.getElementById("imagem-url").value;
  const legenda = document.getElementById("legenda").value;

  const novoPost = {
    id: Date.now(),
    autor,
    categoria,
    imagem,
    legenda,
    data: "Agora mesmo",
    curtidas: 0,
    curtidoPorMim: false,
    comentarios: []
  };

  posts.unshift(novoPost);
  formPost.reset();
  renderizarFeed();
});

// Curtir / Descurtir
window.alternarCurtida = function(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.curtidoPorMim = !post.curtidoPorMim;
    post.curtidas += post.curtidoPorMim ? 1 : -1;
    renderizarFeed();
  }
};

// Comentar
window.adicionarComentario = function(event, id) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const texto = input.value.trim();

  if (texto) {
    const post = posts.find(p => p.id === id);
    post.comentarios.push(texto);
    renderizarFeed();
  }
};

// Filtros por raça
botoesFiltro.forEach(botao => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    filtroAtual = botao.dataset.categoria;
    renderizarFeed();
  });
});

// Inicialização
renderizarFeed();
