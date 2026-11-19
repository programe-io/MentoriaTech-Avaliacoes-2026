// ===== Dados =====
const produtos = [
  { id: 1, nome: "Batom Matte Vinho", categoria: "Batom", preco: 39.9, cor: "#7a1f3d" },
  { id: 2, nome: "Batom Cremoso Coral", categoria: "Batom", preco: 36.9, cor: "#e8604c" },
  { id: 3, nome: "Batom Nude Rosado", categoria: "Batom", preco: 34.9, cor: "#c98b86" },
  { id: 4, nome: "Base Fluida Bege 20", categoria: "Base", preco: 79.9, cor: "#e3b896" },
  { id: 5, nome: "Base Fluida Mel 40", categoria: "Base", preco: 79.9, cor: "#b9825a" },
  { id: 6, nome: "Base Fluida Cacau 60", categoria: "Base", preco: 79.9, cor: "#7b4a32" },
  { id: 7, nome: "Paleta Sombras Pôr do Sol", categoria: "Sombra", preco: 89.9, cor: "#d9803f" },
  { id: 8, nome: "Sombra Líquida Ameixa", categoria: "Sombra", preco: 44.9, cor: "#5e2a5c" },
  { id: 9, nome: "Sombra Cintilante Champanhe", categoria: "Sombra", preco: 42.9, cor: "#e6cf9a" },
  { id: 10, nome: "Blush Compacto Pêssego", categoria: "Blush", preco: 49.9, cor: "#f08a78" },
  { id: 11, nome: "Blush Cremoso Rosa Chá", categoria: "Blush", preco: 52.9, cor: "#d9707f" },
  { id: 12, nome: "Máscara de Cílios Volume", categoria: "Olhos", preco: 59.9, cor: "#2b1b24" },
];

const tons = [
  { nome: "Amora", cor: "#a3204b" },
  { nome: "Coral", cor: "#c8472f" },
  { nome: "Ameixa", cor: "#5e2a5c" },
];

const CHAVE_CARRINHO = "veludo-carrinho";
const FRETE_GRATIS = 150;

// ===== Estado =====
let carrinho = carregarCarrinho();
let categoriaAtual = "Todos";
let termoBusca = "";

// ===== Elementos =====
const listaProdutos = document.querySelector("#lista-produtos");
const filtros = document.querySelector("#filtros");
const vazio = document.querySelector("#vazio");
const campoBusca = document.querySelector("#busca");
const elTons = document.querySelector("#tons");
const painel = document.querySelector("#carrinho");
const fundo = document.querySelector("#fundo");
const itensCarrinho = document.querySelector("#itens-carrinho");
const carrinhoVazio = document.querySelector("#carrinho-vazio");
const elTotal = document.querySelector("#total");
const contador = document.querySelector("#contador-carrinho");
const aviso = document.querySelector("#aviso");

// ===== Utilitários =====
function formatar(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function carregarCarrinho() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
  } catch {
    return [];
  }
}

function salvarCarrinho() {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

let temporizador;
function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.hidden = false;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => (aviso.hidden = true), 2200);
}

// ===== Tons do hero =====
function renderizarTons() {
  elTons.innerHTML = "";
  tons.forEach((ton, i) => {
    const botao = document.createElement("button");
    botao.className = "ton";
    botao.style.setProperty("--cor", ton.cor);
    botao.dataset.cor = ton.cor;
    botao.textContent = ton.nome;
    botao.setAttribute("aria-pressed", i === 0);
    elTons.appendChild(botao);
  });
}

elTons.addEventListener("click", (e) => {
  const botao = e.target.closest(".ton");
  if (!botao) return;
  document.documentElement.style.setProperty("--tom", botao.dataset.cor);
  elTons.querySelectorAll(".ton").forEach((b) => b.setAttribute("aria-pressed", b === botao));
});

// ===== Filtros =====
function renderizarFiltros() {
  const categorias = ["Todos", ...new Set(produtos.map((p) => p.categoria))];
  filtros.innerHTML = "";
  categorias.forEach((categoria) => {
    const botao = document.createElement("button");
    botao.className = "filtro";
    botao.textContent = categoria;
    botao.dataset.categoria = categoria;
    botao.setAttribute("aria-pressed", categoria === categoriaAtual);
    filtros.appendChild(botao);
  });
}

filtros.addEventListener("click", (e) => {
  const botao = e.target.closest(".filtro");
  if (!botao) return;
  categoriaAtual = botao.dataset.categoria;
  renderizarFiltros();
  renderizarProdutos();
});

