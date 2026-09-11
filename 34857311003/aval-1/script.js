let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo === 0 || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}


// LISTAR PRODUTOS
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">
                <h3>${produto.descricao}</h3>
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;
    });
}


// ALTERAR VALOR
function alterarValor() {

    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {

        let novoValor = Number(prompt("Digite o novo valor:"));

        if (novoValor >= 0) {
            produto.valor = novoValor;

            alert("Valor alterado com sucesso!");

            listarProdutos();
        } else {
            alert("Digite um valor válido!");
        }

    } else {
        alert("Produto não encontrado!");
    }
}


// ALTERAR QUANTIDADE
function alterarQuantidade() {

    let codigo = Number(prompt("Digite o código do produto:"));

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produto) {

        let novaQuantidade = Number(
            prompt("Digite a nova quantidade:")
        );

        if (novaQuantidade >= 0) {
            produto.quantidade = novaQuantidade;

            alert("Quantidade alterada com sucesso!");

            listarProdutos();
        } else {
            alert("Digite uma quantidade válida!");
        }

    } else {
        alert("Produto não encontrado!");
    }
}

