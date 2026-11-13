const STORAGE_KEY = 'stockflow_produtos_v1';

// Carrega dados salvos no localStorage ou inicia com exemplos na 1ª vez
let produtos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: 1, codigo: 'PRD-001', nome: 'Mouse Sem Fio', categoria: 'Periféricos', quantidade: 18, minimo: 5, preco: 89.90 },
  { id: 2, codigo: 'PRD-002', nome: 'Cabo HDMI 2m', categoria: 'Cabos', quantidade: 4, minimo: 5, preco: 29.50 },
  { id: 3, codigo: 'PRD-003', nome: 'Monitor 24"', categoria: 'Monitores', quantidade: 0, minimo: 3, preco: 799.00 }
];

const form = document.getElementById('produto-form');

function salvarNoNavegador() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  const indicador = document.getElementById('status-salvo');
  indicador.textContent = '✓ Alterações salvas agora mesmo';
  setTimeout(() => {
    indicador.textContent = '✓ Sincronizado com o navegador';
  }, 2000);
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function obterStatus(p) {
  if (p.quantidade === 0) return { tipo: 'out', texto: 'Esgotado', classe: 'badge-out' };
  if (p.quantidade <= p.minimo) return { tipo: 'low', texto: 'Estoque Baixo', classe: 'badge-low' };
  return { tipo: 'ok', texto: 'Em Estoque', classe: 'badge-ok' };
}

function atualizarCards() {
  const totalProdutos = produtos.length;
  const totalUnidades = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0);
  const criticos = produtos.filter(p => p.quantidade <= p.minimo).length;

  document.getElementById('stat-produtos').textContent = totalProdutos;
  document.getElementById('stat-unidades').textContent = totalUnidades;
  document.getElementById('stat-valor').textContent = formatarMoeda(valorTotal);
  document.getElementById('stat-critico').textContent = criticos;
}

function atualizarFiltroCategorias() {
  const select = document.getElementById('filtro-categoria');
  const valorAtual = select.value;
  const categorias = [...new Set(produtos.map(p => p.categoria))].sort();

  select.innerHTML = '<option value="">Todas as categorias</option>';
  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  select.value = valorAtual;
}

function renderizarTabela() {
  const tbody = document.getElementById('tabela-corpo');
  const termo = document.getElementById('busca').value.toLowerCase();
  const catFiltro = document.getElementById('filtro-categoria').value;
  const statusFiltro = document.getElementById('filtro-status').value;

  const filtrados = produtos.filter(p => {
    const matchTexto = p.nome.toLowerCase().includes(termo) || p.codigo.toLowerCase().includes(termo);
    const matchCat = !catFiltro || p.categoria === catFiltro;
    const status = obterStatus(p).tipo;
    const matchStatus = !statusFiltro || status === statusFiltro;
    return matchTexto && matchCat && matchStatus;
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty">Nenhum produto encontrado.</td></tr>';
  } else {
    tbody.innerHTML = filtrados.map(p => {
      const status = obterStatus(p);
      return `
        <tr>
          <td><strong>${p.codigo}</strong></td>
          <td>${p.nome}</td>
          <td>${p.categoria}</td>
          <td>${formatarMoeda(p.preco)}</td>
          <td>
            <div class="qty-control">
              <button class="qty-btn" onclick="alterarQuantidade(${p.id}, -1)" title="Diminuir">-</button>
              <span><strong>${p.quantidade}</strong></span>
              <button class="qty-btn" onclick="alterarQuantidade(${p.id}, 1)" title="Aumentar">+</button>
            </div>
          </td>
          <td>${formatarMoeda(p.quantidade * p.preco)}</td>
          <td><span class="badge ${status.classe}">${status.texto}</span></td>
          <td>
            <div class="actions-cell">
              <button class="btn-outline btn-sm" onclick="editarProduto(${p.id})">Editar</button>
              <button class="btn-danger btn-sm" onclick="excluirProduto(${p.id})">Excluir</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  atualizarCards();
  atualizarFiltroCategorias();
}

// Salvar (Criar ou Atualizar)
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('produto-id').value;
  const dados = {
    codigo: document.getElementById('codigo').value.trim(),
    nome: document.getElementById('nome').value.trim(),
    categoria: document.getElementById('categoria').value.trim(),
    quantidade: parseInt(document.getElementById('quantidade').value, 10),
    minimo: parseInt(document.getElementById('minimo').value, 10),
    preco: parseFloat(document.getElementById('preco').value)
  };

  if (id) {
    const index = produtos.findIndex(p => p.id === Number(id));
    if (index !== -1) produtos[index] = { id: Number(id), ...dados };
    cancelarEdicao();
  } else {
    produtos.push({ id: Date.now(), ...dados });
    form.reset();
    document.getElementById('quantidade').value = 1;
    document.getElementById('minimo').value = 5;
  }

  salvarNoNavegador();
  renderizarTabela();
});

function alterarQuantidade(id, delta) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  produto.quantidade = Math.max(0, produto.quantidade + delta);
  salvarNoNavegador();
  renderizarTabela();
}

function editarProduto(id) {
  const p = produtos.find(item => item.id === id);
  if (!p) return;

  document.getElementById('produto-id').value = p.id;
  document.getElementById('codigo').value = p.codigo;
  document.getElementById('nome').value = p.nome;
  document.getElementById('categoria').value = p.categoria;
  document.getElementById('quantidade').value = p.quantidade;
  document.getElementById('minimo').value = p.minimo;
  document.getElementById('preco').value = p.preco;

  document.getElementById('form-titulo').textContent = '✏️ Editar Produto';
  document.getElementById('btn-salvar').textContent = 'Atualizar';
  document.getElementById('btn-cancelar').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicao() {
  form.reset();
  document.getElementById('produto-id').value = '';
  document.getElementById('quantidade').value = 1;
  document.getElementById('minimo').value = 5;
  document.getElementById('form-titulo').textContent = '➕ Cadastrar Novo Produto';
  document.getElementById('btn-salvar').textContent = 'Salvar Produto';
  document.getElementById('btn-cancelar').classList.add('hidden');
}

function excluirProduto(id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  produtos = produtos.filter(p => p.id !== id);
  salvarNoNavegador();
  renderizarTabela();
}

function limparTudo() {
  if (!confirm('Atenção: isso apagará todos os produtos salvos. Continuar?')) return;
  produtos = [];
  salvarNoNavegador();
  renderizarTabela();
}

function exportarCSV() {
  if (produtos.length === 0) return alert('Não há produtos para exportar.');
  const cabecalho = ['Codigo', 'Nome', 'Categoria', 'Quantidade', 'Minimo', 'Preco_Unitario', 'Subtotal'];
  const linhas = produtos.map(p => [
    p.codigo, `"${p.nome}"`, `"${p.categoria}"`, p.quantidade, p.minimo, p.preco.toFixed(2), (p.quantidade * p.preco).toFixed(2)
  ].join(';'));

  const csv = [cabecalho.join(';'), ...linhas].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'estoque.csv';
  link.click();
}

// Inicializa a tela
renderizarTabela();