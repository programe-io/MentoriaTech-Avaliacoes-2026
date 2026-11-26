
let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    document.getElementById("quantidade").textContent =
        carrinho.length;

    alert(nome + " foi adicionado ao carrinho! 💗");
}

function mostrarCarrinho() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛍️");
        return;
    }

    let mensagem = "SEU CARRINHO 💗\n\n";
    let total = 0;

    carrinho.forEach((produto, indice) => {
        mensagem += `${indice + 1}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}\n`;
        total += produto.preco;
    });

    mensagem += `\nTOTAL: R$ ${total.toFixed(2)}`;

    alert(mensagem);
}

// FILTRO DE CATEGORIAS
function filtrar(categoria) {
    const produtos = document.querySelectorAll(".produto");
    let encontrados = 0;

    produtos.forEach(produto => {
        const tipo = produto.dataset.categoria;

        if (categoria === "todos" || tipo === categoria) {
            produto.style.display = "block";
            encontrados++;
        } else {
            produto.style.display = "none";
        }
    });

    document.getElementById("sem-resultados").style.display =
        encontrados === 0 ? "block" : "none";

    document.getElementById("pesquisa").value = "";
}

// PESQUISA DE PRODUTOS
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();
    const produtos = document.querySelectorAll(".produto");
    let encontrados = 0;

    produtos.forEach(produto => {
        const nome = produto.dataset.nome.toLowerCase();

        if (nome.includes(texto)) {
            produto.style.display = "block";
            encontrados++;
        } else {
            produto.style.display = "none";
        }
    });

    document.getElementById("sem-resultados").style.display =
        encontrados === 0 ? "block" : "none";
});
