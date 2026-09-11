// Array que armazenará os produtos
let produtos = [];


// =====================================
// CADASTRAR PRODUTO
// =====================================

function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verifica se os campos estão preenchidos
    if (codigo === 0 || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
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

    // Adiciona o produto ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// =====================================
// LISTAR PRODUTOS
// =====================================

function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <p class="sem-produtos">
                Nenhum produto cadastrado.
            </p>
        `;
        return;
    }

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;

    });
}


// =====================================
// ALTERAR VALOR
// =====================================

function alterarValor() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor < 0) {
        alert("O valor não pode ser negativo!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
}


// =====================================
// ALTERAR QUANTIDADE
// =====================================

function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade < 0) {
        alert("A quantidade não pode ser negativa!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}


// Mostra a lista inicialmente
listarProdutos();