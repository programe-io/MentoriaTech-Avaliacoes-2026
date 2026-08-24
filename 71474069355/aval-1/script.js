let produtos = [];

const form = document.getElementById('product-form');
const tableBody = document.getElementById('table-body');
const emptyState = document.getElementById('empty-state');

const totalItensEl = document.getElementById('total-itens');
const totalUnidadesEl = document.getElementById('total-unidades');
const valorTotalEl = document.getElementById('valor-total');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value;
  const descricao = document.getElementById('descricao').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const valor = parseFloat(document.getElementById('valor').value);

  const produto = {
    codigo,
    descricao,
    quantidade,
    valor,
    subtotal: quantidade * valor
  };

  produtos.push(produto);
  form.reset();
  atualizarInterface();
});

function atualizarInterface() {
  // Atualiza Tabela
  tableBody.innerHTML = '';
  
  if (produtos.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';

    produtos.forEach((prod, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${prod.codigo}</td>
        <td>${prod.descricao}</td>
        <td>${prod.quantidade}</td>
        <td>R$ ${prod.valor.toFixed(2)}</td>
        <td>R$ ${prod.subtotal.toFixed(2)}</td>
        <td><button onclick="removerProduto(${index})" style="background: red; padding: 4px 8px;">X</button></td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Atualiza Resumo
  const totalItens = produtos.length;
  const totalUnidades = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const valorTotal = produtos.reduce((acc, p) => acc + p.subtotal, 0);

  totalItensEl.textContent = totalItens;
  totalUnidadesEl.textContent = totalUnidades;
  valorTotalEl.textContent = `R$ ${valorTotal.toFixed(2)}`;
}

function removerProduto(index) {
  produtos.splice(index, 1);
  atualizarInterface();
}