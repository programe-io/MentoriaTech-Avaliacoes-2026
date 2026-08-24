// ==========================================================
// SISTEMA DE ESTOQUE DE PRODUTOS
// Estrutura de cada produto: { codigo, descricao, quantidade, valor }
// ==========================================================

/** "Banco de dados" em memória */
let produtos = [];

/** Referências do DOM */
const formProduto   = document.getElementById('formProduto');
const inputCodigo   = document.getElementById('codigo');
const inputDescricao = document.getElementById('descricao');
const inputQuantidade = document.getElementById('quantidade');
const inputValor    = document.getElementById('valor');
const formError     = document.getElementById('formError');

const corpoTabela   = document.getElementById('corpoTabela');
const estadoVazio   = document.getElementById('estadoVazio');
const buscaInput    = document.getElementById('busca');

const statTotalItens    = document.getElementById('statTotalItens');
const statTotalUnidades = document.getElementById('statTotalUnidades');
const statValorTotal    = document.getElementById('statValorTotal');

const toastEl = document.getElementById('toast');

// ----------------------------------------------------------
// CADASTRAR PRODUTO
// ----------------------------------------------------------
formProduto.addEventListener('submit', (evento) => {
  evento.preventDefault();
  formError.textContent = '';

  const codigo = inputCodigo.value.trim();
  const descricao = inputDescricao.value.trim();
  const quantidade = parseInt(inputQuantidade.value, 10);
  const valor = parseFloat(inputValor.value);

  // Validações básicas
  if (!codigo || !descricao) {
    formError.textContent = 'Preencha o código e a descrição do produto.';
    return;
  }
  if (Number.isNaN(quantidade) || quantidade < 0) {
    formError.textContent = 'Informe uma quantidade válida (0 ou mais).';
    return;
  }
  if (Number.isNaN(valor) || valor < 0) {
    formError.textContent = 'Informe um valor válido (0 ou mais).';
    return;
  }

  const codigoExiste = produtos.some(
    (produto) => produto.codigo.toLowerCase() === codigo.toLowerCase()
  );
  if (codigoExiste) {
    formError.textContent = `Já existe um produto cadastrado com o código "${codigo}".`;
    return;
  }

  cadastrarProduto({ codigo, descricao, quantidade, valor });

  formProduto.reset();
  inputCodigo.focus();
  mostrarToast(`Produto "${codigo}" cadastrado com sucesso.`);
});

function cadastrarProduto(produto) {
  produtos.push(produto);
  renderizarTabela();
}

// ----------------------------------------------------------
// LISTAR PRODUTOS
// ----------------------------------------------------------
function renderizarTabela() {
  const termoBusca = buscaInput.value.trim().toLowerCase();

  const produtosFiltrados = produtos.filter((produto) => {
    if (!termoBusca) return true;
    return (
      produto.codigo.toLowerCase().includes(termoBusca) ||
      produto.descricao.toLowerCase().includes(termoBusca)
    );
  });

  corpoTabela.innerHTML = '';

  produtosFiltrados.forEach((produto) => {
    const linha = criarLinhaProduto(produto);
    corpoTabela.appendChild(linha);
  });

  const existemProdutos = produtos.length > 0;
  const semResultadoBusca = existemProdutos && produtosFiltrados.length === 0;

  estadoVazio.classList.toggle('is-visible', !existemProdutos || semResultadoBusca);
  estadoVazio.querySelector('p').innerHTML = !existemProdutos
    ? 'Nenhum produto no estoque ainda.<br>Cadastre o primeiro item ao lado.'
    : 'Nenhum produto encontrado para essa busca.';

  atualizarEstatisticas();
}

