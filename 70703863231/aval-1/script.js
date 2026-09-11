// ========================================
// LISTA DE PRODUTOS
// ========================================

let produtos = [];


// ========================================
// ELEMENTOS DO HTML
// ========================================

const formProduto = document.getElementById("formProduto");
const formValor = document.getElementById("formValor");
const formQuantidade = document.getElementById("formQuantidade");

const listaProdutos = document.getElementById("listaProdutos");
const estoqueVazio = document.getElementById("estoqueVazio");
const mensagem = document.getElementById("mensagem");
const contadorProdutos = document.getElementById("contadorProdutos");
const btnLimpar = document.getElementById("btnLimpar");


// ========================================
// FUNÇÃO PARA MOSTRAR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;

    setTimeout(() => {
        mensagem.className = "mensagem";
        mensagem.textContent = "";
    }, 4000);
}


// ========================================
// VALIDAÇÃO DA DESCRIÇÃO
// ========================================

function validarDescricao(descricao) {

    if (descricao.length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, 5 caracteres."
        );
    }
}


// ========================================
// VALIDAÇÃO DA QUANTIDADE
// ========================================

function validarQuantidade(quantidade) {

    if (quantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }
}


// ========================================
// VALIDAÇÃO DO VALOR
// ========================================

function validarValor(valor) {

    if (valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// ========================================
// FUNÇÃO PARA VALIDAR PRODUTO
// ========================================

function validarProduto(descricao, quantidade, valor) {

    validarDescricao(descricao);

    validarQuantidade(quantidade);

    validarValor(valor);
}


// ========================================
// CADASTRAR PRODUTO
// ========================================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {

        codigo: produtos.length + 1,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };

    produtos.push(novoProduto);

    listarProdutos();
}


// ========================================
// BUSCAR PRODUTO POR CÓDIGO
// ========================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        (produto) => produto.codigo === codigoProduto
    );
}


// ========================================
// LISTAR PRODUTOS
// ========================================

function listarProdutos() {

    listaProdutos.innerHTML = "";

    contadorProdutos.textContent =
        produtos.length === 1
            ? "1 produto cadastrado"
            : `${produtos.length} produtos cadastrados`;


    // Se não houver produtos
    if (produtos.length === 0) {

        estoqueVazio.style.display = "block";

        return;
    }


    estoqueVazio.style.display = "none";


    // Percorrer produtos
    produtos.forEach((produto) => {

        const linha = document.createElement("tr");

        const valorTotal =
            produto.quantidade * produto.valor;


        linha.innerHTML = `

            <td>
                <span class="codigo">
                    #${produto.codigo}
                </span>
            </td>

            <td>
                ${produto.descricao}
            </td>

            <td>
                <span class="quantidade">
                    ${produto.quantidade}
                </span>
            </td>

            <td>
                <span class="valor">
                    ${formatarMoeda(produto.valor)}
                </span>
            </td>

            <td>
                ${formatarMoeda(valorTotal)}
            </td>

            <td>

                <button
                    class="btn btn-danger btn-small"
                    onclick="excluirProduto(${produto.codigo})"
                >
                    Excluir
                </button>

            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}


// ========================================
// FORMATAR VALOR EM REAL
// ========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


// ========================================
// ATUALIZAR VALOR
// ========================================

function atualizarValor(codigoProduto, novoValor) {

    validarValor(novoValor);

    const produto =
        buscarProdutoPorCodigo(codigoProduto);


    if (!produto) {

        throw new Error(
            "Produto não encontrado."
        );
    }


    // O novo valor substitui o antigo
    produto.valor = novoValor;

    listarProdutos();
}


// ========================================
// ATUALIZAR QUANTIDADE
// ========================================

function atualizarQuantidade(
    codigoProduto,
    novaQuantidade
) {

    validarQuantidade(novaQuantidade);

    const produto =
        buscarProdutoPorCodigo(codigoProduto);


    if (!produto) {

        throw new Error(
            "Produto não encontrado."
        );
    }


    // Soma a nova quantidade ao estoque
    produto.quantidade =
        produto.quantidade + novaQuantidade;

    listarProdutos();
}


// ========================================
// EXCLUIR PRODUTO
// ========================================

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


    const confirmou = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );


    if (!confirmou) {
        return;
    }


    produtos = produtos.filter(
        (produto) =>
            produto.codigo !== codigoProduto
    );


    // Reorganiza os códigos
    produtos.forEach((produto, index) => {

        produto.codigo = index + 1;

    });


    listarProdutos();


    mostrarMensagem(
        "Produto excluído com sucesso!",
        "sucesso"
    );
}


// ========================================
// LIMPAR ESTOQUE
// ========================================

function limparEstoque() {

    if (produtos.length === 0) {

        mostrarMensagem(
            "O estoque já está vazio.",
            "erro"
        );

        return;
    }


    const confirmou = confirm(
        "Tem certeza que deseja excluir todos os produtos?"
    );


    if (!confirmou) {
        return;
    }


    produtos = [];

    listarProdutos();


    mostrarMensagem(
        "Todos os produtos foram removidos.",
        "sucesso"
    );
}


// ========================================
// EVENTO - CADASTRAR PRODUTO
// ========================================

formProduto.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        try {

            const descricao =
                document
                    .getElementById("descricao")
                    .value
                    .trim();


            const quantidade =
                Number(
                    document
                        .getElementById("quantidade")
                        .value
                );


            const valor =
                Number(
                    document
                        .getElementById("valor")
                        .value
                );


            cadastrarProduto(
                descricao,
                quantidade,
                valor
            );


            formProduto.reset();


            mostrarMensagem(
                "Produto cadastrado com sucesso!",
                "sucesso"
            );


        } catch (erro) {

            mostrarMensagem(
                erro.message,
                "erro"
            );

        }

    }
);


// ========================================
// EVENTO - ATUALIZAR VALOR
// ========================================

formValor.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        try {

            const codigo =
                Number(
                    document
                        .getElementById("codigoValor")
                        .value
                );


            const novoValor =
                Number(
                    document
                        .getElementById("novoValor")
                        .value
                );


            atualizarValor(
                codigo,
                novoValor
            );


            formValor.reset();


            mostrarMensagem(
                "Valor atualizado com sucesso!",
                "sucesso"
            );


        } catch (erro) {

            mostrarMensagem(
                erro.message,
                "erro"
            );

        }

    }
);


// ========================================
// EVENTO - ATUALIZAR QUANTIDADE
// ========================================

formQuantidade.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        try {

            const codigo =
                Number(
                    document
                        .getElementById("codigoQuantidade")
                        .value
                );


            const quantidade =
                Number(
                    document
                        .getElementById("novaQuantidade")
                        .value
                );


            atualizarQuantidade(
                codigo,
                quantidade
            );


            formQuantidade.reset();


            mostrarMensagem(
                "Quantidade adicionada ao estoque!",
                "sucesso"
            );


        } catch (erro) {

            mostrarMensagem(
                erro.message,
                "erro"
            );

        }

    }
);


// ========================================
// EVENTO - LIMPAR ESTOQUE
// ========================================

btnLimpar.addEventListener(
    "click",
    limparEstoque
);


// ========================================
// INICIAR SISTEMA
// ========================================

listarProdutos();
