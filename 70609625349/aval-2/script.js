let produtos = [];


// CADASTRAR

function cadastrarProduto() {

    let codigo =
        document.getElementById("codigo").value;

    let descricao =
        document.getElementById("descricao").value;

    let imagem =
        document.getElementById("imagem").value;

    let cor =
        document.getElementById("cor").value;

    let quantidade =
        Number(
            document.getElementById("quantidade").value
        );

    let valor =
        Number(
            document.getElementById("valor").value
        );


    if (
        codigo === "" ||
        descricao === "" ||
        quantidade === 0 ||
        valor === 0
    ) {

        alert("💖 Preencha todos os campos!");

        return;
    }


    let existe =
        produtos.find(
            produto =>
                produto.codigo === codigo
        );


    if (existe) {

        alert(
            "⚠️ Esse código já está cadastrado!"
        );

        return;
    }


    let produto = {

        codigo: codigo,

        descricao: descricao,

        imagem: imagem,

        cor: cor,

        quantidade: quantidade,

        valor: valor
    };


    produtos.push(produto);


    alert(
        "💅 Esmalte cadastrado com sucesso!"
    );


    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";


    listarProdutos();
}



// LISTAR

function listarProdutos() {

    let lista =
        document.getElementById(
            "listaProdutos"
        );


    lista.innerHTML = "";


    if (produtos.length === 0) {

        lista.innerHTML = `
            <p class="mensagem">
                💅 Nenhum esmalte cadastrado.
            </p>
        `;

        return;
    }


    produtos.forEach(
        function(produto, indice) {

            lista.innerHTML += `

                <div class="produto">

                    <img
                        src="img/${produto.imagem}"
                        alt="${produto.descricao}"
                    >

                    <div class="produto-conteudo">

                        <h3>
                            💅 ${produto.descricao}
                        </h3>

                        <p>
                            <strong>
                                Código:
                            </strong>

                            ${produto.codigo}
                        </p>

                        <p>

                            <strong>
                                Cor:
                            </strong>

                            <span
                                class="cor"
                                style="
                                background-color:
                                ${produto.cor};
                                ">
                            </span>

                        </p>

                        <p>
                            <strong>
                                Quantidade:
                            </strong>

                            ${produto.quantidade}
                        </p>

                        <p>
                            <strong>
                                Valor:
                            </strong>

                            R$
                            ${produto.valor.toFixed(2)}
                        </p>


                        <div class="botoes">

                            <button
                                class="btn-valor"
                                onclick="
                                alterarValor(${indice})
                                ">
                                💰 Valor
                            </button>


                            <button
                                class="btn-quantidade"
                                onclick="
                                alterarQuantidade(${indice})
                                ">
                                📦 Quantidade
                            </button>


                            <button
                                class="btn-excluir"
                                onclick="
                                excluirProduto(${indice})
                                ">
                                🗑️
                            </button>

                        </div>

                    </div>

                </div>
            `;
        }
    );
}



// ALTERAR VALOR

function alterarValor(indice) {

    let novoValor =
        prompt(
            "💰 Digite o novo valor:"
        );


    if (novoValor === null) {
        return;
    }


    novoValor = Number(novoValor);


    if (
        isNaN(novoValor) ||
        novoValor < 0
    ) {

        alert(
            "⚠️ Digite um valor válido!"
        );

        return;
    }


    produtos[indice].valor =
        novoValor;


    listarProdutos();
}



// ALTERAR QUANTIDADE

function alterarQuantidade(indice) {

    let novaQuantidade =
        prompt(
            "📦 Digite a nova quantidade:"
        );


    if (novaQuantidade === null) {
        return;
    }


    novaQuantidade =
        Number(novaQuantidade);


    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0
    ) {

        alert(
            "⚠️ Digite uma quantidade válida!"
        );

        return;
    }


    produtos[indice].quantidade =
        novaQuantidade;


    listarProdutos();
}



// EXCLUIR

function excluirProduto(indice) {

    let confirmar =
        confirm(
            "🗑️ Deseja excluir este esmalte?"
        );


    if (confirmar) {

        produtos.splice(indice, 1);

        listarProdutos();
    }
}
