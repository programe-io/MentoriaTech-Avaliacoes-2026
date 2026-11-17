/* ==========================================================================
   BLOG PESSOAL DE JOGOS - KENNEDY ARAGÃO (index.js)
   Funcionalidades: Filtro por categoria, Modal de Leitura, Busca e Boas-vindas
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const AUTOR = "Kennedy Aragão";
  const ANO_ATUAL = new Date().getFullYear();

  console.log(`%c ${AUTOR} // GAME BLOG carregado com sucesso! `, 
    "background: #dc2626; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 3px;"
  );

  // ========================================================================
  // 1. DADOS COMPLETOS DOS ARTIGOS (Para abrir no Modal ao clicar em "Ler Artigo")
  // ========================================================================
  const artigosCompletos = [
    {
      titulo: "Os Melhores RPGs de Ação para Zerar este Ano",
      categoria: "Review",
      data: `17 de Novembro de ${ANO_ATUAL}`,
      conteudo: `Como fã de longa data de RPGs de ação, testei dezenas de títulos recentes para separar os que realmente valem cada hora investida. Os destaques deste ano brilham pelo combate responsivo, árvores de habilidades profundas e chefes memoráveis que exigem reflexos rápidos. Se você procura uma campanha envolvente com fator replay alto, esses jogos são obrigatórios na sua biblioteca.`
    },
    {
      titulo: "Por que os Jogos Indie Estão Superando os Grandes Estúdios?",
      categoria: "Opinião",
      data: `10 de Novembro de ${ANO_ATUAL}`,
      conteudo: `Enquanto muitas produtoras gigantes apostam apenas em gráficos pesados e microtransações, os estúdios independentes estão resgatando a essência do videogame: diversão pura e ideias ousadas. Em minhas últimas jogatinas, ficou claro que direção de arte marcante e mecânicas criativas valem muito mais do que orçamentos milionários.`
    },
    {
      titulo: "Meu Setup Atual: O que Uso para Jogar e Escrever",
      categoria: "Hardware & Setup",
      data: `02 de Novembro de ${ANO_ATUAL}`,
      conteudo: `Montar um setup equilibrado em preto e vermelho sempre foi uma meta pessoal. Hoje utilizo um teclado mecânico com switches lineares rápidos, mouse ultraleve para precisão em jogos competitivos e um monitor de alta taxa de atualização. Tudo pensado tanto para longas sessões de gameplay quanto para escrever aqui no blog.`
    }
  ];

  // ========================================================================
  // 2. BARRA DE FILTRO POR CATEGORIA E BUSCA (Criada dinamicamente via JS)
  // ========================================================================
  const containerPosts = document.querySelector(".container");

  if (containerPosts) {
    const barraFerramentas = document.createElement("div");
    barraFerramentas.style.cssText = `
      max-width: 1180px;
      margin: 30px auto 0;
      padding: 0 24px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    `;

    // Botões de Filtro
    const categorias = ["Todos", "Review", "Opinião", "Hardware & Setup"];
    const grupoBotoes = document.createElement("div");
    grupoBotoes.style.cssText = "display: flex; gap: 10px; flex-wrap: wrap;";

    categorias.forEach((cat) => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.dataset.categoria = cat;
      btn.style.cssText = `
        background-color: ${cat === "Todos" ? "#dc2626" : "#141417"};
        color: #ffffff;
        border: 1px solid #dc2626;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.85rem;
        transition: all 0.25s ease;
      `;

      btn.addEventListener("click", () => {
        // Atualiza visual dos botões
        grupoBotoes.querySelectorAll("button").forEach(b => b.style.backgroundColor = "#141417");
        btn.style.backgroundColor = "#dc2626";
        filtrarPosts(cat, inputBusca.value);
      });

      grupoBotoes.appendChild(btn);
    });

    // Campo de Busca
    const inputBusca = document.createElement("input");
    inputBusca.type = "text";
    inputBusca.placeholder = `Buscar nos posts de ${AUTOR}...`;
    inputBusca.style.cssText = `
      background-color: #141417;
      color: #ffffff;
      border: 1px solid #27272a;
      padding: 10px 16px;
      border-radius: 4px;
      min-width: 260px;
      outline: none;
    `;

    inputBusca.addEventListener("focus", () => inputBusca.style.borderColor = "#dc2626");
    inputBusca.addEventListener("blur", () => inputBusca.style.borderColor = "#27272a");
    inputBusca.addEventListener("input", () => {
      const botaoAtivo = Array.from(grupoBotoes.querySelectorAll("button"))
        .find(b => b.style.backgroundColor === "rgb(220, 38, 38)");
      const catAtiva = botaoAtivo ? botaoAtivo.dataset.categoria : "Todos";
      filtrarPosts(catAtiva, inputBusca.value);
    });

    barraFerramentas.appendChild(grupoBotoes);
    barraFerramentas.appendChild(inputBusca);
    containerPosts.parentNode.insertBefore(barraFerramentas, containerPosts);
  }

  function filtrarPosts(categoria, termoBusca) {
    const cards = document.querySelectorAll(".post-card");
    const termo = termoBusca.toLowerCase().trim();

    cards.forEach((card) => {
      const tag = card.querySelector(".tag-categoria")?.textContent.trim() || "";
      const titulo = card.querySelector("h2")?.textContent.toLowerCase() || "";
      const resumo = card.querySelector("p")?.textContent.toLowerCase() || "";

      const bateCategoria = categoria === "Todos" || tag.toLowerCase() === categoria.toLowerCase();
      const bateTexto = titulo.includes(termo) || resumo.includes(termo);

      card.style.display = (bateCategoria && bateTexto) ? "flex" : "none";
    });
  }

  // ========================================================================
  // 3. MODAL DE LEITURA DE ARTIGO (Preto, Vermelho e Branco)
  // ========================================================================
  const modal = document.createElement("div");
  modal.id = "modal-artigo";
  modal.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;

  modal.innerHTML = `
    <div style="
      background-color: #141417;
      border: 2px solid #dc2626;
      border-radius: 8px;
      max-width: 680px;
      width: 100%;
      padding: 30px;
      position: relative;
      color: #ffffff;
      box-shadow: 0 0 30px rgba(220, 38, 38, 0.4);
    ">
      <button id="fechar-modal" style="
        position: absolute;
        top: 15px;
        right: 15px;
        background: #dc2626;
        color: #ffffff;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      ">X</button>
      <span id="modal-tag" style="
        background: rgba(220, 38, 38, 0.2);
        color: #ff1e1e;
        border: 1px solid #dc2626;
        padding: 3px 10px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: uppercase;
      "></span>
      <h2 id="modal-titulo" style="margin: 15px 0 8px; font-size: 1.7rem;"></h2>
      <p id="modal-meta" style="color: #a1a1aa; font-size: 0.9rem; margin-bottom: 20px;"></p>
      <p id="modal-texto" style="color: #e4e4e7; line-height: 1.75; font-size: 1.05rem;"></p>
    </div>
  `;

  document.body.appendChild(modal);

  const fecharModal = () => (modal.style.display = "none");
  document.getElementById("fechar-modal").addEventListener("click", fecharModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });

  // Conecta os botões "Ler Artigo" ao Modal
  const botoesLer = document.querySelectorAll(".btn-ler");
  botoesLer.forEach((botao, index) => {
    botao.addEventListener("click", (e) => {
      e.preventDefault();
      const post = artigosCompletos[index] || {
        titulo: botao.closest(".post-card").querySelector("h2").textContent,
        categoria: botao.closest(".post-card").querySelector(".tag-categoria").textContent,
        data: `Novembro de ${ANO_ATUAL}`,
        conteudo: botao.closest(".post-card").querySelector("p").textContent
      };

      document.getElementById("modal-tag").textContent = post.categoria;
      document.getElementById("modal-titulo").textContent = post.titulo;
      document.getElementById("modal-meta").textContent = `Escrito por ${AUTOR} • Publicado em ${post.data}`;
      document.getElementById("modal-texto").textContent = post.conteudo;

      modal.style.display = "flex";
    });
  });

  // ========================================================================
  // 4. BOTÃO FLUTUANTE VOLTAR AO TOPO
  // ========================================================================
  const btnTopo = document.createElement("button");
  btnTopo.textContent = "▲ TOPO";
  btnTopo.title = `Voltar ao topo - ${AUTOR}`;
  btnTopo.style.cssText = `
    display: none;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #dc2626;
    color: #ffffff;
    border: 2px solid #ffffff;
    padding: 10px 14px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  `;

  document.body.appendChild(btnTopo);

  window.addEventListener("scroll", () => {
    btnTopo.style.display = window.scrollY > 250 ? "block" : "none";
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
