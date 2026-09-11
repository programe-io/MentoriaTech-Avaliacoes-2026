// Lista (Array) dos produtos
let produtos = [];

// ----------------------------------------
// VALIDAÇÃO
// ----------------------------------------

function validarProduto(descricao, quantidade, valor) {

if (descricao.length < 5) {
    throw new Error("Descrição deve ter no mínimo cinco caracteres");
}

if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
}

if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
}


}

// ----------------------------------------
// CADASTRAR PRODUTO
// ----------------------------------------

function cadastrarProdutos(descricao, quantidade, valor) {

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

// ----------------------------------------
// LISTAR PRODUTOS
// ----------------------------------------

function listarProdutos() {

const tabela = document.getElementById("listaProdutos");

tabela.innerHTML = "";

produtos.forEach(function(produto) {

    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${produto.codigo}</td>
        <td>${produto.descricao}</td>
        <td>${produto.quantidade}</td>
        <td>R$ ${produto.valor.toFixed(2)}</td>

        <td>
            <button
                class="btn-valor"
                onclick="alterarValor(${produto.codigo})">
                Alterar valor
            </button>

            <button
                class="btn-quantidade"
                onclick="alterarQuantidade(${produto.codigo})">
                + Quantidade
            </button>
        </td>
    `;

    tabela.appendChild(linha);
});


}

// ----------------------------------------
// ATUALIZAR VALOR
// ----------------------------------------

function atualizarValor(codigoProduto, novoValor) {

if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero");
}

const produto = produtos.find(
    prod => prod.codigo === codigoProduto
);

if (produto) {
    produto.valor = novoValor;
    listarProdutos();
} else {
    throw new Error("Produto não encontrado");
}


}

// ----------------------------------------
// ATUALIZAR QUANTIDADE
// ----------------------------------------

function atualizarQuantidade(codigoProduto, novaQuantidade) {

if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero");
}

const produto = produtos.find(
    prod => prod.codigo === codigoProduto
);

if (produto) {
    produto.quantidade += novaQuantidade;
    listarProdutos();
} else {
    throw new Error("Produto não encontrado");
}


}

// ----------------------------------------
// BOTÃO ALTERAR VALOR
// ----------------------------------------

function alterarValor(codigo) {

const novoValor = Number(
    prompt("Digite o novo valor do produto:")
);

if (isNaN(novoValor)) {
    mostrarMensagem("Digite um valor válido.", "erro");
    return;
}

try {

    atualizarValor(codigo, novoValor);

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

// ----------------------------------------
// BOTÃO ADICIONAR QUANTIDADE
// ----------------------------------------

function alterarQuantidade(codigo) {

const quantidade = Number(
    prompt("Digite a quantidade que deseja adicionar:")
);

if (isNaN(quantidade)) {
    mostrarMensagem("Digite uma quantidade válida.", "erro");
    return;
}

try {

    atualizarQuantidade(codigo, quantidade);

    mostrarMensagem(
        "Quantidade atualizada com sucesso!",
        "sucesso"
    );

} catch (erro) {

    mostrarMensagem(
        erro.message,
        "erro"
    );
}


}

// ----------------------------------------
// MENSAGEM
// ----------------------------------------

function mostrarMensagem(texto, tipo) {

const mensagem = document.getElementById("mensagem");

mensagem.textContent = texto;
mensagem.className = tipo;

setTimeout(function() {
    mensagem.textContent = "";
    mensagem.className = "";
}, 3000);


}

// ----------------------------------------
// FORMULÁRIO
// ----------------------------------------

document
.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const descricao =
        document.getElementById("descricao").value.trim();

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);

    try {

        cadastrarProdutos(
            descricao,
            quantidade,
            valor
        );

        mostrarMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );

        // Limpa os campos
        document.getElementById("formProduto").reset();

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );
    }
});


// Lista inicial
listarProdutos();