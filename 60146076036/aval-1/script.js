// Array principal para armazenar os produtos
let inventory = JSON.parse(localStorage.getItem('inventory_data')) || [];

// Elementos do DOM
const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const nameInput = document.getElementById('name');
const categoryInput = document.getElementById('category');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');

const tableBody = document.getElementById('inventory-table-body');
const searchInput = document.getElementById('search');

// KPIs
const totalProductsEl = document.getElementById('total-produtos');
const totalItemsEl = document.getElementById('total-itens');
const totalValueEl = document.getElementById('valor-total');

// --- EVENTOS ---
document.addEventListener('DOMContentLoaded', renderApp);
productForm.addEventListener('submit', handleFormSubmit);
btnCancel.addEventListener('click', resetForm);
searchInput.addEventListener('input', renderTable);

// --- FUNÇÕES PRINCIPAIS ---

function handleFormSubmit(e) {
  e.preventDefault();

  const id = productIdInput.value;
  const name = nameInput.value.trim();
  const category = categoryInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const price = parseFloat(priceInput.value);

  if (id) {
    // Editar produto existente
    const index = inventory.findIndex(item => item.id === id);
    if (index !== -1) {
      inventory[index] = { id, name, category, quantity, price };
    }
  } else {
    // Criar novo produto
    const newProduct = {
      id: Date.now().toString(),
      name,
      category,
      quantity,
      price
    };
    inventory.push(newProduct);
  }

  saveToLocalStorage();
  resetForm();
  renderApp();
}

function renderApp() {
  renderTable();
  updateKPIs();
}

function renderTable() {
  const searchTerm = searchInput.value.toLowerCase();
  tableBody.innerHTML = '';

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm)
  );

  if (filteredInventory.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: #888;">Nenhum produto encontrado.</td>
      </tr>
    `;
    return;
  }

  filteredInventory.forEach(item => {
    const subtotal = item.quantity * item.price;
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td class="${item.quantity < 5 ? 'low-stock' : ''}">
        ${item.quantity} ${item.quantity < 5 ? '⚠️' : ''}
      </td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>R$ ${subtotal.toFixed(2)}</td>
      <td class="actions-cell">
        <button class="btn-sm btn-qty" onclick="changeQuantity('${item.id}', 1)" title="Adicionar 1">+</button>
        <button class="btn-sm btn-qty" onclick="changeQuantity('${item.id}', -1)" title="Remover 1">-</button>
        <button class="btn-sm btn-edit" onclick="editProduct('${item.id}')">Editar</button>
        <button class="btn-sm btn-delete" onclick="deleteProduct('${item.id}')">Excluir</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function changeQuantity(id, amount) {
  const product = inventory.find(item => item.id === id);
  if (product) {
    if (product.quantity + amount < 0) return; // Não aceita estoque negativo
    product.quantity += amount;
    saveToLocalStorage();
    renderApp();
  }
}

function editProduct(id) {
  const product = inventory.find(item => item.id === id);
  if (product) {
    productIdInput.value = product.id;
    nameInput.value = product.name;
    categoryInput.value = product.category;
    quantityInput.value = product.quantity;
    priceInput.value = product.price;

    btnSave.textContent = 'Atualizar Produto';
    btnCancel.style.display = 'block';
  }
}

function deleteProduct(id) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    inventory = inventory.filter(item => item.id !== id);
    saveToLocalStorage();
    renderApp();
  }
}

function resetForm() {
  productIdInput.value = '';
  productForm.reset();
  btnSave.textContent = 'Cadastrar Produto';
  btnCancel.style.display = 'none';
}

function updateKPIs() {
  const totalProducts = inventory.length;
  const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = inventory.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  totalProductsEl.textContent = totalProducts;
  totalItemsEl.textContent = totalItems;
  totalValueEl.textContent = `R$ ${totalValue.toFixed(2)}`;
}

function saveToLocalStorage() {
  localStorage.setItem('inventory_data', JSON.stringify(inventory));
}