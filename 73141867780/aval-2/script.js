// ==========================================
// ARRAY DE PRODUTOS
// ==========================================

let produtos = [];


// ==========================================
// VALIDAR PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {

    // Validar descrição
    if (descricao.length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo 5 caracteres."
        );
    }

    // Validar quantidade
    if (quantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    // Validar valor
    if (valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    try {

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(
                document.getElementById("quantidade").value
            );

        const valor =
            Number(
                document.getElementById("valor").value
            );


        // Validar os dados
        validarProduto(
            descricao,
            quantidade,
            valor
        );


        // Criar o objeto
        const novoProduto = {

            codigo: produtos.length + 1,

            descricao: descricao,

            quantidade: quantidade,

            valor: valor
        };


        // Adicionar produto ao array
        produtos.push(novoProduto);


        alert("Produto cadastrado com sucesso!");


        // Limpar campos
        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";


        // Atualizar lista
        listarProdutos();

    } catch (erro) {

        alert(erro.message);
    }
}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const lista =
        document.getElementById("listaProdutos");

    lista.innerHTML = "";


    // Verificar se existem produtos
    if (produtos.length === 0) {

        lista.innerHTML =
            "<p>Nenhum produto cadastrado.</p>";

        return;
    }


    // Percorrer produtos
    produtos.forEach(function(produto) {

        lista.innerHTML += `

            <div class="produto">

                <p>
                    <strong>Código:</strong>
                    ${produto.codigo}
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${produto.descricao}
                </p>

                <p>
                    <strong>Quantidade:</strong>
                    ${produto.quantidade}
                </p>

                <p>
                    <strong>Valor:</strong>
                    R$ ${produto.valor.toFixed(2)}
                </p>

            </div>

        `;
    });
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

function atualizarValor() {

    try {

        const codigoProduto =
            Number(
                document.getElementById("codigoValor").value
            );

        const novoValor =
            Number(
                document.getElementById("novoValor").value
            );


        // Validar valor
        if (novoValor < 0) {

            throw new Error(
                "O valor deve ser maior ou igual a zero."
            );
        }


        // Procurar produto
        const produto =
            buscarProdutoPorCodigo(codigoProduto);


        // Verificar se encontrou
        if (produto) {

            // Substituir o valor antigo
            produto.valor = novoValor;

            alert("Valor atualizado com sucesso!");

            listarProdutos();

        } else {

            throw new Error(
                "Produto não encontrado."
            );
        }

    } catch (erro) {

        alert(erro.message);
    }
}


// ==========================================
// ATUALIZAR QUANTIDADE
// ==========================================

function atualizarQuantidade() {

    try {

        const codigoProduto =
            Number(
                document.getElementById("codigoQuantidade").value
            );

        const novaQuantidade =
            Number(
                document.getElementById("novaQuantidade").value
            );


        // Validar quantidade
        if (novaQuantidade < 1) {

            throw new Error(
                "A quantidade deve ser maior que zero."
            );
        }


        // Procurar produto
        const produto =
            buscarProdutoPorCodigo(codigoProduto);


        // Verificar se encontrou
        if (produto) {

            // Somar nova quantidade ao estoque
            produto.quantidade =
                produto.quantidade + novaQuantidade;

            alert(
                "Quantidade atualizada com sucesso!"
            );

            listarProdutos();

        } else {

            throw new Error(
                "Produto não encontrado."
            );
        }

    } catch (erro) {

        alert(erro.message);
    }
}
