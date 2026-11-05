
const produtos = [];

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td class="acoes">
                    <button onclick="atualizarValor(${produto.codigo})">
                        Atualizar valor
                    </button>

                    <button onclick="atualizarQuantidade(${produto.codigo})">
                        Atualizar quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}

function cadastrarProduto() {
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (descricao === "" || quantidade < 1 || valor <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const produto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listarProdutos();

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function atualizarValor(codigoProduto) {
    const novoValor = Number(prompt("Digite o novo valor:"));

    if (!Number.isFinite(novoValor) || novoValor <= 0) {
        alert("O valor deve ser maior que zero!");
        return;
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}

function atualizarQuantidade(codigoProduto) {
    const novaQuantidade = Number(prompt("Digite a quantidade a adicionar:"));

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("A quantidade deve ser maior que zero!");
        return;
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
        listarProdutos();
    } else {
        alert("Produto não encontrado!");
    }
}
