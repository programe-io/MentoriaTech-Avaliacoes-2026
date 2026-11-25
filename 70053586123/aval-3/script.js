// Catálogo com 5 Produtos Típicos do Piauí
const produtos = [
  {
    id: 1,
    nome: "Cajuína Cristal Artesanal (500ml)",
    categoria: "bebidas-doces",
    categoriaLabel: "Bebidas & Doces",
    origem: "Teresina - PI",
    preco: 18.90,
    emoji: "🍾",
    descricao: "Bebida típica clarificada e caramelizada feita 100% do suco de caju puro, sem álcool e sem conservantes."
  },
  {
    id: 2,
    nome: "Paçoca de Carne de Sol no Pilão (500g)",
    categoria: "gastronomia",
    categoriaLabel: "Gastronomia",
    origem: "Campo Maior - PI",
    preco: 34.50,
    emoji: "🥩",
    descricao: "Carne de sol selecionada, desfiada e pilada artesanalmente com farinha d'água crocante e temperos regionais."
  },
  {
    id: 3,
    nome: "Pingente de Opala de Pedro II em Prata",
    categoria: "artesanato",
    categoriaLabel: "Artesanato & Joias",
    origem: "Pedro II - PI",
    preco: 189.00,
    emoji: "💎",
    descricao: "Gema preciosa única no Brasil, lapidada artesanalmente na Suíça Piauiense com engaste em prata 925."
  },
  {
    id: 4,
    nome: "Doce de Buriti Cremoso (Pote 400g)",
    categoria: "bebidas-doces",
    categoriaLabel: "Bebidas & Doces",
    origem: "Piripiri - PI",
    preco: 22.00,
    emoji: "🍯",
    descricao: "Doce tradicional extraído da polpa do buriti nativo, rico em sabor marcante e textura aveludada."
  },
  {
    id: 5,
    nome: "Escultura de Arte Santeira em Madeira",
    categoria: "artesanato",
    categoriaLabel: "Artesanato & Joias",
    origem: "Teresina - PI",
    preco: 145.00,
    emoji: "🪵",
    descricao: "Peça esculpida à mão em madeira de cedro por mestres santeiros do polo cerâmico e artesanal do Poti Velho."
  }
];

// Estado da Aplicação
let carrinho = JSON.parse(localStorage.getItem("carrinho_piaui")) || [];
let categoriaAtual = "todos";
let termoBusca = "";

// Elementos do DOM
const listaProdutosEl = document.getElementById("lista-produtos");
const campoBuscaEl = document.getElementById("campo-busca");
const botoesFiltroEl = document.getElementById("botoes-filtro");
const contadorCarrinhoEl = document.getElementById("contador-carrinho");
const carrinhoDrawerEl = document.getElementById("carrinho-drawer");
const overlayEl = document.getElementById("overlay");
const abrirCarrinhoBtn = document.getElementById("abrir-carrinho");
const fecharCarrinhoBtn = document.getElementById("fechar-carrinho");
const carrinhoItensEl = document.getElementById("carrinho-itens");
const valorSubtotalEl = document.getElementById("valor-subtotal");
const valorFreteEl = document.getElementById("valor-frete");
const valorTotalEl = document.getElementById("valor-total");
const btnFinalizarEl = document.getElementById("btn-finalizar");
const toastEl = document.getElementById("toast");

// Formatar moeda em Real (BRL)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho_piaui", JSON.stringify(carrinho));
}

// Exibir notificação temporária
function mostrarToast(mensagem) {
  toastEl.textContent = mensagem;
  toastEl.classList.add("visivel");
  setTimeout(() => {
    toastEl.classList.remove("visivel");
  }, 2400);
}

