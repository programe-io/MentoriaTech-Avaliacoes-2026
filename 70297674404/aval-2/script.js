let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Celular cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum celular cadastrado.</p>";
        return;
    }

    produtos.forEach(function(produto, index) {

        lista.innerHTML += `
            <div class="card">
                <h3>📱 ${produto.descricao}</h3>

                <p><strong>Código:</strong> ${produto.codigo}</p>

                <p>
                    <strong>Quantidade:</strong>
                    ${produto.quantidade}
                </p>

                <p>
                    <strong>Valor:</strong>
                    R$ ${produto.valor.toFixed(2)}
                </p>

                <div class="botoes">
                    <button class="editar" onclick="alterarValor(${index})">
                        Alterar valor
                    </button>

                    <button class="editar" onclick="alterarQuantidade(${index})">
                        Alterar quantidade
                    </button>
                </div>
            </div>
        `;
    });
}

// Alterar valor
function alterarValor(index) {

    const novoValor = Number(
        prompt("Digite o novo valor do celular:")
    );

    if (novoValor >= 0) {
        produtos[index].valor = novoValor;
        listarProdutos();
    } else {
        alert("Valor inválido!");
    }
}

// Alterar quantidade
function alterarQuantidade(index) {

    const novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade >= 0) {
        produtos[index].quantidade = novaQuantidade;
        listarProdutos();
    } else {
        alert("Quantidade inválida!");
    }
}

// Limpar campos
function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

// Mostrar lista inicialmente
listarProdutos();