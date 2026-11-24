// =========================================
// DADOS INICIAIS E ESTADO DA APLICAÇÃO
// =========================================
const dadosIniciais = [
  { id: 1, sku: 'PRD-001', nome: 'Mouse Sem Fio Óptico', categoria: 'Periféricos', qtd: 24, min: 10, custo: 35.00, venda: 79.90, fornecedor: 'TechDistrib' },
  { id: 2, sku: 'PRD-002', nome: 'Cabo HDMI 2.0 2 Metros', categoria: 'Cabos', qtd: 6, min: 15, custo: 12.50, venda: 29.90, fornecedor: 'ConectaBR' },
  { id: 3, sku: 'PRD-003', nome: 'Suporte Articulado Monitor', categoria: 'Acessórios', qtd: 0, min: 5, custo: 110.00, venda: 219.00, fornecedor: 'ErgoOffice' },
  { id: 4, sku: 'PRD-004', nome: 'Webcam Full HD 1080p', categoria: 'Periféricos', qtd: 14, min: 5, custo: 95.00, venda: 189.90, fornecedor: 'TechDistrib' }
];

let produtos = JSON.parse(localStorage.getItem('estoque_produtos')) || dadosIniciais;
let historico = JSON.parse(localStorage.getItem('estoque_historico')) || [];

