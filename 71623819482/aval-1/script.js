// Chaves do LocalStorage
const STORAGE_PRODUTOS = 'estoque_produtos_v1';
const STORAGE_HISTORICO = 'estoque_historico_v1';

// Dados iniciais de exemplo (usados apenas na primeira vez)
const produtosIniciais = [
  { id: 1, sku: 'PER-001', nome: 'Mouse Sem Fio Logitech', categoria: 'Periféricos', preco: 129.90, qtd: 18, minimo: 5 },
  { id: 2, sku: 'PER-002', nome: 'Teclado Mecânico RGB', categoria: 'Periféricos', preco: 289.00, qtd: 4, minimo: 5 },
  { id: 3, sku: 'MON-010', nome: 'Monitor 24" Full HD', categoria: 'Monitores', preco: 850.00, qtd: 0, minimo: 3 },
  { id: 4, sku: 'CAB-005', nome: 'Cabo HDMI 2.0 2m', categoria: 'Acessórios', preco: 35.00, qtd: 32, minimo: 10 }
];

// Estado da aplicação
let produtos = JSON.parse(localStorage.getItem(STORAGE_PRODUTOS)) || produtosIniciais;
let historico = JSON.parse(localStorage.getItem(STORAGE_HISTORICO)) || [];

// Referências do DOM
const tabelaProdutos = document.getElementById('tabelaProdutos');
const mensagemVazia = document.getElementById('mensagemVazia');
const inputBusca = document.getElementById('inputBusca');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroStatus = document.getElementById('filtroStatus');

// Salvar no navegador
function salvarDados() {
  localStorage.setItem(STORAGE_PRODUTOS, JSON.stringify(produtos));
  localStorage.setItem(STORAGE_HISTORICO, JSON.stringify(historico));
}

// Formatar moeda BRL
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Determinar status do estoque
function obterStatus(produto) {
  if (produto.qtd <= 0) return { codigo: 'esgotado', texto: 'Esgotado', classe: 'badge-esgotado' };
  if (produto.qtd <= produto.minimo) return { codigo: 'baixo', texto: 'Estoque Baixo', classe: 'badge-baixo' };
  return { codigo: 'normal', texto: 'Normal', classe: 'badge-normal' };
}

// Atualizar cards de resumo
function atualizarResumo() {
  const totalProdutos = produtos.length;
  const totalUnidades = produtos.reduce((soma, p) => soma + p.qtd, 0);
  const valorTotal = produtos.reduce((soma, p) => soma + (p.qtd * p.preco), 0);
  const alertas = produtos.filter(p => p.qtd <= p.minimo).length;

  document.getElementById('resumoTotalProdutos').textContent = totalProdutos;
  document.getElementById('resumoTotalUnidades').textContent = totalUnidades;
  document.getElementById('resumoValorTotal').textContent = formatarMoeda(valorTotal);
  document.getElementById('resumoAlertas').textContent = alertas;
}

// Atualizar opções do select de categorias
function atualizarSelectCategorias() {
  const categoriaAtual = filtroCategoria.value;
  const categorias = [...new Set(produtos.map(p => p.categoria))].sort();

  filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>';
  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    filtroCategoria.appendChild(opt);
  });

  filtroCategoria.value = categoriaAtual;
}

