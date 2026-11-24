const STORAGE_KEY = "estoque_produtos_v1";

const PRODUTOS_EXEMPLO = [
  {
    id: crypto.randomUUID(),
    sku: "TEC-001",
    nome: "Teclado Mecânico ABNT2",
    categoria: "Periféricos",
    quantidade: 18,
    estoqueMinimo: 5,
    preco: 249.9
  },
  {
    id: crypto.randomUUID(),
    sku: "MON-014",
    nome: "Monitor IPS 24\" Full HD",
    categoria: "Eletrônicos",
    quantidade: 4,
    estoqueMinimo: 5,
    preco: 899.0
  },
  {
    id: crypto.randomUUID(),
    sku: "PAP-009",
    nome: "Resma Papel A4 (500 fls)",
    categoria: "Escritório",
    quantidade: 0,
    estoqueMinimo: 10,
    preco: 28.5
  }
];

// Referências do DOM
const form = document.getElementById("produtoForm");
const formTitle = document.getElementById("formTitle");
const produtoIdInput = document.getElementById("produtoId");
const nomeInput = document.getElementById("nome");
const skuInput = document.getElementById("sku");
const categoriaInput = document.getElementById("categoria");
const quantidadeInput = document.getElementById("quantidade");
const estoqueMinimoInput = document.getElementById("estoqueMinimo");
const precoInput = document.getElementById("preco");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancelar = document.getElementById("btnCancelar");
const btnResetDemo = document.getElementById("btnResetDemo");

const tabelaBody = document.getElementById("tabelaProdutos");
const emptyState = document.getElementById("emptyState");
const buscaInput = document.getElementById("buscaInput");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroStatus = document.getElementById("filtroStatus");

const totalProdutosEl = document.getElementById("totalProdutos");
const totalUnidadesEl = document.getElementById("totalUnidades");
const valorTotalEstoqueEl = document.getElementById("valorTotalEstoque");
const totalAlertasEl = document.getElementById("totalAlertas");

let produtos = carregarProdutos();

// Formatação em Real (BRL)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Carregar e salvar no LocalStorage
function carregarProdutos() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (!salvo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUTOS_EXEMPLO));
    return [...PRODUTOS_EXEMPLO];
  }
  try {
    return JSON.parse(salvo);
  } catch {
    return [];
  }
}

function salvarProdutos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

// Determina status do produto
function obterStatus(produto) {
  if (produto.quantidade <= 0) {
    return { chave: "zerado", label: "Sem estoque", classe: "badge-zerado" };
  }
  if (produto.quantidade <= produto.estoqueMinimo) {
    return { chave: "baixo", label: "Estoque baixo", classe: "badge-baixo" };
  }
  return { chave: "ok", label: "Em estoque", classe: "badge-ok" };
}

// Atualiza os cards superiores
function atualizarResumo() {
  const totalTipos = produtos.length;
  const totalUnidades = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + p.quantidade * p.preco, 0);
  const alertas = produtos.filter((p) => p.quantidade <= p.estoqueMinimo).length;

  totalProdutosEl.textContent = totalTipos;
  totalUnidadesEl.textContent = totalUnidades;
  valorTotalEstoqueEl.textContent = formatarMoeda(valorTotal);
  totalAlertasEl.textContent = alertas;
}

// Escapa caracteres HTML para evitar XSS
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// Renderiza a tabela filtrada
function renderizarTabela() {
  const termo = buscaInput.value.trim().toLowerCase();
  const categoriaSelecionada = filtroCategoria.value;
  const statusSelecionado = filtroStatus.value;

  const filtrados = produtos.filter((produto) => {
    const status = obterStatus(produto);

    const bateBusca =
      !termo ||
      produto.nome.toLowerCase().includes(termo) ||
      produto.sku.toLowerCase().includes(termo);

    const bateCategoria =
      categoriaSelecionada === "todas" || produto.categoria === categoriaSelecionada;

    const bateStatus =
      statusSelecionado === "todos" || status.chave === statusSelecionado;

    return bateBusca && bateCategoria && bateStatus;
  });

  tabelaBody.innerHTML = "";

  if (filtrados.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  filtrados.forEach((produto) => {
    const status = obterStatus(produto);
    const subtotal = produto.quantidade * produto.preco;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${escaparHTML(produto.sku)}</strong></td>
      <td>${escaparHTML(produto.nome)}</td>
      <td>${escaparHTML(produto.categoria)}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.preco)}</td>
      <td>${formatarMoeda(subtotal)}</td>
      <td><span class="badge ${status.classe}">${status.label}</span></td>
      <td>
        <div class="action-group">
          <button type="button" class="btn-icon" data-action="dec" data-id="${produto.id}" title="Diminuir 1 unidade">-1</button>
          <button type="button" class="btn-icon" data-action="inc" data-id="${produto.id}" title="Adicionar 1 unidade">+1</button>
          <button type="button" class="btn-icon edit" data-action="edit" data-id="${produto.id}" title="Editar produto">Editar</button>
          <button type="button" class="btn-icon delete" data-action="delete" data-id="${produto.id}" title="Excluir produto">Excluir</button>
        </div>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });

  atualizarResumo();
}

