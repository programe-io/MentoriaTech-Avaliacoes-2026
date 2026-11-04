
let produtos = [];

// Validar produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1 || !Number.isInteger(quantidade)) {
        throw new Error("Quantidade deve ser um número inteiro maior ou igual a 1");
    }

    if (valor < 0 || !Number.isFinite(valor)) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Mostrar mensagem
function mostrarMensagem(texto, erro = false) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

// Cadastrar produto
function cadastrarProduto() {
    try {
        let descricao = document.getElementById("descricao").value.trim();
        let quantidade = Number(document.getElementById("quantidade").value);
        let valor = Number(document.getElementById("valor").value);

        validarProduto(descricao, quantidade, valor);

        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        listarProdutos();

        mostrarMensagem("Produto cadastrado com sucesso!");

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Listar produtos
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;
    });
}

// Atualizar valor
function atualizarValor() {
    try {
        let codigo = Number(document.getElementById("codigo").value);
        let novoValor = Number(document.getElementById("novoValor").value);

        if (novoValor < 0 || !Number.isFinite(novoValor)) {
            throw new Error("Valor deve ser maior ou igual a zero");
        }

        let produto = produtos.find(prod => prod.codigo === codigo);

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        produto.valor = novoValor;

        listarProdutos();

        mostrarMensagem("Valor atualizado com sucesso!");

        document.getElementById("novoValor").value = "";

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Atualizar quantidade
function atualizarQuantidade() {
    try {
        let codigo = Number(document.getElementById("codigo").value);
        let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

        if (novaQuantidade < 1 || !Number.isInteger(novaQuantidade)) {
            throw new Error("Quantidade deve ser um número inteiro maior ou igual a 1");
        }

        let produto = produtos.find(prod => prod.codigo === codigo);

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        produto.quantidade += novaQuantidade;

        listarProdutos();

        mostrarMensagem("Quantidade atualizada com sucesso!");

        document.getElementById("novaQuantidade").value = "";

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Mostrar lista inicial
listarProdutos();
