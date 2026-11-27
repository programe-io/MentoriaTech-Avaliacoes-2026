
const productForm = document.getElementById("productForm");
const saleForm = document.getElementById("saleForm");

const productTable = document.getElementById("productTable");
const salesTable = document.getElementById("salesTable");

const saleProduct = document.getElementById("saleProduct");
const searchProduct = document.getElementById("searchProduct");

const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productQuantity = document.getElementById("productQuantity");

const saveProduct = document.getElementById("saveProduct");
const cancelEdit = document.getElementById("cancelEdit");

// Dados armazenados no navegador
let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

// Salvar dados
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("sales", JSON.stringify(sales));
}

// Formatar moeda
function formatMoney(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Formatar data
function formatDate(date) {
    return new Date(date).toLocaleString("pt-BR");
}

// Cadastro e edição de produtos
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = productName.value.trim();
    const price = Number(productPrice.value);
    const quantity = Number(productQuantity.value);

    if (
        !name ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(quantity) ||
        quantity < 0
    ) {
        alert("Preencha os dados corretamente.");
        return;
    }

    const id = productId.value;

    if (id) {
        const product = products.find(p => p.id === Number(id));

        if (!product) return;

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        alert("Produto atualizado com sucesso!");

    } else {
        const product = {
            id: Date.now(),
            name,
            price,
            quantity
        };

        products.push(product);

        alert("Produto cadastrado com sucesso!");
    }

    saveData();
    productForm.reset();
    resetEdit();

    renderAll();
});

// Editar produto
function editProduct(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    productId.value = product.id;
    productName.value = product.name;
    productPrice.value = product.price;
    productQuantity.value = product.quantity;

    saveProduct.textContent = "Salvar Alterações";
    cancelEdit.hidden = false;

    document.getElementById("produtos").scrollIntoView({
        behavior: "smooth"
    });
}

// Cancelar edição
function resetEdit() {
    productId.value = "";
    saveProduct.textContent = "Cadastrar Produto";
    cancelEdit.hidden = true;
}

cancelEdit.addEventListener("click", () => {
    productForm.reset();
    resetEdit();
});

// Excluir produto
function deleteProduct(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    if (sales.some(sale => sale.productId === id)) {
        alert("Este produto possui vendas registradas e não pode ser excluído.");
        return;
    }

    if (confirm("Deseja realmente excluir este produto?")) {
        products = products.filter(p => p.id !== id);

        saveData();
        renderAll();
    }
}

// Renderizar produtos
function renderProducts() {
    productTable.innerHTML = "";

    const search = searchProduct.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    if (filteredProducts.length === 0) {
        productTable.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const tr = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = product.name;

        const price = document.createElement("td");
        price.textContent = formatMoney(product.price);

        const quantity = document.createElement("td");
        quantity.textContent = product.quantity;

        const actions = document.createElement("td");
        const buttons = document.createElement("div");
        buttons.className = "action-buttons";

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", () => {
            editProduct(product.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });

        buttons.append(editButton, deleteButton);
        actions.appendChild(buttons);

        tr.append(name, price, quantity, actions);
        productTable.appendChild(tr);
    });
}

// Atualizar opções de produtos para venda
function renderSaleOptions() {
    saleProduct.innerHTML = `
        <option value="">Selecione um produto</option>
    `;

    products.forEach(product => {
        if (product.quantity > 0) {
            const option = document.createElement("option");

            option.value = product.id;
            option.textContent =
                `${product.name} - ${formatMoney(product.price)} (${product.quantity} disponíveis)`;

            saleProduct.appendChild(option);
        }
    });
}

// Registrar venda
saleForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = Number(saleProduct.value);
    const quantity = Number(
        document.getElementById("saleQuantity").value
    );

    const product = products.find(p => p.id === id);

    if (
        !product ||
        !Number.isInteger(quantity) ||
        quantity <= 0
    ) {
        alert("Selecione um produto e uma quantidade válida.");
        return;
    }

    if (quantity > product.quantity) {
        alert("Estoque insuficiente!");
        return;
    }

    const sale = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        total: product.price * quantity,
        date: new Date().toISOString()
    };

    product.quantity -= quantity;
    sales.push(sale);

    saveData();
    saleForm.reset();

    alert("Venda registrada com sucesso!");

    renderAll();
});

// Histórico de vendas
function renderSales() {
    salesTable.innerHTML = "";

    if (sales.length === 0) {
        salesTable.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Nenhuma venda registrada.
                </td>
            </tr>
        `;
        return;
    }

    [...sales].reverse().forEach(sale => {
        const tr = document.createElement("tr");

        const name = document.createElement("td");
        name.textContent = sale.productName;

        const quantity = document.createElement("td");
        quantity.textContent = sale.quantity;

        const total = document.createElement("td");
        total.textContent = formatMoney(sale.total);

        const date = document.createElement("td");
        date.textContent = formatDate(sale.date);

        tr.append(name, quantity, total, date);
        salesTable.appendChild(tr);
    });
}

// Atualizar dashboard
function renderDashboard() {
    const totalProducts = products.length;

    const totalStock = products.reduce(
        (sum, product) => sum + product.quantity, 0
    );

    const totalSales = sales.reduce(
        (sum, sale) => sum + sale.quantity, 0
    );

    const revenue = sales.reduce(
        (sum, sale) => sum + sale.total, 0
    );

    document.getElementById("totalProducts").textContent =
        totalProducts;

    document.getElementById("totalStock").textContent =
        totalStock;

    document.getElementById("totalSales").textContent =
        totalSales;

    document.getElementById("revenue").textContent =
        formatMoney(revenue);

    // Produtos com estoque baixo
    const lowStockList = document.getElementById("lowStockList");

    lowStockList.innerHTML = "";

    const lowStock = products.filter(
        product => product.quantity <= 5
    );

    if (lowStock.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Todos os produtos possuem estoque adequado.";
        li.style.color = "#16a34a";
        lowStockList.appendChild(li);
    } else {
        lowStock.forEach(product => {
            const li = document.createElement("li");

            li.textContent =
                `${product.name}: ${product.quantity} unidades restantes`;

            lowStockList.appendChild(li);
        });
    }
}

// Atualizar todas as partes do sistema
function renderAll() {
    renderProducts();
    renderSaleOptions();
    renderSales();
    renderDashboard();
}

// Pesquisa de produtos
searchProduct.addEventListener("input", renderProducts);

// Inicializar sistema
renderAll();
