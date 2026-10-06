// BANCO DE DADOS INICIAL DE PRODUTOS NAT MAKES
let produtos = [
  {
    id: 1,
    nome: "Batom Matte Rose Velour",
    sku: "NM-1001",
    marca: "Nat Makes",
    categoria: "Maquiagem",
    preco: 39.90,
    qtd: 45,
    imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    nome: "Base Líquida HD Satin Glow",
    sku: "NM-1002",
    marca: "Nat Makes",
    categoria: "Maquiagem",
    preco: 89.90,
    qtd: 12,
    imagem: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    nome: "Sérum Facial Hidratante Ácido Hialurônico",
    sku: "NM-2001",
    marca: "Nat Makes Skin",
    categoria: "Skincare",
    preco: 74.50,
    qtd: 4, // Estoque baixo
    imagem: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    nome: "Paleta de Sombras Nude Essence",
    sku: "NM-1003",
    marca: "Nat Makes",
    categoria: "Maquiagem",
    preco: 119.90,
    qtd: 28,
    imagem: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    nome: "Perfume Eau de Parfum Sky Floral 50ml",
    sku: "NM-3001",
    marca: "Nat Makes Fragrances",
    categoria: "Perfumaria",
    preco: 189.00,
    qtd: 0, // Esgotado
    imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    nome: "Kit de Pincéis Profissionais Soft Touch",
    sku: "NM-4001",
    marca: "Nat Makes Tools",
    categoria: "Acessórios",
    preco: 95.00,
    qtd: 18,
    imagem: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80"
  }
];

// Imagens pré-definidas para novos cadastros
const galeriaOpcoes = [
  "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80"
];

// Histórico de movimentações
let historico = [
  { data: "06/10/2026 10:15", tipo: "ENTRADA", produto: "Batom Matte Rose Velour", qtd: 20, obs: "Lote de fornecedor" },
  { data: "06/10/2026 11:30", tipo: "SAIDA", produto: "Sérum Facial Hidratante", qtd: 2, obs: "Venda online" }
];

let chartCatInstance = null;
let chartStatusInstance = null;

// INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  renderGaleriaImagens();
  atualizarInterface();
  lucide.createIcons();
});

// CALCULAR STATUS BASEADO NA QUANTIDADE
function calcularStatus(qtd) {
  if (qtd <= 0) return { texto: "Esgotado", classe: "bg-rose-100 text-rose-600 border-rose-200" };
  if (qtd <= 5) return { texto: "Estoque Baixo", classe: "bg-amber-100 text-amber-700 border-amber-200" };
  return { texto: "Disponível", classe: "bg-sky-100 text-sky-700 border-sky-200" };
}

