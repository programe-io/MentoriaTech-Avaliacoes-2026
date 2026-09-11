const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");

let products = JSON.parse(localStorage.getItem("products")) || [];

let editingId = null;

// Exibir produtos ao carregar a página
renderProducts();


// Cadastrar ou editar produto
productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = Number(document.getElementById("price").value);
    const quantity = Number(document.getElementById("quantity").value);

    if (!name || !category || price < 0 || quantity < 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Se estiver editando
    if (editingId !== null) {

        products = products.map(product => {
            if (product.id === editingId) {
                return {
                    ...product,
                    name,
                    category,
                    price,
                    quantity
                };
            }

            return product;
        });

        editingId = null;

        document.querySelector(".btn-primary").textContent =
            "Cadastrar Produto";

    } else {

        // Novo produto
        const product = {
            id: Date.now(),
            name,
            category,
            price,
            quantity
        };

        products.push(product);
    }

    saveProducts();
    renderProducts();

    productForm.reset();
});


// Exibir produtos
function renderProducts(search = "") {

    productList.innerHTML = "";

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    filteredProducts.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>
                ${formatCurrency(product.price)}
            </td>

            <td>${product.quantity}</td>

            <td>
                <button
                    class="btn-edit"
                    onclick="editProduct(${product.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-delete"
                    onclick="deleteProduct(${product.id})"
                >
                    Excluir
                </button>
            </td>
        `;

        productList.appendChild(row);
    });
}


// Editar produto
function editProduct(id) {

    const product = products.find(product => product.id === id);

    if (!product) {
        return;
    }

    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("quantity").value = product.quantity;

    editingId = id;

    document.querySelector(".btn-primary").textContent =
        "Salvar Alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Excluir produto
function deleteProduct(id) {

    const product = products.find(product => product.id === id);

    if (!product) {
        return;
    }

    const confirmation = confirm(
        `Deseja realmente excluir o produto "${product.name}"?`
    );

    if (!confirmation) {
        return;
    }

    products = products.filter(product => product.id !== id);

    saveProducts();
    renderProducts(searchInput.value);
}


// Pesquisa
searchInput.addEventListener("input", function () {
    renderProducts(this.value);
});


// Salvar no localStorage
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}


// Formatar preço
function formatCurrency(value) {

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
}
