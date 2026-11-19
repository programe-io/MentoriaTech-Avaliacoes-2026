
let quantidade = 0;

function adicionarCarrinho() {
    quantidade++;

    document.getElementById("contador").textContent = quantidade;

    alert("Produto adicionado ao carrinho!");
}

// Pesquisa de produtos
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {

    const termo = pesquisa.value.toLowerCase();

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(function(produto) {

        const nome = produto.dataset.nome;

        if (nome.includes(termo)) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }

    });

});
