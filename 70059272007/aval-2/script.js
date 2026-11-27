
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const movementForm = document.getElementById("movementForm");

const searchInput = document.getElementById("searchInput");

let products = JSON.parse(localStorage.getItem("products")) || [];
let movements = JSON.parse(localStorage.getItem("movements")) || [];

// FORMATAÇÃO DE MOEDA
function currency(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// SALVAR DADOS
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("movements", JSON.stringify(movements));
}

// CADASTRAR OU EDITAR PRODUTO
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("productId").value;

    const product = {
        id: id || Date.now().toString(),
        nome: document.getElementById("nome").value.trim(),
        codigo: document.getElementById("codigo").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        quantidade: Number(document.getElementById("quantidade").value),
        compra: Number(document.getElementById("compra").value),
        venda: Number(document.getElementById("venda").value),
        minimo: Number(document.getElementById("minimo").value)
    };

    if (
        !product.nome ||
        !product.codigo ||
        !product.categoria ||
        !Number.isSafeInteger(product.quantidade) ||
        product.quantidade < 0 ||
        !Number.isSafeInteger(product.minimo) ||
        product.minimo < 0 ||
        !Number.isFinite(product.compra) ||
        !Number.isFinite(product.venda) ||
        product.compra < 0 ||
        product.venda < 0
    ) {
        alert("Verifique os dados informados.");
        return;
    }

    const duplicate = products.find(p =>
        p.codigo.toLowerCase() === product.codigo.toLowerCase() &&
        p.id !== product.id
    );

    if (duplicate) {
        alert("Já existe um produto com esse código!");
        return;
    }

    if (id) {
        const index = products.findIndex(p => p.id === id);

        if (index !== -1) {
            const oldQuantity = products[index].quantidade;

            product.quantidade = oldQuantity;

            // Registrar eventual ajuste de quantidade como movimentação
            const difference = Number(document.getElementById("quantidade").value) - oldQuantity;

            if (difference !== 0) {
                movements.unshift({
                    data: new Date().toLocaleString("pt-BR"),
                    produto: product.nome,
                    tipo: difference > 0 ? "entrada" : "saida",
                    quantidade: Math.abs(difference)
                });
            }

            products[index] = product;
        }
    } else {
        products.push(product);
    }

    saveData();
    productForm.reset();
    resetEdit();

    renderAll();

    alert(id ? "Produto atualizado!" : "Produto cadastrado!");
});

// CANCELAR EDIÇÃO
function resetEdit() {
    document.getElementById("productId").value = "";
    document.getElementById("saveButton").textContent = "Cadastrar produto";
    document.getElementById("cancelEdit").hidden = true;
}

document.getElementById("cancelEdit").addEventListener("click", () => {
    productForm.reset();
    resetEdit();
});

// EDITAR PRODUTO
function editProduct(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    document.getElementById("productId").value = product.id;
    document.getElementById("nome").value = product.nome;
    document.getElementById("codigo").value = product.codigo;
    document.getElementById("categoria").value = product.categoria;
    document.getElementById("quantidade").value = product.quantidade;
    document.getElementById("compra").value = product.compra;
    document.getElementById("venda").value = product.venda;
    document.getElementById("minimo").value = product.minimo;

    document.getElementById("saveButton").textContent = "Salvar alterações";
    document.getElementById("cancelEdit").hidden = false;

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
}

// EXCLUIR PRODUTO
function deleteProduct(id) {
    const confirmDelete = confirm("Deseja excluir este produto?");

    if (!confirmDelete) return;

    products = products.filter(p => p.id !== id);

    saveData();
    renderAll();
}

// RENDERIZAR PRODUTOS
function renderProducts() {
    const search = searchInput.value.toLowerCase();

    const filtered = products.filter(p =>
        p.nome.toLowerCase().includes(search) ||
        p.codigo.toLowerCase().includes(search) ||
        p.categoria.toLowerCase().includes(search)
    );

    productTable.innerHTML = "";

    filtered.forEach(product => {
        const status = product.quantidade <= product.minimo
            ? '<span class="status low">Estoque baixo</span>'
            : '<span class="status ok">Normal</span>';

        const tr = document.createElement("tr");

        const values = [
            product.nome,
            product.codigo,
            product.categoria,
            product.quantidade,
            currency(product.compra),
            currency(product.venda)
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });

        const statusCell = document.createElement("td");
        statusCell.innerHTML = status;
        tr.appendChild(statusCell);

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => editProduct(product.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => deleteProduct(product.id));

        actions.append(editButton, deleteButton);
        tr.appendChild(actions);

        productTable.appendChild(tr);
    });

    document.getElementById("emptyMessage").style.display =
        filtered.length === 0 ? "block" : "none";
}

// ATUALIZAR DASHBOARD
function updateDashboard() {
    const total = products.length;

    const units = products.reduce((sum, p) => sum + p.quantidade, 0);

    const value = products.reduce(
        (sum, p) => sum + p.quantidade * p.compra,
        0
    );

    const lowStock = products.filter(
        p => p.quantidade <= p.minimo
    ).length;

    document.getElementById("totalProdutos").textContent = total;

    document.getElementById("totalUnidades").textContent = units;

    document.getElementById("valorEstoque").textContent = currency(value);

    document.getElementById("estoqueBaixo").textContent = lowStock;
}

// ATUALIZAR LISTA DE PRODUTOS PARA MOVIMENTAÇÃO
function renderProductOptions() {
    const select = document.getElementById("movementProduct");

    const selected = select.value;

    select.innerHTML = '<option value="">Selecione um produto</option>';

    products.forEach(product => {
        const option = document.createElement("option");

        option.value = product.id;
        option.textContent = product.nome;

        select.appendChild(option);
    });

    if (products.some(p => p.id === selected)) {
        select.value = selected;
    }
}

// REGISTRAR ENTRADA E SAÍDA
movementForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("movementProduct").value;

    const type = document.getElementById("movementType").value;

    const quantity = Number(
        document.getElementById("movementQuantity").value
    );

    const product = products.find(p => p.id === id);

    if (!product || !Number.isSafeInteger(quantity) || quantity <= 0) {
        alert("Informe um produto e uma quantidade válida.");
        return;
    }

    if (type === "saida" && product.quantidade < quantity) {
        alert("Estoque insuficiente para essa saída!");
        return;
    }

    if (type === "entrada" && !Number.isSafeInteger(product.quantidade + quantity)) {
        alert("Quantidade acima do limite permitido.");
        return;
    }

    if (type === "entrada") {
        product.quantidade += quantity;
    } else {
        product.quantidade -= quantity;
    }

    movements.unshift({
        data: new Date().toLocaleString("pt-BR"),
        produto: product.nome,
        tipo: type,
        quantidade: quantity
    });

    saveData();

    movementForm.reset();

    renderAll();

    alert("Movimentação registrada com sucesso!");
});

// HISTÓRICO
function renderMovements() {
    const table = document.getElementById("movementTable");

    table.innerHTML = "";

    movements.forEach(movement => {
        const tr = document.createElement("tr");

        const values = [
            movement.data,
            movement.produto,
            movement.tipo === "entrada" ? "Entrada" : "Saída",
            movement.quantidade
        ];

        values.forEach((value, index) => {
            const td = document.createElement("td");

            td.textContent = value;

            if (index === 2) {
                td.className = movement.tipo;
            }

            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}

// PESQUISAR PRODUTOS
searchInput.addEventListener("input", renderProducts);

// ATUALIZAR SISTEMA
function renderAll() {
    renderProducts();
    updateDashboard();
    renderProductOptions();
    renderMovements();
}

// INICIALIZAÇÃO
renderAll();
