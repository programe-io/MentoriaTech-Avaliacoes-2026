let products = JSON.parse(localStorage.getItem('stock_products')) || [];

const form = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const nameInput = document.getElementById('name');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const tableBody = document.getElementById('product-table-body');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('save-btn');

function saveToLocalStorage() {
    localStorage.setItem('stock_products', JSON.stringify(products));
\}

function renderTable() {
    tableBody.innerHTML = '';
    
    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-light);">Nenhum produto cadastrado.</td></tr>`;
        return;
    \}

    products.forEach((product) => {
        const total = product.quantity * product.price;
        const isLow = product.quantity < 5;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>\${escapeHtml(product.name)\}</td>
            <td>\${product.quantity\}</td>
            <td>R\$ \${Number(product.price).toFixed(2)\}</td>
            <td>R\$ \${total.toFixed(2)\}</td>
            <td><span class="badge \${isLow ? 'badge-low' : 'badge-ok'\}">\${isLow ? 'Baixo Estoque' : 'Normal'\}</span></td>
            <td class="actions">
                <button onclick="editProduct('\${product.id\}')">Editar</button>
                <button class="btn-danger" onclick="deleteProduct('\${product.id\}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(tr);
    \});
\}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = productIdInput.value;
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);

    if (id) {
        // Edição
        products = products.map(p => p.id === id ? { id, name, quantity, price \} : p);
    \} else {
        // Criação
        const newProduct = {
            id: Date.now().toString(),
            name,
            quantity,
            price
        \};
        products.push(newProduct);
    \}

    saveToLocalStorage();
    renderTable();
    resetForm();
\});

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        productIdInput.value = product.id;
        nameInput.value = product.name;
        quantityInput.value = product.quantity;
        priceInput.value = product.price;
        
        formTitle.textContent = "Editar Produto";
        saveBtn.textContent = "Atualizar Produto";
        window.scrollTo({ top: 0, behavior: 'smooth' \});
    \}
\}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        saveToLocalStorage();
        renderTable();
    \}
\}

function resetForm() {
    form.reset();
    productIdInput.value = '';
    formTitle.textContent = "Adicionar Novo Produto";
    saveBtn.textContent = "Salvar Produto";
\}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' \};
    return text.replace(/[&<>"']/g, m => map[m]);
\}

// Inicialização
renderTable();$0