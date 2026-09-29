let quantidade = 0;

// Adicionar produto ao carrinho
function adicionar() {
    quantidade++;

    document.getElementById("quantidade").textContent = quantidade;

    alert("👟 Produto adicionado ao carrinho!");
}

// Mostrar quantidade no carrinho
function mostrarCarrinho() {
    if (quantidade === 0) {
        alert("🛒 Seu carrinho está vazio.");
    } else {
        alert(
            "🛒 Você tem " +
            quantidade +
            " produto(s) no carrinho!"
        );
    }
}

// Mensagem no console
console.log("🚀 Urban Shoes carregado com sucesso!");