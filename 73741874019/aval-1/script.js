
// ======================================
// 1. LISTA DE PRODUTOS
// ======================================

let produtos = [];

let proximoCodigo = 1;


// ======================================
// 2. FUNÇÃO PARA VALIDAR PRODUTO
// ======================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
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


// ======================================
// 3. FUNÇÃO PARA CADASTRAR PRODUTO
// ======================================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {

        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor

    };

    produtos.push(novoProduto);

    listarProdutos();

}


// ======================================
// 4. FUNÇÃO PARA LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.replaceChildren();

    if (produtos.length === 0) {

        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 5;
        coluna.className = "lista-vazia";
        coluna.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(coluna);
        tabela.appendChild(linha);

        return;
    }

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

        const acoes = document.createElement("td");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";

        botaoExcluir.addEventListener("click", function() {
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

        tabela.appendChild(linha);

    });

}


// ======================================
// 5. BUSCAR PRODUTO PELO CÓDIGO
// ======================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(function(produto) {

        return produto.codigo === codigoProduto;

    });

}


// ======================================
// 6. ATUALIZAR VALOR DO PRODUTO
// ======================================

function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {

        throw new Error(
            "O novo valor deve ser maior ou igual a zero."
        );

    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.valor = novoValor;

        listarProdutos();

    } else {

        throw new Error("Produto não encontrado.");

    }

}


// ======================================
// 7. ATUALIZAR QUANTIDADE
// ======================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {

        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );

    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.quantidade += novaQuantidade;

        listarProdutos();

    } else {

        throw new Error("Produto não encontrado.");

    }

}


// ======================================
// 8. EXCLUIR PRODUTO
// ======================================

function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {

        alert("Produto não encontrado.");
        return;

    }

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {

        produtos = produtos.filter(function(item) {

            return item.codigo !== codigoProduto;

        });

        listarProdutos();

        alert("Produto excluído com sucesso!");

    }

}


// ======================================
// 9. EVENTO DE CADASTRO
// ======================================

document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const descricao = document.getElementById("descricao").value;

        const quantidade = Number(
            document.getElementById("quantidade").value
        );

        const valor = Number(
            document.getElementById("valor").value
        );

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        document.getElementById("formProduto").reset();

    } catch (erro) {

        alert(erro.message);

    }

});


// ======================================
// 10. EVENTO PARA ATUALIZAR VALOR
// ======================================

document.getElementById("btnAtualizarValor")
.addEventListener("click", function() {

    try {

        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const novoValor = Number(
            document.getElementById("novoValor").value
        );

        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código válido.");
        }

        atualizarValor(codigo, novoValor);

        alert("Valor atualizado com sucesso!");

        document.getElementById("novoValor").value = "";

    } catch (erro) {

        alert(erro.message);

    }

});


// ======================================
// 11. EVENTO PARA ATUALIZAR QUANTIDADE
// ======================================

document.getElementById("btnAtualizarQuantidade")
.addEventListener("click", function() {

    try {

        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const quantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código válido.");
        }

        atualizarQuantidade(codigo, quantidade);

        alert("Estoque atualizado com sucesso!");

        document.getElementById("novaQuantidade").value = "";

    } catch (erro) {

        alert(erro.message);

    }

});


// ======================================
// 12. INICIALIZAR A LISTAGEM
// ======================================

listarProdutos();
