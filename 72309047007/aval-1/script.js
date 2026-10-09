
// Lista de produtos do estoque
let produtos = [];

// Próximo código do produto
let proximoCodigo = 1;

// Cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        alert("A descrição deve ter no mínimo 5 caracteres!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("A quantidade deve ser um número inteiro maior que zero!");
        return;
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("O valor deve ser maior que zero!");
        return;
    }

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
    alert("Produto cadastrado com sucesso!");
}

// Listar os produtos cadastrados
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr> `;
        return;
    }

    produtos.forEach(function(produto) {
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

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "botao-valor";

        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "botao-quantidade";

        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

// Alterar o valor de um produto
function alterarValor(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novoValor = prompt(
        "Digite o novo valor do produto (R$):"
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor válido maior que zero!");
        return;
    }

    produto.valor = valor;

    listarProdutos();
    alert("Valor alterado com sucesso!");
}

// Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novaQuantidade = prompt(
        "Digite a nova quantidade do produto:"
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira igual ou maior que zero!");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();
    alert("Quantidade alterada com sucesso!");
}

// Evento do formulário de cadastro
document.getElementById("formProduto")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        // Limpar o formulário
        if (
            descricao.trim().length >= 5 &&
            Number.isInteger(quantidade) &&
            quantidade >= 1 &&
            Number.isFinite(valor) &&
            valor > 0
        ) {
            this.reset();
        }
    });

// Mostrar a tabela ao abrir a página
listarProdutos();

