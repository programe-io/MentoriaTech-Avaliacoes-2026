const posts = [
  {
    id: 1,
    titulo: "Como funciona a retenção nos primeiros 3 segundos",
    categoria: "Algoritmo",
    data: "24 Nov 2026",
    leitura: "4 min",
    resumo: "Entenda por que o gancho visual e sonoro define se o vídeo continua sendo entregue.",
    curtidas: 42,
    paragrafos: [
      "Os primeiros três segundos decidem se o espectador desliza para o próximo vídeo ou assiste até o final.",
      "Evite introduções lentas como 'oi pessoal, tudo bem?'. Comece direto pela ação, resultado ou pergunta curiosa.",
      "Combine cortes rápidos, legendas legíveis e um áudio com ritmo marcante para segurar a atenção."
    ]
  },
  {
    id: 2,
    titulo: "Cortes dinâmicos e legendas sem poluir a tela",
    categoria: "Edição",
    data: "20 Nov 2026",
    leitura: "5 min",
    resumo: "Dicas práticas de ritmo, enquadramento vertical e contraste para deixar seus vídeos mais fluidos.",
    curtidas: 31,
    paragrafos: [
      "Remova pausas mortas e respirações longas para manter o ritmo natural e dinâmico.",
      "Deixe espaço livre na parte inferior e lateral direita para não conflitar com legendas nativas, botões de curtir e descrição.",
      "Use fontes com bom contraste e destaque apenas 1 ou 2 palavras-chave por frase."
    ]
  },
  {
    id: 3,
    titulo: "Como adaptar trends sem perder sua identidade",
    categoria: "Trends",
    data: "15 Nov 2026",
    leitura: "3 min",
    resumo: "Use áudios e formatos em alta conectando o humor ou a transição ao seu nicho.",
    curtidas: 58,
    paragrafos: [
      "Nem toda trend combina com o seu público. Escolha formatos que encaixem naturalmente no tema do seu perfil.",
      "Entregue a piada ou virada de chave logo no início e conecte com o seu dia a dia ou produto.",
      "Postar rápido enquanto o áudio está crescendo ajuda a surfar o pico de interesse."
    ]
  }
];

let categoriaAtiva = "Todos";
let termoBusca = "";
const curtidosIds = new Set();

const gridPosts = document.getElementById("gridPosts");
const campoBusca = document.getElementById("campoBusca");
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const modalBackdrop = document.getElementById("modalBackdrop");
const fecharModalBtn = document.getElementById("fecharModal");

function renderizarPosts() {
  const filtrados = posts.filter((post) => {
    const bateCategoria = categoriaAtiva === "Todos" || post.categoria === categoriaAtiva;
    const texto = `${post.titulo} ${post.resumo} ${post.categoria}`.toLowerCase();
    const bateBusca = texto.includes(termoBusca.trim().toLowerCase());
    return bateCategoria && bateBusca;
  });

  if (filtrados.length === 0) {
    gridPosts.innerHTML = `<p class="meta">Nenhum artigo encontrado para esse filtro.</p>`;
    return;
  }

  gridPosts.innerHTML = filtrados
    .map((post) => {
      const curtido = curtidosIds.has(post.id);
      return `
        <article class="card">
          <div>
            <span class="badge">${post.categoria}</span>
            <h2>${post.titulo}</h2>
            <p class="meta">${post.data} • ${post.leitura} de leitura</p>
            <p>${post.resumo}</p>
          </div>
          <div class="card-acoes">
            <button class="btn-ler" onclick="abrirArtigo(${post.id})">Ler artigo</button>
            <button class="btn-curtir ${curtido ? "curtido" : ""}" onclick="alternarCurtida(${post.id})">
              ♥ ${post.curtidas}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function alternarCurtida(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  if (curtidosIds.has(id)) {
    curtidosIds.delete(id);
    post.curtidas -= 1;
  } else {
    curtidosIds.add(id);
    post.curtidas += 1;
  }
  renderizarPosts();
}

function abrirArtigo(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  document.getElementById("modalCategoria").textContent = post.categoria;
  document.getElementById("modalTitulo").textContent = post.titulo;
  document.getElementById("modalMeta").textContent = `${post.data} • ${post.leitura} de leitura`;
  document.getElementById("modalCorpo").innerHTML = post.paragrafos
    .map((p) => `<p>${p}</p>`)
    .join("");

  modalBackdrop.classList.add("aberto");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

function fecharArtigo() {
  modalBackdrop.classList.remove("aberto");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

campoBusca.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarPosts();
});

botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    categoriaAtiva = btn.dataset.categoria;
    renderizarPosts();
  });
});

fecharModalBtn.addEventListener("click", fecharArtigo);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) fecharArtigo();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharArtigo();
});

renderizarPosts();
