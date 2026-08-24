```javascript
let produtos = [];
let codigo = 1;

function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao == "" || quantidade < 0 || valor < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    codigo++;

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length == 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML +=
            "<div class='produto'>" +
            "<strong>Código:</strong> " + produtos[i].codigo + "<br>" +
            "<strong>Descrição:</strong> " + produtos[i].descricao + "<br>" +
            "<strong>Quantidade:</strong> " + produtos[i].quantidade + "<br>" +
            "<strong>Valor:</strong> R$ " + produtos[i].valor.toFixed(2) +
            "</div>";
    }
}function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length == 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML +=
            "<div class='produto'>" +
            "<strong>Código:</strong> " + produtos[i].codigo + "<br>" +
            "<strong>Descrição:</strong> " + produtos[i].descricao + "<br>" +
            "<strong>Quantidade:</strong> " + produtos[i].quantidade + "<br>" +
            "<strong>Valor:</strong> R$ " + produtos[i].valor.toFixed(2) +
            "</div>";
    }
}function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length == 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML +=
            "<div class='produto'>" +
            "<strong>Código:</strong> " + produtos[i].codigo + "<br>" +
            "<strong>Descrição:</strong> " + produtos[i].descricao + "<br>" +
            "<strong>Quantidade:</strong> " + produtos[i].quantidade + "<br>" +
            "<strong>Valor:</strong> R$ " + produtos[i].valor.toFixed(2) +
            "</div>";
    }
}function alterarValor() {

    let codigoProduto = Number(document.getElementById("codigo").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo == codigoProduto) {

            produtos[i].valor = novoValor;

            alert("Valor alterado com sucesso!");

            listarProdutos();

            return;
        }
    }

    alert("Produto não encontrado!");
}
function alterarQuantidade() {

    let codigoProduto = Number(document.getElementById("codigo").value);
    let novaQuantidade =
Number(document.getElementById("novaQuantidade").value);

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo == codigoProduto) {

            produtos[i].quantidade = novaQuantidade;

            alert("Quantidade alterada com sucesso!");

            listarProdutos();

            return;
        }
    }

    alert("Produto não encontrado!");
}