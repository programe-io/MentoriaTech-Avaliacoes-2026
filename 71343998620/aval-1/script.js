let estoque = [];

const form = document.getElementById('form-produto');
const tabela = document.getElementById('tabela-estoque');

// 1. Cadastrar novo produto
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const valor = parseFloat(document.getElementById('valor').value);

  // Evita código duplicado
  if (estoque.some(p => p.codigo === codigo)) {
    alert('Já existe um produto com este código!');
    return;
  }

  estoque.push({ codigo, descricao, quantidade, valor });
  form.reset();
  listarProdutos();
});

// 2. Listar produtos na tabela
function listarProdutos() {
  tabela.innerHTML = '';

  estoque.forEach(produto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.valor.toFixed(2)}</td>
      <td>
        <button class="btn-acao btn-qtd" onclick="alterarQuantidade('${produto.codigo}')">Alterar Qtd</button>
        <button class="btn-acao btn-valor" onclick="alterarValor('${produto.codigo}')">Alterar Valor</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

// 3. Alterar valor de um produto
function alterarValor(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  const novoValor = parseFloat(prompt(`Novo valor para "${produto.descricao}":`, produto.valor));

  if (!isNaN(novoValor) && novoValor >= 0) {
    produto.valor = novoValor;
    listarProdutos();
  }
}

// 4. Alterar quantidade de um produto
function alterarQuantidade(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  const novaQtd = parseInt(prompt(`Nova quantidade para "${produto.descricao}":`, produto.quantidade));

  if (!isNaN(novaQtd) && novaQtd >= 0) {
    produto.quantidade = novaQtd;
    listarProdutos();
  }
}
