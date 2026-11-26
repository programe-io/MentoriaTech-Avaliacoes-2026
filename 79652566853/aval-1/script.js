const CHAVE_STORAGE = "sabor_e_casa_receitas_v1";
const IMAGEM_PADRAO =
  "https://unsplash.com";

const receitasIniciais = [
  {
    id: 1,
    titulo: "Pão de Queijo de Liquidificador",
    categoria: "Lanches",
    tempo: "35 min",
    imagem:
      "https://unsplash.com",
    ingredientes: [
      "1 xícara de leite",
      "1/2 xícara de óleo",
      "2 ovos",
      "2 xícaras de polvilho doce",
      "1 xícara de queijo minas ralado",
      "1 colher (chá) de sal"
    ],
    preparo: [
      "Bata no liquidificador o leite, o óleo, os ovos e o sal até ficar homogêneo.",
      "Adicione o polvilho aos poucos e bata até misturar bem.",
      "Junte o queijo ralado e misture com uma colher.",
      "Despeje em forminhas untadas e asse a 180 °C por cerca de 25 minutos."
    ]
  },
  {
    id: 2,
    titulo: "Brigadeiro Cremoso de Panela",
    categoria: "Doces",
    tempo: "15 min",
    imagem:
      "https://unsplash.com",
    ingredientes: [
      "1 lata de leite condensado",
      "2 colheres (sopa) de chocolate em pó",
      "1 colher (sopa) de manteiga"
    ],
    preparo: [
      "Leve todos os ingredientes ao fogo baixo em uma panela de fundo grosso.",
      "Mexa sem parar até desgrudar do fundo da panela.",
      "Transfira para um prato untado, deixe esfriar e enrole ou sirva de colher."
    ]
  },
  {
    id: 3,
    titulo: "Frango Assado com Ervas e Limão",
    categoria: "Salgados",
    tempo: "50 min",
    imagem:
      "https://unsplash.com",
    ingredientes: [
      "1 kg de sobrecoxas de frango",
      "Suco de 1 limão",
      "3 dentes de alho amassados",
      "2 colheres (sopa) de azeite",
      "Alecrim, sal e pimenta-do-reino a gosto"
    ],
    preparo: [
      "Tempere o frango com limão, alho, azeite, sal, pimenta e alecrim por pelo menos 20 minutos.",
      "Disponha em uma assadeira coberta com papel-alumínio e leve ao forno a 200 °C por 30 minutos.",
      "Retire o papel-alumínio e asse por mais 15 a 20 minutos até dourar."
    ]
  }
];

let receitas = carregarReceitas();
let categoriaAtual = "Todas";
let termoBusca = "";

const gradeReceitas = document.getElementById("gradeReceitas");
const campoBusca = document.getElementById("campoBusca");
const filtrosCategoria = document.getElementById("filtrosCategoria");

const modalReceita = document.getElementById("modalReceita");
const fecharModal = document.getElementById("fecharModal");

const modalForm = document.getElementById("modalForm");
const btnAbrirForm = document.getElementById("btnAbrirForm");
const fecharForm = document.getElementById("fecharForm");
const formReceita = document.getElementById("formReceita");

function carregarReceitas() {
  const salvo = localStorage.getItem(CHAVE_STORAGE);
  if (!salvo) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(receitasIniciais));
    return [...receitasIniciais];
  }
  return JSON.parse(salvo);
}

function salvarReceitas() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(receitas));
}

function renderizarReceitas() {
  const filtradas = receitas.filter((r) => {
    const bateCategoria =
      categoriaAtual === "Todas" || r.categoria === categoriaAtual;

    const busca = termoBusca.trim().toLowerCase();
    const bateBusca =
      !busca ||
      r.titulo.toLowerCase().includes(busca) ||
      r.ingredientes.some((ing) => ing.toLowerCase().includes(busca));

    return bateCategoria && bateBusca;
  });

  if (filtradas.length === 0) {
    gradeReceitas.innerHTML = `<p class="meta">Nenhuma receita encontrada.</p>`;
    return;
  }

  gradeReceitas.innerHTML = filtradas
    .map(
      (r) => `
      <article class="card" data-id="${r.id}">
        <img src="${r.imagem || IMAGEM_PADRAO}" alt="${r.titulo}" />
        <div class="card-corpo">
          <span class="badge">${r.categoria}</span>
          <h2>${r.titulo}</h2>
          <p class="meta">Tempo: ${r.tempo}</p>
        </div>
      </article>
    `
    )
    .join("");
}

function abrirDetalhes(id) {
  const receita = receitas.find((r) => r.id === Number(id));
  if (!receita) return;

  document.getElementById("modalImagem").src = receita.imagem || IMAGEM_PADRAO;
  document.getElementById("modalImagem").alt = receita.titulo;
  document.getElementById("modalCategoria").textContent = receita.categoria;
  document.getElementById("modalTitulo").textContent = receita.titulo;
  document.getElementById("modalTempo").textContent = `Tempo de preparo: ${receita.tempo}`;

  document.getElementById("modalIngredientes").innerHTML = receita.ingredientes
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("modalPreparo").innerHTML = receita.preparo
    .map((passo) => `<li>${passo}</li>`)
    .join("");

  modalReceita.classList.remove("oculto");
}

campoBusca.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarReceitas();
});

filtrosCategoria.addEventListener("click", (e) => {
  const botao = e.target.closest(".filtro");
  if (!botao) return;

  document.querySelectorAll(".filtro").forEach((b) => b.classList.remove("ativo"));
  botao.classList.add("ativo");
  categoriaAtual = botao.dataset.categoria;
  renderizarReceitas();
});

gradeReceitas.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) abrirDetalhes(card.dataset.id);
});

fecharModal.addEventListener("click", () => modalReceita.classList.add("oculto"));
modalReceita.addEventListener("click", (e) => {
  if (e.target === modalReceita) modalReceita.classList.add("oculto");
});

btnAbrirForm.addEventListener("click", () => modalForm.classList.remove("oculto"));
fecharForm.addEventListener("click", () => modalForm.classList.add("oculto"));
modalForm.addEventListener("click", (e) => {
  if (e.target === modalForm) modalForm.classList.add("oculto");
});

formReceita.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("inputTitulo").value.trim();
  const categoria = document.getElementById("inputCategoria").value;
  const tempo = document.getElementById("inputTempo").value.trim();
  const imagem = document.getElementById("inputImagem").value.trim();
  const ingredientes = document
    .getElementById("inputIngredientes")
    .value.split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const preparo = document
    .getElementById("inputPreparo")
    .value.split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (!titulo || !tempo || ingredientes.length === 0 || preparo.length === 0) return;

  receitas.unshift({
    id: Date.now(),
    titulo,
    categoria,
    tempo,
    imagem: imagem || IMAGEM_PADRAO,
    ingredientes,
    preparo
  });

  salvarReceitas();
  renderizarReceitas();
  formReceita.reset();
  modalForm.classList.add("oculto");
});

renderizarReceitas();
