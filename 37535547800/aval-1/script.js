let produtos = [

    {
        codigo: 1,
        descricao: "Better Than the Movies",
        quantidade: 10,
        valor: 55.00
    },

    {
        codigo: 2,
        descricao: "Nothing Like the Movies",
        quantidade: 8,
        valor: 48.90
    },

    {
        codigo: 3,
        descricao: "The Do-Over",
        quantidade: 6,
        valor: 52.00
    },

    {
        codigo: 4,
        descricao: "Betting on You",
        quantidade: 7,
        valor: 55.00
    },

    {
        codigo: 5,
        descricao: "Fake Skating",
        quantidade: 5,
        valor: 59.00
    },

    {
        codigo: 6,
        descricao: "Trust Fall",
        quantidade: 4,
        valor: 62.00
    },

    {
        codigo: 7,
        descricao: "Mr. Wrong Number",
        quantidade: 9,
        valor: 54.00
    },

    {
        codigo: 8,
        descricao: "The Love Wager",
        quantidade: 6,
        valor: 56.90
    }

];


function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    for (let i = 0; i < produtos.length; i++) {

        let produto = produtos[i];

        let div = document.createElement("div");

        div.className = "produto";


        let situacao = "";


        if (produto.quantidade <= 3) {

            situacao =
                "<p class='estoque-baixo'>⚠ Estoque baixo</p>";

        } else {

            situacao =
                "<p class='estoque-normal'>✓ Estoque normal</p>";

        }


        div.innerHTML =

            "<h3>" + produto.descricao + "</h3>" +

            "<p><strong>Código:</strong> " +
            produto.codigo + "</p>" +

            "<p><strong>Quantidade:</strong> " +
            produto.quantidade + "</p>" +

            "<p><strong>Valor:</strong> R$ " +
            produto.valor.toFixed(2) + "</p>" +

            situacao;


        lista.appendChild(div);

    }


    atualizarResumo();

}


function cadastrarProduto(event) {

    event.preventDefault();


    let codigo =
        Number(document.getElementById("codigo").value);


    let descricao =
        document.getElementById("descricao").value;


    let quantidade =
        Number(document.getElementById("quantidade").value);


    let valor =
        Number(document.getElementById("valor").value);


    let codigoExiste = false;


    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {

            codigoExiste = true;

        }

    }


    if (codigoExiste === true) {

        alert("Esse código já está cadastrado!");

        return;

    }


    let produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    produtos.push(produto);


    alert("Produto cadastrado com sucesso!");


    document.getElementById("formProduto").reset();


    listarProdutos();

}


function alterarValor() {

    let codigo =
        Number(document.getElementById("codigoValor").value);


    let novoValor =
        Number(document.getElementById("novoValor").value);


    let encontrado = false;


    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {

            produtos[i].valor = novoValor;

            encontrado = true;

        }

    }


    if (encontrado === true) {

        alert("Valor alterado com sucesso!");

        document.getElementById("codigoValor").value = "";

        document.getElementById("novoValor").value = "";

        listarProdutos();

    } else {

        alert("Produto não encontrado!");

    }

}


function alterarQuantidade() {

    let codigo =
        Number(document.getElementById("codigoQuantidade").value);


    let novaQuantidade =
        Number(document.getElementById("novaQuantidade").value);


    let encontrado = false;


    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {

            produtos[i].quantidade = novaQuantidade;

            encontrado = true;

        }

    }


    if (encontrado === true) {

        alert("Quantidade alterada com sucesso!");

        document.getElementById("codigoQuantidade").value = "";

        document.getElementById("novaQuantidade").value = "";

        listarProdutos();

    } else {

        alert("Produto não encontrado!");

    }

}


function atualizarResumo() {

    let totalProdutos = produtos.length;

    let totalItens = 0;

    let valorEstoque = 0;


    for (let i = 0; i < produtos.length; i++) {

        totalItens =
            totalItens + produtos[i].quantidade;


        valorEstoque =
            valorEstoque +
            (produtos[i].quantidade * produtos[i].valor);

    }


    document.getElementById("totalProdutos").textContent =
        totalProdutos;


    document.getElementById("totalItens").textContent =
        totalItens;


    document.getElementById("valorEstoque").textContent =
        "R$ " + valorEstoque.toFixed(2);

}


function pesquisarProdutos() {

    let pesquisa =
        document.getElementById("pesquisa").value.toLowerCase();


    let lista =
        document.getElementById("listaProdutos");


    lista.innerHTML = "";


    for (let i = 0; i < produtos.length; i++) {

        let produto = produtos[i];


        if (
            produto.descricao
                .toLowerCase()
                .includes(pesquisa)
        ) {

            let div =
                document.createElement("div");


            div.className = "produto";


            let situacao = "";


            if (produto.quantidade <= 3) {

                situacao =
                    "<p class='estoque-baixo'>⚠ Estoque baixo</p>";

            } else {

                situacao =
                    "<p class='estoque-normal'>✓ Estoque normal</p>";

            }


            div.innerHTML =

                "<h3>" + produto.descricao + "</h3>" +

                "<p><strong>Código:</strong> " +
                produto.codigo + "</p>" +

                "<p><strong>Quantidade:</strong> " +
                produto.quantidade + "</p>" +

                "<p><strong>Valor:</strong> R$ " +
                produto.valor.toFixed(2) + "</p>" +

                situacao;


            lista.appendChild(div);

        }

    }

}


document
    .getElementById("formProduto")
    .addEventListener("submit", cadastrarProduto);


document
    .getElementById("pesquisa")
    .addEventListener("input", pesquisarProdutos);


listarProdutos();