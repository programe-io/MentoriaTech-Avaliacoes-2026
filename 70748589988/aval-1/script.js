// Banco de dados em memória
const estoque = [];

// Elementos da DOM
const formProduto = document.getElementById('form-produto');
const tabelaCorpo = document.getElementById('tabela-corpo');
const estoqueVazio = document.getElementById('estoque-vazio');
const mensagemBox = document.getElementById('mensagem');

// Exibe notificações de sucesso ou erro
function exibirMensagem(texto, tipo = 'success') {
  mensagemBox.textContent = texto;
  mensagemBox.className = `alert alert-${tipo}`;
  mensagemBox.style.display = 'block';
  setTimeout(() => {
    mensagemBox.style.display = 'none';
  }, 3500);
}

// 1. Cadastrar um novo produto
formProduto.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const valor = parseFloat(document.getElementById('valor').value);

  // Validação: não permitir códigos duplicados
  if (estoque.some(p => p.codigo === codigo)) {
    exibirMensagem(`Erro: O código "${codigo}" já está cadastrado.`, 'error');
    return;
  }

  estoque.push({ codigo, descricao, quantidade, valor });
  exibirMensagem(`Produto "${descricao}" cadastrado com sucesso!`, 'success');

  formProduto.reset();
  listarProdutos();
});

// 2. Listar os produtos cadastrados
function listarProdutos() {
  tabelaCorpo.innerHTML = '';

  if (estoque.length === 0) {
    estoqueVazio.style.display = 'block';
    return;
  }

  estoqueVazio.style.display = 'none';

  estoque.forEach(produto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${produto.codigo}</strong></td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2)}</td>
      <td>
        <button class="btn btn-action" onclick="alterarValor('${produto.codigo}')">Alterar Valor</button>
        <button class="btn btn-action" onclick="alterarQuantidade('${produto.codigo}')">Alterar Qtd</button>
      </td>
    `;
    tabelaCorpo.appendChild(tr);
  });
}

// 3. Alterar o valor de um produto
function alterarValor(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  if (!produto) return;

  const entrada = prompt(`Novo valor para "${produto.descricao}" (Valor atual: R$ ${produto.valor.toFixed(2)}):`);
  if (entrada === null || entrada.trim() === '') return;

  const novoValor = parseFloat(entrada);
  if (isNaN(novoValor) || novoValor < 0) {
    exibirMensagem('Valor inválido digitado.', 'error');
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

  const entrada = prompt(`Nova quantidade para "${produto.descricao}" (Qtd atual: ${produto.quantidade}):`);
  if (entrada === null || entrada.trim() === '') return;

  const novaQuantidade = parseInt(entrada, 10);
  if (isNaN(novaQuantidade) || novaQuantidade < 0) {
    exibirMensagem('Quantidade inválida digitada.', 'error');
    return;
  }

  produto.quantidade = novaQuantidade;
  exibirMensagem(`Quantidade de "${produto.descricao}" alterada para ${novaQuantidade}.`, 'success');
  listarProdutos();
}

// Renderização inicial
listarProdutos();