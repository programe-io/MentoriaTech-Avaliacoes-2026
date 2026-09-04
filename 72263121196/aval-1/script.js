let produtos = [];

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo === "" || descricao === "" || quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    limparCampos();
    listarProdutos();
}

function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
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

                <div class="botoes">

                    <button 
                        class="btn-valor"
                        onclick="alterarValor(${indice})">
                        Alterar Valor
                    </button>

                    <button 
                        class="btn-quantidade"
                        onclick="alterarQuantidade(${indice})">
                        Alterar Quantidade
                    </button>

                </div>

            </div>
        `;
    });
}

function alterarValor(indice) {

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor !== null && novoValor !== "") {

        produtos[indice].valor = Number(novoValor);

        listarProdutos();
    }
}

function alterarQuantidade(indice) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade !== "") {

        produtos[indice].quantidade = Number(novaQuantidade);

        listarProdutos();
    }
}