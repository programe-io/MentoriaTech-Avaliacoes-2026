// Array que vai armazenar os produtos
let produtos = [];


// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verifica se os campos estão preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        quantidade === "" ||
        valor === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verifica se o código já existe
    let produtoExistente = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Cria o produto
    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona o produto no array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualiza a lista
    listarProdutos();
}


// LISTAR PRODUTOS
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;
        return;
    }

    produtos.forEach(function(produto) {

        let div = document.createElement("div");

        div.classList.add("produto");

        div.innerHTML = `
            <h3>${produto.descricao}</h3>

            <p>
                <strong>Código:</strong> ${produto.codigo}
            </p>

            <p>
                <strong>Quantidade:</strong> ${produto.quantidade}
            </p>

            <p>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </p>
        `;

        lista.appendChild(div);
    });
}


// ALTERAR VALOR
function alterarValor() {

    let codigo = document.getElementById("codigoAlterar").value;
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novoValor").value = "";

    listarProdutos();
}


// ALTERAR QUANTIDADE
function alterarQuantidade() {

    let codigo = document.getElementById("codigoAlterar").value;
    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}