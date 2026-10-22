
let produtos = [];
let proximoCodigo = 1;

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
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
}

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    mensagem.textContent = produtos.length === 0
        ? "Nenhum produto cadastrado."
        : `${produtos.length} produto(s) cadastrado(s).`;

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

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar preço";
        botaoValor.addEventListener("click", function() {
            atualizarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Adicionar estoque";
        botaoQuantidade.addEventListener("click", function() {
            atualizarQuantidade(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade);
        linha.append(codigo, descricao, quantidade, valor, acoes);
        listaProdutos.appendChild(linha);
    });
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });
}

// Atualizar o valor
function atualizarValor(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const entrada = prompt("Digite o novo preço:");

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novoValor = Number(entrada);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido, maior ou igual a zero.");
        return;
    }

    produto.valor = novoValor;
    listarProdutos();
}

// Adicionar quantidade ao estoque
function atualizarQuantidade(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const entrada = prompt("Quantas unidades deseja adicionar?");

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novaQuantidade = Number(entrada);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("Digite uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += novaQuantidade;
    listarProdutos();
}

// Evento de cadastro
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
        alert("Produto cadastrado com sucesso!");
    } catch (erro) {
        alert(erro.message);
    }
});

listarProdutos();
