// Array que armazena os produtos
let produtos = [];


// ========================================
// VALIDAÇÃO DO PRODUTO
// ========================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
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


// ========================================
// CADASTRAR PRODUTO
// ========================================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}


// ========================================
// LISTAR PRODUTOS
// ========================================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");
    const total = document.getElementById("totalProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhum produto cadastrado.
            </p>
        `;

        total.textContent = "0 produtos";

        return;
    }

    produtos.forEach(function(produto) {

        const item = document.createElement("div");

        item.classList.add("produto");

        item.innerHTML = `
            <div class="codigo">
                #${produto.codigo}
            </div>

            <div class="descricao">
                ${produto.descricao}
            </div>

            <div class="quantidade">
                Estoque: ${produto.quantidade}
            </div>

            <div class="valor">
                R$ ${produto.valor.toFixed(2)}
            </div>
        `;

        lista.appendChild(item);
    });

    total.textContent =
        produtos.length === 1
            ? "1 produto"
            : `${produtos.length} produtos`;
}


// ========================================
// ATUALIZAR VALOR
// ========================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        function(prod) {
            return prod.codigo === codigoProduto;
        }
    );

    if (produto) {

        produto.valor = novoValor;

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ========================================
// ATUALIZAR QUANTIDADE
// ========================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    const produto = produtos.find(
        function(prod) {
            return prod.codigo === codigoProduto;
        }
    );

    if (produto) {

        produto.quantidade =
            produto.quantidade + novaQuantidade;

    } else {

        throw new Error(
            "Produto não encontrado."
        );
    }
}


// ========================================
// FORMULÁRIO DE CADASTRO
// ========================================

const formulario = document.getElementById("formCadastro");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const descricao =
        document.getElementById("descricao").value.trim();

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);

    const mensagem =
        document.getElementById("mensagemCadastro");

    try {

        cadastrarProduto(
            descricao,
            quantidade,
            valor
        );

        mensagem.textContent =
            "Produto cadastrado com sucesso!";

        mensagem.className =
            "mensagem sucesso";

        formulario.reset();

        listarProdutos();

    } catch (erro) {

        mensagem.textContent =
            erro.message;

        mensagem.className =
            "mensagem erro";
    }
});


// ========================================
// BOTÃO ATUALIZAR VALOR
// ========================================

const btnAtualizarValor =
    document.getElementById("btnAtualizarValor");

btnAtualizarValor.addEventListener("click", function() {

    const codigo =
        Number(document.getElementById("codigoAtualizacao").value);

    const novoValor =
        Number(document.getElementById("novoValor").value);

    const mensagem =
        document.getElementById("mensagemAtualizacao");

    try {

        atualizarValor(codigo, novoValor);

        mensagem.textContent =
            "Valor atualizado com sucesso!";

        mensagem.className =
            "mensagem sucesso";

        document.getElementById("codigoAtualizacao").value = "";
        document.getElementById("novoValor").value = "";

        listarProdutos();

    } catch (erro) {

        mensagem.textContent =
            erro.message;

        mensagem.className =
            "mensagem erro";
    }
});


// ========================================
// BOTÃO ATUALIZAR QUANTIDADE
// ========================================

const btnAtualizarQuantidade =
    document.getElementById("btnAtualizarQuantidade");

btnAtualizarQuantidade.addEventListener("click", function() {

    const codigo =
        Number(document.getElementById("codigoQuantidade").value);

    const novaQuantidade =
        Number(document.getElementById("novaQuantidade").value);

    const mensagem =
        document.getElementById("mensagemAtualizacao");

    try {

        atualizarQuantidade(
            codigo,
            novaQuantidade
        );

        mensagem.textContent =
            "Quantidade adicionada ao estoque com sucesso!";

        mensagem.className =
            "mensagem sucesso";

        document.getElementById("codigoQuantidade").value = "";
        document.getElementById("novaQuantidade").value = "";

        listarProdutos();

    } catch (erro) {

        mensagem.textContent =
            erro.message;

        mensagem.className =
            "mensagem erro";
    }
});


// ========================================
// INICIALIZAÇÃO
// ========================================

listarProdutos();