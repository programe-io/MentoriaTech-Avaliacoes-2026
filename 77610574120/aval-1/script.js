// Dados iniciais do blog
let posts = [
  {
    id: 1,
    titulo: "Entendendo o Box Model no CSS",
    categoria: "HTML & CSS",
    data: "15 Nov 2026",
    conteudo: "Todo elemento HTML é tratado como uma caixa retangular. Compreender a diferença entre margin, border, padding e content é essencial para dominar qualquer layout na web.",
    curtidas: 12
  },
  {
    id: 2,
    titulo: "Por que usar Tags Semânticas?",
    categoria: "HTML & CSS",
    data: "16 Nov 2026",
    conteudo: "Tags como header, main, article e aside dão significado real à estrutura do site, melhorando a acessibilidade e o posicionamento nos mecanismos de busca.",
    curtidas: 8
  },
  {
    id: 3,
    titulo: "Manipulando o DOM com JavaScript",
    categoria: "JavaScript",
    data: "17 Nov 2026",
    conteudo: "Com JavaScript puro podemos selecionar elementos da página, ouvir eventos de clique e criar conteúdos dinâmicos sem precisar recarregar o navegador.",
    curtidas: 19
  }
];

let categoriaAtual = "Todos";
let termoBusca = "";

const listaPostsEl = document.getElementById("lista-posts");
const formPost = document.getElementById("form-post");
const campoBusca = document.getElementById("campo-busca");
const botoesCategoria = document.querySelectorAll(".filtro-cat");
const btnTema = document.getElementById("btn-tema");

// Função para renderizar os posts na tela
function renderizarPosts() {
  listaPostsEl.innerHTML = "";

  const postsFiltrados = posts.filter(post => {
    const bateCategoria = categoriaAtual === "Todos" || post.categoria === categoriaAtual;
    const bateBusca = post.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                      post.conteudo.toLowerCase().includes(termoBusca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  if (postsFiltrados.length === 0) {
    listaPostsEl.innerHTML = `<div class="post"><p>Nenhum artigo encontrado.</p></div>`;
    return;
  }

  postsFiltrados.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";
    article.innerHTML = `
      <div class="post-meta">
        <span class="badge">${post.categoria}</span>
        <span>${post.data}</span>
      </div>
      <h2>${post.titulo}</h2>
      <p>${post.conteudo}</p>
      <button class="btn-curtir" onclick="curtirPost(${post.id})">
        ❤️ Curtir (${post.curtidas})
      </button>
    `;
    listaPostsEl.appendChild(article);
  });
}

// Função para curtir um post
function curtirPost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.curtidas++;
    renderizarPosts();
  }
}

// Adicionar novo post pelo formulário
formPost.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const categoria = document.getElementById("categoria").value;
  const conteudo = document.getElementById("conteudo").value;

  const novoPost = {
    id: Date.now(),
    titulo,
    categoria,
    data: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
    conteudo,
    curtidas: 0
  };

  posts.unshift(novoPost);
  formPost.reset();
  renderizarPosts();
});

// Filtro por categoria
botoesCategoria.forEach(botao => {
  botao.addEventListener("click", () => {
    botoesCategoria.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    categoriaAtual = botao.dataset.cat;
    renderizarPosts();
  });
});

// Busca em tempo real
campoBusca.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarPosts();
});

// Alternar Modo Claro / Escuro
btnTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  btnTema.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

// Inicializa o blog
renderizarPosts();
