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


    if (
        codigo <= 0 ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }


    let codigoExiste = produtos.some(function(produto) {

        return produto.codigo === codigo;

    });


    if (codigoExiste) {

        alert("Este código já está sendo utilizado!");

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

    atualizarResumo();

    alert("Produto cadastrado com sucesso!");
}


function listarProdutos(lista = produtos) {

    let tabela =
        document.getElementById("listaProdutos");

    let mensagem =
        document.getElementById("mensagem");


    tabela.innerHTML = "";


    if (lista.length === 0) {

        mensagem.innerText =
            "Nenhum produto encontrado.";

        return;
    }


    mensagem.innerText = "";


    for (let i = 0; i < lista.length; i++) {

        tabela.innerHTML += `

            <tr>

                <td>${lista[i].codigo}</td>

                <td>${lista[i].descricao}</td>

                <td>${lista[i].quantidade}</td>

                <td>
                    R$ ${lista[i].valor.toFixed(2)}
                </td>

                <td>

                    <button
                        class="btn-valor"
                        onclick="alterarValor(${lista[i].codigo})"
                    >
                        Alterar valor
                    </button>

                    <button
                        class="btn-quantidade"
                        onclick="alterarQuantidade(${lista[i].codigo})"
                    >
                        Alterar quantidade
                    </button>

                </td>

            </tr>

        `;
    }
}


function encontrarProduto(codigo) {

    return produtos.find(function(produto) {

        return produto.codigo === codigo;

    });
}


function alterarValor(codigo) {

    let produto =
        encontrarProduto(codigo);


    if (!produto) {

        alert("Produto não encontrado!");

        return;
    }


    let novoValor = Number(

        prompt(
            "Digite o novo valor de " +
            produto.descricao + ":"
        )

    );


    if (
        novoValor < 0 ||
        isNaN(novoValor)
    ) {

        alert("Digite um valor válido!");

        return;
    }


    produto.valor = novoValor;


    listarProdutos();

    atualizarResumo();
}


function alterarQuantidade(codigo) {

    let produto =
        encontrarProduto(codigo);


    if (!produto) {

        alert("Produto não encontrado!");

        return;
    }


    let novaQuantidade = Number(

        prompt(
            "Digite a nova quantidade de " +
            produto.descricao + ":"
        )

    );


    if (
        novaQuantidade < 0 ||
        isNaN(novaQuantidade)
    ) {

        alert("Digite uma quantidade válida!");

        return;
    }


    produto.quantidade =
        novaQuantidade;


    listarProdutos();

    atualizarResumo();
}


function pesquisarProduto() {

    let pesquisa =

        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();


    let produtosFiltrados = produtos.filter(

        function(produto) {

            return produto.descricao
                .toLowerCase()
                .includes(pesquisa);

        }

    );


    listarProdutos(produtosFiltrados);
}


function atualizarResumo() {

    let totalProdutos =
        produtos.length;


    let totalQuantidade = 0;

    let valorTotal = 0;


    for (
        let i = 0;
        i < produtos.length;
        i++
    ) {

        totalQuantidade +=
            produtos[i].quantidade;


        valorTotal +=

            produtos[i].quantidade *
            produtos[i].valor;

    }


    document
        .getElementById("totalProdutos")
        .innerText =
        totalProdutos;


    document
        .getElementById("totalQuantidade")
        .innerText =
        totalQuantidade;


    document
        .getElementById("valorTotal")
        .innerText =

        "R$ " +
        valorTotal.toFixed(2);
}


function limparCampos() {

    document
        .getElementById("codigo")
        .value = "";


    document
        .getElementById("descricao")
        .value = "";


    document
        .getElementById("quantidade")
        .value = "";


    document
        .getElementById("valor")
        .value = "";
}