// =====================================
// ARRAY DE PRODUTOS
// =====================================

let produtos = [];


// =====================================
// CADASTRAR PRODUTO
// =====================================

function cadastrarProduto() {

    // Pegando os valores dos campos
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(
        document.getElementById("quantidade").value
    );
    let valor = Number(
        document.getElementById("valor").value
    );


    // Verificando se os campos foram preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        quantidade === "" ||
        valor === ""
    ) {
        alert("💜 Preencha todos os campos!");
        return;
    }


    // Verificando se o código já existe
    let produtoExistente = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExistente) {
        alert("🌸 Já existe um produto com esse código!");
        return;
    }


    // Criando o objeto produto
    let produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    // Adicionando o produto ao array
    produtos.push(produto);


    // Limpando os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    // Atualizando a lista
    listarProdutos();


    alert("✨ Produto cadastrado com sucesso!");
}



// =====================================
// LISTAR PRODUTOS
// =====================================

function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    let contador = document.getElementById("contador");


    // Atualiza o contador
    contador.textContent =
        produtos.length +
        (produtos.length === 1
            ? " produto"
            : " produtos");


    // Se não houver produtos
    if (produtos.length === 0) {

        lista.innerHTML = `
            <div class="vazio">

                <span>🌸</span>

                <p>
                    Nenhum produto cadastrado ainda.
                </p>

                <small>
                    Cadastre seu primeiro produto!
                </small>

            </div>
        `;

        return;
    }


    // Limpando a lista
    lista.innerHTML = "";


    // Percorrendo os produtos
    for (let i = 0; i < produtos.length; i++) {

        let produto = produtos[i];


        // Verifica se está sem estoque
        let classeEstoque = "";

        if (produto.quantidade === 0) {
            classeEstoque = "sem-estoque";
        }


        // Criando o card do produto
        lista.innerHTML += `

            <div class="produto">

                <h3>
                    📦 ${produto.descricao}
                </h3>

                <p>
                    <strong>Código:</strong>
                    ${produto.codigo}
                </p>

                <p class="${classeEstoque}">
                    <strong>Quantidade:</strong>
                    ${produto.quantidade}
                </p>

                <p>
                    <strong>Valor:</strong>
                    R$ ${produto.valor.toFixed(2)}
                </p>

            </div>

        `;
    }
}



// =====================================
// ALTERAR VALOR
// =====================================

function alterarValor() {

    let codigo = document.getElementById(
        "codigoAlterar"
    ).value;

    let novoValor = Number(
        document.getElementById(
            "novoValor"
        ).value
    );


    // Procurando o produto
    let produto = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    // Verificando se encontrou
    if (!produto) {

        alert("🌸 Produto não encontrado!");

        return;
    }


    // Alterando o valor
    produto.valor = novoValor;


    // Atualizando a lista
    listarProdutos();


    // Limpando os campos
    document.getElementById(
        "codigoAlterar"
    ).value = "";

    document.getElementById(
        "novoValor"
    ).value = "";


    alert("💰 Valor alterado com sucesso!");
}



// =====================================
// ALTERAR QUANTIDADE
// =====================================

function alterarQuantidade() {

    let codigo = document.getElementById(
        "codigoAlterar"
    ).value;

    let novaQuantidade = Number(
        document.getElementById(
            "novaQuantidade"
        ).value
    );


    // Procurando o produto
    let produto = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    // Verificando se encontrou
    if (!produto) {

        alert("🌸 Produto não encontrado!");

        return;
    }


    // Alterando a quantidade
    produto.quantidade = novaQuantidade;


    // Atualizando a lista
    listarProdutos();


    // Limpando os campos
    document.getElementById(
        "codigoAlterar"
    ).value = "";

    document.getElementById(
        "novaQuantidade"
    ).value = "";


    alert("📦 Quantidade alterada com sucesso!");
}
