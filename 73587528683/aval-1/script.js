// Dados Iniciais (Simulação de Estoque com LocalStorage)
let inventory = JSON.parse(localStorage.getItem('stock_inventory')) || [
  { id: '1', code: 'ELE001', name: 'Notebook Dell Inspiron', category: 'Eletrônicos', quantity: 8, price: 3500.00, minQuantity: 3 },
  { id: '2', code: 'ELE002', name: 'Mouse Sem Fio Logitech', category: 'Eletrônicos', quantity: 2, price: 89.90, minQuantity: 5 },
  { id: '3', code: 'MVE001', name: 'Cadeira Ergonômica', category: 'Móveis', quantity: 12, price: 750.00, minQuantity: 4 }
];

// Elementos do DOM
const tableBody = document.getElementById('inventoryTableBody');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const totalItemsEl = document.getElementById('totalItems');
const totalValueEl = document.getElementById('totalValue');
const lowStockCountEl = document.getElementById('lowStockCount');

const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.getElementById('productForm');

const btnOpenAddModal = document.getElementById('btnOpenAddModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  initLucideIcons();
});

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Salva os dados no LocalStorage
function saveData() {
  localStorage.setItem('stock_inventory', JSON.stringify(inventory));
}

// Renderização Principal
function renderApp() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  // Filtragem dos Dados
  const filteredData = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                          item.code.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Atualizar Categorias no Filtro Select
  updateCategoryDropdown();

  // Atualizar Cards Métricos
  calculateMetrics();

  // Renderizar Tabela
  renderTable(filteredData);
}

// Atualiza o dropdown de categorias dinamicamente
function updateCategoryDropdown() {
  const categories = [...new Set(inventory.map(item => item.category))];
  const currentValue = categoryFilter.value;

  categoryFilter.innerHTML = '<option value="all">Todas as Categorias</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === currentValue) option.selected = true;
    categoryFilter.appendChild(option);
  });
}

// Cálculo das Métricas Gerais
function calculateMetrics() {
  const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = inventory.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const lowStock = inventory.filter(item => item.quantity <= item.minQuantity).length;

  totalItemsEl.textContent = totalItems;
  totalValueEl.textContent = totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  lowStockCountEl.textContent = lowStock;
}

// Desenha a tabela com os produtos
function renderTable(data) {
  tableBody.innerHTML = '';

  if (data.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  data.forEach(item => {
    const isLowStock = item.quantity <= item.minQuantity;
    const row = document.createElement('tr');
    row.className = `hover:bg-gray-50/80 transition-colors ${isLowStock ? 'low-stock' : ''}`;

    row.innerHTML = `
      <td class="py-4 px-6 font-mono text-xs text-gray-500">${item.code}</td>
      <td class="py-4 px-6">
        <div class="font-medium text-gray-900">${item.name}</div>
        ${isLowStock ? '<span class="inline-flex items-center text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full mt-1">Estoque Baixo</span>' : ''}
      </td>
      <td class="py-4 px-6 text-gray-500">${item.category}</td>
      <td class="py-4 px-6 text-center font-semibold ${isLowStock ? 'text-amber-600' : 'text-gray-700'}">${item.quantity}</td>
      <td class="py-4 px-6 text-right text-gray-600">${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td class="py-4 px-6 text-right font-medium text-gray-900">${(item.quantity * item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td class="py-4 px-6 text-center">
        <div class="flex items-center justify-center gap-2">
          <button onclick="editProduct('${item.id}')" class="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Editar">
            <i data-lucide="edit-2" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteProduct('${item.id}')" class="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Excluir">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });

  initLucideIcons();
}

// Manipulação do Modal (Abrir/Fechar)
function openModal(isEdit = false) {
  modalTitle.textContent = isEdit ? 'Editar Produto' : 'Cadastrar Novo Produto';
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95');
  }, 10);
}

function closeModal() {
  modal.classList.add('opacity-0');
  modalContent.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
    productForm.reset();
    document.getElementById('productId').value = '';
  }, 250);
}

// Cadastro / Atualização de Produtos
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value.trim();
  const code = document.getElementById('productCode').value.trim();
  const category = document.getElementById('productCategory').value.trim();
  const quantity = parseInt(document.getElementById('productQuantity').value, 10);
  const price = parseFloat(document.getElementById('productPrice').value);
  const minQuantity = parseInt(document.getElementById('minQuantity').value, 10);

  if (id) {
    // Modo Edição
    const index = inventory.findIndex(item => item.id === id);
    if (index !== -1) {
      inventory[index] = { id, code, name, category, quantity, price, minQuantity };
    }
  } else {
    // Modo Novo Cadastro
    const newProduct = {
      id: Date.now().toString(),
      code,
      name,
      category,
      quantity,
      price,
      minQuantity
    };
    inventory.push(newProduct);
  }

  saveData();
  renderApp();
  closeModal();
});

// Editar Produto
window.editProduct = function(id) {
  const item = inventory.find(prod => prod.id === id);
  if (!item) return;

  document.getElementById('productId').value = item.id;
  document.getElementById('productName').value = item.name;
  document.getElementById('productCode').value = item.code;
  document.getElementById('productCategory').value = item.category;
  document.getElementById('productQuantity').value = item.quantity;
  document.getElementById('productPrice').value = item.price;
  document.getElementById('minQuantity').value = item.minQuantity;

  openModal(true);
};

// Excluir Produto
window.deleteProduct = function(id) {
  if (confirm('Tem certeza de que deseja excluir este produto do estoque?')) {
    inventory = inventory.filter(item => item.id !== id);
    saveData();
    renderApp();
  }
};

// Event Listeners Adicionais
btnOpenAddModal.addEventListener('click', () => openModal(false));
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);
searchInput.addEventListener('input', renderApp);
categoryFilter.addEventListener('change', renderApp);