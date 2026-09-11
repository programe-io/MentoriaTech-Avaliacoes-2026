let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar campos
    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código duplicado
    let produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criar produto
    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(produto => {

        lista.innerHTML += `
            <div class="produto">

                <p><strong>Código:</strong> ${produto.codigo}</p>

                <p><strong>Descrição:</strong> ${produto.descricao}</p>

                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>

                <p>
                    <strong>Valor:</strong>
                    R$ ${produto.valor.toFixed(2)}
                </p>

                <div class="botoes">

                    <button
                        class="btn-valor"
                        onclick="alterarValor(${produto.codigo})">
                        Alterar Valor
                    </button>

                    <button
                        class="btn-quantidade"
                        onclick="alterarQuantidade(${produto.codigo})">
                        Alterar Quantidade
                    </button>

                </div>

            </div>
        `;
    });
}


// Alterar valor
function alterarValor(codigo) {

    let produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (novoValor < 0 || isNaN(novoValor)) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
}


// Alterar quantidade
function alterarQuantidade(codigo) {

    let produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    listarProdutos();
}


// Mostrar a lista ao abrir a página
listarProdutos();
