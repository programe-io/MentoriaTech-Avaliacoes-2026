// Obtém referências dos elementos HTML
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productQuantityInput = document.getElementById('productQuantity');
const productPriceInput = document.getElementById('productPrice');
const inventoryTable = document.getElementById('inventoryTable');

// Inicializa a lista de produtos com o LocalStorage ou com um array vazio
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Função para renderizar/exibir a tabela na tela
function renderInventory() {
    inventoryTable.innerHTML = ''; // Limpa a tabela antes de renderizar novamente

    if (inventory.length === 0) {
        inventoryTable.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    inventory.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>#${index + 1}</td>
            <td>${product.name}</td>
            <td>R$ ${parseFloat(product.price).toFixed(2)}</td>
            <td><strong>${product.quantity}</strong></td>
            <td>
                <button class="btn-action btn-increase" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="btn-action btn-decrease" onclick="changeQuantity(${index}, -1)">-</button>
                <button class="btn-action btn-delete" onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;

        inventoryTable.appendChild(row);
    });
}

// Função para Adicionar um Novo Produto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = productNameInput.value.trim();
    const quantity = parseInt(productQuantityInput.value);
    const price = parseFloat(productPriceInput.value);

    if (name && !isNaN(quantity) && !isNaN(price)) {
        const newProduct = { name, quantity, price };
        
        inventory.push(newProduct); // Adiciona ao array
        updateStorage();            // Salva no localStorage
        renderInventory();          // Atualiza a tela

        // Limpa os campos do formulário
        productForm.reset();
        productNameInput.focus();
    }
});

// Função para Alterar a Quantidade (Aumentar / Diminuir)
function changeQuantity(index, amount) {
    if (inventory[index].quantity + amount >= 0) {
        inventory[index].quantity += amount;
        updateStorage();
        renderInventory();
    } else {
        alert("A quantidade não pode ser menor que zero!");
    }
}

// Função para Excluir um Produto
function deleteProduct(index) {
    if (confirm(`Tem certeza que deseja excluir "${inventory[index].name}"?`)) {
        inventory.splice(index, 1);
        updateStorage();
        renderInventory();
    }
}

// Função Auxiliar para salvar os dados no navegador
function updateStorage() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Carrega os produtos salvos ao abrir a página
renderInventory();