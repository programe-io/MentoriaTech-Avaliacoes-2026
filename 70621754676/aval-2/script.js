// Array para guardar os produtos
let produtos = [];


// CADASTRAR PRODUTO
document.getElementById("btnCadastrar").addEventListener("click", function() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo === 0 || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    let existe = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar produto
    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
});


// LISTAR PRODUTOS
document.getElementById("btnListar").addEventListener("click", function() {
    listarProdutos();
});


function listarProdutos() {

    let resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (produtos.length === 0) {
        resultado.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(function(produto) {

        resultado.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </div>
        `;

    });
}


// ALTERAR VALOR
document.getElementById("btnValor").addEventListener("click", function() {

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
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("novoValor").value = "";

    listarProdutos();
});


// ALTERAR QUANTIDADE
document.getElementById("btnQuantidade").addEventListener("click", function() {

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
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
});