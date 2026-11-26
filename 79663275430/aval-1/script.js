// Banco de dados local de receitas (adicione novas receitas aqui)
const receitas = [
  {
    id: 1,
    titulo: "Bolo de Cenoura com Cobertura de Chocolate",
    categoria: "doces",
    tempo: "45 min",
    porcoes: "10 fatias",
    imagem: "https://unsplash.com",
    resumo: "Massa fofinha feita no liquidificador com calda cremosa de chocolate.",
    ingredientes: [
      "3 cenouras médias descascadas e picadas",
      "3 ovos inteiros",
      "1 xícara (chá) de óleo",
      "2 xícaras (chá) de açúcar",
      "2 e 1/2 xícaras (chá) de farinha de trigo",
      "1 colher (sopa) de fermento em pó"
    ],
    preparo: [
      "Bata no liquidificador as cenouras, os ovos e o óleo até formar um creme liso.",
      "Em uma tigela, misture o açúcar e a farinha de trigo, depois despeje o creme.",
      "Adicione o fermento e misture delicadamente.",
      "Asse em forma untada a 180 °C por cerca de 40 minutos."
    ]
  },
  {
    id: 2,
    titulo: "Frango Grelhado com Ervas e Limão",
    categoria: "salgados",
    tempo: "25 min",
    porcoes: "4 porções",
    imagem: "https://unsplash.com",
    resumo: "Peito de frango suculento temperado com alho, alecrim e limão siciliano.",
    ingredientes: [
      "4 filés de peito de frango",
      "Suco de 1 limão",
      "2 dentes de alho amassados",
      "1 colher (sopa) de azeite de oliva",
      "Sal, pimenta-do-reino e alecrim a gosto"
    ],
    preparo: [
      "Tempere os filés com limão, alho, sal, pimenta e alecrim. Deixe marinar por 15 minutos.",
      "Aqueça uma frigideira antiaderente com o azeite em fogo médio-alto.",
      "Grelhe os filés por cerca de 5 minutos de cada lado até dourarem bem."
    ]
  },
  {
    id: 3,
    titulo: "Panqueca de Banana e Aveia",
    categoria: "rapidas",
    tempo: "10 min",
    porcoes: "2 porções",
    imagem: "https://unsplash.com",
    resumo: "Opção saudável, sem açúcar refinado e pronta em poucos minutos.",
    ingredientes: [
      "2 bananas maduras amassadas",
      "2 ovos",
      "4 colheres (sopa) de aveia em flocos finos",
      "1 pitada de canela em pó"
    ],
    preparo: [
      "Amasse bem as bananas em um prato e misture com os ovos.",
      "Acrescente a aveia e a canela até obter uma massa homogênea.",
      "Doure pequenas porções em frigideira untada por 2 minutos de cada lado."
    ]
  }
];

const listaReceitas = document.getElementById("lista-receitas");
const campoBusca = document.getElementById("campo-busca");
const botoesFiltro = document.querySelectorAll(".btn-filtro");
const modal = document.getElementById("modal-receita");
const detalhesReceita = document.getElementById("detalhes-receita");
const fecharModal = document.getElementById("fechar-modal");

let categoriaAtual = "todas";

// Renderiza os cards na tela
function exibirReceitas() {
  const termo = campoBusca.value.toLowerCase().trim();

  const filtradas = receitas.filter((receita) => {
    const combinaCategoria =
      categoriaAtual === "todas" || receita.categoria === categoriaAtual;

    const combinaBusca =
      receita.titulo.toLowerCase().includes(termo) ||
      receita.ingredientes.some((ing) => ing.toLowerCase().includes(termo));

    return combinaCategoria && combinaBusca;
  });

  if (filtradas.length === 0) {
    listaReceitas.innerHTML = `<p>Nenhuma receita encontrada para "${campoBusca.value}".</p>`;
    return;
  }

  listaReceitas.innerHTML = filtradas
    .map(
      (r) => `
      <article class="card">
        <img src="${r.imagem}" alt="${r.titulo}">
        <div class="card-corpo">
          <span class="tag">${r.categoria}</span>
          <h2>${r.titulo}</h2>
          <p>${r.resumo}</p>
          <div class="card-info">
            <span>⏱ ${r.tempo} • 🍽 ${r.porcoes}</span>
            <button class="btn-ver" onclick="abrirReceita(${r.id})">Ver receita</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// Abre o modal com os detalhes completos
function abrirReceita(id) {
  const receita = receitas.find((r) => r.id === id);
  if (!receita) return;

  detalhesReceita.innerHTML = `
    <span class="tag">${receita.categoria}</span>
    <h2>${receita.titulo}</h2>
    <p><strong>Tempo:</strong> ${receita.tempo} | <strong>Rendimento:</strong> ${receita.porcoes}</p>
    <img src="${receita.imagem}" alt="${receita.titulo}">
    <h3>Ingredientes</h3>
    <ul>
      ${receita.ingredientes.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <h3>Modo de Preparo</h3>
    <ol>
      ${receita.preparo.map((passo) => `<li>${passo}</li>`).join("")}
    </ol>
  `;

  modal.classList.add("aberto");
}

// Eventos de filtro e busca
botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    categoriaAtual = botao.dataset.categoria;
    exibirReceitas();
  });
});

campoBusca.addEventListener("input", exibirReceitas);

fecharModal.addEventListener("click", () => modal.classList.remove("aberto"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("aberto");
});

// Inicializa o blog
exibirReceitas();
