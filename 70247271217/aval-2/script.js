// ================================
// PRODUTOS CADASTRADOS
// ================================

let produtos = [
    {
        codigo: 1,
        descricao: "Arroz 5kg",
        quantidade: 20,
        valor: 25.90
    },

    {
        codigo: 2,
        descricao: "Feijão 1kg",
        quantidade: 35,
        valor: 8.50
    },

    {
        codigo: 3,
        descricao: "Macarrão 500g",
        quantidade: 50,
        valor: 4.99
    },

    {
        codigo: 4,
        descricao: "Óleo de Soja 900ml",
        quantidade: 25,
        valor: 7.49
    },

    {
        codigo: 5,
        descricao: "Açúcar 1kg",
        quantidade: 40,
        valor: 5.99
    }
];


// ================================
// CADASTRAR PRODUTO
// ================================

function cadastrarProduto() {

    let codigo = Number(
        document.getElementById("codigo").value
    );

    let descricao = document.getElementById("descricao").value;

    let quantidade = Number(
        document.getElementById("quantidade").value
    );

    let valor = Number(
        document.getElementById("valor").value
    );


    // Verificar os campos
    if (
        !codigo ||
        !descricao ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }


    // Verificar se o código já existe
    let produtoExistente = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    if (produtoExistente) {

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


    // Adicionar produto ao array
    produtos.push(produto);


    alert("Produto cadastrado com sucesso!");


    // Limpar campos
    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";


    // Atualizar lista
    listarProdutos();
}



// ================================
// LISTAR PRODUTOS
// ================================

function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    // Verificar se existem produtos
    if (produtos.length === 0) {

        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";

        return;
    }


    // Percorrer produtos
    produtos.forEach(function(produto) {

        lista.innerHTML += `

            <div class="produto">

                <p>
                    <strong>Código:</strong>
                    ${produto.codigo}
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${produto.descricao}
                </p>

                <p>
                    <strong>Quantidade:</strong>
                    ${produto.quantidade}
                </p>

                <p>
                    <strong>Valor:</strong>
                    R$ ${produto.valor.toFixed(2)}
                </p>

            </div>

        `;

    });

}



// ================================
// ALTERAR VALOR
// ================================

function alterarValor() {

    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let novoValor = Number(
        document.getElementById("novoValor").value
    );


    // Procurar produto
    let produto = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    // Produto não encontrado
    if (!produto) {

        alert("Produto não encontrado!");

        return;
    }


    // Verificar valor
    if (novoValor < 0 || !novoValor) {

        alert("Digite um valor válido!");

        return;
    }


    // Alterar valor
    produto.valor = novoValor;


    alert("Valor alterado com sucesso!");


    // Limpar campos
    document.getElementById("codigoAlterar").value = "";

    document.getElementById("novoValor").value = "";


    // Atualizar lista
    listarProdutos();

}



// ================================
// ALTERAR QUANTIDADE
// ================================

function alterarQuantidade() {

    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );


    // Procurar produto
    let produto = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    // Produto não encontrado
    if (!produto) {

        alert("Produto não encontrado!");

        return;
    }


    // Verificar quantidade
    if (
        novaQuantidade < 0 ||
        !Number.isInteger(novaQuantidade)
    ) {

        alert("Digite uma quantidade válida!");

        return;
    }


    // Alterar quantidade
    produto.quantidade = novaQuantidade;


    alert("Quantidade alterada com sucesso!");


    // Limpar campos
    document.getElementById("codigoAlterar").value = "";

    document.getElementById("novaQuantidade").value = "";


    // Atualizar lista
    listarProdutos();

}



// ================================
// MOSTRAR PRODUTOS AO ABRIR A PÁGINA
// ================================

listarProdutos();