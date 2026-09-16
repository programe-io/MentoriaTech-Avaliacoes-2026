let produtos = [];

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar se os campos estão preenchidos
    if (codigo === "" || descricao === "" || quantidade < 0 || valor <= 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    // Verificar se o código já existe
    let produtoExiste = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExiste) {
        alert("Já existe um produto com esse código!");
        return;
    }

    let novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
    limparCampos();

    alert("Produto cadastrado com sucesso!");
}


function listarProdutos() {

    let tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto, indice) {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>

                <td>
                    <button onclick="alterarValor(${indice})">
                        Alterar Valor
                    </button>

                    <button onclick="alterarQuantidade(${indice})">
                        Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}


function alterarValor(indice) {

    let novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (novoValor <= 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[indice].valor = novoValor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}


function alterarQuantidade(indice) {

    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[indice].quantidade = novaQuantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}


function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}