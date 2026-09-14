let produtos = [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// Cadastrar produto
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (codigo === "" || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    const produtoExiste = produtos.some(
        produto => produto.codigo === codigo
    );

    if (produtoExiste) {
        alert("Já existe um produto com esse código!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listarProdutos();

    form.reset();
});


// Listar produtos
function listarProdutos() {

    lista.innerHTML = "";

    produtos.forEach(function (produto, index) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>
                <button onclick="alterarValor(${index})">
                    Alterar valor
                </button>

                <button onclick="alterarQuantidade(${index})">
                    Alterar quantidade
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}


// Alterar valor
function alterarValor(index) {

    const novoValor = prompt(
        "Digite o novo valor:",
        produtos[index].valor
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (isNaN(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    listarProdutos();
}


// Alterar quantidade
function alterarQuantidade(index) {

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produtos[index].quantidade
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    listarProdutos();
}
