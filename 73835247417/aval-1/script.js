let produtos = [];

const formProduto = document.getElementById('formProduto');
const corpoTabela = document.getElementById('corpoTabela');

formProduto.addEventListener('submit', function(e) {
  e.preventDefault();
  cadastrarProduto();
});

function cadastrarProduto() {
  const codigo = document.getElementById('codigo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const valor = parseFloat(document.getElementById('valor').value);

  const existe = produtos.find(p => p.codigo === codigo);
  if (existe) {
    alert('Já existe um produto cadastrado com esse código!');
    return;
  }

  const novoProduto = { codigo, descricao, quantidade, valor };
  produtos.push(novoProduto);

  listarProdutos();
  formProduto.reset();
}

function listarProdutos() {
  corpoTabela.innerHTML = '';

  produtos.forEach(produto => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2)}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

function alterarValor() {
  const codigo = document.getElementById('codAlterarValor').value.trim();
  const novoValor = parseFloat(document.getElementById('novoValor').value);

  const produto = produtos.find(p => p.codigo === codigo);

  if (!produto) {
    alert('Produto não encontrado!');
    return;
  }

  produto.valor = novoValor;
  listarProdutos();

  document.getElementById('codAlterarValor').value = '';
  document.getElementById('novoValor').value = '';
}

function alterarQuantidade() {
  const codigo = document.getElementById('codAlterarQtd').value.trim();
  const novaQuantidade = parseInt(document.getElementById('novaQuantidade').value);

  const produto = produtos.find(p => p.codigo === codigo);

  if (!produto) {
    alert('Produto não encontrado!');
    return;
  }

  produto.quantidade = novaQuantidade;
  listarProdutos();

  document.getElementById('codAlterarQtd').value = '';
  document.getElementById('novaQuantidade').value = '';
}