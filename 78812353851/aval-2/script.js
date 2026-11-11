/* =========================================================
   PROJETO "MEU BLOG" — JAVASCRIPT
   Funcionalidades:
   1. Renderização dinâmica dos posts
   2. Busca por texto
   3. Filtro por categoria
   4. Menu mobile
   5. Tema claro/escuro (persistente)
   6. Botão "voltar ao topo"
   7. Ano automático no rodapé
   ========================================================= */

/* ---------------------------------------------------------
   1. DADOS DOS POSTS
   --------------------------------------------------------- */
const posts = [
  {
    id: 1,
    titulo: "Aprendendo HTML na prática",
    autor: "Ana Silva",
    data: "10/03/2025",
    categoria: "HTML",
    imagem: "img/post1.jpg",
    texto:
      "Neste artigo vamos ver como estruturar uma página HTML do zero, organizando cabeçalho, conteúdo principal e rodapé de forma clara e semântica."
  },
  {
    id: 2,
    titulo: "Primeiros passos com CSS",
    autor: "Bruno Costa",
    data: "12/03/2025",
    categoria: "CSS",
    imagem: "img/post2.jpg",
    texto:
      "O CSS é responsável pela aparência da página. Vamos aplicar cores, fontes e espaçamentos para transformar a estrutura simples do HTML em uma interface agradável."
  },
  {
    id: 3,
    titulo: "Organizando o layout com Flexbox",
    autor: "Carla Souza",
    data: "15/03/2025",
    categoria: "Layout",
    imagem: "img/post3.jpg",
    texto:
      "O Flexbox facilita a distribuição dos elementos na página. Com poucas propriedades conseguimos criar layouts flexíveis e responsivos."
  },
  {
    id: 4,
    titulo: "Boas práticas em HTML semântico",
    autor: "Diego Martins",
    data: "18/03/2025",
    categoria: "HTML",
    imagem: "img/post4.jpg",
    texto:
      "Usar tags semânticas como header, main, section, article e footer melhora a acessibilidade e a organização do código da sua página."
  },
  {
    id: 5,
    titulo: "Responsividade na prática",
    autor: "Elisa Ramos",
    data: "20/03/2025",
    categoria: "Layout",
    imagem: "img/post5.jpg",
    texto:
      "Com media queries e unidades relativas, é possível adaptar o layout do blog para celulares, tablets e desktops sem complicação."
  }
];

/* ---------------------------------------------------------
   2. REFERÊNCIAS AO DOM
   --------------------------------------------------------- */
const listaPosts     = document.getElementById("listaPosts");
const mensagemVazia  = document.getElementById("mensagemVazia");
const campoBusca     = document.getElementById("busca");
const filtroCategoria = document.getElementById("filtroCategoria");
const listaCategorias = document.getElementById("listaCategorias");
const menuToggle     = document.getElementById("menuToggle");
const menu           = document.getElementById("menu");
const btnTema        = document.getElementById("btnTema");
const btnTopo        = document.getElementById("btnTopo");
const anoAtual       = document.getElementById("anoAtual");

/* ---------------------------------------------------------
   3. RENDERIZAÇÃO DOS POSTS
   --------------------------------------------------------- */
function criarCardPost(post) {
  const article = document.createElement("article");
  article.classList.add("post");

  article.innerHTML = `
    <img
      src="${post.imagem}"
      alt="Imagem ilustrativa do post: ${post.titulo}"
      class="post-imagem"
      onerror="this.src='https://picsum.photos/seed/${post.id}/600/300'"
    >
    <div class="post-conteudo">
      <h3 class="post-titulo">${post.titulo}</h3>
      <p class="post-meta">
        Por ${post.autor} • ${post.data} • <strong>${post.categoria}</strong>
      </p>
      <p class="post-texto">${post.texto}</p>
      <a href="#" class="post-link" data-id="${post.id}">Ler mais →</a>
    </div>
  `;

  return article;
}

