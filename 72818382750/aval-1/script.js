// Lista que armazenará os produtos
let produtos = [];

// Cadastrar um novo produto
function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verifica se todos os campos foram preenchidos
    if (codigo === "" || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Verifica se já existe um produto com o mesmo código
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código.");
        return;
    }

    // Cria o produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona o produto à lista
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualiza a lista na tela
    listarProdutos();
}


// Listar os produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");
    const total = document.getElementById("totalProdutos");

    total.textContent =
        produtos.length === 1
            ? "1 produto"
            : `${produtos.length} produtos`;

    // Se não houver produtos
    if (produtos.length === 0) {
        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;
        return;
    }

    lista.innerHTML = "";

    // Percorre todos os produtos
    produtos.forEach(produto => {

        const item = document.createElement("div");

        item.className = "produto";

        item.innerHTML = `
            <div class="produto-info">
                <h3>${produto.descricao}</h3>
                <p><strong>Código:</strong> ${produto.codigo}</p>
            </div>

            <div class="produto-dados">
                <div class="valor">
                    R$ ${produto.valor.toFixed(2).replace(".", ",")}
                </div>

                <div class="quantidade">
                    Quantidade: ${produto.quantidade}
                </div>
            </div>
        `;

        lista.appendChild(item);
    });
}


// Alterar o valor de um produto
function alterarValor() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    if (codigo === "" || novoValor < 0) {
        alert("Informe o código e um novo valor válido.");
        return;
    }

    // Procura o produto pelo código
    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    // Altera o valor
    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}


// Alterar a quantidade de um produto
function alterarQuantidade() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    if (codigo === "" || novaQuantidade < 0) {
        alert("Informe o código e uma quantidade válida.");
        return;
    }

    // Procura o produto pelo código
    const produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    // Altera a quantidade
    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}


// Mostra a lista ao abrir a página
listarProdutos();
