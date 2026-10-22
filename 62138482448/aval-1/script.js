
let produtos = [];
let proximoCodigo = 1;

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

const formatarMoeda = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// Exibir mensagens para o usuário
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("error", erro);
    mensagem.classList.add("show");

    setTimeout(() => {
        mensagem.classList.remove("show");
    }, 3000);
}

// Validar os dados
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
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

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    atualizarTela();

    mostrarMensagem("Produto cadastrado com sucesso!");
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === codigoProduto
    );
}

// Listar produtos e atualizar a tabela
function listarProdutos() {
    const termo = pesquisa.value.trim().toLowerCase();

    const filtrados = produtos.filter(produto =>
        String(produto.codigo).includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    ${
                        produtos.length === 0
                            ? "Nenhum produto cadastrado."
                            : "Nenhum produto encontrado."
                    }
                </td>
            </tr>
        `;
    } else {
        listaProdutos.innerHTML = filtrados.map(produto => `
            <tr>
                <td>
                    <span class="code">
                        #${produto.codigo}
                    </span>
                </td>

                <td>
                    <span class="product-name">
                        ${escaparHTML(produto.descricao)}
                    </span>
                </td>

                <td>
                    <span class="stock ${produto.quantidade < 5 ? "low" : ""}">
                        ${produto.quantidade} un.
                    </span>
                </td>

                <td>${formatarMoeda(produto.valor)}</td>

                <td>
                    <strong>
                        ${formatarMoeda(
                            produto.quantidade * produto.valor
                        )}
                    </strong>
                </td>

                <td>
                    <div class="actions">
                        <button
                            class="btn-action"
                            data-acao="valor"
                            data-codigo="${produto.codigo}"
                        >
                            Preço
                        </button>

                        <button
                            class="btn-action"
                            data-acao="quantidade"
                            data-codigo="${produto.codigo}"
                        >
                            + Estoque
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");
    }

    document.getElementById("contadorTabela").textContent =
        `${filtrados.length} ${filtrados.length === 1 ? "item" : "itens"}`;
}

// Impedir que descrições sejam interpretadas como HTML
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// Atualizar os indicadores do painel
function atualizarIndicadores() {
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

// Atualizar toda a interface
function atualizarTela() {
    atualizarIndicadores();
    listarProdutos();
}

// Atualizar o preço de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Informe um valor válido, igual ou maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    atualizarTela();
    mostrarMensagem("Preço atualizado com sucesso!");
}

// Adicionar unidades ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "Informe uma quantidade inteira maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    atualizarTela();
    mostrarMensagem("Estoque atualizado com sucesso!");
}

// Receber o cadastro pelo formulário
formProduto.addEventListener("submit", evento => {
    evento.preventDefault();

    try {
        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        formProduto.reset();
        document.getElementById("descricao").focus();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Pesquisar produtos em tempo real
pesquisa.addEventListener("input", listarProdutos);

// Identificar os botões da tabela
listaProdutos.addEventListener("click", evento => {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    try {
        if (acao === "valor") {
            const entrada = prompt(
                `Produto: ${produto.descricao}\n` +
                `Preço atual: ${formatarMoeda(produto.valor)}\n\n` +
                "Digite o novo preço:"
            );

            if (entrada === null) return;

            const novoValor = entrada.trim() === ""
                ? NaN
                : Number(entrada);

            atualizarValor(codigo, novoValor);
        }

        if (acao === "quantidade") {
            const entrada = prompt(
                `Produto: ${produto.descricao}\n` +
                `Estoque atual: ${produto.quantidade} unidades\n\n` +
                "Quantas unidades deseja adicionar?"
            );

            if (entrada === null) return;

            const quantidade = entrada.trim() === ""
                ? NaN
                : Number(entrada);

            atualizarQuantidade(codigo, quantidade);
        }
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Estado inicial da interface
atualizarTela();
