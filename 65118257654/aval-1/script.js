let produtos = [];

function cadastrarProduto() {
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = document.getElementById("quantidade").value;
    const valor = document.getElementById("valor").value;

    if (!codigo || !descricao || !quantidade || !valor) {
        alert("Preencha todos os campos!");
        return;
    }

    const produto = {
        codigo: Number(codigo),
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    limparCampos();
    listarProdutos();
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>

                <button onclick="alterarValor(${index})">
                    Alterar Valor
                </button>

                <button onclick="alterarQuantidade(${index})">
                    Alterar Quantidade
                </button>
            </div>
        `;
    });
}

function alterarValor(index) {
    const novoValor = prompt("Digite o novo valor:");

    if (novoValor !== null && novoValor !== "") {
        produtos[index].valor = Number(novoValor);
        listarProdutos();
    }
}

function alterarQuantidade(index) {
    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade !== "") {
        produtos[index].quantidade = Number(novaQuantidade);
        listarProdutos();
    }
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}