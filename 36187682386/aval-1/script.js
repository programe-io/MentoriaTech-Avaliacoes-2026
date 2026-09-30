// Array que armazenará os produtos
let produtos = [];

// Função para cadastrar um novo produto
function cadastrarProduto() {
    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verifica se todos os campos foram preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0 ||
        isNaN(quantidade) ||
        isNaN(valor)
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Verifica se o código já está cadastrado
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto cadastrado com esse código.");
        return;
    }

    // Cria o novo produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona o produto ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualiza a tabela
    listarProdutos();
}

// Função para listar os produtos
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    // Limpa a tabela antes de inserir os produtos
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
                    class="btn-alterar"
                    onclick="alterarValor(${index})">
                    Alterar Valor
                </button>

                <button 
                    class="btn-alterar"
                    onclick="alterarQuantidade(${index})">
                    Alterar Quantidade
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}

// Função para alterar o valor do produto
function alterarValor(index) {
    const novoValor = prompt(
        "Digite o novo valor do produto:"
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (isNaN(valor) || valor < 0) {
        alert("Digite um valor válido.");
        return;
    }

    produtos[index].valor = valor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}

// Função para alterar a quantidade do produto
function alterarQuantidade(index) {
    const novaQuantidade = prompt(
        "Digite a nova quantidade do produto:"
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida.");
        return;
    }

    produtos[index].quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}
