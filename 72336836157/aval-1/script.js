// Array que armazenará os produtos
let produtos = [];

// Código automático dos produtos
let proximoCodigo = 1;


// CADASTRAR PRODUTO
function cadastrarProduto() {

    const descricao = document
        .getElementById("descricao")
        .value
        .trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );


    // Validação da descrição
    if (descricao === "") {
        alert("Digite a descrição do produto.");
        return;
    }

    // Validação da quantidade
    if (quantidade < 0 || isNaN(quantidade)) {
        alert("A quantidade deve ser maior ou igual a zero.");
        return;
    }

    // Validação do valor
    if (valor < 0 || isNaN(valor)) {
        alert("O valor deve ser maior ou igual a zero.");
        return;
    }


    // Criando o produto
    const produto = {
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adicionando o produto ao array
    produtos.push(produto);

    // Próximo código
    proximoCodigo++;


    // Limpar os campos
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    // Atualizar a lista
    listarProdutos();
}


// LISTAR PRODUTOS
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    // Verifica se existem produtos
    if (produtos.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

        return;
    }


    // Percorre os produtos
    produtos.forEach(function(produto) {

        const div = document.createElement("div");

        div.classList.add("produto");


        div.innerHTML = `
            <h3>
                Código: ${produto.codigo}
            </h3>

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

            <div class="acoes">

                <button
                    class="btn-valor"
                    onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                </button>

                <button
                    class="btn-quantidade"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                </button>

            </div>
        `;


        lista.appendChild(div);
    });
}


// ALTERAR VALOR
function alterarValor(codigo) {

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );


    if (!produto) {
        return;
    }


    const novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );


    // Validação
    if (isNaN(novoValor) || novoValor < 0) {

        alert("Digite um valor válido.");

        return;
    }


    // Alterar valor
    produto.valor = novoValor;


    // Atualizar lista
    listarProdutos();
}


// ALTERAR QUANTIDADE
function alterarQuantidade(codigo) {

    const produto = produtos.find(
        produto => produto.codigo === codigo
    );


    if (!produto) {
        return;
    }


    const novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );


    // Validação
    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0
    ) {

        alert("Digite uma quantidade válida.");

        return;
    }


    // Alterar quantidade
    produto.quantidade = novaQuantidade;


    // Atualizar lista
    listarProdutos();
}


// Mostrar a lista inicialmente
listarProdutos();