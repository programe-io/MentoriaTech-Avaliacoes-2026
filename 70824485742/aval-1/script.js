// ==========================================
// ARRAY DE PRODUTOS
// ==========================================

let produtos = [];


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const listaVazia = document.getElementById("listaVazia");
const mensagem = document.getElementById("mensagem");
const totalProdutos = document.getElementById("totalProdutos");


// ==========================================
// FUNÇÃO PARA VALIDAR O PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, 5 caracteres."
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    if (valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// ==========================================
// FUNÇÃO PARA CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto(descricao, quantidade, valor) {

    // Validação
    validarProduto(descricao, quantidade, valor);

    // Criação do objeto
    const novoProduto = {

        codigo: produtos.length + 1,

        descricao: descricao.trim(),

        quantidade: quantidade,

        valor: valor
    };

    // Adiciona ao array
    produtos.push(novoProduto);

    // Atualiza a tela
    listarProdutos();

    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );
}


// ==========================================
// FUNÇÃO PARA LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    // Limpa a tabela
    listaProdutos.innerHTML = "";

    // Verifica se existem produtos
    if (produtos.length === 0) {

        listaVazia.style.display = "block";

    } else {

        listaVazia.style.display = "none";
    }

    // Percorre os produtos
    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        const estoqueClass =
            produto.quantidade <= 5
                ? "estoque-baixo"
                : "";

        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td class="${estoqueClass}">
                ${produto.quantidade}
            </td>

            <td>
                R$ ${produto.valor.toFixed(2)}
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="abrirModalValor(${produto.codigo})"
                >
                    Alterar valor
                </button>

                <button
                    class="btn-quantidade"
                    onclick="adicionarQuantidade(${produto.codigo})"
                >
                    + Estoque
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.codigo})"
                >
                    Excluir
                </button>

            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    atualizarTotal();
}


// ==========================================
// ATUALIZA TOTAL DE PRODUTOS
// ==========================================

function atualizarTotal() {

    if (produtos.length === 1) {

        totalProdutos.textContent = "1 produto";

    } else {

        totalProdutos.textContent =
            `${produtos.length} produtos`;
    }
}


// ==========================================
// BUSCAR PRODUTO PELO CÓDIGO
// ==========================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(function(produto) {

        return produto.codigo === codigoProduto;

    });
}


// ==========================================
// ATUALIZAR VALOR
// ==========================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {

        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto =
        buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.valor = novoValor;

        listarProdutos();

        mostrarMensagem(
            "Valor atualizado com sucesso!",
            "sucesso"
        );

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ==========================================
// ABRIR MODAL PARA ALTERAR VALOR
// ==========================================

function abrirModalValor(codigoProduto) {

    const produto =
        buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {

        mostrarMensagem(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }

    document.getElementById(
        "codigoAtualizacao"
    ).value = codigoProduto;

    document.getElementById(
        "novoValor"
    ).value = produto.valor;

    document.getElementById(
        "modal"
    ).classList.add("ativo");
}


// ==========================================
// CONFIRMAR ATUALIZAÇÃO DO VALOR
// ==========================================

function confirmarAtualizacaoValor() {

    try {

        const codigo = Number(
            document.getElementById(
                "codigoAtualizacao"
            ).value
        );

        const novoValor = Number(
            document.getElementById(
                "novoValor"
            ).value
        );

        atualizarValor(codigo, novoValor);

        fecharModal();

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );
    }
}


// ==========================================
// FECHAR MODAL
// ==========================================

function fecharModal() {

    document
        .getElementById("modal")
        .classList.remove("ativo");
}


// ==========================================
// ATUALIZAR QUANTIDADE
// ==========================================

function atualizarQuantidade(
    codigoProduto,
    novaQuantidade
) {

    if (novaQuantidade < 1) {

        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    const produto =
        buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.quantidade =
            produto.quantidade + novaQuantidade;

        listarProdutos();

        mostrarMensagem(
            "Quantidade atualizada com sucesso!",
            "sucesso"
        );

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ==========================================
// ADICIONAR QUANTIDADE AO ESTOQUE
// ==========================================

function adicionarQuantidade(codigoProduto) {

    const quantidade =
        prompt("Digite a quantidade que deseja adicionar:");

    if (quantidade === null) {
        return;
    }

    const novaQuantidade = Number(quantidade);

    try {

        atualizarQuantidade(
            codigoProduto,
            novaQuantidade
        );

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );
    }
}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(codigoProduto) {

    const produto =
        buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {

        mostrarMensagem(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(function(produto) {

        return produto.codigo !== codigoProduto;

    });

    // Reorganiza os códigos
    produtos.forEach(function(produto, index) {

        produto.codigo = index + 1;

    });

    listarProdutos();

    mostrarMensagem(
        "Produto excluído com sucesso!",
        "sucesso"
    );
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;

    setTimeout(function() {

        mensagem.textContent = "";

        mensagem.className = "";

    }, 3000);
}


// ==========================================
// CADASTRO PELO FORMULÁRIO
// ==========================================

formProduto.addEventListener(
    "submit",
    function(event) {

        // Impede o recarregamento da página
        event.preventDefault();

        try {

            const descricao =
                document.getElementById(
                    "descricao"
                ).value;

            const quantidade =
                Number(
                    document.getElementById(
                        "quantidade"
                    ).value
                );

            const valor =
                Number(
                    document.getElementById(
                        "valor"
                    ).value
                );

            // Cadastra o produto
            cadastrarProduto(
                descricao,
                quantidade,
                valor
            );

            // Limpa o formulário
            formProduto.reset();

        } catch (erro) {

            mostrarMensagem(
                erro.message,
                "erro"
            );
        }
    }
);


// ==========================================
// FECHAR MODAL AO CLICAR FORA
// ==========================================

document.getElementById("modal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                fecharModal();
            }
        }
    );


// ==========================================
// LISTA INICIAL
// ==========================================

listarProdutos();
