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


    // Verifica se os campos foram preenchidos corretamente
    if (
        codigo <= 0 ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }


    // Verifica se já existe um produto com o mesmo código
    let existe = produtos.some(function(produto) {

        return produto.codigo === codigo;

    });


    if (existe) {

        alert("Já existe um produto com esse código!");
        return;
    }


    // Cria o objeto produto
    let produto = {

        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor

    };


    // Adiciona o produto ao array
    produtos.push(produto);


    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    alert("Produto cadastrado com sucesso!");

    listarProdutos();
}


function listarProdutos() {

    let tabela =
        document.getElementById("listaProdutos");

    let mensagem =
        document.getElementById("mensagem");


    // Limpa a tabela antes de mostrar os produtos
    tabela.innerHTML = "";


    // Verifica se existem produtos
    if (produtos.length === 0) {

        mensagem.innerText =
            "Nenhum produto cadastrado.";

        return;
    }


    mensagem.innerText = "";


    // Percorre todos os produtos
    for (let i = 0; i < produtos.length; i++) {

        tabela.innerHTML += `

            <tr>

                <td>${produtos[i].codigo}</td>

                <td>${produtos[i].descricao}</td>

                <td>${produtos[i].quantidade}</td>

                <td>
                    R$ ${produtos[i].valor.toFixed(2)}
                </td>

                <td>

                    <button
                        class="btn-valor"
                        onclick="alterarValor(${produtos[i].codigo})"
                    >
                        Alterar valor
                    </button>

                    <button
                        class="btn-quantidade"
                        onclick="alterarQuantidade(${produtos[i].codigo})"
                    >
                        Alterar quantidade
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
            "Digite o novo valor do produto:"
        )
    );


    if (
        novoValor < 0 ||
        isNaN(novoValor)
    ) {

        alert("Digite um valor válido!");
        return;
    }


    // Altera o valor
    produtoEncontrado.valor = novoValor;


    alert("Valor alterado com sucesso!");

    listarProdutos();
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
            "Digite a nova quantidade:"
        )
    );


    if (
        novaQuantidade < 0 ||
        isNaN(novaQuantidade)
    ) {

        alert("Digite uma quantidade válida!");
        return;
    }


    // Altera a quantidade
    produtoEncontrado.quantidade = novaQuantidade;


    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}