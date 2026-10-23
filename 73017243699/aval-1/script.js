
"use strict";

// Lista de produtos cadastrados
const produtos = [];
let proximoCodigo = 1;

// Elementos da página
const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const totalProdutos = document.getElementById("totalProdutos");
const valorEstoque = document.getElementById("valorEstoque");
const mensagem = document.getElementById("mensagem");

// Formatação de valores em reais
const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// Valida os dados de um produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos cinco caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser um número válido, maior ou igual a zero."
        );
    }

    // Evita valores monetários com mais de duas casas decimais
    if (Math.round(valor * 100) / 100 !== valor) {
        throw new Error(
            "O valor deve ter, no máximo, duas casas decimais."
        );
    }
}

// Exibe mensagens na página
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Localiza um produto pelo código
function buscarProduto(codigo) {
    const produto = produtos.find(
        (item) => item.codigo === codigo
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    return produto;
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    descricao = descricao.trim();

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao,
        quantidade,
        valor
    };

    produtos.push(novoProduto);

    renderizarProdutos();

    return novoProduto;
}

// Atualiza o valor unitário de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    if (Math.round(novoValor * 100) / 100 !== novoValor) {
        throw new Error(
            "O valor deve ter, no máximo, duas casas decimais."
        );
    }

    const produto = buscarProduto(codigoProduto);
    produto.valor = novoValor;

    renderizarProdutos();

    return produto;
}

// Adiciona unidades ao estoque existente
function atualizarQuantidade(codigoProduto, quantidadeAdicionada) {
    if (
        !Number.isSafeInteger(quantidadeAdicionada) ||
        quantidadeAdicionada < 1
    ) {
        throw new Error(
            "A quantidade adicionada deve ser um inteiro maior que zero."
        );
    }

    const produto = buscarProduto(codigoProduto);
    const novaQuantidade = produto.quantidade + quantidadeAdicionada;

    if (!Number.isSafeInteger(novaQuantidade)) {
        throw new Error("A quantidade final é muito grande.");
    }

    produto.quantidade = novaQuantidade;

    renderizarProdutos();

    return produto;
}

// Exclui um produto pelo código
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        (produto) => produto.codigo === codigoProduto
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    produtos.splice(indice, 1);
    renderizarProdutos();
}

// Cria uma célula de tabela com texto seguro
function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

// Cria um botão de ação
function criarBotao(texto, classe, acao, descricao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = `botao ${classe}`;
    botao.setAttribute("aria-label", descricao);
    botao.addEventListener("click", acao);

    return botao;
}

// Renderiza a tabela e os indicadores do estoque
function renderizarProdutos() {
    listaProdutos.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = criarCelula("Nenhum produto cadastrado.");

        celula.colSpan = 6;
        celula.className = "vazio";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
    }

    let totalEstoque = 0;

    produtos.forEach((produto) => {
        const linha = document.createElement("tr");

        const subtotal = produto.quantidade * produto.valor;
        totalEstoque += subtotal;

        linha.append(
            criarCelula(String(produto.codigo)),
            criarCelula(produto.descricao),
            criarCelula(String(produto.quantidade)),
            criarCelula(formatarMoeda(produto.valor)),
            criarCelula(formatarMoeda(subtotal))
        );

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        acoes.append(
            criarBotao(
                "Editar valor",
                "botao-editar",
                () => solicitarNovoValor(produto.codigo),
                `Editar valor de ${produto.descricao}`
            ),
            criarBotao(
                "+ Estoque",
                "botao-quantidade",
                () => solicitarQuantidade(produto.codigo),
                `Adicionar estoque de ${produto.descricao}`
            ),
            criarBotao(
                "Excluir",
                "botao-excluir",
                () => confirmarExclusao(produto.codigo),
                `Excluir ${produto.descricao}`
            )
        );

        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });

    totalProdutos.textContent =
        `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;

    // O arredondamento evita imprecisões comuns com números decimais
    totalEstoque = Math.round((totalEstoque + Number.EPSILON) * 100) / 100;
    valorEstoque.textContent = formatarMoeda(totalEstoque);
}

// Solicita um novo valor unitário
function solicitarNovoValor(codigo) {
    try {
        const produto = buscarProduto(codigo);

        const resposta = prompt(
            `Novo valor unitário de "${produto.descricao}" (R$):`,
            produto.valor.toFixed(2)
        );

        if (resposta === null) return;

        const novoValor = Number(resposta.replace(",", "."));

        atualizarValor(codigo, novoValor);
        exibirMensagem("Valor do produto atualizado!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Solicita quantas unidades serão adicionadas
function solicitarQuantidade(codigo) {
    try {
        const produto = buscarProduto(codigo);

        const resposta = prompt(
            `Quantas unidades deseja adicionar a "${produto.descricao}"?`
        );

        if (resposta === null) return;

        const quantidade = Number(resposta);

        atualizarQuantidade(codigo, quantidade);
        exibirMensagem("Estoque atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Solicita confirmação antes de excluir
function confirmarExclusao(codigo) {
    try {
        const produto = buscarProduto(codigo);

        if (!confirm(`Deseja excluir "${produto.descricao}"?`)) {
            return;
        }

        excluirProduto(codigo);
        exibirMensagem("Produto excluído com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Recebe os dados do formulário
formProduto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    try {
        const descricao = campoDescricao.value;
        const quantidade = Number(campoQuantidade.value);
        const valor = Number(campoValor.value);

        cadastrarProduto(descricao, quantidade, valor);

        exibirMensagem("Produto cadastrado com sucesso!");
        formProduto.reset();
        campoDescricao.focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Exibe a tabela inicial vazia
renderizarProdutos();
