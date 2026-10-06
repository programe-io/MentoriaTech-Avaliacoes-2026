// ======================================
// BANCO DE DADOS LOCAL
// ======================================

let products =
    JSON.parse(localStorage.getItem("products")) || [

        {
            id: 1,
            name: "Notebook Dell",
            sku: "NOTE-001",
            category: "Eletrônicos",
            quantity: 12,
            minimum: 5,
            price: 3499.90,
            created: Date.now()
        },

        {
            id: 2,
            name: "Mouse Logitech",
            sku: "MOUSE-002",
            category: "Periféricos",
            quantity: 4,
            minimum: 5,
            price: 129.90,
            created: Date.now() - 1000
        },

        {
            id: 3,
            name: "Teclado Mecânico",
            sku: "TEC-003",
            category: "Periféricos",
            quantity: 18,
            minimum: 5,
            price: 299.90,
            created: Date.now() - 2000
        }

    ];


let movements =
    JSON.parse(localStorage.getItem("movements")) || [];


let currentMovementType = "entrada";


// ======================================
// SALVAR DADOS
// ======================================

function saveData() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "movements",
        JSON.stringify(movements)
    );
}


// ======================================
// FORMATAÇÃO
// ======================================

function money(value) {

    return value.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ======================================
// DASHBOARD
// ======================================

function updateDashboard() {

    const totalProducts =
        products.length;


    const totalItems =
        products.reduce(
            (sum, product) =>
                sum + Number(product.quantity),
            0
        );


    const lowStockProducts =
        products.filter(
            product =>
                product.quantity <= product.minimum
        );


    const stockValue =
        products.reduce(
            (sum, product) =>
                sum +
                product.quantity *
                product.price,
            0
        );


    document.getElementById(
        "totalProducts"
    ).textContent = totalProducts;


    document.getElementById(
        "totalItems"
    ).textContent = totalItems;


    document.getElementById(
        "lowStock"
    ).textContent =
        lowStockProducts.length;


    document.getElementById(
        "stockValue"
    ).textContent =
        money(stockValue);


    renderRecentProducts();

    renderLowStock();

}


// ======================================
// PRODUTOS RECENTES
// ======================================

function renderRecentProducts() {

    const table =
        document.getElementById(
            "recentProductsTable"
        );


    const recent =
        [...products]
            .sort(
                (a, b) =>
                    b.created - a.created
            )
            .slice(0, 5);


    if (!recent.length) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML =
        recent.map(product => `

            <tr>

                <td>

                    <div class="product">

                        <div class="avatar">
                            ${product.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                    </div>

                </td>

                <td>
                    ${escapeHTML(product.category)}
                </td>

                <td>
                    ${product.quantity}
                </td>

                <td>
                    ${money(product.price)}
                </td>

            </tr>

        `).join("");

}


// ======================================
// ESTOQUE BAIXO
// ======================================

function renderLowStock() {

    const container =
        document.getElementById(
            "lowStockList"
        );


    const lowStock =
        products.filter(
            product =>
                product.quantity <= product.minimum
        );


    if (!lowStock.length) {

        container.innerHTML = `
            <div style="
                padding:25px;
                text-align:center;
                color:#7b8497;
            ">
                ✓ Nenhum produto com estoque baixo
            </div>
        `;

        return;
    }


    container.innerHTML =
        lowStock.map(product => `

            <div class="low-stock-item">

                <div class="low-info">

                    <div class="avatar">
                        ${product.name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <small>
                            Mínimo: ${product.minimum}
                        </small>

                    </div>

                </div>

                <span class="badge badge-orange">
                    ${product.quantity} un.
                </span>

            </div>

        `).join("");

}


// ======================================
// LISTA DE PRODUTOS
// ======================================

function renderProducts() {

    const table =
        document.getElementById(
            "productsTable"
        );


    const search =
        document.getElementById(
            "search"
        ).value.toLowerCase();


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const filtered =
        products.filter(product => {

            const matchesSearch =

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.sku
                    .toLowerCase()
                    .includes(search)

                ||

                product.category
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =

                !category ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    document.getElementById(
        "productCounter"
    ).textContent =
        `${filtered.length} produto${filtered.length !== 1 ? "s" : ""}`;


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#7b8497;
                    "
                >
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML =
        filtered.map(product => {

            let status =
                "Em estoque";

            let statusClass =
                "badge-green";


            if (product.quantity === 0) {

                status =
                    "Esgotado";

                statusClass =
                    "badge-red";

            }

            else if (
                product.quantity <=
                product.minimum
            ) {

                status =
                    "Estoque baixo";

                statusClass =
                    "badge-orange";

            }


            return `

                <tr>

                    <td>

                        <div class="product">

                            <div class="avatar">
                                ${product.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                        </div>

                    </td>


                    <td>
                        ${escapeHTML(product.sku)}
                    </td>


                    <td>
                        ${escapeHTML(product.category)}
                    </td>


                    <td>
                        <strong>
                            ${product.quantity}
                        </strong>
                    </td>


                    <td>
                        ${money(product.price)}
                    </td>


                    <td>

                        <span
                            class="badge ${statusClass}"
                        >
                            ${status}
                        </span>

                    </td>


                    <td>

                        <div class="actions">

                            <button
                                class="action"
                                title="Movimentar"
                                onclick="
                                    openMovement(${product.id})
                                "
                            >
                                🔄
                            </button>


                            <button
                                class="action"
                                title="Editar"
                                onclick="
                                    editProduct(${product.id})
                                "
                            >
                                ✏️
                            </button>


                            <button
                                class="action"
                                title="Excluir"
                                onclick="
                                    deleteProduct(${product.id})
                                "
                            >
                                🗑️
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }).join("");

}


// ======================================
// CATEGORIAS
// ======================================

function updateCategories() {

    const select =
        document.getElementById(
            "categoryFilter"
        );


    const current =
        select.value;


    const categories =
        [...new Set(
            products.map(
                product =>
                    product.category
            )
        )].sort();


    select.innerHTML =
        `
        <option value="">
            Todas as categorias
        </option>
        `;


    categories.forEach(category => {

        const option =
            document.createElement(
                "option"
            );

        option.value = category;

        option.textContent = category;

        select.appendChild(option);

    });


    select.value = current;

}


// ======================================
// MODAL PRODUTO
// ======================================

function openProductModal() {

    document.getElementById(
        "productForm"
    ).reset();


    document.getElementById(
        "productId"
    ).value = "";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Novo produto";


    document.getElementById(
        "productModal"
    ).classList.add("show");

}


function closeProductModal() {

    document.getElementById(
        "productModal"
    ).classList.remove("show");

}


// ======================================
// SALVAR PRODUTO
// ======================================

document.getElementById(
    "productForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "productId"
            ).value;


        const productData = {

            name:
                document.getElementById(
                    "productName"
                ).value.trim(),

            sku:
                document.getElementById(
                    "productSku"
                ).value.trim(),

            category:
                document.getElementById(
                    "productCategory"
                ).value.trim(),

            quantity:
                Number(
                    document.getElementById(
                        "productQuantity"
                    ).value
                ),

            minimum:
                Number(
                    document.getElementById(
                        "productMinimum"
                    ).value
                ),

            price:
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                )

        };


        if (id) {

            const product =
                products.find(
                    p =>
                        p.id == id
                );


            if (product) {

                Object.assign(
                    product,
                    productData
                );

            }


            showToast(
                "Produto atualizado!"
            );

        }

        else {

            products.push({

                id:
                    Date.now(),

                ...productData,

                created:
                    Date.now()

            });


            showToast(
                "Produto cadastrado!"
            );

        }


        saveData();

        updateAll();

        closeProductModal();

    }
);


// ======================================
// EDITAR PRODUTO
// ======================================

function editProduct(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) return;


    document.getElementById(
        "productId"
    ).value =
        product.id;


    document.getElementById(
        "productName"
    ).value =
        product.name;


    document.getElementById(
        "productSku"
    ).value =
        product.sku;


    document.getElementById(
        "productCategory"
    ).value =
        product.category;


    document.getElementById(
        "productQuantity"
    ).value =
        product.quantity;


    document.getElementById(
        "productMinimum"
    ).value =
        product.minimum;


    document.getElementById(
        "productPrice"
    ).value =
        product.price;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Editar produto";


    document.getElementById(
        "productModal"
    ).classList.add("show");

}


// ======================================
// EXCLUIR
// ======================================

function deleteProduct(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) return;


    const confirmation =
        confirm(
            `Deseja excluir "${product.name}"?`
        );


    if (!confirmation) return;


    products =
        products.filter(
            p =>
                p.id !== id
        );


    saveData();

    updateAll();


    showToast(
        "Produto excluído!"
    );

}


// ======================================
// MOVIMENTAÇÃO
// ======================================

function openMovement(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) return;


    document.getElementById(
        "movementProductId"
    ).value =
        product.id;


    document.getElementById(
        "selectedProduct"
    ).innerHTML = `

        📦 ${escapeHTML(product.name)}

        <br>

        <small style="color:#7b8497">

            Estoque atual:
            ${product.quantity}
            unidades

        </small>

    `;


    document.getElementById(
        "movementQuantity"
    ).value = "";


    selectMovementType(
        "entrada"
    );


    document.getElementById(
        "movementModal"
    ).classList.add("show");

}


function closeMovementModal() {

    document.getElementById(
        "movementModal"
    ).classList.remove("show");

}


// ======================================
// TIPO DE MOVIMENTAÇÃO
// ======================================

function selectMovementType(type) {

    currentMovementType =
        type;


    document.getElementById(
        "movementType"
    ).value =
        type;


    document.getElementById(
        "entryButton"
    ).classList.toggle(
        "active",
        type === "entrada"
    );


    document.getElementById(
        "exitButton"
    ).classList.toggle(
        "active",
        type === "saida"
    );

}


// ======================================
// SALVAR MOVIMENTAÇÃO
// ======================================

document.getElementById(
    "movementForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            Number(
                document.getElementById(
                    "movementProductId"
                ).value
            );


        const quantity =
            Number(
                document.getElementById(
                    "movementQuantity"
                ).value
            );


        const product =
            products.find(
                p =>
                    p.id === id
            );


        if (!product) return;


        if (quantity <= 0) {

            showToast(
                "Informe uma quantidade válida."
            );

            return;

        }


        if (
            currentMovementType ===
                "saida"
            &&
            quantity >
                product.quantity
        ) {

            showToast(
                "Estoque insuficiente!"
            );

            return;

        }


        if (
            currentMovementType ===
                "entrada"
        ) {

            product.quantity +=
                quantity;

        }

        else {

            product.quantity -=
                quantity;

        }


        movements.unshift({

            id:
                Date.now(),

            productId:
                product.id,

            product:
                product.name,

            type:
                currentMovementType,

            quantity:
                quantity,

            currentStock:
                product.quantity,

            date:
                new Date().toLocaleString(
                    "pt-BR"
                )

        });


        saveData();

        updateAll();

        closeMovementModal();


        showToast(
            currentMovementType ===
                "entrada"
                ? "Entrada registrada!"
                : "Saída registrada!"
        );

    }
);


// ======================================
// HISTÓRICO
// ======================================

function renderMovements() {

    const table =
        document.getElementById(
            "movementTable"
        );


    if (!movements.length) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#7b8497;
                    "
                >

                    Nenhuma movimentação registrada.

                </td>

            </tr>

        `;

        return;

    }


    table.innerHTML =
        movements
            .slice(0, 100)
            .map(movement => {

                const entry =
                    movement.type ===
                    "entrada";


                return `

                    <tr>

                        <td>
                            ${movement.date}
                        </td>

                        <td>

                            <strong>
                                ${escapeHTML(
                                    movement.product
                                )}
                            </strong>

                        </td>

                        <td>

                            <span
                                class="
                                    badge
                                    ${
                                        entry
                                            ? "badge-green"
                                            : "badge-red"
                                    }
                                "
                            >

                                ${
                                    entry
                                        ? "📥 Entrada"
                                        : "📤 Saída"
                                }

                            </span>

                        </td>

                        <td>

                            ${
                                entry
                                    ? "+"
                                    : "-"
                            }${movement.quantity}

                        </td>

                        <td>

                            ${movement.currentStock}

                        </td>

                    </tr>

                `;

            })
            .join("");

}


// ======================================
// NAVEGAÇÃO
// ======================================

document.querySelectorAll(
    ".menu-item"
).forEach(button => {

    button.addEventListener(
        "click",
        function() {

            changePage(
                this.dataset.page
            );

        }
    );

});


function changePage(page) {

    document.querySelectorAll(
        ".menu-item"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });


    document.querySelectorAll(
        ".page"
    ).forEach(section => {

        section.classList.toggle(
            "active",
            section.id === page
        );

    });


    const titles = {

        dashboard: [
            "Dashboard",
            "Visão geral do seu estoque"
        ],

        produtos: [
            "Produtos",
            "Gerencie os produtos cadastrados"
        ],

        movimentacoes: [
            "Movimentações",
            "Histórico de entradas e saídas"
        ]

    };


    document.getElementById(
        "pageTitle"
    ).textContent =
        titles[page][0];


    document.getElementById(
        "pageDescription"
    ).textContent =
        titles[page][1];

}


// ======================================
// PESQUISA
// ======================================

document.getElementById(
    "search"
).addEventListener(
    "input",
    renderProducts
);


document.getElementById(
    "categoryFilter"
).addEventListener(
    "change",
    renderProducts
);


// ======================================
// VER PRODUTOS
// ======================================

document.getElementById(
    "viewProducts"
).addEventListener(
    "click",
    function() {

        changePage(
            "produtos"
        );

    }
);


// ======================================
// MODAIS
// ======================================

document.getElementById(
    "newProductBtn"
).addEventListener(
    "click",
    openProductModal
);


document.getElementById(
    "closeProductModal"
).addEventListener(
    "click",
    closeProductModal
);


document.getElementById(
    "cancelProduct"
).addEventListener(
    "click",
    closeProductModal
);


document.getElementById(
    "closeMovementModal"
).addEventListener(
    "click",
    closeMovementModal
);


document.getElementById(
    "cancelMovement"
).addEventListener(
    "click",
    closeMovementModal
);


document.getElementById(
    "entryButton"
).addEventListener(
    "click",
    () =>
        selectMovementType(
            "entrada"
        )
);


document.getElementById(
    "exitButton"
).addEventListener(
    "click",
    () =>
        selectMovementType(
            "saida"
        )
);


// ======================================
// FECHAR MODAL CLICANDO FORA
// ======================================

document.getElementById(
    "productModal"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            this
        ) {

            closeProductModal();

        }

    }
);


document.getElementById(
    "movementModal"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            this
        ) {

            closeMovementModal();

        }

    }
);


// ======================================
// NOTIFICAÇÃO
// ======================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


// ======================================
// ATUALIZAR SISTEMA
// ======================================

function updateAll() {

    updateDashboard();

    updateCategories();

    renderProducts();

    renderMovements();

}


// ======================================
// INICIAR
// ======================================

updateAll();
