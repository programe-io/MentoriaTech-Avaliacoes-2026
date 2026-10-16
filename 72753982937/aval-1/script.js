
let produtos = [];

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo cinco caracteres"
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero"
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();

    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );
}

// Listar produtos
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.replaceChildren();

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

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        // Botão para atualizar valor
        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Atualizar valor";
        botaoValor.className = "btn-valor";
        botaoValor.type = "button";

        botaoValor.addEventListener("click", () => {
            const entrada = prompt("Digite o novo valor:");

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            atualizarValor(produto.codigo, Number(entrada));
        });

        // Botão para atualizar quantidade
        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Atualizar quantidade";
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.type = "button";

        botaoQuantidade.addEventListener("click", () => {
            const entrada = prompt("Digite a nova quantidade:");

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            atualizarQuantidade(
                produto.codigo,
                Number(entrada)
            );
        });

        acoes.append(botaoValor, botaoQuantidade);
        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);
        lista.appendChild(linha);
    });
}

// Atualizar valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        mostrarMensagem(
            "Valor deve ser maior ou igual a zero",
            "erro"
        );
        return;
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;

        listarProdutos();

        mostrarMensagem(
            "Valor atualizado com sucesso!",
            "sucesso"
        );
    } else {
        mostrarMensagem("Produto não encontrado", "erro");
    }
}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        mostrarMensagem(
            "Quantidade deve ser um número inteiro maior que zero",
            "erro"
        );
        return;
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;

        listarProdutos();

        mostrarMensagem(
            "Quantidade atualizada com sucesso!",
            "sucesso"
        );
    } else {
        mostrarMensagem("Produto não encontrado", "erro");
    }
}

// Exibir mensagens na página
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Cadastrar produto pelo formulário
document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {
        event.preventDefault();

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

// ===== TESTANDO O SISTEMA =====

try {
    cadastrarProduto("televsão", 12, 3699.00);
    cadastrarProduto("notbook", 38, 1299.00);

    atualizarValor(2, 97.00);
    atualizarQuantidade(1, 15);

    cadastrarProduto("Cadeira Gamer Premium", 12, 899.00);

    mostrarMensagem(
        "Produtos de teste cadastrados com sucesso!",
        "sucesso"
    );
} catch (erro) {
    mostrarMensagem(erro.message, "erro");
}
