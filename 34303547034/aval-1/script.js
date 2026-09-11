// ======================================
// SISTEMA DE ESTOQUE
// ======================================

// Array que armazenará os produtos
let produtos = [];


// ======================================
// CADASTRAR PRODUTO
// ======================================

document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {

        // Impede o formulário de recarregar a página
        event.preventDefault();

        // Pegando os valores dos campos
        const codigo = document
            .getElementById("codigo")
            .value
            .trim();

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


        // Verifica se o código já existe
        const produtoExistente = produtos.find(
            produto => produto.codigo === codigo
        );

        if (produtoExistente) {
            alert("Já existe um produto com esse código!");
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


        // Limpa o formulário
        document.getElementById("formProduto").reset();


        // Atualiza a lista
        listarProdutos();

        alert("Produto cadastrado com sucesso!");
    });


// ======================================
// LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");
    const mensagem = document.getElementById("mensagemVazia");
    const total = document.getElementById("totalProdutos");


    // Limpa a tabela
    lista.innerHTML = "";


    // Atualiza o contador
    total.textContent =
        produtos.length +
        (produtos.length === 1 ? " produto" : " produtos");


    // Se não houver produtos
    if (produtos.length === 0) {

        mensagem.style.display = "block";

        return;
    }


    mensagem.style.display = "none";


    // Percorre todos os produtos
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


        lista.appendChild(linha);
    });
}


// ======================================
// ALTERAR VALOR
// ======================================

function alterarValor() {

    const codigo = document
        .getElementById("codigoAlterar")
        .value
        .trim();

    const novoValor = Number(
        document.getElementById("novoValor").value
    );


    // Procura o produto pelo código
    const produto = produtos.find(
        produto => produto.codigo === codigo
    );


    // Verifica se o produto existe
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }


    // Verifica se o valor é válido
    if (novoValor < 0 || isNaN(novoValor)) {
        alert("Digite um valor válido!");
        return;
    }


    // Altera o valor
    produto.valor = novoValor;


    // Atualiza a tabela
    listarProdutos();


    // Limpa os campos
    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novoValor").value = "";


    alert("Valor alterado com sucesso!");
}


// ======================================
// ALTERAR QUANTIDADE
// ======================================

function alterarQuantidade() {

    const codigo = document
        .getElementById("codigoAlterar")
        .value
        .trim();

    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );


    // Procura o produto
    const produto = produtos.find(
        produto => produto.codigo === codigo
    );


    // Verifica se existe
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }


    // Verifica se a quantidade é válida
    if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
        alert("Digite uma quantidade válida!");
        return;
    }


    // Altera a quantidade
    produto.quantidade = novaQuantidade;


    // Atualiza a tabela
    listarProdutos();


    // Limpa os campos
    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaQuantidade").value = "";


    alert("Quantidade alterada com sucesso!");
}


// ======================================
// INICIALIZAÇÃO
// ======================================

listarProdutos();
