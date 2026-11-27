
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");

const productId = document.getElementById("productId");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const quantityInput = document.getElementById("quantity");
const costInput = document.getElementById("cost");
const priceInput = document.getElementById("price");

const submitButton = document.getElementById("submitButton");
const cancelEdit = document.getElementById("cancelEdit");
const formTitle = document.getElementById("formTitle");
const emptyMessage = document.getElementById("emptyMessage");

let products = JSON.parse(localStorage.getItem("products")) || [];

// Formatação de valores em reais
const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Salvar produtos
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Gerar identificador
function generateId() {
    return Date.now().toString() +
        Math.random().toString(16).slice(2);
}

// Cadastrar ou atualizar produto
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const quantity = Number(quantityInput.value);
    const cost = Number(costInput.value);
    const price = Number(priceInput.value);

    if (!name || !category) {
        alert("Preencha o nome e a categoria.");
        return;
    }

    if (
        quantityInput.value.trim() === "" ||
        !Number.isInteger(quantity) ||
        quantity < 0 ||
        costInput.value.trim() === "" ||
        !Number.isFinite(cost) ||
        cost < 0 ||
        priceInput.value.trim() === "" ||
        !Number.isFinite(price) ||
        price < 0
    ) {
        alert("Informe valores válidos para quantidade e preços.");
        return;
    }

    const product = {
        id: productId.value || generateId(),
        name,
        category,
        quantity,
        cost,
        price
    };

    if (productId.value) {
        products = products.map(item =>
            item.id === productId.value ? product : item
        );
    } else {
        products.push(product);
    }

    saveProducts();
    renderProducts();
    resetForm();
});

// Mostrar produtos
function renderProducts() {
    productTable.replaceChildren();

    const search = searchInput.value
        .trim()
        .toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );

    emptyMessage.style.display =
        filteredProducts.length === 0 ? "block" : "none";

    if (products.length === 0) {
        emptyMessage.textContent = "Nenhum produto cadastrado.";
    } else if (filteredProducts.length === 0) {
        emptyMessage.textContent = "Nenhum produto encontrado.";
    }

    filteredProducts.forEach(product => {
        const row = document.createElement("tr");

        const createCell = (value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            return cell;
        };

        row.appendChild(createCell(product.name));
        row.appendChild(createCell(product.category));
        row.appendChild(createCell(product.quantity));
        row.appendChild(createCell(currency.format(product.cost)));
        row.appendChild(createCell(currency.format(product.price)));

        // Status do estoque
        const statusCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = "badge";

        if (product.quantity === 0) {
            badge.classList.add("out-stock");
            badge.textContent = "Sem estoque";
        } else if (product.quantity <= 5) {
            badge.classList.add("low-stock");
            badge.textContent = "Estoque baixo";
        } else {
            badge.classList.add("in-stock");
            badge.textContent = "Disponível";
        }

        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        // Ações
        const actionsCell = document.createElement("td");
        const actions = document.createElement("div");

        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Editar";

        editButton.addEventListener("click", () => {
            editProduct(product.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        actionsCell.appendChild(actions);
        row.appendChild(actionsCell);

        productTable.appendChild(row);
    });

    updateDashboard();
}

// Atualizar indicadores
function updateDashboard() {
    const total = products.length;

    const units = products.reduce(
        (sum, product) => sum + product.quantity, 0
    );

    const value = products.reduce(
        (sum, product) => sum + product.quantity * product.cost, 0
    );

    const low = products.filter(
        product => product.quantity <= 5
    ).length;

    document.getElementById("totalProducts").textContent = total;

    document.getElementById("totalUnits").textContent = units;

    document.getElementById("stockValue").textContent =
        currency.format(value);

    document.getElementById("lowStock").textContent = low;
}

// Editar produto
function editProduct(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    productId.value = product.id;
    nameInput.value = product.name;
    categoryInput.value = product.category;
    quantityInput.value = product.quantity;
    costInput.value = product.cost;
    priceInput.value = product.price;

    formTitle.textContent = "Editar produto";
    submitButton.textContent = "Salvar alterações";
    cancelEdit.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Excluir produto
function deleteProduct(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const confirmation = confirm(
        `Deseja realmente excluir o produto "${product.name}"?`
    );

    if (!confirmation) return;

    products = products.filter(item => item.id !== id);

    if (productId.value === id) {
        resetForm();
    }

    saveProducts();
    renderProducts();
}

// Limpar formulário
function resetForm() {
    productForm.reset();
    productId.value = "";

    formTitle.textContent = "Cadastrar produto";
    submitButton.textContent = "+ Cadastrar produto";
    cancelEdit.hidden = true;
}

// Cancelar edição
cancelEdit.addEventListener("click", resetForm);

// Pesquisar produtos
searchInput.addEventListener("input", renderProducts);

// Inicializar sistema
renderProducts();
