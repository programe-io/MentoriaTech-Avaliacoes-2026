let estoque = [];

function cadastrarProduto() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(produto);

    limparCampos();
    listarProdutos();
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (estoque.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    estoque.forEach((produto, index) => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>

                <div class="botoes">
                    <button class="btn-valor" onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button class="btn-quantidade" onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>
                </div>
            </div>
        `;
    });
}

function alterarValor(index) {
    let novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (novoValor < 0 || isNaN(novoValor)) {
        alert("Valor inválido!");
        return;
    }

    estoque[index].valor = novoValor;

    listarProdutos();
}

function alterarQuantidade(index) {
    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
        alert("Quantidade inválida!");
        return;
    }

    estoque[index].quantidade = novaQuantidade;

    listarProdutos();
}

function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

listarProdutos();
