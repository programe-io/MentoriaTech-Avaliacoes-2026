// Banco de dados em memória para os produtos do estoque
const estoque = [];

// Elementos DOM
const formProduto = document.getElementById('form-produto');
const tabelaCorpo = document.getElementById('tabela-corpo');
const estoqueVazio = document.getElementById('estoque-vazio');
const mensagemBox = document.getElementById('mensagem');

const totalProdutosEl = document.getElementById('total-produtos');
const totalItensEl = document.getElementById('total-itens');
const valorTotalEl = document.getElementById('valor-total');

// Exibe notificações dinâmicas
function exibirMensagem(texto, tipo = 'success') {
  mensagemBox.textContent = texto;
  mensagemBox.className = `alert alert-${tipo}`;
  mensagemBox.style.display = 'block';

  setTimeout(() => {
    mensagemBox.style.display = 'none';
  }, 3500);
}

// Atualiza o painel de estatísticas do estoque
function atualizarEstatisticas() {
  const totalProdutos = estoque.length;
  const totalItens = estoque.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = estoque.reduce((acc, item) => acc + (item.quantidade * item.valor), 0);

  totalProdutosEl.textContent = totalProdutos;
  totalItensEl.textContent = totalItens;
  valorTotalEl.textContent = `R$ ${valorTotal.toFixed(2)}`;
}

// 1. Cadastrar um novo produto
formProduto.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const valor = parseFloat(document.getElementById('valor').value);

  // Validação: Código único
  if (estoque.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
    exibirMensagem(`Erro: O código "${codigo}" já está cadastrado.`, 'error');
    return;
  }

  // Validação: Quantidade e Valor válidos
  if (isNaN(quantidade) || quantidade < 0) {
    exibirMensagem('Erro: A quantidade deve ser um número maior ou igual a 0.', 'error');
    return;
  }

  if (isNaN(valor) || valor < 0) {
    exibirMensagem('Erro: O valor deve ser um número maior ou igual a 0.', 'error');
    return;
  }

  estoque.push({ codigo, descricao, quantidade, valor });
  exibirMensagem(`Produto "${descricao}" cadastrado com sucesso!`, 'success');

  formProduto.reset();
  listarProdutos();
});

// 2. Listar produtos cadastrados
function listarProdutos() {
  tabelaCorpo.innerHTML = '';

  if (estoque.length === 0) {
    estoqueVazio.style.display = 'block';
    atualizarEstatisticas();
    return;
  }

  estoqueVazio.style.display = 'none';

  estoque.forEach(produto => {
    const tr = document.createElement('tr');

    const tdCodigo = document.createElement('td');
    tdCodigo.innerHTML = `<strong>${produto.codigo}</strong>`;

    const tdDescricao = document.createElement('td');
    tdDescricao.textContent = produto.descricao;

    const tdQuantidade = document.createElement('td');
    tdQuantidade.textContent = produto.quantidade;

    const tdValorUnitario = document.createElement('td');
    tdValorUnitario.textContent = `R$ ${produto.valor.toFixed(2)}`;

    const tdValorTotal = document.createElement('td');
    tdValorTotal.textContent = `R$ ${(produto.quantidade * produto.valor).toFixed(2)}`;

    const tdAcoes = document.createElement('td');

    const btnValor = document.createElement('button');
    btnValor.className = 'btn btn-action';
    btnValor.textContent = 'Alterar Valor';
    btnValor.addEventListener('click', () => alterarValor(produto.codigo));

    const btnQtd = document.createElement('button');
    btnQtd.className = 'btn btn-action';
    btnQtd.textContent = 'Alterar Qtd';
    btnQtd.addEventListener('click', () => alterarQuantidade(produto.codigo));

    tdAcoes.appendChild(btnValor);
    tdAcoes.appendChild(btnQtd);

    tr.appendChild(tdCodigo);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdValorUnitario);
    tr.appendChild(tdValorTotal);
    tr.appendChild(tdAcoes);

    tabelaCorpo.appendChild(tr);
  });

  atualizarEstatisticas();
}

// 3. Alterar o valor de um produto
function alterarValor(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  if (!produto) return;

  const entrada = prompt(`Novo valor unitário para "${produto.descricao}" (Atual: R$ ${produto.valor.toFixed(2)}):`);
  if (entrada === null || entrada.trim() === '') return;

  const novoValor = parseFloat(entrada);
  if (isNaN(novoValor) || novoValor < 0) {
    exibirMensagem('Erro: Informe um valor numérico válido.', 'error');
    return;
  }

  produto.valor = novoValor;
  exibirMensagem(`Valor de "${produto.descricao}" alterado para R$ ${novoValor.toFixed(2)}.`, 'success');
  listarProdutos();
}

// 4. Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  if (!produto) return;

  const entrada = prompt(`Nova quantidade para "${produto.descricao}" (Atual: ${produto.quantidade}):`);
  if (entrada === null || entrada.trim() === '') return;

  const novaQuantidade = parseInt(entrada, 10);
  if (isNaN(novaQuantidade) || novaQuantidade < 0) {
    exibirMensagem('Erro: Informe uma quantidade numérica válida.', 'error');
    return;
  }

  produto.quantidade = novaQuantidade;
  exibirMensagem(`Quantidade de "${produto.descricao}" alterada para ${novaQuantidade}.`, 'success');
  listarProdutos();
}

// Inicializa a renderização da tabela
listarProdutos();