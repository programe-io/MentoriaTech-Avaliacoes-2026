
// ==========================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ==========================================

// Lista de produtos
let produtos = [];

// Contador para gerar códigos únicos
let proximoCodigo = 1;


// ==========================================
// 1. FUNÇÃO PARA VALIDAR PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter no mínimo 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}


// ==========================================
// 2. FUNÇÃO PARA CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    proximoCodigo++;

    listarProdutos();

    return novoProduto;
}


// ==========================================
// 3. FUNÇÃO PARA LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto) => {

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

        // Botão para atualizar valor
        const btnValor = document.createElement("button");
        btnValor.textContent = "Valor";
        btnValor.className = "btn-valor";

        btnValor.addEventListener("click", () => {
            atualizarValor(produto.codigo);
        });

        // Botão para adicionar quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "+ Estoque";
        btnQuantidade.className = "btn-quantidade";

        btnQuantidade.addEventListener("click", () => {
            atualizarQuantidade(produto.codigo);
        });

        // Botão para excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        });

        acoes.appendChild(btnValor);
        acoes.appendChild(btnQuantidade);
        acoes.appendChild(btnExcluir);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        tabela.appendChild(linha);
    });
}


// ==========================================
// 4. FUNÇÃO PARA BUSCAR PRODUTO
// ==========================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find((prod) => prod.codigo === codigoProduto);
}


// ==========================================
// 5. FUNÇÃO PARA ATUALIZAR VALOR
// ==========================================

function atualizarValor(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novoValor = prompt(
        "Digite o novo valor do produto:"
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valorConvertido = Number(novoValor);

    if (!Number.isFinite(valorConvertido) || valorConvertido < 0) {
        alert("Informe um valor válido, maior ou igual a zero.");
        return;
    }

    produto.valor = valorConvertido;

    listarProdutos();

    alert("Valor atualizado com sucesso!");
}


// ==========================================
// 6. FUNÇÃO PARA ATUALIZAR QUANTIDADE
// ==========================================

function atualizarQuantidade(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const novaQuantidade = prompt(
        "Digite a quantidade que deseja adicionar ao estoque:"
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidadeConvertida = Number(novaQuantidade);

    if (!Number.isInteger(quantidadeConvertida) || quantidadeConvertida < 1) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += quantidadeConvertida;

    listarProdutos();

    alert("Quantidade atualizada com sucesso!");
}


// ==========================================
// 7. FUNÇÃO PARA EXCLUIR PRODUTO
// ==========================================

function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir " + produto.descricao + "?"
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        (prod) => prod.codigo !== codigoProduto
    );

    listarProdutos();

    alert("Produto excluído com sucesso!");
}


// ==========================================
// 8. EVENTO DO FORMULÁRIO
// ==========================================

const formulario = document.getElementById("formProduto");

formulario.addEventListener("submit", function(event) {

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

        formulario.reset();

        alert("Produto cadastrado com sucesso!");

    } catch (erro) {

        alert("Erro: " + erro.message);

    }

});


// ==========================================
// 9. INICIALIZAR A LISTAGEM
// ==========================================

listarProdutos();
