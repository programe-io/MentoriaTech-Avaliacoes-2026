
let produtos = [];

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O preço deve ser um número maior ou igual a zero."
        );
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();
}

// Listar produtos na tabela
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    lista.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        );

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const btnPreco = document.createElement("button");
        btnPreco.textContent = "Alterar preço";
        btnPreco.className = "btn-preco";
        btnPreco.addEventListener("click", () => {
            const novoValor = prompt(
                "Digite o novo preço:",
                produto.valor.toFixed(2)
            );

            if (novoValor === null || novoValor.trim() === "") {
                return;
            }

            try {
                atualizarValor(produto.codigo, Number(novoValor));
            } catch (erro) {
                alert(erro.message);
            }
        });

        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "+ Estoque";
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.addEventListener("click", () => {
            const novaQuantidade = prompt(
                "Quantas unidades deseja adicionar?"
            );

            if (
                novaQuantidade === null ||
                novaQuantidade.trim() === ""
            ) {
                return;
            }

            try {
                const quantidade = Number(novaQuantidade);
                atualizarQuantidade(produto.codigo, quantidade);
            } catch (erro) {
                alert(erro.message);
            }
        });

        acoes.append(btnPreco, btnQuantidade);
        linha.append(codigo, descricao, quantidade, valor, acoes);
        lista.appendChild(linha);
    });
}

// Atualizar preço
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O preço deve ser maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    listarProdutos();
}

// Adicionar quantidade ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;
    listarProdutos();
}

// Evento de cadastro do formulário
document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(
            document.getElementById("quantidade").value
        );
        const valor = Number(
            document.getElementById("valor").value
        );

        try {
            cadastrarProduto(descricao, quantidade, valor);
            this.reset();
            alert("Produto cadastrado com sucesso!");
        } catch (erro) {
            alert(erro.message);
        }
    }
);

// Exibir a tabela inicialmente
listarProdutos();

// Produtos de exemplo
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);
