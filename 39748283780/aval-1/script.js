// Array que armazenará os produtos (Carrega do LocalStorage se existir)
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Elementos do DOM
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// Função para salvar dados no LocalStorage do navegador
function saveToStorage() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

// CADASTRAR PRODUTO
productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturando valores dos inputs
    const code = document.getElementById('code').value.trim();
    const description = document.getElementById('description').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    // Validação: Impede códigos duplicados
    const codeExists = inventory.some(product => product.code.toLowerCase() === code.toLowerCase());
    if (codeExists) {
        alert('Erro: Já existe um produto cadastrado com este código!');
        return;
    }

    // Criando o objeto do novo produto
    const newProduct = {
        code,
        description,
        quantity,
        price
    };

    // Adicionando ao array do estoque
    inventory.push(newProduct);
    
    // Atualizando interface e armazenamento
    saveToStorage();
    renderInventory();
    
    // Limpando o formulário
    productForm.reset();
});

// ALTERAR QUANTIDADE
function updateQuantity(code, newQuantity) {
    const product = inventory.find(p => p.code === code);
    if (product) {
        product.quantity = parseInt(newQuantity) || 0;
        saveToStorage();
    }
}

// ALTERAR VALOR
function updatePrice(code, newPrice) {
    const product = inventory.find(p => p.code === code);
    if (product) {
        product.price = parseFloat(newPrice) || 0;
        saveToStorage();
    }
}

// EXCLUIR PRODUTO (Ação extra útil)
function deleteProduct(code) {
    inventory = inventory.filter(p => p.code !== code);
    saveToStorage();
    renderInventory();
}

// LISTAR PRODUTOS (Renderizar na tela)
function renderInventory() {
    productList.innerHTML = '';

    if (inventory.length === 0) {
        productList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    inventory.forEach(product => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><strong>${product.code}</strong></td>
            <td>${product.description}</td>
            <td>
                <input type="number" class="edit-input" min="0" value="${product.quantity}" 
                    onchange="updateQuantity('${product.code}', this.value)">
            </td>
            <td>
                <input type="number" class="edit-input" min="0" step="0.01" value="${product.price.toFixed(2)}" 
                    onchange="updatePrice('${product.code}', this.value)">
            </td>
            <td>
                <button class="btn-action" onclick="deleteProduct('${product.code}')">Remover</button>
            </td>
        `;

        productList.appendChild(tr);
    });
}

// Inicializa a tabela ao carregar a página
renderInventory();
