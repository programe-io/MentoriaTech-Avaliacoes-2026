
"use strict";

// 1. Lista de produtos e elementos HTML
let produtos = carregarProdutos();

const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const campoPesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

// 2. Carregar produtos salvos no navegador
function carregarProdutos() {
    try {
        const dados = localStorage.getItem("estoqueProdutos");
        const lista = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(lista)) {
            return [];
        }

        // Confere se os dados básicos são válidos.
        return lista.filter(produto =>
            produto &&
            Number.isSafeInteger(produto.codigo) &&
            produto.codigo > 0 &&
            typeof produto.descricao === "string" &&
            produto.descricao.trim().length >= 5 &&
            Number.isSafeInteger(produto.quantidade) &&
            produto.quantidade >= 1 &&
            Number.isFinite(produto.valor) &&
            produto.valor >= 0
        );
    } catch (erro) {
        return [];
    }
}

// 3. Salvar produtos no navegador
function salvarProdutos() {
    try {
        localStorage.setItem(
            "estoqueProdutos",
            JSON.stringify(produtos)
        );
    } catch (erro) {
        throw new Error(
            "Não foi possível salvar os dados neste navegador."
        );
    }
}

// 4. Exibir mensagens na tela
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// 5. Validar os dados do produto
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
            "O valor deve ser um número maior ou igual a zero."
        );
    }
}

// 6. Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === codigoProduto
    );
}

// 7. Gerar código automático
function gerarCodigo() {
    if (produtos.length === 0) {
        return 1;
    }

    const maiorCodigo = Math.max(
        ...produtos.map(produto => produto.codigo)
    );

    if (maiorCodigo >= Number.MAX_SAFE_INTEGER) {
        throw new Error("Não é possível gerar outro código.");
    }

    return maiorCodigo + 1;
}

// 8. Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: gerarCodigo(),
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    try {
        salvarProdutos();
    } catch (erro) {
        produtos.pop();
        throw erro;
    }

    return novoProduto;
}

// 9. Listar produtos e atualizar a tabela
function listarProdutos(termo = "") {
    listaProdutos.replaceChildren();

    const busca = termo.trim().toLocaleLowerCase("pt-BR");

    const filtrados = produtos.filter(produto =>
        String(produto.codigo).includes(busca) ||
        produto.descricao.toLocaleLowerCase("pt-BR")
            .includes(busca)
    );

    if (filtrados.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.className = "vazio";
        celula.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);

        atualizarResumo();
        return;
    }

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        adicionarCelula(linha, produto.codigo);
        adicionarCelula(linha, produto.descricao);
        adicionarCelula(linha, produto.quantidade);
        adicionarCelula(linha, formatarMoeda(produto.valor));
        adicionarCelula(
            linha,
            formatarMoeda(produto.quantidade * produto.valor)
        );

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        criarBotao(
            acoes,
            "Editar valor",
            "botao botao-editar",
            () => editarValor(produto.codigo)
        );

        criarBotao(
            acoes,
            "Entrada",
            "botao botao-estoque",
            () => adicionarEstoque(produto.codigo)
        );

        criarBotao(
            acoes,
            "Excluir",
            "botao botao-excluir",
            () => excluirProduto(produto.codigo)
        );

        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);
        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// 10. Criar células sem inserir HTML fornecido pelo usuário
function adicionarCelula(linha, valor) {
    const celula = document.createElement("td");
    celula.textContent = String(valor);
    linha.appendChild(celula);
}

// 11. Criar botões de ação
function criarBotao(container, texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    container.appendChild(botao);
}

// 12. Formatar valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// 13. Atualizar os indicadores do estoque
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

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

// 14. Atualizar o valor de um produto
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

    const valorAnterior = produto.valor;
    produto.valor = novoValor;

    try {
        salvarProdutos();
    } catch (erro) {
        produto.valor = valorAnterior;
        throw erro;
    }

    listarProdutos(campoPesquisa.value);
}

// 15. Abrir edição do valor
function editarValor(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const resposta = prompt(
        `Novo valor para ${produto.descricao}:`,
        String(produto.valor)
    );

    if (resposta === null) {
        return;
    }

    const novoValor = resposta.trim() === ""
        ? NaN
        : Number(resposta.replace(",", "."));

    try {
        atualizarValor(codigoProduto, novoValor);
        exibirMensagem("Valor atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// 16. Adicionar quantidade ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "Informe uma quantidade inteira maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (!Number.isSafeInteger(
        produto.quantidade + novaQuantidade
    )) {
        throw new Error("Quantidade final fora do limite permitido.");
    }

    const quantidadeAnterior = produto.quantidade;
    produto.quantidade += novaQuantidade;

    try {
        salvarProdutos();
    } catch (erro) {
        produto.quantidade = quantidadeAnterior;
        throw erro;
    }

    listarProdutos(campoPesquisa.value);
}

// 17. Abrir entrada de estoque
function adicionarEstoque(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const resposta = prompt(
        `Quantas unidades deseja adicionar a ${produto.descricao}?`
    );

    if (resposta === null) {
        return;
    }

    const quantidade = /^\d+$/.test(resposta.trim())
        ? Number(resposta.trim())
        : NaN;

    try {
        atualizarQuantidade(codigoProduto, quantidade);
        exibirMensagem("Estoque atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// 18. Excluir produto
function excluirProduto(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    const indice = produtos.findIndex(
        item => item.codigo === codigoProduto
    );

    const removido = produtos.splice(indice, 1)[0];

    try {
        salvarProdutos();
    } catch (erro) {
        produtos.splice(indice, 0, removido);
        exibirMensagem(erro.message, "erro");
        return;
    }

    listarProdutos(campoPesquisa.value);
    exibirMensagem("Produto excluído com sucesso!");
}

// 19. Receber o formulário de cadastro
formProduto.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value;
    const quantidade = campoQuantidade.value.trim() !== ""
        ? Number(campoQuantidade.value)
        : NaN;
    const valor = campoValor.value.trim() !== ""
        ? Number(campoValor.value)
        : NaN;

    try {
        const produto = cadastrarProduto(
            descricao,
            quantidade,
            valor
        );

        listarProdutos(campoPesquisa.value);
        formProduto.reset();

        exibirMensagem(
            `Produto "${produto.descricao}" cadastrado com código ${produto.codigo}.`
        );

        campoDescricao.focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// 20. Pesquisar produtos enquanto digita
campoPesquisa.addEventListener("input", function() {
    listarProdutos(campoPesquisa.value);
});

// 21. Mostrar os dados ao abrir a página
listarProdutos();
