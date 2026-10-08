let produtos = [];


// Validação do produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo 5 caracteres."
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    if (valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// Cadastrar produto
function cadastrarProduto() {

    const descricao = document
        .getElementById("descricao")
        .value
        .trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );

    try {

        validarProduto(
            descricao,
            quantidade,
            valor
        );

        const novoProduto = {

            codigo: produtos.length + 1,

            descricao: descricao,

            quantidade: quantidade,

            valor: valor
        };

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");

        limparCampos();

        listarProdutos();

    } catch (erro) {

        alert(erro.message);
    }
}


// Listar produtos
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.valor.toFixed(2)}
            </td>

            <td>

                <div class="acoes">

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

                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.codigo})">
                        Excluir
                    </button>

                </div>

            </td>
        `;

        lista.appendChild(linha);
    });
}


// Alterar valor
function alterarValor(codigoProduto) {

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (!produto) {

        alert("Produto não encontrado.");

        return;
    }

    const novoValor = Number(
        prompt(
            `Digite o novo valor para ${produto.descricao}:`
        )
    );

    if (isNaN(novoValor) || novoValor < 0) {

        alert(
            "O valor deve ser maior ou igual a zero."
        );

        return;
    }

    produto.valor = novoValor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}


// Alterar quantidade
function alterarQuantidade(codigoProduto) {

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (!produto) {

        alert("Produto não encontrado.");

        return;
    }

    const novaQuantidade = Number(
        prompt(
            `Digite a nova quantidade para ${produto.descricao}:`
        )
    );

    if (isNaN(novaQuantidade) || novaQuantidade < 1) {

        alert(
            "A quantidade deve ser maior que zero."
        );

        return;
    }

    produto.quantidade = novaQuantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}


// Excluir produto
function excluirProduto(codigoProduto) {

    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );

    if (!produto) {

        alert("Produto não encontrado.");

        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.codigo !== codigoProduto
    );

    listarProdutos();

    alert("Produto excluído com sucesso!");
}


// Limpar formulário
function limparCampos() {

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";
}


// Produtos de exemplo
cadastrarProdutoInicial(
    "Cadeira Gamer",
    12,
    699.00
);

cadastrarProdutoInicial(
    "Monitor Gamer",
    38,
    99.00
);


// Função para criar produtos iniciais
function cadastrarProdutoInicial(
    descricao,
    quantidade,
    valor
) {

    produtos.push({

        codigo: produtos.length + 1,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor
    });
}


// Mostrar produtos ao abrir a página
listarProdutos();