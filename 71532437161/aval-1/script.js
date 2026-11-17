
let produtos = [];

// Cadastrar produto
document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar código duplicado
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    this.reset();

    listarProdutos();
});


// Listar produtos
function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td>
                <button class="btn-valor"
                    onclick="alterarValor(${produto.codigo})">
                    Alterar Valor
                </button>

                <button class="btn-quantidade"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar Quantidade
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}


// Alterar valor do produto
function alterarValor(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}


// Alterar quantidade do produto
function alterarQuantidade(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}