// Reseta formulário para modo cadastro
function resetarFormulario() {
  form.reset();
  produtoIdInput.value = "";
  estoqueMinimoInput.value = 5;
  formTitle.textContent = "Cadastrar Produto";
  btnSubmit.textContent = "Salvar Produto";
  btnCancelar.classList.add("hidden");
}

// Preenche formulário para edição
function iniciarEdicao(id) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  produtoIdInput.value = produto.id;
  nomeInput.value = produto.nome;
  skuInput.value = produto.sku;
  categoriaInput.value = produto.categoria;
  quantidadeInput.value = produto.quantidade;
  estoqueMinimoInput.value = produto.estoqueMinimo;
  precoInput.value = produto.preco;

  formTitle.textContent = "Editar Produto";
  btnSubmit.textContent = "Atualizar Produto";
  btnCancelar.classList.remove("hidden");
  nomeInput.focus();
}

// Altera quantidade rapidamente (+1 / -1)
function ajustarQuantidade(id, delta) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  const novaQtd = produto.quantidade + delta;
  if (novaQtd < 0) return;

  produto.quantidade = novaQtd;
  salvarProdutos();
  renderizarTabela();
}

// Remove produto
function excluirProduto(id) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  const confirmado = confirm(`Deseja realmente excluir "${produto.nome}"?`);
  if (!confirmado) return;

  produtos = produtos.filter((p) => p.id !== id);
  if (produtoIdInput.value === id) {
    resetarFormulario();
  }
  salvarProdutos();
  renderizarTabela();
}

// Envio do formulário (criar ou atualizar)
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const idEditando = produtoIdInput.value;
  const nome = nomeInput.value.trim();
  const sku = skuInput.value.trim().toUpperCase();
  const categoria = categoriaInput.value;
  const quantidade = Number.parseInt(quantidadeInput.value, 10);
  const estoqueMinimo = Number.parseInt(estoqueMinimoInput.value, 10);
  const preco = Number.parseFloat(precoInput.value);

  if (
    !nome ||
    !sku ||
    !categoria ||
    Number.isNaN(quantidade) ||
    quantidade < 0 ||
    Number.isNaN(estoqueMinimo) ||
    estoqueMinimo < 0 ||
    Number.isNaN(preco) ||
    preco < 0
  ) {
    alert("Preencha todos os campos corretamente com valores válidos.");
    return;
  }

  // Impede SKU duplicado
  const skuDuplicado = produtos.some(
    (p) => p.sku.toUpperCase() === sku && p.id !== idEditando
  );
  if (skuDuplicado) {
    alert(`Já existe um produto cadastrado com o SKU "${sku}".`);
    return;
  }

  if (idEditando) {
    produtos = produtos.map((p) =>
      p.id === idEditando
        ? { ...p, nome, sku, categoria, quantidade, estoqueMinimo, preco }
        : p
    );
  } else {
    produtos.push({
      id: crypto.randomUUID(),
      nome,
      sku,
      categoria,
      quantidade,
      estoqueMinimo,
      preco
    });
  }

  salvarProdutos();
  renderizarTabela();
  resetarFormulario();
});

// Delegação de eventos na tabela
tabelaBody.addEventListener("click", (event) => {
  const botao = event.target.closest("button[data-action]");
  if (!botao) return;

  const { action, id } = botao.dataset;
  if (action === "inc") ajustarQuantidade(id, 1);
  if (action === "dec") ajustarQuantidade(id, -1);
  if (action === "edit") iniciarEdicao(id);
  if (action === "delete") excluirProduto(id);
});

btnCancelar.addEventListener("click", resetarFormulario);

btnResetDemo.addEventListener("click", () => {
  if (confirm("Deseja restaurar os produtos de exemplo e substituir os dados atuais?")) {
    produtos = PRODUTOS_EXEMPLO.map((item) => ({ ...item, id: crypto.randomUUID() }));
    salvarProdutos();
    renderizarTabela();
    resetarFormulario();
  }
});

// Filtros
buscaInput.addEventListener("input", renderizarTabela);
filtroCategoria.addEventListener("change", renderizarTabela);
filtroStatus.addEventListener("change", renderizarTabela);

// Inicialização
renderizarTabela();