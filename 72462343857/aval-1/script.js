
let produtos = [];
let proximoCodigo = 1;

// Validação dos dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor deve ser um número maior ou igual a zero.");
    }
}

// Cadastro de produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigoProduto: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    return novoProduto;
}

// Listagem dos produtos no console
function listarProdutos() {
    console.log(produtos);
    return produtos;
}

// Busca de produto pelo código
function buscarProduto(codigoProduto) {
    return produtos.find(
        produto => produto.codigoProduto === codigoProduto
    );
}

// Atualização do valor unitário
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProduto(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
}

// Entrada de estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser um número inteiro maior que zero.");
    }

    const produto = buscarProduto(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;
}

// Exclusão de produto
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        produto => produto.codigoProduto === codigoProduto
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    produtos.splice(indice, 1);
}

// Formatação de valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibição de mensagens na tela
function mostrarMensagem(texto, tipo = "sucesso") {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Atualização da tabela HTML
function renderizarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const totalProdutos = document.getElementById("totalProdutos");

    totalProdutos.textContent =
        `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;

    lista.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        lista.appendChild(linha);
        return;
    }

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigoProduto,
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

        const celulaAcoes = document.createElement("td");
        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";
        botaoExcluir.className = "btn btn-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", () => {
            const confirmar = confirm(
                `Deseja excluir o produto "${produto.descricao}"?`
            );

            if (!confirmar) return;

            try {
                excluirProduto(produto.codigoProduto);
                renderizarProdutos();
                mostrarMensagem("Produto excluído com sucesso.");
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaAcoes);
        lista.appendChild(linha);
    });
}

// Evento do formulário de cadastro
document.getElementById("formProduto").addEventListener("submit", event => {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        event.target.reset();
        renderizarProdutos();
        mostrarMensagem("Produto cadastrado com sucesso.");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Evento de atualização de preço
document.getElementById("formAtualizar").addEventListener("submit", event => {
    event.preventDefault();

    const codigo = Number(
        document.getElementById("codigoAtualizar").value
    );

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    try {
        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código de produto válido.");
        }

        atualizarValor(codigo, novoValor);

        event.target.reset();
        renderizarProdutos();
        mostrarMensagem("Valor atualizado com sucesso.");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Evento de entrada de estoque
document.getElementById("formEstoque").addEventListener("submit", event => {
    event.preventDefault();

    const codigo = Number(
        document.getElementById("codigoEstoque").value
    );

    const quantidade = Number(
        document.getElementById("quantidadeEstoque").value
    );

    try {
        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código de produto válido.");
        }

        atualizarQuantidade(codigo, quantidade);

        event.target.reset();
        renderizarProdutos();
        mostrarMensagem("Estoque atualizado com sucesso.");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Exibição inicial
renderizarProdutos();
