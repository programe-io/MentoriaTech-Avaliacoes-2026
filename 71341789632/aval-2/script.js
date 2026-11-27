
// Elementos
const productForm = document.getElementById("productForm");
const saleForm = document.getElementById("saleForm");

const productTable = document.getElementById("productTable");
const salesTable = document.getElementById("salesTable");
const saleProduct = document.getElementById("saleProduct");

const saleMessage = document.getElementById("saleMessage");

// Dados salvos no navegador
let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

// Formatação monetária
function formatMoney(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar dados
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("sales", JSON.stringify(sales));
}

// Cadastrar produto
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const stock = Number(document.getElementById("productStock").value);

    if (!name || !Number.isFinite(price) || price <= 0 ||
        !Number.isSafeInteger(stock) || stock < 0) {
        alert("Informe dados válidos para o produto.");
        return;
    }

    const product = {
        id: Date.now() + Math.random(),
        name: name,
        price: price,
        stock: stock
    };

    products.push(product);

    saveData();
    renderAll();

    productForm.reset();

    alert("Produto cadastrado com sucesso!");
});

// Excluir produto
function deleteProduct(id) {
    const hasSales = sales.some(sale => sale.productId === id);

    if (hasSales) {
        alert("Este produto possui vendas registradas e não pode ser excluído.");
        return;
    }

    if (!confirm("Deseja realmente excluir este produto?")) {
        return;
    }

    products = products.filter(product => product.id !== id);

    saveData();
    renderAll();
}

// Atualizar lista de produtos
function renderProducts() {
    productTable.innerHTML = "";
    saleProduct.innerHTML = '<option value="">Selecione um produto</option>';

    products.forEach(product => {
        const row = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = product.name;

        const price = document.createElement("td");
        price.textContent = formatMoney(product.price);

        const stock = document.createElement("td");
        stock.textContent = product.stock;

        const action = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "Excluir";
        button.className = "delete-btn";
        button.addEventListener("click", () => {
            deleteProduct(product.id);
        });

        action.appendChild(button);

        row.append(name, price, stock, action);
        productTable.appendChild(row);

        if (product.stock > 0) {
            const option = document.createElement("option");
            option.value = String(product.id);
            option.textContent = `${product.name} - ${formatMoney(product.price)} (Estoque: ${product.stock})`;

            saleProduct.appendChild(option);
        }
    });
}

// Registrar venda
saleForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const productId = Number(saleProduct.value);
    const quantity = Number(document.getElementById("saleQuantity").value);

    const product = products.find(item => item.id === productId);

    if (!product) {
        showMessage("Selecione um produto válido.", "error");
        return;
    }

    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        showMessage("Informe uma quantidade válida.", "error");
        return;
    }

    if (quantity > product.stock) {
        showMessage("Estoque insuficiente!", "error");
        return;
    }

    const total = product.price * quantity;

    if (!Number.isFinite(total)) {
        showMessage("Não foi possível calcular o valor da venda.", "error");
        return;
    }

    // Atualizar estoque
    product.stock -= quantity;

    // Registrar venda
    const sale = {
        id: Date.now() + Math.random(),
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        total: total,
        date: new Date().toLocaleString("pt-BR")
    };

    sales.push(sale);

    saveData();
    renderAll();

    saleForm.reset();

    showMessage(
        `Venda realizada com sucesso! Total: ${formatMoney(total)}`,
        "success"
    );
});

// Mensagens
function showMessage(message, type) {
    saleMessage.textContent = message;
    saleMessage.className = type;
}

// Histórico de vendas
function renderSales() {
    salesTable.innerHTML = "";

    sales.slice().reverse().forEach(sale => {
        const row = document.createElement("tr");

        const date = document.createElement("td");
        date.textContent = sale.date;

        const name = document.createElement("td");
        name.textContent = sale.productName;

        const quantity = document.createElement("td");
        quantity.textContent = sale.quantity;

        const total = document.createElement("td");
        total.textContent = formatMoney(sale.total);

        row.append(date, name, quantity, total);
        salesTable.appendChild(row);
    });
}

// Atualizar dashboard
function renderDashboard() {
    const revenue = sales.reduce((sum, sale) => sum + sale.total, 0);

    const stock = products.reduce(
        (sum, product) => sum + product.stock, 0
    );

    document.getElementById("totalRevenue").textContent =
        formatMoney(revenue);

    document.getElementById("totalSales").textContent =
        sales.length;

    document.getElementById("totalProducts").textContent =
        products.length;

    document.getElementById("totalStock").textContent =
        stock;
}

// Atualizar tudo
function renderAll() {
    renderProducts();
    renderSales();
    renderDashboard();
}

// Data atual
document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("pt-BR");

// Inicializar sistema
renderAll();

