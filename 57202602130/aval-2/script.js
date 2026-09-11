// ======================================================
// ARRAY DE PRODUTOS
// ======================================================

let produtos = [];


// ======================================================
// FUNÇÃO PARA VALIDAR PRODUTO
// ======================================================

function validarProduto(descricao, quantidade, valor) {

    // Validação da descrição
    if (descricao.length < 5) {

        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }


    // Validação da quantidade
    if (quantidade < 1) {

        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }


    // Validação do valor
    if (valor < 0) {

        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// ======================================================
// FUNÇÃO PARA CADASTRAR PRODUTO
// ======================================================

function cadastrarProduto(descricao, quantidade, valor) {

    // Valida os dados
    validarProduto(
        descricao,
        quantidade,
        valor
    );


    // Cria o objeto produto
    let novoProduto = {

        codigo: produtos.length + 1,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor
    };


    // Adiciona o produto ao array
    produtos.push(novoProduto);
}


// ======================================================
// FUNÇÃO PARA BUSCAR PRODUTO PELO CÓDIGO
// ======================================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        (produto) => produto.codigo === codigoProduto
    );
}


// ======================================================
// FUNÇÃO PARA LISTAR PRODUTOS
// ======================================================

function listarProdutos() {

    const lista =
        document.getElementById("listaProdutos");


    // Limpa a tabela
    lista.innerHTML = "";


    // Verifica se existem produtos
    if (produtos.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    // Percorre todos os produtos
    produtos.forEach((produto) => {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.valor.toFixed(2)}
            </td>
        `;


        lista.appendChild(linha);
    });
}


// ======================================================
// FUNÇÃO PARA ATUALIZAR VALOR
// ======================================================

function atualizarValor(codigoProduto, novoValor) {

    // Validação do valor
    if (novoValor < 0) {

        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }


    // Procura o produto
    const produto =
        buscarProdutoPorCodigo(codigoProduto);


    // Se encontrou
    if (produto) {

        // Substitui o valor antigo
        produto.valor = novoValor;

    } else {

        // Produto não encontrado
        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ======================================================
// FUNÇÃO PARA ATUALIZAR QUANTIDADE
// ======================================================

function atualizarQuantidade(
    codigoProduto,
    novaQuantidade
) {

    // Validação
    if (novaQuantidade < 1) {

        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }


    // Procura o produto
    const produto =
        buscarProdutoPorCodigo(codigoProduto);


    // Se encontrou
    if (produto) {

        // Soma a nova quantidade
        produto.quantidade =
            produto.quantidade + novaQuantidade;

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ======================================================
// FORMULÁRIO DE CADASTRO
// ======================================================

document
    .getElementById("formCadastro")
    .addEventListener(
        "submit",
        function(event) {

            // Impede o recarregamento da página
            event.preventDefault();


            const mensagem =
                document.getElementById(
                    "mensagemCadastro"
                );


            try {

                // Pega a descrição
                const descricao =
                    document
                        .getElementById("descricao")
                        .value
                        .trim();


                // Pega a quantidade
                const quantidade =
                    Number(
                        document
                            .getElementById("quantidade")
                            .value
                    );


                // Pega o valor
                const valor =
                    Number(
                        document
                            .getElementById("valor")
                            .value
                    );


                // Cadastra o produto
                cadastrarProduto(
                    descricao,
                    quantidade,
                    valor
                );


                // Mostra mensagem
                mensagem.textContent =
                    "Produto cadastrado com sucesso!";

                mensagem.className =
                    "sucesso";


                // Limpa o formulário
                this.reset();


                // Atualiza a tabela
                listarProdutos();

            } catch (erro) {

                mensagem.textContent =
                    erro.message;

                mensagem.className =
                    "erro";
            }
        }
    );


// ======================================================
// FORMULÁRIO PARA ATUALIZAR VALOR
// ======================================================

document
    .getElementById("formValor")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const mensagem =
                document.getElementById(
                    "mensagemValor"
                );


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


                mensagem.textContent =
                    "Valor atualizado com sucesso!";

                mensagem.className =
                    "sucesso";


                this.reset();


                listarProdutos();

            } catch (erro) {

                mensagem.textContent =
                    erro.message;

                mensagem.className =
                    "erro";
            }
        }
    );


// ======================================================
// FORMULÁRIO PARA ADICIONAR QUANTIDADE
// ======================================================

document
    .getElementById("formQuantidade")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const mensagem =
                document.getElementById(
                    "mensagemQuantidade"
                );


            try {

                const codigo =
                    Number(
                        document
                            .getElementById(
                                "codigoQuantidade"
                            )
                            .value
                    );


                const novaQuantidade =
                    Number(
                        document
                            .getElementById(
                                "novaQuantidade"
                            )
                            .value
                    );


                atualizarQuantidade(
                    codigo,
                    novaQuantidade
                );


                mensagem.textContent =
                    "Quantidade adicionada ao estoque!";

                mensagem.className =
                    "sucesso";


                this.reset();


                listarProdutos();

            } catch (erro) {

                mensagem.textContent =
                    erro.message;

                mensagem.className =
                    "erro";
            }
        }
    );


// ======================================================
// INICIA A LISTAGEM
// ======================================================

listarProdutos();
