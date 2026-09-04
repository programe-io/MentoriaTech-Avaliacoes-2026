let produtos = [];


// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = prompt("Digite o código do produto:");
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    if (!codigo || !descricao || isNaN(quantidade) || isNaN(valor)) {
        alert("Preencha os dados corretamente!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");
}


// LISTAR PRODUTOS
function listarProdutos() {

    let resultado = document.getElementById("resultado");

    if (produtos.length === 0) {
        resultado.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    resultado.innerHTML = "<h2>Produtos cadastrados</h2>";

    produtos.forEach(function(produto) {

        resultado.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </div>
        `;
    });
}


// ALTERAR VALOR
function alterarValor() {

    let codigo = prompt("Digite o código do produto:");

    let produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (produto) {

        let novoValor = Number(
            prompt("Digite o novo valor:")
        );

        if (!isNaN(novoValor)) {
            produto.valor = novoValor;
            alert("Valor alterado com sucesso!");
            listarProdutos();
        } else {
            alert("Digite um valor válido!");
        }

    } else {
        alert("Produto não encontrado!");
    }
}


// ALTERAR QUANTIDADE
function alterarQuantidade() {

    let codigo = prompt("Digite o código do produto:");

    let produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (produto) {

        let novaQuantidade = Number(
            prompt("Digite a nova quantidade:")
        );

        if (!isNaN(novaQuantidade)) {
            produto.quantidade = novaQuantidade;
            alert("Quantidade alterada com sucesso!");
            listarProdutos();
        } else {
            alert("Digite uma quantidade válida!");
        }

    } else {
        alert("Produto não encontrado!");
    }
}