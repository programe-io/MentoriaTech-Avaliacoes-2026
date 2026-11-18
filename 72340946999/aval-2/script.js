
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS
    const $ = (id) => document.getElementById(id);

    // DADOS
    let products = JSON.parse(localStorage.getItem("stockly_products") || "[]");
    let movements = JSON.parse(localStorage.getItem("stockly_movements") || "[]");

    // SALVAR DADOS
    function saveData() {
        localStorage.setItem("stockly_products", JSON.stringify(products));
        localStorage.setItem("stockly_movements", JSON.stringify(movements));
    }

    // FORMATAÇÃO
    function currency(value) {
        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function formatDate(date) {
        return new Date(date).toLocaleString("pt-BR");
    }

    function getProduct(id) {
        return products.find(product => product.id === id);
    }

    function getStatus(product) {
        if (product.quantity === 0) {
            return '<span class="status status-out">Sem estoque</span>';
        }

        if (product.quantity <= product.minimum) {
            return '<span class="status status-low">Estoque baixo</span>';
        }

        return '<span class="status status-ok">Disponível</span>';
    }

    // NOTIFICAÇÃO
    function showToast(message) {
        const toast = $("toast");
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    // NAVEGAÇÃO
    function navigate(page) {
        document.querySelectorAll(".page").forEach(section => {
            section.classList.remove("active");
        });

        document.querySelectorAll(".nav-btn").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === page
            );
        });

        $(page).classList.add("active");

        const titles = {
            dashboard: ["Dashboard", "Visão geral do seu estoque."],
            products: ["Produtos", "Gerencie seus produtos cadastrados."],
            movements: ["Movimentações", "Acompanhe entradas e saídas."]
        };

        $("pageTitle").textContent = titles[page][0];
        $("pageSubtitle").textContent = titles[page][1];

        $("newProductBtn").style.display =
            page === "dashboard" || page === "products" ? "block" : "none";
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", () => {
            navigate(button.dataset.page);
        });
    });

    document.querySelectorAll("[data-go]").forEach(button => {
        button.addEventListener("click", () => {
            navigate(button.dataset.go);
        });
    });

    // MODAIS
    function openModal(id) {
        $(id).classList.add("show");
    }

    function closeModal(id) {
        $(id).classList.remove("show");
    }

    document.querySelectorAll("[data-close]").forEach(button => {
        button.addEventListener("click", () => {
            closeModal(button.dataset.close);
        });
    });

    document.querySelectorAll(".modal-overlay").forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal-overlay").forEach(modal => {
                modal.classList.remove("show");
            });
        }
    });

    $("newProductBtn").addEventListener("click", () => {
        $("productForm").reset();
        $("productId").value = "";
        $("productMinimum").value = 5;
        $("productModalTitle").textContent = "Novo produto";
        openModal("productModal");
    });

    $("newMovementBtn").addEventListener("click", () => {
        if (products.length === 0) {
            showToast("Cadastre um produto primeiro.");
            return;
        }

        updateProductOptions();
        $("movementForm").reset();
        openModal("movementModal");
    });

    // CADASTRAR E EDITAR PRODUTO
    $("productForm").addEventListener("submit", event => {
        event.preventDefault();

        const id = $("productId").value;
        const name = $("productName").value.trim();
        const category = $("productCategory").value.trim();
        const price = Number($("productPrice").value);
        const quantity = Number($("productQuantity").value);
        const minimum = Number($("productMinimum").value);

        if (!name || !category || price < 0 ||
            quantity < 0 || minimum < 0) {
            showToast("Verifique os dados do produto.");
            return;
        }

        if (id) {
            const product = getProduct(id);

            if (!product) return;

            product.name = name;
            product.category = category;
            product.price = price;
            product.quantity = quantity;
            product.minimum = minimum;

            showToast("Produto atualizado!");
        } else {
            products.push({
                id: crypto.randomUUID(),
                name,
                category,
                price,
                quantity,
                minimum,
                createdAt: new Date().toISOString()
            });

            showToast("Produto cadastrado!");
        }

        saveData();
        closeModal("productModal");
        renderAll();
    });

    // EDITAR PRODUTO
    function editProduct(id) {
        const product = getProduct(id);

        if (!product) return;

        $("productId").value = product.id;
        $("productName").value = product.name;
        $("productCategory").value = product.category;
        $("productPrice").value = product.price;
        $("productQuantity").value = product.quantity;
        $("productMinimum").value = product.minimum;

        $("productModalTitle").textContent = "Editar produto";

        openModal("productModal");
    }

    // EXCLUIR PRODUTO
    function deleteProduct(id) {
        const product = getProduct(id);

        if (!product) return;

        const confirmed = confirm(
            `Deseja realmente excluir "${product.name}"?`
        );

        if (!confirmed) return;

        products = products.filter(item => item.id !== id);
        movements = movements.filter(item => item.productId !== id);

        saveData();
        renderAll();
        showToast("Produto excluído!");
    }

    // TABELA DE PRODUTOS
    function renderProducts() {
        const search = $("searchProduct").value.toLowerCase();
        const category = $("categoryFilter").value;

        const filtered = products.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search);

            const matchesCategory =
                !category || product.category === category;

            return matchesSearch && matchesCategory;
        });

        $("productsTable").innerHTML = filtered.map(product => `
            <tr>
                <td>
                    <span class="product-name">${escapeHTML(product.name)}</span>
                </td>
                <td>${escapeHTML(product.category)}</td>
                <td>${currency(product.price)}</td>
                <td>${product.quantity}</td>
                <td>${getStatus(product)}</td>
                <td>
                    <div class="action-group">
                        <button class="action-btn"
                            data-edit="${product.id}">Editar</button>
                        <button class="action-btn delete"
                            data-delete="${product.id}">Excluir</button>
                    </div>
                </td>
            </tr>
        `).join("");

        $("emptyProducts").hidden = filtered.length !== 0;

        document.querySelectorAll("[data-edit]").forEach(button => {
            button.addEventListener("click", () => {
                editProduct(button.dataset.edit);
            });
        });

        document.querySelectorAll("[data-delete]").forEach(button => {
            button.addEventListener("click", () => {
                deleteProduct(button.dataset.delete);
            });
        });
    }

    // CATEGORIAS
    function renderCategories() {
        const selected = $("categoryFilter").value;

        const categories = [...new Set(
            products.map(product => product.category)
        )].sort();

        $("categoryFilter").innerHTML =
            '<option value="">Todas as categorias</option>' +
            categories.map(category => `
                <option value="${escapeHTML(category)}">
                    ${escapeHTML(category)}
                </option>
            `).join("");

        $("categoryFilter").value = categories.includes(selected)
            ? selected
            : "";
    }

    // DASHBOARD
    function renderDashboard() {
        const totalProducts = products.length;

        const totalUnits = products.reduce(
            (sum, product) => sum + product.quantity, 0
        );

        const stockValue = products.reduce(
            (sum, product) => sum + product.quantity * product.price, 0
        );

        const lowStock = products.filter(
            product => product.quantity <= product.minimum
        ).length;

        $("totalProducts").textContent = totalProducts;
        $("totalUnits").textContent = totalUnits;
        $("stockValue").textContent = currency(stockValue);
        $("lowStock").textContent = lowStock;

        const recent = [...products]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        $("recentTable").innerHTML = recent.map(product => `
            <tr>
                <td>
                    <span class="product-name">${escapeHTML(product.name)}</span>
                </td>
                <td>${escapeHTML(product.category)}</td>
                <td>${currency(product.price)}</td>
                <td>${product.quantity}</td>
                <td>${getStatus(product)}</td>
            </tr>
        `).join("");

        if (recent.length === 0) {
            $("recentTable").innerHTML = `
                <tr><td colspan="5">Nenhum produto cadastrado.</td></tr>
            `;
        }

        renderRecentMovements();
    }

    // OPÇÕES DE PRODUTOS NO MODAL
    function updateProductOptions() {
        $("movementProduct").innerHTML =
            '<option value="">Selecione um produto</option>' +
            products.map(product => `
                <option value="${product.id}">
                    ${escapeHTML(product.name)} (${product.quantity} unidades)
                </option>
            `).join("");
    }

    // REGISTRAR MOVIMENTAÇÃO
    $("movementForm").addEventListener("submit", event => {
        event.preventDefault();

        const productId = $("movementProduct").value;
        const type = $("movementType").value;
        const quantity = Number($("movementQuantity").value);

        const product = getProduct(productId);

        if (!product || !Number.isInteger(quantity) || quantity <= 0) {
            showToast("Informe uma quantidade válida.");
            return;
        }

        if (type === "saida" && quantity > product.quantity) {
            showToast("Estoque insuficiente para essa saída.");
            return;
        }

        if (type === "entrada") {
            product.quantity += quantity;
        } else {
            product.quantity -= quantity;
        }

        movements.unshift({
            id: crypto.randomUUID(),
            productId,
            productName: product.name,
            type,
            quantity,
            date: new Date().toISOString()
        });

        saveData();
        closeModal("movementModal");
        renderAll();

        showToast("Movimentação registrada!");
    });

    // HISTÓRICO
    function renderMovements() {
        $("movementsTable").innerHTML = movements.map(movement => `
            <tr>
                <td>${escapeHTML(movement.productName)}</td>
                <td>
                    <span class="status ${
                        movement.type === "entrada" ? "status-ok" : "status-out"
                    }">
                        ${movement.type === "entrada" ? "Entrada" : "Saída"}
                    </span>
                </td>
                <td>${movement.quantity} unidades</td>
                <td>${formatDate(movement.date)}</td>
            </tr>
        `).join("");

        $("emptyMovements").hidden = movements.length !== 0;
    }

    function renderRecentMovements() {
        const recent = movements.slice(0, 5);

        $("recentMovements").innerHTML = recent.map(movement => `
            <div class="movement-item">
                <div class="movement-left">
                    <div class="movement-icon ${movement.type}">
                        ${movement.type === "entrada" ? "↓" : "↑"}
                    </div>
                    <div>
                        <strong>${escapeHTML(movement.productName)}</strong>
                        <span class="movement-date">
                            ${formatDate(movement.date)}
                        </span>
                    </div>
                </div>

                <span class="${
                    movement.type === "entrada" ? "positive" : "negative"
                }">
                    ${movement.type === "entrada" ? "+" : "-"}${movement.quantity}
                </span>
            </div>
        `).join("");

        if (recent.length === 0) {
            $("recentMovements").innerHTML =
                '<p class="empty-message">Nenhuma movimentação registrada.</p>';
        }
    }

    // PESQUISA E FILTROS
    $("searchProduct").addEventListener("input", renderProducts);
    $("categoryFilter").addEventListener("change", renderProducts);

    // EXPORTAR CSV
    $("exportBtn").addEventListener("click", () => {
        if (products.length === 0) {
            showToast("Não existem produtos para exportar.");
            return;
        }

        const rows = [
            ["Nome", "Categoria", "Preço", "Quantidade", "Estoque mínimo"],
            ...products.map(product => [
                product.name,
                product.category,
                product.price,
                product.quantity,
                product.minimum
            ])
        ];

        const csv = "\uFEFF" + rows.map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(";")
        ).join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "estoque-stockly.csv";
        link.click();

        URL.revokeObjectURL(url);

        showToast("Arquivo CSV exportado!");
    });

    // TEMA ESCURO
    const savedTheme = localStorage.getItem("stockly_theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        $("themeIcon").textContent = "☀";
    }

    $("themeBtn").addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const dark = document.body.classList.contains("dark");

        localStorage.setItem("stockly_theme", dark ? "dark" : "light");

        $("themeIcon").textContent = dark ? "☀" : "☾";

        showToast(dark ? "Tema escuro ativado." : "Tema claro ativado.");
    });

    // ATUALIZA TODA A INTERFACE
    function renderAll() {
        renderCategories();
        renderProducts();
        renderDashboard();
        renderMovements();
    }

    // INICIALIZAÇÃO
    renderAll();
    navigate("dashboard");

});
