
let produtos = [];
let indiceSelecionado = -1;

// Pegando os elementos do HTML
const nomeP = document.getElementById("nomeP");
const qtdP = document.getElementById("qtdP");
const valorP = document.getElementById("valorP");

const btAdd = document.getElementById("btAdd");
const btAtualizar = document.getElementById("btAtualizar");
const btExcluir = document.getElementById("btExcluir");

const listaProdutos = document.getElementById("listaProdutos");

// Função para limpar os campos
function limparCampos() {
    nomeP.value = "";
    qtdP.value = "";
    valorP.value = "";
    indiceSelecionado = -1;
}

// Função para mostrar os produtos na tela
function mostrarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const item = document.createElement("li");

        item.className = "item-produto";

        item.textContent =
            "Nome: " + produto.nome +
            " | Quantidade: " + produto.quantidade +
            " | Valor: R$ " + produto.valor.toFixed(2);

        item.addEventListener("click", function() {
            nomeP.value = produto.nome;
            qtdP.value = produto.quantidade;
            valorP.value = produto.valor;
            indiceSelecionado = indice;
        });

        listaProdutos.appendChild(item);
    });
}

// Botão adicionar produto
btAdd.addEventListener("click", function() {

    const nome = nomeP.value.trim();
    const quantidade = Number(qtdP.value);
    const valor = Number(valorP.value);

    if (nome === "" || qtdP.value === "" || valorP.value === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (quantidade < 0 || valor < 0) {
        alert("Digite valores positivos!");
        return;
    }

    const produto = {
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    mostrarProdutos();
    limparCampos();

    alert("Produto adicionado com sucesso!");
});

// Botão atualizar produto
btAtualizar.addEventListener("click", function() {

    if (indiceSelecionado === -1) {
        alert("Selecione um produto da lista!");
        return;
    }

    const nome = nomeP.value.trim();
    const quantidade = Number(qtdP.value);
    const valor = Number(valorP.value);

    if (nome === "" || qtdP.value === "" || valorP.value === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (quantidade < 0 || valor < 0) {
        alert("Digite valores positivos!");
        return;
    }

    produtos[indiceSelecionado] = {
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    mostrarProdutos();
    limparCampos();

    alert("Produto atualizado com sucesso!");
});

// Botão excluir produto
btExcluir.addEventListener("click", function() {

    if (indiceSelecionado === -1) {
        alert("Selecione um produto da lista!");
        return;
    }

    produtos.splice(indiceSelecionado, 1);

    mostrarProdutos();
    limparCampos();

    alert("Produto excluído com sucesso!");
});
