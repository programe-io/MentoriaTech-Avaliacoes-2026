let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (isNaN(valor) || valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto() {
    try {
        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        validarProduto(descricao, quantidade, valor);

        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        listarProdutos();

        mostrarMensagem("Produto cadastrado com sucesso!", "#38bdf8", "rgba(56, 189, 248, 0.15)");

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {
        mostrarMensagem(erro.message, "#f43f5e", "rgba(244, 63, 94, 0.15)");
    }
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 10px;">Nenhum produto cadastrado.</p>';
        return;
    }

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="produto">
                <strong>Código:</strong> ${produto.codigo}<br>
                <strong>Descrição:</strong> ${produto.descricao}<br>
                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
            </div>
        `;
    });
}

function atualizarValor() {
    try {
        const codigo = Number(document.getElementById("codigoValor").value);
        const novoValor = Number(document.getElementById("novoValor").value);

        if (novoValor < 0 || !Number.isFinite(novoValor)) {
            throw new Error("Valor deve ser maior ou igual a zero");
        }

        const produto = produtos.find(prod => prod.codigo === codigo);

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        produto.valor = novoValor;

        listarProdutos();

        mostrarMensagem("Valor atualizado com sucesso!", "#38bdf8", "rgba(56, 189, 248, 0.15)");

        document.getElementById("codigoValor").value = "";
        document.getElementById("novoValor").value = "";

    } catch (erro) {
        mostrarMensagem(erro.message, "#f43f5e", "rgba(244, 63, 94, 0.15)");
    }
}

function atualizarQuantidade() {
    try {
        const codigo = Number(document.getElementById("codigoQuantidade").value);
        const novaQuantidade = Number(document.getElementById("novaQuantidade").value);

        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
            throw new Error("Quantidade deve ser maior que zero");
        }

        const produto = produtos.find(prod => prod.codigo === codigo);

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        produto.quantidade += novaQuantidade;

        listarProdutos();

        mostrarMensagem("Estoque atualizado com sucesso!", "#38bdf8", "rgba(56, 189, 248, 0.15)");

        document.getElementById("codigoQuantidade").value = "";
        document.getElementById("novaQuantidade").value = "";

    } catch (erro) {
        mostrarMensagem(erro.message, "#f43f5e", "rgba(244, 63, 94, 0.15)");
    }
}

function mostrarMensagem(texto, cor, fundo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;
    mensagem.style.backgroundColor = fundo;
}

listarProdutos();