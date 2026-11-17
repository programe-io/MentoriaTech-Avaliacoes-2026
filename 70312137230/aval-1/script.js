// Array inicial vazio (zero produtos)
let produtos = [];

function atualizarSistema() {
  try {
    localStorage.setItem('stockflow_produtos', JSON.stringify(produtos));
  } catch (e) {}
  atualizarKPIs();
  renderizarTabela();
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-msg');
  if (!toast || !msg) return;
  msg.textContent = mensagem;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

function atualizarKPIs() {
  document.getElementById('kpi-produtos').textContent = produtos.length;
  document.getElementById('kpi-itens').textContent = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  document.getElementById('kpi-valor').textContent = formatarMoeda(produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0));
  document.getElementById('kpi-alertas').textContent = produtos.filter(p => p.quantidade <= p.minimo).length;
}

window.cadastrarProduto = function() {
  const nomeInput = document.getElementById('nome');
  const skuInput = document.getElementById('sku');
  const catInput = document.getElementById('categoria');
  const precoInput = document.getElementById('preco');
  const qtdInput = document.getElementById('quantidade');
  const minInput = document.getElementById('minimo');

  const nome = nomeInput.value.trim();
  const preco = parseFloat(precoInput.value);
  const quantidade = parseInt(qtdInput.value);

  if (!nome || isNaN(preco) || preco < 0 || isNaN(quantidade) || quantidade < 0) {
    alert('Por favor, preencha o Nome, o Valor e a Quantidade corretamente!');
    return;
  }

  const novoProduto = {
    id: Date.now(),
    nome: nome,
    sku: skuInput.value.trim() || `PRD-${Math.floor(100 + Math.random() * 900)}`,
    categoria: catInput.value,
    preco: preco,
    quantidade: quantidade,
    minimo: parseInt(minInput.value) || 0
  };

  produtos.unshift(novoProduto);
  atualizarSistema();

  nomeInput.value = '';
  skuInput.value = '';
  precoInput.value = '';
  qtdInput.value = '';
  minInput.value = 5;

  mostrarToast('Produto cadastrado com sucesso!');
};

window.alterarQuantidadeRapida = function(id, delta) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  const novaQtd = produto.quantidade + delta;
  if (novaQtd < 0) return;
  produto.quantidade = novaQtd;
  atualizarSistema();
};

window.abrirModalEdicao = function(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  document.getElementById('edit-id').value = produto.id;
  document.getElementById('edit-nome').value = produto.nome;
  document.getElementById('edit-preco').value = produto.preco;
  document.getElementById('edit-quantidade').value = produto.quantidade;

  const modal = document.getElementById('modal-editar');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.fecharModal = function() {
  const modal = document.getElementById('modal-editar');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.salvarEdicao = function() {
  const id = Number(document.getElementById('edit-id').value);
  const nome = document.getElementById('edit-nome').value.trim();
  const preco = parseFloat(document.getElementById('edit-preco').value);
  const quantidade = parseInt(document.getElementById('edit-quantidade').value);

  if (!nome || isNaN(preco) || isNaN(quantidade)) {
    alert('Preencha os campos corretamente.');
    return;
  }

  const produto = produtos.find(p => p.id === id);
  if (produto) {
    produto.nome = nome;
    produto.preco = preco;
    produto.quantidade = quantidade;
    atualizarSistema();
    fecharModal();
    mostrarToast('Produto atualizado!');
  }
};

window.excluirProduto = function(id) {
  produtos = produtos.filter(p => p.id !== id);
  atualizarSistema();
  mostrarToast('Produto removido.');
};

window.renderizarTabela = function() {
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
          <button type="button" onclick="alterarQuantidadeRapida(${p.id}, -1)" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition">-</button>
          <span class="w-8 text-center font-semibold">${p.quantidade}</span>
          <button type="button" onclick="alterarQuantidadeRapida(${p.id}, 1)" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition">+</button>
        </div>
      </td>
      <td class="py-3.5 px-4 font-medium text-emerald-400">${formatarMoeda(p.preco * p.quantidade)}</td>
      <td class="py-3.5 px-4">${badgeStatus}</td>
      <td class="py-3.5 px-4 text-right space-x-1">
        <button type="button" onclick="abrirModalEdicao(${p.id})" title="Editar" class="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 transition">
          <i data-lucide="edit-3" class="w-4 h-4"></i>
        </button>
        <button type="button" onclick="excluirProduto(${p.id})" title="Excluir" class="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
};

window.exportarCSV = function() {
  if (produtos.length === 0) return alert('Não há produtos para exportar.');
  const cabecalho = ['SKU;Produto;Categoria;Valor Unitario;Quantidade;Valor Total'];
  const linhas = produtos.map(p => 
    `${p.sku};"${p.nome}";${p.categoria};${p.preco.toFixed(2).replace('.', ',')};${p.quantidade};${(p.preco * p.quantidade).toFixed(2).replace('.', ',')}`
  );
  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [cabecalho, ...linhas].join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "estoque_produtos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  mostrarToast('Planilha CSV exportada!');
};

window.limparTudo = function() {
  produtos = [];
  atualizarSistema();
  mostrarToast('Estoque zerado com sucesso!');
};

setTimeout(() => {
  atualizarSistema();
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}, 200);