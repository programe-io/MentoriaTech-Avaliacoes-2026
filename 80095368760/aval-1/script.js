// Banco de dados inicial de artigos
let posts = [
  {
    id: 1,
    titulo: "Bowl de Aveia e Frutas Vermelhas para o Café",
    categoria: "Receitas",
    data: "24 de Novembro, 2026",
    imagem: "https://unsplash.com",
    resumo: "Uma opção rápida, rica em fibras e antioxidantes para começar a manhã com energia.",
    conteudo: "Ingredientes:\n- 1/2 xícara de aveia em flocos\n- 1 xícara de leite ou bebida vegetal\n- Morangos e mirtilos frescos\n- 1 colher de sementes de chia\n\nModo de preparo:\nCozinhe a aveia com o leite em fogo baixo por 5 minutos até ficar cremosa. Transfira para uma tigela, finalize com as frutas picadas e a chia por cima.",
    curtidas: 18,
    curtido: false
  },
  {
    id: 2,
    titulo: "Como Montar um Prato Equilibrado no Almoço",
    categoria: "Nutrição",
    data: "20 de Novembro, 2026",
    imagem: "https://unsplash.com",
    resumo: "Aprenda a dividir proporções de vegetais, proteínas e carboidratos sem precisar pesar comida.",
    conteudo: "Uma regra visual simples para o dia a dia:\n\n1. Metade do prato (50%): Vegetais crus e cozidos variados para garantir fibras, vitaminas e saciedade.\n2. Um quarto do prato (25%): Proteínas magras como frango, peixe, ovos ou leguminosas (feijão, grão-de-bico).\n3. Um quarto do prato (25%): Carboidratos integrais ou raízes como arroz integral, batata-doce ou mandioca.",
    curtidas: 34,
    curtido: false
  },
  {
    id: 3,
    titulo: "5 Lanches Saudáveis para Levar na Mochila",
    categoria: "Dicas",
    data: "15 de Novembro, 2026",
    imagem: "https://unsplash.com",
    resumo: "Evite ultraprocessados na correria com ideias práticas que não estragam fora da geladeira.",
    conteudo: "Ter boas opções à mão evita escolhas impulsivas quando a fome aperta:\n\n- Mix de castanhas e frutas secas sem açúcar\n- Frutas práticas com casca (banana, maçã, tangerina)\n- Grão-de-bico assado crocante temperado com páprica\n- Barrinhas de sementes caseiras\n- Chips de batata-doce ou coco assado",
    curtidas: 25,
    curtido: false
  }
];

const dicasRapidas = [
  "Beba pelo menos 35ml de água por quilo de peso corporal ao longo do dia.",
  "Prefira descascar mais e desembalar menos: priorize alimentos in natura.",
  "Inclua uma fonte de proteína no café da manhã para prolongar a saciedade.",
  "Tempere saladas com azeite de oliva extra virgem, limão e ervas naturais."
];

// Elementos do DOM
const listaPostsEl = document.getElementById("lista-posts");
const campoBusca = document.getElementById("campo-busca");
const botoesFiltro = document.querySelectorAll(".filtro-btn");

let categoriaAtual = "todas";
let termoBusca = "";

// Renderizar Posts na Tela
function renderizarPosts() {
  listaPostsEl.innerHTML = "";

  const postsFiltrados = posts.filter(post => {
    const bateCategoria = categoriaAtual === "todas" || post.categoria === categoriaAtual;
    const bateBusca = post.titulo.toLowerCase().includes(termoBusca) || 
                      post.resumo.toLowerCase().includes(termoBusca);
    return bateCategoria && bateBusca;
  });

  if (postsFiltrados.length === 0) {
    listaPostsEl.innerHTML = "<p>Nenhum artigo encontrado para sua busca.</p>";
    return;
  }

  postsFiltrados.forEach(post => {
    const card = document.createElement("article");
    card.className = "card-post";
    card.innerHTML = `
      <img src="${post.imagem}" alt="${post.titulo}">
      <div class="card-corpo">
        <span class="tag">${post.categoria}</span>
        <h3>${post.titulo}</h3>
        <p>${post.resumo}</p>
        <div class="card-acoes">
          <button class="btn-curtir ${post.curtido ? 'curtido' : ''}" onclick="alternarCurtida(${post.id})">
            ${post.curtido ? '❤️' : '🤍'} ${post.curtidas}
          </button>
          <button class="btn-ler" onclick="abrirLeitura(${post.id})">Ler artigo →</button>
        </div>
      </div>
    `;
    listaPostsEl.appendChild(card);
  });
}

// Curtir Post
function alternarCurtida(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    renderizarPosts();
  }
}

// Modal de Leitura
const modalLeitura = document.getElementById("modal-leitura");
function abrirLeitura(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  document.getElementById("leitura-categoria").textContent = post.categoria;
  document.getElementById("leitura-titulo").textContent = post.titulo;
  document.getElementById("leitura-data").textContent = post.data;
  document.getElementById("leitura-img").src = post.imagem;
  document.getElementById("leitura-texto").textContent = post.conteudo;
  modalLeitura.classList.remove("hidden");
}

document.getElementById("fechar-leitura").addEventListener("click", () => {
  modalLeitura.classList.add("hidden");
});

// Modal de Novo Post
const modalCriar = document.getElementById("modal-criar");
document.getElementById("btn-novo-post").addEventListener("click", () => {
  modalCriar.classList.remove("hidden");
});

document.getElementById("fechar-criar").addEventListener("click", () => {
  modalCriar.classList.add("hidden");
});

document.getElementById("form-post").addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("novo-titulo").value;
  const categoria = document.getElementById("nova-categoria").value;
  const imagemInput = document.getElementById("nova-img").value;
  const conteudo = document.getElementById("novo-conteudo").value;

  const novoPost = {
    id: Date.now(),
    titulo,
    categoria,
    data: "Hoje",
    imagem: imagemInput || "https://unsplash.com",
    resumo: conteudo.slice(0, 95) + "...",
    conteudo,
    curtidas: 0,
    curtido: false
  };

  posts.unshift(novoPost);
  renderizarPosts();
  e.target.reset();
  modalCriar.classList.add("hidden");
});

// Filtros e Busca
botoesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    categoriaAtual = btn.dataset.categoria;
    renderizarPosts();
  });
});

campoBusca.addEventListener("input", (e) => {
  termoBusca = e.target.value.toLowerCase();
  renderizarPosts();
});

// Dica Aleatória na Sidebar
let indiceDica = 0;
document.getElementById("btn-nova-dica").addEventListener("click", () => {
  indiceDica = (indiceDica + 1) % dicasRapidas.length;
  document.getElementById("dica-dia").textContent = dicasRapidas[indiceDica];
});

// Newsletter
document.getElementById("form-newsletter").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email-news").value;
  document.getElementById("msg-news").textContent = `Obrigado! Enviaremos novidades para ${email}.`;
  e.target.reset();
});

// Inicializar página
renderizarPosts();
