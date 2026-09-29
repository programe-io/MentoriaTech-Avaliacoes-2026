let products = [
  { code: 'P001', desc: 'Caneta Gel Amarela Fofinha', qty: 15, price: 6.50 \},
  { code: 'P002', desc: 'Bloco de Notas Girassol', qty: 8, price: 12.00 \},
  { code: 'P003', desc: 'Caneca Ceramica Urso Mel', qty: 5, price: 34.90 \}
];

let currentEditCode = null;

// Elementos DOM
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

// Stats
const statTotalItems = document.getElementById('statTotalItems');
const statTotalQty = document.getElementById('statTotalQty');
const statTotalValue = document.getElementById('statTotalValue');

// Modal
const editModal = document.getElementById('editModal');
const modalProdDesc = document.getElementById('modalProdDesc');
const editQty = document.getElementById('editQty');
const editPrice = document.getElementById('editPrice');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const saveModalBtn = document.getElementById('saveModalBtn');

// Toast
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');

// ------------------------------------------------------------------
// 2. FUNÇÕES DE RENDERIZAÇÃO E ATUALIZAÇÃO
// ------------------------------------------------------------------

// Renderiza a tabela de produtos
function renderProducts(filterText = '') {
  productList.innerHTML = '';

  const filtered = products.filter(p => 
    p.code.toLowerCase().includes(filterText.toLowerCase()) || 
    p.desc.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
  \} else {
    emptyState.classList.add('hidden');

    filtered.forEach(product => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-yellow-50/80 transition-colors group';
      tr.innerHTML = `
        <td class="py-3 px-2 font-bold text-amber-800">
          <span class="bg-yellow-100 text-amber-900 px-2 py-1 rounded-lg text-xs font-mono border border-yellow-200">
            \${product.code\}
          </span>
        </td>
        <td class="py-3 px-2 font-semibold text-amber-950">\${product.desc\}</td>
        <td class="py-3 px-2 text-center">
          <div class="inline-flex items-center gap-1.5 bg-white border border-yellow-200 rounded-xl px-2 py-1 shadow-sm">
            <button onclick="quickUpdateQty('\${product.code\}', -1)" class="w-5 h-5 flex items-center justify-center rounded-lg bg-yellow-100 hover:bg-yellow-200 text-amber-900 font-bold text-xs transition">-</button>
            <span class="font-bold text-amber-900 min-w-[20px] text-center">\${product.qty\}</span>
            <button onclick="quickUpdateQty('\${product.code\}', 1)" class="w-5 h-5 flex items-center justify-center rounded-lg bg-yellow-100 hover:bg-yellow-200 text-amber-900 font-bold text-xs transition">+</button>
          </div>
        </td>
        <td class="py-3 px-2 text-right font-bold text-amber-900">
          R\$ \${product.price.toFixed(2).replace('.', ',')\}
        </td>
        <td class="py-3 px-2 text-center">
          <div class="flex items-center justify-center gap-1">
            <button onclick="openEditModal('\${product.code\}')" title="Editar Valor ou Quantidade" class="p-2 hover:bg-yellow-200 rounded-xl text-amber-800 transition">
              <i data-lucide="pencil" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteProduct('\${product.code\}')" title="Remover Produto" class="p-2 hover:bg-red-100 rounded-xl text-red-500 transition">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      `;
      productList.appendChild(tr);
    \});
  \}

  if (window.lucide) {
    lucide.createIcons();
  \}
  updateStats();
\}

// Atualiza os cartões de resumo
function updateStats() {
  const totalItems = products.length;
  const totalQty = products.reduce((acc, curr) => acc + curr.qty, 0);
  const totalVal = products.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);

  statTotalItems.textContent = totalItems;
  statTotalQty.textContent = totalQty;
  statTotalValue.textContent = `R\$ \${totalVal.toFixed(2).replace('.', ',')\}`;
\}

