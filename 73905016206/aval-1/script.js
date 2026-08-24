let produtos = [];

// Cadastrar um novo produto
function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = document.getElementById("quantidade").value;
    const valor = document.getElementById("valor").value;

    if (codigo === "" || descricao === "" || quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const produto = {
        codigo: Number(codigo),
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}


// Listar os produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach((produto, indice) => {

        const div = document.createElement("div");

        div.className = "produto";

        div.innerHTML = `
            <p><strong>Código:</strong> ${produto.codigo}</p>

            <p><strong>Descrição:</strong> ${produto.descricao}</p>

            <p><strong>Quantidade:</strong> ${produto.quantidade}</p>

            <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>

            <div class="botoes">

                <button class="btn-valor" onclick="alterarValor(${indice})">
                    Alterar Valor
                </button>

                <button class="btn-quantidade" onclick="alterarQuantidade(${indice})">
                    Alterar Quantidade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// Alterar o valor do produto
function alterarValor(indice) {

    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor === "") {
        return;
    }

    const valor = Number(novoValor);

    if (isNaN(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[indice].valor = valor;

    listarProdutos();
}


// Alterar a quantidade do produto
function alterarQuantidade(indice) {

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[indice].quantidade = quantidade;

    listarProdutos();
}


// Limpar os campos depois do cadastro
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}


// Mostrar a lista ao abrir a página
listarProdutos();