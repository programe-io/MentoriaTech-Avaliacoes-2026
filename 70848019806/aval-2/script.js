
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        document.getElementById("codigo").value === "" ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        !Number.isInteger(codigo) ||
        codigo <= 0 ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código duplicado
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
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

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        let linha = document.createElement("tr");

        [produto.codigo, produto.descricao,
         produto.quantidade,
         "R$ " + produto.valor.toFixed(2)
        ].forEach(texto => {
            let celula = document.createElement("td");
            celula.textContent = texto;
            linha.appendChild(celula);
        });

        let acoes = document.createElement("td");

        acoes.innerHTML = `
            <button class="alterar"
                onclick="alterarValor(${index})">
                Valor
            </button>

            <button class="alterar"
                onclick="alterarQuantidade(${index})">
                Quantidade
            </button>

            <button class="excluir"
                onclick="excluirProduto(${index})">
                Excluir
            </button>
        `;

        linha.appendChild(acoes);
        tabela.appendChild(linha);
    });
}

// Alterar valor
function alterarValor(index) {

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[index].valor = novoValor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {

    if (confirm("Deseja excluir este produto?")) {

        produtos.splice(index, 1);

        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
