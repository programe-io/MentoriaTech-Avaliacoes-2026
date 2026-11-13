// Elementos do DOM
const form = document.getElementById('product-form');
const formTitle = document.getElementById('form-title');
const idInput = document.getElementById('product-id');
const nameInput = document.getElementById('name');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');
const productList = document.getElementById('product-list');
const emptyMessage = document.getElementById('empty-message');
const searchInput = document.getElementById('search-input');
const totalStockValueEl = document.getElementById('total-stock-value');

// Carrega os produtos do LocalStorage ou inicia um array vazio
let products = JSON.parse(localStorage.getItem('estoque_produtos')) || [];

// Formata valores para Moeda Brasileira (R$)
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Salva no LocalStorage e atualiza a tela
function saveAndRender() {
    localStorage.setItem('estoque_produtos', JSON.stringify(products));
    renderTable(searchInput.value);
}

// READ: Renderiza a tabela de produtos
function renderTable(filter = '') {
    productList.innerHTML = '';
    let totalStockValue = 0;

    // Filtra os produtos caso haja texto na barra de pesquisa
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }

    filteredProducts.forEach((product) => {
        const subtotal = product.quantity * product.price;
        totalStockValue += subtotal;

        const tr = document.createElement('tr');
        
        // Destaca em vermelho se a quantidade for menor que 5
        const lowStockClass = product.quantity < 5 ? 'low-stock' : '';

        tr.innerHTML = `
            <td>#${product.id.toString().slice(-4)}</td>
            <td>${product.name}</td>
            <td class="${lowStockClass}">${product.quantity} un.</td>
            <td>${formatCurrency(product.price)}</td>
            <td><strong>${formatCurrency(subtotal)}</strong></td>
            <td>
                <button class="btn btn-edit" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn btn-delete" onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        `;

        productList.appendChild(tr);
    });

    // Atualiza o valor total do estoque exibido no topo
    totalStockValueEl.textContent = formatCurrency(totalStockValue);
}

// CREATE & UPDATE: Manipula o envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const id = idInput.value;
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceInput.value);

    if (id) {
        // UPDATE: Atualiza produto existente
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = { id: Number(id), name, quantity, price };
        }
        resetForm();
    } else {
        // CREATE: Cria novo produto usando timestamp como ID único
        const newProduct = {
            id: Date.now(),
            name,
            quantity,
            price
        };
        products.push(newProduct);
        form.reset();
    }

    saveAndRender();
});

// Prepara o formulário para edição
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    idInput.value = product.id;
    nameInput.value = product.name;
    quantityInput.value = product.quantity;
    priceInput.value = product.price;

    formTitle.textContent = 'Editar Produto';
    btnSave.textContent = 'Atualizar Produto';
    btnCancel.classList.remove('hidden');
    nameInput.focus();
}

// DELETE: Remove um produto
function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto do estoque?')) {
        products = products.filter(product => product.id !== id);
        
        // Se estava editando o item excluído, reseta o formulário
        if (idInput.value == id) {
            resetForm();
        }
        
        saveAndRender();
    }
}

// Cancela o modo de edição
function resetForm() {
    form.reset();
    idInput.value = '';
    formTitle.textContent = 'Adicionar Novo Produto';
    btnSave.textContent = 'Salvar Produto';
    btnCancel.classList.add('hidden');
}

btnCancel.addEventListener('click', resetForm);

// Evento de busca em tempo real
searchInput.addEventListener('input', (e) => {
    renderTable(e.target.value);
});

// Inicializa a tabela ao carregar a página
renderTable();