// FORMATAR MOEDA
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// RENDERIZAR TABELA DE PRODUTOS
function renderTabela(lista = produtos) {
  const tbody = document.getElementById("tabela-produtos");
  const noProducts = document.getElementById("no-products");

  tbody.innerHTML = "";

  if (lista.length === 0) {
    noProducts.classList.remove("hidden");
    return;
  } else {
    noProducts.classList.add("hidden");
  }

  lista.forEach(prod => {
    const status = calcularStatus(prod.qtd);
    const tr = document.createElement("tr");
    tr.className = "hover:bg-sky-50/40 transition-colors border-b border-sky-50/80";

    tr.innerHTML = `
      <td class="py-3.5 px-4 flex items-center gap-3">
        <img src="${prod.imagem}" alt="${prod.nome}" 
             onclick="ampliarImagem('${prod.imagem}', '${prod.nome}')"
             class="w-11 h-11 rounded-xl object-cover border border-sky-200 cursor-pointer img-product-thumb shadow-sm">
        <div>
          <p class="font-semibold text-slate-800 leading-tight">${prod.nome}</p>
          <span class="text-[11px] text-sky-400 font-medium">ID #${prod.id}</span>
        </div>
      </td>
      <td class="py-3.5 px-4 text-xs font-mono text-slate-600">
        <div>${prod.sku}</div>
        <div class="text-[10px] text-slate-400 font-sans">${prod.marca}</div>
      </td>
      <td class="py-3.5 px-4">
        <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-sky-50 text-sky-600 border border-sky-100">
          ${prod.categoria}
        </span>
      </td>
      <td class="py-3.5 px-4 text-center font-bold text-slate-700">
        ${prod.qtd}
      </td>
      <td class="py-3.5 px-4 font-semibold text-slate-800">
        ${formatarMoeda(prod.preco)}
      </td>
      <td class="py-3.5 px-4">
        <span class="px-2.5 py-1 text-[11px] font-semibold rounded-full border ${status.classe}">
          ${status.texto}
        </span>
      </td>
      <td class="py-3.5 px-4 text-center">
        <div class="flex items-center justify-center gap-2">
          <button onclick="editarProduto(${prod.id})" title="Editar" class="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="excluirProduto(${prod.id})" title="Excluir" class="p-1.5 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  lucide.createIcons();
}

// FILTRAGEM
function filtrarProdutos() {
  const busca = document.getElementById("global-search").value.toLowerCase();
  const cat = document.getElementById("filter-categoria").value;
  const status = document.getElementById("filter-status").value;

  const resultado = produtos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca) || 
                       p.sku.toLowerCase().includes(busca) || 
                       p.marca.toLowerCase().includes(busca);
    const matchCat = cat === "" || p.categoria === cat;
    
    const statusObj = calcularStatus(p.qtd);
    const matchStatus = status === "" || statusObj.texto === status;

    return matchBusca && matchCat && matchStatus;
  });

  renderTabela(resultado);
}

// ATUALIZAR MÉTRICAS E DASHBOARD
function atualizarMetricas() {
  const totalUnidades = produtos.reduce((acc, p) => acc + p.qtd, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + (p.preco * p.qtd), 0);
  const estoqueBaixo = produtos.filter(p => p.qtd <= 5).length;
  const categoriasUnicas = new Set(produtos.map(p => p.categoria)).size;

  document.getElementById("stat-total-itens").innerText = totalUnidades;
  document.getElementById("stat-valor-total").innerText = formatarMoeda(valorTotal);
  document.getElementById("stat-estoque-baixo").innerText = estoqueBaixo;
  document.getElementById("stat-categorias").innerText = categoriasUnicas;
}

// GRÁFICOS (CHART.JS)
function atualizarGraficos() {
  // Gráfico Categoria
  const categorias = ["Maquiagem", "Skincare", "Perfumaria", "Acessórios"];
  const qtdsPorCategoria = categorias.map(c => 
    produtos.filter(p => p.categoria === c).reduce((acc, p) => acc + p.qtd, 0)
  );

  const ctxCat = document.getElementById("chartCategoria").getContext("2d");
  if (chartCatInstance) chartCatInstance.destroy();

  chartCatInstance = new Chart(ctxCat, {
    type: 'bar',
    data: {
      labels: categorias,
      datasets: [{
        label: 'Unidades em Estoque',
        data: qtdsPorCategoria,
        backgroundColor: '#38bdf8',
        borderRadius: 8,
        hoverBackgroundColor: '#0284c7'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f9ff' } },
        x: { grid: { display: false } }
      }
    }
  });

  // Gráfico Status
  const disponivel = produtos.filter(p => p.qtd > 5).length;
  const baixo = produtos.filter(p => p.qtd > 0 && p.qtd <= 5).length;
  const esgotado = produtos.filter(p => p.qtd === 0).length;

  const ctxStatus = document.getElementById("chartStatus").getContext("2d");
  if (chartStatusInstance) chartStatusInstance.destroy();

  chartStatusInstance = new Chart(ctxStatus, {
    type: 'doughnut',
    data: {
      labels: ['Disponível', 'Estoque Baixo', 'Esgotado'],
      datasets: [{
        data: [disponivel, baixo, esgotado],
        backgroundColor: ['#38bdf8', '#f59e0b', '#f43f5e'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
      }
    }
  });
}

// HISTÓRICO
function renderHistorico() {
  const tbody = document.getElementById("tabela-historico");
  tbody.innerHTML = "";

  historico.slice().reverse().forEach(h => {
    const tr = document.createElement("tr");
    const badgeClass = h.tipo === "ENTRADA" 
      ? "bg-sky-100 text-sky-700" 
      : "bg-rose-100 text-rose-700";

    tr.innerHTML = `
      <td class="py-2.5 font-mono text-[11px] text-slate-400">${h.data}</td>
      <td class="py-2.5">
        <span class="px-2 py-0.5 text-[10px] font-bold rounded-md ${badgeClass}">
          ${h.tipo}
        </span>
      </td>
      <td class="py-2.5 font-medium text-slate-700">${h.produto}</td>
      <td class="py-2.5 text-center font-bold text-slate-800">${h.qtd}</td>
      <td class="py-2.5 text-slate-500">${h.obs || '-'}</td>
    `;
    tbody.appendChild(tr);
  });
}

// SELEÇÃO DE IMAGENS NO FORMULÁRIO
function renderGaleriaImagens() {
  const container = document.getElementById("galeria-imagens");
  container.innerHTML = "";

  galeriaOpcoes.forEach((url, idx) => {
    const div = document.createElement("div");
    div.className = `cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-0.5 ${idx === 0 ? 'border-sky-500 ring-2 ring-sky-200' : 'border-slate-100'}`;
    div.onclick = () => selecionarImagemForm(div, url);

    div.innerHTML = `<img src="${url}" class="w-full h-12 object-cover rounded-lg">`;
    container.appendChild(div);

    if (idx === 0) {
      document.getElementById("prod-imagem").value = url;
    }
  });
}

function selecionarImagemForm(element, url) {
  const container = document.getElementById("galeria-imagens");
  Array.from(container.children).forEach(c => c.className = "cursor-pointer rounded-xl overflow-hidden border-2 border-slate-100 p-0.5");
  element.className = "cursor-pointer rounded-xl overflow-hidden border-2 border-sky-500 ring-2 ring-sky-200 p-0.5";
  document.getElementById("prod-imagem").value = url;
}

// MODAL PRODUTO
function abrirModalProduto(edicao = false) {
  const modal = document.getElementById("modal-produto");
  const modalDiv = modal.querySelector("div");

  document.getElementById("modal-titulo").innerText = edicao ? "Editar Cosmético" : "Cadastrar Novo Cosmético";
  modal.classList.remove("hidden");
  
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    modalDiv.classList.remove("scale-95");
  }, 10);
}

function fecharModalProduto() {
  const modal = document.getElementById("modal-produto");
  const modalDiv = modal.querySelector("div");

  modal.classList.add("opacity-0");
  modalDiv.classList.add("scale-95");

  setTimeout(() => {
    modal.classList.add("hidden");
    document.getElementById("form-produto").reset();
    document.getElementById("prod-id").value = "";
  }, 200);
}

// SALVAR / EDITAR PRODUTO
function salvarProduto(e) {
  e.preventDefault();

  const id = document.getElementById("prod-id").value;
  const nome = document.getElementById("prod-nome").value;
  const sku = document.getElementById("prod-sku").value;
  const marca = document.getElementById("prod-marca").value;
  const categoria = document.getElementById("prod-categoria").value;
  const preco = parseFloat(document.getElementById("prod-preco").value);
  const qtd = parseInt(document.getElementById("prod-qtd").value);
  const imagem = document.getElementById("prod-imagem").value;

  if (id) {
    // Editar
    const index = produtos.findIndex(p => p.id == id);
    if (index !== -1) {
      produtos[index] = { id: parseInt(id), nome, sku, marca, categoria, preco, qtd, imagem };
    }
  } else {
    // Novo Cadastro
    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    produtos.push({ id: novoId, nome, sku, marca, categoria, preco, qtd, imagem });

    // Registrar no histórico
    const agora = new Date().toLocaleString('pt-BR');
    historico.push({
      data: agora,
      tipo: "ENTRADA",
      produto: nome,
      qtd: qtd,
      obs: "Cadastro inicial do produto"
    });
  }

  fecharModalProduto();
  atualizarInterface();
}

function editarProduto(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;

  document.getElementById("prod-id").value = prod.id;
  document.getElementById("prod-nome").value = prod.nome;
  document.getElementById("prod-sku").value = prod.sku;
  document.getElementById("prod-marca").value = prod.marca;
  document.getElementById("prod-categoria").value = prod.categoria;
  document.getElementById("prod-preco").value = prod.preco;
  document.getElementById("prod-qtd").value = prod.qtd;
  document.getElementById("prod-imagem").value = prod.imagem;

  abrirModalProduto(true);
}

function excluirProduto(id) {
  if (confirm("Tem certeza que deseja remover este produto da Nat Makes?")) {
    produtos = produtos.filter(p => p.id !== id);
    atualizarInterface();
  }
}

// MODAL MOVIMENTAÇÃO
function abrirModalMovimento() {
  const select = document.getElementById("mov-produto");
  select.innerHTML = "";

  produtos.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.innerText = `${p.nome} (Atual: ${p.qtd})`;
    select.appendChild(opt);
  });

  const modal = document.getElementById("modal-movimento");
  const modalDiv = modal.querySelector("div");
  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.remove("opacity-0");
    modalDiv.classList.remove("scale-95");
  }, 10);
}

function fecharModalMovimento() {
  const modal = document.getElementById("modal-movimento");
  const modalDiv = modal.querySelector("div");

  modal.classList.add("opacity-0");
  modalDiv.classList.add("scale-95");

  setTimeout(() => {
    modal.classList.add("hidden");
    document.getElementById("form-movimento").reset();
  }, 200);
}

function salvarMovimento(e) {
  e.preventDefault();

  const prodId = parseInt(document.getElementById("mov-produto").value);
  const tipo = document.getElementById("mov-tipo").value;
  const qtd = parseInt(document.getElementById("mov-qtd").value);
  const obs = document.getElementById("mov-obs").value;

  const prod = produtos.find(p => p.id === prodId);
  if (!prod) return;

  if (tipo === "SAIDA" && prod.qtd < qtd) {
    alert("Quantidade em estoque insuficiente para realizar esta saída!");
    return;
  }

  if (tipo === "ENTRADA") {
    prod.qtd += qtd;
  } else {
    prod.qtd -= qtd;
  }

  const agora = new Date().toLocaleString('pt-BR');
  historico.push({
    data: agora,
    tipo: tipo,
    produto: prod.nome,
    qtd: qtd,
    obs: obs
  });

  fecharModalMovimento();
  atualizarInterface();
}

// MODAL IMAGEM AMPLIADA
function ampliarImagem(url, nome) {
  const modal = document.getElementById("modal-imagem");
  document.getElementById("img-ampliada").src = url;
  document.getElementById("img-titulo").innerText = nome;

  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.remove("opacity-0"), 10);
}

function fecharModalImagem() {
  const modal = document.getElementById("modal-imagem");
  modal.classList.add("opacity-0");
  setTimeout(() => modal.classList.add("hidden"), 200);
}

// REFRESH GERAL
function atualizarInterface() {
  filtrarProdutos();
  atualizarMetricas();
  atualizarGraficos();
  renderHistorico();
}