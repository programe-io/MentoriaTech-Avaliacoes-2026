// Array que vai armazenar os produtos
let produtos = [];


// Cadastrar produto
function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );


    // Verificar campos
    if (
        codigo === "" ||
        descricao === "" ||
        quantidade === "" ||
        valor === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }


    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adicionar produto no array
    produtos.push(produto);


    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    // Atualizar lista
    listarProdutos();

    alert("Produto cadastrado com sucesso!");
}


// Listar produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>

                <button
                    class="btn"
                    onclick="alterarValor(${index})">
                    Alterar valor
                </button>

                <button
                    class="btn"
                    onclick="alterarQuantidade(${index})">
                    Alterar quantidade
                </button>

            </td>
        `;


        lista.appendChild(linha);
    });
}


// Alterar valor
function alterarValor(index) {

    const novoValor = prompt(
        "Digite o novo valor:"
    );


    if (novoValor === null) {
        return;
    }


    if (novoValor === "" || Number(novoValor) < 0) {
        alert("Digite um valor válido!");
        return;
    }


    produtos[index].valor = Number(novoValor);


    listarProdutos();
}


// Alterar quantidade
function alterarQuantidade(index) {

    const novaQuantidade = prompt(
        "Digite a nova quantidade:"
    );


    if (novaQuantidade === null) {
        return;
    }


    if (
        novaQuantidade === "" ||
        Number(novaQuantidade) < 0
    ) {
        alert("Digite uma quantidade válida!");
        return;
    }


    produtos[index].quantidade =
        Number(novaQuantidade);


    listarProdutos();
}
