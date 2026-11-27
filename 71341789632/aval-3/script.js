
// ELEMENTOS
const productForm = document.getElementById("productForm");
const movementForm = document.getElementById("movementForm");

const productTable = document.getElementById("productTable");
const historyTable = document.getElementById("historyTable");
const movementProduct = document.getElementById("movementProduct");

const movementMessage = document.getElementById("movementMessage");
const searchProduct = document.getElementById("searchProduct");

// DADOS
let products = JSON.parse(localStorage.getItem("warehouseProducts")) || [];
let movements = JSON.parse(localStorage.getItem("warehouseMovements")) || [];

// MOEDA
function money(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// SALVAR
function saveData() {
    localStorage.setItem("warehouseProducts", JSON.stringify(products));
    localStorage.setItem("warehouseMovements", JSON.stringify(movements));
}

// CADASTRAR PRODUTO
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const code = document.getElementById("productCode").value.trim();
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();

    const price = Number(document.getElementById("productPrice").value);
    const quantity = Number(document.getElementById("productQuantity").value);
    const minimum = Number(document.getElementById("minimumStock").value);

    if (!code || !name || !category ||
        !Number.isFinite(price) || price <= 0 ||
        !Number.isSafeInteger(quantity) || quantity < 0 ||
        !Number.isSafeInteger(minimum) || minimum < 0) {
        alert("Preencha todos os campos com valores válidos.");
        return;
    }

    const exists = products.some(
        product => product.code.toLowerCase() === code.toLowerCase()
    );

    if (exists) {
        alert("Este código já está cadastrado!");
        return;
    }

    const product = {
        id: Date.now() + Math.random(),
        code,
        name,
        category,
        price,
        quantity,
        minimum
    };

    products.push(product);

    // Registrar estoque inicial
    if (quantity > 0) {
        movements.push({
            id: Date.now() + Math.random(),
            productId: product.id,
            code: product.code,
            name: product.name,
            type: "Entrada inicial",
            quantity,
            date: new Date().toLocaleString("pt-BR")
        });
    }

    saveData();
    renderAll();

    productForm.reset();

    alert("Produto cadastrado com sucesso!");
});

// EXCLUIR PRODUTO
function deleteProduct(id) {
    const hasMovements = movements.some(
        movement => movement.productId === id
    );

    if (hasMovements) {
        alert("Este produto possui histórico de movimentações e não pode ser excluído.");
        return;
    }

    if (!confirm("Deseja excluir este produto?")) return;

    products = products.filter(product => product.id !== id);

    saveData();
    renderAll();
}

// LISTAR PRODUTOS
function renderProducts() {
    productTable.innerHTML = "";

    movementProduct.innerHTML =
        '<option value="">Selecione um produto</option>';

    const search = searchProduct.value.toLowerCase();

    products
        .filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.code.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        )
        .forEach(product => {
            const row = document.createElement("tr");

            const values = [
                product.code,
                product.name,
                product.category,
                money(product.price),
                product.quantity
            ];

            values.forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                row.appendChild(td);
            });

            const status = document.createElement("td");

            if (product.quantity <= product.minimum) {
                status.textContent = "Estoque baixo";
                status.className = "status-low";
            } else {
                status.textContent = "Normal";
                status.className = "status-ok";
            }

            row.appendChild(status);

            const action = document.createElement("td");
            const button = document.createElement("button");

            button.textContent = "Excluir";
            button.className = "delete-btn";

            button.addEventListener("click", () => {
                deleteProduct(product.id);
            });

            action.appendChild(button);
            row.appendChild(action);

            productTable.appendChild(row);
        });

    // Produtos disponíveis para movimentação
    products.forEach(product => {
        const option = document.createElement("option");

        option.value = String(product.id);
        option.textContent = `${product.code} - ${product.name}`;

        movementProduct.appendChild(option);
    });
}

// REGISTRAR MOVIMENTAÇÃO
movementForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = Number(movementProduct.value);
    const type = document.getElementById("movementType").value;
    const quantity = Number(
        document.getElementById("movementQuantity").value
    );

    const product = products.find(item => item.id === id);

    if (!product) {
        showMessage("Selecione um produto válido.", "error");
        return;
    }

    if (!["entrada", "saida"].includes(type) ||
        !Number.isSafeInteger(quantity) || quantity <= 0) {
        showMessage("Informe uma movimentação válida.", "error");
        return;
    }

    if (type === "saida" && quantity > product.quantity) {
        showMessage("Quantidade insuficiente no estoque!", "error");
        return;
    }

    // Atualizar estoque
    if (type === "entrada") {
        if (!Number.isSafeInteger(product.quantity + quantity)) {
            showMessage("Quantidade acima do limite permitido.", "error");
            return;
        }

        product.quantity += quantity;
    } else {
        product.quantity -= quantity;
    }

    // Registrar histórico
    movements.push({
        id: Date.now() + Math.random(),
        productId: product.id,
        code: product.code,
        name: product.name,
        type: type === "entrada" ? "Entrada" : "Saída",
        quantity,
        date: new Date().toLocaleString("pt-BR")
    });

    saveData();
    renderAll();

    movementForm.reset();

    showMessage(
        "Movimentação registrada com sucesso!",
        "success"
    );
});

// MENSAGENS
function showMessage(message, type) {
    movementMessage.textContent = message;
    movementMessage.className = type;
}

// HISTÓRICO
function renderHistory() {
    historyTable.innerHTML = "";

    movements.slice().reverse().forEach(movement => {
        const row = document.createElement("tr");

        const values = [
            movement.date,
            movement.code,
            movement.name,
            movement.type,
            movement.quantity
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        historyTable.appendChild(row);
    });
}

// DASHBOARD
function renderDashboard() {
    const totalProducts = products.length;

    const totalStock = products.reduce(
        (sum, product) => sum + product.quantity, 0
    );

    const lowStock = products.filter(
        product => product.quantity <= product.minimum
    ).length;

    const stockValue = products.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    );

    document.getElementById("totalProducts").textContent =
        totalProducts;

    document.getElementById("totalStock").textContent =
        totalStock;

    document.getElementById("lowStock").textContent =
        lowStock;

    document.getElementById("stockValue").textContent =
        money(stockValue);
}

// ATUALIZAR SISTEMA
function renderAll() {
    renderProducts();
    renderHistory();
    renderDashboard();
}

// PESQUISAR
searchProduct.addEventListener("input", renderProducts);

// DATA ATUAL
document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("pt-BR");

// INICIALIZAR
renderAll();
