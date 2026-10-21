// ========================================
// 1. CONFIGURAÇÕES E ARMAZENAMENTO
// ========================================

const CHAVE_STORAGE = "sistema_produtos";

let produtos = carregarProdutos();

function carregarProdutos() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);
        const lista = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(lista)) {
            return [];
        }

        return lista.filter(produto =>
            Number.isInteger(produto.codigo) &&
            typeof produto.descricao === "string" &&
            Number.isInteger(produto.quantidade) &&
            produto.quantidade >= 1 &&
            Number.isFinite(produto.valor) &&
            produto.valor >= 0
        );
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        return [];
    }
}

function salvarProdutos() {
    try {
        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(produtos)
        );
    } catch (erro) {
        mostrarMensagem(
            "Não foi possível salvar os dados no navegador.",
            false
        );
    }
}

// ========================================
// 2. VALIDAÇÃO
// ========================================

function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve conter no mínimo 5 caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
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

// ========================================
// 3. CADASTRAR PRODUTO
// ========================================

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length
            ? Math.max(...produtos.map(produto => produto.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarProdutos();
    listarProdutos();
}

// ========================================
// 4. LISTAR PRODUTOS NA TABELA
// ========================================

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        lista.appendChild(linha);

        return;
    }

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        // Código
        const celulaCodigo = document.createElement("td");
        celulaCodigo.textContent = produto.codigo;

        // Descrição
        const celulaDescricao = document.createElement("td");
        celulaDescricao.textContent = produto.descricao;

        // Quantidade
        const celulaQuantidade = document.createElement("td");
        celulaQuantidade.textContent = produto.quantidade;

        // Valor formatado em reais
        const celulaValor = document.createElement("td");
        celulaValor.textContent = formatarMoeda(produto.valor);

        // Botões de ação
        const celulaAcoes = document.createElement("td");
        celulaAcoes.className = "acoes";

        const botaoPreco = document.createElement("button");
        botaoPreco.textContent = "Preço";
        botaoPreco.className = "btn-editar";
        botaoPreco.type = "button";

        botaoPreco.addEventListener("click", () => {
            solicitarNovoValor(produto.codigo);
        });

        const botaoEstoque = document.createElement("button");
        botaoEstoque.textContent = "Estoque";
        botaoEstoque.className = "btn-editar";
        botaoEstoque.type = "button";

        botaoEstoque.addEventListener("click", () => {
            solicitarNovaQuantidade(produto.codigo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.type = "button";

        botaoExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        });

        celulaAcoes.append(
            botaoPreco,
            botaoEstoque,
            botaoExcluir
        );

        linha.append(
            celulaCodigo,
            celulaDescricao,
            celulaQuantidade,
            celulaValor,
            celulaAcoes
        );

        lista.appendChild(linha);
    });
}

// ========================================
// 5. ATUALIZAR PREÇO
// ========================================

function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser um número maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        item => item.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    salvarProdutos();
    listarProdutos();
}

function solicitarNovoValor(codigoProduto) {
    const produto = produtos.find(
        item => item.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", false);
        return;
    }

    const entrada = prompt(
        `Novo preço de ${produto.descricao}:`,
        produto.valor.toFixed(2)
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    // Aceita valores como 99,90 ou 99.90
    const texto = entrada.trim().replace(",", ".");
    const novoValor = Number(texto);

    try {
        atualizarValor(codigoProduto, novoValor);
        mostrarMensagem("Preço atualizado com sucesso!", true);
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

// ========================================
// 6. ATUALIZAR QUANTIDADE
// ========================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um inteiro maior que zero."
        );
    }

    const produto = produtos.find(
        item => item.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade = novaQuantidade;

    salvarProdutos();
    listarProdutos();
}

function solicitarNovaQuantidade(codigoProduto) {
    const produto = produtos.find(
        item => item.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", false);
        return;
    }

    const entrada = prompt(
        `Nova quantidade de ${produto.descricao}:`,
        produto.quantidade
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novaQuantidade = Number(entrada.trim());

    try {
        atualizarQuantidade(codigoProduto, novaQuantidade);
        mostrarMensagem("Estoque atualizado com sucesso!", true);
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

// ========================================
// 7. EXCLUIR PRODUTO
// ========================================

function excluirProduto(codigoProduto) {
    const produto = produtos.find(
        item => item.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", false);
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        item => item.codigo !== codigoProduto
    );

    salvarProdutos();
    listarProdutos();

    mostrarMensagem("Produto excluído com sucesso!", true);
}

// ========================================
// 8. MENSAGENS E FORMATAÇÃO
// ========================================

function mostrarMensagem(texto, sucesso) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = sucesso ? "sucesso" : "erro";
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ========================================
// 9. EVENTO DO FORMULÁRIO
// ========================================

document.getElementById("formProduto").addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade = Number(
            document.getElementById("quantidade").value
        );

        const valor = Number(
            document.getElementById("valor").value
        );

        try {
            cadastrarProduto(descricao, quantidade, valor);

            mostrarMensagem(
                "Produto cadastrado com sucesso!",
                true
            );

            this.reset();

            document.getElementById("descricao").focus();
        } catch (erro) {
            mostrarMensagem(erro.message, false);
        }
    }
);

// ========================================
// 10. INICIALIZAÇÃO
// ========================================

listarProdutos();