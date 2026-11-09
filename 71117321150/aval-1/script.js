const STORAGE_KEY = "estoque-facil-produtos";
let produtos = carregarProdutos();
let codigoEmEdicao = null;

const form = document.getElementById("productForm");
const descriptionInput = document.getElementById("description");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("search");
const formMessage = document.getElementById("formMessage");
const toast = document.getElementById("toast");

document.getElementById("today").textContent = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short", day: "2-digit", month: "long", year: "numeric"
}).format(new Date());

function carregarProdutos() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvarProdutos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

function validarProduto(descricao, quantidade, valor) {
  if (typeof descricao !== "string" || descricao.trim().length < 5) {
    throw new Error("A descrição deve ter pelo menos 5 caracteres.");
  }
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new Error("A quantidade deve ser um número inteiro maior que zero.");
  }
  if (!Number.isFinite(valor) || valor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }
}

function gerarCodigo() {
  return produtos.length ? Math.max(...produtos.map(p => p.codigo)) + 1 : 1;
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);
  const novoProduto = {
    codigo: gerarCodigo(),
    descricao: descricao.trim(),
    quantidade,
    valor
  };
  produtos.push(novoProduto);
  salvarProdutos();
  return novoProduto;
}

function buscarProdutoPorCodigo(codigo) {
  return produtos.find(produto => produto.codigo === codigo);
}

function atualizarProduto(codigo, descricao, quantidade, valor) {
  validarProduto(descricao, quantidade, valor);
  const produto = buscarProdutoPorCodigo(codigo);
  if (!produto) throw new Error("Produto não encontrado.");
  produto.descricao = descricao.trim();
  produto.quantidade = quantidade;
  produto.valor = valor;
  salvarProdutos();
}

function atualizarValor(codigo, novoValor) {
  if (!Number.isFinite(novoValor) || novoValor < 0) {
    throw new Error("O valor deve ser maior ou igual a zero.");
  }
  const produto = buscarProdutoPorCodigo(codigo);
  if (!produto) throw new Error("Produto não encontrado.");
  produto.valor = novoValor;
  salvarProdutos();
}

function atualizarQuantidade(codigo, quantidadeAdicionada) {
  if (!Number.isInteger(quantidadeAdicionada) || quantidadeAdicionada < 1) {
    throw new Error("A quantidade adicionada deve ser um inteiro maior que zero.");
  }
  const produto = buscarProdutoPorCodigo(codigo);
  if (!produto) throw new Error("Produto não encontrado.");
  produto.quantidade += quantidadeAdicionada;
  salvarProdutos();
}

function excluirProduto(codigo) {
  const indice = produtos.findIndex(produto => produto.codigo === codigo);
  if (indice === -1) throw new Error("Produto não encontrado.");
  produtos.splice(indice, 1);
  salvarProdutos();
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL"
  }).format(valor);
}

function atualizarResumo() {
  const totalProdutos = produtos.length;
  const totalUnidades = produtos.reduce((total, p) => total + p.quantidade, 0);
  const valorEstoque = produtos.reduce((total, p) => total + p.quantidade * p.valor, 0);
  document.getElementById("totalProducts").textContent = totalProdutos;
  document.getElementById("totalUnits").textContent = totalUnidades.toLocaleString("pt-BR");
  document.getElementById("stockValue").textContent = formatarMoeda(valorEstoque);
}

function renderizarProdutos() {
  const termo = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filtrados = produtos.filter(p =>
    p.descricao.toLocaleLowerCase("pt-BR").includes(termo) ||
    String(p.codigo).includes(termo)
  );

  if (filtrados.length === 0) {
    tableBody.innerHTML = `<tr class="empty-row"><td colspan="6">${
      produtos.length ? "Nenhum produto corresponde à busca." : "Nenhum produto cadastrado ainda."
    }</td></tr>`;
  } else {
    tableBody.innerHTML = filtrados.map(p => `
      <tr>
        <td>#${p.codigo}</td>
        <td><span class="product-name">${escaparHTML(p.descricao)}</span></td>
        <td>${p.quantidade.toLocaleString("pt-BR")} un.</td>
        <td class="money">${formatarMoeda(p.valor)}</td>
        <td class="money">${formatarMoeda(p.valor * p.quantidade)}</td>
        <td><div class="actions">
          <button class="icon-btn" data-action="edit" data-code="${p.codigo}" aria-label="Editar ${escaparHTML(p.descricao)}">Editar</button>
          <button class="icon-btn delete" data-action="delete" data-code="${p.codigo}" aria-label="Excluir ${escaparHTML(p.descricao)}">Excluir</button>
        </div></td>
      </tr>
    `).join("");
  }

  document.getElementById("resultCount").textContent =
    `${filtrados.length} ${filtrados.length === 1 ? "produto" : "produtos"}`;
  atualizarResumo();
}

function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[caractere]);
}

function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add("show");
  window.clearTimeout(mostrarToast.timer);
  mostrarToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function limparFormulario() {
  form.reset();
  codigoEmEdicao = null;
  document.getElementById("formTitle").textContent = "Cadastrar produto";
  document.getElementById("formMode").textContent = "NOVO CADASTRO";
  document.getElementById("submitButton").textContent = "＋ Cadastrar produto";
  document.getElementById("cancelEdit").classList.add("hidden");
  formMessage.textContent = "";
}

function iniciarEdicao(codigo) {
  const produto = buscarProdutoPorCodigo(codigo);
  if (!produto) return;
  codigoEmEdicao = codigo;
  descriptionInput.value = produto.descricao;
  quantityInput.value = produto.quantidade;
  priceInput.value = produto.valor;
  document.getElementById("formTitle").textContent = `Editar produto #${codigo}`;
  document.getElementById("formMode").textContent = "MODO DE EDIÇÃO";
  document.getElementById("submitButton").textContent = "Salvar alterações";
  document.getElementById("cancelEdit").classList.remove("hidden");
  formMessage.textContent = "";
  form.scrollIntoView({ behavior: "smooth", block: "center" });
  descriptionInput.focus();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.textContent = "";
  const descricao = descriptionInput.value;
  const quantidade = Number(quantityInput.value);
  const valor = Number(priceInput.value);

  try {
    if (codigoEmEdicao === null) {
      cadastrarProduto(descricao, quantidade, valor);
      mostrarToast("Produto cadastrado com sucesso!");
    } else {
      atualizarProduto(codigoEmEdicao, descricao, quantidade, valor);
      mostrarToast("Produto atualizado com sucesso!");
    }
    limparFormulario();
    renderizarProdutos();
  } catch (erro) {
    formMessage.style.color = "var(--red)";
    formMessage.textContent = erro.message;
  }
});

tableBody.addEventListener("click", event => {
  const botao = event.target.closest("button[data-action]");
  if (!botao) return;
  const codigo = Number(botao.dataset.code);

  if (botao.dataset.action === "edit") {
    iniciarEdicao(codigo);
  } else if (botao.dataset.action === "delete") {
    const produto = buscarProdutoPorCodigo(codigo);
    if (produto && confirm(`Deseja realmente excluir "${produto.descricao}"?`)) {
      try {
        excluirProduto(codigo);
        if (codigoEmEdicao === codigo) limparFormulario();
        renderizarProdutos();
        mostrarToast("Produto excluído.");
      } catch (erro) {
        mostrarToast(erro.message);
      }
    }
  }
});

document.getElementById("cancelEdit").addEventListener("click", limparFormulario);
searchInput.addEventListener("input", renderizarProdutos);
document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  renderizarProdutos();
});

renderizarProdutos();
