```javascript
// Lista de produtos
let produtos = [];


// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    // Verificar se todos os campos foram preenchidos
    if (
        codigo == "" ||
        descricao == "" ||
        quantidade == "" ||
        valor == ""
    ) {
        alert("💄 Preencha todos os campos!");
        return;
    }

    quantidade = Number(quantidade);
    valor = Number(valor);

    // Verificar números
    if (quantidade < 0) {
        alert("A quantidade não pode ser negativa!");
        return;
    }

    if (valor < 0) {
        alert("O valor não pode ser negativo!");
        return;
    }

    // Verificar código repetido
    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo == codigo) {
            alert("Esse código já está cadastrado!");
            return;
        }
    }

    // Criar produto
    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto na lista
    produtos.push(produto);

    alert("💗 Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizar a lista
    mostrarProdutos();
}


// MOSTRAR PRODUTOS
function mostrarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length == 0) {

        lista.innerHTML =
            "<p>💄 Nenhum produto cadastrado.</p>";

        return;
    }

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML +=

            "<div class='produto'>" +

            "<p><strong>💎 Código:</strong> " +
            produtos[i].codigo +
            "</p>" +

            "<p><strong>💄 Produto:</strong> " +
            produtos[i].descricao +
            "</p>" +

            "<p><strong>📦 Quantidade:</strong> " +
            produtos[i].quantidade +
            "</p>" +

            "<p><strong>💰 Valor:</strong> R$ " +
            produtos[i].valor.toFixed(2) +
            "</p>" +

            "<button onclick='alterarValor(" + i + ")'>" +
            "💰 Alterar Valor" +
            "</button>" +

            "<button onclick='alterarQuantidade(" + i + ")'>" +
            "📦 Alterar Quantidade" +
            "</button>" +

            "</div>";
    }
}


// ALTERAR VALOR
function alterarValor(numero) {

    let novoValor = prompt(
        "💰 Digite o novo valor do produto:"
    );

    if (novoValor == null || novoValor == "") {
        return;
    }

    novoValor = Number(novoValor);

    if (novoValor < 0 || isNaN(novoValor)) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[numero].valor = novoValor;

    alert("✨ Valor alterado com sucesso!");

    mostrarProdutos();
}


// ALTERAR QUANTIDADE
function alterarQuantidade(numero) {

    let novaQuantidade = prompt(
        "📦 Digite a nova quantidade:"
    );

    if (novaQuantidade == null || novaQuantidade == "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[numero].quantidade = novaQuantidade;

    alert("✨ Quantidade alterada com sucesso!");

    mostrarProdutos();
}
```