// Exibe notificação flutuante (Toast)
function showToast(msg, icon = '✨') {
  toastMsg.textContent = msg;
  toastIcon.textContent = icon;
  toast.classList.remove('translate-y-20', 'opacity-0');
  
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  \}, 3000);
\}

// ------------------------------------------------------------------
// 3. AÇÕES DO SISTEMA (CADASTRAR, EDITAR, EXCLUIR)
// ------------------------------------------------------------------

// [1] CADASTRAR NOVO PRODUTO
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const code = document.getElementById('pCode').value.trim().toUpperCase();
  const desc = document.getElementById('pDesc').value.trim();
  const qty = parseInt(document.getElementById('pQty').value, 10);
  const price = parseFloat(document.getElementById('pPrice').value);

  // Validação de código duplicado
  if (products.some(p => p.code === code)) {
    showToast('Código de produto já cadastrado!', '⚠️');
    return;
  \}

  products.push({ code, desc, qty, price \});
  
  productForm.reset();
  renderProducts(searchInput.value);
  showToast('Produto cadastrado com sucesso! 💛', '🌻');
\});

// [2] ALTERAÇÃO RÁPIDA DE QUANTIDADE (+1 / -1)
window.quickUpdateQty = function(code, change) {
  const prod = products.find(p => p.code === code);
  if (prod) {
    const newQty = prod.qty + change;
    if (newQty < 0) {
      showToast('A quantidade não pode ser negativa!', '⚠️️');
      return;
    \}
    prod.qty = newQty;
    renderProducts(searchInput.value);
    showToast(`Quantidade de "\${prod.desc\}" atualizada!`, '📦');
  \}
\};

// [3 & 4] ALTERAR VALOR E QUANTIDADE VIA MODAL
window.openEditModal = function(code) {
  const prod = products.find(p => p.code === code);
  if (!prod) return;

  currentEditCode = code;
  modalProdDesc.textContent = `[\${prod.code\}] \${prod.desc\}`;
  editQty.value = prod.qty;
  editPrice.value = prod.price;

  editModal.classList.remove('hidden');
  editModal.classList.add('flex');
  
  setTimeout(() => {
    const card = editModal.querySelector('.modal-card');
    card.classList.remove('scale-95', 'opacity-0');
    card.classList.add('scale-100', 'opacity-100');
  \}, 10);
\};

function closeModal() {
  const card = editModal.querySelector('.modal-card');
  card.classList.remove('scale-100', 'opacity-100');
  card.classList.add('scale-95', 'opacity-0');
  
  setTimeout(() => {
    editModal.classList.add('hidden');
    editModal.classList.remove('flex');
    currentEditCode = null;
  \}, 150);
\}

saveModalBtn.addEventListener('click', () => {
  if (!currentEditCode) return;

  const prod = products.find(p => p.code === currentEditCode);
  const newQty = parseInt(editQty.value, 10);
  const newPrice = parseFloat(editPrice.value);

  if (isNaN(newQty) || newQty < 0) {
    showToast('Por favor, informe uma quantidade válida!', '⚠️');
    return;
  \}

  if (isNaN(newPrice) || newPrice < 0) {
    showToast('Por favor, informe um valor válido!', '⚠️');
    return;
  \}

  prod.qty = newQty;
  prod.price = newPrice;

  closeModal();
  renderProducts(searchInput.value);
  showToast('Produto alterado com sucesso! ✨', '🎉');
\});

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

// REMOVER PRODUTO
window.deleteProduct = function(code) {
  const prod = products.find(p => p.code === code);
  if (confirm(`Tem certeza que deseja remover "\${prod.desc\}" do estoque?`)) {
    products = products.filter(p => p.code !== code);
    renderProducts(searchInput.value);
    showToast('Produto removido!', '🗑️');
  \}
\};

// BUSCA / FILTRO EM TEMPO REAL
searchInput.addEventListener('input', (e) => {
  renderProducts(e.target.value);
\});

// Inicializa os dados na tela
renderProducts();$0