// Renderizar tabela principal
function renderizarTabela() {
  const termo = inputBusca.value.toLowerCase().trim();
  const catSelecionada = filtroCategoria.value;
  const statusSelecionado = filtroStatus.value;

  const filtrados = produtos.filter(produto => {
    const matchTexto = produto.nome.toLowerCase().includes(termo) || produto.sku.toLowerCase().includes(termo);
    const matchCat = !catSelecionada || produto.categoria === catSelecionada;
    const status = obterStatus(produto).codigo;
    const matchStatus = !statusSelecionado || status === statusSelecionado;

    return matchTexto && matchCat && matchStatus;
  });

  tabelaProdutos.innerHTML = '';

  if (filtrados.length === 0) {
    mensagemVazia.classList.remove('oculto');
  } else {
    mensagemVazia.classList.add('oculto');
    filtrados.forEach(produto => {
      const status = obterStatus(produto);
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td><strong>${produto.sku}</strong></td>
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>${formatarMoeda(produto.preco)}</td>
        <td><strong>${produto.qtd}</strong> <small style="color:#64748b">(mín: ${produto.minimo})</small></td>
        <td><span class="badge ${status.classe}">${status.texto}</span></td>
        <td>
          <div class="grupo-qtd">
            <button class="btn-mini" title="Saída rápida (-1)" onclick="ajusteRapido(${produto.id}, -1)">-</button>
            <button class="btn-mini" title="Entrada rápida (+1)" onclick="ajusteRapido(${produto.id}, 1)">+</button>
            <button class="btn-mini" title="Movimentação em lote" onclick="abrirModalMovimentacao(${produto.id})">⇄</button>
          </div>
        </td>
        <td>
          <button class="btn-acao" onclick="editarProduto(${produto.id})">Editar</button>
          <button class="btn-acao excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
        </td>
      `;
      tabelaProdutos.appendChild(tr);
    });
  }

  atualizarResumo();
  atualizarSelectCategorias();
}

// Renderizar histórico
function renderizarHistorico() {
  const lista = document.getElementById('listaHistorico');
  lista.innerHTML = '';

  if (historico.length === 0) {
    lista.innerHTML = '<li style="color:#64748b">Nenhuma movimentação registrada ainda.</li>';
    return;
  }

  historico.slice(0, 30).forEach(item => {
    const li = document.createElement('li');
    const classeTipo = item.tipo === 'entrada' ? 'tag-entrada' : 'tag-saida';
    const sinal = item.tipo === 'entrada' ? '+' : '-';

    li.innerHTML = `
      <div>
        <span class="${classeTipo}">[${sinal}${item.quantidade}]</span>
        <strong>${item.produto}</strong>
        <span style="color:#64748b">${item.motivo ? '— ' + item.motivo : ''}</span>
      </div>
      <small style="color:#64748b">${item.data}</small>
    `;
    lista.appendChild(li);
  });
}

// Registrar log no histórico
function registrarHistorico(produtoNome, tipo, quantidade, motivo = '') {
  const agora = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  historico.unshift({
    produto: produtoNome,
    tipo,
    quantidade,
    motivo,
    data: agora
  });
}

// Ajuste rápido (+1 / -1)
function ajusteRapido(id, delta) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  if (produto.qtd + delta < 0) {
    alert('O estoque não pode ficar negativo.');
    return;
  }

  produto.qtd += delta;
  registrarHistorico(produto.nome, delta > 0 ? 'entrada' : 'saida', 1, 'Ajuste rápido');
  salvarDados();
  renderizarTabela();
  renderizarHistorico();
}

// Modais
function abrirModal(idModal) {
  document.getElementById(idModal).classList.remove('oculto');
}

function fecharModal(idModal) {
  document.getElementById(idModal).classList.add('oculto');
}

// Abrir modal para novo produto
document.getElementById('btnNovoProduto').addEventListener('click', () => {
  document.getElementById('formProduto').reset();
  document.getElementById('produtoId').value = '';
  document.getElementById('modalTitulo').textContent = 'Novo Produto';
  abrirModal('modalProduto');
});

// Abrir modal para editar produto
function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  document.getElementById('produtoId').value = produto.id;
  document.getElementById('produtoNome').value = produto.nome;
  document.getElementById('produtoSku').value = produto.sku;
  document.getElementById('produtoCategoria').value = produto.categoria;
  document.getElementById('produtoPreco').value = produto.preco;
  document.getElementById('produtoQtd').value = produto.qtd;
  document.getElementById('produtoMinimo').value = produto.minimo;

  document.getElementById('modalTitulo').textContent = 'Editar Produto';
  abrirModal('modalProduto');
}

// Salvar formulário de produto
document.getElementById('formProduto').addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('produtoId').value;
  const nome = document.getElementById('produtoNome').value.trim();
  const sku = document.getElementById('produtoSku').value.trim().toUpperCase();
  const categoria = document.getElementById('produtoCategoria').value.trim();
  const preco = parseFloat(document.getElementById('produtoPreco').value);
  const qtd = parseInt(document.getElementById('produtoQtd').value, 10);
  const minimo = parseInt(document.getElementById('produtoMinimo').value, 10);

  // Validar SKU duplicado
  const skuExiste = produtos.some(p => p.sku === sku && p.id != id);
  if (skuExiste) {
    alert('Já existe um produto cadastrado com este SKU.');
    return;
  }

  if (id) {
    const index = produtos.findIndex(p => p.id == id);
    produtos[index] = { id: Number(id), sku, nome, categoria, preco, qtd, minimo };
  } else {
    const novoProduto = {
      id: Date.now(),
      sku,
      nome,
      categoria,
      preco,
      qtd,
      minimo
    };
    produtos.push(novoProduto);
    if (qtd > 0) registrarHistorico(nome, 'entrada', qtd, 'Estoque inicial');
  }

  salvarDados();
  renderizarTabela();
  renderizarHistorico();
  fecharModal('modalProduto');
});

// Excluir produto
function excluirProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  if (confirm(`Deseja realmente excluir "${produto.nome}"?`)) {
    produtos = produtos.filter(p => p.id !== id);
    salvarDados();
    renderizarTabela();
  }
}

// Movimentação em lote
function abrirModalMovimentacao(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  document.getElementById('formMovimentacao').reset();
  document.getElementById('movProdutoId').value = produto.id;
  document.getElementById('movProdutoNome').textContent = `${produto.nome} (Saldo atual: ${produto.qtd})`;
  abrirModal('modalMovimentacao');
}

document.getElementById('formMovimentacao').addEventListener('submit', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('movProdutoId').value);
  const tipo = document.getElementById('movTipo').value;
  const quantidade = parseInt(document.getElementById('movQuantidade').value, 10);
  const motivo = document.getElementById('movMotivo').value.trim();

  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  if (tipo === 'saida' && produto.qtd < quantidade) {
    alert('Quantidade insuficiente em estoque para esta saída.');
    return;
  }

  produto.qtd += (tipo === 'entrada' ? quantidade : -quantidade);
  registrarHistorico(produto.nome, tipo, quantidade, motivo);

  salvarDados();
  renderizarTabela();
  renderizarHistorico();
  fecharModal('modalMovimentacao');
});

// Exportar CSV
document.getElementById('btnExportar').addEventListener('click', () => {
  const cabecalho = ['SKU', 'Produto', 'Categoria', 'Preco Unitario', 'Quantidade', 'Estoque Minimo'];
  const linhas = produtos.map(p => [
    p.sku,
    `"${p.nome}"`,
    `"${p.categoria}"`,
    p.preco.toFixed(2).replace('.', ','),
    p.qtd,
    p.minimo
  ].join(';'));

  const csv = '\uFEFF' + [cabecalho.join(';'), ...linhas].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'controle_estoque.csv';
  link.click();
});

// Limpar histórico
document.getElementById('btnLimparHistorico').addEventListener('click', () => {
  if (confirm('Limpar todo o histórico de movimentações?')) {
    historico = [];
    salvarDados();
    renderizarHistorico();
  }
});

// Eventos de Filtro
inputBusca.addEventListener('input', renderizarTabela);
filtroCategoria.addEventListener('change', renderizarTabela);
filtroStatus.addEventListener('change', renderizarTabela);

// Inicialização
renderizarTabela();
renderizarHistorico();