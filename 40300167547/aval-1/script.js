let produtos = [];
let proximoCodigo = 1;

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const pesquisa = document.getElementById("pesquisa");

const moeda = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter no mínimo 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        throw new Error("A quantidade deve ser um inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    produtos.push({
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    });
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
}

function atualizarQuantidade(codigoProduto, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        throw new Error("Informe uma quantidade inteira maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += quantidade;
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

function listarProduto() {
    const termo = pesquisa.value.trim().toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
    } else {
        lista.innerHTML = filtrados.map(produto => `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>${moeda(produto.valor)}</td>
                <td>${moeda(produto.quantidade * produto.valor)}</td>
                <td>
                    <div class="acoes">
                        <button
                            class="botao botao-editar"
                            data-acao="valor"
                            data-codigo="${produto.codigo}"
                        >
                            Editar preço
                        </button>

                        <button
                            class="botao botao-quantidade"
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

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalItens").textContent =
        produtos.reduce((total, p) => total + p.quantidade, 0);

    document.getElementById("valorEstoque").textContent =
        moeda(produtos.reduce(
            (total, p) => total + p.quantidade * p.valor,
            0
        ));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(
            document.getElementById("quantidade").value
        );
        const valor = Number(
            document.getElementById("valor").value
        );

        cadastrarProduto(descricao, quantidade, valor);

        form.reset();
        mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
        listarProduto();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

lista.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);

    try {
        if (botao.dataset.acao === "valor") {
            const entrada = prompt("Informe o novo valor unitário:");

            if (entrada === null || entrada.trim() === "") return;

            const valor = Number(entrada.replace(",", "."));

            atualizarValor(codigo, valor);
            mostrarMensagem("Preço atualizado com sucesso!", "sucesso");
        }

        if (botao.dataset.acao === "quantidade") {
            const entrada = prompt("Quantas unidades deseja adicionar?");

            if (entrada === null || entrada.trim() === "") return;

            const quantidade = Number(entrada);

            atualizarQuantidade(codigo, quantidade);
            mostrarMensagem("Estoque atualizado com sucesso!", "sucesso");
        }

        listarProduto();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

pesquisa.addEventListener("input", listarProduto);

// Produtos iniciais do exemplo
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

listarProduto();