
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5)
        throw new Error("Descrição muito curta!");

    if (quantidade < 1)
        throw new Error("Quantidade inválida!");

    if (valor < 0)
        throw new Error("Valor inválido!");
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    produtos.push({
        codigo: produtos.length + 1,
        descricao,
        quantidade,
        valor
    });

    listarProdutos();
}

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
                <td>
                    <button onclick="atualizarValor(${produto.codigo})">Preço</button>
                    <button onclick="atualizarQuantidade(${produto.codigo})">Estoque</button>
                </td>
            </tr>
        `;
    });
}

function atualizarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);
    const valor = Number(prompt("Novo valor:"));

    if (produto && valor >= 0) {
        produto.valor = valor;
        listarProdutos();
    } else {
        alert("Valor inválido!");
    }
}

function atualizarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);
    const quantidade = Number(prompt("Quantidade recebida:"));

    if (produto && Number.isInteger(quantidade) && quantidade >= 1) {
        produto.quantidade += quantidade;
        listarProdutos();
    } else {
        alert("Quantidade inválida!");
    }
}

document.getElementById("formProduto").addEventListener("submit", function(e) {
    e.preventDefault();

    try {
        cadastrarProduto(
            document.getElementById("descricao").value.trim(),
            Number(document.getElementById("quantidade").value),
            Number(document.getElementById("valor").value)
        );

        this.reset();
    } catch (erro) {
        alert(erro.message);
    }
});