campoBusca.addEventListener("input", () => {
  termoBusca = campoBusca.value.trim().toLowerCase();
  renderizarProdutos();
});

// ===== Produtos =====
function filtrarProdutos() {
  let lista = produtos;
  if (categoriaAtual !== "Todos") {
    lista = lista.filter((p) => p.categoria === categoriaAtual);
  }
  if (termoBusca) {
    lista = lista.filter((p) => p.nome.toLowerCase().includes(termoBusca));
  }
  return lista;
}

function renderizarProdutos() {
  const lista = filtrarProdutos();
  listaProdutos.innerHTML = "";
  vazio.hidden = lista.length > 0;

  lista.forEach((produto) => {
    const card = document.createElement("article");
    card.className = "produto";
    const tipo = { Base: "base", Sombra: "sombra" }[produto.categoria] || "";
    card.innerHTML = `
      <div class="produto-foto"><div class="amostra ${tipo}" style="--cor:${produto.cor}"></div></div>
      <h3>${produto.nome}</h3>
      <p class="categoria">${produto.categoria}</p>
      <p class="preco">${formatar(produto.preco)}</p>
      <button data-id="${produto.id}">Adicionar ao carrinho</button>
    `;
    listaProdutos.appendChild(card);
  });
}

// Delegação de eventos: um único listener para todos os botões
listaProdutos.addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-id]");
  if (!botao) return;
  adicionarAoCarrinho(Number(botao.dataset.id));
});

// ===== Carrinho =====
function adicionarAoCarrinho(id) {
  const existente = carrinho.find((item) => item.id === id);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ id, qtd: 1 });
  }
  salvarCarrinho();
  renderizarCarrinho();
  mostrarAviso("Produto adicionado ao carrinho");
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter((i) => i.id !== id);
  salvarCarrinho();
  renderizarCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((i) => i.id !== id);
  salvarCarrinho();
  renderizarCarrinho();
}

function renderizarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;
  let quantidade = 0;

  carrinho.forEach((item) => {
    const produto = produtos.find((p) => p.id === item.id);
    if (!produto) return;
    total += produto.preco * item.qtd;
    quantidade += item.qtd;

    const li = document.createElement("li");
    li.className = "item";
    li.dataset.id = produto.id;
    li.innerHTML = `
      <strong>${produto.nome}</strong>
      <span>${formatar(produto.preco * item.qtd)}</span>
      <div class="item-qtd">
        <button data-acao="menos" aria-label="Diminuir quantidade">-</button>
        <span>${item.qtd}</span>
        <button data-acao="mais" aria-label="Aumentar quantidade">+</button>
      </div>
      <button class="remover" data-acao="remover">Remover</button>
    `;
    itensCarrinho.appendChild(li);
  });

  carrinhoVazio.hidden = quantidade > 0;
  elTotal.textContent = formatar(total);
  contador.textContent = quantidade;
}

itensCarrinho.addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-acao]");
  if (!botao) return;
  const id = Number(botao.closest(".item").dataset.id);
  const acao = botao.dataset.acao;
  if (acao === "mais") alterarQuantidade(id, 1);
  if (acao === "menos") alterarQuantidade(id, -1);
  if (acao === "remover") removerDoCarrinho(id);
});

function abrirCarrinho() {
  painel.classList.add("aberto");
  painel.setAttribute("aria-hidden", "false");
  fundo.hidden = false;
}

function fecharCarrinho() {
  painel.classList.remove("aberto");
  painel.setAttribute("aria-hidden", "true");
  fundo.hidden = true;
}

document.querySelector("#abrir-carrinho").addEventListener("click", abrirCarrinho);
document.querySelector("#fechar-carrinho").addEventListener("click", fecharCarrinho);
fundo.addEventListener("click", fecharCarrinho);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharCarrinho();
});

document.querySelector("#finalizar").addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarAviso("Adicione um produto antes de finalizar");
    return;
  }
  const total = carrinho.reduce((soma, item) => {
    const produto = produtos.find((p) => p.id === item.id);
    return soma + produto.preco * item.qtd;
  }, 0);
  const frete = total >= FRETE_GRATIS ? "com frete grátis" : "mais frete";
  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
  fecharCarrinho();
  mostrarAviso(`Pedido de ${formatar(total)} enviado, ${frete}`);
});

// ===== Início =====
renderizarTons();
renderizarFiltros();
renderizarProdutos();
renderizarCarrinho();