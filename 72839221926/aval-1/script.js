
let produtos = [];

function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td class="acoes">
                    <button onclick="alterarValor(${indice})">
                        Alterar valor
                    </button>

                    <button onclick="alterarQuantidade(${indice})">
                        Alterar quantidade
                    </button>

                    <button class="excluir" onclick="excluirProduto(${indice})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

function alterarValor(indice) {
    let novoValor = prompt("Digite o novo valor:");

    if (novoValor !== null && novoValor.trim() !== "" && Number(novoValor) >= 0) {
        produtos[indice].valor = Number(novoValor);
        listarProdutos();
        alert("Valor alterado com sucesso!");
    }
}

function alterarQuantidade(indice) {
    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade.trim() !== "" && Number(novaQuantidade) >= 0) {
        produtos[indice].quantidade = Number(novaQuantidade);
        listarProdutos();
        alert("Quantidade alterada com sucesso!");
    }
}

function excluirProduto(indice) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(indice, 1);
        listarProdutos();
    }
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
