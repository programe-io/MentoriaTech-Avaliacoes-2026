
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }
}

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
}

function listarProdutos() {
    const tabela = document.getElementById("listaProdutos");
    tabela.innerHTML = "";

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td></td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>
            <td>
                <div class="acoes">
                    <button class="btn-valor">Alterar valor</button>
                    <button class="btn-quantidade">Adicionar estoque</button>
                </div>
            </td>
        `;

        // Evita inserir a descrição diretamente como HTML.
        linha.children[1].textContent = produto.descricao;

        linha.querySelector(".btn-valor").addEventListener(
            "click",
            function() {
                const entrada = prompt("Digite o novo valor:");

                if (entrada === null || entrada.trim() === "") {
                    return;
                }

                const novoValor = Number(
                    entrada.replace(",", ".")
                );

                try {
                    atualizarValor(produto.codigo, novoValor);
                    mostrarMensagem("Valor atualizado com sucesso!", false);
                } catch (erro) {
                    mostrarMensagem(erro.message, true);
                }
            }
        );

        linha.querySelector(".btn-quantidade").addEventListener(
            "click",
            function() {
                const entrada = prompt(
                    "Digite a quantidade que deseja adicionar:"
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
                    mostrarMensagem("Estoque atualizado com sucesso!", false);
                } catch (erro) {
                    mostrarMensagem(erro.message, true);
                }
            }
        );

        tabela.appendChild(linha);
    });
}

function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado.");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser um inteiro maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado.");
    }
}

function mostrarMensagem(texto, erro) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = erro ? "erro" : "sucesso";
}

document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(
            document.getElementById("quantidade").value
        );
        const valor = Number(
            document.getElementById("valor").value
        );

        try {
            cadastrarProduto(descricao, quantidade, valor);

            mostrarMensagem("Produto cadastrado com sucesso!", false);
            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, true);
        }
    }
);

// Produtos iniciais do exemplo original.
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

atualizarValor(2, 97.00);
atualizarQuantidade(1, 3);
