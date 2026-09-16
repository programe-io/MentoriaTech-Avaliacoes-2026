let produtos = [];

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    if (codigo === "" || descricao === "" || quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    listarProdutos();

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}


function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

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

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor !== null && novoValor !== "") {
        produtos[indice].valor = Number(novoValor);

        listarProdutos();
    }
}


function alterarQuantidade(indice) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade !== "") {
        produtos[indice].quantidade = Number(novaQuantidade);

        listarProdutos();
    }
}