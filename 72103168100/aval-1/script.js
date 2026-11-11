
let produtos = [];
let codigo = 1;

function cadastrarProduto() {
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.length < 3 || quantidade < 0 || !Number.isFinite(valor) || valor < 0 ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "") {
        alert("Preencha os campos corretamente!");
        return;
    }

    let produto = {
        codigo: codigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>

                <button onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                </button>

                <button onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                </button>
            </div>
        `;
    });
}

function alterarValor(codigo) {
    let produto = produtos.find(p => p.codigo === codigo);

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "" || !Number.isFinite(Number(novoValor)) || Number(novoValor) < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = Number(novoValor);

    alert("Valor alterado com sucesso!");
    listarProdutos();
}

function alterarQuantidade(codigo) {
    let produto = produtos.find(p => p.codigo === codigo);

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "" || !Number.isInteger(Number(novaQuantidade)) || Number(novaQuantidade) < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada com sucesso!");
    listarProdutos();
}
