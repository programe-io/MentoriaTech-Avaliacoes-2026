// Lista (Array) de produtos
let produtos = [];

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
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length
            ? Math.max(...produtos.map(prod => prod.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();

    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
}

function listarProdutos() {
    const tabela = document.getElementById("listaProdutos");
    const listaVazia = document.getElementById("listaVazia");

    tabela.innerHTML = "";

    listaVazia.style.display =
        produtos.length === 0 ? "block" : "none";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "btn-valor";
        botaoValor.addEventListener("click", () => {
            const entrada = prompt(
                "Digite o novo valor do produto:"
            );

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            const novoValor = Number(entrada.replace(",", "."));

            try {
                atualizarValor(produto.codigo, novoValor);
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Adicionar estoque";
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.addEventListener("click", () => {
            const entrada = prompt(
                "Quantas unidades deseja adicionar?"
            );

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            const novaQuantidade = Number(entrada);

            try {
                atualizarQuantidade(
                    produto.codigo,
                    novaQuantidade
                );
            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        acoes.append(botaoValor, botaoQuantidade);
        linha.append(codigo, descricao, quantidade, valor, acoes);
        tabela.appendChild(linha);
    });
}

function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    listarProdutos();

    mostrarMensagem("Valor atualizado com sucesso!", "sucesso");
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

    produto.quantidade += novaQuantidade;
    listarProdutos();

    mostrarMensagem("Estoque atualizado com sucesso!", "sucesso");
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Evento do formulário de cadastro
document.getElementById("formProduto")
    .addEventListener("submit", function(evento) {
        evento.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        try {
            cadastrarProduto(descricao, quantidade, valor);
            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    });

// Exibe a lista inicial
listarProdutos();

// Produtos de exemplo (opcional)
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

// Limpa a mensagem inicial de cadastro
document.getElementById("mensagem").textContent = "";