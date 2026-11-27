
const $ = id => document.getElementById(id);

let products = JSON.parse(localStorage.getItem("stockProducts")) || [];
let movements = JSON.parse(localStorage.getItem("stockMovements")) || [];

const productForm = $("productForm");
const movementForm = $("movementForm");

function saveData() {
    localStorage.setItem("stockProducts", JSON.stringify(products));
    localStorage.setItem("stockMovements", JSON.stringify(movements));
}

function money(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function updateDashboard() {
    const totalProducts = products.length;

    const totalQuantity = products.reduce(
        (sum, p) => sum + Number(p.quantity), 0
    );

    const lowStock = products.filter(
        p => p.quantity <= p.minimumStock
    ).length;

    const totalValue = products.reduce(
        (sum, p) => sum + p.quantity * p.price, 0
    );

    $("totalProducts").textContent = totalProducts;
    $("totalQuantity").textContent = totalQuantity;
    $("lowStock").textContent = lowStock;
    $("totalValue").textContent = money(totalValue);
}

function getStatus(product) {
    if (product.quantity === 0) {
        return '<span class="status out">Sem estoque</span>';
    }

    if (product.quantity <= product.minimumStock) {
        return '<span class="status low">Estoque baixo</span>';
    }

    return '<span class="status normal">Normal</span>';
}

function renderProducts() {
    const search = $("search").value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.code.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );

    const list = $("productList");
    list.innerHTML = "";

    if (!filtered.length) {
        list.innerHTML = `
            <tr>
                <td colspan="8" class="empty">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
    }

    filtered.forEach(p => {
        const tr = document.createElement("tr");

        const cells = [
            p.name,
            p.code,
            p.category,
            p.quantity,
            money(p.price),
            money(p.quantity * p.price)
        ];

        cells.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });

        const status = document.createElement("td");
        status.innerHTML = getStatus(p);
        tr.appendChild(status);

        const actions = document.createElement("td");
        actions.className = "action-buttons";

        const edit = document.createElement("button");
        edit.className = "edit-btn";
        edit.textContent = "Editar";
        edit.addEventListener("click", () => editProduct(p.id));

        const del = document.createElement("button");
        del.className = "delete-btn";
        del.textContent = "Excluir";
        del.addEventListener("click", () => deleteProduct(p.id));

        actions.append(edit, del);
        tr.appendChild(actions);

        list.appendChild(tr);
    });

    updateDashboard();
    renderMovementOptions();
}

productForm.addEventListener("submit", event => {
    event.preventDefault();

    const id = $("productId").value;
    const name = $("productName").value.trim();
    const code = $("productCode").value.trim();
    const category = $("category").value.trim();
    const quantity = Number($("quantity").value);
    const minimumStock = Number($("minimumStock").value);
    const price = Number($("price").value);

    if (
        !name || !code || !category ||
        !Number.isSafeInteger(quantity) || quantity < 0 ||
        !Number.isSafeInteger(minimumStock) || minimumStock < 0 ||
        !Number.isFinite(price) || price < 0
    ) {
        alert("Confira os dados informados.");
        return;
    }

    const duplicate = products.some(p =>
        p.code.toLowerCase() === code.toLowerCase() &&
        String(p.id) !== id
    );

    if (duplicate) {
        alert("Já existe um produto com esse código.");
        return;
    }

    if (id) {
        const product = products.find(p => String(p.id) === id);

        if (product) {
            product.name = name;
            product.code = code;
            product.category = category;
            product.minimumStock = minimumStock;
            product.price = price;

            // Alterações de quantidade devem ser feitas
            // pela movimentação de estoque.
        }
    } else {
        products.push({
            id: Date.now(),
            name,
            code,
            category,
            quantity,
            minimumStock,
            price
        });
    }

    saveData();
    productForm.reset();
    $("productId").value = "";
    $("saveButton").textContent = "Cadastrar produto";
    $("cancelButton").classList.add("hidden");

    renderProducts();
});

function editProduct(id) {
    const p = products.find(p => p.id === id);

    if (!p) return;

    $("productId").value = p.id;
    $("productName").value = p.name;
    $("productCode").value = p.code;
    $("category").value = p.category;
    $("quantity").value = p.quantity;
    $("quantity").disabled = true;
    $("minimumStock").value = p.minimumStock;
    $("price").value = p.price;

    $("saveButton").textContent = "Salvar alterações";
    $("cancelButton").classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetProductForm() {
    productForm.reset();
    $("productId").value = "";
    $("quantity").disabled = false;
    $("saveButton").textContent = "Cadastrar produto";
    $("cancelButton").classList.add("hidden");
}

$("cancelButton").addEventListener("click", resetProductForm);

function deleteProduct(id) {
    const p = products.find(p => p.id === id);

    if (!p) return;

    if (!confirm(`Excluir o produto ${p.name}?`)) return;

    products = products.filter(p => p.id !== id);

    saveData();
    renderProducts();
}

function renderMovementOptions() {
    const select = $("movementProduct");
    const previous = select.value;

    select.innerHTML = '<option value="">Selecione um produto</option>';

    products.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = `${p.name} (${p.quantity} unidades)`;
        select.appendChild(option);
    });

    if (products.some(p => String(p.id) === previous)) {
        select.value = previous;
    }
}

movementForm.addEventListener("submit", event => {
    event.preventDefault();

    const id = Number($("movementProduct").value);
    const type = $("movementType").value;
    const quantity = Number($("movementQuantity").value);

    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Selecione um produto válido.");
        return;
    }

    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        alert("Informe uma quantidade inteira válida.");
        return;
    }

    if (type === "exit" && quantity > product.quantity) {
        alert("Estoque insuficiente para essa saída!");
        return;
    }

    if (
        type === "entry" &&
        !Number.isSafeInteger(product.quantity + quantity)
    ) {
        alert("Quantidade final excede o limite permitido.");
        return;
    }

    if (type === "entry") {
        product.quantity += quantity;
    } else {
        product.quantity -= quantity;
    }

    movements.unshift({
        id: Date.now(),
        productName: product.name,
        type,
        quantity,
        date: new Date().toLocaleString("pt-BR")
    });

    saveData();
    movementForm.reset();

    renderProducts();
    renderHistory();

    alert("Movimentação registrada com sucesso!");
});

function renderHistory() {
    const list = $("historyList");
    list.innerHTML = "";

    if (!movements.length) {
        list.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Nenhuma movimentação registrada.
                </td>
            </tr>
        `;
        return;
    }

    movements.forEach(m => {
        const tr = document.createElement("tr");

        const values = [
            m.date,
            m.productName,
            m.type === "entry" ? "Entrada" : "Saída",
            m.quantity
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });

        list.appendChild(tr);
    });
}

$("search").addEventListener("input", renderProducts);

renderProducts();
renderHistory();
