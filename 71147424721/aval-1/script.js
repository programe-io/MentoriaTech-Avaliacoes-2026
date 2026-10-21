
let produtos = [];
let proximoCodigo = 1;

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser um número maior ou igual a zero."
        );
    }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProduto();

    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
}

// Exibe os produtos na tabela
function listarProduto() {
    const lista = document.getElementById("listaProdutos");
    const total = document.getElementById("totalProdutos");

    total.textContent =
        `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}`;

    lista.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        lista.appendChild(linha);
        return;
    }

    produtos.forEach(function (produto) {
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
        const botaoExcluir = document.createElement("button");

        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";

        botaoExcluir.addEventListener("click", function () {
            excluirProduto(produto.codigo);
        });

        acoes.appendChild(botaoExcluir);

        linha.append(
            codigo,
            descricao,
            quantidade,
            valor,
            acoes
        );

        lista.appendChild(linha);
    });
}

// Atualiza o preço de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
}

// Atualiza a quantidade de um produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade = novaQuantidade;
}

// Exclui um produto
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice === -1) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    produtos.splice(indice, 1);
    listarProduto();

    mostrarMensagem("Produto excluído com sucesso!", "sucesso");
}

// Exibe mensagens na página
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Formulário de cadastro
document.getElementById("formCadastro").addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        try {
            const descricao =
                document.getElementById("descricao").value;

            const quantidade = Number(
                document.getElementById("quantidade").value
            );

            const valor = Number(
                document.getElementById("valor").value
            );

            cadastrarProduto(descricao, quantidade, valor);

            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    }
);

// Formulário de atualização
document.getElementById("formAtualizar").addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        try {
            const codigo = Number(
                document.getElementById("codigoProduto").value
            );

            const campoValor = document.getElementById("novoValor");
            const campoQuantidade =
                document.getElementById("novaQuantidade");

            const alterarValor = campoValor.value.trim() !== "";
            const alterarQuantidade =
                campoQuantidade.value.trim() !== "";

            if (!Number.isInteger(codigo) || codigo < 1) {
                throw new Error("Informe um código válido.");
            }

            if (!alterarValor && !alterarQuantidade) {
                throw new Error(
                    "Informe um novo valor ou uma nova quantidade."
                );
            }

            // Verifica o produto antes de realizar alterações
            const produto = produtos.find(
                prod => prod.codigo === codigo
            );

            if (!produto) {
                throw new Error("Produto não encontrado.");
            }

            // Valida todos os dados antes de modificar o produto
            if (alterarValor) {
                const valor = Number(campoValor.value);

                if (!Number.isFinite(valor) || valor < 0) {
                    throw new Error(
                        "Valor deve ser maior ou igual a zero."
                    );
                }
            }

            if (alterarQuantidade) {
                const quantidade = Number(campoQuantidade.value);

                if (
                    !Number.isInteger(quantidade) ||
                    quantidade < 1
                ) {
                    throw new Error(
                        "Quantidade deve ser um número inteiro maior que zero."
                    );
                }
            }

            if (alterarValor) {
                atualizarValor(codigo, Number(campoValor.value));
            }

            if (alterarQuantidade) {
                atualizarQuantidade(
                    codigo,
                    Number(campoQuantidade.value)
                );
            }

            listarProduto();
            mostrarMensagem(
                "Produto atualizado com sucesso!",
                "sucesso"
            );

            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    }
);

// Inicializa a tabela vazia
listarProduto();
