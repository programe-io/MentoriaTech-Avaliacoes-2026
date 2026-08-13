```javascript
let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }

    if (quantidade < 1 || isNaN(quantidade)) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (valor < 0 || isNaN(valor)) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0 || isNaN(novoValor)) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado.");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1 || isNaN(novaQuantidade)) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado.");
    }
}

function cadastrarProdutoHTML() {

    try {

        const descricao = document.getElementById("descricao").value.trim();
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

        listarProdutosHTML();

    } catch (erro) {

        alert(erro.message);
    }
}

function alterarValorHTML() {

    try {

        const codigo = Number(document.getElementById("codigoValor").value);
        const novoValor = Number(document.getElementById("novoValor").value);

        atualizarValor(codigo, novoValor);

        alert("Valor alterado com sucesso!");

        document.getElementById("codigoValor").value = "";
        document.getElementById("novoValor").value = "";

        listarProdutosHTML();

    } catch (erro) {

        alert(erro.message);
    }
}

function alterarQuantidadeHTML() {

    try {

        const codigo = Number(document.getElementById("codigoQuantidade").value);
        const novaQuantidade = Number(document.getElementById("novaQuantidade").value);

        atualizarQuantidade(codigo, novaQuantidade);

        alert("Quantidade alterada com sucesso!");

        document.getElementById("codigoQuantidade").value = "";
        document.getElementById("novaQuantidade").value = "";

        listarProdutosHTML();

    } catch (erro) {

        alert(erro.message);
    }
}

function listarProdutosHTML() {

    const lista = document.getElementById("listaProdutos");

    if (produtos.length === 0) {
        lista.textContent = "Nenhum produto cadastrado.";
        return;
    }

    lista.innerHTML = "";

    produtos.forEach(function(produto) {

        const item = document.createElement("div");

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + produto.codigo;

        const descricao = document.createElement("p");
        descricao.textContent = "Descrição: " + produto.descricao;

        const quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + produto.quantidade;

        const valor = document.createElement("p");
        valor.textContent = "Valor: R$ " + produto.valor.toFixed(2);

        item.appendChild(codigo);
        item.appendChild(descricao);
        item.appendChild(quantidade);
        item.appendChild(valor);

        lista.appendChild(item);
    });
}
```
