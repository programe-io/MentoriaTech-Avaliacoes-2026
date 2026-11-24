// Carrega os produtos salvos no navegador ou inicia uma lista vazia
let estoque = JSON.parse(localStorage.getItem('meu_estoque')) || [];

// Seleciona os elementos da página
const form = document.getElementById('form-produto');
const tabelaCorpo = document.getElementById('tabela-corpo');
const campoBusca = document.getElementById('busca');

// Formata números para o padrão de moeda brasileiro (R$)
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Salva no navegador e atualiza toda a interface
function atualizarSistema() {
  localStorage.setItem('meu_estoque', JSON.stringify(estoque));
  renderizarTabela(campoBusca.value);
  atualizarResumo();
}

// Cadastra um novo produto ao enviar o formulário
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const nome = document.getElementById('nome').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const preco = parseFloat(document.getElementById('preco').value);

  estoque.push({
    id: Date.now(),
    codigo,
    nome,
    quantidade,
    preco
  });

  form.reset();
  atualizarSistema();
});

// Aumenta (+1) ou diminui (-1) a quantidade de um produto
function alterarQtd(id, delta) {
  const produto = estoque.find(item => item.id === id);

  if (produto && produto.quantidade + delta >= 0) {
    produto.quantidade += delta;
    atualizarSistema();
  }
}

// Remove um produto da lista
function removerProduto(id) {
  if (confirm('Deseja realmente excluir este produto?')) {
    estoque = estoque.filter(item => item.id !== id);
    atualizarSistema();
  }
}

// Atualiza os 3 cards de resumo no topo
function atualizarResumo() {
  const totalItens = estoque.length;
  const totalQtd = estoque.reduce((soma, item) => soma + item.quantidade, 0);
  const totalValor = estoque.reduce((soma, item) => soma + (item.quantidade * item.preco), 0);

  document.getElementById('total-itens').textContent = totalItens;
  document.getElementById('total-qtd').textContent = totalQtd;
  document.getElementById('total-valor').textContent = formatarMoeda(totalValor);
}

// Monta as linhas da tabela aplicando o filtro de pesquisa
function renderizarTabela(filtro = '') {
  tabelaCorpo.innerHTML = '';
  const termo = filtro.toLowerCase();

  const filtrados = estoque.filter(item =>
    item.nome.toLowerCase().includes(termo) ||
    item.codigo.toLowerCase().includes(termo)
  );

  filtrados.forEach(item => {
    const subtotal = item.quantidade * item.preco;
    const estoqueBaixo = item.quantidade <= 5;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.codigo}</td>
      <td>${item.nome}</td>
      <td class="${estoqueBaixo ? 'baixo' : ''}">${item.quantidade} ${estoqueBaixo ? '⚠️' : ''}</td>
      <td>${formatarMoeda(item.preco)}</td>
      <td>${formatarMoeda(subtotal)}</td>
      <td>
        <button class="btn-acao btn-mais" onclick="alterarQtd(${item.id}, 1)">+1</button>
        <button class="btn-acao btn-menos" onclick="alterarQtd(${item.id}, -1)">-1</button>
        <button class="btn-acao btn-del" onclick="removerProduto(${item.id})">Excluir</button>
      </td>
    `;
    tabelaCorpo.appendChild(tr);
  });
}

// Filtra a tabela enquanto o usuário digita na busca
campoBusca.addEventListener('input', function (event) {
  renderizarTabela(event.target.value);
});

// Inicializa o sistema ao abrir a página
atualizarSistema();