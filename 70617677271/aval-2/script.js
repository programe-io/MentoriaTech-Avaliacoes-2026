class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(codigo, descricao, quantidade, valor) {
    if (this.produtos.some((p) => p.codigo === codigo)) {
      alert(`⚠️ Código ${codigo} já existe!`);
      return false;
    }
    this.produtos.push({ codigo, descricao, quantidade: Number(quantidade), valor: Number(valor) });
    return true;
  }

  alterarValor(codigo, novoValor) {
    const p = this.produtos.find((item) => item.codigo === codigo);
    if (!p) return alert(`⚠️ Produto ${codigo} não encontrado!`);
    p.valor = Number(novoValor);
    return true;
  }

  alterarQuantidade(codigo, novaQtd) {
    const p = this.produtos.find((item) => item.codigo === codigo);
    if (!p) return alert(`⚠️ Produto ${codigo} não encontrado!`);
    p.quantidade = Number(novaQtd);
    return true;
  }

  formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}

const meuEstoque = new Estoque();

// Lista expandida de produtos iniciais
meuEstoque.cadastrar(101, 'Teclado Mecânico RGB', 15, 350.0);
meuEstoque.cadastrar(102, 'Mouse Sem Fio 10000 DPI', 30, 199.9);
meuEstoque.cadastrar(103, 'Monitor Ultrawide 29"', 8, 1250.0);
meuEstoque.cadastrar(104, 'Headset Gamer 7.1', 20, 280.0);
meuEstoque.cadastrar(105, 'Cadeira Ergonômica', 5, 890.0);
meuEstoque.cadastrar(106, 'Webcam Full HD 1080p', 12, 210.0);
meuEstoque.cadastrar(107, 'SSD NVMe 1TB', 25, 450.0);

function atualizarTabela() {
  const tbody = document.getElementById('tabela-produtos');
  tbody.innerHTML = '';

  if (meuEstoque.produtos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum produto cadastrado.</td></tr>';
    return;
  }

  meuEstoque.produtos.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.codigo}</td>
      <td>${p.descricao}</td>
      <td>${p.quantidade}</td>
      <td>${meuEstoque.formatarMoeda(p.valor)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Eventos dos Formulários
document.getElementById('form-cadastrar').addEventListener('submit', (e) => {
  e.preventDefault();
  const cod = Number(document.getElementById('cad-codigo').value);
  const desc = document.getElementById('cad-descricao').value;
  const qtd = document.getElementById('cad-qtd').value;
  const val = document.getElementById('cad-valor').value;

  if (meuEstoque.cadastrar(cod, desc, qtd, val)) {
    e.target.reset();
    atualizarTabela();
  }
});

document.getElementById('form-valor').addEventListener('submit', (e) => {
  e.preventDefault();
  const cod = Number(document.getElementById('alt-val-codigo').value);
  const val = document.getElementById('alt-val-novo').value;

  if (meuEstoque.alterarValor(cod, val)) {
    e.target.reset();
    atualizarTabela();
  }
});

document.getElementById('form-qtd').addEventListener('submit', (e) => {
  e.preventDefault();
  const cod = Number(document.getElementById('alt-qtd-codigo').value);
  const qtd = document.getElementById('alt-qtd-nova').value;

  if (meuEstoque.alterarQuantidade(cod, qtd)) {
    e.target.reset();
    atualizarTabela();
  }
});

// Renderização inicial
atualizarTabela();