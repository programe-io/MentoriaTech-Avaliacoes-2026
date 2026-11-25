
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

// Mostrar produtos
function mostrarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto, index) {
        let item = document.createElement("li");

        item.className = "item-produto";

        item.textContent =
            produto.nome + " | Quantidade: " +
            produto.quantidade + " | Valor: R$ " +
            produto.valor.toFixed(2);

        item.onclick = function() {
            indiceSelecionado = index;

            nomeP.value = produto.nome;
            qtdP.value = produto.quantidade;
            valorP.value = produto.valor;

            mostrarProdutos();
            listaProdutos.children[index].style.backgroundColor = "#d8b4e8";
        };

        listaProdutos.appendChild(item);
    });
}

// Limpar campos
function limparCampos() {
    nomeP.value = "";
    qtdP.value = "";
    valorP.value = "";
    indiceSelecionado = -1;
}

// Verificar campos
function verificarCampos() {
    if (
        nomeP.value.trim() === "" ||
        qtdP.value === "" ||
        valorP.value === ""
    ) {
        alert("Preencha todos os campos!");
        return false;
    }

    if (
        Number(qtdP.value) < 0 ||
        !Number.isInteger(Number(qtdP.value)) ||
        Number(valorP.value) < 0 ||
        !Number.isFinite(Number(valorP.value))
    ) {
        alert("Digite valores válidos!");
        return false;
    }

    return true;
}

// BOTÃO ADICIONAR
btAdd.onclick = function() {

    if (!verificarCampos()) {
        return;
    }

    let produto = {
        nome: nomeP.value.trim(),
        quantidade: Number(qtdP.value),
        valor: Number(valorP.value)
    };

    produtos.push(produto);

    mostrarProdutos();
    limparCampos();

    alert("Produto adicionado com sucesso!");
};

// BOTÃO ATUALIZAR
btAtualizar.onclick = function() {

    if (indiceSelecionado === -1) {
        alert("Clique em um produto da lista primeiro!");
        return;
    }

    if (!verificarCampos()) {
        return;
    }

    produtos[indiceSelecionado] = {
        nome: nomeP.value.trim(),
        quantidade: Number(qtdP.value),
        valor: Number(valorP.value)
    };

    mostrarProdutos();
    limparCampos();

    alert("Produto atualizado com sucesso!");
};

// BOTÃO EXCLUIR
btExcluir.onclick = function() {

    if (indiceSelecionado === -1) {
        alert("Selecione um produto da lista primeiro!");
        return;
    }

    if (confirm("Deseja realmente excluir este produto?")) {

        produtos.splice(indiceSelecionado, 1);

        mostrarProdutos();
        limparCampos();

        alert("Produto excluído com sucesso!");
    }
};
