// Lista de produtos
let produtos = [];

// Elementos do HTML
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens na tela
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos 5 caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}

// Cadastra um produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(produto => produto.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();

    return novoProduto;
}

// Lista os produtos
function listarProdutos() {
    listaProdutos.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 5;
        coluna.className = "vazio";
        coluna.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(coluna);
        listaProdutos.appendChild(linha);
    }

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        adicionarCelula(linha, produto.codigo);
        adicionarCelula(linha, produto.descricao);
        adicionarCelula(linha, produto.quantidade);
        adicionarCelula(linha, formatarMoeda(produto.valor));

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        // Botão para alterar o preço
        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "btn-editar";

        botaoValor.addEventListener("click", function () {
            const entrada = prompt("Digite o novo valor:");

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            try {
                atualizarValor(produto.codigo, Number(entrada));
                mostrarMensagem(
                    "Valor atualizado com sucesso!",
                    "sucesso"
                );
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        // Botão para adicionar unidades
        const botaoEstoque = document.createElement("button");
        botaoEstoque.textContent = "Entrada de estoque";
        botaoEstoque.className = "btn-estoque";

        botaoEstoque.addEventListener("click", function () {
            const entrada = prompt(
                "Quantas unidades deseja adicionar?"
            );

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            try {
                atualizarQuantidade(
                    produto.codigo,
                    Number(entrada)
                );

                mostrarMensagem(
                    "Estoque atualizado com sucesso!",
                    "sucesso"
                );
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        acoes.append(botaoValor, botaoEstoque);
        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);

        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// Adiciona uma célula à tabela
function adicionarCelula(linha, conteudo) {
    const coluna = document.createElement("td");
    coluna.textContent = conteudo;
    linha.appendChild(coluna);
}

// Formata o valor em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualiza o resumo do estoque
function atualizarResumo() {
    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === codigoProduto
    );
}

// Atualiza o valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    listarProdutos();
}

// Adiciona quantidade ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (!Number.isSafeInteger(
        produto.quantidade + novaQuantidade
    )) {
        throw new Error("Quantidade final muito alta.");
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
}

// Evento de cadastro do formulário
formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    try {
        const descricao =
            document.getElementById("descricao").value;

        const quantidade = Number(
            document.getElementById("quantidade").value
        );

        const valor = Number(
            document.getElementById("valor").value
        );

        cadastrarProduto(descricao, quantidade, valor);

        mostrarMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );

        formProduto.reset();
        document.getElementById("descricao").focus();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Exibe a lista inicial
listarProdutos();