// Renderizar vitrine de produtos
function renderizarProdutos() {
  const filtrados = produtos.filter((produto) => {
    const bateCategoria =
      categoriaAtual === "todos" || produto.categoria === categoriaAtual;
    const bateBusca =
      produto.nome.toLowerCase().includes(termoBusca) ||
      produto.descricao.toLowerCase().includes(termoBusca) ||
      produto.origem.toLowerCase().includes(termoBusca);

    return bateCategoria && bateBusca;
  });

  if (filtrados.length === 0) {
    listaProdutosEl.innerHTML = `
      <div class="mensagem-vazia">
        <p>Nenhum produto típico encontrado para a busca informada.</p>
      </div>
    `;
    return;
  }

  listaProdutosEl.innerHTML = filtrados
    .map(
      (produto) => `
      <article class="card-produto">
        <div class="card-imagem">
          <span class="card-origem">📍 ${produto.origem}</span>
          <span class="card-emoji">${produto.emoji}</span>
        </div>
        <div class="card-corpo">
          <span class="card-categoria">${produto.categoriaLabel}</span>
          <h4 class="card-titulo">${produto.nome}</h4>
          <p class="card-descricao">${produto.descricao}</p>
          <div class="card-rodape">
            <span class="card-preco">${formatarMoeda(produto.preco)}</span>
            <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
              + Adicionar
            </button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(idProduto) {
  const produto = produtos.find((p) => p.id === idProduto);
  if (!produto) return;

  const itemExistente = carrinho.find((item) => item.id === idProduto);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1
    });
  }

  salvarCarrinho();
  atualizarCarrinho();
  mostrarToast(`"${produto.nome}" adicionado ao carrinho!`);
}

// Alterar quantidade de um item no carrinho
function alterarQuantidade(idProduto, delta) {
  const item = carrinho.find((i) => i.id === idProduto);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter((i) => i.id !== idProduto);
  }

  salvarCarrinho();
  atualizarCarrinho();
}

// Remover item completamente do carrinho
function removerItem(idProduto) {
  carrinho = carrinho.filter((i) => i.id !== idProduto);
  salvarCarrinho();
  atualizarCarrinho();
}

// Atualizar visualização e cálculos do carrinho
function atualizarCarrinho() {
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  contadorCarrinhoEl.textContent = totalItens;

  if (carrinho.length === 0) {
    carrinhoItensEl.innerHTML = `
      <p class="carrinho-vazio">Seu carrinho está vazio.<br>Escolha uma iguaria ou artesanato do Piauí!</p>
    `;
    valorSubtotalEl.textContent = formatarMoeda(0);
    valorFreteEl.textContent = "Grátis acima de R$ 150,00";
    valorTotalEl.textContent = formatarMoeda(0);
    return;
  }

  carrinhoItensEl.innerHTML = carrinho
    .map(
      (item) => `
      <div class="item-carrinho">
        <div class="item-info">
          <h4>${item.nome}</h4>
          <span>${formatarMoeda(item.preco * item.quantidade)}</span>
        </div>
        <div class="item-controles">
          <button class="btn-qtd" onclick="alterarQuantidade(${item.id}, -1)">-</button>
          <strong>${item.quantidade}</strong>
          <button class="btn-qtd" onclick="alterarQuantidade(${item.id}, 1)">+</button>
          <button class="btn-remover" onclick="removerItem(${item.id})" title="Remover">🗑️</button>
        </div>
      </div>
    `
    )
    .join("");

  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  const frete = subtotal >= 150 ? 0 : 19.90;
  const total = subtotal + frete;

  valorSubtotalEl.textContent = formatarMoeda(subtotal);
  valorFreteEl.textContent = frete === 0 ? "Grátis 🎉" : formatarMoeda(frete);
  valorTotalEl.textContent = formatarMoeda(total);
}

// Abrir e fechar o carrinho lateral
function abrirCarrinho() {
  carrinhoDrawerEl.classList.add("aberto");
  overlayEl.classList.add("aberto");
}

function fecharCarrinho() {
  carrinhoDrawerEl.classList.remove("aberto");
  overlayEl.classList.remove("aberto");
}

// Eventos
botoesFiltroEl.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".filtro-btn");
  if (!botao) return;

  document.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("ativo"));
  botao.classList.add("ativo");

  categoriaAtual = botao.dataset.categoria;
  renderizarProdutos();
});

campoBuscaEl.addEventListener("input", (evento) => {
  termoBusca = evento.target.value.trim().toLowerCase();
  renderizarProdutos();
});

abrirCarrinhoBtn.addEventListener("click", abrirCarrinho);
fecharCarrinhoBtn.addEventListener("click", fecharCarrinho);
overlayEl.addEventListener("click", fecharCarrinho);

btnFinalizarEl.addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarToast("Adicione produtos antes de finalizar o pedido.");
    return;
  }

  alert(
    "Pedido realizado com sucesso! 🎉\nObrigado por valorizar a cultura e os produtores do Piauí."
  );
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
  fecharCarrinho();
});

// Inicialização
renderizarProdutos();
atualizarCarrinho();