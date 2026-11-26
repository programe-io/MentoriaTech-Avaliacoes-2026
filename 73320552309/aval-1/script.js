
// Array que armazena os produtos
let produtos = [];

// Gera códigos sequenciais
let proximoCodigo = 1;

// Elementos HTML
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Validação dos produtos
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Cadastrar produto
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

    alert("Produto cadastrado com sucesso!");
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigo) {

    return produtos.find(produto => produto.codigo === codigo);

}

// Listar produtos
function listarProdutos() {

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {

        const linha = document.createElement("tr");

        const colunaCodigo = document.createElement("td");
        colunaCodigo.textContent = produto.codigo;

        const colunaDescricao = document.createElement("td");
        colunaDescricao.textContent = produto.descricao;

        const colunaQuantidade = document.createElement("td");
        colunaQuantidade.textContent = produto.quantidade;

        const colunaValor = document.createElement("td");
        colunaValor.textContent = produto.valor.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        );

        const colunaAcoes = document.createElement("td");

        // Botão atualizar valor
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Preço";
        btnEditar.className = "btn-editar";

        btnEditar.addEventListener("click", () => {
            atualizarValor(produto.codigo);
        });

        // Botão adicionar quantidade
        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Estoque";
        btnQuantidade.className = "btn-quantidade";

        btnQuantidade.addEventListener("click", () => {
            atualizarQuantidade(produto.codigo);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        });

        colunaAcoes.append(
            btnEditar,
            btnQuantidade,
            btnExcluir
        );

        linha.append(
            colunaCodigo,
            colunaDescricao,
            colunaQuantidade,
            colunaValor,
            colunaAcoes
        );

        listaProdutos.appendChild(linha);

    });

    atualizarResumo();
}

// Atualizar valor do produto
function atualizarValor(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Informe um valor válido.");
        return;
    }

    produto.valor = valor;

    listarProdutos();

    alert("Valor atualizado com sucesso!");
}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const quantidade = prompt("Quantas unidades deseja adicionar?");

    if (quantidade === null || quantidade.trim() === "") {
        return;
    }

    const novaQuantidade = Number(quantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();

    alert("Estoque atualizado com sucesso!");
}

// Excluir produto
function excluirProduto(codigoProduto) {

    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.codigo !== codigoProduto
    );

    listarProdutos();

    alert("Produto excluído com sucesso!");
}

// Atualizar resumo do estoque
function atualizarResumo() {

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("totalUnidades").textContent =
        totalUnidades;
}

// Evento do formulário
formProduto.addEventListener("submit", function(event) {

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

        formProduto.reset();

    } catch (erro) {

        alert(erro.message);

    }

});

// Exibe a lista inicialmente
listarProdutos();
