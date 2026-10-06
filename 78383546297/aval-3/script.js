// CARRINHO
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(`${nome} foi adicionado ao carrinho! 🛒`);
}

function atualizarCarrinho() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = carrinho.length;

    if (carrinho.length === 0) {
        cartItems.innerHTML = `
            <p class="empty">Seu carrinho está vazio.</p>
        `;

        cartTotal.textContent = "R$ 0,00";
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <br>
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </div>

            <button class="remove" onclick="removerItem(${index})">
                Remover
            </button>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("cart-modal").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("cart-modal").style.display = "none";
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛒");
        return;
    }

    alert("Compra finalizada com sucesso! 🎉");

    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();
}

// FORMULÁRIO DE CONTATO

function enviarFormulario(event) {
    event.preventDefault();

    alert("Mensagem enviada com sucesso! 💬");

    event.target.reset();
}

// FECHAR CARRINHO CLICANDO FORA

window.addEventListener("click", function(event) {
    const modal = document.getElementById("cart-modal");

    if (event.target === modal) {
        fecharCarrinho();
    }
});