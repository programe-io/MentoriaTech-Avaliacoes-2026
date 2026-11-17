// Dados iniciais de exemplo caso o localStorage esteja vazio
const dadosIniciais = [
  { id: 1, nome: "Notebook Dell Inspiron 15", sku: "NB-001", categoria: "Eletrônicos", preco: 3850.00, quantidade: 8, minimo: 3 },
  { id: 2, nome: "Mouse Logitech MX Master 3S", sku: "MS-042", categoria: "Periféricos", preco: 549.90, quantidade: 3, minimo: 5 },
  { id: 3, nome: "Monitor LG UltraWide 29\"", sku: "MN-109", categoria: "Eletrônicos", preco: 1299.00, quantidade: 0, minimo: 2 }
];

let produtos = JSON.parse(localStorage.getItem('stockflow_produtos')) || dadosIniciais;

// Salva no navegador
function salvarLocalStorage() {
  localStorage.setItem('stockflow_produtos', JSON.stringify(produtos));
  atualizarKPIs();
  renderizarTabela();
}

// Formata moeda BRL
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Exibe notificação flutuante
function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = mensagem;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

// Atualiza os indicadores do topo
function atualizarKPIs() {
  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
  const alertas = produtos.filter(p => p.quantidade <= p.minimo).length;

  document.getElementById('kpi-produtos').textContent = totalProdutos;
  document.getElementById('kpi-itens').textContent = totalItens;
  document.getElementById('kpi-valor').textContent = formatarMoeda(valorTotal);
  document.getElementById('kpi-alertas').textContent = alertas;
}

// Cadastrar novo produto
document.getElementById('form-produto').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const novoProduto = {
    id: Date.now(),
    nome: document.getElementById('nome').value.trim(),
    sku: document.getElementById('sku').value.trim() || `PRD-${Math.floor(100 + Math.random() * 900)}`,
    categoria: document.getElementById('categoria').value,
    preco: parseFloat(document.getElementById('preco').value),
    quantidade: parseInt(document.getElementById('quantidade').value),
    minimo: parseInt(document.getElementById('minimo').value) || 0
  };

  produtos.unshift(novoProduto);
  salvarLocalStorage();
  e.target.reset();
  document.getElementById('minimo').value = 5;
  mostrarToast('Produto cadastrado com sucesso!');
});

// Ajuste rápido de quantidade (+1 ou -1)
function alterarQuantidadeRapida(id, delta) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const novaQtd = produto.quantidade + delta;
  if (novaQtd < 0) return;

  produto.quantidade = novaQtd;
  salvarLocalStorage();
}

// Abrir modal para editar preço e quantidade
function abrirModalEdicao(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  document.getElementById('edit-id').value = produto.id;
  document.getElementById('edit-nome').value = produto.nome;
  document.getElementById('edit-preco').value = produto.preco;
  document.getElementById('edit-quantidade').value = produto.quantidade;

  const modal = document.getElementById('modal-editar');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function fecharModal() {
  const modal = document.getElementById('modal-editar');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Salvar edição do modal
document.getElementById('form-editar').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Number(document.getElementById('edit-id').value);
  const produto = produtos.find(p => p.id === id);

  if (produto) {
    produto.nome = document.getElementById('edit-nome').value.trim();
    produto.preco = parseFloat(document.getElementById('edit-preco').value);
    produto.quantidade = parseInt(document.getElementById('edit-quantidade').value);
    salvarLocalStorage();
    fecharModal();
    mostrarToast('Produto atualizado!');
  }
});

// Excluir produto
function excluirProduto(id) {
  if (confirm('Deseja realmente excluir este produto do estoque?')) {
    produtos = produtos.filter(p => p.id !== id);
    salvarLocalStorage();
    mostrarToast('Produto removido.');
  }
}

// Renderiza a tabela com filtros
function renderizarTabela() {
  const termo = document.getElementById('busca').value.toLowerCase();
  const filtroStatus = document.getElementById('filtro-status').value;
  const tbody = document.getElementById('tabela-produtos');
  const estadoVazio = document.getElementById('estado-vazio');

  const filtrados = produtos.filter(p => {
    const bateBusca = p.nome.toLowerCase().includes(termo) || p.sku.toLowerCase().includes(termo);
    if (!bateBusca) return false;

    if (filtroStatus === 'zerado') return p.quantidade === 0;
    if (filtroStatus === 'baixo') return p.quantidade > 0 && p.quantidade <= p.minimo;
    if (filtroStatus === 'ok') return p.quantidade > p.minimo;
    return true;
  });

  tbody.innerHTML = '';

  if (filtrados.length === 0) {
    estadoVazio.classList.remove('hidden');
    return;
  }

  estadoVazio.classList.add('hidden');

  filtrados.forEach(p => {
    let badgeStatus = '';
    if (p.quantidade === 0) {
      badgeStatus = '<span class="px-2.5 py-1 text-xs font-medium rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">Esgotado</span>';
    } else if (p.quantidade <= p.minimo) {
      badgeStatus = '<span class="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Estoque Baixo</span>';
    } else {
      badgeStatus = '<span class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Em Dia</span>';
    }

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-800/40 transition';
    tr.innerHTML = `
      <td class="py-3.5 px-4">
        <div class="font-medium text-white">${p.nome}</div>
        <div class="text-xs text-slate-400">${p.sku} • ${p.categoria}</div>
      </td>
      <td class="py-3.5 px-4 font-medium text-slate-200">${formatarMoeda(p.preco)}</td>
      <td class="py-3.5 px-4">
        <div class="flex items-center justify-center gap-2">
          <button onclick="alterarQuantidadeRapida(${p.id}, -1)" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition">-</button>
          <span class="w-8 text-center font-semibold">${p.quantidade}</span>
          <button onclick="alterarQuantidadeRapida(${p.id}, 1)" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition">+</button>
        </div>
      </td>
      <td class="py-3.5 px-4 font-medium text-emerald-400">${formatarMoeda(p.preco * p.quantidade)}</td>
      <td class="py-3.5 px-4">${badgeStatus}</td>
      <td class="py-3.5 px-4 text-right space-x-1">
        <button onclick="abrirModalEdicao(${p.id})" title="Editar valor/quantidade" class="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 transition">
          <i data-lucide="edit-3" class="w-4 h-4"></i>
        </button>
        <button onclick="excluirProduto(${p.id})" title="Excluir" class="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Recria os ícones Lucide inseridos dinamicamente
  lucide.createIcons();
}

// Exportar para CSV (Excel)
function exportarCSV() {
  if (produtos.length === 0) return alert('Não há produtos para exportar.');
  
  const cabecalho = ['SKU;Produto;Categoria;Valor Unitario;Quantidade;Valor Total'];
  const linhas = produtos.map(p => 
    `${p.sku};"${p.nome}";${p.categoria};${p.preco.toFixed(2).replace('.', ',')};${p.quantidade};${(p.preco * p.quantidade).toFixed(2).replace('.', ',')}`
  );
  
  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [cabecalho, ...linhas].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "estoque_produtos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  mostrarToast('Planilha CSV exportada!');
}

// Resetar para os dados de exemplo
function limparTudo() {
  if (confirm('Isso restaurará os dados de exemplo e apagará suas alterações. Continuar?')) {
    produtos = [...dadosIniciais];
    salvarLocalStorage();
    mostrarToast('Dados restaurados.');
  }
}

// Inicialização
lucide.createIcons();
atualizarKPIs();
renderizarTabela();