// =========================================
// PERSISTÊNCIA E FORMATAÇÃO
// =========================================
function salvarDados() {
  localStorage.setItem('estoque_produtos', JSON.stringify(produtos));
  localStorage.setItem('estoque_historico', JSON.stringify(historico));
  atualizarTudo();
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function obterStatus(p) {
  if (p.qtd <= 0) return { codigo: 'out', texto: 'Esgotado', classe: 'badge-out' };
  if (p.qtd <= p.min) return { codigo: 'low', texto: 'Estoque Baixo', classe: 'badge-low' };
  return { codigo: 'ok', texto: 'Normal', classe: 'badge-ok' };
}

// =========================================
// ATUALIZAÇÃO DA INTERFACE (KPIs, FILTROS E TABELAS)
// =========================================
function atualizarKPIs() {
  const totalSkus = produtos.length;
  const totalUnidades = produtos.reduce((acc, p) => acc + p.qtd, 0);
  const valorCusto = produtos.reduce((acc, p) => acc + (p.qtd * p.custo), 0);
  const valorVenda = produtos.reduce((acc, p) => acc + (p.qtd * p.venda), 0);
  const alertas = produtos.filter(p => p.qtd <= p.min).length;

  document.getElementById('kpiTotalSkus').textContent = totalSkus;
  document.getElementById('kpiTotalUnidades').textContent = totalUnidades;
  document.getElementById('kpiValorCusto').textContent = formatarMoeda(valorCusto);
  document.getElementById('kpiValorVenda').textContent = `Venda est.: ${formatarMoeda(valorVenda)}`;
  document.getElementById('kpiAlertas').textContent = alertas;
}

function atualizarCategorias() {
  const select = document.getElementById('filtroCategoria');
  const atual = select.value;
  const categorias = [...new Set(produtos.map(p => p.categoria))].sort();
  
  select.innerHTML = '<option value="">Todas as Categorias</option>' +
    categorias.map(c => `<option value="${c}">${c}</option>`).join('');
  select.value = atual;
}

function renderizarTabela() {
  const busca = document.getElementById('buscaInput').value.toLowerCase();
  const cat = document.getElementById('filtroCategoria').value;
  const statusFiltro = document.getElementById('filtroStatus').value;

  const filtrados = produtos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca) ||
                       p.sku.toLowerCase().includes(busca) ||
                       (p.fornecedor && p.fornecedor.toLowerCase().includes(busca));
    const matchCat = !cat || p.categoria === cat;
    const st = obterStatus(p).codigo;
    const matchStatus = !statusFiltro || st === statusFiltro;
    return matchBusca && matchCat && matchStatus;
  });

  const tbody = document.getElementById('tabelaProdutos');
  const empty = document.getElementById('emptyProdutos');

  if (filtrados.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  tbody.innerHTML = filtrados.map(p => {
    const st = obterStatus(p);
    return `
      <tr>
        <td><strong>${p.sku}</strong></td>
        <td>
          <div>${p.nome}</div>
          ${p.fornecedor ? `<small style="color:var(--muted)">Forn.: ${p.fornecedor}</small>` : ''}
        </td>
        <td>${p.categoria}</td>
        <td>
          <div class="qty-control">
            <button class="qty-btn" title="Saída rápida (-1)" onclick="ajusteRapido(${p.id}, -1)">-</button>
            <span style="min-width:24px; text-align:center;">${p.qtd}</span>
            <button class="qty-btn" title="Entrada rápida (+1)" onclick="ajusteRapido(${p.id}, 1)">+</button>
          </div>
        </td>
        <td>${p.min}</td>
        <td>
          <div>C: ${formatarMoeda(p.custo)}</div>
          <small style="color:var(--muted)">V: ${formatarMoeda(p.venda)}</small>
        </td>
        <td><span class="badge ${st.classe}">${st.texto}</span></td>
        <td>
          <div class="actions">
            <button class="btn-outline btn-sm" onclick="abrirModalMov(${p.id})">Movimentar</button>
            <button class="btn-outline btn-sm" onclick="abrirModalProduto(${p.id})">Editar</button>
            <button class="btn-danger btn-sm" onclick="excluirProduto(${p.id})">Excluir</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderizarHistorico() {
  const tbody = document.getElementById('tabelaHistorico');
  const empty = document.getElementById('emptyHistorico');

  if (historico.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  tbody.innerHTML = historico.map(h => `
    <tr>
      <td>${h.data}</td>
      <td><strong>${h.produto}</strong></td>
      <td>
        <span class="badge ${h.tipo === 'Entrada' ? 'badge-ok' : 'badge-out'}">${h.tipo}</span>
      </td>
      <td><strong>${h.tipo === 'Entrada' ? '+' : '-'}${h.qtd}</strong></td>
      <td>${h.motivo || '-'}</td>
    </tr>
  `).join('');
}

// =========================================
// MOVIMENTAÇÕES E CRUD DE PRODUTOS
// =========================================
function registrarLog(produtoNome, tipo, qtd, motivo) {
  historico.unshift({
    data: new Date().toLocaleString('pt-BR'),
    produto: produtoNome,
    tipo,
    qtd,
    motivo
  });
}

function ajusteRapido(id, delta) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;
  if (prod.qtd + delta < 0) return alert('O estoque não pode ficar negativo.');

  prod.qtd += delta;
  registrarLog(prod.nome, delta > 0 ? 'Entrada' : 'Saída', Math.abs(delta), 'Ajuste rápido na tabela');
  salvarDados();
}

function abrirModalProduto(id = null) {
  const form = document.getElementById('formProduto');
  form.reset();
  document.getElementById('prodId').value = '';

  if (id) {
    const p = produtos.find(item => item.id === id);
    document.getElementById('modalProdutoTitulo').textContent = 'Editar Produto';
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodSku').value = p.sku;
    document.getElementById('prodNome').value = p.nome;
    document.getElementById('prodCategoria').value = p.categoria;
    document.getElementById('prodQtd').value = p.qtd;
    document.getElementById('prodMin').value = p.min;
    document.getElementById('prodCusto').value = p.custo;
    document.getElementById('prodVenda').value = p.venda;
    document.getElementById('prodFornecedor').value = p.fornecedor || '';
  } else {
    document.getElementById('modalProdutoTitulo').textContent = 'Novo Produto';
  }

  document.getElementById('modalProduto').classList.add('open');
}

function salvarProduto(e) {
  e.preventDefault();
  const id = document.getElementById('prodId').value;
  const dados = {
    sku: document.getElementById('prodSku').value.trim(),
    nome: document.getElementById('prodNome').value.trim(),
    categoria: document.getElementById('prodCategoria').value.trim(),
    qtd: parseInt(document.getElementById('prodQtd').value, 10),
    min: parseInt(document.getElementById('prodMin').value, 10),
    custo: parseFloat(document.getElementById('prodCusto').value),
    venda: parseFloat(document.getElementById('prodVenda').value),
    fornecedor: document.getElementById('prodFornecedor').value.trim()
  };

  if (id) {
    const index = produtos.findIndex(p => p.id == id);
    produtos[index] = { ...produtos[index], ...dados };
  } else {
    dados.id = Date.now();
    produtos.push(dados);
    if (dados.qtd > 0) {
      registrarLog(dados.nome, 'Entrada', dados.qtd, 'Cadastro inicial');
    }
  }

  fecharModal('modalProduto');
  salvarDados();
}

function excluirProduto(id) {
  if (!confirm('Deseja realmente excluir este produto do estoque?')) return;
  produtos = produtos.filter(p => p.id !== id);
  salvarDados();
}

function abrirModalMov(id) {
  const p = produtos.find(item => item.id === id);
  document.getElementById('formMov').reset();
  document.getElementById('movProdId').value = p.id;
  document.getElementById('movProdNome').value = `${p.sku} - ${p.nome} (Atual: ${p.qtd})`;
  document.getElementById('modalMov').classList.add('open');
}

function salvarMovimentacao(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('movProdId').value, 10);
  const tipo = document.getElementById('movTipo').value;
  const qtd = parseInt(document.getElementById('movQtd').value, 10);
  const motivo = document.getElementById('movMotivo').value.trim();

  const prod = produtos.find(p => p.id === id);
  if (tipo === 'saida' && prod.qtd < qtd) {
    return alert(`Saldo insuficiente! Você possui apenas ${prod.qtd} unidades.`);
  }

  prod.qtd += (tipo === 'entrada' ? qtd : -qtd);
  registrarLog(prod.nome, tipo === 'entrada' ? 'Entrada' : 'Saída', qtd, motivo);

  fecharModal('modalMov');
  salvarDados();
}

// =========================================
// CONTROLE DE MODAIS, ABAS E EXPORTAÇÃO
// =========================================
function fecharModal(id) {
  document.getElementById(id).classList.remove('open');
}

function alternarAba(aba) {
  document.getElementById('tabProdutos').classList.toggle('active', aba === 'produtos');
  document.getElementById('tabHistorico').classList.toggle('active', aba === 'historico');
  document.getElementById('viewProdutos').classList.toggle('hidden', aba !== 'produtos');
  document.getElementById('viewHistorico').classList.toggle('hidden', aba !== 'historico');
}

function exportarCSV() {
  const cabecalho = ['SKU', 'Produto', 'Categoria', 'Quantidade', 'Minimo', 'Custo', 'Venda', 'Fornecedor'];
  const linhas = produtos.map(p => [
    p.sku, `"${p.nome}"`, `"${p.categoria}"`, p.qtd, p.min,
    p.custo.toFixed(2).replace('.', ','),
    p.venda.toFixed(2).replace('.', ','),
    `"${p.fornecedor || ''}"`
  ].join(';'));

  const csv = '\uFEFF' + [cabecalho.join(';'), ...linhas].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `estoque_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
}

function atualizarTudo() {
  atualizarKPIs();
  atualizarCategorias();
  renderizarTabela();
  renderizarHistorico();
}

// Inicializa o sistema ao carregar
atualizarTudo();