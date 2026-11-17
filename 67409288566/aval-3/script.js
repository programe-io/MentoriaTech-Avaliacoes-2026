// Array principal que guarda os produtos do estoque
const estoque = [];

// 1. FUNÇÃO PARA CADASTRAR UM NOVO PRODUTO
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
  event.preventDefault();

  const codigo = document.getElementById('cad-codigo').value.trim();
  const descricao = document.getElementById('cad-descricao').value.trim();
  const quantidade = parseInt(document.getElementById('cad-quantidade').value);
  const valor = parseFloat(document.getElementById('cad-valor').value);

  // Verifica se o código já foi cadastrado
  const produtoExistente = estoque.find(item => item.codigo === codigo);
  if (produtoExistente) {
    alert('Erro: Já existe um produto com esse código!');
    return;
  }

  // Adiciona o novo objeto ao estoque
  estoque.push({
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  });

  alert('Produto cadastrado com sucesso!');
  this.reset();
  listarProdutos();
});

// 2. FUNÇÃO PARA LISTAR OS PRODUTOS CADASTRADOS
function listarProdutos() {
  const corpoTabela = document.getElementById('corpo-tabela');
  corpoTabela.innerHTML = '';

  if (estoque.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum produto cadastrado.</td></tr>';
    return;
  }

  estoque.forEach(produto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2).replace('.', ',')}</td>
    `;
    corpoTabela.appendChild(tr);
  });
}

// Botão manual para listar
document.getElementById('btn-listar').addEventListener('click', listarProdutos);

// 3. FUNÇÃO PARA ALTERAR O VALOR DE UM PRODUTO
document.getElementById('form-valor').addEventListener('submit', function(event) {
  event.preventDefault();

  const codigoBusca = document.getElementById('val-codigo').value.trim();
  const novoValor = parseFloat(document.getElementById('val-novo').value);

  const produto = estoque.find(item => item.codigo === codigoBusca);

  if (!produto) {
    alert('Produto não encontrado! Verifique o código digitado.');
    return;
  }

  produto.valor = novoValor;
  alert(`Valor do produto "${produto.descricao}" atualizado!`);
  this.reset();
  listarProdutos();
});

// 4. FUNÇÃO PARA ALTERAR A QUANTIDADE DE UM PRODUTO
document.getElementById('form-quantidade').addEventListener('submit', function(event) {
  event.preventDefault();

  const codigoBusca = document.getElementById('qtd-codigo').value.trim();
  const novaQuantidade = parseInt(document.getElementById('qtd-nova').value);

  const produto = estoque.find(item => item.codigo === codigoBusca);

  if (!produto) {
    alert('Produto não encontrado! Verifique o código digitado.');
    return;
  }

  produto.quantidade = novaQuantidade;
  alert(`Quantidade do produto "${produto.descricao}" atualizada!`);
  this.reset();
  listarProdutos();
});
