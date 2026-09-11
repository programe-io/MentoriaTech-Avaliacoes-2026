// ---------- Estado da aplicação ----------
// Cada produto: { id, nome, sku, quantidade, minimo }

let produtos = [];
let filtroAtual = 'todos';
let termoBusca = '';

// ---------- Referências do DOM ----------

const formProduto = document.getElementById('formProduto');
const corpoTabela = document.getElementById('corpoTabela');
const mensagemVazia = document.getElementById('mensagemVazia');
const campoBusca = document.getElementById('busca');
const botoesFiltro = document.querySelectorAll('.filtro-btn');

// ---------- Funções auxiliares ----------

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function obterStatus(produto) {
  if (produto.quantidade <= 0) return 'esgotado';
  if (produto.quantidade <= produto.minimo) return 'baixo';
  return 'ok';
}

function textoStatus(status) {
  if (status === 'esgotado') return 'Esgotado';
  if (status === 'baixo') return 'Estoque baixo';
  return 'Em estoque';
}

// ---------- Renderização ----------

function renderizar() {
  // Filtra por status selecionado na lateral
  let listaFiltrada = produtos.filter((produto) => {
    const status = obterStatus(produto);
    if (filtroAtual === 'baixo') return status === 'baixo';
    if (filtroAtual === 'esgotado') return status === 'esgotado';
    return true;
  });

  // Filtra pela busca de texto
  if (termoBusca.trim() !== '') {
    const termo = termoBusca.trim().toLowerCase();
    listaFiltrada = listaFiltrada.filter((produto) =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.sku.toLowerCase().includes(termo)
    );
  }

  corpoTabela.innerHTML = '';

  if (listaFiltrada.length === 0) {
    mensagemVazia.classList.remove('linha-oculta');
    if (produtos.length > 0) {
      mensagemVazia.textContent = 'Nenhum produto encontrado com esse filtro ou busca.';
    } else {
      mensagemVazia.textContent = 'Nenhum produto cadastrado ainda. Use o formulário acima para começar.';
    }
  } else {
    mensagemVazia.classList.add('linha-oculta');
  }

  listaFiltrada.forEach((produto) => {
    const status = obterStatus(produto);
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td class="nome-produto">${escapeHtml(produto.nome)}</td>
      <td class="sku-produto">${escapeHtml(produto.sku)}</td>
      <td class="qtd-numero">${produto.quantidade}</td>
      <td><span class="status-pill status-${status}">${textoStatus(status)}</span></td>
      <td>
        <div class="mov-wrap">
          <button class="btn-mov" data-acao="remover-unidade" data-id="${produto.id}" title="Remover 1 unidade">−</button>
          <input type="number" min="1" value="1" data-qtd-id="${produto.id}">
          <button class="btn-mov" data-acao="adicionar-unidade" data-id="${produto.id}" title="Adicionar unidades">+</button>
        </div>
      </td>
      <td><button class="btn-remover" data-acao="excluir" data-id="${produto.id}">Excluir</button></td>
    `;

    corpoTabela.appendChild(linha);
  });

  atualizarResumo();
}

function atualizarResumo() {
  const totalItens = produtos.length;
  const totalUnidades = produtos.reduce((soma, p) => soma + p.quantidade, 0);
  const totalBaixo = produtos.filter((p) => obterStatus(p) === 'baixo').length;
  const totalEsgotado = produtos.filter((p) => obterStatus(p) === 'esgotado').length;

  document.getElementById('totalItens').textContent = totalItens;
  document.getElementById('totalUnidades').textContent = totalUnidades;
  document.getElementById('totalBaixo').textContent = totalBaixo;
  document.getElementById('totalEsgotado').textContent = totalEsgotado;
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ---------- Manipulação de produtos ----------

function adicionarProduto(nome, sku, quantidade, minimo) {
  produtos.push({
    id: gerarId(),
    nome,
    sku,
    quantidade,
    minimo,
  });
  renderizar();
}

function ajustarQuantidade(id, delta) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;
  produto.quantidade = Math.max(0, produto.quantidade + delta);
  renderizar();
}

function excluirProduto(id) {
  produtos = produtos.filter((p) => p.id !== id);
  renderizar();
}

// ---------- Eventos ----------

formProduto.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const sku = document.getElementById('sku').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const minimo = parseInt(document.getElementById('minimo').value, 10);

  if (!nome || !sku || isNaN(quantidade) || isNaN(minimo)) return;

  const skuJaExiste = produtos.some((p) => p.sku.toLowerCase() === sku.toLowerCase());
  if (skuJaExiste) {
    alert('Já existe um produto cadastrado com esse SKU.');
    return;
  }

  adicionarProduto(nome, sku, quantidade, minimo);
  formProduto.reset();
  document.getElementById('nome').focus();
});

corpoTabela.addEventListener('click', (evento) => {
  const botao = evento.target.closest('button');
  if (!botao) return;

  const { acao, id } = botao.dataset;

  if (acao === 'excluir') {
    excluirProduto(id);
    return;
  }

  const inputQtd = corpoTabela.querySelector(`input[data-qtd-id="${id}"]`);
  const valor = Math.max(1, parseInt(inputQtd?.value, 10) || 1);

  if (acao === 'adicionar-unidade') {
    ajustarQuantidade(id, valor);
  } else if (acao === 'remover-unidade') {
    ajustarQuantidade(id, -valor);
  }
});

campoBusca.addEventListener('input', (evento) => {
  termoBusca = evento.target.value;
  renderizar();
});

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach((b) => b.classList.remove('active'));
    botao.classList.add('active');
    filtroAtual = botao.dataset.filtro;
    renderizar();
  });
});

// ---------- Dados iniciais de exemplo ----------

adicionarProduto('Parafuso sextavado M8', 'PRF-M8-001', 240, 50);
adicionarProduto('Luva de proteção nitrílica', 'LUV-NIT-014', 12, 20);
adicionarProduto('Fita isolante 3M', 'FIT-3M-007', 0, 10);