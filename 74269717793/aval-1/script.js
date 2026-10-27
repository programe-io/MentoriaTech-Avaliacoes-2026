
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter no mínimo cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();
}

function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(dado => {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        });

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.onclick = () => {
            const novoValor = prompt("Digite o novo valor:");

            if (novoValor === null || novoValor.trim() === "") return;

            try {
                atualizarValor(produto.codigo, Number(novoValor));
                mostrarMensagem("Valor atualizado!");
            } catch (erro) {
                mostrarMensagem(erro.message);
            }
        };

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Adicionar quantidade";
        botaoQuantidade.onclick = () => {
            const novaQuantidade = prompt("Quantas unidades deseja adicionar?");

            if (novaQuantidade === null || novaQuantidade.trim() === "") return;

            try {
                if (!/^\d+$/.test(novaQuantidade.trim())) {
                    throw new Error("Digite uma quantidade inteira válida.");
                }

                atualizarQuantidade(produto.codigo, Number(novaQuantidade));
                mostrarMensagem("Quantidade atualizada!");
            } catch (erro) {
                mostrarMensagem(erro.message);
            }
        };

        acoes.append(botaoValor, botaoQuantidade);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });
}

function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(p => p.codigo === codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    listarProdutos();
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(p => p.codigo === codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;
    listarProdutos();
}

function mostrarMensagem(texto) {
    document.getElementById("mensagem").textContent = texto;
}

document.getElementById("formProduto").addEventListener("submit", event => {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    try {
        cadastrarProduto(descricao, quantidade, valor);
        mostrarMensagem("Produto cadastrado com sucesso!");
        event.target.reset();
    } catch (erro) {
        mostrarMensagem(erro.message);
    }
});

// Produtos iniciais do código original
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);
atualizarValor(2, 97.00);
atualizarQuantidade(1, 3);
