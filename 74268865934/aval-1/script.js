
let produtos = [];
let proximoCodigo = 1;

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

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
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    renderizarProdutos();
    mostrarMensagem("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    return produtos;
}

function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    renderizarProdutos();
    mostrarMensagem("Valor atualizado com sucesso!");
}

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

    // Adiciona unidades ao estoque atual.
    produto.quantidade += novaQuantidade;

    renderizarProdutos();
    mostrarMensagem("Estoque atualizado com sucesso!");
}

function renderizarProdutos() {
    const termo = pesquisa.value.trim().toLowerCase();

    const filtrados = listarProdutos().filter(produto =>
        produto.descricao.toLowerCase().includes(termo) ||
        String(produto.codigo).includes(termo)
    );

    if (filtrados.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
    } else {
        listaProdutos.innerHTML = filtrados.map(produto => `
            <tr>
                <td>${produto.codigo}</td>
                <td>${escaparHTML(produto.descricao)}</td>
                <td>${produto.quantidade}</td>
                <td>${moeda.format(produto.valor)}</td>
                <td>${moeda.format(
                    produto.quantidade * produto.valor
                )}</td>
                <td>
                    <div class="acoes">
                        <button
                            class="botao-editar"
                            data-acao="valor"
                            data-codigo="${produto.codigo}">
                            Editar preço
                        </button>

                        <button
                            class="botao-estoque"
                            data-acao="estoque"
                            data-codigo="${produto.codigo}">
                            + Estoque
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");
    }

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalEstoque").textContent =
        produtos.reduce(
            (total, produto) => total + produto.quantidade,
            0
        );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("valorEstoque").textContent =
        moeda.format(valorTotal);
}

function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("erro", erro);
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

function executarComSeguranca(operacao) {
    try {
        operacao();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

formProduto.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    executarComSeguranca(() => {
        cadastrarProduto(descricao, quantidade, valor);
        formProduto.reset();
        document.getElementById("descricao").focus();
    });
});

pesquisa.addEventListener("input", renderizarProdutos);

listaProdutos.addEventListener("click", function(evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;

    const produto = produtos.find(
        item => item.codigo === codigo
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    if (acao === "valor") {
        const resposta = prompt(
            `Novo preço para ${produto.descricao}:`,
            produto.valor.toFixed(2)
        );

        if (resposta === null || resposta.trim() === "") return;

        const novoValor = Number(resposta.replace(",", "."));

        executarComSeguranca(() => {
            atualizarValor(codigo, novoValor);
        });
    }

    if (acao === "estoque") {
        const resposta = prompt(
            `Quantas unidades deseja adicionar a ${produto.descricao}?`
        );

        if (resposta === null || resposta.trim() === "") return;

        const quantidade = Number(resposta);

        executarComSeguranca(() => {
            atualizarQuantidade(codigo, quantidade);
        });
    }
});

// Exemplo inicial do seu código original:
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

renderizarProdutos();
