
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    let tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto) => {
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

function cadastrar() {
    try {
        let descricao = document.getElementById("descricao").value;
        let quantidade = Number(document.getElementById("quantidade").value);
        let valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        listarProdutos();

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

        alert("Produto cadastrado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}
