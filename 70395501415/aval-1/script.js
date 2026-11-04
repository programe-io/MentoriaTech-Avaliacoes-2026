let produtos = [];
let codigo = 1;

// Cadastrar produto
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.length < 5) {
        alert("A descrição deve ter pelo menos 5 caracteres.");
        return;
    }

    if (quantidade < 1 || valor < 0) {
        alert("Quantidade ou valor inválido.");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    codigo++;

    listarProdutos();

    this.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {
        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;
    });
}

// Alterar valor
function alterarValor() {
    let codigoProduto = Number(document.getElementById("codigoValor").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    let produto = produtos.find(function(p) {
        return p.codigo === codigoProduto;
    });

    if (produto) {
        if (novoValor < 0) {
            alert("O valor não pode ser negativo.");
            return;
        }

        produto.valor = novoValor;

        listarProdutos();

        alert("Valor atualizado!");
    } else {
        alert("Produto não encontrado.");
    }
}

// Alterar quantidade
function alterarQuantidade() {
    let codigoProduto = Number(document.getElementById("codigoQuantidade").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    let produto = produtos.find(function(p) {
        return p.codigo === codigoProduto;
    });

    if (produto) {
        if (novaQuantidade < 1) {
            alert("A quantidade deve ser maior que zero.");
            return;
        }

        produto.quantidade += novaQuantidade;

        listarProdutos();

        alert("Quantidade atualizada!");
    } else {
        alert("Produto não encontrado.");
    }
}