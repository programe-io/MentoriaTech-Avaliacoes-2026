// Lista (Array) dos produtos
let produtos = [];

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


function cadastrarProdutos(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}


// Lista os produtos no console
function listarProdutos() {
    console.log(produtos);
}


// Atualiza o valor
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// Atualiza a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}


// --------------------------------------
// FUNÇÕES PARA USAR NO HTML
// --------------------------------------

function mostrarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;

        lista.appendChild(linha);
    });
}


// Cadastrar pelo formulário
function cadastrarProdutoTela() {

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    try {

        cadastrarProdutos(descricao, quantidade, valor);

        mostrarProdutos();

        mostrarMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
}


// Atualizar valor pelo formulário
function atualizarValorTela() {

    const codigo = Number(
        document.getElementById("codigoAtualizar").value
    );

    const novoValor = Number(
        document.getElementById("novoValor").value
    );

    try {

        atualizarValor(codigo, novoValor);

        mostrarProdutos();

        mostrarMensagem(
            "Valor atualizado com sucesso!",
            "sucesso"
        );

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
}


// Atualizar quantidade pelo formulário
function atualizarQuantidadeTela() {

    const codigo = Number(
        document.getElementById("codigoAtualizar").value
    );

    const novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    try {

        atualizarQuantidade(codigo, novaQuantidade);

        mostrarProdutos();

        mostrarMensagem(
            "Quantidade atualizada com sucesso!",
            "sucesso"
        );

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");
    }
}


// Mostrar mensagens
function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}


// --------------------------------------
// PRODUTOS INICIAIS
// --------------------------------------

cadastrarProdutos("Cadeira Gamer", 12, 699.00);

cadastrarProdutos("Mouse Logi", 38, 99.00);

mostrarProdutos();


// Exemplos do código original
listarProdutos();

atualizarValor(2, 97.00);

listarProdutos();

atualizarQuantidade(1, 3);

listarProdutos();

mostrarProdutos();