// Array que armazena os produtos
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 3) {
        throw new Error("A descrição deve possuir pelo menos 3 caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
}

// Função para listar produtos
function listarProdutos() {
    const tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {
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

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);

        tabela.appendChild(linha);
    });
}

// Função para buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(function(prod) {
        return prod.codigo === codigoProduto;
    });
}

// Função para atualizar o valor
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Evento de cadastro
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        document.getElementById("formProduto").reset();
    } catch (erro) {
        alert(erro.message);
    }
});

// Função para alterar o valor pela interface
function alterarValor() {
    const codigo = Number(document.getElementById("codigoAtualizar").value);
    const novoValor = Number(document.getElementById("novoValor").value);

    try {
        atualizarValor(codigo, novoValor);

        alert("Valor atualizado com sucesso!");

        document.getElementById("novoValor").value = "";
    } catch (erro) {
        alert(erro.message);
    }
}

// Função para adicionar quantidade pela interface
function alterarQuantidade() {
    const codigo = Number(document.getElementById("codigoAtualizar").value);
    const novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    try {
        atualizarQuantidade(codigo, novaQuantidade);

        alert("Estoque atualizado com sucesso!");

        document.getElementById("novaQuantidade").value = "";
    } catch (erro) {
        alert(erro.message);
    }
}