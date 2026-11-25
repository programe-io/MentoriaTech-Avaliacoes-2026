// Seleção de Elementos
const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');

// Carrega os produtos do localStorage ou inicia um array vazio
let products = JSON.parse(localStorage.getItem('ims_products')) || [];

// Função para salvar no localStorage e atualizar a tela
function saveAndRender() {
    localStorage.setItem('ims_products', JSON.stringify(products));
    renderProducts(products);
}

// Renderiza os produtos na tabela
function renderProducts(productsToRender) {
    productList.innerHTML = '';

    if (productsToRender.length === 0) {
        productList.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #888;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    productsToRender.forEach((product) => {
        const totalValue = (product.quantity * product.price).toFixed(2);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${product.name}</strong></td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>R$ ${Number(product.price).toFixed(2)}</td>
            <td>R$ ${totalValue}</td>
            <td>
                <button class="btn-action btn-add" onclick="changeQuantity(${product.id}, 1)">+1</button>
                <button class="btn-action btn-sub" onclick="changeQuantity(${product.id}, -1)">-1</button>
                <button class="btn-action btn-del" onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        `;
        productList.appendChild(tr);
    });
}

// Adicionar novo produto via formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        id: Date.now(), // ID único baseado no timestamp atual
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    };

    products.push(newProduct);
    saveAndRender();
    form.reset();
});

// Alterar quantidade (+1 ou -1)
function changeQuantity(id, amount) {
    products = products.map(product => {
        if (product.id === id) {
            const newQty = product.quantity + amount;
            product.quantity = newQty >= 0 ? newQty : 0; // Evita quantidade negativa
        }
        return product;
    });
    saveAndRender();
}

// Deletar produto
function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        products = products.filter(product => product.id !== id);
        saveAndRender();
    }
}

// Funcionalidade de Busca
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
    );
    renderProducts(filtered);
});

// Executa a renderização inicial ao carregar a página
renderProducts(products);