// Array que funcionará como a base de dados do stock em memória
let stock = [];

// Seleção de elementos do DOM
const productForm = document.getElementById('productForm');
const inventoryTable = document.getElementById('inventoryTable');

// 1. FUNÇÃO PARA CADASTRAR PRODUTO
productForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    const code = document.getElementById('code').value.trim();
    const description = document.getElementById('description').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    // Validação para evitar códigos duplicados
    const productExists = stock.some(product => product.code.toLowerCase() === code.toLowerCase());
    
    if (productExists) {
        alert('Erro: Já existe um produto registado com este código!');
        return;
    }

    // Cria o objeto do novo produto e adiciona ao array
    const newProduct = { code, description, quantity, price };
    stock.push(newProduct);

    // Limpa o formulário e atualiza o ecrã
    productForm.reset();
    updateTable();
});

// 2. FUNÇÃO PARA LISTAR OS PRODUTOS (Atualizar Interface)
function updateTable() {
    inventoryTable.innerHTML = ''; // Limpa a tabela antes de redesenhar

    stock.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><strong>${product.code}</strong></td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>${product.price.toFixed(2)} €</td>
            <td>
                <button class="btn-action" onclick="changeQuantity(${index})">Alt. Qtd</button>
                <button class="btn-action" onclick="changePrice(${index})">Alt. Valor</button>
            </td>
        `;

        inventoryTable.appendChild(row);
    });
}

// 3. FUNÇÃO PARA ALTERAR A QUANTIDADE
function changeQuantity(index) {
    const product = stock[index];
    const newQuantityInput = prompt(`Alterar quantidade de [ ${product.description} ]. Atual: ${product.quantity}`, product.quantity);
    
    if (newQuantityInput === null) return; // Se o utilizador clicar em Cancelar

    const newQuantity = parseInt(newQuantityInput);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
        stock[index].quantity = newQuantity;
        updateTable();
    } else {
        alert('Quantidade inválida! Insira um número inteiro igual ou superior a 0.');
    }
}

// 4. FUNÇÃO PARA ALTERAR O VALOR
function changePrice(index) {
    const product = stock[index];
    const newPriceInput = prompt(`Alterar valor de [ ${product.description} ]. Atual: ${product.price.toFixed(2)} €`, product.price);
    
    if (newPriceInput === null) return; // Se o utilizador clicar em Cancelar

    const newPrice = parseFloat(newPriceInput);

    if (!isNaN(newPrice) && newPrice >= 0) {
        stock[index].price = newPrice;
        updateTable();
    } else {
        alert('Valor inválido! Insira um número válido igual ou superior a 0.');
    }
}
