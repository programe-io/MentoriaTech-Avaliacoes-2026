
let produtos = [];

function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    if (!codigo || !descricao || quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    if (Number(quantidade) < 0 || Number(valor) < 0) {
        alert("Quantidade e valor não podem ser negativos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach((produto, indice) => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>

                <button onclick="alterarValor(${indice})">
                    Alterar valor
                </button>

                <button onclick="alterarQuantidade(${indice})">
                    Alterar quantidade
                </button>
            </div>
        `;
    });
}

function alterarValor(indice) {
    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[indice].valor = novoValor;

    alert("Valor alterado com sucesso!");
    listarProdutos();
}

function alterarQuantidade(indice) {
    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[indice].quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");
    listarProdutos();
}

listarProdutos();
