
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        codigo === "" ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        quantidade < 0 ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existente = produtos.find(p => p.codigo === codigo);

    if (existente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listarProdutos();

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    alert("Produto cadastrado com sucesso!");
}

// Listar produtos
function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function(produto, index) {
        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>
                <div class="acoes">
                    <button onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>
                </div>
            </td>
        `;

        lista.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(index) {
    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = novoValor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(index) {
    let novaQuantidade = prompt("Digite a nova quantidade do produto:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isFinite(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}
