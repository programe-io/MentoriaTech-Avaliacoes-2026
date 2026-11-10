
let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        !Number.isInteger(codigo) || codigo <= 0 ||
        descricao.trim() === "" ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        document.getElementById("valor").value === "" ||
        !Number.isFinite(valor) || valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}


// LISTAR PRODUTOS
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach((produto, index) => {

        lista.innerHTML += `
            <div class="produto">

                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}

                <button onclick="alterarValor(${index})">
                    Alterar Valor
                </button>

                <button onclick="alterarQuantidade(${index})">
                    Alterar Quantidade
                </button>

                <button class="excluir" onclick="excluirProduto(${index})">
                    Excluir Produto
                </button>

            </div>
        `;

    });
}


// ALTERAR VALOR
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

    alert("Valor alterado com sucesso!");

    listarProdutos();
}


// ALTERAR QUANTIDADE
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}


// EXCLUIR PRODUTO
function excluirProduto(index) {

    let confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {

        produtos.splice(index, 1);

        alert("Produto excluído com sucesso!");

        listarProdutos();
    }
}


// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}
