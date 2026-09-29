// ==========================================
// PRODUTOS CADASTRADOS NO SISTEMA
// ==========================================

let produtos = [
    {
        codigo: "001",
        descricao: "Arroz 5kg",
        quantidade: 20,
        valor: 25.90
    },

    {
        codigo: "002",
        descricao: "Feijão 1kg",
        quantidade: 15,
        valor: 8.50
    },

    {
        codigo: "003",
        descricao: "Macarrão 500g",
        quantidade: 30,
        valor: 4.99
    },

    {
        codigo: "004",
        descricao: "Açúcar 1kg",
        quantidade: 25,
        valor: 5.49
    },

    {
        codigo: "005",
        descricao: "Café 500g",
        quantidade: 10,
        valor: 14.90
    },

    {
        codigo: "006",
        descricao: "Leite 1L",
        quantidade: 18,
        valor: 5.99
    },

    {
        codigo: "007",
        descricao: "Óleo de Soja 900ml",
        quantidade: 12,
        valor: 7.49
    },

    {
        codigo: "008",
        descricao: "Bolacha Recheada",
        quantidade: 25,
        valor: 3.99
    },

    {
        codigo: "009",
        descricao: "Refrigerante 2L",
        quantidade: 10,
        valor: 9.90
    },

    {
        codigo: "010",
        descricao: "Água Mineral 500ml",
        quantidade: 40,
        valor: 2.50
    }
];


// ==========================================
// CADASTRAR NOVO PRODUTO
// ==========================================

function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se os campos estão preenchidos

    if (
        codigo === "" ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verificar quantidade

    if (quantidade < 0 || !Number.isInteger(quantidade)) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    // Verificar valor

    if (valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    // Verificar se o código já existe

    const produtoExistente = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criar o produto

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto ao array

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar os campos

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizar lista

    listarProdutos();
}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    // Se não houver produtos

    if (produtos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    // Mostrar todos os produtos

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.valor.toFixed(2).replace(".", ",")}
            </td>
        `;

        tabela.appendChild(linha);
    });
}


// ==========================================
// ALTERAR VALOR DO PRODUTO
// ==========================================

function alterarValor() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    if (codigo === "") {
        alert("Digite o código do produto!");
        return;
    }

    // Procurar produto pelo código

    const produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    // Pedir novo valor

    const novoValor = prompt(
        "Produto: " + produto.descricao +
        "\nValor atual: R$ " + produto.valor.toFixed(2) +
        "\n\nDigite o novo valor:"
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (
        novoValor.trim() === "" ||
        isNaN(valor) ||
        valor < 0
    ) {
        alert("Digite um valor válido!");
        return;
    }

    // Alterar valor

    produto.valor = valor;

    alert("Valor alterado com sucesso!");

    // Atualizar tabela

    listarProdutos();
}


// ==========================================
// ALTERAR QUANTIDADE DO PRODUTO
// ==========================================

function alterarQuantidade() {

    const codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    if (codigo === "") {
        alert("Digite o código do produto!");
        return;
    }

    // Procurar produto pelo código

    const produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    // Pedir nova quantidade

    const novaQuantidade = prompt(
        "Produto: " + produto.descricao +
        "\nQuantidade atual: " + produto.quantidade +
        "\n\nDigite a nova quantidade:"
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (
        novaQuantidade.trim() === "" ||
        isNaN(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(quantidade)
    ) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    // Alterar quantidade

    produto.quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");

    // Atualizar tabela

    listarProdutos();
}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarProdutos();