let produtos = [];


function cadastrarProduto() {

    let codigo = Number(
        document.getElementById("codigo").value
    );

    let descricao =
        document.getElementById("descricao").value;

    let quantidade = Number(
        document.getElementById("quantidade").value
    );

    let valor = Number(
        document.getElementById("valor").value
    );


    // Verificar campos

    if (
        codigo <= 0 ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }


    // Verificar código duplicado

    let existe = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });


    if (existe) {
        alert("Já existe um produto com esse código!");
        return;
    }


    // Criar produto

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adicionar ao array

    produtos.push(produto);


    // Limpar campos

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    alert("Produto cadastrado com sucesso!");

    listarProdutos();
    atualizarEstatisticas();
}


function listarProdutos() {

    let lista =
        document.getElementById("listaProdutos");

    let mensagem =
        document.getElementById("mensagemVazia");


    lista.innerHTML = "";


    if (produtos.length === 0) {
        mensagem.style.display = "block";
        return;
    }


    mensagem.style.display = "none";


    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML += `

            <tr>

                <td>${produtos[i].codigo}</td>

                <td>${produtos[i].descricao}</td>

                <td>${produtos[i].quantidade}</td>

                <td>
                    R$ ${produtos[i].valor.toFixed(2)}
                </td>

                <td>

                    <button
                        class="botao-valor"
                        onclick="alterarValor(${produtos[i].codigo})"
                    >
                        Alterar Valor
                    </button>

                    <button
                        class="botao-quantidade"
                        onclick="alterarQuantidade(${produtos[i].codigo})"
                    >
                        Alterar Quantidade
                    </button>

                </td>

            </tr>

        `;
    }
}


function encontrarProduto(codigo) {

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {

            return produtos[i];

        }
    }

    return null;
}


function alterarValor(codigo) {

    let produtoEncontrado =
        encontrarProduto(codigo);


    if (produtoEncontrado === null) {
        alert("Produto não encontrado!");
        return;
    }


    let novoValor = Number(
        prompt(
            "Digite o novo valor para " +
            produtoEncontrado.descricao + ":"
        )
    );


    if (
        novoValor < 0 ||
        isNaN(novoValor)
    ) {
        alert("Digite um valor válido!");
        return;
    }


    produtoEncontrado.valor = novoValor;


    alert("Valor alterado com sucesso!");

    listarProdutos();
    atualizarEstatisticas();
}


function alterarQuantidade(codigo) {

    let produtoEncontrado =
        encontrarProduto(codigo);


    if (produtoEncontrado === null) {
        alert("Produto não encontrado!");
        return;
    }


    let novaQuantidade = Number(
        prompt(
            "Digite a nova quantidade para " +
            produtoEncontrado.descricao + ":"
        )
    );


    if (
        novaQuantidade < 0 ||
        isNaN(novaQuantidade)
    ) {
        alert("Digite uma quantidade válida!");
        return;
    }


    produtoEncontrado.quantidade =
        novaQuantidade;


    alert("Quantidade alterada com sucesso!");

    listarProdutos();
    atualizarEstatisticas();
}


function atualizarEstatisticas() {

    let totalProdutos = produtos.length;

    let totalQuantidade = 0;

    let valorTotal = 0;


    for (let i = 0; i < produtos.length; i++) {

        totalQuantidade +=
            produtos[i].quantidade;

        valorTotal +=
            produtos[i].quantidade *
            produtos[i].valor;
    }


    document.getElementById("totalProdutos").innerText =
        totalProdutos;

    document.getElementById("totalQuantidade").innerText =
        totalQuantidade;

    document.getElementById("valorEstoque").innerText =
        "R$ " + valorTotal.toFixed(2);
}