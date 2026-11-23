
let quantidade = 0;

function adicionarCarrinho() {
    quantidade++;

    document.getElementById("contador").innerText = quantidade;

    alert("Produto adicionado ao carrinho!");
}

function pesquisar() {
    let campo = document.getElementById("pesquisa");
    let filtro = campo.value.toLowerCase();

    let produtos = document.querySelectorAll(".produto");

    produtos.forEach(function(produto) {
        let nome = produto.querySelector("h3").innerText.toLowerCase();

        if (nome.includes(filtro)) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }
    });
}
