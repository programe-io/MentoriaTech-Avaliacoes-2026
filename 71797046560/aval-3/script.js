let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descricao deve ter no minimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor <= 0) {
        throw new Error("Valor deve ser maior que zero");
    }
}

document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    try {

        validarProduto(descricao, quantidade, valor);

        let produto = {
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(produto);

        document.getElementById("mensagem").textContent =
            "Produto cadastrado com sucesso!";

        document.getElementById("listaProdutos").innerHTML +=
            "<li>" + descricao +
            " - Quantidade: " + quantidade +
            " - Valor: R$ " + valor.toFixed(2) +
            "</li>";

        document.getElementById("formProduto").reset();

    } catch (erro) {

        document.getElementById("mensagem").textContent = erro.message;
    }
});