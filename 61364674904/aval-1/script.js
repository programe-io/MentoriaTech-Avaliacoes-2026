// Array para armazenar os produtos (carrega do localStorage se houver)
let products = JSON.parse(localStorage.getItem('stock_products')) || [];

const productForm = document.getElementById('productForm');
const productTableBody = document.getElementById('productTableBody');
const totalItemsEl = document.getElementById('totalItems');
const totalStockEl = document.getElementById('totalStock');
const totalValueEl = document.getElementById('totalValue');

// Função para salvar no LocalStorage e atualizar a tela
function saveAndRender() {
    localStorage.setItem('stock_products', JSON.stringify(products));
    renderTable();
    updateStats();
}

// Adicionar novo produto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    const newProduct = {
        id: Date.now(),
        name,
        quantity,
        price
    };

    products.push(newProduct);
    saveAndRender();
    productForm.reset();
    document.getElementById('name').focus();
});

// Deletar produto
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    saveAndRender();
}

// Renderizar Tabela
function renderTable() {
    productTableBody.innerHTML = '';

    if (products.length === 0) {
        productTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">Nenhum produto cadastrado no estoque.</td>
            </tr>
        `;
        return;
    }

    products.forEach(product => {
        const totalItemPrice = product.quantity * product.price;
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><strong>${product.name}</strong></td>
            <td>${product.quantity} un</td>
            <td>R$ ${product.price.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${totalItemPrice.toFixed(2).replace('.', ',')}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fa-solid fa-trash"></i> Excluir
                </button>
            </td>
        `;

        productTableBody.appendChild(tr);
    });
}

// Atualizar Estatísticas do Topo
function updateStats() {
    const totalItems = products.length;
    const totalStock = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalValue = products.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

    totalItemsEl.textContent = totalItems;
    totalStockEl.textContent = totalStock;
    totalValueEl.textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
}

// Executar carregamento inicial ao abrir a página
renderTable();
updateStats();