let produtos = [];

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo === "" || descricao === "") {
        alert("Preencha todos os campos.");
        return;
    }

    let produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código.");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    limparCampos();

    listarProdutos();
}


function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>

                <td>
                    <button onclick="alterarQuantidade('${produto.codigo}')">
                        Quantidade
                    </button>

                    <button onclick="alterarValor('${produto.codigo}')">
                        Valor
                    </button>
                </td>
            </tr>
        `;
    });
}


function alterarValor(codigo) {

    let produto = produtos.find(
        produto => produto.codigo === codigo
    );

    let novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (novoValor >= 0) {

        produto.valor = novoValor;

        listarProdutos();
    }
}


function alterarQuantidade(codigo) {

    let produto = produtos.find(
        produto => produto.codigo === codigo
    );

    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade >= 0) {

        produto.quantidade = novaQuantidade;

        listarProdutos();
    }
}


function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}