let produtos = [];
let proximoCodigo = 1;
let codigoFiltrado = null;

// Formatação de valores em reais
const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// Validações
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser um número maior ou igual a zero."
        );
    }
}

function validarDescricao(descricao) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres."
        );
    }
}

// Cadastro
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);
    return novoProduto;
}

// Listagem
function listarProdutos() {
    console.table(produtos);
    return produtos;
}

// Busca
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        (prod) => prod.codigo === codigoProduto
    );
}

// Atualização de valor
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    return produto;
}

// Adiciona unidades à quantidade existente
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (!Number.isSafeInteger(
        produto.quantidade + novaQuantidade
    )) {
        throw new Error("Quantidade final inválida.");
    }

    produto.quantidade += novaQuantidade;
    return produto;
}

// Exclusão
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        (prod) => prod.codigo === codigoProduto
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    return produtos.splice(indice, 1)[0];
}

// Elementos do HTML
const formCadastro = document.getElementById("formCadastro");
const formBusca = document.getElementById("formBusca");
const formAtualizarValor =
    document.getElementById("formAtualizarValor");
const formAtualizarQuantidade =
    document.getElementById("formAtualizarQuantidade");

const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const resultadoBusca = document.getElementById("resultadoBusca");

// Exibe mensagens de sucesso ou erro
function mostrarMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
    mensagem.hidden = false;
}

function executarAcao(acao) {
    try {
        const resultado = acao();
        renderizarProdutos();
        return resultado;
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
        return null;
    }
}

// Atualiza os indicadores do estoque
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

// Cria uma célula sem interpretar a descrição como HTML
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

// Desenha a tabela
function renderizarProdutos() {
    listaProdutos.replaceChildren();

    const produtosVisiveis = codigoFiltrado === null
        ? produtos
        : produtos.filter(
            (produto) => produto.codigo === codigoFiltrado
        );

    document.getElementById("limparFiltro").hidden =
        codigoFiltrado === null;

    if (produtosVisiveis.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.className = "vazio";
        celula.textContent = codigoFiltrado === null
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
    }

    produtosVisiveis.forEach((produto) => {
        const linha = document.createElement("tr");

        linha.appendChild(criarCelula(produto.codigo));
        linha.appendChild(criarCelula(produto.descricao));
        linha.appendChild(criarCelula(produto.quantidade));
        linha.appendChild(criarCelula(
            formatarMoeda(produto.valor)
        ));
        linha.appendChild(criarCelula(
            formatarMoeda(produto.quantidade * produto.valor)
        ));

        const celulaAcoes = document.createElement("td");
        const grupoBotoes = document.createElement("div");
        grupoBotoes.className = "acoes";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.className = "botao perigo";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", () => {
            const confirmar = window.confirm(
                `Deseja excluir o produto "${produto.descricao}"?`
            );

            if (!confirmar) return;

            const excluido = executarAcao(
                () => excluirProduto(produto.codigo)
            );

            if (excluido) {
                if (codigoFiltrado === produto.codigo) {
                    codigoFiltrado = null;
                    resultadoBusca.hidden = true;
                }

                renderizarProdutos();
                mostrarMensagem("Produto excluído com sucesso.");
            }
        });

        grupoBotoes.appendChild(botaoExcluir);
        celulaAcoes.appendChild(grupoBotoes);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}

// Cadastro de produto
formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const descricao =
        document.getElementById("descricao").value;

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);

    const produto = executarAcao(() =>
        cadastrarProduto(descricao, quantidade, valor)
    );

    if (produto) {
        formCadastro.reset();
        mostrarMensagem(
            `Produto "${produto.descricao}" cadastrado com o código ${produto.codigo}.`
        );
    }
});

// Busca por código
formBusca.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const codigo = Number(
        document.getElementById("codigoBusca").value
    );

    if (!Number.isSafeInteger(codigo) || codigo < 1) {
        mostrarMensagem("Informe um código válido.", "erro");
        return;
    }

    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        codigoFiltrado = null;
        resultadoBusca.hidden = true;
        renderizarProdutos();
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    codigoFiltrado = codigo;
    renderizarProdutos();

    resultadoBusca.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = "Produto encontrado";

    const descricao = document.createElement("p");
    descricao.textContent = `Descrição: ${produto.descricao}`;

    const codigoTexto = document.createElement("p");
    codigoTexto.textContent = `Código: ${produto.codigo}`;

    const quantidade = document.createElement("p");
    quantidade.textContent = `Quantidade: ${produto.quantidade}`;

    const valor = document.createElement("p");
    valor.textContent = `Valor unitário: ${formatarMoeda(produto.valor)}`;

    resultadoBusca.append(
        titulo, descricao, codigoTexto, quantidade, valor
    );

    resultadoBusca.hidden = false;
    mostrarMensagem("Produto encontrado com sucesso.");
});

// Limpar busca
document.getElementById("limparBusca")
    .addEventListener("click", () => {
        formBusca.reset();
        codigoFiltrado = null;
        resultadoBusca.hidden = true;
        renderizarProdutos();
        mostrarMensagem("Busca limpa. Todos os produtos estão visíveis.");
    });

// Mostrar todos os produtos depois de uma busca
document.getElementById("limparFiltro")
    .addEventListener("click", () => {
        codigoFiltrado = null;
        resultadoBusca.hidden = true;
        renderizarProdutos();
    });

// Atualizar valor
formAtualizarValor.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const codigo = Number(
        document.getElementById("codigoValor").value
    );

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    if (!Number.isSafeInteger(codigo) || codigo < 1) {
        mostrarMensagem("Informe um código válido.", "erro");
        return;
    }

    const produto = executarAcao(() =>
        atualizarValor(codigo, novoValor)
    );

    if (produto) {
        formAtualizarValor.reset();
        mostrarMensagem("Valor atualizado com sucesso.");
    }
});

// Adicionar quantidade ao estoque
formAtualizarQuantidade.addEventListener(
    "submit",
    (evento) => {
        evento.preventDefault();

        const codigo = Number(
            document.getElementById("codigoQuantidade").value
        );

        const quantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        if (!Number.isSafeInteger(codigo) || codigo < 1) {
            mostrarMensagem("Informe um código válido.", "erro");
            return;
        }

        const produto = executarAcao(() =>
            atualizarQuantidade(codigo, quantidade)
        );

        if (produto) {
            formAtualizarQuantidade.reset();
            mostrarMensagem("Estoque atualizado com sucesso.");
        }
    }
);

// Exibe a tabela vazia ao abrir a página
renderizarProdutos();