
let produtos = [];
let proximoCodigo = 1;
let codigoBusca = null;

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser um número inteiro maior que zero");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    descricao = descricao.trim();
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    return novoProduto;
}

// Lista os produtos no console
function listarProdutos() {
    console.table(produtos);
}

// Atualiza o valor unitário
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado");
    }

    produto.valor = novoValor;
    return produto;
}

// Adiciona unidades à quantidade em estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser um inteiro maior que zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado");
    }

    produto.quantidade += novaQuantidade;
    return produto;
}

// Valida a descrição
function validarDescricao(descricao) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres"
        );
    }
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        (prod) => prod.codigo === Number(codigoProduto)
    );
}

// Exclui um produto pelo código
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        (prod) => prod.codigo === Number(codigoProduto)
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado");
    }

    produtos.splice(indice, 1);
}

// Formata os valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Evita interpretar descrições como código HTML
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, (caractere) => {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caractere];
    });
}

// Elementos do HTML
const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const campoBusca = document.getElementById("buscaCodigo");
const mensagem = document.getElementById("mensagem");
const totalProdutos = document.getElementById("totalProdutos");

// Exibe mensagens de sucesso ou erro
function mostrarMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Atualiza a tabela de produtos
function renderizarProdutos() {
    const produtosExibidos = codigoBusca === null
        ? produtos
        : produtos.filter(
            (produto) => produto.codigo === codigoBusca
        );

    totalProdutos.textContent =
        `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;

    if (produtosExibidos.length === 0) {
        const texto = codigoBusca === null
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado para esse código.";

        listaProdutos.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    ${texto}
                </td>
            </tr>
        `;
        return;
    }

    listaProdutos.innerHTML = produtosExibidos.map((produto) => {
        const totalEstoque = produto.quantidade * produto.valor;

        return `
            <tr>
                <td>${produto.codigo}</td>
                <td>${escaparHTML(produto.descricao)}</td>
                <td>${produto.quantidade}</td>
                <td>${formatarMoeda(produto.valor)}</td>
                <td>${formatarMoeda(totalEstoque)}</td>
                <td>
                    <div class="acoes">
                        <button
                            type="button"
                            class="btn btn-editar"
                            data-acao="valor"
                            data-codigo="${produto.codigo}">
                            Editar valor
                        </button>

                        <button
                            type="button"
                            class="btn btn-quantidade"
                            data-acao="quantidade"
                            data-codigo="${produto.codigo}">
                            + Estoque
                        </button>

                        <button
                            type="button"
                            class="btn btn-excluir"
                            data-acao="excluir"
                            data-codigo="${produto.codigo}">
                            Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

// Evento de cadastro
formProduto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    try {
        const descricao = campoDescricao.value.trim();
        const quantidade = Number(campoQuantidade.value);
        const valor = Number(campoValor.value);

        cadastrarProduto(descricao, quantidade, valor);

        formProduto.reset();
        codigoBusca = null;
        campoBusca.value = "";

        renderizarProdutos();
        mostrarMensagem("Produto cadastrado com sucesso!");

        campoDescricao.focus();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Busca produto pelo código
document.getElementById("btnBuscar").addEventListener("click", () => {
    const valorBusca = campoBusca.value.trim();

    if (!valorBusca) {
        mostrarMensagem("Digite o código do produto.", "erro");
        return;
    }

    const codigo = Number(valorBusca);

    if (!Number.isInteger(codigo) || codigo < 1) {
        mostrarMensagem("Digite um código válido.", "erro");
        return;
    }

    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        codigoBusca = codigo;
        renderizarProdutos();
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    codigoBusca = codigo;
    renderizarProdutos();

    mostrarMensagem(`Produto encontrado: ${produto.descricao}`);
});

// Permite buscar pressionando Enter
campoBusca.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        document.getElementById("btnBuscar").click();
    }
});

// Limpa a busca e mostra todos os produtos
document.getElementById("btnLimpar").addEventListener("click", () => {
    campoBusca.value = "";
    codigoBusca = null;

    renderizarProdutos();
    mostrarMensagem("");
});

// Trata os botões de ação da tabela
listaProdutos.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        renderizarProdutos();
        return;
    }

    try {
        if (acao === "valor") {
            const resposta = prompt(
                `Novo valor para "${produto.descricao}" (R$):`,
                produto.valor.toFixed(2)
            );

            if (resposta === null) {
                return;
            }

            const novoValor = Number(resposta.trim().replace(",", "."));

            atualizarValor(codigo, novoValor);

            mostrarMensagem("Valor atualizado com sucesso!");
        }

        if (acao === "quantidade") {
            const resposta = prompt(
                `Quantas unidades deseja adicionar ao estoque de "${produto.descricao}"?`,
                "1"
            );

            if (resposta === null) {
                return;
            }

            const novaQuantidade = Number(resposta.trim());

            atualizarQuantidade(codigo, novaQuantidade);

            mostrarMensagem("Estoque atualizado com sucesso!");
        }

        if (acao === "excluir") {
            const confirmar = confirm(
                `Deseja realmente excluir "${produto.descricao}"?`
            );

            if (!confirmar) {
                return;
            }

            excluirProduto(codigo);

            if (codigoBusca === codigo) {
                codigoBusca = null;
                campoBusca.value = "";
            }

            mostrarMensagem("Produto excluído com sucesso!");
        }

        renderizarProdutos();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Renderiza a tabela inicial
renderizarProdutos();
