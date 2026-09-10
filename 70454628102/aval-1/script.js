let Produtos = [];
let proximoCodigo = 1;

function ValidarProdutos(Descricao, Quantidade, Valor) {
  if (Descricao.length < 5) {
    console.log("Descricao deve ter no minimo 5 caracteres.");
    return false;
  }
  if (Quantidade < 1) {
    console.log("Quantidade deve ser maior que zero.");
    return false;
  }
  if (Valor <= 0) {
    console.log("Valor deve ser maior que zero.");
    return false;
  }
  return true;
}

function cadastrarProdutos(Descricao, Quantidade, Valor) {
  if (!ValidarProdutos(Descricao, Quantidade, Valor)) return false;
  Produtos.push({ codigo: proximoCodigo++, Descricao, quantidade: Quantidade, Valor });
  return true;
}

function AtualizarValor(Codigo, NovoValor) {
  if (NovoValor <= 0) return;
  const p = Produtos.find(x => x.codigo === Codigo);
  if (p) p.Valor = NovoValor;
}

function AtualizarQuantidade(Codigo, NovaQuantidade) {
  if (NovaQuantidade < 1) return;
  const p = Produtos.find(x => x.codigo === Codigo);
  if (p) p.quantidade = NovaQuantidade;
}

// --- Interface ---
function cadastrar() {
  const desc = document.getElementById('descricao').value;
  const qtd  = parseInt(document.getElementById('quantidade').value);
  const val  = parseFloat(document.getElementById('valor').value);
  if (cadastrarProdutos(desc, qtd, val)) {
    document.getElementById('descricao').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';
    renderizar();
  }
}

function atualizar() {
  const cod  = parseInt(document.getElementById('codigo').value);
  const val  = parseFloat(document.getElementById('novoValor').value);
  const qtd  = parseInt(document.getElementById('novaQuantidade').value);
  if (!isNaN(val)) AtualizarValor(cod, val);
  if (!isNaN(qtd)) AtualizarQuantidade(cod, qtd);
  renderizar();
}

function renderizar() {
  const tbody = document.querySelector('#tabela tbody');
  tbody.innerHTML = Produtos.map(p =>
    `<tr><td>${p.codigo}</td><td>${p.Descricao}</td><td>${p.quantidade}</td><td>R$ ${p.Valor.toFixed(2)}</td></tr>`
  ).join('');
}   