// Carrega produtos salvos no navegador ou inicia com exemplos
let produtos = JSON.parse(localStorage.getItem('estoque_simples')) || [
  { id: 1, nome: 'Teclado Mecânico', categoria: 'Periféricos', quantidade: 12, preco: 250.00 },
  { id: 2, nome: 'Mouse Sem Fio', categoria: 'Periféricos', quantidade: 3, preco: 89.90 },
  { id: 3, nome: 'Monitor 24"', categoria: 'Monitores', quantidade: 5, preco: 899.00 }
];

const form = document.getElementById('form-produto');
const listaEstoque = document.getElementById('lista-estoque');
const campoBusca = document.getElementById('campo-busca');

// Salva no navegador
function salvarDados() {
  localStorage.setItem('estoque_simples', JSON.stringify(produtos));
}

// Formata número para Real (R$)
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Atualiza os cards de resumo no topo
function atualizarResumo() {
  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce((soma, item) => soma + item.quantidade, 0);
  const valorTotal = produtos.reduce((soma, item) => soma + (item.quantidade * item.preco), 0);

  document.getElementById('total-produtos').textContent = totalProdutos;
  document.getElementById('total-itens').textContent = totalItens;
  document.getElementById('valor-total').textContent = formatarMoeda(valorTotal);
}

// Desenha a tabela na tela
function renderizarTabela() {
  const termo = campoBusca.value.toLowerCase();
  listaEstoque.innerHTML = '';

  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.categoria.toLowerCase().includes(termo)
  );

  if (filtrados.length === 0) {
    listaEstoque.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b;">Nenhum produto encontrado.</td></tr>`;
    atualizarResumo();
    return;
  }

  filtrados.forEach(produto => {
    const subtotal = produto.quantidade * produto.preco;
    const alertaBaixo = produto.quantidade < 5
      ? `<span class="estoque-baixo">${produto.quantidade} un. (Baixo)</span>`
      : `${produto.quantidade} un.`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${produto.nome}</strong></td>
      <td>${produto.categoria}</td>
      <td>${formatarMoeda(produto.preco)}</td>
      <td>${alertaBaixo}</td>
      <td>${formatarMoeda(subtotal)}</td>
      <td class="acoes">
        <button class="btn-qtd btn-mais" onclick="alterarQuantidade(${produto.id}, 1)" title="Entrada (+1)">+</button>
        <button class="btn-qtd btn-menos" onclick="alterarQuantidade(${produto.id}, -1)" title="Saída (-1)">-</button>
        <button class="btn-excluir" onclick="removerProduto(${produto.id})">Excluir</button>
      </td>
    `;
    listaEstoque.appendChild(tr);
  });

  atualizarResumo();
}

// Cadastrar novo produto
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  const novoProduto = {
    id: Date.now(),
    nome,
    categoria,
    quantidade,
    preco
  };

  produtos.push(novoProduto);
  salvarDados();
  renderizarTabela();
  form.reset();
});

// Aumentar ou diminuir estoque (+1 ou -1)
function alterarQuantidade(id, delta) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  if (produto.quantidade + delta >= 0) {
    produto.quantidade += delta;
    salvarDados();
    renderizarTabela();
  }
}

// Remover produto
function removerProduto(id) {
  if (confirm('Deseja realmente excluir este produto?')) {
    produtos = produtos.filter(p => p.id !== id);
    salvarDados();
    renderizarTabela();
  }
}

// Busca em tempo real
campoBusca.addEventListener('input', renderizarTabela);

// Inicializa a tela
renderizarTabela();