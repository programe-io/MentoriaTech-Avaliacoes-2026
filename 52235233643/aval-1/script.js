// ======================================
// SISTEMA DE ESTOQUE
// ======================================

// Array que armazenará os produtos
let produtos = [];


// ======================================
// CADASTRAR PRODUTO
// ======================================

document
    .getElementById("formulario")
    .addEventListener("submit", function(event) {

        // Evita que a página seja recarregada
        event.preventDefault();

        // Pega os valores digitados pelo usuário
        let codigo = document
            .getElementById("codigo")
            .value
            .trim();

        let descricao = document
            .getElementById("descricao")
            .value
            .trim();

        let quantidade = Number(
            document.getElementById("quantidade").value
        );

        let valor = Number(
            document.getElementById("valor").value
        );


        // Verifica se já existe um produto
        let produtoExiste = produtos.some(
            produto => produto.codigo === codigo
        );

        if (produtoExiste) {

            alert("Esse código já está cadastrado!");

            return;
        }


        // Cria o produto
        let produto = {
            codigo: codigo,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };


        // Adiciona o produto ao estoque
        produtos.push(produto);


        // Limpa o formulário
        document
            .getElementById("formulario")
            .reset();


        // Atualiza a tabela
        listarProdutos();


        alert("Produto cadastrado com sucesso!");
    });


// ======================================
// LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    let mensagem = document.getElementById("semProdutos");

    let contador = document.getElementById("contador");


    // Limpa a lista antes de mostrar novamente
    lista.innerHTML = "";


    // Atualiza o contador
    contador.textContent =
        produtos.length +
        (produtos.length === 1 ? " produto" : " produtos");


    // Verifica se não existem produtos
    if (produtos.length === 0) {

        mensagem.style.display = "block";

        return;
    }


    mensagem.style.display = "none";


    // Percorre os produtos
    produtos.forEach(function(produto) {

        let linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.valor
                    .toFixed(2)
                    .replace(".", ",")}
            </td>
        `;


        lista.appendChild(linha);
    });
}


// ======================================
// ALTERAR VALOR
// ======================================

function alterarValor() {

    let codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    let novoValor = Number(
        document.getElementById("novoValor").value
    );


    // Procura o produto pelo código
    let produto = produtos.find(
        produto => produto.codigo === codigo
    );


    // Se não encontrar
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
    document.getElementById("codigoAlteracao").value = "";
    document.getElementById("novoValor").value = "";


    alert("Valor alterado com sucesso!");
}


// ======================================
// ALTERAR QUANTIDADE
// ======================================

function alterarQuantidade() {

    let codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );


    // Procura o produto
    let produto = produtos.find(
        produto => produto.codigo === codigo
    );


    // Verifica se encontrou
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
    document.getElementById("codigoAlteracao").value = "";
    document.getElementById("novaQuantidade").value = "";


    alert("Quantidade alterada com sucesso!");
}


// ======================================
// INICIAR SISTEMA
// ======================================

listarProdutos();