function criarLinhaProduto(produto) {
  const linha = document.createElement('tr');
  linha.dataset.codigo = produto.codigo;
  if (produto.quantidade <= 3) linha.classList.add('low-stock');

  const subtotal = produto.quantidade * produto.valor;

  linha.innerHTML = `
    <td data-label="Código"><span class="code-tag">${escapeHtml(produto.codigo)}</span></td>
    <td data-label="Descrição" class="desc-cell">${escapeHtml(produto.descricao)}</td>
    <td data-label="Quantidade">
      <span class="qty-control">
        <button type="button" class="btn-qty" data-acao="diminuir" aria-label="Diminuir quantidade">−</button>
        <input type="number" class="input-quantidade" min="0" step="1" value="${produto.quantidade}" aria-label="Quantidade de ${escapeHtml(produto.descricao)}">
        <button type="button" class="btn-qty" data-acao="aumentar" aria-label="Aumentar quantidade">+</button>
      </span>
    </td>
    <td data-label="Valor unit.">
      <span class="price-control">
        <input type="number" class="input-valor" min="0" step="0.01" value="${produto.valor.toFixed(2)}" aria-label="Valor de ${escapeHtml(produto.descricao)}">
      </span>
    </td>
    <td data-label="Subtotal"><span class="subtotal-cell">${formatarMoeda(subtotal)}</span></td>
    <td data-label="" class="actions-cell">
      <button type="button" class="btn btn--ghost btn-remover">Remover</button>
    </td>
  `;

  // ---- ALTERAR QUANTIDADE (input direto) ----
  const inputQtd = linha.querySelector('.input-quantidade');
  inputQtd.addEventListener('change', () => {
    alterarQuantidade(produto.codigo, parseInt(inputQtd.value, 10));
  });

  // ---- ALTERAR QUANTIDADE (botões +/-) ----
  linha.querySelectorAll('.btn-qty').forEach((botao) => {
    botao.addEventListener('click', () => {
      const delta = botao.dataset.acao === 'aumentar' ? 1 : -1;
      alterarQuantidade(produto.codigo, produto.quantidade + delta);
    });
  });

  // ---- ALTERAR VALOR ----
  const inputVal = linha.querySelector('.input-valor');
  inputVal.addEventListener('change', () => {
    alterarValor(produto.codigo, parseFloat(inputVal.value));
  });

  // ---- REMOVER PRODUTO ----
  linha.querySelector('.btn-remover').addEventListener('click', () => {
    removerProduto(produto.codigo);
  });

  return linha;
}

// ----------------------------------------------------------
// ALTERAR VALOR DE UM PRODUTO
// ----------------------------------------------------------
function alterarValor(codigo, novoValor) {
  const produto = produtos.find((p) => p.codigo === codigo);
  if (!produto) return;

  if (Number.isNaN(novoValor) || novoValor < 0) {
    mostrarToast('Valor inválido. Nenhuma alteração foi feita.', true);
    renderizarTabela();
    return;
  }

  produto.valor = novoValor;
  renderizarTabela();
  mostrarToast(`Valor de "${produto.codigo}" atualizado para ${formatarMoeda(novoValor)}.`);
}

// ----------------------------------------------------------
// ALTERAR QUANTIDADE DE UM PRODUTO
// ----------------------------------------------------------
function alterarQuantidade(codigo, novaQuantidade) {
  const produto = produtos.find((p) => p.codigo === codigo);
  if (!produto) return;

  if (Number.isNaN(novaQuantidade) || novaQuantidade < 0) {
    mostrarToast('Quantidade inválida. Nenhuma alteração foi feita.', true);
    renderizarTabela();
    return;
  }

  produto.quantidade = novaQuantidade;
  renderizarTabela();
  mostrarToast(`Quantidade de "${produto.codigo}" atualizada para ${novaQuantidade}.`);
}

// ----------------------------------------------------------
// REMOVER PRODUTO (funcionalidade extra, útil na prática)
// ----------------------------------------------------------
function removerProduto(codigo) {
  produtos = produtos.filter((p) => p.codigo !== codigo);
  renderizarTabela();
  mostrarToast(`Produto "${codigo}" removido do estoque.`);
}

// ----------------------------------------------------------
// ESTATÍSTICAS DO PAINEL
// ----------------------------------------------------------
function atualizarEstatisticas() {
  const totalItens = produtos.length;
  const totalUnidades = produtos.reduce((soma, p) => soma + p.quantidade, 0);
  const valorTotal = produtos.reduce((soma, p) => soma + p.quantidade * p.valor, 0);

  statTotalItens.textContent = totalItens;
  statTotalUnidades.textContent = totalUnidades;
  statValorTotal.textContent = formatarMoeda(valorTotal);
}

// ----------------------------------------------------------
// BUSCA
// ----------------------------------------------------------
buscaInput.addEventListener('input', renderizarTabela);

// ----------------------------------------------------------
// UTILITÁRIOS
// ----------------------------------------------------------
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

let toastTimeout;
function mostrarToast(mensagem, erro = false) {
  clearTimeout(toastTimeout);
  toastEl.textContent = mensagem;
  toastEl.style.background = erro ? 'var(--danger)' : 'var(--accent)';
  toastEl.style.color = erro ? '#fff' : 'var(--accent-ink)';
  toastEl.classList.add('is-visible');
  toastTimeout = setTimeout(() => toastEl.classList.remove('is-visible'), 2600);
}

// ----------------------------------------------------------
// DADOS INICIAIS DE EXEMPLO (opcional — remova se quiser começar vazio)
// ----------------------------------------------------------
cadastrarProduto({ codigo: 'PRD-001', descricao: 'Cabo USB-C 1m', quantidade: 24, valor: 19.9 });
cadastrarProduto({ codigo: 'PRD-002', descricao: 'Mouse sem fio', quantidade: 8, valor: 59.5 });
cadastrarProduto({ codigo: 'PRD-003', descricao: 'Teclado mecânico', quantidade: 2, valor: 189.0 });
