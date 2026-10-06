// Produtos já cadastrados
let produtos = [
    {
        codigo: 1,
        descricao: "Notebook",
        quantidade: 10,
        valor: 3500.00
    },
    {
        codigo: 2,
        descricao: "Mouse",
        quantidade: 25,
        valor: 80.00
    },
    {
        codigo: 3,
        descricao: "Teclado",
        quantidade: 15,
        valor: 150.00
    }
];


// Mostrar os produtos na tela
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>
                <button class="btn-alterar"
                    onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                </button>

                <button class="btn-alterar"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}


// Cadastrar um novo produto
function cadastrarProduto() {

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        codigo === 0 ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verifica se o código já existe
    const produtoExiste = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExiste) {
        alert("Já existe um produto com esse código!");
        return;
    }

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    alert("Produto cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// Alterar o valor de um produto
function alterarValor(codigo) {

    const produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {

        const novoValor = prompt(
            "Digite o novo valor do produto:"
        );

        if (novoValor !== null && Number(novoValor) >= 0) {

            produto.valor = Number(novoValor);

            alert("Valor alterado com sucesso!");

            listarProdutos();
        }
    }
}


// Alterar a quantidade de um produto
function alterarQuantidade(codigo) {

    const produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {

        const novaQuantidade = prompt(
            "Digite a nova quantidade do produto:"
        );

        if (
            novaQuantidade !== null &&
            Number(novaQuantidade) >= 0
        ) {

            produto.quantidade = Number(novaQuantidade);

            alert("Quantidade alterada com sucesso!");

            listarProdutos();
        }
    }
}


// Exibe os produtos quando a página carregar
listarProdutos();