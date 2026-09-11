// Array que armazena os produtos
let produtos = [];


// Elementos do HTML
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

const codigoAlterar = document.getElementById("codigoAlterar");

const btnValor = document.getElementById("btnValor");
const btnQuantidade = document.getElementById("btnQuantidade");


// CADASTRAR PRODUTO

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );


    // Verificar se o código já existe
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }


    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adicionar produto
    produtos.push(produto);


    alert("Produto cadastrado com sucesso!");


    // Limpar formulário
    formProduto.reset();


    // Atualizar lista
    listarProdutos();

});


// LISTAR PRODUTOS

function listarProdutos() {

    listaProdutos.innerHTML = "";


    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    }


    produtos.forEach(function(produto) {

        const div = document.createElement("div");

        div.classList.add("produto");

        div.innerHTML = `
            <h3>${produto.descricao}</h3>

            <p>
                <strong>Código:</strong>
                ${produto.codigo}
            </p>

            <p>
                <strong>Quantidade:</strong>
                ${produto.quantidade}
            </p>

            <p>
                <strong>Valor:</strong>
                R$ ${produto.valor.toFixed(2)}
            </p>
        `;

        listaProdutos.appendChild(div);

    });

}


// ALTERAR VALOR

btnValor.addEventListener("click", function() {

    const codigo = codigoAlterar.value;


    if (codigo === "") {
        alert("Digite o código do produto.");
        return;
    }


    const produto = produtos.find(
        produto => produto.codigo === codigo
    );


    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }


    const novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );


    if (isNaN(novoValor) || novoValor < 0) {
        alert("Digite um valor válido.");
        return;
    }


    produto.valor = novoValor;


    alert("Valor alterado com sucesso!");


    codigoAlterar.value = "";


    listarProdutos();

});


// ALTERAR QUANTIDADE

btnQuantidade.addEventListener("click", function() {

    const codigo = codigoAlterar.value;


    if (codigo === "") {
        alert("Digite o código do produto.");
        return;
    }


    const produto = produtos.find(
        produto => produto.codigo === codigo
    );


    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }


    const novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );


    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0 ||
        !Number.isInteger(novaQuantidade)
    ) {
        alert("Digite uma quantidade inteira válida.");
        return;
    }


    produto.quantidade = novaQuantidade;


    alert("Quantidade alterada com sucesso!");


    codigoAlterar.value = "";


    listarProdutos();

});