function renderizarPosts(lista) {
  listaPosts.innerHTML = "";

  if (lista.length === 0) {
    mensagemVazia.hidden = false;
    return;
  }

  mensagemVazia.hidden = true;

  lista.forEach((post) => {
    listaPosts.appendChild(criarCardPost(post));
  });
}

/* ---------------------------------------------------------
   4. BUSCA + FILTRO (combinados)
   --------------------------------------------------------- */
function aplicarFiltros() {
  const termo = campoBusca.value.trim().toLowerCase();
  const categoria = filtroCategoria.value;

  const resultado = posts.filter((post) => {
    const combinaTexto =
      post.titulo.toLowerCase().includes(termo) ||
      post.texto.toLowerCase().includes(termo) ||
      post.autor.toLowerCase().includes(termo);

    const combinaCategoria =
      categoria === "todas" || post.categoria === categoria;

    return combinaTexto && combinaCategoria;
  });

  renderizarPosts(resultado);
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("change", aplicarFiltros);

/* ---------------------------------------------------------
   5. CATEGORIAS NA BARRA LATERAL (dinâmicas + clicáveis)
   --------------------------------------------------------- */
function renderizarCategorias() {
  const categorias = [...new Set(posts.map((p) => p.categoria))];

  listaCategorias.innerHTML = `
    <li><a href="#" data-categoria="todas">Todas</a></li>
    ${categorias
      .map(
        (cat) =>
          `<li><a href="#" data-categoria="${cat}">${cat}</a></li>`
      )
      .join("")}
  `;
}

listaCategorias.addEventListener("click", (evento) => {
  const link = evento.target.closest("a[data-categoria]");
  if (!link) return;

  evento.preventDefault();

  const categoria = link.dataset.categoria;
  filtroCategoria.value = categoria;
  aplicarFiltros();

  // Rola até a lista de posts
  listaPosts.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ---------------------------------------------------------
   6. CLIQUE EM "LER MAIS" (exemplo de interação)
   --------------------------------------------------------- */
listaPosts.addEventListener("click", (evento) => {
  const link = evento.target.closest(".post-link");
  if (!link) return;

  evento.preventDefault();
  const id = Number(link.dataset.id);
  const post = posts.find((p) => p.id === id);

  alert(
    `📖 ${post.titulo}\n\nPor ${post.autor} em ${post.data}\nCategoria: ${post.categoria}\n\n${post.texto}`
  );
});

/* ---------------------------------------------------------
   7. MENU MOBILE
   --------------------------------------------------------- */
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("aberto");
});

/* ---------------------------------------------------------
   8. TEMA CLARO / ESCURO (com persistência)
   --------------------------------------------------------- */
const TEMA_KEY = "meublog-tema";

function aplicarTema(tema) {
  document.body.classList.toggle("tema-escuro", tema === "escuro");
  btnTema.textContent = tema === "escuro" ? "☀️" : "🌙";
  localStorage.setItem(TEMA_KEY, tema);
}

// Carrega tema salvo
const temaSalvo = localStorage.getItem(TEMA_KEY) || "claro";
aplicarTema(temaSalvo);

btnTema.addEventListener("click", () => {
  const temaAtual = document.body.classList.contains("tema-escuro")
    ? "escuro"
    : "claro";
  aplicarTema(temaAtual === "escuro" ? "claro" : "escuro");
});

/* ---------------------------------------------------------
   9. BOTÃO "VOLTAR AO TOPO"
   --------------------------------------------------------- */
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.hidden = false;
  } else {
    btnTopo.hidden = true;
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------------------------------------------------
   10. ANO AUTOMÁTICO NO RODAPÉ
   --------------------------------------------------------- */
anoAtual.textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   11. INICIALIZAÇÃO
   --------------------------------------------------------- */
renderizarCategorias();
renderizarPosts(posts);