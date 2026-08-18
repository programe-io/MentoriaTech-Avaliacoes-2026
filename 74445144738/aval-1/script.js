let stock = [];
let nextId = 1;

// Elementos do DOM
const form = document.getElementById('stock-form');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const productQtyInput = document.getElementById('product-qty');
const productPriceInput = document.getElementById('product-price');
const tableBody = document.getElementById('stock-table-body');
const cancelBtn = document.getElementById('cancel-btn');

// Renderiza a lista na tabela
function renderTable() {
  tableBody.innerHTML = '';

  stock.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>R$ ${Number(item.price).toFixed(2)}</td>
      <td>
        <button class="btn-edit" onclick="editProduct(${item.id})">Editar</button>
        <button class="btn-delete" onclick="deleteProduct(${item.id})">Excluir</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Criar ou Atualizar produto
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = productIdInput.value;
  const name = productNameInput.value;
  const qty = parseInt(productQtyInput.value);
  const price = parseFloat(productPriceInput.value);

  if (id) {
    // Atualizar
    const index = stock.findIndex((p) => p.id == id);
    stock[index] = { id: Number(id), name, qty, price };
  } else {
    // Criar
    stock.push({ id: nextId++, name, qty, price });
  }

  resetForm();
  renderTable();
});

// Editar produto
function editProduct(id) {
  const product = stock.find((p) => p.id === id);
  if (product) {
    productIdInput.value = product.id;
    productNameInput.value = product.name;
    productQtyInput.value = product.qty;
    productPriceInput.value = product.price;

    cancelBtn.classList.remove('hidden');
  }
}

// Deletar produto
function deleteProduct(id) {
  stock = stock.filter((p) => p.id !== id);
  renderTable();
}

// Resetar formulário
function resetForm() {
  productIdInput.value = '';
  form.reset();
  cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);