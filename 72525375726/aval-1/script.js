const produtos = [];
let proximoCodigo = 1;

// Elementos do HTML
const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const mensagem = document.getElementById("mensagem");

const listaProdutos = document.getElementById("listaProdutos");
const totalProdutosElemento = document.getElementById("totalProdutos");
const totalUnidadesElemento = document.getElementById("totalUnidades");
const valorEstoqueElemento = document.getElementById("valorEstoque");

// Formata valores para moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibe mensagens na tela
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Valida a descrição
function validarDescricao(descricao) {
    if (
        typeof descricao !== "string" ||
        descricao.trim().length < 5
    ) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }
}

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);

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

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);

    listarProdutos();
    atualizarResumo();

    return novoProduto;
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === Number(codigoProduto)
    );
}

// Atualiza o valor unitário
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
    atualizarResumo();

    exibirMensagem("Valor atualizado com sucesso!");
}

// Adiciona quantidade ao estoque existente
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (
        !Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1
    ) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (
        !Number.isSafeInteger(
            produto.quantidade + novaQuantidade
        )
    ) {
        throw new Error("A quantidade total é inválida.");
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
    atualizarResumo();

    exibirMensagem("Quantidade atualizada com sucesso!");
}

// Remove um produto do estoque
function removerProduto(codigoProduto) {
    const indice = produtos.findIndex(
        produto => produto.codigo === Number(codigoProduto)
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    const produto = produtos[indice];

    const confirmar = window.confirm(
        `Deseja realmente remover "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos.splice(indice, 1);

    listarProdutos();
    atualizarResumo();

    exibirMensagem("Produto removido com sucesso!");
}

// Atualiza a tabela de produtos
function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        // Coluna de ações
        const celulaAcoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.type = "button";
        botaoValor.textContent = "Alterar valor";
        botaoValor.addEventListener("click", () => {
            solicitarNovoValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.type = "button";
        botaoQuantidade.textContent = "Adicionar estoque";
        botaoQuantidade.addEventListener("click", () => {
            solicitarQuantidade(produto.codigo);
        });

        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", () => {
            try {
                removerProduto(produto.codigo);
            } catch (erro) {
                exibirMensagem(erro.message, "erro");
            }
        });

        celulaAcoes.append(
            botaoValor,
            botaoQuantidade,
            botaoRemover
        );

        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });
}

// Solicita um novo valor para o produto
function solicitarNovoValor(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = window.prompt(
        `Novo valor unitário para "${produto.descricao}":`,
        produto.valor.toFixed(2)
    );

    if (entrada === null) {
        return;
    }

    // Aceita tanto vírgula quanto ponto decimal
    const texto = entrada.trim();

    if (!/^\d+(?:[.,]\d{1,2})?$/.test(texto)) {
        exibirMensagem(
            "Informe um valor válido, com até duas casas decimais.",
            "erro"
        );
        return;
    }

    const novoValor = Number(texto.replace(",", "."));

    try {
        atualizarValor(codigoProduto, novoValor);
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Solicita quantidade adicional para o produto
function solicitarQuantidade(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = window.prompt(
        `Quantas unidades deseja adicionar a "${produto.descricao}"?`,
        "1"
    );

    if (entrada === null) {
        return;
    }

    const texto = entrada.trim();

    if (!/^\d+$/.test(texto)) {
        exibirMensagem(
            "Informe uma quantidade inteira válida.",
            "erro"
        );
        return;
    }

    const quantidade = Number(texto);

    try {
        atualizarQuantidade(codigoProduto, quantidade);
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Calcula e exibe o resumo do estoque
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    totalProdutosElemento.textContent = totalProdutos;
    totalUnidadesElemento.textContent = totalUnidades;
    valorEstoqueElemento.textContent = formatarMoeda(valorEstoque);

    return {
        totalProdutos,
        totalUnidades,
        valorEstoque
    };
}

// Recebe os dados do formulário HTML
formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value;
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        exibirMensagem("Produto cadastrado com sucesso!");

        formProduto.reset();
        campoDescricao.focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Inicializa a interface
listarProdutos();
atualizarResumo();